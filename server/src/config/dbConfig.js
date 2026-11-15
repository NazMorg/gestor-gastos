import mongoose from "mongoose";
import config from "../config/config.js";

const URI = config.mongo_uri;

mongoose.connect(URI)
    .then(() => console.log("Server: DB Conectada..."))
    .catch((error) => console.log(error));