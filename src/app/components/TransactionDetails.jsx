import React from "react";

export const TransactionDetail = ({ transaction, onClose }) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(transaction, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction-${transaction.transaction_number}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Detalle de Transacción",
      text: `Transacción: ${transaction.description} por $${transaction.amount.value}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error al compartir:", err);
      }
    } else {
      alert("Tu navegador no soporta compartir.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-4 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">Detalle de Transacción</h2>

        <div className="space-y-2">
          <p><strong>Descripción:</strong> {transaction.description}</p>
          <p><strong>Banco:</strong> {transaction.bank_description}</p>
          <p><strong>Tipo:</strong> {transaction.transaction_type}</p>
          <p><strong>Monto:</strong> ${transaction.amount.value} {transaction.amount.currency}</p>
          <p><strong>Origen:</strong> {transaction.origin}</p>
          <p><strong>Destino:</strong> {transaction.destination}</p>
          <p><strong>Fecha:</strong> {new Date(transaction.transaction_date).toLocaleString()}</p>
        </div>

        <div className="mt-6 flex gap-4 justify-end">
          <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Exportar</button>
          <button onClick={handleShare} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Compartir</button>
        </div>
      </div>
    </div>
  );
};
