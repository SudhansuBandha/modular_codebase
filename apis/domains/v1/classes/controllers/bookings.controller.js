const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");
const { BookingsFactory } = require("../dal");

const dbManager = new BookingsFactory();

class BookingsController extends BaseResponseHandler {
  constructor() {
    super();
  }

  async getBookings(req, res) {
    try {
      const bookings = await dbManager.getAll();

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
