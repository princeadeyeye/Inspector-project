"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteByInv = exports.updateByInv = exports.fetchByInv = exports.fetchInvestigations = exports.createInvestigation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../../utils/index");

var _uniqid = _interopRequireDefault(require("uniqid"));

var _investigation = require("../../services/investigation.service");

var createInvestigation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var request_body, user, unique_id, inspector_name, investigation_data, userData, createInvestigationData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            request_body = req.body;
            user = req.user;
            console.log(user, 'auth user');
            unique_id = (0, _uniqid["default"])();
            inspector_name = request_body.inspector_name, investigation_data = request_body.investigation_data;
            inspector_name = "".concat(inspector_name).toUpperCase();

            if (!(!inspector_name || !investigation_data)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 400,
              message: 'Enter the investigation info'
            }));

          case 9:
            _context.next = 11;
            return (0, _investigation.findUserByName)(inspector_name);

          case 11:
            userData = _context.sent;

            if (userData) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 400,
              message: 'This investigator does not exist'
            }));

          case 14:
            console.log(userData, 'invest user');

            if (!(userData.unique_id !== user.unique_id)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'Investigator not permitted'
            }));

          case 17:
            request_body.unique_id = unique_id;
            request_body.inspector_name = inspector_name;
            _context.next = 21;
            return (0, _investigation.investigateCreate)(request_body);

          case 21:
            createInvestigationData = _context.sent;

            if (createInvestigationData) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 400,
              message: 'Unable to create investigatons'
            }));

          case 24:
            return _context.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: {
                inspector_name: createInvestigationData.inspector_name,
                investigation_data: createInvestigationData.investigation_data,
                unique_id: createInvestigationData.unique_id,
                created: createInvestigationData.created
              },
              message: 'Successfully create investigation'
            }));

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 27]]);
  }));

  return function createInvestigation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createInvestigation = createInvestigation;

var fetchInvestigations = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user, inspector_name, investigations;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user = req.user;

            if (user) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'This investigator does not exists'
            }));

          case 4:
            inspector_name = user.inspector_name;
            _context2.next = 7;
            return (0, _investigation.findInvestigations)(inspector_name);

          case 7:
            investigations = _context2.sent;

            if (investigations) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'Bad request, An error has occured'
            }));

          case 10:
            return _context2.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: investigations,
              message: 'Successfully fetch all investigation by name'
            }));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function fetchInvestigations(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchInvestigations = fetchInvestigations;

var fetchByInv = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var user, invID, inspector_name, investigations;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = req.user;
            invID = req.params.invID;

            if (user) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'This investigator oes not exists'
            }));

          case 5:
            inspector_name = user.inspector_name;
            _context3.next = 8;
            return (0, _investigation.findInvestigationById)(invID);

          case 8:
            investigations = _context3.sent;

            if (investigations) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'Bad request, An error has occured'
            }));

          case 11:
            return _context3.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: investigations,
              message: 'Successfully fetch investigation by Id'
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));

  return function fetchByInv(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchByInv = fetchByInv;

var updateByInv = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var user, invID, investigation_data, inspector_name, investigation, investigations;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            user = req.user;
            invID = req.params.invID;
            investigation_data = req.body.investigation_data;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'This investigator does not exists'
            }));

          case 6:
            inspector_name = user.inspector_name;
            _context4.next = 9;
            return (0, _investigation.findInvestigationById)(invID);

          case 9:
            investigation = _context4.sent;

            if (!(investigation.inspector_name !== inspector_name)) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", (0, _index.Response)(res, {
              status: 403,
              message: 'UnAuthorized Investigator'
            }));

          case 12:
            _context4.next = 14;
            return (0, _investigation.updateInvestigationById)(invID, investigation_data);

          case 14:
            investigations = _context4.sent;

            if (investigations) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'Bad request, An error has occured'
            }));

          case 17:
            delete investigations._id;
            return _context4.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              data: {
                "inspector_name": investigations.inspector_name,
                "investigation_data": investigations.investigation_data,
                "unique_id": investigations.unique_id,
                "created": investigations.created,
                "updated": investigations.updated
              },
              message: 'Successfully update investigation'
            }));

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 21]]);
  }));

  return function updateByInv(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateByInv = updateByInv;

var deleteByInv = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var user, invID, inspector_name, investigation, investigations;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            user = req.user;
            invID = req.params.invID;

            if (user) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'This investigator does not exists'
            }));

          case 5:
            inspector_name = user.inspector_name;
            _context5.next = 8;
            return (0, _investigation.findInvestigationById)(invID);

          case 8:
            investigation = _context5.sent;

            if (!(investigation.inspector_name !== inspector_name)) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", (0, _index.Response)(res, {
              status: 403,
              message: 'UnAuthorized Investigator'
            }));

          case 11:
            _context5.next = 13;
            return (0, _investigation.deleteInvestigation)(invID);

          case 13:
            investigations = _context5.sent;

            if (investigations) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", (0, _index.Response)(res, {
              status: 409,
              message: 'Bad request, An error has occured'
            }));

          case 16:
            return _context5.abrupt("return", (0, _index.Response)(res, {
              status: 200,
              message: 'Successfully delete investigation'
            }));

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 19]]);
  }));

  return function deleteByInv(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteByInv = deleteByInv;