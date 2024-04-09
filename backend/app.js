const express = require("express")
const mongoose = require("mongoose")

const userRoutes = require('./routes/user.route')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE')
    next();
})


app.use('/u', userRoutes)

app.use((error, req, res, next) => {
    if (res.headerSent) next(error)
    res.status(error.code || 500).json({error: error.message})
})

mongoose
    .connect("mongodb+srv://elf:FQYefEJFFGsMRoer@cluster0.erz0nqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(5012)
    })
    .catch(err => console.log(err))