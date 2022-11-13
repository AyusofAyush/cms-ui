import React, { useEffect, useState } from "react";
import ErrorBoundary from "../utils/Error-boundry";
import "./Login.scss";
import introVideo from "../assets/introBg.mp4";
import Input from "../utils/Input/Input";
import Button from "../utils/Button/Button";
import PageLoader from "../utils/Loader/Loader";
import {
  removeCreds,
  saveCreds,
  verifyCreds,
  getBaseURL,
} from "../utils/utils";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // api call for login is made here
  console.log(process.env.NODE_ENV, window.__RUNTIME_CONFIG__);
  const history = useHistory();
  const [userName, setuserName] = useState(null);
  const [userPwd, setuserPwd] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setshowError] = useState("");

  useEffect(() => {
    if (verifyCreds()) {
      history.push("/view");
    }
  }, []);

  const handleOnChange = (field, value) => {
    if (field === "pwd") setuserPwd(value);
    else setuserName(value);
  };

  const handleOnClick = (type) => {
    if (!userName || !userPwd) return;
    setShowLoader(true);
    // API call for login/singup
    if (type && type === "login") {
      axios
        .post(
          `${window.__RUNTIME_CONFIG__.API_HOST}/v1/login`,
          { email: userName, password: userPwd },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(({ data }) => {
          console.log("Login Response", data);
          removeCreds();
          saveCreds({ email: userName, token: data.token });
          setShowLoader(false);
          history.push("/view");
        })
        .catch((err) => {
          console.log("Some Error while login", err);
          setShowLoader(false);
          setshowError(err.response.data);
        });
    } else {
      axios
        .post(
          `${window.__RUNTIME_CONFIG__.API_HOST}/v1/register`,
          { email: userName, password: userPwd },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(({ data }) => {
          console.log("Signup Response", data);
          removeCreds();
          saveCreds({ email: userName, token: data.token });
          setShowLoader(false);
          history.push("/view");
        })
        .catch((err) => {
          console.log("Some Error while signup", err);
          setShowLoader(false);
          setshowError("Something went wrong");
        });
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex center width height login-parent">
        <video playsInline autoPlay muted loop>
          <source src={introVideo}></source>
        </video>
        <div className="login-blank"></div>
        <div className="flex login-wrapper column center">
          {!showLoader ? (
            <div className="flex column center login-menu">
              <h1>Content Management System</h1>
              {showError !== "" && (
                <p className="error-msg">
                  <sup>*</sup> {showError}
                </p>
              )}
              <Input
                placeholder="me@example.com"
                onChange={handleOnChange}
                field="username"
              />
              <Input
                placeholder="password here"
                type="password"
                onChange={handleOnChange}
                field="pwd"
              />
              <div className="flex btn-grp">
                <Button
                  className={"Button login-btn flex-end"}
                  buttonText="Login"
                  textClass={"center"}
                  clickAction={() => handleOnClick("login")}
                />
                <Button
                  className={"Button login-btn signup-btn flex-end"}
                  buttonText="Signup"
                  textClass={"center"}
                  clickAction={handleOnClick}
                />
              </div>
            </div>
          ) : (
            <PageLoader />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Login;
