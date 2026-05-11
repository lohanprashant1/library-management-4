"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Baby,
  BookOpen,
  GraduationCap,
  Palette,
  Puzzle,
  Gamepad2,
  Trophy,
  Star,
  BookMarked,
  Sparkles,
  Users,
  Brain,
  Lightbulb,
  ArrowRight,
  Heart,
  Globe,
  FlaskConical,
  Calculator,
  Monitor,
  Calculator as CalcIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Palette,
  Sparkles,
  Star,
  Users,
  Brain,
  Lightbulb,
  Trophy,
  FlaskConical,
  Globe,
  Monitor,
  Calculator,
};

const DEFAULT_KIDS_COLLECTIONS = [
  {
    title: "Picture Books",
    icon: BookOpen,
    age: "Ages 3-6",
    description: "Beautifully illustrated picture books for early readers. Stories that spark imagination and creativity.",
    count: "2,000+",
    color: "#C63134",
  },
  {
    title: "Early Readers",
    icon: GraduationCap,
    age: "Ages 6-8",
    description: "Level-appropriate reading books designed to build confidence in young readers.",
    count: "1,500+",
    color: "#0095EB",
  },
  {
    title: "Adventure Stories",
    icon: Sparkles,
    age: "Ages 8-12",
    description: "Thrilling adventure stories, mysteries, and fantasy books for middle-grade readers.",
    count: "1,800+",
    color: "#75B740",
  },
  {
    title: "Educational Comics",
    icon: Palette,
    age: "All Ages",
    description: "Educational comics and graphic novels that make learning fun and engaging.",
    count: "800+",
    color: "#DBAA36",
  },
  {
    title: "Activity Books",
    icon: Puzzle,
    age: "Ages 4-12",
    description: "Puzzles, coloring books, mazes, and interactive activity books for hands-on learning.",
    count: "500+",
    color: "#E98F10",
  },
  {
    title: "Audiobooks",
    icon: Globe,
    age: "All Ages",
    description: "A curated collection of audiobooks and read-along stories for different age groups.",
    count: "300+",
    color: "#0E76A8",
  },
];

const DEFAULT_TEEN_COLLECTIONS = [
  {
    title: "Young Adult Fiction",
    desc: "Bestselling YA novels, dystopian series, and contemporary fiction.",
    color: "#C63134",
  },
  {
    title: "Science & Technology",
    desc: "STEM books, coding guides, and science experiment books for curious teens.",
    color: "#0095EB",
  },
  {
    title: "Exam Preparation",
    desc: "Study guides, practice papers, and reference materials for board exams.",
    color: "#75B740",
  },
  {
    title: "Career Guidance",
    desc: "Career planning books, college guides, and skill development resources.",
    color: "#DBAA36",
  },
];

const DEFAULT_READING_PROGRAMS = [
  {
    title: "Summer Reading Challenge",
    desc: "Read 20 books this summer and earn exciting prizes! Track your progress with our reading log.",
    icon: Trophy,
    color: "#C63134",
    badge: "Popular",
  },
  {
    title: "Story Time Saturdays",
    desc: "Every Saturday at 10 AM. Interactive storytelling sessions with crafts and activities.",
    icon: BookOpen,
    color: "#0095EB",
    badge: "Weekly",
  },
  {
    title: "Young Writers Club",
    desc: "Monthly creative writing workshops for aspiring young authors aged 10-16.",
    icon: Star,
    color: "#75B740",
    badge: "Monthly",
  },
  {
    title: "STEM Explorers",
    desc: "Hands-on science experiments and tech workshops for curious minds.",
    icon: Brain,
    color: "#E98F10",
    badge: "Bi-weekly",
  },
  {
    title: "Homework Help Center",
    desc: "Free tutoring and homework assistance from qualified educators, Monday to Friday.",
    icon: Lightbulb,
    color: "#DBAA36",
    badge: "Daily",
  },
  {
    title: "Book Buddies",
    desc: "Paired reading program where older kids help younger ones practice reading.",
    icon: Users,
    color: "#0E76A8",
    badge: "New",
  },
];

const PROGRAM_COLORS = ["#C63134", "#0095EB", "#75B740", "#E98F10", "#DBAA36", "#0E76A8"];
const PROGRAM_ICONS = [Trophy, BookOpen, Star, Brain, Lightbulb, Users];
const PROGRAM_BADGES = ["Popular", "Weekly", "Monthly", "Bi-weekly", "Daily", "New"];

const DEFAULT_HOMEWORK_HELP = [
  { subject: "Mathematics", level: "Grade 1-12", resources: "500+", color: "#C63134" },
  { subject: "Science", level: "Grade 1-12", resources: "400+", color: "#0095EB" },
  { subject: "English", level: "Grade 1-10", resources: "350+", color: "#75B740" },
  { subject: "Social Studies", level: "Grade 1-10", resources: "300+", color: "#DBAA36" },
  { subject: "Hindi", level: "Grade 1-10", resources: "250+", color: "#E98F10" },
  { subject: "Computer Science", level: "Grade 6-12", resources: "200+", color: "#0E76A8" },
];

const HOMEWORK_COLORS = ["#C63134", "#0095EB", "#75B740", "#DBAA36", "#E98F10", "#0E76A8"];

