// Bring in the express module.
const express = require('express');
const PORT = 3000;

// Create an express app.
// It's roughly equivalent to the result of calling `http.createServer()`
const app = express();


// These 4 lines set up your ES6 templates
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);  // Set up es6Renderer as our template engine
                                  // identified by the label "html"

app.set('views', './views');      // Express should look for the view 
                                  // files in the "./views" directory

app.set('view engine', 'html');   // Tie it all together. 


// const homepage = require('./views/homepage');


// Respond to GET requests for the path "/"
app.get('/', (req, res) => {
    // pretend we got a user from the database.
    const theUser = {
        username: 'turnipsquirrel'
    };
    const bookTitles = [
        'The Shining',
        'It',
        'Pet Sematary'
    ];
    res.render('index', {
        locals: {
            title: `Hello ${theUser.username}`,
            message: `Welcome back`,
            content: `lorem ipsum something something`,
            books: bookTitles
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about');
})



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