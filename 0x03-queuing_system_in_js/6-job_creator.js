import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create an object containing the Job data
const jobData = {
    phoneNumber: '1234567890',
    message: 'Hello, this is a test notification',
};

// Create a job named 'push_notification_code'
const job = queue.create('push_notification_code', jobData).save((err) => {
    if (err) {
        console.error('Error creating job:', err);
    } else {
        console.log(`Notification job created: ${job.id}`);
    }
});

// Listen for job completion
job.on('complete', () => {
    console.log('Notification job completed');
});

// Listen for job failure
job.on('failed', (errorMessage) => {
    console.log('Notification job failed', errorMessage);
});