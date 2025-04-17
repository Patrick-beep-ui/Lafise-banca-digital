import { useState, useEffect } from "react";
import { getTransactions } from "../services/api";
import { TransactionDetail } from "./TransactionDetails";

export const History = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions(account);
        setTransactions(res.data.items);
        console.log("Transactions:", res.data.items);
      } catch (error) {
        console.error("Error al obtener transacciones:", error);
      }
    };

    fetchTransactions();
  }, [account]);

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.transaction_number}
          className="flex justify-between items-center w-full bg-white rounded-lg px-6 py-4 shadow-sm cursor-pointer hover:bg-gray-50"
          onClick={() => setSelectedTransaction(tx)}
        >
          <div>
            <p className="font-semibold">{tx.description}</p>
            <p className="text-sm text-gray-500">{new Date(tx.transaction_date).toLocaleString()}</p>
          </div>

          <div className={`text-right font-bold ${tx.transaction_type === "Credit" ? "text-green-600" : "text-red-600"}`}>
            {tx.transaction_type === "Credit" ? "+" : "-"}${tx.amount.value.toFixed(2)} {tx.amount.currency}
          </div>
        </div>
      ))}

      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};
