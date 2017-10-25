var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var HeadSchema = new Schema({
    years: [ObjectId]
});

module.exports = mongoose.model('Meta', HeadSchema, 'meta');
