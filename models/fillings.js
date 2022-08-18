const { Schema, model } = require('mongoose');

const FillingSchema = Schema({
    km: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model('Filling', FillingSchema);