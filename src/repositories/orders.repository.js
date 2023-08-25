import dayjs from "dayjs";
import { db } from "../database/database.conection.js";

export async function createOrderDB(body) {
  const { clientId, cakeId, quantity, totalPrice } = body;

  await db.query(
    `INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`,
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
  const check = await db.query(`SELECT "id" FROM "cakes" WHERE "id" = $1`, [
    body.cakeId,
  ]);

  return check.rowCount > 0;
}

export async function checkClientExistence(body) {
  const check = await db.query(`SELECT "id" FROM "clients" WHERE "id" = $1`, [
    body.clientId,
  ]);

  return check.rowCount > 0;
}

export async function getAllOrdersDB() {
  const result = await db.query(`SELECT 
    c."id" AS "client.id", 
    c."name" AS "client.name", 
    c."address" AS "client.address", 
    c."phone" AS "client.phone", 
    k."id" AS "cake.id", 
    k."name" AS "cake.name", 
    k."price" AS "cake.price", 
    k."description" AS "cake.description",
    k."image" AS "cake.image",
    o."id" AS "orderId", 
    o."createdAt", 
    o."quantity", 
    o."totalPrice" 
    FROM "orders" o
    JOIN "clients" c ON o."clientId" = c."id"
    JOIN "cakes" k ON o."cakeId" = k."id"
  `);

  const formattedResult = result.rows.map((row) => {
    return {
      client: {
        id: row["client.id"],
        name: row["client.name"],
        address: row["client.address"],
        phone: row["client.phone"],
      },
      cake: {
        id: row["cake.id"],
        name: row["cake.name"],
        price: row["cake.price"],
        description: row["cake.description"],
        image: row["cake.image"],
      },
      orderId: row.orderId,
      createdAt: dayjs(row.createdAt).format("YYYY-MM-DD HH:mm"),
      quantity: row.quantity,
      totalPrice: row.totalPrice,
    };
  });

  return formattedResult;
}

export async function getOrderByIdDB(orderId) {
  const result = await db.query(
    `
    SELECT 
      c.id AS "client.id", 
      c.name AS "client.name", 
      c.address AS "client.address", 
      c.phone AS "client.phone", 
      k.id AS "cake.id", 
      k.name AS "cake.name", 
      k.price AS "cake.price", 
      k.description AS "cake.description",
      k.image AS "cake.image",
      o.id AS "orderId", 
      o."createdAt" AS "createdAt", 
      o.quantity AS "quantity", 
      o."totalPrice" AS "totalPrice"
    FROM orders o
    JOIN clients c ON o."clientId" = c.id
    JOIN cakes k ON o."cakeId" = k.id
    WHERE o.id = $1
  `,
    [orderId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    client: {
      id: row["client.id"],
      name: row["client.name"],
      address: row["client.address"],
      phone: row["client.phone"],
    },
    cake: {
      id: row["cake.id"],
      name: row["cake.name"],
      price: row["cake.price"],
      description: row["cake.description"],
      image: row["cake.image"],
    },
    orderId: row.orderId,
    createdAt: dayjs(row.createdAt).format("YYYY-MM-DD HH:mm"),
    quantity: row.quantity,
    totalPrice: row.totalPrice,
  };
}

export async function getClientOrdersDB(clientId) {
  const result = await db.query(
    `SELECT
    o.id AS "orderId",
    o.quantity AS "quantity",
    o."createdAt" AS "createdAt",
    o."totalPrice" AS "totalPrice",
    k.name AS "cakeName"
    FROM orders o
    JOIN cakes k ON o."cakeId" = k.id
    WHERE o."clientId" = $1`,
    [clientId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const formattedResult = result.rows.map((row) => {
    return {
      orderId: row["orderId"],
      quantity: row["quantity"],
      createdAt: row["createdAt"],
      totalPrice: row["totalPrice"],
      cakeName: row["cakeName"],
    };
  });

  return formattedResult;
}
