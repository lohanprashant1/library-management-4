"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/library/Header";
import Footer from "@/components/library/Footer";
import HomePage from "@/components/library/HomePage";
import CatalogPage from "@/components/library/CatalogPage";
import DigitalResourcesPage from "@/components/library/DigitalResourcesPage";
import ServicesPage from "@/components/library/ServicesPage";
import EventsPage from "@/components/library/EventsPage";
import MyAccountPage from "@/components/library/MyAccountPage";
import ResearchPage from "@/components/library/ResearchPage";
import RoomsPage from "@/components/library/RoomsPage";
import AboutPage from "@/components/library/AboutPage";
import ContactPage from "@/components/library/ContactPage";
import KidsTeensPage from "@/components/library/KidsTeensPage";
import NewsPage from "@/components/library/NewsPage";
import MembershipPage from "@/components/library/MembershipPage";
import FAQPage from "@/components/library/FAQPage";
import BackToTop from "@/components/library/BackToTop";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { PageKey } from "@/lib/types";

const PAGE_LABELS: Record<PageKey, string> = {
  home: "Home", catalog: "Catalog Search", digital: "Digital Resources",
  services: "Services", events: "Events & Programs", account: "My Account",
  research: "Research & Learning", rooms: "Rooms & Spaces", about: "About Us",
  contact: "Contact & Hours", kids: "Kids & Teens", news: "News & Blog",
  membership: "Membership", faq: "FAQ / Help",
};

function PageContent({ page, onNavigate, onSearch }: { page: PageKey; onNavigate: (p: PageKey) => void; onSearch: (q: string) => void }) {
  switch (page) {
    case "home": return <HomePage onNavigate={onNavigate} onSearch={onSearch} />;
    case "catalog": return <CatalogPage />;
    case "digital": return <DigitalResourcesPage />;
    case "services": return <ServicesPage />;
    case "events": return <EventsPage />;
    case "account": return <MyAccountPage />;
    case "research": return <ResearchPage />;
    case "rooms": return <RoomsPage />;
    case "about": return <AboutPage />;
    case "contact": return <ContactPage />;
    case "kids": return <KidsTeensPage />;
    case "news": return <NewsPage />;
    case "membership": return <MembershipPage />;
    case "faq": return <FAQPage />;
    default: return <HomePage onNavigate={onNavigate} onSearch={onSearch} />;
  }
}

type ViewMode = "website" | "admin-login" | "admin-dashboard";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("website");
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>("Admin");

  // Auto-seed database on first visit
  useEffect(() => {
    fetch("/api/seed")
      .then((r) => r.json())
      .then((d) => console.log("DB:", d.message))
      .catch(() => {});
  }, []);

  // Check for saved admin token
  useEffect(() => {
    const savedToken = localStorage.getItem("osgu_admin_token");
    const savedName = localStorage.getItem("osgu_admin_name");
    if (savedToken && savedName) {
      fetch("/api/admin/verify", {
        headers: { Authorization: `Bearer ${savedToken}`, "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) { setAdminToken(savedToken); setAdminName(savedName); }
          else { localStorage.removeItem("osgu_admin_token"); localStorage.removeItem("osgu_admin_name"); }
        })
        .catch(() => {});
    }
  }, []);

  const handleNavigate = useCallback((page: PageKey) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = useCallback((query: string) => { setCurrentPage("catalog"); }, []);

  const handleAdminLogin = (token: string) => {
    setAdminToken(token); setAdminName("Library Admin"); setViewMode("admin-dashboard");
    localStorage.setItem("osgu_admin_token", token); localStorage.setItem("osgu_admin_name", "Library Admin");
  };

  const handleAdminLogout = () => {
    setAdminToken(null); setAdminName("Admin"); setViewMode("website");
    localStorage.removeItem("osgu_admin_token"); localStorage.removeItem("osgu_admin_name");
  };

  if (viewMode === "admin-login") return <AdminLogin onLogin={handleAdminLogin} />;

  if (viewMode === "admin-dashboard" && adminToken) {
    return <AdminDashboard token={adminToken} adminName={adminName} onLogout={handleAdminLogout} onViewWebsite={() => setViewMode("website")} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFC]">
      <Header currentPage={currentPage} onNavigate={handleNavigate} onSearch={handleSearch} />
      {currentPage !== "home" && (
        <div className="bg-white border-b border-[#EBEBEB]">
          <div className="max-w-7xl mx-auto px-4 py-2.5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-[#0095EB] hover:text-[#C63134] cursor-pointer text-sm" onClick={() => handleNavigate("home")}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-[#16191A]">{PAGE_LABELS[currentPage]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <PageContent page={currentPage} onNavigate={handleNavigate} onSearch={handleSearch} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} onOpenAdmin={() => setViewMode(adminToken ? "admin-dashboard" : "admin-login")} />
      <BackToTop />
    </div>
  );
}
