const ClassesFactory = require("./classes.factory");
const BookingsFactory = require("./bookings.factory");

const classesManager = new ClassesFactory();
const bookingsManager = new BookingsFactory();

(async () => {
  await classesManager.write();
  await bookingsManager.write();
})();

module.exports = { ClassesFactory, BookingsFactory };
