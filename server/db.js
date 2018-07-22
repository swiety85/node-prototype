// Mongoose is one of best Mongo DB management library
const mongoose = require('mongoose');

mongoose.connection.on('connected', console.info);
mongoose.connection.on('disconnected', console.info);

module.exports = {
    // establish connection to Mongo DB
    connect: () => {
        return mongoose.connect(process.env.DATABASE);
    },
    disconnect: () => {
        return mongoose.connection.close();
    }
};