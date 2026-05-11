"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DoorOpen,
  Users,
  Monitor,
  Check,
  MapPin,
} from "lucide-react";

interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  floor: string;
  features: string[];
  color: string;
  description: string;
}

const DEFAULT_ROOMS: Room[] = [
  {
    id: 1, name: "Study Room A", type: "Study Room", capacity: 4, floor: "2nd Floor",
    features: ["Whiteboard", "Power Outlets", "Wi-Fi", "Natural Light"],
    color: "#C63134",
    description: "Quiet study room perfect for focused individual or small group study sessions.",
  },
  {
    id: 2, name: "Study Room B", type: "Study Room", capacity: 4, floor: "2nd Floor",
    features: ["Whiteboard", "Power Outlets", "Wi-Fi"],
    color: "#0095EB",
    description: "Well-lit study room with whiteboard for collaborative learning.",
  },
  {
    id: 3, name: "Conference Room 1", type: "Meeting Room", capacity: 12, floor: "3rd Floor",
    features: ["Projector", "Whiteboard", "Video Conferencing", "Wi-Fi", "Air Conditioning"],
    color: "#75B740",
    description: "Professional meeting room equipped with AV equipment for presentations and meetings.",
  },
  {
    id: 4, name: "Conference Room 2", type: "Meeting Room", capacity: 8, floor: "3rd Floor",
    features: ["Projector", "Screen", "Wi-Fi", "Air Conditioning"],
    color: "#DBAA36",
    description: "Mid-size meeting room ideal for group discussions and seminars.",
  },
  {
    id: 5, name: "Quiet Zone A", type: "Quiet Zone", capacity: 30, floor: "1st Floor",
    features: ["Silent Area", "Individual Desks", "Power Outlets", "Reading Lamps"],
    color: "#0E76A8",
    description: "Designated silent study area for deep concentration. No talking or phone calls allowed.",
  },
  {
    id: 6, name: "Computer Lab", type: "Computer Lab", capacity: 40, floor: "Ground Floor",
    features: ["40 Workstations", "High-Speed Internet", "Printing", "Scanning", "Software Suite"],
    color: "#E98F10",
    description: "Fully equipped computer lab with workstations, printing, and academic software.",
  },
  {
    id: 7, name: "Media Room", type: "Multimedia", capacity: 20, floor: "2nd Floor",
    features: ["Large Screen", "Sound System", "DVD/Blu-ray", "Streaming", "Comfortable Seating"],
    color: "#8B5CF6",
    description: "Multimedia room for watching educational films, lectures, and presentations.",
  },
  {
    id: 8, name: "Group Study Lounge", type: "Collaborative", capacity: 24, floor: "1st Floor",
    features: ["Large Tables", "Whiteboards", "Wi-Fi", "Coffee Machine", "Flexible Seating"],
    color: "#EC4899",
    description: "Open collaborative space with large tables for group projects and discussions.",
  },
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM",
];

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState("2025-04-15");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState(DEFAULT_ROOMS);

  useEffect(() => {
    fetch("/api/rooms")
      .then((r) => r.json())
      .then((data) => {
        if (data.rooms && Array.isArray(data.rooms) && data.rooms.length > 0) {
          const ROOM_COLORS = ["#C63134", "#0095EB", "#75B740", "#DBAA36", "#0E76A8", "#E98F10", "#8B5CF6", "#EC4899"];
          const mapped = data.rooms.map((r: { id?: number; name: string; type?: string; capacity?: number; floor?: string; features?: string[]; color?: string; description?: string }, idx: number) => ({
            id: r.id || idx + 1,
            name: r.name,
            type: r.type || "Study Room",
            capacity: r.capacity || DEFAULT_ROOMS[idx]?.capacity || 4,
            floor: r.floor || DEFAULT_ROOMS[idx]?.floor || "",
            features: r.features && r.features.length > 0 ? r.features : DEFAULT_ROOMS[idx]?.features || [],
            color: r.color || ROOM_COLORS[idx % ROOM_COLORS.length],
            description: r.description || DEFAULT_ROOMS[idx]?.description || "",
          }));
          setRooms(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const roomTypes = ["All", "Study Room", "Meeting Room", "Quiet Zone", "Computer Lab", "Multimedia", "Collaborative"];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#191919] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-[#0E76A8] text-white mb-3">
            <DoorOpen className="w-3.5 h-3.5 mr-1.5" />
            Rooms & Spaces
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Book a <span className="text-[#0E76A8]">Study Space</span>
          </h1>
          <p className="text-[#CCCCCC] max-w-2xl mx-auto">
            Reserve study rooms, meeting spaces, computer labs, and collaborative areas.
            Find the perfect space for your needs.
          </p>
        </div>
      </section>

      <section className="bg-[#FCFCFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-medium text-[#333]">Filter by type:</span>
            {roomTypes.map((type) => (
              <Badge
                key={type}
                className="cursor-pointer hover:bg-[#C63134] hover:text-white transition-colors"
                variant="secondary"
              >
                {type}
              </Badge>
            ))}
          </div>

          {/* Room Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="osgu-card border-[#EBEBEB]">
                <div className="h-1.5 bg-[#EBEBEB] animate-pulse" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-5 w-24 bg-[#EBEBEB] rounded animate-pulse" />
                    <div className="h-4 w-20 bg-[#EBEBEB] rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-3/4 bg-[#EBEBEB] rounded mb-1 animate-pulse" />
                  <div className="h-3 w-full bg-[#F1F1F1] rounded mb-2 animate-pulse" />
                  <div className="h-3 w-full bg-[#F1F1F1] rounded mb-3 animate-pulse" />
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="h-4 w-16 bg-[#F1F1F1] rounded animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )) : rooms.map((room) => (
              <Card
                key={room.id}
                className={`osgu-card border cursor-pointer ${
                  selectedRoom?.id === room.id
                    ? "ring-2 ring-[#C63134] border-transparent"
                    : "border-[#EBEBEB]"
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="h-1.5" style={{ backgroundColor: room.color }} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className="text-xs"
                      style={{ backgroundColor: room.color, color: "white" }}
                    >
                      {room.type}
                    </Badge>
                    <span className="text-xs text-[#999] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {room.floor}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#16191A] mb-1">{room.name}</h3>
                  <p className="text-xs text-[#666] mb-3 line-clamp-2">{room.description}</p>
                  <div className="flex items-center gap-1.5 text-sm text-[#666] mb-3">
                    <Users className="w-4 h-4" />
                    <span>{room.capacity} capacity</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {room.features.slice(0, 3).map((f, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 bg-[#F1F1F1] text-[#666] rounded">
                        {f}
                      </span>
                    ))}
                    {room.features.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#F1F1F1] text-[#666] rounded">
                        +{room.features.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Panel */}
          {selectedRoom && (
            <Card className="mt-8 border-[#EBEBEB]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedRoom.name}</CardTitle>
                    <p className="text-sm text-[#666] mt-1">{selectedRoom.description}</p>
                  </div>
                  <Button variant="outline" onClick={() => { setSelectedRoom(null); setSelectedSlots([]); }}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Room Details */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-[#F1F1F1] rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#C63134]" />
                    <span>Capacity: {selectedRoom.capacity} people</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#C63134]" />
                    <span>{selectedRoom.floor}</span>
                  </div>
                  {selectedRoom.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#666]">
                      <Check className="w-3.5 h-3.5 text-[#75B740]" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-[#333] mb-2 block">Select Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-[#333] mb-3 block">Select Time Slots</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlots.includes(slot);
                      const isOccupied = slot === "10:00 AM" || slot === "2:00 PM"; // Mock occupied
                      return (
                        <button
                          key={slot}
                          disabled={isOccupied}
                          onClick={() => toggleSlot(slot)}
                          className={`py-2 px-2 text-xs rounded-lg text-center transition-colors ${
                            isOccupied
                              ? "bg-[#EBEBEB] text-[#999] cursor-not-allowed line-through"
                              : isSelected
                              ? "bg-[#C63134] text-white"
                              : "bg-[#F1F1F1] text-[#333] hover:bg-[#C63134]/10 hover:text-[#C63134]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-[#999]">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#C63134] rounded" /> Selected
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#EBEBEB] rounded" /> Occupied
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#F1F1F1] rounded border border-[#EBEBEB]" /> Available
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  className="bg-[#C63134] hover:bg-[#CC383E] text-white"
                  disabled={selectedSlots.length === 0}
                >
                  <DoorOpen className="w-4 h-4 mr-2" />
                  Book {selectedSlots.length > 0 ? `${selectedSlots.length} slot(s)` : ""}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
