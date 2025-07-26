const GenerateRoutesForController = require("../../../../shared/utils/generateRoutesForModule");
const { ClassesController } = require("../controllers");
const authMiddleware = require("../../../../shared/middlewares/auth.middleware");
const Validator = require("../middlewares/validators");

class ClassesRoutes extends GenerateRoutesForController {
  constructor() {
    super();
  }

  createClass() {
    return {
      method: "POST",
      path: "/",
      middlewares: [authMiddleware, Validator.validateCreateClass],
      handler: (req, res) => {
        ClassesController.createClass(req, res);
      },
    };
  }

  getClasses() {
    return {
      method: "GET",
      path: "/",
      middlewares: [authMiddleware],
      handler: ClassesController.getClasses.bind(ClassesController),
    };
  }

  getClassDetails() {
    return {
      method: "GET",
      path: "/:id/details",
      middlewares: [authMiddleware],
      handler: (req, res) => {
        ClassesController.getClassDetails(req, res);
      },
    };
  }
}

module.exports = new ClassesRoutes();
