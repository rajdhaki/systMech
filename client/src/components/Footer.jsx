import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/Logos/SystMechLogo.png'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-3 px-4 md:px-8 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SystMech Logo" className="w-10 h-10 mr-2" />
          <span className="text-2xl font-bold text-gray-800">SystMech</span>
        </Link>

        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="flex space-x-4 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-sm text-gray-600">© 2023 SystMech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
