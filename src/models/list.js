const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const List = mongoose.model('List', taskSchema)

module.exports = List