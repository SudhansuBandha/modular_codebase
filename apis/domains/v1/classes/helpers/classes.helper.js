const { ObjectId } = require("mongodb");

class ClassesHelper {
  prepareClassData(data) {
    return {
      ...data,
      // Ensure it is correct mongoDB ObjectId format
      club: ObjectId.createFromHexString(data.club),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

module.exports = new ClassesHelper();
