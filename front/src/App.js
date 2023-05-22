import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Games from "./components/games/Games";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const refTo = useRef(null);

  return (
    <div>
      <span ref={refTo} id="top"></span>
      <NavBar />
      <Games refTo={refTo} />

      <Footer />
    </div>
  );
};

export default App;
