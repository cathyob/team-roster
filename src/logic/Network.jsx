import axios from 'axios';

const URL = 'https://players-api.developer.alchemy.codes/';

class Network {
  constructor() {
    this.network = axios.create({
      baseURL: URL,
    });
  }

  registerUser(firstName, lastName, email, password, confirmPassword) {
    // resolve parameter is a function to call when web request is done successfully
    // reject is called when there is an error with the call
    // body is the json body for the post action and contains the info passed in from the form
    // then will be called if the call completes
    // catch will be called if something keeps the call from completing e.g. no internet
    return new Promise((resolve, reject) => {
      const body = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: confirmPassword,
      };

      this.network.post('/api/user', body)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      const body = {
        email,
        password,
      };

      this.network.post('/api/login', body)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  addPlayer(firstName, lastName, rating, handedness, token) {
    return new Promise((resolve, reject) => {
      const body = {
        first_name: firstName,
        last_name: lastName,
        rating,
        handedness,
      };

      this.network.post('/api/players', body, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getPlayers(token) {
    return new Promise((resolve, reject) => {
      this.network.get('/api/players', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deletePlayer(id, token) {
    return new Promise((resolve, reject) => {
      this.network.delete(`/api/players/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

// whenever this is imported every page gets the same thing i.e. singleton
// only this page sets itself up so not determined by each page which could be incorrect
export default new Network();
