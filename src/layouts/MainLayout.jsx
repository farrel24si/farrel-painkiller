import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                
                <div className="flex-1 overflow-y-auto bg-slate-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}