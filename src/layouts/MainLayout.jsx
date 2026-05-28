import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const routeMeta = {
  "/":          { title: "Dashboard",            breadcrumb: ["Capella", "Dashboard"] },
  "/bookings":  { title: "Room Bookings",        breadcrumb: ["Capella", "Bookings"] },
  "/guests":    { title: "Guest Registry",       breadcrumb: ["Capella", "Guests"] },
  "/inventory": { title: "Inventory Management", breadcrumb: ["Capella", "Inventory"] },
  "/reviews":   { title: "Reviews & Feedback",   breadcrumb: ["Grand Farrel", "Reviews & Feedback"] },
};

export default function MainLayout() {
  const { pathname } = useLocation();

  // Handle dynamic route /inventory/:id
  const isInventoryDetail = pathname.startsWith("/inventory/") && pathname !== "/inventory";

  const meta = isInventoryDetail
    ? { title: "Inventory Detail", breadcrumb: ["Capella", "Inventory", "Detail"] }
    : routeMeta[pathname] ?? { title: "Page", breadcrumb: ["Capella", "Page"] };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={meta.title} breadcrumb={meta.breadcrumb} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}