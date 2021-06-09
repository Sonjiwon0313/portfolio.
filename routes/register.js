var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("register");
});

   
router.post('/signup',function(req,res){
	console.log(req);
	var data = {};
	data.message = "";
	var User = new UserModel({
		username : req.body.username,
		displayname : req.body.displayname,
		password : req.body.password,
		phonenumber : req.body.phonenumber,
		email : req.body.email
	});
	UserModel.findOne({"username":req.body.username},function(err,user){
		if(user){
			//res.render('success',{"isSuccess":true});
			data.message = "중복된 ID가 존재합니다. \n다른 ID를 사용해주세요.";
			res.send(data);
		}else{
			//res.render('success',{"isSuccess":false});
			User.save(function(err){
				if(err){
					data.message = err.message;
				}else{
					data.message = "등록완료!";
				}
				res.send(data);
			})
		}
	})
})
router.get('/signlist',function(req,res){
	UserModel.find({},function(err,users){
		res.send(users);
	})
});

router.post('/signremove',function(req,res){
	UserModel.remove({"username":req.body.username},function(err,users){
		res.send("삭제완료");
	})
});

router.post('/signupdate',function(req,res){
	UserModel.update({"username":req.body.username},{$set:{"password":req.body.password}},function(err){
		res.send("업데이트 완료");
	})
})

router.post('/idcheck',function(req,res){
	var id = req.body.check;
	UserModel.findOne({"username":id},function(err,user){
		if(user){
			//res.render('success',{"isSuccess":true});
			res.send(true);
		}else{
			//res.render('success',{"isSuccess":false});
			res.send(false);
		}
	})
})

module.exports = router;


