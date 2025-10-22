import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const BlogLibrary = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/blogs`);
      const data = response.data;
      // Mock data if empty
      if (data.length === 0) {
        setBlogs([
          {
            _id: "1",
            title: "Sample Blog 1",
            date: new Date("2025-09-01"),
            imgUrl: "",
            author: "Admin",
          },
          {
            _id: "2",
            title: "Sample Blog 2",
            date: new Date("2025-09-02"),
            imgUrl: "",
            author: "Admin",
          },
          {
            _id: "3",
            title: "Sample Blog 3",
            date: new Date("2025-09-03"),
            imgUrl: "",
            author: "Admin",
          },
        ]);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Fallback to mock data
      setBlogs([
        {
          _id: "1",
          title: "Sample Blog 1",
          date: new Date("2025-09-01"),
          imgUrl: "",
          author: "Admin",
        },
        {
          _id: "2",
          title: "Sample Blog 2",
          date: new Date("2025-09-02"),
          imgUrl: "",
          author: "Admin",
        },
        {
          _id: "3",
          title: "Sample Blog 3",
          date: new Date("2025-09-03"),
          imgUrl: "",
          author: "Admin",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${DATABASE_URL}/admin/blogs/${id}`);
        fetchBlogs(); // Refetch after delete
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/blog-form/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin/blog-form");
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-[#381207] font-['Poppins'] text-5xl font-medium leading-[136%]">
          Blog Library
        </div>
        <div className="text-[#381207] font-['Poppins'] text-lg leading-[136%] mt-2">
          View, edit, and manage all blogs.
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-8">
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2.5 py-2 px-5 rounded-lg bg-[#a6a643] text-white font-['Poppins'] font-medium leading-[136%] hover:bg-[#8f9b3a] transition-colors"
        >
          Create a blog
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            >
              {/* Blog Banner */}
              <div className="relative">
                <div
                  className="w-full h-48 bg-cover bg-center bg-no-repeat flex justify-center items-center"
                  style={{
                    backgroundImage: `url(${
                      blog.imgUrl || "/path/to/default/image.jpg"
                    })`,
                  }}
                >
                  {!blog.imgUrl && (
                    <div className="text-[#381207] text-lg">No Image</div>
                  )}
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="px-3 py-1 bg-[#dd9219] text-white text-xs rounded hover:bg-[#c47a15] transition-colors"
                    title="Edit blog"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    title="Delete blog"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#381207] mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[#381207] text-sm mb-3 opacity-75">
                  By {blog.author || "Unknown"}
                </p>
                <p className="text-[#4b4741] font-['Poppins'] text-sm">
                  {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-[#381207] font-['Poppins'] text-lg">
              No blogs found.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-[#f8f5f0] text-[#381207] rounded hover:bg-[#e6d9cd] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? "bg-[#381207] text-[#ede4dc]"
                  : "bg-[#f8f5f0] text-[#381207] hover:bg-[#e6d9cd]"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-[#f8f5f0] text-[#381207] rounded hover:bg-[#e6d9cd] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogLibrary;
