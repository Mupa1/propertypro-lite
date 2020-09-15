"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserService = _interopRequireDefault(require("../services/UserService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _AuthHelper = _interopRequireDefault(require("../helpers/AuthHelper"));

var util = new _Utils["default"]();
var hashPassword = _AuthHelper["default"].hashPassword,
    comparePassword = _AuthHelper["default"].comparePassword;

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, first_name, last_name, address, phone_number, password, is_admin, hashedPassword, theUser, newUser, createdUser, id, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, first_name = _req$body.first_name, last_name = _req$body.last_name, address = _req$body.address, phone_number = _req$body.phone_number, password = _req$body.password, is_admin = _req$body.is_admin;
                hashedPassword = hashPassword(password);
                _context.next = 4;
                return _UserService["default"].getUserByEmail(email);

              case 4:
                theUser = _context.sent;

                if (!(!email || !first_name || !last_name || !address || !phone_number || !password || !is_admin)) {
                  _context.next = 10;
                  break;
                }

                util.setError(400, 'Please provide complete details');
                return _context.abrupt("return", util.send(res));

              case 10:
                if (!theUser) {
                  _context.next = 13;
                  break;
                }

                util.setError(400, "The email ".concat(email, " is already in use"));
                return _context.abrupt("return", util.send(res));

              case 13:
                req.body.password = hashedPassword;
                newUser = req.body;
                _context.prev = 15;
                _context.next = 18;
                return _UserService["default"].signUp(newUser);

              case 18:
                createdUser = _context.sent;
                _context.next = 21;
                return _UserService["default"].getUserById(createdUser.id);

              case 21:
                id = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  id: id
                }, process.env.SECRET_KEY, {
                  expiresIn: '24h'
                });
                createdUser = Object.assign({
                  token: token
                }, req.body);
                createdUser.password = undefined;
                util.setSuccess(201, 'User Added!', createdUser);
                return _context.abrupt("return", util.send(res));

              case 29:
                _context.prev = 29;
                _context.t0 = _context["catch"](15);
                util.setError(400, _context.t0.message);
                return _context.abrupt("return", util.send(res));

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[15, 29]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, theUser, checkPass, token, userData;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 3;
                return _UserService["default"].getUserByEmail(email);

              case 3:
                theUser = _context2.sent;

                if (theUser) {
                  _context2.next = 7;
                  break;
                }

                util.setError(400, "The email ".concat(email, " does not exist. Please register first."));
                return _context2.abrupt("return", util.send(res));

              case 7:
                _context2.prev = 7;
                checkPass = comparePassword(password, theUser.password);

                if (checkPass) {
                  _context2.next = 14;
                  break;
                }

                util.setError(400, "Invalid email or password.");
                return _context2.abrupt("return", util.send(res));

              case 14:
                token = _jsonwebtoken["default"].sign({
                  id: theUser.id
                }, process.env.SECRET_KEY, {
                  expiresIn: '24h'
                });
                userData = Object.assign({
                  token: token
                }, req.body);
                userData.password = undefined;
                util.setSuccess(201, "Welcome, ".concat(theUser.first_name, " ").concat(theUser.last_name, "!"), userData);
                return _context2.abrupt("return", util.send(res));

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](7);
                util.setError(400, _context2.t0.message);
                return _context2.abrupt("return", util.send(res));

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[7, 21]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=UserController.js.map