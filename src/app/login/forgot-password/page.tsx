"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔒 MOCK RESET (frontend only)
    setTimeout(() => {
      console.log({ email, phone });
      alert("Password reset link sent (mock)");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white w-200 h-200 rounded-2xl flex items-center justify-center">
        <div className="bg-black w-150 h-150 rounded-2xl flex items-center justify-center">
          <Card className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-semibold">
                Forgot Password
              </CardTitle>
              <p className="text-sm text-gray-500">
                Enter your email and phone
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="name@bank.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-black focus-visible:ring-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-black focus-visible:ring-black"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white hover:bg-neutral-800"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>

                {/* ✅ BACK BUTTON */}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="w-full text-sm text-center text-gray-600 hover:text-black transition"
                >
                  ← Back to login
                </button>

                <p className="text-center text-xs text-gray-500">
                  Secured by Alice
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
