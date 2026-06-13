// src/components/ui/accordion.jsx
import React, { useState, createContext, useContext } from "react";

// Context untuk mengontrol item mana yang terbuka
const AccordionContext = createContext(null);

export function Accordion({ type = "single", collapsible, children, className, ...props }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    if (type === "single") {
      // Single: hanya satu yang terbuka
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      // Multiple: bisa banyak yang terbuka
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children, className, ...props }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <div
      className={`border-b ${className || ""}`}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, isOpen })
      )}
    </div>
  );
}

export function AccordionTrigger({ children, value, isOpen, className, ...props }) {
  const { toggleItem } = useContext(AccordionContext);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={`flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline ${
        isOpen ? "text-[#3BCBBE]" : ""
      } ${className || ""}`}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function AccordionContent({ children, isOpen, className, ...props }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-200 ${
        isOpen ? "max-h-96 pb-4" : "max-h-0"
      } ${className || ""}`}
      {...props}
    >
      <div className="pt-0 pb-0 text-gray-600">{children}</div>
    </div>
  );
}