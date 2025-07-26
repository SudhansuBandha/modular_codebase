const clients = require("../../../../../db/mongo");
const CreateOrUpdateCollection = require("../../../../shared/utils/createOrUpdateCollection");
const sessionSchema = require("../schemas/sessions.schema");

class SessionFactory extends CreateOrUpdateCollection {
  constructor() {
    // super (schemaName, schema) is called in the parent class
    super("sessions", sessionSchema);
    this.collectionName = "sessions";
    this.dbClient = clients["clubs"].db();
    this.dbCollection = this.dbClient.collection(this.collectionName);
  }

  async ensureUniqueIndexes() {
    try {
      const indexes = await this.dbCollection.indexes();
      const existingIndexNames = indexes.map((idx) => idx.name);
    } catch (err) {
      console.error("Error creating unique indexes:", err.message);
    }
  }

  async write() {
    try {
      // First call the parent write method to create/update schema
      await super.write();
      //await this.ensureUniqueIndexes();
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const sessions = await this.dbCollection.find({}).toArray();
      return sessions;
    } catch (error) {
      console.error("Error retrieving clubs:", error);
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

module.exports = SessionFactory;
