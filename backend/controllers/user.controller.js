const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpError = require('../models/http.error');

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new HttpError('User already exists', 400)
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hash
        });

        await newUser.save();
        res.status(201).json({ message: 'User Created' });
    } catch (err) {
        next(err)
    }
};

const getUser = async (req, res, next) => {
    const { name } = req.body;

    try {
        const user = await User.findOne({ name });

        if (!user) {
            throw new HttpError('Could not find user', 404)
        }

        console.log(user)

        res.status(200).json({
            username: user.name,
            email: user.email,
            creationDate: user.date
        });

    } catch (err) {
        next(err);
    }
};

const logInUser = async (req, res, next) => {
    const { email, password } = req.body;


    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new HttpError('Invalid email or password', 401)
        }

        try {
            user.lastLogin = Date.now()
            await user.save()
        } catch(err) {
            throw new HttpError("Couldn't save", 500)
        }

        const token = jwt.sign(
            { userId: user.uuid, username: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ token, username: user.name, email: user.email });
    } catch (err) {
        next(err);
    }
};

const verifyLogin = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        throw new HttpError('Authentication token missing', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await User.findOne({uuid: decoded.userId});
        
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        res.status(200).json({ token, username: user.name, email: user.email });
    } catch (err) {
        next(err);
    }
};

const editUser = async (req, res, next) => {
    const token = req.headers.authorization;
    const { name, email, password } = req.body;

    try {

        if (!token) {
            throw new HttpError('Authentication token missing', 401);
        }

        const userToken = jwt.verify(token, process.env.JWT_SECRET)
        
        try {
            const user = await User.findOne({uuid: userToken.userId})

            if(!user) {
                throw new HttpError("Cannot find user", 404)
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                user.password = hash;
            }
    
            await user.save();

            res.status(200).json({ RESULT: user });
        } catch(err) {
            throw new HttpError(err.message, err.code)
        }
    } catch(err) {
        next(err)
    }
};

module.exports = {
    createUser,
    getUser,
    logInUser,
    verifyLogin, 
    editUser
};