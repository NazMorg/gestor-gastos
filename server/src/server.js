import express from "express";
//import cors from "cors";
import authRouter from "./routers/auth.router.js";
import { __dirname } from "./utils/utils.js";
import config from "./config/config.js";
import "./config/dbConfig.js";

//setup
const app = express();
const PORT = config.port || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//routers
app.use("/api/auth", authRouter);

//test_route
app.get("/", (req, res) => { res.send("Gestor Financiero funcionando!") });

//start
app.listen(PORT, () => console.log(`Server: Gestor Financiero iniciado en puerto ${PORT}...`))