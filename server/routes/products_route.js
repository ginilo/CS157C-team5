const express = require('express');
const router = express.Router();
const client = require('../redisClient')

router.get('/all', async (req, res) => {
    //res.send('products route here')
    try {
        let list = [];
        const product_keys = await client.keys("product_*");
        for (let i = 0; i < product_keys.length; i++) {
            const item = await getProduct(product_keys[i])
            list.push(item);
        }
        res.status(200).send(list);
    } catch (err) {
        res.status(500).send(err.message)
    }
    
})

router.get('/category/:category', async (req, res) => {
    const key = req.params.category;
    try {
        const items = await client.sMembers(key)
        let array = []
        for (let i = 0; i < items.length; i++) {
            const item = await getProduct(items[i])
            array.push(item)
        }
        res.status(200).send(array)
    } catch (err) {
        res.status(500).send(err.message)
    }
})


router.post("/create", async (req, res) => {
    const id = await client.incr("next_product_id")
    const key = "product_" + id;

    const name = req.body.name;
    const quantity = req.body.quantity;
    const image_url = req.body.image_url;
    const category = req.body.category;

    try {
        const fieldsAdded = await client.hSet(key, {
            name: name,
            quantity: quantity,
            image_url: image_url,
            category: category,
            product_id: key
        })
        await client.sAdd(category, key);
        await client.sAdd("categories", category);
        res.status(200).send('done, fields added: ' + fieldsAdded);
    } catch (err) {
        res.status(500).send(err.message)
    }

})

async function getProduct(product_id) {
    let item = {}
    try {
        item = client.hGetAll(product_id)
    } catch (err) {
        console.log(err.message)
    }
    return item;
}

router.get('/item/:id', async (req, res) => {
    const product_id = req.params.id
    try {
        const item = await getProduct(product_id)
        res.status(200).send(item);
    } catch (err) {
        res.status(500).send(err.message)
    }
})


router.post('/item/update', async (req, res) => {
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    const name = req.body.name;
    const image_url = req.body.image_url;
    const category = req.body.category;

    try {
        const oldCategory = await client.hGet(product_id, "category")
        await client.sRem(oldCategory, product_id)
        await client.sAdd(category, product_id)
        await client.sAdd("categories", category)

        await client.hSet(product_id, {
            "quantity": quantity,
            "name": name,
            "image_url": image_url,
            "category": category
        })
        res.status(200).send("done");
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/item/delete/:id', async (req, res) => {
    const product_id = req.params.id;
    try {
        const keys = await client.hKeys(product_id);
        const category = await client.hGet(product_id, "category");
        for (let i = 0; i < keys.length; i++) {
            await client.hDel(product_id, keys[i]);
        }
        await client.sRem(category, product_id);
        res.status(200).send("done");
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/category/categories/all', async (req, res) => {
    try {
        const categories = await client.sMembers("categories");
        res.status(200).send(categories);
    } catch (err) {
        res.status(500).send(err.message)
    }
})
module.exports = router;