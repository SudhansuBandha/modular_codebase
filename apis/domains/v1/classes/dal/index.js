const ClassesFactory = require("./classes.factory");
const BookingsFactory = require("./bookings.factory");
const SessionsFactory = require("./sessions.factory");

const classesManager = new ClassesFactory();
const bookingsManager = new BookingsFactory();
const sessionsManager = new SessionsFactory();

(async () => {
  await classesManager.write();
  await bookingsManager.write();
  await sessionsManager.write();
})();

module.exports = { ClassesFactory, BookingsFactory, SessionsFactory };
