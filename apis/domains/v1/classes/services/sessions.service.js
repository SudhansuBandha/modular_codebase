const { ClassesFactory, SessionsFactory } = require("../dal");
const sessionsHelper = require("../helpers/session.helper");

const classesManager = new ClassesFactory();
const sessionsManager = new SessionsFactory();

class SessionsService {
  async createSessionsServiceHandler(data) {
    // Logic to create a session
    // This will involve calling the SessionsFactory to create sessions
    // and then map with the class ID
    const classId = data;
    const classData = await classesManager.getById(classId);

    let sessionData = sessionsHelper.prepareSessionData(classData);

    let sessionIds = await sessionsManager.createMany(sessionData);

    // convert to array of ids
    sessionIds = Object.values(sessionIds);
    console.log(sessionIds);

    return sessionIds;
  }
}

module.exports = new SessionsService();
