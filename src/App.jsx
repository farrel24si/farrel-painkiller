import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
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

// === TAMBAHAN BARU: Lazy Loading untuk Notes ===
const Notes = React.lazy(() => import("./pages/Notes"));

// Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<LandingPage />} />

        {/* MAIN LAYOUT (Admin Panel) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/users" element={<Users />} />
          <Route path="/inventory" element={<Inventori />} />
          <Route path="/inventory/:id" element={<InventoriDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* === TAMBAHAN BARU: Route untuk Notes === */}
          <Route path="/notes" element={<Notes />} />
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