import { useState, useCallback } from "react";
import axios from "axios"; 
import { createTransaction } from "../services/api";

export const TransferForm = ({ accounts = [] }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        origin,
        destination,
        amount: {
          currency: "NIO",
          value: parseFloat(amount),
        },
      };

      alert(JSON.stringify(payload));

      const response = await createTransaction(payload); 
      alert(JSON.stringify(response))
      setMessage(`Transferencia realizada con éxito. N°: ${response.data.transaction_number}`);
      setOrigin("");
      setDestination("");
      setAmount("");
    } catch (error) {
      console.error("Error en la transferencia:", error);
      setMessage("Hubo un error al realizar la transferencia.");
    } finally {
      setLoading(false);
    }
  }, [origin, destination, amount]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="origin" className="text-sm text-gray-700 font-medium">Desde:</label>
        <select
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="mt-1 border rounded-md px-3 py-2"
          required
        >
          <option value="">Selecciona una cuenta</option>
          {accounts.map((acc) => (
            <option key={acc} value={acc}>{acc}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="destination" className="text-sm text-gray-700 font-medium">Hacia:</label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 border rounded-md px-3 py-2"
          required
        >
          <option value="">Selecciona una cuenta</option>
          {accounts
            .filter((acc) => acc !== origin)
            .map((acc) => (
              <option key={acc} value={acc}>{acc}</option>
            ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="amount" className="text-sm text-gray-700 font-medium">Monto (NIO):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 border rounded-md px-3 py-2"
          min="1"
          step="0.01"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--greenColor)] text-white px-4 py-2 rounded-md hover:bg-[var(--greenColorHover)] disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Procesando..." : "Transferir"}
      </button>

      {message && (
        <div className="text-sm text-center mt-2 text-gray-800">{message}</div>
      )}
    </form>
  );
};
