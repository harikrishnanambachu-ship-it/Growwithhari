import axios from "axios";

const base = process.env.REACT_APP_BACKEND_URL;
export const api = axios.create({ baseURL: base ? `${base}/api` : undefined, withCredentials: true });
export const hasApi = Boolean(base);

export const errMsg = (e) => {
  const d = e?.response?.data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x?.msg).filter(Boolean).join(" ");
  return "Something went wrong. Please try again.";
};
