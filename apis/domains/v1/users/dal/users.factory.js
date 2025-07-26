export class UsersFactory {
  constructor(client, collection) {
    this.dbClient = client[collection];
  }

  async getAllUsers() {
    const data = await this.dbClient
      .db()
      .collection("users")
      .find({})
      .toArray();
    return data;
  }
}
