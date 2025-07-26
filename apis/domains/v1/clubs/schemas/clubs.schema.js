module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      properties: {
        name: {
          bsonType: "string",
          description: "Club name must be a string",
        },
        owners: {
          bsonType: "array",
          description: "List of user IDs who own the club",
          items: {
            bsonType: "objectId",
          },
        },
        members: {
          bsonType: "array",
          description: "List of user IDs who are members of the club",
          items: {
            bsonType: "objectId",
          },
        },
      },
    },
  },
};
