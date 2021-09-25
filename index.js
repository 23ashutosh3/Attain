const express = require("express");
const app = express();
const port = 8002;
// const cors = require("cors");
// require("dotenv").config();
const db = require("./config/mongoose.js");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport_jwt_strategy");
app.use(passport.initialize());
app.use(express.urlencoded());


mongoose.Promise = global.Promise;

app.use("/", require("./routes"));

app.listen(port, function(err) {
  if (err) {
    console.log(`Error:err`);
  } else {
    console.log(`server is running:${port}`);
  }
});
