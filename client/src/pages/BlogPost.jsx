import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching blog post. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!blog || !blog.headings || blog.headings.length === 0) {
    return <div className="flex justify-center items-center h-screen">Blog post not found</div>;
  }

  const handlePrevious = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post`); // Fetch all posts
      const posts = response.data;
      const currentIndex = posts.findIndex(post => post.id === parseInt(id));
      if (currentIndex > 0) {
        navigate(`/post/${posts[currentIndex - 1].id}`); // Navigate to previous post
      } else {
        console.warn("No previous post available.");
      }
    } catch (err) {
      console.error('Error fetching posts for navigation', err);
    }
  };

  const handleNext = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post`); // Fetch all posts
      const posts = response.data;
      console.log(posts);
      const currentIndex = posts.findIndex(post => post.id === parseInt(id));
      console.log(currentIndex);
      if (currentIndex < posts.length - 1) {
        navigate(`/post/${posts[currentIndex + 1].id}`); // Navigate to next post
      } else {
        console.warn("No next post available.");
      }
    } catch (err) {
      console.error('Error fetching posts for navigation', err);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-3xl mx-auto">
        {blog.headings.map((heading, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{heading.title}</h2>
            {index === 0 ? (
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${blog.imgUrl}`} alt={heading.title} className="w-full h-full object-cover rounded-lg mb-6" />
            ) : blog.additionalImages && blog.additionalImages[index - 1] ? (
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${blog.additionalImages[index - 1]}`} alt={heading.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            ) : null}
            <p className="text-gray-600 mb-4">
              {index === 0 ? `Published on: ${new Date(blog.createdAt).toLocaleDateString()}` : ''}
            </p>
            <div className="prose max-w-none">
              <p>{heading.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* next and previous button */}
      {/* <div className="flex justify-between mt-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handlePrevious}>
          Previous Blog
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleNext}>
          Next Blog
        </button>
      </div> */}
      <div className="flex justify-center mt-8">
        <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
