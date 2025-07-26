const ClassesFactory = require("./classes.factory");

const SessionsFactory = require("./sessions.factory");

const classesManager = new ClassesFactory();
const sessionsManager = new SessionsFactory();

(async () => {
  await classesManager.write();
  await sessionsManager.write();
})();

module.exports = { ClassesFactory, SessionsFactory };
