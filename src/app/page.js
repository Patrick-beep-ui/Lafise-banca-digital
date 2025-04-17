"use client";
import { useEffect, useState } from "react";
import { getUsers } from "./services/api";
import AccountCard from "./components/AccountCard";
import { History } from "./components/History";
import { TransferForm } from "./components/TransferForm";
import { useAppContext } from "./context/AppContext";

export default function UserPage() {
  //const [user, setUser] = useState(null);
  const { user } = useAppContext();
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (user && user.products.length > 0) {
      setSelectedAccount(user.products[0].id);
    }
  }, [user]);

  return (
    <section className="min-h-screen bg-black-50 p-8">
      {user ? (
        <div>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-5 w-full h-[400px]">
              <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>
              {user.products.map((account) => (
                <AccountCard key={account.id} account={account.id} />
              ))}
            </div>
            <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-5 w-full h-[400px]">
              <h2 className="text-2xl font-bold mb-0">Transferencia Rápida</h2>
              <p className="text-gray-600">Transfiere dinero entre cuentas propias</p>
              <TransferForm accounts={user.products.map((p) => p.id)} />
            </div>
          </div>

          <br />

          <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-5 w-full">
            <h2 className="text-2xl font-bold mb-4">Transacciones recientes</h2>

            {/* Render account selection buttons */}
            <div className="flex gap-2 mb-4">
              {user.products.map((account) => (
                <button
                  key={account.id}
                  className={`px-4 py-2 rounded-lg border transition ${
                    selectedAccount === account.id
                      ? "bg-[var(--greenColor)] text-white cursor-pointer"
                      : "bg-white text-gray-700 border-gray-300 cursor-pointer"
                  }`}
                  onClick={() => setSelectedAccount(account.id)}
                >
                  {account.id || ''}
                </button>
              ))}
            </div>

            {selectedAccount && <History account={selectedAccount} />}
          </div>
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </section>
  );
}
