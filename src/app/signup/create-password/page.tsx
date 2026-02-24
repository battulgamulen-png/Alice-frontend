"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

type Step2Props = {
  data?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    cardNumber: string;
  };
  onBack?: () => void;
};

export default function Step2({ data, onBack }: Step2Props) {
  const [swapped, setSwapped] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSwapped(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async () => {
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!data) {
      setError("Missing signup data");
      return;
    }
    if (!/^\d{8}$/.test(data.cardNumber)) {
      setError("Card number must be exactly 8 digits");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...data,
        password,
      };
      const result = await apiPost<{
        user: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          balanceUsdCents: number;
        };
        token: string;
      }>("/auth/signup", payload);

      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("auth_user", JSON.stringify(result.user));
      router.push("/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-40 bg-black">
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
              <div className="flex items-center gap-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs text-blue-500 hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="flex items-center gap-2">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-xs text-blue-500 hover:underline"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <Button onClick={handleSignup} disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full text-sm text-center text-blue-600 hover:underline transition"
            >
              Already have an account? Log in
            </button>
            <button
              type="button"
              onClick={onBack || (() => router.push("/signup"))}
              className="w-full text-sm text-center text-gray-600 hover:text-black transition"
            >
              ← Back to signup
            </button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
