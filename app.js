const express = require("express");
const bodyParser = require("body-parser");

const redis = require("redis");

const fibonacci = require("./fibonacci");

const app = express();

//Cliente redis
const redisClient = redis.createClient({ host: "redis-server", port: 6379 });

app.use(bodyParser.urlencoded({ extended: false }));

//templates
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/fibonacci", (req, res) => {
  const number = req.body.number;

  redisClient.get(number, (err, value) => {
    if (!value) {
      //console.log("Insertando value nuevo");
      const result = fibonacci(number);
      redisClient.set(number, result);
      res.render("fibonacci", { number: number, result: result });
    } else {
      //console.log(`Desde redis ${value}`);
      res.render("fibonacci", { number: number, result: value });
    }
  });
});

app.listen(8000, () => console.log("Escuchando en http://localhost:80"));
