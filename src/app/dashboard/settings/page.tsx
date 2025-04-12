"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { toast } from "react-toastify";

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data.user);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
      } catch (err) {
        toast.error("Failed to load user data");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    )
      return;

    try {
      const res = await fetch("/api/user", { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success("Account deleted");

      // Optional: redirect to homepage or login
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 md:flex">
        <Sidebar user={user} />
        <main className="flex-1 p-6 pt-5 md:ml-64">
          <h1 className="text-2xl font-semibold mb-4">Settings</h1>
          <form
            onSubmit={handleUpdate}
            className="space-y-4 bg-white p-6 rounded-lg shadow max-w-md"
          >
            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 ml-10 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Delete Account
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
