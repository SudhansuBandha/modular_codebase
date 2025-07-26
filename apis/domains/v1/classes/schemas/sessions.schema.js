module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["classId", "date"],
      properties: {
        class: {
          bsonType: "objectId",
          description: "Must be a valid ObjectId referring to class",
        },
        date: {
          bsonType: "date",
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
        // We can add more fields like status for each session if needed
      },
    },
  },
};
