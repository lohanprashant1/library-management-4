"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  History,
  CreditCard,
  Settings,
  LogIn,
  Mail,
  Lock,
  Bookmark,
  RefreshCw,
} from "lucide-react";

const DEFAULT_ACCOUNT_CONTENT = {
  welcomeTitle: "My Library Account",
  welcomeMessage: "Sign in to manage your checkouts, holds, and account settings",
};

interface CheckoutItem {
  id: number;
  title: string;
  author: string;
  dueDate: string;
  status: "overdue" | "due-soon" | "normal";
  renewals: number;
}

interface HoldItem {
  id: number;
  title: string;
  author: string;
  position: number;
  status: "available" | "waiting";
  availableDate?: string;
}

interface FineItem {
  id: number;
  title: string;
  reason: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
}

const MOCK_CHECKOUTS: CheckoutItem[] = [
  { id: 1, title: "Machine Learning and AI", author: "Priya Sharma", dueDate: "2025-04-25", status: "normal", renewals: 0 },
  { id: 2, title: "Data Structures & Algorithms", author: "Michael Brown", dueDate: "2025-04-18", status: "due-soon", renewals: 1 },
  { id: 3, title: "Principles of Economics", author: "David Miller", dueDate: "2025-04-10", status: "overdue", renewals: 2 },
  { id: 4, title: "Psychology: An Introduction", author: "Richard Taylor", dueDate: "2025-04-28", status: "normal", renewals: 0 },
];

const MOCK_HOLDS: HoldItem[] = [
  { id: 1, title: "Modern Physics: From Atoms to Quarks", author: "Robert Williams", position: 1, status: "available", availableDate: "Available now" },
  { id: 2, title: "World History: A Comprehensive Guide", author: "Lisa Anderson", position: 3, status: "waiting" },
  { id: 3, title: "English Literature: A Critical History", author: "Thomas Moore", position: 5, status: "waiting" },
];

const MOCK_FINES: FineItem[] = [
  { id: 1, title: "Principles of Economics", reason: "Overdue (5 days)", amount: 25, date: "2025-04-10", status: "pending" },
  { id: 2, title: "Organic Chemistry Fundamentals", reason: "Overdue (3 days)", amount: 15, date: "2025-03-20", status: "paid" },
];

const MOCK_HISTORY = [
  { id: 1, title: "Introduction to Computer Science", author: "John Smith", returnedDate: "2025-03-15", rating: 5 },
  { id: 2, title: "Business Management Strategies", author: "James Wilson", returnedDate: "2025-02-28", rating: 4 },
  { id: 3, title: "Biotechnology: Principles", author: "Rajesh Kumar", returnedDate: "2025-02-10", rating: 5 },
  { id: 4, title: "Digital Signal Processing", author: "Alan Oppenheim", returnedDate: "2025-01-20", rating: 4 },
];

