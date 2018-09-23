const express = require('express');
const hbs = require("hbs");
const fs = require('fs');
const port= process.set.port || 3000 ;


var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log + "\r\n ", (err) => {
        if (err)
            console.log('fehler beim speichern');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Kapuut'
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {        
        pageTitle: 'Yo!',
        welcomeMessage: 'Tach, blabla und überhaupst.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
    })
});



app.get('/bad', (req, res) => {
    res.send({ stuff: "bad stuff", otherstuff: 'even badder'})
});

app.listen(port, () => {
    console.log(`Server is open on port ${port}`);
});

