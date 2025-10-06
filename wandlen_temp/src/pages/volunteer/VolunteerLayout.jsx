import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import VolunteerHeader from "../../components/volunteer/VolunteerHeader";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const VolunteerLayout = () => {
  return (
    <div className="min-h-screen">
      <VolunteerHeader />
      <ScrollToTop />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default VolunteerLayout;
