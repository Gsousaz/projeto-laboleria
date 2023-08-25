import {
  checkCakeExistence,
  checkClientExistence,
  createOrderDB,
  getAllOrdersDB,
  getOrderByIdDB,
  getClientOrdersDB,
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

export async function getAllOrders(req, res) {
  try {
    const formattedResult = await getAllOrdersDB();
    res.send(formattedResult);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await getOrderByIdDB(orderId);

    if (!order) {
      return res.status(404).send("Pedido não encontrado");
    }

    res.send(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getClientOrders(req, res) {
  try {
    const clientId = req.params.id;
    const clientOrders = await getClientOrdersDB(clientId);
    console.log("clientOrders", clientOrders)
    if (!clientOrders) {
      return res.status(404).send("Pedido não encontrado");
    }
    res.send(clientOrders);
  } catch (err) {
    return err.message;
  }
}
