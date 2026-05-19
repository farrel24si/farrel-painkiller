export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-[#3BCBBE] text-white",
    success: "bg-[#48BB78] text-white",
    danger: "bg-[#E53E3E] text-white",
    warning: "bg-yellow-400 text-white",
  };
  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-bold font-['Helvetica'] shadow-sm`}>
      {children}
    </span>
  );
}