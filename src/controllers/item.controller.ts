import { Request, Response } from "express";
import { crearItem, obtenerItems, borrarItem, actualizarItem } from "../services/item.service.js";




export const crearItemController = (req: Request, res: Response) => {

    const { nombre, unidad, cantidad, precioUnitario } = req.body;

    if (!nombre || !unidad || cantidad === undefined) {
        res.status(400).json({
            error: 'Por favor, rellena todos los campos obligatorios'
        });
        return;
    }

    const nuevoProducto = crearItem({
        nombre: nombre,
        unidad: unidad,
        cantidad: cantidad,
        precioUnitario: precioUnitario
    });

    res.status(201).json(nuevoProducto)



}

export const actualizarItemController = (req: Request, res: Response) => {
    const { id } = req.params;
    const datomodificado = req.body;
    actualizarItem(datomodificado)


}

export const obtenerItemsController = (req: Request, res: Response) => {

    const listaItems = obtenerItems()
    res.status(200).json(listaItems)


}

export const borrarItemController = (req: Request, res: Response) => {

    const { id } = req.params;

    if (typeof id !== 'string') {
        res.status(400).json({ error: "El ID proporcionado no es válido" });
        return;
    }

    const borrado = borrarItem(id);

    if (!borrado) {
        res.status(404).json({ error: "item no encontrado" });
        return;
    };

    res.status(200).json({ mensaje: "Item eliminado con éxito" });
};

