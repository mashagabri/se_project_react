import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  isOpen,
  onClose,
  onSubmit,
  activeSendButton,
  inputName,
  inputImage,
  selectWeatherType,
  handleInputName,
  handleInputImage,
  setSelectWeatherType,
}) {
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      activeSendButton={activeSendButton}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <span id="name-error" className="error-input"></span>
      <label className="modal__label" htmlFor="name">
        Name{""}
        <input
          onBlur={(e) => handleInputName(e)}
          onInput={(e) => handleInputName(e)}
          className="modal__input"
          type="text"
          id="name"
          placeholder="Name"
          value={inputName}
        ></input>
      </label>
      <span id="imageUrl-error" className="error-input"></span>
      <label className="modal__label" htmlFor="imageUrl">
        Image{""}
        <input
          onBlur={(e) => handleInputImage(e)}
          onInput={(e) => handleInputImage(e)}
          className="modal__input"
          type="url"
          id="imageUrl"
          placeholder="Image URL"
          value={inputImage}
        ></input>
      </label>

      <fieldset id="weather-type" className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__label modal__label_type_radio" htmlFor="hot">
          <input
            onChange={() => {
              setSelectWeatherType("hot");
            }}
            id="hot"
            value="hot"
            name="weatherType"
            className="modal__radio-input"
            type="radio"
            checked={selectWeatherType === "hot"}
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label className="modal__label modal__label_type_radio" htmlFor="warm">
          <input
            onChange={() => {
              setSelectWeatherType("warm");
            }}
            id="warm"
            value="warm"
            name="weatherType"
            className="modal__radio-input"
            type="radio"
            checked={selectWeatherType === "warm"}
          />
          <span className="modal__radio-text">Warm</span>
        </label>
        <label className="modal__label modal__label_type_radio" htmlFor="cold">
          <input
            onChange={() => {
              setSelectWeatherType("cold");
            }}
            id="cold"
            value="cold"
            name="weatherType"
            className="modal__radio-input"
            type="radio"
            checked={selectWeatherType === "cold"}
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
