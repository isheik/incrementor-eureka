var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User data schema
var UserSchema = new Schema({
    mail: String,
    password: String,
    identifier: Number
});

module.exports = mongoose.model('User', UserSchema);