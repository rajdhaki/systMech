import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, showReadMore }) => {
  const [imageError, setImageError] = useState(false);

  if (!blog || !blog.headings || blog.headings.length === 0) {
    return null;
  }

  const title = blog.headings[0].title || 'Untitled';
  const content = blog.headings[0].detail || 'No content available';
  
  const getImageUrl = (imgPath) => {
    if (!imgPath || imageError) return 'https://via.placeholder.com/300x200';
    
    try {
      // Clean up the path
      const cleanPath = imgPath.replace(/\\/g, '/').replace(/^uploads\/uploads\//, 'uploads/');
      
      // Construct the full URL
      const fullUrl = `${import.meta.env.VITE_BACKEND_URL}/${cleanPath}`;
      console.log('Attempting to load image:', fullUrl);
      return fullUrl;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return 'https://via.placeholder.com/300x200';
    }
  };

  const handleImageError = async (e) => {
    console.error('Image failed to load:', e.target.src);
    
    try {
      // Try to check if the image exists on the server
      const imagePath = blog.imgUrl.split('/').pop();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check-image/${imagePath}`);
      const data = await response.json();
      
      if (!data.exists) {
        console.log('Image does not exist on server:', data.path);
        setImageError(true);
      }
    } catch (error) {
      console.error('Error checking image:', error);
      setImageError(true);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden h-[65vh]">
      <div className="relative w-full h-40">
        <img 
          src={getImageUrl(blog.imgUrl)}
          alt={title} 
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Date not available'}
        </p>
        <p className="text-gray-700 line-clamp-6">{content}</p>
      </div>
      
      {showReadMore && (
        <Link to={`/blog/${blog._id}`} className='inline-block px-4 text-blue-800 hover:text-blue-600 transition-colors text-sm'>
          Read More
        </Link>
      )}
    </div>
  );
};

export default BlogCard;