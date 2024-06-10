import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import { editFileRoute, getfileRoute } from "../utils/APIRoutes";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

export default function FileEditPage() {
  const { projectId, fileId } = useParams();
  const userId = localStorage.getItem("current-user");
  const [, setIsLoggedIn] = useContext(store);
  const navigate = useNavigate();
  const [fileDetails, setFileDetails] = useState({});
  const [editedDescription, setEditedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const currentDate = Date.now();

  useEffect(() => {
    const getFileDetails = async () => {
      try {
        const { data } = await axios.post(getfileRoute, {
          userId: userId,
          projectId: projectId,
          fileId: fileId,
        });
        if (data.status === true) {
          setFileDetails(data.file);
          setEditedDescription(data.file.fileDescription);
          setIsLoading(false);
        } else {
          console.log(data.msg);
        }
      } catch (err) {
        console.log("server error");
        console.log(err);
      }
    };

    if (!localStorage.getItem("current-user")) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      getFileDetails();
    }
  }, [userId, projectId, fileId, setIsLoggedIn, navigate]);

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const editFileDetails = async () => {
    try {
      const { data } = await axios.post(editFileRoute, {
        userId: userId,
        projectId: projectId,
        fileId: fileId,
        fileDescription: editedDescription,
        date: currentDate,
      });
      if (data.status === true) {
        setFileDetails(data.file);
        if (fileDetails.fileDescription !== editedDescription) {
          toast.success(data.msg, toastOptions);
        }
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log("server error");
      console.log(err);
    }
  };

  const onClickFileEdit = () => {
    editFileDetails();
    navigate(`/project/upload/${projectId}`);
  };

  const onClickDiscard = () => {
    navigate(`/project/upload/${projectId}`);
  };

  return (
    <Container>
      <Sidebar />
      <div className="navbar-and-content-container">
        <div className="navbar-container">
          <TopNavbar path1={"/ Project"} path2={"/ Transcript"} />
        </div>
        <div className="filename-and-buttons-container">
          <h1> {fileDetails.fileName} </h1>
          <div className="buttons-container">
            <button className="discard-button" onClick={onClickDiscard}>
              Discard
            </button>
            <button className="save-button" onClick={onClickFileEdit}>
              Save & Exit
            </button>
          </div>
        </div>
        {isLoading ? (
          <LoadingContainer>Loading...</LoadingContainer>
        ) : (
          <div className="file-edit-section">
            <div className="file-edit-container">
              <div className="editmode-and-search-buttons-container">
                <div className="edit-button">
                  <MdOutlineModeEdit />
                  Edit mode
                </div>
                <div className="search-button">
                  <FaSearch />
                </div>
              </div>
              <textarea
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
        )}
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
    .filename-and-buttons-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      h1 {
        color: #7e22ce;
        padding-top: 1rem;
        padding-left: 3rem;
        padding-right: 3rem;
        padding-bottom: 2rem;
      }
      .buttons-container {
        padding-right: 3rem;
        gap: 2rem;
        .save-button {
          margin-top: 1rem;
          padding: 0.8rem 2rem;
          background-color: #211935;
          color: #ffffff;
          border: none;
          border-radius: 0.4rem;
          cursor: pointer;
          font-size: 1rem;
          margin-left: 1.5rem;
        }
        .discard-button {
          margin-top: 1rem;
          padding: 0.8rem 2rem;
          background-color: transparent;
          color: red;
          border: 1px solid red;
          border-radius: 0.4rem;
          cursor: pointer;
          font-size: 1rem;
        }
      }
    }
    .file-edit-section {
      padding-left: 3rem;
      padding-top: 2rem;
      padding-right: 3rem;
      .file-edit-container {
        border: 2px solid #7e22ce;
        border-radius: 1rem;
        height: 70vh;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        padding-left: 3rem;
        padding-right: 3rem;
      }
      textarea {
        flex: 1;
        font-size: 1.2rem;
        font-family: "Roboto";
        padding-top: 1rem;
        border: 0;
        resize: none;
        overflow-y: auto;
        padding-left: 0.8rem;
        outline: none;
      }
      .editmode-and-search-buttons-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .edit-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #4b4b4b;
          padding: 0.5rem 1rem;
          cursor: pointer;
          outline: none;
          border: none;
          border-radius: 2rem;
          color: white;
        }
        .search-button {
          color: white;
          background-color: #f3f8ff;
          color: #7e22ce;
          border: 1px solid #7e22ce;
          padding: 0.4rem;
          border-radius: 2rem;
        }
      }
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;
