import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, mainLink, profileLink }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to={mainLink}>
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch valueLeft="F" valueRight="C" />
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">
          <Link className="header__link" to={profileLink}>
            Terrence Tegegne
          </Link>
        </p>
        <img
          className="header__avatar"
          src={avatar}
          alt="Terrence Tegegne"
        ></img>
      </div>
    </header>
  );
}
export default Header;
