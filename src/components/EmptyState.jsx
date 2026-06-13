import React from "react";
import { FaDatabase } from "react-icons/fa";

export default function EmptyState({ text = "Belum ada data" }) {
  return (
    <div className="p-10 text-center text-gray-400 font-['Helvetica'] bg-white rounded-[15px] border border-gray-100 shadow-sm">
      <div className="flex justify-center text-4xl mb-3 text-gray-300">
        <FaDatabase />
      </div>
      <p className="font-bold">{text}</p>
    </div>
  );
}