module.exports = function(app) {
  //设置跨域访问
  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-type,Anthorization,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 4.16.3");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

  app.get("/", function(req, res) {
    //res.redirect("/posts");
    res.type("html").render("index");
  });
  // app.use("/signup", require("./signup"));
  // app.use("/signin", require("./signin"));
  // app.use("/signout", require("./signout"));
  // app.use("/posts", require("./posts"));
  // app.use("/email", require("./email"));
  app.use("/api", require("./api"));

  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'index.html'))
  // })

  // 404 page
  // app.use(function (req, res) {
  //   if (!res.headersSent) {
  //     res.render('404');
  //   }
  // });
};
