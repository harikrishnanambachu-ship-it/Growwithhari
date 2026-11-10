import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Automation from "@/pages/Automation";
import Process from "@/pages/Process";
import Market from "@/pages/Market";
import Faq from "@/pages/Faq";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminInbox from "@/pages/AdminInbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/process" element={<Process />} />
          <Route path="/market" element={<Market />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/inbox" element={<AdminInbox />} />
      </Routes>
      <Toaster theme="dark" position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
