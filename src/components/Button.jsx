export default function Button({ children, type = "primary", onClick, ...props }) {
  const types = {
    primary: "bg-[#3BCBBE] text-white hover:bg-[#FFFFFF] hover:text-[#3BCBBE]",
    success: "bg-[#48BB78] text-white hover:bg-[#FFFFFF] hover:text-[#48BB78]",
    danger: "bg-[#E53E3E] text-white hover:bg-[#FFFFFF] hover:text-[#E53E3E]",
    dark: "bg-gradient-to-br from-[#313860] to-[#151928] text-white hover:bg-[#FFFFFF] hover:text-[#313860]",
  };
  return (
    <button onClick={onClick} className={`${types[type]} p-[18px] rounded-[15px] font-bold font-['Helvetica'] shadow-sm hover:shadow-md active:bg-[#FFFFFF] transition-all flex items-center justify-center gap-2`} {...props}>
      {children}
    </button>
  );
}