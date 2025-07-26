const clients = require("../../../db/mongo");

class CreateOrUpdateCollection {
  //schema will be passed to this function

  constructor(collectionName, schema) {
    this.dbClient = clients["clubs"].db();
    this.collectionName = collectionName;
    this.schema = schema;
  }

  async write() {
    try {
      const validationOptions = {
        validator: this.schema.validator,
        validationLevel: "strict",
        validationAction: "error",
      };

      const collections = await this.dbClient
        .listCollections({}, { nameOnly: true })
        .toArray();
      const collectionExists = collections.some(
        (col) => col.name === this.collectionName
      );

      if (!collectionExists) {
        // Create collection with schema
        await this.dbClient.createCollection(
          this.collectionName,
          validationOptions
        );
      } else {
        // Update existing schema
        await this.dbClient.command({
          collMod: this.collectionName,
          ...validationOptions,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CreateOrUpdateCollection;
