const mongoose = require("mongoose")
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const HttpError = require('../models/http.error')

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body


    const user = await User.findOne({email: email})

    if(user) {
        console.log(user)
        const error = new HttpError("User already exists", 500)
        return next(error)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newlyCreatedUser = new User({
        name, 
        email,
        password: hash
    })

    try {
        await newlyCreatedUser.save()
    } catch(err) {
        const error = new HttpError("Could not create user.", 401)
        return next(error)
    }

    res.status(200).json({"response": "User Created"})
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
    
    res.status(200).json({"username": searchedUser.name, "email": searchedUser.email, "dateOfCreation": searchedUser.date})
}

const logInUser = async (req, res, next) => {

    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const logUser = await User.findOne({ email });

        if(!logUser) {
            const error = new HttpError("User does not exist", 404)
            return next(error)
        }

        if (!bcrypt.compareSync(password, logUser.password)) {
            const error = new HttpError("Wrong password", 401)
            return next(error)
        }

        const token = jwt.sign(
            {userId: logUser.uuid, username: logUser.username},
            "cdd50e63-e67e-4a6c-8b58-77de2615c052",
            {expiresIn: '24h'}
        )

        res.status(200).json({token, "username": logUser.name, "email": logUser.email})

    } catch (err) {
        const error = new HttpError("Database problem", 500)
        return next(error)
    }
}

const verifyLogin = async (req, res, next) => {
    const token = req.headers.authorization
    
    try {
        const de = jwt.verify(token, "cdd50e63-e67e-4a6c-8b58-77de2615c052")
    } catch(err) {
        const error = new HttpError("Token Expired", 500)
        return next(error)
    }
    
    if(token) {
        const decoded = jwt.decode(token, "cdd50e63-e67e-4a6c-8b58-77de2615c052")
        try {
            const user = await User.findOne({uuid: decoded.userId})
            res.status(200).json({token, "username": user.name, "email": user.email})
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