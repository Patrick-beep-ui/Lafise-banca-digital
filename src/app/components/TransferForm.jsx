import { useState, useCallback, useEffect } from "react";
import { createTransaction, getAccounts } from "../services/api";

export const TransferForm = ({ accounts = [], state = '' }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [color, setColor] = useState("bg-green-500");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setShowPopup(false);

    // Validación de campos obligatorios
    if (!origin || !destination || !amount) {
      setMessage("Por favor, complete todos los campos obligatorios.");
      setShowPopup(true);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        origin,
        destination,
        amount: {
          currency: "NIO",
          value: parseFloat(amount),
        },
      };

      if (payload.amount.value > selectedAccount.balance) {
        setMessage("El monto excede el saldo disponible.");
        setColor("bg-red-500");
        setShowPopup(true);
        return;
      }

      const response = await createTransaction(payload);
      setMessage(`Transferencia realizada con éxito. N°: ${response.data.transaction_number}`);
      setShowPopup(true);

      setOrigin("");
      setDestination("");
      setAmount("");
    } catch (error) {
      console.error("Error en la transferencia:", error);
      setMessage("Hubo un error al realizar la transferencia.");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  }, [origin, destination, amount]);

  // Auto-hide popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const getAccountData = useCallback(async (accountId) => {
    try {
      const res = await getAccounts(accountId);
      setSelectedAccount(res.data);
    }
    catch (error) {
      console.error("Error fetching account data:", error);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 transfer-form">
        <div className="flex flex-col">
          <label htmlFor="origin" className="text-sm text-gray-700 font-medium">Desde:</label>
          <select
            id="origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              getAccountData(e.target.value); 
            }}
            className="mt-1 border rounded-md px-3 py-2 w-full"
            required
          >
            <option value="">Selecciona una cuenta</option>
            {accounts.map((acc) => (
              <option key={acc} value={acc}>{acc}</option>
            ))}
          </select>
          {selectedAccount && state === 'link' && (
            <div>
              <p className="text-sm text-gray-500 mt-2">{selectedAccount.alias}</p>
              <p className="text-sm text-gray-500">{parseFloat(selectedAccount.balance).toLocaleString("es-ES", {
                style: "currency",
                currency: selectedAccount.currency || "USD",
              })}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="destination" className="text-sm text-gray-700 font-medium">Hacia:</label>
          {state === 'link' ? (
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 border rounded-md px-3 py-2 w-full"
              placeholder="Ingresa el número de cuenta"
              required
            />
          ) : (
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 border rounded-md px-3 py-2 w-full"
              required
            >
              <option value="">Selecciona una cuenta</option>
              {accounts
                .filter((acc) => acc !== origin)
                .map((acc) => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
            </select>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm text-gray-700 font-medium">Monto (NIO):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 border rounded-md px-3 py-2 w-full"
            min="1"
            step="0.01"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--greenColor)] text-white px-4 py-2 rounded-md hover:bg-[var(--greenColorHover)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Procesando..." : "Transferir"}
        </button>
      </form>

      {/* Toast Popup */}
      {showPopup && (
        <div className={`fixed bottom-4 right-4 ${color} text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in`}>
          {message}
        </div>
      )}

      {/* Popup simple animation */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
};
