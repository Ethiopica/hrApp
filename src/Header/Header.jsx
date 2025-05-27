
import { NavLink, Link } from "react-router";
import "./Header.css";
const Header = ({ name }) => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <h2>{name}</h2>
        </Link>
      </div>
      <nav>
        <ul>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/add">Add new Employees</NavLink>
          <NavLink to="/todos">Todos</NavLink>
          <NavLink to="/fetchexample">Fetch with Axios</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;




