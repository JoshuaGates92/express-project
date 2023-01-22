const express = require('express');
const path = require('path');

const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');

const app = express();


// Templating engine handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const  PORT = 3000;

// Timer function using middleware
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});


// Middleware
app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());


// Routers
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Friends are Very Clever',
        caption: 'Let\'s go skiing!',
    });
})
app.use('/friends', friendsRouter); // Remember to mount the router on the object (app)
app.use('/messages', messagesRouter); // Remember to mount the router on the object (app)

// Start listener function
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

// This file was originally called 'index.js'
// Turns out this creates some issues with actually running the server
// The easy solution here is just to rename the file 'server.js'

// When you go to look at the code it autmatically currently is set to return a 404 error...
// (One of) the powers of express.js is it's effectiveness in routing.