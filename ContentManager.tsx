"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "boolean" | "json" | "textarea";
}

interface ContentManagerProps {
  title: string;
  singular: string;
  columns: Column[];
  token: string;
  apiPath: string;
  renderFormFields?: (item: Record<string, unknown>, onChange: (key: string, val: unknown) => void) => React.ReactNode;
}

export default function ContentManager({
  title,
  singular,
  columns,
  token,
  apiPath,
  renderFormFields,
}: ContentManagerProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${apiPath}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // The API returns an object with the first array value
      const key = Object.keys(data).find(k => Array.isArray(data[k]));
      setItems(key ? data[key] : []);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [apiPath, token]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/${apiPath}`, {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setEditing(null);
        setIsNew(false);
        fetchItems();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${singular}?`)) return;
    try {
      const res = await fetch(`/api/admin/${apiPath}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchItems();
    } catch {
      // ignore
    }
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const handleAdd = () => {
    const newItem: Record<string, unknown> = {};
    columns.forEach((col) => {
      if (col.type === "number") newItem[col.key] = 0;
      else if (col.type === "boolean") newItem[col.key] = true;
      else newItem[col.key] = "";
    });
    setEditing(newItem);
    setIsNew(true);
  };

  const handleChange = (key: string, val: unknown) => {
    if (editing) setEditing({ ...editing, [key]: val });
  };

  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return columns.some((col) => {
      const val = String(item[col.key] ?? "").toLowerCase();
      return val.includes(q);
    });
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#16191A]">{title}</h2>
          <p className="text-sm text-[#666]">{filtered.length} items</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#C63134] hover:bg-[#CC383E] text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add {singular}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
        <Input
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-[#C63134] animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#EBEBEB] bg-[#F9F9F9]">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left text-xs font-semibold text-[#666] uppercase tracking-wider px-4 py-3"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right text-xs font-semibold text-[#666] uppercase tracking-wider px-4 py-3 w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={String(item.id)}
                    className="border-b border-[#EBEBEB] last:border-0 hover:bg-[#FAFAFA]"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-sm text-[#333]">
                        {col.type === "boolean" ? (
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: item[col.key] ? "#75B740" : "#E98F10",
                              color: "white",
                            }}
                          >
                            {item[col.key] ? "Active" : "Inactive"}
                          </Badge>
                        ) : (
                          <span className="line-clamp-2">{String(item[col.key] ?? "")}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#666] hover:text-[#0095EB] hover:bg-blue-50"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#666] hover:text-[#C63134] hover:bg-red-50"
                          onClick={() => handleDelete(String(item.id))}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center py-8 text-sm text-[#999]">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#EBEBEB]">
              <h3 className="text-lg font-bold text-[#16191A]">
                {isNew ? `Add ${singular}` : `Edit ${singular}`}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => { setEditing(null); setIsNew(false); setError(""); }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-5 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {columns.map((col) => (
                <div key={col.key}>
                  <Label className="text-sm font-medium text-[#333] mb-1.5 block">
                    {col.label}
                  </Label>
                  {col.type === "boolean" ? (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={Boolean(editing[col.key])}
                        onCheckedChange={(val) => handleChange(col.key, val)}
                      />
                      <span className="text-sm text-[#666]">
                        {editing[col.key] ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ) : col.type === "textarea" ? (
                    <Textarea
                      value={String(editing[col.key] ?? "")}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      rows={3}
                    />
                  ) : col.type === "json" ? (
                    <Textarea
                      value={typeof editing[col.key] === "string" ? String(editing[col.key]) : JSON.stringify(editing[col.key] || [], null, 2)}
                      onChange={(e) => {
                        try {
                          handleChange(col.key, JSON.parse(e.target.value));
                        } catch {
                          handleChange(col.key, e.target.value);
                        }
                      }}
                      rows={4}
                      className="font-mono text-xs"
                    />
                  ) : (
                    <Input
                      type={col.type === "number" ? "number" : "text"}
                      value={String(editing[col.key] ?? "")}
                      onChange={(e) =>
                        handleChange(col.key, col.type === "number" ? Number(e.target.value) : e.target.value)
                      }
                    />
                  )}
                </div>
              ))}

              {renderFormFields && renderFormFields(editing, handleChange)}
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-[#EBEBEB]">
              <Button
                variant="outline"
                onClick={() => { setEditing(null); setIsNew(false); setError(""); }}
                className="border-[#EBEBEB]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#C63134] hover:bg-[#CC383E] text-white"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isNew ? "Create" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
