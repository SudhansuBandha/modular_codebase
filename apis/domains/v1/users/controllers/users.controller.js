const BaseResponseHandler = require('../../../../shared/utils/baseResponseHandler');

class UserController extends BaseResponseHandler {
    constructor(){
        super()
    }
    
    async getUsers(req, res){
        //return res.status(200).json({ message: 'Users retrieved successfully' });
        
        return this.successResponse(res, {message: 'Users retrieved successfully'});
    }

    async getUserDetails(req, res) {
        const userId = req.params.id;
        //return res.status(200).json({ message: `User with ID ${userId} retrieved successfully` });
        
        return this.successResponse(res, { message: `User with ID ${userId} retrieved successfully` });
    }

}

module.exports = new UserController();