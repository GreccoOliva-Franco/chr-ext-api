import { config } from "./config/config.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";
import rootRoutes from "./routes/root.routes.js";
import wordsRoutes from "./routes/words.routes.js";

// DB conection
const dbString = config.db.uri;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(dbString, dbOptions, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection to Mongo DB stablished");
  }
});

// Express server
const app = express();

// Express static files or directories
app.use(express.static("public/"));
// app.use(express.static("uploads/"));

// Express parse middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session middlewares
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: parseInt(config.session.expireTime),
    },
  })
);

// Express routes
app.use("/", rootRoutes);
app.use("/api/words", wordsRoutes);

// Express server listener
app.listen(config.app.port, () => {
  console.log(`#MasDatos API listening on port ${config.app.port}`);
});
