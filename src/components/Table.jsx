export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto bg-[#FFFFFF] rounded-[15px] shadow-sm font-['Helvetica']">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {headers.map((header, index) => (
              <th key={index} className="pb-3 pt-4 px-4 text-xs font-bold text-gray-400 uppercase">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm font-bold text-gray-800">
          {children}
        </tbody>
      </table>
    </div>
  );
}