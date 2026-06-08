import React, { useState, useEffect, useRef } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { FaStar, FaSearch, FaFilter, FaCheck } from "react-icons/fa";

// === IMPORT KOMPONEN SHADCN UI ===
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Reviews() {
  // Data statis ulasan tamu hotel Capella
  const reviewsData = [
    { id: 1, name: "Budi Santoso", room: "Presidential Suite", rating: 5, text: "Pelayanan luar biasa! Kamar sangat bersih.", status: "Positive" },
    { id: 2, name: "Siti Aminah", room: "Deluxe Suite", rating: 3, text: "AC butuh waktu lama untuk dingin. Sarapan enak.", status: "Neutral" },
    { id: 3, name: "Andi Wijaya", room: "Standard Room", rating: 1, text: "Air panas tidak menyala di pagi hari.", status: "Negative" },
    { id: 4, name: "Farrel", room: "Penthouse", rating: 5, text: "Fasilitas lengkap dan view sangat indah.", status: "Positive" },
    { id: 5, name: "Nisa Sabyan", room: "Superior Room", rating: 4, text: "Nyaman dan tenang, cocok untuk istirahat.", status: "Positive" },
  ];

  // 1. IMPLEMENTASI USESTATE
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("All"); 
  const [filteredReviews, setFilteredReviews] = useState(reviewsData);

  // 2. IMPLEMENTASI USEREF
  const searchInputRef = useRef(null);

  // 3. IMPLEMENTASI USEEFFECT (A) - Auto Focus
  useEffect(() => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  }, []);

  // 4. IMPLEMENTASI USEEFFECT (B) - Filter Real-Time (Search + Dropdown)
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
    // Set hasil akhir ke state untuk dirender
    setFilteredReviews(results);
  }, [searchTerm, filterRating]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <PageHeader title="Reviews & Feedback" breadcrumb={["Capella", "Reviews & Feedback"]} />
      
      <div className="p-6">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Customer Feedback</h2>
            <p className="text-sm text-gray-500">Kelola ulasan tamu Capella secara real-time.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* INPUT SHADCN (Terhubung dengan useState & useRef) */}
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

            {/* DROPDOWN SHADCN (Terhubung dengan state filterRating) */}
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

        <Card className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-bold text-gray-800">Customer Satisfaction Score</h3>
              <p className="text-xs text-gray-400">Target bulan ini: 90%</p>
            </div>
            <h2 className="text-2xl font-bold text-[#3BCBBE]">85%</h2>
          </div>
          <Progress value={85} className="h-2 bg-gray-100" />
        </Card>

        {/* TAMPILAN DATA HASIL FILTER */}
        <div className="grid gap-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <Card key={review.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-shrink-0"><Avatar name={review.name} /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{review.name}</h3>
                    <span className="text-xs text-gray-400 font-bold">• {review.room}</span>
                  </div>
                  <div className="flex text-yellow-400 text-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">"{review.text}"</p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <Badge type={review.status === "Positive" ? "success" : review.status === "Neutral" ? "warning" : "danger"}>
                    {review.status}
                  </Badge>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-bold">Ulasan tidak ditemukan.</p>
              <p className="text-sm text-gray-400 mt-1">Coba ganti kata kunci atau ubah filter dropdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}