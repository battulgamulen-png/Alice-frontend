"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Step2() {
  const [swapped, setSwapped] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSwapped(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center gap-40 bg-black">
      {/* Sign Up Card */}
      <motion.div
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={swapped ? "order-1" : "order-2"}
      >
        <Card className="w-100 h-100 max-w-md bg-white text-black rounded-2xl shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Create Password
            </CardTitle>
            <p className="text-sm text-gray-500">
              Set up your account password
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="Enter password" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input type="password" placeholder="Confirm password" />
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => router.push("/forgot-password")}
              >
                Create password
              </button>
            </div>

            {/* Next / Log In Button */}
            <Button>Welcome</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
