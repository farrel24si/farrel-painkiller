import React from "react";

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="p-10 text-center text-gray-500 font-['Helvetica']">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#3BCBBE] mx-auto mb-3"></div>
      <p className="font-bold text-sm">{text}</p>
    </div>
  );
}