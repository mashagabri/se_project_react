import { createContext, useEffect, useState } from "react";
import { getUserInformation } from "../utils/api";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const getData = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      await getUserInformation()
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          setCurrentUser(null);
        })
        .finally(() => {
          setLoading(true);
        });
    } else {
      console.log("not found token");
      setLoggedIn(false);
      setCurrentUser(null);
      setLoading(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logOut = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };
  if (!loading) {
    return <div>loading</div>;
  }
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, loggedIn, setLoggedIn, logOut, getData }}
    >
      <div className="page">{children}</div>
    </CurrentUserContext.Provider>
  );
};
