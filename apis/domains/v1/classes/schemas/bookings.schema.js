module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["member", "classId", "participationDate"],
      properties: {
        member: {
          bsonType: "objectId",
          description: "Reference to the User who made the booking",
        },
        classId: {
          bsonType: "objectId",
          description: "Reference to the Class being booked",
        },
        participationDate: {
          bsonType: "date",
          description: "Date when the member will participate",
        },
      },
    },
  },
};
