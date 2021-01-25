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
})({"../node_modules/use-wallet/dist/index-a004146a.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__moduleExports = exports.WalletLinkProvider = exports.WalletLink = exports.default = void 0;

var _indexD3bd = require("./index-d3bd4678.js");

require("react");

require("@aragon/provided-connector");

require("events");

require("buffer");

var _crypto_commonjsExternal1a = require("./_crypto_commonjs-external-1a228943.js");

require("stream");

require("crypto");

require("url");

var _url_commonjsExternalAf75b = require("./_url_commonjs-external-af75b180.js");

var a = (0, _indexD3bd.d)(function (t) {
  !function (t, e) {
    function n(t, e) {
      if (!t) throw new Error(e || "Assertion failed");
    }

    function i(t, e) {
      t.super_ = e;

      var n = function () {};

      n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
    }

    function o(t, e, n) {
      if (o.isBN(t)) return t;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (n = e, e = 10), this._init(t || 0, e || 10, n || "be"));
    }

    var s;
    "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;

    try {
      s = _crypto_commonjsExternal1a.a.Buffer;
    } catch (t) {}

    function u(t, e, i) {
      for (var r = 0, o = Math.min(t.length, i), s = 0, u = e; u < o; u++) {
        var a,
            c = t.charCodeAt(u) - 48;
        r <<= 4, r |= a = c >= 49 && c <= 54 ? c - 49 + 10 : c >= 17 && c <= 22 ? c - 17 + 10 : c, s |= a;
      }

      return n(!(240 & s), "Invalid character in " + t), r;
    }

    function a(t, e, i, r) {
      for (var o = 0, s = 0, u = Math.min(t.length, i), a = e; a < u; a++) {
        var c = t.charCodeAt(a) - 48;
        o *= r, s = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c, n(c >= 0 && s < r, "Invalid character"), o += s;
      }

      return o;
    }

    function c(t, e) {
      t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red;
    }

    function l() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }

    o.isBN = function (t) {
      return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words);
    }, o.max = function (t, e) {
      return t.cmp(e) > 0 ? t : e;
    }, o.min = function (t, e) {
      return t.cmp(e) < 0 ? t : e;
    }, o.prototype._init = function (t, e, i) {
      if ("number" == typeof t) return this._initNumber(t, e, i);
      if ("object" == typeof t) return this._initArray(t, e, i);
      "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
      var r = 0;
      "-" === (t = t.toString().replace(/\s+/g, ""))[0] && r++, 16 === e ? this._parseHex(t, r) : this._parseBase(t, e, r), "-" === t[0] && (this.negative = 1), this._strip(), "le" === i && this._initArray(this.toArray(), e, i);
    }, o.prototype._initNumber = function (t, e, i) {
      t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (n(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === i && this._initArray(this.toArray(), e, i);
    }, o.prototype._initArray = function (t, e, i) {
      if (n("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);

      for (var r = 0; r < this.length; r++) this.words[r] = 0;

      var o,
          s,
          u = 0;
      if ("be" === i) for (r = t.length - 1, o = 0; r >= 0; r -= 3) s = t[r] | t[r - 1] << 8 | t[r - 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);else if ("le" === i) for (r = 0, o = 0; r < t.length; r += 3) s = t[r] | t[r + 1] << 8 | t[r + 2] << 16, this.words[o] |= s << u & 67108863, this.words[o + 1] = s >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, o++);
      return this._strip();
    }, o.prototype._parseHex = function (t, e) {
      this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);

      for (var n = 0; n < this.length; n++) this.words[n] = 0;

      var i,
          r,
          o = 0;

      for (n = t.length - 6, i = 0; n >= e; n -= 6) r = u(t, n, n + 6), this.words[i] |= r << o & 67108863, this.words[i + 1] |= r >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, i++);

      n + 6 !== e && (r = u(t, e, n + 6), this.words[i] |= r << o & 67108863, this.words[i + 1] |= r >>> 26 - o & 4194303), this._strip();
    }, o.prototype._parseBase = function (t, e, n) {
      this.words = [0], this.length = 1;

      for (var i = 0, r = 1; r <= 67108863; r *= e) i++;

      i--, r = r / e | 0;

      for (var o = t.length - n, s = o % i, u = Math.min(o, o - s) + n, c = 0, l = n; l < u; l += i) c = a(t, l, l + i, e), this.imuln(r), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);

      if (0 !== s) {
        var h = 1;

        for (c = a(t, l, t.length, e), l = 0; l < s; l++) h *= e;

        this.imuln(h), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
      }
    }, o.prototype.copy = function (t) {
      t.words = new Array(this.length);

      for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];

      t.length = this.length, t.negative = this.negative, t.red = this.red;
    }, o.prototype._move = function (t) {
      c(t, this);
    }, o.prototype.clone = function () {
      var t = new o(null);
      return this.copy(t), t;
    }, o.prototype._expand = function (t) {
      for (; this.length < t;) this.words[this.length++] = 0;

      return this;
    }, o.prototype._strip = function () {
      for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;

      return this._normSign();
    }, o.prototype._normSign = function () {
      return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
    }, "undefined" != typeof Symbol && "function" == typeof Symbol.for ? o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l : o.prototype.inspect = l;
    var h = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
        f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        d = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    o.prototype.toString = function (t, e) {
      var i;

      if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
        i = "";

        for (var r = 0, o = 0, s = 0; s < this.length; s++) {
          var u = this.words[s],
              a = (16777215 & (u << r | o)).toString(16);
          i = 0 !== (o = u >>> 24 - r & 16777215) || s !== this.length - 1 ? h[6 - a.length] + a + i : a + i, (r += 2) >= 26 && (r -= 26, s--);
        }

        for (0 !== o && (i = o.toString(16) + i); i.length % e != 0;) i = "0" + i;

        return 0 !== this.negative && (i = "-" + i), i;
      }

      if (t === (0 | t) && t >= 2 && t <= 36) {
        var c = f[t],
            l = d[t];
        i = "";
        var p = this.clone();

        for (p.negative = 0; !p.isZero();) {
          var m = p.modrn(l).toString(t);
          i = (p = p.idivn(l)).isZero() ? m + i : h[c - m.length] + m + i;
        }

        for (this.isZero() && (i = "0" + i); i.length % e != 0;) i = "0" + i;

        return 0 !== this.negative && (i = "-" + i), i;
      }

      n(!1, "Base should be between 2 and 36");
    }, o.prototype.toNumber = function () {
      var t = this.words[0];
      return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t;
    }, o.prototype.toJSON = function () {
      return this.toString(16, 2);
    }, s && (o.prototype.toBuffer = function (t, e) {
      return this.toArrayLike(s, t, e);
    }), o.prototype.toArray = function (t, e) {
      return this.toArrayLike(Array, t, e);
    };

    function p(t, e, n) {
      n.negative = e.negative ^ t.negative;
      var i = t.length + e.length | 0;
      n.length = i, i = i - 1 | 0;
      var r = 0 | t.words[0],
          o = 0 | e.words[0],
          s = r * o,
          u = 67108863 & s,
          a = s / 67108864 | 0;
      n.words[0] = u;

      for (var c = 1; c < i; c++) {
        for (var l = a >>> 26, h = 67108863 & a, f = Math.min(c, e.length - 1), d = Math.max(0, c - t.length + 1); d <= f; d++) {
          var p = c - d | 0;
          l += (s = (r = 0 | t.words[p]) * (o = 0 | e.words[d]) + h) / 67108864 | 0, h = 67108863 & s;
        }

        n.words[c] = 0 | h, a = 0 | l;
      }

      return 0 !== a ? n.words[c] = 0 | a : n.length--, n._strip();
    }

    o.prototype.toArrayLike = function (t, e, i) {
      this._strip();

      var r = this.byteLength(),
          o = i || Math.max(1, r);
      n(r <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0");

      var s = function (t, e) {
        return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
      }(t, o);

      return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, r), s;
    }, o.prototype._toArrayLikeLE = function (t, e) {
      for (var n = 0, i = 0, r = 0, o = 0; r < this.length; r++) {
        var s = this.words[r] << o | i;
        t[n++] = 255 & s, n < t.length && (t[n++] = s >> 8 & 255), n < t.length && (t[n++] = s >> 16 & 255), 6 === o ? (n < t.length && (t[n++] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2);
      }

      if (n < t.length) for (t[n++] = i; n < t.length;) t[n++] = 0;
    }, o.prototype._toArrayLikeBE = function (t, e) {
      for (var n = t.length - 1, i = 0, r = 0, o = 0; r < this.length; r++) {
        var s = this.words[r] << o | i;
        t[n--] = 255 & s, n >= 0 && (t[n--] = s >> 8 & 255), n >= 0 && (t[n--] = s >> 16 & 255), 6 === o ? (n >= 0 && (t[n--] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2);
      }

      if (n >= 0) for (t[n--] = i; n >= 0;) t[n--] = 0;
    }, Math.clz32 ? o.prototype._countBits = function (t) {
      return 32 - Math.clz32(t);
    } : o.prototype._countBits = function (t) {
      var e = t,
          n = 0;
      return e >= 4096 && (n += 13, e >>>= 13), e >= 64 && (n += 7, e >>>= 7), e >= 8 && (n += 4, e >>>= 4), e >= 2 && (n += 2, e >>>= 2), n + e;
    }, o.prototype._zeroBits = function (t) {
      if (0 === t) return 26;
      var e = t,
          n = 0;
      return 0 == (8191 & e) && (n += 13, e >>>= 13), 0 == (127 & e) && (n += 7, e >>>= 7), 0 == (15 & e) && (n += 4, e >>>= 4), 0 == (3 & e) && (n += 2, e >>>= 2), 0 == (1 & e) && n++, n;
    }, o.prototype.bitLength = function () {
      var t = this.words[this.length - 1],
          e = this._countBits(t);

      return 26 * (this.length - 1) + e;
    }, o.prototype.zeroBits = function () {
      if (this.isZero()) return 0;

      for (var t = 0, e = 0; e < this.length; e++) {
        var n = this._zeroBits(this.words[e]);

        if (t += n, 26 !== n) break;
      }

      return t;
    }, o.prototype.byteLength = function () {
      return Math.ceil(this.bitLength() / 8);
    }, o.prototype.toTwos = function (t) {
      return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
    }, o.prototype.fromTwos = function (t) {
      return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
    }, o.prototype.isNeg = function () {
      return 0 !== this.negative;
    }, o.prototype.neg = function () {
      return this.clone().ineg();
    }, o.prototype.ineg = function () {
      return this.isZero() || (this.negative ^= 1), this;
    }, o.prototype.iuor = function (t) {
      for (; this.length < t.length;) this.words[this.length++] = 0;

      for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];

      return this._strip();
    }, o.prototype.ior = function (t) {
      return n(0 == (this.negative | t.negative)), this.iuor(t);
    }, o.prototype.or = function (t) {
      return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
    }, o.prototype.uor = function (t) {
      return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
    }, o.prototype.iuand = function (t) {
      var e;
      e = this.length > t.length ? t : this;

      for (var n = 0; n < e.length; n++) this.words[n] = this.words[n] & t.words[n];

      return this.length = e.length, this._strip();
    }, o.prototype.iand = function (t) {
      return n(0 == (this.negative | t.negative)), this.iuand(t);
    }, o.prototype.and = function (t) {
      return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
    }, o.prototype.uand = function (t) {
      return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
    }, o.prototype.iuxor = function (t) {
      var e, n;
      this.length > t.length ? (e = this, n = t) : (e = t, n = this);

      for (var i = 0; i < n.length; i++) this.words[i] = e.words[i] ^ n.words[i];

      if (this !== e) for (; i < e.length; i++) this.words[i] = e.words[i];
      return this.length = e.length, this._strip();
    }, o.prototype.ixor = function (t) {
      return n(0 == (this.negative | t.negative)), this.iuxor(t);
    }, o.prototype.xor = function (t) {
      return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
    }, o.prototype.uxor = function (t) {
      return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
    }, o.prototype.inotn = function (t) {
      n("number" == typeof t && t >= 0);
      var e = 0 | Math.ceil(t / 26),
          i = t % 26;
      this._expand(e), i > 0 && e--;

      for (var r = 0; r < e; r++) this.words[r] = 67108863 & ~this.words[r];

      return i > 0 && (this.words[r] = ~this.words[r] & 67108863 >> 26 - i), this._strip();
    }, o.prototype.notn = function (t) {
      return this.clone().inotn(t);
    }, o.prototype.setn = function (t, e) {
      n("number" == typeof t && t >= 0);
      var i = t / 26 | 0,
          r = t % 26;
      return this._expand(i + 1), this.words[i] = e ? this.words[i] | 1 << r : this.words[i] & ~(1 << r), this._strip();
    }, o.prototype.iadd = function (t) {
      var e, n, i;
      if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
      if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
      this.length > t.length ? (n = this, i = t) : (n = t, i = this);

      for (var r = 0, o = 0; o < i.length; o++) e = (0 | n.words[o]) + (0 | i.words[o]) + r, this.words[o] = 67108863 & e, r = e >>> 26;

      for (; 0 !== r && o < n.length; o++) e = (0 | n.words[o]) + r, this.words[o] = 67108863 & e, r = e >>> 26;

      if (this.length = n.length, 0 !== r) this.words[this.length] = r, this.length++;else if (n !== this) for (; o < n.length; o++) this.words[o] = n.words[o];
      return this;
    }, o.prototype.add = function (t) {
      var e;
      return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this);
    }, o.prototype.isub = function (t) {
      if (0 !== t.negative) {
        t.negative = 0;
        var e = this.iadd(t);
        return t.negative = 1, e._normSign();
      }

      if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
      var n,
          i,
          r = this.cmp(t);
      if (0 === r) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      r > 0 ? (n = this, i = t) : (n = t, i = this);

      for (var o = 0, s = 0; s < i.length; s++) o = (e = (0 | n.words[s]) - (0 | i.words[s]) + o) >> 26, this.words[s] = 67108863 & e;

      for (; 0 !== o && s < n.length; s++) o = (e = (0 | n.words[s]) + o) >> 26, this.words[s] = 67108863 & e;

      if (0 === o && s < n.length && n !== this) for (; s < n.length; s++) this.words[s] = n.words[s];
      return this.length = Math.max(this.length, s), n !== this && (this.negative = 1), this._strip();
    }, o.prototype.sub = function (t) {
      return this.clone().isub(t);
    };

    var m = function (t, e, n) {
      var i,
          r,
          o,
          s = t.words,
          u = e.words,
          a = n.words,
          c = 0,
          l = 0 | s[0],
          h = 8191 & l,
          f = l >>> 13,
          d = 0 | s[1],
          p = 8191 & d,
          m = d >>> 13,
          b = 0 | s[2],
          g = 8191 & b,
          v = b >>> 13,
          y = 0 | s[3],
          w = 8191 & y,
          _ = y >>> 13,
          k = 0 | s[4],
          x = 8191 & k,
          S = k >>> 13,
          M = 0 | s[5],
          E = 8191 & M,
          C = M >>> 13,
          N = 0 | s[6],
          T = 8191 & N,
          I = N >>> 13,
          A = 0 | s[7],
          O = 8191 & A,
          P = A >>> 13,
          R = 0 | s[8],
          j = 8191 & R,
          B = R >>> 13,
          D = 0 | s[9],
          L = 8191 & D,
          F = D >>> 13,
          W = 0 | u[0],
          q = 8191 & W,
          U = W >>> 13,
          V = 0 | u[1],
          z = 8191 & V,
          H = V >>> 13,
          $ = 0 | u[2],
          J = 8191 & $,
          K = $ >>> 13,
          G = 0 | u[3],
          Y = 8191 & G,
          Z = G >>> 13,
          Q = 0 | u[4],
          X = 8191 & Q,
          tt = Q >>> 13,
          et = 0 | u[5],
          nt = 8191 & et,
          it = et >>> 13,
          rt = 0 | u[6],
          ot = 8191 & rt,
          st = rt >>> 13,
          ut = 0 | u[7],
          at = 8191 & ut,
          ct = ut >>> 13,
          lt = 0 | u[8],
          ht = 8191 & lt,
          ft = lt >>> 13,
          dt = 0 | u[9],
          pt = 8191 & dt,
          mt = dt >>> 13;

      n.negative = t.negative ^ e.negative, n.length = 19;
      var bt = (c + (i = Math.imul(h, q)) | 0) + ((8191 & (r = (r = Math.imul(h, U)) + Math.imul(f, q) | 0)) << 13) | 0;
      c = ((o = Math.imul(f, U)) + (r >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, i = Math.imul(p, q), r = (r = Math.imul(p, U)) + Math.imul(m, q) | 0, o = Math.imul(m, U);
      var gt = (c + (i = i + Math.imul(h, z) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, H) | 0) + Math.imul(f, z) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, H) | 0) + (r >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, i = Math.imul(g, q), r = (r = Math.imul(g, U)) + Math.imul(v, q) | 0, o = Math.imul(v, U), i = i + Math.imul(p, z) | 0, r = (r = r + Math.imul(p, H) | 0) + Math.imul(m, z) | 0, o = o + Math.imul(m, H) | 0;
      var vt = (c + (i = i + Math.imul(h, J) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, K) | 0) + Math.imul(f, J) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, K) | 0) + (r >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, i = Math.imul(w, q), r = (r = Math.imul(w, U)) + Math.imul(_, q) | 0, o = Math.imul(_, U), i = i + Math.imul(g, z) | 0, r = (r = r + Math.imul(g, H) | 0) + Math.imul(v, z) | 0, o = o + Math.imul(v, H) | 0, i = i + Math.imul(p, J) | 0, r = (r = r + Math.imul(p, K) | 0) + Math.imul(m, J) | 0, o = o + Math.imul(m, K) | 0;
      var yt = (c + (i = i + Math.imul(h, Y) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, Z) | 0) + Math.imul(f, Y) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, Z) | 0) + (r >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, i = Math.imul(x, q), r = (r = Math.imul(x, U)) + Math.imul(S, q) | 0, o = Math.imul(S, U), i = i + Math.imul(w, z) | 0, r = (r = r + Math.imul(w, H) | 0) + Math.imul(_, z) | 0, o = o + Math.imul(_, H) | 0, i = i + Math.imul(g, J) | 0, r = (r = r + Math.imul(g, K) | 0) + Math.imul(v, J) | 0, o = o + Math.imul(v, K) | 0, i = i + Math.imul(p, Y) | 0, r = (r = r + Math.imul(p, Z) | 0) + Math.imul(m, Y) | 0, o = o + Math.imul(m, Z) | 0;
      var wt = (c + (i = i + Math.imul(h, X) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, tt) | 0) + Math.imul(f, X) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, tt) | 0) + (r >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, i = Math.imul(E, q), r = (r = Math.imul(E, U)) + Math.imul(C, q) | 0, o = Math.imul(C, U), i = i + Math.imul(x, z) | 0, r = (r = r + Math.imul(x, H) | 0) + Math.imul(S, z) | 0, o = o + Math.imul(S, H) | 0, i = i + Math.imul(w, J) | 0, r = (r = r + Math.imul(w, K) | 0) + Math.imul(_, J) | 0, o = o + Math.imul(_, K) | 0, i = i + Math.imul(g, Y) | 0, r = (r = r + Math.imul(g, Z) | 0) + Math.imul(v, Y) | 0, o = o + Math.imul(v, Z) | 0, i = i + Math.imul(p, X) | 0, r = (r = r + Math.imul(p, tt) | 0) + Math.imul(m, X) | 0, o = o + Math.imul(m, tt) | 0;

      var _t = (c + (i = i + Math.imul(h, nt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, it) | 0) + Math.imul(f, nt) | 0)) << 13) | 0;

      c = ((o = o + Math.imul(f, it) | 0) + (r >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, i = Math.imul(T, q), r = (r = Math.imul(T, U)) + Math.imul(I, q) | 0, o = Math.imul(I, U), i = i + Math.imul(E, z) | 0, r = (r = r + Math.imul(E, H) | 0) + Math.imul(C, z) | 0, o = o + Math.imul(C, H) | 0, i = i + Math.imul(x, J) | 0, r = (r = r + Math.imul(x, K) | 0) + Math.imul(S, J) | 0, o = o + Math.imul(S, K) | 0, i = i + Math.imul(w, Y) | 0, r = (r = r + Math.imul(w, Z) | 0) + Math.imul(_, Y) | 0, o = o + Math.imul(_, Z) | 0, i = i + Math.imul(g, X) | 0, r = (r = r + Math.imul(g, tt) | 0) + Math.imul(v, X) | 0, o = o + Math.imul(v, tt) | 0, i = i + Math.imul(p, nt) | 0, r = (r = r + Math.imul(p, it) | 0) + Math.imul(m, nt) | 0, o = o + Math.imul(m, it) | 0;
      var kt = (c + (i = i + Math.imul(h, ot) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, st) | 0) + Math.imul(f, ot) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, st) | 0) + (r >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, i = Math.imul(O, q), r = (r = Math.imul(O, U)) + Math.imul(P, q) | 0, o = Math.imul(P, U), i = i + Math.imul(T, z) | 0, r = (r = r + Math.imul(T, H) | 0) + Math.imul(I, z) | 0, o = o + Math.imul(I, H) | 0, i = i + Math.imul(E, J) | 0, r = (r = r + Math.imul(E, K) | 0) + Math.imul(C, J) | 0, o = o + Math.imul(C, K) | 0, i = i + Math.imul(x, Y) | 0, r = (r = r + Math.imul(x, Z) | 0) + Math.imul(S, Y) | 0, o = o + Math.imul(S, Z) | 0, i = i + Math.imul(w, X) | 0, r = (r = r + Math.imul(w, tt) | 0) + Math.imul(_, X) | 0, o = o + Math.imul(_, tt) | 0, i = i + Math.imul(g, nt) | 0, r = (r = r + Math.imul(g, it) | 0) + Math.imul(v, nt) | 0, o = o + Math.imul(v, it) | 0, i = i + Math.imul(p, ot) | 0, r = (r = r + Math.imul(p, st) | 0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, st) | 0;
      var xt = (c + (i = i + Math.imul(h, at) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, ct) | 0) + Math.imul(f, at) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, ct) | 0) + (r >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, i = Math.imul(j, q), r = (r = Math.imul(j, U)) + Math.imul(B, q) | 0, o = Math.imul(B, U), i = i + Math.imul(O, z) | 0, r = (r = r + Math.imul(O, H) | 0) + Math.imul(P, z) | 0, o = o + Math.imul(P, H) | 0, i = i + Math.imul(T, J) | 0, r = (r = r + Math.imul(T, K) | 0) + Math.imul(I, J) | 0, o = o + Math.imul(I, K) | 0, i = i + Math.imul(E, Y) | 0, r = (r = r + Math.imul(E, Z) | 0) + Math.imul(C, Y) | 0, o = o + Math.imul(C, Z) | 0, i = i + Math.imul(x, X) | 0, r = (r = r + Math.imul(x, tt) | 0) + Math.imul(S, X) | 0, o = o + Math.imul(S, tt) | 0, i = i + Math.imul(w, nt) | 0, r = (r = r + Math.imul(w, it) | 0) + Math.imul(_, nt) | 0, o = o + Math.imul(_, it) | 0, i = i + Math.imul(g, ot) | 0, r = (r = r + Math.imul(g, st) | 0) + Math.imul(v, ot) | 0, o = o + Math.imul(v, st) | 0, i = i + Math.imul(p, at) | 0, r = (r = r + Math.imul(p, ct) | 0) + Math.imul(m, at) | 0, o = o + Math.imul(m, ct) | 0;
      var St = (c + (i = i + Math.imul(h, ht) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, ft) | 0) + Math.imul(f, ht) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, ft) | 0) + (r >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, i = Math.imul(L, q), r = (r = Math.imul(L, U)) + Math.imul(F, q) | 0, o = Math.imul(F, U), i = i + Math.imul(j, z) | 0, r = (r = r + Math.imul(j, H) | 0) + Math.imul(B, z) | 0, o = o + Math.imul(B, H) | 0, i = i + Math.imul(O, J) | 0, r = (r = r + Math.imul(O, K) | 0) + Math.imul(P, J) | 0, o = o + Math.imul(P, K) | 0, i = i + Math.imul(T, Y) | 0, r = (r = r + Math.imul(T, Z) | 0) + Math.imul(I, Y) | 0, o = o + Math.imul(I, Z) | 0, i = i + Math.imul(E, X) | 0, r = (r = r + Math.imul(E, tt) | 0) + Math.imul(C, X) | 0, o = o + Math.imul(C, tt) | 0, i = i + Math.imul(x, nt) | 0, r = (r = r + Math.imul(x, it) | 0) + Math.imul(S, nt) | 0, o = o + Math.imul(S, it) | 0, i = i + Math.imul(w, ot) | 0, r = (r = r + Math.imul(w, st) | 0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, st) | 0, i = i + Math.imul(g, at) | 0, r = (r = r + Math.imul(g, ct) | 0) + Math.imul(v, at) | 0, o = o + Math.imul(v, ct) | 0, i = i + Math.imul(p, ht) | 0, r = (r = r + Math.imul(p, ft) | 0) + Math.imul(m, ht) | 0, o = o + Math.imul(m, ft) | 0;
      var Mt = (c + (i = i + Math.imul(h, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(h, mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(f, mt) | 0) + (r >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, i = Math.imul(L, z), r = (r = Math.imul(L, H)) + Math.imul(F, z) | 0, o = Math.imul(F, H), i = i + Math.imul(j, J) | 0, r = (r = r + Math.imul(j, K) | 0) + Math.imul(B, J) | 0, o = o + Math.imul(B, K) | 0, i = i + Math.imul(O, Y) | 0, r = (r = r + Math.imul(O, Z) | 0) + Math.imul(P, Y) | 0, o = o + Math.imul(P, Z) | 0, i = i + Math.imul(T, X) | 0, r = (r = r + Math.imul(T, tt) | 0) + Math.imul(I, X) | 0, o = o + Math.imul(I, tt) | 0, i = i + Math.imul(E, nt) | 0, r = (r = r + Math.imul(E, it) | 0) + Math.imul(C, nt) | 0, o = o + Math.imul(C, it) | 0, i = i + Math.imul(x, ot) | 0, r = (r = r + Math.imul(x, st) | 0) + Math.imul(S, ot) | 0, o = o + Math.imul(S, st) | 0, i = i + Math.imul(w, at) | 0, r = (r = r + Math.imul(w, ct) | 0) + Math.imul(_, at) | 0, o = o + Math.imul(_, ct) | 0, i = i + Math.imul(g, ht) | 0, r = (r = r + Math.imul(g, ft) | 0) + Math.imul(v, ht) | 0, o = o + Math.imul(v, ft) | 0;
      var Et = (c + (i = i + Math.imul(p, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(p, mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(m, mt) | 0) + (r >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, i = Math.imul(L, J), r = (r = Math.imul(L, K)) + Math.imul(F, J) | 0, o = Math.imul(F, K), i = i + Math.imul(j, Y) | 0, r = (r = r + Math.imul(j, Z) | 0) + Math.imul(B, Y) | 0, o = o + Math.imul(B, Z) | 0, i = i + Math.imul(O, X) | 0, r = (r = r + Math.imul(O, tt) | 0) + Math.imul(P, X) | 0, o = o + Math.imul(P, tt) | 0, i = i + Math.imul(T, nt) | 0, r = (r = r + Math.imul(T, it) | 0) + Math.imul(I, nt) | 0, o = o + Math.imul(I, it) | 0, i = i + Math.imul(E, ot) | 0, r = (r = r + Math.imul(E, st) | 0) + Math.imul(C, ot) | 0, o = o + Math.imul(C, st) | 0, i = i + Math.imul(x, at) | 0, r = (r = r + Math.imul(x, ct) | 0) + Math.imul(S, at) | 0, o = o + Math.imul(S, ct) | 0, i = i + Math.imul(w, ht) | 0, r = (r = r + Math.imul(w, ft) | 0) + Math.imul(_, ht) | 0, o = o + Math.imul(_, ft) | 0;
      var Ct = (c + (i = i + Math.imul(g, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(g, mt) | 0) + Math.imul(v, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(v, mt) | 0) + (r >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, i = Math.imul(L, Y), r = (r = Math.imul(L, Z)) + Math.imul(F, Y) | 0, o = Math.imul(F, Z), i = i + Math.imul(j, X) | 0, r = (r = r + Math.imul(j, tt) | 0) + Math.imul(B, X) | 0, o = o + Math.imul(B, tt) | 0, i = i + Math.imul(O, nt) | 0, r = (r = r + Math.imul(O, it) | 0) + Math.imul(P, nt) | 0, o = o + Math.imul(P, it) | 0, i = i + Math.imul(T, ot) | 0, r = (r = r + Math.imul(T, st) | 0) + Math.imul(I, ot) | 0, o = o + Math.imul(I, st) | 0, i = i + Math.imul(E, at) | 0, r = (r = r + Math.imul(E, ct) | 0) + Math.imul(C, at) | 0, o = o + Math.imul(C, ct) | 0, i = i + Math.imul(x, ht) | 0, r = (r = r + Math.imul(x, ft) | 0) + Math.imul(S, ht) | 0, o = o + Math.imul(S, ft) | 0;
      var Nt = (c + (i = i + Math.imul(w, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(w, mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(_, mt) | 0) + (r >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, i = Math.imul(L, X), r = (r = Math.imul(L, tt)) + Math.imul(F, X) | 0, o = Math.imul(F, tt), i = i + Math.imul(j, nt) | 0, r = (r = r + Math.imul(j, it) | 0) + Math.imul(B, nt) | 0, o = o + Math.imul(B, it) | 0, i = i + Math.imul(O, ot) | 0, r = (r = r + Math.imul(O, st) | 0) + Math.imul(P, ot) | 0, o = o + Math.imul(P, st) | 0, i = i + Math.imul(T, at) | 0, r = (r = r + Math.imul(T, ct) | 0) + Math.imul(I, at) | 0, o = o + Math.imul(I, ct) | 0, i = i + Math.imul(E, ht) | 0, r = (r = r + Math.imul(E, ft) | 0) + Math.imul(C, ht) | 0, o = o + Math.imul(C, ft) | 0;
      var Tt = (c + (i = i + Math.imul(x, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(x, mt) | 0) + Math.imul(S, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(S, mt) | 0) + (r >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, i = Math.imul(L, nt), r = (r = Math.imul(L, it)) + Math.imul(F, nt) | 0, o = Math.imul(F, it), i = i + Math.imul(j, ot) | 0, r = (r = r + Math.imul(j, st) | 0) + Math.imul(B, ot) | 0, o = o + Math.imul(B, st) | 0, i = i + Math.imul(O, at) | 0, r = (r = r + Math.imul(O, ct) | 0) + Math.imul(P, at) | 0, o = o + Math.imul(P, ct) | 0, i = i + Math.imul(T, ht) | 0, r = (r = r + Math.imul(T, ft) | 0) + Math.imul(I, ht) | 0, o = o + Math.imul(I, ft) | 0;
      var It = (c + (i = i + Math.imul(E, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(E, mt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(C, mt) | 0) + (r >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, i = Math.imul(L, ot), r = (r = Math.imul(L, st)) + Math.imul(F, ot) | 0, o = Math.imul(F, st), i = i + Math.imul(j, at) | 0, r = (r = r + Math.imul(j, ct) | 0) + Math.imul(B, at) | 0, o = o + Math.imul(B, ct) | 0, i = i + Math.imul(O, ht) | 0, r = (r = r + Math.imul(O, ft) | 0) + Math.imul(P, ht) | 0, o = o + Math.imul(P, ft) | 0;
      var At = (c + (i = i + Math.imul(T, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(T, mt) | 0) + Math.imul(I, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(I, mt) | 0) + (r >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, i = Math.imul(L, at), r = (r = Math.imul(L, ct)) + Math.imul(F, at) | 0, o = Math.imul(F, ct), i = i + Math.imul(j, ht) | 0, r = (r = r + Math.imul(j, ft) | 0) + Math.imul(B, ht) | 0, o = o + Math.imul(B, ft) | 0;
      var Ot = (c + (i = i + Math.imul(O, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(O, mt) | 0) + Math.imul(P, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(P, mt) | 0) + (r >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, i = Math.imul(L, ht), r = (r = Math.imul(L, ft)) + Math.imul(F, ht) | 0, o = Math.imul(F, ft);
      var Pt = (c + (i = i + Math.imul(j, pt) | 0) | 0) + ((8191 & (r = (r = r + Math.imul(j, mt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
      c = ((o = o + Math.imul(B, mt) | 0) + (r >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863;
      var Rt = (c + (i = Math.imul(L, pt)) | 0) + ((8191 & (r = (r = Math.imul(L, mt)) + Math.imul(F, pt) | 0)) << 13) | 0;
      return c = ((o = Math.imul(F, mt)) + (r >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, a[0] = bt, a[1] = gt, a[2] = vt, a[3] = yt, a[4] = wt, a[5] = _t, a[6] = kt, a[7] = xt, a[8] = St, a[9] = Mt, a[10] = Et, a[11] = Ct, a[12] = Nt, a[13] = Tt, a[14] = It, a[15] = At, a[16] = Ot, a[17] = Pt, a[18] = Rt, 0 !== c && (a[19] = c, n.length++), n;
    };

    function b(t, e, n) {
      n.negative = e.negative ^ t.negative, n.length = t.length + e.length;

      for (var i = 0, r = 0, o = 0; o < n.length - 1; o++) {
        var s = r;
        r = 0;

        for (var u = 67108863 & i, a = Math.min(o, e.length - 1), c = Math.max(0, o - t.length + 1); c <= a; c++) {
          var l = o - c,
              h = (0 | t.words[l]) * (0 | e.words[c]),
              f = 67108863 & h;
          u = 67108863 & (f = f + u | 0), r += (s = (s = s + (h / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, s &= 67108863;
        }

        n.words[o] = u, i = s, s = r;
      }

      return 0 !== i ? n.words[o] = i : n.length--, n._strip();
    }

    function g(t, e, n) {
      return b(t, e, n);
    }

    Math.imul || (m = p), o.prototype.mulTo = function (t, e) {
      var n = this.length + t.length;
      return 10 === this.length && 10 === t.length ? m(this, t, e) : n < 63 ? p(this, t, e) : n < 1024 ? b(this, t, e) : g(this, t, e);
    }, o.prototype.mul = function (t) {
      var e = new o(null);
      return e.words = new Array(this.length + t.length), this.mulTo(t, e);
    }, o.prototype.mulf = function (t) {
      var e = new o(null);
      return e.words = new Array(this.length + t.length), g(this, t, e);
    }, o.prototype.imul = function (t) {
      return this.clone().mulTo(t, this);
    }, o.prototype.imuln = function (t) {
      var e = t < 0;
      e && (t = -t), n("number" == typeof t), n(t < 67108864);

      for (var i = 0, r = 0; r < this.length; r++) {
        var o = (0 | this.words[r]) * t,
            s = (67108863 & o) + (67108863 & i);
        i >>= 26, i += o / 67108864 | 0, i += s >>> 26, this.words[r] = 67108863 & s;
      }

      return 0 !== i && (this.words[r] = i, this.length++), e ? this.ineg() : this;
    }, o.prototype.muln = function (t) {
      return this.clone().imuln(t);
    }, o.prototype.sqr = function () {
      return this.mul(this);
    }, o.prototype.isqr = function () {
      return this.imul(this.clone());
    }, o.prototype.pow = function (t) {
      var e = function (t) {
        for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++) {
          var i = n / 26 | 0,
              r = n % 26;
          e[n] = t.words[i] >>> r & 1;
        }

        return e;
      }(t);

      if (0 === e.length) return new o(1);

      for (var n = this, i = 0; i < e.length && 0 === e[i]; i++, n = n.sqr());

      if (++i < e.length) for (var r = n.sqr(); i < e.length; i++, r = r.sqr()) 0 !== e[i] && (n = n.mul(r));
      return n;
    }, o.prototype.iushln = function (t) {
      n("number" == typeof t && t >= 0);
      var e,
          i = t % 26,
          r = (t - i) / 26,
          o = 67108863 >>> 26 - i << 26 - i;

      if (0 !== i) {
        var s = 0;

        for (e = 0; e < this.length; e++) {
          var u = this.words[e] & o,
              a = (0 | this.words[e]) - u << i;
          this.words[e] = a | s, s = u >>> 26 - i;
        }

        s && (this.words[e] = s, this.length++);
      }

      if (0 !== r) {
        for (e = this.length - 1; e >= 0; e--) this.words[e + r] = this.words[e];

        for (e = 0; e < r; e++) this.words[e] = 0;

        this.length += r;
      }

      return this._strip();
    }, o.prototype.ishln = function (t) {
      return n(0 === this.negative), this.iushln(t);
    }, o.prototype.iushrn = function (t, e, i) {
      var r;
      n("number" == typeof t && t >= 0), r = e ? (e - e % 26) / 26 : 0;
      var o = t % 26,
          s = Math.min((t - o) / 26, this.length),
          u = 67108863 ^ 67108863 >>> o << o,
          a = i;

      if (r -= s, r = Math.max(0, r), a) {
        for (var c = 0; c < s; c++) a.words[c] = this.words[c];

        a.length = s;
      }

      if (0 === s) ;else if (this.length > s) for (this.length -= s, c = 0; c < this.length; c++) this.words[c] = this.words[c + s];else this.words[0] = 0, this.length = 1;
      var l = 0;

      for (c = this.length - 1; c >= 0 && (0 !== l || c >= r); c--) {
        var h = 0 | this.words[c];
        this.words[c] = l << 26 - o | h >>> o, l = h & u;
      }

      return a && 0 !== l && (a.words[a.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this._strip();
    }, o.prototype.ishrn = function (t, e, i) {
      return n(0 === this.negative), this.iushrn(t, e, i);
    }, o.prototype.shln = function (t) {
      return this.clone().ishln(t);
    }, o.prototype.ushln = function (t) {
      return this.clone().iushln(t);
    }, o.prototype.shrn = function (t) {
      return this.clone().ishrn(t);
    }, o.prototype.ushrn = function (t) {
      return this.clone().iushrn(t);
    }, o.prototype.testn = function (t) {
      n("number" == typeof t && t >= 0);
      var e = t % 26,
          i = (t - e) / 26,
          r = 1 << e;
      return !(this.length <= i) && !!(this.words[i] & r);
    }, o.prototype.imaskn = function (t) {
      n("number" == typeof t && t >= 0);
      var e = t % 26,
          i = (t - e) / 26;
      if (n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= i) return this;

      if (0 !== e && i++, this.length = Math.min(i, this.length), 0 !== e) {
        var r = 67108863 ^ 67108863 >>> e << e;
        this.words[this.length - 1] &= r;
      }

      return this._strip();
    }, o.prototype.maskn = function (t) {
      return this.clone().imaskn(t);
    }, o.prototype.iaddn = function (t) {
      return n("number" == typeof t), n(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t);
    }, o.prototype._iaddn = function (t) {
      this.words[0] += t;

      for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;

      return this.length = Math.max(this.length, e + 1), this;
    }, o.prototype.isubn = function (t) {
      if (n("number" == typeof t), n(t < 67108864), t < 0) return this.iaddn(-t);
      if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
      if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;else for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
      return this._strip();
    }, o.prototype.addn = function (t) {
      return this.clone().iaddn(t);
    }, o.prototype.subn = function (t) {
      return this.clone().isubn(t);
    }, o.prototype.iabs = function () {
      return this.negative = 0, this;
    }, o.prototype.abs = function () {
      return this.clone().iabs();
    }, o.prototype._ishlnsubmul = function (t, e, i) {
      var r,
          o,
          s = t.length + i;

      this._expand(s);

      var u = 0;

      for (r = 0; r < t.length; r++) {
        o = (0 | this.words[r + i]) + u;
        var a = (0 | t.words[r]) * e;
        u = ((o -= 67108863 & a) >> 26) - (a / 67108864 | 0), this.words[r + i] = 67108863 & o;
      }

      for (; r < this.length - i; r++) u = (o = (0 | this.words[r + i]) + u) >> 26, this.words[r + i] = 67108863 & o;

      if (0 === u) return this._strip();

      for (n(-1 === u), u = 0, r = 0; r < this.length; r++) u = (o = -(0 | this.words[r]) + u) >> 26, this.words[r] = 67108863 & o;

      return this.negative = 1, this._strip();
    }, o.prototype._wordDiv = function (t, e) {
      var n = (this.length, t.length),
          i = this.clone(),
          r = t,
          s = 0 | r.words[r.length - 1];
      0 !== (n = 26 - this._countBits(s)) && (r = r.ushln(n), i.iushln(n), s = 0 | r.words[r.length - 1]);
      var u,
          a = i.length - r.length;

      if ("mod" !== e) {
        (u = new o(null)).length = a + 1, u.words = new Array(u.length);

        for (var c = 0; c < u.length; c++) u.words[c] = 0;
      }

      var l = i.clone()._ishlnsubmul(r, 1, a);

      0 === l.negative && (i = l, u && (u.words[a] = 1));

      for (var h = a - 1; h >= 0; h--) {
        var f = 67108864 * (0 | i.words[r.length + h]) + (0 | i.words[r.length + h - 1]);

        for (f = Math.min(f / s | 0, 67108863), i._ishlnsubmul(r, f, h); 0 !== i.negative;) f--, i.negative = 0, i._ishlnsubmul(r, 1, h), i.isZero() || (i.negative ^= 1);

        u && (u.words[h] = f);
      }

      return u && u._strip(), i._strip(), "div" !== e && 0 !== n && i.iushrn(n), {
        div: u || null,
        mod: i
      };
    }, o.prototype.divmod = function (t, e, i) {
      return n(!t.isZero()), this.isZero() ? {
        div: new o(0),
        mod: new o(0)
      } : 0 !== this.negative && 0 === t.negative ? (u = this.neg().divmod(t, e), "mod" !== e && (r = u.div.neg()), "div" !== e && (s = u.mod.neg(), i && 0 !== s.negative && s.iadd(t)), {
        div: r,
        mod: s
      }) : 0 === this.negative && 0 !== t.negative ? (u = this.divmod(t.neg(), e), "mod" !== e && (r = u.div.neg()), {
        div: r,
        mod: u.mod
      }) : 0 != (this.negative & t.negative) ? (u = this.neg().divmod(t.neg(), e), "div" !== e && (s = u.mod.neg(), i && 0 !== s.negative && s.isub(t)), {
        div: u.div,
        mod: s
      }) : t.length > this.length || this.cmp(t) < 0 ? {
        div: new o(0),
        mod: this
      } : 1 === t.length ? "div" === e ? {
        div: this.divn(t.words[0]),
        mod: null
      } : "mod" === e ? {
        div: null,
        mod: new o(this.modrn(t.words[0]))
      } : {
        div: this.divn(t.words[0]),
        mod: new o(this.modrn(t.words[0]))
      } : this._wordDiv(t, e);
      var r, s, u;
    }, o.prototype.div = function (t) {
      return this.divmod(t, "div", !1).div;
    }, o.prototype.mod = function (t) {
      return this.divmod(t, "mod", !1).mod;
    }, o.prototype.umod = function (t) {
      return this.divmod(t, "mod", !0).mod;
    }, o.prototype.divRound = function (t) {
      var e = this.divmod(t);
      if (e.mod.isZero()) return e.div;
      var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
          i = t.ushrn(1),
          r = t.andln(1),
          o = n.cmp(i);
      return o < 0 || 1 === r && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1);
    }, o.prototype.modrn = function (t) {
      var e = t < 0;
      e && (t = -t), n(t <= 67108863);

      for (var i = (1 << 26) % t, r = 0, o = this.length - 1; o >= 0; o--) r = (i * r + (0 | this.words[o])) % t;

      return e ? -r : r;
    }, o.prototype.modn = function (t) {
      return this.modrn(t);
    }, o.prototype.idivn = function (t) {
      var e = t < 0;
      e && (t = -t), n(t <= 67108863);

      for (var i = 0, r = this.length - 1; r >= 0; r--) {
        var o = (0 | this.words[r]) + 67108864 * i;
        this.words[r] = o / t | 0, i = o % t;
      }

      return this._strip(), e ? this.ineg() : this;
    }, o.prototype.divn = function (t) {
      return this.clone().idivn(t);
    }, o.prototype.egcd = function (t) {
      n(0 === t.negative), n(!t.isZero());
      var e = this,
          i = t.clone();
      e = 0 !== e.negative ? e.umod(t) : e.clone();

      for (var r = new o(1), s = new o(0), u = new o(0), a = new o(1), c = 0; e.isEven() && i.isEven();) e.iushrn(1), i.iushrn(1), ++c;

      for (var l = i.clone(), h = e.clone(); !e.isZero();) {
        for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);

        if (f > 0) for (e.iushrn(f); f-- > 0;) (r.isOdd() || s.isOdd()) && (r.iadd(l), s.isub(h)), r.iushrn(1), s.iushrn(1);

        for (var p = 0, m = 1; 0 == (i.words[0] & m) && p < 26; ++p, m <<= 1);

        if (p > 0) for (i.iushrn(p); p-- > 0;) (u.isOdd() || a.isOdd()) && (u.iadd(l), a.isub(h)), u.iushrn(1), a.iushrn(1);
        e.cmp(i) >= 0 ? (e.isub(i), r.isub(u), s.isub(a)) : (i.isub(e), u.isub(r), a.isub(s));
      }

      return {
        a: u,
        b: a,
        gcd: i.iushln(c)
      };
    }, o.prototype._invmp = function (t) {
      n(0 === t.negative), n(!t.isZero());
      var e = this,
          i = t.clone();
      e = 0 !== e.negative ? e.umod(t) : e.clone();

      for (var r, s = new o(1), u = new o(0), a = i.clone(); e.cmpn(1) > 0 && i.cmpn(1) > 0;) {
        for (var c = 0, l = 1; 0 == (e.words[0] & l) && c < 26; ++c, l <<= 1);

        if (c > 0) for (e.iushrn(c); c-- > 0;) s.isOdd() && s.iadd(a), s.iushrn(1);

        for (var h = 0, f = 1; 0 == (i.words[0] & f) && h < 26; ++h, f <<= 1);

        if (h > 0) for (i.iushrn(h); h-- > 0;) u.isOdd() && u.iadd(a), u.iushrn(1);
        e.cmp(i) >= 0 ? (e.isub(i), s.isub(u)) : (i.isub(e), u.isub(s));
      }

      return (r = 0 === e.cmpn(1) ? s : u).cmpn(0) < 0 && r.iadd(t), r;
    }, o.prototype.gcd = function (t) {
      if (this.isZero()) return t.abs();
      if (t.isZero()) return this.abs();
      var e = this.clone(),
          n = t.clone();
      e.negative = 0, n.negative = 0;

      for (var i = 0; e.isEven() && n.isEven(); i++) e.iushrn(1), n.iushrn(1);

      for (;;) {
        for (; e.isEven();) e.iushrn(1);

        for (; n.isEven();) n.iushrn(1);

        var r = e.cmp(n);

        if (r < 0) {
          var o = e;
          e = n, n = o;
        } else if (0 === r || 0 === n.cmpn(1)) break;

        e.isub(n);
      }

      return n.iushln(i);
    }, o.prototype.invm = function (t) {
      return this.egcd(t).a.umod(t);
    }, o.prototype.isEven = function () {
      return 0 == (1 & this.words[0]);
    }, o.prototype.isOdd = function () {
      return 1 == (1 & this.words[0]);
    }, o.prototype.andln = function (t) {
      return this.words[0] & t;
    }, o.prototype.bincn = function (t) {
      n("number" == typeof t);
      var e = t % 26,
          i = (t - e) / 26,
          r = 1 << e;
      if (this.length <= i) return this._expand(i + 1), this.words[i] |= r, this;

      for (var o = r, s = i; 0 !== o && s < this.length; s++) {
        var u = 0 | this.words[s];
        o = (u += o) >>> 26, u &= 67108863, this.words[s] = u;
      }

      return 0 !== o && (this.words[s] = o, this.length++), this;
    }, o.prototype.isZero = function () {
      return 1 === this.length && 0 === this.words[0];
    }, o.prototype.cmpn = function (t) {
      var e,
          i = t < 0;
      if (0 !== this.negative && !i) return -1;
      if (0 === this.negative && i) return 1;
      if (this._strip(), this.length > 1) e = 1;else {
        i && (t = -t), n(t <= 67108863, "Number is too big");
        var r = 0 | this.words[0];
        e = r === t ? 0 : r < t ? -1 : 1;
      }
      return 0 !== this.negative ? 0 | -e : e;
    }, o.prototype.cmp = function (t) {
      if (0 !== this.negative && 0 === t.negative) return -1;
      if (0 === this.negative && 0 !== t.negative) return 1;
      var e = this.ucmp(t);
      return 0 !== this.negative ? 0 | -e : e;
    }, o.prototype.ucmp = function (t) {
      if (this.length > t.length) return 1;
      if (this.length < t.length) return -1;

      for (var e = 0, n = this.length - 1; n >= 0; n--) {
        var i = 0 | this.words[n],
            r = 0 | t.words[n];

        if (i !== r) {
          i < r ? e = -1 : i > r && (e = 1);
          break;
        }
      }

      return e;
    }, o.prototype.gtn = function (t) {
      return 1 === this.cmpn(t);
    }, o.prototype.gt = function (t) {
      return 1 === this.cmp(t);
    }, o.prototype.gten = function (t) {
      return this.cmpn(t) >= 0;
    }, o.prototype.gte = function (t) {
      return this.cmp(t) >= 0;
    }, o.prototype.ltn = function (t) {
      return -1 === this.cmpn(t);
    }, o.prototype.lt = function (t) {
      return -1 === this.cmp(t);
    }, o.prototype.lten = function (t) {
      return this.cmpn(t) <= 0;
    }, o.prototype.lte = function (t) {
      return this.cmp(t) <= 0;
    }, o.prototype.eqn = function (t) {
      return 0 === this.cmpn(t);
    }, o.prototype.eq = function (t) {
      return 0 === this.cmp(t);
    }, o.red = function (t) {
      return new S(t);
    }, o.prototype.toRed = function (t) {
      return n(!this.red, "Already a number in reduction context"), n(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t);
    }, o.prototype.fromRed = function () {
      return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, o.prototype._forceRed = function (t) {
      return this.red = t, this;
    }, o.prototype.forceRed = function (t) {
      return n(!this.red, "Already a number in reduction context"), this._forceRed(t);
    }, o.prototype.redAdd = function (t) {
      return n(this.red, "redAdd works only with red numbers"), this.red.add(this, t);
    }, o.prototype.redIAdd = function (t) {
      return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t);
    }, o.prototype.redSub = function (t) {
      return n(this.red, "redSub works only with red numbers"), this.red.sub(this, t);
    }, o.prototype.redISub = function (t) {
      return n(this.red, "redISub works only with red numbers"), this.red.isub(this, t);
    }, o.prototype.redShl = function (t) {
      return n(this.red, "redShl works only with red numbers"), this.red.shl(this, t);
    }, o.prototype.redMul = function (t) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t);
    }, o.prototype.redIMul = function (t) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t);
    }, o.prototype.redSqr = function () {
      return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, o.prototype.redISqr = function () {
      return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, o.prototype.redSqrt = function () {
      return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, o.prototype.redInvm = function () {
      return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, o.prototype.redNeg = function () {
      return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, o.prototype.redPow = function (t) {
      return n(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t);
    };
    var v = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };

    function y(t, e) {
      this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }

    function w() {
      y.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }

    function _() {
      y.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }

    function k() {
      y.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }

    function x() {
      y.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }

    function S(t) {
      if ("string" == typeof t) {
        var e = o._prime(t);

        this.m = e.p, this.prime = e;
      } else n(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null;
    }

    function M(t) {
      S.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }

    y.prototype._tmp = function () {
      var t = new o(null);
      return t.words = new Array(Math.ceil(this.n / 13)), t;
    }, y.prototype.ireduce = function (t) {
      var e,
          n = t;

      do {
        this.split(n, this.tmp), e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength();
      } while (e > this.n);

      var i = e < this.n ? -1 : n.ucmp(this.p);
      return 0 === i ? (n.words[0] = 0, n.length = 1) : i > 0 ? n.isub(this.p) : n._strip(), n;
    }, y.prototype.split = function (t, e) {
      t.iushrn(this.n, 0, e);
    }, y.prototype.imulK = function (t) {
      return t.imul(this.k);
    }, i(w, y), w.prototype.split = function (t, e) {
      for (var n = Math.min(t.length, 9), i = 0; i < n; i++) e.words[i] = t.words[i];

      if (e.length = n, t.length <= 9) return t.words[0] = 0, void (t.length = 1);
      var r = t.words[9];

      for (e.words[e.length++] = 4194303 & r, i = 10; i < t.length; i++) {
        var o = 0 | t.words[i];
        t.words[i - 10] = (4194303 & o) << 4 | r >>> 22, r = o;
      }

      r >>>= 22, t.words[i - 10] = r, 0 === r && t.length > 10 ? t.length -= 10 : t.length -= 9;
    }, w.prototype.imulK = function (t) {
      t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;

      for (var e = 0, n = 0; n < t.length; n++) {
        var i = 0 | t.words[n];
        e += 977 * i, t.words[n] = 67108863 & e, e = 64 * i + (e / 67108864 | 0);
      }

      return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
    }, i(_, y), i(k, y), i(x, y), x.prototype.imulK = function (t) {
      for (var e = 0, n = 0; n < t.length; n++) {
        var i = 19 * (0 | t.words[n]) + e,
            r = 67108863 & i;
        i >>>= 26, t.words[n] = r, e = i;
      }

      return 0 !== e && (t.words[t.length++] = e), t;
    }, o._prime = function (t) {
      if (v[t]) return v[t];
      var e;
      if ("k256" === t) e = new w();else if ("p224" === t) e = new _();else if ("p192" === t) e = new k();else {
        if ("p25519" !== t) throw new Error("Unknown prime " + t);
        e = new x();
      }
      return v[t] = e, e;
    }, S.prototype._verify1 = function (t) {
      n(0 === t.negative, "red works only with positives"), n(t.red, "red works only with red numbers");
    }, S.prototype._verify2 = function (t, e) {
      n(0 == (t.negative | e.negative), "red works only with positives"), n(t.red && t.red === e.red, "red works only with red numbers");
    }, S.prototype.imod = function (t) {
      return this.prime ? this.prime.ireduce(t)._forceRed(this) : (c(t, t.umod(this.m)._forceRed(this)), t);
    }, S.prototype.neg = function (t) {
      return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
    }, S.prototype.add = function (t, e) {
      this._verify2(t, e);

      var n = t.add(e);
      return n.cmp(this.m) >= 0 && n.isub(this.m), n._forceRed(this);
    }, S.prototype.iadd = function (t, e) {
      this._verify2(t, e);

      var n = t.iadd(e);
      return n.cmp(this.m) >= 0 && n.isub(this.m), n;
    }, S.prototype.sub = function (t, e) {
      this._verify2(t, e);

      var n = t.sub(e);
      return n.cmpn(0) < 0 && n.iadd(this.m), n._forceRed(this);
    }, S.prototype.isub = function (t, e) {
      this._verify2(t, e);

      var n = t.isub(e);
      return n.cmpn(0) < 0 && n.iadd(this.m), n;
    }, S.prototype.shl = function (t, e) {
      return this._verify1(t), this.imod(t.ushln(e));
    }, S.prototype.imul = function (t, e) {
      return this._verify2(t, e), this.imod(t.imul(e));
    }, S.prototype.mul = function (t, e) {
      return this._verify2(t, e), this.imod(t.mul(e));
    }, S.prototype.isqr = function (t) {
      return this.imul(t, t.clone());
    }, S.prototype.sqr = function (t) {
      return this.mul(t, t);
    }, S.prototype.sqrt = function (t) {
      if (t.isZero()) return t.clone();
      var e = this.m.andln(3);

      if (n(e % 2 == 1), 3 === e) {
        var i = this.m.add(new o(1)).iushrn(2);
        return this.pow(t, i);
      }

      for (var r = this.m.subn(1), s = 0; !r.isZero() && 0 === r.andln(1);) s++, r.iushrn(1);

      n(!r.isZero());
      var u = new o(1).toRed(this),
          a = u.redNeg(),
          c = this.m.subn(1).iushrn(1),
          l = this.m.bitLength();

      for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, c).cmp(a);) l.redIAdd(a);

      for (var h = this.pow(l, r), f = this.pow(t, r.addn(1).iushrn(1)), d = this.pow(t, r), p = s; 0 !== d.cmp(u);) {
        for (var m = d, b = 0; 0 !== m.cmp(u); b++) m = m.redSqr();

        n(b < p);
        var g = this.pow(h, new o(1).iushln(p - b - 1));
        f = f.redMul(g), h = g.redSqr(), d = d.redMul(h), p = b;
      }

      return f;
    }, S.prototype.invm = function (t) {
      var e = t._invmp(this.m);

      return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e);
    }, S.prototype.pow = function (t, e) {
      if (e.isZero()) return new o(1).toRed(this);
      if (0 === e.cmpn(1)) return t.clone();
      var n = new Array(16);
      n[0] = new o(1).toRed(this), n[1] = t;

      for (var i = 2; i < n.length; i++) n[i] = this.mul(n[i - 1], t);

      var r = n[0],
          s = 0,
          u = 0,
          a = e.bitLength() % 26;

      for (0 === a && (a = 26), i = e.length - 1; i >= 0; i--) {
        for (var c = e.words[i], l = a - 1; l >= 0; l--) {
          var h = c >> l & 1;
          r !== n[0] && (r = this.sqr(r)), 0 !== h || 0 !== s ? (s <<= 1, s |= h, (4 === ++u || 0 === i && 0 === l) && (r = this.mul(r, n[s]), u = 0, s = 0)) : u = 0;
        }

        a = 26;
      }

      return r;
    }, S.prototype.convertTo = function (t) {
      var e = t.umod(this.m);
      return e === t ? e.clone() : e;
    }, S.prototype.convertFrom = function (t) {
      var e = t.clone();
      return e.red = null, e;
    }, o.mont = function (t) {
      return new M(t);
    }, i(M, S), M.prototype.convertTo = function (t) {
      return this.imod(t.ushln(this.shift));
    }, M.prototype.convertFrom = function (t) {
      var e = this.imod(t.mul(this.rinv));
      return e.red = null, e;
    }, M.prototype.imul = function (t, e) {
      if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
      var n = t.imul(e),
          i = n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          r = n.isub(i).iushrn(this.shift),
          o = r;
      return r.cmp(this.m) >= 0 ? o = r.isub(this.m) : r.cmpn(0) < 0 && (o = r.iadd(this.m)), o._forceRed(this);
    }, M.prototype.mul = function (t, e) {
      if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
      var n = t.mul(e),
          i = n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          r = n.isub(i).iushrn(this.shift),
          s = r;
      return r.cmp(this.m) >= 0 ? s = r.isub(this.m) : r.cmpn(0) < 0 && (s = r.iadd(this.m)), s._forceRed(this);
    }, M.prototype.invm = function (t) {
      return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
    };
  }(t, _indexD3bd.f);
}),
    c = (0, _indexD3bd.d)(function (t, e) {
  function n() {
    return t => t;
  }

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.OpaqueType = n, e.HexString = t => t, e.AddressString = t => t, e.BigIntString = t => t, e.IntNumber = function (t) {
    return Math.floor(t);
  }, e.RegExpString = t => t;
});
(0, _indexD3bd.e)(c);
c.OpaqueType, c.HexString, c.AddressString, c.BigIntString, c.IntNumber, c.RegExpString;
var l = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(a),
        o = /^[0-9]*$/,
        s = /^[a-f0-9]*$/;

  function u(t) {
    return t.startsWith("0x") || t.startsWith("0X");
  }

  function l(t) {
    return u(t) ? t.slice(2) : t;
  }

  function h(t) {
    return u(t) ? "0x" + t.slice(2) : "0x" + t;
  }

  function f(t) {
    if ("string" != typeof t) return !1;
    const e = l(t).toLowerCase();
    return s.test(e);
  }

  function d(t, e = !1) {
    if ("string" == typeof t) {
      const n = l(t).toLowerCase();
      if (s.test(n)) return c.HexString(e ? "0x" + n : n);
    }

    throw new Error(`"${t}" is not a hexadecimal string`);
  }

  function p(t, e = !1) {
    let n = d(t, !1);
    return n.length % 2 == 1 && (n = c.HexString("0" + n)), e ? c.HexString("0x" + n) : n;
  }

  function m(t) {
    if ("number" == typeof t && Number.isInteger(t)) return c.IntNumber(t);

    if ("string" == typeof t) {
      if (o.test(t)) return c.IntNumber(Number(t));
      if (f(t)) return c.IntNumber(new r.default(p(t, !1), 16).toNumber());
    }

    throw new Error(`Not an integer: ${t}`);
  }

  function b(t) {
    if (null == t || "function" != typeof t.constructor) return !1;
    const {
      constructor: e
    } = t;
    return "function" == typeof e.config && "number" == typeof e.EUCLID;
  }

  n.hexStringFromBuffer = function (t, e = !1) {
    const n = t.toString("hex");
    return c.HexString(e ? "0x" + n : n);
  }, n.bigIntStringFromBN = function (t) {
    return c.BigIntString(t.toString(10));
  }, n.intNumberFromHexString = function (t) {
    return c.IntNumber(new r.default(p(t, !1), 16).toNumber());
  }, n.hexStringFromIntNumber = function (t) {
    return c.HexString("0x" + new r.default(t).toString(16));
  }, n.has0xPrefix = u, n.strip0x = l, n.prepend0x = h, n.isHexString = f, n.ensureHexString = d, n.ensureEvenLengthHexString = p, n.ensureAddressString = function (t) {
    if ("string" == typeof t) {
      const e = l(t).toLowerCase();
      if (f(e) && 40 === e.length) return c.AddressString(h(e));
    }

    throw new Error(`Invalid Ethereum address: ${t}`);
  }, n.ensureBuffer = function (t) {
    if (Buffer.isBuffer(t)) return t;

    if ("string" == typeof t) {
      if (f(t)) {
        const e = p(t, !1);
        return Buffer.from(e, "hex");
      }

      return Buffer.from(t, "utf8");
    }

    throw new Error(`Not binary data: ${t}`);
  }, n.ensureIntNumber = m, n.ensureRegExpString = function (t) {
    if (t instanceof RegExp) return c.RegExpString(t.toString());
    throw new Error(`Not a RegExp: ${t}`);
  }, n.ensureBN = function (t) {
    if (null != t && (r.default.isBN(t) || b(t))) return new r.default(t.toString(10), 10);
    if ("number" == typeof t) return new r.default(m(t));

    if ("string" == typeof t) {
      if (o.test(t)) return new r.default(t, 10);
      if (f(t)) return new r.default(p(t, !1), 16);
    }

    throw new Error(`Not an integer: ${t}`);
  }, n.isBigNumber = b, n.range = function (t, e) {
    return Array.from({
      length: e - t
    }, (e, n) => t + n);
  }, n.getFavicon = function () {
    const t = document.querySelector('link[sizes="192x192"]') || document.querySelector('link[sizes="180x180"]') || document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]'),
          {
      protocol: e,
      host: n
    } = document.location,
          i = t ? t.getAttribute("href") : null;
    return !i || i.startsWith("javascript:") ? null : i.startsWith("http://") || i.startsWith("https://") || i.startsWith("data:") ? i : i.startsWith("//") ? e + i : `${e}//${n}${i}`;
  };
});
(0, _indexD3bd.e)(l);
l.hexStringFromBuffer, l.bigIntStringFromBN, l.intNumberFromHexString, l.hexStringFromIntNumber, l.has0xPrefix, l.strip0x, l.prepend0x, l.isHexString, l.ensureHexString, l.ensureEvenLengthHexString, l.ensureAddressString, l.ensureBuffer, l.ensureIntNumber, l.ensureRegExpString, l.ensureBN, l.isBigNumber, l.range, l.getFavicon;
const {
  Transform: h
} = _crypto_commonjsExternal1a.b;

var f = t => class e extends h {
  constructor(e, n, i, r, o) {
    super(o), this._rate = e, this._capacity = n, this._delimitedSuffix = i, this._hashBitLength = r, this._options = o, this._state = new t(), this._state.initialize(e, n), this._finalized = !1;
  }

  _transform(t, e, n) {
    let i = null;

    try {
      this.update(t, e);
    } catch (t) {
      i = t;
    }

    n(i);
  }

  _flush(t) {
    let e = null;

    try {
      this.push(this.digest());
    } catch (t) {
      e = t;
    }

    t(e);
  }

  update(t, e) {
    if (!Buffer.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer");
    if (this._finalized) throw new Error("Digest already called");
    return Buffer.isBuffer(t) || (t = Buffer.from(t, e)), this._state.absorb(t), this;
  }

  digest(t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0, this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);

    let e = this._state.squeeze(this._hashBitLength / 8);

    return void 0 !== t && (e = e.toString(t)), this._resetState(), e;
  }

  _resetState() {
    return this._state.initialize(this._rate, this._capacity), this;
  }

  _clone() {
    const t = new e(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);
    return this._state.copy(t._state), t._finalized = this._finalized, t;
  }

};

const {
  Transform: d
} = _crypto_commonjsExternal1a.b;

var p = t => class e extends d {
  constructor(e, n, i, r) {
    super(r), this._rate = e, this._capacity = n, this._delimitedSuffix = i, this._options = r, this._state = new t(), this._state.initialize(e, n), this._finalized = !1;
  }

  _transform(t, e, n) {
    let i = null;

    try {
      this.update(t, e);
    } catch (t) {
      i = t;
    }

    n(i);
  }

  _flush() {}

  _read(t) {
    this.push(this.squeeze(t));
  }

  update(t, e) {
    if (!Buffer.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer");
    if (this._finalized) throw new Error("Squeeze already called");
    return Buffer.isBuffer(t) || (t = Buffer.from(t, e)), this._state.absorb(t), this;
  }

  squeeze(t, e) {
    this._finalized || (this._finalized = !0, this._state.absorbLastFewBits(this._delimitedSuffix));

    let n = this._state.squeeze(t);

    return void 0 !== e && (n = n.toString(e)), n;
  }

  _resetState() {
    return this._state.initialize(this._rate, this._capacity), this;
  }

  _clone() {
    const t = new e(this._rate, this._capacity, this._delimitedSuffix, this._options);
    return this._state.copy(t._state), t._finalized = this._finalized, t;
  }

};

const m = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

var b = function (t) {
  for (let e = 0; e < 24; ++e) {
    const n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
          i = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
          r = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
          o = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
          s = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
          u = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
          a = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
          c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
          l = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
          h = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
    let f = l ^ (r << 1 | o >>> 31),
        d = h ^ (o << 1 | r >>> 31);

    const p = t[0] ^ f,
          b = t[1] ^ d,
          g = t[10] ^ f,
          v = t[11] ^ d,
          y = t[20] ^ f,
          w = t[21] ^ d,
          _ = t[30] ^ f,
          k = t[31] ^ d,
          x = t[40] ^ f,
          S = t[41] ^ d;

    f = n ^ (s << 1 | u >>> 31), d = i ^ (u << 1 | s >>> 31);
    const M = t[2] ^ f,
          E = t[3] ^ d,
          C = t[12] ^ f,
          N = t[13] ^ d,
          T = t[22] ^ f,
          I = t[23] ^ d,
          A = t[32] ^ f,
          O = t[33] ^ d,
          P = t[42] ^ f,
          R = t[43] ^ d;
    f = r ^ (a << 1 | c >>> 31), d = o ^ (c << 1 | a >>> 31);
    const j = t[4] ^ f,
          B = t[5] ^ d,
          D = t[14] ^ f,
          L = t[15] ^ d,
          F = t[24] ^ f,
          W = t[25] ^ d,
          q = t[34] ^ f,
          U = t[35] ^ d,
          V = t[44] ^ f,
          z = t[45] ^ d;
    f = s ^ (l << 1 | h >>> 31), d = u ^ (h << 1 | l >>> 31);
    const H = t[6] ^ f,
          $ = t[7] ^ d,
          J = t[16] ^ f,
          K = t[17] ^ d,
          G = t[26] ^ f,
          Y = t[27] ^ d,
          Z = t[36] ^ f,
          Q = t[37] ^ d,
          X = t[46] ^ f,
          tt = t[47] ^ d;
    f = a ^ (n << 1 | i >>> 31), d = c ^ (i << 1 | n >>> 31);

    const et = t[8] ^ f,
          nt = t[9] ^ d,
          it = t[18] ^ f,
          rt = t[19] ^ d,
          ot = t[28] ^ f,
          st = t[29] ^ d,
          ut = t[38] ^ f,
          at = t[39] ^ d,
          ct = t[48] ^ f,
          lt = t[49] ^ d,
          ht = p,
          ft = b,
          dt = v << 4 | g >>> 28,
          pt = g << 4 | v >>> 28,
          mt = y << 3 | w >>> 29,
          bt = w << 3 | y >>> 29,
          gt = k << 9 | _ >>> 23,
          vt = _ << 9 | k >>> 23,
          yt = x << 18 | S >>> 14,
          wt = S << 18 | x >>> 14,
          _t = M << 1 | E >>> 31,
          kt = E << 1 | M >>> 31,
          xt = N << 12 | C >>> 20,
          St = C << 12 | N >>> 20,
          Mt = T << 10 | I >>> 22,
          Et = I << 10 | T >>> 22,
          Ct = O << 13 | A >>> 19,
          Nt = A << 13 | O >>> 19,
          Tt = P << 2 | R >>> 30,
          It = R << 2 | P >>> 30,
          At = B << 30 | j >>> 2,
          Ot = j << 30 | B >>> 2,
          Pt = D << 6 | L >>> 26,
          Rt = L << 6 | D >>> 26,
          jt = W << 11 | F >>> 21,
          Bt = F << 11 | W >>> 21,
          Dt = q << 15 | U >>> 17,
          Lt = U << 15 | q >>> 17,
          Ft = z << 29 | V >>> 3,
          Wt = V << 29 | z >>> 3,
          qt = H << 28 | $ >>> 4,
          Ut = $ << 28 | H >>> 4,
          Vt = K << 23 | J >>> 9,
          zt = J << 23 | K >>> 9,
          Ht = G << 25 | Y >>> 7,
          $t = Y << 25 | G >>> 7,
          Jt = Z << 21 | Q >>> 11,
          Kt = Q << 21 | Z >>> 11,
          Gt = tt << 24 | X >>> 8,
          Yt = X << 24 | tt >>> 8,
          Zt = et << 27 | nt >>> 5,
          Qt = nt << 27 | et >>> 5,
          Xt = it << 20 | rt >>> 12,
          te = rt << 20 | it >>> 12,
          ee = st << 7 | ot >>> 25,
          ne = ot << 7 | st >>> 25,
          ie = ut << 8 | at >>> 24,
          re = at << 8 | ut >>> 24,
          oe = ct << 14 | lt >>> 18,
          se = lt << 14 | ct >>> 18;

    t[0] = ht ^ ~xt & jt, t[1] = ft ^ ~St & Bt, t[10] = qt ^ ~Xt & mt, t[11] = Ut ^ ~te & bt, t[20] = _t ^ ~Pt & Ht, t[21] = kt ^ ~Rt & $t, t[30] = Zt ^ ~dt & Mt, t[31] = Qt ^ ~pt & Et, t[40] = At ^ ~Vt & ee, t[41] = Ot ^ ~zt & ne, t[2] = xt ^ ~jt & Jt, t[3] = St ^ ~Bt & Kt, t[12] = Xt ^ ~mt & Ct, t[13] = te ^ ~bt & Nt, t[22] = Pt ^ ~Ht & ie, t[23] = Rt ^ ~$t & re, t[32] = dt ^ ~Mt & Dt, t[33] = pt ^ ~Et & Lt, t[42] = Vt ^ ~ee & gt, t[43] = zt ^ ~ne & vt, t[4] = jt ^ ~Jt & oe, t[5] = Bt ^ ~Kt & se, t[14] = mt ^ ~Ct & Ft, t[15] = bt ^ ~Nt & Wt, t[24] = Ht ^ ~ie & yt, t[25] = $t ^ ~re & wt, t[34] = Mt ^ ~Dt & Gt, t[35] = Et ^ ~Lt & Yt, t[44] = ee ^ ~gt & Tt, t[45] = ne ^ ~vt & It, t[6] = Jt ^ ~oe & ht, t[7] = Kt ^ ~se & ft, t[16] = Ct ^ ~Ft & qt, t[17] = Nt ^ ~Wt & Ut, t[26] = ie ^ ~yt & _t, t[27] = re ^ ~wt & kt, t[36] = Dt ^ ~Gt & Zt, t[37] = Lt ^ ~Yt & Qt, t[46] = gt ^ ~Tt & At, t[47] = vt ^ ~It & Ot, t[8] = oe ^ ~ht & xt, t[9] = se ^ ~ft & St, t[18] = Ft ^ ~qt & Xt, t[19] = Wt ^ ~Ut & te, t[28] = yt ^ ~_t & Pt, t[29] = wt ^ ~kt & Rt, t[38] = Gt ^ ~Zt & dt, t[39] = Yt ^ ~Qt & pt, t[48] = Tt ^ ~At & Vt, t[49] = It ^ ~Ot & zt, t[0] ^= m[2 * e], t[1] ^= m[2 * e + 1];
  }
};

function g() {
  this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.blockSize = null, this.count = 0, this.squeezing = !1;
}

g.prototype.initialize = function (t, e) {
  for (let t = 0; t < 50; ++t) this.state[t] = 0;

  this.blockSize = t / 8, this.count = 0, this.squeezing = !1;
}, g.prototype.absorb = function (t) {
  for (let e = 0; e < t.length; ++e) this.state[~~(this.count / 4)] ^= t[e] << this.count % 4 * 8, this.count += 1, this.count === this.blockSize && (b(this.state), this.count = 0);
}, g.prototype.absorbLastFewBits = function (t) {
  this.state[~~(this.count / 4)] ^= t << this.count % 4 * 8, 0 != (128 & t) && this.count === this.blockSize - 1 && b(this.state), this.state[~~((this.blockSize - 1) / 4)] ^= 128 << (this.blockSize - 1) % 4 * 8, b(this.state), this.count = 0, this.squeezing = !0;
}, g.prototype.squeeze = function (t) {
  this.squeezing || this.absorbLastFewBits(1);
  const e = Buffer.alloc(t);

  for (let n = 0; n < t; ++n) e[n] = this.state[~~(this.count / 4)] >>> this.count % 4 * 8 & 255, this.count += 1, this.count === this.blockSize && (b(this.state), this.count = 0);

  return e;
}, g.prototype.copy = function (t) {
  for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];

  t.blockSize = this.blockSize, t.count = this.count, t.squeezing = this.squeezing;
};

var v = function (t) {
  const e = f(t),
        n = p(t);
  return function (t, i) {
    switch ("string" == typeof t ? t.toLowerCase() : t) {
      case "keccak224":
        return new e(1152, 448, null, 224, i);

      case "keccak256":
        return new e(1088, 512, null, 256, i);

      case "keccak384":
        return new e(832, 768, null, 384, i);

      case "keccak512":
        return new e(576, 1024, null, 512, i);

      case "sha3-224":
        return new e(1152, 448, 6, 224, i);

      case "sha3-256":
        return new e(1088, 512, 6, 256, i);

      case "sha3-384":
        return new e(832, 768, 6, 384, i);

      case "sha3-512":
        return new e(576, 1024, 6, 512, i);

      case "shake128":
        return new n(1344, 256, 31, i);

      case "shake256":
        return new n(1088, 512, 31, i);

      default:
        throw new Error("Invald algorithm: " + t);
    }
  };
}(g);

function y(t) {
  return Buffer.allocUnsafe(t).fill(0);
}

function w(t, e, n) {
  const i = y(e);
  return t = _(t), n ? t.length < e ? (t.copy(i), i) : t.slice(0, e) : t.length < e ? (t.copy(i, e - t.length), i) : t.slice(-e);
}

function _(t) {
  if (!Buffer.isBuffer(t)) if (Array.isArray(t)) t = Buffer.from(t);else if ("string" == typeof t) t = k(t) ? Buffer.from((e = x(t)).length % 2 ? "0" + e : e, "hex") : Buffer.from(t);else if ("number" == typeof t) t = intToBuffer(t);else if (null == t) t = Buffer.allocUnsafe(0);else if (a.isBN(t)) t = t.toArrayLike(Buffer);else {
    if (!t.toArray) throw new Error("invalid type");
    t = Buffer.from(t.toArray());
  }
  var e;
  return t;
}

function k(t) {
  return "string" == typeof t && t.match(/^0x[0-9A-Fa-f]*$/);
}

function x(t) {
  return "string" == typeof t && t.startsWith("0x") ? t.slice(2) : t;
}

var S = {
  zeros: y,
  setLength: w,
  setLengthRight: function (t, e) {
    return w(t, e, !0);
  },
  isHexString: k,
  stripHexPrefix: x,
  toBuffer: _,
  bufferToHex: function (t) {
    return "0x" + (t = _(t)).toString("hex");
  },
  keccak: function (t, e) {
    return t = _(t), e || (e = 256), v("keccak" + e).update(t).digest();
  }
};

function M(t) {
  return t.startsWith("int[") ? "int256" + t.slice(3) : "int" === t ? "int256" : t.startsWith("uint[") ? "uint256" + t.slice(4) : "uint" === t ? "uint256" : t.startsWith("fixed[") ? "fixed128x128" + t.slice(5) : "fixed" === t ? "fixed128x128" : t.startsWith("ufixed[") ? "ufixed128x128" + t.slice(6) : "ufixed" === t ? "ufixed128x128" : t;
}

function E(t) {
  return parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
}

function C(t) {
  var e = /^\D+(\d+)x(\d+)$/.exec(t);
  return [parseInt(e[1], 10), parseInt(e[2], 10)];
}

function N(t) {
  var e = t.match(/(.*)\[(.*?)\]$/);
  return e ? "" === e[2] ? "dynamic" : parseInt(e[2], 10) : null;
}

function T(t) {
  var e = typeof t;
  if ("string" === e) return S.isHexString(t) ? new a(S.stripHexPrefix(t), 16) : new a(t, 10);
  if ("number" === e) return new a(t);
  if (t.toArray) return t;
  throw new Error("Argument is not a number");
}

function I(t, e) {
  var n, i, r, o;
  if ("address" === t) return I("uint160", T(e));
  if ("bool" === t) return I("uint8", e ? 1 : 0);
  if ("string" === t) return I("bytes", new Buffer(e, "utf8"));

  if (function (t) {
    return t.lastIndexOf("]") === t.length - 1;
  }(t)) {
    if (void 0 === e.length) throw new Error("Not an array?");
    if ("dynamic" !== (n = N(t)) && 0 !== n && e.length > n) throw new Error("Elements exceed array size: " + n);

    for (o in r = [], t = t.slice(0, t.lastIndexOf("[")), "string" == typeof e && (e = JSON.parse(e)), e) r.push(I(t, e[o]));

    if ("dynamic" === n) {
      var s = I("uint256", e.length);
      r.unshift(s);
    }

    return Buffer.concat(r);
  }

  if ("bytes" === t) return e = new Buffer(e), r = Buffer.concat([I("uint256", e.length), e]), e.length % 32 != 0 && (r = Buffer.concat([r, S.zeros(32 - e.length % 32)])), r;

  if (t.startsWith("bytes")) {
    if ((n = E(t)) < 1 || n > 32) throw new Error("Invalid bytes<N> width: " + n);
    return S.setLengthRight(e, 32);
  }

  if (t.startsWith("uint")) {
    if ((n = E(t)) % 8 || n < 8 || n > 256) throw new Error("Invalid uint<N> width: " + n);
    if ((i = T(e)).bitLength() > n) throw new Error("Supplied uint exceeds width: " + n + " vs " + i.bitLength());
    if (i < 0) throw new Error("Supplied uint is negative");
    return i.toArrayLike(Buffer, "be", 32);
  }

  if (t.startsWith("int")) {
    if ((n = E(t)) % 8 || n < 8 || n > 256) throw new Error("Invalid int<N> width: " + n);
    if ((i = T(e)).bitLength() > n) throw new Error("Supplied int exceeds width: " + n + " vs " + i.bitLength());
    return i.toTwos(256).toArrayLike(Buffer, "be", 32);
  }

  if (t.startsWith("ufixed")) {
    if (n = C(t), (i = T(e)) < 0) throw new Error("Supplied ufixed is negative");
    return I("uint256", i.mul(new a(2).pow(new a(n[1]))));
  }

  if (t.startsWith("fixed")) return n = C(t), I("int256", T(e).mul(new a(2).pow(new a(n[1]))));
  throw new Error("Unsupported or invalid type: " + t);
}

function A(t) {
  return "string" === t || "bytes" === t || "dynamic" === N(t);
}

function O(t, e) {
  if (t.length !== e.length) throw new Error("Number of types are not matching the values");

  for (var n, i, r = [], o = 0; o < t.length; o++) {
    var s = M(t[o]),
        u = e[o];
    if ("bytes" === s) r.push(u);else if ("string" === s) r.push(new Buffer(u, "utf8"));else if ("bool" === s) r.push(new Buffer(u ? "01" : "00", "hex"));else if ("address" === s) r.push(S.setLength(u, 20));else if (s.startsWith("bytes")) {
      if ((n = E(s)) < 1 || n > 32) throw new Error("Invalid bytes<N> width: " + n);
      r.push(S.setLengthRight(u, n));
    } else if (s.startsWith("uint")) {
      if ((n = E(s)) % 8 || n < 8 || n > 256) throw new Error("Invalid uint<N> width: " + n);
      if ((i = T(u)).bitLength() > n) throw new Error("Supplied uint exceeds width: " + n + " vs " + i.bitLength());
      r.push(i.toArrayLike(Buffer, "be", n / 8));
    } else {
      if (!s.startsWith("int")) throw new Error("Unsupported or invalid type: " + s);
      if ((n = E(s)) % 8 || n < 8 || n > 256) throw new Error("Invalid int<N> width: " + n);
      if ((i = T(u)).bitLength() > n) throw new Error("Supplied int exceeds width: " + n + " vs " + i.bitLength());
      r.push(i.toTwos(n).toArrayLike(Buffer, "be", n / 8));
    }
  }

  return Buffer.concat(r);
}

var P = {
  rawEncode: function (t, e) {
    var n = [],
        i = [],
        r = 32 * t.length;

    for (var o in t) {
      var s = M(t[o]),
          u = I(s, e[o]);
      A(s) ? (n.push(I("uint256", r)), i.push(u), r += u.length) : n.push(u);
    }

    return Buffer.concat(n.concat(i));
  },
  solidityPack: O,
  soliditySHA3: function (t, e) {
    return S.keccak(O(t, e));
  }
};
const R = {
  type: "object",
  properties: {
    types: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            type: {
              type: "string"
            }
          },
          required: ["name", "type"]
        }
      }
    },
    primaryType: {
      type: "string"
    },
    domain: {
      type: "object"
    },
    message: {
      type: "object"
    }
  },
  required: ["types", "primaryType", "domain", "message"]
},
      j = {
  encodeData(t, e, n, i = !0) {
    const r = ["bytes32"],
          o = [this.hashType(t, n)];

    if (i) {
      const s = (t, e, r) => {
        if (void 0 !== n[e]) return ["bytes32", null == r ? "0x0000000000000000000000000000000000000000000000000000000000000000" : S.keccak(this.encodeData(e, r, n, i))];
        if (void 0 === r) throw new Error(`missing value for field ${t} of type ${e}`);
        if ("bytes" === e) return ["bytes32", S.keccak(r)];
        if ("string" === e) return "string" == typeof r && (r = Buffer.from(r, "utf8")), ["bytes32", S.keccak(r)];

        if (e.lastIndexOf("]") === e.length - 1) {
          const n = e.slice(0, e.lastIndexOf("[")),
                i = r.map(e => s(t, n, e));
          return ["bytes32", S.keccak(P.rawEncode(i.map(([t]) => t), i.map(([, t]) => t)))];
        }

        return [e, r];
      };

      for (const i of n[t]) {
        const [t, n] = s(i.name, i.type, e[i.name]);
        r.push(t), o.push(n);
      }
    } else for (const s of n[t]) {
      let t = e[s.name];
      if (void 0 !== t) if ("bytes" === s.type) r.push("bytes32"), t = S.keccak(t), o.push(t);else if ("string" === s.type) r.push("bytes32"), "string" == typeof t && (t = Buffer.from(t, "utf8")), t = S.keccak(t), o.push(t);else if (void 0 !== n[s.type]) r.push("bytes32"), t = S.keccak(this.encodeData(s.type, t, n, i)), o.push(t);else {
        if (s.type.lastIndexOf("]") === s.type.length - 1) throw new Error("Arrays currently unimplemented in encodeData");
        r.push(s.type), o.push(t);
      }
    }

    return P.rawEncode(r, o);
  },

  encodeType(t, e) {
    let n = "",
        i = this.findTypeDependencies(t, e).filter(e => e !== t);
    i = [t].concat(i.sort());

    for (const t of i) {
      if (!e[t]) throw new Error("No type definition specified: " + t);
      n += t + "(" + e[t].map(({
        name: t,
        type: e
      }) => e + " " + t).join(",") + ")";
    }

    return n;
  },

  findTypeDependencies(t, e, n = []) {
    if (t = t.match(/^\w*/)[0], n.includes(t) || void 0 === e[t]) return n;
    n.push(t);

    for (const i of e[t]) for (const t of this.findTypeDependencies(i.type, e, n)) !n.includes(t) && n.push(t);

    return n;
  },

  hashStruct(t, e, n, i = !0) {
    return S.keccak(this.encodeData(t, e, n, i));
  },

  hashType(t, e) {
    return S.keccak(this.encodeType(t, e));
  },

  sanitizeData(t) {
    const e = {};

    for (const n in R.properties) t[n] && (e[n] = t[n]);

    return e.types && (e.types = Object.assign({
      EIP712Domain: []
    }, e.types)), e;
  },

  hash(t, e = !0) {
    const n = this.sanitizeData(t),
          i = [Buffer.from("1901", "hex")];
    return i.push(this.hashStruct("EIP712Domain", n.domain, n.types, e)), "EIP712Domain" !== n.primaryType && i.push(this.hashStruct(n.primaryType, n.message, n.types, e)), S.keccak(Buffer.concat(i));
  }

};
var B = {
  TYPED_MESSAGE_SCHEMA: R,
  TypedDataUtils: j,
  hashForSignTypedDataLegacy: function (t) {
    return function (t) {
      const e = new Error("Expect argument to be non-empty array");
      if ("object" != typeof t || !t.length) throw e;
      const n = t.map(function (t) {
        return "bytes" === t.type ? S.toBuffer(t.value) : t.value;
      }),
            i = t.map(function (t) {
        return t.type;
      }),
            r = t.map(function (t) {
        if (!t.name) throw e;
        return t.type + " " + t.name;
      });
      return P.soliditySHA3(["bytes32", "bytes32"], [P.soliditySHA3(new Array(t.length).fill("string"), r), P.soliditySHA3(i, n)]);
    }(t.data);
  },
  hashForSignTypedData_v3: function (t) {
    return j.hash(t.data, !1);
  },
  hashForSignTypedData_v4: function (t) {
    return j.hash(t.data);
  }
};
var D = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  const n = {
    jsonrpc: "2.0",
    id: 0
  };

  function i(t) {
    return {
      fromBlock: o(t.fromBlock),
      toBlock: o(t.toBlock),
      addresses: void 0 === t.address ? null : Array.isArray(t.address) ? t.address : [t.address],
      topics: t.topics || []
    };
  }

  function r(t) {
    const e = {
      fromBlock: s(t.fromBlock),
      toBlock: s(t.toBlock),
      topics: t.topics
    };
    return null !== t.addresses && (e.address = t.addresses), e;
  }

  function o(t) {
    if (void 0 === t || "latest" === t || "pending" === t) return "latest";
    if ("earliest" === t) return c.IntNumber(0);
    if (l.isHexString(t)) return l.intNumberFromHexString(t);
    throw new Error(`Invalid block option: ${t}`);
  }

  function s(t) {
    return "latest" === t ? t : l.hexStringFromIntNumber(t);
  }

  function u() {
    return Object.assign(Object.assign({}, n), {
      error: {
        code: -32e3,
        message: "filter not found"
      }
    });
  }

  function a() {
    return Object.assign(Object.assign({}, n), {
      result: []
    });
  }

  e.FilterPolyfill = class {
    constructor(t) {
      this.logFilters = new Map(), this.blockFilters = new Set(), this.pendingTransactionFilters = new Set(), this.cursors = new Map(), this.timeouts = new Map(), this.nextFilterId = c.IntNumber(1), this.provider = t;
    }

    async newFilter(t) {
      const e = i(t),
            n = this.makeFilterId(),
            r = await this.setInitialCursorPosition(n, e.fromBlock);
      return console.log(`Installing new log filter(${n}):`, e, "initial cursor position:", r), this.logFilters.set(n, e), this.setFilterTimeout(n), l.hexStringFromIntNumber(n);
    }

    async newBlockFilter() {
      const t = this.makeFilterId(),
            e = await this.setInitialCursorPosition(t, "latest");
      return console.log(`Installing new block filter (${t}) with initial cursor position:`, e), this.blockFilters.add(t), this.setFilterTimeout(t), l.hexStringFromIntNumber(t);
    }

    async newPendingTransactionFilter() {
      const t = this.makeFilterId(),
            e = await this.setInitialCursorPosition(t, "latest");
      return console.log(`Installing new block filter (${t}) with initial cursor position:`, e), this.pendingTransactionFilters.add(t), this.setFilterTimeout(t), l.hexStringFromIntNumber(t);
    }

    uninstallFilter(t) {
      const e = l.intNumberFromHexString(t);
      return console.log(`Uninstalling filter (${e})`), this.deleteFilter(e), !0;
    }

    getFilterChanges(t) {
      const e = l.intNumberFromHexString(t);
      return this.timeouts.has(e) && this.setFilterTimeout(e), this.logFilters.has(e) ? this.getLogFilterChanges(e) : this.blockFilters.has(e) ? this.getBlockFilterChanges(e) : this.pendingTransactionFilters.has(e) ? this.getPendingTransactionFilterChanges(e) : Promise.resolve(u());
    }

    async getFilterLogs(t) {
      const e = l.intNumberFromHexString(t),
            i = this.logFilters.get(e);
      return i ? this.sendAsyncPromise(Object.assign(Object.assign({}, n), {
        method: "eth_getLogs",
        params: [r(i)]
      })) : u();
    }

    makeFilterId() {
      return c.IntNumber(++this.nextFilterId);
    }

    sendAsyncPromise(t) {
      return new Promise((e, n) => {
        this.provider.sendAsync(t, (t, i) => t ? n(t) : Array.isArray(i) || null == i ? n(new Error(`unexpected response received: ${JSON.stringify(i)}`)) : void e(i));
      });
    }

    deleteFilter(t) {
      console.log(`Deleting filter (${t})`), this.logFilters.delete(t), this.blockFilters.delete(t), this.pendingTransactionFilters.delete(t), this.cursors.delete(t), this.timeouts.delete(t);
    }

    async getLogFilterChanges(t) {
      const e = this.logFilters.get(t),
            i = this.cursors.get(t);
      if (!i || !e) return u();
      const o = await this.getCurrentBlockHeight(),
            s = "latest" === e.toBlock ? o : e.toBlock;
      if (i > o) return a();
      if (i > e.toBlock) return a();
      console.log(`Fetching logs from ${i} to ${s} for filter ${t}`);
      const h = await this.sendAsyncPromise(Object.assign(Object.assign({}, n), {
        method: "eth_getLogs",
        params: [r(Object.assign(Object.assign({}, e), {
          fromBlock: i,
          toBlock: s
        }))]
      }));

      if (Array.isArray(h.result)) {
        const e = h.result.map(t => l.intNumberFromHexString(t.blockNumber || "0x0")),
              n = Math.max(...e);

        if (n && n > i) {
          const e = c.IntNumber(n + 1);
          console.log(`Moving cursor position for filter (${t}) from ${i} to ${e}`), this.cursors.set(t, e);
        }
      }

      return h;
    }

    async getBlockFilterChanges(t) {
      const e = this.cursors.get(t);
      if (!e) return u();
      const i = await this.getCurrentBlockHeight();
      if (e > i) return a();
      console.log(`Fetching blocks from ${e} to ${i} for filter (${t})`);
      const r = (await Promise.all(l.range(e, i + 1).map(t => this.getBlockHashByNumber(c.IntNumber(t))))).filter(t => !!t),
            o = c.IntNumber(e + r.length);
      return console.log(`Moving cursor position for filter (${t}) from ${e} to ${o}`), this.cursors.set(t, o), Object.assign(Object.assign({}, n), {
        result: r
      });
    }

    async getPendingTransactionFilterChanges(t) {
      return Promise.resolve(a());
    }

    async setInitialCursorPosition(t, e) {
      const n = await this.getCurrentBlockHeight(),
            i = "number" == typeof e && e > n ? e : n;
      return this.cursors.set(t, i), i;
    }

    setFilterTimeout(t) {
      const e = this.timeouts.get(t);
      e && window.clearTimeout(e);
      const n = window.setTimeout(() => {
        console.log(`Filter (${t}) timed out`), this.deleteFilter(t);
      }, 3e5);
      this.timeouts.set(t, n);
    }

    async getCurrentBlockHeight() {
      const {
        result: t
      } = await this.sendAsyncPromise(Object.assign(Object.assign({}, n), {
        method: "eth_blockNumber",
        params: []
      }));
      return l.intNumberFromHexString(l.ensureHexString(t));
    }

    async getBlockHashByNumber(t) {
      const e = await this.sendAsyncPromise(Object.assign(Object.assign({}, n), {
        method: "eth_getBlockByNumber",
        params: [l.hexStringFromIntNumber(t), !1]
      }));
      return e.result && "string" == typeof e.result.hash ? l.ensureHexString(e.result.hash) : null;
    }

  }, e.filterFromParam = i;
});
(0, _indexD3bd.e)(D);
D.FilterPolyfill, D.filterFromParam;
var L = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t.eth_accounts = "eth_accounts", t.eth_coinbase = "eth_coinbase", t.net_version = "net_version", t.eth_uninstallFilter = "eth_uninstallFilter", t.eth_requestAccounts = "eth_requestAccounts", t.eth_sign = "eth_sign", t.eth_ecRecover = "eth_ecRecover", t.personal_sign = "personal_sign", t.personal_ecRecover = "personal_ecRecover", t.eth_signTransaction = "eth_signTransaction", t.eth_sendRawTransaction = "eth_sendRawTransaction", t.eth_sendTransaction = "eth_sendTransaction", t.eth_signTypedData_v1 = "eth_signTypedData_v1", t.eth_signTypedData_v2 = "eth_signTypedData_v2", t.eth_signTypedData_v3 = "eth_signTypedData_v3", t.eth_signTypedData_v4 = "eth_signTypedData_v4", t.eth_signTypedData = "eth_signTypedData", t.walletlink_arbitrary = "walletlink_arbitrary", t.eth_newFilter = "eth_newFilter", t.eth_newBlockFilter = "eth_newBlockFilter", t.eth_newPendingTransactionFilter = "eth_newPendingTransactionFilter", t.eth_getFilterChanges = "eth_getFilterChanges", t.eth_getFilterLogs = "eth_getFilterLogs";
  }(e.JSONRPCMethod || (e.JSONRPCMethod = {}));
});
(0, _indexD3bd.e)(L);
L.JSONRPCMethod;
var F = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t[t.USER_DENIED_REQUEST_ACCOUNTS = 4001] = "USER_DENIED_REQUEST_ACCOUNTS", t[t.USER_DENIED_CREATE_ACCOUNT = 4010] = "USER_DENIED_CREATE_ACCOUNT", t[t.UNAUTHORIZED = 4100] = "UNAUTHORIZED", t[t.UNSUPPORTED_METHOD = 4200] = "UNSUPPORTED_METHOD", t[t.USER_DENIED_REQUEST_SIGNATURE = -32603] = "USER_DENIED_REQUEST_SIGNATURE";
  }(e.ProviderErrorCode || (e.ProviderErrorCode = {}));

  class n extends Error {
    constructor(t, e, i) {
      super(t || "Provider Error"), this.code = e, this.data = i, this.name = "ProviderError", Object.setPrototypeOf(this, n.prototype);
    }

  }

  e.ProviderError = n;
});
(0, _indexD3bd.e)(F);
F.ProviderErrorCode, F.ProviderError;
var W = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(a),
        o = i(B);
  n.WalletLinkProvider = class {
    constructor(t) {
      if (this._filterPolyfill = new D.FilterPolyfill(this), this._addresses = [], this._send = this.send, this._sendAsync = this.sendAsync, !t.relay) throw new Error("realy must be provided");
      if (!t.jsonRpcUrl) throw new Error("jsonRpcUrl must be provided");
      this._relay = t.relay, this._chainId = l.ensureIntNumber(t.chainId || 1), this._jsonRpcUrl = t.jsonRpcUrl;

      const e = this._relay.getStorageItem("Addresses");

      if (e) {
        const t = e.split(" ");
        "" !== t[0] && (this._addresses = t);
      }
    }

    get selectedAddress() {
      return this._addresses[0] || void 0;
    }

    get networkVersion() {
      return this._chainId.toString(10);
    }

    get isWalletLink() {
      return !0;
    }

    get host() {
      return this._jsonRpcUrl;
    }

    get connected() {
      return !0;
    }

    isConnected() {
      return !0;
    }

    async enable() {
      return this._addresses.length > 0 ? this._addresses : await this._send(L.JSONRPCMethod.eth_requestAccounts);
    }

    close() {
      this._relay.resetAndReload();
    }

    send(t, e) {
      if ("string" == typeof t) {
        const n = {
          jsonrpc: "2.0",
          id: 0,
          method: t,
          params: Array.isArray(e) ? e : void 0 !== e ? [e] : []
        };
        return this._sendRequestAsync(n).then(t => t.result);
      }

      if ("function" == typeof e) {
        const n = t,
              i = e;
        return this._sendAsync(n, i);
      }

      if (Array.isArray(t)) {
        return t.map(t => this._sendRequest(t));
      }

      const n = t;
      return this._sendRequest(n);
    }

    sendAsync(t, e) {
      if ("function" != typeof e) throw new Error("callback is required");

      if (Array.isArray(t)) {
        const n = e;
        return void this._sendMultipleRequestsAsync(t).then(t => n(null, t)).catch(t => n(t, null));
      }

      const n = e;

      this._sendRequestAsync(t).then(t => n(null, t)).catch(t => n(t, null));
    }

    async scanQRCode(t) {
      const e = await this._relay.scanQRCode(l.ensureRegExpString(t));
      if ("string" != typeof e.result) throw new Error("result was not a string");
      return e.result;
    }

    async arbitraryRequest(t) {
      const e = await this._relay.arbitraryRequest(t);
      if ("string" != typeof e.result) throw new Error("result was not a string");
      return e.result;
    }

    supportsSubscriptions() {
      return !1;
    }

    subscribe() {
      throw new Error("Subscriptions are not supported");
    }

    unsubscribe() {
      throw new Error("Subscriptions are not supported");
    }

    disconnect() {
      return !0;
    }

    _sendRequest(t) {
      const e = {
        jsonrpc: "2.0",
        id: t.id
      },
            {
        method: n
      } = t;
      if (e.result = this._handleSynchronousMethods(t), void 0 === e.result) throw new Error(`WalletLink does not support calling ${n} synchronously without ` + `a callback. Please provide a callback parameter to call ${n} ` + "asynchronously.");
      return e;
    }

    _setAddresses(t) {
      if (!Array.isArray(t)) throw new Error("addresses is not an array");
      this._addresses = t.map(t => l.ensureAddressString(t)), this._relay.setStorageItem("Addresses", t.join(" ")), window.dispatchEvent(new CustomEvent("walletlink:addresses", {
        detail: this._addresses
      }));
    }

    _sendRequestAsync(t) {
      return new Promise((e, n) => {
        try {
          const i = this._handleSynchronousMethods(t);

          if (void 0 !== i) return e({
            jsonrpc: "2.0",
            id: t.id,
            result: i
          });

          const r = this._handleAsynchronousFilterMethods(t);

          if (void 0 !== r) return void r.then(n => e(Object.assign(Object.assign({}, n), {
            id: t.id
          }))).catch(t => n(t));
        } catch (t) {
          return n(t);
        }

        this._handleAsynchronousMethods(t).then(n => e(Object.assign(Object.assign({}, n), {
          id: t.id
        }))).catch(t => n(t));
      });
    }

    _sendMultipleRequestsAsync(t) {
      return Promise.all(t.map(t => this._sendRequestAsync(t)));
    }

    _handleSynchronousMethods(t) {
      const {
        method: e
      } = t,
            n = t.params || [];

      switch (e) {
        case L.JSONRPCMethod.eth_accounts:
          return this._eth_accounts();

        case L.JSONRPCMethod.eth_coinbase:
          return this._eth_coinbase();

        case L.JSONRPCMethod.eth_uninstallFilter:
          return this._eth_uninstallFilter(n);

        case L.JSONRPCMethod.net_version:
          return this._net_version();

        default:
          return;
      }
    }

    _handleAsynchronousMethods(t) {
      const {
        method: e
      } = t,
            n = t.params || [];

      switch (e) {
        case L.JSONRPCMethod.eth_requestAccounts:
          return this._eth_requestAccounts();

        case L.JSONRPCMethod.eth_sign:
          return this._eth_sign(n);

        case L.JSONRPCMethod.eth_ecRecover:
          return this._eth_ecRecover(n);

        case L.JSONRPCMethod.personal_sign:
          return this._personal_sign(n);

        case L.JSONRPCMethod.personal_ecRecover:
          return this._personal_ecRecover(n);

        case L.JSONRPCMethod.eth_signTransaction:
          return this._eth_signTransaction(n);

        case L.JSONRPCMethod.eth_sendRawTransaction:
          return this._eth_sendRawTransaction(n);

        case L.JSONRPCMethod.eth_sendTransaction:
          return this._eth_sendTransaction(n);

        case L.JSONRPCMethod.eth_signTypedData_v1:
          return this._eth_signTypedData_v1(n);

        case L.JSONRPCMethod.eth_signTypedData_v2:
          return this._throwUnsupportedMethodError();

        case L.JSONRPCMethod.eth_signTypedData_v3:
          return this._eth_signTypedData_v3(n);

        case L.JSONRPCMethod.eth_signTypedData_v4:
        case L.JSONRPCMethod.eth_signTypedData:
          return this._eth_signTypedData_v4(n);

        case L.JSONRPCMethod.walletlink_arbitrary:
          return this._walletlink_arbitrary(n);
      }

      return window.fetch(this._jsonRpcUrl, {
        method: "POST",
        body: JSON.stringify(t),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(t => t.json()).then(t => {
        if (!t) throw new F.ProviderError("unexpected response");
        const e = t,
              {
          error: n
        } = e;
        if (n) throw new F.ProviderError(n.message || "RPC Error", n.code, n.data);
        return e;
      });
    }

    _handleAsynchronousFilterMethods(t) {
      const {
        method: e
      } = t,
            n = t.params || [];

      switch (e) {
        case L.JSONRPCMethod.eth_newFilter:
          return this._eth_newFilter(n);

        case L.JSONRPCMethod.eth_newBlockFilter:
          return this._eth_newBlockFilter();

        case L.JSONRPCMethod.eth_newPendingTransactionFilter:
          return this._eth_newPendingTransactionFilter();

        case L.JSONRPCMethod.eth_getFilterChanges:
          return this._eth_getFilterChanges(n);

        case L.JSONRPCMethod.eth_getFilterLogs:
          return this._eth_getFilterLogs(n);
      }
    }

    _isKnownAddress(t) {
      try {
        const e = l.ensureAddressString(t);
        return this._addresses.includes(e);
      } catch (t) {}

      return !1;
    }

    _ensureKnownAddress(t) {
      if (!this._isKnownAddress(t)) throw new Error("Unknown Ethereum address");
    }

    _prepareTransactionParams(t) {
      const e = t.from ? l.ensureAddressString(t.from) : this.selectedAddress;
      if (!e) throw new Error("Ethereum address is unavailable");
      return this._ensureKnownAddress(e), {
        fromAddress: e,
        toAddress: t.to ? l.ensureAddressString(t.to) : null,
        weiValue: null != t.value ? l.ensureBN(t.value) : new r.default(0),
        data: t.data ? l.ensureBuffer(t.data) : Buffer.alloc(0),
        nonce: null != t.nonce ? l.ensureIntNumber(t.nonce) : null,
        gasPriceInWei: null != t.gasPrice ? l.ensureBN(t.gasPrice) : null,
        gasLimit: null != t.gas ? l.ensureBN(t.gas) : null,
        chainId: this._chainId
      };
    }

    _requireAuthorization() {
      if (0 === this._addresses.length) throw new F.ProviderError("Unauthorized", F.ProviderErrorCode.UNAUTHORIZED);
    }

    _throwUnsupportedMethodError() {
      throw new F.ProviderError("Unsupported method", F.ProviderErrorCode.UNSUPPORTED_METHOD);
    }

    async _signEthereumMessage(t, e, n, i) {
      this._ensureKnownAddress(e);

      try {
        return {
          jsonrpc: "2.0",
          id: 0,
          result: (await this._relay.signEthereumMessage(t, e, n, i)).result
        };
      } catch (t) {
        if ("string" == typeof t.message && t.message.match(/(denied|rejected)/i)) throw new F.ProviderError("User denied message signature", F.ProviderErrorCode.USER_DENIED_REQUEST_SIGNATURE);
        throw t;
      }
    }

    async _ethereumAddressFromSignedMessage(t, e, n) {
      return {
        jsonrpc: "2.0",
        id: 0,
        result: (await this._relay.ethereumAddressFromSignedMessage(t, e, n)).result
      };
    }

    _eth_accounts() {
      return this._addresses;
    }

    _eth_coinbase() {
      return this.selectedAddress || null;
    }

    _net_version() {
      return this._chainId.toString(10);
    }

    async _eth_requestAccounts() {
      if (this._addresses.length > 0) return Promise.resolve({
        jsonrpc: "2.0",
        id: 0,
        result: this._addresses
      });
      let t;

      try {
        t = await this._relay.requestEthereumAccounts();
      } catch (t) {
        if ("string" == typeof t.message && t.message.match(/(denied|rejected)/i)) throw new F.ProviderError("User denied account authorization", F.ProviderErrorCode.USER_DENIED_REQUEST_ACCOUNTS);
        throw t;
      }

      if (!t.result) throw new Error("accounts received is empty");
      return this._setAddresses(t.result), {
        jsonrpc: "2.0",
        id: 0,
        result: this._addresses
      };
    }

    _eth_sign(t) {
      this._requireAuthorization();

      const e = l.ensureAddressString(t[0]),
            n = l.ensureBuffer(t[1]);
      return this._signEthereumMessage(n, e, !1);
    }

    _eth_ecRecover(t) {
      const e = l.ensureBuffer(t[0]),
            n = l.ensureBuffer(t[1]);
      return this._ethereumAddressFromSignedMessage(e, n, !1);
    }

    _personal_sign(t) {
      this._requireAuthorization();

      const e = l.ensureBuffer(t[0]),
            n = l.ensureAddressString(t[1]);
      return this._signEthereumMessage(e, n, !0);
    }

    _personal_ecRecover(t) {
      const e = l.ensureBuffer(t[0]),
            n = l.ensureBuffer(t[1]);
      return this._ethereumAddressFromSignedMessage(e, n, !0);
    }

    async _eth_signTransaction(t) {
      this._requireAuthorization();

      const e = this._prepareTransactionParams(t[0] || {});

      try {
        return {
          jsonrpc: "2.0",
          id: 0,
          result: (await this._relay.signEthereumTransaction(e)).result
        };
      } catch (t) {
        if ("string" == typeof t.message && t.message.match(/(denied|rejected)/i)) throw new F.ProviderError("User denied transaction signature", F.ProviderErrorCode.USER_DENIED_REQUEST_SIGNATURE);
        throw t;
      }
    }

    async _eth_sendRawTransaction(t) {
      const e = l.ensureBuffer(t[0]);
      return {
        jsonrpc: "2.0",
        id: 0,
        result: (await this._relay.submitEthereumTransaction(e, this._chainId)).result
      };
    }

    async _eth_sendTransaction(t) {
      this._requireAuthorization();

      const e = this._prepareTransactionParams(t[0] || {});

      try {
        return {
          jsonrpc: "2.0",
          id: 0,
          result: (await this._relay.signAndSubmitEthereumTransaction(e)).result
        };
      } catch (t) {
        if ("string" == typeof t.message && t.message.match(/(denied|rejected)/i)) throw new F.ProviderError("User denied transaction signature", F.ProviderErrorCode.USER_DENIED_REQUEST_SIGNATURE);
        throw t;
      }
    }

    async _eth_signTypedData_v1(t) {
      this._requireAuthorization();

      const e = t[0],
            n = l.ensureAddressString(t[1]);

      this._ensureKnownAddress(n);

      const i = o.default.hashForSignTypedDataLegacy({
        data: e
      }),
            r = JSON.stringify(e, null, 2);
      return this._signEthereumMessage(i, n, !1, r);
    }

    async _eth_signTypedData_v3(t) {
      this._requireAuthorization();

      const e = l.ensureAddressString(t[0]),
            n = t[1];

      this._ensureKnownAddress(e);

      const i = o.default.hashForSignTypedData_v3({
        data: n
      }),
            r = JSON.stringify(n, null, 2);
      return this._signEthereumMessage(i, e, !1, r);
    }

    async _eth_signTypedData_v4(t) {
      this._requireAuthorization();

      const e = l.ensureAddressString(t[0]),
            n = t[1];

      this._ensureKnownAddress(e);

      const i = o.default.hashForSignTypedData_v4({
        data: n
      }),
            r = JSON.stringify(n, null, 2);
      return this._signEthereumMessage(i, e, !1, r);
    }

    async _walletlink_arbitrary(t) {
      const e = t[0];
      if ("string" != typeof e) throw new Error("parameter must be a string");
      return {
        jsonrpc: "2.0",
        id: 0,
        result: await this.arbitraryRequest(e)
      };
    }

    _eth_uninstallFilter(t) {
      const e = l.ensureHexString(t[0]);
      return this._filterPolyfill.uninstallFilter(e);
    }

    async _eth_newFilter(t) {
      const e = t[0];
      return {
        jsonrpc: "2.0",
        id: 0,
        result: await this._filterPolyfill.newFilter(e)
      };
    }

    async _eth_newBlockFilter() {
      return {
        jsonrpc: "2.0",
        id: 0,
        result: await this._filterPolyfill.newBlockFilter()
      };
    }

    async _eth_newPendingTransactionFilter() {
      return {
        jsonrpc: "2.0",
        id: 0,
        result: await this._filterPolyfill.newPendingTransactionFilter()
      };
    }

    _eth_getFilterChanges(t) {
      const e = l.ensureHexString(t[0]);
      return this._filterPolyfill.getFilterChanges(e);
    }

    _eth_getFilterLogs(t) {
      const e = l.ensureHexString(t[0]);
      return this._filterPolyfill.getFilterLogs(e);
    }

  };
});
(0, _indexD3bd.e)(W);
W.WalletLinkProvider;
var q = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = '.-walletlink-css-reset,.-walletlink-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:transparent;background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;bottom:auto;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;content:normal;counter-increment:none;counter-reset:none;cursor:auto;direction:ltr;display:block;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;left:auto;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";right:auto;tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;top:auto;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;width:auto;word-spacing:normal;z-index:auto;all:initial;all:unset}.-walletlink-css-reset *{box-sizing:border-box;display:initial;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-walletlink-css-reset [class*=container]{margin:0;padding:0}.-walletlink-css-reset style{display:none}';
});
(0, _indexD3bd.e)(q);
var U = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(q);

  n.injectCssReset = function () {
    const t = document.createElement("style");
    t.type = "text/css", t.appendChild(document.createTextNode(r.default)), document.documentElement.appendChild(t);
  };
});
(0, _indexD3bd.e)(U);
U.injectCssReset;
var V = (0, _indexD3bd.d)(function (t, e) {
  var n;

  function i(t, e, i) {
    if (!i || typeof i.value !== n.typeOfFunction) throw new TypeError("Only methods can be decorated with @bind. <" + e + "> is not a method!");
    return {
      configurable: n.boolTrue,
      get: function () {
        var t = i.value.bind(this);
        return Object.defineProperty(this, e, {
          value: t,
          configurable: n.boolTrue,
          writable: n.boolTrue
        }), t;
      }
    };
  }

  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t.typeOfFunction = "function", t.boolTrue = !0;
  }(n || (n = {})), e.bind = i, e.default = i;
});
(0, _indexD3bd.e)(V);
V.bind;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var z = function (t, e) {
  return (z = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
  })(t, e);
};

function H(t, e) {
  function n() {
    this.constructor = t;
  }

  z(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
}

function $(t) {
  return "function" == typeof t;
}

var J = !1,
    K = {
  Promise: void 0,

  set useDeprecatedSynchronousErrorHandling(t) {
    t && new Error().stack;
    J = t;
  },

  get useDeprecatedSynchronousErrorHandling() {
    return J;
  }

};

function G(t) {
  setTimeout(function () {
    throw t;
  }, 0);
}

var Y = {
  closed: !0,
  next: function (t) {},
  error: function (t) {
    if (K.useDeprecatedSynchronousErrorHandling) throw t;
    G(t);
  },
  complete: function () {}
},
    Z = function () {
  return Array.isArray || function (t) {
    return t && "number" == typeof t.length;
  };
}();

function Q(t) {
  return null !== t && "object" == typeof t;
}

var X = function () {
  function t(t) {
    return Error.call(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function (t, e) {
      return e + 1 + ") " + t.toString();
    }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t, this;
  }

  return t.prototype = Object.create(Error.prototype), t;
}(),
    tt = function () {
  function t(t) {
    this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._unsubscribe = t);
  }

  return t.prototype.unsubscribe = function () {
    var e;

    if (!this.closed) {
      var n = this._parentOrParents,
          i = this._unsubscribe,
          r = this._subscriptions;
      if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof t) n.remove(this);else if (null !== n) for (var o = 0; o < n.length; ++o) {
        n[o].remove(this);
      }
      if ($(i)) try {
        i.call(this);
      } catch (t) {
        e = t instanceof X ? et(t.errors) : [t];
      }

      if (Z(r)) {
        o = -1;

        for (var s = r.length; ++o < s;) {
          var u = r[o];
          if (Q(u)) try {
            u.unsubscribe();
          } catch (t) {
            e = e || [], t instanceof X ? e = e.concat(et(t.errors)) : e.push(t);
          }
        }
      }

      if (e) throw new X(e);
    }
  }, t.prototype.add = function (e) {
    var n = e;
    if (!e) return t.EMPTY;

    switch (typeof e) {
      case "function":
        n = new t(e);

      case "object":
        if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
        if (this.closed) return n.unsubscribe(), n;

        if (!(n instanceof t)) {
          var i = n;
          (n = new t())._subscriptions = [i];
        }

        break;

      default:
        throw new Error("unrecognized teardown " + e + " added to Subscription.");
    }

    var r = n._parentOrParents;
    if (null === r) n._parentOrParents = this;else if (r instanceof t) {
      if (r === this) return n;
      n._parentOrParents = [r, this];
    } else {
      if (-1 !== r.indexOf(this)) return n;
      r.push(this);
    }
    var o = this._subscriptions;
    return null === o ? this._subscriptions = [n] : o.push(n), n;
  }, t.prototype.remove = function (t) {
    var e = this._subscriptions;

    if (e) {
      var n = e.indexOf(t);
      -1 !== n && e.splice(n, 1);
    }
  }, t.EMPTY = function (t) {
    return t.closed = !0, t;
  }(new t()), t;
}();

function et(t) {
  return t.reduce(function (t, e) {
    return t.concat(e instanceof X ? e.errors : e);
  }, []);
}

var nt = function () {
  return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
}(),
    it = function (t) {
  function e(n, i, r) {
    var o = t.call(this) || this;

    switch (o.syncErrorValue = null, o.syncErrorThrown = !1, o.syncErrorThrowable = !1, o.isStopped = !1, arguments.length) {
      case 0:
        o.destination = Y;
        break;

      case 1:
        if (!n) {
          o.destination = Y;
          break;
        }

        if ("object" == typeof n) {
          n instanceof e ? (o.syncErrorThrowable = n.syncErrorThrowable, o.destination = n, n.add(o)) : (o.syncErrorThrowable = !0, o.destination = new rt(o, n));
          break;
        }

      default:
        o.syncErrorThrowable = !0, o.destination = new rt(o, n, i, r);
    }

    return o;
  }

  return H(e, t), e.prototype[nt] = function () {
    return this;
  }, e.create = function (t, n, i) {
    var r = new e(t, n, i);
    return r.syncErrorThrowable = !1, r;
  }, e.prototype.next = function (t) {
    this.isStopped || this._next(t);
  }, e.prototype.error = function (t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, e.prototype.complete = function () {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function () {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this));
  }, e.prototype._next = function (t) {
    this.destination.next(t);
  }, e.prototype._error = function (t) {
    this.destination.error(t), this.unsubscribe();
  }, e.prototype._complete = function () {
    this.destination.complete(), this.unsubscribe();
  }, e.prototype._unsubscribeAndRecycle = function () {
    var t = this._parentOrParents;
    return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this;
  }, e;
}(tt),
    rt = function (t) {
  function e(e, n, i, r) {
    var o,
        s = t.call(this) || this;
    s._parentSubscriber = e;
    var u = s;
    return $(n) ? o = n : n && (o = n.next, i = n.error, r = n.complete, n !== Y && ($((u = Object.create(n)).unsubscribe) && s.add(u.unsubscribe.bind(u)), u.unsubscribe = s.unsubscribe.bind(s))), s._context = u, s._next = o, s._error = i, s._complete = r, s;
  }

  return H(e, t), e.prototype.next = function (t) {
    if (!this.isStopped && this._next) {
      var e = this._parentSubscriber;
      K.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t);
    }
  }, e.prototype.error = function (t) {
    if (!this.isStopped) {
      var e = this._parentSubscriber,
          n = K.useDeprecatedSynchronousErrorHandling;
      if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : G(t), this.unsubscribe();else {
        if (this.unsubscribe(), n) throw t;
        G(t);
      }
    }
  }, e.prototype.complete = function () {
    var t = this;

    if (!this.isStopped) {
      var e = this._parentSubscriber;

      if (this._complete) {
        var n = function () {
          return t._complete.call(t._context);
        };

        K.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, n), this.unsubscribe()) : (this.__tryOrUnsub(n), this.unsubscribe());
      } else this.unsubscribe();
    }
  }, e.prototype.__tryOrUnsub = function (t, e) {
    try {
      t.call(this._context, e);
    } catch (t) {
      if (this.unsubscribe(), K.useDeprecatedSynchronousErrorHandling) throw t;
      G(t);
    }
  }, e.prototype.__tryOrSetError = function (t, e, n) {
    if (!K.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");

    try {
      e.call(this._context, n);
    } catch (e) {
      return K.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = e, t.syncErrorThrown = !0, !0) : (G(e), !0);
    }

    return !1;
  }, e.prototype._unsubscribe = function () {
    var t = this._parentSubscriber;
    this._context = null, this._parentSubscriber = null, t.unsubscribe();
  }, e;
}(it);

function ot(t) {
  for (; t;) {
    var e = t,
        n = e.closed,
        i = e.destination,
        r = e.isStopped;
    if (n || r) return !1;
    t = i && i instanceof it ? i : null;
  }

  return !0;
}

var st = function () {
  return "function" == typeof Symbol && Symbol.observable || "@@observable";
}();

function ut(t) {
  return t;
}

function at() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

  return ct(t);
}

function ct(t) {
  return 0 === t.length ? ut : 1 === t.length ? t[0] : function (e) {
    return t.reduce(function (t, e) {
      return e(t);
    }, e);
  };
}

var lt = function () {
  function t(t) {
    this._isScalar = !1, t && (this._subscribe = t);
  }

  return t.prototype.lift = function (e) {
    var n = new t();
    return n.source = this, n.operator = e, n;
  }, t.prototype.subscribe = function (t, e, n) {
    var i = this.operator,
        r = function (t, e, n) {
      if (t) {
        if (t instanceof it) return t;
        if (t[nt]) return t[nt]();
      }

      return t || e || n ? new it(t, e, n) : new it(Y);
    }(t, e, n);

    if (i ? r.add(i.call(r, this.source)) : r.add(this.source || K.useDeprecatedSynchronousErrorHandling && !r.syncErrorThrowable ? this._subscribe(r) : this._trySubscribe(r)), K.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable && (r.syncErrorThrowable = !1, r.syncErrorThrown)) throw r.syncErrorValue;
    return r;
  }, t.prototype._trySubscribe = function (t) {
    try {
      return this._subscribe(t);
    } catch (e) {
      K.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), ot(t) ? t.error(e) : console.warn(e);
    }
  }, t.prototype.forEach = function (t, e) {
    var n = this;
    return new (e = ht(e))(function (e, i) {
      var r;
      r = n.subscribe(function (e) {
        try {
          t(e);
        } catch (t) {
          i(t), r && r.unsubscribe();
        }
      }, i, e);
    });
  }, t.prototype._subscribe = function (t) {
    var e = this.source;
    return e && e.subscribe(t);
  }, t.prototype[st] = function () {
    return this;
  }, t.prototype.pipe = function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return 0 === t.length ? this : ct(t)(this);
  }, t.prototype.toPromise = function (t) {
    var e = this;
    return new (t = ht(t))(function (t, n) {
      var i;
      e.subscribe(function (t) {
        return i = t;
      }, function (t) {
        return n(t);
      }, function () {
        return t(i);
      });
    });
  }, t.create = function (e) {
    return new t(e);
  }, t;
}();

function ht(t) {
  if (t || (t = K.Promise || Promise), !t) throw new Error("no Promise impl found");
  return t;
}

var ft = function () {
  function t() {
    return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this;
  }

  return t.prototype = Object.create(Error.prototype), t;
}(),
    dt = function (t) {
  function e(e, n) {
    var i = t.call(this) || this;
    return i.subject = e, i.subscriber = n, i.closed = !1, i;
  }

  return H(e, t), e.prototype.unsubscribe = function () {
    if (!this.closed) {
      this.closed = !0;
      var t = this.subject,
          e = t.observers;

      if (this.subject = null, e && 0 !== e.length && !t.isStopped && !t.closed) {
        var n = e.indexOf(this.subscriber);
        -1 !== n && e.splice(n, 1);
      }
    }
  }, e;
}(tt),
    pt = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    return n.destination = e, n;
  }

  return H(e, t), e;
}(it),
    mt = function (t) {
  function e() {
    var e = t.call(this) || this;
    return e.observers = [], e.closed = !1, e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }

  return H(e, t), e.prototype[nt] = function () {
    return new pt(this);
  }, e.prototype.lift = function (t) {
    var e = new bt(this, this);
    return e.operator = t, e;
  }, e.prototype.next = function (t) {
    if (this.closed) throw new ft();
    if (!this.isStopped) for (var e = this.observers, n = e.length, i = e.slice(), r = 0; r < n; r++) i[r].next(t);
  }, e.prototype.error = function (t) {
    if (this.closed) throw new ft();
    this.hasError = !0, this.thrownError = t, this.isStopped = !0;

    for (var e = this.observers, n = e.length, i = e.slice(), r = 0; r < n; r++) i[r].error(t);

    this.observers.length = 0;
  }, e.prototype.complete = function () {
    if (this.closed) throw new ft();
    this.isStopped = !0;

    for (var t = this.observers, e = t.length, n = t.slice(), i = 0; i < e; i++) n[i].complete();

    this.observers.length = 0;
  }, e.prototype.unsubscribe = function () {
    this.isStopped = !0, this.closed = !0, this.observers = null;
  }, e.prototype._trySubscribe = function (e) {
    if (this.closed) throw new ft();
    return t.prototype._trySubscribe.call(this, e);
  }, e.prototype._subscribe = function (t) {
    if (this.closed) throw new ft();
    return this.hasError ? (t.error(this.thrownError), tt.EMPTY) : this.isStopped ? (t.complete(), tt.EMPTY) : (this.observers.push(t), new dt(this, t));
  }, e.prototype.asObservable = function () {
    var t = new lt();
    return t.source = this, t;
  }, e.create = function (t, e) {
    return new bt(t, e);
  }, e;
}(lt),
    bt = function (t) {
  function e(e, n) {
    var i = t.call(this) || this;
    return i.destination = e, i.source = n, i;
  }

  return H(e, t), e.prototype.next = function (t) {
    var e = this.destination;
    e && e.next && e.next(t);
  }, e.prototype.error = function (t) {
    var e = this.destination;
    e && e.error && this.destination.error(t);
  }, e.prototype.complete = function () {
    var t = this.destination;
    t && t.complete && this.destination.complete();
  }, e.prototype._subscribe = function (t) {
    return this.source ? this.source.subscribe(t) : tt.EMPTY;
  }, e;
}(mt);

function gt() {
  return function (t) {
    return t.lift(new vt(t));
  };
}

var vt = function () {
  function t(t) {
    this.connectable = t;
  }

  return t.prototype.call = function (t, e) {
    var n = this.connectable;
    n._refCount++;
    var i = new yt(t, n),
        r = e.subscribe(i);
    return i.closed || (i.connection = n.connect()), r;
  }, t;
}(),
    yt = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.connectable = n, i;
  }

  return H(e, t), e.prototype._unsubscribe = function () {
    var t = this.connectable;

    if (t) {
      this.connectable = null;
      var e = t._refCount;
      if (e <= 0) this.connection = null;else if (t._refCount = e - 1, e > 1) this.connection = null;else {
        var n = this.connection,
            i = t._connection;
        this.connection = null, !i || n && i !== n || i.unsubscribe();
      }
    } else this.connection = null;
  }, e;
}(it),
    wt = function (t) {
  function e(e, n) {
    var i = t.call(this) || this;
    return i.source = e, i.subjectFactory = n, i._refCount = 0, i._isComplete = !1, i;
  }

  return H(e, t), e.prototype._subscribe = function (t) {
    return this.getSubject().subscribe(t);
  }, e.prototype.getSubject = function () {
    var t = this._subject;
    return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject;
  }, e.prototype.connect = function () {
    var t = this._connection;
    return t || (this._isComplete = !1, (t = this._connection = new tt()).add(this.source.subscribe(new kt(this.getSubject(), this))), t.closed && (this._connection = null, t = tt.EMPTY)), t;
  }, e.prototype.refCount = function () {
    return gt()(this);
  }, e;
}(lt),
    _t = function () {
  var t = wt.prototype;
  return {
    operator: {
      value: null
    },
    _refCount: {
      value: 0,
      writable: !0
    },
    _subject: {
      value: null,
      writable: !0
    },
    _connection: {
      value: null,
      writable: !0
    },
    _subscribe: {
      value: t._subscribe
    },
    _isComplete: {
      value: t._isComplete,
      writable: !0
    },
    getSubject: {
      value: t.getSubject
    },
    connect: {
      value: t.connect
    },
    refCount: {
      value: t.refCount
    }
  };
}(),
    kt = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.connectable = n, i;
  }

  return H(e, t), e.prototype._error = function (e) {
    this._unsubscribe(), t.prototype._error.call(this, e);
  }, e.prototype._complete = function () {
    this.connectable._isComplete = !0, this._unsubscribe(), t.prototype._complete.call(this);
  }, e.prototype._unsubscribe = function () {
    var t = this.connectable;

    if (t) {
      this.connectable = null;
      var e = t._connection;
      t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe();
    }
  }, e;
}(pt);

var xt = function () {
  function t(t, e, n, i) {
    this.keySelector = t, this.elementSelector = e, this.durationSelector = n, this.subjectSelector = i;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new St(t, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
  }, t;
}(),
    St = function (t) {
  function e(e, n, i, r, o) {
    var s = t.call(this, e) || this;
    return s.keySelector = n, s.elementSelector = i, s.durationSelector = r, s.subjectSelector = o, s.groups = null, s.attemptedToUnsubscribe = !1, s.count = 0, s;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e;

    try {
      e = this.keySelector(t);
    } catch (t) {
      return void this.error(t);
    }

    this._group(t, e);
  }, e.prototype._group = function (t, e) {
    var n = this.groups;
    n || (n = this.groups = new Map());
    var i,
        r = n.get(e);
    if (this.elementSelector) try {
      i = this.elementSelector(t);
    } catch (t) {
      this.error(t);
    } else i = t;

    if (!r) {
      r = this.subjectSelector ? this.subjectSelector() : new mt(), n.set(e, r);
      var o = new Et(e, r, this);

      if (this.destination.next(o), this.durationSelector) {
        var s = void 0;

        try {
          s = this.durationSelector(new Et(e, r));
        } catch (t) {
          return void this.error(t);
        }

        this.add(s.subscribe(new Mt(e, r, this)));
      }
    }

    r.closed || r.next(i);
  }, e.prototype._error = function (t) {
    var e = this.groups;
    e && (e.forEach(function (e, n) {
      e.error(t);
    }), e.clear()), this.destination.error(t);
  }, e.prototype._complete = function () {
    var t = this.groups;
    t && (t.forEach(function (t, e) {
      t.complete();
    }), t.clear()), this.destination.complete();
  }, e.prototype.removeGroup = function (t) {
    this.groups.delete(t);
  }, e.prototype.unsubscribe = function () {
    this.closed || (this.attemptedToUnsubscribe = !0, 0 === this.count && t.prototype.unsubscribe.call(this));
  }, e;
}(it),
    Mt = function (t) {
  function e(e, n, i) {
    var r = t.call(this, n) || this;
    return r.key = e, r.group = n, r.parent = i, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.complete();
  }, e.prototype._unsubscribe = function () {
    var t = this.parent,
        e = this.key;
    this.key = this.parent = null, t && t.removeGroup(e);
  }, e;
}(it),
    Et = function (t) {
  function e(e, n, i) {
    var r = t.call(this) || this;
    return r.key = e, r.groupSubject = n, r.refCountSubscription = i, r;
  }

  return H(e, t), e.prototype._subscribe = function (t) {
    var e = new tt(),
        n = this.refCountSubscription,
        i = this.groupSubject;
    return n && !n.closed && e.add(new Ct(n)), e.add(i.subscribe(t)), e;
  }, e;
}(lt),
    Ct = function (t) {
  function e(e) {
    var n = t.call(this) || this;
    return n.parent = e, e.count++, n;
  }

  return H(e, t), e.prototype.unsubscribe = function () {
    var e = this.parent;
    e.closed || this.closed || (t.prototype.unsubscribe.call(this), e.count -= 1, 0 === e.count && e.attemptedToUnsubscribe && e.unsubscribe());
  }, e;
}(tt),
    Nt = function (t) {
  function e(e) {
    var n = t.call(this) || this;
    return n._value = e, n;
  }

  return H(e, t), Object.defineProperty(e.prototype, "value", {
    get: function () {
      return this.getValue();
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype._subscribe = function (e) {
    var n = t.prototype._subscribe.call(this, e);

    return n && !n.closed && e.next(this._value), n;
  }, e.prototype.getValue = function () {
    if (this.hasError) throw this.thrownError;
    if (this.closed) throw new ft();
    return this._value;
  }, e.prototype.next = function (e) {
    t.prototype.next.call(this, this._value = e);
  }, e;
}(mt),
    Tt = function (t) {
  function e(e, n) {
    var i = t.call(this, e, n) || this;
    return i.scheduler = e, i.work = n, i.pending = !1, i;
  }

  return H(e, t), e.prototype.schedule = function (t, e) {
    if (void 0 === e && (e = 0), this.closed) return this;
    this.state = t;
    var n = this.id,
        i = this.scheduler;
    return null != n && (this.id = this.recycleAsyncId(i, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(i, this.id, e), this;
  }, e.prototype.requestAsyncId = function (t, e, n) {
    return void 0 === n && (n = 0), setInterval(t.flush.bind(t, this), n);
  }, e.prototype.recycleAsyncId = function (t, e, n) {
    if (void 0 === n && (n = 0), null !== n && this.delay === n && !1 === this.pending) return e;
    clearInterval(e);
  }, e.prototype.execute = function (t, e) {
    if (this.closed) return new Error("executing a cancelled action");
    this.pending = !1;

    var n = this._execute(t, e);

    if (n) return n;
    !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, e.prototype._execute = function (t, e) {
    var n = !1,
        i = void 0;

    try {
      this.work(t);
    } catch (t) {
      n = !0, i = !!t && t || new Error(t);
    }

    if (n) return this.unsubscribe(), i;
  }, e.prototype._unsubscribe = function () {
    var t = this.id,
        e = this.scheduler,
        n = e.actions,
        i = n.indexOf(this);
    this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== i && n.splice(i, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null;
  }, e;
}(function (t) {
  function e(e, n) {
    return t.call(this) || this;
  }

  return H(e, t), e.prototype.schedule = function (t, e) {
    return this;
  }, e;
}(tt)),
    It = function (t) {
  function e(e, n) {
    var i = t.call(this, e, n) || this;
    return i.scheduler = e, i.work = n, i;
  }

  return H(e, t), e.prototype.schedule = function (e, n) {
    return void 0 === n && (n = 0), n > 0 ? t.prototype.schedule.call(this, e, n) : (this.delay = n, this.state = e, this.scheduler.flush(this), this);
  }, e.prototype.execute = function (e, n) {
    return n > 0 || this.closed ? t.prototype.execute.call(this, e, n) : this._execute(e, n);
  }, e.prototype.requestAsyncId = function (e, n, i) {
    return void 0 === i && (i = 0), null !== i && i > 0 || null === i && this.delay > 0 ? t.prototype.requestAsyncId.call(this, e, n, i) : e.flush(this);
  }, e;
}(Tt),
    At = function () {
  function t(e, n) {
    void 0 === n && (n = t.now), this.SchedulerAction = e, this.now = n;
  }

  return t.prototype.schedule = function (t, e, n) {
    return void 0 === e && (e = 0), new this.SchedulerAction(this, t).schedule(n, e);
  }, t.now = function () {
    return Date.now();
  }, t;
}(),
    Ot = function (t) {
  function e(n, i) {
    void 0 === i && (i = At.now);
    var r = t.call(this, n, function () {
      return e.delegate && e.delegate !== r ? e.delegate.now() : i();
    }) || this;
    return r.actions = [], r.active = !1, r.scheduled = void 0, r;
  }

  return H(e, t), e.prototype.schedule = function (n, i, r) {
    return void 0 === i && (i = 0), e.delegate && e.delegate !== this ? e.delegate.schedule(n, i, r) : t.prototype.schedule.call(this, n, i, r);
  }, e.prototype.flush = function (t) {
    var e = this.actions;
    if (this.active) e.push(t);else {
      var n;
      this.active = !0;

      do {
        if (n = t.execute(t.state, t.delay)) break;
      } while (t = e.shift());

      if (this.active = !1, n) {
        for (; t = e.shift();) t.unsubscribe();

        throw n;
      }
    }
  }, e;
}(At),
    Pt = new (function (t) {
  function e() {
    return null !== t && t.apply(this, arguments) || this;
  }

  return H(e, t), e;
}(Ot))(It),
    Rt = new lt(function (t) {
  return t.complete();
});

function jt(t) {
  return t ? function (t) {
    return new lt(function (e) {
      return t.schedule(function () {
        return e.complete();
      });
    });
  }(t) : Rt;
}

function Bt(t) {
  return t && "function" == typeof t.schedule;
}

var Dt,
    Lt = function (t) {
  return function (e) {
    for (var n = 0, i = t.length; n < i && !e.closed; n++) e.next(t[n]);

    e.complete();
  };
};

function Ft(t, e) {
  return new lt(function (n) {
    var i = new tt(),
        r = 0;
    return i.add(e.schedule(function () {
      r !== t.length ? (n.next(t[r++]), n.closed || i.add(this.schedule())) : n.complete();
    })), i;
  });
}

function Wt(t, e) {
  return e ? Ft(t, e) : new lt(Lt(t));
}

function qt() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

  var n = t[t.length - 1];
  return Bt(n) ? (t.pop(), Ft(t, n)) : Wt(t);
}

function Ut(t, e) {
  return new lt(e ? function (n) {
    return e.schedule(Vt, 0, {
      error: t,
      subscriber: n
    });
  } : function (e) {
    return e.error(t);
  });
}

function Vt(t) {
  var e = t.error;
  t.subscriber.error(e);
}

Dt || (Dt = {});

var zt = function () {
  function t(t, e, n) {
    this.kind = t, this.value = e, this.error = n, this.hasValue = "N" === t;
  }

  return t.prototype.observe = function (t) {
    switch (this.kind) {
      case "N":
        return t.next && t.next(this.value);

      case "E":
        return t.error && t.error(this.error);

      case "C":
        return t.complete && t.complete();
    }
  }, t.prototype.do = function (t, e, n) {
    switch (this.kind) {
      case "N":
        return t && t(this.value);

      case "E":
        return e && e(this.error);

      case "C":
        return n && n();
    }
  }, t.prototype.accept = function (t, e, n) {
    return t && "function" == typeof t.next ? this.observe(t) : this.do(t, e, n);
  }, t.prototype.toObservable = function () {
    switch (this.kind) {
      case "N":
        return qt(this.value);

      case "E":
        return Ut(this.error);

      case "C":
        return jt();
    }

    throw new Error("unexpected notification kind value");
  }, t.createNext = function (e) {
    return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
  }, t.createError = function (e) {
    return new t("E", void 0, e);
  }, t.createComplete = function () {
    return t.completeNotification;
  }, t.completeNotification = new t("C"), t.undefinedValueNotification = new t("N", void 0), t;
}();

var Ht = function () {
  function t(t, e) {
    void 0 === e && (e = 0), this.scheduler = t, this.delay = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new $t(t, this.scheduler, this.delay));
  }, t;
}(),
    $t = function (t) {
  function e(e, n, i) {
    void 0 === i && (i = 0);
    var r = t.call(this, e) || this;
    return r.scheduler = n, r.delay = i, r;
  }

  return H(e, t), e.dispatch = function (t) {
    var e = t.notification,
        n = t.destination;
    e.observe(n), this.unsubscribe();
  }, e.prototype.scheduleMessage = function (t) {
    this.destination.add(this.scheduler.schedule(e.dispatch, this.delay, new Jt(t, this.destination)));
  }, e.prototype._next = function (t) {
    this.scheduleMessage(zt.createNext(t));
  }, e.prototype._error = function (t) {
    this.scheduleMessage(zt.createError(t)), this.unsubscribe();
  }, e.prototype._complete = function () {
    this.scheduleMessage(zt.createComplete()), this.unsubscribe();
  }, e;
}(it),
    Jt = function () {
  return function (t, e) {
    this.notification = t, this.destination = e;
  };
}(),
    Kt = function (t) {
  function e(e, n, i) {
    void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === n && (n = Number.POSITIVE_INFINITY);
    var r = t.call(this) || this;
    return r.scheduler = i, r._events = [], r._infiniteTimeWindow = !1, r._bufferSize = e < 1 ? 1 : e, r._windowTime = n < 1 ? 1 : n, n === Number.POSITIVE_INFINITY ? (r._infiniteTimeWindow = !0, r.next = r.nextInfiniteTimeWindow) : r.next = r.nextTimeWindow, r;
  }

  return H(e, t), e.prototype.nextInfiniteTimeWindow = function (e) {
    var n = this._events;
    n.push(e), n.length > this._bufferSize && n.shift(), t.prototype.next.call(this, e);
  }, e.prototype.nextTimeWindow = function (e) {
    this._events.push(new Gt(this._getNow(), e)), this._trimBufferThenGetEvents(), t.prototype.next.call(this, e);
  }, e.prototype._subscribe = function (t) {
    var e,
        n = this._infiniteTimeWindow,
        i = n ? this._events : this._trimBufferThenGetEvents(),
        r = this.scheduler,
        o = i.length;
    if (this.closed) throw new ft();
    if (this.isStopped || this.hasError ? e = tt.EMPTY : (this.observers.push(t), e = new dt(this, t)), r && t.add(t = new $t(t, r)), n) for (var s = 0; s < o && !t.closed; s++) t.next(i[s]);else for (s = 0; s < o && !t.closed; s++) t.next(i[s].value);
    return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), e;
  }, e.prototype._getNow = function () {
    return (this.scheduler || Pt).now();
  }, e.prototype._trimBufferThenGetEvents = function () {
    for (var t = this._getNow(), e = this._bufferSize, n = this._windowTime, i = this._events, r = i.length, o = 0; o < r && !(t - i[o].time < n);) o++;

    return r > e && (o = Math.max(o, r - e)), o > 0 && i.splice(0, o), i;
  }, e;
}(mt),
    Gt = function () {
  return function (t, e) {
    this.time = t, this.value = e;
  };
}(),
    Yt = function (t) {
  function e() {
    var e = null !== t && t.apply(this, arguments) || this;
    return e.value = null, e.hasNext = !1, e.hasCompleted = !1, e;
  }

  return H(e, t), e.prototype._subscribe = function (e) {
    return this.hasError ? (e.error(this.thrownError), tt.EMPTY) : this.hasCompleted && this.hasNext ? (e.next(this.value), e.complete(), tt.EMPTY) : t.prototype._subscribe.call(this, e);
  }, e.prototype.next = function (t) {
    this.hasCompleted || (this.value = t, this.hasNext = !0);
  }, e.prototype.error = function (e) {
    this.hasCompleted || t.prototype.error.call(this, e);
  }, e.prototype.complete = function () {
    this.hasCompleted = !0, this.hasNext && t.prototype.next.call(this, this.value), t.prototype.complete.call(this);
  }, e;
}(mt),
    Zt = 1,
    Qt = function () {
  return Promise.resolve();
}(),
    Xt = {};

function te(t) {
  return t in Xt && (delete Xt[t], !0);
}

var ee = function (t) {
  var e = Zt++;
  return Xt[e] = !0, Qt.then(function () {
    return te(e) && t();
  }), e;
},
    ne = function (t) {
  te(t);
},
    ie = function (t) {
  function e(e, n) {
    var i = t.call(this, e, n) || this;
    return i.scheduler = e, i.work = n, i;
  }

  return H(e, t), e.prototype.requestAsyncId = function (e, n, i) {
    return void 0 === i && (i = 0), null !== i && i > 0 ? t.prototype.requestAsyncId.call(this, e, n, i) : (e.actions.push(this), e.scheduled || (e.scheduled = ee(e.flush.bind(e, null))));
  }, e.prototype.recycleAsyncId = function (e, n, i) {
    if (void 0 === i && (i = 0), null !== i && i > 0 || null === i && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, n, i);
    0 === e.actions.length && (ne(n), e.scheduled = void 0);
  }, e;
}(Tt),
    re = new (function (t) {
  function e() {
    return null !== t && t.apply(this, arguments) || this;
  }

  return H(e, t), e.prototype.flush = function (t) {
    this.active = !0, this.scheduled = void 0;
    var e,
        n = this.actions,
        i = -1,
        r = n.length;
    t = t || n.shift();

    do {
      if (e = t.execute(t.state, t.delay)) break;
    } while (++i < r && (t = n.shift()));

    if (this.active = !1, e) {
      for (; ++i < r && (t = n.shift());) t.unsubscribe();

      throw e;
    }
  }, e;
}(Ot))(ie),
    oe = new Ot(Tt),
    se = function (t) {
  function e(e, n) {
    var i = t.call(this, e, n) || this;
    return i.scheduler = e, i.work = n, i;
  }

  return H(e, t), e.prototype.requestAsyncId = function (e, n, i) {
    return void 0 === i && (i = 0), null !== i && i > 0 ? t.prototype.requestAsyncId.call(this, e, n, i) : (e.actions.push(this), e.scheduled || (e.scheduled = requestAnimationFrame(function () {
      return e.flush(null);
    })));
  }, e.prototype.recycleAsyncId = function (e, n, i) {
    if (void 0 === i && (i = 0), null !== i && i > 0 || null === i && this.delay > 0) return t.prototype.recycleAsyncId.call(this, e, n, i);
    0 === e.actions.length && (cancelAnimationFrame(n), e.scheduled = void 0);
  }, e;
}(Tt),
    ue = new (function (t) {
  function e() {
    return null !== t && t.apply(this, arguments) || this;
  }

  return H(e, t), e.prototype.flush = function (t) {
    this.active = !0, this.scheduled = void 0;
    var e,
        n = this.actions,
        i = -1,
        r = n.length;
    t = t || n.shift();

    do {
      if (e = t.execute(t.state, t.delay)) break;
    } while (++i < r && (t = n.shift()));

    if (this.active = !1, e) {
      for (; ++i < r && (t = n.shift());) t.unsubscribe();

      throw e;
    }
  }, e;
}(Ot))(se),
    ae = function (t) {
  function e(e, n) {
    void 0 === e && (e = ce), void 0 === n && (n = Number.POSITIVE_INFINITY);
    var i = t.call(this, e, function () {
      return i.frame;
    }) || this;
    return i.maxFrames = n, i.frame = 0, i.index = -1, i;
  }

  return H(e, t), e.prototype.flush = function () {
    for (var t, e, n = this.actions, i = this.maxFrames; (e = n[0]) && e.delay <= i && (n.shift(), this.frame = e.delay, !(t = e.execute(e.state, e.delay))););

    if (t) {
      for (; e = n.shift();) e.unsubscribe();

      throw t;
    }
  }, e.frameTimeFactor = 10, e;
}(Ot),
    ce = function (t) {
  function e(e, n, i) {
    void 0 === i && (i = e.index += 1);
    var r = t.call(this, e, n) || this;
    return r.scheduler = e, r.work = n, r.index = i, r.active = !0, r.index = e.index = i, r;
  }

  return H(e, t), e.prototype.schedule = function (n, i) {
    if (void 0 === i && (i = 0), !this.id) return t.prototype.schedule.call(this, n, i);
    this.active = !1;
    var r = new e(this.scheduler, this.work);
    return this.add(r), r.schedule(n, i);
  }, e.prototype.requestAsyncId = function (t, n, i) {
    void 0 === i && (i = 0), this.delay = t.frame + i;
    var r = t.actions;
    return r.push(this), r.sort(e.sortActions), !0;
  }, e.prototype.recycleAsyncId = function (t, e, n) {}, e.prototype._execute = function (e, n) {
    if (!0 === this.active) return t.prototype._execute.call(this, e, n);
  }, e.sortActions = function (t, e) {
    return t.delay === e.delay ? t.index === e.index ? 0 : t.index > e.index ? 1 : -1 : t.delay > e.delay ? 1 : -1;
  }, e;
}(Tt);

function le() {}

var he = function () {
  function t() {
    return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this;
  }

  return t.prototype = Object.create(Error.prototype), t;
}(),
    fe = function () {
  function t() {
    return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this;
  }

  return t.prototype = Object.create(Error.prototype), t;
}(),
    de = function () {
  function t() {
    return Error.call(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this;
  }

  return t.prototype = Object.create(Error.prototype), t;
}();

function pe(t, e) {
  return function (n) {
    if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
    return n.lift(new me(t, e));
  };
}

var me = function () {
  function t(t, e) {
    this.project = t, this.thisArg = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new be(t, this.project, this.thisArg));
  }, t;
}(),
    be = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.project = n, r.count = 0, r.thisArg = i || r, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e;

    try {
      e = this.project.call(this.thisArg, t, this.count++);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.destination.next(e);
  }, e;
}(it);

function ge(t) {
  var e = this,
      n = t.args,
      i = t.subscriber,
      r = t.params,
      o = r.callbackFunc,
      s = r.context,
      u = r.scheduler,
      a = r.subject;

  if (!a) {
    a = r.subject = new Yt();

    try {
      o.apply(s, n.concat([function () {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];

        var i = t.length <= 1 ? t[0] : t;
        e.add(u.schedule(ve, 0, {
          value: i,
          subject: a
        }));
      }]));
    } catch (t) {
      a.error(t);
    }
  }

  this.add(a.subscribe(i));
}

function ve(t) {
  var e = t.value,
      n = t.subject;
  n.next(e), n.complete();
}

function ye(t) {
  var e = this,
      n = t.params,
      i = t.subscriber,
      r = t.context,
      o = n.callbackFunc,
      s = n.args,
      u = n.scheduler,
      a = n.subject;

  if (!a) {
    a = n.subject = new Yt();

    try {
      o.apply(r, s.concat([function () {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];

        var i = t.shift();
        if (i) e.add(u.schedule(_e, 0, {
          err: i,
          subject: a
        }));else {
          var r = t.length <= 1 ? t[0] : t;
          e.add(u.schedule(we, 0, {
            value: r,
            subject: a
          }));
        }
      }]));
    } catch (t) {
      this.add(u.schedule(_e, 0, {
        err: t,
        subject: a
      }));
    }
  }

  this.add(a.subscribe(i));
}

function we(t) {
  var e = t.value,
      n = t.subject;
  n.next(e), n.complete();
}

function _e(t) {
  var e = t.err;
  t.subject.error(e);
}

var ke = function (t) {
  function e() {
    return null !== t && t.apply(this, arguments) || this;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.destination.next(e);
  }, e.prototype.notifyError = function (t, e) {
    this.destination.error(t);
  }, e.prototype.notifyComplete = function (t) {
    this.destination.complete();
  }, e;
}(it),
    xe = function (t) {
  function e(e, n, i) {
    var r = t.call(this) || this;
    return r.parent = e, r.outerValue = n, r.outerIndex = i, r.index = 0, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this);
  }, e.prototype._error = function (t) {
    this.parent.notifyError(t, this), this.unsubscribe();
  }, e.prototype._complete = function () {
    this.parent.notifyComplete(this), this.unsubscribe();
  }, e;
}(it);

function Se() {
  return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
}

var Me = Se(),
    Ee = function (t) {
  return t && "number" == typeof t.length && "function" != typeof t;
};

function Ce(t) {
  return !!t && "function" != typeof t.subscribe && "function" == typeof t.then;
}

var Ne = function (t) {
  if (t && "function" == typeof t[st]) return i = t, function (t) {
    var e = i[st]();
    if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
    return e.subscribe(t);
  };
  if (Ee(t)) return Lt(t);
  if (Ce(t)) return n = t, function (t) {
    return n.then(function (e) {
      t.closed || (t.next(e), t.complete());
    }, function (e) {
      return t.error(e);
    }).then(null, G), t;
  };
  if (t && "function" == typeof t[Me]) return e = t, function (t) {
    for (var n = e[Me]();;) {
      var i = n.next();

      if (i.done) {
        t.complete();
        break;
      }

      if (t.next(i.value), t.closed) break;
    }

    return "function" == typeof n.return && t.add(function () {
      n.return && n.return();
    }), t;
  };
  var e,
      n,
      i,
      r = Q(t) ? "an invalid object" : "'" + t + "'";
  throw new TypeError("You provided " + r + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.");
};

function Te(t, e, n, i, r) {
  if (void 0 === r && (r = new xe(t, n, i)), !r.closed) return e instanceof lt ? e.subscribe(r) : Ne(e)(r);
}

var Ie = {};

var Ae = function () {
  function t(t) {
    this.resultSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Oe(t, this.resultSelector));
  }, t;
}(),
    Oe = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.resultSelector = n, i.active = 0, i.values = [], i.observables = [], i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.values.push(Ie), this.observables.push(t);
  }, e.prototype._complete = function () {
    var t = this.observables,
        e = t.length;
    if (0 === e) this.destination.complete();else {
      this.active = e, this.toRespond = e;

      for (var n = 0; n < e; n++) {
        var i = t[n];
        this.add(Te(this, i, i, n));
      }
    }
  }, e.prototype.notifyComplete = function (t) {
    0 == (this.active -= 1) && this.destination.complete();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    var o = this.values,
        s = o[n],
        u = this.toRespond ? s === Ie ? --this.toRespond : this.toRespond : 0;
    o[n] = e, 0 === u && (this.resultSelector ? this._tryResultSelector(o) : this.destination.next(o.slice()));
  }, e.prototype._tryResultSelector = function (t) {
    var e;

    try {
      e = this.resultSelector.apply(this, t);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.destination.next(e);
  }, e;
}(ke);

function Pe(t, e) {
  if (null != t) {
    if (function (t) {
      return t && "function" == typeof t[st];
    }(t)) return function (t, e) {
      return new lt(function (n) {
        var i = new tt();
        return i.add(e.schedule(function () {
          var r = t[st]();
          i.add(r.subscribe({
            next: function (t) {
              i.add(e.schedule(function () {
                return n.next(t);
              }));
            },
            error: function (t) {
              i.add(e.schedule(function () {
                return n.error(t);
              }));
            },
            complete: function () {
              i.add(e.schedule(function () {
                return n.complete();
              }));
            }
          }));
        })), i;
      });
    }(t, e);
    if (Ce(t)) return function (t, e) {
      return new lt(function (n) {
        var i = new tt();
        return i.add(e.schedule(function () {
          return t.then(function (t) {
            i.add(e.schedule(function () {
              n.next(t), i.add(e.schedule(function () {
                return n.complete();
              }));
            }));
          }, function (t) {
            i.add(e.schedule(function () {
              return n.error(t);
            }));
          });
        })), i;
      });
    }(t, e);
    if (Ee(t)) return Ft(t, e);
    if (function (t) {
      return t && "function" == typeof t[Me];
    }(t) || "string" == typeof t) return function (t, e) {
      if (!t) throw new Error("Iterable cannot be null");
      return new lt(function (n) {
        var i,
            r = new tt();
        return r.add(function () {
          i && "function" == typeof i.return && i.return();
        }), r.add(e.schedule(function () {
          i = t[Me](), r.add(e.schedule(function () {
            if (!n.closed) {
              var t, e;

              try {
                var r = i.next();
                t = r.value, e = r.done;
              } catch (t) {
                return void n.error(t);
              }

              e ? n.complete() : (n.next(t), this.schedule());
            }
          }));
        })), r;
      });
    }(t, e);
  }

  throw new TypeError((null !== t && typeof t || t) + " is not observable");
}

function Re(t, e) {
  return e ? Pe(t, e) : t instanceof lt ? t : new lt(Ne(t));
}

function je(t, e, n) {
  return void 0 === n && (n = Number.POSITIVE_INFINITY), "function" == typeof e ? function (i) {
    return i.pipe(je(function (n, i) {
      return Re(t(n, i)).pipe(pe(function (t, r) {
        return e(n, t, i, r);
      }));
    }, n));
  } : ("number" == typeof e && (n = e), function (e) {
    return e.lift(new Be(t, n));
  });
}

var Be = function () {
  function t(t, e) {
    void 0 === e && (e = Number.POSITIVE_INFINITY), this.project = t, this.concurrent = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new De(t, this.project, this.concurrent));
  }, t;
}(),
    De = function (t) {
  function e(e, n, i) {
    void 0 === i && (i = Number.POSITIVE_INFINITY);
    var r = t.call(this, e) || this;
    return r.project = n, r.concurrent = i, r.hasCompleted = !1, r.buffer = [], r.active = 0, r.index = 0, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
  }, e.prototype._tryNext = function (t) {
    var e,
        n = this.index++;

    try {
      e = this.project(t, n);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.active++, this._innerSub(e, t, n);
  }, e.prototype._innerSub = function (t, e, n) {
    var i = new xe(this, e, n),
        r = this.destination;
    r.add(i);
    var o = Te(this, t, void 0, void 0, i);
    o !== i && r.add(o);
  }, e.prototype._complete = function () {
    this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.destination.next(e);
  }, e.prototype.notifyComplete = function (t) {
    var e = this.buffer;
    this.remove(t), this.active--, e.length > 0 ? this._next(e.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
  }, e;
}(ke);

function Le(t) {
  return void 0 === t && (t = Number.POSITIVE_INFINITY), je(ut, t);
}

function Fe() {
  return Le(1);
}

function We() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

  return Fe()(qt.apply(void 0, t));
}

function qe(t) {
  return new lt(function (e) {
    var n;

    try {
      n = t();
    } catch (t) {
      return void e.error(t);
    }

    return (n ? Re(n) : jt()).subscribe(e);
  });
}

function Ue(t, e) {
  return new lt(function (n) {
    var i = t.length;
    if (0 !== i) for (var r = new Array(i), o = 0, s = 0, u = function (u) {
      var a = Re(t[u]),
          c = !1;
      n.add(a.subscribe({
        next: function (t) {
          c || (c = !0, s++), r[u] = t;
        },
        error: function (t) {
          return n.error(t);
        },
        complete: function () {
          ++o !== i && c || (s === i && n.next(e ? e.reduce(function (t, e, n) {
            return t[e] = r[n], t;
          }, {}) : r), n.complete());
        }
      }));
    }, a = 0; a < i; a++) u(a);else n.complete();
  });
}

function Ve(t) {
  var e = t.subscriber,
      n = t.condition;

  if (!e.closed) {
    if (t.needIterate) try {
      t.state = t.iterate(t.state);
    } catch (t) {
      return void e.error(t);
    } else t.needIterate = !0;

    if (n) {
      var i = void 0;

      try {
        i = n(t.state);
      } catch (t) {
        return void e.error(t);
      }

      if (!i) return void e.complete();
      if (e.closed) return;
    }

    var r;

    try {
      r = t.resultSelector(t.state);
    } catch (t) {
      return void e.error(t);
    }

    if (!e.closed && (e.next(r), !e.closed)) return this.schedule(t);
  }
}

function ze(t) {
  return !Z(t) && t - parseFloat(t) + 1 >= 0;
}

function He(t) {
  var e = t.subscriber,
      n = t.counter,
      i = t.period;
  e.next(n), this.schedule({
    subscriber: e,
    counter: n + 1,
    period: i
  }, i);
}

function $e() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

  var n = Number.POSITIVE_INFINITY,
      i = null,
      r = t[t.length - 1];
  return Bt(r) ? (i = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (n = t.pop())) : "number" == typeof r && (n = t.pop()), null === i && 1 === t.length && t[0] instanceof lt ? t[0] : Le(n)(Wt(t, i));
}

var Je = new lt(le);

function Ke(t) {
  var e = t.keys,
      n = t.index,
      i = t.subscriber,
      r = t.subscription,
      o = t.obj;
  if (!i.closed) if (n < e.length) {
    var s = e[n];
    i.next([s, o[s]]), r.add(this.schedule({
      keys: e,
      index: n + 1,
      subscriber: i,
      subscription: r,
      obj: o
    }));
  } else i.complete();
}

function Ge(t, e) {
  function n() {
    return !n.pred.apply(n.thisArg, arguments);
  }

  return n.pred = t, n.thisArg = e, n;
}

function Ye(t, e) {
  return function (n) {
    return n.lift(new Ze(t, e));
  };
}

var Ze = function () {
  function t(t, e) {
    this.predicate = t, this.thisArg = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Qe(t, this.predicate, this.thisArg));
  }, t;
}(),
    Qe = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.predicate = n, r.thisArg = i, r.count = 0, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e;

    try {
      e = this.predicate.call(this.thisArg, t, this.count++);
    } catch (t) {
      return void this.destination.error(t);
    }

    e && this.destination.next(t);
  }, e;
}(it);

function Xe() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

  if (1 === t.length) {
    if (!Z(t[0])) return t[0];
    t = t[0];
  }

  return Wt(t, void 0).lift(new tn());
}

var tn = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new en(t));
  }, t;
}(),
    en = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    return n.hasFirst = !1, n.observables = [], n.subscriptions = [], n;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.observables.push(t);
  }, e.prototype._complete = function () {
    var t = this.observables,
        e = t.length;
    if (0 === e) this.destination.complete();else {
      for (var n = 0; n < e && !this.hasFirst; n++) {
        var i = t[n],
            r = Te(this, i, i, n);
        this.subscriptions && this.subscriptions.push(r), this.add(r);
      }

      this.observables = null;
    }
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    if (!this.hasFirst) {
      this.hasFirst = !0;

      for (var o = 0; o < this.subscriptions.length; o++) if (o !== n) {
        var s = this.subscriptions[o];
        s.unsubscribe(), this.remove(s);
      }

      this.subscriptions = null;
    }

    this.destination.next(e);
  }, e;
}(ke);

function nn(t) {
  var e = t.start,
      n = t.index,
      i = t.count,
      r = t.subscriber;
  n >= i ? r.complete() : (r.next(e), r.closed || (t.index = n + 1, t.start = e + 1, this.schedule(t)));
}

function rn(t, e, n) {
  void 0 === t && (t = 0);
  var i = -1;
  return ze(e) ? i = Number(e) < 1 ? 1 : Number(e) : Bt(e) && (n = e), Bt(n) || (n = oe), new lt(function (e) {
    var r = ze(t) ? t : +t - n.now();
    return n.schedule(on, r, {
      index: 0,
      period: i,
      subscriber: e
    });
  });
}

function on(t) {
  var e = t.index,
      n = t.period,
      i = t.subscriber;

  if (i.next(e), !i.closed) {
    if (-1 === n) return i.complete();
    t.index = e + 1, this.schedule(t, n);
  }
}

function sn() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

  var n = t[t.length - 1];
  return "function" == typeof n && t.pop(), Wt(t, void 0).lift(new un(n));
}

var un = function () {
  function t(t) {
    this.resultSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new an(t, this.resultSelector));
  }, t;
}(),
    an = function (t) {
  function e(e, n, i) {
    void 0 === i && (i = Object.create(null));
    var r = t.call(this, e) || this;
    return r.iterators = [], r.active = 0, r.resultSelector = "function" == typeof n ? n : null, r.values = i, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.iterators;
    Z(t) ? e.push(new ln(t)) : "function" == typeof t[Me] ? e.push(new cn(t[Me]())) : e.push(new hn(this.destination, this, t));
  }, e.prototype._complete = function () {
    var t = this.iterators,
        e = t.length;

    if (this.unsubscribe(), 0 !== e) {
      this.active = e;

      for (var n = 0; n < e; n++) {
        var i = t[n];
        if (i.stillUnsubscribed) this.destination.add(i.subscribe(i, n));else this.active--;
      }
    } else this.destination.complete();
  }, e.prototype.notifyInactive = function () {
    this.active--, 0 === this.active && this.destination.complete();
  }, e.prototype.checkIterators = function () {
    for (var t = this.iterators, e = t.length, n = this.destination, i = 0; i < e; i++) {
      if ("function" == typeof (s = t[i]).hasValue && !s.hasValue()) return;
    }

    var r = !1,
        o = [];

    for (i = 0; i < e; i++) {
      var s,
          u = (s = t[i]).next();
      if (s.hasCompleted() && (r = !0), u.done) return void n.complete();
      o.push(u.value);
    }

    this.resultSelector ? this._tryresultSelector(o) : n.next(o), r && n.complete();
  }, e.prototype._tryresultSelector = function (t) {
    var e;

    try {
      e = this.resultSelector.apply(this, t);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.destination.next(e);
  }, e;
}(it),
    cn = function () {
  function t(t) {
    this.iterator = t, this.nextResult = t.next();
  }

  return t.prototype.hasValue = function () {
    return !0;
  }, t.prototype.next = function () {
    var t = this.nextResult;
    return this.nextResult = this.iterator.next(), t;
  }, t.prototype.hasCompleted = function () {
    var t = this.nextResult;
    return t && t.done;
  }, t;
}(),
    ln = function () {
  function t(t) {
    this.array = t, this.index = 0, this.length = 0, this.length = t.length;
  }

  return t.prototype[Me] = function () {
    return this;
  }, t.prototype.next = function (t) {
    var e = this.index++,
        n = this.array;
    return e < this.length ? {
      value: n[e],
      done: !1
    } : {
      value: null,
      done: !0
    };
  }, t.prototype.hasValue = function () {
    return this.array.length > this.index;
  }, t.prototype.hasCompleted = function () {
    return this.array.length === this.index;
  }, t;
}(),
    hn = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.parent = n, r.observable = i, r.stillUnsubscribed = !0, r.buffer = [], r.isComplete = !1, r;
  }

  return H(e, t), e.prototype[Me] = function () {
    return this;
  }, e.prototype.next = function () {
    var t = this.buffer;
    return 0 === t.length && this.isComplete ? {
      value: null,
      done: !0
    } : {
      value: t.shift(),
      done: !1
    };
  }, e.prototype.hasValue = function () {
    return this.buffer.length > 0;
  }, e.prototype.hasCompleted = function () {
    return 0 === this.buffer.length && this.isComplete;
  }, e.prototype.notifyComplete = function () {
    this.buffer.length > 0 ? (this.isComplete = !0, this.parent.notifyInactive()) : this.destination.complete();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.buffer.push(e), this.parent.checkIterators();
  }, e.prototype.subscribe = function (t, e) {
    return Te(this, this.observable, this, e);
  }, e;
}(ke),
    fn = Object.freeze({
  __proto__: null,
  Observable: lt,
  ConnectableObservable: wt,
  GroupedObservable: Et,
  observable: st,
  Subject: mt,
  BehaviorSubject: Nt,
  ReplaySubject: Kt,
  AsyncSubject: Yt,
  asapScheduler: re,
  asyncScheduler: oe,
  queueScheduler: Pt,
  animationFrameScheduler: ue,
  VirtualTimeScheduler: ae,
  VirtualAction: ce,
  Scheduler: At,
  Subscription: tt,
  Subscriber: it,
  Notification: zt,

  get NotificationKind() {
    return Dt;
  },

  pipe: at,
  noop: le,
  identity: ut,
  isObservable: function (t) {
    return !!t && (t instanceof lt || "function" == typeof t.lift && "function" == typeof t.subscribe);
  },
  ArgumentOutOfRangeError: he,
  EmptyError: fe,
  ObjectUnsubscribedError: ft,
  UnsubscriptionError: X,
  TimeoutError: de,
  bindCallback: function t(e, n, i) {
    if (n) {
      if (!Bt(n)) return function () {
        for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];

        return t(e, i).apply(void 0, r).pipe(pe(function (t) {
          return Z(t) ? n.apply(void 0, t) : n(t);
        }));
      };
      i = n;
    }

    return function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];

      var r,
          o = this,
          s = {
        context: o,
        subject: r,
        callbackFunc: e,
        scheduler: i
      };
      return new lt(function (n) {
        if (i) {
          var u = {
            args: t,
            subscriber: n,
            params: s
          };
          return i.schedule(ge, 0, u);
        }

        if (!r) {
          r = new Yt();

          try {
            e.apply(o, t.concat([function () {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

              r.next(t.length <= 1 ? t[0] : t), r.complete();
            }]));
          } catch (t) {
            ot(r) ? r.error(t) : console.warn(t);
          }
        }

        return r.subscribe(n);
      });
    };
  },
  bindNodeCallback: function t(e, n, i) {
    if (n) {
      if (!Bt(n)) return function () {
        for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];

        return t(e, i).apply(void 0, r).pipe(pe(function (t) {
          return Z(t) ? n.apply(void 0, t) : n(t);
        }));
      };
      i = n;
    }

    return function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];

      var r = {
        subject: void 0,
        args: t,
        callbackFunc: e,
        scheduler: i,
        context: this
      };
      return new lt(function (n) {
        var o = r.context,
            s = r.subject;
        if (i) return i.schedule(ye, 0, {
          params: r,
          subscriber: n,
          context: o
        });

        if (!s) {
          s = r.subject = new Yt();

          try {
            e.apply(o, t.concat([function () {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

              var n = t.shift();
              n ? s.error(n) : (s.next(t.length <= 1 ? t[0] : t), s.complete());
            }]));
          } catch (t) {
            ot(s) ? s.error(t) : console.warn(t);
          }
        }

        return s.subscribe(n);
      });
    };
  },
  combineLatest: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    var n = null,
        i = null;
    return Bt(t[t.length - 1]) && (i = t.pop()), "function" == typeof t[t.length - 1] && (n = t.pop()), 1 === t.length && Z(t[0]) && (t = t[0]), Wt(t, i).lift(new Ae(n));
  },
  concat: We,
  defer: qe,
  empty: jt,
  forkJoin: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    if (1 === t.length) {
      var n = t[0];
      if (Z(n)) return Ue(n, null);

      if (Q(n) && Object.getPrototypeOf(n) === Object.prototype) {
        var i = Object.keys(n);
        return Ue(i.map(function (t) {
          return n[t];
        }), i);
      }
    }

    if ("function" == typeof t[t.length - 1]) {
      var r = t.pop();
      return Ue(t = 1 === t.length && Z(t[0]) ? t[0] : t, null).pipe(pe(function (t) {
        return r.apply(void 0, t);
      }));
    }

    return Ue(t, null);
  },
  from: Re,
  fromEvent: function t(e, n, i, r) {
    return $(i) && (r = i, i = void 0), r ? t(e, n, i).pipe(pe(function (t) {
      return Z(t) ? r.apply(void 0, t) : r(t);
    })) : new lt(function (t) {
      !function t(e, n, i, r, o) {
        var s;

        if (function (t) {
          return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener;
        }(e)) {
          var u = e;
          e.addEventListener(n, i, o), s = function () {
            return u.removeEventListener(n, i, o);
          };
        } else if (function (t) {
          return t && "function" == typeof t.on && "function" == typeof t.off;
        }(e)) {
          var a = e;
          e.on(n, i), s = function () {
            return a.off(n, i);
          };
        } else if (function (t) {
          return t && "function" == typeof t.addListener && "function" == typeof t.removeListener;
        }(e)) {
          var c = e;
          e.addListener(n, i), s = function () {
            return c.removeListener(n, i);
          };
        } else {
          if (!e || !e.length) throw new TypeError("Invalid event target");

          for (var l = 0, h = e.length; l < h; l++) t(e[l], n, i, r, o);
        }

        r.add(s);
      }(e, n, function (e) {
        arguments.length > 1 ? t.next(Array.prototype.slice.call(arguments)) : t.next(e);
      }, t, i);
    });
  },
  fromEventPattern: function t(e, n, i) {
    return i ? t(e, n).pipe(pe(function (t) {
      return Z(t) ? i.apply(void 0, t) : i(t);
    })) : new lt(function (t) {
      var i,
          r = function () {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];

        return t.next(1 === e.length ? e[0] : e);
      };

      try {
        i = e(r);
      } catch (e) {
        return void t.error(e);
      }

      if ($(n)) return function () {
        return n(r, i);
      };
    });
  },
  generate: function (t, e, n, i, r) {
    var o, s;

    if (1 == arguments.length) {
      var u = t;
      s = u.initialState, e = u.condition, n = u.iterate, o = u.resultSelector || ut, r = u.scheduler;
    } else void 0 === i || Bt(i) ? (s = t, o = ut, r = i) : (s = t, o = i);

    return new lt(function (t) {
      var i = s;
      if (r) return r.schedule(Ve, 0, {
        subscriber: t,
        iterate: n,
        condition: e,
        resultSelector: o,
        state: i
      });

      for (;;) {
        if (e) {
          var u = void 0;

          try {
            u = e(i);
          } catch (e) {
            return void t.error(e);
          }

          if (!u) {
            t.complete();
            break;
          }
        }

        var a = void 0;

        try {
          a = o(i);
        } catch (e) {
          return void t.error(e);
        }

        if (t.next(a), t.closed) break;

        try {
          i = n(i);
        } catch (e) {
          return void t.error(e);
        }
      }
    });
  },
  iif: function (t, e, n) {
    return void 0 === e && (e = Rt), void 0 === n && (n = Rt), qe(function () {
      return t() ? e : n;
    });
  },
  interval: function (t, e) {
    return void 0 === t && (t = 0), void 0 === e && (e = oe), (!ze(t) || t < 0) && (t = 0), e && "function" == typeof e.schedule || (e = oe), new lt(function (n) {
      return n.add(e.schedule(He, t, {
        subscriber: n,
        counter: 0,
        period: t
      })), n;
    });
  },
  merge: $e,
  never: function () {
    return Je;
  },
  of: qt,
  onErrorResumeNext: function t() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];

    if (0 === e.length) return Rt;
    var i = e[0],
        r = e.slice(1);
    return 1 === e.length && Z(i) ? t.apply(void 0, i) : new lt(function (e) {
      var n = function () {
        return e.add(t.apply(void 0, r).subscribe(e));
      };

      return Re(i).subscribe({
        next: function (t) {
          e.next(t);
        },
        error: n,
        complete: n
      });
    });
  },
  pairs: function (t, e) {
    return new lt(e ? function (n) {
      var i = Object.keys(t),
          r = new tt();
      return r.add(e.schedule(Ke, 0, {
        keys: i,
        index: 0,
        subscriber: n,
        subscription: r,
        obj: t
      })), r;
    } : function (e) {
      for (var n = Object.keys(t), i = 0; i < n.length && !e.closed; i++) {
        var r = n[i];
        t.hasOwnProperty(r) && e.next([r, t[r]]);
      }

      e.complete();
    });
  },
  partition: function (t, e, n) {
    return [Ye(e, n)(new lt(Ne(t))), Ye(Ge(e, n))(new lt(Ne(t)))];
  },
  race: Xe,
  range: function (t, e, n) {
    return void 0 === t && (t = 0), new lt(function (i) {
      void 0 === e && (e = t, t = 0);
      var r = 0,
          o = t;
      if (n) return n.schedule(nn, 0, {
        index: r,
        count: e,
        start: t,
        subscriber: i
      });

      for (;;) {
        if (r++ >= e) {
          i.complete();
          break;
        }

        if (i.next(o++), i.closed) break;
      }
    });
  },
  throwError: Ut,
  timer: rn,
  using: function (t, e) {
    return new lt(function (n) {
      var i, r;

      try {
        i = t();
      } catch (t) {
        return void n.error(t);
      }

      try {
        r = e(i);
      } catch (t) {
        return void n.error(t);
      }

      var o = (r ? Re(r) : Rt).subscribe(n);
      return function () {
        o.unsubscribe(), i && i.unsubscribe();
      };
    });
  },
  zip: sn,
  scheduled: Pe,
  EMPTY: Rt,
  NEVER: Je,
  config: K
});

function dn(t) {
  return function (e) {
    return e.lift(new pn(t));
  };
}

var pn = function () {
  function t(t) {
    this.durationSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new mn(t, this.durationSelector));
  }, t;
}(),
    mn = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.durationSelector = n, i.hasValue = !1, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    if (this.value = t, this.hasValue = !0, !this.throttled) {
      var e = void 0;

      try {
        e = (0, this.durationSelector)(t);
      } catch (t) {
        return this.destination.error(t);
      }

      var n = Te(this, e);
      !n || n.closed ? this.clearThrottle() : this.add(this.throttled = n);
    }
  }, e.prototype.clearThrottle = function () {
    var t = this.value,
        e = this.hasValue,
        n = this.throttled;
    n && (this.remove(n), this.throttled = null, n.unsubscribe()), e && (this.value = null, this.hasValue = !1, this.destination.next(t));
  }, e.prototype.notifyNext = function (t, e, n, i) {
    this.clearThrottle();
  }, e.prototype.notifyComplete = function () {
    this.clearThrottle();
  }, e;
}(ke);

var bn = function () {
  function t(t) {
    this.closingNotifier = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new gn(t, this.closingNotifier));
  }, t;
}(),
    gn = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.buffer = [], i.add(Te(i, n)), i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.buffer.push(t);
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    var o = this.buffer;
    this.buffer = [], this.destination.next(o);
  }, e;
}(ke);

var vn = function () {
  function t(t, e) {
    this.bufferSize = t, this.startBufferEvery = e, this.subscriberClass = e && t !== e ? wn : yn;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new this.subscriberClass(t, this.bufferSize, this.startBufferEvery));
  }, t;
}(),
    yn = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.bufferSize = n, i.buffer = [], i;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.buffer;
    e.push(t), e.length == this.bufferSize && (this.destination.next(e), this.buffer = []);
  }, e.prototype._complete = function () {
    var e = this.buffer;
    e.length > 0 && this.destination.next(e), t.prototype._complete.call(this);
  }, e;
}(it),
    wn = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.bufferSize = n, r.startBufferEvery = i, r.buffers = [], r.count = 0, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.bufferSize,
        n = this.startBufferEvery,
        i = this.buffers,
        r = this.count;
    this.count++, r % n == 0 && i.push([]);

    for (var o = i.length; o--;) {
      var s = i[o];
      s.push(t), s.length === e && (i.splice(o, 1), this.destination.next(s));
    }
  }, e.prototype._complete = function () {
    for (var e = this.buffers, n = this.destination; e.length > 0;) {
      var i = e.shift();
      i.length > 0 && n.next(i);
    }

    t.prototype._complete.call(this);
  }, e;
}(it);

var _n = function () {
  function t(t, e, n, i) {
    this.bufferTimeSpan = t, this.bufferCreationInterval = e, this.maxBufferSize = n, this.scheduler = i;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new xn(t, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
  }, t;
}(),
    kn = function () {
  return function () {
    this.buffer = [];
  };
}(),
    xn = function (t) {
  function e(e, n, i, r, o) {
    var s = t.call(this, e) || this;
    s.bufferTimeSpan = n, s.bufferCreationInterval = i, s.maxBufferSize = r, s.scheduler = o, s.contexts = [];
    var u = s.openContext();

    if (s.timespanOnly = null == i || i < 0, s.timespanOnly) {
      var a = {
        subscriber: s,
        context: u,
        bufferTimeSpan: n
      };
      s.add(u.closeAction = o.schedule(Sn, n, a));
    } else {
      var c = {
        subscriber: s,
        context: u
      },
          l = {
        bufferTimeSpan: n,
        bufferCreationInterval: i,
        subscriber: s,
        scheduler: o
      };
      s.add(u.closeAction = o.schedule(En, n, c)), s.add(o.schedule(Mn, i, l));
    }

    return s;
  }

  return H(e, t), e.prototype._next = function (t) {
    for (var e, n = this.contexts, i = n.length, r = 0; r < i; r++) {
      var o = n[r],
          s = o.buffer;
      s.push(t), s.length == this.maxBufferSize && (e = o);
    }

    e && this.onBufferFull(e);
  }, e.prototype._error = function (e) {
    this.contexts.length = 0, t.prototype._error.call(this, e);
  }, e.prototype._complete = function () {
    for (var e = this.contexts, n = this.destination; e.length > 0;) {
      var i = e.shift();
      n.next(i.buffer);
    }

    t.prototype._complete.call(this);
  }, e.prototype._unsubscribe = function () {
    this.contexts = null;
  }, e.prototype.onBufferFull = function (t) {
    this.closeContext(t);
    var e = t.closeAction;

    if (e.unsubscribe(), this.remove(e), !this.closed && this.timespanOnly) {
      t = this.openContext();
      var n = this.bufferTimeSpan,
          i = {
        subscriber: this,
        context: t,
        bufferTimeSpan: n
      };
      this.add(t.closeAction = this.scheduler.schedule(Sn, n, i));
    }
  }, e.prototype.openContext = function () {
    var t = new kn();
    return this.contexts.push(t), t;
  }, e.prototype.closeContext = function (t) {
    this.destination.next(t.buffer);
    var e = this.contexts;
    (e ? e.indexOf(t) : -1) >= 0 && e.splice(e.indexOf(t), 1);
  }, e;
}(it);

function Sn(t) {
  var e = t.subscriber,
      n = t.context;
  n && e.closeContext(n), e.closed || (t.context = e.openContext(), t.context.closeAction = this.schedule(t, t.bufferTimeSpan));
}

function Mn(t) {
  var e = t.bufferCreationInterval,
      n = t.bufferTimeSpan,
      i = t.subscriber,
      r = t.scheduler,
      o = i.openContext();
  i.closed || (i.add(o.closeAction = r.schedule(En, n, {
    subscriber: i,
    context: o
  })), this.schedule(t, e));
}

function En(t) {
  var e = t.subscriber,
      n = t.context;
  e.closeContext(n);
}

var Cn = function () {
  function t(t, e) {
    this.openings = t, this.closingSelector = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Nn(t, this.openings, this.closingSelector));
  }, t;
}(),
    Nn = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.openings = n, r.closingSelector = i, r.contexts = [], r.add(Te(r, n)), r;
  }

  return H(e, t), e.prototype._next = function (t) {
    for (var e = this.contexts, n = e.length, i = 0; i < n; i++) e[i].buffer.push(t);
  }, e.prototype._error = function (e) {
    for (var n = this.contexts; n.length > 0;) {
      var i = n.shift();
      i.subscription.unsubscribe(), i.buffer = null, i.subscription = null;
    }

    this.contexts = null, t.prototype._error.call(this, e);
  }, e.prototype._complete = function () {
    for (var e = this.contexts; e.length > 0;) {
      var n = e.shift();
      this.destination.next(n.buffer), n.subscription.unsubscribe(), n.buffer = null, n.subscription = null;
    }

    this.contexts = null, t.prototype._complete.call(this);
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    t ? this.closeBuffer(t) : this.openBuffer(e);
  }, e.prototype.notifyComplete = function (t) {
    this.closeBuffer(t.context);
  }, e.prototype.openBuffer = function (t) {
    try {
      var e = this.closingSelector.call(this, t);
      e && this.trySubscribe(e);
    } catch (t) {
      this._error(t);
    }
  }, e.prototype.closeBuffer = function (t) {
    var e = this.contexts;

    if (e && t) {
      var n = t.buffer,
          i = t.subscription;
      this.destination.next(n), e.splice(e.indexOf(t), 1), this.remove(i), i.unsubscribe();
    }
  }, e.prototype.trySubscribe = function (t) {
    var e = this.contexts,
        n = new tt(),
        i = {
      buffer: [],
      subscription: n
    };
    e.push(i);
    var r = Te(this, t, i);
    !r || r.closed ? this.closeBuffer(i) : (r.context = i, this.add(r), n.add(r));
  }, e;
}(ke);

var Tn = function () {
  function t(t) {
    this.closingSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new In(t, this.closingSelector));
  }, t;
}(),
    In = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.closingSelector = n, i.subscribing = !1, i.openBuffer(), i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.buffer.push(t);
  }, e.prototype._complete = function () {
    var e = this.buffer;
    e && this.destination.next(e), t.prototype._complete.call(this);
  }, e.prototype._unsubscribe = function () {
    this.buffer = null, this.subscribing = !1;
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.openBuffer();
  }, e.prototype.notifyComplete = function () {
    this.subscribing ? this.complete() : this.openBuffer();
  }, e.prototype.openBuffer = function () {
    var t = this.closingSubscription;
    t && (this.remove(t), t.unsubscribe());
    var e,
        n = this.buffer;
    this.buffer && this.destination.next(n), this.buffer = [];

    try {
      e = (0, this.closingSelector)();
    } catch (t) {
      return this.error(t);
    }

    t = new tt(), this.closingSubscription = t, this.add(t), this.subscribing = !0, t.add(Te(this, e)), this.subscribing = !1;
  }, e;
}(ke);

var An = function () {
  function t(t) {
    this.selector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new On(t, this.selector, this.caught));
  }, t;
}(),
    On = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.selector = n, r.caught = i, r;
  }

  return H(e, t), e.prototype.error = function (e) {
    if (!this.isStopped) {
      var n = void 0;

      try {
        n = this.selector(e, this.caught);
      } catch (e) {
        return void t.prototype.error.call(this, e);
      }

      this._unsubscribeAndRecycle();

      var i = new xe(this, void 0, void 0);
      this.add(i);
      var r = Te(this, n, void 0, void 0, i);
      r !== i && this.add(r);
    }
  }, e;
}(ke);

function Pn(t, e) {
  return je(t, e, 1);
}

var Rn = function () {
  function t(t, e) {
    this.predicate = t, this.source = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new jn(t, this.predicate, this.source));
  }, t;
}(),
    jn = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.predicate = n, r.source = i, r.count = 0, r.index = 0, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.predicate ? this._tryPredicate(t) : this.count++;
  }, e.prototype._tryPredicate = function (t) {
    var e;

    try {
      e = this.predicate(t, this.index++, this.source);
    } catch (t) {
      return void this.destination.error(t);
    }

    e && this.count++;
  }, e.prototype._complete = function () {
    this.destination.next(this.count), this.destination.complete();
  }, e;
}(it);

var Bn = function () {
  function t(t) {
    this.durationSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Dn(t, this.durationSelector));
  }, t;
}(),
    Dn = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.durationSelector = n, i.hasValue = !1, i.durationSubscription = null, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    try {
      var e = this.durationSelector.call(this, t);
      e && this._tryNext(t, e);
    } catch (t) {
      this.destination.error(t);
    }
  }, e.prototype._complete = function () {
    this.emitValue(), this.destination.complete();
  }, e.prototype._tryNext = function (t, e) {
    var n = this.durationSubscription;
    this.value = t, this.hasValue = !0, n && (n.unsubscribe(), this.remove(n)), (n = Te(this, e)) && !n.closed && this.add(this.durationSubscription = n);
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.emitValue();
  }, e.prototype.notifyComplete = function () {
    this.emitValue();
  }, e.prototype.emitValue = function () {
    if (this.hasValue) {
      var e = this.value,
          n = this.durationSubscription;
      n && (this.durationSubscription = null, n.unsubscribe(), this.remove(n)), this.value = null, this.hasValue = !1, t.prototype._next.call(this, e);
    }
  }, e;
}(ke);

var Ln = function () {
  function t(t, e) {
    this.dueTime = t, this.scheduler = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Fn(t, this.dueTime, this.scheduler));
  }, t;
}(),
    Fn = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.dueTime = n, r.scheduler = i, r.debouncedSubscription = null, r.lastValue = null, r.hasValue = !1, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(Wn, this.dueTime, this));
  }, e.prototype._complete = function () {
    this.debouncedNext(), this.destination.complete();
  }, e.prototype.debouncedNext = function () {
    if (this.clearDebounce(), this.hasValue) {
      var t = this.lastValue;
      this.lastValue = null, this.hasValue = !1, this.destination.next(t);
    }
  }, e.prototype.clearDebounce = function () {
    var t = this.debouncedSubscription;
    null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null);
  }, e;
}(it);

function Wn(t) {
  t.debouncedNext();
}

function qn(t) {
  return void 0 === t && (t = null), function (e) {
    return e.lift(new Un(t));
  };
}

var Un = function () {
  function t(t) {
    this.defaultValue = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Vn(t, this.defaultValue));
  }, t;
}(),
    Vn = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.defaultValue = n, i.isEmpty = !0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.isEmpty = !1, this.destination.next(t);
  }, e.prototype._complete = function () {
    this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
  }, e;
}(it);

function zn(t) {
  return t instanceof Date && !isNaN(+t);
}

var Hn = function () {
  function t(t, e) {
    this.delay = t, this.scheduler = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new $n(t, this.delay, this.scheduler));
  }, t;
}(),
    $n = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.delay = n, r.scheduler = i, r.queue = [], r.active = !1, r.errored = !1, r;
  }

  return H(e, t), e.dispatch = function (t) {
    for (var e = t.source, n = e.queue, i = t.scheduler, r = t.destination; n.length > 0 && n[0].time - i.now() <= 0;) n.shift().notification.observe(r);

    if (n.length > 0) {
      var o = Math.max(0, n[0].time - i.now());
      this.schedule(t, o);
    } else this.unsubscribe(), e.active = !1;
  }, e.prototype._schedule = function (t) {
    this.active = !0, this.destination.add(t.schedule(e.dispatch, this.delay, {
      source: this,
      destination: this.destination,
      scheduler: t
    }));
  }, e.prototype.scheduleNotification = function (t) {
    if (!0 !== this.errored) {
      var e = this.scheduler,
          n = new Jn(e.now() + this.delay, t);
      this.queue.push(n), !1 === this.active && this._schedule(e);
    }
  }, e.prototype._next = function (t) {
    this.scheduleNotification(zt.createNext(t));
  }, e.prototype._error = function (t) {
    this.errored = !0, this.queue = [], this.destination.error(t), this.unsubscribe();
  }, e.prototype._complete = function () {
    this.scheduleNotification(zt.createComplete()), this.unsubscribe();
  }, e;
}(it),
    Jn = function () {
  return function (t, e) {
    this.time = t, this.notification = e;
  };
}();

var Kn = function () {
  function t(t) {
    this.delayDurationSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Gn(t, this.delayDurationSelector));
  }, t;
}(),
    Gn = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.delayDurationSelector = n, i.completed = !1, i.delayNotifierSubscriptions = [], i.index = 0, i;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.destination.next(t), this.removeSubscription(r), this.tryComplete();
  }, e.prototype.notifyError = function (t, e) {
    this._error(t);
  }, e.prototype.notifyComplete = function (t) {
    var e = this.removeSubscription(t);
    e && this.destination.next(e), this.tryComplete();
  }, e.prototype._next = function (t) {
    var e = this.index++;

    try {
      var n = this.delayDurationSelector(t, e);
      n && this.tryDelay(n, t);
    } catch (t) {
      this.destination.error(t);
    }
  }, e.prototype._complete = function () {
    this.completed = !0, this.tryComplete(), this.unsubscribe();
  }, e.prototype.removeSubscription = function (t) {
    t.unsubscribe();
    var e = this.delayNotifierSubscriptions.indexOf(t);
    return -1 !== e && this.delayNotifierSubscriptions.splice(e, 1), t.outerValue;
  }, e.prototype.tryDelay = function (t, e) {
    var n = Te(this, t, e);
    n && !n.closed && (this.destination.add(n), this.delayNotifierSubscriptions.push(n));
  }, e.prototype.tryComplete = function () {
    this.completed && 0 === this.delayNotifierSubscriptions.length && this.destination.complete();
  }, e;
}(ke),
    Yn = function (t) {
  function e(e, n) {
    var i = t.call(this) || this;
    return i.source = e, i.subscriptionDelay = n, i;
  }

  return H(e, t), e.prototype._subscribe = function (t) {
    this.subscriptionDelay.subscribe(new Zn(t, this.source));
  }, e;
}(lt),
    Zn = function (t) {
  function e(e, n) {
    var i = t.call(this) || this;
    return i.parent = e, i.source = n, i.sourceSubscribed = !1, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.subscribeToSource();
  }, e.prototype._error = function (t) {
    this.unsubscribe(), this.parent.error(t);
  }, e.prototype._complete = function () {
    this.unsubscribe(), this.subscribeToSource();
  }, e.prototype.subscribeToSource = function () {
    this.sourceSubscribed || (this.sourceSubscribed = !0, this.unsubscribe(), this.source.subscribe(this.parent));
  }, e;
}(it);

var Qn = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Xn(t));
  }, t;
}(),
    Xn = function (t) {
  function e(e) {
    return t.call(this, e) || this;
  }

  return H(e, t), e.prototype._next = function (t) {
    t.observe(this.destination);
  }, e;
}(it);

var ti = function () {
  function t(t, e) {
    this.keySelector = t, this.flushes = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new ei(t, this.keySelector, this.flushes));
  }, t;
}(),
    ei = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.keySelector = n, r.values = new Set(), i && r.add(Te(r, i)), r;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.values.clear();
  }, e.prototype.notifyError = function (t, e) {
    this._error(t);
  }, e.prototype._next = function (t) {
    this.keySelector ? this._useKeySelector(t) : this._finalizeNext(t, t);
  }, e.prototype._useKeySelector = function (t) {
    var e,
        n = this.destination;

    try {
      e = this.keySelector(t);
    } catch (t) {
      return void n.error(t);
    }

    this._finalizeNext(e, t);
  }, e.prototype._finalizeNext = function (t, e) {
    var n = this.values;
    n.has(t) || (n.add(t), this.destination.next(e));
  }, e;
}(ke);

function ni(t, e) {
  return function (n) {
    return n.lift(new ii(t, e));
  };
}

var ii = function () {
  function t(t, e) {
    this.compare = t, this.keySelector = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new ri(t, this.compare, this.keySelector));
  }, t;
}(),
    ri = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.keySelector = i, r.hasKey = !1, "function" == typeof n && (r.compare = n), r;
  }

  return H(e, t), e.prototype.compare = function (t, e) {
    return t === e;
  }, e.prototype._next = function (t) {
    var e;

    try {
      var n = this.keySelector;
      e = n ? n(t) : t;
    } catch (t) {
      return this.destination.error(t);
    }

    var i = !1;
    if (this.hasKey) try {
      i = (0, this.compare)(this.key, e);
    } catch (t) {
      return this.destination.error(t);
    } else this.hasKey = !0;
    i || (this.key = e, this.destination.next(t));
  }, e;
}(it);

function oi(t) {
  return void 0 === t && (t = ai), function (e) {
    return e.lift(new si(t));
  };
}

var si = function () {
  function t(t) {
    this.errorFactory = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new ui(t, this.errorFactory));
  }, t;
}(),
    ui = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.errorFactory = n, i.hasValue = !1, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.hasValue = !0, this.destination.next(t);
  }, e.prototype._complete = function () {
    if (this.hasValue) return this.destination.complete();
    var t = void 0;

    try {
      t = this.errorFactory();
    } catch (e) {
      t = e;
    }

    this.destination.error(t);
  }, e;
}(it);

function ai() {
  return new fe();
}

function ci(t) {
  return function (e) {
    return 0 === t ? jt() : e.lift(new li(t));
  };
}

var li = function () {
  function t(t) {
    if (this.total = t, this.total < 0) throw new he();
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new hi(t, this.total));
  }, t;
}(),
    hi = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.total = n, i.count = 0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.total,
        n = ++this.count;
    n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()));
  }, e;
}(it);

var fi = function () {
  function t(t, e, n) {
    this.predicate = t, this.thisArg = e, this.source = n;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new di(t, this.predicate, this.thisArg, this.source));
  }, t;
}(),
    di = function (t) {
  function e(e, n, i, r) {
    var o = t.call(this, e) || this;
    return o.predicate = n, o.thisArg = i, o.source = r, o.index = 0, o.thisArg = i || o, o;
  }

  return H(e, t), e.prototype.notifyComplete = function (t) {
    this.destination.next(t), this.destination.complete();
  }, e.prototype._next = function (t) {
    var e = !1;

    try {
      e = this.predicate.call(this.thisArg, t, this.index++, this.source);
    } catch (t) {
      return void this.destination.error(t);
    }

    e || this.notifyComplete(!1);
  }, e.prototype._complete = function () {
    this.notifyComplete(!0);
  }, e;
}(it);

var pi = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new mi(t));
  }, t;
}(),
    mi = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    return n.hasCompleted = !1, n.hasSubscription = !1, n;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.hasSubscription || (this.hasSubscription = !0, this.add(Te(this, t)));
  }, e.prototype._complete = function () {
    this.hasCompleted = !0, this.hasSubscription || this.destination.complete();
  }, e.prototype.notifyComplete = function (t) {
    this.remove(t), this.hasSubscription = !1, this.hasCompleted && this.destination.complete();
  }, e;
}(ke);

var bi = function () {
  function t(t) {
    this.project = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new gi(t, this.project));
  }, t;
}(),
    gi = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.project = n, i.hasSubscription = !1, i.hasCompleted = !1, i.index = 0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.hasSubscription || this.tryNext(t);
  }, e.prototype.tryNext = function (t) {
    var e,
        n = this.index++;

    try {
      e = this.project(t, n);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.hasSubscription = !0, this._innerSub(e, t, n);
  }, e.prototype._innerSub = function (t, e, n) {
    var i = new xe(this, e, n),
        r = this.destination;
    r.add(i);
    var o = Te(this, t, void 0, void 0, i);
    o !== i && r.add(o);
  }, e.prototype._complete = function () {
    this.hasCompleted = !0, this.hasSubscription || this.destination.complete(), this.unsubscribe();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.destination.next(e);
  }, e.prototype.notifyError = function (t) {
    this.destination.error(t);
  }, e.prototype.notifyComplete = function (t) {
    this.destination.remove(t), this.hasSubscription = !1, this.hasCompleted && this.destination.complete();
  }, e;
}(ke);

var vi = function () {
  function t(t, e, n) {
    this.project = t, this.concurrent = e, this.scheduler = n;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new yi(t, this.project, this.concurrent, this.scheduler));
  }, t;
}(),
    yi = function (t) {
  function e(e, n, i, r) {
    var o = t.call(this, e) || this;
    return o.project = n, o.concurrent = i, o.scheduler = r, o.index = 0, o.active = 0, o.hasCompleted = !1, i < Number.POSITIVE_INFINITY && (o.buffer = []), o;
  }

  return H(e, t), e.dispatch = function (t) {
    var e = t.subscriber,
        n = t.result,
        i = t.value,
        r = t.index;
    e.subscribeToProjection(n, i, r);
  }, e.prototype._next = function (t) {
    var n = this.destination;
    if (n.closed) this._complete();else {
      var i = this.index++;

      if (this.active < this.concurrent) {
        n.next(t);

        try {
          var r = (0, this.project)(t, i);

          if (this.scheduler) {
            var o = {
              subscriber: this,
              result: r,
              value: t,
              index: i
            };
            this.destination.add(this.scheduler.schedule(e.dispatch, 0, o));
          } else this.subscribeToProjection(r, t, i);
        } catch (t) {
          n.error(t);
        }
      } else this.buffer.push(t);
    }
  }, e.prototype.subscribeToProjection = function (t, e, n) {
    this.active++, this.destination.add(Te(this, t, e, n));
  }, e.prototype._complete = function () {
    this.hasCompleted = !0, this.hasCompleted && 0 === this.active && this.destination.complete(), this.unsubscribe();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this._next(e);
  }, e.prototype.notifyComplete = function (t) {
    var e = this.buffer;
    this.destination.remove(t), this.active--, e && e.length > 0 && this._next(e.shift()), this.hasCompleted && 0 === this.active && this.destination.complete();
  }, e;
}(ke);

var wi = function () {
  function t(t) {
    this.callback = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new _i(t, this.callback));
  }, t;
}(),
    _i = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.add(new tt(n)), i;
  }

  return H(e, t), e;
}(it);

var ki = function () {
  function t(t, e, n, i) {
    this.predicate = t, this.source = e, this.yieldIndex = n, this.thisArg = i;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new xi(t, this.predicate, this.source, this.yieldIndex, this.thisArg));
  }, t;
}(),
    xi = function (t) {
  function e(e, n, i, r, o) {
    var s = t.call(this, e) || this;
    return s.predicate = n, s.source = i, s.yieldIndex = r, s.thisArg = o, s.index = 0, s;
  }

  return H(e, t), e.prototype.notifyComplete = function (t) {
    var e = this.destination;
    e.next(t), e.complete(), this.unsubscribe();
  }, e.prototype._next = function (t) {
    var e = this.predicate,
        n = this.thisArg,
        i = this.index++;

    try {
      e.call(n || this, t, i, this.source) && this.notifyComplete(this.yieldIndex ? i : t);
    } catch (t) {
      this.destination.error(t);
    }
  }, e.prototype._complete = function () {
    this.notifyComplete(this.yieldIndex ? -1 : void 0);
  }, e;
}(it);

var Si = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Mi(t));
  }, t;
}(),
    Mi = function (t) {
  function e() {
    return null !== t && t.apply(this, arguments) || this;
  }

  return H(e, t), e.prototype._next = function (t) {}, e;
}(it);

var Ei = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Ci(t));
  }, t;
}(),
    Ci = function (t) {
  function e(e) {
    return t.call(this, e) || this;
  }

  return H(e, t), e.prototype.notifyComplete = function (t) {
    var e = this.destination;
    e.next(t), e.complete();
  }, e.prototype._next = function (t) {
    this.notifyComplete(!1);
  }, e.prototype._complete = function () {
    this.notifyComplete(!0);
  }, e;
}(it);

function Ni(t) {
  return function (e) {
    return 0 === t ? jt() : e.lift(new Ti(t));
  };
}

var Ti = function () {
  function t(t) {
    if (this.total = t, this.total < 0) throw new he();
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Ii(t, this.total));
  }, t;
}(),
    Ii = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.total = n, i.ring = new Array(), i.count = 0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.ring,
        n = this.total,
        i = this.count++;
    e.length < n ? e.push(t) : e[i % n] = t;
  }, e.prototype._complete = function () {
    var t = this.destination,
        e = this.count;
    if (e > 0) for (var n = this.count >= this.total ? this.total : this.count, i = this.ring, r = 0; r < n; r++) {
      var o = e++ % n;
      t.next(i[o]);
    }
    t.complete();
  }, e;
}(it);

var Ai = function () {
  function t(t) {
    this.value = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Oi(t, this.value));
  }, t;
}(),
    Oi = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.value = n, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.destination.next(this.value);
  }, e;
}(it);

var Pi = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Ri(t));
  }, t;
}(),
    Ri = function (t) {
  function e(e) {
    return t.call(this, e) || this;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.destination.next(zt.createNext(t));
  }, e.prototype._error = function (t) {
    var e = this.destination;
    e.next(zt.createError(t)), e.complete();
  }, e.prototype._complete = function () {
    var t = this.destination;
    t.next(zt.createComplete()), t.complete();
  }, e;
}(it);

function ji(t, e) {
  var n = !1;
  return arguments.length >= 2 && (n = !0), function (i) {
    return i.lift(new Bi(t, e, n));
  };
}

var Bi = function () {
  function t(t, e, n) {
    void 0 === n && (n = !1), this.accumulator = t, this.seed = e, this.hasSeed = n;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Di(t, this.accumulator, this.seed, this.hasSeed));
  }, t;
}(),
    Di = function (t) {
  function e(e, n, i, r) {
    var o = t.call(this, e) || this;
    return o.accumulator = n, o._seed = i, o.hasSeed = r, o.index = 0, o;
  }

  return H(e, t), Object.defineProperty(e.prototype, "seed", {
    get: function () {
      return this._seed;
    },
    set: function (t) {
      this.hasSeed = !0, this._seed = t;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype._next = function (t) {
    if (this.hasSeed) return this._tryNext(t);
    this.seed = t, this.destination.next(t);
  }, e.prototype._tryNext = function (t) {
    var e,
        n = this.index++;

    try {
      e = this.accumulator(this.seed, t, n);
    } catch (t) {
      this.destination.error(t);
    }

    this.seed = e, this.destination.next(e);
  }, e;
}(it);

function Li(t, e) {
  return arguments.length >= 2 ? function (n) {
    return at(ji(t, e), Ni(1), qn(e))(n);
  } : function (e) {
    return at(ji(function (e, n, i) {
      return t(e, n, i + 1);
    }), Ni(1))(e);
  };
}

var Fi = function () {
  function t(t, e, n) {
    this.accumulator = t, this.seed = e, this.concurrent = n;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Wi(t, this.accumulator, this.seed, this.concurrent));
  }, t;
}(),
    Wi = function (t) {
  function e(e, n, i, r) {
    var o = t.call(this, e) || this;
    return o.accumulator = n, o.acc = i, o.concurrent = r, o.hasValue = !1, o.hasCompleted = !1, o.buffer = [], o.active = 0, o.index = 0, o;
  }

  return H(e, t), e.prototype._next = function (t) {
    if (this.active < this.concurrent) {
      var e = this.index++,
          n = this.destination,
          i = void 0;

      try {
        i = (0, this.accumulator)(this.acc, t, e);
      } catch (t) {
        return n.error(t);
      }

      this.active++, this._innerSub(i, t, e);
    } else this.buffer.push(t);
  }, e.prototype._innerSub = function (t, e, n) {
    var i = new xe(this, e, n),
        r = this.destination;
    r.add(i);
    var o = Te(this, t, void 0, void 0, i);
    o !== i && r.add(o);
  }, e.prototype._complete = function () {
    this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete()), this.unsubscribe();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    var o = this.destination;
    this.acc = e, this.hasValue = !0, o.next(e);
  }, e.prototype.notifyComplete = function (t) {
    var e = this.buffer;
    this.destination.remove(t), this.active--, e.length > 0 ? this._next(e.shift()) : 0 === this.active && this.hasCompleted && (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete());
  }, e;
}(ke);

function qi(t, e) {
  return function (n) {
    var i;
    if (i = "function" == typeof t ? t : function () {
      return t;
    }, "function" == typeof e) return n.lift(new Ui(i, e));
    var r = Object.create(n, _t);
    return r.source = n, r.subjectFactory = i, r;
  };
}

var Ui = function () {
  function t(t, e) {
    this.subjectFactory = t, this.selector = e;
  }

  return t.prototype.call = function (t, e) {
    var n = this.selector,
        i = this.subjectFactory(),
        r = n(i).subscribe(t);
    return r.add(e.subscribe(i)), r;
  }, t;
}();

var Vi = function () {
  function t(t) {
    this.nextSources = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new zi(t, this.nextSources));
  }, t;
}(),
    zi = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.destination = e, i.nextSources = n, i;
  }

  return H(e, t), e.prototype.notifyError = function (t, e) {
    this.subscribeToNextSource();
  }, e.prototype.notifyComplete = function (t) {
    this.subscribeToNextSource();
  }, e.prototype._error = function (t) {
    this.subscribeToNextSource(), this.unsubscribe();
  }, e.prototype._complete = function () {
    this.subscribeToNextSource(), this.unsubscribe();
  }, e.prototype.subscribeToNextSource = function () {
    var t = this.nextSources.shift();

    if (t) {
      var e = new xe(this, void 0, void 0),
          n = this.destination;
      n.add(e);
      var i = Te(this, t, void 0, void 0, e);
      i !== e && n.add(i);
    } else this.destination.complete();
  }, e;
}(ke);

var Hi = function () {
  function t() {}

  return t.prototype.call = function (t, e) {
    return e.subscribe(new $i(t));
  }, t;
}(),
    $i = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    return n.hasPrev = !1, n;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e;
    this.hasPrev ? e = [this.prev, t] : this.hasPrev = !0, this.prev = t, e && this.destination.next(e);
  }, e;
}(it);

function Ji(t, e) {
  return function (n) {
    for (var i = n, r = 0; r < e; r++) {
      var o = i[t[r]];
      if (void 0 === o) return;
      i = o;
    }

    return i;
  };
}

var Ki = function () {
  function t(t, e) {
    this.count = t, this.source = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Gi(t, this.count, this.source));
  }, t;
}(),
    Gi = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.count = n, r.source = i, r;
  }

  return H(e, t), e.prototype.complete = function () {
    if (!this.isStopped) {
      var e = this.source,
          n = this.count;
      if (0 === n) return t.prototype.complete.call(this);
      n > -1 && (this.count = n - 1), e.subscribe(this._unsubscribeAndRecycle());
    }
  }, e;
}(it);

var Yi = function () {
  function t(t) {
    this.notifier = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Zi(t, this.notifier, e));
  }, t;
}(),
    Zi = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.notifier = n, r.source = i, r.sourceIsBeingSubscribedTo = !0, r;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.sourceIsBeingSubscribedTo = !0, this.source.subscribe(this);
  }, e.prototype.notifyComplete = function (e) {
    if (!1 === this.sourceIsBeingSubscribedTo) return t.prototype.complete.call(this);
  }, e.prototype.complete = function () {
    if (this.sourceIsBeingSubscribedTo = !1, !this.isStopped) {
      if (this.retries || this.subscribeToRetries(), !this.retriesSubscription || this.retriesSubscription.closed) return t.prototype.complete.call(this);
      this._unsubscribeAndRecycle(), this.notifications.next();
    }
  }, e.prototype._unsubscribe = function () {
    var t = this.notifications,
        e = this.retriesSubscription;
    t && (t.unsubscribe(), this.notifications = null), e && (e.unsubscribe(), this.retriesSubscription = null), this.retries = null;
  }, e.prototype._unsubscribeAndRecycle = function () {
    var e = this._unsubscribe;
    return this._unsubscribe = null, t.prototype._unsubscribeAndRecycle.call(this), this._unsubscribe = e, this;
  }, e.prototype.subscribeToRetries = function () {
    var e;
    this.notifications = new mt();

    try {
      e = (0, this.notifier)(this.notifications);
    } catch (e) {
      return t.prototype.complete.call(this);
    }

    this.retries = e, this.retriesSubscription = Te(this, e);
  }, e;
}(ke);

var Qi = function () {
  function t(t, e) {
    this.count = t, this.source = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Xi(t, this.count, this.source));
  }, t;
}(),
    Xi = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.count = n, r.source = i, r;
  }

  return H(e, t), e.prototype.error = function (e) {
    if (!this.isStopped) {
      var n = this.source,
          i = this.count;
      if (0 === i) return t.prototype.error.call(this, e);
      i > -1 && (this.count = i - 1), n.subscribe(this._unsubscribeAndRecycle());
    }
  }, e;
}(it);

var tr = function () {
  function t(t, e) {
    this.notifier = t, this.source = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new er(t, this.notifier, this.source));
  }, t;
}(),
    er = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.notifier = n, r.source = i, r;
  }

  return H(e, t), e.prototype.error = function (e) {
    if (!this.isStopped) {
      var n = this.errors,
          i = this.retries,
          r = this.retriesSubscription;
      if (i) this.errors = null, this.retriesSubscription = null;else {
        n = new mt();

        try {
          i = (0, this.notifier)(n);
        } catch (e) {
          return t.prototype.error.call(this, e);
        }

        r = Te(this, i);
      }
      this._unsubscribeAndRecycle(), this.errors = n, this.retries = i, this.retriesSubscription = r, n.next(e);
    }
  }, e.prototype._unsubscribe = function () {
    var t = this.errors,
        e = this.retriesSubscription;
    t && (t.unsubscribe(), this.errors = null), e && (e.unsubscribe(), this.retriesSubscription = null), this.retries = null;
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    var o = this._unsubscribe;
    this._unsubscribe = null, this._unsubscribeAndRecycle(), this._unsubscribe = o, this.source.subscribe(this);
  }, e;
}(ke);

var nr = function () {
  function t(t) {
    this.notifier = t;
  }

  return t.prototype.call = function (t, e) {
    var n = new ir(t),
        i = e.subscribe(n);
    return i.add(Te(n, this.notifier)), i;
  }, t;
}(),
    ir = function (t) {
  function e() {
    var e = null !== t && t.apply(this, arguments) || this;
    return e.hasValue = !1, e;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.value = t, this.hasValue = !0;
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.emitValue();
  }, e.prototype.notifyComplete = function () {
    this.emitValue();
  }, e.prototype.emitValue = function () {
    this.hasValue && (this.hasValue = !1, this.destination.next(this.value));
  }, e;
}(ke);

var rr = function () {
  function t(t, e) {
    this.period = t, this.scheduler = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new or(t, this.period, this.scheduler));
  }, t;
}(),
    or = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.period = n, r.scheduler = i, r.hasValue = !1, r.add(i.schedule(sr, n, {
      subscriber: r,
      period: n
    })), r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.lastValue = t, this.hasValue = !0;
  }, e.prototype.notifyNext = function () {
    this.hasValue && (this.hasValue = !1, this.destination.next(this.lastValue));
  }, e;
}(it);

function sr(t) {
  var e = t.subscriber,
      n = t.period;
  e.notifyNext(), this.schedule(t, n);
}

var ur = function () {
  function t(t, e) {
    this.compareTo = t, this.comparator = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new ar(t, this.compareTo, this.comparator));
  }, t;
}(),
    ar = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.compareTo = n, r.comparator = i, r._a = [], r._b = [], r._oneComplete = !1, r.destination.add(n.subscribe(new cr(e, r))), r;
  }

  return H(e, t), e.prototype._next = function (t) {
    this._oneComplete && 0 === this._b.length ? this.emit(!1) : (this._a.push(t), this.checkValues());
  }, e.prototype._complete = function () {
    this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : this._oneComplete = !0, this.unsubscribe();
  }, e.prototype.checkValues = function () {
    for (var t = this._a, e = this._b, n = this.comparator; t.length > 0 && e.length > 0;) {
      var i = t.shift(),
          r = e.shift(),
          o = !1;

      try {
        o = n ? n(i, r) : i === r;
      } catch (t) {
        this.destination.error(t);
      }

      o || this.emit(!1);
    }
  }, e.prototype.emit = function (t) {
    var e = this.destination;
    e.next(t), e.complete();
  }, e.prototype.nextB = function (t) {
    this._oneComplete && 0 === this._a.length ? this.emit(!1) : (this._b.push(t), this.checkValues());
  }, e.prototype.completeB = function () {
    this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : this._oneComplete = !0;
  }, e;
}(it),
    cr = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.parent = n, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.parent.nextB(t);
  }, e.prototype._error = function (t) {
    this.parent.error(t), this.unsubscribe();
  }, e.prototype._complete = function () {
    this.parent.completeB(), this.unsubscribe();
  }, e;
}(it);

function lr() {
  return new mt();
}

var hr = function () {
  function t(t, e) {
    this.predicate = t, this.source = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new fr(t, this.predicate, this.source));
  }, t;
}(),
    fr = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.predicate = n, r.source = i, r.seenValue = !1, r.index = 0, r;
  }

  return H(e, t), e.prototype.applySingleValue = function (t) {
    this.seenValue ? this.destination.error("Sequence contains more than one element") : (this.seenValue = !0, this.singleValue = t);
  }, e.prototype._next = function (t) {
    var e = this.index++;
    this.predicate ? this.tryNext(t, e) : this.applySingleValue(t);
  }, e.prototype.tryNext = function (t, e) {
    try {
      this.predicate(t, e, this.source) && this.applySingleValue(t);
    } catch (t) {
      this.destination.error(t);
    }
  }, e.prototype._complete = function () {
    var t = this.destination;
    this.index > 0 ? (t.next(this.seenValue ? this.singleValue : void 0), t.complete()) : t.error(new fe());
  }, e;
}(it);

var dr = function () {
  function t(t) {
    this.total = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new pr(t, this.total));
  }, t;
}(),
    pr = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.total = n, i.count = 0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    ++this.count > this.total && this.destination.next(t);
  }, e;
}(it);

var mr = function () {
  function t(t) {
    if (this._skipCount = t, this._skipCount < 0) throw new he();
  }

  return t.prototype.call = function (t, e) {
    return 0 === this._skipCount ? e.subscribe(new it(t)) : e.subscribe(new br(t, this._skipCount));
  }, t;
}(),
    br = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i._skipCount = n, i._count = 0, i._ring = new Array(n), i;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this._skipCount,
        n = this._count++;
    if (n < e) this._ring[n] = t;else {
      var i = n % e,
          r = this._ring,
          o = r[i];
      r[i] = t, this.destination.next(o);
    }
  }, e;
}(it);

var gr = function () {
  function t(t) {
    this.notifier = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new vr(t, this.notifier));
  }, t;
}(),
    vr = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    i.hasValue = !1;
    var r = new xe(i, void 0, void 0);
    i.add(r), i.innerSubscription = r;
    var o = Te(i, n, void 0, void 0, r);
    return o !== r && (i.add(o), i.innerSubscription = o), i;
  }

  return H(e, t), e.prototype._next = function (e) {
    this.hasValue && t.prototype._next.call(this, e);
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.hasValue = !0, this.innerSubscription && this.innerSubscription.unsubscribe();
  }, e.prototype.notifyComplete = function () {}, e;
}(ke);

var yr = function () {
  function t(t) {
    this.predicate = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new wr(t, this.predicate));
  }, t;
}(),
    wr = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.predicate = n, i.skipping = !0, i.index = 0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.destination;
    this.skipping && this.tryCallPredicate(t), this.skipping || e.next(t);
  }, e.prototype.tryCallPredicate = function (t) {
    try {
      var e = this.predicate(t, this.index++);
      this.skipping = Boolean(e);
    } catch (t) {
      this.destination.error(t);
    }
  }, e;
}(it);

var _r = function (t) {
  function e(e, n, i) {
    void 0 === n && (n = 0), void 0 === i && (i = re);
    var r = t.call(this) || this;
    return r.source = e, r.delayTime = n, r.scheduler = i, (!ze(n) || n < 0) && (r.delayTime = 0), i && "function" == typeof i.schedule || (r.scheduler = re), r;
  }

  return H(e, t), e.create = function (t, n, i) {
    return void 0 === n && (n = 0), void 0 === i && (i = re), new e(t, n, i);
  }, e.dispatch = function (t) {
    var e = t.source,
        n = t.subscriber;
    return this.add(e.subscribe(n));
  }, e.prototype._subscribe = function (t) {
    var n = this.delayTime,
        i = this.source;
    return this.scheduler.schedule(e.dispatch, n, {
      source: i,
      subscriber: t
    });
  }, e;
}(lt);

var kr = function () {
  function t(t, e) {
    this.scheduler = t, this.delay = e;
  }

  return t.prototype.call = function (t, e) {
    return new _r(e, this.delay, this.scheduler).subscribe(t);
  }, t;
}();

function xr(t, e) {
  return "function" == typeof e ? function (n) {
    return n.pipe(xr(function (n, i) {
      return Re(t(n, i)).pipe(pe(function (t, r) {
        return e(n, t, i, r);
      }));
    }));
  } : function (e) {
    return e.lift(new Sr(t));
  };
}

var Sr = function () {
  function t(t) {
    this.project = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Mr(t, this.project));
  }, t;
}(),
    Mr = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.project = n, i.index = 0, i;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e,
        n = this.index++;

    try {
      e = this.project(t, n);
    } catch (t) {
      return void this.destination.error(t);
    }

    this._innerSub(e, t, n);
  }, e.prototype._innerSub = function (t, e, n) {
    var i = this.innerSubscription;
    i && i.unsubscribe();
    var r = new xe(this, e, n),
        o = this.destination;
    o.add(r), this.innerSubscription = Te(this, t, void 0, void 0, r), this.innerSubscription !== r && o.add(this.innerSubscription);
  }, e.prototype._complete = function () {
    var e = this.innerSubscription;
    e && !e.closed || t.prototype._complete.call(this), this.unsubscribe();
  }, e.prototype._unsubscribe = function () {
    this.innerSubscription = null;
  }, e.prototype.notifyComplete = function (e) {
    this.destination.remove(e), this.innerSubscription = null, this.isStopped && t.prototype._complete.call(this);
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.destination.next(e);
  }, e;
}(ke);

var Er = function () {
  function t(t) {
    this.notifier = t;
  }

  return t.prototype.call = function (t, e) {
    var n = new Cr(t),
        i = Te(n, this.notifier);
    return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n;
  }, t;
}(),
    Cr = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    return n.seenValue = !1, n;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.seenValue = !0, this.complete();
  }, e.prototype.notifyComplete = function () {}, e;
}(ke);

var Nr = function () {
  function t(t, e) {
    this.predicate = t, this.inclusive = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Tr(t, this.predicate, this.inclusive));
  }, t;
}(),
    Tr = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.predicate = n, r.inclusive = i, r.index = 0, r;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e,
        n = this.destination;

    try {
      e = this.predicate(t, this.index++);
    } catch (t) {
      return void n.error(t);
    }

    this.nextOrComplete(t, e);
  }, e.prototype.nextOrComplete = function (t, e) {
    var n = this.destination;
    Boolean(e) ? n.next(t) : (this.inclusive && n.next(t), n.complete());
  }, e;
}(it);

var Ir = function () {
  function t(t, e, n) {
    this.nextOrObserver = t, this.error = e, this.complete = n;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Ar(t, this.nextOrObserver, this.error, this.complete));
  }, t;
}(),
    Ar = function (t) {
  function e(e, n, i, r) {
    var o = t.call(this, e) || this;
    return o._tapNext = le, o._tapError = le, o._tapComplete = le, o._tapError = i || le, o._tapComplete = r || le, $(n) ? (o._context = o, o._tapNext = n) : n && (o._context = n, o._tapNext = n.next || le, o._tapError = n.error || le, o._tapComplete = n.complete || le), o;
  }

  return H(e, t), e.prototype._next = function (t) {
    try {
      this._tapNext.call(this._context, t);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.destination.next(t);
  }, e.prototype._error = function (t) {
    try {
      this._tapError.call(this._context, t);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.destination.error(t);
  }, e.prototype._complete = function () {
    try {
      this._tapComplete.call(this._context);
    } catch (t) {
      return void this.destination.error(t);
    }

    return this.destination.complete();
  }, e;
}(it),
    Or = {
  leading: !0,
  trailing: !1
};

var Pr = function () {
  function t(t, e, n) {
    this.durationSelector = t, this.leading = e, this.trailing = n;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Rr(t, this.durationSelector, this.leading, this.trailing));
  }, t;
}(),
    Rr = function (t) {
  function e(e, n, i, r) {
    var o = t.call(this, e) || this;
    return o.destination = e, o.durationSelector = n, o._leading = i, o._trailing = r, o._hasValue = !1, o;
  }

  return H(e, t), e.prototype._next = function (t) {
    this._hasValue = !0, this._sendValue = t, this._throttled || (this._leading ? this.send() : this.throttle(t));
  }, e.prototype.send = function () {
    var t = this._hasValue,
        e = this._sendValue;
    t && (this.destination.next(e), this.throttle(e)), this._hasValue = !1, this._sendValue = null;
  }, e.prototype.throttle = function (t) {
    var e = this.tryDurationSelector(t);
    e && this.add(this._throttled = Te(this, e));
  }, e.prototype.tryDurationSelector = function (t) {
    try {
      return this.durationSelector(t);
    } catch (t) {
      return this.destination.error(t), null;
    }
  }, e.prototype.throttlingDone = function () {
    var t = this._throttled,
        e = this._trailing;
    t && t.unsubscribe(), this._throttled = null, e && this.send();
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    this.throttlingDone();
  }, e.prototype.notifyComplete = function () {
    this.throttlingDone();
  }, e;
}(ke);

var jr = function () {
  function t(t, e, n, i) {
    this.duration = t, this.scheduler = e, this.leading = n, this.trailing = i;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Br(t, this.duration, this.scheduler, this.leading, this.trailing));
  }, t;
}(),
    Br = function (t) {
  function e(e, n, i, r, o) {
    var s = t.call(this, e) || this;
    return s.duration = n, s.scheduler = i, s.leading = r, s.trailing = o, s._hasTrailingValue = !1, s._trailingValue = null, s;
  }

  return H(e, t), e.prototype._next = function (t) {
    this.throttled ? this.trailing && (this._trailingValue = t, this._hasTrailingValue = !0) : (this.add(this.throttled = this.scheduler.schedule(Dr, this.duration, {
      subscriber: this
    })), this.leading ? this.destination.next(t) : this.trailing && (this._trailingValue = t, this._hasTrailingValue = !0));
  }, e.prototype._complete = function () {
    this._hasTrailingValue ? (this.destination.next(this._trailingValue), this.destination.complete()) : this.destination.complete();
  }, e.prototype.clearThrottle = function () {
    var t = this.throttled;
    t && (this.trailing && this._hasTrailingValue && (this.destination.next(this._trailingValue), this._trailingValue = null, this._hasTrailingValue = !1), t.unsubscribe(), this.remove(t), this.throttled = null);
  }, e;
}(it);

function Dr(t) {
  t.subscriber.clearThrottle();
}

var Lr = function () {
  return function (t, e) {
    this.value = t, this.interval = e;
  };
}();

function Fr(t, e, n) {
  return void 0 === n && (n = oe), function (i) {
    var r = zn(t),
        o = r ? +t - n.now() : Math.abs(t);
    return i.lift(new Wr(o, r, e, n));
  };
}

var Wr = function () {
  function t(t, e, n, i) {
    this.waitFor = t, this.absoluteTimeout = e, this.withObservable = n, this.scheduler = i;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new qr(t, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
  }, t;
}(),
    qr = function (t) {
  function e(e, n, i, r, o) {
    var s = t.call(this, e) || this;
    return s.absoluteTimeout = n, s.waitFor = i, s.withObservable = r, s.scheduler = o, s.action = null, s.scheduleTimeout(), s;
  }

  return H(e, t), e.dispatchTimeout = function (t) {
    var e = t.withObservable;
    t._unsubscribeAndRecycle(), t.add(Te(t, e));
  }, e.prototype.scheduleTimeout = function () {
    var t = this.action;
    t ? this.action = t.schedule(this, this.waitFor) : this.add(this.action = this.scheduler.schedule(e.dispatchTimeout, this.waitFor, this));
  }, e.prototype._next = function (e) {
    this.absoluteTimeout || this.scheduleTimeout(), t.prototype._next.call(this, e);
  }, e.prototype._unsubscribe = function () {
    this.action = null, this.scheduler = null, this.withObservable = null;
  }, e;
}(ke);

var Ur = function () {
  return function (t, e) {
    this.value = t, this.timestamp = e;
  };
}();

function Vr(t, e, n) {
  return 0 === n ? [e] : (t.push(e), t);
}

var zr = function () {
  function t(t) {
    this.windowBoundaries = t;
  }

  return t.prototype.call = function (t, e) {
    var n = new Hr(t),
        i = e.subscribe(n);
    return i.closed || n.add(Te(n, this.windowBoundaries)), i;
  }, t;
}(),
    Hr = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    return n.window = new mt(), e.next(n.window), n;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.openWindow();
  }, e.prototype.notifyError = function (t, e) {
    this._error(t);
  }, e.prototype.notifyComplete = function (t) {
    this._complete();
  }, e.prototype._next = function (t) {
    this.window.next(t);
  }, e.prototype._error = function (t) {
    this.window.error(t), this.destination.error(t);
  }, e.prototype._complete = function () {
    this.window.complete(), this.destination.complete();
  }, e.prototype._unsubscribe = function () {
    this.window = null;
  }, e.prototype.openWindow = function () {
    var t = this.window;
    t && t.complete();
    var e = this.destination,
        n = this.window = new mt();
    e.next(n);
  }, e;
}(ke);

var $r = function () {
  function t(t, e) {
    this.windowSize = t, this.startWindowEvery = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Jr(t, this.windowSize, this.startWindowEvery));
  }, t;
}(),
    Jr = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.destination = e, r.windowSize = n, r.startWindowEvery = i, r.windows = [new mt()], r.count = 0, e.next(r.windows[0]), r;
  }

  return H(e, t), e.prototype._next = function (t) {
    for (var e = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize, n = this.destination, i = this.windowSize, r = this.windows, o = r.length, s = 0; s < o && !this.closed; s++) r[s].next(t);

    var u = this.count - i + 1;

    if (u >= 0 && u % e == 0 && !this.closed && r.shift().complete(), ++this.count % e == 0 && !this.closed) {
      var a = new mt();
      r.push(a), n.next(a);
    }
  }, e.prototype._error = function (t) {
    var e = this.windows;
    if (e) for (; e.length > 0 && !this.closed;) e.shift().error(t);
    this.destination.error(t);
  }, e.prototype._complete = function () {
    var t = this.windows;
    if (t) for (; t.length > 0 && !this.closed;) t.shift().complete();
    this.destination.complete();
  }, e.prototype._unsubscribe = function () {
    this.count = 0, this.windows = null;
  }, e;
}(it);

var Kr = function () {
  function t(t, e, n, i) {
    this.windowTimeSpan = t, this.windowCreationInterval = e, this.maxWindowSize = n, this.scheduler = i;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new Yr(t, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
  }, t;
}(),
    Gr = function (t) {
  function e() {
    var e = null !== t && t.apply(this, arguments) || this;
    return e._numberOfNextedValues = 0, e;
  }

  return H(e, t), e.prototype.next = function (e) {
    this._numberOfNextedValues++, t.prototype.next.call(this, e);
  }, Object.defineProperty(e.prototype, "numberOfNextedValues", {
    get: function () {
      return this._numberOfNextedValues;
    },
    enumerable: !0,
    configurable: !0
  }), e;
}(mt),
    Yr = function (t) {
  function e(e, n, i, r, o) {
    var s = t.call(this, e) || this;
    s.destination = e, s.windowTimeSpan = n, s.windowCreationInterval = i, s.maxWindowSize = r, s.scheduler = o, s.windows = [];
    var u = s.openWindow();

    if (null !== i && i >= 0) {
      var a = {
        subscriber: s,
        window: u,
        context: null
      },
          c = {
        windowTimeSpan: n,
        windowCreationInterval: i,
        subscriber: s,
        scheduler: o
      };
      s.add(o.schedule(Xr, n, a)), s.add(o.schedule(Qr, i, c));
    } else {
      var l = {
        subscriber: s,
        window: u,
        windowTimeSpan: n
      };
      s.add(o.schedule(Zr, n, l));
    }

    return s;
  }

  return H(e, t), e.prototype._next = function (t) {
    for (var e = this.windows, n = e.length, i = 0; i < n; i++) {
      var r = e[i];
      r.closed || (r.next(t), r.numberOfNextedValues >= this.maxWindowSize && this.closeWindow(r));
    }
  }, e.prototype._error = function (t) {
    for (var e = this.windows; e.length > 0;) e.shift().error(t);

    this.destination.error(t);
  }, e.prototype._complete = function () {
    for (var t = this.windows; t.length > 0;) {
      var e = t.shift();
      e.closed || e.complete();
    }

    this.destination.complete();
  }, e.prototype.openWindow = function () {
    var t = new Gr();
    return this.windows.push(t), this.destination.next(t), t;
  }, e.prototype.closeWindow = function (t) {
    t.complete();
    var e = this.windows;
    e.splice(e.indexOf(t), 1);
  }, e;
}(it);

function Zr(t) {
  var e = t.subscriber,
      n = t.windowTimeSpan,
      i = t.window;
  i && e.closeWindow(i), t.window = e.openWindow(), this.schedule(t, n);
}

function Qr(t) {
  var e = t.windowTimeSpan,
      n = t.subscriber,
      i = t.scheduler,
      r = t.windowCreationInterval,
      o = n.openWindow(),
      s = {
    action: this,
    subscription: null
  },
      u = {
    subscriber: n,
    window: o,
    context: s
  };
  s.subscription = i.schedule(Xr, e, u), this.add(s.subscription), this.schedule(t, r);
}

function Xr(t) {
  var e = t.subscriber,
      n = t.window,
      i = t.context;
  i && i.action && i.subscription && i.action.remove(i.subscription), e.closeWindow(n);
}

var to = function () {
  function t(t, e) {
    this.openings = t, this.closingSelector = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new eo(t, this.openings, this.closingSelector));
  }, t;
}(),
    eo = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    return r.openings = n, r.closingSelector = i, r.contexts = [], r.add(r.openSubscription = Te(r, n, n)), r;
  }

  return H(e, t), e.prototype._next = function (t) {
    var e = this.contexts;
    if (e) for (var n = e.length, i = 0; i < n; i++) e[i].window.next(t);
  }, e.prototype._error = function (e) {
    var n = this.contexts;
    if (this.contexts = null, n) for (var i = n.length, r = -1; ++r < i;) {
      var o = n[r];
      o.window.error(e), o.subscription.unsubscribe();
    }

    t.prototype._error.call(this, e);
  }, e.prototype._complete = function () {
    var e = this.contexts;
    if (this.contexts = null, e) for (var n = e.length, i = -1; ++i < n;) {
      var r = e[i];
      r.window.complete(), r.subscription.unsubscribe();
    }

    t.prototype._complete.call(this);
  }, e.prototype._unsubscribe = function () {
    var t = this.contexts;
    if (this.contexts = null, t) for (var e = t.length, n = -1; ++n < e;) {
      var i = t[n];
      i.window.unsubscribe(), i.subscription.unsubscribe();
    }
  }, e.prototype.notifyNext = function (t, e, n, i, r) {
    if (t === this.openings) {
      var o = void 0;

      try {
        o = (0, this.closingSelector)(e);
      } catch (t) {
        return this.error(t);
      }

      var s = new mt(),
          u = new tt(),
          a = {
        window: s,
        subscription: u
      };
      this.contexts.push(a);
      var c = Te(this, o, a);
      c.closed ? this.closeWindow(this.contexts.length - 1) : (c.context = a, u.add(c)), this.destination.next(s);
    } else this.closeWindow(this.contexts.indexOf(t));
  }, e.prototype.notifyError = function (t) {
    this.error(t);
  }, e.prototype.notifyComplete = function (t) {
    t !== this.openSubscription && this.closeWindow(this.contexts.indexOf(t.context));
  }, e.prototype.closeWindow = function (t) {
    if (-1 !== t) {
      var e = this.contexts,
          n = e[t],
          i = n.window,
          r = n.subscription;
      e.splice(t, 1), i.complete(), r.unsubscribe();
    }
  }, e;
}(ke);

var no = function () {
  function t(t) {
    this.closingSelector = t;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new io(t, this.closingSelector));
  }, t;
}(),
    io = function (t) {
  function e(e, n) {
    var i = t.call(this, e) || this;
    return i.destination = e, i.closingSelector = n, i.openWindow(), i;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.openWindow(r);
  }, e.prototype.notifyError = function (t, e) {
    this._error(t);
  }, e.prototype.notifyComplete = function (t) {
    this.openWindow(t);
  }, e.prototype._next = function (t) {
    this.window.next(t);
  }, e.prototype._error = function (t) {
    this.window.error(t), this.destination.error(t), this.unsubscribeClosingNotification();
  }, e.prototype._complete = function () {
    this.window.complete(), this.destination.complete(), this.unsubscribeClosingNotification();
  }, e.prototype.unsubscribeClosingNotification = function () {
    this.closingNotification && this.closingNotification.unsubscribe();
  }, e.prototype.openWindow = function (t) {
    void 0 === t && (t = null), t && (this.remove(t), t.unsubscribe());
    var e = this.window;
    e && e.complete();
    var n,
        i = this.window = new mt();
    this.destination.next(i);

    try {
      n = (0, this.closingSelector)();
    } catch (t) {
      return this.destination.error(t), void this.window.error(t);
    }

    this.add(this.closingNotification = Te(this, n));
  }, e;
}(ke);

var ro = function () {
  function t(t, e) {
    this.observables = t, this.project = e;
  }

  return t.prototype.call = function (t, e) {
    return e.subscribe(new oo(t, this.observables, this.project));
  }, t;
}(),
    oo = function (t) {
  function e(e, n, i) {
    var r = t.call(this, e) || this;
    r.observables = n, r.project = i, r.toRespond = [];
    var o = n.length;
    r.values = new Array(o);

    for (var s = 0; s < o; s++) r.toRespond.push(s);

    for (s = 0; s < o; s++) {
      var u = n[s];
      r.add(Te(r, u, u, s));
    }

    return r;
  }

  return H(e, t), e.prototype.notifyNext = function (t, e, n, i, r) {
    this.values[n] = e;
    var o = this.toRespond;

    if (o.length > 0) {
      var s = o.indexOf(n);
      -1 !== s && o.splice(s, 1);
    }
  }, e.prototype.notifyComplete = function () {}, e.prototype._next = function (t) {
    if (0 === this.toRespond.length) {
      var e = [t].concat(this.values);
      this.project ? this._tryProject(e) : this.destination.next(e);
    }
  }, e.prototype._tryProject = function (t) {
    var e;

    try {
      e = this.project.apply(this, t);
    } catch (t) {
      return void this.destination.error(t);
    }

    this.destination.next(e);
  }, e;
}(ke);

var so,
    uo,
    ao,
    co,
    lo,
    ho,
    fo,
    po,
    mo = Object.freeze({
  __proto__: null,
  audit: dn,
  auditTime: function (t, e) {
    return void 0 === e && (e = oe), dn(function () {
      return rn(t, e);
    });
  },
  buffer: function (t) {
    return function (e) {
      return e.lift(new bn(t));
    };
  },
  bufferCount: function (t, e) {
    return void 0 === e && (e = null), function (n) {
      return n.lift(new vn(t, e));
    };
  },
  bufferTime: function (t) {
    var e = arguments.length,
        n = oe;
    Bt(arguments[arguments.length - 1]) && (n = arguments[arguments.length - 1], e--);
    var i = null;
    e >= 2 && (i = arguments[1]);
    var r = Number.POSITIVE_INFINITY;
    return e >= 3 && (r = arguments[2]), function (e) {
      return e.lift(new _n(t, i, r, n));
    };
  },
  bufferToggle: function (t, e) {
    return function (n) {
      return n.lift(new Cn(t, e));
    };
  },
  bufferWhen: function (t) {
    return function (e) {
      return e.lift(new Tn(t));
    };
  },
  catchError: function (t) {
    return function (e) {
      var n = new An(t),
          i = e.lift(n);
      return n.caught = i;
    };
  },
  combineAll: function (t) {
    return function (e) {
      return e.lift(new Ae(t));
    };
  },
  combineLatest: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    var n = null;
    return "function" == typeof t[t.length - 1] && (n = t.pop()), 1 === t.length && Z(t[0]) && (t = t[0].slice()), function (e) {
      return e.lift.call(Re([e].concat(t)), new Ae(n));
    };
  },
  concat: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return function (e) {
      return e.lift.call(We.apply(void 0, [e].concat(t)));
    };
  },
  concatAll: Fe,
  concatMap: Pn,
  concatMapTo: function (t, e) {
    return Pn(function () {
      return t;
    }, e);
  },
  count: function (t) {
    return function (e) {
      return e.lift(new Rn(t, e));
    };
  },
  debounce: function (t) {
    return function (e) {
      return e.lift(new Bn(t));
    };
  },
  debounceTime: function (t, e) {
    return void 0 === e && (e = oe), function (n) {
      return n.lift(new Ln(t, e));
    };
  },
  defaultIfEmpty: qn,
  delay: function (t, e) {
    void 0 === e && (e = oe);
    var n = zn(t) ? +t - e.now() : Math.abs(t);
    return function (t) {
      return t.lift(new Hn(n, e));
    };
  },
  delayWhen: function (t, e) {
    return e ? function (n) {
      return new Yn(n, e).lift(new Kn(t));
    } : function (e) {
      return e.lift(new Kn(t));
    };
  },
  dematerialize: function () {
    return function (t) {
      return t.lift(new Qn());
    };
  },
  distinct: function (t, e) {
    return function (n) {
      return n.lift(new ti(t, e));
    };
  },
  distinctUntilChanged: ni,
  distinctUntilKeyChanged: function (t, e) {
    return ni(function (n, i) {
      return e ? e(n[t], i[t]) : n[t] === i[t];
    });
  },
  elementAt: function (t, e) {
    if (t < 0) throw new he();
    var n = arguments.length >= 2;
    return function (i) {
      return i.pipe(Ye(function (e, n) {
        return n === t;
      }), ci(1), n ? qn(e) : oi(function () {
        return new he();
      }));
    };
  },
  endWith: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return function (e) {
      return We(e, qt.apply(void 0, t));
    };
  },
  every: function (t, e) {
    return function (n) {
      return n.lift(new fi(t, e, n));
    };
  },
  exhaust: function () {
    return function (t) {
      return t.lift(new pi());
    };
  },
  exhaustMap: function t(e, n) {
    return n ? function (i) {
      return i.pipe(t(function (t, i) {
        return Re(e(t, i)).pipe(pe(function (e, r) {
          return n(t, e, i, r);
        }));
      }));
    } : function (t) {
      return t.lift(new bi(e));
    };
  },
  expand: function (t, e, n) {
    return void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === n && (n = void 0), e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e, function (i) {
      return i.lift(new vi(t, e, n));
    };
  },
  filter: Ye,
  finalize: function (t) {
    return function (e) {
      return e.lift(new wi(t));
    };
  },
  find: function (t, e) {
    if ("function" != typeof t) throw new TypeError("predicate is not a function");
    return function (n) {
      return n.lift(new ki(t, n, !1, e));
    };
  },
  findIndex: function (t, e) {
    return function (n) {
      return n.lift(new ki(t, n, !0, e));
    };
  },
  first: function (t, e) {
    var n = arguments.length >= 2;
    return function (i) {
      return i.pipe(t ? Ye(function (e, n) {
        return t(e, n, i);
      }) : ut, ci(1), n ? qn(e) : oi(function () {
        return new fe();
      }));
    };
  },
  groupBy: function (t, e, n, i) {
    return function (r) {
      return r.lift(new xt(t, e, n, i));
    };
  },
  ignoreElements: function () {
    return function (t) {
      return t.lift(new Si());
    };
  },
  isEmpty: function () {
    return function (t) {
      return t.lift(new Ei());
    };
  },
  last: function (t, e) {
    var n = arguments.length >= 2;
    return function (i) {
      return i.pipe(t ? Ye(function (e, n) {
        return t(e, n, i);
      }) : ut, Ni(1), n ? qn(e) : oi(function () {
        return new fe();
      }));
    };
  },
  map: pe,
  mapTo: function (t) {
    return function (e) {
      return e.lift(new Ai(t));
    };
  },
  materialize: function () {
    return function (t) {
      return t.lift(new Pi());
    };
  },
  max: function (t) {
    return Li("function" == typeof t ? function (e, n) {
      return t(e, n) > 0 ? e : n;
    } : function (t, e) {
      return t > e ? t : e;
    });
  },
  merge: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return function (e) {
      return e.lift.call($e.apply(void 0, [e].concat(t)));
    };
  },
  mergeAll: Le,
  mergeMap: je,
  flatMap: je,
  mergeMapTo: function (t, e, n) {
    return void 0 === n && (n = Number.POSITIVE_INFINITY), "function" == typeof e ? je(function () {
      return t;
    }, e, n) : ("number" == typeof e && (n = e), je(function () {
      return t;
    }, n));
  },
  mergeScan: function (t, e, n) {
    return void 0 === n && (n = Number.POSITIVE_INFINITY), function (i) {
      return i.lift(new Fi(t, e, n));
    };
  },
  min: function (t) {
    return Li("function" == typeof t ? function (e, n) {
      return t(e, n) < 0 ? e : n;
    } : function (t, e) {
      return t < e ? t : e;
    });
  },
  multicast: qi,
  observeOn: function (t, e) {
    return void 0 === e && (e = 0), function (n) {
      return n.lift(new Ht(t, e));
    };
  },
  onErrorResumeNext: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return 1 === t.length && Z(t[0]) && (t = t[0]), function (e) {
      return e.lift(new Vi(t));
    };
  },
  pairwise: function () {
    return function (t) {
      return t.lift(new Hi());
    };
  },
  partition: function (t, e) {
    return function (n) {
      return [Ye(t, e)(n), Ye(Ge(t, e))(n)];
    };
  },
  pluck: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    var n = t.length;
    if (0 === n) throw new Error("list of properties cannot be empty.");
    return function (e) {
      return pe(Ji(t, n))(e);
    };
  },
  publish: function (t) {
    return t ? qi(function () {
      return new mt();
    }, t) : qi(new mt());
  },
  publishBehavior: function (t) {
    return function (e) {
      return qi(new Nt(t))(e);
    };
  },
  publishLast: function () {
    return function (t) {
      return qi(new Yt())(t);
    };
  },
  publishReplay: function (t, e, n, i) {
    n && "function" != typeof n && (i = n);
    var r = "function" == typeof n ? n : void 0,
        o = new Kt(t, e, i);
    return function (t) {
      return qi(function () {
        return o;
      }, r)(t);
    };
  },
  race: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return function (e) {
      return 1 === t.length && Z(t[0]) && (t = t[0]), e.lift.call(Xe.apply(void 0, [e].concat(t)));
    };
  },
  reduce: Li,
  repeat: function (t) {
    return void 0 === t && (t = -1), function (e) {
      return 0 === t ? jt() : t < 0 ? e.lift(new Ki(-1, e)) : e.lift(new Ki(t - 1, e));
    };
  },
  repeatWhen: function (t) {
    return function (e) {
      return e.lift(new Yi(t));
    };
  },
  retry: function (t) {
    return void 0 === t && (t = -1), function (e) {
      return e.lift(new Qi(t, e));
    };
  },
  retryWhen: function (t) {
    return function (e) {
      return e.lift(new tr(t, e));
    };
  },
  refCount: gt,
  sample: function (t) {
    return function (e) {
      return e.lift(new nr(t));
    };
  },
  sampleTime: function (t, e) {
    return void 0 === e && (e = oe), function (n) {
      return n.lift(new rr(t, e));
    };
  },
  scan: ji,
  sequenceEqual: function (t, e) {
    return function (n) {
      return n.lift(new ur(t, e));
    };
  },
  share: function () {
    return function (t) {
      return gt()(qi(lr)(t));
    };
  },
  shareReplay: function (t, e, n) {
    var i;
    return i = t && "object" == typeof t ? t : {
      bufferSize: t,
      windowTime: e,
      refCount: !1,
      scheduler: n
    }, function (t) {
      return t.lift(function (t) {
        var e,
            n,
            i = t.bufferSize,
            r = void 0 === i ? Number.POSITIVE_INFINITY : i,
            o = t.windowTime,
            s = void 0 === o ? Number.POSITIVE_INFINITY : o,
            u = t.refCount,
            a = t.scheduler,
            c = 0,
            l = !1,
            h = !1;
        return function (t) {
          c++, e && !l || (l = !1, e = new Kt(r, s, a), n = t.subscribe({
            next: function (t) {
              e.next(t);
            },
            error: function (t) {
              l = !0, e.error(t);
            },
            complete: function () {
              h = !0, n = void 0, e.complete();
            }
          }));
          var i = e.subscribe(this);
          this.add(function () {
            c--, i.unsubscribe(), n && !h && u && 0 === c && (n.unsubscribe(), n = void 0, e = void 0);
          });
        };
      }(i));
    };
  },
  single: function (t) {
    return function (e) {
      return e.lift(new hr(t, e));
    };
  },
  skip: function (t) {
    return function (e) {
      return e.lift(new dr(t));
    };
  },
  skipLast: function (t) {
    return function (e) {
      return e.lift(new mr(t));
    };
  },
  skipUntil: function (t) {
    return function (e) {
      return e.lift(new gr(t));
    };
  },
  skipWhile: function (t) {
    return function (e) {
      return e.lift(new yr(t));
    };
  },
  startWith: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    var n = t[t.length - 1];
    return Bt(n) ? (t.pop(), function (e) {
      return We(t, e, n);
    }) : function (e) {
      return We(t, e);
    };
  },
  subscribeOn: function (t, e) {
    return void 0 === e && (e = 0), function (n) {
      return n.lift(new kr(t, e));
    };
  },
  switchAll: function () {
    return xr(ut);
  },
  switchMap: xr,
  switchMapTo: function (t, e) {
    return e ? xr(function () {
      return t;
    }, e) : xr(function () {
      return t;
    });
  },
  take: ci,
  takeLast: Ni,
  takeUntil: function (t) {
    return function (e) {
      return e.lift(new Er(t));
    };
  },
  takeWhile: function (t, e) {
    return void 0 === e && (e = !1), function (n) {
      return n.lift(new Nr(t, e));
    };
  },
  tap: function (t, e, n) {
    return function (i) {
      return i.lift(new Ir(t, e, n));
    };
  },
  throttle: function (t, e) {
    return void 0 === e && (e = Or), function (n) {
      return n.lift(new Pr(t, e.leading, e.trailing));
    };
  },
  throttleTime: function (t, e, n) {
    return void 0 === e && (e = oe), void 0 === n && (n = Or), function (i) {
      return i.lift(new jr(t, e, n.leading, n.trailing));
    };
  },
  throwIfEmpty: oi,
  timeInterval: function (t) {
    return void 0 === t && (t = oe), function (e) {
      return qe(function () {
        return e.pipe(ji(function (e, n) {
          var i = e.current;
          return {
            value: n,
            current: t.now(),
            last: i
          };
        }, {
          current: t.now(),
          value: void 0,
          last: void 0
        }), pe(function (t) {
          var e = t.current,
              n = t.last,
              i = t.value;
          return new Lr(i, e - n);
        }));
      });
    };
  },
  timeout: function (t, e) {
    return void 0 === e && (e = oe), Fr(t, Ut(new de()), e);
  },
  timeoutWith: Fr,
  timestamp: function (t) {
    return void 0 === t && (t = oe), pe(function (e) {
      return new Ur(e, t.now());
    });
  },
  toArray: function () {
    return Li(Vr, []);
  },
  window: function (t) {
    return function (e) {
      return e.lift(new zr(t));
    };
  },
  windowCount: function (t, e) {
    return void 0 === e && (e = 0), function (n) {
      return n.lift(new $r(t, e));
    };
  },
  windowTime: function (t) {
    var e = oe,
        n = null,
        i = Number.POSITIVE_INFINITY;
    return Bt(arguments[3]) && (e = arguments[3]), Bt(arguments[2]) ? e = arguments[2] : ze(arguments[2]) && (i = arguments[2]), Bt(arguments[1]) ? e = arguments[1] : ze(arguments[1]) && (n = arguments[1]), function (r) {
      return r.lift(new Kr(t, n, i, e));
    };
  },
  windowToggle: function (t, e) {
    return function (n) {
      return n.lift(new to(t, e));
    };
  },
  windowWhen: function (t) {
    return function (e) {
      return e.lift(new no(t));
    };
  },
  withLatestFrom: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return function (e) {
      var n;
      "function" == typeof t[t.length - 1] && (n = t.pop());
      var i = t;
      return e.lift(new ro(i, n));
    };
  },
  zip: function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];

    return function (e) {
      return e.lift.call(sn.apply(void 0, [e].concat(t)));
    };
  },
  zipAll: function (t) {
    return function (e) {
      return e.lift(new un(t));
    };
  }
}),
    bo = {},
    go = [],
    vo = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

function yo(t, e) {
  for (var n in e) t[n] = e[n];

  return t;
}

function wo(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}

function _o(t, e, n) {
  var i,
      r = arguments,
      o = {};

  for (i in e) "key" !== i && "ref" !== i && (o[i] = e[i]);

  if (arguments.length > 3) for (n = [n], i = 3; i < arguments.length; i++) n.push(r[i]);
  if (null != n && (o.children = n), "function" == typeof t && null != t.defaultProps) for (i in t.defaultProps) void 0 === o[i] && (o[i] = t.defaultProps[i]);
  return ko(t, o, e && e.key, e && e.ref, null);
}

function ko(t, e, n, i, r) {
  var o = {
    type: t,
    props: e,
    key: n,
    ref: i,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: r
  };
  return null == r && (o.__v = o), so.vnode && so.vnode(o), o;
}

function xo(t) {
  return t.children;
}

function So(t, e) {
  this.props = t, this.context = e;
}

function Mo(t, e) {
  if (null == e) return t.__ ? Mo(t.__, t.__.__k.indexOf(t) + 1) : null;

  for (var n; e < t.__k.length; e++) if (null != (n = t.__k[e]) && null != n.__e) return n.__e;

  return "function" == typeof t.type ? Mo(t) : null;
}

function Eo(t) {
  var e, n;

  if (null != (t = t.__) && null != t.__c) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if (null != (n = t.__k[e]) && null != n.__e) {
      t.__e = t.__c.base = n.__e;
      break;
    }

    return Eo(t);
  }
}

function Co(t) {
  (!t.__d && (t.__d = !0) && ao.push(t) && !co++ || ho !== so.debounceRendering) && ((ho = so.debounceRendering) || lo)(No);
}

function No() {
  for (var t; co = ao.length;) t = ao.sort(function (t, e) {
    return t.__v.__b - e.__v.__b;
  }), ao = [], t.some(function (t) {
    var e, n, i, r, o, s, u;
    t.__d && (s = (o = (e = t).__v).__e, (u = e.__P) && (n = [], (i = yo({}, o)).__v = i, r = Ro(u, o, i, e.__n, void 0 !== u.ownerSVGElement, null, n, null == s ? Mo(o) : s), jo(n, o), r != s && Eo(o)));
  });
}

function To(t, e, n, i, r, o, s, u, a) {
  var c,
      l,
      h,
      f,
      d,
      p,
      m,
      b = n && n.__k || go,
      g = b.length;
  if (u == bo && (u = null != o ? o[0] : g ? Mo(n, 0) : null), c = 0, e.__k = Io(e.__k, function (n) {
    if (null != n) {
      if (n.__ = e, n.__b = e.__b + 1, null === (h = b[c]) || h && n.key == h.key && n.type === h.type) b[c] = void 0;else for (l = 0; l < g; l++) {
        if ((h = b[l]) && n.key == h.key && n.type === h.type) {
          b[l] = void 0;
          break;
        }

        h = null;
      }

      if (f = Ro(t, n, h = h || bo, i, r, o, s, u, a), (l = n.ref) && h.ref != l && (m || (m = []), h.ref && m.push(h.ref, null, n), m.push(l, n.__c || f, n)), null != f) {
        var v;
        if (null == p && (p = f), void 0 !== n.__d) v = n.__d, n.__d = void 0;else if (o == h || f != u || null == f.parentNode) {
          t: if (null == u || u.parentNode !== t) t.appendChild(f), v = null;else {
            for (d = u, l = 0; (d = d.nextSibling) && l < g; l += 2) if (d == f) break t;

            t.insertBefore(f, u), v = u;
          }

          "option" == e.type && (t.value = "");
        }
        u = void 0 !== v ? v : f.nextSibling, "function" == typeof e.type && (e.__d = u);
      } else u && h.__e == u && u.parentNode != t && (u = Mo(h));
    }

    return c++, n;
  }), e.__e = p, null != o && "function" != typeof e.type) for (c = o.length; c--;) null != o[c] && wo(o[c]);

  for (c = g; c--;) null != b[c] && Lo(b[c], b[c]);

  if (m) for (c = 0; c < m.length; c++) Do(m[c], m[++c], m[++c]);
}

function Io(t, e, n) {
  if (null == n && (n = []), null == t || "boolean" == typeof t) e && n.push(e(null));else if (Array.isArray(t)) for (var i = 0; i < t.length; i++) Io(t[i], e, n);else n.push(e ? e("string" == typeof t || "number" == typeof t ? ko(null, t, null, null, t) : null != t.__e || null != t.__c ? ko(t.type, t.props, t.key, null, t.__v) : t) : t);
  return n;
}

function Ao(t, e, n) {
  "-" === e[0] ? t.setProperty(e, n) : t[e] = "number" == typeof n && !1 === vo.test(e) ? n + "px" : null == n ? "" : n;
}

function Oo(t, e, n, i, r) {
  var o, s, u, a, c;
  if (r ? "className" === e && (e = "class") : "class" === e && (e = "className"), "style" === e) {
    if (o = t.style, "string" == typeof n) o.cssText = n;else {
      if ("string" == typeof i && (o.cssText = "", i = null), i) for (a in i) n && a in n || Ao(o, a, "");
      if (n) for (c in n) i && n[c] === i[c] || Ao(o, c, n[c]);
    }
  } else "o" === e[0] && "n" === e[1] ? (s = e !== (e = e.replace(/Capture$/, "")), u = e.toLowerCase(), e = (u in t ? u : e).slice(2), n ? (i || t.addEventListener(e, Po, s), (t.l || (t.l = {}))[e] = n) : t.removeEventListener(e, Po, s)) : "list" !== e && "tagName" !== e && "form" !== e && "type" !== e && "size" !== e && !r && e in t ? t[e] = null == n ? "" : n : "function" != typeof n && "dangerouslySetInnerHTML" !== e && (e !== (e = e.replace(/^xlink:?/, "")) ? null == n || !1 === n ? t.removeAttributeNS("http://www.w3.org/1999/xlink", e.toLowerCase()) : t.setAttributeNS("http://www.w3.org/1999/xlink", e.toLowerCase(), n) : null == n || !1 === n && !/^ar/.test(e) ? t.removeAttribute(e) : t.setAttribute(e, n));
}

function Po(t) {
  this.l[t.type](so.event ? so.event(t) : t);
}

function Ro(t, e, n, i, r, o, s, u, a) {
  var c,
      l,
      h,
      f,
      d,
      p,
      m,
      b,
      g,
      v,
      y = e.type;
  if (void 0 !== e.constructor) return null;
  (c = so.__b) && c(e);

  try {
    t: if ("function" == typeof y) {
      if (b = e.props, g = (c = y.contextType) && i[c.__c], v = c ? g ? g.props.value : c.__ : i, n.__c ? m = (l = e.__c = n.__c).__ = l.__E : ("prototype" in y && y.prototype.render ? e.__c = l = new y(b, v) : (e.__c = l = new So(b, v), l.constructor = y, l.render = Fo), g && g.sub(l), l.props = b, l.state || (l.state = {}), l.context = v, l.__n = i, h = l.__d = !0, l.__h = []), null == l.__s && (l.__s = l.state), null != y.getDerivedStateFromProps && (l.__s == l.state && (l.__s = yo({}, l.__s)), yo(l.__s, y.getDerivedStateFromProps(b, l.__s))), f = l.props, d = l.state, h) null == y.getDerivedStateFromProps && null != l.componentWillMount && l.componentWillMount(), null != l.componentDidMount && l.__h.push(l.componentDidMount);else {
        if (null == y.getDerivedStateFromProps && b !== f && null != l.componentWillReceiveProps && l.componentWillReceiveProps(b, v), !l.__e && null != l.shouldComponentUpdate && !1 === l.shouldComponentUpdate(b, l.__s, v) || e.__v === n.__v && !l.__) {
          for (l.props = b, l.state = l.__s, e.__v !== n.__v && (l.__d = !1), l.__v = e, e.__e = n.__e, e.__k = n.__k, l.__h.length && s.push(l), c = 0; c < e.__k.length; c++) e.__k[c] && (e.__k[c].__ = e);

          break t;
        }

        null != l.componentWillUpdate && l.componentWillUpdate(b, l.__s, v), null != l.componentDidUpdate && l.__h.push(function () {
          l.componentDidUpdate(f, d, p);
        });
      }
      l.context = v, l.props = b, l.state = l.__s, (c = so.__r) && c(e), l.__d = !1, l.__v = e, l.__P = t, c = l.render(l.props, l.state, l.context), e.__k = null != c && c.type == xo && null == c.key ? c.props.children : Array.isArray(c) ? c : [c], null != l.getChildContext && (i = yo(yo({}, i), l.getChildContext())), h || null == l.getSnapshotBeforeUpdate || (p = l.getSnapshotBeforeUpdate(f, d)), To(t, e, n, i, r, o, s, u, a), l.base = e.__e, l.__h.length && s.push(l), m && (l.__E = l.__ = null), l.__e = !1;
    } else null == o && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = Bo(n.__e, e, n, i, r, o, s, a);

    (c = so.diffed) && c(e);
  } catch (t) {
    e.__v = null, so.__e(t, e, n);
  }

  return e.__e;
}

function jo(t, e) {
  so.__c && so.__c(e, t), t.some(function (e) {
    try {
      t = e.__h, e.__h = [], t.some(function (t) {
        t.call(e);
      });
    } catch (t) {
      so.__e(t, e.__v);
    }
  });
}

function Bo(t, e, n, i, r, o, s, u) {
  var a,
      c,
      l,
      h,
      f,
      d = n.props,
      p = e.props;
  if (r = "svg" === e.type || r, null != o) for (a = 0; a < o.length; a++) if (null != (c = o[a]) && ((null === e.type ? 3 === c.nodeType : c.localName === e.type) || t == c)) {
    t = c, o[a] = null;
    break;
  }

  if (null == t) {
    if (null === e.type) return document.createTextNode(p);
    t = r ? document.createElementNS("http://www.w3.org/2000/svg", e.type) : document.createElement(e.type, p.is && {
      is: p.is
    }), o = null, u = !1;
  }

  if (null === e.type) d !== p && t.data != p && (t.data = p);else {
    if (null != o && (o = go.slice.call(t.childNodes)), l = (d = n.props || bo).dangerouslySetInnerHTML, h = p.dangerouslySetInnerHTML, !u) {
      if (d === bo) for (d = {}, f = 0; f < t.attributes.length; f++) d[t.attributes[f].name] = t.attributes[f].value;
      (h || l) && (h && l && h.__html == l.__html || (t.innerHTML = h && h.__html || ""));
    }

    (function (t, e, n, i, r) {
      var o;

      for (o in n) "children" === o || "key" === o || o in e || Oo(t, o, null, n[o], i);

      for (o in e) r && "function" != typeof e[o] || "children" === o || "key" === o || "value" === o || "checked" === o || n[o] === e[o] || Oo(t, o, e[o], n[o], i);
    })(t, p, d, r, u), e.__k = e.props.children, h || To(t, e, n, i, "foreignObject" !== e.type && r, o, s, bo, u), u || ("value" in p && void 0 !== p.value && p.value !== t.value && (t.value = null == p.value ? "" : p.value), "checked" in p && void 0 !== p.checked && p.checked !== t.checked && (t.checked = p.checked));
  }
  return t;
}

function Do(t, e, n) {
  try {
    "function" == typeof t ? t(e) : t.current = e;
  } catch (t) {
    so.__e(t, n);
  }
}

function Lo(t, e, n) {
  var i, r, o;

  if (so.unmount && so.unmount(t), (i = t.ref) && (i.current && i.current !== t.__e || Do(i, null, e)), n || "function" == typeof t.type || (n = null != (r = t.__e)), t.__e = t.__d = void 0, null != (i = t.__c)) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (t) {
      so.__e(t, e);
    }
    i.base = i.__P = null;
  }

  if (i = t.__k) for (o = 0; o < i.length; o++) i[o] && Lo(i[o], e, n);
  null != r && wo(r);
}

function Fo(t, e, n) {
  return this.constructor(t, n);
}

function Wo(t, e, n) {
  var i, r, o;
  so.__ && so.__(t, e), r = (i = n === fo) ? null : n && n.__k || e.__k, t = _o(xo, null, [t]), o = [], Ro(e, (i ? e : n || e).__k = t, r || bo, bo, void 0 !== e.ownerSVGElement, n && !i ? [n] : r ? null : go.slice.call(e.childNodes), o, n || bo, i), jo(o, t);
}

so = {
  __e: function (t, e) {
    for (var n, i; e = e.__;) if ((n = e.__c) && !n.__) try {
      if (n.constructor && null != n.constructor.getDerivedStateFromError && (i = !0, n.setState(n.constructor.getDerivedStateFromError(t))), null != n.componentDidCatch && (i = !0, n.componentDidCatch(t)), i) return Co(n.__E = n);
    } catch (e) {
      t = e;
    }

    throw t;
  }
}, uo = function (t) {
  return null != t && void 0 === t.constructor;
}, So.prototype.setState = function (t, e) {
  var n;
  n = this.__s !== this.state ? this.__s : this.__s = yo({}, this.state), "function" == typeof t && (t = t(n, this.props)), t && yo(n, t), null != t && this.__v && (e && this.__h.push(e), Co(this));
}, So.prototype.forceUpdate = function (t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Co(this));
}, So.prototype.render = xo, ao = [], co = 0, lo = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, fo = bo, po = 0;
var qo = Object.freeze({
  __proto__: null,
  render: Wo,
  hydrate: function (t, e) {
    Wo(t, e, fo);
  },
  createElement: _o,
  h: _o,
  Fragment: xo,
  createRef: function () {
    return {};
  },

  get isValidElement() {
    return uo;
  },

  Component: So,
  cloneElement: function (t, e) {
    return e = yo(yo({}, t.props), e), arguments.length > 2 && (e.children = go.slice.call(arguments, 2)), ko(t.type, e, e.key || t.key, e.ref || t.ref, null);
  },
  createContext: function (t) {
    var e = {},
        n = {
      __c: "__cC" + po++,
      __: t,
      Consumer: function (t, e) {
        return t.children(e);
      },
      Provider: function (t) {
        var i,
            r = this;
        return this.getChildContext || (i = [], this.getChildContext = function () {
          return e[n.__c] = r, e;
        }, this.shouldComponentUpdate = function (t) {
          r.props.value !== t.value && i.some(function (e) {
            e.context = t.value, Co(e);
          });
        }, this.sub = function (t) {
          i.push(t);
          var e = t.componentWillUnmount;

          t.componentWillUnmount = function () {
            i.splice(i.indexOf(t), 1), e && e.call(t);
          };
        }), t.children;
      }
    };
    return n.Consumer.contextType = n, n;
  },
  toChildArray: Io,
  _unmount: Lo,

  get options() {
    return so;
  }

});

function Uo(t) {
  var e,
      n,
      i = "";
  if (t) if ("object" == typeof t) {
    if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (n = Uo(t[e])) && (i && (i += " "), i += n);else for (e in t) t[e] && (n = Uo(e)) && (i && (i += " "), i += n);
  } else "boolean" == typeof t || t.call || (i && (i += " "), i += t);
  return i;
}

function Vo() {
  for (var t, e = 0, n = ""; e < arguments.length;) (t = Uo(arguments[e++])) && (n && (n += " "), n += t);

  return n;
}

var zo,
    Ho,
    $o,
    Jo = [],
    Ko = so.__r,
    Go = so.diffed,
    Yo = so.__c,
    Zo = so.unmount;

function Qo(t) {
  so.__h && so.__h(Ho);
  var e = Ho.__H || (Ho.__H = {
    __: [],
    __h: []
  });
  return t >= e.__.length && e.__.push({}), e.__[t];
}

function Xo(t) {
  return ts(us, t);
}

function ts(t, e, n) {
  var i = Qo(zo++);
  return i.__c || (i.__c = Ho, i.__ = [n ? n(e) : us(void 0, e), function (e) {
    var n = t(i.__[0], e);
    i.__[0] !== n && (i.__[0] = n, i.__c.setState({}));
  }]), i.__;
}

function es(t, e) {
  var n = Qo(zo++);
  ss(n.__H, e) && (n.__ = t, n.__H = e, Ho.__h.push(n));
}

function ns(t, e) {
  var n = Qo(zo++);
  return ss(n.__H, e) ? (n.__H = e, n.__h = t, n.__ = t()) : n.__;
}

function is() {
  Jo.some(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(rs), t.__H.__h.forEach(os), t.__H.__h = [];
    } catch (e) {
      return t.__H.__h = [], so.__e(e, t.__v), !0;
    }
  }), Jo = [];
}

function rs(t) {
  t.t && t.t();
}

function os(t) {
  var e = t.__();

  "function" == typeof e && (t.t = e);
}

function ss(t, e) {
  return !t || e.some(function (e, n) {
    return e !== t[n];
  });
}

function us(t, e) {
  return "function" == typeof e ? e(t) : e;
}

so.__r = function (t) {
  Ko && Ko(t), zo = 0, (Ho = t.__c).__H && (Ho.__H.__h.forEach(rs), Ho.__H.__h.forEach(os), Ho.__H.__h = []);
}, so.diffed = function (t) {
  Go && Go(t);
  var e = t.__c;

  if (e) {
    var n = e.__H;
    n && n.__h.length && (1 !== Jo.push(e) && $o === so.requestAnimationFrame || (($o = so.requestAnimationFrame) || function (t) {
      var e,
          n = function () {
        clearTimeout(i), cancelAnimationFrame(e), setTimeout(t);
      },
          i = setTimeout(n, 100);

      "undefined" != typeof window && (e = requestAnimationFrame(n));
    })(is));
  }
}, so.__c = function (t, e) {
  e.some(function (t) {
    try {
      t.__h.forEach(rs), t.__h = t.__h.filter(function (t) {
        return !t.__ || os(t);
      });
    } catch (n) {
      e.some(function (t) {
        t.__h && (t.__h = []);
      }), e = [], so.__e(n, t.__v);
    }
  }), Yo && Yo(t, e);
}, so.unmount = function (t) {
  Zo && Zo(t);
  var e = t.__c;

  if (e) {
    var n = e.__H;
    if (n) try {
      n.__.forEach(function (t) {
        return t.t && t.t();
      });
    } catch (t) {
      so.__e(t, e.__v);
    }
  }
};
var as = Object.freeze({
  __proto__: null,
  useState: Xo,
  useReducer: ts,
  useEffect: function (t, e) {
    var n = Qo(zo++);
    ss(n.__H, e) && (n.__ = t, n.__H = e, Ho.__H.__h.push(n));
  },
  useLayoutEffect: es,
  useRef: function (t) {
    return ns(function () {
      return {
        current: t
      };
    }, []);
  },
  useImperativeHandle: function (t, e, n) {
    es(function () {
      "function" == typeof t ? t(e()) : t && (t.current = e());
    }, null == n ? n : n.concat(t));
  },
  useMemo: ns,
  useCallback: function (t, e) {
    return ns(function () {
      return t;
    }, e);
  },
  useContext: function (t) {
    var e = Ho.context[t.__c];
    if (!e) return t.__;
    var n = Qo(zo++);
    return null == n.__ && (n.__ = !0, e.sub(Ho)), e.props.value;
  },
  useDebugValue: function (t, e) {
    so.useDebugValue && so.useDebugValue(e ? e(t) : t);
  },
  useErrorBoundary: function (t) {
    var e = Qo(zo++),
        n = Xo();
    return e.__ = t, Ho.componentDidCatch || (Ho.componentDidCatch = function (t) {
      e.__ && e.__(t), n[1](t);
    }), [n[0], function () {
      n[1](void 0);
    }];
  }
}),
    cs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = '.-walletlink-css-reset .-walletlink-link-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-walletlink-css-reset .-walletlink-link-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.33);transition:opacity .25s}.-walletlink-css-reset .-walletlink-link-dialog-backdrop-hidden{opacity:0}.-walletlink-css-reset .-walletlink-link-dialog-box{display:flex;position:relative;flex-direction:column;background-color:#f6f6f6;border-radius:16px;box-shadow:0px 16px 24px rgba(0,0,0,.1),0px 0px 8px rgba(0,0,0,.05);transform:scale(1);transition:opacity .25s,transform .25s;overflow:hidden}.-walletlink-css-reset .-walletlink-link-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-walletlink-css-reset .-walletlink-link-dialog-box-content{padding:24px;text-align:center}.-walletlink-css-reset .-walletlink-link-dialog-box-content h3{display:block;margin-bottom:24px;text-align:left;text-transform:uppercase;font-size:22px;font-weight:bold;line-height:1.2;color:#000}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode{position:relative;display:block;margin-bottom:24px;background-color:#f6f6f6;padding:16px;border-radius:16px;box-shadow:4px 4px 8px rgba(0,0,0,.15),-8px -8px 8px #fff;overflow:hidden}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-wrapper{display:block;width:232px;height:232px;padding:4px;border-radius:4px;background:#f4f4f4;margin-bottom:16px}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-wrapper img{display:block;width:224px;height:224px}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode>p{display:block;color:gray;font-weight:bold;font-size:12px;text-align:center}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-connecting{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(246,246,246,.98)}.-walletlink-css-reset .-walletlink-link-dialog-box-content-qrcode-connecting p{margin-top:16px;color:#333;font-size:12px;font-weight:bold}.-walletlink-css-reset .-walletlink-link-dialog-box-content a{text-align:center;cursor:pointer;transition:color .1s;font-size:14px}.-walletlink-css-reset .-walletlink-link-dialog-box-content a,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:link,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:visited{color:#999}.-walletlink-css-reset .-walletlink-link-dialog-box-content a:hover,.-walletlink-css-reset .-walletlink-link-dialog-box-content a:active{color:#666;text-decoration:underline}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel{position:absolute;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;top:24px;right:24px;width:24px;height:24px;border-radius:12px;background-color:#e7e7e7;cursor:pointer}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x{position:relative;display:block}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::after{content:"";position:absolute;display:block;top:-1px;left:-7px;width:14px;height:2px;background-color:#999;transition:background-color .2s}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::before{transform:rotate(45deg)}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel-x::after{transform:rotate(135deg)}.-walletlink-css-reset .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-a,.-walletlink-css-reset .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x-b{background-color:#000}.-walletlink-css-reset .-walletlink-link-dialog-container{display:block}.-walletlink-css-reset .-walletlink-link-dialog-container-hidden{display:none}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box{background-color:#2a2a2a}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content h3{color:#ccc}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode{background-color:#2a2a2a;box-shadow:4px 4px 8px rgba(0,0,0,.5),-8px -8px 8px #343434}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode>p{color:#999}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode-connecting{background:rgba(42,42,42,.98)}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content-qrcode-connecting p{color:#ddd}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:link,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:visited{color:#888}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:hover,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-content a:active{color:#aaa}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel{background-color:#333}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel-x::after{background-color:#aaa}.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x::before,.-walletlink-css-reset .-walletlink-link-dialog-container-dark .-walletlink-link-dialog-box-cancel:hover .-walletlink-link-dialog-box-cancel-x::after{background-color:#eee}';
});

function ls(t) {
  this.mode = fs.MODE_8BIT_BYTE, this.data = t, this.parsedData = [];

  for (var e = 0, n = this.data.length; e < n; e++) {
    var i = [],
        r = this.data.charCodeAt(e);
    r > 65536 ? (i[0] = 240 | (1835008 & r) >>> 18, i[1] = 128 | (258048 & r) >>> 12, i[2] = 128 | (4032 & r) >>> 6, i[3] = 128 | 63 & r) : r > 2048 ? (i[0] = 224 | (61440 & r) >>> 12, i[1] = 128 | (4032 & r) >>> 6, i[2] = 128 | 63 & r) : r > 128 ? (i[0] = 192 | (1984 & r) >>> 6, i[1] = 128 | 63 & r) : i[0] = r, this.parsedData.push(i);
  }

  this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));
}

function hs(t, e) {
  this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [];
}

(0, _indexD3bd.e)(cs), ls.prototype = {
  getLength: function (t) {
    return this.parsedData.length;
  },
  write: function (t) {
    for (var e = 0, n = this.parsedData.length; e < n; e++) t.put(this.parsedData[e], 8);
  }
}, hs.prototype = {
  addData: function (t) {
    var e = new ls(t);
    this.dataList.push(e), this.dataCache = null;
  },
  isDark: function (t, e) {
    if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
    return this.modules[t][e];
  },
  getModuleCount: function () {
    return this.moduleCount;
  },
  make: function () {
    this.makeImpl(!1, this.getBestMaskPattern());
  },
  makeImpl: function (t, e) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);

    for (var n = 0; n < this.moduleCount; n++) {
      this.modules[n] = new Array(this.moduleCount);

      for (var i = 0; i < this.moduleCount; i++) this.modules[n][i] = null;
    }

    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), this.typeNumber >= 7 && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = hs.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e);
  },
  setupPositionProbePattern: function (t, e) {
    for (var n = -1; n <= 7; n++) if (!(t + n <= -1 || this.moduleCount <= t + n)) for (var i = -1; i <= 7; i++) e + i <= -1 || this.moduleCount <= e + i || (this.modules[t + n][e + i] = 0 <= n && n <= 6 && (0 == i || 6 == i) || 0 <= i && i <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= i && i <= 4);
  },
  getBestMaskPattern: function () {
    for (var t = 0, e = 0, n = 0; n < 8; n++) {
      this.makeImpl(!0, n);
      var i = Ms.getLostPoint(this);
      (0 == n || t > i) && (t = i, e = n);
    }

    return e;
  },
  createMovieClip: function (t, e, n) {
    var i = t.createEmptyMovieClip(e, n);
    this.make();

    for (var r = 0; r < this.modules.length; r++) for (var o = 1 * r, s = 0; s < this.modules[r].length; s++) {
      var u = 1 * s;
      this.modules[r][s] && (i.beginFill(0, 100), i.moveTo(u, o), i.lineTo(u + 1, o), i.lineTo(u + 1, o + 1), i.lineTo(u, o + 1), i.endFill());
    }

    return i;
  },
  setupTimingPattern: function () {
    for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);

    for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
  },
  setupPositionAdjustPattern: function () {
    for (var t = Ms.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var n = 0; n < t.length; n++) {
      var i = t[e],
          r = t[n];
      if (null == this.modules[i][r]) for (var o = -2; o <= 2; o++) for (var s = -2; s <= 2; s++) this.modules[i + o][r + s] = -2 == o || 2 == o || -2 == s || 2 == s || 0 == o && 0 == s;
    }
  },
  setupTypeNumber: function (t) {
    for (var e = Ms.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
      var i = !t && 1 == (e >> n & 1);
      this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = i;
    }

    for (n = 0; n < 18; n++) {
      i = !t && 1 == (e >> n & 1);
      this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = i;
    }
  },
  setupTypeInfo: function (t, e) {
    for (var n = this.errorCorrectLevel << 3 | e, i = Ms.getBCHTypeInfo(n), r = 0; r < 15; r++) {
      var o = !t && 1 == (i >> r & 1);
      r < 6 ? this.modules[r][8] = o : r < 8 ? this.modules[r + 1][8] = o : this.modules[this.moduleCount - 15 + r][8] = o;
    }

    for (r = 0; r < 15; r++) {
      o = !t && 1 == (i >> r & 1);
      r < 8 ? this.modules[8][this.moduleCount - r - 1] = o : r < 9 ? this.modules[8][15 - r - 1 + 1] = o : this.modules[8][15 - r - 1] = o;
    }

    this.modules[this.moduleCount - 8][8] = !t;
  },
  mapData: function (t, e) {
    for (var n = -1, i = this.moduleCount - 1, r = 7, o = 0, s = this.moduleCount - 1; s > 0; s -= 2) for (6 == s && s--;;) {
      for (var u = 0; u < 2; u++) if (null == this.modules[i][s - u]) {
        var a = !1;
        o < t.length && (a = 1 == (t[o] >>> r & 1)), Ms.getMask(e, i, s - u) && (a = !a), this.modules[i][s - u] = a, -1 == --r && (o++, r = 7);
      }

      if ((i += n) < 0 || this.moduleCount <= i) {
        i -= n, n = -n;
        break;
      }
    }
  }
}, hs.PAD0 = 236, hs.PAD1 = 17, hs.createData = function (t, e, n) {
  for (var i = Ts.getRSBlocks(t, e), r = new Is(), o = 0; o < n.length; o++) {
    var s = n[o];
    r.put(s.mode, 4), r.put(s.getLength(), Ms.getLengthInBits(s.mode, t)), s.write(r);
  }

  var u = 0;

  for (o = 0; o < i.length; o++) u += i[o].dataCount;

  if (r.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + r.getLengthInBits() + ">" + 8 * u + ")");

  for (r.getLengthInBits() + 4 <= 8 * u && r.put(0, 4); r.getLengthInBits() % 8 != 0;) r.putBit(!1);

  for (; !(r.getLengthInBits() >= 8 * u || (r.put(hs.PAD0, 8), r.getLengthInBits() >= 8 * u));) r.put(hs.PAD1, 8);

  return hs.createBytes(r, i);
}, hs.createBytes = function (t, e) {
  for (var n = 0, i = 0, r = 0, o = new Array(e.length), s = new Array(e.length), u = 0; u < e.length; u++) {
    var a = e[u].dataCount,
        c = e[u].totalCount - a;
    i = Math.max(i, a), r = Math.max(r, c), o[u] = new Array(a);

    for (var l = 0; l < o[u].length; l++) o[u][l] = 255 & t.buffer[l + n];

    n += a;
    var h = Ms.getErrorCorrectPolynomial(c),
        f = new Ns(o[u], h.getLength() - 1).mod(h);
    s[u] = new Array(h.getLength() - 1);

    for (l = 0; l < s[u].length; l++) {
      var d = l + f.getLength() - s[u].length;
      s[u][l] = d >= 0 ? f.get(d) : 0;
    }
  }

  var p = 0;

  for (l = 0; l < e.length; l++) p += e[l].totalCount;

  var m = new Array(p),
      b = 0;

  for (l = 0; l < i; l++) for (u = 0; u < e.length; u++) l < o[u].length && (m[b++] = o[u][l]);

  for (l = 0; l < r; l++) for (u = 0; u < e.length; u++) l < s[u].length && (m[b++] = s[u][l]);

  return m;
};

for (var fs = {
  MODE_NUMBER: 1,
  MODE_ALPHA_NUM: 2,
  MODE_8BIT_BYTE: 4,
  MODE_KANJI: 8
}, ds = 1, ps = 0, ms = 3, bs = 2, gs = 0, vs = 1, ys = 2, ws = 3, _s = 4, ks = 5, xs = 6, Ss = 7, Ms = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1335,
  G18: 7973,
  G15_MASK: 21522,
  getBCHTypeInfo: function (t) {
    for (var e = t << 10; Ms.getBCHDigit(e) - Ms.getBCHDigit(Ms.G15) >= 0;) e ^= Ms.G15 << Ms.getBCHDigit(e) - Ms.getBCHDigit(Ms.G15);

    return (t << 10 | e) ^ Ms.G15_MASK;
  },
  getBCHTypeNumber: function (t) {
    for (var e = t << 12; Ms.getBCHDigit(e) - Ms.getBCHDigit(Ms.G18) >= 0;) e ^= Ms.G18 << Ms.getBCHDigit(e) - Ms.getBCHDigit(Ms.G18);

    return t << 12 | e;
  },
  getBCHDigit: function (t) {
    for (var e = 0; 0 != t;) e++, t >>>= 1;

    return e;
  },
  getPatternPosition: function (t) {
    return Ms.PATTERN_POSITION_TABLE[t - 1];
  },
  getMask: function (t, e, n) {
    switch (t) {
      case gs:
        return (e + n) % 2 == 0;

      case vs:
        return e % 2 == 0;

      case ys:
        return n % 3 == 0;

      case ws:
        return (e + n) % 3 == 0;

      case _s:
        return (Math.floor(e / 2) + Math.floor(n / 3)) % 2 == 0;

      case ks:
        return e * n % 2 + e * n % 3 == 0;

      case xs:
        return (e * n % 2 + e * n % 3) % 2 == 0;

      case Ss:
        return (e * n % 3 + (e + n) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + t);
    }
  },
  getErrorCorrectPolynomial: function (t) {
    for (var e = new Ns([1], 0), n = 0; n < t; n++) e = e.multiply(new Ns([1, Es.gexp(n)], 0));

    return e;
  },
  getLengthInBits: function (t, e) {
    if (1 <= e && e < 10) switch (t) {
      case fs.MODE_NUMBER:
        return 10;

      case fs.MODE_ALPHA_NUM:
        return 9;

      case fs.MODE_8BIT_BYTE:
      case fs.MODE_KANJI:
        return 8;

      default:
        throw new Error("mode:" + t);
    } else if (e < 27) switch (t) {
      case fs.MODE_NUMBER:
        return 12;

      case fs.MODE_ALPHA_NUM:
        return 11;

      case fs.MODE_8BIT_BYTE:
        return 16;

      case fs.MODE_KANJI:
        return 10;

      default:
        throw new Error("mode:" + t);
    } else {
      if (!(e < 41)) throw new Error("type:" + e);

      switch (t) {
        case fs.MODE_NUMBER:
          return 14;

        case fs.MODE_ALPHA_NUM:
          return 13;

        case fs.MODE_8BIT_BYTE:
          return 16;

        case fs.MODE_KANJI:
          return 12;

        default:
          throw new Error("mode:" + t);
      }
    }
  },
  getLostPoint: function (t) {
    for (var e = t.getModuleCount(), n = 0, i = 0; i < e; i++) for (var r = 0; r < e; r++) {
      for (var o = 0, s = t.isDark(i, r), u = -1; u <= 1; u++) if (!(i + u < 0 || e <= i + u)) for (var a = -1; a <= 1; a++) r + a < 0 || e <= r + a || 0 == u && 0 == a || s == t.isDark(i + u, r + a) && o++;

      o > 5 && (n += 3 + o - 5);
    }

    for (i = 0; i < e - 1; i++) for (r = 0; r < e - 1; r++) {
      var c = 0;
      t.isDark(i, r) && c++, t.isDark(i + 1, r) && c++, t.isDark(i, r + 1) && c++, t.isDark(i + 1, r + 1) && c++, 0 != c && 4 != c || (n += 3);
    }

    for (i = 0; i < e; i++) for (r = 0; r < e - 6; r++) t.isDark(i, r) && !t.isDark(i, r + 1) && t.isDark(i, r + 2) && t.isDark(i, r + 3) && t.isDark(i, r + 4) && !t.isDark(i, r + 5) && t.isDark(i, r + 6) && (n += 40);

    for (r = 0; r < e; r++) for (i = 0; i < e - 6; i++) t.isDark(i, r) && !t.isDark(i + 1, r) && t.isDark(i + 2, r) && t.isDark(i + 3, r) && t.isDark(i + 4, r) && !t.isDark(i + 5, r) && t.isDark(i + 6, r) && (n += 40);

    var l = 0;

    for (r = 0; r < e; r++) for (i = 0; i < e; i++) t.isDark(i, r) && l++;

    return n += 10 * (Math.abs(100 * l / e / e - 50) / 5);
  }
}, Es = {
  glog: function (t) {
    if (t < 1) throw new Error("glog(" + t + ")");
    return Es.LOG_TABLE[t];
  },
  gexp: function (t) {
    for (; t < 0;) t += 255;

    for (; t >= 256;) t -= 255;

    return Es.EXP_TABLE[t];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
}, Cs = 0; Cs < 8; Cs++) Es.EXP_TABLE[Cs] = 1 << Cs;

for (Cs = 8; Cs < 256; Cs++) Es.EXP_TABLE[Cs] = Es.EXP_TABLE[Cs - 4] ^ Es.EXP_TABLE[Cs - 5] ^ Es.EXP_TABLE[Cs - 6] ^ Es.EXP_TABLE[Cs - 8];

for (Cs = 0; Cs < 255; Cs++) Es.LOG_TABLE[Es.EXP_TABLE[Cs]] = Cs;

function Ns(t, e) {
  if (null == t.length) throw new Error(t.length + "/" + e);

  for (var n = 0; n < t.length && 0 == t[n];) n++;

  this.num = new Array(t.length - n + e);

  for (var i = 0; i < t.length - n; i++) this.num[i] = t[i + n];
}

function Ts(t, e) {
  this.totalCount = t, this.dataCount = e;
}

function Is() {
  this.buffer = [], this.length = 0;
}

Ns.prototype = {
  get: function (t) {
    return this.num[t];
  },
  getLength: function () {
    return this.num.length;
  },
  multiply: function (t) {
    for (var e = new Array(this.getLength() + t.getLength() - 1), n = 0; n < this.getLength(); n++) for (var i = 0; i < t.getLength(); i++) e[n + i] ^= Es.gexp(Es.glog(this.get(n)) + Es.glog(t.get(i)));

    return new Ns(e, 0);
  },
  mod: function (t) {
    if (this.getLength() - t.getLength() < 0) return this;

    for (var e = Es.glog(this.get(0)) - Es.glog(t.get(0)), n = new Array(this.getLength()), i = 0; i < this.getLength(); i++) n[i] = this.get(i);

    for (i = 0; i < t.getLength(); i++) n[i] ^= Es.gexp(Es.glog(t.get(i)) + e);

    return new Ns(n, 0).mod(t);
  }
}, Ts.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], Ts.getRSBlocks = function (t, e) {
  var n = Ts.getRsBlockTable(t, e);
  if (null == n) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);

  for (var i = n.length / 3, r = [], o = 0; o < i; o++) for (var s = n[3 * o + 0], u = n[3 * o + 1], a = n[3 * o + 2], c = 0; c < s; c++) r.push(new Ts(u, a));

  return r;
}, Ts.getRsBlockTable = function (t, e) {
  switch (e) {
    case ds:
      return Ts.RS_BLOCK_TABLE[4 * (t - 1) + 0];

    case ps:
      return Ts.RS_BLOCK_TABLE[4 * (t - 1) + 1];

    case ms:
      return Ts.RS_BLOCK_TABLE[4 * (t - 1) + 2];

    case bs:
      return Ts.RS_BLOCK_TABLE[4 * (t - 1) + 3];

    default:
      return;
  }
}, Is.prototype = {
  get: function (t) {
    var e = Math.floor(t / 8);
    return 1 == (this.buffer[e] >>> 7 - t % 8 & 1);
  },
  put: function (t, e) {
    for (var n = 0; n < e; n++) this.putBit(1 == (t >>> e - n - 1 & 1));
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (t) {
    var e = Math.floor(this.length / 8);
    this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;
  }
};
var As = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

function Os(t) {
  if (this.options = {
    padding: 4,
    width: 256,
    height: 256,
    typeNumber: 4,
    color: "#000000",
    background: "#ffffff",
    ecl: "M"
  }, "string" == typeof t && (t = {
    content: t
  }), t) for (var e in t) this.options[e] = t[e];
  if ("string" != typeof this.options.content) throw new Error("Expected 'content' as string!");
  if (0 === this.options.content.length) throw new Error("Expected 'content' to be non-empty!");
  if (!(this.options.padding >= 0)) throw new Error("Expected 'padding' value to be non-negative!");
  if (!(this.options.width > 0 && this.options.height > 0)) throw new Error("Expected 'width' or 'height' value to be higher than zero!");

  var n = this.options.content,
      i = function (t, e) {
    for (var n = function (t) {
      var e = encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
      return e.length + (e.length != t ? 3 : 0);
    }(t), i = 1, r = 0, o = 0, s = As.length; o <= s; o++) {
      var u = As[o];
      if (!u) throw new Error("Content too long: expected " + r + " but got " + n);

      switch (e) {
        case "L":
          r = u[0];
          break;

        case "M":
          r = u[1];
          break;

        case "Q":
          r = u[2];
          break;

        case "H":
          r = u[3];
          break;

        default:
          throw new Error("Unknwon error correction level: " + e);
      }

      if (n <= r) break;
      i++;
    }

    if (i > As.length) throw new Error("Content too long");
    return i;
  }(n, this.options.ecl),
      r = function (t) {
    switch (t) {
      case "L":
        return ds;

      case "M":
        return ps;

      case "Q":
        return ms;

      case "H":
        return bs;

      default:
        throw new Error("Unknwon error correction level: " + t);
    }
  }(this.options.ecl);

  this.qrcode = new hs(i, r), this.qrcode.addData(n), this.qrcode.make();
}

Os.prototype.svg = function (t) {
  var e = this.options || {},
      n = this.qrcode.modules;
  void 0 === t && (t = {
    container: e.container || "svg"
  });

  for (var i = void 0 === e.pretty || !!e.pretty, r = i ? "  " : "", o = i ? "\r\n" : "", s = e.width, u = e.height, a = n.length, c = s / (a + 2 * e.padding), l = u / (a + 2 * e.padding), h = void 0 !== e.join && !!e.join, f = void 0 !== e.swap && !!e.swap, d = void 0 === e.xmlDeclaration || !!e.xmlDeclaration, p = void 0 !== e.predefined && !!e.predefined, m = p ? r + '<defs><path id="qrmodule" d="M0 0 h' + l + " v" + c + ' H0 z" style="fill:' + e.color + ';shape-rendering:crispEdges;" /></defs>' + o : "", b = r + '<rect x="0" y="0" width="' + s + '" height="' + u + '" style="fill:' + e.background + ';shape-rendering:crispEdges;"/>' + o, g = "", v = "", y = 0; y < a; y++) for (var w = 0; w < a; w++) {
    if (n[w][y]) {
      var _ = w * c + e.padding * c,
          k = y * l + e.padding * l;

      if (f) {
        var x = _;
        _ = k, k = x;
      }

      if (h) {
        var S = c + _,
            M = l + k;
        _ = Number.isInteger(_) ? Number(_) : _.toFixed(2), k = Number.isInteger(k) ? Number(k) : k.toFixed(2), S = Number.isInteger(S) ? Number(S) : S.toFixed(2), v += "M" + _ + "," + k + " V" + (M = Number.isInteger(M) ? Number(M) : M.toFixed(2)) + " H" + S + " V" + k + " H" + _ + " Z ";
      } else g += p ? r + '<use x="' + _.toString() + '" y="' + k.toString() + '" href="#qrmodule" />' + o : r + '<rect x="' + _.toString() + '" y="' + k.toString() + '" width="' + c + '" height="' + l + '" style="fill:' + e.color + ';shape-rendering:crispEdges;"/>' + o;
    }
  }

  h && (g = r + '<path x="0" y="0" style="fill:' + e.color + ';shape-rendering:crispEdges;" d="' + v + '" />');
  var E = "";

  switch (t.container) {
    case "svg":
      d && (E += '<?xml version="1.0" standalone="yes"?>' + o), E += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + s + '" height="' + u + '">' + o, E += m + b + g, E += "</svg>";
      break;

    case "svg-viewbox":
      d && (E += '<?xml version="1.0" standalone="yes"?>' + o), E += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + s + " " + u + '">' + o, E += m + b + g, E += "</svg>";
      break;

    case "g":
      E += '<g width="' + s + '" height="' + u + '">' + o, E += m + b + g, E += "</g>";
      break;

    default:
      E += (m + b + g).replace(/^\s+/, "");
  }

  return E;
};

var Ps = Os,
    Rs = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(Ps);

  n.QRCode = t => {
    const [e, n] = as.useState("");
    return as.useEffect(() => {
      var e, i;
      const o = new r.default({
        content: t.content,
        background: t.bgColor || "#ffffff",
        color: t.fgColor || "#000000",
        container: "svg",
        ecl: "M",
        width: null !== (e = t.width) && void 0 !== e ? e : 256,
        height: null !== (i = t.height) && void 0 !== i ? i : 256,
        padding: 0
      }),
            s = Buffer.from(o.svg(), "utf8").toString("base64");
      n(`data:image/svg+xml;base64,${s}`);
    }), e ? qo.h("img", {
      src: e,
      alt: "QR Code"
    }) : null;
  };
});
(0, _indexD3bd.e)(Rs);
Rs.QRCode;
var js = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = ".-walletlink-css-reset .-walletlink-spinner{display:inline-block}.-walletlink-css-reset .-walletlink-spinner svg{display:inline-block;animation:2s linear infinite -walletlink-spinner-svg}.-walletlink-css-reset .-walletlink-spinner svg circle{animation:1.9s ease-in-out infinite both -walletlink-spinner-circle;display:block;fill:transparent;stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -walletlink-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -walletlink-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}";
});
(0, _indexD3bd.e)(js);
var Bs = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(js);

  n.Spinner = t => {
    var e;
    const n = null !== (e = t.size) && void 0 !== e ? e : 64,
          i = t.color || "#000";
    return qo.h("div", {
      class: "-walletlink-spinner"
    }, qo.h("style", null, r.default), qo.h("svg", {
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        width: n,
        height: n
      }
    }, qo.h("circle", {
      style: {
        cx: 50,
        cy: 50,
        r: 45,
        stroke: i
      }
    })));
  };
});
(0, _indexD3bd.e)(Bs);
Bs.Spinner;
var Ds = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(Vo),
        o = i(cs);

  n.LinkDialog = t => {
    const [e, n] = as.useState(!t.isOpen),
          [i, a] = as.useState(!t.isOpen);
    return as.useEffect(() => {
      const {
        isOpen: e
      } = t,
            i = [window.setTimeout(() => {
        a(!e);
      }, 10)];
      return e ? n(!1) : i.push(window.setTimeout(() => {
        n(!0);
      }, 360)), () => {
        i.forEach(window.clearTimeout);
      };
    }, [t.isOpen]), qo.h("div", {
      class: r.default("-walletlink-link-dialog-container", t.darkMode && "-walletlink-link-dialog-container-dark", e && "-walletlink-link-dialog-container-hidden")
    }, qo.h("style", null, o.default), qo.h("div", {
      class: r.default("-walletlink-link-dialog-backdrop", i && "-walletlink-link-dialog-backdrop-hidden")
    }), qo.h("div", {
      class: "-walletlink-link-dialog"
    }, qo.h("div", {
      class: r.default("-walletlink-link-dialog-box", i && "-walletlink-link-dialog-box-hidden")
    }, qo.h(s, {
      darkMode: t.darkMode,
      version: t.version,
      sessionId: t.sessionId,
      sessionSecret: t.sessionSecret,
      walletLinkUrl: t.walletLinkUrl,
      isConnected: t.isConnected
    }), t.onCancel && qo.h(u, {
      onClick: t.onCancel
    }))));
  };

  const s = t => {
    const e = window.encodeURIComponent(t.walletLinkUrl),
          n = `${t.walletLinkUrl}/#/link?id=${t.sessionId}&secret=${t.sessionSecret}&server=${e}&v=1`;
    return qo.h("div", {
      class: "-walletlink-link-dialog-box-content"
    }, qo.h("h3", null, "Scan to", qo.h("br", null), " Connect"), qo.h("div", {
      class: "-walletlink-link-dialog-box-content-qrcode"
    }, qo.h("div", {
      class: "-walletlink-link-dialog-box-content-qrcode-wrapper"
    }, qo.h(Rs.QRCode, {
      content: n,
      width: 224,
      height: 224,
      fgColor: "#000",
      bgColor: "transparent"
    })), qo.h("input", {
      type: "hidden",
      value: n
    }), !t.isConnected && qo.h("div", {
      class: "-walletlink-link-dialog-box-content-qrcode-connecting"
    }, qo.h(Bs.Spinner, {
      size: 128,
      color: t.darkMode ? "#fff" : "#000"
    }), qo.h("p", null, "Connecting...")), qo.h("p", {
      title: `WalletLink v${t.version}`
    }, "Powered by WalletLink")), qo.h("a", {
      href: `${t.walletLinkUrl}/#/wallets`,
      target: "_blank",
      rel: "noopener"
    }, "Don’t have a wallet app?"));
  },
        u = t => qo.h("button", {
    class: "-walletlink-link-dialog-box-cancel",
    onClick: t.onClick
  }, qo.h("div", {
    class: "-walletlink-link-dialog-box-cancel-x"
  }));
});
(0, _indexD3bd.e)(Ds);
Ds.LinkDialog;
var Ls = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.LinkFlow = class {
    constructor(t) {
      this.subscriptions = new fn.Subscription(), this.isConnected = !1, this.isOpen = !1, this.onCancel = null, this.root = null, this.darkMode = t.darkMode, this.version = t.version, this.sessionId = t.sessionId, this.sessionSecret = t.sessionSecret, this.walletLinkUrl = t.walletLinkUrl, this.connected$ = t.connected$;
    }

    attach(t) {
      this.root = document.createElement("div"), this.root.className = "-walletlink-link-flow-root", t.appendChild(this.root), this.render(), this.subscriptions.add(this.connected$.subscribe(t => {
        this.isConnected !== t && (this.isConnected = t, this.render());
      }));
    }

    detach() {
      var t;
      this.root && (this.subscriptions.unsubscribe(), qo.render(null, this.root), null === (t = this.root.parentElement) || void 0 === t || t.removeChild(this.root));
    }

    open(t) {
      this.isOpen = !0, this.onCancel = t.onCancel, this.render();
    }

    close() {
      this.isOpen = !1, this.onCancel = null, this.render();
    }

    render() {
      this.root && qo.render(qo.h(Ds.LinkDialog, {
        darkMode: this.darkMode,
        version: this.version,
        sessionId: this.sessionId,
        sessionSecret: this.sessionSecret,
        walletLinkUrl: this.walletLinkUrl,
        isOpen: this.isOpen,
        isConnected: this.isConnected,
        onCancel: this.onCancel
      }), this.root);
    }

  };
});
(0, _indexD3bd.e)(Ls);
Ls.LinkFlow;
var Fs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = '.-walletlink-css-reset .-walletlink-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-walletlink-css-reset .-walletlink-snackbar-item{background-color:#fff;border-radius:8px;box-shadow:0px 16px 24px rgba(0,0,0,.06),0px 0px 8px rgba(0,0,0,.04);display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:hidden;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-walletlink-css-reset .-walletlink-snackbar-item-content{align-items:center;cursor:pointer;display:flex;flex-direction:row;justify-content:space-between;padding:8px 8px 8px 16px;user-select:none}.-walletlink-css-reset .-walletlink-snackbar-item-content-message{color:#000;font-size:14px;line-height:1.5}.-walletlink-css-reset .-walletlink-snackbar-item-content-chevron{position:relative;display:block;margin:0 8px;transition:transform .05s}.-walletlink-css-reset .-walletlink-snackbar-item-content-chevron::before{position:relative;top:-2px;content:"";display:block;border-top:2px solid #000;border-left:2px solid #000;width:8px;height:8px;transform:rotate(-135deg)}.-walletlink-css-reset .-walletlink-snackbar-item-progress-bar{display:block;height:2px;position:relative}.-walletlink-css-reset .-walletlink-snackbar-item-progress-bar::before{animation:-walletlink-snackbar-progressbar 2s linear infinite;background-image:linear-gradient(to right, rgba(22, 82, 240, 0) 0%, #1652f0 100%);content:"";height:100%;left:-100%;position:absolute;width:100%}.-walletlink-css-reset .-walletlink-snackbar-item-actions{display:none;flex-direction:column;border-top:1px solid #f5f7f8;padding:2px 16px 8px}.-walletlink-css-reset .-walletlink-snackbar-item-actions-item{margin:8px 0}.-walletlink-css-reset .-walletlink-snackbar-item-actions-item-info{color:#888;font-size:14px;margin:0 8px 0 0}.-walletlink-css-reset .-walletlink-snackbar-item-actions-item-button{-webkit-appearance:none;-webkit-text-fill-color:#1652f0;background:transparent;color:#1652f0;cursor:pointer;display:inline;font-size:14px;margin:0;padding:0;transition:opacity .25s}.-walletlink-css-reset .-walletlink-snackbar-item-actions-item-button:active{opacity:.6}.-walletlink-css-reset .-walletlink-snackbar-item-hidden{opacity:0;text-align:left;transform:translateX(25%)}.-walletlink-css-reset .-walletlink-snackbar-item-expanded .-walletlink-snackbar-item-content-chevron{transform:rotate(180deg)}.-walletlink-css-reset .-walletlink-snackbar-item-expanded .-walletlink-snackbar-item-actions{display:flex}.-walletlink-css-reset .-walletlink-snackbar-container-dark .-walletlink-snackbar-item{background-color:#2a2a2a}.-walletlink-css-reset .-walletlink-snackbar-container-dark .-walletlink-snackbar-item-content-message{color:#999}.-walletlink-css-reset .-walletlink-snackbar-container-dark .-walletlink-snackbar-item-content-chevron::before{border-top:2px solid #ccc;border-left:2px solid #ccc}.-walletlink-css-reset .-walletlink-snackbar-container-dark .-walletlink-snackbar-item-progress-bar::before{animation:-walletlink-snackbar-progressbar-dark 2s linear infinite;background-image:linear-gradient(to right, rgba(69, 120, 255, 0) 0%, #4578ff 100%)}.-walletlink-css-reset .-walletlink-snackbar-container-dark .-walletlink-snackbar-item-actions{border-top:1px solid #343434}.-walletlink-css-reset .-walletlink-snackbar-container-dark .-walletlink-snackbar-item-actions-item-button{-webkit-text-fill-color:#ccc;color:#ccc}@keyframes -walletlink-snackbar-progressbar{0%{left:0;width:0%;background-image:linear-gradient(to right, rgba(22, 82, 240, 0) 0%, #1652f0 100%)}25%{left:0;width:100%}50%{left:100%;width:0%;background-image:linear-gradient(to right, rgba(22, 82, 240, 0) 0%, #1652f0 100%)}50.01%{background-image:linear-gradient(to left, rgba(22, 82, 240, 0) 0%, #1652f0 100%)}75%{left:0;width:100%}100%{left:0;width:0%;background-image:linear-gradient(to left, rgba(22, 82, 240, 0) 0%, #1652f0 100%)}}@keyframes -walletlink-snackbar-progressbar-dark{0%{left:0;width:0%;background-image:linear-gradient(to right, rgba(69, 120, 255, 0) 0%, #4578ff 100%)}25%{left:0;width:100%}50%{left:100%;width:0%;background-image:linear-gradient(to right, rgba(69, 120, 255, 0) 0%, #4578ff 100%)}50.01%{background-image:linear-gradient(to left, rgba(69, 120, 255, 0) 0%, #4578ff 100%)}75%{left:0;width:100%}100%{left:0;width:0%;background-image:linear-gradient(to left, rgba(69, 120, 255, 0) 0%, #4578ff 100%)}}';
});
(0, _indexD3bd.e)(Fs);
var Ws = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(Vo),
        o = i(Fs);
  n.Snackbar = class {
    constructor(t) {
      this.items = new Map(), this.nextItemKey = 0, this.root = null, this.darkMode = t.darkMode;
    }

    attach(t) {
      this.root = document.createElement("div"), this.root.className = "-walletlink-snackbar-root", t.appendChild(this.root), this.render();
    }

    presentItem(t) {
      const e = this.nextItemKey++;
      return this.items.set(e, t), this.render(), () => {
        this.items.delete(e), this.render();
      };
    }

    clear() {
      this.items.clear(), this.render();
    }

    render() {
      this.root && qo.render(qo.h(s, {
        darkMode: this.darkMode
      }, Array.from(this.items.entries()).map(([t, e]) => qo.h(u, Object.assign({}, e, {
        key: t
      })))), this.root);
    }

  };

  const s = t => qo.h("div", {
    class: r.default("-walletlink-snackbar-container", t.darkMode && "-walletlink-snackbar-container-dark")
  }, qo.h("style", null, o.default), qo.h("div", {
    class: "-walletlink-snackbar"
  }, t.children)),
        u = ({
    message: t,
    showProgressBar: e,
    actions: n
  }) => {
    const [i, o] = as.useState(!0),
          [s, u] = as.useState(!1);
    as.useEffect(() => {
      const t = [window.setTimeout(() => {
        o(!1);
      }, 1), window.setTimeout(() => {
        u(!0);
      }, 1e4)];
      return () => {
        t.forEach(window.clearTimeout);
      };
    });
    return qo.h("div", {
      class: r.default("-walletlink-snackbar-item", i && "-walletlink-snackbar-item-hidden", s && "-walletlink-snackbar-item-expanded")
    }, qo.h("div", {
      class: "-walletlink-snackbar-item-content",
      onClick: () => {
        u(!s);
      }
    }, qo.h("div", {
      class: "-walletlink-snackbar-item-content-message"
    }, t), qo.h("div", {
      class: "-walletlink-snackbar-item-content-chevron",
      title: "Expand"
    })), e && qo.h("div", {
      class: "-walletlink-snackbar-item-progress-bar"
    }), n && n.length > 0 && qo.h("div", {
      class: "-walletlink-snackbar-item-actions"
    }, n.map((t, e) => qo.h("div", {
      class: "-walletlink-snackbar-item-actions-item",
      key: e
    }, qo.h("span", {
      class: "-walletlink-snackbar-item-actions-item-info"
    }, t.info), qo.h("button", {
      class: "-walletlink-snackbar-item-actions-item-button",
      onClick: t.onClick
    }, t.buttonLabel)))));
  };
});
(0, _indexD3bd.e)(Ws);
Ws.Snackbar;
var qs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.ClientMessageHostSession = function (t) {
    return Object.assign({
      type: "HostSession"
    }, t);
  }, e.ClientMessageIsLinked = function (t) {
    return Object.assign({
      type: "IsLinked"
    }, t);
  }, e.ClientMessageGetSessionConfig = function (t) {
    return Object.assign({
      type: "GetSessionConfig"
    }, t);
  }, e.ClientMessageSetSessionConfig = function (t) {
    return Object.assign({
      type: "SetSessionConfig"
    }, t);
  }, e.ClientMessagePublishEvent = function (t) {
    return Object.assign({
      type: "PublishEvent"
    }, t);
  };
});
(0, _indexD3bd.e)(qs);
qs.ClientMessageHostSession, qs.ClientMessageIsLinked, qs.ClientMessageGetSessionConfig, qs.ClientMessageSetSessionConfig, qs.ClientMessagePublishEvent;
var Us = (0, _indexD3bd.d)(function (t, e) {
  var n;
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t[t.DISCONNECTED = 0] = "DISCONNECTED", t[t.CONNECTING = 1] = "CONNECTING", t[t.CONNECTED = 2] = "CONNECTED";
  }(n = e.ConnectionState || (e.ConnectionState = {}));
  e.RxWebSocket = class {
    constructor(t, e = WebSocket) {
      this.WebSocketClass = e, this.webSocket = null, this.connectionStateSubject = new fn.BehaviorSubject(n.DISCONNECTED), this.incomingDataSubject = new fn.Subject(), this.url = t.replace(/^http/, "ws");
    }

    connect() {
      return this.webSocket ? fn.throwError(new Error("webSocket object is not null")) : new fn.Observable(t => {
        let e;

        try {
          this.webSocket = e = new this.WebSocketClass(this.url);
        } catch (e) {
          return void t.error(e);
        }

        this.connectionStateSubject.next(n.CONNECTING), e.onclose = e => {
          this.clearWebSocket(), t.error(new Error(`websocket error ${e.code}: ${e.reason}`)), this.connectionStateSubject.next(n.DISCONNECTED);
        }, e.onopen = e => {
          t.next(), t.complete(), this.connectionStateSubject.next(n.CONNECTED);
        }, e.onmessage = t => {
          this.incomingDataSubject.next(t.data);
        };
      }).pipe(mo.take(1));
    }

    disconnect() {
      const {
        webSocket: t
      } = this;

      if (t) {
        this.clearWebSocket(), this.connectionStateSubject.next(n.DISCONNECTED);

        try {
          t.close();
        } catch (t) {}
      }
    }

    get connectionState$() {
      return this.connectionStateSubject.asObservable();
    }

    get incomingData$() {
      return this.incomingDataSubject.asObservable();
    }

    get incomingJSONData$() {
      return this.incomingData$.pipe(mo.flatMap(t => {
        let e;

        try {
          e = JSON.parse(t);
        } catch (t) {
          return fn.empty();
        }

        return fn.of(e);
      }));
    }

    sendData(t) {
      const {
        webSocket: e
      } = this;
      if (!e) throw new Error("websocket is not connected");
      e.send(t);
    }

    clearWebSocket() {
      const {
        webSocket: t
      } = this;
      t && (this.webSocket = null, t.onclose = null, t.onerror = null, t.onmessage = null, t.onopen = null);
    }

  };
});
(0, _indexD3bd.e)(Us);
Us.ConnectionState, Us.RxWebSocket;
var Vs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.isServerMessageFail = function (t) {
    return t && "Fail" === t.type && "number" == typeof t.id && "string" == typeof t.sessionId && "string" == typeof t.error;
  };
});
(0, _indexD3bd.e)(Vs);
Vs.isServerMessageFail;
var zs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.WalletLinkConnection = class {
    constructor(t, e, n, i = WebSocket) {
      this.sessionId = t, this.sessionKey = e, this.subscriptions = new fn.Subscription(), this.destroyed = !1, this.lastHeartbeatResponse = 0, this.nextReqId = c.IntNumber(1), this.connectedSubject = new fn.BehaviorSubject(!1), this.linkedSubject = new fn.BehaviorSubject(!1), this.sessionConfigSubject = new fn.ReplaySubject(1);
      const r = new Us.RxWebSocket(n + "/rpc", i);
      this.ws = r, this.subscriptions.add(r.connectionState$.pipe(mo.skip(1), mo.filter(t => t === Us.ConnectionState.DISCONNECTED && !this.destroyed), mo.delay(5e3), mo.filter(t => !this.destroyed), mo.flatMap(t => r.connect()), mo.retry()).subscribe()), this.subscriptions.add(r.connectionState$.pipe(mo.skip(2), mo.switchMap(t => fn.iif(() => t === Us.ConnectionState.CONNECTED, this.authenticate().pipe(mo.tap(t => this.sendIsLinked()), mo.tap(t => this.sendGetSessionConfig()), mo.map(t => !0)), fn.of(!1))), mo.distinctUntilChanged(), mo.catchError(t => fn.of(!1))).subscribe(t => this.connectedSubject.next(t))), this.subscriptions.add(r.connectionState$.pipe(mo.skip(1), mo.switchMap(t => fn.iif(() => t === Us.ConnectionState.CONNECTED, fn.timer(0, 1e4)))).subscribe(t => 0 === t ? this.updateLastHeartbeat() : this.heartbeat())), this.subscriptions.add(r.incomingData$.pipe(mo.filter(t => "h" === t)).subscribe(t => this.updateLastHeartbeat())), this.subscriptions.add(r.incomingJSONData$.pipe(mo.filter(t => ["IsLinkedOK", "Linked"].includes(t.type))).subscribe(t => {
        const e = t;
        this.linkedSubject.next(e.linked || e.onlineGuests > 0);
      })), this.subscriptions.add(r.incomingJSONData$.pipe(mo.filter(t => ["GetSessionConfigOK", "SessionConfigUpdated"].includes(t.type))).subscribe(t => {
        const e = t;
        this.sessionConfigSubject.next({
          webhookId: e.webhookId,
          webhookUrl: e.webhookUrl,
          metadata: e.metadata
        });
      }));
    }

    connect() {
      if (this.destroyed) throw new Error("instance is destroyed");
      this.ws.connect().subscribe();
    }

    destroy() {
      this.subscriptions.unsubscribe(), this.ws.disconnect(), this.destroyed = !0;
    }

    get connected$() {
      return this.connectedSubject.asObservable();
    }

    get onceConnected$() {
      return this.connected$.pipe(mo.filter(t => t), mo.take(1), mo.map(() => {}));
    }

    get linked$() {
      return this.linkedSubject.asObservable();
    }

    get onceLinked$() {
      return this.linked$.pipe(mo.filter(t => t), mo.take(1), mo.map(() => {}));
    }

    get sessionConfig$() {
      return this.sessionConfigSubject.asObservable();
    }

    get incomingEvent$() {
      return this.ws.incomingJSONData$.pipe(mo.filter(t => {
        if ("Event" !== t.type) return !1;
        const e = t;
        return "string" == typeof e.sessionId && "string" == typeof e.eventId && "string" == typeof e.event && "string" == typeof e.data;
      }), mo.map(t => t));
    }

    setSessionMetadata(t, e) {
      const n = qs.ClientMessageSetSessionConfig({
        id: c.IntNumber(this.nextReqId++),
        sessionId: this.sessionId,
        metadata: {
          [t]: e
        }
      });
      return this.onceConnected$.pipe(mo.flatMap(t => this.makeRequest(n)), mo.map(t => {
        if (Vs.isServerMessageFail(t)) throw new Error(t.error || "failed to set session metadata");
      }));
    }

    publishEvent(t, e, n = !1) {
      const i = qs.ClientMessagePublishEvent({
        id: c.IntNumber(this.nextReqId++),
        sessionId: this.sessionId,
        event: t,
        data: e,
        callWebhook: n
      });
      return this.onceLinked$.pipe(mo.flatMap(t => this.makeRequest(i)), mo.map(t => {
        if (Vs.isServerMessageFail(t)) throw new Error(t.error || "failed to publish event");
        return t.eventId;
      }));
    }

    sendData(t) {
      this.ws.sendData(JSON.stringify(t));
    }

    updateLastHeartbeat() {
      this.lastHeartbeatResponse = Date.now();
    }

    heartbeat() {
      if (Date.now() - this.lastHeartbeatResponse > 2e4) this.ws.disconnect();else try {
        this.ws.sendData("h");
      } catch (t) {}
    }

    makeRequest(t, e = 6e4) {
      const n = t.id;

      try {
        this.sendData(t);
      } catch (t) {
        return fn.throwError(t);
      }

      return this.ws.incomingJSONData$.pipe(mo.timeoutWith(e, fn.throwError(new Error(`request ${n} timed out`))), mo.filter(t => t.id === n), mo.take(1));
    }

    authenticate() {
      const t = qs.ClientMessageHostSession({
        id: c.IntNumber(this.nextReqId++),
        sessionId: this.sessionId,
        sessionKey: this.sessionKey
      });
      return this.makeRequest(t).pipe(mo.map(t => {
        if (Vs.isServerMessageFail(t)) throw new Error(t.error || "failed to authentcate");
      }));
    }

    sendIsLinked() {
      const t = qs.ClientMessageIsLinked({
        id: c.IntNumber(this.nextReqId++),
        sessionId: this.sessionId
      });
      this.sendData(t);
    }

    sendGetSessionConfig() {
      const t = qs.ClientMessageGetSessionConfig({
        id: c.IntNumber(this.nextReqId++),
        sessionId: this.sessionId
      });
      this.sendData(t);
    }

  };
});
(0, _indexD3bd.e)(zs);
zs.WalletLinkConnection;
var Hs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.ScopedLocalStorage = class {
    constructor(t) {
      this.scope = t;
    }

    setItem(t, e) {
      localStorage.setItem(this.scopedKey(t), e);
    }

    getItem(t) {
      return localStorage.getItem(this.scopedKey(t));
    }

    removeItem(t) {
      localStorage.removeItem(this.scopedKey(t));
    }

    clear() {
      const t = this.scopedKey(""),
            e = [];

      for (let n = 0; n < localStorage.length; n++) {
        const i = localStorage.key(n);
        "string" == typeof i && i.startsWith(t) && e.push(i);
      }

      e.forEach(t => localStorage.removeItem(t));
    }

    scopedKey(t) {
      return `${this.scope}:${t}`;
    }

  };
});
(0, _indexD3bd.e)(Hs);
Hs.ScopedLocalStorage;
var $s = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(_crypto_commonjsExternal1a.r);
  n.encrypt = function (t, e) {
    const n = r.default.randomBytes(12),
          i = r.default.createCipheriv("aes-256-gcm", Buffer.from(e, "hex"), n),
          o = Buffer.concat([i.update(Buffer.from(t, "utf8")), i.final()]);
    return Buffer.concat([n, i.getAuthTag(), o]).toString("hex");
  }, n.decrypt = function (t, e) {
    const n = Buffer.from(t, "hex"),
          i = n.slice(0, 12),
          o = n.slice(12, 28),
          s = n.slice(28),
          u = r.default.createDecipheriv("aes-256-gcm", Buffer.from(e, "hex"), i);
    return u.setAuthTag(o), Buffer.concat([u.update(s), u.final()]).toString("utf8");
  };
});
(0, _indexD3bd.e)($s);
$s.encrypt, $s.decrypt;
var Js = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const r = i(_crypto_commonjsExternal1a.r);

  class o {
    constructor(t, e, n, i) {
      this._storage = t, this._id = e || r.default.randomBytes(16).toString("hex"), this._secret = n || r.default.randomBytes(32).toString("hex"), this._key = r.default.createHash("sha256").update(`${this._id}, ${this._secret} WalletLink`, "ascii").digest("hex"), this._linked = !!i;
    }

    static load(t) {
      const e = t.getItem("session:id"),
            n = t.getItem("session:linked"),
            i = t.getItem("session:secret");
      return e && i ? new o(t, e, i, "1" === n) : null;
    }

    static clear(t) {
      t.removeItem("session:secret"), t.removeItem("session:id"), t.removeItem("session:linked");
    }

    static get persistedSessionIdChange$() {
      return fn.fromEvent(window, "storage").pipe(mo.filter(t => "session:id" === t.key), mo.map(t => ({
        oldValue: t.oldValue || null,
        newValue: t.newValue || null
      })));
    }

    get id() {
      return this._id;
    }

    get secret() {
      return this._secret;
    }

    get key() {
      return this._key;
    }

    get linked() {
      return this._linked;
    }

    set linked(t) {
      this._linked = t, this.persistLinked();
    }

    save() {
      return this._storage.setItem("session:id", this._id), this._storage.setItem("session:secret", this._secret), this.persistLinked(), this;
    }

    persistLinked() {
      this._storage.setItem("session:linked", this._linked ? "1" : "0");
    }

  }

  n.Session = o;
});
(0, _indexD3bd.e)(Js);
Js.Session;
var Ks = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t.requestEthereumAccounts = "requestEthereumAccounts", t.signEthereumMessage = "signEthereumMessage", t.signEthereumTransaction = "signEthereumTransaction", t.submitEthereumTransaction = "submitEthereumTransaction", t.ethereumAddressFromSignedMessage = "ethereumAddressFromSignedMessage", t.scanQRCode = "scanQRCode", t.arbitrary = "arbitrary";
  }(e.Web3Method || (e.Web3Method = {}));
});
(0, _indexD3bd.e)(Ks);
Ks.Web3Method;
var Gs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), function (t) {
    t.SESSION_ID_REQUEST = "SESSION_ID_REQUEST", t.SESSION_ID_RESPONSE = "SESSION_ID_RESPONSE", t.LINKED = "LINKED", t.UNLINKED = "UNLINKED", t.WEB3_REQUEST = "WEB3_REQUEST", t.WEB3_REQUEST_CANCELED = "WEB3_REQUEST_CANCELED", t.WEB3_RESPONSE = "WEB3_RESPONSE";
  }(e.RelayMessageType || (e.RelayMessageType = {}));
});
(0, _indexD3bd.e)(Gs);
Gs.RelayMessageType;
var Ys = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.Web3RequestCanceledMessage = function (t) {
    return {
      type: Gs.RelayMessageType.WEB3_REQUEST_CANCELED,
      id: t
    };
  };
});
(0, _indexD3bd.e)(Ys);
Ys.Web3RequestCanceledMessage;
var Zs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.Web3RequestMessage = function (t) {
    return Object.assign({
      type: Gs.RelayMessageType.WEB3_REQUEST
    }, t);
  };
});
(0, _indexD3bd.e)(Zs);
Zs.Web3RequestMessage;
var Qs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.ErrorResponse = function (t, e) {
    return {
      method: t,
      errorMessage: e
    };
  }, e.RequestEthereumAccountsResponse = function (t) {
    return {
      method: Ks.Web3Method.requestEthereumAccounts,
      result: t
    };
  }, e.isRequestEthereumAccountsResponse = function (t) {
    return t && t.method === Ks.Web3Method.requestEthereumAccounts;
  };
});
(0, _indexD3bd.e)(Qs);
Qs.ErrorResponse, Qs.RequestEthereumAccountsResponse, Qs.isRequestEthereumAccountsResponse;
var Xs = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.Web3ResponseMessage = function (t) {
    return Object.assign({
      type: Gs.RelayMessageType.WEB3_RESPONSE
    }, t);
  }, e.isWeb3ResponseMessage = function (t) {
    return t && t.type === Gs.RelayMessageType.WEB3_RESPONSE;
  };
});
(0, _indexD3bd.e)(Xs);
Xs.Web3ResponseMessage, Xs.isWeb3ResponseMessage;
var tu = (0, _indexD3bd.d)(function (t, n) {
  var i = _indexD3bd.f && _indexD3bd.f.__decorate || function (t, e, n, i) {
    var r,
        o = arguments.length,
        s = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i);else for (var u = t.length - 1; u >= 0; u--) (r = t[u]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
    return o > 3 && s && Object.defineProperty(e, n, s), s;
  },
      r = _indexD3bd.f && _indexD3bd.f.__importDefault || function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  },
      o = _indexD3bd.f && _indexD3bd.f.__importStar || function (t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
  };

  Object.defineProperty(n, "__esModule", {
    value: !0
  });
  const a = r(V),
        c = r(_crypto_commonjsExternal1a.r),
        h = r(_url_commonjsExternalAf75b.u),
        f = o($s);

  class d {
    constructor(t) {
      this.appName = "", this.appLogoUrl = null, this.attached = !1, this.walletLinkUrl = t.walletLinkUrl;
      const e = h.default.parse(this.walletLinkUrl);
      this.walletLinkOrigin = `${e.protocol}//${e.host}`, this.storage = new Hs.ScopedLocalStorage(`-walletlink:${this.walletLinkOrigin}`), this.session = Js.Session.load(this.storage) || new Js.Session(this.storage).save(), this.connection = new zs.WalletLinkConnection(this.session.id, this.session.key, this.walletLinkUrl), this.connection.incomingEvent$.pipe(mo.filter(t => "Web3Response" === t.event)).subscribe({
        next: this.handleIncomingEvent
      }), this.connection.sessionConfig$.pipe(mo.filter(t => !!t.metadata && "1" === t.metadata.__destroyed)).subscribe({
        next: this.resetAndReload
      }), this.snackbar = new Ws.Snackbar({
        darkMode: t.darkMode
      }), this.linkFlow = new Ls.LinkFlow({
        darkMode: t.darkMode,
        version: t.version,
        sessionId: this.session.id,
        sessionSecret: this.session.secret,
        walletLinkUrl: this.walletLinkUrl,
        connected$: this.connection.connected$
      }), this.connection.connect();
    }

    resetAndReload() {
      this.connection.setSessionMetadata("__destroyed", "1").pipe(mo.timeout(1e3), mo.catchError(t => fn.of(null))).subscribe(t => {
        this.connection.destroy(), this.storage.clear(), document.location.reload();
      });
    }

    setAppInfo(t, e) {
      this.appName = t, this.appLogoUrl = e;
    }

    attach(t) {
      if (this.attached) throw new Error("WalletLinkRelay is already attached");
      const e = document.createElement("div");
      e.className = "-walletlink-css-reset", t.appendChild(e), this.linkFlow.attach(e), this.snackbar.attach(e);
    }

    getStorageItem(t) {
      return this.storage.getItem(t);
    }

    setStorageItem(t, e) {
      this.storage.setItem(t, e);
    }

    requestEthereumAccounts() {
      return this.sendRequest({
        method: Ks.Web3Method.requestEthereumAccounts,
        params: {
          appName: this.appName,
          appLogoUrl: this.appLogoUrl || null
        }
      });
    }

    signEthereumMessage(t, e, n, i) {
      return this.sendRequest({
        method: Ks.Web3Method.signEthereumMessage,
        params: {
          message: l.hexStringFromBuffer(t, !0),
          address: e,
          addPrefix: n,
          typedDataJson: i || null
        }
      });
    }

    ethereumAddressFromSignedMessage(t, e, n) {
      return this.sendRequest({
        method: Ks.Web3Method.ethereumAddressFromSignedMessage,
        params: {
          message: l.hexStringFromBuffer(t, !0),
          signature: l.hexStringFromBuffer(e, !0),
          addPrefix: n
        }
      });
    }

    signEthereumTransaction(t) {
      return this.sendRequest({
        method: Ks.Web3Method.signEthereumTransaction,
        params: {
          fromAddress: t.fromAddress,
          toAddress: t.toAddress,
          weiValue: l.bigIntStringFromBN(t.weiValue),
          data: l.hexStringFromBuffer(t.data, !0),
          nonce: t.nonce,
          gasPriceInWei: t.gasPriceInWei ? l.bigIntStringFromBN(t.gasPriceInWei) : null,
          gasLimit: t.gasLimit ? l.bigIntStringFromBN(t.gasLimit) : null,
          chainId: t.chainId,
          shouldSubmit: !1
        }
      });
    }

    signAndSubmitEthereumTransaction(t) {
      return this.sendRequest({
        method: Ks.Web3Method.signEthereumTransaction,
        params: {
          fromAddress: t.fromAddress,
          toAddress: t.toAddress,
          weiValue: l.bigIntStringFromBN(t.weiValue),
          data: l.hexStringFromBuffer(t.data, !0),
          nonce: t.nonce,
          gasPriceInWei: t.gasPriceInWei ? l.bigIntStringFromBN(t.gasPriceInWei) : null,
          gasLimit: t.gasLimit ? l.bigIntStringFromBN(t.gasLimit) : null,
          chainId: t.chainId,
          shouldSubmit: !0
        }
      });
    }

    submitEthereumTransaction(t, e) {
      return this.sendRequest({
        method: Ks.Web3Method.submitEthereumTransaction,
        params: {
          signedTransaction: l.hexStringFromBuffer(t, !0),
          chainId: e
        }
      });
    }

    scanQRCode(t) {
      return this.sendRequest({
        method: Ks.Web3Method.scanQRCode,
        params: {
          regExp: t
        }
      });
    }

    arbitraryRequest(t) {
      return this.sendRequest({
        method: Ks.Web3Method.arbitrary,
        params: {
          data: t
        }
      });
    }

    sendRequest(t) {
      return new Promise((e, n) => {
        let i = null;

        const r = c.default.randomBytes(8).toString("hex"),
              o = () => {
          this.publishWeb3RequestCanceledEvent(r), this.handleWeb3ResponseMessage(Xs.Web3ResponseMessage({
            id: r,
            response: Qs.ErrorResponse(t.method, "User rejected request")
          })), null == i || i();
        };

        if (t.method === Ks.Web3Method.requestEthereumAccounts) this.linkFlow.open({
          onCancel: o
        }), d.accountRequestCallbackIds.add(r);else {
          const t = {
            message: "Pushed a request to your wallet...",
            showProgressBar: !0,
            actions: [{
              info: "Made a mistake?",
              buttonLabel: "Cancel",
              onClick: o
            }, {
              info: "Not receiving requests?",
              buttonLabel: "Reset Connection",
              onClick: this.resetAndReload
            }]
          };
          i = this.snackbar.presentItem(t);
        }
        d.callbacks.set(r, t => {
          if (this.linkFlow.close(), null == i || i(), t.errorMessage) return n(new Error(t.errorMessage));
          e(t);
        }), this.publishWeb3RequestEvent(r, t);
      });
    }

    publishWeb3RequestEvent(t, e) {
      const n = Zs.Web3RequestMessage({
        id: t,
        request: e
      });
      this.publishEvent("Web3Request", n, !0).subscribe({
        error: t => {
          this.handleWeb3ResponseMessage(Xs.Web3ResponseMessage({
            id: n.id,
            response: {
              method: n.request.method,
              errorMessage: t.message
            }
          }));
        }
      });
    }

    publishWeb3RequestCanceledEvent(t) {
      const e = Ys.Web3RequestCanceledMessage(t);
      this.publishEvent("Web3RequestCanceled", e, !1).subscribe();
    }

    publishEvent(t, e, n) {
      const i = f.encrypt(JSON.stringify(Object.assign(Object.assign({}, e), {
        origin: location.origin
      })), this.session.secret);
      return this.connection.publishEvent(t, i, n);
    }

    handleIncomingEvent(t) {
      let e;

      try {
        e = JSON.parse(f.decrypt(t.data, this.session.secret));
      } catch (t) {
        return;
      }

      const n = Xs.isWeb3ResponseMessage(e) ? e : null;
      n && this.handleWeb3ResponseMessage(n);
    }

    handleWeb3ResponseMessage(t) {
      const {
        response: e
      } = t;
      if (Qs.isRequestEthereumAccountsResponse(e)) return Array.from(d.accountRequestCallbackIds.values()).forEach(e => this.invokeCallback(Object.assign(Object.assign({}, t), {
        id: e
      }))), void d.accountRequestCallbackIds.clear();
      this.invokeCallback(t);
    }

    invokeCallback(t) {
      const e = d.callbacks.get(t.id);
      e && (e(t.response), d.callbacks.delete(t.id));
    }

  }

  d.callbacks = new Map(), d.accountRequestCallbackIds = new Set(), i([a.default], d.prototype, "resetAndReload", null), i([a.default], d.prototype, "handleIncomingEvent", null), n.WalletLinkRelay = d;
});
(0, _indexD3bd.e)(tu);
tu.WalletLinkRelay;
var eu = ["cipher", "cipherbrowser", "coinbase", "coinbasewallet", "eth", "ether", "ethereum", "etherium", "injection", "toshi", "wallet", "walletlink", "web3"],
    nu = "dist/index.js",
    iu = "https://github.com/walletlink/walletlink.git",
    ru = {
  tsc: "tsc --noEmit --pretty",
  test: "jest",
  "test:watch": "jest --watch",
  build: "node compile-assets.js && webpack --config webpack.config.js",
  "build-chrome": "webpack --config webpack.config.chrome.js",
  "build-npm": "tsc -p ./tsconfig.build.json",
  "build:dev": "export WALLETLINK_URL='http://localhost:3000'; yarn build && yarn build-chrome",
  "build:dev:watch": "nodemon -e 'ts,tsx,js,json,css,scss,svg' --ignore 'src/**/*-css.ts' --ignore 'src/**/*-svg.ts' --watch src/ --watch chrome/ --exec 'yarn build:dev'",
  "build:prod": "yarn build && yarn build-chrome && yarn build-npm && cp ./package.json ../README.md ../LICENSE build/npm && cp -a src/vendor-js build/npm/dist && sed -i '' 's|  \"private\": true,||g' build/npm/package.json",
  lint: "tslint -p . 'src/**/*.ts{,x}'",
  "lint:watch": "nodemon -e ts,tsx,js,json,css,scss,svg --watch src/ --exec 'yarn tsc && yarn lint'"
},
    ou = {
  "bind-decorator": "^1.0.11",
  "bn.js": "^5.1.1",
  clsx: "^1.1.0",
  preact: "^10.3.3",
  rxjs: "^6.5.4"
},
    su = {
  "@types/bn.js": "^4.11.6",
  "@types/jest": "^25.1.3",
  "@types/node": "^13.7.7",
  "copy-webpack-plugin": "^5.1.1",
  "core-js": "^3.6.4",
  glob: "^7.1.6",
  jest: "^25.1.0",
  nodemon: "^2.0.2",
  "raw-loader": "^4.0.0",
  "regenerator-runtime": "^0.13.3",
  "rxjs-tslint": "^0.1.7",
  sass: "^1.26.2",
  svgo: "^1.3.2",
  "ts-jest": "^25.2.1",
  "ts-loader": "^6.2.1",
  tslib: "^1.11.1",
  tslint: "^6.0.0",
  "tslint-config-prettier": "^1.18.0",
  "tslint-config-security": "^1.16.0",
  "tslint-microsoft-contrib": "^6.2.0",
  typescript: "^3.8.3",
  webpack: "^4.42.0",
  "webpack-cli": "^3.3.11",
  "whatwg-fetch": "^3.0.0"
},
    uu = {
  node: ">= 10.0.0"
},
    au = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "js", "json"]
},
    cu = {
  name: "walletlink",
  version: "2.0.2",
  description: "WalletLink JavaScript SDK",
  keywords: eu,
  main: nu,
  types: "dist/index.d.ts",
  repository: iu,
  author: "Coinbase, Inc.",
  license: "Apache-2.0",
  scripts: ru,
  dependencies: ou,
  devDependencies: su,
  engines: uu,
  jest: au
},
    lu = (0, _indexD3bd.h)(Object.freeze({
  __proto__: null,
  name: "walletlink",
  version: "2.0.2",
  description: "WalletLink JavaScript SDK",
  keywords: eu,
  main: nu,
  types: "dist/index.d.ts",
  repository: iu,
  author: "Coinbase, Inc.",
  license: "Apache-2.0",
  scripts: ru,
  dependencies: ou,
  devDependencies: su,
  engines: uu,
  jest: au,
  default: cu
})),
    hu = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  const n = undefined || "https://www.walletlink.org",
        i = undefined || lu.version || "unknown";

  class r {
    constructor(t) {
      this._appName = "", this._appLogoUrl = null, this._relay = new tu.WalletLinkRelay({
        walletLinkUrl: t.walletLinkUrl || n,
        version: i,
        darkMode: !!t.darkMode
      }), this.setAppInfo(t.appName, t.appLogoUrl), this._relay.attach(document.documentElement), U.injectCssReset();
    }

    makeWeb3Provider(t, e = 1) {
      return new W.WalletLinkProvider({
        relay: this._relay,
        jsonRpcUrl: t,
        chainId: e
      });
    }

    setAppInfo(t, e) {
      this._appName = t || "DApp", this._appLogoUrl = e || l.getFavicon(), this._relay.setAppInfo(this._appName, this._appLogoUrl);
    }

    disconnect() {
      this._relay.resetAndReload();
    }

  }

  e.WalletLink = r, r.VERSION = i;
});
(0, _indexD3bd.e)(hu);
hu.WalletLink;
var fu = (0, _indexD3bd.d)(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = W;
  e.WalletLinkProvider = n.WalletLinkProvider;
  var i = hu;
  e.WalletLink = i.WalletLink, e.default = hu.WalletLink, "undefined" != typeof window && (window.WalletLink = hu.WalletLink, window.WalletLinkProvider = W.WalletLinkProvider);
}),
    du = (0, _indexD3bd.e)(fu),
    pu = fu.WalletLinkProvider,
    mu = fu.WalletLink;
exports.WalletLink = mu;
exports.WalletLinkProvider = pu;
exports.__moduleExports = fu;
var _default = du;
exports.default = _default;
},{"./index-d3bd4678.js":"../node_modules/use-wallet/dist/index-d3bd4678.js","react":"../node_modules/react/index.js","@aragon/provided-connector":"../node_modules/@aragon/provided-connector/dist/provided-connector.esm.js","events":"../node_modules/events/events.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js","./_crypto_commonjs-external-1a228943.js":"../node_modules/use-wallet/dist/_crypto_commonjs-external-1a228943.js","stream":"../node_modules/stream-browserify/index.js","crypto":"../node_modules/crypto-browserify/index.js","url":"../node_modules/url/url.js","./_url_commonjs-external-af75b180.js":"../node_modules/use-wallet/dist/_url_commonjs-external-af75b180.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58677" + '/');

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
//# sourceMappingURL=/index-a004146a.3390d110.js.map