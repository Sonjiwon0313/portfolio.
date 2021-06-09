var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { autoIncrement } = require('mongoose-plugin-autoinc');

var ChatRoomSchema = new Schema({

	RoomName: String,
	Members:[String],
	Participants:Number,
	CreatedAt: {
		type: Date,
		default: Date.now()
	}

});

module.exports = mongoose.model('chatroom',ChatRoomSchema);