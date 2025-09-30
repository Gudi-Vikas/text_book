import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo, profileIcon } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({showLogin,setShowLogin}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const location = useLocation();
  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path) => {
    if (path === '/') {
      return activePath === path ? 'active' : '';
    }
    return activePath.startsWith(path) ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link>
          <Link to="/exams" className={`nav-item ${isActive('/exams')}`}>Exams</Link>
          <Link to="/test-series" className={`nav-item ${isActive('/test-series')}`}>Test Series</Link>
          <Link to="/about" className={`nav-item ${isActive('/about')}`}>About Us</Link>
          <Link to="/news" className={`nav-item ${isActive('/news')}`}>What's New</Link>
          <div className="nav-buttons">
          
            <button className='btn-singup' onClick={()=>setShowLogin(true)}>Sign In</button>
            <Link to="/profile" className="nav-item profile-icon">
              <span><img  src={profileIcon} alt="" /></span>
            </Link>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
