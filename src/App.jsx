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

// Implementasi Lazy Loading untuk Pages Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    // Suspense akan menampilkan komponen <Loading /> selama file halaman sedang di-download (lazy load)
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* === MAIN LAYOUT === */}
        {/* Semua route di dalam sini otomatis akan dibungkus Sidebar dan Header */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
        </Route>

        {/* === AUTH LAYOUT === */}
        {/* Semua route di dalam sini otomatis akan pakai background polos di tengah layar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* === ERROR PAGES === */}
        {/* Error pages tidak pakai layout apa-apa biar full screen */}
        <Route path="/error-400" element={<ErrorPage code="400" description="Bad Request. Permintaan tidak dapat diproses." image="https://cdni.iconscout.com/illustration/premium/thumb/bad-request-4344458-3613886.png" />} />
        <Route path="/error-401" element={<ErrorPage code="401" description="Unauthorized. Kamu tidak memiliki akses ke sistem ini." image="https://cdni.iconscout.com/illustration/premium/thumb/unauthorized-access-4344456-3613884.png" />} />
        <Route path="/error-403" element={<ErrorPage code="403" description="Forbidden. Akses ditolak." image="https://cdni.iconscout.com/illustration/premium/thumb/forbidden-4344457-3613885.png" />} />
        
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}