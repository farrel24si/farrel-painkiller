import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaTrash, FaStickyNote, FaChevronDown, FaPlus } from "react-icons/fa";
import { notesAPI } from "../services/notesAPI";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const [dataForm, setDataForm] = useState({
    title: "", content: "", status: "To Do"
  });

  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

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
      setShowForm(false);
      setTimeout(() => setSuccess(""), 3000);
      loadNotes(); 
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await notesAPI.updateNoteStatus(id, newStatus);
      setSuccess(`Status catatan diperbarui menjadi ${newStatus}`);
      setTimeout(() => setSuccess(""), 3000);
      loadNotes();
    } catch (err) {
      setError(`Gagal mengubah status: ${err.message}`);
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
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        
        {error && <div className="mb-4"><AlertBox type="error">{error}</AlertBox></div>}
        {success && <div className="mb-4"><AlertBox type="success">{success}</AlertBox></div>}

        <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif text-gray-900">Internal <span className="italic font-light text-gray-500">Notes</span></h3>
              <p className="text-sm text-gray-500 font-light mt-1">Kelola catatan dan tugas staf internal.</p>
            </div>
            <Button type={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
              {showForm ? "Tutup Form" : "+ Tambah Catatan"}
            </Button>
          </div>

          {showForm && (
            <div className="mb-8 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaStickyNote className="text-[#3BCBBE]" /> Buat Catatan Baru
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Judul Catatan</label>
                    <input
                      type="text"
                      name="title"
                      value={dataForm.title}
                      placeholder="Masukkan judul (misal: Follow up kamar 302...)"
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full p-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#3BCBBE] text-sm font-bold text-gray-700 disabled:opacity-50 transition-colors shadow-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Detail Catatan</label>
                    <textarea
                      name="content"
                      value={dataForm.content}
                      placeholder="Tuliskan detail catatan di sini..."
                      onChange={handleChange}
                      required
                      rows="3"
                      disabled={loading}
                      className="w-full p-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#3BCBBE] text-sm text-gray-600 resize-none disabled:opacity-50 transition-colors shadow-sm"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button type="dark" disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan Catatan"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 w-16">#</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Detail Catatan</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 w-40">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 w-24">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="py-12"><LoadingSpinner text="Memuat catatan..." /></td>
                  </tr>
                )}
                {!loading && notes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12">
                      <EmptyState text="Belum ada catatan. Buat catatan pertamamu!" />
                    </td>
                  </tr>
                )}
                {!loading && notes.map((note, index) => (
                  <tr key={note.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-6 text-xs font-bold text-gray-400">{index + 1}</td>
                    <td className="py-4 px-6">
                      <h4 className="font-bold text-[#3BCBBE] text-sm mb-1">{note.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{note.content}</p>
                    </td>
                    <td className="py-4 px-6">
                      <NoteStatusDropdown note={note} onUpdate={updateStatus} options={statusOptions} />
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(note.id)}
                        disabled={loading}
                        className="text-red-400 hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 p-2.5 rounded-lg shadow-sm"
                        title="Hapus Catatan"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Dropdown untuk Status Note
function NoteStatusDropdown({ note, onUpdate, options }) {
  const [open, setOpen] = useState(false);
  const currentStatus = note.status || 'To Do';

  useEffect(() => {
    const handleOutsideClick = () => setOpen(false);
    if (open) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);

  const getColorClass = (status) => {
    switch(status) {
      case "Done": return "text-[#48BB78] bg-[#48BB78]/10 border-[#48BB78]/30 hover:bg-[#48BB78]/20";
      case "In Progress": return "text-[#F5A623] bg-[#F5A623]/10 border-[#F5A623]/30 hover:bg-[#F5A623]/20";
      default: return "text-gray-500 bg-gray-100 border-gray-200 hover:bg-gray-200"; // To Do
    }
  };

  const getTextColor = (status) => {
    switch(status) {
      case "Done": return "text-[#48BB78]";
      case "In Progress": return "text-[#F5A623]";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="relative inline-block w-28" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full outline-none cursor-pointer border shadow-sm transition-all ${getColorClass(currentStatus)}`}
      >
        <span>{currentStatus}</span>
        <FaChevronDown className={`text-[9px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1 right-0 top-full animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onUpdate(note.id, opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors
                ${currentStatus === opt.value ? getTextColor(opt.value) + ' bg-gray-50' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}