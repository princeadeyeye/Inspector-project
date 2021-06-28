"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _utils = require("../utils");

var _index = require("../utils/index");

var JWT_SECRET = (0, _utils.getEnv)('JWT_SECRET');

var authMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var Authorization, secretKey, verificationResponse, userId, findUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

            if (!Authorization) {
              _context.next = 14;
              break;
            }

            secretKey = JWT_SECRET;
            _context.next = 6;
            return _jsonwebtoken["default"].verify(Authorization, secretKey);

          case 6:
            verificationResponse = _context.sent;
            userId = verificationResponse._id;
            _context.next = 10;
            return _user["default"].findById(userId);

          case 10:
            findUser = _context.sent;

            if (findUser) {
              req.user = findUser;
              next();
            } else {
              next((0, _index.Response)(res, {
                status: 401,
                message: 'Wrong authentication token'
              }));
            }

            _context.next = 15;
            break;

          case 14:
            next((0, _index.Response)(res, {
              status: 404,
              message: 'Authentication token missing'
            }));

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            next((0, _index.Response)(res, {
              status: 401,
              message: 'Wrong authentication token'
            }));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = authMiddleware;
exports["default"] = _default;