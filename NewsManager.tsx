"use client";

import ContentManager from "./ContentManager";

interface NewsManagerProps {
  token: string;
}

const columns = [
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "category", label: "Category" },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function NewsManager({ token }: NewsManagerProps) {
  return (
    <ContentManager
      title="News Articles"
      singular="Article"
      columns={columns}
      token={token}
      apiPath="news"
      renderFormFields={(item, onChange) => (
        <>
          <div>
            <label className="text-sm font-medium text-[#333] mb-1.5 block">Excerpt</label>
            <textarea
              className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C63134]/50 min-h-[60px]"
              value={String(item.excerpt ?? "")}
              onChange={(e) => onChange("excerpt", e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#333] mb-1.5 block">Content</label>
            <textarea
              className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C63134]/50 min-h-[120px]"
              value={String(item.content ?? "")}
              onChange={(e) => onChange("content", e.target.value)}
              rows={5}
            />
          </div>
        </>
      )}
    />
  );
}
