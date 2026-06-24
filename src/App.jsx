import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import MemberLayout from "./layouts/MemberLayout";
import GuestLayout from "./layouts/GuestLayout";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

// Pages
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Bookings = React.lazy(() => import("./pages/Bookings")); 
const Guests = React.lazy(() => import("./pages/Guests")); 
const Users = React.lazy(() => import("./pages/Users")); 
const Reviews = React.lazy(() => import("./pages/Reviews"));
const Inventori = React.lazy(() => import("./pages/Inventori"));
const InventoriDetail = React.lazy(() => import("./pages/InventoriDetail"));
const Notes = React.lazy(() => import("./pages/Notes"));

// Member Pages
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));
const RewardsPage = React.lazy(() => import("./pages/RewardsPage"));

// Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* PUBLIC ROUTE (Hanya menggunakan GuestLayout) */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<LandingPage />} />
          {/* Kalau nanti ada halaman publik lain, taruh di sini */}
        </Route>

        {/* MAIN LAYOUT (Admin Panel) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/users" element={<Users />} />
          <Route path="/inventory" element={<Inventori />} />
          <Route path="/inventory/:id" element={<InventoriDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notes" element={<Notes />} />
        </Route>

        {/* MEMBER LAYOUT (Member Area) */}
        <Route element={<MemberLayout />}>
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/rewards" element={<RewardsPage />} />
        </Route>

        {/* AUTH LAYOUT */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}