const express = require('express');
const router = express.Router();

const mr = require('./routes');

//Generate Routes using IIFE

(()=>{
Object.keys(mr).forEach((el)=>{
    const routes= mr[el].getRoutes();
    routes.forEach(route => {
      router[route.method.toLowerCase()](route.path, route.handler);
  });
})
})();


module.exports = {
    router,
    basePath: '/users'
};