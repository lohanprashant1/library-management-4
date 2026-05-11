"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  Users,
  Newspaper,
  Monitor,
  GraduationCap,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Library,
  Globe,
} from "lucide-react";
import type { PageKey } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Users,
  Newspaper,
  Monitor,
  GraduationCap,
  Clock,
  Star,
  Globe,
  MapPin,
  Library,
  Search,
};

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
  onSearch: (query: string) => void;
}

const DEFAULT_STATS = [
  { icon: BookOpen, value: 50000, label: "Books & Volumes", suffix: "+" },
  { icon: Newspaper, value: 500, label: "Journals & Periodicals", suffix: "+" },
  { icon: Users, value: 10000, label: "Registered Members", suffix: "+" },
  { icon: Monitor, value: 200, label: "E-Resources & Databases", suffix: "+" },
];

const DEFAULT_FEATURED_BOOKS = [
  { title: "Machine Learning and AI", author: "Priya Sharma", genre: "Computer Science", color: "#C63134" },
  { title: "Modern Physics: From Atoms to Quarks", author: "Robert Williams", genre: "Physics", color: "#0095EB" },
  { title: "Business Management Strategies", author: "James Wilson", genre: "Business", color: "#75B740" },
  { title: "Environmental Science Today", author: "Amanda Green", genre: "Environment", color: "#DBAA36" },
  { title: "Biotechnology: Principles & Applications", author: "Rajesh Kumar", genre: "Biology", color: "#E98F10" },
  { title: "Digital Signal Processing", author: "Alan Oppenheim", genre: "Engineering", color: "#0E76A8" },
];

const QUICK_LINKS = [
  { label: "Search Catalog", icon: Search, page: "catalog" as PageKey, color: "#C63134" },
  { label: "Digital Resources", icon: Globe, page: "digital" as PageKey, color: "#0095EB" },
  { label: "My Account", icon: Users, page: "account" as PageKey, color: "#75B740" },
  { label: "Research Tools", icon: GraduationCap, page: "research" as PageKey, color: "#DBAA36" },
  { label: "Book a Room", icon: MapPin, page: "rooms" as PageKey, color: "#E98F10" },
  { label: "Events & Programs", icon: Clock, page: "events" as PageKey, color: "#0E76A8" },
];

