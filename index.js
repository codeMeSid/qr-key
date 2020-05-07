if (!process.env.NODE_ENV) require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.get("/api", (req, res) => {
  res.json("this api works");
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`listening to ${process.env.PORT}`)
);
