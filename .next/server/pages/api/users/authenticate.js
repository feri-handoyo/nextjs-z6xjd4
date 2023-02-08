"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users/authenticate";
exports.ids = ["pages/api/users/authenticate"];
exports.modules = {

/***/ "./helpers/api/api-handler.js":
/*!************************************!*\
  !*** ./helpers/api/api-handler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiHandler": () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");



function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase(); // check handler supports HTTP method

    if (!handler[method]) return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // global middleware
      await (0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.jwtMiddleware)(req, res); // route handler

      await handler[method](req, res);
    } catch (err) {
      // global error handler
      (0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(err, res);
    }
  };
}

/***/ }),

/***/ "./helpers/api/error-handler.js":
/*!**************************************!*\
  !*** ./helpers/api/error-handler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "errorHandler": () => (/* binding */ errorHandler)
/* harmony export */ });


function errorHandler(err, res) {
  if (typeof err === 'string') {
    // custom application error
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({
      message: err
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      message: 'Invalid Token'
    });
  } // default to 500 server error


  console.error(err);
  return res.status(500).json({
    message: err.message
  });
}

/***/ }),

/***/ "./helpers/api/index.js":
/*!******************************!*\
  !*** ./helpers/api/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-handler */ "./helpers/api/api-handler.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _api_handler__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _api_handler__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error-handler */ "./helpers/api/error-handler.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _error_handler__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _error_handler__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _jwt_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jwt-middleware */ "./helpers/api/jwt-middleware.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _jwt_middleware__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _jwt_middleware__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _omit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./omit */ "./helpers/api/omit.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _omit__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _omit__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _users_repo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users-repo */ "./helpers/api/users-repo.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _users_repo__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _users_repo__WEBPACK_IMPORTED_MODULE_4__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);






/***/ }),

/***/ "./helpers/api/jwt-middleware.js":
/*!***************************************!*\
  !*** ./helpers/api/jwt-middleware.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jwtMiddleware": () => (/* binding */ jwtMiddleware)
/* harmony export */ });
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/config */ "next/config");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_0__);
const expressJwt = __webpack_require__(/*! express-jwt */ "express-jwt");

const util = __webpack_require__(/*! util */ "util");


const {
  serverRuntimeConfig
} = next_config__WEBPACK_IMPORTED_MODULE_0___default()();


function jwtMiddleware(req, res) {
  const middleware = expressJwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ['HS256']
  }).unless({
    path: [// public routes that don't require authentication
    '/api/users/register', '/api/users/authenticate']
  });
  return util.promisify(middleware)(req, res);
}

/***/ }),

/***/ "./helpers/api/omit.js":
/*!*****************************!*\
  !*** ./helpers/api/omit.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "omit": () => (/* binding */ omit)
/* harmony export */ });
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



function omit(obj, key) {
  const {
    [key]: omitted
  } = obj,
        rest = _objectWithoutProperties(obj, [key].map(_toPropertyKey));

  return rest;
}

/***/ }),

/***/ "./helpers/api/users-repo.js":
/*!***********************************!*\
  !*** ./helpers/api/users-repo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "usersRepo": () => (/* binding */ usersRepo)
/* harmony export */ });
const fs = __webpack_require__(/*! fs */ "fs"); // users in JSON file for simplicity, store in a db for production applications


let users = __webpack_require__(/*! data/users.json */ "./data/users.json");

const usersRepo = {
  getAll: () => users,
  getById: id => users.find(x => x.id.toString() === id.toString()),
  find: x => users.find(x),
  create,
  update,
  delete: _delete
};

function create(user) {
  // generate new user id
  user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1; // set date created and updated

  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString(); // add and save user

  users.push(user);
  saveData();
}

function update(id, params) {
  const user = users.find(x => x.id.toString() === id.toString()); // set date updated

  user.dateUpdated = new Date().toISOString(); // update and save

  Object.assign(user, params);
  saveData();
} // prefixed with underscore '_' because 'delete' is a reserved word in javascript


