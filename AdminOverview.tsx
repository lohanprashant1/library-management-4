"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, Newspaper, Users, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AdminSection } from "./AdminSidebar";

interface AdminOverviewProps {
  token: string;
  onNavigate: (section: AdminSection) => void;
}

export default function AdminOverview({ token, onNavigate }: AdminOverviewProps) {
  const [stats, setStats] = useState({ books: 0, events: 0, news: 0, staff: 0, services: 0, plans: 0, rooms: 0, resources: 0, faqs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [booksRes, eventsRes, newsRes, staffRes] = await Promise.all([
          fetch("/api/admin/books", { headers }),
          fetch("/api/admin/events", { headers }),
          fetch("/api/admin/news", { headers }),
          fetch("/api/admin/staff", { headers }),
        ]);
        const [booksData, eventsData, newsData, staffData] = await Promise.all([
          booksRes.json(),
          eventsRes.json(),
          newsRes.json(),
          staffRes.json(),
        ]);
        setStats({
          books: booksData.total || 0,
          events: eventsData.total || 0,
          news: newsData.total || 0,
          staff: staffData.total || 0,
          services: 0,
          plans: 0,
          rooms: 0,
          resources: 0,
          faqs: 0,
        });

        // Fetch remaining stats
        const [svcRes, planRes, roomRes, resRes, faqRes] = await Promise.all([
          fetch("/api/admin/services", { headers }),
          fetch("/api/admin/plans", { headers }),
          fetch("/api/admin/rooms", { headers }),
          fetch("/api/admin/resources", { headers }),
          fetch("/api/admin/faqs", { headers }),
        ]);
        const [svcData, planData, roomData, resData, faqData] = await Promise.all([
          svcRes.json(), planRes.json(), roomRes.json(), resRes.json(), faqRes.json(),
        ]);
        setStats(prev => ({
          ...prev,
          services: svcData.total || 0,
          plans: planData.total || 0,
          rooms: roomData.total || 0,
          resources: resData.total || 0,
          faqs: faqData.total || 0,
        }));
      } catch {
        // silently fail
      }
    };
    fetchStats();
  }, [token]);

  const statCards = [
    { label: "Total Books", value: stats.books, icon: BookOpen, color: "#C63134", section: "books" as AdminSection },
    { label: "Events", value: stats.events, icon: Calendar, color: "#0095EB", section: "events" as AdminSection },
    { label: "News Articles", value: stats.news, icon: Newspaper, color: "#75B740", section: "news" as AdminSection },
    { label: "Staff Members", value: stats.staff, icon: Users, color: "#DBAA36", section: "staff" as AdminSection },
    { label: "Services", value: stats.services, icon: TrendingUp, color: "#E98F10", section: "services" as AdminSection },
    { label: "FAQs", value: stats.faqs, icon: BookOpen, color: "#0E76A8", section: "faqs" as AdminSection },
    { label: "Rooms", value: stats.rooms, icon: TrendingUp, color: "#8B5CF6", section: "rooms" as AdminSection },
    { label: "Digital Resources", value: stats.resources, icon: TrendingUp, color: "#EC4899", section: "resources" as AdminSection },
  ];

  const quickActions = [
    { label: "Add Book", icon: BookOpen, section: "books" as AdminSection, color: "#C63134" },
    { label: "Add Event", icon: Calendar, section: "events" as AdminSection, color: "#0095EB" },
    { label: "Add News", icon: Newspaper, section: "news" as AdminSection, color: "#75B740" },
    { label: "Add Staff", icon: Users, section: "staff" as AdminSection, color: "#DBAA36" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-[#16191A]">Dashboard Overview</h2>
        <p className="text-sm text-[#666]">Welcome back! Here&apos;s a summary of your library content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="cursor-pointer border-0 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => onNavigate(stat.section)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <Plus className="w-4 h-4 text-[#CCCCCC]" />
              </div>
              <div className="text-2xl font-bold text-[#16191A]">{stat.value}</div>
              <div className="text-xs text-[#666] mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-[#333] mb-3 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto py-3 border-[#EBEBEB] hover:border-transparent bg-white"
              onClick={() => onNavigate(action.section)}
            >
              <action.icon className="w-4 h-4 mr-2" style={{ color: action.color }} />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* System Info */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-[#333] mb-3 uppercase tracking-wider">System Information</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-[#999]">Total Content Items</div>
              <div className="font-semibold text-[#16191A]">
                {Object.values(stats).reduce((a, b) => a + b, 0)}
              </div>
            </div>
            <div>
              <div className="text-[#999]">Membership Plans</div>
              <div className="font-semibold text-[#16191A]">{stats.plans}</div>
            </div>
            <div>
              <div className="text-[#999]">Library Rooms</div>
              <div className="font-semibold text-[#16191A]">{stats.rooms}</div>
            </div>
            <div>
              <div className="text-[#999]">Content Sections</div>
              <div className="font-semibold text-[#16191A]">8 categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
