//server.js
const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const moment = require("moment");
const articleRouter = require("./routes/article");
const Article = require("./models/article");
const methodOverride = require("method-override");

const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndexes: true,
});

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
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  // const articles = [
  //   {
  //     title: "Test Article",
  //     createdAt: new Date(),
  //     description: "Test description",
  //   },
  //   {
  //     title: "Test Article 2",
  //     createdAt: new Date(),
  //     description: "Test description 2",
  //   },
  // ];
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
