const { Schema, model } = require('mongoose');

const FillingSchema = Schema({
    km: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},  
{ timestamps: false});

module.exports = model('Filling', FillingSchema);