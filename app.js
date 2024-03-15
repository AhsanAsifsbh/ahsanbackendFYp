const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");
const config = require("config");
const cors = require("cors");

const app = express();
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the "uploads" directory

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.use(function (req, res, next) {
  res.status(404).send("Not Found");
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // res.render("error");
});

const MONGODBURL = "mongodb+srv://Ahsansaab123:Boss123%40@cluster0.uyb3ci1.mongodb.net/products?retryWrites=true&w=majority";


mongoose
  .connect(MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log("Not connected to MongoDB"));

module.exports = app;