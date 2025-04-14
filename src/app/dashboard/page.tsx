"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

type Link = {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function Dashboard() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
       
        setUser(data.user);
      } catch {
        toast.error("Failed to load user data");
      }
    };

    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/links");
        const data = await res.json();
        setLinks(data.links);
      } catch {
        toast.error("Failed to load links");
      }
    };

    fetchUser();
    fetchLinks();
  }, []);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    try {
      setLoading(true);
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: urlInput }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Shortened successfully");
      setLinks([data.link, ...links]);
      setUrlInput("");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success("Link deleted");
      setLinks(links.filter((link) => link._id !== id));
    } catch {
      toast.error("Error deleting link");
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 md:flex">
        <Sidebar user={user} />
        <main className="flex-1 p-4 pt-5 md:ml-64 h-[calc(100vh-64px)] overflow-hidden">
          <section className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Shorten a New URL</h2>
            <form
              onSubmit={handleShorten}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="url"
                placeholder="Enter long URL here..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? "Shortening..." : "Shorten"}
              </button>
            </form>
          </section>

          <section className="bg-white p-6 rounded-lg shadow h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Your Links</h2>
            <div className="overflow-y-auto flex-1">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left border-b">
                    <th className="pb-2">Original URL</th>
                    <th className="pb-2">Short URL</th>
                    <th className="pb-2">Clicks</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 truncate max-w-xs">
                        {link.originalUrl}
                      </td>
                      <td className="py-2 text-blue-600">{link.shortUrl}</td>
                      <td className="py-2">{link.clicks}</td>
                      <td className="py-2 space-x-2">
                        <button
                          onClick={() => handleCopy(link.shortUrl)}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleDelete(link._id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {links.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-gray-500"
                      >
                        No links yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
