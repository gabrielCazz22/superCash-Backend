import { Router } from "express";
import { 
    crearItemController, 
    obtenerItemsController, 
    borrarItemController, 
    actualizarItemController 
} from "../controllers/item.controller.js";

const router = Router();

router.post("/", crearItemController);
router.get("/", obtenerItemsController);
router.patch("/:id", actualizarItemController);
router.delete("/:id", borrarItemController);


export default router;