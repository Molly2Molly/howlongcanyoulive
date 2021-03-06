module.exports = {
  viewportWidth: 750, // (Number) The width of the viewport.
  viewportHeight: 1334, // (Number) The height of the viewport.
  unitPrecision: 5, // (Number) The decimal numbers to allow the REM units to grow to.
  viewportUnit: "vw", // (String) Expected units.
  selectorBlackList: ["html", "body", "ignore", "hairlines"], // (Array) The selectors to ignore and leave as px.
  minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
  mediaQuery: false, // (Boolean) Allow px to be converted in media queries.

  port: 5000,
  session: {
    secret: "howlongcanyoulive",
    key: "howlongcanyoulive",
    maxAge: 2592000000
  },
  //mongodb://user:pass@localhost:port/database
  mongodb: "mongodb://localhost:27017/howlongcanyoulive",

  serverBaseUrl: "http://localhost:5000"
};
