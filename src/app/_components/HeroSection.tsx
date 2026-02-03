"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-white h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-black px-4 py-1 text-xs font-medium tracking-wide">
              Trusted Digital Banking
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight text-black">
              Smart banking for a <br />
              <span className="underline decoration-black/20">
                modern world
              </span>
            </h1>

            <p className="max-w-xl text-base md:text-lg text-neutral-600">
              Manage your finances securely with our next-generation banking
              platform. Simple, fast, and built for trust.
            </p>

            <div className="flex gap-4 pt-4">
              <Link href={"/"}>
                {" "}
                <Button className="bg-black text-white hover:bg-neutral-800 px-8">
                  The World
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-8"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-8 shadow-sm">
              <div className="space-y-4">
                <div className="h-12 w-40 rounded-full bg-black" />
                <div className="h-4 w-3/4 rounded bg-neutral-200" />
                <div className="h-4 w-2/3 rounded bg-neutral-200" />
                <div className="mt-6 h-32 rounded-xl bg-white border border-black/10" />
              </div>
            </div>

            {/* subtle decor */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full border border-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
