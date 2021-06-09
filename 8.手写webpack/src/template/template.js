(function () {
  var __webpack_modules__ = {
    "./src/a.js": function (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) {
      eval(
        "let b = __webpack_require__(/*! ./base/b.js */ \"./src/base/b.js\");\r\nmodule.exports = 'a-' + b;\n\n//# sourceURL=webpack:///./src/a.js?"
      );
    },

    "./src/base/b.js": function (module) {
      eval(
        "module.exports = 'b';\n\n//# sourceURL=webpack:///./src/base/b.js?"
      );
    },

    "./src/index.js": function (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) {
      eval(
        "let a = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\r\nconsole.log(a,'index');\n\n//# sourceURL=webpack:///./src/index.js?"
      );
    },
  };

  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    debugger
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
