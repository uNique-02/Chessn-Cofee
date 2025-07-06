import { create } from "zustand";
import toast from "react-hot-toast";
import apiClient from "../lib/axios";

const useContact = create((set, get) => ({
  contact: null,
  loading: false,
  error: null,

  sendMessage: async (name, email, subject, message) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post("/contact/send-message", {
        name,
        email,
        subject,
        message,
      });
      set({ loading: false });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to send message",
      });
      toast.error("Failed to send message");
    }
  },
}));

export default useContact;
