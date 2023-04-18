//express dependency
const express = require('express');
const app = express();



//listening port number
const PORT_NUMBER = 5000;

app.use(express.json());

//redis client
const client = require('./redisClient')

client.connect();

client.on('error', err => console.log('Redis server error', err));

app.get("/", (req, res) => {
    res.send('hello');
})


app.listen(PORT_NUMBER);