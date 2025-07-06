import { create } from "zustand";
import toast from "react-hot-toast";
import apiClient from "../lib/axios";
import { persist } from "zustand/middleware";

const useSubscriber = create((set, get) => ({
  subscribers: [],
  loading: false,
  error: null,

  setSubscribers: (subscribers) => set({ subscribers }),

  addSubscriber: async (email) => {
    set({ loading: true, error: null });
    try {
      console.log("Email address:", email);
      const response = await apiClient.post("/subscriber", { email });
      console.log("Subscriber added:", response.data);
      //   get().setSubscribers(response.data);
      set({ loading: false });
      toast.success("Subscriber added successfully!");
    } catch (error) {
      console.error("Error adding subscriber:", error);
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to add subscriber",
      });
      toast.error("Failed to add subscriber");
    }
  },
}));

export default useSubscriber;
