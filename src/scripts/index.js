import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closePopupByOverlay } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach(function (elem) {
    const cardElement = createCard(elem.link, elem.name, deleteCard, likeCard, openImagePopup);
    placesList.append(cardElement);
  });

  popups.forEach(popup => {
    popup.addEventListener('click', closePopupByOverlay);

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
      closeModal(popup);
    });
  });

  const profileAddButton = document.querySelector('.profile__add-button');
  const profileEditButton = document.querySelector('.profile__edit-button');

  profileAddButton.addEventListener('click', () => openModal(popupNewCard));
  profileEditButton.addEventListener('click', () => {
    populateProfileInputs();
    openModal(popupEditCard);
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

function populateProfileInputs() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closeModal(popupEditCard);
}

formEditElement.addEventListener('submit', handleFormEditSubmit);


const formAddElement = document.forms['new-place'];
const placeNameInput = formAddElement.elements['place-name'];
const linkInput = formAddElement.elements['link'];

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCardElement = createCard(linkInput.value, placeNameInput.value, deleteCard, likeCard, openImagePopup);
  placesList.prepend(newCardElement);
  formAddElement.reset();
  closeModal(popupNewCard);
}

formAddElement.addEventListener('submit', handleFormAddSubmit);