import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, showReadMore }) => {
  if (!blog || !blog.headings || blog.headings.length === 0) {
    return null;
  }

  const title = blog.headings[0].title || 'Untitled';
  const content = blog.headings[0].detail || 'No content available';
  
  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/300x200';
    
    // Make sure we're using forward slashes and no duplicate 'uploads'
    const cleanPath = imgPath.replace(/\\/g, '/').replace(/^uploads\/uploads\//, 'uploads/');
    return `${import.meta.env.VITE_BACKEND_URL}/${cleanPath}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden h-[65vh]">
      <img 
        src={getImageUrl(blog.imgUrl)}
        alt={title} 
        className="w-full h-40 object-cover"
        onError={(e) => {
          console.error('Image failed to load:', e.target.src);
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x200';
        }}
      />
      <div className="p-3">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Date not available'}
        </p>
        <p className="text-gray-700 line-clamp-6">{content}</p>
      </div>
      
      {showReadMore && (
        <Link to={`/blog/${blog._id}`} className='inline-block px-4  text-blue-800  hover:text-blue-600 transition-colors text-sm '>
          Read More
        </Link>
      )}
    </div>
  );
};

export default BlogCard;