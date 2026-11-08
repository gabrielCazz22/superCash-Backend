import jwt from "jsonwebtoken";


const clave = process.env.JWT_SECRET

export function generarToken(id: number) {

    if (!clave) {
        throw new Error("JWT_SECRET no está configurada");
    }

    const tokenGenerado = jwt.sign({ id }, clave, { expiresIn: "1h" });

    return tokenGenerado

}

export function verificarToken(token: string) {

    if (!clave) {
        throw new Error("JWT_SECRET no está configurada");
    }

    const datos = jwt.verify(token, clave);

    return datos;
}

