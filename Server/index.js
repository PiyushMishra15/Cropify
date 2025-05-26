const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./config/connectToDb");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();
cont cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());
connectToDb();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

