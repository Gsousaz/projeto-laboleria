import {
  checkCakeExistence,
  checkClientExistence,
  createOrderDB,
} from "../repositories/orders.repository.js";

export async function createOrder(req, res) {
  try {
    const cakeExists = await checkCakeExistence(req.body);
    if (!cakeExists) {
      return res.status(404).send("O bolo selecionado não está disponível");
    }

    const clientExists = await checkClientExistence(req.body);
    if (!clientExists) {
      return res.status(404).send("Cliente não encontrado!");
    }
    await createOrderDB(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
}