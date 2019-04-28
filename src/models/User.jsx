export default class User {
  constructor(user, token) {
    this.email = user.email;
    // when we get the web request back it is snake case
    // when we convert from storage obj json it is camel case
    // so need to check for either case
    this.firstName = user.first_name ? user.first_name : user.firstName;
    this.lastName = user.last_name ? user.last_name : user.lastName;
    this.id = user.id;
    this.token = token;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromJson(userJson) {
    return new User(userJson, userJson.token);
  }
}
