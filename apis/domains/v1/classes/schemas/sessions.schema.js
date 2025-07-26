module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["class", "date", "createdAt", "updatedAt"],
      properties: {
        class: {
          bsonType: "objectId",
          description: "Must be a valid ObjectId referring to class",
        },
        date: {
          bsonType: "string",
          description: "Must be a valid date in the future",
        },
        participants: {
          bsonType: "array",
          description: "List of members attending",
          items: {
            bsonType: "objectId",
          },
          uniqueItems: true,
        },
        createdAt: {
          bsonType: "date",
          description: "Document creation timestamp",
        },
        updatedAt: {
          bsonType: "date",
          description: "Document last update timestamp",
        },
        // We can add more fields like status for each session if needed
      },
    },
  },
};
