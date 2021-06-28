"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  unique_id: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  inspector_name: {
    type: String,
    required: true
  }
});
var userModel = (0, _mongoose.model)('User', userSchema);
var _default = userModel;
exports["default"] = _default;