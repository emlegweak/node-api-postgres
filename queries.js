const Pool = require('pg').Pool
const pool = new Pool ({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})

//get all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//get a single user by ID
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}


//post a new user
const createUser = (request, response) => {
    const {name, email} = request.body

    pool.query('INSERT INTO USERS (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if(error){
            throw error
        }
        response.status(201).send(`User added with ID ${results.rows[0].id}`)
    })
}

//put updated data in an existing user
//put is idempotent meaning the exact same call can be made over and over and will produce the same result
//put is different than post(in which the exact same call repeated will continuously make new users with the same data)
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email} = request.body

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
}

//delete a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

//to access these functions from index.js, we'll need to export them
//use module.exports to create an object of functions
module.exports = {
    getUsers,
    getUserById, 
    createUser,
    updateUser,
    deleteUser,
}