"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Step2 from "./step2";
export default function Page() {
  const [swapped, setSwapped] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSwapped(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center gap-40 bg-black">
      <motion.div
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={swapped ? "order-2" : "order-1"}
      >
        <div className="w-150 h-200 bg-gradient-to-br from-teal-300 to-blue-500 rounded-2xl shadow-lg" />
      </motion.div>
      <motion.div
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={swapped ? "order-1" : "order-2"}
      >
        {step === 1 && (
          <Card className="w-100 h-150 max-w-md bg-white text-black rounded-2xl shadow-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Bank Sign Up
              </CardTitle>
              <p className="text-sm text-gray-500">Welcome to Alice</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="Alice" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Alice" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="name@bank.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input placeholder="+976..." />
              </div>
              <Button onClick={() => setStep(2)}>Log In</Button>
            </CardContent>
          </Card>
        )}
        {step === 2 && <Step2 />}
      </motion.div>
    </div>
  );
}
