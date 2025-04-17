"use client";
import { useEffect, useState } from "react";
import { getUsers } from "./services/api";
import AccountCard from "./components/AccountCard";
import { History } from "./components/History";
import { TransferForm } from "./components/TransferForm";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const userId = "1134948394";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsers(userId);
        setUser(res.data);
        if (res.data?.products?.length) {
          setSelectedAccount(res.data.products[0].id); 
          setAccounts(res.data.products.map((p) => p.id));
        }

        console.log("Accounts:", accounts);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <main className="min-h-screen bg-black-50 p-8">
      {user ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-5 w-full h-[400px]">
              <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>
              {user.products.map((account) => (
                <AccountCard key={account.id} account={account.id} />
              ))}
            </div>
            <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-5 w-full ml-10 h-[400px]">
              <h2 className="text-2xl font-bold mb-0">Transferencia Rapida</h2>
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
                  {account.alias || account.account_number}
                </button>
              ))}
            </div>

            {selectedAccount && <History account={selectedAccount} />}
          </div>
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </main>
  );
}
