"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfile = exports.getProfile = exports.logout = exports.inspectorLogin = exports.inspectorSignup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uniqid = _interopRequireDefault(require("uniqid"));

var _auth = require("../../services/auth.service");

var _index = require("../../utils/index");

var inspectorSignup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userData, inspector_name, signUpUserData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userData = req.body;
            inspector_name = req.body.inspector_name;
            userData.unique_id = (0, _uniqid["default"])();
            userData.inspector_name = "".concat(inspector_name).toUpperCase();

            if (!(!userData.email || !userData.password || !userData.inspector_name)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 400,
              message: 'Please enter an email, password and name'
            }));

          case 7:
            _context.next = 9;
            return (0, _auth.registerInspector)(userData);

          case 9:
            signUpUserData = _context.sent;

            if (signUpUserData) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: "Your email ".concat(userData.email, " already exists")
            }));

          case 12:
            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: {
                id: signUpUserData.unique_id,
                email: signUpUserData.email,
                name: signUpUserData.inspector_name
              },
              message: 'successfully add inspector'
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function inspectorSignup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.inspectorSignup = inspectorSignup;

var inspectorLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var userData, successfulLogin, cookie, findUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userData = req.body;
            if (!userData.email || !userData.password) (0, _index.Response)(res, {
              status: 400,
              message: 'Please enter email and password'
            });
            _context2.next = 5;
            return (0, _auth.loginInspector)(userData);

          case 5:
            successfulLogin = _context2.sent;

            if (!(successfulLogin === 'INVALID_EMAIL')) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: "Email ".concat(userData.email, " not found, Please register")
            }));

          case 8:
            if (!(successfulLogin === 'WRONG_PASSWORD')) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: "Wrong password, try again"
            }));

          case 10:
            cookie = successfulLogin.cookie, findUser = successfulLogin.findUser;
            res.setHeader('Set-Cookie', [cookie]);
            return _context2.abrupt("return", res.status(200).json({
              message: 'login successfully',
              data: {
                id: findUser.unique_id,
                email: findUser.email,
                name: findUser.inspector_name
              },
              token: cookie
            }));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function inspectorLogin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.inspectorLogin = inspectorLogin;

var logout = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userData, logOutUserData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userData = req.user;
            _context3.next = 4;
            return (0, _auth.logoutInspector)(userData);

          case 4:
            logOutUserData = _context3.sent;
            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            res.status(200).json({
              message: "".concat(logOutUserData.inspector_name, " has successfullly logout")
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function logout(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.logout = logout;

var getProfile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userData = req.user;

            if (userData) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", (0, _index.Response)(res, {
              status: 403,
              message: "An error has occured, please login"
            }));

          case 4:
            return _context4.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: {
                id: userData.unique_id,
                email: userData.email,
                name: userData.inspector_name
              },
              message: 'successfully fetch user data'
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getProfile(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getProfile = getProfile;

var updateProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var userData, user, inspector_name, signUpUserData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userData = req.body;
            user = req.user;
            inspector_name = req.body.inspector_name;
            if (inspector_name) userData.inspector_name = "".concat(inspector_name).toUpperCase();
            _context5.next = 7;
            return (0, _auth.updateInspector)(user, userData);

          case 7:
            signUpUserData = _context5.sent;

            if (signUpUserData) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: "".concat(userData.email, " has been used, update failed")
            }));

          case 10:
            return _context5.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: {
                id: signUpUserData.unique_id,
                email: signUpUserData.email,
                name: signUpUserData.inspector_name
              },
              message: 'successfully updated'
            }));

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));

  return function updateProfile(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateProfile = updateProfile;