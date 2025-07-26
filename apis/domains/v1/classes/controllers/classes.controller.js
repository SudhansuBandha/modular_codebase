const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");
const { ClassesFactory } = require("../dal");

const dbManager = new ClassesFactory();

class ClassesController extends BaseResponseHandler {
  constructor() {
    super();
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
