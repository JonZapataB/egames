import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";
import Button from "react-bootstrap/Button";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h1 className="logo-text">
              <span></span>Hyrule Shop
            </h1>
            <div className="contact">
              <span>
                <i className="fas fa-map-marker-alt"></i> &nbsp; Bilbao
                <br />
                <i className="fas fa-phone"></i> &nbsp; +34 666 666 666
              </span>
              <br />
              <span>
                <i className="fas fa-envelope"></i> &nbsp;
                <Link
                  to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  about="blank"
                >
                  Contacto
                </Link>
              </span>
            </div>
            <div className="socials">
              <Link
                to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                /* rel="noopener noreferrer" */ // esto es para que no se pueda acceder a la pagina desde la que se ha abierto el enlace
              >
                <i className="fab fa-facebook"></i>
              </Link>
              <Link
                to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                /* rel="noopener noreferrer" */
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                /* rel="noopener noreferrer" */
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                /* rel="noopener noreferrer" */
              >
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>
          <Button
            variant="link"
            className="btn btn-link"
            onClick={() => {
              navigate("/aboutus");
            }}
          >
            Sobre Nosotros
          </Button>

          <div className="footer-section contact-form">
            <h2>Contactanos</h2>
            <br />
            <form action="index.html" method="post">
              <input
                type="email"
                name="email"
                className="text-input contact-input"
                placeholder="Tu email"
              />
              <textarea
                rows="4"
                name="message"
                className="text-input contact-input"
                placeholder="Tu mensaje"
              ></textarea>
              <button type="submit" className="btn btn-big contact-btn">
                <i className="fas fa-envelope"></i>
                Enviar
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; Hyrule &nbsp;
          {/* &copy añade el simbolo de copyright y &nbsp crea un espacio a la derecha */}
          <img
            className="Triforce"
            src="https://img.icons8.com/?size=512&id=19602&format=png"
          ></img>
          &nbsp; Shop | Designed by Hyrule Shop
        </div>
      </div>
    </footer>
  );
};

export default Footer;
