const cardTemplate = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');

function addCard(link, description, deleteCardCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardDescription = cardElement.querySelector('.card__description');
    const cardDescriptionTitle = cardDescription.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImg.src = link;
    cardDescriptionTitle.textContent = description;
    deleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
    placesList.append(cardElement);
}

function deleteCard(cardElement) {
    cardElement.remove();
}

document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function (elem) {
        addCard(elem.link, elem.name, deleteCard);
    })
});
