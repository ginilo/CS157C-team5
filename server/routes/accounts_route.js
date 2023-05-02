const express = require('express');
const router = express.Router();
const client = require('../redisClient')

router.post("/create", async (req, res) => {
    const id = await client.incr("next_account_id"); 

    const username = req.body.username;
    const password = req.body.password;
    const account_type = req.body.account_type;

    try{
        await client.hSet(username, {
            account_id: id,
            password: password,
            account_type: account_type,
        })
        res.status(200).send("done");

    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;