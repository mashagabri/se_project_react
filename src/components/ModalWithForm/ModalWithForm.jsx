import "./ModalWithForm.css";
import { useState, useEffect } from "react";
import close from "../../assets/close.svg";

function ModalWithForm({
  title,
  buttonText,
  isOpen,
  activeSendButton,
  onClose,
  onSubmit,
  children,
}) {
  // useEffect(() => {
  //   clearModal();
  // }, []);

  // function clearModal() {
  //   for (let el of children) {
  //     console.log(el);
  //   }
  // }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_with-form">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close button" type="button" onClick={onClose}>
          <img src={close} alt="close" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            className={`button modal__sumbit${
              activeSendButton ? "" : " modal__sumbit_disabled"
            }`}
            type="submit"
            disabled={activeSendButton ? "" : "disabled"}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
