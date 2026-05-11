"use client";

import ContentManager from "./ContentManager";

interface PlanManagerProps {
  token: string;
}

const columns = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "duration", label: "Duration" },
  { key: "featured", label: "Featured", type: "boolean" as const },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function PlanManager({ token }: PlanManagerProps) {
  return (
    <ContentManager
      title="Membership Plans"
      singular="Plan"
      columns={columns}
      token={token}
      apiPath="plans"
      renderFormFields={(item, onChange) => (
        <div>
          <label className="text-sm font-medium text-[#333] mb-1.5 block">Benefits (JSON array)</label>
          <textarea
            className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C63134]/50 font-mono text-xs min-h-[100px]"
            value={typeof item.benefits === "string" ? String(item.benefits) : JSON.stringify(item.benefits || [], null, 2)}
            onChange={(e) => {
              try { onChange("benefits", JSON.parse(e.target.value)); }
              catch { onChange("benefits", e.target.value); }
            }}
            rows={5}
          />
        </div>
      )}
    />
  );
}
