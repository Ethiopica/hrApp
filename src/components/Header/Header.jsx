import { NavLink, Link, useNavigate } from "react-router";
import "./Header.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useState, useEffect } from "react";

const Header = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Redirect from root to about page
    if (window.location.pathname === '/') {
      navigate('/about');
    }
  }, [navigate]);

  return (
    <header>
      <div className="logo">
        <Link to="/about">
          <h2>{name}</h2>
        </Link>
      </div>
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
      <nav className={isMenuOpen ? 'active' : ''}>
        <ul>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees" className={({ isActive }) => (isActive ? "active" : "")}>
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
              Add Employees
            </NavLink>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
      {isMenuOpen && <div className="nav-overlay active" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;





