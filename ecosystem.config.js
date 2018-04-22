module.exports = {
    apps: [
        {
            name: 'Node - Prototype',
            script: 'index.js',
            watch: ['src', 'public'],
            instances : 'max',
            exec_mode : 'cluster',
            env: {
                HTTP_TIMEOUT: 10000,
                PORT: 3000,
                NODE_ENV: 'development',
                DATABASE: 'mongodb://mongo:27017/demo',
                JWT_SECRET: 'xisd3b4k5ds6vsfd'
            },
            env_production: {
                HTTP_TIMEOUT: 10000,
                PORT: 80,
                NODE_ENV: 'production',
                DATABASE: 'mongodb://mongo:27017/demo',
                JWT_SECRET: 'xisd3b4k5ds6vsfd'
            }
        }
    ]
};
