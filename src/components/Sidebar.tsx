"use client";

import { useRouter } from "next/navigation";
import { LayoutDashboard, List, Settings, LogOut } from "lucide-react";
import Link from "next/link"; // Import Link component

type SidebarProps = {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
};

export default function Sidebar({ user }: SidebarProps) {
  const getInitials = () => {
    const first = user?.firstName?.charAt(0) ?? "";
    const last = user?.lastName?.charAt(0) ?? "";
    return `${first}${last}`.toUpperCase();
  };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
      router.push("/login");
    } catch (err) {
      
    }
  };

  return (
    <aside
      id="sidebar"
      className="bg-white h-screen fixed top-16 left-0 z-10 w-64 shadow-md -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {getInitials() || "G"}
          </div>
          <div>
            <p className="font-semibold">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "Guest"}
            </p>
            <p className="text-sm text-gray-500">{user?.email || "N/A"}</p>
          </div>
        </div>
        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 py-2 px-4 rounded hover:bg-blue-100 text-blue-600 font-medium"
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link
            href="/dashboard/links"
            className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-100"
          >
            <List className="w-5 h-5" /> My Links
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <a
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-100 text-red-500"
          >
            <LogOut className="w-5 h-5" /> Logout
          </a>
        </nav>
      </div>
    </aside>
  );
}
