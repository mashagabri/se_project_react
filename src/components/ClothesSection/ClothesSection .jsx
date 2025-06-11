import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleAddClick, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2>Your items</h2>
        <button onClick={handleAddClick}>+ Add new</button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
