"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  CheckCircle2,
  Users,
  BookOpen,
  Star,
  Shield,
  Gift,
  Crown,
  User,
  GraduationCap,
  Building2,
  Clock,
  Check,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PLAN_ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  User,
  Users,
};

const DEFAULT_MEMBERSHIP_TYPES = [
  {
    name: "Student Membership",
    icon: GraduationCap,
    price: "Free",
    period: "Academic Year",
    description: "Full access for currently enrolled students of OSGU.",
    color: "#75B740",
    popular: true,
    benefits: [
      "Borrow up to 10 books",
      "Access all digital resources",
      "Book study rooms (free)",
      "Computer lab access",
      "Attend workshops & events",
      "Interlibrary loan services",
      "Printing at student rates",
      "Mobile app access",
    ],
  },
  {
    name: "Faculty Membership",
    icon: Building2,
    price: "Free",
    period: "Employment Period",
    description: "Enhanced access for OSGU faculty and research staff.",
    color: "#C63134",
    popular: false,
    benefits: [
      "Borrow up to 20 books",
      "Access all digital resources",
      "Priority room booking",
      "Research consultation",
      "ILL services (free)",
      "Extended loan periods (30 days)",
      "Document delivery service",
      "Proxy borrowing privileges",
    ],
  },
  {
    name: "Alumni Membership",
    icon: User,
    price: "₹500",
    period: "Per Year",
    description: "Continued library access for OSGU alumni.",
    color: "#0095EB",
    popular: false,
    benefits: [
      "Borrow up to 5 books",
      "On-site digital resource access",
      "Study room booking",
      "Computer lab access",
      "Attend public events",
      "Newsletter subscription",
    ],
  },
  {
    name: "External Membership",
    icon: Users,
    price: "₹1,000",
    period: "Per Year",
    description: "Library access for external researchers and community members.",
    color: "#DBAA36",
    popular: false,
    benefits: [
      "Borrow up to 3 books",
      "On-site reading access",
      "Reference services",
      "Photocopying services",
      "Attend public events",
      "Newsletter subscription",
    ],
  },
];

const BENEFITS = [
  { icon: BookOpen, title: "50,000+ Books", desc: "Access our vast physical collection", color: "#C63134" },
  { icon: Star, title: "Digital Resources", desc: "200+ databases and e-resources", color: "#0095EB" },
  { icon: Shield, title: "24/7 Online Access", desc: "Access resources from anywhere", color: "#75B740" },
  { icon: Gift, title: "Events & Workshops", desc: "Free attendance at all events", color: "#DBAA36" },
  { icon: Crown, title: "Premium Support", desc: "Dedicated research assistance", color: "#E98F10" },
  { icon: Clock, title: "Extended Hours", desc: "Longer access during exam season", color: "#0E76A8" },
];

