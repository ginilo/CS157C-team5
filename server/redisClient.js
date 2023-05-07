const redis = require('redis');
const client = redis.createClient({host: 'localhost', port: 6379});

async function connect () {
    await client.connect();

}

connect();
client.on('error', err => console.log('Redis server error', err));


module.exports = client;