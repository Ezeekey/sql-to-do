// Activate express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Getting body parser.
app.use(express.urlencoded({extended: true}));

// Setting static folder.
app.use(express.static('server/public'));

// Getting routers.
const taskRouter = require('./routers/task.js');
app.use('/task', taskRouter);

// Start listening.     None but one may enter past these gates.
app.listen(PORT, () => {
    console.log('Listening on PORT'. PORT);
})