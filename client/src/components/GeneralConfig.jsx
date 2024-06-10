import React from "react";
import styled from "styled-components";

export default function GeneralConfig() {
  const inputDetails = ["Chatbot Name", "Welcome Message", "Input Placeholder"];
  return (
    <Container>
      <ul className="general-inputs-container">
        {inputDetails.map((eachItem) => (
          <li>
            <h2> {eachItem}</h2>
            <input />
            <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding: 3rem;
  .general-inputs-container {
    list-style-type: none;
    gap: 2.5rem;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    h2 {
      color: #3c3c3c;
    }
    input {
      height: 3rem;
      border: 1px solid lightgray;
      outline: none;
      border-radius: 0.4rem;
      padding: 1rem;
      margin-bottom: -0.4rem;
    }
    p {
      color: #646464;
    }
  }
`;
