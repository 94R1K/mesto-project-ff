import { likeCardApi, dislikeCard } from "./api";

export function createCard(card, deleteCardCallback, likeCardCallback, openImagePopupCallback, checkCard, checkLikeCard) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDescription = cardElement.querySelector('.card__description');
  const cardDescriptionTitle = cardDescription.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImg.alt = `Изображение ${card.name}`;
  cardImg.src = card.link;
  cardImg.addEventListener('click', () => openImagePopupCallback(cardElement));
  cardDescriptionTitle.textContent = card.name;
  likeCount.textContent = card.likes.length;
  likeButton.addEventListener('click', () => likeCardCallback(likeButton, likeCount, card));
  if (!checkCard) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => deleteCardCallback(cardElement, card));
  }

  if (checkLikeCard) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

export function likeCard(likeButton, likeCount, card) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    likeCardApi(card._id)
     .then(res => {
        likeButton.classList.add('card__like-button_is-active');
        card.likes = res.likes;
        likeCount.textContent = res.likes.length;
      })
     .catch(err => console.error(err));
  } else {
    dislikeCard(card._id)
     .then(res => {
        likeButton.classList.remove('card__like-button_is-active');
        card.likes = res.likes;
        likeCount.textContent = res.likes.length;
      })
     .catch(err => console.error(err));
  }
}
