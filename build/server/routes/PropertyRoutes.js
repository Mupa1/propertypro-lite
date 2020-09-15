"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _PropertyController = _interopRequireDefault(require("../controllers/PropertyController"));

var router = (0, _express.Router)();
router.get('/properties/', _PropertyController["default"].getAllProperties);
router.post('/properties/', _PropertyController["default"].addProperty);
router.get('/properties/:id', _PropertyController["default"].getAProperty);
router.put('/properties/:id', _PropertyController["default"].updateProperty);
router["delete"]('/properties/:id', _PropertyController["default"].deleteProperty);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=PropertyRoutes.js.map