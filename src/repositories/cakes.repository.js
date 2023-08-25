import { db } from "../database/database.conection.js";

export async function checkCakeExistence(body) {
    const check = await db.query(`SELECT id FROM cakes WHERE name = $1`, [body.name]);
  
    return check.rowCount > 0;
  }
  

export async function createCakeDB(body) {
  await db.query(
    `INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)`,
    [body.name, body.price, body.image, body.description]
  );
}