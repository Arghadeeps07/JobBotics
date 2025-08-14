import Sidebar from "@/components/Sidebar";
import React from "react";


const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className=" p-6 ml-56 min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
