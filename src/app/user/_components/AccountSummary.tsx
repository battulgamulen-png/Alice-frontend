"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { KycStatus, ProfileData } from "./Profile";

type Props = {
  profile: ProfileData;
  kycBadgeVariant: (status: KycStatus) =>
    | "default"
    | "secondary"
    | "outline";
};

export default function AccountSummary({ profile, kycBadgeVariant }: Props) {
  return (
    <Card className="bg-white text-black rounded-2xl lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Account Summary</CardTitle>
        <CardDescription>Таны аккаунтын үндсэн мэдээлэл</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 rounded-2xl border border-black/10 p-4">
          <img
            src={profile.avatarUrl || "/userzurag.jpg"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-black/60">Display name</p>
            <p className="text-lg font-semibold leading-tight">
              {profile.displayName}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 p-4">
          <p className="text-sm text-black/60">Full name</p>
          <p className="font-semibold">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="mt-2 text-sm text-black/60">Email</p>
          <p className="text-sm">{profile.email}</p>
          <p className="mt-2 text-sm text-black/60">Phone</p>
          <p className="text-sm">{profile.phone}</p>
        </div>

        <div className="rounded-2xl border border-black/10 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-black/60">KYC Status</p>
            <p className="text-sm">Иргэний баталгаажуулалт</p>
          </div>
          <Badge
            variant={kycBadgeVariant(profile.kycStatus)}
            className="rounded-xl"
          >
            {profile.kycStatus}
          </Badge>
        </div>

        <div className="rounded-2xl border border-black/10 p-4">
          <p className="text-sm text-black/60">Preferred currency</p>
          <p className="font-semibold">{profile.preferredCurrency}</p>
        </div>
      </CardContent>
    </Card>
  );
}
