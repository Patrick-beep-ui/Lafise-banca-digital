"use client";
import { usePathname } from "next/navigation";
import { MainNav } from "../components/MainNav";
import { useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import { useAppContext } from "../context/AppContext";

export function LayoutShell({ children }) {
    const { user } = useAppContext();
    const pathname = usePathname();
    const isAuthPage = pathname === "/login";

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            //setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }, []);

    const login = useCallback(() => {
        window.location.href = "/login";  
    }, []);

    return (
        <>
            {/* only render header/nav if NOT on /login */}
            {!isAuthPage && (
                <header className="sticky top-0 z-40 bg-background">
                    <div className="container h-11 bg-[var(--greenColor)]">
                        <div className="container flex h-10 items-center justify-between py-4">
                            <div className="flex items-center gap-2">
                                {user?.profile_photo && (
                                    <div className="flex items-center">
                                        <Image
                                            src={user.profile_photo}
                                            alt="Foto de perfil"
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-white ml-5"
                                        />
                                        <p className="ml-4 text-white">{user.full_name}</p>
                                    </div>
                                )}
                            </div>
                            <button
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-200 shadow-md backdrop-blur-md mr-5 cursor-pointer"
                                onClick={user ? logout : login}  // Dependiendo de si hay usuario, llamar a logout o login
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                                    />
                                </svg>
                                {user ? "Cerrar sesión" : "Iniciar sesión"}
                            </button>
                        </div>
                    </div>

                    <div className="container flex h-16 items-center justify-between py-4">
                        <MainNav />
                    </div>
                </header>
            )}

            <main className={`flex-1 container ${isAuthPage ? "flex items-center justify-center min-h-screen" : ""}`}>
                {children}
            </main>

            {/* only render footer if NOT on /login */}
            {!isAuthPage && (
                <footer className="border-t py-1">
                    <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
                        <p className="text-center text-sm text-muted-foreground md:text-left">
                            &copy; {new Date().getFullYear()} Banco Digital. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>
            )}
        </>
    );
}
