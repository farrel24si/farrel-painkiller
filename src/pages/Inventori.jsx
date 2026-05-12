import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import inventoryData from "../data/inventori.json";

export default function Inventori() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["All", ...new Set(inventoryData.map(item => item.category))];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="px-6 pt-4">
        <PageHeader title="Inventory Management" breadcrumb={["Capella", "Inventory"]}>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`${
              showForm ? "bg-[#E53E3E] hover:bg-red-600" : "bg-[#3BCBBE] hover:bg-[#34b5a9]"
            } text-white px-6 py-2.5 rounded-[12px] text-sm font-bold shadow-sm hover:shadow-md transition-all`}
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
        </PageHeader>
      </div>
      
      <div className="p-6">
        
        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#FFFFFF] p-[18px] rounded-[15px] shadow-sm">
            <p className="text-sm font-bold text-gray-400 mb-1">Total Items</p>
            <h3 className="text-2xl font-bold text-gray-800">{inventoryData.length}</h3>
          </div>
          <div className="bg-[#FFFFFF] p-[18px] rounded-[15px] shadow-sm">
            <p className="text-sm font-bold text-gray-400 mb-1">Low / Out of Stock</p>
            <h3 className="text-2xl font-bold text-[#E53E3E]">
              {inventoryData.filter(p => p.status === "Low Stock" || p.status === "Out of Stock").length}
            </h3>
          </div>
          <div className="bg-[#FFFFFF] p-[18px] rounded-[15px] shadow-sm">
            <p className="text-sm font-bold text-gray-400 mb-1">Categories</p>
            <h3 className="text-2xl font-bold text-[#3BCBBE]">{categories.length - 1}</h3>
          </div>
        </div>

        {/* FORM CONTAINER */}
        {showForm && (
          <div className="mb-6 bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Add New Inventory Item</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Item Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Luxury Bath Towel" 
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Category</label>
                <select className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all">
                  <option value="Amenities">Amenities</option>
                  <option value="Minibar">Minibar</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Total Stock</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Target Guest</label>
                <select className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all">
                  <option value="All">All Guests</option>
                  <option value="VIP">VIP Only</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              
              <div className="md:col-span-2 mt-2">
                <button 
                  type="button" 
                  className="bg-gradient-to-br from-[#313860] to-[#151928] text-white px-8 py-3 rounded-[12px] font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE CONTAINER */}
        <div className="bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm overflow-hidden">
          
          {/* Toolbar: Search & Filter */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Inventory List</h3>
              <p className="text-sm text-gray-400 font-bold flex items-center gap-1">
                Manage your CRM-linked items
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search items..."
                className="border border-gray-200 p-2.5 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] bg-gray-50 text-sm text-gray-800 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="border border-gray-200 p-2.5 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] bg-gray-50 text-sm text-gray-800 w-full md:w-auto"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Item Info</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Category & Type</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-center">Stock</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-center">Status</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-gray-800">
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => {
                    // Status Badge Styling
                    let statusClasses = "";
                    if (item.status === 'In Stock') {
                      statusClasses = "bg-[#48BB78]/10 text-[#48BB78]";
                    } else if (item.status === 'Low Stock') {
                      statusClasses = "bg-yellow-500/10 text-yellow-500";
                    } else {
                      statusClasses = "bg-[#E53E3E]/10 text-[#E53E3E]"; 
                    }

                    return (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 flex items-center gap-4">
                          <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                          <div>
                            <p className="text-gray-800">{item.name}</p>
                            <p className="text-xs text-[#3BCBBE]">{item.id}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-gray-800">{item.category}</p>
                          <p className="text-xs text-gray-400">{item.type} • {item.targetGuest}</p>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-gray-800">{item.available} / {item.totalStock}</span>
                            <div className="w-16 bg-gray-200 h-1.5 mt-1 rounded">
                              <div 
                                className={`h-1.5 rounded ${item.available < 10 ? 'bg-[#E53E3E]' : 'bg-[#3BCBBE]'}`} 
                                style={{ width: `${(item.available / item.totalStock) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-3 py-1.5 rounded-[8px] text-[11px] uppercase tracking-wider font-bold ${statusClasses}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <Link 
                            to={`/inventory/${item.id}`}
                            className="inline-flex items-center px-4 py-1.5 border-2 border-[#3BCBBE] text-xs font-bold rounded-[8px] text-[#3BCBBE] hover:bg-[#3BCBBE] hover:text-white transition-all"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-400 font-normal">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}