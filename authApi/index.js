require("dotenv").config();
const config = require("config");
const cors = require("cors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const users = require("./routes/users");
const wells = require("./routes/wells");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const uri = process.env.MONGODB_URI;
const connection = mongoose.connection;

const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  if (!config.get("PrivateKey")) {
    console.error("FATAL ERROR: PrivateKey is not defined.");
    process.exit(1);
  }
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

  console.log(`Listening on port ${port}...`);
});
