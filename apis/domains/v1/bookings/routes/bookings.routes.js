const GenerateRoutesForController = require("../../../../shared/utils/generateRoutesForModule");
const { BookingsController } = require("../controllers");
const authMiddleware = require("../../../../shared/middlewares/auth.middleware");

class BookingsRoutes extends GenerateRoutesForController {
  constructor() {
    super();
  }

  createBooking() {
    return {
      method: "POST",
      path: "/:classid/bookings",
      middlewares: [authMiddleware],
      handler: (req, res) => {
        BookingsController.createBooking(req, res);
      },
    };
  }

  getBookings() {
    return {
      method: "GET",
      path: "/",
      middlewares: [authMiddleware],
      handler: BookingsController.getBookings.bind(BookingsController),
    };
  }

  getBookingDetails() {
    return {
      method: "GET",
      path: "/:id/details",
      middlewares: [authMiddleware],
      handler: (req, res) => {
        BookingsController.getBookingDetails(req, res);
      },
    };
  }
}

module.exports = new BookingsRoutes();