const DEFAULT_ANNOUNCEMENTS = [
  { title: "Extended Hours During Exam Season", date: "Apr 10, 2025", icon: Clock, color: "#C63134" },
  { title: "New Digital Archives: 1,000+ Rare Manuscripts", date: "Apr 8, 2025", icon: Globe, color: "#0095EB" },
  { title: "Best Academic Library Award 2025", date: "Apr 5, 2025", icon: Star, color: "#DBAA36" },
  { title: "Spring Book Fair: 2,500+ New Titles", date: "Apr 1, 2025", icon: BookOpen, color: "#75B740" },
  { title: "Library Mobile App Launched", date: "Mar 25, 2025", icon: Monitor, color: "#E98F10" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const callbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={callbackRef} className="text-3xl sm:text-4xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const BOOK_COLORS = ["#C63134", "#0095EB", "#75B740", "#DBAA36", "#E98F10", "#0E76A8"];

export default function HomePage({ onNavigate, onSearch }: HomePageProps) {
  const [heroSearch, setHeroSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState<{ badge?: string; title?: string; description?: string } | null>(null);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [featuredBooks, setFeaturedBooks] = useState(DEFAULT_FEATURED_BOOKS);
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS);

  useEffect(() => {
    const fetchHero = fetch("/api/content?section=hero")
      .then((r) => r.json())
      .then((data) => data.content ? setHeroContent(data.content) : null)
      .catch(() => {});

    const fetchStats = fetch("/api/content?section=stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          const mapped = data.content.map((s: { icon?: string; value: number; label: string; suffix?: string }, idx: number) => ({
            icon: s.icon && ICON_MAP[s.icon] ? ICON_MAP[s.icon] : DEFAULT_STATS[idx]?.icon || BookOpen,
            value: s.value,
            label: s.label,
            suffix: s.suffix || "+",
          }));
          setStats(mapped);
        }
      })
      .catch(() => {});

    const fetchAnnouncements = fetch("/api/content?section=announcements")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          const mapped = data.content.map((a: { title: string; date: string; icon?: string; color?: string }, idx: number) => ({
            title: a.title,
            date: a.date,
            icon: a.icon && ICON_MAP[a.icon] ? ICON_MAP[a.icon] : DEFAULT_ANNOUNCEMENTS[idx]?.icon || Clock,
            color: a.color || DEFAULT_ANNOUNCEMENTS[idx]?.color || "#C63134",
          }));
          setAnnouncements(mapped);
        }
      })
      .catch(() => {});

    const fetchBooks = fetch("/api/books?available=true&featured=true")
      .then((r) => r.json())
      .then((data) => {
        if (data.books && Array.isArray(data.books) && data.books.length > 0) {
          const mapped = data.books.map((b: { title: string; author?: string; genre?: string; category?: string; color?: string }, idx: number) => ({
            title: b.title,
            author: b.author || "OSGU Library",
            genre: b.genre || b.category || "General",
            color: b.color || BOOK_COLORS[idx % BOOK_COLORS.length],
          }));
          setFeaturedBooks(mapped);
        }
      })
      .catch(() => {});

    Promise.allSettled([fetchHero, fetchStats, fetchAnnouncements, fetchBooks]).finally(() => setLoading(false));
  }, []);

  const heroBadge = heroContent?.badge || "Welcome to OSGU Central Library";
  const heroTitle = heroContent?.title;
  const heroDescription = heroContent?.description;

  const handleHeroSearch = () => {
    if (heroSearch.trim()) {
      onSearch(heroSearch);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#191919] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #C63134 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0095EB 0%, transparent 50%), radial-gradient(circle at 60% 80%, #DBAA36 0%, transparent 50%)`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-[#C63134] text-white mb-4 px-4 py-1 text-sm">
              <Library className="w-3.5 h-3.5 mr-1.5" />
              {heroBadge}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {heroTitle ? heroTitle.split(/(Knowledge|Discovery)/).map((part, i) => {
                if (part === "Knowledge") return <span key={i} className="text-[#C63134]">Knowledge</span>;
                if (part === "Discovery") return <span key={i} className="text-[#0095EB]">Discovery</span>;
                return part;
              }) : <>Your Gateway to{" "}<span className="text-[#C63134]">Knowledge</span> &{" "}<span className="text-[#0095EB]">Discovery</span></>}
            </h1>
            <p className="text-[#CCCCCC] text-lg mb-8 max-w-2xl mx-auto">
              {heroDescription || "Explore our vast collection of 50,000+ books, 500+ journals, digital resources, and research databases. Empowering education and research at OSGU."}
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                <Input
                  type="text"
                  placeholder="Search books, authors, journals..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                  className="pl-10 h-12 bg-white text-[#16191A] rounded-r-none border-0 shadow-lg"
                />
              </div>
              <Button
                onClick={handleHeroSearch}
                className="h-12 bg-[#C63134] hover:bg-[#CC383E] text-white px-6 rounded-l-none shadow-lg font-medium"
              >
                Search
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-[#999999] text-sm">
              Popular: Machine Learning, Physics, Business, Chemistry, Psychology
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#C63134]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {loading ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded" />
                <div className="h-10 w-24 mx-auto bg-white/20 rounded mb-1" />
                <div className="h-4 w-32 mx-auto bg-white/10 rounded" />
              </div>
            )) : stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-white/80" />
                </div>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Quick Access
            </h2>
            <p className="text-[#666666]">Find what you need quickly</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="osgu-card bg-white rounded-xl p-4 text-center border border-[#EBEBEB] hover:border-transparent"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${link.color}15` }}
                >
                  <link.icon className="w-6 h-6" style={{ color: link.color }} />
                </div>
                <div className="text-sm font-medium text-[#16191A]">{link.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-1">
                Featured Books
              </h2>
              <p className="text-[#666666] text-sm">Recently added to our collection</p>
            </div>
            <Button
              variant="outline"
              className="border-[#C63134] text-[#C63134] hover:bg-[#C63134] hover:text-white"
              onClick={() => onNavigate("catalog")}
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {loading ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="osgu-card overflow-hidden border-0 bg-white">
                <div className="h-40 bg-[#F1F1F1] animate-pulse" />
                <CardContent className="p-3">
                  <div className="h-4 w-full bg-[#EBEBEB] rounded mb-2 animate-pulse" />
                  <div className="h-3 w-2/3 bg-[#EBEBEB] rounded animate-pulse" />
                </CardContent>
              </Card>
            )) : featuredBooks.map((book, i) => (
              <Card
                key={i}
                className="osgu-card overflow-hidden border-0 bg-white cursor-pointer"
                onClick={() => onNavigate("catalog")}
              >
                <div
                  className="h-40 flex items-center justify-center relative"
                  style={{ backgroundColor: `${book.color}15` }}
                >
                  <BookOpen className="w-10 h-10" style={{ color: book.color }} />
                  <Badge
                    className="absolute top-2 right-2 text-xs"
                    style={{ backgroundColor: book.color, color: "white" }}
                  >
                    {book.genre}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm text-[#16191A] line-clamp-2 leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#666666] mt-1">{book.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements & Services */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Announcements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#16191A]">Latest Announcements</h2>
                <Button
                  variant="link"
                  className="text-[#C63134] p-0"
                  onClick={() => onNavigate("news")}
                >
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-[#EBEBEB]">
                    <div className="w-10 h-10 rounded-lg bg-[#F1F1F1] animate-pulse flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-[#EBEBEB] rounded mb-2 animate-pulse" />
                      <div className="h-3 w-1/3 bg-[#EBEBEB] rounded animate-pulse" />
                    </div>
                  </div>
                )) : announcements.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white rounded-lg p-3 border border-[#EBEBEB] hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onNavigate("news")}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-[#16191A] truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#666666] mt-0.5">{item.date}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#CCCCCC] flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Library Services Preview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#16191A]">Our Services</h2>
                <Button
                  variant="link"
                  className="text-[#C63134] p-0"
                  onClick={() => onNavigate("services")}
                >
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Book Borrowing", desc: "Borrow up to 10 books", color: "#C63134" },
                  { name: "Digital Resources", desc: "E-books, journals & more", color: "#0095EB" },
                  { name: "Research Support", desc: "Expert guidance available", color: "#75B740" },
                  { name: "Study Rooms", desc: "Book a quiet space", color: "#DBAA36" },
                ].map((svc, i) => (
                  <Card
                    key={i}
                    className="osgu-card border-0 bg-white cursor-pointer"
                    onClick={() => onNavigate("services")}
                  >
                    <CardContent className="p-4">
                      <div
                        className="w-3 h-3 rounded-full mb-2"
                        style={{ backgroundColor: svc.color }}
                      />
                      <h3 className="font-semibold text-sm text-[#16191A]">{svc.name}</h3>
                      <p className="text-xs text-[#666666] mt-1">{svc.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#222222] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Explore?
          </h2>
          <p className="text-[#CCCCCC] mb-8 max-w-xl mx-auto">
            Join thousands of students and researchers who rely on OSGU Central Library for their academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-[#C63134] hover:bg-[#CC383E] text-white px-8 h-12 font-medium"
              onClick={() => onNavigate("membership")}
            >
              Become a Member
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 h-12"
              onClick={() => onNavigate("contact")}
            >
              Visit the Library
              <MapPin className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
