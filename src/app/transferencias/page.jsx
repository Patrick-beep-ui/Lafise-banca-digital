"use client";

import { useState, useEffect } from "react";
import { TransferForm } from "../components/TransferForm";

export default function TransferPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return(
        <>
            <section className="flex justify-center h-screen p-8 w-full h-full bg-white">
                <div className="flex flex-col space-y-4 bg-white shadow-md rounded-lg p-8 w-[500px] max-w-3xl border border-gray-300 h-[400px]">
                    <h2 className="text-3xl font-bold mb-4">Datos de Transferencia</h2>
                    <div className="gap-2 mb-4">
                        <TransferForm accounts={user?.products?.map((p) => p.id)} state={'link'} />
                    </div>
                </div>
            </section>


        </>
    )
}