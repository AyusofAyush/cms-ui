const saveCreds = (loginCreds) => {
  if (localStorage) {
    localStorage.setItem("loginCreds", JSON.stringify(loginCreds));
  }
};

const removeCreds = () => {
  if (localStorage) {
    localStorage.removeItem("loginCreds");
  }
};

const verifyCreds = () => {
  const loginId = JSON.parse(localStorage.getItem("loginCreds"));
  if (!loginId) return false;
  return true;
};

const loadCreds = () => {
  const loginCreds = JSON.parse(localStorage.getItem("loginCreds"));
  return loginCreds;
};

const getBaseURL = () => {
  if (process.env.NODE_ENV !== "development") {
    return "cms-backend:8000";
  }
  return "http://localhost:8000";
};

export { saveCreds, removeCreds, verifyCreds, loadCreds, getBaseURL };
