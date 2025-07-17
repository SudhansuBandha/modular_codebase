const GenerateRoutesForController = require('../../../../shared/utils/generateRoutesForModule');
const UsersController = require('../controllers');

class UserRoutes extends GenerateRoutesForController {
    constructor() {
        super();
    }    

    getUsers(){
        return{
            method: 'GET',
            path:'/',
            handler:UsersController.getUsers.bind(UsersController)
        }
    }
    
    getUsersDetails(){
        return{
            method: 'GET',
            path:'/:id/details',
            handler:(req, res)=>{
                UsersController.getUserDetails(req, res);
            }
        }
    }   
}

module.exports = new UserRoutes ();



