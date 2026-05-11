"use client";

import ContentManager from "./ContentManager";

interface FAQManagerProps {
  token: string;
}

const columns = [
  { key: "question", label: "Question" },
  { key: "category", label: "Category" },
  { key: "order", label: "Order", type: "number" as const },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function FAQManager({ token }: FAQManagerProps) {
  return (
    <ContentManager
      title="FAQs"
      singular="FAQ"
      columns={columns}
      token={token}
      apiPath="faqs"
      renderFormFields={(item, onChange) => (
        <div>
          <label className="text-sm font-medium text-[#333] mb-1.5 block">Answer</label>
          <textarea
            className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#C63134]/50 min-h-[100px]"
            value={String(item.answer ?? "")}
            onChange={(e) => onChange("answer", e.target.value)}
            rows={5}
          />
        </div>
      )}
    />
  );
}
