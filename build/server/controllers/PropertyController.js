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

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _PropertyService = _interopRequireDefault(require("../services/PropertyService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

_dotenv["default"].config();

var util = new _Utils["default"]();

_cloudinary["default"].config({
  API_Environment_variable: process.env.CLOUDINARY_URL
});

var PropertyController = /*#__PURE__*/function () {
  function PropertyController() {
    (0, _classCallCheck2["default"])(this, PropertyController);
  }

  (0, _createClass2["default"])(PropertyController, null, [{
    key: "addProperty",
    value: function addProperty(req, res) {
      var _req$body = req.body,
          city = _req$body.city,
          estate = _req$body.estate,
          type = _req$body.type,
          bedroom = _req$body.bedroom,
          bathroom = _req$body.bathroom,
          image_url = _req$body.image_url,
          price = _req$body.price,
          sale_or_rent = _req$body.sale_or_rent,
          owner_phone_number = _req$body.owner_phone_number,
          owner_email = _req$body.owner_email;

      if (!city || !estate || !type || !bedroom || !image_url || !bathroom || !price || !sale_or_rent || !owner_phone_number || !owner_email) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
      }

      _cloudinary["default"].uploader.upload(image_url, /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(result) {
          var newProperty, createdProperty;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  newProperty = {
                    city: city,
                    estate: estate,
                    type: type,
                    bedroom: bedroom,
                    bathroom: bathroom,
                    price: price,
                    sale_or_rent: sale_or_rent,
                    image_url: result.url,
                    owner_phone_number: owner_phone_number,
                    owner_email: owner_email
                  };
                  _context.prev = 1;
                  _context.next = 4;
                  return _PropertyService["default"].addProperty(newProperty);

                case 4:
                  createdProperty = _context.sent;
                  util.setSuccess(201, 'Property Added!', createdProperty);
                  return _context.abrupt("return", util.send(res));

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](1);
                  util.setError(400, _context.t0.message);
                  return _context.abrupt("return", util.send(res));

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 9]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "getAllProperties",
    value: function () {
      var _getAllProperties = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var allProperties;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _PropertyService["default"].getAllProperties();

              case 3:
                allProperties = _context2.sent;

                if (allProperties.length > 0) {
                  util.setSuccess(200, 'Properties retrieved', allProperties);
                } else {
                  util.setSuccess(200, 'No property found');
                }

                return _context2.abrupt("return", util.send(res));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                util.setError(400, _context2.t0);
                return _context2.abrupt("return", util.send(res));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function getAllProperties(_x2, _x3) {
        return _getAllProperties.apply(this, arguments);
      }

      return getAllProperties;
    }()
  }, {
    key: "getAProperty",
    value: function () {
      var _getAProperty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, theProperty;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context3.next = 4;
                  break;
                }

                util.setError(400, 'Please input a valid numeric value');
                return _context3.abrupt("return", util.send(res));

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return _PropertyService["default"].getAProperty(id);

              case 7:
                theProperty = _context3.sent;

                if (!theProperty) {
                  util.setError(404, "Cannot find property with the id ".concat(id));
                } else {
                  util.setSuccess(200, 'Found Property', theProperty);
                }

                return _context3.abrupt("return", util.send(res));

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](4);
                util.setError(404, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 12]]);
      }));

      function getAProperty(_x4, _x5) {
        return _getAProperty.apply(this, arguments);
      }

      return getAProperty;
    }()
  }, {
    key: "updateProperty",
    value: function () {
      var _updateProperty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var alteredProperty, id, _updateProperty2;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                alteredProperty = req.body;
                id = req.params.id;

                if (Number(id)) {
                  _context4.next = 5;
                  break;
                }

                util.setError(400, 'Please input a valid numeric value');
                return _context4.abrupt("return", util.send(res));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _PropertyService["default"].updateProperty(id, alteredProperty);

              case 8:
                _updateProperty2 = _context4.sent;

                if (!_updateProperty2) {
                  util.setError(404, "Cannot find property with the id: ".concat(id));
                } else {
                  util.setSuccess(200, 'Property updated', _updateProperty2);
                }

                return _context4.abrupt("return", util.send(res));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](5);
                util.setError(404, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 13]]);
      }));

      function updateProperty(_x6, _x7) {
        return _updateProperty.apply(this, arguments);
      }

      return updateProperty;
    }()
  }, {
    key: "deleteProperty",
    value: function () {
      var _deleteProperty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, propertyToDelete;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context5.next = 4;
                  break;
                }

                util.setError(400, 'Please provide a numeric value');
                return _context5.abrupt("return", util.send(res));

              case 4:
                _context5.prev = 4;
                _context5.next = 7;
                return _PropertyService["default"].deleteProperty(id);

              case 7:
                propertyToDelete = _context5.sent;

                if (propertyToDelete) {
                  util.setSuccess(200, 'Property deleted');
                } else {
                  util.setError(404, "Property with the id ".concat(id, " cannot be found"));
                }

                return _context5.abrupt("return", util.send(res));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](4);
                util.setError(400, _context5.t0);
                return _context5.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 12]]);
      }));

      function deleteProperty(_x8, _x9) {
        return _deleteProperty.apply(this, arguments);
      }

      return deleteProperty;
    }()
  }]);
  return PropertyController;
}();

var _default = PropertyController;
exports["default"] = _default;
//# sourceMappingURL=PropertyController.js.map