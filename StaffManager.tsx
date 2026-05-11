"use client";

import ContentManager from "./ContentManager";

interface StaffManagerProps {
  token: string;
}

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "active", label: "Active", type: "boolean" as const },
];

export default function StaffManager({ token }: StaffManagerProps) {
  return (
    <ContentManager
      title="Staff Members"
      singular="Staff Member"
      columns={columns}
      token={token}
      apiPath="staff"
    />
  );
}
