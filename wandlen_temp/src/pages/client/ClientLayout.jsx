import { Outlet } from "react-router-dom";
import ClientHeader from "../../components/client/ClientHeader";

const ClientLayout = () => {
  return (
    <div className="min-h-screen">
      <ClientHeader />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
