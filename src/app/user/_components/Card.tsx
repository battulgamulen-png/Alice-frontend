"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
      return [...prev, current];
    });
    setEditing(false);
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

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

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.03 }}
              className="relative w-full h-[220px] rounded-3xl p-5 bg-gradient-to-br from-purple-700 to-indigo-600 shadow-xl"
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

              {/* Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEdit(card)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeCard(card.id)}
                >
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
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