export default function MyAccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountContent, setAccountContent] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch("/api/content?section=account_page")
      .then((r) => r.json())
      .then((data) => {
        if (data.content && typeof data.content === "object") {
          setAccountContent(data.content);
        }
      })
      .catch(() => {});
  }, []);

  const welcomeTitle = accountContent?.welcomeTitle || DEFAULT_ACCOUNT_CONTENT.welcomeTitle;
  const welcomeMessage = accountContent?.welcomeMessage || DEFAULT_ACCOUNT_CONTENT.welcomeMessage;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const totalFines = MOCK_FINES.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.amount, 0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-[#EBEBEB]">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-[#C63134]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-[#C63134]" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#16191A]">
              {welcomeTitle}
            </CardTitle>
            <p className="text-sm text-[#666666]">
              {welcomeMessage}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#333] mb-1.5 block">
                  Email / Library ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                  <Input
                    type="email"
                    placeholder="student@osgu.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#333] mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-[#C63134] hover:bg-[#CC383E] text-white font-medium"
              >
                Sign In
              </Button>
              <div className="text-center space-y-1">
                <button type="button" className="text-sm text-[#0095EB] hover:underline">
                  Forgot Password?
                </button>
                <p className="text-xs text-[#999]">
                  Demo: Use any email and password to sign in
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-[#191919] rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#C63134] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            JD
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">John Doe</h1>
            <p className="text-[#CCCCCC] text-sm">Student — Department of Computer Science</p>
            <p className="text-[#999] text-xs mt-1">Member since: August 2022 | Library ID: LIB-2022-0847</p>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => setIsLoggedIn(false)}
          >
            Sign Out
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Checked Out", value: MOCK_CHECKOUTS.length, icon: BookOpen, color: "#C63134" },
            { label: "On Hold", value: MOCK_HOLDS.length, icon: Clock, color: "#0095EB" },
            { label: "Outstanding Fines", value: `₹${totalFines}`, icon: AlertTriangle, color: "#E98F10" },
            { label: "Total Borrowed", value: "47", icon: History, color: "#75B740" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#222222] rounded-lg p-3 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: stat.color }} />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-[#999]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="checkouts" className="w-full">
        <TabsList className="mb-6 bg-[#F1F1F1]">
          <TabsTrigger value="checkouts" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-1.5" />
            Checkouts
          </TabsTrigger>
          <TabsTrigger value="holds" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
            <Clock className="w-4 h-4 mr-1.5" />
            Holds
          </TabsTrigger>
          <TabsTrigger value="fines" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            Fines
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#C63134] data-[state=active]:text-white">
            <History className="w-4 h-4 mr-1.5" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Checkouts Tab */}
        <TabsContent value="checkouts">
          <Card className="border-[#EBEBEB]">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F1F1F1]">
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Author</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_CHECKOUTS.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-[#999] sm:hidden">{item.author}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-[#666]">{item.author}</TableCell>
                      <TableCell className="text-sm">{item.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${
                            item.status === "overdue"
                              ? "bg-[#C63134] text-white"
                              : item.status === "due-soon"
                              ? "bg-[#E98F10] text-white"
                              : "bg-[#75B740] text-white"
                          }`}
                        >
                          {item.status === "overdue" ? "Overdue" : item.status === "due-soon" ? "Due Soon" : "Normal"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          disabled={item.renewals >= 2}
                        >
                          Renew ({2 - item.renewals} left)
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Holds Tab */}
        <TabsContent value="holds">
          <div className="space-y-3">
            {MOCK_HOLDS.map((item) => (
              <Card key={item.id} className="border-[#EBEBEB]">
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-[#16191A]">{item.title}</h3>
                    <p className="text-xs text-[#666]">{item.author}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`text-xs ${
                        item.status === "available"
                          ? "bg-[#75B740] text-white"
                          : "bg-[#0095EB] text-white"
                      }`}
                    >
                      {item.status === "available" ? "Available" : `Position #${item.position}`}
                    </Badge>
                    {item.status === "available" ? (
                      <Button size="sm" className="bg-[#C63134] hover:bg-[#CC383E] text-white text-xs">
                        Pick Up
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-xs text-[#C63134]">
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Fines Tab */}
        <TabsContent value="fines">
          <Card className="border-[#EBEBEB]">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F1F1F1]">
                    <TableHead>Title</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_FINES.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-sm">{item.title}</TableCell>
                      <TableCell className="text-sm text-[#666]">{item.reason}</TableCell>
                      <TableCell className="font-semibold text-sm">₹{item.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${
                            item.status === "pending"
                              ? "bg-[#E98F10] text-white"
                              : "bg-[#75B740] text-white"
                          }`}
                        >
                          {item.status === "pending" ? "Pending" : "Paid"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === "pending" && (
                          <Button size="sm" className="bg-[#C63134] hover:bg-[#CC383E] text-white text-xs">
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {totalFines > 0 && (
            <div className="mt-4 p-4 bg-[#E98F10]/10 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#E98F10]" />
                <span className="text-sm text-[#333]">
                  Outstanding fines: <strong>₹{totalFines}</strong>. Please clear your dues.
                </span>
              </div>
              <Button className="bg-[#C63134] hover:bg-[#CC383E] text-white text-sm">
                Pay All Fines
              </Button>
            </div>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <div className="space-y-3">
            {MOCK_HISTORY.map((item) => (
              <Card key={item.id} className="border-[#EBEBEB]">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#75B740]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#75B740]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[#16191A]">{item.title}</h3>
                    <p className="text-xs text-[#666]">{item.author}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-[#999]">Returned: {item.returnedDate}</div>
                    <div className="flex gap-0.5 justify-end mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < item.rating ? "text-[#DBAA36] fill-[#DBAA36]" : "text-[#EBEBEB]"}`} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
