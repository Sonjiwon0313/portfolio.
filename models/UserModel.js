var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { autoIncrement } = require('mongoose-plugin-autoinc');

var UserSchema = new Schema({
    username : {
        type : String,
        required: [true, '아이디는 필수입니다.']
    },
    displayname : {
        type : String,
        required: [true, '이름은 필수입니다.']
    },
    password : {
        type : String,
        required: [true, '패스워드는 필수입니다.']
    },
    phonenumber : {
        type : String,
        required: [true, '전화번호는 필수입니다.']
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    email : {
        type : String,
        required: [true, '이메일은 필수입니다.']
    }
    // certification : {
    //     type : Number,
    //     default : 0
    // }
});

UserSchema.plugin( autoIncrement , { model : "user", field : "id" , startAt : 1 } );
module.exports = mongoose.model('user' , UserSchema);
