const GenerateRoutesForController = require('../../../../shared/utils/generateRoutesForModule');
const OrdersController = require('../controllers');

class OrdersRoutes extends GenerateRoutesForController {
    constructor() {
        super()
    }
    
    getOrderById() {
        return {
            method: 'GET',
            path: '/:id',
            handler: (req, res)=>{ OrdersController.getOrderById(req, res); }     
        }
    }     

    getOrders(){
        return{
            method: 'GET',
            path:'/',
            handler:OrdersController.getOrders.bind(OrdersController)
        }
    }
    
}

module.exports = new OrdersRoutes ();



