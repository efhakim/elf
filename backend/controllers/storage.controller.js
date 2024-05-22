const mongoose = require("mongoose")
const Storage = require("../models/storage.model")
const User = require("../models/user.model")

const HttpError = require('../models/http.error')

const createStorage = async (req, res, next) => {
    const {name, type, parent} = req.body
    const {user} = req

    try {

    } catch(err) {
        return res.status(401).json({ message: err.message });
    }
    
    const newStorage = new Storage({
        name, 
        type,
        creator: user,
        access: [user], 

    })

    try {
        await newStorage.save()
    } catch(err) {
        console.log(err)
        
    }
    res.status(200).json(newStorage.toObject({getters: true}))
}

const viewStorage = async (req, res, next) => {
    const {name} = req.body
    const {user} = req

    try {
        const searchStorage = await Storage.findOne({access: user, name: name})

        if(searchStorage) {
            return res.status(200).json(searchStorage.toObject({getters: true}))
        } else {
            throw new HttpError("Can't find this storage or no access.", 401)
        }


    } catch(err) {
        next(err)
    }
}

const editStorage = async (req, res, next) => {
    const {name} = req.body
    const {user} = req

    const access = await User.findOne({name: "hakimb"})

    try {
        const searchStorage = await Storage.findOne({access: user, name: name})
        const storageCreator = await searchStorage.populate('creator')

        if(searchStorage) {
            console.log(storageCreator.creator.uuid)
            console.log(user.uuid)
            if(storageCreator.creator.uuid == user.uuid) {

                console.log(access)
                if(access) {
                    searchStorage.access = [access, ...searchStorage.access]
                    await searchStorage.save()

                    res.status(200)
                }
                
                res.status(200)
            } else {
                throw new HttpError("Can't modify a storage you do not own.", 401)
            }
        } else {
            throw new HttpError("Can't find this storage or no access.", 401)
        }


    } catch(err) {
        next(err)
    }
}



exports.createStorage = createStorage
exports.viewStorage = viewStorage
exports.editStorage = editStorage