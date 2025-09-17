import { Outlet } from "react-router-dom";
import WebsiteHeader from "./components/WebsiteHeader";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <WebsiteHeader />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
