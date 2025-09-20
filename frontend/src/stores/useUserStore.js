import { create } from "zustand";
import axios from "../lib/axios";

import { toast } from "react-hot-toast";

export const userUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "an error happened try later again"
      );
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res.data);
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "an error happened try later again"
      );
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("user logout successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ checkingAuth: false, user: response.data });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
}));
