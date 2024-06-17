import '../pages/index.css';
import { createCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closePopupByOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, editProfile, getInitialCards, addCard, deleteCard, changeAvatar } from "../components/api.js";
import { handleSubmit } from '../utils/utils.js';
import {
  placesList, popups, popupEditCard, popupNewCard, popupChangeAvatar, imageProfile,
  imagePopup, imagePopupImg, imagePopupTitle, profileAddButton,
  profileEditButton, formEditElement, nameInput, jobInput, nameProfile, descriptionProfile,
  formAddElement, placeNameInput, linkInput, formAddAvatar, linkAvatar, validationSettings
} from '../utils/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      nameProfile.textContent = userInfo.name;
      descriptionProfile.textContent = userInfo.about;
      imageProfile.style.backgroundImage = `url(${userInfo.avatar})`;

      cards.forEach(card => {
        const checkCard = userInfo._id === card.owner._id;
        const checkLikeCard = card.likes.some(like => like._id === userInfo._id);
        const cardElement = createCard(card, openDeletePopup, likeCard, openImagePopup, checkCard, checkLikeCard);
        placesList.append(cardElement);
      });
    })
    .catch(console.error);

  popups.forEach(popup => {
    popup.addEventListener('click', closePopupByOverlay);
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
      closeModal(popup);
    });
  });

  profileAddButton.addEventListener('click', () => {
    clearValidation(popupNewCard, validationSettings);
    openModal(popupNewCard);
  });

  profileEditButton.addEventListener('click', () => {
    populateProfileInputs();
    clearValidation(popupEditCard, validationSettings);
    openModal(popupEditCard);
  });

  imageProfile.addEventListener('click', () => {
    clearValidation(popupChangeAvatar, validationSettings);
    openModal(popupChangeAvatar);
  });

  enableValidation(validationSettings);
});

function openImagePopup(cardName, cardLink) {
  imagePopupImg.src = cardLink;
  imagePopupImg.alt = `Изображение ${cardName}`;
  imagePopupTitle.textContent = cardName;
  openModal(imagePopup);
}

function openDeletePopup(cardElement, card) {
  const deletePopup = document.querySelector('.popup_delete_card');
  if (!deletePopup) {
    return;
  }

  let deleteButton = deletePopup.querySelector('.popup__button');
  if (!deleteButton) {
    return;
  }

  const newDeleteButton = deleteButton.cloneNode(true);
  deleteButton.parentNode.replaceChild(newDeleteButton, deleteButton);

  openModal(deletePopup);

  newDeleteButton.addEventListener('click', () => {
    deleteCard(card._id)
      .then(res => {
        cardElement.remove();
        closeModal(deletePopup);
      })
      .catch(console.error);
  });
}

function populateProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
}

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return editProfile(nameInput.value, jobInput.value).then((userData) => {
      nameProfile.textContent = userData.name;
      descriptionProfile.textContent = userData.about;
      closeModal(popupEditCard);
    });
  }
  handleSubmit(makeRequest, evt, "Сохранение...",);
}

formEditElement.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  function makeRequest() {
    return addCard(placeNameInput.value, linkInput.value).then((card) => {
      const newCardElement = createCard(card, openDeletePopup, likeCard, openImagePopup, true, false);
      placesList.prepend(newCardElement);
      closeModal(popupNewCard);
    });
  }
  handleSubmit(makeRequest, evt, "Сохранение...",);
}

formAddElement.addEventListener('submit', handleAddCardSubmit);

function handleAddAvatarSubmit(evt) {
  function makeRequest() {
    return changeAvatar(linkAvatar.value).then(() => {
      imageProfile.style.backgroundImage = `url(${linkAvatar.value})`;
      closeModal(popupChangeAvatar);
    });
  }
  handleSubmit(makeRequest, evt, "Сохранение...",);
}

formAddAvatar.addEventListener('submit', handleAddAvatarSubmit);
