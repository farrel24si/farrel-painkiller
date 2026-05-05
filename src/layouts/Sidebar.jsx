import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBed, FaUsers, FaExclamationTriangle } from "react-icons/fa"; // Icon disesuaikan

export default function Sidebar() {
  // Class aktif warna Biru
  const menuClass = ({ isActive }) => 
    `flex items-center px-6 py-3 mx-4 my-2 rounded-xl transition-all font-medium ${
      isActive ? "bg-blue-100 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
    }`;

  return (
    <div className="w-72 bg-white shadow-lg h-screen flex flex-col border-r border-slate-100">
      {/* Brand Logo */}
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Hotella<span className="text-blue-600">.</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wider">Hotel Management</p>
      </div>

      {/* Navigation */}
      <ul className="flex-1 overflow-y-auto">
        <li>
          <NavLink to="/" className={menuClass}>
            <MdSpaceDashboard className="mr-4 text-xl" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={menuClass}>
            <FaBed className="mr-4 text-xl" /> Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="/guests" className={menuClass}>
            <FaUsers className="mr-4 text-xl" /> Guests
          </NavLink>
        </li>

        {/* Pemisah Menu Error */}
        <div className="px-10 py-4 mt-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Errors</p>
        </div>
        <li>
          <NavLink to="/error-400" className={menuClass}>
            <FaExclamationTriangle className="mr-4 text-lg text-red-400" /> Error 400
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-401" className={menuClass}>
            <FaExclamationTriangle className="mr-4 text-lg text-red-400" /> Error 401
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-403" className={menuClass}>
            <FaExclamationTriangle className="mr-4 text-lg text-red-400" /> Error 403
          </NavLink>
        </li>
      </ul>
    </div>
  );
}