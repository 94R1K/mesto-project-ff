import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

function createCard(link, description, deleteCardCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDescription = cardElement.querySelector('.card__description');
  const cardDescriptionTitle = cardDescription.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImg.alt = `Изображение ${description}`;
  cardImg.src = link;
  cardDescriptionTitle.textContent = description;
  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function openModal(popup) {
  popup.style.display = 'flex';
  document.addEventListener('keydown', handleEsc);
}

function closeModal(popup) {
  popup.style.display = 'none';
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(event) {
  if (event.key === 'Escape') {
    popups.forEach(popup => {
      if (popup.style.display === 'flex') {
        closeModal(popup);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach(function (elem) {
      const cardElement = createCard(elem.link, elem.name, deleteCard);
      placesList.append(cardElement);
  });

  popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closeModal(popup);
      }
    });

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
      closeModal(popup);
    });
  });

  const profileAddButton = document.querySelector('.profile__add-button');
  const profileEditButton = document.querySelector('.profile__edit-button');

  profileAddButton.addEventListener('click', () => openModal(popupNewCard));
  profileEditButton.addEventListener('click', () => openModal(popupEditCard));
});


const formEditElement = document.forms['edit-profile'];

const nameInput = formEditElement.elements['name'];
const jobInput = formEditElement.elements['description'];

let nameProfile = document.querySelector('.profile__title');
let descriptionProfile = document.querySelector('.profile__description');

nameInput.value = nameProfile.textContent;
jobInput.value = descriptionProfile.textContent;


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
  const newCardElement = createCard(linkInput.value, placeNameInput.value, deleteCard);
  placesList.prepend(newCardElement);
  linkInput.value = '';
  placeNameInput.value ='';
  
  closeModal(popupNewCard);
}

formAddElement.addEventListener('submit', handleFormAddSubmit);