// Activating express.
const express = require('express');
const router = express.Router();

// Importing pool to reach database.
const pool = require('../modules/pool.js');

// Importing other modules.
const validator = require('../modules/validator.js');
const moment = require('moment');

// BEGIN http request handlers.

// GET request for sending tasks back to user to display.
router.get('/', (req, res) => {
    let ascOrDesc = 'ASC';
    req.query.reverse === 'true' ? ascOrDesc='DESC' : ascOrDesc='ASC';
    // Asking database to give a list of task objects {id, name, done, timestamp} to client.
    pool.query('SELECT * FROM "tasks" ORDER BY "done" ' + ascOrDesc + ';').then(response => {
        // Turning dates into something human readable.
        for (let task of response.rows) {
            task.timestamp = moment(task.timestamp).format('MMMM Do YYYY, h:mm:ss a');
            // Turn an invalid date into a not done.
            if (task.timestamp === 'Invalid date'){
                task.timestamp = 'Not done';
            }
        }
        res.send(response.rows)
    }).catch(err => {
        console.log('Task router GET request error!', err);
        res.sendStatus(500);
    })
});

// POST request for adding new tasks.
router.post('/', (req, res) => {        // req.body {name}
    // Create new task in the database using just a name pushed from the client.
    pool.query('INSERT INTO "tasks" ("name") VALUES ($1)', [req.body.name]).then(response => {
        // Validate for empty name.
        if (validator.checkEmptyForms(req.body.name)) {
            console.log('Client sent bad name!');
            res.sendStatus(400);
            return;
        }

        console.log('Inserting a task,', req.body);
        res.sendStatus(201);
    }).catch(err => {
        console.log('Task post error!', err);
        res.sendStatus(500);
    })
});

// PUT request for finishing a task. Changes done to true, and changes timestamp to current date for unfinished tasks only.
router.put('/:id', (req, res) => {
    // Catch if id param is a word and not a number.
    if (validator.checkBadNumbers(req.params.id)) {
        console.log('Client sent bad id to PUT handler');
        res.sendStatus(400);
        return;
    }

    pool.query('UPDATE "tasks" SET "done" = TRUE, "timestamp" = $1 WHERE "id" = $2 AND "done" = FALSE RETURNING *;', [moment().format(), req.params.id])
        .then(response => {
            // Checking for empty rows, meaning client is sending either a bad id, or an already finished task.
            console.log(response.rows);
            if (response.rows.length < 1) {
                console.log('Client sent bad data to PUT in tasks');
                res.sendStatus(400);
                return;
            }

            // All good from here.
            console.log('Task complete!');
            res.sendStatus(200);
        }).catch(err => {
            console.log('SQL Error in task PUT!', err);
            res.sendStatus(500);
        });
});

// DELETE handler for removing single tasks from the database.
router.delete('/:id', (req, res) => {
    // Validate for an id that is not a number.
    if (validator.checkBadNumbers(req.params.id)) {
        console.log('Client sent bad id to DELETE handler');
        res.sendStatus(400);
        return;
    }

    // All good by this point.
    pool.query('DELETE FROM "tasks" WHERE "id" = $1 RETURNING *;', [req.params.id]).then(response => {
        console.log('Client has deleted from tasks table: ', response.rows);
        res.sendStatus(204);
    }).catch(err => {
        console.log('SQL error in tasks/ DELETE handler', err);
        res.sendStatus(500);
    });
})


// END http request handlers.

module.exports = router;
