import "./DeleteItemModal.css";

function DeleteItemModal({ onClose, isOpen, handleDeleteItem, itemId }) {
  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__container modal__container_delete-item">
        <button className="modal__close button" onClick={onClose}>
          X
        </button>
        <div className="modal__header">
          <p className="modal__text">
            Are you sure you want to delete this item? <br /> This action is
            irreversible.
          </p>
        </div>
        <div className="modal__buttons_delete">
          <div className="modal__confirmation">
            <form onSubmit={handleDeleteItem}>
              <input type="hidden" name="itemId" value={itemId ?? ""} />
              <button className="modal__button button" type="submit">
                Yes, delete item
              </button>
            </form>
          </div>
          <div className="modal__cancel">
            <button className="modal__button button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteItemModal;
