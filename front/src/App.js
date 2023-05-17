import React, { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await Axios.get("http://localhost:3011/");
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Cargando</div>;
};

export default App;
