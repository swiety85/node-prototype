// Express framework
const express = require('express');

// Body-parser extracts the entire body portion of an incoming request stream and exposes it
// on req.body as something easier to interface with. It's not required,
// because you could do all of that yourself.
// However, it will most likely do what you want and save you the trouble.
const bodyParser = require('body-parser');

// Morgan is used for logging HTTP request details.
// Morgan supports a handful of pre-defined logged formats with well-know names/structures:
// combined, common, dev, short, tiny. That string is telling morgan which log format you'd like it to use.
// (https://www.npmjs.com/package/morgan#predefined-formats)
const morgan = require('morgan');

// Helmet helps you secure your Express apps by setting various HTTP headers.
// It's not a silver bullet, but it can help!
const helmet = require('helmet');

// Mongoose is one of best Mongo DB management library
const mongoose = require('mongoose');

// Basic logger with Winston which will allow us to set log level according to the environment
// and also print the timestamp for every log.
const logger = require('./src/logger');

const routes = require('./src/routes');

const auth = require('./src/authentication');

// establish connection to Mongo DB
const mongoseConnectPromise = mongoose.connect(process.env.DATABASE);
mongoose.connection.on('connected', console.info);
mongoose.connection.on('disconnected', console.info);

// create express app
const app = express();

// Helmet will include following middleware functions:
// - dnsPrefetchControl controls browser DNS prefetching
// - frameguard to prevent clickjacking
// - hidePoweredBy to remove the X-Powered-By header
// - hsts for HTTP Strict Transport Security
// - ieNoOpen sets X-Download-Options for IE8+
// - noSniff to keep clients from sniffing the MIME type
// - xssFilter adds some small XSS protections
// It's best to use Helmet early in your middleware stack so that its headers are sure to be set.
app.use(helmet());

// Express middleware to serve static files - everything in "public" folder.
app.use(express.static('public'));

// Express middleware to parse application/x-www-form-urlencoded request bodies
// and populates it in request.body object as key-value pairs.
app.use(bodyParser.urlencoded({ extended: false }));

// Express middleware to parse application/json request bodies
// and populates it in request.body object as key-value pairs.
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

// Connect passport authentications
app.use(auth.initialize());

// Connect all our routes to the application
app.use('/', routes);

// port under which application run
const port = process.env.PORT || 8000;

// start app - wait for DB connection (greacefull start)
const server = mongoseConnectPromise.then(() => {
    return app.listen(port, () => {
        logger.info('Server listening on %d, in %s mode', port, app.get('env'));
    
        // Here we send the ready signal to PM2
        process.send ? process.send('ready') : null;
    });
}, err => console.error('DB error:', err));

// unhandled exception should restart app, because of unpredictable state after error
process.on('uncaughtException', (e) => {
    console.error(e); // try console.log if that doesn't work
    process.exit(10);
});

// event for greatfull shotdown
process.on('SIGINT', () => { // (on pm2 stop)
    console.info('SIGINT signal received.');
    greatfullShotdown()
        .catch(err => {
            console.error(err);
            process.exit(1);
        })
        .then(() => process.exit(0));
});
// event for greatfull shotdown
process.on('message', (msg) => {
    if (msg !== 'shutdown') {
        return ;
    }
    greatfullShotdown()
        .catch(err => {
            console.error(err);
            process.exit(1);
        })
        .then(() => process.exit(0));
});

// https://pm2.io/doc/en/runtime/best-practices/graceful-shutdown/
function greatfullShotdown() {
    return new Promise((resolve, reject) => {
        // Stops the server from accepting new connections and finishes existing connections.
        server.close((err) => {
            if (err) {
                console.error(err);
                process.exit(1);
                reject(err);
            }

            // close your database connection and exit with success (0 code)
            // for example with mongoose
            return mongoose.connection.close().then(resolve, reject);
        });
    });
}