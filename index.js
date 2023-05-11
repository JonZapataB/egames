import express from "express"; //IMportamos express
import router from "./routes/router.js";

const app = express(); //Creamos una pp de express

app.use(express.json()); //Indicamos que vamos a usar json
app.use(express.urlencoded({ extended: true })); //Indicamos que vamos a usar urlencoded

app.get("/", (req, res) => {
  res.send("PAGINA INICIO TIENDA DE VIDEOJUEGOS FISICOS");
});

app.use("/api", router);




app.listen(3000, () => {
  //INDICAMOS que el servidor escuche en el puerto 3000
  console.log("Server is running in port 3000");
});
