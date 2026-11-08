import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../services/jwt.service.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {



    const header = req.headers.authorization


    if (!header) {
        res.status(401).json({
            error: "Usuario no Identificado"
        });
        return;

    }

    let partes = header.split(" ");

    if (partes[1] === undefined || partes[0] !== "Bearer" || partes[1] === null) {
        res.status(401).json({
            error: "Usuario no Identificado"
        });
        return;

    }


    const token = header.split(" ")[1];

    try {

        verificarToken(token);

    } catch (error) {

        res.status(401).json({
            error: "Error inesperado"
        });
        return;
    }


    next();
}