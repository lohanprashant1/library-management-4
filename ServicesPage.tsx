"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Printer,
  Monitor,
  Users,
  Globe,
  Headphones,
  Accessibility,
  Wifi,
  BookMarked,
  ScanLine,
  GraduationCap,
  Coffee,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Globe,
  GraduationCap,
  Printer,
  Monitor,
  Users,
  ScanLine,
  Accessibility,
  Headphones,
  Wifi,
  BookMarked,
  Coffee,
};

const DEFAULT_SERVICES = [
  {
    title: "Book Borrowing & Returns",
    icon: BookOpen,
    description: "Borrow up to 10 books for 14 days. Renew online up to 2 times. Drop-off at any service desk or use the self-checkout kiosk.",
    color: "#C63134",
    details: ["Max 10 books per member", "14-day loan period", "2 online renewals", "Self-checkout available", "Late fee: ₹5/day"],
  },
  {
    title: "Interlibrary Loan (ILL)",
    icon: Globe,
    description: "Request books and articles from partner libraries across India. Access materials not available in our collection through our ILL network.",
    color: "#0095EB",
    details: ["50+ partner libraries", "Free for faculty/researchers", "₹20 fee for students", "2-5 business day delivery", "Request via online portal"],
  },
  {
    title: "Reference & Research Help",
    icon: GraduationCap,
    description: "Expert librarians available for one-on-one research consultations, literature review assistance, and citation guidance.",
    color: "#75B740",
    details: ["Walk-in consultations", "Book appointments online", "Literature review help", "Citation formatting", "Database search training"],
  },
  {
    title: "Printing & Photocopying",
    icon: Printer,
    description: "High-speed printing, photocopying, and scanning services. Color and black-and-white options available at affordable rates.",
    color: "#DBAA36",
    details: ["B&W: ₹1/page", "Color: ₹5/page", "Scanning: Free", "Self-service kiosks", "Wireless printing"],
  },
  {
    title: "Computer Lab & Internet",
    icon: Monitor,
    description: "Fully equipped computer lab with 60+ workstations, high-speed internet, and essential academic software.",
    color: "#E98F10",
    details: ["60+ workstations", "Free Wi-Fi access", "MS Office suite", "SPSS, MATLAB", "Online exam support"],
  },
  {
    title: "Group Study Rooms",
    icon: Users,
    description: "Reserve collaborative study spaces equipped with whiteboards, projectors, and power outlets for group work.",
    color: "#0E76A8",
    details: ["6 rooms available", "Max 8 people per room", "2-hour booking slots", "Whiteboard & projector", "Online reservation"],
  },
  {
    title: "Scanning & Digitization",
    icon: ScanLine,
    description: "Professional document scanning and digitization services for research materials, rare books, and personal documents.",
    color: "#8B5CF6",
    details: ["High-res scanning", "OCR text recognition", "Multiple output formats", "USB/email delivery", "Bulk scanning available"],
  },
  {
    title: "Accessibility Services",
    icon: Accessibility,
    description: "Assistive technologies, screen readers, and specialized equipment to ensure library access for all users.",
    color: "#EC4899",
    details: ["Screen readers", "Magnification tools", "Audio-described materials", "Wheelchair accessible", "Dedicated support staff"],
  },
];

const SERVICE_HIGHLIGHTS = [
  { label: "Books Issued Daily", value: "200+", icon: BookOpen, color: "#C63134" },
  { label: "Research Consultations", value: "50+", icon: Headphones, color: "#0095EB" },
  { label: "Computer Sessions", value: "500+", icon: Monitor, color: "#75B740" },
  { label: "Pages Printed Daily", value: "5,000+", icon: Printer, color: "#DBAA36" },
];

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (data.services && Array.isArray(data.services) && data.services.length > 0) {
          const mapped = data.services.map((s: { title: string; icon?: string; description: string; color?: string; details?: string[] }, idx: number) => ({
            title: s.title,
            icon: s.icon && SERVICE_ICON_MAP[s.icon] ? SERVICE_ICON_MAP[s.icon] : DEFAULT_SERVICES[idx]?.icon || BookOpen,
            description: s.description,
            color: s.color || DEFAULT_SERVICES[idx]?.color || "#C63134",
            details: s.details && s.details.length > 0 ? s.details : DEFAULT_SERVICES[idx]?.details || [],
          }));
          setServices(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#C63134] text-white mb-3">
            <BookMarked className="w-3.5 h-3.5 mr-1.5" />
            Our Services
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Library <span className="text-[#C63134]">Services</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            We offer a wide range of services to support your academic journey. From book borrowing
            to research assistance, we&apos;re here to help you succeed.
          </p>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-[#C63134] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_HIGHLIGHTS.map((item, i) => (
              <div key={i} className="text-center text-white">
                <item.icon className="w-7 h-7 mx-auto mb-2 opacity-80" />
                <div className="text-2xl sm:text-3xl font-bold">{item.value}</div>
                <div className="text-sm opacity-80">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              All Services
            </h2>
            <p className="text-[#666666]">Comprehensive support for your academic needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading ? Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="osgu-card overflow-hidden border-[#EBEBEB] bg-white">
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F1F1] animate-pulse mb-3" />
                  <div className="h-5 w-3/4 bg-[#EBEBEB] rounded mb-2 animate-pulse" />
                  <div className="h-4 w-full bg-[#EBEBEB] rounded mb-1 animate-pulse" />
                  <div className="h-4 w-5/6 bg-[#EBEBEB] rounded mb-4 animate-pulse" />
                  <div className="space-y-1.5">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-3 w-3/4 bg-[#F1F1F1] rounded animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )) : services.map((service, i) => (
              <Card
                key={i}
                className="osgu-card overflow-hidden border-[#EBEBEB] bg-white"
              >
                <CardContent className="p-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="font-bold text-[#16191A] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#666666] mb-4">{service.description}</p>
                  <div className="space-y-1.5">
                    {service.details.map((d, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-[#333]">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: service.color }} />
                        {d}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] text-center mb-10">
            How to Use Library Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Get Your ID", desc: "Register at the library desk to receive your library card and login credentials.", color: "#C63134" },
              { step: "2", title: "Browse & Search", desc: "Use our online catalog to find books, journals, and digital resources.", color: "#0095EB" },
              { step: "3", title: "Borrow or Access", desc: "Check out books at the desk or access digital resources with your credentials.", color: "#75B740" },
              { step: "4", title: "Return & Renew", desc: "Return books on time or renew online. Manage your account anytime.", color: "#DBAA36" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-[#16191A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
