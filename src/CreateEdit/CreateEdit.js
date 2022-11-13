/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Button from "../utils/Button/Button";
import Input from "../utils/Input/Input";
import PageLoader from "../utils/Loader/Loader";
import Textarea from "../utils/Textarea/Textarea";
import "./CreateEdit.scss";
import editIntro from "../assets/editBg.mp4";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { loadCreds, getBaseURL } from "../utils/utils";
import axios from "axios";

const CreateEdit = ({
  activeState = "help",
  title = "",
  subtitle = "",
  description = "",
  paragraph = "",
  image = "",
  altText = "",
}) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const initialFormData = {
    _id: "",
    title: "",
    subtitle: "",
    description: "",
    paragraph: "",
    image: "",
    altText: "",
    type: "",
  };
  const [formInfo, setformInfo] = useState(initialFormData);
  const [userName, setuserName] = useState("Dummy");
  const [isLoading, setIsLoading] = useState(false);
  const [createState, setcreateState] = useState(activeState || "help");
  const [activeHelpState, setactiveHelpState] = useState(true);
  const creds = loadCreds();
  useEffect(() => {
    // eslint-disable-next-line
    setuserName(creds.email);
    if (location.pathname.includes("edit")) {
      setIsLoading(true);
      const type = id.split("-")[0];
      const _id = id.split("-")[1];
      if (!(type && _id)) {
        history.push("/create");
      }
      if (type === "faq") {
        setactiveHelpState(false);
      }
      console.log("Edit Post", type, _id);
      axios
        .get(`${window.__RUNTIME_CONFIG__.API_HOST}/v1/post/${type}-${_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${creds.token}`,
          },
        })
        .then(({ data }) => {
          console.log("Posts Response", data);
          setIsLoading(false);
          setformInfo(data);
        })
        .catch((err) => {
          console.log("Some Error while login", err);
          setIsLoading(false);
        });
    } else {
      setformInfo({
        title,
        subtitle,
        description,
        image,
        altText,
        paragraph,
        type: activeHelpState ? "help" : "faq",
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleCreateClick = () => {
    console.log('Active Help', activeHelpState);
    setcreateState(!activeHelpState ? "Help" : "Faq");
    setformInfo({ ...formInfo, type: !activeHelpState ? "Help" : "Faq" });
    setactiveHelpState(!activeHelpState);
  };
  const handleCreateChange = (field, value) => {
    Object.keys(formInfo).forEach((key) => {
      if (key === field) {
        formInfo[key] = value;
        setformInfo(formInfo);
      }
    });
  };
  const handleSubmitClick = () => {
    setIsLoading(true);
    if (location.pathname.includes("edit")) {
      axios
        .put(
          `${window.__RUNTIME_CONFIG__.API_HOST}/v1/post`,
          { ...formInfo },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${creds.token}`,
            },
          },
        )
        .then(({ data }) => {
          console.log("Posts Response", data);
          setIsLoading(false);
          history.push("/view");
        })
        .catch((err) => {
          console.log("Some Error while login", err);
          setIsLoading(false);
        });
    } else {
      axios
        .post(
          `${window.__RUNTIME_CONFIG__.API_HOST}/v1/post`,
          { ...formInfo },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${creds.token}`,
            },
          },
        )
        .then(({ data }) => {
          console.log("Posts Response", data);
          setIsLoading(false);
          history.push("/view");
        })
        .catch((err) => {
          console.log("Some Error while login", err);
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <Header
        activeState={`${location.pathname.includes("create") ? "create" : ""}`}
        userName={userName}
      />
      <div className="flex center create-wrapper">
        <video playsInline autoPlay muted loop>
          <source src={editIntro}></source>
        </video>
        {isLoading ? (
          <PageLoader />
        ) : (
          <div className="flex create-parent column">
            {location.pathname === "/create" && (
              <div className="flex flex-end">
                <Button
                  className="Button create-btn"
                  buttonText={`Create ${createState}`}
                  clickAction={handleCreateClick}
                />
              </div>
            )}
            <h1 className="flex create-title">
              {location.pathname === "/create" ? "Create" : "Edit"}{" "}
              {!activeHelpState ? "Faq" : "Help"} Content
            </h1>
            <label className="title">
              Title<sup>*</sup>:{" "}
            </label>
            <Input
              id={id}
              onChange={handleCreateChange}
              placeholder="My Title"
              autoComplete={true}
              field="title"
              activeHelpState={activeHelpState}
              formInfo={formInfo}
            />
            {activeHelpState && (
              <>
                <label className="subtitle">Subtitle: </label>
                <Input
                  id={id}
                  onChange={handleCreateChange}
                  placeholder="My Subtitle"
                  autoComplete={true}
                  field="subtitle"
                  activeHelpState={activeHelpState}
                  formInfo={formInfo}
                />
                <label className="img-link">Image: </label>
                <Input
                  id={id}
                  onChange={handleCreateChange}
                  placeholder="Image Url"
                  autoComplete={true}
                  field="image"
                  activeHelpState={activeHelpState}
                  formInfo={formInfo}
                />
                <label className="alt-text">Image Text: </label>
                <Input
                  id={id}
                  onChange={handleCreateChange}
                  placeholder="Image Alt Text"
                  autoComplete={true}
                  field="altText"
                  activeHelpState={activeHelpState}
                  formInfo={formInfo}
                />{" "}
              </>
            )}
            <label className="description">
              Description<sup>*</sup>:{" "}
            </label>
            <Textarea
              id={id}
              onChange={handleCreateChange}
              showCount={true}
              placeholder="Description..."
              maxChars={360}
              field="description"
              activeHelpState={activeHelpState}
              formInfo={formInfo}
            />
            {activeHelpState && (
              <>
                <label className="paragraph">Paragraph: </label>
                <Textarea
                  id={id}
                  onChange={handleCreateChange}
                  showCount={true}
                  placeholder="Anything on your mind..."
                  maxChars={480}
                  field="paragraph"
                  activeHelpState={activeHelpState}
                  formInfo={formInfo}
                />{" "}
              </>
            )}
            <div className="flex flex-end submit-btn">
              <Button
                className="Button update-btn submit-btn"
                buttonText="Submit"
                clickAction={handleSubmitClick}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateEdit;
