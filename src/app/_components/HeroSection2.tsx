// src/components/HeroSection2.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Tailwind-д custom Button байхгүй бол энгийн button ашиглаж болно
import { Shield } from "lucide-react";

export default function HeroSection2() {
  return (
    <section className="relative bg-blue-900 min-h-screen flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Таны санхүүгийн амжилт эндээс эхэлнэ
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-xl mx-auto">
          Манай банкны ухаалаг шийдлүүдтэйгээр хурдан, найдвартай санхүүгийн
          үйлчилгээг аваарай.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button className="bg-white text-blue-900 font-semibold hover:bg-gray-100 transition">
            Бүртгүүлэх
          </Button>
          <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-900 transition">
            Илүү их мэдэх
          </Button>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full"></div>
    </section>
  );
}
