var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // data: {
        // type: String,
        // attributes: {
            mail: String,
            password: String,
            identifier: Number
        // }
    // }
});

module.exports = mongoose.model('User', UserSchema);