var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { autoIncrement } = require('mongoose-plugin-autoinc');

var BoardSchema = new Schema({

	number : Number,
	title : {
		type:String,
		required:true
	},
	author : String,
	contents:{
		type:String,
		required:true
	},
	date : {
		type:Date,
		default:Date.now()
	},
	viewNum : Number
});
BoardSchema.plugin( autoIncrement , { model : "boards", field : "id" , startAt : 1 } );
module.exports = mongoose.model('boards',BoardSchema);