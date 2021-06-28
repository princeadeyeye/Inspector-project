"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.autoPath = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("./auth.controllers");

var _auth2 = _interopRequireDefault(require("../../middlewares/auth.middleware"));

var authRoute = _express["default"].Router();

var autoPath = 'auth'.toLowerCase();
exports.autoPath = autoPath;
authRoute.post('/register', _auth.inspectorSignup);
authRoute.post('/login', _auth.inspectorLogin);
authRoute.post('/logout', _auth2["default"], _auth.logout); //get user data

authRoute.get('/profile', _auth2["default"], _auth.getProfile); //update user data

authRoute.put('/profile', _auth2["default"], _auth.updateProfile);
var _default = authRoute;
exports["default"] = _default;