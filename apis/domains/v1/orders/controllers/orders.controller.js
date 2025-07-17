const BaseResponseHandler = require('../../../../shared/utils/baseResponseHandler');

class OrdersController extends BaseResponseHandler {
    constructor(){
        super()
    }
    
    async getOrders(req, res){
        //return res.status(200).json({ message: 'Users retrieved successfully' });
        
        return this.successResponse(res, {message: 'Orders retrieved successfully'});
    }

    async getOrderById(req, res) {
        const orderId = req.params.id;
        //return res.status(200).json({ message: `User with ID ${userId} retrieved successfully` });
        
        return this.successResponse(res, { message: `Order with ID ${orderId} retrieved successfully` });
    }

}

module.exports = new OrdersController();