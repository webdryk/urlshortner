"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden">
      {/* 🎨 Glassy Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#7894FF] via-[#FF8B74] to-[#FF89FF] opacity-20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-blue-600"
            >
              URLShortner
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-grow">
          {/* Hero Section */}
          <motion.section
            className="text-center py-20 px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Shorten. Share. Track.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The easiest way to shorten and manage your links. Fast, secure,
              and reliable.
            </p>
            <Link
              href="/register"
              className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started for Free
            </Link>
          </motion.section>

          {/* Features */}
          <motion.section
            className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              {
                title: "Shorten URLs",
                desc: "Paste any long URL and get a shorter, shareable link in seconds.",
              },
              {
                title: "Track Clicks",
                desc: "Monitor how many times your shortened links have been clicked.",
              },
              {
                title: "Manage Easily",
                desc: "View, copy, or delete your links anytime from the dashboard.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transition"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="bg-white/70 backdrop-blur-md shadow-inner mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} URLShortner by Webdryk. All rights
            reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
