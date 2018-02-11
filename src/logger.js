// Generally we need to use a combination of 2 or more modules to get a proper logging environment setup.

// Winston is a multi-transport async logging library for Node.js.
// It provides the following default log levels:
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const winston = require('winston');


const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
// It is also important to mention that Winston too will write the error level logs to the stderr
// and the info level logs to stdout. This way Winston works well with Morgan
// as all our error and out logs would be in separate files.
const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toISOString();
            }
        })
    ]
});

module.exports = logger;