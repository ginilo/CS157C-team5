const express = require('express');
const app = express();

const PORT_NUMBER = 5000;

app.use(express.json());

const redis = require('redis');
const client = redis.createClient();

client.connect();

client.on('error', err => console.log('Redis server error', err));

app.get("/", (req, res) => {
    res.send('hello');
})


app.listen(PORT_NUMBER);