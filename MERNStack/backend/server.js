require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const branchRoutes = require('./routes/branches')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// setup route handler so we can react to requests and route to test API
// routes
app.use('/api/branches', branchRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        // app.listen(4000, () =>{
        //     console.log('listening on port 4000!!!')
        // })
        // listen for requests with dotenv
        app.listen(process.env.PORT, () =>{
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



