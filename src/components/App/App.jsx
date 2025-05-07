import "./App.css";
import "../../vendor/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: 0, C: 0 },
    city: "",
  });
  const [activeSendButton, setActiveSendButton] = useState(false);

  function enableSendButton() {
    setActiveSendButton(true);
  }

  function disableSendButton() {
    setActiveSendButton(false);
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  function setDataInput(input) {
    if (input.value) {
      enableSendButton();
    }
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((weatherData) => {
        setWeatherData(weatherData);
      })
      .catch((err) => {
        console.log("Problem with weather api: " + err);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) {
      return;
    }
    function catchEscape(e) {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    }

    function clickOutside(e) {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    }

    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("keydown", catchEscape);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("keydown", catchEscape);
    };
  }, [activeModal, closeActiveModal]);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
        />
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          activeSendButton={activeSendButton}
          onClose={closeActiveModal}
          handleCardClick={handleCardClick}
        >
          <span id="name-error" className="error-input"></span>
          <label className="modal__label" htmlFor="name">
            Name{""}
            <input
              onBlur={(e) => setDataInput(e.target)}
              className="modal__input"
              type="text"
              id="name"
              placeholder="Name"
            ></input>
          </label>
          <span id="imageUrl-error" className="error-input"></span>
          <label className="modal__label" htmlFor="imageUrl">
            Image{""}
            <input
              onBlur={(e) => setDataInput(e.target)}
              className="modal__input"
              type="url"
              id="imageUrl"
              placeholder="Image URL"
            ></input>
          </label>

          <fieldset id="weather-type" className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>

            <label
              className="modal__label modal__label_type_radio"
              htmlFor="hot"
            >
              <input
                id="hot"
                value="hot"
                name="weatherType"
                className="modal__radio-input"
                type="radio"
                defaultChecked
              />
              <span className="modal__radio-text">Hot</span>
            </label>
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="warm"
            >
              <input
                id="warm"
                value="warm"
                name="weatherType"
                className="modal__radio-input"
                type="radio"
              />
              <span className="modal__radio-text">Warm</span>
            </label>
            <label
              className="modal__label modal__label_type_radio"
              htmlFor="cold"
            >
              <input
                id="cold"
                value="cold"
                name="weatherType"
                className="modal__radio-input"
                type="radio"
              />
              <span className="modal__radio-text">Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>

        <Footer />
      </div>
    </div>
  );
}

export default App;
