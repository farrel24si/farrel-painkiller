import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { guestsData } from "../data/dummyData";

export default function Guests() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <PageHeader title="Guest Registry" breadcrumb={["Dashboard", "Guests"]}>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`${showForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} text-white px-6 py-2 rounded-xl font-bold shadow-md transition`}
        >
          {showForm ? "Cancel" : "+ Add Guest"}
        </button>
      </PageHeader>
      
      <div className="p-6">
        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Register New Guest</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
              <input type="email" placeholder="Email Address" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
              <input type="text" placeholder="Phone Number" className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
              <select className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
                <option value="Regular">Regular</option>
                <option value="Member">Member</option>
                <option value="VIP">VIP</option>
              </select>
              <div className="md:col-span-2">
                <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Save Guest</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-100">
              <tr>
                <th className="p-4">Guest ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {guestsData.map((guest, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/80 transition">
                  <td className="p-4 font-semibold text-blue-600">{guest.id}</td>
                  <td className="p-4 font-medium text-slate-800">{guest.name}</td>
                  <td className="p-4">{guest.email}</td>
                  <td className="p-4">{guest.phone}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        guest.status === 'VIP' ? 'bg-amber-100 text-amber-700' : 
                        guest.status === 'Member' ? 'bg-blue-100 text-blue-700' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                      {guest.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}