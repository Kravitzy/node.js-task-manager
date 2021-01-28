const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
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

// creates the connection between user and task
listSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'list'
})

const List = mongoose.model('List', listSchema)

module.exports = List