"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.autoPath = void 0;

var _express = _interopRequireDefault(require("express"));

var _investigation = require("./investigation.controllers");

var _auth = _interopRequireDefault(require("../../middlewares/auth.middleware"));

var investigateRoute = _express["default"].Router();

var autoPath = 'investigation'.toLowerCase(); // add investigation data

exports.autoPath = autoPath;
investigateRoute.post('/create', _auth["default"], _investigation.createInvestigation); // get all investigation data

investigateRoute.get('/all', _auth["default"], _investigation.fetchInvestigations); // get one investigation data

investigateRoute.get('/:invID', _auth["default"], _investigation.fetchByInv); // update investigation data

investigateRoute.put('/:invID', _auth["default"], _investigation.updateByInv); // delete investigation data

investigateRoute["delete"]('/:invID', _auth["default"], _investigation.deleteByInv);
var _default = investigateRoute;
exports["default"] = _default;