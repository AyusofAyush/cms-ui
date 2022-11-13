import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../Header/Header";
import PageLoader from "../utils/Loader/Loader";
import { loadCreds, getBaseURL } from "../utils/utils";
import ContentBox from "./ContentBox/ContentBox";
import "./View.scss";

const View = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [content, setcontent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setuserName] = useState("Dummy");
  const creds = loadCreds();
  useEffect(() => {
    refreshPage();
  }, [id]);

  const refreshPage = () => {
    setIsLoading(true);
    const activeState = !id ? "faq" : id;
    setuserName(creds.email);
    axios
      .get(`${window.__RUNTIME_CONFIG__.API_HOST}/v1/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${creds.token}`,
        },
        params: {
          type: activeState,
        },
      })
      .then(({ data }) => {
        console.log("Posts Response", data);
        setIsLoading(false);
        setcontent(data);
      })
      .catch((err) => {
        console.log("Some Error while login", err);
        setIsLoading(false);
      });
  };

  const handleUpdate = (id, type) => {
    history.push(`/edit/${type}-${id}`);
  };

  const handleDelete = (id, type) => {
    // API Call to delete this POST
    axios
      .delete(`${window.__RUNTIME_CONFIG__.API_HOST}/v1/post/${type}-${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${creds.token}`,
        },
      })
      .then(({ data }) => {
        console.log("Posts Response", data);
        setIsLoading(false);
        refreshPage();
      })
      .catch((err) => {
        console.log("Some Error while login", err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header userName={userName} activeState={id} />
      <div className="flex view-body">
        {isLoading && <PageLoader />}
        {content.map((elem) => {
          if (elem.type === "faq") {
            const { type, title, description, _id } = elem;
            return (
              <ContentBox
                key={_id}
                id={_id}
                activeState={type}
                title={title}
                description={description}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            );
          } else {
            const {
              type,
              title,
              image,
              subtitle,
              description,
              altText,
              paragraph,
              _id,
            } = elem;
            return (
              <ContentBox
                key={_id}
                id={_id}
                activeState={type}
                title={title}
                img={image}
                subtitle={subtitle}
                description={description}
                altText={altText}
                para={paragraph}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default View;
