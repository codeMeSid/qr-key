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
  const token = keyA + "+" + keyB;
  const tokenId = uuid.v4().split("-")[uuid.v4().split("-").length - 1];
  tracy[tokenId] = { token, createdAt: Date.now().valueOf() };
  res.json(tokenId);
});

app.get("/api/sign/:id", (req, res) => {
  const { id } = req.params;
  console.log(tracy);
  if (tracy[id]) {
    res.json(tracy[id].token);
  } else {
    res
      .status(404)
      .json("You can't fool me, mate!!! This is not your secret to tell.");
  }
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`listening to ${process.env.PORT}`)
);
