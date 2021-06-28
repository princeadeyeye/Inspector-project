"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var investigtionSchema = new _mongoose.Schema({
  unique_id: String,
  inspector_name: {
    type: String,
    required: true
  },
  investigation_data: {
    type: Object,
    required: true
  },
  updated: Date,
  created: {
    type: Date,
    "default": Date.now
  }
});
var investigtionModel = (0, _mongoose.model)('Investigtion', investigtionSchema);
var _default = investigtionModel;
exports["default"] = _default;