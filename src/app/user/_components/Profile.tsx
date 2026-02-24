"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import AccountSummary from "./AccountSummary";
import PersonalInformation from "./PersonalInformation";
import { apiGetAuth, apiPutAuth } from "@/lib/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }
      try {
        const result = await apiGetAuth<{
          user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            avatarUrl: string | null;
            nationalId: string | null;
            kycStatus: KycStatus;
            addressLine1: string | null;
            addressLine2: string | null;
            city: string | null;
            country: string | null;
            postalCode: string | null;
            preferredCurrency: "MNT" | "USD" | "EUR";
            marketingOptIn: boolean;
            twoFactorEnabled: boolean;
          };
        }>("/me", token);

        const dbProfile: ProfileData = {
          ...initialProfile,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          phone: result.user.phone ?? "",
          avatarUrl: result.user.avatarUrl || "/mulenpic.PNG",
          nationalId: result.user.nationalId ?? "",
          kycStatus: result.user.kycStatus ?? "Pending",
          addressLine1: result.user.addressLine1 ?? "",
          addressLine2: result.user.addressLine2 ?? "",
          city: result.user.city ?? "",
          country: result.user.country ?? "",
          postalCode: result.user.postalCode ?? "",
          preferredCurrency: result.user.preferredCurrency ?? "MNT",
          marketingOptIn: result.user.marketingOptIn ?? false,
          twoFactorEnabled: result.user.twoFactorEnabled ?? true,
          displayName: `${result.user.firstName} ${result.user.lastName}`.trim(),
        };

        setProfile(dbProfile);
        setDraft(dbProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

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
    setError(null);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      const result = await apiPutAuth<{
        user: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          phone: string | null;
          avatarUrl: string | null;
          nationalId: string | null;
          kycStatus: KycStatus;
          addressLine1: string | null;
          addressLine2: string | null;
          city: string | null;
          country: string | null;
          postalCode: string | null;
          preferredCurrency: "USD" | "EUR";
          marketingOptIn: boolean;
          twoFactorEnabled: boolean;
        };
      }>(
        "/me/profile",
        {
          firstName: draft.firstName,
          lastName: draft.lastName,
          email: draft.email,
          phone: draft.phone,
          avatarUrl: draft.avatarUrl,
          nationalId: draft.nationalId,
          kycStatus: draft.kycStatus,
          addressLine1: draft.addressLine1,
          addressLine2: draft.addressLine2,
          city: draft.city,
          country: draft.country,
          postalCode: draft.postalCode,
          preferredCurrency: draft.preferredCurrency,
          marketingOptIn: draft.marketingOptIn,
          twoFactorEnabled: draft.twoFactorEnabled,
        },
        token,
      );

      const updated: ProfileData = {
        ...draft,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        phone: result.user.phone ?? "",
        avatarUrl: result.user.avatarUrl || "/mulenpic.PNG",
        nationalId: result.user.nationalId ?? "",
        kycStatus: result.user.kycStatus ?? "Pending",
        addressLine1: result.user.addressLine1 ?? "",
        addressLine2: result.user.addressLine2 ?? "",
        city: result.user.city ?? "",
        country: result.user.country ?? "",
        postalCode: result.user.postalCode ?? "",
        preferredCurrency: result.user.preferredCurrency ?? "MNT",
        marketingOptIn: result.user.marketingOptIn ?? false,
        twoFactorEnabled: result.user.twoFactorEnabled ?? true,
        displayName: `${result.user.firstName} ${result.user.lastName}`.trim(),
      };

      setProfile(updated);
      setDraft(updated);
      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          ...(JSON.parse(localStorage.getItem("auth_user") || "{}") as object),
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          phone: result.user.phone,
          avatarUrl: result.user.avatarUrl || "/mulenpic.PNG",
        }),
      );
      window.dispatchEvent(new Event("auth-user-updated"));
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile");
    } finally {
      setSaving(false);
    }
  };

  const onChange = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => {
    setDraft((p) => ({ ...p, [key]: value }));
  };

  const data = editing ? draft : profile;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-sm text-white/70">Loading profile...</p>
        </div>
      </div>
    );
  }

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

        {error && <p className="mt-6 text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}
