"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  Tag,
  Clock,
  User,
  BookmarkPlus,
  Share2,
  TrendingUp,
  Bell,
  Rss,
  Mail,
} from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Announcement: "#C63134",
  "Digital Resources": "#0095EB",
  Achievement: "#75B740",
  Collection: "#DBAA36",
  Workshop: "#E98F10",
  Technology: "#0E76A8",
};

const NEWSLETTERS = [
  { title: "Library Monthly - March 2025", date: "Mar 31, 2025", highlights: "New arrivals, staff picks, upcoming events" },
  { title: "Library Monthly - February 2025", date: "Feb 28, 2025", highlights: "Research week recap, database updates" },
  { title: "Library Monthly - January 2025", date: "Jan 31, 2025", highlights: "New year, new resources, reading challenge" },
  { title: "Library Quarterly Review - Q4 2024", date: "Dec 30, 2024", highlights: "Annual stats, top borrowers, collection growth" },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data.news);
    } catch {
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => setSelectedArticle(null)} className="mb-6 text-[#C63134]">
          ← Back to News
        </Button>
        <Badge
          className="text-xs mb-3"
          style={{ backgroundColor: CATEGORY_COLORS[selectedArticle.category] || "#C63134", color: "white" }}
        >
          {selectedArticle.category}
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-3">
          {selectedArticle.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-[#999] mb-6">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {selectedArticle.date}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Library Admin
          </span>
        </div>
        <div className="prose max-w-none">
          <p className="text-[#333] leading-relaxed mb-4">{selectedArticle.excerpt}</p>
          <p className="text-[#333] leading-relaxed">{selectedArticle.content}</p>
        </div>
        <div className="flex gap-3 mt-8 pt-6 border-t border-[#EBEBEB]">
          <Button variant="outline" className="text-sm border-[#EBEBEB]">
            <BookmarkPlus className="w-4 h-4 mr-1.5" />
            Save Article
          </Button>
          <Button variant="outline" className="text-sm border-[#EBEBEB]">
            <Share2 className="w-4 h-4 mr-1.5" />
            Share
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#0095EB] text-white mb-3">
            <Newspaper className="w-3.5 h-3.5 mr-1.5" />
            News & Blog
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Library <span className="text-[#0095EB]">News</span> & Updates
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Stay updated with the latest news, events, and announcements from OSGU Central Library.
          </p>
        </div>
      </section>

      {/* Newsletter Subscribe */}
      <section className="bg-[#0095EB] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <Mail className="w-6 h-6" />
            <div>
              <p className="font-semibold">Subscribe to Our Newsletter</p>
              <p className="text-sm text-white/80">Get monthly updates delivered to your inbox</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your.email@osgu.ac.in"
              className="px-4 py-2 rounded-lg text-sm bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 w-60"
            />
            <Button className="bg-white text-[#0095EB] hover:bg-white/90 font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-[#F1F1F1]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
                  All News
                </TabsTrigger>
                <TabsTrigger value="announcement" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
                  Announcements
                </TabsTrigger>
                <TabsTrigger value="digital" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
                  Digital
                </TabsTrigger>
                <TabsTrigger value="events" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
                  Events
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Featured Article */}
                {news.length > 0 && (
                  <Card
                    className="osgu-card border-[#EBEBEB] bg-white cursor-pointer lg:col-span-2 overflow-hidden"
                    onClick={() => setSelectedArticle(news[0])}
                  >
                    <div
                      className="h-48 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${CATEGORY_COLORS[news[0].category] || "#C63134"}20, ${CATEGORY_COLORS[news[0].category] || "#C63134"}05)`,
                      }}
                    >
                      <Newspaper className="w-16 h-16" style={{ color: CATEGORY_COLORS[news[0].category] || "#C63134", opacity: 0.5 }} />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className="text-xs"
                          style={{ backgroundColor: CATEGORY_COLORS[news[0].category], color: "white" }}
                        >
                          {news[0].category}
                        </Badge>
                        <span className="text-xs text-[#999]">{news[0].date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-[#16191A] mb-2">{news[0].title}</h2>
                      <p className="text-[#666] text-sm">{news[0].excerpt}</p>
                      <div className="flex items-center gap-1 mt-4 text-[#C63134] text-sm font-medium">
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sidebar: Recent News */}
                <div>
                  <h3 className="font-bold text-[#16191A] mb-4">Recent News</h3>
                  <div className="space-y-3">
                    {loading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-3 bg-[#EBEBEB] rounded w-3/4 mb-2" />
                            <div className="h-2 bg-[#EBEBEB] rounded w-1/2" />
                          </div>
                        ))
                      : news.slice(1).map((item) => (
                          <div
                            key={item.id}
                            className="p-3 bg-white rounded-lg border border-[#EBEBEB] hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedArticle(item)}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Badge
                                className="text-[10px] px-1.5 py-0"
                                style={{ backgroundColor: CATEGORY_COLORS[item.category], color: "white" }}
                              >
                                {item.category}
                              </Badge>
                              <span className="text-[10px] text-[#999]">{item.date}</span>
                            </div>
                            <h4 className="text-sm font-medium text-[#16191A] line-clamp-2">
                              {item.title}
                            </h4>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="announcement">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {news
                  .filter((n) => n.category === "Announcement" || n.category === "Achievement")
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="osgu-card border-[#EBEBEB] bg-white cursor-pointer"
                      onClick={() => setSelectedArticle(item)}
                    >
                      <CardContent className="p-5">
                        <Badge
                          className="text-xs mb-3"
                          style={{ backgroundColor: CATEGORY_COLORS[item.category], color: "white" }}
                        >
                          {item.category}
                        </Badge>
                        <h3 className="font-bold text-[#16191A] mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-[#666] mb-3 line-clamp-3">{item.excerpt}</p>
                        <span className="text-xs text-[#999]">{item.date}</span>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="digital">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {news
                  .filter((n) => n.category === "Digital Resources" || n.category === "Technology")
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="osgu-card border-[#EBEBEB] bg-white cursor-pointer"
                      onClick={() => setSelectedArticle(item)}
                    >
                      <CardContent className="p-5">
                        <Badge
                          className="text-xs mb-3"
                          style={{ backgroundColor: CATEGORY_COLORS[item.category], color: "white" }}
                        >
                          {item.category}
                        </Badge>
                        <h3 className="font-bold text-[#16191A] mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-[#666] mb-3 line-clamp-3">{item.excerpt}</p>
                        <span className="text-xs text-[#999]">{item.date}</span>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {news
                  .filter((n) => n.category === "Workshop" || n.category === "Collection")
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="osgu-card border-[#EBEBEB] bg-white cursor-pointer"
                      onClick={() => setSelectedArticle(item)}
                    >
                      <CardContent className="p-5">
                        <Badge
                          className="text-xs mb-3"
                          style={{ backgroundColor: CATEGORY_COLORS[item.category], color: "white" }}
                        >
                          {item.category}
                        </Badge>
                        <h3 className="font-bold text-[#16191A] mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-[#666] mb-3 line-clamp-3">{item.excerpt}</p>
                        <span className="text-xs text-[#999]">{item.date}</span>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletters */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] text-center mb-2">
            Newsletters & Publications
          </h2>
          <p className="text-[#666] text-center mb-8">Catch up on past newsletters</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NEWSLETTERS.map((nl, i) => (
              <Card key={i} className="osgu-card border-0 bg-white cursor-pointer">
                <CardContent className="p-4">
                  <div className="w-full h-32 bg-gradient-to-br from-[#C63134]/10 to-[#0095EB]/10 rounded-lg flex items-center justify-center mb-3">
                    <Rss className="w-10 h-10 text-[#C63134]/50" />
                  </div>
                  <h3 className="font-semibold text-sm text-[#16191A]">{nl.title}</h3>
                  <p className="text-xs text-[#999] mt-1">{nl.date}</p>
                  <p className="text-xs text-[#666] mt-2">{nl.highlights}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
