const GenerateRoutesForController = require("../../../../shared/utils/generateRoutesForModule");
const { UserProfileController } = require("../controllers");
const authMiddleware = require("../../../../shared/middlewares/auth.middleware");

class UserProfileRoutes extends GenerateRoutesForController {
    constructor() {
        super();
    }

    getUserProfileDetails() {
        return {
            method: "GET",
            path: "/:userid/profiledetails",
            middlewares: [authMiddleware],
            handler: (req, res) => {
                UserProfileController.getUserProfileDetails(req, res);
            },
        };
    }

    updateUserProfileDetails() {
        return {
            method: "PUT",
            path: "/:userid/updateprofiledetails",
            middlewares: [authMiddleware],
            handler: (req, res) => {
                UserProfileController.updateUserProfileDetails(req, res);
            },
        };
    }
}

module.exports = new UserProfileRoutes();
