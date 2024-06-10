import React, { useState } from "react";
import styled from "styled-components";
import { RiUpload2Line } from "react-icons/ri";

export default function DisplayConfig() {
  const displayDetails = [
    "Primary Color",
    "Font Color",
    "Font Size (in px)",
    "Chat Height (in % of total screen)",
  ];
  const chatIconDetails = [
    "Chat Icon Size",
    "Position on Screen",
    "Distance from Bottom (in px)",
    "Horizontal Distance (in px)",
  ];
  const [displayValues, setDisplayValues] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [isToggled, setIsToggled] = useState(false);

  const onHandleInput = (e) => {
    setDisplayValues({
      ...displayValues,
      [e.target.name]: e.target.value,
    });
  };

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Container>
      <ul className="top-section-container">
        {displayDetails.map((eachItem, index) => (
          <li key={index}>
            <h3>{eachItem}</h3>
            <div className="inputs-container">
              <input name={index} onChange={onHandleInput} />
              {(index === 0 || index === 1) && (
                <div
                  className="color-box"
                  style={{
                    backgroundColor: displayValues[index] || "white",
                  }}
                ></div>
              )}
            </div>
            <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          </li>
        ))}
      </ul>
      <div className="show-sources-container">
        <div className="show-sources">
          <h3>Show Sources</h3>
          <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        </div>
        <ToggleButton isToggled={isToggled} onClick={toggleButton}>
          <ToggleThumb isToggled={isToggled} />
        </ToggleButton>
      </div>
      <hr />
      <ul className="top-section-container">
        {chatIconDetails.map((eachItem, index) => (
          <li key={index}>
            <h3>{eachItem}</h3>
            <div className="inputs-container">
              {index === 0 || index === 1 ? (
                <input type="dropdown" />
              ) : (
                <input />
              )}
            </div>
            <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          </li>
        ))}
      </ul>
      <div className="bot-icon-container">
        <div className="bot-pic"></div>
        <div className="button-container">
          <button>
            Upload
            <RiUpload2Line className="upload-icon" />
          </button>
          <p>Recommended Size: 48x48px</p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  padding: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
  .top-section-container {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    li {
      display: flex;
      flex-direction: column;
      width: 40%;
      gap: 1rem;
      h3 {
        color: #3c3c3c;
      }
      .inputs-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        input {
          height: 2.5rem;
          width: 60%;
          border-radius: 0.4rem;
          border: 1px solid #999999;
          outline: none;
          padding: 1rem;
          font-size: 1rem;
        }
        .color-box {
          height: 2.5rem;
          width: 7%;
          border: 1px solid #999999;
          border-radius: 0.3rem;
          background-color: white;
        }
      }
      p {
        margin-top: -0.6rem;
        color: #646464;
      }
    }
  }
  .show-sources-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 3rem;
    padding-top: 4rem;
    margin-bottom: 2.5rem;
    .show-sources {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      h3 {
        color: #3c3c3c;
      }
      p {
        color: #646464;
      }
    }
  }
  hr {
    margin-bottom: 2rem;
  }
  .bot-icon-container {
    margin-top: 3rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    .bot-pic {
      height: 4rem;
      width: 4rem;
      border-radius: 3rem;
      background-color: gray;
    }
    .button-container {
      display: flex;
      flex-direction: column;
      button {
        background-color: #7e22ce;
        color: white;
        font-size: 1rem;
        gap: 1rem;
        padding: 0.5rem;
        border: none;
        outline: none;
        border-radius: 0.3rem;
        text-align: center;
        cursor: pointer;
        margin-bottom: 0.5rem;
        .upload-icon {
          margin-left: 0.5rem;
          font-size: 1.2rem;
        }
      }
      p {
        color: #646464;
        font-size: 0.8rem;
      }
    }
  }
`;

const ToggleButton = styled.div`
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({ isToggled }) => (isToggled ? "#7E22CE" : "#646464")};
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ToggleThumb = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s;
  transform: ${({ isToggled }) =>
    isToggled ? "translateX(25px)" : "translateX(0)"};
`;
