//express dependency
const express = require('express');
const app = express();



//listening port number
const PORT_NUMBER = 5000;

app.use(express.json());

//redis client
const client = require('./redisClient')

app.get("/", (req, res) => {
    res.send('hello');
})

//routes
const products = require('./routes/products_route');
const orders = require('./routes/orders_route')

//use the routes
app.use("/products", products)
app.use("/orders", orders)


app.post("/account/create", async (req, res) => {
    const id = await client.incr("next_account_id"); 

    const username = req.body.username;
    const password = req.body.password;
    const account_type = req.body.account_type;
    const name = req.body.name;

    try{
        await client.hSet(username, {
            account_id: id,
            password: password,
            account_type: account_type,
            name: name
        })
        res.status(200).send("done");

    } catch (err) {
        res.status(500).send(err.message)
    }
})


app.listen(PORT_NUMBER, () => {
    console.log(`Listening at port ${PORT_NUMBER}`);
});