import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Log a message on connection success or failure
client.on('connect', async () => {
  console.log('Redis client connected to the server');

  // Call the functions after the client is connected
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

// Promisify the Redis get function
const getAsync = promisify(client.get).bind(client);

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print); // 'redis.print' is used to display the reply from Redis
}

// Async function to display the value of a school using async/await
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply); // Log the value to the console
  } catch (err) {
    console.log(err); // Handle any errors
  }
}
