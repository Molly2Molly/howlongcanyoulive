var User = require("../lib/mongoose").User;

module.exports = {
  // 注册一个用户
  create: function(userinfo) {
    var user = new User(userinfo);
    return new Promise(function(resolve, reject) {
      user.save(function(err, usersaved) {
        if (err) return reject(err);
        return resolve(usersaved);
      });
    });
  },

  // 通过用户名获取用户信息
  getUserByName: function getUserByName(name) {
    return User.findOne({ name: name })
      .addCreatedAt()
      .exec();
  }
};
