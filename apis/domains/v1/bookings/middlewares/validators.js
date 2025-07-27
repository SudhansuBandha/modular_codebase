const { ObjectId } = require("mongodb");
const { ClassesFactory, SessionsFactory } = require("../../classes/dal");
const { UsersFactory } = require("../../users/dal");
const { BookingsFactory } = require("../dal");

const classManager = new ClassesFactory();
const usersManager = new UsersFactory();
const bookingsManager = new BookingsFactory();
const sessionManager = new SessionsFactory();

class Validator {
  async validateBooking(req, res, next) {
    //validate request body
    const errors = [];

    const { name, classId, participationDate } = req.body;

    let classDetails = [];
    let user = null;
    // Member name
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("name is required and must be a non-empty string.");
    } else {
      // Check if user exists
      user = await usersManager.findOne({ name });

      if (!user) errors.push("User does not exist");

      // Check if user is a member of the club associated with the class
      classDetails = await classManager.getClassAndClubDetails(
        ObjectId.createFromHexString(classId)
      );

      // No class found
      if (!classDetails.length) errors.push("class does not exist");

      if (
        classDetails.length &&
        user &&
        classDetails[0].owners.findIndex((ownerId) =>
          ownerId.equals(user._id)
        ) === -1 &&
        classDetails[0].members.findIndex((ownerId) =>
          ownerId.equals(user._id)
        ) === -1
      ) {
        errors.push(
          "User is not a member of the club associated with the class."
        );
      }
    }

    // Class ID

    if (!classId || typeof classId !== "string" || classId.trim() === "") {
      errors.push("classId is required and must be a valid non-empty string.");
    }

    // Participation date
    const participation = new Date(participationDate);
    if (!participationDate || isNaN(participation.getTime())) {
      errors.push("participationDate is required and must be a valid date.");
    } else {
      if (classDetails.length) {
        const now = new Date();
        const classStartDate = new Date(classDetails[0].startingDate);
        const classEndDate = new Date(classDetails[0].endDate);
        if (participation <= now) {
          errors.push("Participation date must be in the future.");
        }

        if (participation <= classStartDate || participation >= classEndDate) {
          errors.push(
            "Participation date must be after Starting Date and before Ending Date ."
          );
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    req.classDetails = classDetails[0];
    req.user = user;
    next();
  }

  async checkDuplicateBooking(req, res, next) {
    const { name, classId, participationDate } = req.body;

    const user = req.user;

    // Check for duplicate booking
    const sessionDetails = await sessionManager.findOne({
      // coming from req body
      class: ObjectId.createFromHexString(classId),
      date: participationDate,
    });

    const existingBooking = await bookingsManager.findOne({
      member: user._id,
      // coming from req body
      class: ObjectId.createFromHexString(classId),
      session: sessionDetails._id,
    });

    if (existingBooking) {
      return res.status(400).json({
        error: "A booking with the same details already exists.",
      });
    }
    req.sessionDetails = sessionDetails;
    next();
  }

  async checkForCapacity(req, res, next) {
    const classDetails = req.classDetails;
    const sessionDetails = req.sessionDetails;

    if (sessionDetails.participants?.length === classDetails.capacity)
      res.status(409).json({
        error: "No available capacity for this class on this day.",
      });

    next();
  }
}

module.exports = new Validator();
