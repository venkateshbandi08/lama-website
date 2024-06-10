import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { registerRoute } from "../utils/APIRoutes";

export default function RegisterForm({ onSuccess }) {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      setError("Password and confirm password should be the same.");
      return false;
    } else if (username.length < 3) {
      setError("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 4) {
      setError("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      setError("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        setError(data.msg);
      }
      setError("");
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
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
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
    background-color: lightsalmon;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #ffffff;
    background-color: #ffffff;
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      /* color: #0fa65b; */
      color: lightgreen;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
