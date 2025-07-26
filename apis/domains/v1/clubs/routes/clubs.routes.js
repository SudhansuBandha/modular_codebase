const GenerateRoutesForController = require("../../../../shared/utils/generateRoutesForModule");
const { ClubsController } = require("../controllers");
const authMiddleware = require("../../../../shared/middlewares/auth.middleware");

class ClubsRoutes extends GenerateRoutesForController {
  constructor() {
    super();
  }

  getClubs() {
    return {
      method: "GET",
      path: "/",
      middlewares: [authMiddleware],
      handler: ClubsController.getClubs.bind(ClubsController),
    };
  }

  getClubDetails() {
    return {
      method: "GET",
      path: "/:id/details",
      middlewares: [authMiddleware],
      handler: (req, res) => {
        ClubsController.getClubDetails(req, res);
      },
    };
  }
}

module.exports = new ClubsRoutes();
