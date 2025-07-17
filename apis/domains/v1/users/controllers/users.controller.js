const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");

class UserController extends BaseResponseHandler {
    constructor() {
        super();
    }

    async getUsers(req, res) {
        try {
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
