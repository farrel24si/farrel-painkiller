import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const routeMeta = {
  "/dashboard": { title: "Dashboard",        breadcrumb: ["Capella", "Dashboard"] },
  "/bookings":  { title: "Room Bookings",    breadcrumb: ["Capella", "Bookings"] },
  "/guests":    { title: "Guest Registry",   breadcrumb: ["Capella", "Guests"] },
  "/users":     { title: "User Management",  breadcrumb: ["Capella", "Users"] },
  "/inventory": { title: "Inventory",        breadcrumb: ["Capella", "Inventory"] },
  "/reviews":   { title: "Reviews",          breadcrumb: ["Capella", "Reviews"] },
  "/profile":   { title: "Profil Saya",      breadcrumb: ["Capella", "Profil"] },
  "/notes":     { title: "Internal Notes",   breadcrumb: ["Capella", "Notes"] },
};

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(session);
      if (parsedUser.role !== "admin") {
        // Jika bukan admin, redirect ke area member
        navigate("/member");
      } else {
        setUser(parsedUser);
      }
    }
  }, [navigate]);

  // Handle dynamic route /inventory/:id
  const isInventoryDetail = pathname.startsWith("/inventory/") && pathname !== "/inventory";

  const meta = isInventoryDetail
    ? { title: "Inventory Detail", breadcrumb: ["Capella", "Inventory", "Detail"] }
    : routeMeta[pathname] ?? { title: "Page", breadcrumb: ["Capella", "Page"] };

  if (!user) return null;

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