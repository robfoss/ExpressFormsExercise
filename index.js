const http = require('http')
const express = require('express')
const morgan = require("morgan")
const helmet = require("helmet")
const logger = morgan("tiny")

const app = express()
const server = http.createServer(app)

app.use(logger)
app.use(helmet())

const port = 3000
const host = 'localhost'

app.use(express.static("public"))

// Needed for Templates 
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.urlencoded({extended: true}))

const cars = [
    {
        brand: 'Ford',
        model: 'Fiesta',
        year: 2012
    },
    {
        brand: 'Mercedes',
        model: 'E350',
        year: 2010
    },
    {
        brand: 'Jaguar',
        model: 'F Type',
        year: 2019
    },
    {
        brand: 'Ferrari',
        model: 'California',
        year: 2020
    },
];

db = [];

app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            title: 'Home Page',
            greeting: `<h1>Welcome to the Express-Forms Exercise</h1>`
        }
    })
})

// Needed for templates rendering
app.get('/items', (req, res) => {
    res.render('items', {
        locals: {
            cars,
            title: "Item's Page",
            greeting: `<h2> Item's Page </h2>`
        }
    }) 
});

app.get('/items/:id', (req, res) =>{
    const {id} = req.params;
    filteredCar = cars.filter((car)=> car.brand === id)
    console.log(filteredCar)
    res.json(filteredCar)
})

app.get('/details/:id', (req, res) => {
    const {id} = req.params;
    filteredCar = cars.filter((car)=> car.brand === id)
    res.json(filteredCar)
})

app.get('/create', (req, res) =>{
    res.render('create', {
        locals: {

        }
    })
})

app.post('/create', (req, res) => {
    const {thought} = req.body;
    db.push(thought)
    res.redirect('/thankyou')

})

app.get('/thankyou', (req, res) => {
    res.render('thankyou')
})
//catch all if website doesn't
app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

server.listen(port, host, () => {
    console.log(`Running on host: port`)
})
