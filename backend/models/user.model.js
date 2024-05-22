const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');


const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        uuid: {type: String, default: uuidv4()},
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        created: {type: Date, default: Date.now},
        lastLogin: {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model("User", UserSchema)