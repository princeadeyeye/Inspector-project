"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutInspector = logoutInspector;
exports.loginInspector = exports.updateInspector = exports.registerInspector = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _utils = require("../utils");

var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var JWT_SECRET = (0, _utils.getEnv)('JWT_SECRET');

var registerInspector = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userData) {
    var findUser, hashedPassword, createUserData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              email: userData.email
            });

          case 2:
            findUser = _context.sent;

            if (!findUser) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", false);

          case 5:
            _context.next = 7;
            return _bcrypt["default"].hash(userData.password, 10);

          case 7:
            hashedPassword = _context.sent;
            _context.next = 10;
            return _user["default"].create(_objectSpread(_objectSpread({}, userData), {}, {
              password: hashedPassword
            }));

          case 10:
            createUserData = _context.sent;
            createUserData.id = null;
            createUserData.hashedPassword = null;
            return _context.abrupt("return", createUserData);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function registerInspector(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerInspector = registerInspector;

var updateInspector = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user, userData) {
    var createUserData, unique_id, findUser, hashedPassword;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            createUserData = {};
            unique_id = user.unique_id;
            _context2.next = 4;
            return _user["default"].findOne({
              email: userData.email
            });

          case 4:
            findUser = _context2.sent;

            if (!(findUser && findUser.email !== user.email)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", false);

          case 7:
            if (!userData.password) {
              _context2.next = 16;
              break;
            }

            _context2.next = 10;
            return _bcrypt["default"].hash(userData.password, 10);

          case 10:
            hashedPassword = _context2.sent;
            _context2.next = 13;
            return _user["default"].findOneAndUpdate({
              unique_id: unique_id
            }, _objectSpread(_objectSpread({}, userData), {}, {
              password: hashedPassword
            }), {
              "new": true
            });

          case 13:
            createUserData = _context2.sent;
            _context2.next = 19;
            break;

          case 16:
            _context2.next = 18;
            return _user["default"].findOneAndUpdate({
              unique_id: unique_id
            }, _objectSpread({}, userData), {
              "new": true
            });

          case 18:
            createUserData = _context2.sent;

          case 19:
            createUserData.id = null;
            createUserData.hashedPassword = null;
            return _context2.abrupt("return", createUserData);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateInspector(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateInspector = updateInspector;

var loginInspector = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userData) {
    var findUser, isPasswordMatching, tokenData, cookie;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              email: userData.email
            });

          case 2:
            findUser = _context3.sent;

            if (findUser) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", 'INVALID_EMAIL');

          case 5:
            _context3.next = 7;
            return _bcrypt["default"].compare(userData.password, findUser.password);

          case 7:
            isPasswordMatching = _context3.sent;

            if (isPasswordMatching) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", 'WRONG_PASSWORD');

          case 10:
            tokenData = createToken(findUser);
            cookie = createCookie(tokenData);
            return _context3.abrupt("return", {
              cookie: cookie,
              findUser: findUser
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function loginInspector(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.loginInspector = loginInspector;

function createToken(user) {
  var dataStoredInToken = {
    _id: user._id
  };
  var secret = JWT_SECRET;
  var expiresIn = 60 * 60;
  return {
    expiresIn: expiresIn,
    token: _jsonwebtoken["default"].sign(dataStoredInToken, secret, {
      expiresIn: expiresIn
    })
  };
}

function createCookie(tokenData) {
  return "Authorization=".concat(tokenData.token, "; HttpOnly; Max-Age=").concat(tokenData.expiresIn, ";");
}

function logoutInspector(_x5) {
  return _logoutInspector.apply(this, arguments);
}

function _logoutInspector() {
  _logoutInspector = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userData) {
    var findUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (userData) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", 'NOT_AVAILABLE');

          case 2:
            _context4.next = 4;
            return _user["default"].findOne({
              email: userData.email,
              password: userData.password
            });

          case 4:
            findUser = _context4.sent;
            return _context4.abrupt("return", findUser);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _logoutInspector.apply(this, arguments);
}