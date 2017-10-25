class Player {
  id;
  username;
  pwd;
  hand = [];
  money;

  constructor(id, username, pwd, money) {
    this.id = id;
    this.username = username;
    this.pwd = pwd;
    this.money = money;
  }

  constructor(id, username, pwd) {
    this.id = id;
    this.username = username;
    this.pwd = pwd;
  }
}

module.exports = {
    player: Player,
};