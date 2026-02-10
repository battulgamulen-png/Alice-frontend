"use client";

import { useState } from "react";
import Sidebar from "./_components/sidebar";
import HeaderUser from "./_components/header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 80 : 240;

  return (
    <div className="min-h-screen w-full bg-black text-white flex">
      <div
        className="fixed top-0 left-0 h-screen z-40"
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth }}
      >
        <HeaderUser />
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
