import { motion } from "framer-motion";

const transactions = [
  { id: 1, desc: "Starbucks", amount: -5.75, date: "Feb 1" },
  { id: 2, desc: "Salary", amount: 2500, date: "Jan 31" },
  { id: 3, desc: "Netflix", amount: -15.99, date: "Jan 30" },
  { id: 4, desc: "Grocery", amount: -120.45, date: "Jan 29" },
];

export default function Transactions() {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((a, b) => a + Math.abs(b.amount), 0);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-md bg-white text-black rounded-3xl shadow-xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

        {/* summary */}
        <div className="flex justify-between mb-5 text-sm">
          <span className="text-green-600 font-medium">
            + ${income.toFixed(2)}
          </span>
          <span className="text-red-500 font-medium">
            - ${expense.toFixed(2)}
          </span>
        </div>

        <ul className="space-y-3">
          {transactions.map((tx, i) => (
            <motion.li
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center rounded-xl px-3 py-2 hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-medium">{tx.desc}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>

              <span
                className={`font-semibold ${
                  tx.amount < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
