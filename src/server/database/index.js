var secrets = require('../../../secrets.js');
var mongoose = require('mongoose');

mongoose.connect(secrets.db_url);
mongoose.set("debug", true);

module.exports = {
    Head : require('../models/head.js'),
    Year : require('../models/year.js')
}
