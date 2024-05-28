const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const branchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    performanceScore: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;