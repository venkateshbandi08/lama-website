import React from "react";
import styled from "styled-components";
import { SlHome } from "react-icons/sl";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import Flag from "../assets/Flag.png";

export default function TopNavbar({ path1, path2 }) {
  return (
    <Container>
      <div className="home-path-container">
        <SlHome className="icon" />
        <h3>
          {path1} <span>{path2}</span>{" "}
        </h3>
      </div>
      <div className="lang-bell-container">
        <IoMdArrowDropdown />
        <h3> EN </h3>
        <img src={Flag} />
        <FaRegBell className="icon" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 10%;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .home-path-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      color: #7e22ce;
      font-weight: bold;
    }
    h3 {
      color: #999999;
      span {
        color: #7e22ce;
      }
    }
  }
  .lang-bell-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 1.7rem;
      margin-right: 1rem;
    }
    .icon {
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;
