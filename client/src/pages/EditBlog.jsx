import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`);
      fetchBlogs(); // Refresh the blog list after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
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
        {editingBlog ? (
          <div className="mb-4 p-4 border rounded bg-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-100">Editing Blog</h2>
            <input 
              type="file" 
              onChange={(e) => handleImageChange(e)} 
              className="mb-2"
            />
            {editingBlog.headings.map((heading, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={heading.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                  placeholder="Heading"
                />
                <textarea
                  value={heading.content}
                  onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                  placeholder="Content"
                  rows="3"
                />
                <input 
                  type="file" 
                  onChange={(e) => handleImageChange(e, index)} 
                  className="mb-2"
                />
              </div>
            ))}
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Changes
            </button>
            <button onClick={() => setEditingBlog(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-400">
              Cancel
            </button>
          </div>
        ) : (
          <table className="min-w-full bg-gray-800 text-gray-100  border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Heading</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{blog.headings.map(h => h.title).join(', ')}</td>
                  <td className="border px-4 py-2">
                    {/* <button onClick={() => handleEdit(blog)} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button> */}
                    <button onClick={() => handleDelete(blog._id)} className="bg-red-600 text-white px-2 py-1 rounded ml-2 hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EditBlog;