import { pool } from '../db/db.js';
import bcrypt from 'bcrypt';



export interface IniciarSesion {

    correo: string;
    password: string;
}

export interface Registrarse {

    nombre_usuario: string;
    correo: string;
    password: string;
}

export const registrarUsuario = async (datos: Registrarse) => {

    const saltRounds = 10;
    const hashGenerado = await bcrypt.hash(datos.password, saltRounds)
    const consultaSql = `INSERT INTO usuarios (nombre_usuario, correo, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, nombre_usuario, correo`;

    const valores = [datos.nombre_usuario, datos.correo, hashGenerado];
    const resultado = await pool.query(consultaSql, valores);

    return resultado.rows[0];

}

export const iniciarSesion = async (datos: IniciarSesion) => {
    try {
        const consultaLoginSql = `SELECT * FROM usuarios WHERE correo = $1
    `
        const valores = [datos.correo];

        const resultado = await pool.query(consultaLoginSql, valores)

        if (resultado.rows.length === 0) {

            return null;

        }

        const usuario = resultado.rows[0]
        const coincide = await bcrypt.compare(datos.password, usuario.password_hash)

        if (!coincide) {
            return null;
        }

        return {
            id: usuario.id,
            nombre_usuario: usuario.nombre_usuario,
            correo: usuario.correo
        }

    }
    catch (error) {
        console.error("Error en el inicio de sesion", error);
        throw error;
    }





}

