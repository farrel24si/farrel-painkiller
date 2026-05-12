import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBed, FaUsers, FaExclamationTriangle, FaBoxes } from "react-icons/fa";

// Import file logo1.png dari folder assets
import logo1 from "../assets/logo1.png";

export default function Sidebar() {
  // Fungsi untuk class pembungkus menu (Button utama)
  // Mematuhi aturan: bg putih FFFFFF saat aktif/hover, padding 18px, shadow tipis, font Helvetica
  const menuClass = ({ isActive }) =>
    `flex items-center px-[18px] py-[12px] mx-4 my-2 rounded-[15px] transition-all font-bold text-sm cursor-pointer ${
      isActive
        ? "bg-[#FFFFFF] text-gray-800 shadow-md"
        : "text-gray-400 hover:bg-[#FFFFFF] hover:shadow-sm hover:text-gray-800"
    }`;

  // Fungsi untuk class kotak ikon (Khas Purity UI)
  const iconBoxClass = (isActive) =>
    `w-8 h-8 mr-4 flex items-center justify-center rounded-xl shadow-sm transition-colors ${
      isActive ? "bg-[#3BCBBE] text-white" : "bg-white text-[#3BCBBE]"
    }`;

  return (
    <div className="w-72 bg-[#F8F9FA] h-screen flex flex-col border-r border-gray-100 font-['Helvetica']">
      
      {/* Brand Logo Section */}
      <div className="flex flex-col items-center justify-center py-10 px-6">
        {/* Menampilkan logo1.png */}
        <img 
          src={logo1} 
          alt="Hotel Logo" 
          className="h-16 w-auto object-contain mb-2" // Bisa kamu ubah h-12 menjadi h-16 dsb untuk memperbesar logo
        />
        
        <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-wider">
          Hotel Management
        </p>
      </div>

      {/* Navigation - Menggunakan render props NavLink agar ikon bisa ikut bereaksi saat aktif */}
      <ul className="flex-1 overflow-y-auto">
        <li>
          <NavLink to="/" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <MdSpaceDashboard className="text-lg" />
                </div>
                Dashboard
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaBed className="text-lg" />
                </div>
                Bookings
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/guests" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaUsers className="text-lg" />
                </div>
                Guests
              </>
            )}
          </NavLink>
        </li>

        {/* Menu Inventory Baru */}
        <li>
          <NavLink to="/inventory" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaBoxes className="text-lg" />
                </div>
                Inventory
              </>
            )}
          </NavLink>
        </li>


        {/* Pemisah Menu Error */}
        {/* <div className="px-10 py-4 mt-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            System Errors
          </p>
        </div>
        
        <li>
          <NavLink to="/error-400" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaExclamationTriangle className="text-lg text-[#E53E3E]" />
                </div>
                Error 400
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-401" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaExclamationTriangle className="text-lg text-[#E53E3E]" />
                </div>
                Error 401
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-403" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaExclamationTriangle className="text-lg text-[#E53E3E]" />
                </div>
                Error 403
              </>
            )}
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}