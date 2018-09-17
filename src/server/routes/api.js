var sha1 = require("sha1");
var express = require("express");
var router = express.Router();

import { ErrorCode } from "../lib/mongoose";
import UserModel from "../models/users";

// GET /register
router.post("/register", function(req, res, next) {
  var email = req.fields.email ? req.fields.email : "";
  var password = req.fields.password ? sha1(req.fields.password) : "";
  var nickname = req.fields.nickname ? req.fields.nickname : "";
  var birthday = req.fields.birthday ? req.fields.birthday : "";
  var sex = req.fields.sex ? req.fields.sex : "";
  if (!email || !password || !nickname || !birthday || !sex) {
    return res.json({
      errcode: ErrorCode.missParameter,
      err: "Missing Parameters"
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
      return res.json({ errcode: ErrorCode.unknow, err: err });
    });
});

// POST /signin 用户登录
router.post("/", function(req, res, next) {
  var name = req.fields.name;
  var password = req.fields.password;

  UserModel.getUserByName(name)
    .then(function(user) {
      if (!user) {
        req.flash("error", "用户不存在");
        return res.redirect("back");
      }
      // 检查密码是否匹配
      if (sha1(password) !== user.password) {
        req.flash("error", "用户名或密码错误");
        return res.redirect("back");
      }
      req.flash("success", "登录成功");
      // 用户信息写入 session
      delete user.password;
      req.session.user = user;
      // 跳转到主页
      res.redirect("/posts");
    })
    .catch(next);
});

module.exports = router;
