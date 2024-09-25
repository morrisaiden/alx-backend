import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', function() {
  let queue;

  // Before each test, initialize a Kue queue in test mode
  beforeEach(function() {
    queue = kue.createQueue();
    queue.testMode.enter();  // Enter test mode to simulate job creation without processing
  });

  // After each test, clear the queue and exit the test mode
  afterEach(function() {
    queue.testMode.clear();  // Clear the jobs in the queue after each test
    queue.testMode.exit();   // Exit the test mode to clean up
  });

  it('should display an error message if jobs is not an array', function() {
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw(Error, 'Jobs is not an array');
  });

  it('should create two new jobs to the queue', function() {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' }
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate that two jobs were created
    expect(queue.testMode.jobs.length).to.equal(2);

    // Validate job details
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);

    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });
});
