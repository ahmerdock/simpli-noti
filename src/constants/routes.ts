import type { Href } from "expo-router";

export const ROUTE_NAMES = {
  TABS: "(tabs)",
  HOME: "index",
  HELP_ME: "help-me",
  SETTINGS: "settings",
  UPSERT_NOTIFICATIONS: "upsert-notifications",
} as const satisfies Record<string, string>;

export const ROUTES = {
  UPSERT_NOTIFICATIONS: "/upsert-notifications",
} as const satisfies Record<string, Href>;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const PAGE_TITLES = {
  HOME: "Home",
  HELP_ME: "Help Me",
  SETTINGS: "Settings",
  ADD_NOTIFICATION: "Add notification",
  EDIT_NOTIFICATION: "Edit notification",
};
