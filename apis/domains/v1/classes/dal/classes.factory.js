const clients = require("../../../../../db/mongo");
const CreateOrUpdateCollection = require("../../../../shared/utils/createOrUpdateCollection");
const classesSchema = require("../schemas/classes.schema");

class ClassesFactory extends CreateOrUpdateCollection {
  constructor() {
    // super (schemaName, schema) is called in the parent class
    super("classes", classesSchema);
    this.collectionName = "classes";
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
      const classes = await this.dbCollection.find({}).toArray();
      return classes;
    } catch (error) {
      console.error("Error retrieving class:", error);
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

  async getClassAndClubDetails(id) {
    try {
      const data = await this.dbCollection
        .aggregate([
          {
            $match: {
              _id: id,
            },
          },
          {
            $lookup: {
              from: "clubs",
              localField: "club",
              foreignField: "_id",
              as: "club",
            },
          },
          {
            $unwind: {
              path: "$club",
            },
          },
          {
            $project: {
              name: 1,
              startDate: 1,
              endDate: 1,
              capacity: 1,
              owners: "$club.owners",
              members: "$club.members",
            },
          },
        ])
        .toArray();

      return data;
    } catch (error) {
      console.error(`Error retrieving ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  async createOne(data) {
    try {
      const result = await this.dbCollection.insertOne(data);

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
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  }

  async createMany(data) {
    try {
      const result = await this.dbCollection.insertMany(data);
      return result.insertedCount;
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  }
}

module.exports = ClassesFactory;
