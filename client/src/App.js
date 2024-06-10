import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import UploadFilePage from "./pages/UploadFilePage";
import FileEditPage from "./pages/FileEditPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import WidgetConfigurationPage from "./pages/WidgetConfigurationPage";

export const store = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("current-user")
  );
  console.log(isLoggedIn);
  return (
    <store.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route
            path="/project/upload/:projectId"
            element={isLoggedIn ? <UploadFilePage /> : <ProjectsPage />}
          />
          <Route
            path="/project/edit/:projectId/:fileId"
            element={isLoggedIn ? <FileEditPage /> : <ProjectsPage />}
          />
          <Route
            path="/account-settings"
            element={isLoggedIn ? <AccountSettingsPage /> : <ProjectsPage />}
          />
          <Route
            path="/widget-configuration"
            element={
              isLoggedIn ? <WidgetConfigurationPage /> : <ProjectsPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;
