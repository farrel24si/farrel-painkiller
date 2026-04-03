import React from 'react';

export default function InputField({ label, type, name, value, onChange, placeholder, error }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-4 ${
          error 
            ? "border-red-400 focus:ring-red-100 bg-red-50 text-red-900" 
            : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 animate-pulse">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}