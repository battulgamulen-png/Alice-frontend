"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGetAuth, apiPostAuth } from "@/lib/api";

type Card = {
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

export default function Transfer() {
  const [cards, setCards] = useState<Card[]>([]);
  const [fromCardId, setFromCardId] = useState("");
  const [toNumber, setToNumber] = useState("");
  const [toCardInfo, setToCardInfo] = useState<{
    id: string;
    holderName: string;
    number: string;
    isOwnCard: boolean;
  } | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fromCard = useMemo(
    () => cards.find((card) => card.id === fromCardId) ?? cards[0] ?? null,
    [cards, fromCardId],
  );
  useEffect(() => {
    const loadCards = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }

      try {
        const data = await apiGetAuth<{ cards: Card[] }>("/me/cards", token);
        setCards(data.cards);
        if (data.cards.length > 0) {
          setFromCardId(data.cards[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load cards");
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const normalized = toNumber.replace(/\D/g, "");
    setToCardInfo(null);

    if (!token) return;
    if (!/^\d{8}$/.test(normalized)) return;

    const timer = setTimeout(async () => {
      setLookupLoading(true);
      try {
        const data = await apiGetAuth<{
          card: {
            id: string;
            holderName: string;
            number: string;
            isOwnCard: boolean;
          };
        }>(`/me/cards/lookup?number=${normalized}`, token);
        setToCardInfo(data.card);
      } catch {
        setToCardInfo(null);
      } finally {
        setLookupLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [toNumber]);

  const handleTransfer = async () => {
    setError(null);
    setSuccess(null);

    if (!fromCard) return setError("From card is required");
    const normalized = toNumber.replace(/\D/g, "");
    if (!/^\d{8}$/.test(normalized)) {
      return setError("Recipient card number must be exactly 8 digits");
    }
    if (!toCardInfo) return setError("Recipient account not found");
    if (toCardInfo.isOwnCard) return setError("Cannot transfer to your own card");
    if (amount === "" || amount <= 0) return setError("Enter valid amount");

    const token = localStorage.getItem("auth_token");
    if (!token) return setError("Unauthorized");

    setSubmitting(true);
    try {
      const data = await apiPostAuth<{ cards: Card[] }>(
        "/me/cards/transfer",
        {
          fromCardNumber: fromCard.number,
          toCardNumber: toCardInfo.number,
          toCardHolder: toCardInfo.holderName,
          amountUsd: amount,
        },
        token,
      );

      setCards(data.cards);
      setSuccess("Transfer completed");
      setAmount("");
      setToNumber("");
      setToCardInfo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white text-black rounded-3xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">Card To Card Transfer</h2>

        {loading && <p className="text-sm text-gray-600 mb-4">Loading cards...</p>}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">From Card</label>
          <select
            value={fromCard?.id ?? ""}
            onChange={(e) => setFromCardId(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-100"
            disabled={loading || cards.length === 0}
          >
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {formatCardNumber(card.number)} · {card.holderName} ·{" "}
                {formatUsd(card.balanceUsdCents)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">To Card Number</label>
          <input
            type="text"
            placeholder="12345678"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value.replace(/\D/g, "").slice(0, 8))}
          />
          {lookupLoading && (
            <p className="mt-2 text-xs text-gray-500">Checking account...</p>
          )}
          {toCardInfo && !toCardInfo.isOwnCard && (
            <p className="mt-2 text-xs text-green-700">
              Account found: {toCardInfo.holderName}
            </p>
          )}
          {toCardInfo?.isOwnCard && (
            <p className="mt-2 text-xs text-red-600">
              This is your own card. Enter another account.
            </p>
          )}
          {!lookupLoading && /^\d{8}$/.test(toNumber) && !toCardInfo && (
            <p className="mt-2 text-xs text-red-600">Account not found</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Amount (USD)</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => {
              const v = e.target.value;
              setAmount(v === "" ? "" : Number(v));
            }}
          />
        </div>

        <button
          onClick={handleTransfer}
          disabled={submitting || cards.length < 1}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
        >
          {submitting ? "Processing..." : "Transfer"}
        </button>

        {cards.length < 1 && (
          <p className="mt-3 text-sm text-gray-600">
            Transfer хийхийн тулд эхлээд өөрийн картаа үүсгэнэ үү.
          </p>
        )}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-700">{success}</p>}
      </div>
    </div>
  );
}
