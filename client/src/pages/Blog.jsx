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
        <div id={id} className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Our Latest <span className="text-blue-600">Blogs</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay updated with our latest insights and industry trends
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 text-lg">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="transform hover:-translate-y-1 transition duration-300">
                                <BlogCard blog={blog} showReadMore={true} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Blog
