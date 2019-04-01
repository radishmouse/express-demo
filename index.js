// Bring in the express module.
const express = require('express');
const PORT = 3000;

// Create an express app.
// It's roughly equivalent to the result of calling `http.createServer()`
const app = express();

// Respond to GET requests for the path "/"
app.get('/', (req, res) => {
    // Note: this is different from the plain `res.end`
    console.log('Sending the home page');
    res.send('Home page');
});

app.post('/', (req, res) => {
    console.log('Responding to a POST');
    res.send('You sent a POST');
});

app.put('/', (req, res) => {
    console.log('Responding to a PUT');
    res.send('You sent a PUT');
});

// 1. identify the variable name that you want to have
// 2. In the string, write that variable name as part of the path
// 3. Put a colon in front of the variable name in the path
// 4. It will now be part of req.params
app.put('/users/:jeff', (req, res) => {
    // I want that jeff!!!!!
    console.log(req.params.jeff);
    res.send(`You sent me a PUT for ${req.params.jeff}`);
});

app.delete('/users/:jeff/delete', (req, res) => {
    // I want that jeff!!!!!
    console.log(req.params.jeff);
    res.send(`You just deleted ${req.params.jeff}`);
});



app.delete('/', (req, res) => {
    console.log('Responding to a DELETE');
    res.send('You sent a DELETE');
});

app.get('/bye', (req, res) => {
    res.send('Byeeee');
});


// Listen on our PORT
app.listen(PORT, () => {
    console.log(`Your amazing express app is running on port ${PORT}`);
});