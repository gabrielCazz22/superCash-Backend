import { Producto } from "../interfaces/item.interface.js";

export type UnidadMedida = 'kg' | 'g' | 'l' | 'pz';

export type CrearProducto = Omit<Producto, "id"> & {
    comprado?: boolean;
};