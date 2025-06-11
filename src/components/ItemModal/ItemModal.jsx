import "./ItemModal.css";

function ItemModal({ card, onClose, isOpen, handleOpenFormDeleteItem }) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__container modal__container_item">
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__right">
            <p className="modal__delete" onClick={handleOpenFormDeleteItem}>
              Delete item
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
