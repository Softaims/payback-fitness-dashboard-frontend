import { create } from "zustand";
import { USER_ROLES } from "../../shared/constants/config";

/**
 * Admin Authentication Store
 * Simple role-based state management
 */
export const useAdminAuthStore = create((set, get) => ({
  admin: null,

  setAdmin: (adminData) => set({ admin: adminData }),

  clearAdmin: () => set({ admin: null }),

  isAdmin: () => {
    const { admin } = get();
    return admin?.role === USER_ROLES.ADMIN;
  },
}));
