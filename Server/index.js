const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./config/connectToDb");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
connectToDb();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
