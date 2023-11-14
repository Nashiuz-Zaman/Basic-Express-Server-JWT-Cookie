const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
require("dotenv").config();
const secret = process.env.Token_Secret;
const jwt = require("jsonwebtoken");

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/jwt", async (req, res) => {
  const userInfo = req.body;
  const token = jwt.sign(userInfo, secret, { expiresIn: "365d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });
});

app.get("/", async (req, res) => {
  res.send("server is working");
});

app.listen(port);
