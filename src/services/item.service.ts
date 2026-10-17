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


export const actualizarItem = (id: string, cambiosNuevos: Partial<Producto>) => {
    const index = itemDB.findIndex(item => item.id === id);

    if (index === -1) {
        return null
    }

    itemDB[index] = {
        ...itemDB[index],
        ...cambiosNuevos
    }

    return itemDB[index]


}

export const obtenerItems = (): Producto[] => {
    return itemDB;
};

export const borrarItem = (id: string) => {

    const index = itemDB.findIndex(item => item.id === id)
    if (index === -1) {
        return false;
    }

    itemDB.splice(index, 1);
    return true

}
