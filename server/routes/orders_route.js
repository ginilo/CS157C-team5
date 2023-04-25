const express = require('express');
const router = express.Router();
const client = require('../redisClient')


router.get('/', async (req, res) => {
    try {    
        const allOrdersList = await client.keys("order_*")
        const orders = await getOrders(allOrdersList);
        res.status(200).json({ orders: orders})
    } catch (err) {
        res.status(500).send(err.message)
    }
})

async function getOrders(order_ids) {
    try {
        let orderList = [];
        for (let i = 0; i < order_ids.length; i ++ ) {
            const item = await client.hGetAll(order_ids[i])
            orderList.push(item)
        }
        return orderList;
    } catch (err) {
        console.log(err);
    }
}


router.get("/:id", async (req, res) => {
    const key = "orders_" + req.params.id;

    try {
        const responseJson = {};
        responseJson['account_id'] = req.params.id;
        const orders = await client.sMembers(key);
        const orderList = await getOrders(orders);
        responseJson['orders'] = orderList;
        res.status(200).send(responseJson);
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