import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";
import Alert from "../components/Alert";

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        // Filter admin out, so we only see guests/members
        setGuests(data.filter(u => u.role !== "admin"));
      } catch (err) {
        setAlert({ type: "danger", message: err.message });
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuests();
  }, []);

  const tableHeaders = ["Guest ID", "Name", "Email", "Role", "Join Date"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="p-6">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        
        <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif text-gray-900">Guest <span className="italic font-light text-gray-500">Registry</span></h3>
              <p className="text-sm text-gray-500 font-light mt-1">Manage and view all registered users.</p>
            </div>
            <div className="bg-[#3BCBBE]/10 text-[#3BCBBE] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              Total: {guests.length} Guests
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
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm font-medium text-gray-400">Loading guests data...</td>
                  </tr>
                ) : guests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm font-medium text-gray-400">No guests found in database.</td>
                  </tr>
                ) : (
                  guests.map((guest, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                      <td className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        #{guest.id.substring(0, 6)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3BCBBE] to-[#F5A623] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                            {guest.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-sm text-gray-900">{guest.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 font-medium">{guest.email}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-gray-100 text-gray-600">
                          {guest.role || "Member"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 font-medium">
                        {new Date(guest.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}