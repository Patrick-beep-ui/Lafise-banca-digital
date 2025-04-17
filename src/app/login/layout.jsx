// app/login/layout.js
export const metadata = {
    title: "Iniciar Sesión - Banca Digital",
  };
  
  export default function LoginLayout({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--greenColor)] w-full">
        {children}
      </div>
    );
  }
  