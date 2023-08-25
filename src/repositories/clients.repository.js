import { db } from "../database/database.conection.js";

export async function createClientDB(body) {
  await db.query(
    `INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`,
    [body.name, body.address, body.phone]
  );
}
