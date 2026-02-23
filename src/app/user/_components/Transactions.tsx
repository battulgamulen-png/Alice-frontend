"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { apiGetAuth } from "@/lib/api";

type Tx = {
  id: string;
  amountUsdCents: number;
  createdAt: string;
  fromCard: {
    id: string;
    holderName: string;
    number: string;
  };
  toCard: {
    id: string;
    holderName: string;
    number: string;
  };
};

const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

const formatCardNumber = (digits: string) =>
  digits.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();

export default function Transactions() {
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }
      try {
        const data = await apiGetAuth<{ transactions: Tx[] }>(
          "/me/transactions",
          token,
        );
        setTransactions(data.transactions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load transactions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalMoved = useMemo(
    () => transactions.reduce((acc, tx) => acc + tx.amountUsdCents, 0),
    [transactions],
  );

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-2xl bg-white text-black rounded-3xl shadow-xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex justify-between mb-5 text-sm">
              <span className="text-blue-700 font-medium">
                Total moved: {formatUsd(totalMoved)}
              </span>
              <span className="text-gray-500">{transactions.length} tx</span>
            </div>

            {transactions.length === 0 ? (
              <p className="text-sm text-gray-500">No transactions yet.</p>
            ) : (
              <ul className="space-y-3">
                {transactions.map((tx, i) => (
                  <motion.li
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="rounded-xl px-3 py-3 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {formatCardNumber(tx.fromCard.number)} →{" "}
                        {formatCardNumber(tx.toCard.number)}
                      </p>
                      <span className="font-semibold text-blue-700">
                        {formatUsd(tx.amountUsdCents)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {tx.fromCard.holderName} to {tx.toCard.holderName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </motion.li>
                ))}
              </ul>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
