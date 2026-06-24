import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export default function Alert({ type = "info", message, onClose }) {
  const styles = {
    success: {
      border: "border-l-[#48BB78]",
      iconColor: "text-[#48BB78]",
      bgIcon: "bg-[#48BB78]/10",
      title: "Success",
      icon: <FaCheckCircle className="text-lg" />
    },
    error: {
      border: "border-l-[#E53E3E]",
      iconColor: "text-[#E53E3E]",
      bgIcon: "bg-[#E53E3E]/10",
      title: "Error",
      icon: <FaExclamationCircle className="text-lg" />
    },
    danger: {
      border: "border-l-[#E53E3E]",
      iconColor: "text-[#E53E3E]",
      bgIcon: "bg-[#E53E3E]/10",
      title: "Error",
      icon: <FaExclamationCircle className="text-lg" />
    },
    warning: {
      border: "border-l-yellow-500",
      iconColor: "text-yellow-600",
      bgIcon: "bg-yellow-500/10",
      title: "Warning",
      icon: <FaExclamationTriangle className="text-lg" />
    },
    info: {
      border: "border-l-[#3BCBBE]",
      iconColor: "text-[#3BCBBE]",
      bgIcon: "bg-[#3BCBBE]/10",
      title: "Information",
      icon: <FaInfoCircle className="text-lg" />
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative flex items-center gap-4 p-4 rounded-xl shadow-sm mb-6 bg-white border border-gray-100 border-l-4 ${currentStyle.border}`}
    >
      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${currentStyle.bgIcon} ${currentStyle.iconColor}`}>
        {currentStyle.icon}
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800">
          {currentStyle.title}
        </h4>
        <p className="text-xs font-medium text-gray-500 mt-0.5 leading-relaxed">
          {message}
        </p>
      </div>

      {onClose && (
        <button 
          onClick={onClose} 
          className="flex-shrink-0 ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 outline-none focus:ring-2 focus:ring-gray-200"
        >
          <FaTimes className="text-sm" />
        </button>
      )}
    </motion.div>
  );
}