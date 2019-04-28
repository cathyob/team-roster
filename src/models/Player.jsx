export default class Player {
  constructor(player) {
    this.id = player.id;
    this.firstName = player.first_name;
    this.lastName = player.last_name;
    this.rating = player.rating;
    this.handedness = player.handedness;
  }
}
