import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";

const app = express();

// middleware junk
app.use(bodyParser.json({ limit: "30mb", extended: true })); // big json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // big forms
app.use(cors()); // let frontend talk
app.use(express.static("public")); // serve pics n stuff
// app.use('/images', express.static('images')); // nah, public covers it

dotenv.config();
const PORT = process.env.PORT || 5000; // default if env’s empty

const CONNECTION = process.env.MONGO_DB;
// hook up mongo
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server’s up on port ${PORT}`));
  })
  .catch((error) => console.log(`Mongo borked: ${error.message}`));

// slap on the routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);