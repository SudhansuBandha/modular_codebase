require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/mongo");
const PORT = process.env.PORT || 3000;

const v1Routes = require("./apis/domains/v1");

// Middleware (optional)
app.use(express.json()); // Add this to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this to parse URL-encoded bodies

console.log(process.env.PORT);

const registerRoutes = (version, routes) => {
  Object.keys(routes).forEach((key) => {
    app.use(`/${version}${routes[key].basePath}`, routes[key].router);
  });
};

// Register the v1 routes
registerRoutes("v1", v1Routes);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
