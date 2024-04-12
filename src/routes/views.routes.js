import express from "express";
import usersController from "../controllers/users.controller.js";
import petsController from "../controllers/pets.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/users", async (req, res) => {
  try {
    // Llamamos al controlador para obtener todos los usuarios
    const users = await usersController.getAllUsers();
    res.render("users", { users: users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/pets", async (req, res) => {
  try {
    // Llamamos al controlador para obtener todos los usuarios
    const pets = await petsController.getAllPets();
    res.render("pets", { pets: pets });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