export default function KidsTeensPage() {
  const [loading, setLoading] = useState(true);
  const [kidsContent, setKidsContent] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch("/api/content?section=kids_page")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && typeof data.content === "object") {
          setKidsContent(data.content);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Kids Collections from dynamic content
  const dynamicKids = kidsContent?.kidsCollections;
  const kidsCollections = dynamicKids && Array.isArray(dynamicKids) && dynamicKids.length > 0
    ? dynamicKids.map((c: { title: string; age: string; count: string; icon?: string; color?: string }, idx: number) => ({
        title: c.title,
        icon: c.icon && ICON_MAP[c.icon] ? ICON_MAP[c.icon] : BookOpen,
        age: c.age,
        description: DEFAULT_KIDS_COLLECTIONS[idx]?.description || "",
        count: c.count,
        color: c.color || DEFAULT_KIDS_COLLECTIONS[idx]?.color || "#C63134",
      }))
    : DEFAULT_KIDS_COLLECTIONS;

  // Teen Collections from dynamic content
  const dynamicTeens = kidsContent?.teenCollections;
  const teenCollections = dynamicTeens && Array.isArray(dynamicTeens) && dynamicTeens.length > 0
    ? dynamicTeens.map((c: { title: string; age?: string; count?: string; desc?: string; color?: string }, idx: number) => ({
        title: c.title,
        desc: c.desc || DEFAULT_TEEN_COLLECTIONS[idx]?.desc || "",
        color: c.color || DEFAULT_TEEN_COLLECTIONS[idx]?.color || "#C63134",
      }))
    : DEFAULT_TEEN_COLLECTIONS;

  // Reading Programs from dynamic content
  const dynamicPrograms = kidsContent?.programs;
  const readingPrograms = dynamicPrograms && Array.isArray(dynamicPrograms) && dynamicPrograms.length > 0
    ? dynamicPrograms.map((p: { title: string; age?: string; schedule?: string; icon?: string; color?: string }, idx: number) => ({
        title: p.title,
        desc: `For ${p.age || "all ages"} — ${p.schedule || "Check schedule"}`,
        icon: p.icon && ICON_MAP[p.icon] ? ICON_MAP[p.icon] : PROGRAM_ICONS[idx % PROGRAM_ICONS.length],
        color: p.color || PROGRAM_COLORS[idx % PROGRAM_COLORS.length],
        badge: PROGRAM_BADGES[idx % PROGRAM_BADGES.length],
      }))
    : DEFAULT_READING_PROGRAMS;

  // Homework Help from dynamic content
  const dynamicHomework = kidsContent?.homeworkHelp;
  const homeworkHelp = dynamicHomework && Array.isArray(dynamicHomework) && dynamicHomework.length > 0
    ? dynamicHomework.map((h: { subject: string; grade?: string; icon?: string }, idx: number) => ({
        subject: h.subject,
        level: h.grade || DEFAULT_HOMEWORK_HELP[idx]?.level || "",
        resources: DEFAULT_HOMEWORK_HELP[idx]?.resources || "",
        color: HOMEWORK_COLORS[idx % HOMEWORK_COLORS.length],
      }))
    : DEFAULT_HOMEWORK_HELP;

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#C63134]" />
          <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-[#0095EB]" />
          <div className="absolute bottom-10 left-1/3 w-40 h-40 rounded-full bg-[#75B740]" />
          <div className="absolute bottom-5 right-10 w-28 h-28 rounded-full bg-[#DBAA36]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#DBAA36] text-white mb-3">
            <Baby className="w-3.5 h-3.5 mr-1.5" />
            Kids & Teens
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Young Readers <span className="text-[#DBAA36]">Corner</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            A special space designed for children and teens with age-appropriate books,
            reading programs, homework help, and fun activities.
          </p>
        </div>
      </section>

      {/* Kids Collections */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Kids Collections
            </h2>
            <p className="text-[#666666]">Curated books for young minds</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kidsCollections.map((item, i) => (
              <Card key={i} className="osgu-card border-[#EBEBEB] bg-white">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#16191A]">{item.title}</h3>
                        <Badge className="text-xs" style={{ backgroundColor: item.color, color: "white" }}>
                          {item.count}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#999]">{item.age}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#666]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teen Collections */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Teen Collections
            </h2>
            <p className="text-[#666666]">Resources for teenage readers</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teenCollections.map((item, i) => (
              <Card key={i} className="osgu-card border-0 bg-white">
                <div className="h-1.5 rounded-t-lg" style={{ backgroundColor: item.color }} />
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm text-[#16191A] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#666]">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reading Programs */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Reading Programs & Activities
            </h2>
            <p className="text-[#666666]">Fun and educational programs for young readers</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {readingPrograms.map((prog, i) => (
              <Card key={i} className="osgu-card border-[#EBEBEB] bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${prog.color}15` }}
                    >
                      <prog.icon className="w-5 h-5" style={{ color: prog.color }} />
                    </div>
                    <Badge
                      className="text-xs"
                      style={{ backgroundColor: prog.color, color: "white" }}
                    >
                      {prog.badge}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-[#16191A] mb-2">{prog.title}</h3>
                  <p className="text-sm text-[#666] mb-4">{prog.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full text-sm border-[#EBEBEB] hover:bg-[#C63134] hover:text-white hover:border-[#C63134] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Homework Help */}
      <section className="bg-[#222222] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Homework Help Center
            </h2>
            <p className="text-[#CCCCCC]">Subject-wise resources for school students</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {homeworkHelp.map((item, i) => (
              <Card key={i} className="bg-[#292B33] border-[#333]">
                <CardContent className="p-4 text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <BookOpen className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-sm text-white">{item.subject}</h3>
                  <p className="text-xs text-[#999] mt-1">{item.level}</p>
                  <p className="text-xs font-medium mt-2" style={{ color: item.color }}>
                    {item.resources} resources
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
