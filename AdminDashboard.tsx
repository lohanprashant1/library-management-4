"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  LogOut,
  ExternalLink,
  BookOpen,
  Calendar,
  Newspaper,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar, { type AdminSection } from "./AdminSidebar";
import AdminOverview from "./AdminOverview";
import BookManager from "./BookManager";
import EventManager from "./EventManager";
import NewsManager from "./NewsManager";
import ServiceManager from "./ServiceManager";
import FAQManager from "./FAQManager";
import StaffManager from "./StaffManager";
import RoomManager from "./RoomManager";
import PlanManager from "./PlanManager";
import ResourceManager from "./ResourceManager";
import SiteSettings from "./SiteSettings";
import ChangePassword from "./ChangePassword";

interface AdminDashboardProps {
  token: string;
  adminName: string;
  onLogout: () => void;
  onViewWebsite: () => void;
}

export default function AdminDashboard({ token, adminName, onLogout, onViewWebsite }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore
    }
    onLogout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview": return <AdminOverview token={token} onNavigate={setActiveSection} />;
      case "books": return <BookManager token={token} />;
      case "events": return <EventManager token={token} />;
      case "news": return <NewsManager token={token} />;
      case "services": return <ServiceManager token={token} />;
      case "faqs": return <FAQManager token={token} />;
      case "staff": return <StaffManager token={token} />;
      case "rooms": return <RoomManager token={token} />;
      case "plans": return <PlanManager token={token} />;
      case "resources": return <ResourceManager token={token} />;
      case "site-settings": return <SiteSettings token={token} />;
      case "change-password": return <ChangePassword token={token} />;
      default: return <AdminOverview token={token} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-[#16191A] capitalize">
                  {activeSection === "site-settings" ? "Site Settings" : 
                   activeSection === "change-password" ? "Change Password" : 
                   activeSection}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-[#EBEBEB] text-[#333] hover:bg-[#F5F5F5]"
                onClick={onViewWebsite}
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                View Website
              </Button>
              <div className="hidden sm:block h-6 w-px bg-[#EBEBEB] mx-1" />
              <div className="hidden sm:flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-full bg-[#C63134] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{adminName.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-[#333]">{adminName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#C63134] hover:bg-red-50 hover:text-[#C63134]"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
