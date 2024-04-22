const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');


const Schema = mongoose.Schema;

const StorageSchema = new Schema(
    {
        uuid: {type: String, default: uuidv4()},
        name: {type: String, required: true},
        creator: {type: Schema.Types.ObjectId, ref: "User", required: true},
        access: [{type: Schema.Types.ObjectId, ref: "User"}],
        type: {type: String, required: true},
        createdDate: {type: Date, default: Date.now},
        parent: {type: Schema.Types.ObjectId, ref: "Storage"},
    }
)

module.exports = mongoose.model("Storage", StorageSchema)