function _delete(id) {
  // filter out deleted user and save
  users = users.filter(x => x.id.toString() !== id.toString());
  saveData();
} // private helper functions


function saveData() {
  fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}

/***/ }),

/***/ "./pages/api/users/authenticate.js":
/*!*****************************************!*\
  !*** ./pages/api/users/authenticate.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/config */ "next/config");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");



const {
  serverRuntimeConfig
} = next_config__WEBPACK_IMPORTED_MODULE_0___default()();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,helpers_api__WEBPACK_IMPORTED_MODULE_1__.apiHandler)({
  post: authenticate
}));

function authenticate(req, res) {
  const {
    username,
    password
  } = req.body;
  const user = helpers_api__WEBPACK_IMPORTED_MODULE_1__.usersRepo.find(u => u.username === username); // validate

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw 'Username or password is incorrect';
  } // create a jwt token that is valid for 7 days


  const token = jwt.sign({
    sub: user.id
  }, serverRuntimeConfig.secret, {
    expiresIn: '7d'
  }); // return basic user details and token

  return res.status(200).json({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token
  });
}

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "next/config":
/*!******************************!*\
  !*** external "next/config" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "./data/users.json":
/*!*************************!*\
  !*** ./data/users.json ***!
  \*************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"firstName":"feri","lastName":"handoyo","username":"ferifer","hash":"$2a$10$gzVPBuYBNk0ggNAQ5HoIjecLB2AyHu0e3yuLNvYdo1DjK7rtumXHi","id":1,"dateCreated":"2023-02-08T15:21:31.990Z","dateUpdated":"2023-02-08T15:21:31.990Z"}]');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/authenticate.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvYXBpL3VzZXJzL2F1dGhlbnRpY2F0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBOztBQUVBLFNBQVNFLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCO0FBQzNCLFNBQU8sT0FBT0MsR0FBUCxFQUFZQyxHQUFaLEtBQW9CO0FBQ3pCLFVBQU1DLE1BQU0sR0FBR0YsR0FBRyxDQUFDRSxNQUFKLENBQVdDLFdBQVgsRUFBZixDQUR5QixDQUd6Qjs7QUFDQSxRQUFJLENBQUNKLE9BQU8sQ0FBQ0csTUFBRCxDQUFaLEVBQ0UsT0FBT0QsR0FBRyxDQUFDRyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsR0FBaEIsQ0FBcUIsVUFBU0wsR0FBRyxDQUFDRSxNQUFPLGNBQXpDLENBQVA7O0FBRUYsUUFBSTtBQUNGO0FBQ0EsWUFBTUwsMERBQWEsQ0FBQ0csR0FBRCxFQUFNQyxHQUFOLENBQW5CLENBRkUsQ0FJRjs7QUFDQSxZQUFNRixPQUFPLENBQUNHLE1BQUQsQ0FBUCxDQUFnQkYsR0FBaEIsRUFBcUJDLEdBQXJCLENBQU47QUFDRCxLQU5ELENBTUUsT0FBT0ssR0FBUCxFQUFZO0FBQ1o7QUFDQVYsTUFBQUEseURBQVksQ0FBQ1UsR0FBRCxFQUFNTCxHQUFOLENBQVo7QUFDRDtBQUNGLEdBakJEO0FBa0JEOzs7Ozs7Ozs7Ozs7OztBQ3ZCRDs7QUFFQSxTQUFTTCxZQUFULENBQXNCVSxHQUF0QixFQUEyQkwsR0FBM0IsRUFBZ0M7QUFDOUIsTUFBSSxPQUFPSyxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0I7QUFDQSxVQUFNQyxLQUFLLEdBQUdELEdBQUcsQ0FBQ0gsV0FBSixHQUFrQkssUUFBbEIsQ0FBMkIsV0FBM0IsQ0FBZDtBQUNBLFVBQU1DLFVBQVUsR0FBR0YsS0FBSyxHQUFHLEdBQUgsR0FBUyxHQUFqQztBQUNBLFdBQU9OLEdBQUcsQ0FBQ0csTUFBSixDQUFXSyxVQUFYLEVBQXVCQyxJQUF2QixDQUE0QjtBQUFFQyxNQUFBQSxPQUFPLEVBQUVMO0FBQVgsS0FBNUIsQ0FBUDtBQUNEOztBQUVELE1BQUlBLEdBQUcsQ0FBQ00sSUFBSixLQUFhLG1CQUFqQixFQUFzQztBQUNwQztBQUNBLFdBQU9YLEdBQUcsQ0FBQ0csTUFBSixDQUFXLEdBQVgsRUFBZ0JNLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQXJCLENBQVA7QUFDRCxHQVg2QixDQWE5Qjs7O0FBQ0FFLEVBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjUixHQUFkO0FBQ0EsU0FBT0wsR0FBRyxDQUFDRyxNQUFKLENBQVcsR0FBWCxFQUFnQk0sSUFBaEIsQ0FBcUI7QUFBRUMsSUFBQUEsT0FBTyxFQUFFTCxHQUFHLENBQUNLO0FBQWYsR0FBckIsQ0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBLE1BQU1JLFVBQVUsR0FBR0MsbUJBQU8sQ0FBQyxnQ0FBRCxDQUExQjs7QUFDQSxNQUFNQyxJQUFJLEdBQUdELG1CQUFPLENBQUMsa0JBQUQsQ0FBcEI7O0FBQ0E7QUFFQSxNQUFNO0FBQUVHLEVBQUFBO0FBQUYsSUFBMEJELGtEQUFTLEVBQXpDO0FBRUE7O0FBRUEsU0FBU3JCLGFBQVQsQ0FBdUJHLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFpQztBQUMvQixRQUFNbUIsVUFBVSxHQUFHTCxVQUFVLENBQUM7QUFDNUJNLElBQUFBLE1BQU0sRUFBRUYsbUJBQW1CLENBQUNFLE1BREE7QUFFNUJDLElBQUFBLFVBQVUsRUFBRSxDQUFDLE9BQUQ7QUFGZ0IsR0FBRCxDQUFWLENBR2hCQyxNQUhnQixDQUdUO0FBQ1JDLElBQUFBLElBQUksRUFBRSxDQUNKO0FBQ0EseUJBRkksRUFHSix5QkFISTtBQURFLEdBSFMsQ0FBbkI7QUFXQSxTQUFPUCxJQUFJLENBQUNRLFNBQUwsQ0FBZUwsVUFBZixFQUEyQnBCLEdBQTNCLEVBQWdDQyxHQUFoQyxDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkQ7O0FBRUEsU0FBU3lCLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0I7QUFDdEIsUUFBTTtBQUFFLEtBQUNBLEdBQUQsR0FBT0M7QUFBVCxNQUE4QkYsR0FBcEM7QUFBQSxRQUEyQkcsSUFBM0IsNEJBQW9DSCxHQUFwQyxHQUFTQyxHQUFUOztBQUNBLFNBQU9FLElBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7QUNMRCxNQUFNQyxFQUFFLEdBQUdmLG1CQUFPLENBQUMsY0FBRCxDQUFsQixFQUVBOzs7QUFDQSxJQUFJZ0IsS0FBSyxHQUFHaEIsbUJBQU8sQ0FBQywwQ0FBRCxDQUFuQjs7QUFFTyxNQUFNaUIsU0FBUyxHQUFHO0FBQ3ZCQyxFQUFBQSxNQUFNLEVBQUUsTUFBTUYsS0FEUztBQUV2QkcsRUFBQUEsT0FBTyxFQUFHQyxFQUFELElBQVFKLEtBQUssQ0FBQ0ssSUFBTixDQUFZQyxDQUFELElBQU9BLENBQUMsQ0FBQ0YsRUFBRixDQUFLRyxRQUFMLE9BQW9CSCxFQUFFLENBQUNHLFFBQUgsRUFBdEMsQ0FGTTtBQUd2QkYsRUFBQUEsSUFBSSxFQUFHQyxDQUFELElBQU9OLEtBQUssQ0FBQ0ssSUFBTixDQUFXQyxDQUFYLENBSFU7QUFJdkJFLEVBQUFBLE1BSnVCO0FBS3ZCQyxFQUFBQSxNQUx1QjtBQU12QkMsRUFBQUEsTUFBTSxFQUFFQztBQU5lLENBQWxCOztBQVNQLFNBQVNILE1BQVQsQ0FBZ0JJLElBQWhCLEVBQXNCO0FBQ3BCO0FBQ0FBLEVBQUFBLElBQUksQ0FBQ1IsRUFBTCxHQUFVSixLQUFLLENBQUNhLE1BQU4sR0FBZUMsSUFBSSxDQUFDQyxHQUFMLENBQVMsR0FBR2YsS0FBSyxDQUFDZ0IsR0FBTixDQUFXVixDQUFELElBQU9BLENBQUMsQ0FBQ0YsRUFBbkIsQ0FBWixJQUFzQyxDQUFyRCxHQUF5RCxDQUFuRSxDQUZvQixDQUlwQjs7QUFDQVEsRUFBQUEsSUFBSSxDQUFDSyxXQUFMLEdBQW1CLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUFuQjtBQUNBUCxFQUFBQSxJQUFJLENBQUNRLFdBQUwsR0FBbUIsSUFBSUYsSUFBSixHQUFXQyxXQUFYLEVBQW5CLENBTm9CLENBUXBCOztBQUNBbkIsRUFBQUEsS0FBSyxDQUFDcUIsSUFBTixDQUFXVCxJQUFYO0FBQ0FVLEVBQUFBLFFBQVE7QUFDVDs7QUFFRCxTQUFTYixNQUFULENBQWdCTCxFQUFoQixFQUFvQm1CLE1BQXBCLEVBQTRCO0FBQzFCLFFBQU1YLElBQUksR0FBR1osS0FBSyxDQUFDSyxJQUFOLENBQVlDLENBQUQsSUFBT0EsQ0FBQyxDQUFDRixFQUFGLENBQUtHLFFBQUwsT0FBb0JILEVBQUUsQ0FBQ0csUUFBSCxFQUF0QyxDQUFiLENBRDBCLENBRzFCOztBQUNBSyxFQUFBQSxJQUFJLENBQUNRLFdBQUwsR0FBbUIsSUFBSUYsSUFBSixHQUFXQyxXQUFYLEVBQW5CLENBSjBCLENBTTFCOztBQUNBSyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY2IsSUFBZCxFQUFvQlcsTUFBcEI7QUFDQUQsRUFBQUEsUUFBUTtBQUNULEVBRUQ7OztBQUNBLFNBQVNYLE9BQVQsQ0FBaUJQLEVBQWpCLEVBQXFCO0FBQ25CO0FBQ0FKLEVBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDMEIsTUFBTixDQUFjcEIsQ0FBRCxJQUFPQSxDQUFDLENBQUNGLEVBQUYsQ0FBS0csUUFBTCxPQUFvQkgsRUFBRSxDQUFDRyxRQUFILEVBQXhDLENBQVI7QUFDQWUsRUFBQUEsUUFBUTtBQUNULEVBRUQ7OztBQUVBLFNBQVNBLFFBQVQsR0FBb0I7QUFDbEJ2QixFQUFBQSxFQUFFLENBQUM0QixhQUFILENBQWlCLGlCQUFqQixFQUFvQ0MsSUFBSSxDQUFDQyxTQUFMLENBQWU3QixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXBDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRELE1BQU04QixHQUFHLEdBQUc5QyxtQkFBTyxDQUFDLGtDQUFELENBQW5COztBQUNBLE1BQU0rQyxNQUFNLEdBQUcvQyxtQkFBTyxDQUFDLDBCQUFELENBQXRCOztBQUNBO0FBRUE7QUFFQSxNQUFNO0FBQUVHLEVBQUFBO0FBQUYsSUFBMEJELGtEQUFTLEVBQXpDO0FBRUEsaUVBQWVwQix1REFBVSxDQUFDO0FBQ3RCa0UsRUFBQUEsSUFBSSxFQUFFQztBQURnQixDQUFELENBQXpCOztBQUlBLFNBQVNBLFlBQVQsQ0FBc0JqRSxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUIsUUFBTTtBQUFFaUUsSUFBQUEsUUFBRjtBQUFZQyxJQUFBQTtBQUFaLE1BQXlCbkUsR0FBRyxDQUFDb0UsSUFBbkM7QUFDQSxRQUFNeEIsSUFBSSxHQUFHWCx1REFBQSxDQUFlb0MsQ0FBQyxJQUFJQSxDQUFDLENBQUNILFFBQUYsS0FBZUEsUUFBbkMsQ0FBYixDQUY0QixDQUk1Qjs7QUFDQSxNQUFJLEVBQUV0QixJQUFJLElBQUltQixNQUFNLENBQUNPLFdBQVAsQ0FBbUJILFFBQW5CLEVBQTZCdkIsSUFBSSxDQUFDMkIsSUFBbEMsQ0FBVixDQUFKLEVBQXdEO0FBQ3BELFVBQU0sbUNBQU47QUFDSCxHQVAyQixDQVM1Qjs7O0FBQ0EsUUFBTUMsS0FBSyxHQUFHVixHQUFHLENBQUNXLElBQUosQ0FBUztBQUFFQyxJQUFBQSxHQUFHLEVBQUU5QixJQUFJLENBQUNSO0FBQVosR0FBVCxFQUEyQmpCLG1CQUFtQixDQUFDRSxNQUEvQyxFQUF1RDtBQUFFc0QsSUFBQUEsU0FBUyxFQUFFO0FBQWIsR0FBdkQsQ0FBZCxDQVY0QixDQVk1Qjs7QUFDQSxTQUFPMUUsR0FBRyxDQUFDRyxNQUFKLENBQVcsR0FBWCxFQUFnQk0sSUFBaEIsQ0FBcUI7QUFDeEIwQixJQUFBQSxFQUFFLEVBQUVRLElBQUksQ0FBQ1IsRUFEZTtBQUV4QjhCLElBQUFBLFFBQVEsRUFBRXRCLElBQUksQ0FBQ3NCLFFBRlM7QUFHeEJVLElBQUFBLFNBQVMsRUFBRWhDLElBQUksQ0FBQ2dDLFNBSFE7QUFJeEJDLElBQUFBLFFBQVEsRUFBRWpDLElBQUksQ0FBQ2lDLFFBSlM7QUFLeEJMLElBQUFBO0FBTHdCLEdBQXJCLENBQVA7QUFPSDs7Ozs7Ozs7OztBQ2hDRDs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvYXBpLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2Vycm9yLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2luZGV4LmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9qd3QtbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvb21pdC5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvdXNlcnMtcmVwby5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vcGFnZXMvYXBpL3VzZXJzL2F1dGhlbnRpY2F0ZS5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwiYmNyeXB0anNcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwiZXhwcmVzcy1qd3RcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS9leHRlcm5hbCBcIm5leHQvY29uZmlnXCIiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS9leHRlcm5hbCBcInV0aWxcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvckhhbmRsZXIsIGp3dE1pZGRsZXdhcmUgfSBmcm9tICdoZWxwZXJzL2FwaSc7XHJcblxyXG5leHBvcnQgeyBhcGlIYW5kbGVyIH07XHJcblxyXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGhhbmRsZXIpIHtcclxuICByZXR1cm4gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgLy8gY2hlY2sgaGFuZGxlciBzdXBwb3J0cyBIVFRQIG1ldGhvZFxyXG4gICAgaWYgKCFoYW5kbGVyW21ldGhvZF0pXHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuZW5kKGBNZXRob2QgJHtyZXEubWV0aG9kfSBOb3QgQWxsb3dlZGApO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIGdsb2JhbCBtaWRkbGV3YXJlXHJcbiAgICAgIGF3YWl0IGp3dE1pZGRsZXdhcmUocmVxLCByZXMpO1xyXG5cclxuICAgICAgLy8gcm91dGUgaGFuZGxlclxyXG4gICAgICBhd2FpdCBoYW5kbGVyW21ldGhvZF0ocmVxLCByZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIC8vIGdsb2JhbCBlcnJvciBoYW5kbGVyXHJcbiAgICAgIGVycm9ySGFuZGxlcihlcnIsIHJlcyk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgeyBlcnJvckhhbmRsZXIgfTtcclxuXHJcbmZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnIsIHJlcykge1xyXG4gIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykge1xyXG4gICAgLy8gY3VzdG9tIGFwcGxpY2F0aW9uIGVycm9yXHJcbiAgICBjb25zdCBpczQwNCA9IGVyci50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKCdub3QgZm91bmQnKTtcclxuICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBpczQwNCA/IDQwNCA6IDQwMDtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKHN0YXR1c0NvZGUpLmpzb24oeyBtZXNzYWdlOiBlcnIgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoZXJyLm5hbWUgPT09ICdVbmF1dGhvcml6ZWRFcnJvcicpIHtcclxuICAgIC8vIGp3dCBhdXRoZW50aWNhdGlvbiBlcnJvclxyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogJ0ludmFsaWQgVG9rZW4nIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gZGVmYXVsdCB0byA1MDAgc2VydmVyIGVycm9yXHJcbiAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vYXBpLWhhbmRsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2Vycm9yLWhhbmRsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2p3dC1taWRkbGV3YXJlJztcclxuZXhwb3J0ICogZnJvbSAnLi9vbWl0JztcclxuZXhwb3J0ICogZnJvbSAnLi91c2Vycy1yZXBvJztcclxuIiwiY29uc3QgZXhwcmVzc0p3dCA9IHJlcXVpcmUoJ2V4cHJlc3Mtand0Jyk7XHJcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XHJcbmltcG9ydCBnZXRDb25maWcgZnJvbSAnbmV4dC9jb25maWcnO1xyXG5cclxuY29uc3QgeyBzZXJ2ZXJSdW50aW1lQ29uZmlnIH0gPSBnZXRDb25maWcoKTtcclxuXHJcbmV4cG9ydCB7IGp3dE1pZGRsZXdhcmUgfTtcclxuXHJcbmZ1bmN0aW9uIGp3dE1pZGRsZXdhcmUocmVxLCByZXMpIHtcclxuICBjb25zdCBtaWRkbGV3YXJlID0gZXhwcmVzc0p3dCh7XHJcbiAgICBzZWNyZXQ6IHNlcnZlclJ1bnRpbWVDb25maWcuc2VjcmV0LFxyXG4gICAgYWxnb3JpdGhtczogWydIUzI1NiddLFxyXG4gIH0pLnVubGVzcyh7XHJcbiAgICBwYXRoOiBbXHJcbiAgICAgIC8vIHB1YmxpYyByb3V0ZXMgdGhhdCBkb24ndCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgICcvYXBpL3VzZXJzL3JlZ2lzdGVyJyxcclxuICAgICAgJy9hcGkvdXNlcnMvYXV0aGVudGljYXRlJyxcclxuICAgIF0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB1dGlsLnByb21pc2lmeShtaWRkbGV3YXJlKShyZXEsIHJlcyk7XHJcbn1cclxuIiwiZXhwb3J0IHsgb21pdCB9O1xyXG5cclxuZnVuY3Rpb24gb21pdChvYmosIGtleSkge1xyXG4gIGNvbnN0IHsgW2tleV06IG9taXR0ZWQsIC4uLnJlc3QgfSA9IG9iajtcclxuICByZXR1cm4gcmVzdDtcclxufVxyXG4iLCJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG4vLyB1c2VycyBpbiBKU09OIGZpbGUgZm9yIHNpbXBsaWNpdHksIHN0b3JlIGluIGEgZGIgZm9yIHByb2R1Y3Rpb24gYXBwbGljYXRpb25zXHJcbmxldCB1c2VycyA9IHJlcXVpcmUoJ2RhdGEvdXNlcnMuanNvbicpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJzUmVwbyA9IHtcclxuICBnZXRBbGw6ICgpID0+IHVzZXJzLFxyXG4gIGdldEJ5SWQ6IChpZCkgPT4gdXNlcnMuZmluZCgoeCkgPT4geC5pZC50b1N0cmluZygpID09PSBpZC50b1N0cmluZygpKSxcclxuICBmaW5kOiAoeCkgPT4gdXNlcnMuZmluZCh4KSxcclxuICBjcmVhdGUsXHJcbiAgdXBkYXRlLFxyXG4gIGRlbGV0ZTogX2RlbGV0ZSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSh1c2VyKSB7XHJcbiAgLy8gZ2VuZXJhdGUgbmV3IHVzZXIgaWRcclxuICB1c2VyLmlkID0gdXNlcnMubGVuZ3RoID8gTWF0aC5tYXgoLi4udXNlcnMubWFwKCh4KSA9PiB4LmlkKSkgKyAxIDogMTtcclxuXHJcbiAgLy8gc2V0IGRhdGUgY3JlYXRlZCBhbmQgdXBkYXRlZFxyXG4gIHVzZXIuZGF0ZUNyZWF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgdXNlci5kYXRlVXBkYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuXHJcbiAgLy8gYWRkIGFuZCBzYXZlIHVzZXJcclxuICB1c2Vycy5wdXNoKHVzZXIpO1xyXG4gIHNhdmVEYXRhKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZShpZCwgcGFyYW1zKSB7XHJcbiAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQoKHgpID0+IHguaWQudG9TdHJpbmcoKSA9PT0gaWQudG9TdHJpbmcoKSk7XHJcblxyXG4gIC8vIHNldCBkYXRlIHVwZGF0ZWRcclxuICB1c2VyLmRhdGVVcGRhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAvLyB1cGRhdGUgYW5kIHNhdmVcclxuICBPYmplY3QuYXNzaWduKHVzZXIsIHBhcmFtcyk7XHJcbiAgc2F2ZURhdGEoKTtcclxufVxyXG5cclxuLy8gcHJlZml4ZWQgd2l0aCB1bmRlcnNjb3JlICdfJyBiZWNhdXNlICdkZWxldGUnIGlzIGEgcmVzZXJ2ZWQgd29yZCBpbiBqYXZhc2NyaXB0XHJcbmZ1bmN0aW9uIF9kZWxldGUoaWQpIHtcclxuICAvLyBmaWx0ZXIgb3V0IGRlbGV0ZWQgdXNlciBhbmQgc2F2ZVxyXG4gIHVzZXJzID0gdXNlcnMuZmlsdGVyKCh4KSA9PiB4LmlkLnRvU3RyaW5nKCkgIT09IGlkLnRvU3RyaW5nKCkpO1xyXG4gIHNhdmVEYXRhKCk7XHJcbn1cclxuXHJcbi8vIHByaXZhdGUgaGVscGVyIGZ1bmN0aW9uc1xyXG5cclxuZnVuY3Rpb24gc2F2ZURhdGEoKSB7XHJcbiAgZnMud3JpdGVGaWxlU3luYygnZGF0YS91c2Vycy5qc29uJywgSlNPTi5zdHJpbmdpZnkodXNlcnMsIG51bGwsIDQpKTtcclxufVxyXG4iLCJjb25zdCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0anMnKTtcclxuaW1wb3J0IGdldENvbmZpZyBmcm9tICduZXh0L2NvbmZpZyc7XHJcblxyXG5pbXBvcnQgeyBhcGlIYW5kbGVyLCB1c2Vyc1JlcG8gfSBmcm9tICdoZWxwZXJzL2FwaSc7XHJcblxyXG5jb25zdCB7IHNlcnZlclJ1bnRpbWVDb25maWcgfSA9IGdldENvbmZpZygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpSGFuZGxlcih7XHJcbiAgICBwb3N0OiBhdXRoZW50aWNhdGVcclxufSk7XHJcblxyXG5mdW5jdGlvbiBhdXRoZW50aWNhdGUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcclxuICAgIGNvbnN0IHVzZXIgPSB1c2Vyc1JlcG8uZmluZCh1ID0+IHUudXNlcm5hbWUgPT09IHVzZXJuYW1lKTtcclxuXHJcbiAgICAvLyB2YWxpZGF0ZVxyXG4gICAgaWYgKCEodXNlciAmJiBiY3J5cHQuY29tcGFyZVN5bmMocGFzc3dvcmQsIHVzZXIuaGFzaCkpKSB7XHJcbiAgICAgICAgdGhyb3cgJ1VzZXJuYW1lIG9yIHBhc3N3b3JkIGlzIGluY29ycmVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIGEgand0IHRva2VuIHRoYXQgaXMgdmFsaWQgZm9yIDcgZGF5c1xyXG4gICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IHN1YjogdXNlci5pZCB9LCBzZXJ2ZXJSdW50aW1lQ29uZmlnLnNlY3JldCwgeyBleHBpcmVzSW46ICc3ZCcgfSk7XHJcblxyXG4gICAgLy8gcmV0dXJuIGJhc2ljIHVzZXIgZGV0YWlscyBhbmQgdG9rZW5cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXHJcbiAgICAgICAgZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcclxuICAgICAgICBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcclxuICAgICAgICB0b2tlblxyXG4gICAgfSk7XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWp3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwibmFtZXMiOlsiZXJyb3JIYW5kbGVyIiwiand0TWlkZGxld2FyZSIsImFwaUhhbmRsZXIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwidG9Mb3dlckNhc2UiLCJzdGF0dXMiLCJlbmQiLCJlcnIiLCJpczQwNCIsImVuZHNXaXRoIiwic3RhdHVzQ29kZSIsImpzb24iLCJtZXNzYWdlIiwibmFtZSIsImNvbnNvbGUiLCJlcnJvciIsImV4cHJlc3NKd3QiLCJyZXF1aXJlIiwidXRpbCIsImdldENvbmZpZyIsInNlcnZlclJ1bnRpbWVDb25maWciLCJtaWRkbGV3YXJlIiwic2VjcmV0IiwiYWxnb3JpdGhtcyIsInVubGVzcyIsInBhdGgiLCJwcm9taXNpZnkiLCJvbWl0Iiwib2JqIiwia2V5Iiwib21pdHRlZCIsInJlc3QiLCJmcyIsInVzZXJzIiwidXNlcnNSZXBvIiwiZ2V0QWxsIiwiZ2V0QnlJZCIsImlkIiwiZmluZCIsIngiLCJ0b1N0cmluZyIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSIsIl9kZWxldGUiLCJ1c2VyIiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsIm1hcCIsImRhdGVDcmVhdGVkIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0ZVVwZGF0ZWQiLCJwdXNoIiwic2F2ZURhdGEiLCJwYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJmaWx0ZXIiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsImp3dCIsImJjcnlwdCIsInBvc3QiLCJhdXRoZW50aWNhdGUiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiYm9keSIsInUiLCJjb21wYXJlU3luYyIsImhhc2giLCJ0b2tlbiIsInNpZ24iLCJzdWIiLCJleHBpcmVzSW4iLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSJdLCJzb3VyY2VSb290IjoiIn0=