"use client";

import { Menu } from "lucide-react";

export default function Navbar() {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("-translate-x-full");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-blue-600">URLShortener</h1>
      </div>
    </header>
  );
}
