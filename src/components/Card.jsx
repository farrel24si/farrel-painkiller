export default function Card({ children }) {
  return (
    <div className="bg-[#F8F9FA] p-[18px] rounded-[15px] shadow-sm hover:shadow-md hover:bg-[#FFFFFF] active:bg-[#FFFFFF] transition-all font-['Helvetica'] cursor-pointer">
      {children}
    </div>
  );
}