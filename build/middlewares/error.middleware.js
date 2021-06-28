"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var errorMiddleware = function errorMiddleware(error, req, res, next) {
  try {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    res.status(status).json({
      message: message
    });
  } catch (error) {
    next(error);
  }
};

var _default = errorMiddleware;
exports["default"] = _default;