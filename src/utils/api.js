const baseUrl = "http://localhost:3001";

export async function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    })
    .then((data) => {
      return data;
    });
}

export async function addItem({ name, link, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, link, weather }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    })
    .then((data) => {
      return data;
    });
}

export async function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error ${res.status}`);
      }
    })
    .then((data) => {
      return data;
    });
}
