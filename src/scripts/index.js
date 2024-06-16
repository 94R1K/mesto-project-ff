import '../pages/index.css';
import { createCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closePopupByOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, editProfile, getInitialCards, addCard, deleteCard, changeAvatar } from "../components/api.js";
import { handleSubmit } from '../components/utils.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupChangeAvatar = document.querySelector('.popup_change_avatar');
const imageProfile = document.querySelector('.profile__image');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__caption');
const deletePopup = document.querySelector('.popup_delete_card');
const deleteButton = deletePopup.querySelector('.popup__button');

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement.elements['name'];
const jobInput = formEditElement.elements['description'];

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const formAddElement = document.forms['new-place'];
const placeNameInput = formAddElement.elements['place-name'];
const linkInput = formAddElement.elements['link'];

const formAddAvatar = document.forms['new-avatar'];
const linkAvatar = formAddAvatar.elements['link-avatar'];

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
    .catch((err) => console.error(err));

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

function openImagePopup(cardElement) {
  const cardImg = cardElement.querySelector('.card__image');
  const cardDescription = cardElement.querySelector('.card__description');
  imagePopupImg.src = cardImg.src;
  imagePopupImg.alt = `Изображение ${cardDescription.textContent}`;
  imagePopupTitle.textContent = cardDescription.textContent;
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
      .catch(err => console.error(err));
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
    });
  }
  handleSubmit(makeRequest, evt, "Сохранение...", () => closeModal(popupEditCard));
}

formEditElement.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  function makeRequest() {
    return addCard(placeNameInput.value, linkInput.value).then((card) => {
      const newCardElement = createCard(card, openDeletePopup, likeCard, openImagePopup, true, false);
      placesList.prepend(newCardElement);
    });
  }
  handleSubmit(makeRequest, evt, "Сохранение...", () => closeModal(popupNewCard));
}

formAddElement.addEventListener('submit', handleAddCardSubmit);

function handleAddAvatarSubmit(evt) {
  function makeRequest() {
    return changeAvatar(linkAvatar.value).then(() => {
      imageProfile.style.backgroundImage = `url(${linkAvatar.value})`;
    });
  }
  handleSubmit(makeRequest, evt, "Сохранение...", () => closeModal(popupChangeAvatar));
}

formAddAvatar.addEventListener('submit', handleAddAvatarSubmit);
