import React, { useState } from "react";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import "./Footer.scss";
const Footer = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setHideButton(true);
  };

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
                <i className="fas fa-map-marker-alt"></i> &nbsp;
                {/* esto deja un hueco a la derecha del icono */} Bilbao
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
          <div className="footer-section links">
            {showMessage && <AboutUs />}
            <br />
            {!hideButton && (
              <button onClick={handleShowMessage} className="btn btn-big">
                Sobre nosotros
              </button>
            )}
            <br />
          </div>
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
          &copy; Hyrule Shop | Designed by Hyrule Shop
        </div>
      </div>
    </footer>
  );
};

export default Footer;
