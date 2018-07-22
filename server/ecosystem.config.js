module.exports = {
    apps: [
        {
            name: 'Node - Prototype',
            script: 'index.js',
            // watch: ['src', 'public'],
            // max means that PM2 will auto detect the number of available CPUs and run as many processes as possible
            instances : 'max',
            exec_mode : 'cluster',
            // errors output
            error_file : './logs/err.log',
            // console log output
            out_file : './logs/out.log',
            // by default each cluster has his own log files, this will merge them to one file 
            merge_logs: true,
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
