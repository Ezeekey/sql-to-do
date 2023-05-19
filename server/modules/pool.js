// Importing pg.
const pg = require('pg');

// Initializing a pool to reach database.
const Pool = pg.Pool;
const pool = Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 30000
});

// Printing status of server.
pool.on('connect', () => {
    console.log('Connected to Postgres');
});

pool.on('error', (err) => {
    console.log('Failure to initialize Postgres', err);
})

// Should be all set and ready to go.
module.exports = pool;
