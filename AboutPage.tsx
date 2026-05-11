"use client";

import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Newspaper: Award,
  Monitor: Globe,
  Users,
  MapPin,
  Clock,
  Building2,
  Globe,
  GraduationCap,
  TrendingUp,
  Award,
  Phone,
  Mail,
};

const DEFAULT_TIMELINE = [
  { year: "2005", event: "Library established with 5,000 volumes", color: "#C63134" },
  { year: "2008", event: "First digital resources introduced", color: "#0095EB" },
  { year: "2010", event: "New library building inaugurated", color: "#75B740" },
  { year: "2013", event: "100,000th volume added to collection", color: "#DBAA36" },
  { year: "2015", event: "Automated library management system deployed", color: "#E98F10" },
  { year: "2018", event: "Digital resource center launched", color: "#0E76A8" },
  { year: "2020", event: "Online services expanded during pandemic", color: "#8B5CF6" },
  { year: "2023", event: "50,000+ volumes, 500+ journals milestone", color: "#EC4899" },
  { year: "2025", event: "Best Academic Library Award", color: "#C63134" },
];

const TIMELINE_COLORS = ["#C63134", "#0095EB", "#75B740", "#DBAA36", "#E98F10", "#0E76A8", "#8B5CF6", "#EC4899", "#C63134"];

const DEFAULT_STAFF = [
  { name: "Dr. Meera Patel", role: "Chief Librarian", email: "meera.patel@osgu.ac.in", color: "#C63134", initials: "MP" },
  { name: "Prof. Rajesh Verma", role: "Deputy Librarian", email: "rajesh.verma@osgu.ac.in", color: "#0095EB", initials: "RV" },
  { name: "Dr. Anita Sharma", role: "Head, Digital Resources", email: "anita.sharma@osgu.ac.in", color: "#75B740", initials: "AS" },
  { name: "Mr. Suresh Kumar", role: "Head, Technical Services", email: "suresh.kumar@osgu.ac.in", color: "#DBAA36", initials: "SK" },
  { name: "Ms. Priya Singh", role: "Reference Librarian", email: "priya.singh@osgu.ac.in", color: "#E98F10", initials: "PS" },
  { name: "Mr. Vikram Joshi", role: "Systems Librarian", email: "vikram.joshi@osgu.ac.in", color: "#0E76A8", initials: "VJ" },
  { name: "Dr. Kavita Reddy", role: "Research Support", email: "kavita.reddy@osgu.ac.in", color: "#8B5CF6", initials: "KR" },
  { name: "Mr. Arun Gupta", role: "Circulation Manager", email: "arun.gupta@osgu.ac.in", color: "#EC4899", initials: "AG" },
];

const DEFAULT_LIBRARY_STATS = [
  { label: "Year Established", value: "2005", icon: Building2, color: "#C63134" },
  { label: "Total Collection", value: "50,000+", icon: BookOpen, color: "#0095EB" },
  { label: "E-Resources", value: "200+", icon: Globe, color: "#75B740" },
  { label: "Daily Visitors", value: "1,500+", icon: Users, color: "#DBAA36" },
  { label: "Total Area", value: "25,000 sq ft", icon: MapPin, color: "#E98F10" },
  { label: "Operating Since", value: "20 years", icon: Clock, color: "#0E76A8" },
];

