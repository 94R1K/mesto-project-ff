export function createCard(card, deleteCardCallback, likeCardCallback, openImagePopupCallback, checkCard) {
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
  likeButton.addEventListener('click', () => likeCardCallback(likeButton));
  if (!checkCard) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCardCallback(card._id)
      .then(res => cardElement.remove())
      .catch(err => console.error(err));
    });
  }

  return cardElement;
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
