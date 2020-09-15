"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var SaltRounds = 8;

var AuthHelper = /*#__PURE__*/function () {
  function AuthHelper() {
    (0, _classCallCheck2["default"])(this, AuthHelper);
  }

  (0, _createClass2["default"])(AuthHelper, null, [{
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(SaltRounds));
    }
  }, {
    key: "comparePassword",
    value: function comparePassword(password, hash) {
      return _bcrypt["default"].compareSync(password, hash);
    }
  }]);
  return AuthHelper;
}();

var _default = AuthHelper;
exports["default"] = _default;
//# sourceMappingURL=AuthHelper.js.map