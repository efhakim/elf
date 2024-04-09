const mongoose = require("mongoose")
const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http.error')

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body

    const newlyCreatedUser = new User({
        name, 
        email,
        password
    })

    try {
        await newlyCreatedUser.save()
    } catch(err) {
        console.log(err)
        return next(err)
    }

    res.status(200).json(newlyCreatedUser.toObject({getters: true}))
}

const getUser = async (req, res, next) => {
    const {name} = req.body

    let searchedUser

    try {
        searchedUser = await User.findOne({name: name})
    } catch(err) {
        console.log(err)
        return next(err)
    }
    
    res.status(200).json(searchedUser.toObject({getters: true}))
}

const logInUser = async (req, res, next) => {

    try {
        const {email, password} = req.body
        const logUser = await User.findOne({ email });

        if(!logUser) {
            const error = new HttpError("User does not exist", 500)
            return next(error)
        }

        if (password != logUser.password) {
            const error = new HttpError("Wrong password", 500)
            return next(error)
        }

        const token = jwt.sign(
            {userId: logUser.id, username: logUser.username},
            logUser.uuid,
            {expiresIn: '24h'}
        )

        res.status(200).json({token})

    } catch (err) {
        const error = new HttpError("Database problem", 500)
        return next(error)
    }
}

const verifyLogin = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')

    if(token) {
        const decoded = jwt.decode(token[0], "cdd50e63-e67e-4a6c-8b58-77de2615c052")
        try {
            const user = await User.findById(decoded.userId)
            res.status(200).json(user.toObject({getters: true}))
        } catch (err) {
            const error = new HttpError("Database problem", 500)
            return next(error)
    
        }
    } else {
        const error = new HttpError("Database problem", 500)
        return next(error)
    }
}

exports.createUser = createUser
exports.getUser = getUser
exports.logInUser = logInUser
exports.verifyLogin = verifyLogin