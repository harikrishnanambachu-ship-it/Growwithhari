import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "@/lib/content";
import { SmoothScroll } from "./SmoothScroll";
import { Preloader } from "./Preloader";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

const useSeo = (pathname) => {
  useEffect(() => {
    const [title, desc] = SEO[pathname] || SEO["/"];
    document.title = title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", desc);
  }, [pathname]);
};

export default function Layout() {
  const { pathname } = useLocation();
  useSeo(pathname);
  return (
    <SmoothScroll>
      <div className="grain min-h-screen bg-ink text-bone">
        <Preloader />
        <Nav />
        <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <Outlet />
        </motion.main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
