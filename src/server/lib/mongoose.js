var config = require("config-lite")(__dirname);
var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
//mongoose.set("debug", true);
mongoose.connect(
  config.mongodb,
  {
    useNewUrlParser: true,
    autoIndex: false
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("mongoose connected.");
});

var userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  nickname: String,
  birthday: String,
  sex: String
});
//userSchema.index({ email: 1 }, { unique: true });
userSchema.plugin(uniqueValidator);
//console.log(JSON.stringify(userSchema.indexes()));

var User = mongoose.model("User", userSchema);
module.exports.User = User;

// userSchema.methods.welcome = function() {
//   var greeting = this.name ? "Welcome " + this.name : "Welcome no-name";
//   console.log(greeting);
// };
// userSchema.methods.findSimilarTypes = function(cb) {
//   return this.model("User").find({ name: this.name }, cb);
// };
// userSchema.query.byName = function(name) {
//   return this.where({ name: new RegExp(name, "i") });
// };
// userSchema
//   .virtual("fullName")
//   .get(function() {
//     return "User " + this.name + "";
//   })
//   .set(function(name) {
//     this.name = name;
//   });

// User.find()
//   .byName("admin")
//   .exec(function(err, users) {
//     console.log(users);
//   });
// User.findOne()
//   .byName("admin")
//   .exec(function(err, users) {
//     console.log(users);
//   });
// User.find(function(error, users) {
//   if (error) return console.error(error);
//   console.log(users);
// });
// User.find({ name: /^Admin/ }, function(error, users) {
//   if (error) return console.error(error);
//   console.log(users);
// });

// var userAdmin = new User({ name: "Admin" });
// console.log(userAdmin.name);
// console.log(userAdmin.welcome());
// // userAdmin.save(function(error, userRecord){
// //     if(error) return console.error(error);
// //     userRecord.welcome();
// // });
// userAdmin.findSimilarTypes(function(err, users) {
//   console.log(users);
// });
// userAdmin.fullName = "AdminChange";
// console.log(userAdmin.fullName);

module.exports.ErrorCode = {
  unknow: 0,
  missParameter: 1,
  passwordError: 2,
  noAccount: 3
};
