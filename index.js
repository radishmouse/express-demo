// Bring in the express module.
const express = require('express');
const PORT = 3000;

// Create an express app.
// It's roughly equivalent to the result of calling `http.createServer()`
const app = express();

// WRONG
// Global variables are bad, m'kay
let BAD_GLOBAL_counter = 0;
// WRONG

function log(req, res, next) {
    console.log(`They asked for ${req.url}`);
    BAD_GLOBAL_counter += 1;
    req.counter = BAD_GLOBAL_counter;
    next();
}

function checkForUser(req, res, next) {
    // Pretend that we're checking for a real logged in user.
    // For now, just add one to the req
    const isLoggedIn = false; // pretend this `false` came from a function call.
    
    if (isLoggedIn) {
        req.user = {
            username: 'Cascading Style Seils'
        };
        next();
    } else {
        // I do not want to go to the `next` middleware.
        // I want to redirect them to the login page.
        // Behind the scenes, tell the browser to make an additional request,
        // but for a different URL.
        res.redirect('/login');
    }
    // req.user = null;
    // next();
}

function homePage(req, res) {
    if (req.user) {
        res.send(`Hey ${req.user.username}! Hooray.`);
    } else {
        res.send(`Wait. I don't know you.`);
    }
}


// Respond to GET requests for the path "/"
app.get('/', log, checkForUser, homePage);


function loginPage(req, res) {
    res.send('You must log in!');
}
app.get('/login', log, loginPage);




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