import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
  handleEditProfileClick,
  handleLikeClick,
}) {
  const currentUserContext = useContext(CurrentUserContext);
  const loggedIn = currentUserContext.loggedIn;
  if (!loggedIn) {
    window.location.href = "https://www.mariazackwtwr.jumpingcrab.com/";
    // window.location.href = window.location.origin;
  }
  return (
    <section className="profile">
      <SideBar handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        handleLikeClick={handleLikeClick}
      />
    </section>
  );
}

export default Profile;
