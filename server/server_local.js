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

//http://localhost:3001 "Test Server"
app.get("/", async (req, res) => {
  res.send("Test Server");
});

//http://localhost:3001/api/data [1, 2, 3]
app.get("/api/data", async (req, res) => {
  res.send([1, 2, 3]);
});

//http://localhost:3001/api/data/22 22
app.get("/api/data/:id", async (req, res) => {
  res.send(req.params.id);
});

//http://localhost:3001/api/post/2021/03 {"year": "2021","month": "03"}
app.get("/api/post/:year/:month", async (req, res) => {
  res.send(req.params);
});

//http://localhost:3001/api?sortBy=Nama {"sortBy":"Nama"}
app.get("/api", async (req, res) => {
  res.send(req.query);
});

let peserta = [
  { id: 1, name: "silmi" },
  { id: 2, name: "afin" },
  { id: 3, name: "edy" },
];

//GET http://localhost:3001/api/peserta
app.get("/api/peserta", (req, res) => {
  //res.send(peserta);
  res.send({
    message: `Get ALL Data`,
    body: peserta,
    status: "OK",
  });
});

//http://localhost:3001/api/peserta/1
app.get("/api/peserta/:id", (req, res) => {
  const { id } = req.params;
  const pesert = peserta.find((a) => a.id === parseInt(id));
  if (!pesert) return res.status(404).send("Peserta tdk ditemukan");
  //res.send(pesert);
  res.send({
    message: `Get ID Data : ${id}`,
    body: pesert,
    status: "OK",
  });
});

//POST http://localhost:3001/api/peserta
app.use(express.json());
app.post("/api/peserta", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(404).send("format Name salah");
    return;
  }
  const pesert = {
    id: peserta.length + 1,
    name: req.body.name,
  };
  console.log(req.body.name);
  peserta.push(pesert);
  //res.send(peserta);
  res.send({
    message: `User ${pesert.id} Added`,
    body: peserta,
    status: "OK",
  });
});

//DELETE  http://localhost:3001/api/peserta/1
app.delete("/api/peserta/:id", (req, res) => {
  const { id } = req.params;
  const pesert = peserta.filter((a) => a.id !== parseInt(id));
  if (!pesert) res.status(404).send("Peserta tdk ditemukan");
  //res.send(`User ${id} deleted`);
  res.send({
    message: `User ${id} deleted`,
    body: pesert,
    status: "OK",
  });
});

//const PORT = process.env.PORT || 3001;
const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
