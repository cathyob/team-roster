import User from '../models/User';

// creating this to share user if user refreshes tab or manually navigates within the tab
class Storage {
  constructor() {
    this.storage = sessionStorage;
  }

  setActiveUser(newUser) {
    this.storage.setItem('localUser', JSON.stringify(newUser));
  }

  getActiveUser() {
    const userJSON = this.storage.getItem('localUser');
    return User.fromJson(JSON.parse(userJSON));
  }

  clearActiveUser() {
    this.storage.setItem('localUser', null);
  }
}

export default new Storage();
