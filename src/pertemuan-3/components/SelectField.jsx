import React from 'react';

export default function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 rounded-xl border appearance-none bg-white transition-all duration-200 outline-none focus:ring-4 ${
          error 
            ? "border-red-400 focus:ring-red-100 bg-red-50" 
            : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
      >
        <option value="">Pilih {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
