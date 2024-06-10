import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import styled from "styled-components";
import GeneralConfig from "../components/GeneralConfig";
import DisplayConfig from "../components/DisplayConfig";
import { useNavigate } from "react-router-dom";
import { store } from "../App";

export default function WidgetConfigurationPage() {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useContext(store);
  useEffect(() => {
    if (!localStorage.getItem("current-user")) {
      setIsLoggedIn(false);
      navigate("/");
    }
  });
  const widgetsList = ["General", "Display", "Advanced"];
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState(0);
  const selectedConfigComponent = () => {
    if (selectedWidgetIndex === 0) {
      return <GeneralConfig />;
    } else if (selectedWidgetIndex === 1) {
      return <DisplayConfig />;
    }
  };
  return (
    <Container>
      <Sidebar />
      <div className="navbar-and-content-container">
        <div className="navbar-container">
          <TopNavbar path1={""} path2={"/ Account Settings"} />
        </div>
        <div className="configuration-container">
          <h1> Configuration </h1>
          <ul className="configuration-tabs" style={{ listStyleType: "none" }}>
            {widgetsList.map((eachItem, index) => (
              <li
                className={`${
                  selectedWidgetIndex === index
                    ? "selected-widget"
                    : "unselected-widget"
                }`}
                onClick={() => setSelectedWidgetIndex(index)}
              >
                {eachItem}
              </li>
            ))}
          </ul>
          <hr />
        </div>
        {selectedConfigComponent()}
      </div>
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
    height: 100%;
    display: flex;
    flex-direction: column;
    .configuration-container {
      h1 {
        color: #7e22ce;
        padding-top: 1rem;
        padding-left: 3rem;
        padding-right: 3rem;
        padding-bottom: 3rem;
      }
      .configuration-tabs {
        padding-left: 3rem;
        padding-right: 3rem;
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        align-items: center;
        .unselected-widget {
          color: #3c3c3c;
          cursor: pointer;
          font-size: 1.2rem;
        }
        .selected-widget {
          color: #7e22ce;
          font-weight: bold;
          border-bottom: 2px solid #7e22ce;
          font-size: 1.3rem;
        }
      }
      hr {
        width: 95%;
        margin-left: 3rem;
        color: #999999;
        border-width: 0.1rem;
      }
    }
  }
`;
