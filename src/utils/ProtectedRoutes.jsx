import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  const checkIsUserLoggedIn = () => {
    const access_token = localStorage.getItem("access_token");
    setIsLoggedIn(!!access_token);
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      return navigate("/signin");
    }
  };

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [isLoggedIn]);

  return <Fragment>{isLoggedIn ? props.children : null}</Fragment>;
};

export { ProtectedRoute };
