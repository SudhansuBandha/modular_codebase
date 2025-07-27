const { ObjectId } = require("mongodb");
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

  async getAll(query) {
    try {
      const bookings = await this.dbCollection
        .aggregate([
          {
            $match: query,
          },
          {
            $lookup: {
              from: "classes",
              localField: "class",
              foreignField: "_id",
              as: "class",
            },
          },
          {
            $unwind: {
              path: "$class",
            },
          },
        ])
        .toArray();

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

  async createOne(data) {
    try {
      let saveData = {
        member: data.member,
        class: ObjectId.createFromHexString(data.classId),
        participationDate: data.participationDate,
        session: data.session,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await this.dbCollection.insertOne(saveData);
      return result.insertedId;
    } catch (error) {
      if (error.code === 121) {
        const details = error.errInfo?.details?.schemaRulesNotSatisfied || [];
        console.error("Validation failed on fields:");
        details.forEach((rule) => {
          (rule.propertiesNotSatisfied || []).forEach(
            ({ propertyName, ...info }) => {
              console.error(`- ${propertyName}:`, info);
            }
          );
        });
      } else {
        console.error("Error creating class:", error);
      }
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
