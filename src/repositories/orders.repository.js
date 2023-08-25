import dayjs from "dayjs";
import { db } from "../database/database.conection.js";

export async function createOrderDB(body) {
  const { clientId, cakeId, quantity, totalPrice } = body;

  await db.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`,
    [
      clientId,
      cakeId,
      quantity,
      totalPrice,
      dayjs().format("YYYY-MM-DD HH:mm:ss"),
    ]
  );
}

export async function checkCakeExistence(body) {
  const check = await db.query(`SELECT id FROM cakes WHERE id = $1`, [
    body.cakeId,
  ]);

  return check.rowCount > 0;
}

export async function checkClientExistence(body) {
  const check = await db.query(`SELECT id FROM clients WHERE id = $1`, [
    body.clientId,
  ]);

  return check.rowCount > 0;
}
