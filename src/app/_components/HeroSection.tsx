"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-[linear-gradient(120deg,#f6f6f6_0%,#ffffff_55%,#eceff4_100%)]">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="space-y-7">
            <span className="inline-flex items-center rounded-full border border-black/20 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-black/80">
              Trusted Digital Banking
            </span>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black md:text-5xl xl:text-6xl">
              Smart banking for a
              <br />
              <span className="text-black/70 underline decoration-black/20">
                modern world
              </span>
            </h1>

            <p className="max-w-xl text-base text-neutral-600 md:text-lg">
              Manage your finances securely with our next-generation banking
              platform. Simple, fast, and built for trust.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-neutral-500">Transfers</p>
                <p className="text-sm font-semibold text-black">Instant</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-neutral-500">Security</p>
                <p className="text-sm font-semibold text-black">Bank-grade</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-neutral-500">Support</p>
                <p className="text-sm font-semibold text-black">24/7</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/wallstreet.jpg"
                  alt="Financial district skyline"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
              <p className="text-xs text-neutral-500">Monthly Growth</p>
              <p className="text-lg font-semibold text-black">+14.8%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
