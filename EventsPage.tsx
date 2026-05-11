"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Ticket,
  Filter,
  ChevronRight,
  Star,
  BookOpen,
  Monitor,
  GraduationCap,
  Baby,
  Award,
  Laptop,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  registrationOpen: boolean;
  capacity: number;
  registered: number;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Celebration: <Star className="w-4 h-4" />,
  Workshop: <Laptop className="w-4 h-4" />,
  Literary: <BookOpen className="w-4 h-4" />,
  Training: <GraduationCap className="w-4 h-4" />,
  Children: <Baby className="w-4 h-4" />,
  Symposium: <Award className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  Celebration: "#C63134",
  Workshop: "#0095EB",
  Literary: "#75B740",
  Training: "#E98F10",
  Children: "#DBAA36",
  Symposium: "#0E76A8",
};

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [calYear, setCalYear] = useState(2025);
  const [calMonth, setCalMonth] = useState(3); // April (0-indexed)

  useEffect(() => {
    fetchEvents();
  }, [categoryFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter && categoryFilter !== "all") params.set("category", categoryFilter);
      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setEvents(data.events);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const { firstDay, daysInMonth } = getMonthDays(calYear, calMonth);
  const eventDates = events.map((e) => new Date(e.date).getDate());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return null;
    return dayNum;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#E98F10] text-white mb-3">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
            Events & Programs
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Library <span className="text-[#E98F10]">Events</span> & Programs
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Discover workshops, author talks, training sessions, and cultural programs.
            Expand your knowledge beyond the classroom.
          </p>
        </div>
      </section>

      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div>
              <Card className="border-[#EBEBEB] sticky top-40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                        else setCalMonth(calMonth - 1);
                      }}
                    >
                      ←
                    </Button>
                    <h3 className="font-semibold text-sm">
                      {monthNames[calMonth]} {calYear}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                        else setCalMonth(calMonth + 1);
                      }}
                    >
                      →
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 text-center text-xs mb-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="p-1.5 text-[#999] font-medium">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
                    {calendarDays.map((day, i) => {
                      const isEvent = day !== null && eventDates.includes(day);
                      return (
                        <div
                          key={i}
                          className={`p-1.5 rounded-md text-sm ${
                            day === null
                              ? ""
                              : isEvent
                              ? "bg-[#C63134] text-white font-bold cursor-pointer hover:bg-[#CC383E]"
                              : "hover:bg-[#F1F1F1] cursor-default"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#EBEBEB]">
                    <div className="text-xs font-medium text-[#666] mb-2">Categories</div>
                    <div className="space-y-1.5">
                      {["all", "Workshop", "Literary", "Celebration", "Training", "Children", "Symposium"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors ${
                            categoryFilter === cat
                              ? "bg-[#C63134]/10 text-[#C63134] font-medium"
                              : "text-[#666] hover:bg-[#F1F1F1]"
                          }`}
                        >
                          {cat !== "all" && CATEGORY_ICONS[cat]}
                          {cat === "all" ? "All Events" : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#16191A]">
                  Upcoming Events
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {events.length} events
                </Badge>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="animate-pulse border-[#EBEBEB]">
                      <CardContent className="p-5">
                        <div className="h-4 bg-[#EBEBEB] rounded w-1/2 mb-3" />
                        <div className="h-3 bg-[#EBEBEB] rounded w-3/4 mb-2" />
                        <div className="h-3 bg-[#EBEBEB] rounded w-1/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : events.length === 0 ? (
                <Card className="border-[#EBEBEB]">
                  <CardContent className="p-8 text-center">
                    <CalendarDays className="w-12 h-12 text-[#EBEBEB] mx-auto mb-3" />
                    <p className="text-[#666]">No events found for this category.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => {
                    const eventDate = new Date(event.date);
                    const color = CATEGORY_COLORS[event.category] || "#C63134";
                    const fillPercent = Math.round((event.registered / event.capacity) * 100);
                    const isFull = event.registered >= event.capacity;

                    return (
                      <Card
                        key={event.id}
                        className="osgu-card border-[#EBEBEB] bg-white overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Date badge */}
                          <div
                            className="sm:w-20 p-4 flex sm:flex-col items-center sm:items-center justify-center gap-2 sm:gap-0 text-center"
                            style={{ backgroundColor: `${color}10` }}
                          >
                            <div className="text-2xl font-bold" style={{ color }}>
                              {eventDate.getDate()}
                            </div>
                            <div className="text-xs font-medium" style={{ color }}>
                              {eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                            </div>
                          </div>

                          <CardContent className="flex-1 p-4 sm:p-5">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge
                                    className="text-xs"
                                    style={{ backgroundColor: color, color: "white" }}
                                  >
                                    {CATEGORY_ICONS[event.category]}
                                    <span className="ml-1">{event.category}</span>
                                  </Badge>
                                </div>
                                <h3 className="font-bold text-[#16191A]">{event.title}</h3>
                              </div>
                            </div>

                            <p className="text-sm text-[#666666] mb-3 line-clamp-2">
                              {event.description}
                            </p>

                            <div className="flex flex-wrap gap-3 text-xs text-[#999] mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {event.registered}/{event.capacity}
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${fillPercent}%`,
                                    backgroundColor: isFull ? "#999" : color,
                                  }}
                                />
                              </div>
                              <span className="text-xs text-[#999]">{fillPercent}%</span>
                            </div>
                          </CardContent>

                          <CardFooter className="p-4 sm:py-4 sm:pr-5 sm:pl-0">
                            <Button
                              className={`w-full sm:w-auto text-sm ${
                                isFull || !event.registrationOpen
                                  ? "bg-[#999] cursor-not-allowed"
                                  : "bg-[#C63134] hover:bg-[#CC383E]"
                              } text-white`}
                              disabled={isFull || !event.registrationOpen}
                            >
                              <Ticket className="w-4 h-4 mr-1.5" />
                              {isFull ? "Full" : !event.registrationOpen ? "Closed" : "Register"}
                            </Button>
                          </CardFooter>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
