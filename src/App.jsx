import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/Signin";
import { UserContextProvider, useUserContext } from "./context/userContext";
import AdminSignUpPage from "./pages/admin/AdminSignup";
import CampaignPage from "./pages/Campaigns";
import DashboardHome from "./pages/DashboardIndex";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ProtectedRoute } from "./utils/ProtectedRoutes";
import CreateCampaignPage from "./pages/campaigns/createCampaigns.jsx";
function App() {
  const location = useLocation();
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);
  const { name, setName, email, setEmail, avatar, setAvatar, role, setRole } =
    useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await localStorage.getItem("access_token");
        setToken(accessToken);

        if (accessToken) {
          const data = jwtDecode(accessToken);
          console.log(data);
          const name = data.userData.firstName + " " + data.userData.lastName;
          const email = data.userData.email;
          const avatar = data.userData.avatar;
          const role = data.userData.role;

          // Update state variables
          setName(name);
          setEmail(email);
          setAvatar(avatar);
          setRole(role);

          // Update userData after state updates are completed
          setUserData({ name, email, avatar, role });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <UserContextProvider>
                <Dashboard />
              </UserContextProvider>
            </ProtectedRoute>
          }
        >
          <Route
            exact
            path="/"
            element={<DashboardHome userData={userData} />}
          ></Route>
          <Route exact path="/campaigns" element={<CampaignPage />}></Route>
          <Route
            exact
            path="/add-campaign"
            element={<CreateCampaignPage />}
          ></Route>
        </Route>
        <Route exact path="/admin/signup" element={<AdminSignUpPage />}></Route>
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/signin" element={<SignInPage />} />
      </Routes>
    </>
  );
}

export default App;
