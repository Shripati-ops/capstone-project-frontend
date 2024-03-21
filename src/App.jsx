import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/Signin";
import { UserContextProvider } from "./context/userContext";
import AdminSignUpPage from "./pages/admin/AdminSignup";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <UserContextProvider>
              <Dashboard />
            </UserContextProvider>
          }
        />
        <Route exact path="/admin/signup" element={<AdminSignUpPage />}></Route>
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/signin" element={<SignInPage />} />
      </Routes>
    </>
  );
}

export default App;
