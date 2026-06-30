import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";
import { usersAPI } from "../services/usersAPI";
import { FaTrash, FaUserShield, FaChevronDown } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Hapus akun permanen?");
    if (!konfirmasi) return;
    try {
      setLoading(true);
      await usersAPI.deleteUser(id);
      setSuccess("Akun berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      setLoading(true);
      await usersAPI.updateUserRole(id, newRole);
      setSuccess("Role berhasil diperbarui!");
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } catch (err) {
      setError(`Gagal memperbarui role: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const tableHeaders = ["No", "Nama Lengkap", "Email", "Tanggal Daftar", "Role", "Aksi"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <FaUserShield className="text-[#3BCBBE]" /> Daftar Akun Terdaftar
        </h2>
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white rounded-[15px] shadow-sm border p-6">
          {loading ? <p className="text-center py-10">Memuat data...</p> : 
            users.length > 0 ? (
            <Table headers={tableHeaders}>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 font-bold text-[#3BCBBE]">{user.name}</td>
                  <td className="px-4 py-4 text-gray-600">{user.email}</td>
                  <td className="px-4 py-4 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-4">
                    <RoleDropdown user={user} loading={loading} onUpdateRole={handleUpdateRole} />
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          ) : <p className="text-center py-10">Belum ada pengguna.</p>}
        </div>
      </div>
    </div>
  );
}

// Komponen Custom Dropdown untuk Role
function RoleDropdown({ user, loading, onUpdateRole }) {
  const [open, setOpen] = useState(false);
  const currentRole = user.role || 'member';

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleOutsideClick = () => setOpen(false);
    if (open) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);

  return (
    <div className="relative inline-block w-28" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => !loading && setOpen(!open)}
        disabled={loading}
        className={`w-full flex items-center justify-between font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full outline-none cursor-pointer border shadow-sm transition-all
          ${currentRole === 'admin' 
            ? 'bg-[#E53E3E]/10 text-[#E53E3E] border-[#E53E3E]/30 hover:bg-[#E53E3E]/20' 
            : 'bg-[#3BCBBE]/10 text-[#3BCBBE] border-[#3BCBBE]/30 hover:bg-[#3BCBBE]/20'
          }
        `}
      >
        <span>{currentRole}</span>
        <FaChevronDown className={`text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1 left-0 top-full animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => { onUpdateRole(user.id, "member"); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors
              ${currentRole === 'member' ? 'bg-[#3BCBBE]/10 text-[#3BCBBE]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Member
          </button>
          <button
            onClick={() => { onUpdateRole(user.id, "admin"); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors
              ${currentRole === 'admin' ? 'bg-[#E53E3E]/10 text-[#E53E3E]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Admin
          </button>
        </div>
      )}
    </div>
  );
}