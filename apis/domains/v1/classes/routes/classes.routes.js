const GenerateRoutesForController = require("../../../../shared/utils/generateRoutesForModule");
const { ClassesController } = require("../controllers");
const authMiddleware = require("../../../../shared/middlewares/auth.middleware");

class ClassesRoutes extends GenerateRoutesForController {
  constructor() {
    super();
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
