import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import inventoryData from "../data/inventori.json";

export default function Inventori() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "Amenities", totalStock: 0, targetGuest: "All" });

  const categories = ["All", ...new Set(inventoryData.map(item => item.category))];
  const categoryOptions = categories.filter(c => c !== "All").map(c => ({ value: c, label: c }));
  const targetOptions = [
    { value: "All", label: "All Guests" },
    { value: "VIP", label: "VIP Only" },
    { value: "Family", label: "Family" },
  ];

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => {
    setAlert({ type: "success", message: "Item added successfully!" });
    setTimeout(() => setAlert(null), 3000);
    setShowForm(false);
  };

  const tableHeaders = ["Item Info", "Category & Type", "Stock", "Status", "Action"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-[15px] shadow-sm"><p className="text-sm text-gray-400">Total Items</p><h3 className="text-2xl font-bold">{inventoryData.length}</h3></div>
          <div className="bg-white p-4 rounded-[15px] shadow-sm"><p className="text-sm text-gray-400">Low / Out of Stock</p><h3 className="text-2xl font-bold text-[#E53E3E]">{inventoryData.filter(p => p.status === "Low Stock" || p.status === "Out of Stock").length}</h3></div>
          <div className="bg-white p-4 rounded-[15px] shadow-sm"><p className="text-sm text-gray-400">Categories</p><h3 className="text-2xl font-bold text-[#3BCBBE]">{categories.length - 1}</h3></div>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-[15px] shadow-sm">
            <h2 className="text-lg font-bold mb-6">Add New Inventory Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Item Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Luxury Bath Towel" />
              <SelectField label="Category" options={categoryOptions} name="category" value={formData.category} onChange={handleChange} />
              <InputField label="Total Stock" type="number" name="totalStock" value={formData.totalStock} onChange={handleChange} />
              <SelectField label="Target Guest" options={targetOptions} name="targetGuest" value={formData.targetGuest} onChange={handleChange} />
              <div className="md:col-span-2 mt-2">
                <Button type="dark" onClick={handleSave}>Save Item</Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100">
          <div className="mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif text-gray-900">Inventory <span className="italic font-light text-gray-500">List</span></h3>
              <p className="text-sm text-gray-500 font-light mt-1">Manage your CRM-linked items</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto items-center">
              <input type="text" placeholder="Search items..." className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm outline-none focus:border-[#3BCBBE] focus:ring-2 focus:ring-[#3BCBBE]/20 transition-all w-full md:w-auto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <select className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm outline-none focus:border-[#3BCBBE] focus:ring-2 focus:ring-[#3BCBBE]/20 transition-all w-full md:w-auto cursor-pointer" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {/* Tombol dipindah ke sini */}
              <Button type={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "+ Add Item"}
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-50/50">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-6 flex items-center gap-4"><img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" /><div><p className="font-bold text-sm text-gray-900">{item.name}</p><p className="text-[10px] font-bold text-[#3BCBBE] uppercase tracking-widest">{item.id}</p></div></td>
                    <td className="py-4 px-6"><p className="font-medium text-sm text-gray-900">{item.category}</p><p className="text-xs text-gray-400">{item.type} • {item.targetGuest}</p></td>
                    <td className="py-4 px-6"><div className="flex flex-col"><span className="text-sm font-bold text-gray-700">{item.available}/{item.totalStock}</span><div className="w-20 bg-gray-100 h-1.5 rounded-full mt-1"><div className={`h-1.5 rounded-full ${item.available < 10 ? 'bg-[#E53E3E]' : 'bg-[#3BCBBE]'}`} style={{width: `${(item.available / item.totalStock) * 100}%`}}></div></div></div></td>
                    <td className="py-4 px-6"><span className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                      item.status === 'In Stock' ? 'text-[#48BB78] bg-[#48BB78]/10' :
                      item.status === 'Low Stock' ? 'text-yellow-600 bg-yellow-500/10' : 'text-[#E53E3E] bg-[#E53E3E]/10'
                    }`}>{item.status}</span></td>
                    <td className="py-4 px-6"><Link to={`/inventory/${item.id}`} className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-[#3BCBBE] hover:text-[#3BCBBE] transition-colors shadow-sm">Detail</Link></td>
                  </tr>
                ))}
                {filteredInventory.length === 0 && (
                  <tr>
                     <td colSpan={5} className="py-12 text-center text-sm font-medium text-gray-400">No items found matching your filter.</td>
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