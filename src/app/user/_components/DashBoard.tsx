"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DashboardUser() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 md:px-20 overflow-hidden relative">
      {/* Floating shapes */}
      <motion.div
        className="absolute w-40 h-40 bg-purple-600 rounded-full top-10 left-10 opacity-30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-indigo-500 rounded-full bottom-0 right-20 opacity-20 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section + Notes + Calendar */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-start justify-between my-12 relative z-10 gap-8">
        {/* Hero Text */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-purple-400">Alice Bank</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Manage all your accounts, transactions, and payments from a single
            platform.
          </p>
        </motion.div>

        {/* Notes + Calendar */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </div>
      </section>
    </div>
  );
}
