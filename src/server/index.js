var path = require("path");
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var flash = require("connect-flash");
//var config = require("config-lite")(__dirname);
var config = require("../../config");
var routes = require("./routes");
var pkg = require("../../package");
var winston = require("winston");
var expressWinston = require("express-winston");
var moment = require("moment");
// var thisday = moment().format("YYYY-MM-DD");

// import qs from "qs";
// import React from "react";
// import { renderToString } from "react-dom/server";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import App from "../client/components/CounterApp";
// import rootReducer from "../client/reducers";
// var mongoose = require("./lib/mongoose");

var app = express();

// 设置模板目录
app.set("views", path.join(__dirname, "views"));
// 设置模板引擎为 ejs
app.set("view engine", "ejs");

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));
// session 中间件
app.use(
  session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
      maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
      // 将 session 存储到 mongodb
      url: config.mongodb // mongodb 地址
    }),
    saveUninitialized: true,
    resave: true
  })
);
// flash 中间价，用来显示通知
app.use(flash());
// 处理表单及文件上传的中间件
app.use(
  require("express-formidable")({
    uploadDir: path.join(__dirname, "public/uploads"), // 上传文件目录
    keepExtensions: true // 保留后缀
  })
);

// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

// 添加模板必需的三个变量
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash("success").toString();
  res.locals.error = req.flash("error").toString();
  next();
});

// 正常请求的日志
app.use(
  expressWinston.logger({
    transports: [
      // new (winston.transports.Console)({
      //   json: true,
      //   colorize: true
      // }),
      new winston.transports.File({
        filename: path.join(__dirname, "logs/success.log")
      })
    ]
  })
);

// 路由
routes(app);

// react server render
// app.use(handlerRender);
// function handlerRender(req, res) {
//   // read the counter from the request, if provided
//   const params = qs.parse(req.query);
//   const counter = parseInt(params.counter, 10) || 0;

//   // Compile an initial state
//   let preloadedState = { counters: counter };
//   // create a new Redux store instance
//   const store = createStore(rootReducer, preloadedState);
//   // render the component to a string
//   // <CounterApp store={store} />
//   const html = renderToString(
//     <Provider store={store}>
//       <App store={store} />
//     </Provider>
//   );
//   // Grab the initial state frin our Redux store
//   preloadedState = store.getState();
//   // Send the rendered page back to the client
//   res.send(renderFullPage(html, preloadedState));
// }
// function renderFullPage(html, preloadedState) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>Redux Universal Example</title>
//       </head>
//       <body>
//         <div id="root">${html}</div>
//         <script>
//           // WARNING: See the following for security issues around embedding JSON in HTML:
//           // http://redux.js.org/recipes/ServerRendering.html#security-considerations
//           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
//             /</g,
//             "\\u003c"
//           )}
//         </script>
//         <script src="main.bundle.js"></script>
//       </body>
//     </html>
//     `;
// }

// 错误请求的日志
app.use(
  expressWinston.errorLogger({
    transports: [
      // new winston.transports.Console({
      //   json: true,
      //   colorize: true
      // }),
      new winston.transports.File({
        filename: path.join(__dirname, "logs/error.log")
      })
    ]
  })
);

// error page
app.use(function(err, req, res, next) {
  res.render("error", {
    error: err
  });
});

// socket
var apphttp = http.Server(app);
var io = socketio(apphttp);
io.on("connection", function(socket) {
  console.log("a user connected.");
  socket.broadcast.emit("connection", "a user connected.");

  socket.on("disconnect", function() {
    console.log("a user disconnected");
    io.emit("disconnect", "a user disconnected.");
  });

  socket.on("chat message", function(msg) {
    console.log("receive: " + msg);
    socket.emit("chat message", "server return : " + msg);
  });
});

if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  // app.listen(config.port, function() {
  //   console.log(`${pkg.name} listening on port ${config.port}`);
  // });
  apphttp.listen(config.port, function() {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}
