import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import Slider from "react-slick"; // Import Slider
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import { Link } from 'react-router-dom'; // Import Link component

const Blog = ({ id }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post`);
                setBlogs(response.data.slice(0, 3)); // Get only the first 3 blogs
                setLoading(false);
            } catch (err) {
                setError('Error fetching blogs. Please try again later.');
                setLoading(false);
            }
        };
console.log(Blog);

        fetchBlogs();
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };



    return (
        
        <div id={id} className='bg-white w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center'>
            <div className='w-full max-w-6xl px-4 sm:px-8 text-center md:mt-16'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 '>Blogs</h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <Slider {...settings} className="blog-slider py-6">
                        
                        {                     
                            // Fixing the condition to check if blogs is empty
                            blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <div key={blog._id} className="px-2"> {/* Add padding for spacing */}
                                        <BlogCard blog={blog} showReadMore={true} />
                                    </div>
                                ))
                            ) : (
                                <div>No blogs available.</div> 
                            )
                            
                        }
                    
                    </Slider>
                )}
            </div>
            <Link to="/blogs">
                <button className="mt-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    All Blogs
                </button>
            </Link>
        </div>
    )
}

export default Blog
