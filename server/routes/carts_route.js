const express = require("express");
const router = express.Router();
const client = require("../redisClient");

router.get("/", async (req, res) => {
  if (req.session.user == null) {
    res.status(401).send("not logged in");
    return;
  }
  const account_id = req.session.user.account_id;
  const key = "cart_" + account_id;
  const products = [];
  try {
    const cart = await client.hGetAll(key);

    for (const itemKey in cart) {
      //itemKey is the product_id
      const productInfo = await client.HGETALL(itemKey);
      productInfo.quantity = cart[itemKey];
      products.push(productInfo);
    }

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/add", async (req, res) => {
  if (req.session.user == null) {
    res.status(401).send("not logged in");
    return;
  }
  const product_id = req.body.product_id;
  const quantity = req.body.qty;
  const account_id = req.session.user.account_id;
  const cartKey = "cart_" + account_id;

  try {
    //decrease product quantity
    let oldQuantity = await client.hGet(product_id, "quantity");
    let newQuantity = oldQuantity - quantity;
    await client.hSet(product_id, "quantity", newQuantity);

    const oldcartQuantity = await client.hGet(cartKey, product_id);
    let newCartQuantity = parseInt(quantity);

    if (oldcartQuantity !== null) {
      newCartQuantity = newCartQuantity + parseInt(oldcartQuantity);
    }

    //add to the quantity to the cart
    await client.hSet(cartKey, product_id, newCartQuantity);
    await client.zIncrBy("popular", 1, product_id);
    res.status(200).send("done");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/remove", async (req, res) => {
  if (req.session.user == null) {
    res.status(401).send("not logged in");
    return;
  }
  const product_id = req.body.product_id;
  const account_id = req.session.user.account_id;
  const quantity = parseInt(req.body.quantity);

  const cartKey = "cart_" + account_id;

  try {
    await client.hDel(cartKey, product_id);

    //add back the quantity to the product
    const oldQty = await client.hGet(product_id, "quantity");
    const newQty = parseInt(oldQty) + quantity;

    await client.hSet(product_id, "quantity", newQty);

    res.status(200).send("done");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
