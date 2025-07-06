import React, { useEffect } from "react";
import useBlogStore from "../stores/useBlogStore.js";

export default function Blog() {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className="p-10 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold mb-2 text-center">My Blog</h3>
      <p className="text-gray-400 text-center mb-10">
        Thoughts, insights, and technical deep-dives on my development journey.
      </p>
      <div className="grid md:grid-cols-4 gap-4">
        {blogs &&
          blogs.map((post, index) => (
            <div
              key={post._id || index}
              className="bg-gray-800 p-4 rounded md:min-h-[200px]"
            >
              <h4 className="font-semibold text-white text-md mb-1">
                {post.title}
              </h4>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          ))}
      </div>
      {!blogs || blogs.length !== 0 ? (
        <div className="text-center mt-6">
          <button className="px-4 py-2 border border-blue-400 rounded hover:bg-blue-700">
            View All Posts
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">
          No blog posts available at the moment.
        </p>
      )}
    </section>
  );
}
