//server_mongo.js
const express = require("express");
const moment = require("moment");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

//LOGGER
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

app.use(logger);

// Middleware
app.use(express.urlencoded({ extended: false }));

//http://localhost:3001 "Test Server"
app.get("/", async (req, res) => {
  res.send("Test Server");
});

const subscribersRouter = require("./api_mongo/routes/subscribers");
app.use("/subscribers", subscribersRouter);

//const PORT = process.env.PORT || 3001;
const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
