//server.js
const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const moment = require("moment");
const articleRouter = require("./routes/article");

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

// Body Parser Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test Article 2",
      createdAt: new Date(),
      description: "Test description 2",
    },
  ];
  res.render("articles/index", { articles: articles });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
