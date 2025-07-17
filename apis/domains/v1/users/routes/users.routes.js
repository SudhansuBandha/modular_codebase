const GenerateRoutesForController = require("../../../../shared/utils/generateRoutesForModule");
const UsersController = require("../controllers");
const authMiddleware = require("../../../../shared/middlewares/auth.middleware");

class UserRoutes extends GenerateRoutesForController {
    constructor() {
        super();
    }

    getUsers() {
        return {
            method: "GET",
            path: "/",
            middlewares: [authMiddleware],
            handler: UsersController.getUsers.bind(UsersController),
        };
    }

    getUsersDetails() {
        return {
            method: "GET",
            path: "/:id/details",
            middlewares: [authMiddleware],
            handler: (req, res) => {
                UsersController.getUserDetails(req, res);
            },
        };
    }
}

module.exports = new UserRoutes();
