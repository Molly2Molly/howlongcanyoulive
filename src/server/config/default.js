module.exports = {
  port: 5000,
  session: {
    secret: "howlongcanyoulive",
    key: "howlongcanyoulive",
    maxAge: 2592000000
  },
  //mongodb://user:pass@localhost:port/database
  //mongodb: "mongodb://localhost:27017/howlongcanyoulive"
  mongodb: "mongodb://45.40.57.78:27017/howlongcanyoulive"
};
