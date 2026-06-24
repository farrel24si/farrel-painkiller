import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { FaStar, FaSearch, FaFilter, FaCheck } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Reviews() {
  const reviewsData = [
    { id: 1, name: "Budi Santoso", room: "Presidential Suite", rating: 5, text: "Pelayanan luar biasa! Kamar sangat bersih.", status: "Positive" },
    { id: 2, name: "Siti Aminah", room: "Deluxe Suite", rating: 3, text: "AC butuh waktu lama untuk dingin. Sarapan enak.", status: "Neutral" },
    { id: 3, name: "Andi Wijaya", room: "Standard Room", rating: 1, text: "Air panas tidak menyala di pagi hari.", status: "Negative" },
    { id: 4, name: "Farrel", room: "Penthouse", rating: 5, text: "Fasilitas lengkap dan view sangat indah.", status: "Positive" },
    { id: 5, name: "Nisa Sabyan", room: "Superior Room", rating: 4, text: "Nyaman dan tenang, cocok untuk istirahat.", status: "Positive" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("All"); 
  const [filteredReviews, setFilteredReviews] = useState(reviewsData);

  const searchInputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  }, []);

  useEffect(() => {
    let results = reviewsData;
    if (searchTerm !== "") {
      results = results.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRating === "5") {
      results = results.filter(review => review.rating === 5);
    } else if (filterRating === "1-3") {
      results = results.filter(review => review.rating >= 1 && review.rating <= 3);
    }
    setFilteredReviews(results);
  }, [searchTerm, filterRating]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-900">Guest <span className="italic font-light text-gray-500">Reviews</span></h2>
            <p className="text-sm text-gray-500 font-light mt-1">Kelola ulasan tamu Capella secara real-time.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Cari nama, kamar, atau ulasan..." 
                className="pl-9 bg-white border-gray-200 shadow-sm" 
                ref={searchInputRef} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors ${
                  filterRating !== "All" ? "bg-[#3BCBBE] text-white border-[#3BCBBE]" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}>
                  <FaFilter /> 
                  {filterRating === "All" ? "Filter" : filterRating === "5" ? "Bintang 5" : "Bintang 1-3"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 font-['Helvetica']">
                <DropdownMenuItem onClick={() => setFilterRating("All")} className="flex justify-between cursor-pointer">
                  Semua Ulasan {filterRating === "All" && <FaCheck className="text-[#3BCBBE] text-xs"/>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRating("5")} className="flex justify-between cursor-pointer">
                  Bintang 5 {filterRating === "5" && <FaCheck className="text-[#3BCBBE] text-xs"/>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRating("1-3")} className="flex justify-between cursor-pointer">
                  Bintang 1-3 {filterRating === "1-3" && <FaCheck className="text-[#3BCBBE] text-xs"/>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 mb-8 flex justify-between items-center group">
          <div>
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-1">Customer Satisfaction</h3>
            <p className="text-xs text-gray-400">Target bulan ini: 90%</p>
          </div>
          <div className="text-right flex items-center gap-4">
            <div className="w-32 hidden md:block">
               <Progress value={85} className="h-2 bg-gray-50 [&>div]:bg-[#3BCBBE]" />
            </div>
            <h2 className="text-3xl font-black text-[#3BCBBE]">85%</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full relative group">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BCBBE] to-[#F5A623] flex items-center justify-center text-white font-bold shadow-sm text-sm">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{review.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{review.room}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[9px] uppercase font-bold tracking-wider ${
                    review.status === "Positive" ? "bg-[#48BB78]/10 text-[#48BB78]" : 
                    review.status === "Neutral" ? "bg-yellow-500/10 text-yellow-600" : "bg-[#E53E3E]/10 text-[#E53E3E]"
                  }`}>
                    {review.status}
                  </span>
                </div>
                
                <div className="flex text-[#F5A623] text-sm mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-[#F5A623]" : "text-gray-100"} />
                  ))}
                </div>
                
                <p className="text-sm text-gray-600 font-medium italic leading-relaxed">"{review.text}"</p>
                
                <div className="mt-auto pt-6">
                  <button className="text-[10px] font-bold text-[#3BCBBE] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 hover:text-[#2ca89d]">
                    <FaCheck size={10} /> Mark as Reviewed
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-[24px] border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <FaSearch size={24} />
              </div>
              <p className="text-gray-900 font-bold text-lg">Ulasan tidak ditemukan.</p>
              <p className="text-sm text-gray-400 mt-1">Coba ganti kata kunci atau ubah filter dropdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}