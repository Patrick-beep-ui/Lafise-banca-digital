// app/components/LayoutShell.tsx
"use client";
import { usePathname } from "next/navigation";
import { MainNav } from "../components/MainNav";
import { useEffect, useState } from "react";

export function LayoutShell({ children }) {
    const [user, setUser] = useState(null);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  useEffect(() => {

  }, [])

  return (
    <>
      {/* only render header/nav if NOT on /login */}
      {!isAuthPage && (
        <header className="sticky top-0 z-40 bg-background">
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
          <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Banco Digital. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      )}
    </>
  );
}
