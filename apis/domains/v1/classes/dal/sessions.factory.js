const { ObjectId } = require("mongodb");
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

  async getById(id) {
    try {
      const data = await this.dbCollection.findOne({ _id: id });
      return data;
    } catch (error) {
      console.error(`Error retrieving ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  async findOne(query) {
    try {
      const data = await this.dbCollection.findOne(query);
      return data;
    } catch (error) {
      console.error(
        `Error retrieving ${this.collectionName} by details:`,
        error
      );
      throw error;
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

  async updateOne(id, data) {
    try {
      const result = await this.dbCollection.updateOne(
        { _id: id },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
          },
        }
      );

      return result;
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  }

  async addParticipant(id, data) {
    try {
      const result = await this.dbCollection.updateOne(
        { _id: id },
        {
          $addToSet: {
            participants: data,
          },
          $set: {
            updatedAt: new Date(),
          },
        }
      );

      return result;
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  }

  async createMany(data) {
    try {
      const result = await this.dbCollection.insertMany(data);
      return result.insertedIds;
    } catch (error) {
      if (error.name === "BulkWriteError" && Array.isArray(error.writeErrors)) {
        console.error("Validation failed for some documents:");
        error.writeErrors.forEach((writeErr, index) => {
          const errDetails =
            writeErr.err &&
            writeErr.err.errInfo?.details?.schemaRulesNotSatisfied;
          console.error(`Error at document index ${writeErr.index}:`);
          if (errDetails) {
            errDetails.forEach((rule) => {
              (rule.propertiesNotSatisfied || []).forEach(
                ({ propertyName, ...info }) => {
                  console.error(`- ${propertyName}:`, info);
                }
              );
            });
          } else {
            console.error(writeErr.err?.errmsg || writeErr);
          }
        });
      } else {
        console.error("Error creating class:", error);
      }

      throw error;
    }
  }
}

module.exports = SessionFactory;
