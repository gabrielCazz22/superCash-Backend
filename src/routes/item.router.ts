import { Router } from "express";
import { crearItemController, obtenerItemsController, borrarItemController, actualizarItemController } from "../controllers/item.controller.js";
import { actualizarItem } from "../services/item.service.js";

const router = Router();

router.post("/", crearItemController)

router.patch("/:id", actualizarItemController)

router.get("/", obtenerItemsController)

router.delete(`/:id`, borrarItemController)


export default router;