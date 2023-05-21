import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "./Profile.scss";
import Shipping from "../shipping/Shipping";
import "../shipping/Shipping.scss";

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
      <h1>Tu perfil</h1>
      {data.userInfo && (
        <div>
          <Shipping step1 step2></Shipping>
          <h2>Nombre: {data.userInfo.name}</h2>
          <h2>Apellido: {data.userInfo.lastname}</h2>
          <h2>Email: {data.email}</h2>
          <h2>Dirección: {data.userInfo.address}</h2>
          <h2>Teléfono: {data.userInfo.phoneNumber}</h2>
        </div>
      )}
      <br />
      {!data.userInfo && (
        <form action="" onSubmit={createUserInfo}>
          <label htmlFor="name">Nombre </label>
          <input type="text" name="name" id="name" />
          <label htmlFor="lastname">Apellido </label>
          <input type="text" name="lastname" id="lastname" />
          <label htmlFor="address">Dirección </label>
          <input type="text" name="address" id="address" />
          <label htmlFor="phoneNumber">Teléfono </label>
          <input type="tel" name="phoneNumber" id="phoneNumber" />
          <input type="submit" value="Guardar" />
        </form>
      )}
      <br />
      {data.userInfo && (
        <div>
          {data.userInfo && (
            <div>
              <h2>Nombre: {data.userInfo.name}</h2>
              <h2>Apellido: {data.userInfo.lastname}</h2>
              <h2>Email: {data.email}</h2>
              <h2>Dirección: {data.userInfo.address}</h2>
              <h2>Teléfono: {data.userInfo.phoneNumber}</h2>
            </div>
          )}
          <p>¿Quieres cambiar tu perfil?</p>
          <form action="" onSubmit={updateUserInfo}>
            <label htmlFor="name">Nombre </label>
            <input type="text" name="name" id="name" />
            <label htmlFor="lastname">Apellido </label>
            <input type="text" name="lastname" id="lastname" />
            <label htmlFor="address">Dirección </label>
            <input type="text" name="address" id="address" />
            <label htmlFor="phoneNumber">Teléfono </label>
            <input type="tel" name="phoneNumber" id="phoneNumber" />
            <input type="submit" value="Editar" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
