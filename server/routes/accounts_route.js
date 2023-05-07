const express = require('express');
const router = express.Router();
const client = require('../redisClient')

router.post("/create", async (req, res) => {
    const id = await client.incr("next_account_id"); 

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const account_type = req.body.account_type;

    try{
        const user = await client.HGETALL(username);

        if (Object.keys(user).length !== 0) {res.send("exists")}
        else{await client.hSet(username, {
            account_id: id,
            password: password,
            account_type: account_type,
            email: email,
            phone: phone,
            fname: fname,
            lname: lname
        })
        res.status(200).send("done");}
    } catch (err) {
        res.status(500).send(err.message)
    }
})


module.exports = router;