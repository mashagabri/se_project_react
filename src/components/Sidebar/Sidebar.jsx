import avatar from "../../assets/avatar.svg";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
