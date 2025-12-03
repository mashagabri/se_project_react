import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

function EditProfileModal({
  onClose,
  isOpen,
  activeSendButton,
  onSubmit,
  editProfileName,
  editProfileAvatar,
  handleEditProfileName,
  handleEditProfileAvatar,
  errorMessage,
  setEditProfileName,
  setEditProfileAvatar,
}) {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext?.currentUser ?? {};
  useEffect(() => {
    if (currentUser) {
      setEditProfileName(currentUser.name);
      setEditProfileAvatar(currentUser.avatar);
    }
  }, []);

  async function onSubmitWithCheck(e) {
    await onSubmit(e).then(() => {
      currentUserContext.getData();
    });
  }
  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      activeSendButton={activeSendButton}
      onClose={onClose}
      onSubmit={onSubmitWithCheck}
      errorMessage={errorMessage}
    >
      <span id="edit-profile-name-error" className="error-input"></span>
      <label className="modal__label" htmlFor="edit-profile-name">
        Name *{""}
        <input
          onBlur={(e) => {
            handleEditProfileName(e);
          }}
          onInput={(e) => {
            handleEditProfileName(e);
          }}
          className="modal__input"
          name="name2"
          type="text"
          id="edit-profile-name"
          value={editProfileName ?? ""}
          required={true}
        ></input>
      </label>

      <span id="edit-profile-avatar-error" className="error-input"></span>
      <label className="modal__label" htmlFor="edit-profile-avatar">
        Avatar *{""}
        <input
          onBlur={(e) => handleEditProfileAvatar(e)}
          onInput={(e) => handleEditProfileAvatar(e)}
          className="modal__input"
          name="avatar2"
          type="url"
          id="edit-profile-avatar"
          value={editProfileAvatar ?? ""}
          required={true}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
