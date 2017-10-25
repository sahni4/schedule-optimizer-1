var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the year object
var YearSchema = new Schema({
    name: String,
    children: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Year', YearSchema, 'years');
