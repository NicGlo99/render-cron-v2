const express = require('express');
const CronJob = require('cron').CronJob;
const app = express();

function myFunc() {
    console.log('Cron job executed!');
}

const job = new CronJob('*/1 * * * *', myFunc);

job.start();

app.get('/healthcheck', (req, res) => {
    // Verifica lo stato del server qui
    if (job.running) {
        res.status(200).send('Server is running');
    } else {
        res.status(500).send('Server is not running');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
