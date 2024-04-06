const cardTemplate = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');

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

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function (elem) {
        const cardElement = createCard(elem.link, elem.name, deleteCard);
        placesList.append(cardElement);
    });
});
