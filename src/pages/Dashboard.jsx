import React from "react";
import { 
  FaBed, 
  FaCheckCircle, 
  FaUsers, 
  FaWallet,
  FaArrowRight,
  FaConciergeBell,
  FaShoppingCart,
  FaKey,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 1. UBAH BAGIAN INI: Sesuaikan path letak file Header.jsx Anda
import Header from "../components/Header"; 

export default function Dashboard() {
  // Data Metrik Atas
  const metrics = [
    { title: "Total Bookings", value: "142", pct: "+12%", isPositive: true, icon: <FaBed /> },
    { title: "Available Rooms", value: "38", pct: "+5%", isPositive: true, icon: <FaCheckCircle /> },
    { title: "Today's Arrivals", value: "24", pct: "+2%", isPositive: true, icon: <FaUsers /> },
    { title: "Revenue", value: "$12,450", pct: "+8%", isPositive: true, icon: <FaWallet /> },
  ];

  // Data Area Chart
  const chartData = [
    { month: "Jan", revenue: 4000, bookings: 2400 },
    { month: "Feb", revenue: 3000, bookings: 1398 },
    { month: "Mar", revenue: 5000, bookings: 3800 },
    { month: "Apr", revenue: 4500, bookings: 3908 },
    { month: "May", revenue: 6000, bookings: 4800 },
    { month: "Jun", revenue: 5500, bookings: 3800 },
    { month: "Jul", revenue: 7000, bookings: 4300 },
    { month: "Aug", revenue: 6500, bookings: 4100 },
    { month: "Sep", revenue: 8000, bookings: 5300 },
    { month: "Oct", revenue: 7500, bookings: 4500 },
    { month: "Nov", revenue: 9000, bookings: 6800 },
    { month: "Dec", revenue: 10000, bookings: 7500 },
  ];

  // Data Bar Chart
  const barData = [
    { name: "1", occupancy: 300 },
    { name: "2", occupancy: 200 },
    { name: "3", occupancy: 100 },
    { name: "4", occupancy: 250 },
    { name: "5", occupancy: 350 },
    { name: "6", occupancy: 200 },
    { name: "7", occupancy: 400 },
    { name: "8", occupancy: 150 },
    { name: "9", occupancy: 300 },
  ];

  // Komponen Card
  const Card = ({ children, className = "" }) => (
    <div className={`bg-[#F8F9FA] hover:bg-[#FFFFFF] active:bg-[#FFFFFF] p-[18px] rounded-[15px] shadow-sm hover:shadow-md transition-all cursor-pointer font-['Helvetica'] ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      
      
      
      <div className="p-6 space-y-6">
        
        {/* ROW 1: 4 Metrik Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((item, index) => (
            <Card key={index} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-400 mb-1">{item.title}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-800">{item.value}</h3>
                  <span className={`text-sm font-bold ${item.isPositive ? 'text-[#48BB78]' : 'text-[#E53E3E]'}`}>
                    {item.pct}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-[12px] bg-[#3BCBBE] flex items-center justify-center text-white text-xl shadow-md">
                {item.icon}
              </div>
            </Card>
          ))}
        </div>

        {/* ROW 2: Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Banner */}
          <Card className="lg:col-span-7 flex flex-col md:flex-row justify-between items-stretch">
            <div className="flex flex-col justify-between items-start pr-4">
              <div>
                <p className="text-sm font-bold text-gray-400 mb-1">Built for hotel management</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Capella System</h2>
                <p className="text-sm text-gray-500 max-w-sm">
                  From reservations, room services, to revenue tracking, seamlessly manage the ultimate hotel experience.
                </p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#3BCBBE] transition-colors overflow-hidden py-1">
                Read more <FaArrowRight />
              </button>
            </div>
            {/* Kotak Hijau Tema dengan Gradasi ke Putih */}
            <div 
              className="mt-4 md:mt-0 w-full md:w-[250px] rounded-[15px] flex items-center justify-center min-h-[150px] shadow-md flex-shrink-0"
              style={{ backgroundImage: 'linear-gradient(to right, #3BCBBE, #FFFFFF)' }}
            >
               <h1 className="text-gray-800 text-2xl font-bold flex items-center gap-2">
                 <FaConciergeBell /> Farrel.
               </h1>
            </div>
          </Card>

          {/* Right Banner (Image + Gelap Linear dari atas) */}
          <Card className="lg:col-span-5 relative overflow-hidden text-white min-h-[250px] flex flex-col justify-between !bg-transparent !p-0">
            {/* 1. Gambar Hotel - MENGGUNAKAN INLINE STYLE */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://capellahotels.com/assets/img/site_images/hanoi/Capella-Hanoi-Opera-Suit-Gallery-01.jpg')" }}
            ></div>
            
            {/* 2. Overlay Gradasi Gelap */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>
            
            {/* 3. Konten */}
            <div className="relative z-20 p-[18px] flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">Luxury at its finest</h2>
                <p className="text-sm text-gray-100">
                  Hospitality is an art. Deliver an unforgettable stay for guests while maximizing room occupancy and revenue.
                </p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-sm font-bold text-white hover:text-gray-300 transition-colors w-fit py-1">
                Read more <FaArrowRight />
              </button>
            </div>
          </Card>
        </div>

        {/* ROW 3: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart */}
          <Card className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-[#313860] to-[#151928] rounded-[15px] p-4 h-[220px] mb-4 shadow-md">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <YAxis tick={{ fill: '#fff', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="occupancy" fill="#FFFFFF" radius={[4, 4, 4, 4]} barSize={6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Occupancy Rate</h3>
              <p className="text-sm text-gray-400 font-bold mb-6">
                <span className="text-[#48BB78]">(+23%)</span> than last week
              </p>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-1 overflow-hidden">
                    <div className="w-5 h-5 rounded bg-[#3BCBBE] text-white flex items-center justify-center text-[10px] flex-shrink-0"><FaBed/></div> <span className="truncate">Rooms</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800">124</p>
                  <div className="w-full bg-gray-200 h-1 mt-2 rounded"><div className="bg-[#3BCBBE] w-[80%] h-1 rounded"></div></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-1 overflow-hidden">
                    <div className="w-5 h-5 rounded bg-[#3BCBBE] text-white flex items-center justify-center text-[10px] flex-shrink-0"><FaUsers/></div> <span className="truncate">Guests</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800">320</p>
                  <div className="w-full bg-gray-200 h-1 mt-2 rounded"><div className="bg-[#3BCBBE] w-[90%] h-1 rounded"></div></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-1 overflow-hidden">
                    <div className="w-5 h-5 rounded bg-[#3BCBBE] text-white flex items-center justify-center text-[10px] flex-shrink-0"><FaShoppingCart/></div> <span className="truncate">Dining</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800">$1.2k</p>
                  <div className="w-full bg-gray-200 h-1 mt-2 rounded"><div className="bg-[#3BCBBE] w-[40%] h-1 rounded"></div></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-1 overflow-hidden">
                    <div className="w-5 h-5 rounded bg-[#3BCBBE] text-white flex items-center justify-center text-[10px] flex-shrink-0"><FaKey/></div> <span className="truncate">Keys</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800">85</p>
                  <div className="w-full bg-gray-200 h-1 mt-2 rounded"><div className="bg-[#3BCBBE] w-[60%] h-1 rounded"></div></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Right Chart */}
          <Card className="lg:col-span-7 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">Revenue & Bookings</h3>
              <p className="text-sm text-gray-400 font-bold">
                <span className="text-[#48BB78]">(+5) more</span> in 2026
              </p>
            </div>
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#313860" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#313860" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                  <Area type="monotone" dataKey="revenue" stroke="#4FD1C5" strokeWidth={3} fill="url(#colorRevenue)" activeDot={{ r: 6, fill: "#4FD1C5", stroke: "#fff", strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="bookings" stroke="#313860" strokeWidth={3} fill="url(#colorBookings)" activeDot={{ r: 6, fill: "#313860", stroke: "#fff", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* ROW 4: Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
          {/* Recent Bookings Table */}
          <Card className="lg:col-span-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
              <p className="text-sm text-gray-400 font-bold flex items-center gap-1">
                <FaCheckCircle className="text-[#3BCBBE]" /> <span className="font-bold text-gray-500">30 confirmed</span> this month
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Room Type</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Guests</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Price</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-center">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-gray-800">
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 flex items-center gap-3"><FaBed className="text-[#3BCBBE] text-xl flex-shrink-0"/> Deluxe Suite</td>
                    <td className="py-4">
                        <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div><div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div></div>
                    </td>
                    <td className="py-4">$450</td>
                    <td className="py-4 w-1/4">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[#3BCBBE] text-xs">Paid 100%</span>
                        <div className="w-full bg-gray-200 h-1.5 rounded"><div className="bg-[#3BCBBE] w-[100%] h-1.5 rounded"></div></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 flex items-center gap-3"><FaBed className="text-[#48BB78] text-xl flex-shrink-0"/> Standard Room</td>
                    <td className="py-4">
                        <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div></div>
                    </td>
                    <td className="py-4">$150</td>
                    <td className="py-4 w-1/4">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[#E53E3E] text-xs">Pending 25%</span>
                        <div className="w-full bg-gray-200 h-1.5 rounded"><div className="bg-[#E53E3E] w-[25%] h-1.5 rounded"></div></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 flex items-center gap-3"><FaBed className="text-yellow-500 text-xl flex-shrink-0"/> Presidential Suite</td>
                    <td className="py-4">
                        <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div><div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div></div>
                    </td>
                    <td className="py-4">$1,200</td>
                    <td className="py-4 w-1/4">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[#3BCBBE] text-xs">Paid 100%</span>
                        <div className="w-full bg-gray-200 h-1.5 rounded"><div className="bg-[#3BCBBE] w-[100%] h-1.5 rounded"></div></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Activity Log */}
          <Card className="lg:col-span-4">
              <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800">Activity Log</h3>
              <p className="text-sm text-gray-400 font-bold">
                <span className="text-[#48BB78]">+24%</span> this week
              </p>
            </div>
            <div className="relative space-y-6 pl-2">
                <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gray-200 z-0"></div>
                <div className="relative z-10 flex items-center gap-4">
                   <div className="w-4 h-4 flex-shrink-0 rounded-full bg-white border-2 border-[#48BB78]"></div>
                   <div>
                     <p className="text-sm font-bold text-gray-800">$450, Room Payment</p>
                     <p className="text-xs font-bold text-gray-400">22 DEC 7:20 PM</p>
                   </div>
                </div>
                <div className="relative z-10 flex items-center gap-4">
                   <div className="w-4 h-4 flex-shrink-0 rounded-full bg-white border-2 border-[#E53E3E]"></div>
                   <div>
                     <p className="text-sm font-bold text-gray-800">Booking Cancelled #4219</p>
                     <p className="text-xs font-bold text-gray-400">21 DEC 11:21 PM</p>
                   </div>
                </div>
                <div className="relative z-10 flex items-center gap-4">
                   <div className="w-4 h-4 flex-shrink-0 rounded-full bg-white border-2 border-[#3BCBBE]"></div>
                   <div>
                     <p className="text-sm font-bold text-gray-800">Room 402 Checked-in</p>
                     <p className="text-xs font-bold text-gray-400">21 DEC 9:28 PM</p>
                   </div>
                </div>
                <div className="relative z-10 flex items-center gap-4">
                   <div className="w-4 h-4 flex-shrink-0 rounded-full bg-white border-2 border-yellow-400"></div>
                   <div>
                     <p className="text-sm font-bold text-gray-800">New reservation #3210</p>
                     <p className="text-xs font-bold text-gray-400">20 DEC 3:52 PM</p>
                   </div>
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}