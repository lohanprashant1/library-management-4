"use client";

import ContentManager from "./ContentManager";

interface ServiceManagerProps {
  token: string;
}

const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "icon", label: "Icon" },
  { key: "color", label: "Color" },
  { key: "order", label: "Order", type: "number" as const },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function ServiceManager({ token }: ServiceManagerProps) {
  return (
    <ContentManager
      title="Services"
      singular="Service"
      columns={columns}
      token={token}
      apiPath="services"
    />
  );
}
