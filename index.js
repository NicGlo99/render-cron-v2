const express = require('express');
const CronJob = require('cron').CronJob;
const app = express();
const telegramToken = '6297025529:AAFDxi-Fh8whw84AYTtwaQZ8NYM6jQ8jwLw';
const https = require('https');
function myFunc() {
    console.log('Cron job executed!');
    const message = `Cron eseguito correttamente alle ${new Date().toLocaleString()}`;
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${telegramToken}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(JSON.stringify({
        chat_id: '@VercelCronBotLog',
        text: message
    }));

    req.end();
}

const job = new CronJob('0 * * * *', myFunc);

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
