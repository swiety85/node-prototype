// Express framework
const express = require('express');

// Body-parser extracts the entire body portion of an incoming request stream and exposes it
// on req.body as something easier to interface with. It's not required, because you could do all of that yourself.
// However, it will most likely do what you want and save you the trouble.
const bodyParser = require('body-parser');

// Morgan is used for logging HTTP request details.
// Morgan supports a handful of pre-defined logged formats with well-know names/structures:
// combined, common, dev, short, tiny. That string is telling morgan which log format you'd like it to use.
// (https://www.npmjs.com/package/morgan#predefined-formats)
const morgan = require('morgan');

const logger = require('./src/logger');

const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config');

const port = process.env.PORT || 8000;
const app = express();

mongoose.connect(config.database, { useMongoClient: true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







// We've used Morgan as a middleware twice. The reason is that we're using morgan
// to separate our logs to two different write streams based on the status code.
// Morgan provides the ability to skip logs using a skip function passed in the options argument.
// Using that we log the requests with statusCode < 400 to the stdout and
// requests with statusCode >= 400 to the stderr.
// This will be extremely helpful when we run our Node.js service using a tool like PM2.
// PM2 by default creates separate log files for our stdout and stderr streams.
// Note - Morgan provides many more formats for logging. Don't use dev format in production environments.
// "dev" format info will look as follows: GET / 200 0.235 ms - 12
app.use(morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr
}));

app.use(morgan('dev', {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout
}));





require('./src/routes/setup')(app);
require('./src/routes/api')(app);


app.listen(port, () => {
    logger.info('Express server listening on %d, in %s mode', port, app.get('env'));
    // Here we send the ready signal to PM2
    // process.send('ready');
});