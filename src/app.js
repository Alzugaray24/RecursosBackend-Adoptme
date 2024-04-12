import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import path from "path"; // Importa el módulo 'path' para trabajar con rutas de archivos
import __dirname from "./utils/index.js"; // Importa __dirname desde utils/index.js

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL);

// Configura Handlebars como motor de plantillas
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "..", "views/layouts"), // Corrige la ruta para los layouts
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "..", "views")); // Utiliza path.join para establecer la ruta de las vistas

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("users", {});
});

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
