import React from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Badge from "../components/Badge";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Table from "../components/Table";
import { FaArrowRight } from "react-icons/fa";

export default function Components() {
  const tableHeaders = ["Room Type", "Guests", "Price", "Status", "Action"];
  const roomData = [
    { id: 1, type: "Deluxe Suite", guests: 2, price: "$450", status: "Booked" },
    { id: 2, type: "Standard Room", guests: 1, price: "$150", status: "Available" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 pb-20 font-['Helvetica'] min-h-screen">
      <PageHeader title="Purity UI Components" breadcrumb={["Grand Farrel", "Components"]} />

      <Container className="!px-0 !py-0">
        <p className="text-gray-400 font-bold mb-8 text-sm">
          UI Kit khusus untuk Grand Farrel Hotel System.
        </p>

        {/* 1. Basic Components */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">1. Basic Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-4">Buttons (p-18, hover shadow)</h3>
              <div className="flex flex-col gap-4 items-start">
                <Button type="primary">Primary Button <FaArrowRight /></Button>
                <Button type="success">Success Action</Button>
                <Button type="danger">Danger Action</Button>
                <Button type="dark">Dark Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-4">Badges</h3>
              <div className="flex gap-3 flex-wrap">
                <Badge type="primary">New Booking</Badge>
                <Badge type="success">Confirmed</Badge>
                <Badge type="danger">Cancelled</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-4">Avatars</h3>
              <div className="flex -space-x-3">
                <Avatar name="Rafif" />
                <Avatar name="John" />
                <Avatar name="Alice" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Data Display Components */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">2. Data Display Components</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-4">Standard Card</h3>
              <Card>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Purity UI Card</h3>
                <p className="text-sm text-gray-400 font-bold">
                  Card ini menggunakan background #F8F9FA, padding 18, dan akan berubah menjadi putih murni (#FFFFFF) saat di-hover lengkap dengan shadow tipis.
                </p>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-4">Room / Product Card</h3>
              <ProductCard
                image="https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=1000&auto=format&fit=crop"
                title="Presidential Suite"
                category="Luxury"
                price="$1,200 / night"
                description="Rasakan pengalaman menginap dengan pemandangan kota terbaik dan pelayanan eksklusif 24 jam."
              />
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-400 mb-4">Table Format</h3>
          <Table headers={tableHeaders}>
            {roomData.map((room) => (
              <tr key={room.id} className="border-b border-gray-50 hover:bg-[#F8F9FA] transition-colors">
                <td className="py-4 px-4">{room.type}</td>
                <td className="py-4 px-4">
                  <div className="flex -space-x-2"><Avatar name="1" /><Avatar name="2" /></div>
                </td>
                <td className="py-4 px-4">{room.price}</td>
                <td className="py-4 px-4">
                  <Badge type={room.status === "Booked" ? "danger" : "success"}>{room.status}</Badge>
                </td>
                <td className="py-4 px-4">
                  <span className="text-[#3BCBBE] hover:text-[#313860] cursor-pointer transition-colors">Edit</span>
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* 3. Layout Components */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">3. Layout Components</h2>
          <h3 className="text-sm font-bold text-gray-400 mb-4">Footer</h3>
          <Footer />
        </div>

      </Container>
    </div>
  );
}