const express = require('express');
const router = express.Router();
const client = require('../redisClient')

router.get('/', (req, res) => {
    res.send('products route here')
})

router.get('/:category', (req, res) => {
    res.send(req.params.category)
})

router.post('/update', async (req, res) => {
    const name = req.body.name
    const category = req.body.category
    const quantity = req.body.quantity
    try {
        await client.set(name, quantity);
        await client.sAdd(category, name);
        res.status(200).send('done');
    } catch (err) {
        res.status(500).send(err.message);
    }
    
})

module.exports = router;