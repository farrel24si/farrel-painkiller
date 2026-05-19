import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
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
      <div className="px-6 pt-4">
        <PageHeader title="Inventory Management" breadcrumb={["Capella", "Inventory"]}>
          <Button type={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Item"}
          </Button>
        </PageHeader>
      </div>
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

        <div className="bg-white p-6 rounded-[15px] shadow-sm">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div><h3 className="text-lg font-bold">Inventory List</h3><p className="text-sm text-gray-400">Manage your CRM-linked items</p></div>
            <div className="flex gap-3">
              <input type="text" placeholder="Search items..." className="border p-2 rounded-[12px] text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <select className="border p-2 rounded-[12px] text-sm" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <Table headers={tableHeaders}>
            {filteredInventory.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-4 flex items-center gap-4"><img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover" /><div><p className="font-bold">{item.name}</p><p className="text-xs text-[#3BCBBE]">{item.id}</p></div></td>
                <td className="py-4"><p>{item.category}</p><p className="text-xs text-gray-400">{item.type} • {item.targetGuest}</p></td>
                <td className="py-4"><div className="flex flex-col"><span>{item.available}/{item.totalStock}</span><div className="w-16 bg-gray-200 h-1.5 rounded"><div className={`h-1.5 rounded ${item.available < 10 ? 'bg-[#E53E3E]' : 'bg-[#3BCBBE]'}`} style={{width: `${(item.available / item.totalStock) * 100}%`}}></div></div></div></td>
                <td className="py-4"><span className={`px-3 py-1.5 rounded-[8px] text-[11px] uppercase font-bold ${
                  item.status === 'In Stock' ? 'text-[#48BB78] bg-[#48BB78]/10' :
                  item.status === 'Low Stock' ? 'text-yellow-500 bg-yellow-500/10' : 'text-[#E53E3E] bg-[#E53E3E]/10'
                }`}>{item.status}</span></td>
                <td className="py-4"><Link to={`/inventory/${item.id}`} className="border border-[#3BCBBE] text-[#3BCBBE] px-4 py-1.5 rounded-[8px] text-xs hover:bg-[#3BCBBE] hover:text-white">Detail</Link></td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}