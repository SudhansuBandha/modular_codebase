const clients = require("../../.../../../../../db/mongo");
const CreateOrUpdateCollection = require("../../../../shared/utils/createOrUpdateCollection");
const usersSchema = require("../schemas/users.schema");

class UsersFactory extends CreateOrUpdateCollection {
  constructor() {
    // super (schemaName, schema) is called in the parent class
    super("users", usersSchema);
    this.collectionName = "users";
    this.dbClient = clients["clubs"].db();
    this.dbCollection = this.dbClient.collection(this.collectionName);
  }

  async ensureUniqueIndexes() {
    try {
      const indexes = await this.dbCollection.indexes();
      const existingIndexNames = indexes.map((idx) => idx.name);

      // Create unique index on "email" if not already present
      if (!existingIndexNames.includes("email_1")) {
        await this.dbCollection.createIndex({ email: 1 }, { unique: true });
      }

      // Create unique index on "phone" if not already present
      if (!existingIndexNames.includes("phone_1")) {
        await this.dbCollection.createIndex({ phone: 1 }, { unique: true });
      }
    } catch (err) {
      console.error("Error creating unique indexes:", err.message);
    }
  }

  async write() {
    try {
      // First call the parent write method to create/update schema
      await super.write();
      // Now ensure unique indexes on email and phone
      await this.ensureUniqueIndexes();
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const users = await this.dbCollection.find({}).toArray();
      return users;
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
    }
  }

  async createOne(data) {
    try {
      const result = await this.dbCollection.insertOne(data);
      return result.ops[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async createMany(data) {
    try {
      const result = await this.dbCollection.insertMany(data);
      return result.insertedCount;
    } catch (error) {
      console.error("Error creating users:", error);
      throw error;
    }
  }
}

module.exports = UsersFactory;
