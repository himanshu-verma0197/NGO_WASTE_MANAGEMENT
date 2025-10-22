const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Media', MediaSchema);
