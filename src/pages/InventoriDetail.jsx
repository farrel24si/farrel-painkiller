import { useParams, useNavigate } from "react-router-dom";
import inventoryData from "../data/inventori.json";

export default function InventoriDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Cari data produk berdasarkan ID dari URL
    const item = inventoryData.find(product => product.id === id);

    // Tampilan saat Item tidak ditemukan
    if (!item) {
        return (
            <div className="flex-1 bg-[#F8F9FA] min-h-screen p-10 font-['Helvetica'] flex flex-col items-center justify-center">
                <div className="bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm text-center max-w-md">
                    <p className="font-bold text-lg text-gray-800 mb-2">Item Not Found</p>
                    <p className="text-sm text-gray-500 mb-6">The inventory item you are looking for does not exist.</p>
                    <button 
                        onClick={() => navigate('/inventory')}
                        className="bg-[#3BCBBE] text-white px-6 py-2.5 rounded-[12px] text-sm font-bold shadow-sm"
                    >
                        Back to Inventory
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                
                {/* Tombol Kembali */}
                <button 
                    onClick={() => navigate('/inventory')}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#3BCBBE] transition-colors mb-6 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                    Back to Inventory
                </button>

                {/* Kartu Detail Produk */}
                <div className="bg-[#FFFFFF] rounded-[15px] shadow-sm overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Bagian Kiri: Gambar Produk */}
                    <div className="md:w-5/12 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="rounded-[12px] w-full h-auto object-cover shadow-sm"
                        />
                    </div>

                    {/* Bagian Kanan: Informasi Produk */}
                    <div className="md:w-7/12 p-8 flex flex-col">
                        
                        {/* Header: Kategori & Status */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="bg-[#3BCBBE]/10 text-[#3BCBBE] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[8px]">
                                {item.category}
                            </span>
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[8px] ${
                                item.status === 'In Stock' ? 'bg-[#48BB78]/10 text-[#48BB78]' : 
                                item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500' : 
                                'bg-[#E53E3E]/10 text-[#E53E3E]'
                            }`}>
                                {item.status}
                            </span>
                        </div>

                        {/* Judul & Tipe */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            {item.name}
                        </h1>
                        <p className="text-gray-400 text-sm font-bold mb-6">
                            ID: <span className="text-[#3BCBBE]">{item.id}</span>
                        </p>

                        {/* Spesifikasi CRM */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#F8F9FA] rounded-[12px] p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Item Type</p>
                                <p className="text-sm font-bold text-gray-800">{item.type}</p>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[12px] p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Target Guest</p>
                                <p className="text-sm font-bold text-gray-800">{item.targetGuest}</p>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[12px] p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Price / Add-on</p>
                                <p className="text-sm font-bold text-gray-800">
                                    {item.price > 0 ? `$${item.price}` : 'Free (Complimentary)'}
                                </p>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[12px] p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Stock Available</p>
                                <p className="text-sm font-bold text-gray-800">{item.available} / {item.totalStock} units</p>
                            </div>
                        </div>

                        {/* Footer Kartu: Stok in Use & Aksi */}
                        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-sm text-gray-400 font-bold">Currently in Use</p>
                                <p className="text-xl font-bold text-gray-800">
                                    {item.inUse} <span className="text-gray-400 text-sm">units assigned to rooms</span>
                                </p>
                            </div>
                            <button className="bg-gradient-to-br from-[#313860] to-[#151928] text-white px-8 py-3 rounded-[12px] font-bold text-sm shadow-md hover:shadow-lg transition-all">
                                Update Stock
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}