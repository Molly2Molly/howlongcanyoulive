var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;


router.get('/', function(req, res, next) {

  var Mailgun = require('mailgun').Mailgun;
  var mg = new Mailgun('key-2b219240d3743acdcb2928ea881e7105');
  //sendText(sender, recipients, subject, text, [servername=''], [options={}], [callback(err)])
  // mg.sendText('admin@iclockwork.com', ['489573239@qq.com','molly2molly.zyz@gmail.com', 'zhangyz@iclockwork.com'],
  //   'This is the subject',
  //   'This is the text',
  //   'billion.zone',{},
  //   function(err) {
  //     if (err) console.log('Oh noes: ' + err);
  //     else     console.log('Email Send Success');
  // });
  //sendRaw(sender, recipients, rawBody, [servername], [callback(err)])
  mg.sendRaw('admin@iclockwork.com', ['489573239@qq.com','molly2molly.zyz@gmail.com', 'zhangyz@iclockwork.com'],
    'From: admin@iclockwork.com' +
          '\nTo: ' + '489573239@qq.com, molly2molly.zyz@gmail.com, zhangyz@iclockwork.com' +
          '\nContent-Type: text/html; charset=utf-8' +
          '\nSubject: I Love Email' +
          '\n\nBecause it\'s just so awesome<img src="http://img.iclockwork.com/dev/images/share_wheel_xxzg.png" />',
    'billion.zone',
    function(err) {
      if (err) console.log('Oh noes: ' + err);
      else     console.log('Email Send Success');
  });
  res.redirect('/');

  // var nodemailer = require('nodemailer');
  // var smtpConfig = {
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true, // use SSL
  //     auth: {
  //         user: 'molly2molly.zyz',
  //         pass: '1989zaizailove'
  //     }
  // };
  // transporter = nodemailer.createTransport(smtpConfig);
  // // setup e-mail data with unicode symbols
  // var mailOptions = {
  //     from: '"Yingzi.zhang 👥" <molly2molly.zyz@gmail.com>', // sender address
  //     to: '489573239@qq.com, zhangyz@iclockwork.com', // list of receivers
  //     subject: 'Hello ✔', // Subject line
  //     //text: 'Hello world 🐴', // plaintext body
  //     html: '<b>Hello world 🐴</b><img src="http://img.iclockwork.com/dev/images/share_wheel_xxzg.png" />' // html body
  // };
  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, function(error, info){
  //     if(error){
  //         return console.log(error);
  //     }
  //     console.log('Message sent: ' + info.response);
  //     res.redirect('/posts');
  // });

});

router.get('/userlist',function(req,res,next) {
  return res.json({ code: -1 });
});


module.exports = router;
