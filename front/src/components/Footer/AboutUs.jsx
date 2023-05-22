import React from "react";
import "./AboutUs.scss";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <section>
        <h2>Sobre nosotros</h2>
        <p>
          Somos un equipo de tres estudiantes apasionados por los videojuegos y
          el desarrollo web.
        </p>
        <p>
          Decidimos unir nuestras habilidades y conocimientos en un proyecto de
          ecommerce de videojuegos para brindar una experiencia única a los
          jugadores.
        </p>
        <p>
          Nuestro objetivo es ofrecer una selección amplia y diversa de juegos,
          proporcionando a nuestros clientes la oportunidad de descubrir nuevos
          títulos y disfrutar de sus favoritos.
        </p>
        <p>
          En nuestra tienda, encontrarás los últimos lanzamientos, clásicos
          atemporales y ofertas especiales para todas las plataformas de juegos
          populares.
        </p>
        <p>
          ¡Nos encanta el mundo de los videojuegos y queremos compartir esa
          pasión contigo!
        </p>
        <h2>Equipo</h2>
        <div className="profile">
          <a
            href="https://www.linkedin.com/in/ander-garcia-developer/"
            about="_blank"
          >
            <img
              src="https://ca.slack-edge.com/T04E5G097KJ-U04NQBE2W6Q-7e23b6b8abf4-512"
              alt="Nombre del perfil"
            />
          </a>
          <h3>Ander Garcia</h3>
          <p>
            Conocido por sus habilidades prodigiosas con el teclado, Juan es
            capaz de escribir líneas de código más rápido que una bala de plasma
            en un videojuego de ciencia ficción. Su destreza en el desarrollo
            web fullstack es tan asombrosa que parece tener un poder mágico para
            hacer que las páginas web cobren vida. ¡Cuidado con él cuando entra
            en modo programador, puede programar en cualquier lenguaje mientras
            duerme!
          </p>
        </div>
        <div className="profile">
          <a
            href="https://www.linkedin.com/in/jon-zapata-bl%C3%A1zquez/"
            about="_blank"
          >
            <img
              src="https://media.licdn.com/dms/image/D4E03AQFfOxJybw07iw/profile-displayphoto-shrink_800_800/0/1679474474544?e=1690416000&v=beta&t=zWx75S0nUBtbwfpvpwIV7F4yClaU8S4jpdi-1MBVkBY"
              alt="Nombre del perfil"
            />
          </a>
          <h3>Jon Zapata</h3>&nbsp;
          <p>
            Jon es nuestro maestro de los píxeles, el mago que convierte una
            simple combinación de colores en increíbles mundos de 8 bits. Con su
            varita mágica de código, puede conjurar personajes llenos de
            personalidad y paisajes que te harán sentir como si estuvieras
            jugando en una consola retro. Cuando no está codeando, lo
            encontrarás usando una camiseta de Mario Bros y tarareando la música
            de los clásicos juegos de NES.
          </p>
        </div>
        <div className="profile">
          <a
            href="https://www.linkedin.com/in/jes%C3%BAs-cabado-edesa-developer"
            about="_blank"
          >
            <img
              src="https://ca.slack-edge.com/T04E5G097KJ-U04NZ89SMJM-7dc99ad3abfa-512"
              alt="Nombre del perfil"
            />
          </a>
          <h3>Jesús Cabado</h3>&nbsp;
          <p>
            es un auténtico mago cuando se trata de implementar funcionalidades
            en los videojuegos. Sus poderes de resolución de problemas son
            inigualables, y puede convertir incluso las ideas más descabelladas
            en características de juego reales. No importa si se trata de un
            sistema de combate complicado o de una física imposible, Jesús
            siempre encuentra la manera de hacerlo realidad. ¡Dicen que sus
            manos emiten un aura misteriosa que atrae a los bugs para
            desaparecerlos con un simple chasquido!
          </p>
        </div>
        {/* <div className="profile">
        <a
          href="https://www.linkedin.com/in/jes%C3%BAs-cabado-edesa-developer"
          about="_blank"
        >
          <img
            src="https://ca.slack-edge.com/T04E5G097KJ-U04HSQH7ALF-dd7a1a662f2c-512"
            alt="Nombre del perfil"
          />
        </a>
        <h3>Danel Lafuente</h3>
        <p>Danel es nuestro ninja del código, un maestro en el arte del desarrollo web fullstack. Con su velocidad y agilidad, es capaz de escribir líneas de código más rápido que un rayo. Siempre está un paso adelante, creando funciones complejas con una sola mano mientras se toma un sorbo de su café energético. Cuando no está luchando contra las demandas del proyecto, se relaja practicando artes marciales y jugando a juegos de lucha.</p>
      </div> */}
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
