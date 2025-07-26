const { ObjectId } = require("mongodb");

class SessionsHelper {
  createSessions(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const result = [];

    let current = new Date(start);

    while (current <= end) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, "0");
      const dd = String(current.getDate()).padStart(2, "0");

      result.push({
        date: `${yyyy}-${mm}-${dd}`,
      });

      current.setDate(current.getDate() + 1);
    }

    return result;
  }

  /**
   * Prepares session data for insertion into the database.
   * @param {Object} data - The class data containing startDate and endDate.
   * @returns {Array} - An array of session objects ready for insertion.
   */

  prepareSessionData(data) {
    //Creates sessions based on startDate and endDate
    let sessions = this.createSessions(data.startDate, data.endDate);

    //update each session with class ID and timestamps
    sessions = sessions.map((session) => {
      return {
        ...session,
        class: data._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return sessions;
  }
}

module.exports = new SessionsHelper();
