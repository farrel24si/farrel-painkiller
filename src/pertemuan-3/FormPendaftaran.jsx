import React, { useState } from 'react';
import InputField from './components/InputField';
import SelectField from './components/SelectField';

export default function FormPendaftaran() {
  const [formData, setFormData] = useState({
    nama: '', nim: '', email: '', kelas: '', jadwal: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fungsi validasi untuk SEMUA field (termasuk cross-field)
  const validateAll = (data) => {
    let newErrors = {};

    // ---- Validasi Nama (3 aturan) ----
    if (!data.nama) newErrors.nama = 'Nama tidak boleh kosong';
    else if (data.nama.length < 3) newErrors.nama = 'Minimal 3 karakter';
    else if (!/^[a-zA-Z\s]*$/.test(data.nama)) newErrors.nama = 'Hanya boleh huruf dan spasi';

    // ---- Validasi NIM (3 aturan) ----
    if (!data.nim) newErrors.nim = 'NIM wajib diisi';
    else if (!/^\d+$/.test(data.nim)) newErrors.nim = 'Harus berupa angka';
    else if (data.nim.length < 9) newErrors.nim = 'NIM minimal 9 digit';

    // ---- Validasi Email (3 aturan: required, format, tidak boleh spasi) ----
    if (!data.email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Format email salah (contoh: nama@domain.com)';
    else if (data.email.includes(' ')) newErrors.email = 'Email tidak boleh mengandung spasi';

    // ---- Validasi Kelas (3 aturan: required, valid pilihan, cross-field dengan jadwal) ----
    if (!data.kelas) newErrors.kelas = 'Pilih salah satu kelas';
    else if (data.kelas === 'ReactJS' && data.jadwal === 'Malam') {
      newErrors.kelas = 'Kelas ReactJS tidak tersedia untuk jadwal Malam';
    }

    // ---- Validasi Jadwal (3 aturan: required, valid pilihan, cross-field dengan kelas) ----
    if (!data.jadwal) newErrors.jadwal = 'Pilih jadwal';
    else if (data.jadwal === 'Malam' && data.kelas === 'ReactJS') {
      newErrors.jadwal = 'Jadwal Malam tidak tersedia untuk kelas ReactJS';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    const newErrors = validateAll(newFormData);
    
    setFormData(newFormData);
    setErrors(newErrors);
    setIsSubmitted(false); // reset submit jika user mengubah data
  };

  // Form dianggap valid jika semua field terisi dan tidak ada error
  const isFormValid = Object.values(formData).every(v => v !== '') && 
                      Object.values(errors).every(e => e === '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        {/* Header Visual */}
        <div className="bg-blue-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Bootcamp Registration</h2>
          <p className="text-blue-100 text-sm mt-1">Lengkapi data untuk bergabung</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <InputField 
            label="Nama Lengkap" type="text" name="nama" 
            value={formData.nama} onChange={handleChange} 
            placeholder="Contoh: Farrel Aditya" error={errors.nama} 
          />
          <InputField 
            label="NIM" type="text" name="nim" 
            value={formData.nim} onChange={handleChange} 
            placeholder="Contoh: 24573010..." error={errors.nim} 
          />
          <InputField 
            label="Email Kampus" type="email" name="email" 
            value={formData.email} onChange={handleChange} 
            placeholder="farrel@mahasiswa.pcr.ac.id" error={errors.email} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <SelectField 
              label="Kelas" name="kelas" value={formData.kelas} 
              onChange={handleChange} error={errors.kelas}
              options={[
                {value: 'ReactJS', label: 'ReactJS'}, 
                {value: 'Laravel', label: 'Laravel'}
              ]} 
            />
            <SelectField 
              label="Jadwal" name="jadwal" value={formData.jadwal} 
              onChange={handleChange} error={errors.jadwal}
              options={[
                {value: 'Pagi', label: 'Pagi (08.00 - 12.00)'}, 
                {value: 'Malam', label: 'Malam (18.00 - 21.00)'}
              ]} 
            />
          </div>

          {/* Conditional Rendering Tombol Submit */}
          {isFormValid && !isSubmitted && (
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 mt-2"
            >
              Daftar Sekarang
            </button>
          )}
        </form>

        {/* Conditional Rendering Hasil Pendaftaran */}
        {isSubmitted && (
          <div className="mx-8 mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <div className="flex items-center gap-2 mb-3 text-emerald-700">
              <span className="text-xl">✅</span>
              <h3 className="font-bold">Pendaftaran Berhasil!</h3>
            </div>
            <div className="space-y-1 text-sm text-emerald-800">
              <p><strong>Nama:</strong> {formData.nama}</p>
              <p><strong>NIM:</strong> {formData.nim}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Kelas:</strong> {formData.kelas} ({formData.jadwal})</p>
            </div>
            <p className="text-xs text-emerald-600 mt-3">Terima kasih telah mendaftar!</p>
          </div>
        )}
      </div>
      <p className="mt-6 text-slate-400 text-xs">© 2026 Pemrograman Framework Lanjutan</p>
    </div>
  );
}