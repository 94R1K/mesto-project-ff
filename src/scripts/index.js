import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

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
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const popupEditCard = document.querySelector('.popup_type_edit');

  profileAddButton.addEventListener('click', () => openModal(popupNewCard));
  profileEditButton.addEventListener('click', () => openModal(popupEditCard));
});


// Находим форму в DOM
const formElement = document.forms['edit-profile']; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.elements.name; // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.elements.description; // Воспользуйтесь инструментом .querySelector()

const nameProfile = document.querySelector('.profile__title').textContent;
const descriptionProfile = document.querySelector('.profile__description').textContent;
nameInput.value = nameProfile;
jobInput.value = descriptionProfile;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
