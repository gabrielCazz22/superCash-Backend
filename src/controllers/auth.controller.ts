
import { Response, Request } from "express";
import { iniciarSesion, registrarUsuario } from "../services/auth.service.js";
import { generarToken } from "../services/jwt.service.js";



export const iniciarSesionController = async (req: Request, res: Response) => {

    const { correo, password } = req.body;


    if (!correo || !password) {
        res.status(400).json({
            error: "Completa los campos obligatorios"
        });
        return;
    }

    let usuarioVerificado;

    try {


        usuarioVerificado = await iniciarSesion({ correo, password });

    } catch (error) {

        console.error("Error en el inicio de sesión", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });

        return;
    }


    if (usuarioVerificado === null) {
        res.status(401).json({
            error: "Correo o contraseña incorrectos"
        });
        return;
    }

    const token = generarToken(usuarioVerificado.id)


    res.status(200).json({ usuarioVerificado, token });
};




export const registroController = async (req: Request, res: Response) => {

    const { nombre_usuario, correo, password } = req.body;


    if (!nombre_usuario || !correo || !password) {
        res.status(400).json({
            error: "Completa los campos obligatorios"
        });
        return;
    }

    let usuarioNuevo;

    try {

        // El servicio genera el hash de la contraseña
        // e intenta insertar al usuario en PostgreSQL.
        usuarioNuevo = await registrarUsuario({
            nombre_usuario,
            correo,
            password
        });

    } catch (error) {


        if (typeof error === "object" && error !== null) {


            if ("code" in error) {


                if (error.code === "23505") {


                    res.status(409).json({
                        error: "El correo ya está registrado"
                    });


                    return;
                }
            }
        }


        console.error("Error en el registro", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });

        return;
    }


    res.status(201).json(usuarioNuevo);

};
