"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteInvestigation = exports.updateInvestigationById = exports.findInvestigationById = exports.findInvestigations = exports.investigateCreate = exports.findUserById = exports.findUserByName = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _investigation = _interopRequireDefault(require("../models/investigation.model"));

var _user = _interopRequireDefault(require("../models/user.model"));

var findUserByName = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(inspector_name) {
    var findUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              inspector_name: inspector_name
            });

          case 2:
            findUser = _context.sent;
            return _context.abrupt("return", findUser);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUserByName(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.findUserByName = findUserByName;

var findUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var findUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              id: id
            });

          case 2:
            findUser = _context2.sent;
            return _context2.abrupt("return", findUser);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findUserById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findUserById = findUserById;

var investigateCreate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userData) {
    var createInvestigate;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _investigation["default"].create(userData);

          case 2:
            createInvestigate = _context3.sent;
            return _context3.abrupt("return", createInvestigate);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function investigateCreate(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.investigateCreate = investigateCreate;

var findInvestigations = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(inspector_name) {
    var investigate;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _investigation["default"].find({
              inspector_name: inspector_name
            }, '-_id');

          case 2:
            investigate = _context4.sent;
            return _context4.abrupt("return", investigate);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findInvestigations(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findInvestigations = findInvestigations;

var findInvestigationById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(unique_id) {
    var investigate;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _investigation["default"].findOne({
              unique_id: unique_id
            }, '-_id');

          case 2:
            investigate = _context5.sent;
            return _context5.abrupt("return", investigate);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findInvestigationById(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.findInvestigationById = findInvestigationById;

var updateInvestigationById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(unique_id, investigation_data) {
    var investigate;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _investigation["default"].findOneAndUpdate({
              unique_id: unique_id
            }, {
              investigation_data: investigation_data,
              updated: Date.now()
            }, {
              "new": true
            });

          case 2:
            investigate = _context6.sent;
            return _context6.abrupt("return", investigate);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateInvestigationById(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateInvestigationById = updateInvestigationById;

var deleteInvestigation = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(unique_id) {
    var investigate;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _investigation["default"].findOneAndDelete({
              unique_id: unique_id
            });

          case 2:
            investigate = _context7.sent;
            return _context7.abrupt("return", investigate);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteInvestigation(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteInvestigation = deleteInvestigation;