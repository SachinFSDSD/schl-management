const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/school-management");

const db = mongoose.connection;

db.on("err", () => {
  console.log("error while connecting to db");
});

db.once("open", () => {
  console.log("Connected to mongodb");
});
require("./routes/student.routes")(app);
require("./routes/user.routes")(app);

app.listen(3000, () => {
  console.log("server is running");
});
