import React, { useEffect, useState } from "react";
import Axios from "axios";
import Games from "./components/games/Games";
import Orders from "./components/orders/Orders";
import NavBar from "./components/navBar/NavBar";

import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
 return (
    <div>
      <NavBar />
      <Games />
      <Orders />
    </div>
 );
};

export default App;

