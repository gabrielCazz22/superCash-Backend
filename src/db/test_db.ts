import { pool } from "../db/db.js";

async function testConnection() {
    try {
        const result = await pool.query(
            "SELECT current_database(), current_user"
        );

        console.log("Conexión exitosa:", result.rows[0]);
    } catch (error) {
        console.error("Error de conexión:", error);
    } finally {
        await pool.end();
    }
}

testConnection();