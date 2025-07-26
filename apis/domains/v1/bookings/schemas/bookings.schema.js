module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "member",
        "class",
        "participationDate",
        "createdAt",
        "updatedAt",
      ],
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
        createdAt: {
          bsonType: "date",
          description: "Document creation timestamp",
        },
        updatedAt: {
          bsonType: "date",
          description: "Document last update timestamp",
        },
      },
    },
  },
};
