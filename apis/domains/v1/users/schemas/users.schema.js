module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "phone"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string",
        },
        email: {
          bsonType: "string",
          description: "must be a string",
        },
        phone: {
          bsonType: "string",
          description: "must be a string",
        },
        clubsOwned: {
          bsonType: "array",
          description: "list of clubs the user owns",
          items: { bsonType: "objectId" },
        },
        clubsPartOf: {
          bsonType: "array",
          description: "list of clubs the user is a part of",
          items: { bsonType: "objectId" },
        },
      },
    },
  },
};
