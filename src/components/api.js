import { request } from "./utils.js";

export const getUserInfo = () => {
  return request('/users/me', {
    method: 'GET'
  });
}

export const editProfile = (name, about) => {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

export const getInitialCards = () => {
  return request('/cards', {
    method: 'GET'
  });
}

export const addCard = (name, link) => {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

export const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE'
  });
}

export const likeCardApi = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT'
  });
}

export const dislikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE'
  });
}

export const changeAvatar = (avatarUrl) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarUrl
    })
  });
}
