const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");
const { UsersFactory } = require("../dal/users.factory");

class UserController extends BaseResponseHandler {
  constructor() {
    super();
  }

  async getUsers(req, res) {
    try {
      const users = await UsersFactory.getAllUsers();
      console.log(users);
      return this.successResponse(res, {
        message: "Users retrieved successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserDetails(req, res) {
    try {
      const userId = req.params.id;
      return this.successResponse(res, {
        message: `User with ID ${userId} retrieved successfully`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
