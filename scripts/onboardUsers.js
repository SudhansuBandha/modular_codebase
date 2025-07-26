const { UsersFactory } = require("../apis/domains/v1/users/dal");
const users = require("../_data/users");

(async () => {
  try {
    const usersManager = new UsersFactory();

    const result = await usersManager.createMany(users);
    console.log("Users onboarded successfully:", result);
  } catch (err) {
    console.error("Error onboarding users:", err.message);
  } finally {
    process.exit(0);
  }
})();
