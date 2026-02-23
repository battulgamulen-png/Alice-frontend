"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ForgotPassword from "./forgot-password/page";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

export default function StepOne() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await apiPost<{
        user: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          balanceUsdCents: number;
        };
        token: string;
      }>("/auth/login", { email, password });

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      router.push("/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white w-200 h-200 rounded-2xl flex items-center justify-center">
        <div className="bg-black w-150 h-150 rounded-2xl flex items-center justify-center">
          {step === 1 && (
            <Card className="w-full max-w-md bg-white text-black rounded-2xl shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">
                  Bank Login
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Secure access to your account
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
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
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-black focus-visible:ring-black"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setStep(2)}
                  >
                    Forgot password
                  </button>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white hover:bg-neutral-800"
                  >
                    {loading ? "Signing in..." : "Log In"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="w-full text-sm text-center text-gray-600 hover:text-black transition"
                  >
                    ← Back to Home
                  </button>
                  <p className="text-center text-xs text-gray-500">
                    Secured by Alice
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
          {step === 2 && <ForgotPassword />}
        </div>
      </div>
    </div>
  );
}
