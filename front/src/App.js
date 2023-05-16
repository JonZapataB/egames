import React, { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await Axios.get("http://localhost:3011/api/users");
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.length > 0) return <div>{data[0].email}</div>;
  else return <div>Cargando</div>;
};

export default App;
