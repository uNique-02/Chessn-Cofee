import { create } from "zustand";
import axios from "../lib/axios";

const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,

  // Fetch all blogs
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/blogs");
      console.log("Fetched Blogs:", res.data);
      set({ blogs: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch blogs",
        loading: false,
      });
    }
  },

  //   fetchBlogById: async (id) => {
  //     set({ loading: true, error: null });
  //     try {
  //       const res = await axios.get(`/blogs/${id}`);
  //       set({ selectedBlog: res.data });
  //     } catch (err) {
  //       console.error("Fetch Blog by ID Error:", err);
  //       set({ error: "Failed to fetch blog" });
  //     } finally {
  //       set({ loading: false });
  //     }
  //   },

  createBlog: async (newBlog) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/blogs", newBlog);
      set((state) => ({ blogs: [res.data, ...state.blogs] }));
    } catch (err) {
      console.error("Create Blog Error:", err);
      set({ error: "Failed to create blog" });
    } finally {
      set({ loading: false });
    }
  },

  //   updateBlog: async (id, updatedData) => {
  //     set({ loading: true, error: null });
  //     try {
  //       const res = await axios.put(`/blogs/${id}`, updatedData);
  //       set((state) => ({
  //         blogs: state.blogs.map((blog) => (blog._id === id ? res.data : blog)),
  //       }));
  //     } catch (err) {
  //       console.error("Update Blog Error:", err);
  //       set({ error: "Failed to update blog" });
  //     } finally {
  //       set({ loading: false });
  //     }
  //   },

  //   deleteBlog: async (id) => {
  //     set({ loading: true, error: null });
  //     try {
  //       await axios.delete(`/blogs/${id}`);
  //       set((state) => ({
  //         blogs: state.blogs.filter((blog) => blog._id !== id),
  //       }));
  //     } catch (err) {
  //       console.error("Delete Blog Error:", err);
  //       set({ error: "Failed to delete blog" });
  //     } finally {
  //       set({ loading: false });
  //     }
  //   },

  //   fetchByCategory: async (category) => {
  //     set({ loading: true, error: null });
  //     try {
  //       const res = await axios.get(`/blogs/category/${category}`);
  //       set({ blogs: res.data });
  //     } catch (err) {
  //       console.error("Fetch By Category Error:", err);
  //       set({ error: "Failed to fetch blogs by category" });
  //     } finally {
  //       set({ loading: false });
  //     }
  //   },

  //   clearSelectedBlog: () => set({ selectedBlog: null }),
}));

export default useBlogStore;
