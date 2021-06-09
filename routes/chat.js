var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SessionModel = require('../models/SessionModel');
var ChatRoomModel = require('../models/ChatRoomModel');
var co = require('co');

function guid() {
	function s4(){
		return ((1 + Math.random())* 0x10000 | 0).toString(16).substring(1); 
	}
	return s4()+s4()+s4()+s4()+s4()+s4()+s4()+s4();
}

/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
	// var chatroom = new ChatRoomModel({
	//     roomname : "test",
	//     members : ['admin','admin'].sort(),
	//     participants : 2
	// });
	// chatroom.save(function(err, comment){console.log("저장완료")});
	if(res.locals.user == undefined){
		req.session.destroy(function(){ 
			res.send('<script>alert("잘못된 접근방식입니다.");location.href="/";</script>');
		});
	}else{ 
		SessionModel.find({},function(err,sessions){		
			var MyUsername = res.locals.user.username;
			for(var sessionData of sessions){
				var parseSession = JSON.parse(sessionData.session);
				if(parseSession.user){
					//chatroom DB조회해서 방 생성여부 결정
					var member1 = [];
					var getData = co(function* (){
						member1.push(MyUsername);
						member1.push(parseSession.user.username);
					    return {
					        room : yield ChatRoomModel.findOne({Members:member1}).exec()
					    };
					});
					getData.then( result =>{
						console.log(member1);
						if(result.room){
							console.log("방있음");
						}else{
							var newRoom = new ChatRoomModel({
								RoomName : guid(),
								Members : member1.sort(),
								Participants : member1.length
							})
							newRoom.save(function(err,comment){
								console.log("새로운 방 생성완료!")
							})
						}
					});
				}
			}
		})
	}
});

/* POST home page. */
router.post('/room', function(req, res, next) {
	if(res.locals.user == undefined){
		req.session.destroy(function(){ 
			res.send('<script>alert("잘못된 접근방식입니다.");location.href="/";</script>');
		});
	}else{
		if(!req.body.roomname){
			var today = new Date();
			var roomname = req.body.sendname +"|"+ req.body.receivename  +"|" + today.getFullYear() + today.getDate();
			req.body.roomname = roomname;
		}else{
			console.log("방제목 있음");
		}
		res.render('chat',{"user":req.body});
	}
});

module.exports = router;
