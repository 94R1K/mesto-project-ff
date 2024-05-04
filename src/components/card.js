export function createCard(link, description, deleteCardCallback, likeCardCallback, imagePopupCallback) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDescription = cardElement.querySelector('.card__description');
  const cardDescriptionTitle = cardDescription.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImg.alt = `Изображение ${description}`;
  cardImg.src = link;
  cardImg.addEventListener('click', () => imagePopupCallback(cardElement));
  cardDescriptionTitle.textContent = description;
  deleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
  likeButton.addEventListener('click', () => likeCardCallback(cardElement));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}
