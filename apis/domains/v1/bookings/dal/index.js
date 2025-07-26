const BookingsFactory = require("./bookings.factory");

const dbManager = new BookingsFactory();

(async () => {
  await dbManager.write();
})();

module.exports = { BookingsFactory };
