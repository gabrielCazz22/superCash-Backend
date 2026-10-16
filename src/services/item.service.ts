import crypto from 'node:crypto'
import { Producto, UnidadMedida } from '../interfaces/item.interface.js';

export interface DatosCrearProducto {

    nombre: string;
    unidad: UnidadMedida;
    cantidad: number;
    precioUnitario?: number;
}

const itemDB: Producto[] = [];


export const crearItem = (datos: DatosCrearProducto): Producto => {

    const nuevoItem: Producto = {
        id: crypto.randomUUID(),
        nombre: datos.nombre,
        unidad: datos.unidad,
        cantidad: datos.cantidad,
        precioUnitario: datos.precioUnitario,
        comprado: false

    };

    itemDB.push(nuevoItem);
    return (nuevoItem)


};


export const actualizarItem = (id: string) => {


}

export const obtenerItems = (): Producto[] => {
    return itemDB;
};

export const borrarItem = (id: string) => {

    const index = itemDB.findIndex(item => item.id === id)
    if (index < 0) {
        return false;
    }

    itemDB.splice(index, 1);
    return true

}
