const express = require('express');
const cluster = require('cluster'); //no need to download anything
const os = require('os'); //no need to download anything
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

if (cluster.isMaster) {
    const numWorkers = process.env.WEB_CONCURRENCY || os.cpus().length;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const app = express();
    const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
    const config = require('./config'); // get our config file
    // const User = require('./src/models/user'); // get our mongoose model

    const port = process.env.PORT || 8000; // used to create, sign, and verify tokens
    mongoose.connect(config.database, { useMongoClient: true }); // connect to database
    app.set('secretKey', config.secret); // secret variable

    app.use(express.static('public'));
    // use body parser so we can get info from POST and/or URL parameters
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // use morgan to log requests to the console
    app.use(morgan('dev'));

    require('./src/routes/setup')(app);
    require('./src/routes/api')(app);

    app.get('/test', (req, res) => {
        res.status(200).json({test: 'ok!'});
    });

    // Start server
    app.listen(port, () => {
        console.log('Express server listening on %d, in %s mode', port, app.get('env'));
    });
}