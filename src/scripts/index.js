import '../pages/index.css';
import { createCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closePopupByOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, editProfile, getInitialCards, addCard, deleteCard, changeAvatar } from "../components/api";

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupChangeAvatar = document.querySelector('.popup_change_avatar')
const imageProfile = document.querySelector('.profile__image');

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

  const profileAddButton = document.querySelector('.profile__add-button');
  const profileEditButton = document.querySelector('.profile__edit-button');

  profileAddButton.addEventListener('click', () => {
    clearValidation(popupNewCard, {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled'
    });
    openModal(popupNewCard);
  });

  profileEditButton.addEventListener('click', () => {
    populateProfileInputs();
    clearValidation(popupEditCard, {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled'
    });
    openModal(popupEditCard);
  });

  imageProfile.addEventListener('click', () => {
    clearValidation(popupChangeAvatar, {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled'
    });
    openModal(popupChangeAvatar);
  });

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

});

function updateButtonText(button, text) {
  button.textContent = text;
  button.disabled = text === 'Сохранение...';
}


function openImagePopup(cardElement) {
  const cardImg = cardElement.querySelector('.card__image');
  const cardDescription = cardElement.querySelector('.card__description');
  const imagePopup = document.querySelector('.popup_type_image');
  const imagePopupImg = imagePopup.querySelector('.popup__image');
  const imagePopupTitle = imagePopup.querySelector('.popup__caption');
  imagePopupImg.src = cardImg.src;
  imagePopupImg.alt = `Изображение ${cardDescription.textContent}`;
  imagePopupTitle.textContent = cardDescription.textContent;
  openModal(imagePopup);
}

function openDeletePopup(cardElement, card) {
  const deletePopup = document.querySelector('.popup_delete_card');
  const deleteButton = deletePopup.querySelector('.popup__button');
  openModal(deletePopup);

  deleteButton.addEventListener('click', () => {
    deleteCard(card._id)
      .then(res => {
        cardElement.remove();
        closeModal(deletePopup);
      })
      .catch(err => console.error(err));
  })
}

const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement.elements['name'];
const jobInput = formEditElement.elements['description'];

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

function populateProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const submitButton = formEditElement.querySelector('.popup__button');
  updateButtonText(submitButton, 'Сохранение...');

  editProfile(nameInput.value, jobInput.value)
    .then(userInfo => {
      nameProfile.textContent = userInfo.name;
      descriptionProfile.textContent = userInfo.about;

      updateButtonText(submitButton, 'Сохранить');
      closeModal(popupEditCard);
    })
    .catch(err => console.error(err));
}

formEditElement.addEventListener('submit', handleFormEditSubmit);


const formAddElement = document.forms['new-place'];
const placeNameInput = formAddElement.elements['place-name'];
const linkInput = formAddElement.elements['link'];

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const submitButton = formAddElement.querySelector('.popup__button');
  updateButtonText(submitButton, 'Сохранение...');

  addCard(placeNameInput.value, linkInput.value)
    .then((card => {
      const newCardElement = createCard(card, openDeletePopup, likeCard, openImagePopup, true, false);
      placesList.prepend(newCardElement);
      formAddElement.reset();
      updateButtonText(submitButton, 'Сохранить');
      closeModal(popupNewCard);
    }))
    .catch(err => console.error(err));
}

formAddElement.addEventListener('submit', handleFormAddSubmit);


const formAddAvatar = document.forms['new-avatar'];
const linkAvatar = formAddAvatar.elements['link-avatar'];

function handleFormAddAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = formAddAvatar.querySelector('.popup__button');
  updateButtonText(submitButton, 'Сохранение...');

  changeAvatar(linkAvatar.value)
    .then((res => {
      imageProfile.style.backgroundImage = `url(${linkAvatar.value})`;
      formAddAvatar.reset();
      updateButtonText(submitButton, 'Сохранить');
      closeModal(popupChangeAvatar);
    }))
    .catch(err => console.error(err));
}

formAddAvatar.addEventListener('submit', handleFormAddAvatarSubmit);