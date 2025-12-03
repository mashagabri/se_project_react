import "./ItemCard.css";
import emptyHeart from "../../assets/empty_heart.svg";
import fullHeart from "../../assets/full_heart.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function ItemCard({ item, handleCardClick, handleLikeClick }) {
  const currentUser = useContext(CurrentUserContext).currentUser ?? {};
  const isLoggedInContext = useContext(CurrentUserContext).loggedIn;

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInContext);
  const isLiked = item.likes.some((_id) => _id === currentUser._id);
  useEffect(() => {
    setIsLoggedIn(isLoggedInContext);
  }, [isLoggedInContext]);

  return (
    <li className="card">
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>

        {isLoggedIn && (
          <img
            className="card__heart"
            src={isLiked ? fullHeart : emptyHeart}
            alt={isLiked ? "liked" : "disliked"}
            onClick={() => {
              handleLikeClick(item._id, isLiked);
            }}
          />
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => handleCardClick(item)}
      />
    </li>
  );
}
export default ItemCard;
