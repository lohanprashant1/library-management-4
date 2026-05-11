export type PageKey =
  | "home"
  | "catalog"
  | "digital"
  | "services"
  | "events"
  | "account"
  | "research"
  | "rooms"
  | "about"
  | "contact"
  | "kids"
  | "news"
  | "membership"
  | "faq";

export interface NavItem {
  key: PageKey;
  label: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home" },
  { key: "catalog", label: "Catalog Search" },
  { key: "digital", label: "Digital Resources" },
  { key: "services", label: "Services" },
  { key: "events", label: "Events" },
  { key: "research", label: "Research" },
  { key: "rooms", label: "Rooms & Spaces" },
  { key: "news", label: "News" },
  { key: "about", label: "About Us" },
  { key: "contact", label: "Contact" },
  { key: "membership", label: "Membership" },
  { key: "faq", label: "FAQ/Help" },
  { key: "kids", label: "Kids & Teens" },
  { key: "account", label: "My Account" },
];
