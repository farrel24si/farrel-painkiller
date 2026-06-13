import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { 
  FaBed, 
  FaUsers, 
  FaExclamationTriangle, 
  FaBoxes, 
  FaStar, 
  FaUserShield, 
  FaStickyNote 
} from "react-icons/fa";

// Import file logo1.png dari folder assets
import logo1 from "../assets/logo1.png";

export default function Sidebar() {
  // Fungsi untuk class pembungkus menu (Button utama)
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
    // DI SINI PERBAIKANNYA: Menambahkan sticky top-0 left-0 z-50
    <div className="w-72 bg-[#F8F9FA] h-screen sticky top-0 left-0 z-50 flex flex-col border-r border-gray-100 font-['Helvetica']">
      
      {/* Brand Logo Section */}
      <div className="flex flex-col items-center justify-center py-10 px-6">
        {/* Menampilkan logo1.png */}
        <img 
          src={logo1} 
          alt="Hotel Logo" 
          className="h-16 w-auto object-contain mb-2" 
        />
        
        <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-wider">
          Hotel Management
        </p>
      </div>

      {/* Navigation */}
      <ul className="flex-1 overflow-y-auto pb-6">
        <li>
          {/* UBAH DARI "/" MENJADI "/dashboard" */}
          <NavLink to="/dashboard" className={menuClass}>
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

        <li>
          <NavLink to="/reviews" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaStar className="text-lg" />
                </div>
                Reviews & Feedback
              </>
            )}
          </NavLink>
        </li>

        {/* === MENU BARU: ACCOUNT USERS (Supabase CRUD) === */}
        <li>
          <NavLink to="/users" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaUserShield className="text-lg" />
                </div>
                Account Users
              </>
            )}
          </NavLink>
        </li>

        {/* === MENU BARU: INTERNAL NOTES (Modul 13) === */}
        <li>
          <NavLink to="/notes" className={menuClass}>
            {({ isActive }) => (
              <>
                <div className={iconBoxClass(isActive)}>
                  <FaStickyNote className="text-lg" />
                </div>
                Internal Notes
              </>
            )}
          </NavLink>
        </li>

      </ul>
    </div>
  );
}