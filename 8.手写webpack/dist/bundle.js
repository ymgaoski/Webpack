(function () {
  var __webpack_modules__ = {
    
      "./src/index.js": function (
        module,
        __unused_webpack_exports,
        __webpack_require__
      ) {
        eval(
          `let a = __webpack_require__("./src/a.js"); // 引入样式文件


__webpack_require__("./src/css/index.scss");

console.log(a, 'index');`
        );
      },
    
      "./src/a.js": function (
        module,
        __unused_webpack_exports,
        __webpack_require__
      ) {
        eval(
          `let b = __webpack_require__("./src/base/b.js");

module.exports = 'a-' + b;`
        );
      },
    
      "./src/base/b.js": function (
        module,
        __unused_webpack_exports,
        __webpack_require__
      ) {
        eval(
          `module.exports = 'b';`
        );
      },
    
      "./src/css/index.scss": function (
        module,
        __unused_webpack_exports,
        __webpack_require__
      ) {
        eval(
          `const style = document.createElement('style');
style.innerHTML = "body {\\n  background: red;\\n}\\nbody .main {\\n  color: green;\\n}";
document.head.appendChild(style);`
        );
      },
    
  };

  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
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
