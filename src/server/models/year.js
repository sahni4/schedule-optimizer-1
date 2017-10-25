var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var YearSchema = new Schema({
    name: String,
    children: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Year', YearSchema, 'years');
