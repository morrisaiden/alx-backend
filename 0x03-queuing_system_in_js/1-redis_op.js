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

//Function to set a new school in Redis
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, reply) => {
        console.log(reply); // Log the value to the console
    });
}

// Call the function as per the requirements
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');