import express from "express";
import { getUsuarios, registrarUsuario, loginUsuario } from "../src/controllers/usuariosController.js";

const router = express.Router();

router.get("/", getUsuarios);
router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);

export default router;
