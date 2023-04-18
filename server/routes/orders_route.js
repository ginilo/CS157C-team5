const express = require('express');
const router = express.Router();
const client = require('../redisClient')

router.get('/', (req, res) => {
    res.send('orders route here')
})

router.get("/:id", async (req, res) => {
    const key = "orders_" + req.params.id;
    try {
        const orders = await client.sMembers(key);
        console.log(orders)
        const responseJson = {};
        responseJson['account_id'] = req.params.id;
        let orderList = [];
        orders.forEach(async (order_id) => {
            const item = await client.hGetAll(order_id);
            console.log(item);
            orderList.push(item);
        })
        responseJson['orders'] = orderList;
        res.status(200).json(responseJson);
    } catch (err) {
        res.status(500).send(err.message)
    }
    
})


router.post("/create", async (req, res) => {
    const id = await client.incr("next_order_id");
    const key = "order_" + id;
    const order = req.body
    const account_id = req.body.account_id;
    const setKey = "orders_" + account_id;
    try {
        for (let x in order) {
            await client.sAdd(setKey, key);
            await client.hSet(key, x, order[x]);
        }
        res.status(200).send("done");
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;