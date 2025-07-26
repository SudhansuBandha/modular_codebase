const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");
const ClassesService = require("../services/classes.service");
const SessionsService = require("../services/sessions.service");
const { ClassesFactory } = require("../dal");

const classesManager = new ClassesFactory();

class ClassesController extends BaseResponseHandler {
  constructor() {
    super();
  }

  async createClass(req, res) {
    try {
      const data = req.body;
      // Create class
      const createdClass = await ClassesService.createClassServiceHandler(data);

      //Create sessions for the class
      const sessionIds = await SessionsService.createSessionsServiceHandler(
        createdClass
      );

      // Update class with session IDs
      await classesManager.updateOne(createdClass, {
        sessions: sessionIds,
      });

      return this.successResponse(res, {
        message: "Class created successfully!!!",
        data: createdClass,
      });
    } catch (error) {
      console.error(error);
      return this.errorResponse(res, "Error creating class");
    }
  }

  async getClasses(req, res) {
    try {
      const classes = await dbManager.getAll();

      return this.successResponse(res, {
        message: "Classes retrieved successfully",
        data: classes,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getClassDetails(req, res) {
    try {
      const classId = req.params.id;
      return this.successResponse(res, {
        message: `Class with ID ${classId} retrieved successfully`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ClassesController();
