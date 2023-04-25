const CronJob = require('cron').CronJob;

function myFunc() {
    console.log('Cron job executed!');
}

const job = new CronJob('*/1 * * * *', myFunc);

job.start();
