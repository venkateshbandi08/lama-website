import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import YoutubeIcon from "../assets/YoutubeIcon";
import SpotifyIcon from "../assets/SpotifyIcon";
import RssIcon from "../assets/RssIcon.png";
import UploadFileIcon from "../assets/UploadFileIcon";
import axios from "axios";
import {
  addFileRoute,
  getFilesListRoute,
  deleteFileRoute,
} from "../utils/APIRoutes";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { store } from "../App";

Modal.setAppElement("#root"); // Assuming your root element has an id of 'root'

export default function UploadFilePage() {
  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const { projectId } = useParams();
  const [, setIsLoggedIn] = useContext(store);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem("current-user")) {
      setIsLoggedIn(false);
      navigate("/");
    }
    const getFilesList = async () => {
      const userId = localStorage.getItem("current-user");
      try {
        const { data } = await axios.post(getFilesListRoute, {
          userId: userId,
          projectId: projectId,
        });
        if (data.status === true) {
          setFilesList(data.filesList);
          // console.log(data.filesList);
          setIsLoading(false);
        } else {
          console.log("server error");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFilesList();
  }, [filesList]);

  const onHandleShowPopup = (platform) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlatform("");
  };

  const onSubmitUploadFile = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("current-user");
    try {
      const { data } = await axios.post(addFileRoute, {
        userId: userId,
        projectId: projectId,
        fileName: fileName,
        fileDescription: fileDescription,
      });
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        setFileDescription("");
        setFileName("");
        closeModal();
      } else {
        // console.log(data.msg)
        toast.error(data.msg, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const onClickDeleteFile = async (fileId) => {
    const userId = localStorage.getItem("current-user");
    try {
      const { data } = await axios.post(deleteFileRoute, {
        userId: userId,
        projectId: projectId,
        fileId: fileId,
      });
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGoToEditPage = (fileId) => {
    navigate(`/project/edit/${projectId}/${fileId}`);
  };

  return (
    <Container>
      <Sidebar />
      <div className="navbar-and-content-container">
        <div className="navbar-container">
          <TopNavbar path1={"/ Project"} path2={"/ Upload"} />
        </div>
        <h1> Upload </h1>
        <ul
          className="social-media-icons-container"
          style={{ listStyleType: "none" }}
        >
          <li
            className="each-social-media-container"
            onClick={() => onHandleShowPopup("Youtube")}
          >
            <YoutubeIcon className="social-media-icon" />
            <div className="details-container">
              <p className="name"> Upload </p>
              <p> Youtube Video </p>
            </div>
          </li>
          <li
            className="each-social-media-container"
            onClick={() => onHandleShowPopup("Spotify")}
          >
            <SpotifyIcon className="social-media-icon" />
            <div className="details-container">
              <p className="name"> Upload </p>
              <p> Spotify Podcast </p>
            </div>
          </li>
          <li
            className="each-social-media-container"
            onClick={() => onHandleShowPopup("Rss")}
          >
            <img src={RssIcon} style={{ width: "5.2rem" }} alt="icon" />
            <div className="details-container">
              <p className="name"> Upload </p>
              <p> Rss Feed </p>
            </div>
          </li>
        </ul>
        {filesList.length === 0 ? (
          <p className="or"> Or </p>
        ) : (
          <BannerTab className="subscription-details">
            <p>All files are processed! Your widget is ready to go!</p>
            <button> Try it out! </button>
          </BannerTab>
        )}

        {isLoading ? (
          <LoadingContainer>Loading ...</LoadingContainer>
        ) : filesList.length === 0 ? (
          <UploadFileContainer>
            <UploadFileIcon />
            <h3>
              Select a file or drag and drop here (Podcast Media or
              Transcription Text)
            </h3>
            <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
            <button>Select File</button>
          </UploadFileContainer>
        ) : (
          <FilesTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Upload date & time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filesList.map((file, index) => (
                <tr key={index}>
                  <td>{file.fileName}</td>
                  <td>{formatDate(file.date)}</td>
                  <td>Done</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid lightgray",
                        cursor: "pointer",
                        outline: "none",
                        color: "black",
                      }}
                      onClick={() => onGoToEditPage(file._id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid lightgray",
                        cursor: "pointer",
                        outline: "none",
                        color: "red",
                      }}
                      onClick={() => onClickDeleteFile(file._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </FilesTable>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Upload Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            minHeight: "300px",
            minWidth: "700px",
          },
        }}
      >
        <ShowUploadFilePopup>
          <div className="heading-and-close-container">
            <h2>Upload From {selectedPlatform}</h2>
            <button onClick={closeModal}>
              <IoMdClose />
            </button>
          </div>
          <form onSubmit={onSubmitUploadFile}>
            <div className="details-input-container">
              <label> Name </label>
              <input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <label> Description </label>
              <input
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="submit">Upload</button>
            </div>
          </form>
        </ShowUploadFilePopup>
      </Modal>
      <ToastContainer />
    </Container>
  );
}

const FilesTable = styled.table`
  width: 90%;
  border-collapse: collapse;
  border: 1px solid lightgray;
  border-radius: 1rem;
  margin: 2rem 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  thead {
    background-color: transparent;
  }
  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: transparent;
    color: #3c3c3c;
    font-size: 1.2rem;
  }
  td button {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #7e22ce;
    color: white;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }
`;

const ShowUploadFilePopup = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  .heading-and-close-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button {
      font-size: 2rem;
      border: none;
      background-color: transparent;
      color: gray;
      cursor: pointer;
      outline: none;
    }
  }

  form {
    margin-top: 2rem;
    .details-input-container {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      label {
      }
      input {
        height: 2.5rem;
        padding: 1.5rem;
        font-size: 1.3rem;
        outline: none;
        border: 1px solid gray;
        border-radius: 0.4rem;
      }
    }
    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
      button {
        margin-top: 1rem;
        padding: 0.8rem 2rem;
        background-color: #211935;
        color: #ffffff;
        border: none;
        border-radius: 0.4rem;
        cursor: pointer;
        font-size: 1rem;
      }
    }
  }
`;

const UploadFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #999999;
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 2rem;
  border-radius: 1rem;
  padding: 2rem;
  gap: 1rem;
  h3 {
    margin-top: 1rem;
    font-weight: 100;
  }
  p {
    color: rgba(0, 0, 0, 0.4);
  }
  button {
    border: 2px solid #7e22ce;
    padding: 0.5rem 2rem;
    border-radius: 2rem;
    cursor: pointer;
    color: #7e22ce;
    background-color: transparent;
    outline: none;
    font-size: 1.2rem;
    margin-top: 2rem;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  .navbar-and-content-container {
    overflow-y: auto;
    width: 83%;
    display: flex;
    flex-direction: column;
    h1 {
      color: #7e22ce;
      padding-top: 1rem;
      padding-left: 3rem;
      padding-right: 3rem;
      padding-bottom: 2rem;
    }
    .social-media-icons-container {
      padding-left: 3rem;
      padding-right: 3rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      cursor: pointer;
      .each-social-media-container {
        border: 1px solid lightgray;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        width: 22%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2.5rem;
        margin-right: 6rem;
        .details-container {
          color: #3c3c3c;
          font-weight: bold;
          font-size: 1.1rem;
          .name {
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #3c3c3c;
          }
        }
      }
    }
    .or {
      margin: 2rem 0;
      text-align: center;
      font-size: 1.2rem;
      color: #999999;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const BannerTab = styled.div`
  background-color: #7e22ce;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 7rem;
  margin-top: 3rem;
  margin-left: 3rem;
  border-radius: 0.8rem;
  p {
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
  }
  button {
    background-color: #ffffff;
    color: #7e22ce;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    outline: none;
    font-weight: bold;
    border-radius: 0.4rem;
  }
`;
