import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  buttonText,
  children,
  onClose,
  activeSendButton,
  activeModal,
}) {
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
      className={`modal ${
        activeModal === "add-garment" ? "modal__opened" : ""
      }`}
      onClick={clickOutside}
    >
      <div className="modal__container modal__container_with-form">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          X
        </button>
        <form className="modal__form">
          {children}
          <button
            className={`modal__sumbit${
              activeSendButton ? "" : " modal__sumbit_disabled"
            }`}
            type="submit"
            disabled
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
