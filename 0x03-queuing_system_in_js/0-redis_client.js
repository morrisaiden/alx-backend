import redis from 'redis';

// create a redis client
const client = redis.createClient();

// handle successful connection
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Handle connection errors
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});