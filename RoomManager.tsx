"use client";

import ContentManager from "./ContentManager";

interface RoomManagerProps {
  token: string;
}

const columns = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "capacity", label: "Capacity", type: "number" as const },
  { key: "available", label: "Available", type: "boolean" as const },
];

export default function RoomManager({ token }: RoomManagerProps) {
  return (
    <ContentManager
      title="Rooms & Spaces"
      singular="Room"
      columns={columns}
      token={token}
      apiPath="rooms"
      renderFormFields={(item, onChange) => (
        <div>
          <label className="text-sm font-medium text-[#333] mb-1.5 block">Features (JSON array)</label>
          <textarea
            className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C63134]/50 font-mono text-xs min-h-[80px]"
            value={typeof item.features === "string" ? String(item.features) : JSON.stringify(item.features || [], null, 2)}
            onChange={(e) => {
              try { onChange("features", JSON.parse(e.target.value)); }
              catch { onChange("features", e.target.value); }
            }}
            rows={4}
          />
        </div>
      )}
    />
  );
}
