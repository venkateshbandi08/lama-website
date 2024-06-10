import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { loginRoute } from "../utils/APIRoutes";

export default function LoginForm({ onSuccess }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      setError("Username and Password are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setError("");
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, { email, password });
      if (data.status === false) {
        setError(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("current-user", data.user._id);
        setError("");
        onSuccess();
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Login</h1>
          </div>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <p>{error}</p>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
      border-radius: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: lightcoral;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: #ffffff;
    padding: 1rem;
    border: 0.1rem solid #ffffff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #ffffff;
      outline: none;
    }
  }
  button {
    background-color: #ffffff;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #7e22ce;
      color: #ffffff;
      transition: 0.4s ease-in-out;
    }
  }
  p {
    color: red;
  }
`;
