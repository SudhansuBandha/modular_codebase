const clients = require("../../.../../../../../db/mongo");

class UsersFactory {
  constructor() {
    this.dbClient = clients["clubs"].db().collection("users");
  }

  async getAllUsers() {
    const data = await this.dbClient.find({}).toArray();
    return data;
  }
}

module.exports = UsersFactory;
