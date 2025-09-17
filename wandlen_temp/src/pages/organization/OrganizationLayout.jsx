import { Outlet } from "react-router-dom";
import OrganizationFamilyHeader from "../../components/organization/OrganizationFamilyHeader";


const OrganizationLayout = () => {
  return (
    <div className="min-h-screen">
      <OrganizationFamilyHeader />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizationLayout;
