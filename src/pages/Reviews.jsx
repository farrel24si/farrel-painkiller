import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { FaStar, FaSearch, FaFilter } from "react-icons/fa";

// === IMPORT 3 KOMPONEN SHADCN UI ===
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
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] font-['Helvetica'] min-h-screen">
      <PageHeader title="Reviews & Feedback" breadcrumb={["Capella", "Reviews & Feedback"]} />
      
      <div className="p-6">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Customer Feedback</h2>
            <p className="text-sm text-gray-500">Kelola ulasan dan keluhan dari tamu hotel.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* SHADCN KOMPONEN 1: INPUT */}
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <Input type="text" placeholder="Cari ulasan tamu..." className="pl-9 bg-white border-gray-200" />
            </div>

            {/* SHADCN KOMPONEN 2: DROPDOWN MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50 text-sm font-medium">
                  <FaFilter className="text-gray-500" /> Filter
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 font-['Helvetica']">
                <DropdownMenuItem>Semua Ulasan</DropdownMenuItem>
                <DropdownMenuItem>Bintang 5</DropdownMenuItem>
                <DropdownMenuItem>Bintang 1-3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* SHADCN KOMPONEN 3: PROGRESS */}
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

        <div className="grid gap-4">
          {reviewsData.map((review) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}