"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Globe,
  Newspaper,
  Database,
  Archive,
  Headphones,
  Video,
  FileText,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const DIGITAL_CATEGORIES = [
  {
    title: "E-Books",
    icon: BookOpen,
    description: "Access over 15,000 e-books across all disciplines. Available 24/7 from any device with your library credentials.",
    count: "15,000+",
    color: "#C63134",
    features: ["PDF & EPUB formats", "Offline reading", "Bookmarking & notes", "Multi-device sync"],
  },
  {
    title: "E-Journals",
    icon: Newspaper,
    description: "Browse 500+ scholarly journals from leading publishers including Elsevier, Springer, IEEE, and Wiley.",
    count: "500+",
    color: "#0095EB",
    features: ["Full-text articles", "Peer-reviewed content", "Citation export", "Email alerts"],
  },
  {
    title: "Research Databases",
    icon: Database,
    description: "Premium research databases including Scopus, Web of Science, JSTOR, PubMed, and IEEE Xplore.",
    count: "50+",
    color: "#75B740",
    features: ["Advanced search", "Export to reference managers", "Full-text access", "Citation tracking"],
  },
  {
    title: "Digital Archives",
    icon: Archive,
    description: "Digitized rare manuscripts, historical documents, and special collections spanning centuries of knowledge.",
    count: "1,000+",
    color: "#DBAA36",
    features: ["High-res scans", "Searchable text", "Metadata records", "Downloadable copies"],
  },
  {
    title: "Audio-Visual Resources",
    icon: Headphones,
    description: "Educational videos, audiobooks, lectures, and multimedia content for enhanced learning experiences.",
    count: "3,000+",
    color: "#E98F10",
    features: ["Streaming access", "Lecture recordings", "Audiobooks", "Educational films"],
  },
  {
    title: "Theses & Dissertations",
    icon: FileText,
    description: "Complete collection of OSGU theses, dissertations, and research papers from graduate and postgraduate students.",
    count: "2,000+",
    color: "#0E76A8",
    features: ["Full-text PDFs", "Abstract search", "Year-wise browsing", "Department filter"],
  },
];

const DEFAULT_POPULAR_RESOURCES = [
  { name: "Scopus", desc: "Largest abstract and citation database", users: "1,200+", color: "#E98F10" },
  { name: "JSTOR", desc: "Digital library of academic journals", users: "980+", color: "#C63134" },
  { name: "IEEE Xplore", desc: "Engineering and technology literature", users: "850+", color: "#0095EB" },
  { name: "SpringerLink", desc: "Scientific, technical & medical research", users: "750+", color: "#75B740" },
  { name: "PubMed Central", desc: "Biomedical and life sciences archive", users: "620+", color: "#DBAA36" },
  { name: "Web of Science", desc: "Citation indexing and research discovery", users: "580+", color: "#0E76A8" },
];

export default function DigitalResourcesPage() {
  const [loading, setLoading] = useState(true);
  const [popularResources, setPopularResources] = useState(DEFAULT_POPULAR_RESOURCES);

  useEffect(() => {
    fetch("/api/resources")
      .then((r) => r.json())
      .then((data) => {
        if (data.resources && Array.isArray(data.resources) && data.resources.length > 0) {
          const RESOURCE_COLORS = ["#E98F10", "#C63134", "#0095EB", "#75B740", "#DBAA36", "#0E76A8", "#8B5CF6", "#EC4899"];
          const mapped = data.resources.map((r: { name: string; desc?: string; description?: string; users?: string; color?: string }, idx: number) => ({
            name: r.name,
            desc: r.desc || r.description || "",
            users: r.users || "",
            color: r.color || RESOURCE_COLORS[idx % RESOURCE_COLORS.length],
          }));
          setPopularResources(mapped);
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
          <Badge className="bg-[#0095EB] text-white mb-3">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            Digital Collections
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Digital Resources & <span className="text-[#0095EB]">E-Library</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Access thousands of e-books, journals, databases, and digital archives from anywhere, anytime.
            Your digital library is always open.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Browse by Category
            </h2>
            <p className="text-[#666666]">Explore our diverse digital collections</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIGITAL_CATEGORIES.map((cat, i) => (
              <Card
                key={i}
                className="osgu-card overflow-hidden border-[#EBEBEB] bg-white group"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: cat.color }}
                />
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#16191A]">{cat.title}</h3>
                        <Badge className="text-xs" style={{ backgroundColor: `${cat.color}`, color: "white" }}>
                          {cat.count}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#666666] mb-4">{cat.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {cat.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-[#333]">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5 pt-0">
                  <Button
                    variant="outline"
                    className="w-full border-[#EBEBEB] text-sm group-hover:bg-[#C63134] group-hover:text-white group-hover:border-[#C63134] transition-colors"
                  >
                    Explore {cat.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Databases */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16191A] mb-2">
              Popular Databases
            </h2>
            <p className="text-[#666666]">Most used databases by our research community</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="osgu-card bg-white border-0">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F1F1F1] animate-pulse flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 w-2/3 bg-[#EBEBEB] rounded mb-2 animate-pulse" />
                    <div className="h-3 w-full bg-[#F1F1F1] rounded animate-pulse" />
                  </div>
                  <div className="text-right">
                    <div className="h-4 w-12 bg-[#EBEBEB] rounded mb-1 animate-pulse ml-auto" />
                    <div className="h-3 w-10 bg-[#F1F1F1] rounded animate-pulse ml-auto" />
                  </div>
                </CardContent>
              </Card>
            )) : popularResources.map((res, i) => (
              <Card
                key={i}
                className="osgu-card bg-white border-0 cursor-pointer"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${res.color}15` }}
                  >
                    <Database className="w-6 h-6" style={{ color: res.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[#16191A]">{res.name}</h3>
                    <p className="text-xs text-[#666666]">{res.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold" style={{ color: res.color }}>{res.users}</div>
                    <div className="text-xs text-[#999]">users</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Access Info */}
      <section className="bg-[#222222] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Access From Anywhere
              </h2>
              <p className="text-[#CCCCCC] mb-6">
                All digital resources are accessible from campus and remotely using your OSGU credentials.
                Whether you&apos;re in the library, at home, or on the go, your research is always within reach.
              </p>
              <div className="space-y-3">
                {[
                  "On-campus: Automatic access via university network",
                  "Off-campus: Login with OSGU email credentials",
                  "Mobile: Download the OSGU Library App",
                  "VPN: Connect via university VPN for full access",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#CCCCCC]">
                    <ExternalLink className="w-4 h-4 text-[#0095EB]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#292B33] rounded-xl p-6 border border-[#333]">
              <h3 className="text-white font-semibold mb-4">Quick Access Links</h3>
              <div className="space-y-2">
                {["Off-Campus Login Portal", "EZproxy Configuration Guide", "Download Library App", "VPN Setup Instructions", "Browser Extensions"].map((link, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#333] transition-colors text-left"
                  >
                    <span className="text-sm text-[#CCCCCC]">{link}</span>
                    <ArrowRight className="w-4 h-4 text-[#999]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
