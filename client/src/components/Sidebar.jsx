import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/LamaLogo";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarList = [
    "Projects",
    "Widget Configurations",
    "Deployment",
    "Pricing",
  ];

  const [selectedOption, setSelectedOption] = useState(0);
  const [isSettingsButtonSelected, setIsSettingButtonSelected] =
    useState(false);

  const handleSelectedOption = (index, eachItem) => {
    setSelectedOption(index);
    setIsSettingButtonSelected(false);
    if (eachItem === "Widget Configurations") {
      navigate("/widget-configuration");
    }
  };

  const handleSettingsSelected = () => {
    setSelectedOption(-1);
    setIsSettingButtonSelected(true);
  };

  const onClickedSettings = () => {
    navigate("/account-settings");
  };

  useEffect(() => {
    if (location.pathname === "/account-settings") {
      setSelectedOption(-1);
      setIsSettingButtonSelected(true);
    } else if (location.pathname === "/widget-configuration") {
      setSelectedOption(1);
      setIsSettingButtonSelected(false);
    }
  }, [navigate]);

  return (
    <Container>
      <div className="logo-and-brandname-container">
        <Logo className="lama-logo" />
        <h1> Lama. </h1>
      </div>
      <p> Podcast Upload Flow </p>
      <ul
        className="podcast-upload-flow-container"
        style={{ listStyleType: "none" }}
      >
        {sidebarList.map((eachItem, index) => (
          <li
            key={index}
            className={
              selectedOption === index
                ? "selected-sidebar-opion"
                : "each-sidebar-option"
            }
            onClick={() => handleSelectedOption(index, eachItem)}
          >
            <div
              className={
                selectedOption === index ? "selected-index-num" : "index-num"
              }
            >
              {index + 1}
            </div>
            <p
              className={
                selectedOption === index
                  ? "selected-option-name"
                  : "option-name"
              }
            >
              {eachItem}
            </p>
          </li>
        ))}
      </ul>
      <hr />
      <div
        className="settings-button-container"
        style={{ cursor: "pointer" }}
        onClick={onClickedSettings}
      >
        <div
          className={
            isSettingsButtonSelected
              ? "selected-sidebar-opion"
              : "each-sidebar-option"
          }
          onClick={handleSettingsSelected}
        >
          <div
            className={
              isSettingsButtonSelected ? "selected-index-num" : "index-num"
            }
          >
            <IoSettingsOutline />
          </div>
          <p
            className={
              isSettingsButtonSelected ? "selected-option-name" : "option-name"
            }
          >
            Settings
          </p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 17%;
  background-color: #f3e8ff;
  padding: 1.5rem;
  .logo-and-brandname-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .lama-logo {
    }
    h1 {
      font-size: 2rem;
      color: #7e22ce;
    }
  }
  p {
    margin-top: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  .podcast-upload-flow-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    .each-sidebar-option {
      background-color: #e2d8ee;
      gap: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 3rem;
      padding: 1.5rem;
      border-radius: 2rem;
      cursor: pointer;
      .index-num {
        background-color: #d8cfc4;
        padding: 0.5rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 2rem;
        border-radius: 2rem;
      }
      .option-name {
        color: #49454f;
      }
    }
    .selected-sidebar-opion {
      background-color: #7e22ce;
      gap: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 3rem;
      padding: 1.5rem;
      border-radius: 2rem;
      .selected-index-num {
        background-color: #211935;
        color: white;
        padding: 0.5rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 2rem;
        border-radius: 2rem;
      }

      .selected-option-name {
        color: white;
      }
    }
  }
  hr {
    margin-top: 2rem;
  }
  .settings-button-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    justify-content: center;
    .each-sidebar-option {
      background-color: #e2d8ee;
      gap: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 3rem;
      padding: 1.5rem;
      border-radius: 2rem;
      cursor: pointer;
      .index-num {
        background-color: #d8cfc4;
        padding: 0.5rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 2rem;
        border-radius: 2rem;
      }
      .option-name {
        color: #49454f;
      }
    }
    .selected-sidebar-opion {
      background-color: #7e22ce;
      gap: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 3rem;
      padding: 1.5rem;
      border-radius: 2rem;
      .selected-index-num {
        background-color: #211935;
        color: white;
        padding: 0.5rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 2rem;
        border-radius: 2rem;
      }

      .selected-option-name {
        color: white;
      }
    }
  }
`;
