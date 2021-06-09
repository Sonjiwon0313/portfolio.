var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { autoIncrement } = require('mongoose-plugin-autoinc');

var SessionSchema = new Schema({
    _id : {
        type : String
    },
    expires : {
        type : Date
    },
    session : {
        type : String
    }
});

module.exports = mongoose.model('session' , SessionSchema);
