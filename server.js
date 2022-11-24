const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users-routes");
const productsRoutes = require("./routes/products-routes");
require("dotenv").config();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const dbURL = process.env.DB_URL;

const dbConfig = {
  useNewURLParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbURL, dbConfig)
  .then(function () {
    console.log("Database is connected");
  })
  .catch(function (connectionError) {
    console.log("Database not connected: " + connectionError);
  });

//Home Page
server.get("/", function (req, res) {
  res.send("INDEX PAGE");
});

server.use("/users", usersRoutes);
server.use("/products", productsRoutes);

server.listen(process.env.PORT, function () {
  console.log("Running on http://localhost:3001/");
});
