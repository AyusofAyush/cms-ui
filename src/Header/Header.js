import React from "react";
import { useHistory } from "react-router-dom";
import ErrorBoundary from "../utils/Error-boundry";
import { removeCreds } from "../utils/utils";
import "./Header.scss";

const Header = ({ userName = "Dummy", activeState = "faq" }) => {
  const history = useHistory();
  return (
    <ErrorBoundary>
      <div className="flex Header-parent default">
        <h2>CMS</h2>
        <div className="flex center header-right">
          <p
            className={`flex center header-item ${
              activeState === "create" ? "active" : ""
            }`}
            onClick={() => {
              history.push("/create");
            }}
          >
            Create Post
          </p>
          <p
            className={`flex center header-item ${
              activeState === "faq" ? "active" : ""
            }`}
            onClick={() => {
              history.push("/view/faq");
            }}
          >
            FAQ
          </p>
          <p
            className={`flex center header-item ${
              activeState === "help" ? "active" : ""
            }`}
            onClick={() => {
              history.push("/view/help");
            }}
          >
            Help
          </p>
          <p
            className="flex center header-item"
            onClick={() => {
              removeCreds();
              history.push("/login");
            }}
          >
            Logout
          </p>
          <h2 className="flex center intro-text">Howdy, {userName}</h2>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Header;
