import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post`);
      // Sort blogs by creation date (newest first)
      const sortedBlogs = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sortedBlogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`);
        // Update the blogs state after successful deletion
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  // const handleEdit = (blog) => {
  //   setEditingBlog({ ...blog, newMainImage: null, newAdditionalImages: [] });
  // };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('headings', JSON.stringify(editingBlog.headings));
      
      if (editingBlog.newMainImage) {
        formData.append('img', editingBlog.newMainImage);
      }
      
      editingBlog.newAdditionalImages.forEach((img, index) => {
        if (img) {
          formData.append(`additionalImg${index}`, img);
        }
      });

      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/post/${editingBlog._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchBlogs(); // Refresh the blog list after update
      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedHeadings = [...editingBlog.headings];
    updatedHeadings[index] = { ...updatedHeadings[index], [field]: value };
    setEditingBlog({ ...editingBlog, headings: updatedHeadings });
  };

  const handleImageChange = (event, index = -1) => {
    const file = event.target.files[0];
    if (index === -1) {
      setEditingBlog({ ...editingBlog, newMainImage: file });
    } else {
      const newAdditionalImages = [...editingBlog.newAdditionalImages];
      newAdditionalImages[index] = file;
      setEditingBlog({ ...editingBlog, newAdditionalImages });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-2xl w-full mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-100">All Blogs</h1>
        
        {loading ? (
          <div className="text-center text-gray-100">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-gray-800 text-gray-100 border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Heading</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {blog.headings?.map(h => h.title).join(', ') || 'No title'}
                    </td>
                    <td className="border px-4 py-2">
                      {/* <button onClick={() => handleEdit(blog)} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                        Edit
                      </button> */}
                      <button 
                        onClick={() => handleDelete(blog._id)} 
                        className="bg-red-600 text-white px-2 py-1 rounded ml-2 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-2 text-center">
                    No blogs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EditBlog;