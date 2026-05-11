"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const DEFAULT_HOURS = [
  { day: "Monday - Friday", time: "8:00 AM - 9:00 PM", open: true },
  { day: "Saturday", time: "9:00 AM - 6:00 PM", open: true },
  { day: "Sunday", time: "10:00 AM - 4:00 PM", open: true },
  { day: "Public Holidays", time: "Closed", open: false },
  { day: "Exam Season (Apr-May)", time: "7:00 AM - 11:00 PM", open: true },
];

const DEFAULT_DEPARTMENTS = [
  { name: "Circulation Desk", phone: "+91-12345-67890", ext: "101" },
  { name: "Reference Services", phone: "+91-12345-67891", ext: "102" },
  { name: "Digital Resources", phone: "+91-12345-67892", ext: "103" },
  { name: "Technical Services", phone: "+91-12345-67893", ext: "104" },
  { name: "Administration", phone: "+91-12345-67894", ext: "105" },
];

const DEFAULT_SOCIAL_LINKS = [
  { name: "Facebook", icon: Facebook, followers: "5.2K", color: "#1877F2" },
  { name: "Twitter / X", icon: Twitter, followers: "3.1K", color: "#000000" },
  { name: "Instagram", icon: Instagram, followers: "4.8K", color: "#E4405F" },
  { name: "LinkedIn", icon: Linkedin, followers: "2.5K", color: "#0A66C2" },
  { name: "YouTube", icon: Youtube, followers: "1.8K", color: "#FF0000" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [contactContent, setContactContent] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetch("/api/content?section=contact_page")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && typeof data.content === "object") {
          setContactContent(data.content);
        }
      })
      .catch(() => {});
  }, []);

  // Use dynamic content with fallbacks
  const phone = contactContent?.phone || "+91-12345-67890";
  const email = contactContent?.email || "library@osgu.ac.in";
  const address = contactContent?.address || "OSGU Campus, NH-52, Village Brahmanwas, Distt. Hisar, Haryana - 125001";

  // Hours from dynamic content
  const dynamicHours = contactContent?.hours;
  const hours = dynamicHours && Array.isArray(dynamicHours) && dynamicHours.length > 0
    ? dynamicHours.map((h: { day: string; time: string }) => ({
        day: h.day,
        time: h.time,
        open: h.time.toLowerCase() !== "closed",
      }))
    : DEFAULT_HOURS;

  // Departments from dynamic content
  const dynamicDepts = contactContent?.departments;
  const departments = dynamicDepts && Array.isArray(dynamicDepts) && dynamicDepts.length > 0
    ? dynamicDepts.map((d: { name: string; phone: string; email?: string }, idx: number) => ({
        name: d.name,
        phone: d.phone,
        ext: DEFAULT_DEPARTMENTS[idx]?.ext || String(100 + idx),
      }))
    : DEFAULT_DEPARTMENTS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#0E76A8] text-white mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            Contact & Hours
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Get in <span className="text-[#0E76A8]">Touch</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Visit us, call us, or send a message. We&apos;re here to help you with all your library needs.
          </p>
        </div>
      </section>

      {/* Map Placeholder & Contact Info */}
      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map / Location */}
            <div>
              <h2 className="text-xl font-bold text-[#16191A] mb-4">Our Location</h2>
              <Card className="border-[#EBEBEB] overflow-hidden mb-6">
                <div className="h-64 bg-[#E5E7EB] flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#C63134] mx-auto mb-2" />
                    <p className="text-sm text-[#666] font-medium">OSGU Campus Map</p>
                    <p className="text-xs text-[#999]">NH-52, Brahmanwas, Hisar, Haryana</p>
                  </div>
                  {/* Grid pattern for map placeholder */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }} />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#C63134] flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-[#16191A]">Address</p>
                        <p className="text-[#666]">{address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#C63134] flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-[#16191A]">General Inquiries</p>
                        <p className="text-[#666]">{phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#C63134] flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-[#16191A]">Email</p>
                        <p className="text-[#666]">{email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold text-[#16191A] mb-4">Send a Message</h2>
              <Card className="border-[#EBEBEB]">
                <CardContent className="p-6">
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-[#75B740] mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-[#16191A] mb-1">Message Sent!</h3>
                      <p className="text-sm text-[#666]">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#333] mb-1.5 block">Name</label>
                          <Input
                            required
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#333] mb-1.5 block">Email</label>
                          <Input
                            required
                            type="email"
                            placeholder="your.email@osgu.ac.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1.5 block">Subject</label>
                        <Input
                          required
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#333] mb-1.5 block">Message</label>
                        <Textarea
                          required
                          rows={5}
                          placeholder="Describe your query or feedback..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 bg-[#C63134] hover:bg-[#CC383E] text-white font-medium"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Departments */}
      <section className="bg-[#F1F1F1] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Library Hours */}
            <div>
              <h2 className="text-xl font-bold text-[#16191A] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C63134]" />
                Library Hours
              </h2>
              <Card className="border-[#EBEBEB]">
                <CardContent className="p-0">
                  {hours.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 ${
                        i < hours.length - 1 ? "border-b border-[#EBEBEB]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.open ? "bg-[#75B740]" : "bg-[#C63134]"}`} />
                        <span className="text-sm font-medium text-[#16191A]">{item.day}</span>
                      </div>
                      <span className={`text-sm ${item.open ? "text-[#666]" : "text-[#C63134] font-medium"}`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Department Contacts */}
            <div>
              <h2 className="text-xl font-bold text-[#16191A] mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#C63134]" />
                Department Contacts
              </h2>
              <Card className="border-[#EBEBEB]">
                <CardContent className="p-0">
                  {departments.map((dept, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 ${
                        i < departments.length - 1 ? "border-b border-[#EBEBEB]" : ""
                      }`}
                    >
                      <div>
                        <span className="text-sm font-medium text-[#16191A]">{dept.name}</span>
                        <p className="text-xs text-[#999]">Ext: {dept.ext}</p>
                      </div>
                      <span className="text-sm text-[#0095EB]">{dept.phone}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="bg-[#222222] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Follow Us
          </h2>
          <p className="text-[#CCCCCC] mb-8 max-w-xl mx-auto">
            Stay connected with OSGU Central Library on social media for the latest updates, events, and resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {DEFAULT_SOCIAL_LINKS.map((social, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-3 bg-[#292B33] rounded-xl px-5 py-3 hover:bg-[#333] transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${social.color}20` }}
                >
                  <social.icon className="w-5 h-5" style={{ color: social.color }} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{social.name}</div>
                  <div className="text-xs text-[#999]">{social.followers} followers</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
