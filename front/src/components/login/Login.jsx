import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Login.scss";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async (email, password) => {
    try {
      const response = await Axios.post(
        "http://localhost:3011/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Miaumiau", response.data);
      setErrorMessage(response.data);
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
        <Link as={Link} to="/">
          <button>Iniciar sesión</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
