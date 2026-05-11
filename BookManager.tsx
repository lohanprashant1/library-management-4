"use client";

import ContentManager from "./ContentManager";

interface BookManagerProps {
  token: string;
}

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "genre", label: "Genre" },
  { key: "year", label: "Year", type: "number" as const },
  { key: "isbn", label: "ISBN" },
  { key: "available", label: "Available", type: "boolean" as const },
  { key: "copies", label: "Copies", type: "number" as const },
  { key: "featured", label: "Featured", type: "boolean" as const },
];

export default function BookManager({ token }: BookManagerProps) {
  return (
    <ContentManager
      title="Books"
      singular="Book"
      columns={columns}
      token={token}
      apiPath="books"
    />
  );
}
