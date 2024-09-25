import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Log a message on connection success or failure
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('err', (err) => {
    console.log('Redis client not connected to the server:', err);
});

// Set multiple fields in the hash 'HolbertonSchools'
client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

// Retrieve and display all fields and values of the hash 'HolbertonSchools'
client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
        console.error('Error retrieving hash:', err);
    } else {
        console.log(reply); // Log the entire hash object
    }
});