"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users";
exports.ids = ["pages/api/users"];
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

/***/ "./pages/api/users/index.js":
/*!**********************************!*\
  !*** ./pages/api/users/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.apiHandler)({
  get: getUsers
}));

function getUsers(req, res) {
  // return users without hashed passwords in the response
  const response = helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.getAll().map(x => (0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.omit)(x, 'hash'));
  return res.status(200).json(response);
}

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFsQixFQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUI7QUFDQSxRQUFNK0QsUUFBUSxHQUFHL0IseURBQUEsR0FBbUJlLEdBQW5CLENBQXdCVixDQUFELElBQU9aLGlEQUFJLENBQUNZLENBQUQsRUFBSSxNQUFKLENBQWxDLENBQWpCO0FBQ0EsU0FBT3JDLEdBQUcsQ0FBQ0csTUFBSixDQUFXLEdBQVgsRUFBZ0JNLElBQWhCLENBQXFCc0QsUUFBckIsQ0FBUDtBQUNEOzs7Ozs7Ozs7O0FDVkQ7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvYXBpLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2Vycm9yLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2luZGV4LmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9qd3QtbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvb21pdC5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvdXNlcnMtcmVwby5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vcGFnZXMvYXBpL3VzZXJzL2luZGV4LmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJleHByZXNzLWp3dFwiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJuZXh0L2NvbmZpZ1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJ1dGlsXCIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXJyb3JIYW5kbGVyLCBqd3RNaWRkbGV3YXJlIH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuZXhwb3J0IHsgYXBpSGFuZGxlciB9O1xyXG5cclxuZnVuY3Rpb24gYXBpSGFuZGxlcihoYW5kbGVyKSB7XHJcbiAgcmV0dXJuIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIC8vIGNoZWNrIGhhbmRsZXIgc3VwcG9ydHMgSFRUUCBtZXRob2RcclxuICAgIGlmICghaGFuZGxlclttZXRob2RdKVxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmVuZChgTWV0aG9kICR7cmVxLm1ldGhvZH0gTm90IEFsbG93ZWRgKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBnbG9iYWwgbWlkZGxld2FyZVxyXG4gICAgICBhd2FpdCBqd3RNaWRkbGV3YXJlKHJlcSwgcmVzKTtcclxuXHJcbiAgICAgIC8vIHJvdXRlIGhhbmRsZXJcclxuICAgICAgYXdhaXQgaGFuZGxlclttZXRob2RdKHJlcSwgcmVzKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyBnbG9iYWwgZXJyb3IgaGFuZGxlclxyXG4gICAgICBlcnJvckhhbmRsZXIoZXJyLCByZXMpO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIiwiZXhwb3J0IHsgZXJyb3JIYW5kbGVyIH07XHJcblxyXG5mdW5jdGlvbiBlcnJvckhhbmRsZXIoZXJyLCByZXMpIHtcclxuICBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpIHtcclxuICAgIC8vIGN1c3RvbSBhcHBsaWNhdGlvbiBlcnJvclxyXG4gICAgY29uc3QgaXM0MDQgPSBlcnIudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnbm90IGZvdW5kJyk7XHJcbiAgICBjb25zdCBzdGF0dXNDb2RlID0gaXM0MDQgPyA0MDQgOiA0MDA7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyhzdGF0dXNDb2RlKS5qc29uKHsgbWVzc2FnZTogZXJyIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVyci5uYW1lID09PSAnVW5hdXRob3JpemVkRXJyb3InKSB7XHJcbiAgICAvLyBqd3QgYXV0aGVudGljYXRpb24gZXJyb3JcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6ICdJbnZhbGlkIFRva2VuJyB9KTtcclxuICB9XHJcblxyXG4gIC8vIGRlZmF1bHQgdG8gNTAwIHNlcnZlciBlcnJvclxyXG4gIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcclxufVxyXG4iLCJleHBvcnQgKiBmcm9tICcuL2FwaS1oYW5kbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9lcnJvci1oYW5kbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9qd3QtbWlkZGxld2FyZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vb21pdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXNlcnMtcmVwbyc7XHJcbiIsImNvbnN0IGV4cHJlc3NKd3QgPSByZXF1aXJlKCdleHByZXNzLWp3dCcpO1xyXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xyXG5pbXBvcnQgZ2V0Q29uZmlnIGZyb20gJ25leHQvY29uZmlnJztcclxuXHJcbmNvbnN0IHsgc2VydmVyUnVudGltZUNvbmZpZyB9ID0gZ2V0Q29uZmlnKCk7XHJcblxyXG5leHBvcnQgeyBqd3RNaWRkbGV3YXJlIH07XHJcblxyXG5mdW5jdGlvbiBqd3RNaWRkbGV3YXJlKHJlcSwgcmVzKSB7XHJcbiAgY29uc3QgbWlkZGxld2FyZSA9IGV4cHJlc3NKd3Qoe1xyXG4gICAgc2VjcmV0OiBzZXJ2ZXJSdW50aW1lQ29uZmlnLnNlY3JldCxcclxuICAgIGFsZ29yaXRobXM6IFsnSFMyNTYnXSxcclxuICB9KS51bmxlc3Moe1xyXG4gICAgcGF0aDogW1xyXG4gICAgICAvLyBwdWJsaWMgcm91dGVzIHRoYXQgZG9uJ3QgcmVxdWlyZSBhdXRoZW50aWNhdGlvblxyXG4gICAgICAnL2FwaS91c2Vycy9yZWdpc3RlcicsXHJcbiAgICAgICcvYXBpL3VzZXJzL2F1dGhlbnRpY2F0ZScsXHJcbiAgICBdLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdXRpbC5wcm9taXNpZnkobWlkZGxld2FyZSkocmVxLCByZXMpO1xyXG59XHJcbiIsImV4cG9ydCB7IG9taXQgfTtcclxuXHJcbmZ1bmN0aW9uIG9taXQob2JqLCBrZXkpIHtcclxuICBjb25zdCB7IFtrZXldOiBvbWl0dGVkLCAuLi5yZXN0IH0gPSBvYmo7XHJcbiAgcmV0dXJuIHJlc3Q7XHJcbn1cclxuIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cclxuLy8gdXNlcnMgaW4gSlNPTiBmaWxlIGZvciBzaW1wbGljaXR5LCBzdG9yZSBpbiBhIGRiIGZvciBwcm9kdWN0aW9uIGFwcGxpY2F0aW9uc1xyXG5sZXQgdXNlcnMgPSByZXF1aXJlKCdkYXRhL3VzZXJzLmpzb24nKTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2Vyc1JlcG8gPSB7XHJcbiAgZ2V0QWxsOiAoKSA9PiB1c2VycyxcclxuICBnZXRCeUlkOiAoaWQpID0+IHVzZXJzLmZpbmQoKHgpID0+IHguaWQudG9TdHJpbmcoKSA9PT0gaWQudG9TdHJpbmcoKSksXHJcbiAgZmluZDogKHgpID0+IHVzZXJzLmZpbmQoeCksXHJcbiAgY3JlYXRlLFxyXG4gIHVwZGF0ZSxcclxuICBkZWxldGU6IF9kZWxldGUsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodXNlcikge1xyXG4gIC8vIGdlbmVyYXRlIG5ldyB1c2VyIGlkXHJcbiAgdXNlci5pZCA9IHVzZXJzLmxlbmd0aCA/IE1hdGgubWF4KC4uLnVzZXJzLm1hcCgoeCkgPT4geC5pZCkpICsgMSA6IDE7XHJcblxyXG4gIC8vIHNldCBkYXRlIGNyZWF0ZWQgYW5kIHVwZGF0ZWRcclxuICB1c2VyLmRhdGVDcmVhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gIHVzZXIuZGF0ZVVwZGF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gIC8vIGFkZCBhbmQgc2F2ZSB1c2VyXHJcbiAgdXNlcnMucHVzaCh1c2VyKTtcclxuICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoaWQsIHBhcmFtcykge1xyXG4gIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKCh4KSA9PiB4LmlkLnRvU3RyaW5nKCkgPT09IGlkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAvLyBzZXQgZGF0ZSB1cGRhdGVkXHJcbiAgdXNlci5kYXRlVXBkYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuXHJcbiAgLy8gdXBkYXRlIGFuZCBzYXZlXHJcbiAgT2JqZWN0LmFzc2lnbih1c2VyLCBwYXJhbXMpO1xyXG4gIHNhdmVEYXRhKCk7XHJcbn1cclxuXHJcbi8vIHByZWZpeGVkIHdpdGggdW5kZXJzY29yZSAnXycgYmVjYXVzZSAnZGVsZXRlJyBpcyBhIHJlc2VydmVkIHdvcmQgaW4gamF2YXNjcmlwdFxyXG5mdW5jdGlvbiBfZGVsZXRlKGlkKSB7XHJcbiAgLy8gZmlsdGVyIG91dCBkZWxldGVkIHVzZXIgYW5kIHNhdmVcclxuICB1c2VycyA9IHVzZXJzLmZpbHRlcigoeCkgPT4geC5pZC50b1N0cmluZygpICE9PSBpZC50b1N0cmluZygpKTtcclxuICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG4vLyBwcml2YXRlIGhlbHBlciBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHNhdmVEYXRhKCkge1xyXG4gIGZzLndyaXRlRmlsZVN5bmMoJ2RhdGEvdXNlcnMuanNvbicsIEpTT04uc3RyaW5naWZ5KHVzZXJzLCBudWxsLCA0KSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgYXBpSGFuZGxlciwgdXNlcnNSZXBvLCBvbWl0IH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpSGFuZGxlcih7XHJcbiAgZ2V0OiBnZXRVc2VycyxcclxufSk7XHJcblxyXG5mdW5jdGlvbiBnZXRVc2VycyhyZXEsIHJlcykge1xyXG4gIC8vIHJldHVybiB1c2VycyB3aXRob3V0IGhhc2hlZCBwYXNzd29yZHMgaW4gdGhlIHJlc3BvbnNlXHJcbiAgY29uc3QgcmVzcG9uc2UgPSB1c2Vyc1JlcG8uZ2V0QWxsKCkubWFwKCh4KSA9PiBvbWl0KHgsICdoYXNoJykpO1xyXG4gIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwb25zZSk7XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwibmFtZXMiOlsiZXJyb3JIYW5kbGVyIiwiand0TWlkZGxld2FyZSIsImFwaUhhbmRsZXIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwidG9Mb3dlckNhc2UiLCJzdGF0dXMiLCJlbmQiLCJlcnIiLCJpczQwNCIsImVuZHNXaXRoIiwic3RhdHVzQ29kZSIsImpzb24iLCJtZXNzYWdlIiwibmFtZSIsImNvbnNvbGUiLCJlcnJvciIsImV4cHJlc3NKd3QiLCJyZXF1aXJlIiwidXRpbCIsImdldENvbmZpZyIsInNlcnZlclJ1bnRpbWVDb25maWciLCJtaWRkbGV3YXJlIiwic2VjcmV0IiwiYWxnb3JpdGhtcyIsInVubGVzcyIsInBhdGgiLCJwcm9taXNpZnkiLCJvbWl0Iiwib2JqIiwia2V5Iiwib21pdHRlZCIsInJlc3QiLCJmcyIsInVzZXJzIiwidXNlcnNSZXBvIiwiZ2V0QWxsIiwiZ2V0QnlJZCIsImlkIiwiZmluZCIsIngiLCJ0b1N0cmluZyIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSIsIl9kZWxldGUiLCJ1c2VyIiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsIm1hcCIsImRhdGVDcmVhdGVkIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0ZVVwZGF0ZWQiLCJwdXNoIiwic2F2ZURhdGEiLCJwYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJmaWx0ZXIiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldCIsImdldFVzZXJzIiwicmVzcG9uc2UiXSwic291cmNlUm9vdCI6IiJ9