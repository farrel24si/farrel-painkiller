import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { bookingsData } from "../data/dummyData";

export default function Bookings() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="px-6 pt-4">
        {/* Breadcrumb disesuaikan mengikuti format Dashboard */}
        <PageHeader title="Room Bookings" breadcrumb={["Grand Farrel", "Bookings"]}>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`${
              showForm ? "bg-[#E53E3E] hover:bg-red-600" : "bg-[#3BCBBE] hover:bg-[#34b5a9]"
            } text-white px-6 py-2.5 rounded-[12px] text-sm font-bold shadow-sm hover:shadow-md transition-all`}
          >
            {showForm ? "Cancel" : "+ New Booking"}
          </button>
        </PageHeader>
      </div>
      
      <div className="p-6">
        
        {/* FORM CONTAINER */}
        {showForm && (
          <div className="mb-6 bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Add New Booking</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Guest Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Room Type</label>
                <select className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all">
                  <option value="Standard Room">Standard Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Executive Suite">Executive Suite</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Check-in Date</label>
                <input 
                  type="date" 
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Status</label>
                <select className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all">
                  <option value="Confirmed">Confirmed</option>
                  <option value="Checked-In">Checked-In</option>
                </select>
              </div>
              
              <div className="md:col-span-2 mt-2">
                <button 
                  type="button" 
                  className="bg-gradient-to-br from-[#313860] to-[#151928] text-white px-8 py-3 rounded-[12px] font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE CONTAINER */}
        <div className="bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm overflow-hidden">
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">All Bookings</h3>
            <p className="text-sm text-gray-400 font-bold flex items-center gap-1">
              <span className="text-[#48BB78]">+15%</span> new bookings this week
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Booking ID</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Guest Name</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Room Type</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Check-in Date</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-gray-800">
                {bookingsData.map((booking, idx) => {
                  
                  // Pewarnaan Status disesuaikan dengan palet Purity UI
                  let statusClasses = "";
                  if (booking.status === 'Checked-In') {
                    statusClasses = "bg-[#48BB78]/10 text-[#48BB78]";
                  } else if (booking.status === 'Confirmed') {
                    statusClasses = "bg-[#3BCBBE]/10 text-[#3BCBBE]";
                  } else if (booking.status === 'Checked-Out') {
                    statusClasses = "bg-gray-100 text-gray-500";
                  } else {
                    statusClasses = "bg-[#E53E3E]/10 text-[#E53E3E]"; // Cancelled/Pending
                  }

                  return (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 text-[#3BCBBE]">{booking.id}</td>
                      <td className="py-4">{booking.guestName}</td>
                      <td className="py-4">{booking.roomType}</td>
                      <td className="py-4 text-gray-500 font-normal">{booking.checkIn}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1.5 rounded-[8px] text-[11px] uppercase tracking-wider font-bold ${statusClasses}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}