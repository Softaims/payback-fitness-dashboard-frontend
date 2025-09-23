import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  userLoading: false,

  setUser: (userData) => set({ user: userData, userLoading: false }),
  setUserLoading: (isLoading) => set({ userLoading: isLoading }),
  clearUser: () => set({ user: null, userLoading: false }),
}));
