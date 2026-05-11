"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  BookOpen,
  ChevronRight,
  Video,
  FileText,
  Lightbulb,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  CircleHelp,
  CreditCard,
  Clock,
  BookMarked,
  Shield,
  Monitor,
  Users,
} from "lucide-react";

const FAQ_CATEGORIES = [
  { label: "All", icon: HelpCircle, count: 16 },
  { label: "Borrowing", icon: BookOpen, count: 4 },
  { label: "Digital Resources", icon: Monitor, count: 3 },
  { label: "Membership", icon: CreditCard, count: 3 },
  { label: "Services", icon: Shield, count: 3 },
  { label: "General", icon: CircleHelp, count: 3 },
];

const DEFAULT_FAQS = [
  {
    q: "How do I get a library membership?",
    a: "OSGU students and faculty automatically receive library membership upon enrollment/employment. Visit the circulation desk with your OSGU ID card to activate your account. External members can register online or at the library with valid ID proof and the applicable fee.",
    category: "Membership",
  },
  {
    q: "How many books can I borrow at a time?",
    a: "Students can borrow up to 10 books for 14 days. Faculty members can borrow up to 20 books for 30 days. Alumni members can borrow up to 5 books, and external members up to 3 books.",
    category: "Borrowing",
  },
  {
    q: "How do I renew my borrowed books?",
    a: "You can renew books online through your library account or the mobile app. Each book can be renewed up to 2 times, provided no other member has placed a hold on it. Renewals must be done before the due date.",
    category: "Borrowing",
  },
  {
    q: "What are the overdue fines?",
    a: "A fine of ₹5 per day per book is charged for overdue items. If fines accumulate to ₹100 or more, borrowing privileges are temporarily suspended. Fines can be paid at the circulation desk or through the online portal.",
    category: "Borrowing",
  },
  {
    q: "How do I access e-books and e-journals from home?",
    a: "All OSGU library members can access digital resources remotely. Use the off-campus login portal on the library website and authenticate with your OSGU email credentials. Some resources are also accessible through the EZproxy service.",
    category: "Digital Resources",
  },
  {
    q: "What research databases are available?",
    a: "We subscribe to over 50 research databases including Scopus, Web of Science, JSTOR, IEEE Xplore, PubMed Central, SpringerLink, ScienceDirect, and many more. Access is free for all members through the library portal.",
    category: "Digital Resources",
  },
  {
    q: "Can I download e-books for offline reading?",
    a: "Yes, many of our e-book platforms support offline reading through their dedicated apps. Check the specific platform (e.g., EBSCO, ProQuest) for download options and DRM restrictions. Generally, downloaded books are accessible for 7-21 days.",
    category: "Digital Resources",
  },
  {
    q: "How do I reserve a study room?",
    a: "Study rooms can be booked online through the library website or mobile app. Select your preferred date and time slot, choose a room, and confirm your booking. Rooms can be booked up to 7 days in advance for a maximum of 2 hours per session.",
    category: "Services",
  },
  {
    q: "Does the library offer printing and photocopying?",
    a: "Yes! We offer both black-and-white (₹1/page) and color printing (₹5/page). Self-service kiosks are available on each floor. Wireless printing is also supported — send your print jobs from your laptop and collect them at any print station.",
    category: "Services",
  },
  {
    q: "How can I request a book not available in the library?",
    a: "Use our Interlibrary Loan (ILL) service. Submit a request through the library portal with the book details. We'll source it from our partner libraries network. Students pay ₹20 per request; faculty and researchers can use the service for free.",
    category: "Services",
  },
  {
    q: "What are the library's operating hours?",
    a: "Regular hours are Monday-Friday 8:00 AM - 9:00 PM, Saturday 9:00 AM - 6:00 PM, and Sunday 10:00 AM - 4:00 PM. During exam season (April-May), extended hours are 7:00 AM - 11:00 PM. The library is closed on public holidays.",
    category: "General",
  },
  {
    q: "Can I eat or drink inside the library?",
    a: "Food is not permitted in the library to protect books and resources. Covered water bottles and beverages with secure lids are allowed in designated areas. A café is available on the ground floor for snacks and meals.",
    category: "General",
  },
  {
    q: "How do I reset my library account password?",
    a: "Click 'Forgot Password' on the library login page and enter your registered email address. A password reset link will be sent to your email. If you continue to face issues, visit the circulation desk or email library@osgu.ac.in.",
    category: "Membership",
  },
  {
    q: "Is there a lost and found at the library?",
    a: "Yes, items found in the library are kept at the circulation desk. If you've lost something, please check with the staff. Valuable items are held for 30 days, after which they may be donated or disposed of.",
    category: "General",
  },
  {
    q: "Can I use the library if I'm not from OSGU?",
    a: "Yes! We offer External Membership for non-OSGU individuals at ₹1,000 per year. External members get access to the physical collection, reading spaces, and basic services. Visit the membership page to register.",
    category: "Membership",
  },
  {
    q: "What should I do if I lose a library book?",
    a: "Report the loss immediately at the circulation desk. You'll need to pay the replacement cost of the book plus a processing fee of ₹100. If you find and return the book within 30 days, the replacement charge (excluding processing fee) will be refunded.",
    category: "Borrowing",
  },
];

