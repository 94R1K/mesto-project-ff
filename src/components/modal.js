export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export function closePopupByOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}
