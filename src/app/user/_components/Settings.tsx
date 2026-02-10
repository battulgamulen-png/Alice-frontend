"use client";

import { useState } from "react";
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

export default function Settings() {
  const [saving, setSaving] = useState(false);

  // 🔐 Security
  const [twoFA, setTwoFA] = useState(true);
  const [loginAlert, setLoginAlert] = useState(true);

  // 🔔 Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  // 🌍 Preferences
  const [language, setLanguage] = useState("MN");
  const [currency, setCurrency] = useState("MNT");

  const saveSettings = async () => {
    setSaving(true);

    // энд API холбож болно
    // await fetch("/api/settings", { method: "PUT", body: JSON.stringify({...}) })

    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    alert("Settings saved (mock)");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-white/60">
            Аюулгүй байдал, мэдэгдэл болон системийн тохиргоо
          </p>
        </div>

        {/* SECURITY */}
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
              <Switch checked={twoFA} onCheckedChange={setTwoFA} />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Login alerts</p>
                <p className="text-sm text-black/60">
                  Шинэ төхөөрөмжөөс орвол мэдэгдэх
                </p>
              </div>
              <Switch checked={loginAlert} onCheckedChange={setLoginAlert} />
            </div>

            <div className="rounded-xl border p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-black/60">
                  Сүүлд шинэчилсэн: 14 хоногийн өмнө
                </p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* NOTIFICATIONS */}
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
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">SMS notifications</p>
                <p className="text-sm text-black/60">Утас руу мессежээр</p>
              </div>
              <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
            </div>
          </CardContent>
        </Card>

        {/* PREFERENCES */}
        <Card className="rounded-2xl bg-white text-black">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Хэл, валютын тохиргоо</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input
                value={language}
                onChange={(e) => setLanguage(e.target.value.toUpperCase())}
              />
              <p className="text-xs text-black/60">MN / EN</p>
            </div>

            <div className="space-y-2">
              <Label>Default currency</Label>
              <Input
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
              />
              <p className="text-xs text-black/60">MNT / USD / EUR</p>
            </div>
          </CardContent>
        </Card>

        {/* DANGER ZONE */}
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
                Аккаунтыг түр идэвхгүй болгох
              </p>
            </div>
            <Button variant="destructive">Deactivate</Button>
          </CardContent>
        </Card>

        <Separator />

        {/* SAVE */}
        <div className="flex justify-end">
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="rounded-xl"
          >
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
