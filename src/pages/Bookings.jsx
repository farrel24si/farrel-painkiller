import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import { bookingsData } from "../data/dummyData";

export default function Bookings() {
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({ guestName: "", roomType: "Standard Room", checkIn: "", status: "Confirmed" });

  const roomOptions = [
    { value: "Standard Room", label: "Standard Room" },
    { value: "Deluxe Room", label: "Deluxe Room" },
    { value: "Executive Suite", label: "Executive Suite" },
  ];
  const statusOptions = [
    { value: "Confirmed", label: "Confirmed" },
    { value: "Checked-In", label: "Checked-In" },
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = () => {
    setAlert({ type: "success", message: "Booking successfully added!" });
    setTimeout(() => setAlert(null), 3000);
    setShowForm(false);
    setFormData({ guestName: "", roomType: "Standard Room", checkIn: "", status: "Confirmed" });
  };

  const tableHeaders = ["Booking ID", "Guest Name", "Room Type", "Check-in Date", "Status"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="px-6 pt-4">
        <PageHeader title="Room Bookings" breadcrumb={["Capella", "Bookings"]}>
          <Button type={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ New Booking"}
          </Button>
        </PageHeader>
      </div>
      <div className="p-6">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-[15px] shadow-sm">
            <h2 className="text-lg font-bold mb-6">Add New Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} placeholder="e.g. John Doe" required />
              <SelectField label="Room Type" options={roomOptions} name="roomType" value={formData.roomType} onChange={handleChange} />
              <InputField label="Check-in Date" type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
              <SelectField label="Status" options={statusOptions} name="status" value={formData.status} onChange={handleChange} />
              <div className="md:col-span-2 mt-2">
                <Button type="dark" onClick={handleSave}>Save Booking</Button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white p-6 rounded-[15px] shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold">All Bookings</h3>
            <p className="text-sm text-gray-400"><span className="text-[#48BB78]">+15%</span> new bookings this week</p>
          </div>
          <Table headers={tableHeaders}>
            {bookingsData.map((booking, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-4 text-[#3BCBBE]">{booking.id}</td>
                <td className="py-4">{booking.guestName}</td>
                <td className="py-4">{booking.roomType}</td>
                <td className="py-4 text-gray-500">{booking.checkIn}</td>
                <td className="py-4">
                  <span className={`px-3 py-1.5 rounded-[8px] text-[11px] uppercase font-bold ${
                    booking.status === "Checked-In" ? "text-[#48BB78] bg-[#48BB78]/10" :
                    booking.status === "Confirmed" ? "text-[#3BCBBE] bg-[#3BCBBE]/10" : "text-gray-500 bg-gray-100"
                  }`}>{booking.status}</span>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}