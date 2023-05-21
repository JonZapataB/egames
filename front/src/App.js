import React, { useEffect, useState } from "react";
import Axios from "axios";
import Games from "./components/games/Games";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div>
      <NavBar />
      <Games />
      <Footer />
    </div>
  );
};

export default App;
