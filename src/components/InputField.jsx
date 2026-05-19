export default function InputField({ label, type = "text", placeholder, name, value, onChange, required = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
        {label} {required && <span className="text-[#E53E3E]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all"
      />
    </div>
  );
}