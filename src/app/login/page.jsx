"use client";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAppContext();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(userId);
    setLoading(false);

    if (res.success) {
      console.log("User data", res.data);
      setError(null);
      router.push("/");
    } else {
      setError(res.message);
    }
  };

  return (
    
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>

        <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">
          ID de Usuario
        </label>
        <input
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Ej: 1134948394"
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
  );
}
