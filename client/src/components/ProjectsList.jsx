import React from "react";
import styled from "styled-components";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const bgColors = ["#7E22CE", "#3C3C3C", "#6366F1", "#F8A01D"];

const getBgColor = () => {
  const randomIndex = Math.floor(Math.random() * bgColors.length);
  return bgColors[randomIndex];
};

export default function ProjectsList(props) {
  const { projectsList, onCreateProject } = props;
  const navigate = useNavigate();
  const handleCreateProject = () => {
    if (onCreateProject) {
      onCreateProject();
    }
  };

  const getProjectLogoName = (projectName) => {
    const words = projectName.split(" ");
    if (words.length >= 2) {
      return words[0].charAt(0) + words[1].charAt(0);
    } else {
      return words[0].slice(0, 2);
    }
  };

  const getProjectName = (projectName) => {
    const words = projectName.split(" ");
    if (words.length >= 2) {
      return words[0] + " " + words[1] + "...";
    } else {
      return words[0];
    }
  };

  const getLastUpdated = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const diffTime = currentDate - date;
    const diffHours = diffTime / (1000 * 60 * 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      return "Last edited on Today";
    } else if (diffDays === 1) {
      return "Last edited on 1 day ago";
    } else if (diffDays < 7) {
      return `Last edited on ${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Last edited on ${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return `Last edited on ${date.toLocaleDateString("en-GB")}`;
    }
  };

  const onClickProject = (projectId) => {
    navigate(`/project/upload/${projectId}`);
  };

  return (
    <Container>
      <div className="heading-and-button-container">
        <h1> Projects </h1>
        <button onClick={handleCreateProject}>
          <FaCirclePlus className="plus-icon" />
          Create New Project
        </button>
      </div>
      <div className="project-name-cards-container">
        {projectsList.map((eachProject) => (
          <div
            className="each-project-card-container"
            key={eachProject.id}
            onClick={() => onClickProject(eachProject._id)}
          >
            <ProjectLogoContainer bgColor={getBgColor()}>
              <h1>{getProjectLogoName(eachProject.projectName)}</h1>
            </ProjectLogoContainer>
            <div className="project-details-container">
              <p className="project-name">
                {getProjectName(eachProject.projectName)}
              </p>
              <p className="episodes-count">{eachProject.episodes} episodes</p>
              <p className="last-edited">{getLastUpdated(eachProject.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  margin-left: 7.1rem;
  margin-right: 4rem;
  .heading-and-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: #7e22ce;
    }
    button {
      background-color: #211935;
      color: #ffffff;
      display: flex;
      align-items: center;
      font-size: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      border-radius: 0.5rem;
      gap: 0.5rem;
      cursor: pointer;
      .plus-icon {
        font-size: 1.2rem;
      }
    }
  }
  .project-name-cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
    .each-project-card-container {
      width: 25%;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      border: 1px solid lightgray;
      border-radius: 0.4rem;
      margin-right: 5rem;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      .project-details-container {
        margin-left: 1.5rem;
        .project-name {
          color: #7e22ce;
          font-weight: bold;
          margin-bottom: 0.3rem;
          font-size: 1.2rem;
        }
        .episodes-count {
          color: #3c3c3c;
          margin-bottom: 1rem;
        }
        .last-edited {
          color: #969696;
        }
      }
    }
  }
`;

const ProjectLogoContainer = styled.div`
  background-color: ${(props) => props.bgColor};
  padding: 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  color: #ffffff;
  text-transform: uppercase;
`;
