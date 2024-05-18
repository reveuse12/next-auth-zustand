import { create } from "zustand";

export const AuthStore = create((set) => ({
  user: {},
  token: "",
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: "" }),
  refreshToken: "",
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  clearRefreshToken: () => set({ refreshToken: "" }),
}));
