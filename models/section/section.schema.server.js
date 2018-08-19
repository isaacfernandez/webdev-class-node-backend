var mongoose = require('mongoose');




var sectionSchema = mongoose.Schema({
    courseId: Number,
    name: String,
    seats: Number,
    students: [String]
}, {collection: 'section'});

module.exports = sectionSchema;
