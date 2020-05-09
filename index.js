if (!process.env.NODE_ENV) require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const tracy = {};

app.post("/api/sign", (req, res) => {
  const {
    body: { msg, secretKey },
  } = req;
  const keyA = jwt.sign(msg, secretKey);
  const keyB = jwt.sign(msg, "admin");
  const keyCombo = keyA + "+" + keyB;
  const token = jwt.sign(keyCombo, "I_AM_BATMAN");
  const tokenId = uuid.v4().split("-")[2];
  tracy[tokenId] = token;
  console.log(tracy);
  res.json(tokenId);
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`listening to ${process.env.PORT}`)
);
