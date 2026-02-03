// Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">Alice</h1>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#home" className="hover:text-gray-400 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-gray-400 transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-gray-400 transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-gray-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Socials */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            Youtube
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-6 text-sm">
        &copy; {new Date().getFullYear()} Alice. All rights reserved.
      </div>
    </footer>
  );
}
