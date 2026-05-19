export default function Alert({ type = "info", message, onClose }) {
  const types = {
    success: "bg-[#48BB78]/10 text-[#48BB78] border-[#48BB78]/30",
    error: "bg-[#E53E3E]/10 text-[#E53E3E] border-[#E53E3E]/30",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    info: "bg-[#3BCBBE]/10 text-[#3BCBBE] border-[#3BCBBE]/30",
  };
  return (
    <div className={`${types[type]} p-4 rounded-[12px] border mb-4 flex justify-between items-center`}>
      <span className="text-sm font-bold">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      )}
    </div>
  );
}