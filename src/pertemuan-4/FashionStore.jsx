import { useState } from "react";
import fashionData from "./fashion.json";

export default function FashionStore() {
  const [viewMode, setViewMode] = useState("guest");
  
  // 1. Inisialisasi State Best Practice
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    filterKategori: "",
    filterMerk: "",
  });

  // 2. Handle Change General
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // 3. Logic Search & Filter
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredData = fashionData.filter((item) => {
    const matchesSearch =
      item.nama_produk.toLowerCase().includes(_searchTerm) ||
      item.deskripsi.toLowerCase().includes(_searchTerm);
    
    const matchesKategori = dataForm.filterKategori ? item.kategori === dataForm.filterKategori : true;
    const matchesMerk = dataForm.filterMerk ? item.merk === dataForm.filterMerk : true;

    return matchesSearch && matchesKategori && matchesMerk;
  });

  // 4. Pengambilan Unique Tags untuk Filter
  const categories = [...new Set(fashionData.map((item) => item.kategori))];
  const brands = [...new Set(fashionData.map((item) => item.merk))];

  return (
    <div className="p-4 md:p-8 bg-zinc-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-zinc-900 text-center mb-2 tracking-tight">Katalog Fashion</h1>
        <p className="text-center text-zinc-500 mb-8">Temukan gaya terbaikmu musim ini.</p>

        {/* Kontrol Pencarian & Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari produk atau deskripsi..."
              className="w-full p-3 border border-zinc-300 rounded-xl focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition"
              onChange={handleChange}
            />
            <select name="filterKategori" className="w-full p-3 border border-zinc-300 rounded-xl focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 appearance-none bg-white" onChange={handleChange}>
              <option value="">Semua Kategori</option>
              {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
            </select>
            <select name="filterMerk" className="w-full p-3 border border-zinc-300 rounded-xl focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 appearance-none bg-white" onChange={handleChange}>
              <option value="">Semua Merk</option>
              {brands.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
            </select>
          </div>

          {/* Toggle Tampilan */}
          <div className="flex justify-center gap-3 border-t border-zinc-100 pt-6">
            <button 
              onClick={() => setViewMode("guest")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${viewMode === 'guest' ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
            >
              Guest (Katalog Card)
            </button>
            <button 
              onClick={() => setViewMode("admin")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${viewMode === 'admin' ? 'bg-zinc-900 text-white shadow-md' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
            >
              Admin (Data Table)
            </button>
          </div>
        </div>

        {/* Conditional Rendering View */}
        {viewMode === "guest" ? (
          <GuestView data={filteredData} />
        ) : (
          <AdminView data={filteredData} />
        )}
      </div>
    </div>
  );
}

// Sub-Komponen Guest View
function GuestView({ data }) {
  if (data.length === 0) return <p className="text-center text-zinc-500 py-10">Produk tidak ditemukan.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-zinc-100 group flex flex-col">
          <div className="relative h-60 bg-zinc-200 overflow-hidden">
             <img src={item.gambar} alt={item.nama_produk} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-zinc-800">
               {item.merk}
             </div>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{item.kategori}</span>
              <span className="text-xs font-bold bg-zinc-100 px-2 py-1 rounded-md text-zinc-700 flex items-center gap-1">
                ⭐ {item.ulasan.rating}
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-2">{item.nama_produk}</h3>
            <p className="text-zinc-500 text-sm line-clamp-2 mb-4 flex-grow">{item.deskripsi}</p>
            
            <div className="border-t border-zinc-100 pt-4 mt-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-extrabold text-zinc-900">
                  Rp {item.harga_stok.harga.toLocaleString('id-ID')}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.harga_stok.stok > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {item.harga_stok.status}
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                {item.detail_produk.ukuran.map((size, idx) => (
                  <span key={idx} className="w-8 h-8 flex items-center justify-center text-xs font-semibold border border-zinc-200 rounded-md text-zinc-600 bg-zinc-50">{size}</span>
                ))}
              </div>
              <button className="w-full py-3 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-zinc-800 transition-colors">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Sub-Komponen Admin View
function AdminView({ data }) {
  if (data.length === 0) return <p className="text-center text-zinc-500 py-10">Data tidak ditemukan.</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-zinc-50 text-zinc-600 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4 font-semibold border-b border-zinc-200">ID & Produk</th>
            <th className="p-4 font-semibold border-b border-zinc-200">Kategori & Merk</th>
            <th className="p-4 font-semibold border-b border-zinc-200">Bahan & Warna</th>
            <th className="p-4 font-semibold border-b border-zinc-200">Harga & Stok</th>
            <th className="p-4 font-semibold border-b border-zinc-200 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img src={item.gambar} alt={item.nama_produk} className="w-12 h-12 rounded-lg object-cover bg-zinc-200" />
                  <div>
                    <p className="font-bold text-zinc-900 text-sm">{item.nama_produk}</p>
                    <p className="text-xs text-zinc-500">ID: #{item.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <p className="text-sm font-medium text-zinc-800">{item.kategori}</p>
                <p className="text-xs text-zinc-500">{item.merk}</p>
              </td>
              <td className="p-4">
                <p className="text-sm text-zinc-800">{item.detail_produk.bahan}</p>
                <p className="text-xs text-zinc-500">{item.detail_produk.warna}</p>
              </td>
              <td className="p-4">
                <p className="text-sm font-bold text-zinc-900">Rp {item.harga_stok.harga.toLocaleString('id-ID')}</p>
                <p className={`text-xs font-semibold ${item.harga_stok.stok > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Sisa Stok: {item.harga_stok.stok}
                </p>
              </td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <button className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-zinc-200 transition">Edit</button>
                  <button className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}