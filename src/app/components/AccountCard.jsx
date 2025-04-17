import { useEffect, useState } from "react";
import { getAccounts } from "../services/api";

const AccountCard = ({ account }) => {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccounts(account);
        setAccountData(res.data);
      } catch (error) {
        console.error("Error al obtener cuenta:", error);
      }
    };

    fetchAccount();
  }, [account]);

  if (!accountData) return <p>Cargando cuenta...</p>;

  return (
    <div className="flex justify-between items-center w-full bg-white rounded-lg px-6 py-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{accountData.alias}</h3>
        <p className="text-gray-500 text-sm tracking-wide">
          {account}
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-xl font-bold text-[var(--greenColor)]">
          {parseFloat(accountData.balance).toLocaleString("es-ES", {
            style: "currency",
            currency: accountData.currency || "USD",
          })}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;
