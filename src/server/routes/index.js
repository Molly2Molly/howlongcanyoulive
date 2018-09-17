module.exports = function(app) {
  app.get("/", function(req, res) {
    //res.redirect("/posts");
    res.render("index");
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
