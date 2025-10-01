import { create } from "zustand";
import apiClient from "../lib/apiClient";

export const useSubscriptionStore = create((set) => ({
  subscription: null,
  subscriptionLoading: false,

  setSubscription: (data) => set({ subscription: data }),

  setSubscriptionLoading: (status) => set({ subscriptionLoading: status }),

  fetchCurrentSubscription: async () => {
    try {
      set({ subscriptionLoading: true });
      const response = await apiClient.get("/api/subscription/current", { isProtected: true });
      set({ subscription: response.data || {}, subscriptionLoading: false });
      return response;
    } catch (error) {
      set({ subscriptionLoading: false });
      throw error;
    }
  },

  clearSubscription: () => set({ subscription: null }),
}));
