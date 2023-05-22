<h1 align="center"> Hyrule Shop 🎮 </h1>

<h3>Hyrule Shop es una tienda de videojueos donde puedes realizar compras de juegos fisicos para distintas plataformas.</h3>
<h3>Esta creada por 3 alumnos de bootcamp fullstack amantes de los videojuegos, donde hemos puesto a prueba nuestras habilidades tanto en el desarrolo backend usando MySQL como base de datos y en el fronted con react.js</h3>

![Pagina inical](/paginainicio.png)

<h2>Herramientas Utilizadas 🛠</h2>

<h3>BackEnd 💾</h3>
<p>Para la base de datos hemos utilizado MySQL Workbench, donde guardamos todos los datos relacionados con los videojuegos, stock,orders,users...
<p>Visualizamos los datos optenidos a traves de una api que generamos utilizandos routes que funcionan gracias a los controllers previamente creados.

<h3>FrontEnd 🖥</h3>
<p>Una vez optenidos todos los datos que tenemos en la api utilizamos Axios para poder mostrarlos a traves de React.js donde cada apartado tiene su componente que nos ayuda a elegir que datos mostrar en el router. </p>
<p>Para enmaquetar los datos hemos utilizado el lenguaje SASS y distintas carpetas de react como react-bootstrap, react-icons o react-dom entre otros</p>

<h2>Funcionalidades 🔍</h2>

<p>La tienda te permite elegir la plataforma en la que quieres buscar el videojuego y tambien filtrar por precio,fecha...</p>
<p>Poder añadir un producto al carrito donde si no estas logeado no te deja acceder a tus pedidos.</p>
<p>Tambien tienes un apartado de tu perfil donde puedes añadir y modificar tus datos personales.</p>

<h2>Estado del proyecto 🪫</h2>

<h3>🚧 Proyecto en construccion 🚧 </h3>

<p>El proyecto ha sido realizado en 2 semanas y no se encuentra acabado ya que hay apartados que no hemos conseguido llevar a cabo por tiempo como la pasarela de pago, algunos errores puntuales o hacer la pagina 100% responsive bonita. 
<p>Si te ves con ganas, tiempo y habilidades para acabar nuestro proyecto te animamos a hacerlo. 😉

<h2>Iniciar el Proyecto ✅</h2>

<p>Antes de poder iniciar el proyecto en nuestra terminal tenemos que descargarlo. Te recomendamos utilizar SSH para hacerlo.
<p>Una vez descargado y con la terminal abierta en la carpeta del proyecto ejecutamos un docker compose up --build.</p>
<p>Te diriges a tu buscador de confianza y escribimos localhost:3000 en el buscador (asegurate de no tener ningun otro trabajo abierto en dicho host)

<h3>Registro con Google</h3>
<p>El primer paso es <strong>Obtener credenciales de API de Google.</strong></p> 
<p>El segundo paso es <strong>Configurar el entorno de desarrollo en el servidor desde backend.</strong></p>
<p><strong>Configurar el flujo de autenticación en el lado del servidor</strong> Cuando un usuario inicie sesión con Google, se generará un token de autenticación en el cliente.
En el servidor, debes recibir y verificar el token de autenticación para asegurarte de que sea válido.</p>
<p><strong>Implementar el flujo de inicio de sesión con Google: </strong>Puedes obtener información como el nombre, el apellido, el correo electrónico, la foto de perfil, etc</p>
<p>Tendríamos que crear también un archvo .env que tenga estos datos: 
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
TOKEN_SECRET=
</p>
