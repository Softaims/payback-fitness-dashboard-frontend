import { create } from "zustand";
import apiClient from "../lib/apiClient";

export const usePFCoinsStore = create((set) => ({
  purchaseHistory: null,
  purchaseHistoryLoading: false,

  setPurchaseHistory: (data) => set({ purchaseHistory: data }),

  setPurchaseHistoryLoading: (status) => set({ purchaseHistoryLoading: status }),

  fetchPurchaseHistory: async (page = 1, limit = 10) => {
    try {
      set({ purchaseHistoryLoading: true });
      const response = await apiClient.get("/api/coin/purchase-history", {
        params: {
          page,
          limit,
        },
        isProtected: true,
      });
      set({ purchaseHistory: response, purchaseHistoryLoading: false });
      return response;
    } catch (error) {
      set({ purchaseHistoryLoading: false });
      throw error;
    }
  },

  clearPurchaseHistory: () => set({ purchaseHistory: null }),
}));
