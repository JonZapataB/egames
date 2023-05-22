import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "./Profile.scss";
import Shipping from "../shipping/Shipping";
import "../shipping/Shipping.scss";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(
        "http://localhost:3011/api/users/id",

        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LOS DATOS DE PERFIOL: ", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  const createUserInfo = async (e) => {
    e.preventDefault();
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.post(
        "http://localhost:3011/api/users/info",
        {
          name: e.target.name.value,
          lastname: e.target.lastname.value,
          address: e.target.address.value,
          phoneNumber: e.target.phoneNumber.value,
        },
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LOS DATOS DE PERFIl CREADO: ", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.put(
        "http://localhost:3011/api/users/edit",
        {
          name: e.target.name.value,
          lastname: e.target.lastname.value,
          address: e.target.address.value,
          phoneNumber: e.target.phoneNumber.value,
        },
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LOS DATOS DE PERFIl EDITADO: ", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="tuPerfil">Tu perfil</h1>
      {data.userInfo && (
        <div>
          <Shipping step1 step2></Shipping>
          <div className="profile-container">
            <h2>
              Nombre: <span>{data.userInfo.name}</span>
            </h2>
            <h2>
              Apellido: <span>{data.userInfo.lastname}</span>
            </h2>
            <h2>
              Email: <span>{data.email}</span>
            </h2>
            <h2>
              Dirección: <span>{data.userInfo.address}</span>
            </h2>
            <h2>
              Teléfono: <span>{data.userInfo.phoneNumber}</span>
            </h2>
          </div>
        </div>
      )}
      <br />
      {!data.userInfo && (
        <div className="login-container">
          <h1>Crea tu información de usuario</h1>
          <form action="" onSubmit={createUserInfo} className="form">
            <label htmlFor="name">Nombre </label>
            <input type="text" name="name" id="name" required />
            <label htmlFor="lastname">Apellido </label>
            <input type="text" name="lastname" id="lastname" required />
            <label htmlFor="address">Dirección </label>
            <input type="text" name="address" id="address" required />
            <label htmlFor="phoneNumber">Teléfono </label>
            <input type="tel" name="phoneNumber" id="phoneNumber" required />
            <button type="submit">Guardar</button>
          </form>
        </div>
      )}
      <br />
      {data.userInfo && (
        <div className="login-container">
          <h1>¿Quieres cambiar tu perfil?</h1>
          <form action="" onSubmit={updateUserInfo} className="form">
            <label htmlFor="name">Nombre </label>
            <input type="text" name="name" id="name" />
            <label htmlFor="lastname">Apellido </label>
            <input type="text" name="lastname" id="lastname" />
            <label htmlFor="address">Dirección </label>
            <input type="text" name="address" id="address" />
            <label htmlFor="phoneNumber">Teléfono </label>
            <input type="tel" name="phoneNumber" id="phoneNumber" />
            <button type="submit">Editar</button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
