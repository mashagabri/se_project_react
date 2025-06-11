import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection ";

function Profile({ clothingItems, handleAddClick, handleCardClick }) {
  return (
    <section className="profile">
      <SideBar /> {}
      <ClothesSection
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}

export default Profile;
