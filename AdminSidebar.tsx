"use client";

import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Newspaper,
  Settings,
  HelpCircle,
  Users,
  DoorOpen,
  CreditCard,
  Globe,
  FileText,
  Lock,
  ChevronLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type AdminSection =
  | "overview"
  | "books"
  | "events"
  | "news"
  | "services"
  | "faqs"
  | "staff"
  | "rooms"
  | "plans"
  | "resources"
  | "site-settings"
  | "change-password";

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { key: AdminSection; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "books", label: "Books", icon: BookOpen },
  { key: "events", label: "Events", icon: Calendar },
  { key: "news", label: "News", icon: Newspaper },
  { key: "services", label: "Services", icon: Settings },
  { key: "faqs", label: "FAQs", icon: HelpCircle },
  { key: "staff", label: "Staff", icon: Users },
  { key: "rooms", label: "Rooms", icon: DoorOpen },
  { key: "plans", label: "Membership Plans", icon: CreditCard },
  { key: "resources", label: "Digital Resources", icon: Globe },
  { key: "site-settings", label: "Site Settings", icon: FileText },
  { key: "change-password", label: "Change Password", icon: Lock },
];

export default function AdminSidebar({ activeSection, onSectionChange, isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#222222] transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C63134] flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Admin Panel</div>
              <div className="text-[#999] text-[10px]">OSGU Library</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-[#333] h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Nav items */}
        <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 73px)" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onSectionChange(item.key);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#C63134] text-white"
                    : "text-[#CCCCCC] hover:bg-[#333] hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
