const express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const studentRouter = require('./routes/student.route');
const cohortRouter = require('./routes/cohort.route');

const app = express();

// connecting to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/students',studentRouter);
app.use('/api/cohorts',cohortRouter);

// Routes:
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});



// START SERVER
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
