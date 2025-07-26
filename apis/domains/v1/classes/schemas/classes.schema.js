module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "startDate",
        "endDate",
        "startTime",
        "duration",
        "capacity",
        "clubId",
        "createdBy",
      ],
      properties: {
        name: {
          bsonType: "string",
          description: "Class name must be a string and is required",
        },
        startDate: {
          bsonType: "date",
          description: "Start date must be a valid date",
        },
        endDate: {
          bsonType: "date",
          description: "End date must be a valid date",
        },
        startTime: {
          bsonType: "string",
          description: "Start time stored as a string (HH:mm format)",
        },
        duration: {
          bsonType: "int",
          minimum: 1,
          description: "Duration in minutes (positive integer)",
        },
        capacity: {
          bsonType: "int",
          minimum: 1,
          maximum: 10,
          description: "Capacity must be a positive integer between 1 and 10",
        },
        clubId: {
          bsonType: "objectId",
          description: "Must reference a valid Club _id",
        },
        createdBy: {
          bsonType: "objectId",
          description: "Must reference a valid User _id",
        },
        participants: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
          },
          maxItems: 10,
          description: "List of user IDs who are members of the class",
        },
      },
    },
  },
};
