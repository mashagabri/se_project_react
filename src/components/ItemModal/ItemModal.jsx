import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ active, card, onClose }) {
  function clickOutside(e) {
    console.log(e.target.classList);
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  }

  useEffect(() => {
    function catchEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", catchEscape);
    return () => {
      document.removeEventListener("keydown", catchEscape);
    };
  }, []);
  return (
    <div
      className={`modal${active ? " modal__opened" : ""}`}
      onClick={clickOutside}
    >
      <div className="modal__container modal__container_item">
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
