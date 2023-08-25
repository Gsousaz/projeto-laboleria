import {
  checkCakeExistence,
  createCakeDB,
} from "../repositories/cakes.repository.js";

export async function createCake(req, res) {
  const { name, price, image, description } = req.body;
  try {
    const cakeExists = await checkCakeExistence(req.body);

    if (cakeExists) {
      return res.status(409).send("Bolo já cadastrado!");
    }

    await createCakeDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.send(err.message);
  }
}
