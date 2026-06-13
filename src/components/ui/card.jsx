// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}