export default function MembershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [membershipTypes, setMembershipTypes] = useState(DEFAULT_MEMBERSHIP_TYPES);

  useEffect(() => {
    fetch("/api/plans")
      .then((r) => r.json())
      .then((data) => {
        if (data.plans && Array.isArray(data.plans) && data.plans.length > 0) {
          const PLAN_COLORS = ["#75B740", "#C63134", "#0095EB", "#DBAA36", "#E98F10", "#0E76A8"];
          const mapped = data.plans.map((p: { name?: string; title?: string; icon?: string; price?: string; period?: string; description?: string; color?: string; popular?: boolean; benefits?: string[] }, idx: number) => ({
            name: p.name || p.title || DEFAULT_MEMBERSHIP_TYPES[idx]?.name || "Membership",
            icon: p.icon && PLAN_ICON_MAP[p.icon] ? PLAN_ICON_MAP[p.icon] : DEFAULT_MEMBERSHIP_TYPES[idx]?.icon || GraduationCap,
            price: p.price || DEFAULT_MEMBERSHIP_TYPES[idx]?.price || "Free",
            period: p.period || DEFAULT_MEMBERSHIP_TYPES[idx]?.period || "Per Year",
            description: p.description || DEFAULT_MEMBERSHIP_TYPES[idx]?.description || "",
            color: p.color || PLAN_COLORS[idx % PLAN_COLORS.length],
            popular: p.popular ?? DEFAULT_MEMBERSHIP_TYPES[idx]?.popular ?? false,
            benefits: p.benefits && p.benefits.length > 0 ? p.benefits : DEFAULT_MEMBERSHIP_TYPES[idx]?.benefits || [],
          }));
          setMembershipTypes(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#C63134] text-white mb-3">
            <CreditCard className="w-3.5 h-3.5 mr-1.5" />
            Membership
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Join Our <span className="text-[#C63134]">Library</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Become a member today and unlock access to thousands of books, digital resources,
            research databases, and exclusive library services.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#C63134] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="text-center text-white">
                <b.icon className="w-7 h-7 mx-auto mb-2 opacity-90" />
                <div className="text-sm font-semibold">{b.title}</div>
                <div className="text-xs opacity-80">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Membership Plans
            </h2>
            <p className="text-[#666666]">Choose the plan that&apos;s right for you</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="osgu-card border-[#EBEBEB] bg-white">
                <div className="h-1.5 bg-[#EBEBEB] animate-pulse" />
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F1F1] animate-pulse mb-3" />
                  <div className="h-5 w-3/4 bg-[#EBEBEB] rounded mb-1 animate-pulse" />
                  <div className="h-7 w-24 bg-[#EBEBEB] rounded mb-1 animate-pulse" />
                  <div className="h-3 w-20 bg-[#F1F1F1] rounded mb-4 animate-pulse" />
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <div key={j} className="h-3 w-3/4 bg-[#F1F1F1] rounded animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )) : membershipTypes.map((plan, i) => (
              <Card
                key={i}
                className={`osgu-card border bg-white relative overflow-hidden ${
                  plan.popular ? "ring-2 ring-[#C63134] border-transparent" : "border-[#EBEBEB]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#C63134] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="h-1.5" style={{ backgroundColor: plan.color }} />
                <CardContent className="p-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${plan.color}15` }}
                  >
                    <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                  </div>
                  <h3 className="font-bold text-[#16191A]">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1 mb-3">
                    <span className="text-2xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-sm text-[#999]">/ {plan.period}</span>
                  </div>
                  <p className="text-xs text-[#666] mb-4">{plan.description}</p>
                  <div className="space-y-2">
                    {plan.benefits.map((b, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-[#333]">
                        <Check className="w-3.5 h-3.5 text-[#75B740] flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5">
                  <Button
                    className={`w-full text-sm ${
                      plan.popular
                        ? "bg-[#C63134] hover:bg-[#CC383E] text-white"
                        : "bg-[#F1F1F1] text-[#333] hover:bg-[#EBEBEB]"
                    }`}
                  >
                    {plan.price === "Free" ? "Register Now" : "Subscribe"}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-[#EBEBEB]">
            <CardHeader>
              <CardTitle className="text-xl">Membership Registration / Renewal</CardTitle>
              <p className="text-sm text-[#666]">
                Fill out this form to register as a new member or renew your existing membership.
              </p>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-[#75B740] mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-[#16191A] mb-1">Application Submitted!</h3>
                  <p className="text-sm text-[#666]">We&apos;ll process your application and send your library card within 3 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleRenewal} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1.5 block">Full Name</label>
                      <Input required placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1.5 block">OSGU ID (if applicable)</label>
                      <Input placeholder="e.g., 2022-CS-001" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1.5 block">Email</label>
                      <Input required type="email" placeholder="your.email@osgu.ac.in" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#333] mb-1.5 block">Phone</label>
                      <Input required type="tel" placeholder="+91-XXXXX-XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#333] mb-1.5 block">Membership Type</label>
                    <select className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C63134]/50">
                      <option>Student Membership</option>
                      <option>Faculty Membership</option>
                      <option>Alumni Membership</option>
                      <option>External Membership</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#333] mb-1.5 block">Department</label>
                    <Input placeholder="e.g., Computer Science" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#C63134] hover:bg-[#CC383E] text-white font-medium"
                  >
                    Submit Application
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
