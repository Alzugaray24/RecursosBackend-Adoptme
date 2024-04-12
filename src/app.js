import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import path from "path";
import __dirname from "./utils/index.js";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();
const PORT = process.env.PROD_PORT || 80;
const connection = mongoose.connect(process.env.PRODUCTION_MONGO_URL);

const hbs = exphbs.create({ extname: "hbs" });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "..", "views"));

app.use(express.json());
app.use(cookieParser());

app.use("/", viewsRouter);

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
