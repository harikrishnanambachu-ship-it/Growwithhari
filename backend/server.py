from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import asyncio
import logging
import os
from contextlib import suppress
from datetime import datetime, timezone, timedelta
from typing import Annotated, Optional

import bcrypt
import jwt
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from pymongo import ASCENDING, DESCENDING, IndexModel
from starlette.middleware.cors import CORSMiddleware

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")

INDEXES: dict[str, list[IndexModel]] = {
    "users": [IndexModel([("email", ASCENDING)], name="email", unique=True)],
    "login_attempts": [IndexModel([("identifier", ASCENDING)], name="identifier")],
    "messages": [IndexModel([("created_at", DESCENDING)], name="created_at_desc")],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logger.error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)


PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        return self.model_dump(by_alias=True, exclude={"id"})

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


class Message(BaseDocument):
    name: str
    email: str
    phone: str = ""
    business: str = ""
    topic: str = ""
    message: str
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class MessageIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    phone: str = Field(default="", max_length=40)
    business: str = Field(default="", max_length=160)
    topic: str = Field(default="", max_length=120)
    message: str = Field(min_length=1, max_length=4000)
    website: str = ""


class MessagePatch(BaseModel):
    read: bool


class LoginIn(BaseModel):
    email: str
    password: str


JWT_ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_token(user_id: str, email: str, kind: str, delta: timedelta) -> str:
    payload = {"sub": user_id, "email": email, "type": kind, "exp": datetime.now(timezone.utc) + delta}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, user_id: str, email: str) -> None:
    access = create_token(user_id, email, "access", timedelta(hours=8))
    refresh = create_token(user_id, email, "refresh", timedelta(days=7))
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="lax", max_age=28800, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="lax", max_age=604800, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])}, {"password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Not authorised")
    return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name", "Admin"), "role": user["role"]}


def oid(value: str) -> ObjectId:
    try:
        return ObjectId(value)
    except (InvalidId, TypeError):
        raise HTTPException(status_code=404, detail="Message not found")


app = FastAPI()
api = APIRouter(prefix="/api")


@api.get("/")
async def root():
    return {"message": "Grow With Hari API"}


@api.post("/contact")
async def create_message(data: MessageIn):
    if data.website:
        return {"ok": True}
    msg = Message(**data.model_dump(exclude={"website"}))
    await db.messages.insert_one(msg.to_mongo())
    return {"ok": True}


@api.post("/auth/login")
async def login(data: LoginIn, request: Request, response: Response):
    email = data.email.strip().lower()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    now = datetime.now(timezone.utc)
    if attempt and attempt.get("count", 0) >= 5:
        locked_at = datetime.fromisoformat(attempt["last"])
        if now - locked_at < timedelta(minutes=15):
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        await db.login_attempts.delete_one({"identifier": identifier})
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier}, {"$inc": {"count": 1}, "$set": {"last": now.isoformat()}}, upsert=True
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    set_auth_cookies(response, str(user["_id"]), email)
    return {"id": str(user["_id"]), "email": email, "name": user.get("name", "Admin"), "role": user["role"]}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@api.get("/admin/messages")
async def list_messages(user: dict = Depends(get_current_user)):
    docs = await db.messages.find().sort("created_at", -1).to_list(500)
    return [Message.from_mongo(d).model_dump() for d in docs]


@api.patch("/admin/messages/{message_id}")
async def update_message(message_id: str, data: MessagePatch, user: dict = Depends(get_current_user)):
    res = await db.messages.update_one({"_id": oid(message_id)}, {"$set": {"read": data.read}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"ok": True}


@api.delete("/admin/messages/{message_id}")
async def delete_message(message_id: str, user: dict = Depends(get_current_user)):
    res = await db.messages.delete_one({"_id": oid(message_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"ok": True}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ["CORS_ORIGINS"].split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


async def seed_admin() -> None:
    email = os.environ["ADMIN_EMAIL"].lower()
    if await db.users.find_one({"email": email}) is None:
        await db.users.insert_one({
            "email": email,
            "password_hash": hash_password(os.environ["ADMIN_PASSWORD"]),
            "name": "Hari",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })


@app.on_event("startup")
async def startup():
    app.state.index_task = asyncio.create_task(ensure_indexes())
    await seed_admin()


@app.on_event("shutdown")
async def shutdown():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
