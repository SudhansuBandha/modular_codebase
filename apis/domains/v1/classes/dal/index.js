const ClassesFactory = require("./classes.factory");

const dbManager = new ClassesFactory();

(async () => {
  await dbManager.write();
})();

module.exports = { ClassesFactory };
