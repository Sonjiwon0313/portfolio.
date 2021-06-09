var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var data = {};
	data.message = ""; 							//return 메세지
	data.isSuccess = false;						//로그인성공여부
	var username = req.body.username;
	var password = req.body.password;

	UserModel.findOne({"username":username,"password":password},function(err,user){
		if(!user){
			data.message = "로그인 실패 : 아이디 또는 비밀번호를 잘못 입력하셨습니다.";
		}else{
			//세션을 생성;
			//세션에 담겨있는 ID를 밑에 변수로 설정해준다.
			req.session.user = {
				'username':user.username,
				'displayname':user.displayname,
				'password':user.password,
				'phonenumber':user.phonenumber,
				'email':user.email,
			};
			req.session.save(function(){
				console.log(req.session);
				console.log('세션저장완료!');
			});
			data.isSuccess = true;
		}
		res.send(data);	
	})
});

router.get('/destroy', function(req, res, next) {
  req.session.destroy(function(){ 
  	res.send('<script>alert("로그아웃 됐습니다.");location.href="/";</script>');
  });
});

module.exports = router;
