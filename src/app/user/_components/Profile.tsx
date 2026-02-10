"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import AccountSummary from "./AccountSummary";
import PersonalInformation from "./PersonalInformation";

export type KycStatus = "Not Verified" | "Pending" | "Verified";

export type ProfileData = {
  // ✅ Added
  avatarUrl: string;
  displayName: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  nationalId: string;
  kycStatus: KycStatus;

  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postalCode: string;

  preferredCurrency: "MNT" | "USD" | "EUR";
  marketingOptIn: boolean;
  twoFactorEnabled: boolean;
};

const initialProfile: ProfileData = {
  // ✅ Added
  avatarUrl: "/mulenpic.PNG",
  displayName: "Mulen Battulga",

  firstName: "Mulen",
  lastName: "User",
  email: "mulen@bank.com",
  phone: "+976 99xxxxxx",

  nationalId: "AA12345678",
  kycStatus: "Pending",

  addressLine1: "Sukhbaatar district",
  addressLine2: "Apartment 12, Building 3",
  city: "Ulaanbaatar",
  country: "Mongolia",
  postalCode: "14200",

  preferredCurrency: "MNT",
  marketingOptIn: false,
  twoFactorEnabled: true,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function kycBadgeVariant(status: KycStatus) {
  if (status === "Verified") return "default";
  if (status === "Pending") return "secondary";
  return "outline";
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [draft, setDraft] = useState<ProfileData>(initialProfile);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof ProfileData, string>> = {};

    // ✅ Added validation

    if (!draft.firstName.trim()) e.firstName = "Нэрээ оруулна уу";
    if (!draft.lastName.trim()) e.lastName = "Овгоо оруулна уу";
    if (!draft.email.trim()) e.email = "И-мэйл оруулна уу";
    else if (!isValidEmail(draft.email))
      e.email = "И-мэйл буруу форматтай байна";
    if (!draft.phone.trim()) e.phone = "Утасны дугаар оруулна уу";
    if (!draft.addressLine1.trim()) e.addressLine1 = "Хаяг (1) шаардлагатай";
    if (!draft.city.trim()) e.city = "Хот шаардлагатай";
    if (!draft.country.trim()) e.country = "Улс шаардлагатай";

    return e;
  }, [draft]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
  };

  const save = async () => {
    if (hasErrors) return;
    setSaving(true);

    // ✅ энд API холбож болно:
    // await fetch("/api/profile", { method: "PUT", body: JSON.stringify(draft) })

    await new Promise((r) => setTimeout(r, 600)); // mock delay
    setProfile(draft);
    setEditing(false);
    setSaving(false);
  };

  const onChange = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => {
    setDraft((p) => ({ ...p, [key]: value }));
  };

  const data = editing ? draft : profile;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-white/70">
              Хувийн мэдээллээ харах, шинэчлэх, хамгаалалтын тохиргоо хийх.
            </p>
          </div>

          <div className="flex gap-2">
            {!editing ? (
              <Button onClick={startEdit} className="rounded-2xl">
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={cancelEdit}
                  className="rounded-2xl"
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={save}
                  className="rounded-2xl"
                  disabled={saving || hasErrors}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <AccountSummary
            profile={profile}
            kycBadgeVariant={kycBadgeVariant}
          />
          <PersonalInformation
            data={data}
            editing={editing}
            errors={errors}
            hasErrors={hasErrors}
            kycBadgeVariant={kycBadgeVariant}
            onChange={onChange}
          />
        </div>

        <p className="mt-6 text-xs text-white/50">
          * Энэ бол UI + local state demo. API/DB холболт нэмэх бол profile
          update endpoint хийж өгнө.
        </p>
      </div>
    </div>
  );
}
