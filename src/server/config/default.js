module.exports = {
  port: 5000,
  session: {
    secret: 'amazing-doc',
    key: 'amazing-doc',
    maxAge: 2592000000
  },
  //mongodb://user:pass@localhost:port/database
  mongodb: 'mongodb://localhost:27017/amazing-doc'
};
