import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import { guestsData } from "../data/dummyData";

export default function Guests() {
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", status: "Regular" });

  const statusOptions = [
    { value: "Regular", label: "Regular" },
    { value: "Member", label: "Member" },
    { value: "VIP", label: "VIP" },
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => {
    setAlert({ type: "success", message: "Guest registered successfully!" });
    setTimeout(() => setAlert(null), 3000);
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", status: "Regular" });
  };

  const tableHeaders = ["Guest ID", "Name", "Email", "Phone", "Status"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="px-6 pt-4">
        <PageHeader title="Guest Registry" breadcrumb={["Capella", "Guests"]}>
          <Button type={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Guest"}
          </Button>
        </PageHeader>
      </div>
      <div className="p-6">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-[15px] shadow-sm">
            <h2 className="text-lg font-bold mb-6">Register New Guest</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Michael Scott" required />
              <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="michael@example.com" />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
              <SelectField label="Guest Status" options={statusOptions} name="status" value={formData.status} onChange={handleChange} />
              <div className="md:col-span-2 mt-2">
                <Button type="dark" onClick={handleSave}>Save Guest</Button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white p-6 rounded-[15px] shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold">All Guests</h3>
            <p className="text-sm text-gray-400"><span className="text-[#48BB78]">+8</span> new guests this month</p>
          </div>
          <Table headers={tableHeaders}>
            {guestsData.map((guest, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-4 text-[#3BCBBE]">{guest.id}</td>
                <td className="py-4">{guest.name}</td>
                <td className="py-4 text-gray-500">{guest.email}</td>
                <td className="py-4 text-gray-500">{guest.phone}</td>
                <td className="py-4">
                  <span className={`px-3 py-1.5 rounded-[8px] text-[11px] uppercase font-bold ${
                    guest.status === "VIP" ? "bg-amber-500/10 text-amber-500" :
                    guest.status === "Member" ? "bg-[#3BCBBE]/10 text-[#3BCBBE]" : "bg-gray-100 text-gray-500"
                  }`}>{guest.status}</span>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}