const HOW_TO_GUIDES = [
  { title: "How to Search the Catalog", desc: "Step-by-step guide to finding books in our catalog", icon: Search, color: "#C63134" },
  { title: "How to Use Databases", desc: "Navigate research databases like Scopus and JSTOR", icon: Monitor, color: "#0095EB" },
  { title: "How to Manage Citations", desc: "Setting up Zotero or Mendeley for your research", icon: FileText, color: "#75B740" },
  { title: "How to Book a Room", desc: "Reserve study rooms and collaborative spaces", icon: Users, color: "#DBAA36" },
];

const VIDEO_TUTORIALS = [
  { title: "Getting Started with the Library", duration: "5 min", color: "#C63134" },
  { title: "Using the Self-Checkout Kiosk", duration: "3 min", color: "#0095EB" },
  { title: "Searching Scopus Effectively", duration: "8 min", color: "#75B740" },
  { title: "Setting Up Zotero", duration: "10 min", color: "#DBAA36" },
  { title: "Library Mobile App Tour", duration: "4 min", color: "#E98F10" },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [categories, setCategories] = useState(FAQ_CATEGORIES);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(data.faqs);
          const catMap = new Map<string, number>();
          data.faqs.forEach((f: { category: string }) => {
            catMap.set(f.category, (catMap.get(f.category) || 0) + 1);
          });
          const CATEGORY_ICON_MAP: Record<string, typeof HelpCircle> = {
            Borrowing: BookOpen,
            "Digital Resources": Monitor,
            Membership: CreditCard,
            Services: Shield,
            General: CircleHelp,
          };
          const derivedCats = [
            { label: "All", icon: HelpCircle, count: data.faqs.length },
            ...Array.from(catMap.entries()).map(([label, count]) => ({
              label,
              icon: CATEGORY_ICON_MAP[label] || CircleHelp,
              count,
            })),
          ];
          setCategories(derivedCats);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#75B740] text-white mb-3">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            FAQ & Help
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            How Can We <span className="text-[#75B740]">Help</span>?
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Find answers to common questions, access guides, tutorials, and get the support you need.
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="bg-[#FCFCFC] py-8 border-b border-[#EBEBEB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.label}
                variant={activeCategory === cat.label ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.label)}
                className={
                  activeCategory === cat.label
                    ? "bg-[#C63134] hover:bg-[#CC383E] text-white"
                    : "border-[#EBEBEB] text-[#666]"
                }
              >
                <cat.icon className="w-3.5 h-3.5 mr-1.5" />
                {cat.label} ({cat.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#FCFCFC] py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold text-[#16191A] mb-6">
            Frequently Asked Questions ({filteredFaqs.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-[#EBEBEB] mx-auto mb-3 animate-pulse" />
              <p className="text-[#666]">Loading FAQs...</p>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-[#EBEBEB] mx-auto mb-3" />
              <p className="text-[#666]">No FAQs match your search. Try a different keyword.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-[#EBEBEB]">
                  <AccordionTrigger className="text-left text-sm font-medium text-[#16191A] hover:text-[#C63134]">
                    <div className="flex items-center gap-2 pr-4">
                      <Badge
                        className="text-[10px] px-1.5 py-0 flex-shrink-0"
                        style={{
                          backgroundColor: `${categories.find((c) => c.label === faq.category)?.icon === BookOpen ? "#C63134" : faq.category === "Digital Resources" ? "#0095EB" : faq.category === "Membership" ? "#DBAA36" : faq.category === "Services" ? "#E98F10" : "#75B740"}15`,
                          color: faq.category === "Borrowing" ? "#C63134" : faq.category === "Digital Resources" ? "#0095EB" : faq.category === "Membership" ? "#DBAA36" : faq.category === "Services" ? "#E98F10" : "#75B740",
                        }}
                      >
                        {faq.category}
                      </Badge>
                      {faq.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#666] leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* How-To Guides & Video Tutorials */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* How-To Guides */}
            <div>
              <h2 className="text-xl font-bold text-[#16191A] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C63134]" />
                How-To Guides
              </h2>
              <div className="space-y-3">
                {HOW_TO_GUIDES.map((guide, i) => (
                  <Card key={i} className="osgu-card border-[#EBEBEB] bg-white cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${guide.color}15` }}
                      >
                        <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-[#16191A]">{guide.title}</h3>
                        <p className="text-xs text-[#666]">{guide.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#999]" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div>
              <h2 className="text-xl font-bold text-[#16191A] mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#0095EB]" />
                Video Tutorials
              </h2>
              <div className="space-y-3">
                {VIDEO_TUTORIALS.map((vid, i) => (
                  <Card key={i} className="osgu-card border-[#EBEBEB] bg-white cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div
                        className="w-16 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${vid.color}15` }}
                      >
                        <Video className="w-5 h-5" style={{ color: vid.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-[#16191A]">{vid.title}</h3>
                        <p className="text-xs text-[#999]">{vid.duration}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#999]" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-[#222222] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Still Need Help?
          </h2>
          <p className="text-[#CCCCCC] mb-8 max-w-xl mx-auto">
            Our library staff is always happy to assist you. Reach out through any of these channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Phone, label: "Call Us", detail: "+91-12345-67890", color: "#C63134" },
              { icon: Mail, label: "Email Us", detail: "library@osgu.ac.in", color: "#0095EB" },
              { icon: MessageSquare, label: "Live Chat", detail: "Available 9 AM - 6 PM", color: "#75B740" },
            ].map((item, i) => (
              <Card key={i} className="bg-[#292B33] border-[#333] min-w-[200px]">
                <CardContent className="p-5 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{item.label}</h3>
                  <p className="text-xs text-[#CCCCCC] mt-1">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
