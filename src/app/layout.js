import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "./components/MainNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Banca Digital",
  description: "Lafise Bancentro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <header className="sticky top-0 z-40 bg-background">
              <div className="container flex h-16 items-center justify-between py-4">
                <MainNav />
              </div>
            </header>
         <main className="flex-1 container">{children}</main>
         <footer className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Banco Digital. Todos los derechos reservados.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
