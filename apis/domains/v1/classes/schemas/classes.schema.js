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
          description: "Capacity must be a positive integer and at least 1",
        },
        club: {
          bsonType: "objectId",
          description: "Must reference a valid Club _id",
        },
        sessions: {
          bsonType: "array",
          description: "List of sessions for this class",
          items: {
            bsonType: "objectId",
          },
          uniqueItems: true,
        },
        createdBy: {
          bsonType: "objectId",
          description: "Must reference a valid User _id",
        },
      },
    },
  },
};
