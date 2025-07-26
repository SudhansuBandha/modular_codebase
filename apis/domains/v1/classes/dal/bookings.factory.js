const clients = require("../../../../../db/mongo");
const CreateOrUpdateCollection = require("../../../../shared/utils/createOrUpdateCollection");
const bookingSchema = require("../schemas/bookings.schema");

class BookingFactory extends CreateOrUpdateCollection {
  constructor() {
    // super (schemaName, schema) is called in the parent class
    super("bookings", bookingSchema);
    this.collectionName = "bookings";
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
      const bookings = await this.dbCollection.find({}).toArray();
      return bookings;
    } catch (error) {
      console.error("Error retrieving clubs:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const data = await this.dbCollection.findOne({ _id: id });
      return data;
    } catch (error) {
      console.error(`Error retrieving ${this.collectionName} by ID:`, error);
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

module.exports = BookingFactory;
