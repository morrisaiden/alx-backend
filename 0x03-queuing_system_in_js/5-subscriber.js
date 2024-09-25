import redis from 'redis';

// Create a Redis Client for the subscriber
const subscriber = redis.createClient();

// Handle connection events
subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
});

subscriber.on('err', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscriber to the "holberton school channel"
subscriber.subscribe('holberton school channel');

// Process messages from the subscribed channel
subscriber.on('message', (channel, message) => {
    console.log(message);

    // If the message is "KILL_SERVER", unsubscribe and quit
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe();
        subscriber.quit();
    }
});