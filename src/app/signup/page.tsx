"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Step2 from "./create-password/page";
import { apiGet } from "@/lib/api";

export default function Page() {
  const [swapped, setSwapped] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [checking, setChecking] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [cardAvailable, setCardAvailable] = useState<boolean | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSwapped(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const normalizedCard = cardNumber.replace(/\D/g, "");
    const shouldCheckEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const shouldCheckCard = /^\d{8}$/.test(normalizedCard);

    setAvailabilityError(null);
    if (!shouldCheckEmail) setEmailAvailable(null);
    if (!shouldCheckCard) setCardAvailable(null);

    if (!shouldCheckEmail && !shouldCheckCard) return;

    const timer = setTimeout(async () => {
      setChecking(true);
      try {
        const qs = new URLSearchParams();
        if (shouldCheckEmail) qs.set("email", email.trim());
        if (shouldCheckCard) qs.set("cardNumber", normalizedCard);

        const data = await apiGet<{
          emailAvailable: boolean | null;
          cardNumberAvailable: boolean | null;
        }>(`/auth/signup/check?${qs.toString()}`);

        if (shouldCheckEmail) setEmailAvailable(data.emailAvailable);
        if (shouldCheckCard) setCardAvailable(data.cardNumberAvailable);
      } catch (err) {
        setAvailabilityError(
          err instanceof Error ? err.message : "Could not check availability",
        );
      } finally {
        setChecking(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [email, cardNumber]);

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
                {emailAvailable === false && (
                  <p className="text-xs text-red-600">Email already exists</p>
                )}
                {emailAvailable === true && (
                  <p className="text-xs text-green-700">Email is available</p>
                )}
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
                {cardAvailable === false && (
                  <p className="text-xs text-red-600">Card number already exists</p>
                )}
                {cardAvailable === true && (
                  <p className="text-xs text-green-700">Card number is available</p>
                )}
              </div>
              {checking && (
                <p className="text-xs text-gray-500">Checking availability...</p>
              )}
              {availabilityError && (
                <p className="text-xs text-red-600">{availabilityError}</p>
              )}
              <Button
                onClick={() => setStep(2)}
                disabled={
                  !firstName ||
                  !lastName ||
                  !email ||
                  cardNumber.length !== 8 ||
                  emailAvailable === false ||
                  cardAvailable === false
                }
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
