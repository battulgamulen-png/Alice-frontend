"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  CreditCard,
  DollarSign,
  Clock,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import Sum1 from "@/components/icons/sum";
import Sum2 from "@/components/icons/sum2";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/user/dashboard" },
  { name: "Cards", icon: <CreditCard className="w-5 h-5" />, path: "/user/cards" },
  { name: "Transactions", icon: <DollarSign className="w-5 h-5" />, path: "/user/transactions" },
  { name: "Transfer", icon: <Clock className="w-5 h-5" />, path: "/user/transfer" },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/user/settings" },
];

export default function Sidebar({
  collapsed = false,
  setCollapsed,
}: {
  collapsed?: boolean;
  setCollapsed?: (val: boolean) => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.push("/");
  };

  return (
    <div
      className="bg-black text-white h-screen flex flex-col justify-between transition-all duration-300"
      style={{ width: collapsed ? 80 : 240 }}
    >
      {/* User */}
      <div
        onClick={() => router.push("/user/profile")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && router.push("/user/profile")}
        className={`flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer hover:bg-gray-800 transition ${
          collapsed ? "justify-center" : "justify-start"
        }`}
      >
        <img
          src="/mulenpic.PNG"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        {!collapsed && (
          <span className="text-lg font-medium">Mulen Battulga</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-6 flex-1">
        {navItems.map((item) => (
          <div key={item.name} className="relative group">
            <button
              onClick={() => {
                setActive(item.name);
                router.push(item.path);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg transition w-full
                ${
                  (pathname && pathname.startsWith(item.path)) ||
                  active === item.name
                    ? "bg-purple-700"
                    : "hover:bg-gray-800"
                }
                ${collapsed ? "justify-center" : "justify-start"}
              `}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </button>

            {collapsed && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={() => setCollapsed?.(!collapsed)}
          className={`flex items-center p-3 rounded-lg hover:bg-gray-800 transition w-full ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          {collapsed ? <Sum2 /> : <Sum1 />}
        </button>

        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition text-red-500 w-full ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
