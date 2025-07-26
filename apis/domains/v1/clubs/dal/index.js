const ClubsFactory = require("./clubs.factory");

const dbManager = new ClubsFactory();

(async () => {
  await dbManager.write();
})();

module.exports = { ClubsFactory };
