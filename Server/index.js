const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./config/connectToDb");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const orderRoutes = require("./routes/order");
const faqRoutes = require("./routes/faqs");
const graphRoutes = require("./routes/graph");
const aiRoutes = require("./routes/ai");

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/graph", graphRoutes);
app.use("/api/ai", aiRoutes);

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
