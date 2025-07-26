const { MongoClient } = require("mongodb");
const { mongo } = require("../db.config.js").db;

let clients = {};

for (let client in mongo) {
  const { host, port, dbName } = mongo[client];
  const uri = `mongodb://${host}:${port}/${dbName}`;
  clients[client] = new MongoClient(uri);
  clients[client].connect().then(() => {
    console.log(`MongoDB client for ${client} initialized with URI: ${uri}`);
  });
}

module.exports = clients;
