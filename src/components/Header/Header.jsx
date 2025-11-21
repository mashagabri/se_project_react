import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  // mainLink,
  // profileLink,
  handleSignUpClick,
  handleLoginClick,
}) {
  const userContext = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(() => {
    const currentUser = userContext.currentUser;
    if (currentUser) {
      return currentUser.name;
    }
    return "";
  });

  const [userAvatar, setUserAvatar] = useState(() => {
    const currentUser = userContext.currentUser;
    if (currentUser) {
      return currentUser.avatar;
    }
    return "";
  });

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const showDataNotLoggedIn = () => {
    return (
      <>
        <button
          className="header__sign-up-btn button button_link"
          type="button"
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
        <button
          className="header__login-btn button button_link"
          type="button"
          onClick={handleLoginClick}
        >
          Log In
        </button>
      </>
    );
  };
  const showDataLoggedIn = () => {
    return (
      <>
        <button
          className="header__add-clothes-btn button"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">
            <Link
              className="header__link"
              // to={profileLink}
              to="/profile"
            >
              {userContext?.currentUser?.name ?? ""}
            </Link>
          </p>

          {userAvatar ? (
            <img className="header__avatar" src={userAvatar} alt="avatar"></img>
          ) : (
            <span className="header__default-avatar">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link
          to="/"
          // to={mainLink}
        >
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch valueLeft="F" valueRight="C" />
        {userContext.loggedIn ? showDataLoggedIn() : showDataNotLoggedIn()}
      </div>
    </header>
  );
}
export default Header;
