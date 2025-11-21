import { useContext } from "react";
import "./Sidebar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick }) {
  const userContext = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={userContext.currentUser.avatar}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{userContext.currentUser.name}</p>
      </div>
      <p className="sidebar__change-data" onClick={handleEditProfileClick}>
        Change profile data
      </p>
      <button className="sidebar__log-out" onClick={userContext.logOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
