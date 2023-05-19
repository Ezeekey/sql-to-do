// Activating express.
const express = require('express');
const router = express.Router();

// Importing pool to reach database.
const pool = require('../modules/pool.js');

// BEGIN http request handlers.

// GET request for sending tasks back to user to display.
router.get('/', (req, res) => {
    // Asking database to give a list of task objects {id, name, complete} to client.
    pool.query('SELECT * FROM "tasks" ORDER BY "done"').then(response => res.send(response.rows))
    .catch(err => {
        console.log('Task router GET request error!', err);
        res.sendStatus(500);
    })
});

// END http request handlers.

module.exports = router;
