import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import ProfilePic from "../assets/ProfilePic.png";
import { accountDetailsRoute, editUsernameRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function AccountSettingsPage() {
  const [, setIsLoggedIn] = useContext(store);
  const navigate = useNavigate();
  const userId = localStorage.getItem("current-user");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [editedUserName, setEditedUserName] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!userId) {
      setIsLoggedIn(false);
      navigate("/");
    }
    const getUserDetails = async () => {
      try {
        const { data } = await axios.post(accountDetailsRoute, {
          userId: userId,
        });
        if (data.status === true) {
          setUserName(data.details.username);
          setEditedUserName(data.details.username);
          setEmail(data.details.email);
        } else {
          console.log("server error");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, [navigate]);

  const onEditUsername = async () => {
    try {
      const { data } = await axios.post(editUsernameRoute, {
        userId: userId,
        newUserName: editedUserName,
      });
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
      } else {
        console.log("server error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickLogout = () => {
    localStorage.removeItem("current-user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Container>
      <Sidebar />
      <div className="navbar-and-content-container">
        <div className="navbar-container">
          <TopNavbar path1={""} path2={"/ Account Settings"} />
        </div>
        <div className="account-details-container">
          <div className="heading-logout-container">
            <h1> Account Settings </h1>
            <button onClick={onClickLogout}> Logout </button>
          </div>
          <div className="account-details">
            <div className="profile-pic-container">
              <img src={ProfilePic} className="profile-pic" alt="profile" />
            </div>
            <div className="name-container">
              <label> Username </label>
              <input
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
              />
              <div className="edit-button">
                <button onClick={onEditUsername}>
                  {" "}
                  Edit and Save Username
                </button>
              </div>
            </div>
            <div className="email-container">
              <label> Emial </label>
              <input value={email} readOnly />
            </div>
          </div>
        </div>
        <div className="subscription-container">
          <h1> Subscriptions </h1>
          <div className="subscription-details">
            <p>
              You are currently on the
              <span> Ques AI Basic Plan! </span>
            </p>
            <button> Upgrade </button>
          </div>
          <p className="cancel"> Cancel subscription </p>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  .navbar-and-content-container {
    overflow-y: auto;
    width: 83%;
    display: flex;
    flex-direction: column;
    .account-details-container {
      .heading-logout-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        h1 {
          color: #7e22ce;
          margin-top: 2rem;
          padding-left: 3rem;
          padding-right: 3rem;
          margin-bottom: 1rem;
        }
        button {
          margin-top: 2rem;
          padding: 0.5rem;
          padding-left: 3rem;
          padding-right: 3rem;
          margin-bottom: 1rem;
          background-color: #211935;
          color: white;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 0.4rem;
        }
      }

      .account-details {
        padding: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .profile-pic-container {
          width: 20%;
          .profile-pic {
            width: 208px;
            height: 208px;
            border-radius: 10rem;
          }
        }
        .name-container {
          width: 40%;
          display: flex;
          flex-direction: column;
          label {
            font-size: 1rem;
            font-weight: bold;
            color: #3c3c3c;
          }
          input {
            height: 2.8rem;
            width: 70%;
            border: 2px solid lightgray;
            outline: none;
            font-size: 1.4rem;
            font-family: "Roboto";
            border-radius: 0.4rem;
            padding: 1rem;
            margin-top: 0.6rem;
            margin-bottom: 1rem;
          }
          .edit-button {
            display: flex;
            flex-direction: row;
            justify-content: center;
            button {
              width: 40%;
              background-color: #211935;
              color: white;
              border: none;
              outline: none;
              cursor: pointer;
              height: 2rem;
              border-radius: 0.4rem;
            }
          }
        }
        .email-container {
          width: 40%;
          display: flex;
          flex-direction: column;
          label {
            font-size: 1rem;
            font-weight: bold;
            color: #3c3c3c;
          }
          input {
            height: 2.8rem;
            width: 70%;
            border: 2px solid lightgray;
            outline: none;
            font-size: 1.4rem;
            font-family: "Roboto";
            border-radius: 0.4rem;
            padding: 1rem;
            margin-top: 0.6rem;
            margin-bottom: 2rem;
          }
        }
      }
    }
    .subscription-container {
      display: flex;
      flex-direction: column;
      padding-left: 3rem;
      padding-right: 3rem;
      gap: 2rem;
      h1 {
        color: #7e22ce;
      }
      .subscription-details {
        background-color: #7e22ce;
        padding: 2rem 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-right: 7rem;
        border-radius: 0.4rem;
        p {
          color: #ffffff;
          font-size: 1.5rem;
          span {
            font-weight: bold;
            text-decoration: underline;
          }
        }
        button {
          background-color: #ffffff;
          color: #7e22ce;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          outline: none;
          font-weight: bold;
          border-radius: 0.4rem;
        }
      }
      .cancel {
        color: red;
        text-decoration: underline;
        font-size: 1.2rem;
        cursor: pointer;
      }
    }
  }
`;
