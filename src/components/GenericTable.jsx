import React from "react";

export default function GenericTable({ columns, data, renderRow }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-sm border border-gray-100 font-['Helvetica']">
        <thead className="bg-[#3BCBBE] text-white text-left">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}