"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { KycStatus, ProfileData } from "./Profile";

type Errors = Partial<Record<keyof ProfileData, string>>;

type Props = {
  data: ProfileData;
  editing: boolean;
  errors: Errors;
  hasErrors: boolean;
  kycBadgeVariant: (status: KycStatus) =>
    | "default"
    | "secondary"
    | "outline";
  onChange: (
    key: keyof ProfileData,
    value: ProfileData[keyof ProfileData],
  ) => void;
};

export default function PersonalInformation({
  data,
  editing,
  errors,
  hasErrors,
  kycBadgeVariant,
  onChange,
}: Props) {
  return (
    <Card className="bg-white text-black rounded-2xl lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Personal Information</CardTitle>
        <CardDescription>Эндээс хувийн мэдээллээ шинэчилнэ</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-black/10 p-4">
          <p className="text-sm font-semibold mb-3">Avatar & Name</p>

          <div className="flex items-center gap-4">
            <img
              src={data.avatarUrl}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border"
            />

            <div className="flex-1 grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Display name</Label>
                <Input
                  value={data.displayName}
                  disabled={!editing}
                  onChange={(e) => onChange("displayName", e.target.value)}
                  className="rounded-2xl"
                  placeholder="Mulen Battulga"
                />
                {editing && errors.displayName && (
                  <p className="text-xs text-red-600">{errors.displayName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Avatar зураг</Label>
                <Input
                  type="file"
                  accept="image/*"
                  disabled={!editing}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") {
                        onChange("avatarUrl", reader.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="rounded-2xl"
                />
                <p className="text-xs text-black/50">
                  Local файлаас зураг сонгоно (PNG/JPG).
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold mb-3">Basic</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>First name</Label>
              <Input
                value={data.firstName}
                disabled={!editing}
                onChange={(e) => onChange("firstName", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Last name</Label>
              <Input
                value={data.lastName}
                disabled={!editing}
                onChange={(e) => onChange("lastName", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={data.email}
                disabled={!editing}
                onChange={(e) => onChange("email", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={data.phone}
                disabled={!editing}
                onChange={(e) => onChange("phone", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.phone && (
                <p className="text-xs text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">KYC</p>
            <Badge
              variant={kycBadgeVariant(data.kycStatus)}
              className="rounded-xl"
            >
              {data.kycStatus}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>National ID</Label>
              <Input
                value={data.nationalId}
                disabled={!editing}
                onChange={(e) => onChange("nationalId", e.target.value)}
                className="rounded-2xl"
              />
              <p className="text-xs text-black/50">
                (Жишээ) Регистр / ID — банкны шаардлагаас шалтгаалж өөр
                байж болно
              </p>
            </div>

            <div className="space-y-2">
              <Label>KYC status</Label>
              <Input
                value={data.kycStatus}
                disabled
                className="rounded-2xl bg-black/5"
              />
              <p className="text-xs text-black/50">
                Статусыг админ/баталгаажуулалтын систем өөрчилнө
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold mb-3">Address</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>Address line 1</Label>
              <Input
                value={data.addressLine1}
                disabled={!editing}
                onChange={(e) => onChange("addressLine1", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.addressLine1 && (
                <p className="text-xs text-red-600">{errors.addressLine1}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Address line 2</Label>
              <Input
                value={data.addressLine2}
                disabled={!editing}
                onChange={(e) => onChange("addressLine2", e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={data.city}
                disabled={!editing}
                onChange={(e) => onChange("city", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.city && (
                <p className="text-xs text-red-600">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                value={data.country}
                disabled={!editing}
                onChange={(e) => onChange("country", e.target.value)}
                className="rounded-2xl"
              />
              {editing && errors.country && (
                <p className="text-xs text-red-600">{errors.country}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Postal code</Label>
              <Input
                value={data.postalCode}
                disabled={!editing}
                onChange={(e) => onChange("postalCode", e.target.value)}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold mb-3">Preferences & Security</p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">2FA</p>
                <p className="text-sm text-black/60">
                  Two-factor authentication
                </p>
              </div>
              <Switch
                checked={data.twoFactorEnabled}
                disabled={!editing}
                onCheckedChange={(v) => onChange("twoFactorEnabled", v)}
              />
            </div>

            <div className="rounded-2xl border border-black/10 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing</p>
                <p className="text-sm text-black/60">Promo email авах</p>
              </div>
              <Switch
                checked={data.marketingOptIn}
                disabled={!editing}
                onCheckedChange={(v) => onChange("marketingOptIn", v)}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred currency</Label>
              <Input
                value={data.preferredCurrency}
                disabled={!editing}
                onChange={(e) =>
                  onChange(
                    "preferredCurrency",
                    (e.target.value.toUpperCase() as ProfileData["preferredCurrency"]) ||
                      "MNT",
                  )
                }
                className="rounded-2xl"
              />
              <p className="text-xs text-black/50">MNT / USD / EUR (жишээ)</p>
            </div>
          </div>

          {editing && hasErrors && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Зарим талбар дутуу/буруу байна. Улаан тэмдэглэлтэй хэсгийг
              засаад Save дарна уу.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
