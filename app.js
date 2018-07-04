const logger = require('./src/logger');
const db = require('./db');

module.exports = {
    /**
     * Application start - starts server and DB.
     * @param app Express application
     * @return http.Server
     */
    start: (app) => {
        // port under which application run
        const port = process.env.PORT || 8000;

        // start app - wait for DB connection (greacefull start)
        return db.connect()
            .then(() => app.listen(port, () => {
                logger.info('Server listening on %d, in %s mode', port, app.get('env'));
            
                // Here we send the ready signal to PM2
                process.send ? process.send('ready') : null;
            }), err => logger.error('DB error:', err));
    },
    /**
     * Application gracehul shutdown
     * https://pm2.io/doc/en/runtime/best-practices/graceful-shutdown/
     * @param server Http server (object resolved in open method)
     */
    shutdown: (server) => {
        return new Promise((resolve, reject) => {
            // Stops the server from accepting new connections and finishes existing connections.
            server.close((err) => {
                if (err) {
                    reject(err);
                }
                // close your database connection and exit with success (0 code)
                return db.disconnect().then(resolve, reject);
            });
        })
            .then(() => process.exit(0), err => {
                logger.error(err);
                process.exit(1);
            });
    }
};