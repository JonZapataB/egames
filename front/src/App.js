import React, { useEffect, useState } from "react";
import Axios from "axios";
import Orders from "./components/orders/Orders";
import NavBar from "./components/navBar/NavBar";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Orders />
    </div>
  );
};

export default App;

