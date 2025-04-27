require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToMongo = require("./db.js");
const { logger, logEvents } = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use(process.env.AUTH_ENDPOINT, require("./routes/auth"));
app.use(process.env.PROJECT_ENDPOINT, require("./routes/notes"));
app.use(process.env.BLOG_ENDPOINT, require("./routes/blogs"));
app.use(process.env.ABOUT_ENDPOINT, require("./routes/about"));
app.use(process.env.CASESTUDIES_ENDPOINT, require("./routes/caseStudies.js"));
app.use(process.env.MAIL_ENDPOINT, require("./routes/getInTouch"));
app.use(process.env.ACTIVITY_ENDPOINT || '/api/activities', require("./routes/activities"));

app.use(errorHandler);
connectToMongo();

app.get("/", (req, res) => {
  res.send("Welcome to the Portfolio Backend");
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo db");
  // STARTING SERVER
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "MongoError.log"
  );
});
