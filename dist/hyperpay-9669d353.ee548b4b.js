// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/bnc-onboard/dist/esm/hyperpay-9669d353.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contentEeaca1cc = require("./content-eeaca1cc.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var img = "data:image/png;base64,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";
var img$1 = "data:image/png;base64,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";

function hyperpay(options) {
  var preferred = options.preferred,
      label = options.label,
      iconSrc = options.iconSrc,
      svg = options.svg;
  return {
    name: label || 'HyperPay',
    iconSrc: iconSrc || img,
    iconSrcSet: iconSrc || img$1,
    svg: svg,
    wallet: function () {
      var _wallet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(helpers) {
        var getProviderName, createModernProviderInterface, provider;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                getProviderName = helpers.getProviderName, createModernProviderInterface = helpers.createModernProviderInterface;
                provider = window.ethereum || window.web3 && window.web3.currentProvider;
                return _context.abrupt("return", {
                  provider: provider,
                  "interface": provider && getProviderName(provider) === 'HyperPay' ? createModernProviderInterface(provider) : null
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function wallet(_x) {
        return _wallet.apply(this, arguments);
      }

      return wallet;
    }(),
    type: 'injected',
    link: 'https://www.hyperpay.me/',
    installMessage: _contentEeaca1cc.m,
    mobile: true,
    preferred: preferred
  };
}

var _default = hyperpay;
exports.default = _default;
},{"./content-eeaca1cc.js":"../node_modules/bnc-onboard/dist/esm/content-eeaca1cc.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50285" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/hyperpay-9669d353.ee548b4b.js.map