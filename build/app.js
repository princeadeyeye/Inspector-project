"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _mongoose = require("mongoose");

var _database = require("./database");

var _error = _interopRequireDefault(require("./middlewares/error.middleware"));

var _utils = require("./utils");

var _api = _interopRequireDefault(require("./api"));

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var port = (0, _utils.getEnv)('PORT', 9000);
connectToDatabase();
app.use((0, _cors["default"])({
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_error["default"]);

function connectToDatabase() {
  return _connectToDatabase.apply(this, arguments);
}

function _connectToDatabase() {
  _connectToDatabase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var dbcon;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (process.env !== 'production') {
              (0, _mongoose.set)('debug', true);
            }

            _context.next = 4;
            return (0, _mongoose.connect)(_database.dbConnection.url, _database.dbConnection.options);

          case 4:
            dbcon = _context.sent;
            console.log("".concat(dbcon && ' successfully connected to database'));
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log('Unable to connect to database', "".concat(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _connectToDatabase.apply(this, arguments);
}

app.get('/', function (req, res) {
  (0, _utils.Response)(res, {
    status: 200,
    message: 'Welcome to inspector database'
  });
});
(0, _api["default"])(app);
server.listen((0, _utils.getEnv)('PORT', port), function () {
  (0, _utils.logger)("Server Running at:\n    http://localhost:".concat((0, _utils.getEnv)('PORT', port)));
});
var _default = app;
exports["default"] = _default;