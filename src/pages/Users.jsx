import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";
import { usersAPI } from "../services/usersAPI";
import { FaTrash, FaUserShield } from "react-icons/fa";

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

  const tableHeaders = ["No", "Nama Lengkap", "Email", "Tanggal Daftar", "Aksi"];

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
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 font-bold text-[#3BCBBE]">{user.name}</td>
                  <td className="px-4 py-4 text-gray-600">{user.email}</td>
                  <td className="px-4 py-4 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
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