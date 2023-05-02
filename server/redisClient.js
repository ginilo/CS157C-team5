const redis = require('redis');
const client = redis.createClient();

async function connect () {
    await client.connect();
}

connect();
client.on('error', err => console.log('Redis server error', err));

module.exports = client;