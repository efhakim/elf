const mongoose = require("mongoose")
const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http.error')

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body


    const user = await User.findOne({email: email})

    if(user) {
        console.log(user)
        const error = new HttpError("User already exists", 500)
        return next(error)
    }


    const newlyCreatedUser = new User({
        name, 
        email,
        password
    })

    try {
        await newlyCreatedUser.save()
    } catch(err) {
        const error = new HttpError("Could not find user", 500)
        return next(error)
    }

    res.status(200).json(newlyCreatedUser.toObject({getters: true}))
}

const getUser = async (req, res, next) => {
    const {name} = req.body

    let searchedUser

    try {
        searchedUser = await User.findOne({name: name})
    } catch(err) {
        const error = new HttpError("Could not find user", 500)
        return next(error)
    }
    
    res.status(200).json(searchedUser.toObject({getters: true}))
}

const logInUser = async (req, res, next) => {

    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

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
            "cdd50e63-e67e-4a6c-8b58-77de2615c052",
            {expiresIn: '24h'}
        )

        res.status(200).json({token})

    } catch (err) {
        const error = new HttpError("Database problem", 500)
        return next(error)
    }
}

const verifyLogin = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        const de = jwt.verify(token, "cdd50e63-e67e-4a6c-8b58-77de2615c052")
        console.log(de)
    } catch(err) {
        const error = new HttpError("Token Expired", 500)
        return next(error)
    }

    if(token) {
        const decoded = jwt.decode(token, "cdd50e63-e67e-4a6c-8b58-77de2615c052")
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