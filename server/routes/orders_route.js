const express = require('express');
const router = express.Router();
const client = require('../redisClient')


router.get('/', async (req, res) => {
    try {    
        const allOrdersList = await client.keys("order_*")
        const orders = await getOrders(allOrdersList);
        res.status(200).send(orders)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/FOrders', async (req, res) => {
    try {    
        const allOrdersList = await client.keys("order_*")
        const orders = await getfulfilledOrders(allOrdersList);
        res.status(200).send(orders)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

async function getfulfilledOrders(order_ids) {
    try {
        let orderList = [];
        for (let i = 0; i < order_ids.length; i ++ ) {
            const item = await client.hGetAll(order_ids[i])
            
            if(item.status ===  "Fulfilled"){
                orderList.push(item)
            }
            
        }
        return orderList;
    } catch (err) {
        console.log(err);
    }
}

router.get('/UFOrders', async (req, res) => {
    try {    
        const allOrdersList = await client.keys("order_*")
        const orders = await getUnfulfilledOrders(allOrdersList);
        res.status(200).send(orders)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

async function getUnfulfilledOrders(order_ids) {
    try {
        let orderList = [];
        for (let i = 0; i < order_ids.length; i ++ ) {
            const item = await client.hGetAll(order_ids[i])
            
            if(item.status ===  "Placed"){
                item["order_id"] = order_ids[i]
                orderList.push(item)
            }
            
        }
        return orderList;
    } catch (err) {
        console.log(err);
    }
}



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


router.get("/id", async (req, res) => {
    const key = "orders_" + req.session.user.account_id;

    try {
        const orders = await client.lRange(key, 0, -1);
        const orderList = await getOrders(orders);
        res.status(200).send(orderList)
    } catch (err) {
        res.status(500).send(err.message)
    }
    
})


router.post("/create", async (req, res) => {
    if (req.session.user == null) {
        res.status(401).send("not logged in")
        return;
    }
    const id = await client.incr("next_order_id");
    const key = "order_" + id;
    
    const account_id = req.session.user.account_id;

    const cart = await client.HGETALL("cart_" + account_id);
    
    const pickup_date = req.body.pickedDate;
    
    const listKey = "orders_" + account_id;
    const status = "Placed";
    const placeDate = new Date().toDateString();
    try {
        await client.lPush(listKey, key);
        for (const x in cart) {
            await client.hSet(key, x, cart[x]);
            
        }
        await client.hSet(key, "account_id", account_id);
        await client.hSet(key, "pickup_date", pickup_date);
        await client.hSet(key, "status", status);
        await client.hSet(key, "order_placed", placeDate);

        await client.del("cart_" + account_id);

        res.status(201).send("done");
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;