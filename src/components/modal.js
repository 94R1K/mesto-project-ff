export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(event) {
  const popups = document.querySelectorAll('.popup');
  if (event.key === 'Escape') {
    popups.forEach(popup => {
      if (popup.classList.contains('popup_is-opened')) {
        closeModal(popup);
      }
    });
  }
}
