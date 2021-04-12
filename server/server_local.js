//server.js
const express = require("express");
const moment = require("moment");

const app = express();

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

app.get("/", async (req, res) => {
  res.send("Coba Server");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
