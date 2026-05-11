"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SiteSettingsProps {
  token: string;
}

interface JsonSectionProps {
  label: string;
  description: string;
  value: string;
  onChange: (val: string) => void;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  rows?: number;
  hint: string;
}

function JsonSection({ label, description, value, onChange, saving, saved, onSave, rows = 12, hint }: JsonSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
        <p className="text-xs text-[#999]">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-[#333] mb-1.5 block">JSON Content</Label>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="font-mono text-xs"
          />
          <p className="text-xs text-[#999] mt-1">{hint}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onSave}
            disabled={saving}
            className="bg-[#C63134] hover:bg-[#CC383E] text-white"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            Save {label}
          </Button>
          {saved && (
            <span className="text-sm text-[#75B740] font-medium">Saved!</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SiteSettings({ token }: SiteSettingsProps) {
  const [hero, setHero] = useState({ badge: "", title: "", description: "" });
  const [stats, setStats] = useState<string>("");
  const [announcements, setAnnouncements] = useState<string>("");
  const [headerData, setHeaderData] = useState<string>("");
  const [footerData, setFooterData] = useState<string>("");
  const [aboutPageData, setAboutPageData] = useState<string>("");
  const [contactPageData, setContactPageData] = useState<string>("");
  const [researchPageData, setResearchPageData] = useState<string>("");
  const [kidsPageData, setKidsPageData] = useState<string>("");
  const [accountPageData, setAccountPageData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/content", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const contentList = data.content || [];

        const heroItem = contentList.find((c: { section: string }) => c.section === "hero");
        if (heroItem) {
          const parsed = JSON.parse(heroItem.content);
          setHero({
            badge: parsed.badge || "",
            title: parsed.title || "",
            description: parsed.description || "",
          });
        }

        const statsItem = contentList.find((c: { section: string }) => c.section === "stats");
        if (statsItem) setStats(statsItem.content);

        const annItem = contentList.find((c: { section: string }) => c.section === "announcements");
        if (annItem) setAnnouncements(annItem.content);

        const headerItem = contentList.find((c: { section: string }) => c.section === "header");
        if (headerItem) setHeaderData(JSON.stringify(JSON.parse(headerItem.content), null, 2));

        const footerItem = contentList.find((c: { section: string }) => c.section === "footer");
        if (footerItem) setFooterData(JSON.stringify(JSON.parse(footerItem.content), null, 2));

        const aboutItem = contentList.find((c: { section: string }) => c.section === "about_page");
        if (aboutItem) setAboutPageData(JSON.stringify(JSON.parse(aboutItem.content), null, 2));

        const contactItem = contentList.find((c: { section: string }) => c.section === "contact_page");
        if (contactItem) setContactPageData(JSON.stringify(JSON.parse(contactItem.content), null, 2));

        const researchItem = contentList.find((c: { section: string }) => c.section === "research_page");
        if (researchItem) setResearchPageData(JSON.stringify(JSON.parse(researchItem.content), null, 2));

        const kidsItem = contentList.find((c: { section: string }) => c.section === "kids_page");
        if (kidsItem) setKidsPageData(JSON.stringify(JSON.parse(kidsItem.content), null, 2));

        const accountItem = contentList.find((c: { section: string }) => c.section === "account_page");
        if (accountItem) setAccountPageData(JSON.stringify(JSON.parse(accountItem.content), null, 2));
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [token]);

  const saveSection = async (section: string, content: string) => {
    setSaving((prev) => ({ ...prev, [section]: true }));
    setSuccess((prev) => ({ ...prev, [section]: false }));

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ section, content }),
      });

      if (res.ok) {
        setSuccess((prev) => ({ ...prev, [section]: true }));
        setTimeout(() => setSuccess((prev) => ({ ...prev, [section]: false })), 2000);
      }
    } catch {
      // ignore
    } finally {
      setSaving((prev) => ({ ...prev, [section]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-[#C63134] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#16191A]">Site Settings</h2>
        <p className="text-sm text-[#666]">Manage all site content sections</p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="overflow-x-auto flex-wrap h-auto gap-1">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="about_page">About Page</TabsTrigger>
          <TabsTrigger value="contact_page">Contact Page</TabsTrigger>
          <TabsTrigger value="research_page">Research Page</TabsTrigger>
          <TabsTrigger value="kids_page">Kids Page</TabsTrigger>
          <TabsTrigger value="account_page">Account Page</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-[#333] mb-1.5 block">Badge Text</Label>
                <Input
                  value={hero.badge}
                  onChange={(e) => setHero((prev) => ({ ...prev, badge: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-[#333] mb-1.5 block">Title</Label>
                <Input
                  value={hero.title}
                  onChange={(e) => setHero((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-[#333] mb-1.5 block">Description</Label>
                <Textarea
                  value={hero.description}
                  onChange={(e) => setHero((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => saveSection("hero", JSON.stringify(hero))}
                  disabled={saving["hero"]}
                  className="bg-[#C63134] hover:bg-[#CC383E] text-white"
                >
                  {saving["hero"] ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
                  Save Hero
                </Button>
                {success["hero"] && (
                  <span className="text-sm text-[#75B740] font-medium">Saved!</span>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <JsonSection
            label="Statistics"
            description="Configure the homepage stats counters"
            value={stats}
            onChange={setStats}
            saving={saving["stats"] || false}
            saved={success["stats"] || false}
            onSave={() => saveSection("stats", stats)}
            hint={`Format: JSON array of { "icon", "value", "label", "suffix" }`}
          />
        </TabsContent>

        <TabsContent value="announcements">
          <JsonSection
            label="Announcements"
            description="Configure the homepage announcement cards"
            value={announcements}
            onChange={setAnnouncements}
            saving={saving["announcements"] || false}
            saved={success["announcements"] || false}
            onSave={() => saveSection("announcements", announcements)}
            hint={`Format: JSON array of { "title", "date", "icon", "color" }`}
          />
        </TabsContent>

        <TabsContent value="header">
          <JsonSection
            label="Header"
            description="Configure the site header: ticker announcements, contact info, library name"
            value={headerData}
            onChange={setHeaderData}
            saving={saving["header"] || false}
            saved={success["header"] || false}
            onSave={() => saveSection("header", headerData)}
            rows={16}
            hint={`Format: JSON object with "ticker" (string[]), "phone", "email", "libraryName", "universityName"`}
          />
        </TabsContent>

        <TabsContent value="footer">
          <JsonSection
            label="Footer"
            description="Configure the site footer: description, address, contact info, hours, copyright, social links"
            value={footerData}
            onChange={setFooterData}
            saving={saving["footer"] || false}
            saved={success["footer"] || false}
            onSave={() => saveSection("footer", footerData)}
            rows={16}
            hint={`Format: JSON object with "description", "address", "phone", "email", "hours", "copyright", "socialLinks"`}
          />
        </TabsContent>

        <TabsContent value="about_page">
          <JsonSection
            label="About Page"
            description="Configure the About page: mission, vision, timeline, library stats, policies"
            value={aboutPageData}
            onChange={setAboutPageData}
            saving={saving["about_page"] || false}
            saved={success["about_page"] || false}
            onSave={() => saveSection("about_page", aboutPageData)}
            rows={20}
            hint={`Format: JSON object with "mission", "vision", "timeline"[], "libraryStats"[], "policies"[]`}
          />
        </TabsContent>

        <TabsContent value="contact_page">
          <JsonSection
            label="Contact Page"
            description="Configure the Contact page: address, phone, email, hours, departments, social links"
            value={contactPageData}
            onChange={setContactPageData}
            saving={saving["contact_page"] || false}
            saved={success["contact_page"] || false}
            onSave={() => saveSection("contact_page", contactPageData)}
            rows={20}
            hint={`Format: JSON object with "address", "phone", "email", "hours"[], "departments"[], "socialLinks"`}
          />
        </TabsContent>

        <TabsContent value="research_page">
          <JsonSection
            label="Research Page"
            description="Configure the Research page: citation tools, library guides, tutorials"
            value={researchPageData}
            onChange={setResearchPageData}
            saving={saving["research_page"] || false}
            saved={success["research_page"] || false}
            onSave={() => saveSection("research_page", researchPageData)}
            rows={20}
            hint={`Format: JSON object with "citationTools"[], "guides"[], "tutorials"[]`}
          />
        </TabsContent>

        <TabsContent value="kids_page">
          <JsonSection
            label="Kids Page"
            description="Configure the Kids & Teens page: kids collections, teen collections, programs, homework help"
            value={kidsPageData}
            onChange={setKidsPageData}
            saving={saving["kids_page"] || false}
            saved={success["kids_page"] || false}
            onSave={() => saveSection("kids_page", kidsPageData)}
            rows={22}
            hint={`Format: JSON object with "kidsCollections"[], "teenCollections"[], "programs"[], "homeworkHelp"[]`}
          />
        </TabsContent>

        <TabsContent value="account_page">
          <JsonSection
            label="Account Page"
            description="Configure the My Account page: welcome title, message, feature cards"
            value={accountPageData}
            onChange={setAccountPageData}
            saving={saving["account_page"] || false}
            saved={success["account_page"] || false}
            onSave={() => saveSection("account_page", accountPageData)}
            rows={14}
            hint={`Format: JSON object with "welcomeTitle", "welcomeMessage", "features"[]`}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
