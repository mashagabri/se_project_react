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
import { Routes, Route } from "react-router-dom";
import {
  CurrentTemperatureUnitContext,
  CurrentTemperatureProvider,
} from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: 0, C: 0 },
    city: "",
  });
  const [activeSendButton, setActiveSendButton] = useState(false);

  const [clothingItems, setClothingItems] = useState([]);

  const [inputName, setInputName] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [selectWeatherType, setSelectWeatherType] = useState("hot");

  const mainLink = "/";
  const profileLink = "/profile";

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
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
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

  function enableSendButton() {
    setActiveSendButton(true);
  }

  function disableSendButton() {
    setActiveSendButton(false);
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  function setDataInput() {
    checkDisabledButton();
  }

  function handleAddNewItem(newItem) {
    addItem(newItem)
      .then(() => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        setInputName("");
        setInputImage("");
        setSelectWeatherType("hot");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSendForm(e) {
    e.preventDefault();
    const newItem = {
      _id: 1 + clothingItems[clothingItems.length - 1]._id,
      name: inputName,
      weather: selectWeatherType,
      link: inputImage,
    };

    handleAddNewItem(newItem);
  }

  function checkDisabledButton() {
    if (inputName && inputImage) {
      enableSendButton();
    } else {
      disableSendButton();
    }
  }

  function handleOpenFormDeleteItem() {
    setActiveModal("Delete item");
  }

  function handleDeleteItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemId = formData.get("itemId");
    deleteItem(itemId)
      .then(() => {
        setClothingItems(
          clothingItems.filter((el) => {
            return el._id != itemId;
          })
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleInputName = (e) => {
    const value = e.target.value;
    setInputName(value);
    checkDisabledButton();
  };

  const handleInputImage = (e) => {
    const value = e.target.value;
    setInputImage(value);
    checkDisabledButton();
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const modalWithForm = (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={activeModal === "add-garment"}
      activeSendButton={activeSendButton}
      onClose={closeActiveModal}
      onSubmit={handleSendForm}
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

  return (
    <div className="page">
      <CurrentTemperatureProvider>
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            mainLink={mainLink}
            profileLink={profileLink}
          />
          <Routes>
            <Route
              path={mainLink}
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path={profileLink}
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            handleOpenFormDeleteItem={handleOpenFormDeleteItem}
          />
          <DeleteItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "Delete item"}
            handleDeleteItem={handleDeleteItem}
            itemId={selectedCard._id}
          />
          {modalWithForm}
          <Footer />
        </div>
      </CurrentTemperatureProvider>
    </div>
  );
}

export default App;
