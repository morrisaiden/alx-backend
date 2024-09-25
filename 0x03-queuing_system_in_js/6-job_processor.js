import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Function to send notifications
const sendNotification = (phoneNumber, message) => {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

};

// Process jobs in the queue for the 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
    // Call the sendNotification function with job data
    sendNotification(job.data.phoneNumber, job.data.message);

    // Mark the job as completed
    done();
});