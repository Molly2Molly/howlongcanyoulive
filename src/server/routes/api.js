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
      errmsg: "Missing Parameters"
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
      return res.json({
        errcode: ErrorCode.unknow,
        errmsg: err.message || err.errmsg
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
      errmsg: "Missing Parameters"
    });
  }
  UserModel.getUserByEmail(email)
    .then(function(userfind) {
      if (!userfind) {
        return res.json({
          errcode: ErrorCode.noAccount,
          errmsg: "This account havn't be registered."
        });
      } else if (userfind.password == password) {
        return res.json(userfind);
      } else {
        return res.json({
          errcode: ErrorCode.passwordError,
          errmsg: "Password is error"
        });
      }
    })
    .catch(function(err) {
      // undo system log
      console.log(err);
      return res.json({
        errcode: ErrorCode.unknow,
        errmsg: err.message || err.errmsg
      });
    });
});

module.exports = router;
