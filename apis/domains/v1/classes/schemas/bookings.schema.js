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
        class: {
          bsonType: "objectId",
          description: "Reference to the Class being booked",
        },
        session: {
          bsonType: "objectId",
          description: "Reference to the Session being booked",
        },
      },
    },
  },
};
