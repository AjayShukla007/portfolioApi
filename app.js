require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToMongo = require('./db.js');
const { logger, logEvents } = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();
app.use(cors());
app.use(logger);

app.use(process.env.AUTH_ENDPOINT, require("./routes/auth"));
app.use(process.env.PROJECT_ENDPOINT, require("./routes/notes"));

app.use(errorHandler);
connectToMongo();

app.get('/test', (req, res) => {
  res.send('Hello, Express!');
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo db");
  // STARTING SERVER
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});


mongoose.connection.on("error", err => {
  console.log(err);
  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "MongoError.log"
  );
});

