import { create } from "zustand";
import axios from "../lib/axios"; // Adjust based on your project structure

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  // Fetch all projects
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/projects");
      set({ projects: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch projects",
        loading: false,
      });
    }
  },

  // Fetch by category
  fetchProjectsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/projects/category/${category}`);
      set({ projects: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch by category",
        loading: false,
      });
    }
  },

  // Create new project
  createProject: async (formData) => {
    set({ loading: true, error: null });
    try {
      console.log(formData);
      const res = await axios.post("/projects", formData);
      set((state) => ({
        projects: [...state.projects, res.data],
        loading: false,
      }));
      console.log(res);
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to create project",
        loading: false,
      });
    }
  },

  // Delete a project
  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/projects/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete project",
        loading: false,
      });
    }
  },

  // Update a project
  updateProject: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/projects/${id}`, updatedData);
      set((state) => ({
        projects: state.projects.map((p) => (p._id === id ? res.data : p)),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update project",
        loading: false,
      });
    }
  },
}));

export default useProjectStore;
