import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSharedContext } from "../Context";

const BlogTitles = () => {
  const [blogTitles, setBlogTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setTotalBlogs } = useSharedContext();

  useEffect(() => {
    async function fetchBlogTitles() {
      try {
        const response = await axios.get(
          "http://malig.kodevana.com:8002/admin/blog-all"
        );
        setBlogTitles(response.data);
        const totalBlogs = response.data.length;
        setTotalBlogs(totalBlogs);
      } catch (error) {
        console.error("Error fetching blog titles:", error);
      }
    }

    fetchBlogTitles();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://malig.kodevana.com:8002/admin/delete-blog/${_id}`);
      if (blogTitles.length > 0) {
        setBlogTitles((prevBlogTitles) =>
          prevBlogTitles.filter((title) => title._id !== _id)
        );
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mb-10">
      <div className="p-4 border border-gray-300 rounded shadow w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Blog Titles</h1>
        <p className="mb-2">Total number of Blogs: {blogTitles.length}</p>
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full mb-4 px-3 py-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-1 py-3">#</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="block max-h-[600px] w-[170%] overflow-y-scroll">
              {blogTitles && blogTitles.length > 0 ? (
                blogTitles
                  .filter((title) =>
                    title.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((title, index) => (
                    <tr
                      key={title._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-[120%] py-4">
                        <span className="text-blue-500 font-medium">
                          {title.title}
                        </span>
                      </td>
                      <td className="px-[150%] py-4 text-center">
                        <button
                          className="bg-red-500 hover-bg-red-600 text-white px-3 py-1 rounded-md transition duration-300"
                          onClick={() => handleDelete(title._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3">No matching blog posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
