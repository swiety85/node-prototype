module.exports = {
    apps: [
        {
            name: 'Node - Prototype',
            script: 'index.js',
            // watch: true,
            instances : 'max',
            exec_mode : 'cluster',
            env: {
                HTTP_TIMEOUT: 10000,
                PORT: 3000,
                NODE_ENV: 'development',
                DATABASE: 'mongodb://localhost:27017/myproject',
                JWT_SECRET: 'xisd3b4k5ds6vsfd'
            },
            env_production: {
                HTTP_TIMEOUT: 10000,
                PORT: 80,
                NODE_ENV: 'production',
                DATABASE: 'mongodb://localhost:27017/myproject',
                JWT_SECRET: 'xisd3b4k5ds6vsfd'
            }
        }
    ]
};
