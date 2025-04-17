// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientWrapper } from "./components/ClientWrapper";
import { LayoutShell } from "./components/LayoutShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Banca Digital",
  description: "Lafise Bancentro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientWrapper>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ClientWrapper>
      </body>
    </html>
  );
}
