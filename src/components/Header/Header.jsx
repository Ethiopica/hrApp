import { NavLink, Link } from "react-router";
import "./Header.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useState } from "react";

const Header = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <h2>{name}</h2>
        </Link>
      </div>
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
      <nav>
        <ul className={isMenuOpen ? 'active' : ''}>
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





