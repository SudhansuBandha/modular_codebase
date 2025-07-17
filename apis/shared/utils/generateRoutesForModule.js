class GenerateRoutesForController{
    getRoutes(){
        const routesHandlerNames =   
         Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(name =>
            typeof this[name] === 'function' && name !== 'constructor'
        );

        return routesHandlerNames.map(handlerName => this[handlerName]())
           
    }
}

module.exports = GenerateRoutesForController