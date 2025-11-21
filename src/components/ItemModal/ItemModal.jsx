import "./ItemModal.css";
import close from "../../assets/close.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, isOpen, handleOpenFormDeleteItem }) {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext.currentUser ?? {};
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__container modal__container_item">
        <button className="modal__close button" onClick={onClose}>
          <img src={close} alt="close" />
        </button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__right">
            <button
              className={itemDeleteButtonClassName}
              onClick={handleOpenFormDeleteItem}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
