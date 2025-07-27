const { ObjectId } = require("mongodb");
const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");
const { BookingsFactory } = require("../dal");
const { ClassesFactory, SessionsFactory } = require("../../classes/dal");

const classesManager = new ClassesFactory();
const bookingsManager = new BookingsFactory();
const sessionsManager = new SessionsFactory();

class BookingsController extends BaseResponseHandler {
  constructor() {
    super();
  }

  async createBooking(req, res) {
    try {
      let bookingData = req.body;
      bookingData = {
        ...bookingData,
        member: req.user._id,
        session: req.sessionDetails._id,
      };

      //Create Booking
      const newBooking = await bookingsManager.createOne(bookingData);

      //Add Booking Id to  Session
      await sessionsManager.addParticipant(req.sessionDetails._id, newBooking);

      return this.successResponse(res, {
        message: "Booking created successfully",
        data: newBooking,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getBookings(req, res) {
    try {
      const classesForClub = await classesManager.getAll({
        club: req.ownerClubDetails._id,
      });

      let classesIds = classesForClub.map((cl) => cl._id);

      let queryObj = {};

      if (req.query.memberId)
        queryObj.member = ObjectId.createFromHexString(req.query.memberId);
      if (req.query.startDate && req.query.endDate) {
        queryObj.participationDate = {
          $gte: req.query.startDate,
          $lte: req.query.endDate,
        };
      }
      queryObj.class = {
        $in: classesIds,
      };
      const bookings = await bookingsManager.getAll(queryObj);

      return this.successResponse(res, {
        message: "Booking retrieved successfully",
        data: bookings,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getBookingDetails(req, res) {
    try {
      const bookingId = req.params.id;
      return this.successResponse(res, {
        message: `Class with ID ${bookingId} retrieved successfully`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BookingsController();
