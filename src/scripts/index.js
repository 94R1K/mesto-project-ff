import '../pages/index.css';
import { createCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closePopupByOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, editProfile, getInitialCards, addCard, deleteCard } from "../components/api";

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      nameProfile.textContent = userInfo.name;
      descriptionProfile.textContent = userInfo.about;
      imageProfile.style.backgroundImage = `url(${userInfo.avatar})`;

      let checkCard = false;
      cards.forEach(card => {
        checkCard = userInfo._id === card.owner._id;
        const cardElement = createCard(card, deleteCard, likeCard, openImagePopup, checkCard);
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

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});


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

const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement.elements['name'];
const jobInput = formEditElement.elements['description'];

const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const imageProfile = document.querySelector('.profile__image');

function populateProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  editProfile(nameInput.value, jobInput.value)
    .then(userInfo => {
      nameProfile.textContent = userInfo.name;
      descriptionProfile.textContent = userInfo.about;
    })
    .catch(err => console.error(err));
  closeModal(popupEditCard);
}

formEditElement.addEventListener('submit', handleFormEditSubmit);


const formAddElement = document.forms['new-place'];
const placeNameInput = formAddElement.elements['place-name'];
const linkInput = formAddElement.elements['link'];

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  addCard(placeNameInput.value, linkInput.value)
    .then((card => {
      const newCardElement = createCard(card, deleteCard, likeCard, openImagePopup, false);
      placesList.prepend(newCardElement);
      formAddElement.reset();
      closeModal(popupNewCard);
    }))
}

formAddElement.addEventListener('submit', handleFormAddSubmit);