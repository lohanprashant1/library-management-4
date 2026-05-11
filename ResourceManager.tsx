"use client";

import ContentManager from "./ContentManager";

interface ResourceManagerProps {
  token: string;
}

const columns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "url", label: "URL" },
  { key: "icon", label: "Icon" },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function ResourceManager({ token }: ResourceManagerProps) {
  return (
    <ContentManager
      title="Digital Resources"
      singular="Resource"
      columns={columns}
      token={token}
      apiPath="resources"
      renderFormFields={(item, onChange) => (
        <div>
          <label className="text-sm font-medium text-[#333] mb-1.5 block">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C63134]/50 min-h-[80px]"
            value={String(item.description ?? "")}
            onChange={(e) => onChange("description", e.target.value)}
            rows={3}
          />
        </div>
      )}
    />
  );
}
