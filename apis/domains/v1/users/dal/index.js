const UsersFactory = require("./users.factory");

const dbManager = new UsersFactory();

(async () => {
  await dbManager.write();
})();

module.exports = { UsersFactory };
