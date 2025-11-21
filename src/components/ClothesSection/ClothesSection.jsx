import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  clothingItems,
  handleAddClick,
  handleCardClick,
  handleLikeClick,
}) {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext.currentUser ?? {};
  const filteredItems = clothingItems.filter((item) => {
    return currentUser._id === item.owner;
  });
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="header__text">Your items</h2>
        <button className="button header__add-button" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
            handleLikeClick={handleLikeClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
