"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiDeleteAuth, apiGetAuth, apiPutAuth } from "@/lib/api";

type SettingsProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatarUrl: string | null;
  nationalId: string | null;
  kycStatus: "Not Verified" | "Pending" | "Verified";
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  preferredCurrency: "MNT" | "USD" | "EUR";
  marketingOptIn: boolean;
  twoFactorEnabled: boolean;
  language: "MN" | "EN";
  loginAlerts: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
};

export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [profile, setProfile] = useState<SettingsProfile | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const result = await apiGetAuth<{ user: SettingsProfile }>("/me", token);
        setProfile(result.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load settings");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [router]);

  const hasPasswordErrors = useMemo(() => {
    if (!currentPassword || !newPassword || !confirmPassword) return true;
    if (newPassword.length < 6) return true;
    if (newPassword !== confirmPassword) return true;
    return false;
  }, [currentPassword, newPassword, confirmPassword]);

  const updateField = <K extends keyof SettingsProfile>(key: K, value: SettingsProfile[K]) => {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const saveSettings = async () => {
    if (!profile) return;
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await apiPutAuth<{ user: SettingsProfile }>(
        "/me/profile",
        profile,
        token,
      );
      setProfile(result.user);
      setSuccess("Settings saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }
    if (hasPasswordErrors) return;

    setChangingPassword(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await apiPutAuth<{ message: string }>(
        "/me/password",
        { currentPassword, newPassword },
        token,
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const deactivateAccount = async () => {
    const confirmed = window.confirm("Account-аа устгах уу? Буцаах боломжгүй.");
    if (!confirmed) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    setError(null);
    setSuccess(null);
    try {
      await apiDeleteAuth<{ message: string }>("/me", token);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not deactivate account");
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-white/70">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-white/60">
            Аюулгүй байдал, мэдэгдэл болон системийн тохиргоо
          </p>
        </div>

        <Card className="rounded-2xl bg-white text-black">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Аккаунтын хамгаалалт</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-black/60">
                  Нэвтрэх үед нэмэлт баталгаажуулалт
                </p>
              </div>
              <Switch
                checked={profile.twoFactorEnabled}
                onCheckedChange={(v) => updateField("twoFactorEnabled", v)}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Login alerts</p>
                <p className="text-sm text-black/60">
                  Шинэ төхөөрөмжөөс орвол мэдэгдэх
                </p>
              </div>
              <Switch
                checked={profile.loginAlerts}
                onCheckedChange={(v) => updateField("loginAlerts", v)}
              />
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <p className="font-medium">Change password</p>
              <div className="grid gap-3 md:grid-cols-3">
                <Input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={changePassword}
                disabled={changingPassword || hasPasswordErrors}
              >
                {changingPassword ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white text-black">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Мэдэгдлийн тохиргоо</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-black/60">
                  Гүйлгээ, аюулгүй байдлын мэдээлэл
                </p>
              </div>
              <Switch
                checked={profile.emailNotifications}
                onCheckedChange={(v) => updateField("emailNotifications", v)}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">SMS notifications</p>
                <p className="text-sm text-black/60">Утас руу мессежээр</p>
              </div>
              <Switch
                checked={profile.smsNotifications}
                onCheckedChange={(v) => updateField("smsNotifications", v)}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Marketing emails</p>
                <p className="text-sm text-black/60">Promo email авах</p>
              </div>
              <Switch
                checked={profile.marketingOptIn}
                onCheckedChange={(v) => updateField("marketingOptIn", v)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white text-black">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Хэл, валютын тохиргоо</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input
                value={profile.language}
                onChange={(e) =>
                  updateField(
                    "language",
                    e.target.value.toUpperCase() === "EN" ? "EN" : "MN",
                  )
                }
              />
              <p className="text-xs text-black/60">MN / EN</p>
            </div>

            <div className="space-y-2">
              <Label>Default currency</Label>
              <Input
                value={profile.preferredCurrency}
                onChange={(e) => {
                  const v = e.target.value.toUpperCase();
                  updateField(
                    "preferredCurrency",
                    v === "USD" || v === "EUR" ? v : "MNT",
                  );
                }}
              />
              <p className="text-xs text-black/60">MNT / USD / EUR</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-red-200 bg-red-50 text-red-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Danger zone <Badge variant="destructive">Careful</Badge>
            </CardTitle>
            <CardDescription>Эдгээр үйлдэл буцаагдахгүй</CardDescription>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium">Deactivate account</p>
              <p className="text-sm text-red-700">
                Аккаунтыг бүр мөсөн устгана
              </p>
            </div>
            <Button variant="destructive" onClick={deactivateAccount}>
              Deactivate
            </Button>
          </CardContent>
        </Card>

        {(error || success) && (
          <div className="text-sm">
            {error && <p className="text-red-400">{error}</p>}
            {success && <p className="text-green-400">{success}</p>}
          </div>
        )}

        <Separator />

        <div className="flex justify-end">
          <Button onClick={saveSettings} disabled={saving} className="rounded-xl">
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
