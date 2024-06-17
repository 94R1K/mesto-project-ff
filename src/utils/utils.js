function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-bac-2',
  headers: {
    authorization: 'b1acc7f9-4d39-4ab8-bbf6-89ac25ad5eba',
    'Content-Type': 'application/json'
  }
};

export function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...config.headers,
      ...options.headers,
    },
  }).then(checkResponse);
}

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export function handleSubmit(request, evt, loadingText = "Сохранение...", callback) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

