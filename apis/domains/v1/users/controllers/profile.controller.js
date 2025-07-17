const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");

class UserProfileController extends BaseResponseHandler {
    constructor() {
        super();
    }

    async getUserProfileDetails(req, res) {
        const userId = req.params.id;
        //return res.status(200).json({ message: `User with ID ${userId} retrieved successfully` });

        return this.successResponse(res, {
            message: `Profile Details with ID ${userId} retrieved successfully`,
        });
    }

    async updateUserProfileDetails(req, res) {
        try {
            const name = req.body.name;

            return this.successResponse(res, {
                message: `Profile Updated successfully for User ${name}`,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserProfileController();
