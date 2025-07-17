const BaseResponseHandler = require("../../../../shared/utils/baseResponseHandler");

class OrdersController extends BaseResponseHandler {
    constructor() {
        super();
    }

    async getOrders(req, res) {
        try {
            return this.successResponse(res, {
                message: "Orders retrieved successfully",
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getOrderById(req, res) {
        try {
            const orderId = req.params.id;
            //return res.status(200).json({ message: `User with ID ${userId} retrieved successfully` });

            return this.successResponse(res, {
                message: `Order with ID ${orderId} retrieved successfully`,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new OrdersController();
