import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Login.scss";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getData = async (email, password) => {
    try {
      const response = await Axios.post(
        "http://localhost:3011/api/auth/login",
        {
          email,
          password,
        }
      );
      goTo("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    getData(email, password);
  };

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      <br />
      <h1>Login</h1>
      <br />
      <p>{errorMessage}</p>
      <form action="" onSubmit={submit}>
        <label htmlFor="email">Email </label>
        <input type="email" name="email" id="email" />
        <br />
        <br />
        <label htmlFor="password">Password </label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
