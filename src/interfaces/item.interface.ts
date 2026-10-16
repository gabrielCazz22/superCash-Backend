
export type UnidadMedida = 'kg' | 'g' | 'l' | 'pz';


export interface Producto {
    id: string,
    nombre: string,
    unidad: string,
    cantidad: number,
    precioUnitario?: number,
    comprado: boolean
}

