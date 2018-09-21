var sha1 = require("sha1");
var express = require("express");
var router = express.Router();

import { ErrorCode } from "../lib/mongoose";
import UserModel from "../models/users";

// 用户注册
router.post("/register", function(req, res, next) {
  var email = req.fields.email ? req.fields.email : "";
  var password = req.fields.password ? sha1(req.fields.password) : "";
  var nickname = req.fields.nickname ? req.fields.nickname : "";
  var birthday = req.fields.birthday ? req.fields.birthday : "";
  var sex = req.fields.sex ? req.fields.sex : "";
  if (!email || !password || !nickname || !birthday || !sex) {
    return res.json({
      errcode: ErrorCode.missParameter,
      errmsg: "缺少参数"
    });
  }
  UserModel.create({
    email,
    password,
    nickname,
    birthday,
    sex
  })
    .then(function(usersaved) {
      return res.json(usersaved);
    })
    .catch(function(err) {
      // undo system log
      console.log(err);
      let errmsg = "未知错误";
      console.log(err.errors);
      if (err.errors && err.errors.email && err.errors.email.path == "email") {
        errmsg = err.errors.email.value + " 已被注册";
      }
      return res.json({
        errcode: ErrorCode.unknow,
        //errmsg: err.message || err.errmsg
        errmsg: errmsg
      });
    });
});

// 用户登陆
router.post("/login", function(req, res, next) {
  var email = req.fields.email ? req.fields.email : "";
  var password = req.fields.password ? sha1(req.fields.password) : "";
  if (!email || !password) {
    return res.json({
      errcode: ErrorCode.missParameter,
      errmsg: "缺少参数"
    });
  }
  UserModel.getUserByEmail(email)
    .then(function(userfind) {
      if (!userfind) {
        return res.json({
          errcode: ErrorCode.noAccount,
          errmsg: "这个邮箱还未注册哦"
        });
      } else if (userfind.password == password) {
        return res.json(userfind);
      } else {
        return res.json({
          errcode: ErrorCode.passwordError,
          errmsg: "密码错误"
        });
      }
    })
    .catch(function(err) {
      // undo system log
      console.log(err);
      return res.json({
        errcode: ErrorCode.unknow,
        //errmsg: err.message || err.errmsg
        errmsg: "未知错误"
      });
    });
});

module.exports = router;
