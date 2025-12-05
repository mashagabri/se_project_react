import "./App.css";
import "../../vendor/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { useState, useEffect, useContext } from "react";
import { getWeather } from "../../utils/weatherApi";
import { coordinates, ApiKey } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";
import { CurrentTemperatureProvider } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../../hooks/protectedRoute";
import {
  getItems,
  addItem,
  deleteItem,
  signup,
  signin,
  updateUserInformation,
  likeClothingItem,
  dislikeClothingItem,
} from "../../utils/api";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: 0, C: 0 },
    city: "",
  });
  const [activeSendButton, setActiveSendButton] = useState(false);
  const [activeSendRegistrationButton, setActiveSendRegistrationButton] =
    useState(false);
  const [activeSendLoginButton, setActiveSendLoginButton] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  const [inputName, setInputName] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [selectWeatherType, setSelectWeatherType] = useState("hot");
  const [inputUserName, setInputUserName] = useState("");
  const [inputAvatar, setInputAvatar] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [errorMessageRegistration, setErrorMessageRegistration] = useState("");
  const [errorMessageEditProfile, setErrorMessageEditProfile] = useState("");
  const [loginInputEmail, setLoginInputEmail] = useState("");
  const [loginInputPassword, setLoginInputPassword] = useState("");

  const [activeSendButtonEditProfile, setActiveSendButtonEditProfile] =
    useState(true);

  const [editProfileName, setEditProfileName] = useState(
    ""
    // currentUser.name ?? ""
  );
  const [editProfileAvatar, setEditProfileAvatar] = useState(
    ""
    // currentUser.avatar ?? ""
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mainLink = "/";
  const profileLink = "/profile";

  useEffect(() => {
    getWeather(coordinates, ApiKey)
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
        console.log("Problem with clothing api: " + err);
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

  useEffect(() => {
    checkDisabledButton();
  }, [inputName, inputImage]);

  useEffect(() => {
    checkEditProfileForm();
  }, [editProfileName, editProfileAvatar]);

  useEffect(() => {
    checkInputLoginEmailAndPassword();
  }, [loginInputEmail, loginInputPassword]);

  useEffect(() => {
    checkDisabledRegistrationButton();
  }, [inputUserName, inputEmail, inputAvatar, inputPassword]);

  function enableSendButton() {
    setActiveSendButton(true);
  }

  function disableSendButton() {
    setActiveSendButton(false);
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  function handleAddNewItem(newItem) {
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems((prev) => [createdItem, ...prev]);
        closeActiveModal();
        setInputName("");
        setInputImage("");
        setSelectWeatherType("hot");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardLike = (_id, isLiked) => {
    if (!isLiked) {
      likeClothingItem(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      dislikeClothingItem(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  function handleSendForm(e) {
    e.preventDefault();
    const newItem = {
      _id: clothingItems.length ? clothingItems[0]._id + 1 : 1,
      name: inputName,
      weather: selectWeatherType,
      imageUrl: inputImage,
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

  function checkDisabledRegistrationButton() {
    if (inputUserName && inputEmail && inputAvatar && inputPassword) {
      setActiveSendRegistrationButton(true);
    } else {
      setActiveSendRegistrationButton(false);
    }
  }

  function handleOpenFormDeleteItem() {
    setActiveModal("Delete item");
  }

  function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const avatar = formData.get("avatarUrl");
    const password = formData.get("password");
    signup({ name, email, avatar, password })
      .then(() => {
        setActiveModal("login");
      })
      .catch((e) => {
        if (e.status === 400) {
          setErrorMessageRegistration("Invalid data");
        } else if (e.status === 409) {
          setErrorMessageRegistration("User exists");
        } else {
          setErrorMessageRegistration("Error occured");
        }
      });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    await signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
        setIsLoggedIn(true);
        return Promise.resolve();
      })
      .catch((e) => {
        if (e.status === 400) {
          setErrorMessageRegistration("Invalid data");
        } else if (e.status === 401) {
          setErrorMessageRegistration("Incorrect password or email");
        } else {
          setErrorMessageRegistration("Error occured");
        }
        return Promise.reject();
      });
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
  };

  const handleInputImage = (e) => {
    const value = e.target.value;
    setInputImage(value);
  };

  const handleInputUserName = (e) => {
    const value = e.target.value;
    setInputUserName(value);
  };

  const handleInputEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);
  };

  const handleInputAvatar = (e) => {
    const value = e.target.value;
    setInputAvatar(value);
  };

  const handleInputPassword = (e) => {
    const value = e.target.value;
    setInputPassword(value);
  };

  const handleClickAdditionalButton = (e) => {
    setActiveModal("login");
  };

  const handleClickAdditionalSignUpButton = (e) => {
    setActiveModal("sign-up");
  };

  const handleInputLoginEmail = (e) => {
    setLoginInputEmail(e.target.value);
  };

  const handleInputLoginPassword = (e) => {
    setLoginInputPassword(e.target.value);
  };

  const checkInputLoginEmailAndPassword = () => {
    if (loginInputEmail && loginInputPassword) {
      setActiveSendLoginButton(true);
    } else {
      setActiveSendLoginButton(false);
    }
  };

  const checkEditProfileForm = () => {
    if (editProfileName && editProfileAvatar) {
      setActiveSendButtonEditProfile(true);
    } else {
      setActiveSendButtonEditProfile(false);
    }
  };

  async function handleSendFormEditProfile(e) {
    e.preventDefault();
    await updateUserInformation(editProfileName, editProfileAvatar)
      .then(() => {
        closeActiveModal();
        Promise.resolve();
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 400) {
          setErrorMessageEditProfile("Invalid data");
        } else if (err.status === 404) {
          setErrorMessageEditProfile("User not found");
        } else {
          setErrorMessageEditProfile("Error occured");
        }
        Promise.reject();
      });
  }

  const handleEditProfileName = (e) => {
    const currentName = e.target.value;
    setEditProfileName(currentName);
  };

  const handleEditProfileAvatar = (e) => {
    setEditProfileAvatar(e.target.value);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  return (
    <CurrentUserProvider>
      <CurrentTemperatureProvider>
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            // mainLink={mainLink}
            // profileLink={profileLink}
            // loggedIn={userContext.loggedIn}
            handleSignUpClick={handleSignUpClick}
            handleLoginClick={handleLoginClick}
          />
          <Routes>
            <Route
              path={mainLink}
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  handleLikeClick={handleCardLike}
                />
              }
            />

            <Route
              path={profileLink}
              element={
                <ProtectedRoute>
                  <Profile
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleLikeClick={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <RegisterModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            onSubmit={handleSignup}
            activeSendButton={activeSendRegistrationButton}
            inputName={inputUserName}
            inputAvatar={inputAvatar}
            inputEmail={inputEmail}
            inputPassword={inputPassword}
            handleInputName={handleInputUserName}
            handleInputAvatar={handleInputAvatar}
            handleInputEmail={handleInputEmail}
            handleInputPassword={handleInputPassword}
            clickAdditionalButton={handleClickAdditionalButton}
            errorMessage={errorMessageRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onSubmit={handleSignIn}
            activeSendButton={activeSendLoginButton}
            inputEmail={loginInputEmail}
            inputPassword={loginInputPassword}
            handleInputEmail={handleInputLoginEmail}
            handleInputPassword={handleInputLoginPassword}
            clickAdditionalButton={handleClickAdditionalSignUpButton}
            errorMessage={errorMessageRegistration}
          />
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
          <AddItemModal
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onSubmit={handleSendForm}
            activeSendButton={activeSendButton}
            inputName={inputName}
            inputImage={inputImage}
            selectWeatherType={selectWeatherType}
            handleInputName={handleInputName}
            handleInputImage={handleInputImage}
            setSelectWeatherType={setSelectWeatherType}
          />
          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            activeSendButton={activeSendButtonEditProfile}
            onSubmit={handleSendFormEditProfile}
            editProfileName={editProfileName}
            editProfileAvatar={editProfileAvatar}
            handleEditProfileName={handleEditProfileName}
            handleEditProfileAvatar={handleEditProfileAvatar}
            errorMessage={errorMessageEditProfile}
            setEditProfileName={setEditProfileName}
            setEditProfileAvatar={setEditProfileAvatar}
          />
          <Footer />
        </div>
      </CurrentTemperatureProvider>
    </CurrentUserProvider>
  );
}

export default App;
