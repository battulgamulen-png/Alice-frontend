"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BankCard = {
  id: string;
  holder: string;
  number: string;
  expiry: string;
  cvc: string;
  balance: string;
};

const emptyCard: BankCard = {
  id: "",
  holder: "",
  number: "",
  expiry: "",
  cvc: "",
  balance: "",
};

type Tx = {
  id: string;
  cardId: string;
  desc: string;
  amount: number;
  date: string;
};

const cardTransactions: Tx[] = [
  { id: "t1", cardId: "1", desc: "Starbucks", amount: -5.75, date: "Feb 1" },
  { id: "t2", cardId: "1", desc: "Salary", amount: 2500, date: "Jan 31" },
  { id: "t3", cardId: "1", desc: "Netflix", amount: -15.99, date: "Jan 30" },
  { id: "t4", cardId: "1", desc: "Grocery", amount: -120.45, date: "Jan 29" },
];

export default function CardUser() {
  const [cards, setCards] = useState<BankCard[]>([
    {
      id: "1",
      holder: "Mulen Battulga",
      number: "4242 4242 4242 9012",
      expiry: "12/26",
      cvc: "123",
      balance: "$12,345.67",
    },
  ]);

  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState<BankCard>(emptyCard);
  const [activeId, setActiveId] = useState<string>(cards[0]?.id ?? "");
  const [toUser, setToUser] = useState({ name: "", number: "" });
  const [amount, setAmount] = useState<number | "">("");

  const activeCard = useMemo(
    () => cards.find((c) => c.id === activeId) ?? cards[0],
    [activeId, cards],
  );

  const openAdd = () => {
    setCurrent({ ...emptyCard, id: crypto.randomUUID() });
    setEditing(true);
  };

  const openEdit = (card: BankCard) => {
    setCurrent(card);
    setEditing(true);
  };

  const saveCard = () => {
    setCards((prev) => {
      const exists = prev.find((c) => c.id === current.id);
      if (exists) {
        return prev.map((c) => (c.id === current.id ? current : c));
      }
      setActiveId(current.id);
      return [...prev, current];
    });
    setEditing(false);
  };

  const removeCard = (id: string) => {
    setCards((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (id === activeId) {
        setActiveId(next[0]?.id ?? "");
      }
      return next;
    });
  };

  const handleTransfer = () => {
    if (!activeCard) return;
    if (amount === "" || amount <= 0) return alert("Enter valid amount");
    if (!toUser.name.trim()) return alert("Recipient name required");
    if (!toUser.number.trim())
      return alert("Recipient account number required");

    alert(
      `Transferred ${amount} from ${activeCard.holder} (${activeCard.number}) to ${toUser.name} (${toUser.number})`,
    );

    setAmount("");
    setToUser({ name: "", number: "" });
  };

  const txForActive = useMemo(
    () => cardTransactions.filter((t) => t.cardId === activeCard?.id),
    [activeCard?.id],
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Cards</h1>
          <Button onClick={openAdd} className="rounded-xl">
            + Add Card
          </Button>
        </div>

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

                  <p className="mt-6 tracking-widest text-lg">{card.number}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs opacity-70">Card Holder</p>
                      <p className="text-sm font-medium">{card.holder}</p>
                    </div>

                    <div>
                      <p className="text-xs opacity-70">Expires</p>
                      <p className="text-sm">{card.expiry}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-xl font-bold">{card.balance}</p>
                    <p className="text-sm opacity-70">CVC: •••</p>
                  </div>

                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(card);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCard(card.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white text-black p-5">
              <p className="text-sm text-black/60">Active balance</p>
              <p className="text-2xl font-semibold">
                {activeCard?.balance ?? "—"}
              </p>
              <p className="text-xs text-black/50 mt-1">
                {activeCard?.holder ?? "No card selected"}
              </p>
            </div>
          </div>
        </div>

        {/* Editor */}
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-black rounded-3xl p-6 max-w-xl mx-auto space-y-4"
          >
            <h2 className="text-lg font-semibold">
              {cards.find((c) => c.id === current.id)
                ? "Edit Card"
                : "Add Card"}
            </h2>

            <div className="space-y-2">
              <Label>Card holder</Label>
              <Input
                value={current.holder}
                onChange={(e) =>
                  setCurrent({ ...current, holder: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Card number</Label>
              <Input
                value={current.number}
                onChange={(e) =>
                  setCurrent({ ...current, number: e.target.value })
                }
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Expiry</Label>
                <Input
                  value={current.expiry}
                  onChange={(e) =>
                    setCurrent({ ...current, expiry: e.target.value })
                  }
                  placeholder="MM/YY"
                />
              </div>

              <div className="space-y-2">
                <Label>CVC</Label>
                <Input
                  type="password"
                  value={current.cvc}
                  onChange={(e) =>
                    setCurrent({ ...current, cvc: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Balance</Label>
                <Input
                  value={current.balance}
                  onChange={(e) =>
                    setCurrent({ ...current, balance: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={saveCard}>Save Card</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
