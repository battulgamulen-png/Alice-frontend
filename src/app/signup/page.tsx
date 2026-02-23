"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Step2 from "./create-password/page";

export default function Page() {
  const [swapped, setSwapped] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");

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
                <Input
                  placeholder="Alice"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  placeholder="Alice"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="name@bank.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  placeholder="+976..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Card Number (8 digits)</label>
                <Input
                  placeholder="12345678"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  required
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!firstName || !lastName || !email || cardNumber.length !== 8}
              >
                Next
              </Button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full text-sm text-center text-gray-600 hover:text-black transition"
              >
                ← Back to Home
              </button>
            </CardContent>
          </Card>
        )}
        {step === 2 && (
          <Step2
            data={{ firstName, lastName, email, phone, cardNumber }}
            onBack={() => setStep(1)}
          />
        )}
      </motion.div>
    </div>
  );
}
