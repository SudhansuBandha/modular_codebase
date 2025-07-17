require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const v1Routes = require('./apis/domains/v1');

// Middleware (optional)
// app.use(express.json());
console.log(process.env.PORT);

//console.log(UsersRoutes.getRoutes());


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const registerRoutes = (version, routes) => {
 
  Object.keys(routes).forEach((key)=>{
    app.use(`/${version}${routes[key].basePath}`, routes[key].router);
  })

}


//app.use('/v1/users', v1Routes.UsersModuleRouterData.router);

registerRoutes('v1', v1Routes);






//app.get('/users',  UsersRoutes.getUsers().handler);

//app.get('/users/:id', UsersRoutes.getUserById().handler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});