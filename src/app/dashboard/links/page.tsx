"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { toast } from "react-toastify";

type Link = {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  // Add other fields your user object has
};

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [user, setUser] = useState<User | null>(null); // ✅ Replace `any` with proper type

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const resUser = await fetch("/api/user");
        const userData = await resUser.json();
        setUser(userData.user);

        const res = await fetch("/api/links");
        const data = await res.json();
        setLinks(data.links || []);
      } catch {
        toast.error("Failed to load links"); // ✅ Removed unused `err`
      }
    };

    fetchLinks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-16 md:flex">
        <Sidebar user={user} />
        <main className="flex-1 p-6 md:ml-64">
          <h1 className="text-2xl font-semibold mb-6">My Links</h1>
          {links.length === 0 ? (
            <p className="text-gray-500">No links found.</p>
          ) : (
            <ul className="space-y-4">
              {links.map((link) => (
                <li
                  key={link._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="text-sm text-gray-600">
                    Created: {new Date(link.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Original:</span>{" "}
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {link.originalUrl}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Short URL:</span>{" "}
                    <a
                      href={link.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      {link.shortUrl}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}
