"use client";

import ContentManager from "./ContentManager";

interface EventManagerProps {
  token: string;
}

const columns = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "location", label: "Location" },
  { key: "category", label: "Category" },
  { key: "capacity", label: "Capacity", type: "number" as const },
  { key: "registered", label: "Registered", type: "number" as const },
  { key: "registration", label: "Registration", type: "boolean" as const },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function EventManager({ token }: EventManagerProps) {
  return (
    <ContentManager
      title="Events"
      singular="Event"
      columns={columns}
      token={token}
      apiPath="events"
    />
  );
}
