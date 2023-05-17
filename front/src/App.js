import React, { useEffect, useState } from "react";
import Axios from "axios";
import Games from "./components/games/Games";

import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
 return (
    <div>
        <Games />
    </div>
 );
};

export default App;
