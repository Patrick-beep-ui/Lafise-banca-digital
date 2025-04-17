"use client";

import { useState, useEffect } from "react";
import { History } from "../components/History";

export default function HistoryPage() {
    const [user, setUser] = useState(null); // State to store user data
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        // Check if the user is stored in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setSelectedAccount(JSON.parse(storedUser).products[0].id); 
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <section className="h-screen p-8 w-full">
            <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-5 w-full">
                <h2 className="text-2xl font-bold mb-4">Transacciones</h2>

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
        </section>
    );
}
