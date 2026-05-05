import { FaBed, FaCheckCircle, FaUsers, FaWallet } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const metrics = [
    { title: "Total Bookings", value: "142", icon: <FaBed />, color: "bg-blue-500", desc: "+12% this month" },
    { title: "Available Rooms", value: "38", icon: <FaCheckCircle />, color: "bg-teal-500", desc: "Out of 150 rooms" },
    { title: "Today's Arrivals", value: "24", icon: <FaUsers />, color: "bg-indigo-500", desc: "Guests checking in" },
    { title: "Revenue", value: "$12,450", icon: <FaWallet />, color: "bg-slate-800", desc: "+8% this month" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <PageHeader title="Dashboard Overview" breadcrumb={["Grand Farrel", "Dashboard"]} />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 transition hover:-translate-y-1 hover:shadow-md">
              <div className={`${item.color} text-white p-4 rounded-xl text-2xl shadow-inner`}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400">{item.title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{item.value}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}