import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import WebsiteHeader from "./components/WebsiteHeader";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = () => {
  return (
    <div className="min-h-screen">
      <WebsiteHeader />
      <ScrollToTop />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
