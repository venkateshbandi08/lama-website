import React, { useState, useContext, useRef, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { store } from "../App";
import Logo from "../assets/LamaLogo";
import ProjectImage from "../assets/ProjectImage";
import { IoSettingsOutline, IoHomeOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { projectsListRoute, addProjectRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectsList from "../components/ProjectsList";

Modal.setAppElement("#root");

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useContext(store);
  const [showPopup, setShowPopup] = useState(!isLoggedIn);
  const [isLogin, setIsLogin] = useState(true);
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectError, setProjectError] = useState("");
  const [projectEpisodes, setProjectEpisodes] = useState("");
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleClose = () => {
    setShowPopup(false);
    setIsLoggedIn(true);
    toast.success("User Logged In Successfully", toastOptions);
    getProjectsList();
  };

  const handleToggle = () => setIsLogin(!isLogin);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      modalRef.current.classList.add("blink");
      setTimeout(() => {
        modalRef.current.classList.remove("blink");
      }, 300);
    }
  };

  const getProjectsList = async () => {
    try {
      const userId = localStorage.getItem("current-user");
      const { data } = await axios.post(projectsListRoute, { userId });
      if (data.status === true) {
        setProjectsList(data.projectslist);
        setIsLoading(false);
      } else {
        console.log("server error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("current-user")) {
      setIsLoggedIn(true);
      return;
    }
    getProjectsList();
  }, [navigate]);

  const handleCreateProjectClick = () => {
    setShowCreateProjectModal(true);
  };

  const handleCloseCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  const onSubmitCreateProject = async (event) => {
    event.preventDefault();
    if (projectName === "") {
      setProjectError("*Project Name Can't be empty");
      return;
    }
    const userId = localStorage.getItem("current-user");
    const { data } = await axios.post(addProjectRoute, {
      userId: userId,
      projectName: projectName,
      episodes: projectEpisodes,
    });
    if (data.status === true) {
      toast.success(data.msg, toastOptions);
      handleCloseCreateProjectModal();
      getProjectsList(); // Fetch the projects list again
      setProjectName("");
      setProjectError("");
      setProjectEpisodes("");
    } else {
      console.log("server error");
    }
  };

  return (
    <Container>
      <nav>
        <div className="logo-and-brandname-container">
          <Logo className="lama-logo" />
          <h1> Lama. </h1>
        </div>
        <div className="settings-and-bell-container">
          <IoSettingsOutline className="icon" />
          <CiBellOn className="icon" />
        </div>
      </nav>
      <div className="back-to-home-container">
        <div className="back-to-home">
          <IoHomeOutline />
          <p> Back to Home </p>
        </div>
      </div>
      {isLoading ? (
        <LoaderContainer>Loading...</LoaderContainer>
      ) : projectsList.length === 0 ? (
        <div className="projects-section">
          <h1> Create a New Project </h1>
          <ProjectImage />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>
          <button onClick={handleCreateProjectClick}>
            <FaCirclePlus className="plus-icon" />
            Create New Project
          </button>
        </div>
      ) : (
        <ProjectsList
          projectsList={projectsList}
          onCreateProject={handleCreateProjectClick}
        />
      )}

      <div onClick={handleOutsideClick}>
        <Modal
          isOpen={showPopup}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
        >
          <ModalContent ref={modalRef}>
            {isLogin ? (
              <LoginForm onSuccess={handleClose} />
            ) : (
              <RegisterForm onSuccess={handleClose} />
            )}
            <div style={{ textAlign: "center", margin: "1rem" }}>
              <p
                style={{
                  textDecoration: "underline",
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={handleToggle}
              >
                {isLogin
                  ? "Need to register? Sign up"
                  : "Already have an account? Log in"}
              </p>
            </div>
          </ModalContent>
        </Modal>
      </div>

      <Modal
        isOpen={showCreateProjectModal}
        onRequestClose={handleCloseCreateProjectModal}
        style={customStylesForCreateProjectModal}
      >
        <CreateProjectModalContent>
          <form onSubmit={onSubmitCreateProject}>
            <h2>Create Project</h2>
            <div className="label-input-container">
              <label> Enter Project Name :</label>
              <input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                placeholder="Type here.."
              />
              <label> Enter Number of Episodes :</label>
              <input
                onChange={(e) => setProjectEpisodes(e.target.value)}
                value={projectEpisodes}
                placeholder="Enter a Number.."
              />
            </div>
            <p>{projectError}</p>
            <div className="buttons-container">
              <button
                className="cancel-button"
                onClick={handleCloseCreateProjectModal}
              >
                Cancel
              </button>
              <button className="create-button" type="submit">
                Create
              </button>
            </div>
          </form>
        </CreateProjectModalContent>
      </Modal>

      <ToastContainer />
    </Container>
  );
}

const customStyles = {
  overlay: {
    transition: "opacity 300ms ease-in-out",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "550px",
    minHeight: "200px",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    afterOpen: { opacity: 1 },
    beforeClose: { opacity: 0 },
  },
};

const customStylesForCreateProjectModal = {
  overlay: {
    transition: "opacity 300ms ease-in-out",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "750px",
    minHeight: "200px",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    afterOpen: { opacity: 1 },
    beforeClose: { opacity: 0 },
  },
};

const CreateProjectModalContent = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 2rem;
  }
  form {
    gap: 2rem;
    .label-input-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      label {
        color: gray;
      }
      input {
        height: 2.5rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        font-size: 1.3rem;
        outline: none;
        border: 1px solid lightgray;
        border-radius: 0.4rem;
      }
    }
    p {
      color: red;
      margin-left: 1rem;
    }
    .buttons-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      .cancel-button {
        background-color: transparent;
        outline: none;
        border: 0;
        color: red;
        font-size: 1rem;
        cursor: pointer;
      }
      .create-button {
        background-color: #7e22ce;
        cursor: pointer;
        font-size: 1rem;
      }
    }
  }
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #211935;
    color: #ffffff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  .blink {
    animation: blink 0.3s;
  }

  @keyframes blink {
    0% {
      border: 2px solid red;
    }
    50% {
      border: 2px solid transparent;
    }
    100% {
      border: 2px solid red;
    }
  }
`;

const Container = styled.div`
  background-color: #ffffff;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 1rem;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .settings-and-bell-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      .icon {
        font-size: 1.8rem;
        cursor: pointer;
      }
    }
  }
  .back-to-home-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 2rem;
    margin-left: 7rem;
    margin-bottom: 2rem;
    cursor: pointer;
    .back-to-home {
      padding: 0.2rem 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      border: 1px solid #999999;
      border-radius: 1rem;
    }
  }
  .projects-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 6rem;
    gap: 2rem;
    h1 {
      color: #7e22ce;
      font-size: 3.5rem;
    }
    p {
      color: #838383;
      font-size: 1.8rem;
      text-align: center;
    }
    button {
      background-color: #211935;
      color: #ffffff;
      display: flex;
      align-items: center;
      font-size: 2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-radius: 0.5rem;
      gap: 0.5rem;
      cursor: pointer;
      .plus-icon {
        font-size: 2rem;
      }
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  min-width: 100vw;
`;
