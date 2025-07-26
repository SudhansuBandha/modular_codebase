const { ClassesFactory } = require("../dal");
const classesHelper = require("../helpers/classes.helper");

const classManager = new ClassesFactory();

class ClassesService {
  async createClassServiceHandler(data) {
    // Logic to create a class
    // This will involve calling the ClassesFactory to create a class
    // and then using the created class ID to create sessions
    data = classesHelper.prepareClassData(data);
    const createdClass = await classManager.createOne(data);
    return createdClass;
  }
}

module.exports = new ClassesService();
