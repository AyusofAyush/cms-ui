import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    const loginId = JSON.parse(localStorage.getItem("loginCreds"));
    if (!loginId) {
      history.push("/");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
