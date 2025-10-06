import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ClientHeader from "../../components/client/ClientHeader";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ClientLayout = () => {
  return (
    <div className="min-h-screen">
      <ClientHeader />
      <ScrollToTop />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
