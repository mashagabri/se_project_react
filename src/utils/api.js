// backend url
const baseUrl = "http://localhost:3001";

export async function signup({ name, email, avatar, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, avatar, password }),
  })
    .then(checkResponse)
    .catch((e) => {
      return Promise.reject(e);
    });
}

export async function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .catch((e) => {
      return Promise.reject(e);
    });
}

export async function getUserInformation(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((e) => {
      return Promise.reject(e);
    });
}

export async function updateUserInformation(name, avatar) {
  const token = localStorage.getItem("jwt") ?? "";
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  })
    .then(checkResponse)
    .catch((e) => {
      return Promise.reject(e);
    });
}

export async function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export async function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt") ?? "";
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export async function deleteItem(id) {
  const token = localStorage.getItem("jwt") ?? "";
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export async function likeClothingItem(itemId) {
  const token = localStorage.getItem("jwt") ?? "";
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export async function dislikeClothingItem(itemId) {
  const token = localStorage.getItem("jwt") ?? "";
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function checkResponse(res) {
  // console.log(res);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}
