import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/Sidebar"; // Adjust path if needed

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar - Make it fixed */}
      <div className="fixed top-0 left-0 h-full w-64 overflow-y-auto">
        <AdminSidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 ml-64 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
