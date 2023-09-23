class Auth {
  constructor({ link }) {
    this.link = link;
  }

  _checkTheApiResponse(res) {
    if (!res.ok) {
      throw new Error(`${res.status} error!`);
    }
    return res.json();
  }

  validateUserToken(token) {
    return fetch(`${this.link}/users/me`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkTheApiResponse)
      .then((data) => {
        localStorage.setItem('jwt', token);
        return data;
      });
  }

  async registerUser({ newEmail, newPassword }) {
    return await fetch(`${this.link}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword, email: newEmail })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  async userLogin({ newEmail, newPassword }) {
    const response = await fetch(`${this.link}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword, email: newEmail })
    });

    const data = await this._checkTheApiResponse(response);
    return await this.validateUserToken(data.token);
  }

};

const auth = new Auth({ link: 'http://localhost:3001' });

export default auth;