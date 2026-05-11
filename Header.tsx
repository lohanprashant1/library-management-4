"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  Search,
  X,
  Phone,
  Mail,
  User,
  BookOpen,
  Home,
  Search as SearchIcon,
  Database,
  Settings2,
  CalendarDays,
  FlaskConical,
  DoorOpen,
  Newspaper,
  Info,
  PhoneCall,
  CreditCard,
  HelpCircle,
  Baby,
  LogIn,
} from "lucide-react";
import type { PageKey } from "@/lib/types";
import { NAV_ITEMS } from "@/lib/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  home: <Home className="w-4 h-4" />,
  catalog: <SearchIcon className="w-4 h-4" />,
  digital: <Database className="w-4 h-4" />,
  services: <Settings2 className="w-4 h-4" />,
  events: <CalendarDays className="w-4 h-4" />,
  research: <FlaskConical className="w-4 h-4" />,
  rooms: <DoorOpen className="w-4 h-4" />,
  news: <Newspaper className="w-4 h-4" />,
  about: <Info className="w-4 h-4" />,
  contact: <PhoneCall className="w-4 h-4" />,
  membership: <CreditCard className="w-4 h-4" />,
  faq: <HelpCircle className="w-4 h-4" />,
  kids: <Baby className="w-4 h-4" />,
  account: <LogIn className="w-4 h-4" />,
};

interface HeaderProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  onSearch: (query: string) => void;
}

const DEFAULT_HEADER = {
  ticker: [
    "📚 New Arrivals: 2,500+ books added to our collection — Browse the Catalog now!",
    "📢 Admissions Open for 2025-26 — Visit the Admission Office for details",
    "🏆 OSGU Central Library wins \"Best Academic Library\" Award 2025",
    "⏰ Extended Hours: Library open until 11 PM during exam season (April 15 - May 10)",
    "📱 New OSGU Library Mobile App — Download now on Android & iOS",
  ],
  phone: "+91-12345-67890",
  email: "library@osgu.ac.in",
  libraryName: "CENTRAL LIBRARY",
  universityName: "Om Sterling Global University",
};

export default function Header({ currentPage, onNavigate, onSearch }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerData, setHeaderData] = useState(DEFAULT_HEADER);

  useEffect(() => {
    fetch("/api/content?section=header")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && typeof data.content === "object") {
          setHeaderData({ ...DEFAULT_HEADER, ...data.content });
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleNavClick = (key: PageKey) => {
    onNavigate(key);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-[#C63134] text-white text-sm py-1.5 overflow-hidden">
        <div className="flex items-center h-6">
          <div className="animate-ticker whitespace-nowrap flex gap-16">
            {headerData.ticker.map((text, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                {text}
                <span className="mx-4 opacity-40">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Contact Bar */}
      <div className="bg-[#222222] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
          <div className="hidden sm:flex items-center gap-4 text-[#CCCCCC]">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {headerData.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {headerData.email}
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto text-[#CCCCCC]">
            <button
              onClick={() => handleNavClick("account")}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">My Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-[#EBEBEB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src="https://www.osgu.ac.in/wp-content/uploads/2020/11/OSGU_LOGO-2.png"
              alt="OSGU Logo"
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-[#C63134] font-bold text-lg leading-tight">{headerData.libraryName}</div>
              <div className="text-[#666666] text-xs">{headerData.universityName}</div>
            </div>
          </button>

          {/* Desktop Search Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search books, authors, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-64"
                />
                <Button onClick={handleSearch} size="sm" className="bg-[#C63134] hover:bg-[#CC383E] text-white">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="border-[#EBEBEB] text-[#666666]"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Catalog
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5 text-[#333]" />
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5 text-[#333]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="bg-[#C63134] text-white p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://www.osgu.ac.in/wp-content/uploads/2020/11/OSGU_LOGO-2.png"
                      alt="OSGU"
                      className="h-10 w-auto"
                    />
                    <div>
                      <div className="font-bold">{headerData.libraryName}</div>
                      <div className="text-sm opacity-80">OSGU</div>
                    </div>
                  </div>
                </div>
                {/* Mobile Search */}
                <div className="p-4 border-b border-[#EBEBEB]">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button
                      size="sm"
                      className="bg-[#C63134] hover:bg-[#CC383E] text-white flex-shrink-0"
                      onClick={handleSearch}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {/* Mobile Nav Items */}
                <nav className="py-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        currentPage === item.key
                          ? "bg-[#C63134]/10 text-[#C63134] font-medium border-l-3 border-[#C63134]"
                          : "text-[#333] hover:bg-[#F1F1F1]"
                      }`}
                    >
                      {ICON_MAP[item.key]}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-[#EBEBEB] bg-[#F1F1F1]/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    currentPage === item.key
                      ? "text-[#C63134] border-[#C63134]"
                      : "text-[#333] border-transparent hover:text-[#C63134] hover:border-[#C63134]/30"
                  }`}
                >
                  <span className="hidden lg:inline">{ICON_MAP[item.key]}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar (expandable) */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Search books, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus
              />
              <Button
                size="sm"
                className="bg-[#C63134] hover:bg-[#CC383E] text-white flex-shrink-0"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
