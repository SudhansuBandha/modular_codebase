const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");
const { ClubsFactory } = require("../dal");

const dbManager = new ClubsFactory();

class ClubsController extends BaseResponseHandler {
  constructor() {
    super();
  }

  async getClubs(req, res) {
    try {
      const clubs = await dbManager.getAll();

      return this.successResponse(res, {
        message: "Clubs retrieved successfully",
        data: clubs,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getClubDetails(req, res) {
    try {
      const clubId = req.params.id;
      return this.successResponse(res, {
        message: `Club with ID ${clubId} retrieved successfully`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ClubsController();
