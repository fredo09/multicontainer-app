const express = require("express");
const bodyParser = require("body-parser");

const redis = require("redis");

const fibonacci = require("./fibonacci");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//templates
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/fibonacci", (req, res) => {
  // TODO: calcular fibonacci

  const number = req.body.number;
  console.log(number);
  const result = fibonacci(number);
  res.render("fibonacci", { number: number, result: result });
});

app.listen(8000, () => console.log("Escuchando en http://localhost:80"));
