export const placesList = document.querySelector('.places__list');
export const popups = document.querySelectorAll('.popup');
export const popupEditCard = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupChangeAvatar = document.querySelector('.popup_change_avatar');
export const imageProfile = document.querySelector('.profile__image');
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupImg = imagePopup.querySelector('.popup__image');
export const imagePopupTitle = imagePopup.querySelector('.popup__caption');

export const profileAddButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');

export const formEditElement = document.forms['edit-profile'];
export const nameInput = formEditElement.elements['name'];
export const jobInput = formEditElement.elements['description'];

export const nameProfile = document.querySelector('.profile__title');
export const descriptionProfile = document.querySelector('.profile__description');

export const formAddElement = document.forms['new-place'];
export const placeNameInput = formAddElement.elements['place-name'];
export const linkInput = formAddElement.elements['link'];

export const formAddAvatar = document.forms['new-avatar'];
export const linkAvatar = formAddAvatar.elements['link-avatar'];

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