const DEFAULT_POLICIES = [
  { title: "Borrowing Policy", desc: "Students can borrow up to 10 books for 14 days with 2 renewals. Faculty members can borrow up to 20 books for 30 days." },
  { title: "Late Return Policy", desc: "A fine of ₹5 per day per book is charged for overdue items. Borrowing privileges are suspended if fines exceed ₹100." },
  { title: "Library Conduct", desc: "Users must maintain silence in quiet zones. Mobile phones must be on silent mode. Food and drinks are not allowed near books." },
  { title: "Loss & Damage", desc: "Users are responsible for lost or damaged books. Replacement cost plus processing fee of ₹100 will be charged." },
  { title: "Digital Resource Policy", desc: "E-resources are for academic use only. Systematic downloading is prohibited. Violation may result in access suspension." },
  { title: "Reservation Policy", desc: "Items on loan can be reserved online. Reserved items are held for 3 days at the circulation desk." },
];

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState(DEFAULT_STAFF);
  const [aboutContent, setAboutContent] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchStaff = fetch("/api/staff")
      .then((r) => r.json())
      .then((data) => {
        if (data.staff && Array.isArray(data.staff) && data.staff.length > 0) {
          const STAFF_COLORS = ["#C63134", "#0095EB", "#75B740", "#DBAA36", "#E98F10", "#0E76A8", "#8B5CF6", "#EC4899"];
          const mapped = data.staff.map((s: { name: string; role?: string; email?: string; color?: string; initials?: string }, idx: number) => ({
            name: s.name,
            role: s.role || DEFAULT_STAFF[idx]?.role || "",
            email: s.email || DEFAULT_STAFF[idx]?.email || "",
            color: s.color || STAFF_COLORS[idx % STAFF_COLORS.length],
            initials: s.initials || (s.name ? s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() : ""),
          }));
          setStaff(mapped);
        }
      })
      .catch(() => {});

    const fetchAbout = fetch("/api/content?section=about_page")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && typeof data.content === "object") {
          setAboutContent(data.content);
        }
      })
      .catch(() => {});

    Promise.allSettled([fetchStaff, fetchAbout]).finally(() => setLoading(false));
  }, []);

  // Use dynamic content with fallbacks
  const mission = aboutContent?.mission || "To provide comprehensive information resources and innovative library services that support the teaching, learning, research, and community engagement objectives of Om Sterling Global University. We strive to empower every member of our academic community with the knowledge and tools they need to excel.";
  const vision = aboutContent?.vision || "To be a world-class academic library that serves as a catalyst for knowledge creation, intellectual growth, and academic excellence. We envision a library that seamlessly integrates traditional resources with cutting-edge technology to create an unparalleled learning environment.";

  // Timeline: map from dynamic data or use default
  const dynamicTimeline = aboutContent?.timeline;
  const timeline = dynamicTimeline && Array.isArray(dynamicTimeline) && dynamicTimeline.length > 0
    ? dynamicTimeline.map((item: { year: string; title?: string; description?: string }, idx: number) => ({
        year: item.year,
        event: item.description || item.title || "",
        color: TIMELINE_COLORS[idx % TIMELINE_COLORS.length],
      }))
    : DEFAULT_TIMELINE;

  // Library Stats: map from dynamic data or use default
  const dynamicStats = aboutContent?.libraryStats;
  const libraryStats = dynamicStats && Array.isArray(dynamicStats) && dynamicStats.length > 0
    ? dynamicStats.map((s: { icon?: string; value: string; label: string }, idx: number) => ({
        label: s.label,
        value: s.value,
        icon: s.icon && ICON_MAP[s.icon] ? ICON_MAP[s.icon] : DEFAULT_LIBRARY_STATS[idx]?.icon || BookOpen,
        color: DEFAULT_LIBRARY_STATS[idx]?.color || TIMELINE_COLORS[idx % TIMELINE_COLORS.length],
      }))
    : DEFAULT_LIBRARY_STATS;

  // Policies: map from dynamic data or use default
  const dynamicPolicies = aboutContent?.policies;
  const policies = dynamicPolicies && Array.isArray(dynamicPolicies) && dynamicPolicies.length > 0
    ? dynamicPolicies.map((p: { title: string; description?: string; desc?: string }) => ({
        title: p.title,
        desc: p.description || p.desc || "",
      }))
    : DEFAULT_POLICIES;

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#DBAA36] text-white mb-3">
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            About Us
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            OSGU <span className="text-[#DBAA36]">Central Library</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Serving the academic community since 2005 with a commitment to excellence in
            information services, research support, and educational resources.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-[#EBEBEB] h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 rounded-xl bg-[#C63134]/10 flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-[#C63134]" />
                </div>
                <h2 className="text-xl font-bold text-[#16191A] mb-3">Our Mission</h2>
                <p className="text-[#666] leading-relaxed">{mission}</p>
              </CardContent>
            </Card>
            <Card className="border-[#EBEBEB] h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="w-14 h-14 rounded-xl bg-[#0095EB]/10 flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-[#0095EB]" />
                </div>
                <h2 className="text-xl font-bold text-[#16191A] mb-3">Our Vision</h2>
                <p className="text-[#666] leading-relaxed">{vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Library Stats */}
      <section className="bg-[#C63134] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {libraryStats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/80" />
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] text-center mb-10">
            Our Journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#EBEBEB] sm:-translate-x-px" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center gap-4 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} pl-10 sm:pl-0`}>
                  <div className={`absolute left-0 sm:left-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold -translate-x-1/2 z-10`} style={{ backgroundColor: item.color }}>
                    <span className="hidden sm:inline">{item.year.slice(-2)}</span>
                    <span className="sm:hidden text-[10px]">{item.year.slice(-2)}</span>
                  </div>
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:text-left sm:pl-8"}`}>
                    <div className="bg-white rounded-lg p-4 border border-[#EBEBEB] shadow-sm">
                      <Badge className="text-xs mb-1" style={{ backgroundColor: item.color, color: "white" }}>
                        {item.year}
                      </Badge>
                      <p className="text-sm text-[#333]">{item.event}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] text-center mb-10">
            Library Staff
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="osgu-card border-[#EBEBEB] bg-white">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F1F1F1] animate-pulse mx-auto mb-3" />
                  <div className="h-4 w-3/4 bg-[#EBEBEB] rounded mb-2 mx-auto animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#F1F1F1] rounded mb-1 mx-auto animate-pulse" />
                  <div className="h-3 w-2/3 bg-[#F1F1F1] rounded mx-auto animate-pulse" />
                </CardContent>
              </Card>
            )) : staff.map((member, i) => (
              <Card key={i} className="osgu-card border-[#EBEBEB] bg-white">
                <CardContent className="p-4 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-sm text-[#16191A]">{member.name}</h3>
                  <p className="text-xs text-[#C63134] font-medium">{member.role}</p>
                  <p className="text-xs text-[#999] mt-1">{member.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="bg-[#222222] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Library Policies
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {policies.map((policy, i) => (
              <Card key={i} className="bg-[#292B33] border-[#333]">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-white mb-2">{policy.title}</h3>
                  <p className="text-sm text-[#CCCCCC]">{policy.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
