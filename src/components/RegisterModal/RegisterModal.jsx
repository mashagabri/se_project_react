import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  activeSendButton,
  inputName,
  inputAvatar,
  inputEmail,
  inputPassword,
  handleInputName,
  handleInputAvatar,
  handleInputEmail,
  handleInputPassword,
  clickAdditionalButton,
  errorMessage,
}) {
  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      activeSendButton={activeSendButton}
      onClose={onClose}
      onSubmit={onSubmit}
      additionalButton="or Log In"
      clickAdditionalButton={clickAdditionalButton}
      errorMessage={errorMessage}
    >
      <span id="register-email-error" className="error-input"></span>
      <label className="modal__label" htmlFor="register-email">
        Email*{""}
        <input
          onBlur={(e) => handleInputEmail(e)}
          onInput={(e) => handleInputEmail(e)}
          className="modal__input"
          name="email"
          type="email"
          id="register-email"
          placeholder="Email"
          value={inputEmail}
          required={true}
        ></input>
      </label>
      <span id="register-password-error" className="error-input"></span>
      <label className="modal__label" htmlFor="register-password">
        Password*{""}
        <input
          onBlur={(e) => handleInputPassword(e)}
          onInput={(e) => handleInputPassword(e)}
          className="modal__input"
          name="password"
          type="password"
          id="register-password"
          placeholder="Password"
          value={inputPassword ?? ""}
          required={true}
        ></input>
      </label>
      <span id="register-name-error" className="error-input"></span>
      <label className="modal__label" htmlFor="register-name">
        Name *{""}
        <input
          onBlur={(e) => handleInputName(e)}
          onInput={(e) => handleInputName(e)}
          className="modal__input"
          name="name"
          type="text"
          id="register-name"
          placeholder="Name"
          value={inputName}
          required={true}
        ></input>
      </label>
      <span id="register-avatarUrl-error" className="error-input"></span>
      <label className="modal__label" htmlFor="register-avatarUrl">
        Avatar URL *{""}
        <input
          onBlur={(e) => handleInputAvatar(e)}
          onInput={(e) => handleInputAvatar(e)}
          className="modal__input"
          name="avatarUrl"
          type="url"
          id="register-avatarUrl"
          placeholder="Avatar URL"
          value={inputAvatar}
          required={true}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
