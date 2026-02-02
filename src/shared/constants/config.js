/**
 * Shared configuration constants
 */

export const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const PERMISSIONS = {
  // User Management
  USERS_VIEW: "users.view",
  USERS_CREATE: "users.create",
  USERS_EDIT: "users.edit",
  USERS_DELETE: "users.delete",

  // Subscription Management
  SUBSCRIPTIONS_VIEW: "subscriptions.view",
  SUBSCRIPTIONS_EDIT: "subscriptions.edit",
  SUBSCRIPTIONS_REFUND: "subscriptions.refund",

  // PF Points Management
  POINTS_VIEW: "points.view",
  POINTS_ADJUST: "points.adjust",
  POINTS_HISTORY: "points.history",

  // Analytics
  ANALYTICS_VIEW: "analytics.view",
  ANALYTICS_EXPORT: "analytics.export",

  // Settings
  SETTINGS_VIEW: "settings.view",
  SETTINGS_EDIT: "settings.edit",
};

export const TOKEN_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  ADMIN_ACCESS_TOKEN: "admin_access_token",
  ADMIN_REFRESH_TOKEN: "admin_refresh_token",
};

export const ROUTES = {
  USER: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    DASHBOARD: "/dashboard",
    FORGOT_PASSWORD: "/forgot-password",
  },
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    SUBSCRIPTIONS: "/admin/subscriptions",
    ANALYTICS: "/admin/analytics",
  },
};
