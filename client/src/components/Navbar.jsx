import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../Images/Logos/SystMechLogo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const sections = ['about', 'expertise', 'services', 'blog', 'contact'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        setActiveSection(currentSection || '');
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, children }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`block py-2 px-4 text-gray-800 text-lg md:text-2xl font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 ${
        activeSection === to ? 'text-blue-600' : ''
      }`}
    >
      {children}
    </button>
  );
  return (
    <nav className="fixed w-full z-30">
      <div className="bg-transparent backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex items-center justify-between py-4">
            <div className="flex justify-center gap-2 items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <span><img className='w-11 mt-2' src={logo} alt="" /></span>
              <span className="text-2xl md:text-4xl font-bold text-gray-800">SystMech</span>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

            <div className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row absolute md:relative left-0 md:left-auto top-full md:top-auto w-full md:w-auto bg-white bg-opacity-80 backdrop-blur-md md:bg-transparent md:backdrop-filter-none shadow-lg md:shadow-none">
                <NavItem to="about">About Us</NavItem>
                <NavItem to="services">Services</NavItem>
                <NavItem to="expertise">Expertise</NavItem>
                <NavItem to="blog">Blog</NavItem>
                <NavItem to="contact">Contact</NavItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;