import { useState, useEffect } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import supabase from "../lib/supabaseClient";

export default function Bookings() {
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const [bookingsList, setBookingsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  
  const [formData, setFormData] = useState({ 
    user_id: "", 
    roomType: "Standard Room", 
    checkIn: "", 
    checkOut: "", 
    status: "Pending" 
  });

  const roomOptions = [
    { value: "Standard Room", label: "Standard Room" },
    { value: "Deluxe Suite", label: "Deluxe Suite" },
    { value: "Presidential Suite", label: "Presidential Suite" },
  ];
  
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Checked-In", label: "Checked-In" },
    { value: "Checked-Out", label: "Checked-Out" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const { data: bookingsRes, error: err1 } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (err1) throw err1;

      const { data: usersRes, error: err2 } = await supabase.from('users').select('*');
      if (err2) throw err2;
      
      const users = usersRes || [];
      const bookings = (bookingsRes || []).map(b => {
        // Fix: UUID might be string, user id might be integer
        const user = users.find(u => String(u.id) === String(b.user_id));
        return { ...b, guestName: user ? user.name : "Unknown User" };
      });
      
      setUsersList(users);
      setBookingsList(bookings);
    } catch (err) {
      console.error(err);
      showAlert("error", "Gagal memuat data booking.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSave = async () => {
    if (!formData.user_id || !formData.checkIn || !formData.checkOut) {
      showAlert("error", "Harap isi User, Check-in dan Check-out.");
      return;
    }

    try {
      // Simulate price roughly based on room type
      let price = 150;
      if (formData.roomType === "Deluxe Suite") price = 450;
      if (formData.roomType === "Presidential Suite") price = 1200;

      const payload = {
        user_id: formData.user_id,
        roomType: formData.roomType,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        price: price,
        status: formData.status
      };

      const { error } = await supabase.from('bookings').insert([payload]);
      if (error) throw error;
      
      showAlert("success", "Booking successfully added!");
      setShowForm(false);
      setFormData({ user_id: "", roomType: "Standard Room", checkIn: "", checkOut: "", status: "Pending" });
      fetchData();
    } catch (err) {
      console.error(err);
      showAlert("error", "Gagal menambahkan booking.");
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
      if (error) throw error;
      
      showAlert("success", `Booking ${bookingId.substring(0,8)} status updated to ${newStatus}`);
      fetchData();
    } catch (err) {
      console.error(err);
      showAlert("error", "Gagal mengubah status.");
    }
  };

  const tableHeaders = ["Booking ID", "Guest Name", "Room Type", "Check-in Date", "Status", "Action"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="p-6">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-[15px] shadow-sm">
            <h2 className="text-lg font-bold mb-6">Add New Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField 
                label="Guest Name" 
                name="user_id" 
                value={formData.user_id} 
                onChange={handleChange} 
                options={[{ value: "", label: "-- Pilih User --" }, ...usersList.map(u => ({ value: u.id, label: u.name }))]}
              />
              <SelectField label="Room Type" options={roomOptions} name="roomType" value={formData.roomType} onChange={handleChange} />
              <InputField label="Check-in Date" type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
              <InputField label="Check-out Date" type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
              <SelectField label="Status" options={statusOptions} name="status" value={formData.status} onChange={handleChange} />
              <div className="md:col-span-2 mt-2">
                <Button type="dark" onClick={handleSave}>Save Booking</Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif text-gray-900">Room <span className="italic font-light text-gray-500">Bookings</span></h3>
              <p className="text-sm text-gray-500 font-light mt-1">Manage all reservations and statuses.</p>
            </div>
            <Button type={showForm ? "danger" : "primary"} onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ New Booking"}
            </Button>
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
                {isFetching && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm font-medium text-gray-400">Loading bookings data...</td>
                  </tr>
                )}
                {!isFetching && bookingsList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm font-medium text-gray-400">No bookings found.</td>
                  </tr>
                )}
                {!isFetching && bookingsList.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      #{booking.id.substring(0,8)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-sm text-gray-900">{booking.guestName}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-medium">{booking.roomType}</td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-medium">{booking.checkIn}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                        booking.status === "Checked-In" ? "text-[#48BB78] bg-[#48BB78]/10" :
                        booking.status === "Checked-Out" ? "text-gray-500 bg-gray-100" :
                        booking.status === "Confirmed" ? "text-[#3BCBBE] bg-[#3BCBBE]/10" :
                        booking.status === "Cancelled" ? "text-[#E53E3E] bg-[#E53E3E]/10" : "text-[#F5A623] bg-[#F5A623]/10"
                      }`}>{booking.status}</span>
                    </td>
                    <td className="py-4 px-6">
                      <select 
                        className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#3BCBBE] text-gray-700 shadow-sm transition-colors cursor-pointer"
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
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