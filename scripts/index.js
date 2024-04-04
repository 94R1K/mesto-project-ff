// @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template').content;
// @todo: DOM узлы


// @todo: Функция создания карточки

function addCard(link, description) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    let cardImg = cardElement.querySelector('.card__image');
    let cardDescription = cardElement.querySelector('.card__description');
    let cardDescriptionTitle = cardDescription.querySelector('.card__title');
    cardImg.src = link;
    cardDescriptionTitle.textContent = description;
}
document.addEventListener('DOMContentLoaded', function() {
    initialCards.forEach(function (elem) {
        addCard(elem.link, elem.name);
    })
});
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
