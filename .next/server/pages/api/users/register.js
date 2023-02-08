"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users/register";
exports.ids = ["pages/api/users/register"];
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

/***/ "./pages/api/users/register.js":
/*!*************************************!*\
  !*** ./pages/api/users/register.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");
const _excluded = ["password"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.apiHandler)({
  post: register
}));

function register(req, res) {
  // split out password from user details
  const _req$body = req.body,
        {
    password
  } = _req$body,
        user = _objectWithoutProperties(_req$body, _excluded); // validate


  if (helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.find(x => x.username === user.username)) throw `User with the username "${user.username}" already exists`; // hash password

  user.hash = bcrypt.hashSync(password, 10);
  helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.create(user);
  return res.status(200).json({});
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
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/register.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUUsRUFBQUEsSUFBSSxFQUFFQztBQURrQixDQUFELENBQXpCOztBQUlBLFNBQVNBLFFBQVQsQ0FBa0JoRSxHQUFsQixFQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUI7QUFDQSxvQkFBOEJELEdBQUcsQ0FBQ2lFLElBQWxDO0FBQUEsUUFBTTtBQUFFQyxJQUFBQTtBQUFGLEdBQU47QUFBQSxRQUFxQnRCLElBQXJCLGtEQUYwQixDQUkxQjs7O0FBQ0EsTUFBSVgsdURBQUEsQ0FBZ0JLLENBQUQsSUFBT0EsQ0FBQyxDQUFDNkIsUUFBRixLQUFldkIsSUFBSSxDQUFDdUIsUUFBMUMsQ0FBSixFQUNFLE1BQU8sMkJBQTBCdkIsSUFBSSxDQUFDdUIsUUFBUyxrQkFBL0MsQ0FOd0IsQ0FRMUI7O0FBQ0F2QixFQUFBQSxJQUFJLENBQUN3QixJQUFMLEdBQVlOLE1BQU0sQ0FBQ08sUUFBUCxDQUFnQkgsUUFBaEIsRUFBMEIsRUFBMUIsQ0FBWjtBQUVBakMsRUFBQUEseURBQUEsQ0FBaUJXLElBQWpCO0FBQ0EsU0FBTzNDLEdBQUcsQ0FBQ0csTUFBSixDQUFXLEdBQVgsRUFBZ0JNLElBQWhCLENBQXFCLEVBQXJCLENBQVA7QUFDRDs7Ozs7Ozs7OztBQ3JCRDs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2FwaS1oYW5kbGVyLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9lcnJvci1oYW5kbGVyLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvand0LW1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL29taXQuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL3VzZXJzLXJlcG8uanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL3BhZ2VzL2FwaS91c2Vycy9yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwiYmNyeXB0anNcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwiZXhwcmVzcy1qd3RcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwibmV4dC9jb25maWdcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwidXRpbFwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9ySGFuZGxlciwgand0TWlkZGxld2FyZSB9IGZyb20gJ2hlbHBlcnMvYXBpJztcclxuXHJcbmV4cG9ydCB7IGFwaUhhbmRsZXIgfTtcclxuXHJcbmZ1bmN0aW9uIGFwaUhhbmRsZXIoaGFuZGxlcikge1xyXG4gIHJldHVybiBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBjaGVjayBoYW5kbGVyIHN1cHBvcnRzIEhUVFAgbWV0aG9kXHJcbiAgICBpZiAoIWhhbmRsZXJbbWV0aG9kXSlcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5lbmQoYE1ldGhvZCAke3JlcS5tZXRob2R9IE5vdCBBbGxvd2VkYCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gZ2xvYmFsIG1pZGRsZXdhcmVcclxuICAgICAgYXdhaXQgand0TWlkZGxld2FyZShyZXEsIHJlcyk7XHJcblxyXG4gICAgICAvLyByb3V0ZSBoYW5kbGVyXHJcbiAgICAgIGF3YWl0IGhhbmRsZXJbbWV0aG9kXShyZXEsIHJlcyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gZ2xvYmFsIGVycm9yIGhhbmRsZXJcclxuICAgICAgZXJyb3JIYW5kbGVyKGVyciwgcmVzKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCB7IGVycm9ySGFuZGxlciB9O1xyXG5cclxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVyciwgcmVzKSB7XHJcbiAgaWYgKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAvLyBjdXN0b20gYXBwbGljYXRpb24gZXJyb3JcclxuICAgIGNvbnN0IGlzNDA0ID0gZXJyLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoJ25vdCBmb3VuZCcpO1xyXG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IGlzNDA0ID8gNDA0IDogNDAwO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoc3RhdHVzQ29kZSkuanNvbih7IG1lc3NhZ2U6IGVyciB9KTtcclxuICB9XHJcblxyXG4gIGlmIChlcnIubmFtZSA9PT0gJ1VuYXV0aG9yaXplZEVycm9yJykge1xyXG4gICAgLy8gand0IGF1dGhlbnRpY2F0aW9uIGVycm9yXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiAnSW52YWxpZCBUb2tlbicgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBkZWZhdWx0IHRvIDUwMCBzZXJ2ZXIgZXJyb3JcclxuICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSAnLi9hcGktaGFuZGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZXJyb3ItaGFuZGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vand0LW1pZGRsZXdhcmUnO1xyXG5leHBvcnQgKiBmcm9tICcuL29taXQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3VzZXJzLXJlcG8nO1xyXG4iLCJjb25zdCBleHByZXNzSnd0ID0gcmVxdWlyZSgnZXhwcmVzcy1qd3QnKTtcclxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcclxuaW1wb3J0IGdldENvbmZpZyBmcm9tICduZXh0L2NvbmZpZyc7XHJcblxyXG5jb25zdCB7IHNlcnZlclJ1bnRpbWVDb25maWcgfSA9IGdldENvbmZpZygpO1xyXG5cclxuZXhwb3J0IHsgand0TWlkZGxld2FyZSB9O1xyXG5cclxuZnVuY3Rpb24gand0TWlkZGxld2FyZShyZXEsIHJlcykge1xyXG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBleHByZXNzSnd0KHtcclxuICAgIHNlY3JldDogc2VydmVyUnVudGltZUNvbmZpZy5zZWNyZXQsXHJcbiAgICBhbGdvcml0aG1zOiBbJ0hTMjU2J10sXHJcbiAgfSkudW5sZXNzKHtcclxuICAgIHBhdGg6IFtcclxuICAgICAgLy8gcHVibGljIHJvdXRlcyB0aGF0IGRvbid0IHJlcXVpcmUgYXV0aGVudGljYXRpb25cclxuICAgICAgJy9hcGkvdXNlcnMvcmVnaXN0ZXInLFxyXG4gICAgICAnL2FwaS91c2Vycy9hdXRoZW50aWNhdGUnLFxyXG4gICAgXSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHV0aWwucHJvbWlzaWZ5KG1pZGRsZXdhcmUpKHJlcSwgcmVzKTtcclxufVxyXG4iLCJleHBvcnQgeyBvbWl0IH07XHJcblxyXG5mdW5jdGlvbiBvbWl0KG9iaiwga2V5KSB7XHJcbiAgY29uc3QgeyBba2V5XTogb21pdHRlZCwgLi4ucmVzdCB9ID0gb2JqO1xyXG4gIHJldHVybiByZXN0O1xyXG59XHJcbiIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbi8vIHVzZXJzIGluIEpTT04gZmlsZSBmb3Igc2ltcGxpY2l0eSwgc3RvcmUgaW4gYSBkYiBmb3IgcHJvZHVjdGlvbiBhcHBsaWNhdGlvbnNcclxubGV0IHVzZXJzID0gcmVxdWlyZSgnZGF0YS91c2Vycy5qc29uJyk7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlcnNSZXBvID0ge1xyXG4gIGdldEFsbDogKCkgPT4gdXNlcnMsXHJcbiAgZ2V0QnlJZDogKGlkKSA9PiB1c2Vycy5maW5kKCh4KSA9PiB4LmlkLnRvU3RyaW5nKCkgPT09IGlkLnRvU3RyaW5nKCkpLFxyXG4gIGZpbmQ6ICh4KSA9PiB1c2Vycy5maW5kKHgpLFxyXG4gIGNyZWF0ZSxcclxuICB1cGRhdGUsXHJcbiAgZGVsZXRlOiBfZGVsZXRlLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHVzZXIpIHtcclxuICAvLyBnZW5lcmF0ZSBuZXcgdXNlciBpZFxyXG4gIHVzZXIuaWQgPSB1c2Vycy5sZW5ndGggPyBNYXRoLm1heCguLi51c2Vycy5tYXAoKHgpID0+IHguaWQpKSArIDEgOiAxO1xyXG5cclxuICAvLyBzZXQgZGF0ZSBjcmVhdGVkIGFuZCB1cGRhdGVkXHJcbiAgdXNlci5kYXRlQ3JlYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICB1c2VyLmRhdGVVcGRhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAvLyBhZGQgYW5kIHNhdmUgdXNlclxyXG4gIHVzZXJzLnB1c2godXNlcik7XHJcbiAgc2F2ZURhdGEoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKGlkLCBwYXJhbXMpIHtcclxuICBjb25zdCB1c2VyID0gdXNlcnMuZmluZCgoeCkgPT4geC5pZC50b1N0cmluZygpID09PSBpZC50b1N0cmluZygpKTtcclxuXHJcbiAgLy8gc2V0IGRhdGUgdXBkYXRlZFxyXG4gIHVzZXIuZGF0ZVVwZGF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gIC8vIHVwZGF0ZSBhbmQgc2F2ZVxyXG4gIE9iamVjdC5hc3NpZ24odXNlciwgcGFyYW1zKTtcclxuICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG4vLyBwcmVmaXhlZCB3aXRoIHVuZGVyc2NvcmUgJ18nIGJlY2F1c2UgJ2RlbGV0ZScgaXMgYSByZXNlcnZlZCB3b3JkIGluIGphdmFzY3JpcHRcclxuZnVuY3Rpb24gX2RlbGV0ZShpZCkge1xyXG4gIC8vIGZpbHRlciBvdXQgZGVsZXRlZCB1c2VyIGFuZCBzYXZlXHJcbiAgdXNlcnMgPSB1c2Vycy5maWx0ZXIoKHgpID0+IHguaWQudG9TdHJpbmcoKSAhPT0gaWQudG9TdHJpbmcoKSk7XHJcbiAgc2F2ZURhdGEoKTtcclxufVxyXG5cclxuLy8gcHJpdmF0ZSBoZWxwZXIgZnVuY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBzYXZlRGF0YSgpIHtcclxuICBmcy53cml0ZUZpbGVTeW5jKCdkYXRhL3VzZXJzLmpzb24nLCBKU09OLnN0cmluZ2lmeSh1c2VycywgbnVsbCwgNCkpO1xyXG59XHJcbiIsImNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdGpzJyk7XHJcblxyXG5pbXBvcnQgeyBhcGlIYW5kbGVyLCB1c2Vyc1JlcG8gfSBmcm9tICdoZWxwZXJzL2FwaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcGlIYW5kbGVyKHtcclxuICBwb3N0OiByZWdpc3RlcixcclxufSk7XHJcblxyXG5mdW5jdGlvbiByZWdpc3RlcihyZXEsIHJlcykge1xyXG4gIC8vIHNwbGl0IG91dCBwYXNzd29yZCBmcm9tIHVzZXIgZGV0YWlsc1xyXG4gIGNvbnN0IHsgcGFzc3dvcmQsIC4uLnVzZXIgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAvLyB2YWxpZGF0ZVxyXG4gIGlmICh1c2Vyc1JlcG8uZmluZCgoeCkgPT4geC51c2VybmFtZSA9PT0gdXNlci51c2VybmFtZSkpXHJcbiAgICB0aHJvdyBgVXNlciB3aXRoIHRoZSB1c2VybmFtZSBcIiR7dXNlci51c2VybmFtZX1cIiBhbHJlYWR5IGV4aXN0c2A7XHJcblxyXG4gIC8vIGhhc2ggcGFzc3dvcmRcclxuICB1c2VyLmhhc2ggPSBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIDEwKTtcclxuXHJcbiAgdXNlcnNSZXBvLmNyZWF0ZSh1c2VyKTtcclxuICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe30pO1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtand0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7Il0sIm5hbWVzIjpbImVycm9ySGFuZGxlciIsImp3dE1pZGRsZXdhcmUiLCJhcGlIYW5kbGVyIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInRvTG93ZXJDYXNlIiwic3RhdHVzIiwiZW5kIiwiZXJyIiwiaXM0MDQiLCJlbmRzV2l0aCIsInN0YXR1c0NvZGUiLCJqc29uIiwibWVzc2FnZSIsIm5hbWUiLCJjb25zb2xlIiwiZXJyb3IiLCJleHByZXNzSnd0IiwicmVxdWlyZSIsInV0aWwiLCJnZXRDb25maWciLCJzZXJ2ZXJSdW50aW1lQ29uZmlnIiwibWlkZGxld2FyZSIsInNlY3JldCIsImFsZ29yaXRobXMiLCJ1bmxlc3MiLCJwYXRoIiwicHJvbWlzaWZ5Iiwib21pdCIsIm9iaiIsImtleSIsIm9taXR0ZWQiLCJyZXN0IiwiZnMiLCJ1c2VycyIsInVzZXJzUmVwbyIsImdldEFsbCIsImdldEJ5SWQiLCJpZCIsImZpbmQiLCJ4IiwidG9TdHJpbmciLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiLCJfZGVsZXRlIiwidXNlciIsImxlbmd0aCIsIk1hdGgiLCJtYXgiLCJtYXAiLCJkYXRlQ3JlYXRlZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImRhdGVVcGRhdGVkIiwicHVzaCIsInNhdmVEYXRhIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwiZmlsdGVyIiwid3JpdGVGaWxlU3luYyIsIkpTT04iLCJzdHJpbmdpZnkiLCJiY3J5cHQiLCJwb3N0IiwicmVnaXN0ZXIiLCJib2R5IiwicGFzc3dvcmQiLCJ1c2VybmFtZSIsImhhc2giLCJoYXNoU3luYyJdLCJzb3VyY2VSb290IjoiIn0=