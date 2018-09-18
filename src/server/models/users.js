var User = require("../lib/mongoose").User;

module.exports = {
  // 注册用户
  create: function(userinfo) {
    var user = new User(userinfo);
    return new Promise(function(resolve, reject) {
      user.save(function(err, usersaved) {
        if (err) return reject(err);
        return resolve(usersaved);
      });
    });
  },

  // 通过email获取用户信息
  getUserByEmail: function(email) {
    return new Promise(function(resolve, reject) {
      User.findOne({ email: email }, function(err, userfind) {
        if (err) return reject(err);
        return resolve(userfind);
      });
    });
  }
};
