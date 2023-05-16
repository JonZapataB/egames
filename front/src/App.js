import React, { useEffect, useState } from "react";
import Axios from "axios";
import Games from "./components/games/Games";
import Orders from "./components/orders/Orders";

const App = () => {
  return (
    <div className="App">
      <Orders />
    </div>
  );
};

export default App;
