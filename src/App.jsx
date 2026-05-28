import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Import Layouts & Komponen Statis
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

// Implementasi Lazy Loading untuk Pages Utama (Tema Hotel)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Bookings = React.lazy(() => import("./pages/Bookings")); 
const Guests = React.lazy(() => import("./pages/Guests")); 

// Lazy Loading untuk Inventory
const Inventori = React.lazy(() => import("./pages/Inventori"));
const InventoriDetail = React.lazy(() => import("./pages/InventoriDetail"));

// === TAMBAHAN BARU: Lazy Loading untuk Reviews ===
const Reviews = React.lazy(() => import("./pages/Reviews"));

// Implementasi Lazy Loading untuk Pages Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* === MAIN LAYOUT === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
          
          <Route path="/inventory" element={<Inventori />} />
          <Route path="/inventory/:id" element={<InventoriDetail />} />

          <Route path="/reviews" element={<Reviews />} />
        </Route>

        {/* === AUTH LAYOUT === */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* === ERROR PAGES === */}
        <Route path="/error-400" element={<ErrorPage code="400" description="Bad Request. Permintaan tidak dapat diproses." image="https://cdni.iconscout.com/illustration/premium/thumb/bad-request-4344458-3613886.png" />} />
        <Route path="/error-401" element={<ErrorPage code="401" description="Unauthorized. Kamu tidak memiliki akses ke sistem ini." image="https://cdni.iconscout.com/illustration/premium/thumb/unauthorized-access-4344456-3613884.png" />} />
        <Route path="/error-403" element={<ErrorPage code="403" description="Forbidden. Akses ditolak." image="https://cdni.iconscout.com/illustration/premium/thumb/forbidden-4344457-3613885.png" />} />
        
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}