import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import OrganizationFamilyHeader from "../../components/organization/OrganizationFamilyHeader";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const OrganizationLayout = () => {
  return (
    <div className="min-h-screen">
      <OrganizationFamilyHeader />
      <ScrollToTop />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizationLayout;
