import React from "react";

export default function AlertBox({ type = "info", children }) {
  const baseClass = "px-4 py-3 rounded-[10px] mb-6 shadow-sm border font-bold text-sm font-['Helvetica']";
  
  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div className={`${baseClass} ${styles[type] || styles.info}`}>
      {children}
    </div>
  );
}