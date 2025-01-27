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
    <div className="bg-white shadow-lg rounded-xl overflow-hidden h-[65vh] transform transition duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative w-full h-48 overflow-hidden">
        {/* Image Container */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <img 
            src={getImageUrl(blog.imgUrl)}
            alt={title} 
            className={`
              w-full h-full
              object-cover object-center
              transform transition-transform duration-300 hover:scale-110
              filter hover:brightness-105
              ${imageError ? 'opacity-0' : 'opacity-100'}
            `}
            loading="lazy"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              setImageError(true);
              e.target.src = 'https://via.placeholder.com/800x600';
            }}
            width="800"
            height="600"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

        {/* Fallback */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Image not available</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:line-clamp-none transition-all duration-300">
          {title}
        </h2>
        
        <p className="text-sm text-gray-500">
          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Date not available'}
        </p>
        
        <p className="text-gray-700 line-clamp-4 hover:line-clamp-none transition-all duration-300">
          {content}
        </p>

        {showReadMore && (
          <Link 
            to={`/blog/${blog._id}`}
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg
              transform transition duration-300
              hover:bg-blue-700 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;