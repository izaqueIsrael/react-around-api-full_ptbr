class Api {
  constructor({ link, token }) {
    this.token = token;
    this.link = link;
  }

  _checkTheApiResponse(res) {
    if (!res.ok) {
      return Promise.reject(`${res.status} error!`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.link}/users/me`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  getUserCards() {
    return fetch(`${this.link}/cards`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      }
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  setUserInfo({ newName, newAbout }) {
    return fetch(`${this.link}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ about: newAbout, name: newName })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  setUserAvatar(image) {
    return fetch(`${this.link}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: image })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  updateCard({ newName, newLink }) {
    return fetch(`${this.link}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: `${newLink}`, name: `${newName}` })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.link}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this.link}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this.link}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => this._checkTheApiResponse(res));
  }
}

const api = new Api({ link: 'http://localhost:3001', token: localStorage.getItem('jwt') });


export default api;