import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaTrash, FaStickyNote } from "react-icons/fa";
import { notesAPI } from "../services/notesAPI";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [dataForm, setDataForm] = useState({
    title: "", content: "", status: "To Do"
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError("Gagal memuat catatan dari server.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await notesAPI.createNote(dataForm);
      setSuccess("Catatan berhasil ditambahkan!");
      setDataForm({ title: "", content: "", status: "To Do" });
      setTimeout(() => setSuccess(""), 3000);
      loadNotes(); 
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus catatan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await notesAPI.deleteNote(id);
      setSuccess("Catatan berhasil dihapus!");
      setTimeout(() => setSuccess(""), 3000);
      loadNotes(); 
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <FaStickyNote className="text-[#3BCBBE]" /> Manajemen Catatan Staf
        </h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <Card className="mb-10 p-6 border-0 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tambah Catatan Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={dataForm.title}
              placeholder="Judul catatan"
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 bg-[#F8F9FA] rounded-[10px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3BCBBE] text-sm font-bold text-gray-700 disabled:opacity-50"
            />
            <textarea
              name="content"
              value={dataForm.content}
              placeholder="Isi catatan (misal: Follow up keluhan kamar 302...)"
              onChange={handleChange}
              required
              rows="3"
              disabled={loading}
              className="w-full p-3 bg-[#F8F9FA] rounded-[10px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3BCBBE] text-sm font-bold text-gray-700 resize-none disabled:opacity-50"
            />
            <Button type="primary" disabled={loading}>
              {loading ? "Memproses..." : "Simpan Catatan"}
            </Button>
          </form>
        </Card>

        <div className="mb-10">
          {loading && <LoadingSpinner text="Memuat catatan dari database..." />}
          
          {!loading && notes.length === 0 && !error && (
            <EmptyState text="Belum ada catatan. Tambah catatan pertamamu!" />
          )}

          {!loading && notes.length > 0 && (
            <GenericTable
              columns={["#", "Judul", "Isi Catatan", "Aksi"]}
              data={notes}
              renderRow={(note, index) => (
                <>
                  <td className="px-6 py-4 font-bold text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4 font-bold text-[#3BCBBE]">{note.title}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-md">{note.content}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(note.id)}
                      disabled={loading}
                      className="text-red-400 hover:text-red-600 transition-colors bg-red-50 p-3 rounded-xl"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}