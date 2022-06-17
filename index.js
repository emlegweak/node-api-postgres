// ======================
// modules
// ======================
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const PORT = 3000

// ======================
// middlewares
// ======================
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// ======================
// routes
// ======================

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// ======================
// port
// ======================

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}, you'd better go catch it...`)
})