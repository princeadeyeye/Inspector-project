"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnection = void 0;

var _utils = require("../utils");

var USERNAME = (0, _utils.getEnv)('MONGO_USERNAME');
var PASSWORD = (0, _utils.getEnv)('MONGO_PASSWORD');
var dbConnection = {
  // url: `mongodb://${host}:${port}/${database}`, // docker setup
  url: "mongodb+srv://".concat(USERNAME, ":").concat(PASSWORD, "@cluster0.qscnl.mongodb.net/policeData-db?retryWrites=true&w=majority"),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
};
exports.dbConnection = dbConnection;