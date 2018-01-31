const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config');
const masterProcess = require('./src/masterProcess');

if (require('cluster').isMaster) {
    return masterProcess();
}

const port = process.env.PORT || 8000;
const app = express();

mongoose.connect(config.database, { useMongoClient: true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

require('./src/routes/setup')(app);
require('./src/routes/api')(app);


app.listen(port, () => {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});