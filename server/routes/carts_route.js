const express = require('express');
const router = express.Router();
const client = require('../redisClient')

router.get('/', async (req, res) => {
    if (req.session.user == null) {
        res.status(401).send("not logged in")
        return;
    }
    const account_id = req.session.user.account_id;
    try {
        const cart = await client.hGetAll(account_id)
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/add', async (req, res) => {
    if (req.session.user == null) {
        res.status(401).send("not logged in");
        return;
    }
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const account_id = req.session.user.account_id;

    const cartKey = "cart_" + account_id;

    try {
        await client.hSet(cartKey, product_id, quantity)
        res.status(200).send('done')
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;