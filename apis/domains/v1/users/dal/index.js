const UsersFactory = require("./users.factory");

const UsersManager = new UsersFactory();

(async () => {
  await UsersManager.write();
})();

module.exports = { UsersFactory };
