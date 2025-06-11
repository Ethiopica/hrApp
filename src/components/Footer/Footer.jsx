
import "./Footer.css";

const Footer = ({ year }) => {
  return (
    <footer>
      <div className="copyright">
        <p>Copyright &copy; Elias B. Tekle {year}</p>
      </div>
    </footer>
  );
};

export default Footer;

