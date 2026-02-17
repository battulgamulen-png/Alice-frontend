"use client";

import { useEffect, useRef, useState } from "react";

type Account = {
  id: string;
  name: string;
  number: string;
  balance?: string;
};

type Recipient = {
  name: string;
  number: string;
};

const accounts: Account[] = [
  {
    id: "1",
    name: "Main Account",
    number: "**** 9012",
    balance: "₮12,345,000",
  },
];

export default function Transfer() {
  const [fromAccount, setFromAccount] = useState<Account>(accounts[0]);
  const [toUser, setToUser] = useState<Recipient>({ name: "", number: "" });
  const [amount, setAmount] = useState<number | "">("");

  // dropdown state
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleTransfer = () => {
    if (amount === "" || amount <= 0) return alert("Enter valid amount");
    if (!toUser.name.trim()) return alert("Recipient name required");
    if (!toUser.number.trim())
      return alert("Recipient account number required");

    alert(
      `Transferred ${amount} from ${fromAccount.name} (${fromAccount.number}) to ${toUser.name} (${toUser.number})`,
    );

    setAmount("");
    setToUser({ name: "", number: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white text-black rounded-3xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">Bank Transfer</h2>

        {/* From (Selectable) */}
        <div className="mb-4 relative" ref={ddRef}>
          <label className="block text-gray-600 mb-1">From Account</label>

          <div
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-between p-3 border rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
          >
            <div>
              <p className="font-medium">{fromAccount.name}</p>
              <p className="text-sm text-gray-500">
                {fromAccount.number}
                {fromAccount.balance ? ` · ${fromAccount.balance}` : ""}
              </p>
            </div>
            <span className="text-gray-500 text-sm">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
              {accounts.map((acc) => (
                <button
                  type="button"
                  key={acc.id}
                  onClick={() => {
                    setFromAccount(acc);
                    setOpen(false);
                  }}
                  className={`w-full text-left p-3 hover:bg-gray-50 transition ${
                    acc.id === fromAccount.id ? "bg-gray-100" : ""
                  }`}
                >
                  <p className="font-medium">{acc.name}</p>
                  <p className="text-sm text-gray-500">
                    {acc.number}
                    {acc.balance ? ` · ${acc.balance}` : ""}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">To Account</label>
          <div className="flex flex-col gap-2 p-3 border rounded-lg bg-gray-100">
            <input
              type="text"
              placeholder="Recipient Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={toUser.name}
              onChange={(e) =>
                setToUser((p) => ({ ...p, name: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Recipient Bank number"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={toUser.number}
              onChange={(e) =>
                setToUser((p) => ({ ...p, number: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Amount</label>
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

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}
