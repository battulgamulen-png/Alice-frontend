"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiGetAuth, apiPostAuth } from "@/lib/api";

type BankCard = {
  id: string;
  holderName: string;
  number: string;
  balanceUsdCents: number;
};

const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

const formatCardNumber = (digits: string) =>
  digits.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();

export default function CardUser() {
  const [cards, setCards] = useState<BankCard[]>([]);
  const [activeId, setActiveId] = useState("");
  const [holderName, setHolderName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCard = useMemo(
    () => cards.find((c) => c.id === activeId) ?? cards[0] ?? null,
    [activeId, cards],
  );

  const loadCards = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    try {
      const data = await apiGetAuth<{ cards: BankCard[] }>("/me/cards", token);
      setCards(data.cards);
      if (data.cards.length > 0) {
        setActiveId((prev) => prev || data.cards[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const createCard = async () => {
    setError(null);
    const token = localStorage.getItem("auth_token");
    if (!token) return setError("Unauthorized");
    if (!holderName.trim()) return setError("Card holder is required");
    if (!/^\d{8}$/.test(number)) return setError("Card number must be exactly 8 digits");

    setCreating(true);
    try {
      const data = await apiPostAuth<{ card: BankCard }>(
        "/me/cards",
        { holderName: holderName.trim(), number },
        token,
      );
      setCards((prev) => [...prev, data.card]);
      setActiveId(data.card.id);
      setHolderName("");
      setNumber("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create card");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Cards</h1>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {loading && <p className="text-sm text-white/70">Loading cards...</p>}

        {!loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid gap-6 md:grid-cols-2 lg:col-span-2">
              {cards.map((card) => {
                const isActive = card.id === activeCard?.id;
                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setActiveId(card.id)}
                    className={`relative w-full h-[220px] rounded-3xl p-5 shadow-xl cursor-pointer transition ${
                      isActive
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600 ring-2 ring-white/60"
                        : "bg-gradient-to-br from-purple-700 to-indigo-700"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold">Visa Classic</p>
                      <p className="text-sm opacity-80">BANK</p>
                    </div>

                    <p className="mt-6 tracking-widest text-lg">
                      {formatCardNumber(card.number)}
                    </p>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-70">Card Holder</p>
                        <p className="text-sm font-medium">{card.holderName}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-xl font-bold">
                        {formatUsd(card.balanceUsdCents)}
                      </p>
                      <p className="text-sm opacity-70">CVC: •••</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-white text-black p-5">
                <p className="text-sm text-black/60">Active balance</p>
                <p className="text-2xl font-semibold">
                  {activeCard ? formatUsd(activeCard.balanceUsdCents) : "—"}
                </p>
                <p className="text-xs text-black/50 mt-1">
                  {activeCard?.holderName ?? "No card selected"}
                </p>
              </div>

              <div className="rounded-3xl bg-white text-black p-5 space-y-3">
                <p className="text-sm font-medium">Create New Card</p>
                <Input
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="Card holder name"
                />
                <Input
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  placeholder="Card number (8 digits)"
                />
                <Button
                  onClick={createCard}
                  disabled={creating}
                  className="w-full"
                >
                  {creating ? "Creating..." : "Add Card"}
                </Button>
                <p className="text-xs text-black/60">
                  Card number must be unique and exactly 8 digits.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
