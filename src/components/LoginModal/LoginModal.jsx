import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  activeSendButton,
  inputEmail,
  inputPassword,
  handleInputEmail,
  handleInputPassword,
  clickAdditionalButton,
  errorMessage,
}) {
  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      activeSendButton={activeSendButton}
      onClose={onClose}
      onSubmit={onSubmit}
      additionalButton="or Sign Up"
      clickAdditionalButton={clickAdditionalButton}
      errorMessage={errorMessage}
    >
      <span id="login-email-error" className="error-input"></span>
      <label className="modal__label" htmlFor="login-email">
        Email*{""}
        <input
          onBlur={(e) => handleInputEmail(e)}
          onInput={(e) => handleInputEmail(e)}
          className="modal__input"
          name="email"
          type="email"
          id="login-email"
          placeholder="Email"
          value={inputEmail}
          required={true}
        ></input>
      </label>
      <span id="login-password-error" className="error-input"></span>
      <label className="modal__label" htmlFor="login-password">
        Password*{""}
        <input
          onBlur={(e) => handleInputPassword(e)}
          onInput={(e) => handleInputPassword(e)}
          className="modal__input"
          name="password"
          type="password"
          id="login-password"
          placeholder="Password"
          value={inputPassword ?? ""}
          required={true}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
