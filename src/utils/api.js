// backend url
const baseUrl = "http://localhost:3001";

export async function signup({ name, email, avatar, password }) {
  return requestWithoutToken(
    `${baseUrl}/signup`,
    "POST",
    JSON.stringify({ name, email, avatar, password })
  );
}

export async function signin({ email, password }) {
  return requestWithoutToken(
    `${baseUrl}/signin`,
    "POST",
    JSON.stringify({ email, password })
  );
}

export async function getUserInformation() {
  return requestWithToken(`${baseUrl}/users/me`, "GET");
}

export async function updateUserInformation(name, avatar) {
  return requestWithToken(
    `${baseUrl}/users/me`,
    "PATCH",
    JSON.stringify({
      name,
      avatar,
    })
  );
}

export async function getItems() {
  return requestWithoutToken(`${baseUrl}/items`, "GET");
}

export async function addItem({ name, imageUrl, weather }) {
  return requestWithToken(
    `${baseUrl}/items`,
    "POST",
    JSON.stringify({ name, imageUrl, weather })
  );
}

export async function deleteItem(id) {
  return requestWithToken(`${baseUrl}/items/${id}`, "DELETE");
}

export async function likeClothingItem(itemId) {
  return requestWithToken(`${baseUrl}/items/${itemId}/likes`, "PUT");
}

export async function dislikeClothingItem(itemId) {
  return requestWithToken(`${baseUrl}/items/${itemId}/likes`, "DELETE");
}

async function requestWithToken(url, method, body = null) {
  const token = localStorage.getItem("jwt") ?? "";
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  if (body) {
    options["body"] = body;
  }
  return fetch(url, options)
    .then(checkResponse)
    .catch((e) => {
      return Promise.reject(e);
    });
}

async function requestWithoutToken(url, method, body) {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body,
  })
    .then(checkResponse)
    .catch((e) => {
      return Promise.reject(e);
    });
}

export function checkResponse(res) {
  // console.log(res);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}
