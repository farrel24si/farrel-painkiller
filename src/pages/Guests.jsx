import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { guestsData } from "../data/dummyData";

export default function Guests() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="px-6 pt-4">
        {/* Breadcrumb disesuaikan mengikuti format Dashboard */}
        <PageHeader title="Guest Registry" breadcrumb={["Capella", "Guests"]}>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`${
              showForm ? "bg-[#E53E3E] hover:bg-red-600" : "bg-[#3BCBBE] hover:bg-[#34b5a9]"
            } text-white px-6 py-2.5 rounded-[12px] text-sm font-bold shadow-sm hover:shadow-md transition-all`}
          >
            {showForm ? "Cancel" : "+ Add Guest"}
          </button>
        </PageHeader>
      </div>
      
      <div className="p-6">
        
        {/* FORM CONTAINER */}
        {showForm && (
          <div className="mb-6 bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Register New Guest</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Michael Scott" 
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. michael@example.com" 
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Phone Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. +1 234 567 890" 
                  className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Guest Status</label>
                <select className="border border-gray-200 p-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#3BCBBE] focus:border-transparent bg-white text-sm text-gray-800 transition-all">
                  <option value="Regular">Regular</option>
                  <option value="Member">Member</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2">
                <button 
                  type="button" 
                  className="bg-gradient-to-br from-[#313860] to-[#151928] text-white px-8 py-3 rounded-[12px] font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE CONTAINER */}
        <div className="bg-[#FFFFFF] p-[24px] rounded-[15px] shadow-sm overflow-hidden">
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">All Guests</h3>
            <p className="text-sm text-gray-400 font-bold flex items-center gap-1">
              <span className="text-[#48BB78]">+8</span> new guests registered this month
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Guest ID</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Name</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Email</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Phone</th>
                  <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-gray-800">
                {guestsData.map((guest, idx) => {
                  
                  // Pewarnaan Status Badge disesuaikan
                  let statusClasses = "";
                  if (guest.status === 'VIP') {
                    statusClasses = "bg-amber-500/10 text-amber-500"; // Emas/Kuning untuk VIP
                  } else if (guest.status === 'Member') {
                    statusClasses = "bg-[#3BCBBE]/10 text-[#3BCBBE]"; // Teal untuk Member
                  } else {
                    statusClasses = "bg-gray-100 text-gray-500"; // Abu-abu untuk Regular
                  }

                  return (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 text-[#3BCBBE]">{guest.id}</td>
                      <td className="py-4">{guest.name}</td>
                      <td className="py-4 text-gray-500 font-normal">{guest.email}</td>
                      <td className="py-4 text-gray-500 font-normal">{guest.phone}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1.5 rounded-[8px] text-[11px] uppercase tracking-wider font-bold ${statusClasses}`}>
                          {guest.status}
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