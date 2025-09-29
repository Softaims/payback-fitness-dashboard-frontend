import { create } from "zustand";
import apiClient from "../lib/apiClient";

export const useSubscriptionPlansStore = create((set) => ({
  plans: null,
  plansLoading: false,

  setPlans: (data) => set({ plans: data }),

  setPlansLoading: (status) => set({ plansLoading: status }),

  fetchSubscriptionPlans: async () => {
    try {
      set({ plansLoading: true });
      const response = await apiClient.get("/api/subscription/plans", { isProtected: true });
      set({ plans: response.data || [], plansLoading: false });
      return response;
    } catch (error) {
      set({ plansLoading: false });
      throw error;
    }
  },

  clearPlans: () => set({ plans: [] }),
}));
