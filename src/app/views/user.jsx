"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; 
import { getUsers } from "./services/api";
import AccountCard from "../components/AccountCard";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const userId = "1134948394";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsers(userId);
        setUser(res.data);
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
          <Image
            src={user.profile_photo}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.full_name}</h1>
          <h2>Accounts</h2>
            {user.products.map((account) => (
              <div>
              <AccountCard key={account.id} account={account.id} />
              <br/>
              </div>
            ))}
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </main>
  );
}
