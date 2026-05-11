"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookOpen,
  Filter,
  X,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  isbn: string;
  available: boolean;
  copies: number;
}

const GENRES = [
  "All",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Economics",
  "Business",
  "History",
  "Literature",
  "Psychology",
  "Law",
  "Environmental Science",
];

const YEARS = ["All", "2024", "2023", "2022", "2021", "2020"];

const BOOK_COVER_COLORS = [
  "#C63134", "#0095EB", "#75B740", "#DBAA36", "#E98F10",
  "#0E76A8", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
  "#6366F1", "#EF4444", "#10B981", "#F59E0B", "#3B82F6",
];

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [availableFilter, setAvailableFilter] = useState("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [query, genreFilter, yearFilter, availableFilter]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (genreFilter && genreFilter !== "All") params.set("genre", genreFilter);
      if (yearFilter && yearFilter !== "All") params.set("year", yearFilter);
      if (availableFilter !== "all") params.set("available", availableFilter);

      const res = await fetch(`/api/books?${params.toString()}`);
      const data = await res.json();
      setBooks(data.books);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setQuery("");
    setGenreFilter("All");
    setYearFilter("All");
    setAvailableFilter("all");
  };

  const hasActiveFilters = query || genreFilter !== "All" || yearFilter !== "All" || availableFilter !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#16191A] mb-2">Catalog Search</h1>
        <p className="text-[#666666]">
          Browse our collection of 50,000+ books, journals, and resources
        </p>
      </div>

      {/* Search & Filters */}
      <Card className="mb-8 border-[#EBEBEB]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <Input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={fetchBooks}
              className="bg-[#C63134] hover:bg-[#CC383E] text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5 text-sm text-[#666666]">
              <Filter className="w-4 h-4" />
              Filters:
            </div>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={availableFilter} onValueChange={setAvailableFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Checked Out</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#C63134]">
                <X className="w-3.5 h-3.5 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[#666666]">
          {loading ? "Searching..." : `${books.length} result${books.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="border-0 bg-[#F1F1F1] animate-pulse">
              <div className="h-48 bg-[#EBEBEB]" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-[#EBEBEB] rounded w-3/4" />
                <div className="h-3 bg-[#EBEBEB] rounded w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-[#EBEBEB] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#333] mb-2">No books found</h3>
          <p className="text-[#666666]">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {books.map((book, i) => (
            <Card
              key={book.id}
              className={`osgu-card overflow-hidden border cursor-pointer ${
                selectedBook?.id === book.id ? "ring-2 ring-[#C63134]" : "border-[#EBEBEB]"
              }`}
              onClick={() => setSelectedBook(book)}
            >
              <div
                className="h-48 flex items-center justify-center relative"
                style={{ backgroundColor: `${BOOK_COVER_COLORS[i % BOOK_COVER_COLORS.length]}15` }}
              >
                <BookOpen
                  className="w-12 h-12"
                  style={{ color: BOOK_COVER_COLORS[i % BOOK_COVER_COLORS.length] }}
                />
                <Badge
                  className={`absolute top-2 right-2 text-xs ${
                    book.available
                      ? "bg-[#75B740] text-white"
                      : "bg-[#999999] text-white"
                  }`}
                >
                  {book.available ? "Available" : "Checked Out"}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-sm text-[#16191A] line-clamp-2 leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-[#666666] mt-1">{book.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs bg-[#F1F1F1] text-[#666]">
                    {book.genre}
                  </Badge>
                  <span className="text-xs text-[#999]">{book.year}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedBook(null)}>
          <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#16191A]">{selectedBook.title}</h2>
                  <p className="text-[#666666]">by {selectedBook.author}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedBook(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedBook.genre}</Badge>
                  <Badge variant="outline">ISBN: {selectedBook.isbn}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {selectedBook.available ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#75B740]" />
                      <span className="text-[#75B740] font-medium">Available ({selectedBook.copies} copies)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-[#C63134]" />
                      <span className="text-[#C63134] font-medium">Currently unavailable</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#666666]">
                  <Eye className="w-4 h-4" />
                  Published: {selectedBook.year}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button className="bg-[#C63134] hover:bg-[#CC383E] text-white flex-1">
                    {selectedBook.available ? "Reserve Book" : "Place Hold"}
                  </Button>
                  <Button variant="outline" className="flex-1">Add to List</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
