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
})({"../node_modules/ethereum-cryptography/hash-utils.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createHashFunction(hashConstructor) {
    return function (msg) {
        var hash = hashConstructor();
        hash.update(msg);
        return Buffer.from(hash.digest());
    };
}
exports.createHashFunction = createHashFunction;

},{"buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/keccak/lib/api/keccak.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
const {
  Transform
} = require('stream');

module.exports = KeccakState => class Keccak extends Transform {
  constructor(rate, capacity, delimitedSuffix, hashBitLength, options) {
    super(options);
    this._rate = rate;
    this._capacity = capacity;
    this._delimitedSuffix = delimitedSuffix;
    this._hashBitLength = hashBitLength;
    this._options = options;
    this._state = new KeccakState();

    this._state.initialize(rate, capacity);

    this._finalized = false;
  }

  _transform(chunk, encoding, callback) {
    let error = null;

    try {
      this.update(chunk, encoding);
    } catch (err) {
      error = err;
    }

    callback(error);
  }

  _flush(callback) {
    let error = null;

    try {
      this.push(this.digest());
    } catch (err) {
      error = err;
    }

    callback(error);
  }

  update(data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer');
    if (this._finalized) throw new Error('Digest already called');
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding);

    this._state.absorb(data);

    return this;
  }

  digest(encoding) {
    if (this._finalized) throw new Error('Digest already called');
    this._finalized = true;
    if (this._delimitedSuffix) this._state.absorbLastFewBits(this._delimitedSuffix);

    let digest = this._state.squeeze(this._hashBitLength / 8);

    if (encoding !== undefined) digest = digest.toString(encoding);

    this._resetState();

    return digest;
  } // remove result from memory


  _resetState() {
    this._state.initialize(this._rate, this._capacity);

    return this;
  } // because sometimes we need hash right now and little later


  _clone() {
    const clone = new Keccak(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);

    this._state.copy(clone._state);

    clone._finalized = this._finalized;
    return clone;
  }

};
},{"stream":"../node_modules/stream-browserify/index.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/keccak/lib/api/shake.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
const {
  Transform
} = require('stream');

module.exports = KeccakState => class Shake extends Transform {
  constructor(rate, capacity, delimitedSuffix, options) {
    super(options);
    this._rate = rate;
    this._capacity = capacity;
    this._delimitedSuffix = delimitedSuffix;
    this._options = options;
    this._state = new KeccakState();

    this._state.initialize(rate, capacity);

    this._finalized = false;
  }

  _transform(chunk, encoding, callback) {
    let error = null;

    try {
      this.update(chunk, encoding);
    } catch (err) {
      error = err;
    }

    callback(error);
  }

  _flush() {}

  _read(size) {
    this.push(this.squeeze(size));
  }

  update(data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer');
    if (this._finalized) throw new Error('Squeeze already called');
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding);

    this._state.absorb(data);

    return this;
  }

  squeeze(dataByteLength, encoding) {
    if (!this._finalized) {
      this._finalized = true;

      this._state.absorbLastFewBits(this._delimitedSuffix);
    }

    let data = this._state.squeeze(dataByteLength);

    if (encoding !== undefined) data = data.toString(encoding);
    return data;
  }

  _resetState() {
    this._state.initialize(this._rate, this._capacity);

    return this;
  }

  _clone() {
    const clone = new Shake(this._rate, this._capacity, this._delimitedSuffix, this._options);

    this._state.copy(clone._state);

    clone._finalized = this._finalized;
    return clone;
  }

};
},{"stream":"../node_modules/stream-browserify/index.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/keccak/lib/api/index.js":[function(require,module,exports) {
const createKeccak = require('./keccak');

const createShake = require('./shake');

module.exports = function (KeccakState) {
  const Keccak = createKeccak(KeccakState);
  const Shake = createShake(KeccakState);
  return function (algorithm, options) {
    const hash = typeof algorithm === 'string' ? algorithm.toLowerCase() : algorithm;

    switch (hash) {
      case 'keccak224':
        return new Keccak(1152, 448, null, 224, options);

      case 'keccak256':
        return new Keccak(1088, 512, null, 256, options);

      case 'keccak384':
        return new Keccak(832, 768, null, 384, options);

      case 'keccak512':
        return new Keccak(576, 1024, null, 512, options);

      case 'sha3-224':
        return new Keccak(1152, 448, 0x06, 224, options);

      case 'sha3-256':
        return new Keccak(1088, 512, 0x06, 256, options);

      case 'sha3-384':
        return new Keccak(832, 768, 0x06, 384, options);

      case 'sha3-512':
        return new Keccak(576, 1024, 0x06, 512, options);

      case 'shake128':
        return new Shake(1344, 256, 0x1f, options);

      case 'shake256':
        return new Shake(1088, 512, 0x1f, options);

      default:
        throw new Error('Invald algorithm: ' + algorithm);
    }
  };
};
},{"./keccak":"../node_modules/keccak/lib/api/keccak.js","./shake":"../node_modules/keccak/lib/api/shake.js"}],"../node_modules/keccak/lib/keccak-state-unroll.js":[function(require,module,exports) {
const P1600_ROUND_CONSTANTS = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

exports.p1600 = function (s) {
  for (let round = 0; round < 24; ++round) {
    // theta
    const lo0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    const hi0 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    const lo1 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    const hi1 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    const lo2 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    const hi2 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    const lo3 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    const hi3 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    const lo4 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    const hi4 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
    let lo = lo4 ^ (lo1 << 1 | hi1 >>> 31);
    let hi = hi4 ^ (hi1 << 1 | lo1 >>> 31);
    const t1slo0 = s[0] ^ lo;
    const t1shi0 = s[1] ^ hi;
    const t1slo5 = s[10] ^ lo;
    const t1shi5 = s[11] ^ hi;
    const t1slo10 = s[20] ^ lo;
    const t1shi10 = s[21] ^ hi;
    const t1slo15 = s[30] ^ lo;
    const t1shi15 = s[31] ^ hi;
    const t1slo20 = s[40] ^ lo;
    const t1shi20 = s[41] ^ hi;
    lo = lo0 ^ (lo2 << 1 | hi2 >>> 31);
    hi = hi0 ^ (hi2 << 1 | lo2 >>> 31);
    const t1slo1 = s[2] ^ lo;
    const t1shi1 = s[3] ^ hi;
    const t1slo6 = s[12] ^ lo;
    const t1shi6 = s[13] ^ hi;
    const t1slo11 = s[22] ^ lo;
    const t1shi11 = s[23] ^ hi;
    const t1slo16 = s[32] ^ lo;
    const t1shi16 = s[33] ^ hi;
    const t1slo21 = s[42] ^ lo;
    const t1shi21 = s[43] ^ hi;
    lo = lo1 ^ (lo3 << 1 | hi3 >>> 31);
    hi = hi1 ^ (hi3 << 1 | lo3 >>> 31);
    const t1slo2 = s[4] ^ lo;
    const t1shi2 = s[5] ^ hi;
    const t1slo7 = s[14] ^ lo;
    const t1shi7 = s[15] ^ hi;
    const t1slo12 = s[24] ^ lo;
    const t1shi12 = s[25] ^ hi;
    const t1slo17 = s[34] ^ lo;
    const t1shi17 = s[35] ^ hi;
    const t1slo22 = s[44] ^ lo;
    const t1shi22 = s[45] ^ hi;
    lo = lo2 ^ (lo4 << 1 | hi4 >>> 31);
    hi = hi2 ^ (hi4 << 1 | lo4 >>> 31);
    const t1slo3 = s[6] ^ lo;
    const t1shi3 = s[7] ^ hi;
    const t1slo8 = s[16] ^ lo;
    const t1shi8 = s[17] ^ hi;
    const t1slo13 = s[26] ^ lo;
    const t1shi13 = s[27] ^ hi;
    const t1slo18 = s[36] ^ lo;
    const t1shi18 = s[37] ^ hi;
    const t1slo23 = s[46] ^ lo;
    const t1shi23 = s[47] ^ hi;
    lo = lo3 ^ (lo0 << 1 | hi0 >>> 31);
    hi = hi3 ^ (hi0 << 1 | lo0 >>> 31);
    const t1slo4 = s[8] ^ lo;
    const t1shi4 = s[9] ^ hi;
    const t1slo9 = s[18] ^ lo;
    const t1shi9 = s[19] ^ hi;
    const t1slo14 = s[28] ^ lo;
    const t1shi14 = s[29] ^ hi;
    const t1slo19 = s[38] ^ lo;
    const t1shi19 = s[39] ^ hi;
    const t1slo24 = s[48] ^ lo;
    const t1shi24 = s[49] ^ hi; // rho & pi

    const t2slo0 = t1slo0;
    const t2shi0 = t1shi0;
    const t2slo16 = t1shi5 << 4 | t1slo5 >>> 28;
    const t2shi16 = t1slo5 << 4 | t1shi5 >>> 28;
    const t2slo7 = t1slo10 << 3 | t1shi10 >>> 29;
    const t2shi7 = t1shi10 << 3 | t1slo10 >>> 29;
    const t2slo23 = t1shi15 << 9 | t1slo15 >>> 23;
    const t2shi23 = t1slo15 << 9 | t1shi15 >>> 23;
    const t2slo14 = t1slo20 << 18 | t1shi20 >>> 14;
    const t2shi14 = t1shi20 << 18 | t1slo20 >>> 14;
    const t2slo10 = t1slo1 << 1 | t1shi1 >>> 31;
    const t2shi10 = t1shi1 << 1 | t1slo1 >>> 31;
    const t2slo1 = t1shi6 << 12 | t1slo6 >>> 20;
    const t2shi1 = t1slo6 << 12 | t1shi6 >>> 20;
    const t2slo17 = t1slo11 << 10 | t1shi11 >>> 22;
    const t2shi17 = t1shi11 << 10 | t1slo11 >>> 22;
    const t2slo8 = t1shi16 << 13 | t1slo16 >>> 19;
    const t2shi8 = t1slo16 << 13 | t1shi16 >>> 19;
    const t2slo24 = t1slo21 << 2 | t1shi21 >>> 30;
    const t2shi24 = t1shi21 << 2 | t1slo21 >>> 30;
    const t2slo20 = t1shi2 << 30 | t1slo2 >>> 2;
    const t2shi20 = t1slo2 << 30 | t1shi2 >>> 2;
    const t2slo11 = t1slo7 << 6 | t1shi7 >>> 26;
    const t2shi11 = t1shi7 << 6 | t1slo7 >>> 26;
    const t2slo2 = t1shi12 << 11 | t1slo12 >>> 21;
    const t2shi2 = t1slo12 << 11 | t1shi12 >>> 21;
    const t2slo18 = t1slo17 << 15 | t1shi17 >>> 17;
    const t2shi18 = t1shi17 << 15 | t1slo17 >>> 17;
    const t2slo9 = t1shi22 << 29 | t1slo22 >>> 3;
    const t2shi9 = t1slo22 << 29 | t1shi22 >>> 3;
    const t2slo5 = t1slo3 << 28 | t1shi3 >>> 4;
    const t2shi5 = t1shi3 << 28 | t1slo3 >>> 4;
    const t2slo21 = t1shi8 << 23 | t1slo8 >>> 9;
    const t2shi21 = t1slo8 << 23 | t1shi8 >>> 9;
    const t2slo12 = t1slo13 << 25 | t1shi13 >>> 7;
    const t2shi12 = t1shi13 << 25 | t1slo13 >>> 7;
    const t2slo3 = t1slo18 << 21 | t1shi18 >>> 11;
    const t2shi3 = t1shi18 << 21 | t1slo18 >>> 11;
    const t2slo19 = t1shi23 << 24 | t1slo23 >>> 8;
    const t2shi19 = t1slo23 << 24 | t1shi23 >>> 8;
    const t2slo15 = t1slo4 << 27 | t1shi4 >>> 5;
    const t2shi15 = t1shi4 << 27 | t1slo4 >>> 5;
    const t2slo6 = t1slo9 << 20 | t1shi9 >>> 12;
    const t2shi6 = t1shi9 << 20 | t1slo9 >>> 12;
    const t2slo22 = t1shi14 << 7 | t1slo14 >>> 25;
    const t2shi22 = t1slo14 << 7 | t1shi14 >>> 25;
    const t2slo13 = t1slo19 << 8 | t1shi19 >>> 24;
    const t2shi13 = t1shi19 << 8 | t1slo19 >>> 24;
    const t2slo4 = t1slo24 << 14 | t1shi24 >>> 18;
    const t2shi4 = t1shi24 << 14 | t1slo24 >>> 18; // chi

    s[0] = t2slo0 ^ ~t2slo1 & t2slo2;
    s[1] = t2shi0 ^ ~t2shi1 & t2shi2;
    s[10] = t2slo5 ^ ~t2slo6 & t2slo7;
    s[11] = t2shi5 ^ ~t2shi6 & t2shi7;
    s[20] = t2slo10 ^ ~t2slo11 & t2slo12;
    s[21] = t2shi10 ^ ~t2shi11 & t2shi12;
    s[30] = t2slo15 ^ ~t2slo16 & t2slo17;
    s[31] = t2shi15 ^ ~t2shi16 & t2shi17;
    s[40] = t2slo20 ^ ~t2slo21 & t2slo22;
    s[41] = t2shi20 ^ ~t2shi21 & t2shi22;
    s[2] = t2slo1 ^ ~t2slo2 & t2slo3;
    s[3] = t2shi1 ^ ~t2shi2 & t2shi3;
    s[12] = t2slo6 ^ ~t2slo7 & t2slo8;
    s[13] = t2shi6 ^ ~t2shi7 & t2shi8;
    s[22] = t2slo11 ^ ~t2slo12 & t2slo13;
    s[23] = t2shi11 ^ ~t2shi12 & t2shi13;
    s[32] = t2slo16 ^ ~t2slo17 & t2slo18;
    s[33] = t2shi16 ^ ~t2shi17 & t2shi18;
    s[42] = t2slo21 ^ ~t2slo22 & t2slo23;
    s[43] = t2shi21 ^ ~t2shi22 & t2shi23;
    s[4] = t2slo2 ^ ~t2slo3 & t2slo4;
    s[5] = t2shi2 ^ ~t2shi3 & t2shi4;
    s[14] = t2slo7 ^ ~t2slo8 & t2slo9;
    s[15] = t2shi7 ^ ~t2shi8 & t2shi9;
    s[24] = t2slo12 ^ ~t2slo13 & t2slo14;
    s[25] = t2shi12 ^ ~t2shi13 & t2shi14;
    s[34] = t2slo17 ^ ~t2slo18 & t2slo19;
    s[35] = t2shi17 ^ ~t2shi18 & t2shi19;
    s[44] = t2slo22 ^ ~t2slo23 & t2slo24;
    s[45] = t2shi22 ^ ~t2shi23 & t2shi24;
    s[6] = t2slo3 ^ ~t2slo4 & t2slo0;
    s[7] = t2shi3 ^ ~t2shi4 & t2shi0;
    s[16] = t2slo8 ^ ~t2slo9 & t2slo5;
    s[17] = t2shi8 ^ ~t2shi9 & t2shi5;
    s[26] = t2slo13 ^ ~t2slo14 & t2slo10;
    s[27] = t2shi13 ^ ~t2shi14 & t2shi10;
    s[36] = t2slo18 ^ ~t2slo19 & t2slo15;
    s[37] = t2shi18 ^ ~t2shi19 & t2shi15;
    s[46] = t2slo23 ^ ~t2slo24 & t2slo20;
    s[47] = t2shi23 ^ ~t2shi24 & t2shi20;
    s[8] = t2slo4 ^ ~t2slo0 & t2slo1;
    s[9] = t2shi4 ^ ~t2shi0 & t2shi1;
    s[18] = t2slo9 ^ ~t2slo5 & t2slo6;
    s[19] = t2shi9 ^ ~t2shi5 & t2shi6;
    s[28] = t2slo14 ^ ~t2slo10 & t2slo11;
    s[29] = t2shi14 ^ ~t2shi10 & t2shi11;
    s[38] = t2slo19 ^ ~t2slo15 & t2slo16;
    s[39] = t2shi19 ^ ~t2shi15 & t2shi16;
    s[48] = t2slo24 ^ ~t2slo20 & t2slo21;
    s[49] = t2shi24 ^ ~t2shi20 & t2shi21; // iota

    s[0] ^= P1600_ROUND_CONSTANTS[round * 2];
    s[1] ^= P1600_ROUND_CONSTANTS[round * 2 + 1];
  }
};
},{}],"../node_modules/keccak/lib/keccak.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
const keccakState = require('./keccak-state-unroll');

function Keccak() {
  // much faster than `new Array(50)`
  this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.blockSize = null;
  this.count = 0;
  this.squeezing = false;
}

Keccak.prototype.initialize = function (rate, capacity) {
  for (let i = 0; i < 50; ++i) this.state[i] = 0;

  this.blockSize = rate / 8;
  this.count = 0;
  this.squeezing = false;
};

Keccak.prototype.absorb = function (data) {
  for (let i = 0; i < data.length; ++i) {
    this.state[~~(this.count / 4)] ^= data[i] << 8 * (this.count % 4);
    this.count += 1;

    if (this.count === this.blockSize) {
      keccakState.p1600(this.state);
      this.count = 0;
    }
  }
};

Keccak.prototype.absorbLastFewBits = function (bits) {
  this.state[~~(this.count / 4)] ^= bits << 8 * (this.count % 4);
  if ((bits & 0x80) !== 0 && this.count === this.blockSize - 1) keccakState.p1600(this.state);
  this.state[~~((this.blockSize - 1) / 4)] ^= 0x80 << 8 * ((this.blockSize - 1) % 4);
  keccakState.p1600(this.state);
  this.count = 0;
  this.squeezing = true;
};

Keccak.prototype.squeeze = function (length) {
  if (!this.squeezing) this.absorbLastFewBits(0x01);
  const output = Buffer.alloc(length);

  for (let i = 0; i < length; ++i) {
    output[i] = this.state[~~(this.count / 4)] >>> 8 * (this.count % 4) & 0xff;
    this.count += 1;

    if (this.count === this.blockSize) {
      keccakState.p1600(this.state);
      this.count = 0;
    }
  }

  return output;
};

Keccak.prototype.copy = function (dest) {
  for (let i = 0; i < 50; ++i) dest.state[i] = this.state[i];

  dest.blockSize = this.blockSize;
  dest.count = this.count;
  dest.squeezing = this.squeezing;
};

module.exports = Keccak;
},{"./keccak-state-unroll":"../node_modules/keccak/lib/keccak-state-unroll.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/keccak/js.js":[function(require,module,exports) {
module.exports = require('./lib/api')(require('./lib/keccak'));
},{"./lib/api":"../node_modules/keccak/lib/api/index.js","./lib/keccak":"../node_modules/keccak/lib/keccak.js"}],"../node_modules/ethereum-cryptography/keccak.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_utils_1 = require("./hash-utils");
var createKeccakHash = require("keccak");
exports.keccak224 = hash_utils_1.createHashFunction(function () {
    return createKeccakHash("keccak224");
});
exports.keccak256 = hash_utils_1.createHashFunction(function () {
    return createKeccakHash("keccak256");
});
exports.keccak384 = hash_utils_1.createHashFunction(function () {
    return createKeccakHash("keccak384");
});
exports.keccak512 = hash_utils_1.createHashFunction(function () {
    return createKeccakHash("keccak512");
});

},{"./hash-utils":"../node_modules/ethereum-cryptography/hash-utils.js","keccak":"../node_modules/keccak/js.js"}],"../node_modules/ethereum-cryptography/node_modules/secp256k1/lib/index.js":[function(require,module,exports) {
const errors = {
  IMPOSSIBLE_CASE: 'Impossible case. Please create issue.',
  TWEAK_ADD: 'The tweak was out of range or the resulted private key is invalid',
  TWEAK_MUL: 'The tweak was out of range or equal to zero',
  CONTEXT_RANDOMIZE_UNKNOW: 'Unknow error on context randomization',
  SECKEY_INVALID: 'Private Key is invalid',
  PUBKEY_PARSE: 'Public Key could not be parsed',
  PUBKEY_SERIALIZE: 'Public Key serialization error',
  PUBKEY_COMBINE: 'The sum of the public keys is not valid',
  SIG_PARSE: 'Signature could not be parsed',
  SIGN: 'The nonce generation function failed, or the private key was invalid',
  RECOVER: 'Public key could not be recover',
  ECDH: 'Scalar was invalid (zero or overflow)'
};

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function isUint8Array(name, value, length) {
  assert(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`);

  if (length !== undefined) {
    if (Array.isArray(length)) {
      const numbers = length.join(', ');
      const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`;
      assert(length.includes(value.length), msg);
    } else {
      const msg = `Expected ${name} to be an Uint8Array with length ${length}`;
      assert(value.length === length, msg);
    }
  }
}

function isCompressed(value) {
  assert(toTypeString(value) === 'Boolean', 'Expected compressed to be a Boolean');
}

function getAssertedOutput(output = len => new Uint8Array(len), length) {
  if (typeof output === 'function') output = output(length);
  isUint8Array('output', output, length);
  return output;
}

function toTypeString(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

module.exports = secp256k1 => {
  return {
    contextRandomize(seed) {
      assert(seed === null || seed instanceof Uint8Array, 'Expected seed to be an Uint8Array or null');
      if (seed !== null) isUint8Array('seed', seed, 32);

      switch (secp256k1.contextRandomize(seed)) {
        case 1:
          throw new Error(errors.CONTEXT_RANDOMIZE_UNKNOW);
      }
    },

    privateKeyVerify(seckey) {
      isUint8Array('private key', seckey, 32);
      return secp256k1.privateKeyVerify(seckey) === 0;
    },

    privateKeyNegate(seckey) {
      isUint8Array('private key', seckey, 32);

      switch (secp256k1.privateKeyNegate(seckey)) {
        case 0:
          return seckey;

        case 1:
          throw new Error(errors.IMPOSSIBLE_CASE);
      }
    },

    privateKeyTweakAdd(seckey, tweak) {
      isUint8Array('private key', seckey, 32);
      isUint8Array('tweak', tweak, 32);

      switch (secp256k1.privateKeyTweakAdd(seckey, tweak)) {
        case 0:
          return seckey;

        case 1:
          throw new Error(errors.TWEAK_ADD);
      }
    },

    privateKeyTweakMul(seckey, tweak) {
      isUint8Array('private key', seckey, 32);
      isUint8Array('tweak', tweak, 32);

      switch (secp256k1.privateKeyTweakMul(seckey, tweak)) {
        case 0:
          return seckey;

        case 1:
          throw new Error(errors.TWEAK_MUL);
      }
    },

    publicKeyVerify(pubkey) {
      isUint8Array('public key', pubkey, [33, 65]);
      return secp256k1.publicKeyVerify(pubkey) === 0;
    },

    publicKeyCreate(seckey, compressed = true, output) {
      isUint8Array('private key', seckey, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyCreate(output, seckey)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.SECKEY_INVALID);

        case 2:
          throw new Error(errors.PUBKEY_SERIALIZE);
      }
    },

    publicKeyConvert(pubkey, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyConvert(output, pubkey)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.PUBKEY_PARSE);

        case 2:
          throw new Error(errors.PUBKEY_SERIALIZE);
      }
    },

    publicKeyNegate(pubkey, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyNegate(output, pubkey)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.PUBKEY_PARSE);

        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE);

        case 3:
          throw new Error(errors.PUBKEY_SERIALIZE);
      }
    },

    publicKeyCombine(pubkeys, compressed = true, output) {
      assert(Array.isArray(pubkeys), 'Expected public keys to be an Array');
      assert(pubkeys.length > 0, 'Expected public keys array will have more than zero items');

      for (const pubkey of pubkeys) {
        isUint8Array('public key', pubkey, [33, 65]);
      }

      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyCombine(output, pubkeys)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.PUBKEY_PARSE);

        case 2:
          throw new Error(errors.PUBKEY_COMBINE);

        case 3:
          throw new Error(errors.PUBKEY_SERIALIZE);
      }
    },

    publicKeyTweakAdd(pubkey, tweak, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isUint8Array('tweak', tweak, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyTweakAdd(output, pubkey, tweak)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.PUBKEY_PARSE);

        case 2:
          throw new Error(errors.TWEAK_ADD);
      }
    },

    publicKeyTweakMul(pubkey, tweak, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isUint8Array('tweak', tweak, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyTweakMul(output, pubkey, tweak)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.PUBKEY_PARSE);

        case 2:
          throw new Error(errors.TWEAK_MUL);
      }
    },

    signatureNormalize(sig) {
      isUint8Array('signature', sig, 64);

      switch (secp256k1.signatureNormalize(sig)) {
        case 0:
          return sig;

        case 1:
          throw new Error(errors.SIG_PARSE);
      }
    },

    signatureExport(sig, output) {
      isUint8Array('signature', sig, 64);
      output = getAssertedOutput(output, 72);
      const obj = {
        output,
        outputlen: 72
      };

      switch (secp256k1.signatureExport(obj, sig)) {
        case 0:
          return output.slice(0, obj.outputlen);

        case 1:
          throw new Error(errors.SIG_PARSE);

        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE);
      }
    },

    signatureImport(sig, output) {
      isUint8Array('signature', sig);
      output = getAssertedOutput(output, 64);

      switch (secp256k1.signatureImport(output, sig)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.SIG_PARSE);

        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE);
      }
    },

    ecdsaSign(msg32, seckey, options = {}, output) {
      isUint8Array('message', msg32, 32);
      isUint8Array('private key', seckey, 32);
      assert(toTypeString(options) === 'Object', 'Expected options to be an Object');
      if (options.data !== undefined) isUint8Array('options.data', options.data);
      if (options.noncefn !== undefined) assert(toTypeString(options.noncefn) === 'Function', 'Expected options.noncefn to be a Function');
      output = getAssertedOutput(output, 64);
      const obj = {
        signature: output,
        recid: null
      };

      switch (secp256k1.ecdsaSign(obj, msg32, seckey, options.data, options.noncefn)) {
        case 0:
          return obj;

        case 1:
          throw new Error(errors.SIGN);

        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE);
      }
    },

    ecdsaVerify(sig, msg32, pubkey) {
      isUint8Array('signature', sig, 64);
      isUint8Array('message', msg32, 32);
      isUint8Array('public key', pubkey, [33, 65]);

      switch (secp256k1.ecdsaVerify(sig, msg32, pubkey)) {
        case 0:
          return true;

        case 3:
          return false;

        case 1:
          throw new Error(errors.SIG_PARSE);

        case 2:
          throw new Error(errors.PUBKEY_PARSE);
      }
    },

    ecdsaRecover(sig, recid, msg32, compressed = true, output) {
      isUint8Array('signature', sig, 64);
      assert(toTypeString(recid) === 'Number' && recid >= 0 && recid <= 3, 'Expected recovery id to be a Number within interval [0, 3]');
      isUint8Array('message', msg32, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.ecdsaRecover(output, sig, recid, msg32)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.SIG_PARSE);

        case 2:
          throw new Error(errors.RECOVER);

        case 3:
          throw new Error(errors.IMPOSSIBLE_CASE);
      }
    },

    ecdh(pubkey, seckey, options = {}, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isUint8Array('private key', seckey, 32);
      assert(toTypeString(options) === 'Object', 'Expected options to be an Object');
      if (options.data !== undefined) isUint8Array('options.data', options.data);

      if (options.hashfn !== undefined) {
        assert(toTypeString(options.hashfn) === 'Function', 'Expected options.hashfn to be a Function');
        if (options.xbuf !== undefined) isUint8Array('options.xbuf', options.xbuf, 32);
        if (options.ybuf !== undefined) isUint8Array('options.ybuf', options.ybuf, 32);
        isUint8Array('output', output);
      } else {
        output = getAssertedOutput(output, 32);
      }

      switch (secp256k1.ecdh(output, pubkey, seckey, options.data, options.hashfn, options.xbuf, options.ybuf)) {
        case 0:
          return output;

        case 1:
          throw new Error(errors.PUBKEY_PARSE);

        case 2:
          throw new Error(errors.ECDH);
      }
    }

  };
};
},{}],"../node_modules/ethereum-cryptography/node_modules/secp256k1/lib/elliptic.js":[function(require,module,exports) {
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');
const ecparams = ec.curve; // Hack, we can not use bn.js@5, while elliptic uses bn.js@4
// See https://github.com/indutny/elliptic/issues/191#issuecomment-569888758

const BN = ecparams.n.constructor;

function loadCompressedPublicKey(first, xbuf) {
  let x = new BN(xbuf); // overflow

  if (x.cmp(ecparams.p) >= 0) return null;
  x = x.toRed(ecparams.red); // compute corresponding Y

  let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();
  if (first === 0x03 !== y.isOdd()) y = y.redNeg();
  return ec.keyPair({
    pub: {
      x: x,
      y: y
    }
  });
}

function loadUncompressedPublicKey(first, xbuf, ybuf) {
  let x = new BN(xbuf);
  let y = new BN(ybuf); // overflow

  if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null;
  x = x.toRed(ecparams.red);
  y = y.toRed(ecparams.red); // is odd flag

  if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null; // x*x*x + b = y*y

  const x3 = x.redSqr().redIMul(x);
  if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null;
  return ec.keyPair({
    pub: {
      x: x,
      y: y
    }
  });
}

function loadPublicKey(pubkey) {
  // length should be validated in interface
  const first = pubkey[0];

  switch (first) {
    case 0x02:
    case 0x03:
      if (pubkey.length !== 33) return null;
      return loadCompressedPublicKey(first, pubkey.subarray(1, 33));

    case 0x04:
    case 0x06:
    case 0x07:
      if (pubkey.length !== 65) return null;
      return loadUncompressedPublicKey(first, pubkey.subarray(1, 33), pubkey.subarray(33, 65));

    default:
      return null;
  }
}

function savePublicKey(output, point) {
  const pubkey = point.encode(null, output.length === 33); // Loop should be faster because we do not need create extra Uint8Array
  // output.set(new Uint8Array(pubkey))

  for (let i = 0; i < output.length; ++i) output[i] = pubkey[i];
}

module.exports = {
  contextRandomize() {
    return 0;
  },

  privateKeyVerify(seckey) {
    const bn = new BN(seckey);
    return bn.cmp(ecparams.n) < 0 && !bn.isZero() ? 0 : 1;
  },

  privateKeyNegate(seckey) {
    const bn = new BN(seckey);
    const negate = ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Uint8Array, 'be', 32);
    seckey.set(negate);
    return 0;
  },

  privateKeyTweakAdd(seckey, tweak) {
    const bn = new BN(tweak);
    if (bn.cmp(ecparams.n) >= 0) return 1;
    bn.iadd(new BN(seckey));
    if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
    if (bn.isZero()) return 1;
    const tweaked = bn.toArrayLike(Uint8Array, 'be', 32);
    seckey.set(tweaked);
    return 0;
  },

  privateKeyTweakMul(seckey, tweak) {
    let bn = new BN(tweak);
    if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1;
    bn.imul(new BN(seckey));
    if (bn.cmp(ecparams.n) >= 0) bn = bn.umod(ecparams.n);
    const tweaked = bn.toArrayLike(Uint8Array, 'be', 32);
    seckey.set(tweaked);
    return 0;
  },

  publicKeyVerify(pubkey) {
    const pair = loadPublicKey(pubkey);
    return pair === null ? 1 : 0;
  },

  publicKeyCreate(output, seckey) {
    const bn = new BN(seckey);
    if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1;
    const point = ec.keyFromPrivate(seckey).getPublic();
    savePublicKey(output, point);
    return 0;
  },

  publicKeyConvert(output, pubkey) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1;
    const point = pair.getPublic();
    savePublicKey(output, point);
    return 0;
  },

  publicKeyNegate(output, pubkey) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1;
    const point = pair.getPublic();
    point.y = point.y.redNeg();
    savePublicKey(output, point);
    return 0;
  },

  publicKeyCombine(output, pubkeys) {
    const pairs = new Array(pubkeys.length);

    for (let i = 0; i < pubkeys.length; ++i) {
      pairs[i] = loadPublicKey(pubkeys[i]);
      if (pairs[i] === null) return 1;
    }

    let point = pairs[0].getPublic();

    for (let i = 1; i < pairs.length; ++i) point = point.add(pairs[i].pub);

    if (point.isInfinity()) return 2;
    savePublicKey(output, point);
    return 0;
  },

  publicKeyTweakAdd(output, pubkey, tweak) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1;
    tweak = new BN(tweak);
    if (tweak.cmp(ecparams.n) >= 0) return 2;
    const point = pair.getPublic().add(ecparams.g.mul(tweak));
    if (point.isInfinity()) return 2;
    savePublicKey(output, point);
    return 0;
  },

  publicKeyTweakMul(output, pubkey, tweak) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1;
    tweak = new BN(tweak);
    if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) return 2;
    const point = pair.getPublic().mul(tweak);
    savePublicKey(output, point);
    return 0;
  },

  signatureNormalize(sig) {
    const r = new BN(sig.subarray(0, 32));
    const s = new BN(sig.subarray(32, 64));
    if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) return 1;

    if (s.cmp(ec.nh) === 1) {
      sig.set(ecparams.n.sub(s).toArrayLike(Uint8Array, 'be', 32), 32);
    }

    return 0;
  },

  // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
  // Adapted for Uint8Array instead Buffer
  signatureExport(obj, sig) {
    const sigR = sig.subarray(0, 32);
    const sigS = sig.subarray(32, 64);
    if (new BN(sigR).cmp(ecparams.n) >= 0) return 1;
    if (new BN(sigS).cmp(ecparams.n) >= 0) return 1;
    const {
      output
    } = obj; // Prepare R

    let r = output.subarray(4, 4 + 33);
    r[0] = 0x00;
    r.set(sigR, 1);
    let lenR = 33;
    let posR = 0;

    for (; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

    r = r.subarray(posR);
    if (r[0] & 0x80) return 1;
    if (lenR > 1 && r[0] === 0x00 && !(r[1] & 0x80)) return 1; // Prepare S

    let s = output.subarray(6 + 33, 6 + 33 + 33);
    s[0] = 0x00;
    s.set(sigS, 1);
    let lenS = 33;
    let posS = 0;

    for (; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

    s = s.subarray(posS);
    if (s[0] & 0x80) return 1;
    if (lenS > 1 && s[0] === 0x00 && !(s[1] & 0x80)) return 1; // Set output length for return

    obj.outputlen = 6 + lenR + lenS; // Output in specified format
    // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]

    output[0] = 0x30;
    output[1] = obj.outputlen - 2;
    output[2] = 0x02;
    output[3] = r.length;
    output.set(r, 4);
    output[4 + lenR] = 0x02;
    output[5 + lenR] = s.length;
    output.set(s, 6 + lenR);
    return 0;
  },

  // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
  // Adapted for Uint8Array instead Buffer
  signatureImport(output, sig) {
    if (sig.length < 8) return 1;
    if (sig.length > 72) return 1;
    if (sig[0] !== 0x30) return 1;
    if (sig[1] !== sig.length - 2) return 1;
    if (sig[2] !== 0x02) return 1;
    const lenR = sig[3];
    if (lenR === 0) return 1;
    if (5 + lenR >= sig.length) return 1;
    if (sig[4 + lenR] !== 0x02) return 1;
    const lenS = sig[5 + lenR];
    if (lenS === 0) return 1;
    if (6 + lenR + lenS !== sig.length) return 1;
    if (sig[4] & 0x80) return 1;
    if (lenR > 1 && sig[4] === 0x00 && !(sig[5] & 0x80)) return 1;
    if (sig[lenR + 6] & 0x80) return 1;
    if (lenS > 1 && sig[lenR + 6] === 0x00 && !(sig[lenR + 7] & 0x80)) return 1;
    let sigR = sig.subarray(4, 4 + lenR);
    if (sigR.length === 33 && sigR[0] === 0x00) sigR = sigR.subarray(1);
    if (sigR.length > 32) return 1;
    let sigS = sig.subarray(6 + lenR);
    if (sigS.length === 33 && sigS[0] === 0x00) sigS = sigS.slice(1);
    if (sigS.length > 32) throw new Error('S length is too long');
    let r = new BN(sigR);
    if (r.cmp(ecparams.n) >= 0) r = new BN(0);
    let s = new BN(sig.subarray(6 + lenR));
    if (s.cmp(ecparams.n) >= 0) s = new BN(0);
    output.set(r.toArrayLike(Uint8Array, 'be', 32), 0);
    output.set(s.toArrayLike(Uint8Array, 'be', 32), 32);
    return 0;
  },

  ecdsaSign(obj, message, seckey, data, noncefn) {
    if (noncefn) {
      const _noncefn = noncefn;

      noncefn = counter => {
        const nonce = _noncefn(message, seckey, null, data, counter);

        const isValid = nonce instanceof Uint8Array && nonce.length === 32;
        if (!isValid) throw new Error('This is the way');
        return new BN(nonce);
      };
    }

    const d = new BN(seckey);
    if (d.cmp(ecparams.n) >= 0 || d.isZero()) return 1;
    let sig;

    try {
      sig = ec.sign(message, seckey, {
        canonical: true,
        k: noncefn,
        pers: data
      });
    } catch (err) {
      return 1;
    }

    obj.signature.set(sig.r.toArrayLike(Uint8Array, 'be', 32), 0);
    obj.signature.set(sig.s.toArrayLike(Uint8Array, 'be', 32), 32);
    obj.recid = sig.recoveryParam;
    return 0;
  },

  ecdsaVerify(sig, msg32, pubkey) {
    const sigObj = {
      r: sig.subarray(0, 32),
      s: sig.subarray(32, 64)
    };
    const sigr = new BN(sigObj.r);
    const sigs = new BN(sigObj.s);
    if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1;
    if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return 3;
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 2;
    const point = pair.getPublic();
    const isValid = ec.verify(msg32, sigObj, point);
    return isValid ? 0 : 3;
  },

  ecdsaRecover(output, sig, recid, msg32) {
    const sigObj = {
      r: sig.slice(0, 32),
      s: sig.slice(32, 64)
    };
    const sigr = new BN(sigObj.r);
    const sigs = new BN(sigObj.s);
    if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1;
    if (sigr.isZero() || sigs.isZero()) return 2; // Can throw `throw new Error('Unable to find sencond key candinate');`

    let point;

    try {
      point = ec.recoverPubKey(msg32, sigObj, recid);
    } catch (err) {
      return 2;
    }

    savePublicKey(output, point);
    return 0;
  },

  ecdh(output, pubkey, seckey, data, hashfn, xbuf, ybuf) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1;
    const scalar = new BN(seckey);
    if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) return 2;
    const point = pair.getPublic().mul(scalar);

    if (hashfn === undefined) {
      const data = point.encode(null, true);
      const sha256 = ec.hash().update(data).digest();

      for (let i = 0; i < 32; ++i) output[i] = sha256[i];
    } else {
      if (!xbuf) xbuf = new Uint8Array(32);
      const x = point.getX().toArray('be', 32);

      for (let i = 0; i < 32; ++i) xbuf[i] = x[i];

      if (!ybuf) ybuf = new Uint8Array(32);
      const y = point.getY().toArray('be', 32);

      for (let i = 0; i < 32; ++i) ybuf[i] = y[i];

      const hash = hashfn(xbuf, ybuf, data);
      const isValid = hash instanceof Uint8Array && hash.length === output.length;
      if (!isValid) return 2;
      output.set(hash);
    }

    return 0;
  }

};
},{"elliptic":"../node_modules/elliptic/lib/elliptic.js"}],"../node_modules/ethereum-cryptography/node_modules/secp256k1/elliptic.js":[function(require,module,exports) {
module.exports = require('./lib')(require('./lib/elliptic'));
},{"./lib":"../node_modules/ethereum-cryptography/node_modules/secp256k1/lib/index.js","./lib/elliptic":"../node_modules/ethereum-cryptography/node_modules/secp256k1/lib/elliptic.js"}],"../node_modules/ethereum-cryptography/random.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randombytes = require("randombytes");
function getRandomBytes(bytes) {
    return new Promise(function (resolve, reject) {
        randombytes(bytes, function (err, resp) {
            if (err) {
                reject(err);
                return;
            }
            resolve(resp);
        });
    });
}
exports.getRandomBytes = getRandomBytes;
function getRandomBytesSync(bytes) {
    return randombytes(bytes);
}
exports.getRandomBytesSync = getRandomBytesSync;

},{"randombytes":"../node_modules/randombytes/browser.js"}],"../node_modules/ethereum-cryptography/secp256k1.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var secp256k1_1 = require("secp256k1");
var random_1 = require("./random");
var SECP256K1_PRIVATE_KEY_SIZE = 32;
function createPrivateKey() {
    return __awaiter(this, void 0, void 0, function () {
        var pk;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    return [4 /*yield*/, random_1.getRandomBytes(SECP256K1_PRIVATE_KEY_SIZE)];
                case 1:
                    pk = _a.sent();
                    if (secp256k1_1.privateKeyVerify(pk)) {
                        return [2 /*return*/, pk];
                    }
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.createPrivateKey = createPrivateKey;
function createPrivateKeySync() {
    while (true) {
        var pk = random_1.getRandomBytesSync(SECP256K1_PRIVATE_KEY_SIZE);
        if (secp256k1_1.privateKeyVerify(pk)) {
            return pk;
        }
    }
}
exports.createPrivateKeySync = createPrivateKeySync;
__export(require("secp256k1"));

},{"secp256k1":"../node_modules/ethereum-cryptography/node_modules/secp256k1/elliptic.js","./random":"../node_modules/ethereum-cryptography/random.js"}],"../node_modules/ethereumjs-util/dist/secp256k1-lib/index.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
'use strict';

// This file is imported from secp256k1 v3
// https://github.com/cryptocoinjs/secp256k1-node/blob/master/LICENSE

var BN = require('bn.js');
var EC = require('elliptic').ec;

var ec = new EC('secp256k1');
var ecparams = ec.curve;

exports.privateKeyExport = function (privateKey, compressed) {
  var d = new BN(privateKey);
  if (d.ucmp(ecparams.n) >= 0) {
    throw new Error('couldn\'t export to DER format');
  }

  var point = ec.g.mul(d);
  return toPublicKey(point.getX(), point.getY(), compressed);
};

exports.privateKeyModInverse = function (privateKey) {
  var bn = new BN(privateKey);
  if (bn.ucmp(ecparams.n) >= 0 || bn.isZero()) {
    throw new Error('private key range is invalid');
  }

  return bn.invm(ecparams.n).toArrayLike(Buffer, 'be', 32);
};

exports.signatureImport = function (sigObj) {
  var r = new BN(sigObj.r);
  if (r.ucmp(ecparams.n) >= 0) {
    r = new BN(0);
  }

  var s = new BN(sigObj.s);
  if (s.ucmp(ecparams.n) >= 0) {
    s = new BN(0);
  }

  return Buffer.concat([r.toArrayLike(Buffer, 'be', 32), s.toArrayLike(Buffer, 'be', 32)]);
};

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
  var point = ec.keyFromPublic(publicKey);

  var scalar = new BN(privateKey);
  if (scalar.ucmp(ecparams.n) >= 0 || scalar.isZero()) {
    throw new Error('scalar was invalid (zero or overflow)');
  }

  var shared = point.pub.mul(scalar);
  return toPublicKey(shared.getX(), shared.getY(), compressed);
};

var toPublicKey = function toPublicKey(x, y, compressed) {
  var publicKey = void 0;

  if (compressed) {
    publicKey = Buffer.alloc(33);
    publicKey[0] = y.isOdd() ? 0x03 : 0x02;
    x.toArrayLike(Buffer, 'be', 32).copy(publicKey, 1);
  } else {
    publicKey = Buffer.alloc(65);
    publicKey[0] = 0x04;
    x.toArrayLike(Buffer, 'be', 32).copy(publicKey, 1);
    y.toArrayLike(Buffer, 'be', 32).copy(publicKey, 33);
  }

  return publicKey;
};
},{"bn.js":"../node_modules/bn.js/lib/bn.js","elliptic":"../node_modules/elliptic/lib/elliptic.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/ethereumjs-util/dist/secp256k1-lib/der.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

// This file is imported from secp256k1 v3
// https://github.com/cryptocoinjs/secp256k1-node/blob/master/LICENSE

var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([
// begin
0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20,
// private key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
// middle
0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04, 0x21, 0x02, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00,
// public key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([
// begin
0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20,
// private key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
// middle
0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04, 0x41, 0x04, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0e, 0x11, 0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10, 0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00,
// public key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

exports.privateKeyExport = function (privateKey, publicKey, compressed) {
  var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED);
  privateKey.copy(result, compressed ? 8 : 9);
  publicKey.copy(result, compressed ? 181 : 214);
  return result;
};

exports.privateKeyImport = function (privateKey) {
  var length = privateKey.length;

  // sequence header
  var index = 0;
  if (length < index + 1 || privateKey[index] !== 0x30) return null;
  index += 1;

  // sequence length constructor
  if (length < index + 1 || !(privateKey[index] & 0x80)) return null;

  var lenb = privateKey[index] & 0x7f;
  index += 1;
  if (lenb < 1 || lenb > 2) return null;
  if (length < index + lenb) return null;

  // sequence length
  var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0);
  index += lenb;
  if (length < index + len) return null;

  // sequence element 0: version number (=1)
  if (length < index + 3 || privateKey[index] !== 0x02 || privateKey[index + 1] !== 0x01 || privateKey[index + 2] !== 0x01) {
    return null;
  }
  index += 3;

  // sequence element 1: octet string, up to 32 bytes
  if (length < index + 2 || privateKey[index] !== 0x04 || privateKey[index + 1] > 0x20 || length < index + 2 + privateKey[index + 1]) {
    return null;
  }

  return privateKey.slice(index + 2, index + 2 + privateKey[index + 1]);
};

exports.signatureImportLax = function (signature) {
  var r = Buffer.alloc(32, 0);
  var s = Buffer.alloc(32, 0);

  var length = signature.length;
  var index = 0;

  // sequence tag byte
  if (signature[index++] !== 0x30) {
    return null;
  }

  // sequence length byte
  var lenbyte = signature[index++];
  if (lenbyte & 0x80) {
    index += lenbyte - 0x80;
    if (index > length) {
      return null;
    }
  }

  // sequence tag byte for r
  if (signature[index++] !== 0x02) {
    return null;
  }

  // length for r
  var rlen = signature[index++];
  if (rlen & 0x80) {
    lenbyte = rlen - 0x80;
    if (index + lenbyte > length) {
      return null;
    }
    for (; lenbyte > 0 && signature[index] === 0x00; index += 1, lenbyte -= 1) {}
    for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) {
      rlen = (rlen << 8) + signature[index];
    }
  }
  if (rlen > length - index) {
    return null;
  }
  var rindex = index;
  index += rlen;

  // sequence tag byte for s
  if (signature[index++] !== 0x02) {
    return null;
  }

  // length for s
  var slen = signature[index++];
  if (slen & 0x80) {
    lenbyte = slen - 0x80;
    if (index + lenbyte > length) {
      return null;
    }
    for (; lenbyte > 0 && signature[index] === 0x00; index += 1, lenbyte -= 1) {}
    for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) {
      slen = (slen << 8) + signature[index];
    }
  }
  if (slen > length - index) {
    return null;
  }
  var sindex = index;
  index += slen;

  // ignore leading zeros in r
  for (; rlen > 0 && signature[rindex] === 0x00; rlen -= 1, rindex += 1) {}
  // copy r value
  if (rlen > 32) {
    return null;
  }
  var rvalue = signature.slice(rindex, rindex + rlen);
  rvalue.copy(r, 32 - rvalue.length);

  // ignore leading zeros in s
  for (; slen > 0 && signature[sindex] === 0x00; slen -= 1, sindex += 1) {}
  // copy s value
  if (slen > 32) {
    return null;
  }
  var svalue = signature.slice(sindex, sindex + slen);
  svalue.copy(s, 32 - svalue.length);

  return { r: r, s: s };
};
},{"buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/ethereumjs-util/dist/secp256k1-adapter.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
'use strict';

var secp256k1 = require('ethereum-cryptography/secp256k1');

var secp256k1v3 = require('./secp256k1-lib/index');
var der = require('./secp256k1-lib/der');

/**
 * Verify an ECDSA privateKey
 * @method privateKeyVerify
 * @param {Buffer} privateKey
 * @return {boolean}
 */
var privateKeyVerify = function privateKeyVerify(privateKey) {
  // secp256k1 v4 version throws when privateKey length is not 32
  if (privateKey.length !== 32) {
    return false;
  }

  return secp256k1.privateKeyVerify(Uint8Array.from(privateKey));
};

/**
 * Export a privateKey in DER format
 * @method privateKeyExport
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {boolean}
 */
var privateKeyExport = function privateKeyExport(privateKey, compressed) {
  // privateKeyExport method is not part of secp256k1 v4 package
  // this implementation is based on v3
  if (privateKey.length !== 32) {
    throw new RangeError('private key length is invalid');
  }

  var publicKey = secp256k1v3.privateKeyExport(privateKey, compressed);

  return der.privateKeyExport(privateKey, publicKey, compressed);
};

/**
 * Import a privateKey in DER format
 * @method privateKeyImport
 * @param {Buffer} privateKey
 * @return {Buffer}
 */

var privateKeyImport = function privateKeyImport(privateKey) {
  // privateKeyImport method is not part of secp256k1 v4 package
  // this implementation is based on v3
  privateKey = der.privateKeyImport(privateKey);
  if (privateKey !== null && privateKey.length === 32 && privateKeyVerify(privateKey)) {
    return privateKey;
  }

  throw new Error("couldn't import from DER format");
};

/**
 * Negate a privateKey by subtracting it from the order of the curve's base point
 * @method privateKeyNegate
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
var privateKeyNegate = function privateKeyNegate(privateKey) {
  return Buffer.from(secp256k1.privateKeyNegate(Uint8Array.from(privateKey)));
};

/**
 * Compute the inverse of a privateKey (modulo the order of the curve's base point).
 * @method privateKeyModInverse
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
var privateKeyModInverse = function privateKeyModInverse(privateKey) {
  if (privateKey.length !== 32) {
    throw new Error('private key length is invalid');
  }

  return Buffer.from(secp256k1v3.privateKeyModInverse(Uint8Array.from(privateKey)));
};

/**
 * Tweak a privateKey by adding tweak to it.
 * @method privateKeyTweakAdd
 * @param {Buffer} privateKey
 * @param {Buffer} tweak
 * @return {Buffer}
 */
var privateKeyTweakAdd = function privateKeyTweakAdd(privateKey, tweak) {
  return Buffer.from(secp256k1.privateKeyTweakAdd(Uint8Array.from(privateKey), tweak));
};

/**
 * Tweak a privateKey by multiplying it by a tweak.
 * @method privateKeyTweakMul
 * @param {Buffer} privateKey
 * @param {Buffer} tweak
 * @return {Buffer}
 */
var privateKeyTweakMul = function privateKeyTweakMul(privateKey, tweak) {
  return Buffer.from(secp256k1.privateKeyTweakMul(Uint8Array.from(privateKey), Uint8Array.from(tweak)));
};

/**
 * Compute the public key for a privateKey.
 * @method publicKeyCreate
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyCreate = function publicKeyCreate(privateKey, compressed) {
  return Buffer.from(secp256k1.publicKeyCreate(Uint8Array.from(privateKey), compressed));
};

/**
 * Convert a publicKey to compressed or uncompressed form.
 * @method publicKeyConvert
 * @param {Buffer} publicKey
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyConvert = function publicKeyConvert(publicKey, compressed) {
  return Buffer.from(secp256k1.publicKeyConvert(Uint8Array.from(publicKey), compressed));
};

/**
 * Verify an ECDSA publicKey.
 * @method publicKeyVerify
 * @param {Buffer} publicKey
 * @return {boolean}
 */
var publicKeyVerify = function publicKeyVerify(publicKey) {
  // secp256k1 v4 version throws when publicKey length is not 33 or 65
  if (publicKey.length !== 33 && publicKey.length !== 65) {
    return false;
  }

  return secp256k1.publicKeyVerify(Uint8Array.from(publicKey));
};

/**
 * Tweak a publicKey by adding tweak times the generator to it.
 * @method publicKeyTweakAdd
 * @param {Buffer} publicKey
 * @param {Buffer} tweak
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyTweakAdd = function publicKeyTweakAdd(publicKey, tweak, compressed) {
  return Buffer.from(secp256k1.publicKeyTweakAdd(Uint8Array.from(publicKey), Uint8Array.from(tweak), compressed));
};

/**
 * Tweak a publicKey by multiplying it by a tweak value
 * @method publicKeyTweakMul
 * @param {Buffer} publicKey
 * @param {Buffer} tweak
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyTweakMul = function publicKeyTweakMul(publicKey, tweak, compressed) {
  return Buffer.from(secp256k1.publicKeyTweakMul(Uint8Array.from(publicKey), Uint8Array.from(tweak), compressed));
};

/**
 * Add a given publicKeys together.
 * @method publicKeyCombine
 * @param {Array<Buffer>} publicKeys
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyCombine = function publicKeyCombine(publicKeys, compressed) {
  var keys = [];
  publicKeys.forEach(function (publicKey) {
    keys.push(Uint8Array.from(publicKey));
  });

  return Buffer.from(secp256k1.publicKeyCombine(keys, compressed));
};

/**
 * Convert a signature to a normalized lower-S form.
 * @method signatureNormalize
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureNormalize = function signatureNormalize(signature) {
  return Buffer.from(secp256k1.signatureNormalize(Uint8Array.from(signature)));
};

/**
 * Serialize an ECDSA signature in DER format.
 * @method signatureExport
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureExport = function signatureExport(signature) {
  return Buffer.from(secp256k1.signatureExport(Uint8Array.from(signature)));
};

/**
 * Parse a DER ECDSA signature (follow by [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)).
 * @method signatureImport
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureImport = function signatureImport(signature) {
  return Buffer.from(secp256k1.signatureImport(Uint8Array.from(signature)));
};

/**
 * Parse a DER ECDSA signature (not follow by [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)).
 * @method signatureImportLax
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureImportLax = function signatureImportLax(signature) {
  // signatureImportLax method is not part of secp256k1 v4 package
  // this implementation is based on v3
  // ensure that signature is greater than 0
  if (signature.length === 0) {
    throw new RangeError('signature length is invalid');
  }

  var sigObj = der.signatureImportLax(signature);
  if (sigObj === null) {
    throw new Error("couldn't parse DER signature");
  }

  return secp256k1v3.signatureImport(sigObj);
};

/**
 * Create an ECDSA signature. Always return low-S signature.
 * @method sign
 * @param {Buffer} message
 * @param {Buffer} privateKey
 * @param {Object} options
 * @return {Buffer}
 */
var sign = function sign(message, privateKey, options) {
  if (options === null) {
    throw new TypeError('options should be an Object');
  }

  var signOptions = void 0;

  if (options) {
    signOptions = {};

    if (options.data === null) {
      throw new TypeError('options.data should be a Buffer');
    }

    if (options.data) {
      // validate option.data length
      if (options.data.length !== 32) {
        throw new RangeError('options.data length is invalid');
      }

      signOptions.data = new Uint8Array(options.data);
    }

    if (options.noncefn === null) {
      throw new TypeError('options.noncefn should be a Function');
    }

    if (options.noncefn) {
      //  convert option.noncefn function signature
      signOptions.noncefn = function (message, privateKey, algo, data, attempt) {
        var bufferAlgo = algo != null ? Buffer.from(algo) : null;
        var bufferData = data != null ? Buffer.from(data) : null;

        var buffer = Buffer.from('');

        if (options.noncefn) {
          buffer = options.noncefn(Buffer.from(message), Buffer.from(privateKey), bufferAlgo, bufferData, attempt);
        }

        return Uint8Array.from(buffer);
      };
    }
  }

  var sig = secp256k1.ecdsaSign(Uint8Array.from(message), Uint8Array.from(privateKey), signOptions);

  return {
    signature: Buffer.from(sig.signature),
    recovery: sig.recid
  };
};

/**
 * Verify an ECDSA signature.
 * @method verify
 * @param {Buffer} message
 * @param {Buffer} signature
 * @param {Buffer} publicKey
 * @return {boolean}
 */
var verify = function verify(message, signature, publicKey) {
  // note: secp256k1 v4 verify method has a different argument order
  return secp256k1.ecdsaVerify(Uint8Array.from(signature), Uint8Array.from(message), publicKey);
};

/**
 * Recover an ECDSA public key from a signature.
 * @method recover
 * @param {Buffer} message
 * @param {Buffer} signature
 * @param {Number} recid
 * @param {boolean} compressed
 * @return {Buffer}
 */
var recover = function recover(message, signature, recid, compressed) {
  // note: secp256k1 v4 recover method has a different argument order
  return Buffer.from(secp256k1.ecdsaRecover(Uint8Array.from(signature), recid, Uint8Array.from(message), compressed));
};

/**
 * Compute an EC Diffie-Hellman secret and applied sha256 to compressed public key.
 * @method ecdh
 * @param {Buffer} publicKey
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
var ecdh = function ecdh(publicKey, privateKey) {
  // note: secp256k1 v3 doesn't allow optional parameter
  return Buffer.from(secp256k1.ecdh(Uint8Array.from(publicKey), Uint8Array.from(privateKey), {}));
};

/**
 * Compute an EC Diffie-Hellman secret and return public key as result
 * @method ecdhUnsafe
 * @param {Buffer} publicKey
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {Buffer}
 */
var ecdhUnsafe = function ecdhUnsafe(publicKey, privateKey, compressed) {
  // ecdhUnsafe method is not part of secp256k1 v4 package
  // this implementation is based on v3
  // ensure valid publicKey length
  if (publicKey.length !== 33 && publicKey.length !== 65) {
    throw new RangeError('public key length is invalid');
  }

  // ensure valid privateKey length
  if (privateKey.length !== 32) {
    throw new RangeError('private key length is invalid');
  }

  return Buffer.from(secp256k1v3.ecdhUnsafe(Uint8Array.from(publicKey), Uint8Array.from(privateKey), compressed));
};

module.exports = {
  privateKeyVerify: privateKeyVerify,
  privateKeyExport: privateKeyExport,
  privateKeyImport: privateKeyImport,
  privateKeyNegate: privateKeyNegate,
  privateKeyModInverse: privateKeyModInverse,
  privateKeyTweakAdd: privateKeyTweakAdd,
  privateKeyTweakMul: privateKeyTweakMul,

  publicKeyCreate: publicKeyCreate,
  publicKeyConvert: publicKeyConvert,
  publicKeyVerify: publicKeyVerify,
  publicKeyTweakAdd: publicKeyTweakAdd,
  publicKeyTweakMul: publicKeyTweakMul,
  publicKeyCombine: publicKeyCombine,

  signatureNormalize: signatureNormalize,
  signatureExport: signatureExport,
  signatureImport: signatureImport,
  signatureImportLax: signatureImportLax,

  sign: sign,
  verify: verify,
  recover: recover,

  ecdh: ecdh,
  ecdhUnsafe: ecdhUnsafe
};
},{"ethereum-cryptography/secp256k1":"../node_modules/ethereum-cryptography/secp256k1.js","./secp256k1-lib/index":"../node_modules/ethereumjs-util/dist/secp256k1-lib/index.js","./secp256k1-lib/der":"../node_modules/ethereumjs-util/dist/secp256k1-lib/der.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/rlp/dist/index.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLength = exports.decode = exports.encode = void 0;
var BN = require("bn.js");
/**
 * RLP Encoding based on: https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP
 * This function takes in a data, convert it to buffer if not, and a length for recursion
 * @param input - will be converted to buffer
 * @returns returns buffer of encoded data
 **/
function encode(input) {
    if (Array.isArray(input)) {
        var output = [];
        for (var i = 0; i < input.length; i++) {
            output.push(encode(input[i]));
        }
        var buf = Buffer.concat(output);
        return Buffer.concat([encodeLength(buf.length, 192), buf]);
    }
    else {
        var inputBuf = toBuffer(input);
        return inputBuf.length === 1 && inputBuf[0] < 128
            ? inputBuf
            : Buffer.concat([encodeLength(inputBuf.length, 128), inputBuf]);
    }
}
exports.encode = encode;
/**
 * Parse integers. Check if there is no leading zeros
 * @param v The value to parse
 * @param base The base to parse the integer into
 */
function safeParseInt(v, base) {
    if (v.slice(0, 2) === '00') {
        throw new Error('invalid RLP: extra zeros');
    }
    return parseInt(v, base);
}
function encodeLength(len, offset) {
    if (len < 56) {
        return Buffer.from([len + offset]);
    }
    else {
        var hexLength = intToHex(len);
        var lLength = hexLength.length / 2;
        var firstByte = intToHex(offset + 55 + lLength);
        return Buffer.from(firstByte + hexLength, 'hex');
    }
}
function decode(input, stream) {
    if (stream === void 0) { stream = false; }
    if (!input || input.length === 0) {
        return Buffer.from([]);
    }
    var inputBuffer = toBuffer(input);
    var decoded = _decode(inputBuffer);
    if (stream) {
        return decoded;
    }
    if (decoded.remainder.length !== 0) {
        throw new Error('invalid remainder');
    }
    return decoded.data;
}
exports.decode = decode;
/**
 * Get the length of the RLP input
 * @param input
 * @returns The length of the input or an empty Buffer if no input
 */
function getLength(input) {
    if (!input || input.length === 0) {
        return Buffer.from([]);
    }
    var inputBuffer = toBuffer(input);
    var firstByte = inputBuffer[0];
    if (firstByte <= 0x7f) {
        return inputBuffer.length;
    }
    else if (firstByte <= 0xb7) {
        return firstByte - 0x7f;
    }
    else if (firstByte <= 0xbf) {
        return firstByte - 0xb6;
    }
    else if (firstByte <= 0xf7) {
        // a list between  0-55 bytes long
        return firstByte - 0xbf;
    }
    else {
        // a list  over 55 bytes long
        var llength = firstByte - 0xf6;
        var length = safeParseInt(inputBuffer.slice(1, llength).toString('hex'), 16);
        return llength + length;
    }
}
exports.getLength = getLength;
/** Decode an input with RLP */
function _decode(input) {
    var length, llength, data, innerRemainder, d;
    var decoded = [];
    var firstByte = input[0];
    if (firstByte <= 0x7f) {
        // a single byte whose value is in the [0x00, 0x7f] range, that byte is its own RLP encoding.
        return {
            data: input.slice(0, 1),
            remainder: input.slice(1),
        };
    }
    else if (firstByte <= 0xb7) {
        // string is 0-55 bytes long. A single byte with value 0x80 plus the length of the string followed by the string
        // The range of the first byte is [0x80, 0xb7]
        length = firstByte - 0x7f;
        // set 0x80 null to 0
        if (firstByte === 0x80) {
            data = Buffer.from([]);
        }
        else {
            data = input.slice(1, length);
        }
        if (length === 2 && data[0] < 0x80) {
            throw new Error('invalid rlp encoding: byte must be less 0x80');
        }
        return {
            data: data,
            remainder: input.slice(length),
        };
    }
    else if (firstByte <= 0xbf) {
        // string is greater than 55 bytes long. A single byte with the value (0xb7 plus the length of the length),
        // followed by the length, followed by the string
        llength = firstByte - 0xb6;
        if (input.length - 1 < llength) {
            throw new Error('invalid RLP: not enough bytes for string length');
        }
        length = safeParseInt(input.slice(1, llength).toString('hex'), 16);
        if (length <= 55) {
            throw new Error('invalid RLP: expected string length to be greater than 55');
        }
        data = input.slice(llength, length + llength);
        if (data.length < length) {
            throw new Error('invalid RLP: not enough bytes for string');
        }
        return {
            data: data,
            remainder: input.slice(length + llength),
        };
    }
    else if (firstByte <= 0xf7) {
        // a list between  0-55 bytes long
        length = firstByte - 0xbf;
        innerRemainder = input.slice(1, length);
        while (innerRemainder.length) {
            d = _decode(innerRemainder);
            decoded.push(d.data);
            innerRemainder = d.remainder;
        }
        return {
            data: decoded,
            remainder: input.slice(length),
        };
    }
    else {
        // a list  over 55 bytes long
        llength = firstByte - 0xf6;
        length = safeParseInt(input.slice(1, llength).toString('hex'), 16);
        var totalLength = llength + length;
        if (totalLength > input.length) {
            throw new Error('invalid rlp: total length is larger than the data');
        }
        innerRemainder = input.slice(llength, totalLength);
        if (innerRemainder.length === 0) {
            throw new Error('invalid rlp, List has a invalid length');
        }
        while (innerRemainder.length) {
            d = _decode(innerRemainder);
            decoded.push(d.data);
            innerRemainder = d.remainder;
        }
        return {
            data: decoded,
            remainder: input.slice(totalLength),
        };
    }
}
/** Check if a string is prefixed by 0x */
function isHexPrefixed(str) {
    return str.slice(0, 2) === '0x';
}
/** Removes 0x from a given String */
function stripHexPrefix(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return isHexPrefixed(str) ? str.slice(2) : str;
}
/** Transform an integer into its hexadecimal value */
function intToHex(integer) {
    if (integer < 0) {
        throw new Error('Invalid integer as argument, must be unsigned!');
    }
    var hex = integer.toString(16);
    return hex.length % 2 ? "0" + hex : hex;
}
/** Pad a string to be even */
function padToEven(a) {
    return a.length % 2 ? "0" + a : a;
}
/** Transform an integer into a Buffer */
function intToBuffer(integer) {
    var hex = intToHex(integer);
    return Buffer.from(hex, 'hex');
}
/** Transform anything into a Buffer */
function toBuffer(v) {
    if (!Buffer.isBuffer(v)) {
        if (typeof v === 'string') {
            if (isHexPrefixed(v)) {
                return Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
            }
            else {
                return Buffer.from(v);
            }
        }
        else if (typeof v === 'number' || typeof v === 'bigint') {
            if (!v) {
                return Buffer.from([]);
            }
            else {
                return intToBuffer(v);
            }
        }
        else if (v === null || v === undefined) {
            return Buffer.from([]);
        }
        else if (v instanceof Uint8Array) {
            return Buffer.from(v);
        }
        else if (BN.isBN(v)) {
            // converts a BN to a Buffer
            return Buffer.from(v.toArray());
        }
        else {
            throw new Error('invalid type');
        }
    }
    return v;
}

},{"bn.js":"../node_modules/bn.js/lib/bn.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/is-hex-prefixed/src/index.js":[function(require,module,exports) {
/**
 * Returns a `Boolean` on whether or not the a `String` starts with '0x'
 * @param {String} str the string input value
 * @return {Boolean} a boolean if it is or is not hex prefixed
 * @throws if the str input is not a string
 */
module.exports = function isHexPrefixed(str) {
  if (typeof str !== 'string') {
    throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof str + ", while checking isHexPrefixed.");
  }

  return str.slice(0, 2) === '0x';
};
},{}],"../node_modules/strip-hex-prefix/src/index.js":[function(require,module,exports) {
var isHexPrefixed = require('is-hex-prefixed');
/**
 * Removes '0x' from a given `String` is present
 * @param {String} str the string value
 * @return {String|Optional} a string by pass if necessary
 */


module.exports = function stripHexPrefix(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isHexPrefixed(str) ? str.slice(2) : str;
};
},{"is-hex-prefixed":"../node_modules/is-hex-prefixed/src/index.js"}],"../node_modules/ethjs-util/lib/index.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
'use strict';

var isHexPrefixed = require('is-hex-prefixed');

var stripHexPrefix = require('strip-hex-prefix');
/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */


function padToEven(value) {
  var a = value; // eslint-disable-line

  if (typeof a !== 'string') {
    throw new Error('[ethjs-util] while padding to even, value must be string, is currently ' + typeof a + ', while padToEven.');
  }

  if (a.length % 2) {
    a = '0' + a;
  }

  return a;
}
/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */


function intToHex(i) {
  var hex = i.toString(16); // eslint-disable-line

  return '0x' + hex;
}
/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */


function intToBuffer(i) {
  var hex = intToHex(i);
  return new Buffer(padToEven(hex.slice(2)), 'hex');
}
/**
 * Get the binary size of a string
 * @param {String} str
 * @return {Number}
 */


function getBinarySize(str) {
  if (typeof str !== 'string') {
    throw new Error('[ethjs-util] while getting binary size, method getBinarySize requires input \'str\' to be type String, got \'' + typeof str + '\'.');
  }

  return Buffer.byteLength(str, 'utf8');
}
/**
 * Returns TRUE if the first specified array contains all elements
 * from the second one. FALSE otherwise.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @returns {boolean}
 */


function arrayContainsArray(superset, subset, some) {
  if (Array.isArray(superset) !== true) {
    throw new Error('[ethjs-util] method arrayContainsArray requires input \'superset\' to be an array got type \'' + typeof superset + '\'');
  }

  if (Array.isArray(subset) !== true) {
    throw new Error('[ethjs-util] method arrayContainsArray requires input \'subset\' to be an array got type \'' + typeof subset + '\'');
  }

  return subset[Boolean(some) && 'some' || 'every'](function (value) {
    return superset.indexOf(value) >= 0;
  });
}
/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */


function toUtf8(hex) {
  var bufferValue = new Buffer(padToEven(stripHexPrefix(hex).replace(/^0+|0+$/g, '')), 'hex');
  return bufferValue.toString('utf8');
}
/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */


function toAscii(hex) {
  var str = ''; // eslint-disable-line

  var i = 0,
      l = hex.length; // eslint-disable-line

  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }

  for (; i < l; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(code);
  }

  return str;
}
/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */


function fromUtf8(stringValue) {
  var str = new Buffer(stringValue, 'utf8');
  return '0x' + padToEven(str.toString('hex')).replace(/^0+|0+$/g, '');
}
/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */


function fromAscii(stringValue) {
  var hex = ''; // eslint-disable-line

  for (var i = 0; i < stringValue.length; i++) {
    // eslint-disable-line
    var code = stringValue.charCodeAt(i);
    var n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n;
  }

  return '0x' + hex;
}
/**
 * getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
 *
 * @method getKeys get specific key from inner object array of objects
 * @param {String} params
 * @param {String} key
 * @param {Boolean} allowEmpty
 * @returns {Array} output just a simple array of output keys
 */


function getKeys(params, key, allowEmpty) {
  if (!Array.isArray(params)) {
    throw new Error('[ethjs-util] method getKeys expecting type Array as \'params\' input, got \'' + typeof params + '\'');
  }

  if (typeof key !== 'string') {
    throw new Error('[ethjs-util] method getKeys expecting type String for input \'key\' got \'' + typeof key + '\'.');
  }

  var result = []; // eslint-disable-line

  for (var i = 0; i < params.length; i++) {
    // eslint-disable-line
    var value = params[i][key]; // eslint-disable-line

    if (allowEmpty && !value) {
      value = '';
    } else if (typeof value !== 'string') {
      throw new Error('invalid abi');
    }

    result.push(value);
  }

  return result;
}
/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */


function isHexString(value, length) {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

module.exports = {
  arrayContainsArray: arrayContainsArray,
  intToBuffer: intToBuffer,
  getBinarySize: getBinarySize,
  isHexPrefixed: isHexPrefixed,
  stripHexPrefix: stripHexPrefix,
  padToEven: padToEven,
  intToHex: intToHex,
  fromAscii: fromAscii,
  fromUtf8: fromUtf8,
  toAscii: toAscii,
  toUtf8: toUtf8,
  getKeys: getKeys,
  isHexString: isHexString
};
},{"is-hex-prefixed":"../node_modules/is-hex-prefixed/src/index.js","strip-hex-prefix":"../node_modules/strip-hex-prefix/src/index.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js"}],"../node_modules/ethereumjs-util/dist/index.js":[function(require,module,exports) {

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require('ethereum-cryptography/keccak'),
    keccak224 = _require.keccak224,
    keccak384 = _require.keccak384,
    k256 = _require.keccak256,
    keccak512 = _require.keccak512;

var secp256k1 = require('./secp256k1-adapter');
var assert = require('assert');
var rlp = require('rlp');
var BN = require('bn.js');
var createHash = require('create-hash');
var Buffer = require('safe-buffer').Buffer;
Object.assign(exports, require('ethjs-util'));

/**
 * the max integer that this VM can handle (a ```BN```)
 * @var {BN} MAX_INTEGER
 */
exports.MAX_INTEGER = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);

/**
 * 2^256 (a ```BN```)
 * @var {BN} TWO_POW256
 */
exports.TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16);

/**
 * Keccak-256 hash of null (a ```String```)
 * @var {String} KECCAK256_NULL_S
 */
exports.KECCAK256_NULL_S = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
exports.SHA3_NULL_S = exports.KECCAK256_NULL_S;

/**
 * Keccak-256 hash of null (a ```Buffer```)
 * @var {Buffer} KECCAK256_NULL
 */
exports.KECCAK256_NULL = Buffer.from(exports.KECCAK256_NULL_S, 'hex');
exports.SHA3_NULL = exports.KECCAK256_NULL;

/**
 * Keccak-256 of an RLP of an empty array (a ```String```)
 * @var {String} KECCAK256_RLP_ARRAY_S
 */
exports.KECCAK256_RLP_ARRAY_S = '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347';
exports.SHA3_RLP_ARRAY_S = exports.KECCAK256_RLP_ARRAY_S;

/**
 * Keccak-256 of an RLP of an empty array (a ```Buffer```)
 * @var {Buffer} KECCAK256_RLP_ARRAY
 */
exports.KECCAK256_RLP_ARRAY = Buffer.from(exports.KECCAK256_RLP_ARRAY_S, 'hex');
exports.SHA3_RLP_ARRAY = exports.KECCAK256_RLP_ARRAY;

/**
 * Keccak-256 hash of the RLP of null  (a ```String```)
 * @var {String} KECCAK256_RLP_S
 */
exports.KECCAK256_RLP_S = '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421';
exports.SHA3_RLP_S = exports.KECCAK256_RLP_S;

/**
 * Keccak-256 hash of the RLP of null (a ```Buffer```)
 * @var {Buffer} KECCAK256_RLP
 */
exports.KECCAK256_RLP = Buffer.from(exports.KECCAK256_RLP_S, 'hex');
exports.SHA3_RLP = exports.KECCAK256_RLP;

/**
 * [`BN`](https://github.com/indutny/bn.js)
 * @var {Function}
 */
exports.BN = BN;

/**
 * [`rlp`](https://github.com/ethereumjs/rlp)
 * @var {Function}
 */
exports.rlp = rlp;

/**
 * [`secp256k1`](https://github.com/cryptocoinjs/secp256k1-node/)
 * @var {Object}
 */
exports.secp256k1 = secp256k1;

/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
exports.zeros = function (bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
};

/**
  * Returns a zero address
  * @method zeroAddress
  * @return {String}
  */
exports.zeroAddress = function () {
  var addressLength = 20;
  var zeroAddress = exports.zeros(addressLength);
  return exports.bufferToHex(zeroAddress);
};

/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method lsetLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */
exports.setLengthLeft = exports.setLength = function (msg, length, right) {
  var buf = exports.zeros(length);
  msg = exports.toBuffer(msg);
  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }
    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }
    return msg.slice(-length);
  }
};

/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
exports.setLengthRight = function (msg, length) {
  return exports.setLength(msg, length, true);
};

/**
 * Trims leading zeros from a `Buffer` or an `Array`
 * @param {Buffer|Array|String} a
 * @return {Buffer|Array|String}
 */
exports.unpad = exports.stripZeros = function (a) {
  a = exports.stripHexPrefix(a);
  var first = a[0];
  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1);
    first = a[0];
  }
  return a;
};
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */
exports.toBuffer = function (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (exports.isHexString(v)) {
        v = Buffer.from(exports.padToEven(exports.stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = exports.intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
};

/**
 * Converts a `Buffer` to a `Number`
 * @param {Buffer} buf
 * @return {Number}
 * @throws If the input number exceeds 53 bits.
 */
exports.bufferToInt = function (buf) {
  return new BN(exports.toBuffer(buf)).toNumber();
};

/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
exports.bufferToHex = function (buf) {
  buf = exports.toBuffer(buf);
  return '0x' + buf.toString('hex');
};

/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param {Buffer} num
 * @return {BN}
 */
exports.fromSigned = function (num) {
  return new BN(num).fromTwos(256);
};

/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param {BN} num
 * @return {Buffer}
 */
exports.toUnsigned = function (num) {
  return Buffer.from(num.toTwos(256).toArray());
};

/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */
exports.keccak = function (a, bits) {
  a = exports.toBuffer(a);
  if (!bits) bits = 256;

  switch (bits) {
    case 224:
      {
        return keccak224(a);
      }
    case 256:
      {
        return k256(a);
      }
    case 384:
      {
        return keccak384(a);
      }
    case 512:
      {
        return keccak512(a);
      }
    default:
      {
        throw new Error('Invald algorithm: keccak' + bits);
      }
  }
};

/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256)
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.keccak256 = function (a) {
  return exports.keccak(a);
};

/**
 * Creates SHA-3 (Keccak) hash of the input [OBSOLETE]
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the SHA-3 width
 * @return {Buffer}
 */
exports.sha3 = exports.keccak;

/**
 * Creates SHA256 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.sha256 = function (a) {
  a = exports.toBuffer(a);
  return createHash('sha256').update(a).digest();
};

/**
 * Creates RIPEMD160 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Boolean} padded whether it should be padded to 256 bits or not
 * @return {Buffer}
 */
exports.ripemd160 = function (a, padded) {
  a = exports.toBuffer(a);
  var hash = createHash('rmd160').update(a).digest();
  if (padded === true) {
    return exports.setLength(hash, 32);
  } else {
    return hash;
  }
};

/**
 * Creates SHA-3 hash of the RLP encoded version of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.rlphash = function (a) {
  return exports.keccak(rlp.encode(a));
};

/**
 * Checks if the private key satisfies the rules of the curve secp256k1.
 * @param {Buffer} privateKey
 * @return {Boolean}
 */
exports.isValidPrivate = function (privateKey) {
  return secp256k1.privateKeyVerify(privateKey);
};

/**
 * Checks if the public key satisfies the rules of the curve secp256k1
 * and the requirements of Ethereum.
 * @param {Buffer} publicKey The two points of an uncompressed key, unless sanitize is enabled
 * @param {Boolean} [sanitize=false] Accept public keys in other formats
 * @return {Boolean}
 */
exports.isValidPublic = function (publicKey, sanitize) {
  if (publicKey.length === 64) {
    // Convert to SEC1 for secp256k1
    return secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]), publicKey]));
  }

  if (!sanitize) {
    return false;
  }

  return secp256k1.publicKeyVerify(publicKey);
};

/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param {Buffer} pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param {Boolean} [sanitize=false] Accept public keys in other formats
 * @return {Buffer}
 */
exports.pubToAddress = exports.publicToAddress = function (pubKey, sanitize) {
  pubKey = exports.toBuffer(pubKey);
  if (sanitize && pubKey.length !== 64) {
    pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
  }
  assert(pubKey.length === 64);
  // Only take the lower 160bits of the hash
  return exports.keccak(pubKey).slice(-20);
};

/**
 * Returns the ethereum public key of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
var privateToPublic = exports.privateToPublic = function (privateKey) {
  privateKey = exports.toBuffer(privateKey);
  // skip the type flag and use the X, Y points
  return secp256k1.publicKeyCreate(privateKey, false).slice(1);
};

/**
 * Converts a public key to the Ethereum format.
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
exports.importPublic = function (publicKey) {
  publicKey = exports.toBuffer(publicKey);
  if (publicKey.length !== 64) {
    publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
  }
  return publicKey;
};

/**
 * ECDSA sign
 * @param {Buffer} msgHash
 * @param {Buffer} privateKey
 * @return {Object}
 */
exports.ecsign = function (msgHash, privateKey) {
  var sig = secp256k1.sign(msgHash, privateKey);

  var ret = {};
  ret.r = sig.signature.slice(0, 32);
  ret.s = sig.signature.slice(32, 64);
  ret.v = sig.recovery + 27;
  return ret;
};

/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 * @param message
 * @returns {Buffer} hash
 */
exports.hashPersonalMessage = function (message) {
  var prefix = exports.toBuffer('\x19Ethereum Signed Message:\n' + message.length.toString());
  return exports.keccak(Buffer.concat([prefix, message]));
};

/**
 * ECDSA public key recovery from signature
 * @param {Buffer} msgHash
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {Buffer} publicKey
 */
exports.ecrecover = function (msgHash, v, r, s) {
  var signature = Buffer.concat([exports.setLength(r, 32), exports.setLength(s, 32)], 64);
  var recovery = v - 27;
  if (recovery !== 0 && recovery !== 1) {
    throw new Error('Invalid signature v value');
  }
  var senderPubKey = secp256k1.recover(msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
};

/**
 * Convert signature parameters into the format of `eth_sign` RPC method
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {String} sig
 */
exports.toRpcSig = function (v, r, s) {
  // NOTE: with potential introduction of chainId this might need to be updated
  if (v !== 27 && v !== 28) {
    throw new Error('Invalid recovery id');
  }

  // geth (and the RPC eth_sign method) uses the 65 byte format used by Bitcoin
  // FIXME: this might change in the future - https://github.com/ethereum/go-ethereum/issues/2053
  return exports.bufferToHex(Buffer.concat([exports.setLengthLeft(r, 32), exports.setLengthLeft(s, 32), exports.toBuffer(v - 27)]));
};

/**
 * Convert signature format of the `eth_sign` RPC method to signature parameters
 * NOTE: all because of a bug in geth: https://github.com/ethereum/go-ethereum/issues/2053
 * @param {String} sig
 * @return {Object}
 */
exports.fromRpcSig = function (sig) {
  sig = exports.toBuffer(sig);

  // NOTE: with potential introduction of chainId this might need to be updated
  if (sig.length !== 65) {
    throw new Error('Invalid signature length');
  }

  var v = sig[64];
  // support both versions of `eth_sign` responses
  if (v < 27) {
    v += 27;
  }

  return {
    v: v,
    r: sig.slice(0, 32),
    s: sig.slice(32, 64)
  };
};

/**
 * Returns the ethereum address of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
exports.privateToAddress = function (privateKey) {
  return exports.publicToAddress(privateToPublic(privateKey));
};

/**
 * Checks if the address is a valid. Accepts checksummed addresses too
 * @param {String} address
 * @return {Boolean}
 */
exports.isValidAddress = function (address) {
  return (/^0x[0-9a-fA-F]{40}$/.test(address)
  );
};

/**
  * Checks if a given address is a zero address
  * @method isZeroAddress
  * @param {String} address
  * @return {Boolean}
  */
exports.isZeroAddress = function (address) {
  var zeroAddress = exports.zeroAddress();
  return zeroAddress === exports.addHexPrefix(address);
};

/**
 * Returns a checksummed address
 * @param {String} address
 * @return {String}
 */
exports.toChecksumAddress = function (address) {
  address = exports.stripHexPrefix(address).toLowerCase();
  var hash = exports.keccak(address).toString('hex');
  var ret = '0x';

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
};

/**
 * Checks if the address is a valid checksummed address
 * @param {Buffer} address
 * @return {Boolean}
 */
exports.isValidChecksumAddress = function (address) {
  return exports.isValidAddress(address) && exports.toChecksumAddress(address) === address;
};

/**
 * Generates an address of a newly created contract
 * @param {Buffer} from the address which is creating this new address
 * @param {Buffer} nonce the nonce of the from account
 * @return {Buffer}
 */
exports.generateAddress = function (from, nonce) {
  from = exports.toBuffer(from);
  nonce = new BN(nonce);

  if (nonce.isZero()) {
    // in RLP we want to encode null in the case of zero nonce
    // read the RLP documentation for an answer if you dare
    nonce = null;
  } else {
    nonce = Buffer.from(nonce.toArray());
  }

  // Only take the lower 160bits of the hash
  return exports.rlphash([from, nonce]).slice(-20);
};

/**
 * Returns true if the supplied address belongs to a precompiled account (Byzantium)
 * @param {Buffer|String} address
 * @return {Boolean}
 */
exports.isPrecompiled = function (address) {
  var a = exports.unpad(address);
  return a.length === 1 && a[0] >= 1 && a[0] <= 8;
};

/**
 * Adds "0x" to a given `String` if it does not already start with "0x"
 * @param {String} str
 * @return {String}
 */
exports.addHexPrefix = function (str) {
  if (typeof str !== 'string') {
    return str;
  }

  return exports.isHexPrefixed(str) ? str : '0x' + str;
};

/**
 * Validate ECDSA signature
 * @method isValidSignature
 * @param {Buffer} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @param {Boolean} [homestead=true]
 * @return {Boolean}
 */

exports.isValidSignature = function (v, r, s, homestead) {
  var SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
  var SECP256K1_N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);

  if (r.length !== 32 || s.length !== 32) {
    return false;
  }

  if (v !== 27 && v !== 28) {
    return false;
  }

  r = new BN(r);
  s = new BN(s);

  if (r.isZero() || r.gt(SECP256K1_N) || s.isZero() || s.gt(SECP256K1_N)) {
    return false;
  }

  if (homestead === false && new BN(s).cmp(SECP256K1_N_DIV_2) === 1) {
    return false;
  }

  return true;
};

/**
 * Converts a `Buffer` or `Array` to JSON
 * @param {Buffer|Array} ba
 * @return {Array|String|null}
 */
exports.baToJSON = function (ba) {
  if (Buffer.isBuffer(ba)) {
    return '0x' + ba.toString('hex');
  } else if (ba instanceof Array) {
    var array = [];
    for (var i = 0; i < ba.length; i++) {
      array.push(exports.baToJSON(ba[i]));
    }
    return array;
  }
};

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param {Object} self the `Object` to define properties on
 * @param {Array} fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param {*} data data to be validated against the definitions
 */
exports.defineProperties = function (self, fields, data) {
  self.raw = [];
  self._fields = [];

  // attach the `toJSON`
  self.toJSON = function (label) {
    if (label) {
      var obj = {};
      self._fields.forEach(function (field) {
        obj[field] = '0x' + self[field].toString('hex');
      });
      return obj;
    }
    return exports.baToJSON(this.raw);
  };

  self.serialize = function serialize() {
    return rlp.encode(self.raw);
  };

  fields.forEach(function (field, i) {
    self._fields.push(field.name);
    function getter() {
      return self.raw[i];
    }
    function setter(v) {
      v = exports.toBuffer(v);

      if (v.toString('hex') === '00' && !field.allowZero) {
        v = Buffer.allocUnsafe(0);
      }

      if (field.allowLess && field.length) {
        v = exports.stripZeros(v);
        assert(field.length >= v.length, 'The field ' + field.name + ' must not have more ' + field.length + ' bytes');
      } else if (!(field.allowZero && v.length === 0) && field.length) {
        assert(field.length === v.length, 'The field ' + field.name + ' must have byte length of ' + field.length);
      }

      self.raw[i] = v;
    }

    Object.defineProperty(self, field.name, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter
    });

    if (field.default) {
      self[field.name] = field.default;
    }

    // attach alias
    if (field.alias) {
      Object.defineProperty(self, field.alias, {
        enumerable: false,
        configurable: true,
        set: setter,
        get: getter
      });
    }
  });

  // if the constuctor is passed data
  if (data) {
    if (typeof data === 'string') {
      data = Buffer.from(exports.stripHexPrefix(data), 'hex');
    }

    if (Buffer.isBuffer(data)) {
      data = rlp.decode(data);
    }

    if (Array.isArray(data)) {
      if (data.length > self._fields.length) {
        throw new Error('wrong number of fields in data');
      }

      // make sure all the items are buffers
      data.forEach(function (d, i) {
        self[self._fields[i]] = exports.toBuffer(d);
      });
    } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      var keys = Object.keys(data);
      fields.forEach(function (field) {
        if (keys.indexOf(field.name) !== -1) self[field.name] = data[field.name];
        if (keys.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
      });
    } else {
      throw new Error('invalid data');
    }
  }
};
},{"ethereum-cryptography/keccak":"../node_modules/ethereum-cryptography/keccak.js","./secp256k1-adapter":"../node_modules/ethereumjs-util/dist/secp256k1-adapter.js","assert":"../node_modules/assert/assert.js","rlp":"../node_modules/rlp/dist/index.js","bn.js":"../node_modules/bn.js/lib/bn.js","create-hash":"../node_modules/create-hash/browser.js","safe-buffer":"../node_modules/safe-buffer/index.js","ethjs-util":"../node_modules/ethjs-util/lib/index.js"}],"../node_modules/use-wallet/dist/index-b6b58529.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _indexD3bd = require("./index-d3bd4678.js");

require("react");

require("@aragon/provided-connector");

require("events");

require("buffer");

require("./_crypto_commonjs-external-1a228943.js");

var _subscriptionManager0493518a = require("./subscriptionManager-0493518a.js");

require("stream");

require("string_decoder");

var _util_commonjsExternal6c = require("./_util_commonjs-external-6c254708.js");

require("crypto");

require("assert");

require("util");

var _index77f376c = require("./index-77f376c4.js");

const y = _indexD3bd.r.EventEmitter,
      w = _util_commonjsExternal6c.r.inherits;
var b = _;

function _() {
  y.call(this), this.isLocked = !0;
}

w(_, y), _.prototype.go = function () {
  this.isLocked = !1, this.emit("unlock");
}, _.prototype.stop = function () {
  this.isLocked = !0, this.emit("lock");
}, _.prototype.await = function (e) {
  const t = this;
  t.isLocked ? t.once("unlock", e) : setTimeout(e);
};

var k = function (e) {
  var t = E(e);
  if (t >= e.params.length) return null;
  return e.params[t];
};

function E(e) {
  switch (e.method) {
    case "eth_getStorageAt":
      return 2;

    case "eth_getBalance":
    case "eth_getCode":
    case "eth_getTransactionCount":
    case "eth_call":
    case "eth_estimateGas":
      return 1;

    case "eth_getBlockByNumber":
      return 0;

    default:
      return;
  }
}

var T = function () {
  var e = new Date().getTime() * Math.pow(10, 3),
      t = Math.floor(Math.random() * Math.pow(10, 3));
  return e + t;
};

var P = function (e) {
  return (0, _subscriptionManager0493518a.e)({
    id: T(),
    jsonrpc: "2.0",
    params: []
  }, e);
};

const R = _indexD3bd.r.EventEmitter,
      x = _util_commonjsExternal6c.r.inherits,
      C = function () {};

var S = B;

function B(e) {
  R.call(this), this.setMaxListeners(30), e = e || {};
  const t = {
    sendAsync: this._handleAsync.bind(this)
  },
        n = e.blockTrackerProvider || t;
  this._blockTracker = e.blockTracker || new _subscriptionManager0493518a.E({
    provider: n,
    pollingInterval: e.pollingInterval || 4e3,
    setSkipCacheFlag: !0
  }), this._ready = new b(), this.currentBlock = null, this._providers = [];
}

x(B, R), Object.defineProperty(B, "name", {
  value: "HttpProvider"
}), B.prototype.start = function (e = C) {
  const t = this;
  t._ready.go(), t._blockTracker.on("latest", e => {
    t._getBlockByNumber(e, (e, n) => {
      if (e) return void this.emit("error", e);
      if (!n) return;
      const r = (o = n, {
        number: _subscriptionManager0493518a.a.toBuffer(o.number),
        hash: _subscriptionManager0493518a.a.toBuffer(o.hash),
        parentHash: _subscriptionManager0493518a.a.toBuffer(o.parentHash),
        nonce: _subscriptionManager0493518a.a.toBuffer(o.nonce),
        mixHash: _subscriptionManager0493518a.a.toBuffer(o.mixHash),
        sha3Uncles: _subscriptionManager0493518a.a.toBuffer(o.sha3Uncles),
        logsBloom: _subscriptionManager0493518a.a.toBuffer(o.logsBloom),
        transactionsRoot: _subscriptionManager0493518a.a.toBuffer(o.transactionsRoot),
        stateRoot: _subscriptionManager0493518a.a.toBuffer(o.stateRoot),
        receiptsRoot: _subscriptionManager0493518a.a.toBuffer(o.receiptRoot || o.receiptsRoot),
        miner: _subscriptionManager0493518a.a.toBuffer(o.miner),
        difficulty: _subscriptionManager0493518a.a.toBuffer(o.difficulty),
        totalDifficulty: _subscriptionManager0493518a.a.toBuffer(o.totalDifficulty),
        size: _subscriptionManager0493518a.a.toBuffer(o.size),
        extraData: _subscriptionManager0493518a.a.toBuffer(o.extraData),
        gasLimit: _subscriptionManager0493518a.a.toBuffer(o.gasLimit),
        gasUsed: _subscriptionManager0493518a.a.toBuffer(o.gasUsed),
        timestamp: _subscriptionManager0493518a.a.toBuffer(o.timestamp),
        transactions: o.transactions
      });
      var o;
      t._setCurrentBlock(r), t.emit("rawBlock", n), t.emit("latest", n);
    });
  }), t._blockTracker.on("sync", t.emit.bind(t, "sync")), t._blockTracker.on("error", t.emit.bind(t, "error")), t._running = !0, t.emit("start");
}, B.prototype.stop = function () {
  this._blockTracker.removeAllListeners(), this._running = !1, this.emit("stop");
}, B.prototype.isRunning = function () {
  return this._running;
}, B.prototype.addProvider = function (e, t) {
  const n = this;
  "number" == typeof t ? n._providers.splice(t, 0, e) : n._providers.push(e), e.setEngine(this);
}, B.prototype.removeProvider = function (e) {
  const t = this._providers.indexOf(e);

  if (t < 0) throw new Error("Provider not found.");

  this._providers.splice(t, 1);
}, B.prototype.send = function (e) {
  throw new Error("Web3ProviderEngine does not support synchronous requests.");
}, B.prototype.sendAsync = function (e, t) {
  const n = this;

  n._ready.await(function () {
    Array.isArray(e) ? (0, _subscriptionManager0493518a.m)(e, n._handleAsync.bind(n), t) : n._handleAsync(e, t);
  });
}, B.prototype._getBlockByNumber = function (e, t) {
  const n = P({
    method: "eth_getBlockByNumber",
    params: [e, !1],
    skipCache: !0
  });

  this._handleAsync(n, (e, n) => e ? t(e) : t(null, n.result));
}, B.prototype._handleAsync = function (e, t) {
  var n = this,
      r = -1,
      o = null,
      i = null,
      a = [];

  function s(n, r) {
    i = n, o = r, (0, _subscriptionManager0493518a.b)(a, function (e, t) {
      e ? e(i, o, t) : t();
    }, function () {
      var n = {
        id: e.id,
        jsonrpc: e.jsonrpc,
        result: o
      };
      null != i ? (n.error = {
        message: i.stack || i.message || i,
        code: -32e3
      }, t(i, n)) : t(null, n);
    });
  }

  !function t(o) {
    if (r += 1, a.unshift(o), r >= n._providers.length) s(new Error('Request for method "' + e.method + '" not handled by any subprovider. Please check your subprovider configuration to ensure this method is handled.'));else try {
      n._providers[r].handleRequest(e, t, s);
    } catch (e) {
      s(e);
    }
  }();
}, B.prototype._setCurrentBlock = function (e) {
  this.currentBlock = e, this.emit("block", e);
};
var N = A;

function A() {}

A.prototype.setEngine = function (e) {
  const t = this;
  t.engine || (t.engine = e, e.on("block", function (e) {
    t.currentBlock = e;
  }), e.on("start", function () {
    t.start();
  }), e.on("stop", function () {
    t.stop();
  }));
}, A.prototype.handleRequest = function (e, t, n) {
  throw new Error("Subproviders should override `handleRequest`.");
}, A.prototype.emitPayload = function (e, t) {
  this.engine.sendAsync(P(e), t);
}, A.prototype.stop = function () {}, A.prototype.start = function () {};
var I = class extends N {
  constructor(e) {
    if (super(), !e) throw new Error("JsonRpcEngineMiddlewareSubprovider - no constructorFn specified");
    this._constructorFn = e;
  }

  setEngine(e) {
    if (this.middleware) throw new Error("JsonRpcEngineMiddlewareSubprovider - subprovider added to engine twice");

    const t = e._blockTracker,
          n = this._constructorFn({
      engine: e,
      provider: e,
      blockTracker: t
    });

    if (!n) throw new Error("JsonRpcEngineMiddlewareSubprovider - _constructorFn did not return middleware");
    if ("function" != typeof n) throw new Error("JsonRpcEngineMiddlewareSubprovider - specified middleware is not a function");
    this.middleware = n;
  }

  handleRequest(e, t, n) {
    const r = {
      id: e.id
    };
    this.middleware(e, r, function (e) {
      t((t, n, o) => {
        t ? (delete r.result, r.error = {
          message: t.message || t
        }) : r.result = n, e ? e(o) : o();
      });
    }, function (e) {
      if (e) return n(e);
      n(null, r.result);
    });
  }

},
    D = {
  cacheIdentifierForPayload: function (e, t) {
    const n = t ? L(e) : e.params;
    return O(e) ? e.method + ":" + (0, _index77f376c.r)(n) : null;
  },
  canCache: O,
  blockTagForPayload: function (e) {
    let t = M(e);
    if (t >= e.params.length) return null;
    return e.params[t];
  },
  paramsWithoutBlockTag: L,
  blockTagParamIndex: M,
  cacheTypeForPayload: G
};

function O(e) {
  return "never" !== G(e);
}

function L(e) {
  const t = M(e);
  return t >= e.params.length ? e.params : "eth_getBlockByNumber" === e.method ? e.params.slice(1) : e.params.slice(0, t);
}

function M(e) {
  switch (e.method) {
    case "eth_getStorageAt":
      return 2;

    case "eth_getBalance":
    case "eth_getCode":
    case "eth_getTransactionCount":
    case "eth_call":
      return 1;

    case "eth_getBlockByNumber":
      return 0;

    default:
      return;
  }
}

function G(e) {
  switch (e.method) {
    case "web3_clientVersion":
    case "web3_sha3":
    case "eth_protocolVersion":
    case "eth_getBlockTransactionCountByHash":
    case "eth_getUncleCountByBlockHash":
    case "eth_getCode":
    case "eth_getBlockByHash":
    case "eth_getTransactionByHash":
    case "eth_getTransactionByBlockHashAndIndex":
    case "eth_getTransactionReceipt":
    case "eth_getUncleByBlockHashAndIndex":
    case "eth_getCompilers":
    case "eth_compileLLL":
    case "eth_compileSolidity":
    case "eth_compileSerpent":
    case "shh_version":
    case "test_permaCache":
      return "perma";

    case "eth_getBlockByNumber":
    case "eth_getBlockTransactionCountByNumber":
    case "eth_getUncleCountByBlockNumber":
    case "eth_getTransactionByBlockNumberAndIndex":
    case "eth_getUncleByBlockNumberAndIndex":
    case "test_forkCache":
      return "fork";

    case "eth_gasPrice":
    case "eth_blockNumber":
    case "eth_getBalance":
    case "eth_getStorageAt":
    case "eth_getTransactionCount":
    case "eth_call":
    case "eth_estimateGas":
    case "eth_getFilterLogs":
    case "eth_getLogs":
    case "test_blockCache":
      return "block";

    case "net_version":
    case "net_peerCount":
    case "net_listening":
    case "eth_syncing":
    case "eth_sign":
    case "eth_coinbase":
    case "eth_mining":
    case "eth_hashrate":
    case "eth_accounts":
    case "eth_sendTransaction":
    case "eth_sendRawTransaction":
    case "eth_newFilter":
    case "eth_newBlockFilter":
    case "eth_newPendingTransactionFilter":
    case "eth_uninstallFilter":
    case "eth_getFilterChanges":
    case "eth_getWork":
    case "eth_submitWork":
    case "eth_submitHashrate":
    case "db_putString":
    case "db_getString":
    case "db_putHex":
    case "db_getHex":
    case "shh_post":
    case "shh_newIdentity":
    case "shh_hasIdentity":
    case "shh_newGroup":
    case "shh_addToGroup":
    case "shh_newFilter":
    case "shh_uninstallFilter":
    case "shh_getFilterChanges":
    case "shh_getMessages":
    case "test_neverCache":
      return "never";
  }
}

const F = [void 0, null, "<nil>"];

var U = function (e = {}) {
  const {
    blockTracker: t
  } = e;
  if (!t) throw new Error("createBlockCacheMiddleware - No BlockTracker specified");
  const n = new q(),
        r = {
    perma: n,
    block: n,
    fork: n
  };
  return (0, _subscriptionManager0493518a.j)(async (e, o, i) => {
    if (e.skipCache) return i();
    const a = D.cacheTypeForPayload(e),
          s = r[a];
    if (!s) return i();
    if (!s.canCacheRequest(e)) return i();
    let c,
        u = D.blockTagForPayload(e);
    if (u || (u = "latest"), "earliest" === u) c = "0x00";else if ("latest" === u) {
      const e = await t.getLatestBlock();
      n.clearBefore(e), c = e;
    } else c = u;
    const d = await s.get(e, c);
    void 0 === d ? (await i(), await s.set(e, c, o.result)) : o.result = d;
  });
};

class q {
  constructor() {
    this.cache = {};
  }

  getBlockCacheForPayload(e, t) {
    const n = Number.parseInt(t, 16);
    let r = this.cache[n];

    if (!r) {
      const e = {};
      this.cache[n] = e, r = e;
    }

    return r;
  }

  async get(e, t) {
    const n = this.getBlockCacheForPayload(e, t);
    if (n) return n[D.cacheIdentifierForPayload(e, !0)];
  }

  async set(e, t, n) {
    this.canCacheResult(e, n) && (this.getBlockCacheForPayload(e, t)[D.cacheIdentifierForPayload(e, !0)] = n);
  }

  canCacheRequest(e) {
    if (!D.canCache(e)) return !1;
    return "pending" !== D.blockTagForPayload(e);
  }

  canCacheResult(e, t) {
    if (!F.includes(t)) return !!(!["eth_getTransactionByHash", "eth_getTransactionReceipt"].includes(e.method) || t && t.blockHash && "0x0000000000000000000000000000000000000000000000000000000000000000" !== t.blockHash);
  }

  clearBefore(e) {
    const t = this,
          n = Number.parseInt(e, 16);
    Object.keys(t.cache).map(Number).filter(e => e < n).forEach(e => delete t.cache[e]);
  }

}

var j = class extends I {
  constructor(e) {
    super(({
      blockTracker: t
    }) => U(Object.assign({
      blockTracker: t
    }, e)));
  }

};
const H = _util_commonjsExternal6c.r.inherits;
var V = W;

function W(e) {
  e = e || {}, this.staticResponses = e;
}

H(W, N), W.prototype.handleRequest = function (e, t, n) {
  var r = this.staticResponses[e.method];
  "function" == typeof r ? r(e, t, n) : void 0 !== r ? setTimeout(() => n(null, r)) : t();
};

var z = class extends I {
  constructor() {
    super(({
      blockTracker: e,
      provider: t,
      engine: n
    }) => (0, _subscriptionManager0493518a.d)({
      blockTracker: e,
      provider: t
    }));
  }

},
    J = function (e, t, n) {
  e.sendAsync(P({
    method: "eth_estimateGas",
    params: [t]
  }), function (e, t) {
    if (e) return "no contract code at given address" === e.message ? n(null, "0xcf08") : n(e);
    n(null, t.result);
  });
};

const K = _util_commonjsExternal6c.r.inherits,
      $ = /^[0-9A-Fa-f]+$/g;
var Z = X;

function X(e) {
  this.nonceLock = (0, _subscriptionManager0493518a.S)(1), e.getAccounts && (this.getAccounts = e.getAccounts), e.processTransaction && (this.processTransaction = e.processTransaction), e.processMessage && (this.processMessage = e.processMessage), e.processPersonalMessage && (this.processPersonalMessage = e.processPersonalMessage), e.processTypedMessage && (this.processTypedMessage = e.processTypedMessage), e.processTypedMessageV3 && (this.processTypedMessageV3 = e.processTypedMessageV3), this.approveTransaction = e.approveTransaction || this.autoApprove, this.approveMessage = e.approveMessage || this.autoApprove, this.approvePersonalMessage = e.approvePersonalMessage || this.autoApprove, this.approveTypedMessage = e.approveTypedMessage || this.autoApprove, this.approveTypedMessageV3 = e.approveTypedMessageV3 || this.autoApprove, e.signTransaction && (this.signTransaction = e.signTransaction || ne("signTransaction")), e.signMessage && (this.signMessage = e.signMessage || ne("signMessage")), e.signPersonalMessage && (this.signPersonalMessage = e.signPersonalMessage || ne("signPersonalMessage")), e.signTypedMessage && (this.signTypedMessage = e.signTypedMessage || ne("signTypedMessage")), e.signTypedMessageV3 && (this.signTypedMessageV3 = e.signTypedMessageV3 || ne("signTypedMessageV3")), e.recoverPersonalSignature && (this.recoverPersonalSignature = e.recoverPersonalSignature), e.publishTransaction && (this.publishTransaction = e.publishTransaction), this.estimateGas = e.estimateGas || this.estimateGas, this.getGasPrice = e.getGasPrice || this.getGasPrice;
}

function Y(e) {
  return e.toLowerCase();
}

function Q(e) {
  const t = _subscriptionManager0493518a.a.addHexPrefix(e);

  return _subscriptionManager0493518a.a.isValidAddress(t);
}

function ee(e) {
  const t = _subscriptionManager0493518a.a.addHexPrefix(e);

  return !_subscriptionManager0493518a.a.isValidAddress(t) && te(e);
}

function te(e) {
  return "string" == typeof e && "0x" === e.slice(0, 2) && e.slice(2).match($);
}

function ne(e) {
  return function (t, n) {
    n(new Error('ProviderEngine - HookedWalletSubprovider - Must provide "' + e + '" fn in constructor options'));
  };
}

K(X, N), X.prototype.handleRequest = function (e, t, n) {
  const r = this;
  let i, a, s, c, u;

  switch (r._parityRequests = {}, r._parityRequestCount = 0, e.method) {
    case "eth_coinbase":
      return void r.getAccounts(function (e, t) {
        if (e) return n(e);
        let r = t[0] || null;
        n(null, r);
      });

    case "eth_accounts":
      return void r.getAccounts(function (e, t) {
        if (e) return n(e);
        n(null, t);
      });

    case "eth_sendTransaction":
      return i = e.params[0], void (0, _subscriptionManager0493518a.w)([e => r.validateTransaction(i, e), e => r.processTransaction(i, e)], n);

    case "eth_signTransaction":
      return i = e.params[0], void (0, _subscriptionManager0493518a.w)([e => r.validateTransaction(i, e), e => r.processSignTransaction(i, e)], n);

    case "eth_sign":
      return ee(e.params[1]) && Q(e.params[0]) ? (u = e.params[0], c = e.params[1]) : (c = e.params[0], u = e.params[1]), s = e.params[2] || {}, a = (0, _subscriptionManager0493518a.e)(s, {
        from: u,
        data: c
      }), void (0, _subscriptionManager0493518a.w)([e => r.validateMessage(a, e), e => r.processMessage(a, e)], n);

    case "personal_sign":
      return function () {
        const t = e.params[0];

        if (ee(e.params[1]) && Q(t)) {
          let t = "The eth_personalSign method requires params ordered ";
          t += "[message, address]. This was previously handled incorrectly, ", t += "and has been corrected automatically. ", t += "Please switch this param order for smooth behavior in the future.", console.warn(t), u = e.params[0], c = e.params[1];
        } else c = e.params[0], u = e.params[1];

        s = e.params[2] || {}, a = (0, _subscriptionManager0493518a.e)(s, {
          from: u,
          data: c
        }), (0, _subscriptionManager0493518a.w)([e => r.validatePersonalMessage(a, e), e => r.processPersonalMessage(a, e)], n);
      }();

    case "personal_ecRecover":
      return function () {
        c = e.params[0];
        let t = e.params[1];
        s = e.params[2] || {}, a = (0, _subscriptionManager0493518a.e)(s, {
          sig: t,
          data: c
        }), r.recoverPersonalSignature(a, n);
      }();

    case "eth_signTypedData":
      return !Q(e.params[1]) && Q(e.params[0]) ? (u = e.params[0], c = e.params[1]) : (c = e.params[0], u = e.params[1]), s = e.params[2] || {}, a = (0, _subscriptionManager0493518a.e)(s, {
        from: u,
        data: c
      }), void (0, _subscriptionManager0493518a.w)([e => r.validateTypedMessage(a, e), e => r.processTypedMessage(a, e)], n);

    case "eth_signTypedData_v3":
      return !Q(e.params[1]) && Q(e.params[0]) ? (u = e.params[0], c = e.params[1]) : (c = e.params[0], u = e.params[1]), s = e.params[2] || {}, a = (0, _subscriptionManager0493518a.e)(s, {
        from: u,
        data: c
      }), void (0, _subscriptionManager0493518a.w)([e => r.validateTypedMessageV3(a, e), e => r.processTypedMessageV3(a, e)], n);

    case "parity_postTransaction":
      return i = e.params[0], void r.parityPostTransaction(i, n);

    case "parity_postSign":
      return u = e.params[0], c = e.params[1], void r.parityPostSign(u, c, n);

    case "parity_checkRequest":
      return function () {
        const t = e.params[0];
        r.parityCheckRequest(t, n);
      }();

    case "parity_defaultAccount":
      return void r.getAccounts(function (e, t) {
        if (e) return n(e);
        const r = t[0] || null;
        n(null, r);
      });

    default:
      return void t();
  }
}, X.prototype.getAccounts = function (e) {
  e(null, []);
}, X.prototype.processTransaction = function (e, t) {
  const n = this;
  (0, _subscriptionManager0493518a.w)([t => n.approveTransaction(e, t), (e, t) => n.checkApproval("transaction", e, t), t => n.finalizeAndSubmitTx(e, t)], t);
}, X.prototype.processSignTransaction = function (e, t) {
  const n = this;
  (0, _subscriptionManager0493518a.w)([t => n.approveTransaction(e, t), (e, t) => n.checkApproval("transaction", e, t), t => n.finalizeTx(e, t)], t);
}, X.prototype.processMessage = function (e, t) {
  const n = this;
  (0, _subscriptionManager0493518a.w)([t => n.approveMessage(e, t), (e, t) => n.checkApproval("message", e, t), t => n.signMessage(e, t)], t);
}, X.prototype.processPersonalMessage = function (e, t) {
  const n = this;
  (0, _subscriptionManager0493518a.w)([t => n.approvePersonalMessage(e, t), (e, t) => n.checkApproval("message", e, t), t => n.signPersonalMessage(e, t)], t);
}, X.prototype.processTypedMessage = function (e, t) {
  const n = this;
  (0, _subscriptionManager0493518a.w)([t => n.approveTypedMessage(e, t), (e, t) => n.checkApproval("message", e, t), t => n.signTypedMessage(e, t)], t);
}, X.prototype.processTypedMessageV3 = function (e, t) {
  const n = this;
  (0, _subscriptionManager0493518a.w)([t => n.approveTypedMessageV3(e, t), (e, t) => n.checkApproval("message", e, t), t => n.signTypedMessageV3(e, t)], t);
}, X.prototype.autoApprove = function (e, t) {
  t(null, !0);
}, X.prototype.checkApproval = function (e, t, n) {
  n(t ? null : new Error("User denied " + e + " signature."));
}, X.prototype.parityPostTransaction = function (e, t) {
  const n = this,
        r = `0x${n._parityRequestCount.toString(16)}`;
  n._parityRequestCount++, n.emitPayload({
    method: "eth_sendTransaction",
    params: [e]
  }, function (e, t) {
    if (e) return void (n._parityRequests[r] = {
      error: e
    });
    const o = t.result;
    n._parityRequests[r] = o;
  }), t(null, r);
}, X.prototype.parityPostSign = function (e, t, n) {
  const r = this,
        o = `0x${r._parityRequestCount.toString(16)}`;
  r._parityRequestCount++, r.emitPayload({
    method: "eth_sign",
    params: [e, t]
  }, function (e, t) {
    if (e) return void (r._parityRequests[o] = {
      error: e
    });
    const n = t.result;
    r._parityRequests[o] = n;
  }), n(null, o);
}, X.prototype.parityCheckRequest = function (e, t) {
  const n = this._parityRequests[e] || null;
  return n ? n.error ? t(n.error) : void t(null, n) : t(null, null);
}, X.prototype.recoverPersonalSignature = function (e, t) {
  let n;

  try {
    n = _subscriptionManager0493518a.s.recoverPersonalSignature(e);
  } catch (e) {
    return t(e);
  }

  t(null, n);
}, X.prototype.validateTransaction = function (e, t) {
  if (void 0 === e.from) return t(new Error("Undefined address - from address required to sign transaction."));
  this.validateSender(e.from, function (n, r) {
    return n ? t(n) : r ? void t() : t(new Error(`Unknown address - unable to sign transaction for this address: "${e.from}"`));
  });
}, X.prototype.validateMessage = function (e, t) {
  if (void 0 === e.from) return t(new Error("Undefined address - from address required to sign message."));
  this.validateSender(e.from, function (n, r) {
    return n ? t(n) : r ? void t() : t(new Error(`Unknown address - unable to sign message for this address: "${e.from}"`));
  });
}, X.prototype.validatePersonalMessage = function (e, t) {
  return void 0 === e.from ? t(new Error("Undefined address - from address required to sign personal message.")) : void 0 === e.data ? t(new Error("Undefined message - message required to sign personal message.")) : te(e.data) ? void this.validateSender(e.from, function (n, r) {
    return n ? t(n) : r ? void t() : t(new Error(`Unknown address - unable to sign message for this address: "${e.from}"`));
  }) : t(new Error("HookedWalletSubprovider - validateMessage - message was not encoded as hex."));
}, X.prototype.validateTypedMessage = function (e, t) {
  return void 0 === e.from ? t(new Error("Undefined address - from address required to sign typed data.")) : void 0 === e.data ? t(new Error("Undefined data - message required to sign typed data.")) : void this.validateSender(e.from, function (n, r) {
    return n ? t(n) : r ? void t() : t(new Error(`Unknown address - unable to sign message for this address: "${e.from}"`));
  });
}, X.prototype.validateTypedMessageV3 = function (e, t) {
  return void 0 === e.from ? t(new Error("Undefined address - from address required to sign typed data.")) : void 0 === e.data ? t(new Error("Undefined data - message required to sign typed data.")) : void this.validateSender(e.from, function (n, r) {
    return n ? t(n) : r ? void t() : t(new Error(`Unknown address - unable to sign message for this address: "${e.from}"`));
  });
}, X.prototype.validateSender = function (e, t) {
  if (!e) return t(null, !1);
  this.getAccounts(function (n, r) {
    if (n) return t(n);
    const o = -1 !== r.map(Y).indexOf(e.toLowerCase());
    t(null, o);
  });
}, X.prototype.finalizeAndSubmitTx = function (e, t) {
  const n = this;
  n.nonceLock.take(function () {
    (0, _subscriptionManager0493518a.w)([n.fillInTxExtras.bind(n, e), n.signTransaction.bind(n), n.publishTransaction.bind(n)], function (e, r) {
      if (n.nonceLock.leave(), e) return t(e);
      t(null, r);
    });
  });
}, X.prototype.finalizeTx = function (e, t) {
  const n = this;
  n.nonceLock.take(function () {
    (0, _subscriptionManager0493518a.w)([n.fillInTxExtras.bind(n, e), n.signTransaction.bind(n)], function (r, o) {
      if (n.nonceLock.leave(), r) return t(r);
      t(null, {
        raw: o,
        tx: e
      });
    });
  });
}, X.prototype.publishTransaction = function (e, t) {
  this.emitPayload({
    method: "eth_sendRawTransaction",
    params: [e]
  }, function (e, n) {
    if (e) return t(e);
    t(null, n.result);
  });
}, X.prototype.estimateGas = function (e, t) {
  J(this.engine, e, t);
}, X.prototype.getGasPrice = function (e) {
  this.emitPayload({
    method: "eth_gasPrice",
    params: []
  }, function (t, n) {
    if (t) return e(t);
    e(null, n.result);
  });
}, X.prototype.fillInTxExtras = function (e, t) {
  const n = this,
        r = e.from,
        i = {};
  void 0 === e.gasPrice && (i.gasPrice = n.getGasPrice.bind(n)), void 0 === e.nonce && (i.nonce = n.emitPayload.bind(n, {
    method: "eth_getTransactionCount",
    params: [r, "pending"]
  })), void 0 === e.gas && (i.gas = n.estimateGas.bind(n, function (e) {
    return {
      from: e.from,
      to: e.to,
      value: e.value,
      data: e.data,
      gas: e.gas,
      gasPrice: e.gasPrice,
      nonce: e.nonce
    };
  }(e))), (0, _subscriptionManager0493518a.p)(i, function (n, r) {
    if (n) return t(n);
    const i = {};
    r.gasPrice && (i.gasPrice = r.gasPrice), r.nonce && (i.nonce = r.nonce.result), r.gas && (i.gas = r.gas), t(null, (0, _subscriptionManager0493518a.e)(e, i));
  });
};
var re = {
  v: 5e3,
  d: "Gas limit of the Genesis block."
},
    oe = {
  v: 17179869184,
  d: "Difficulty of the Genesis block."
},
    ie = {
  v: "0x0000000000000042",
  d: "the geneis nonce"
},
    ae = {
  v: "0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa",
  d: "extra data "
},
    se = {
  v: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
  d: "genesis hash"
},
    ce = {
  v: "0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544",
  d: "the genesis state root"
},
    ue = {
  v: 5e3,
  d: "Minimum the gas limit may ever be."
},
    de = {
  v: 1024,
  d: "The bound divisor of the gas limit, used in update calculations."
},
    le = {
  v: 131072,
  d: "The minimum that the difficulty may ever be."
},
    he = {
  v: 2048,
  d: "The bound divisor of the difficulty, used in the update calculations."
},
    fe = {
  v: 13,
  d: "The decision boundary on the blocktime duration used to determine whether difficulty should go up or not."
},
    pe = {
  v: 32,
  d: "Maximum size extra data may be after Genesis."
},
    ge = {
  v: 3e4,
  d: "Duration between proof-of-work epochs."
},
    me = {
  v: 1024,
  d: "Maximum size of VM stack allowed."
},
    ve = {
  v: 1024,
  d: "Maximum depth of call/create stack."
},
    ye = {
  v: [0, 2, 3, 5, 8, 10, 20],
  d: "Once per operation, for a selection of them."
},
    we = {
  v: 10,
  d: "Once per EXP instuction."
},
    be = {
  v: 10,
  d: "Times ceil(log256(exponent)) for the EXP instruction."
},
    _e = {
  v: 30,
  d: "Once per SHA3 operation."
},
    ke = {
  v: 6,
  d: "Once per word of the SHA3 operation's data."
},
    Ee = {
  v: 50,
  d: "Once per SLOAD operation."
},
    Te = {
  v: 2e4,
  d: "Once per SSTORE operation if the zeroness changes from zero."
},
    Pe = {
  v: 5e3,
  d: "Once per SSTORE operation if the zeroness does not change from zero."
},
    Re = {
  v: 15e3,
  d: "Once per SSTORE operation if the zeroness changes to zero."
},
    xe = {
  v: 1,
  d: "Refunded gas, once per SSTORE operation if the zeroness changes to zero."
},
    Ce = {
  v: 375,
  d: "Per LOG* operation."
},
    Se = {
  v: 8,
  d: "Per byte in a LOG* operation's data."
},
    Be = {
  v: 375,
  d: "Multiplied by the * of the LOG*, per LOG transaction. e.g. LOG0 incurs 0 * c_txLogTopicGas, LOG4 incurs 4 * c_txLogTopicGas."
},
    Ne = {
  v: 32e3,
  d: "Once per CREATE operation & contract-creation transaction."
},
    Ae = {
  v: 40,
  d: "Once per CALL operation & message call transaction."
},
    Ie = {
  v: 2300,
  d: "Free gas given at beginning of call."
},
    De = {
  v: 9e3,
  d: "Paid for CALL when the value transfor is non-zero."
},
    Oe = {
  v: 25e3,
  d: "Paid for CALL when the destination address didn't exist prior."
},
    Le = {
  v: 24e3,
  d: "Refunded following a suicide operation."
},
    Me = {
  v: 3,
  d: "Times the address of the (highest referenced byte in memory + 1). NOTE: referencing happens on read, write and in instructions such as RETURN and CALL."
},
    Ge = {
  v: 512,
  d: "Divisor for the quadratic particle of the memory cost equation."
},
    Fe = {
  v: 200,
  d: ""
},
    Ue = {
  v: 21e3,
  d: "Per transaction. NOTE: Not payable on data of calls between transactions."
},
    qe = {
  v: 32e3,
  d: "the cost of creating a contract via tx"
},
    je = {
  v: 4,
  d: "Per byte of data attached to a transaction that equals zero. NOTE: Not payable on data of calls between transactions."
},
    He = {
  v: 68,
  d: "Per byte of data attached to a transaction that is not equal to zero. NOTE: Not payable on data of calls between transactions."
},
    Ve = {
  v: 3,
  d: "Multiplied by the number of 32-byte words that are copied (round up) for any *COPY operation and added."
},
    We = {
  v: 3e3,
  d: ""
},
    ze = {
  v: 60,
  d: ""
},
    Je = {
  v: 12,
  d: ""
},
    Ke = {
  v: 600,
  d: ""
},
    $e = {
  v: 120,
  d: ""
},
    Ze = {
  v: 15,
  d: ""
},
    Xe = {
  v: 3,
  d: ""
},
    Ye = {
  v: "5000000000000000000",
  d: "the amount a miner get rewarded for mining a block"
},
    Qe = {
  v: "625000000000000000",
  d: "The amount of wei a miner of an uncle block gets for being inculded in the blockchain"
},
    et = {
  v: "156250000000000000",
  d: "the amount a miner gets for inculding a uncle"
},
    tt = {
  v: 115e4,
  d: "the block that the Homestead fork started at"
},
    nt = {
  v: 2463e3,
  d: "the block that the Homestead Reprice (EIP150) fork started at"
},
    rt = {
  v: 1e5,
  d: "Exponential difficulty timebomb period"
},
    ot = {
  v: 2
},
    it = {
  genesisGasLimit: re,
  genesisDifficulty: oe,
  genesisNonce: ie,
  genesisExtraData: ae,
  genesisHash: se,
  genesisStateRoot: ce,
  minGasLimit: ue,
  gasLimitBoundDivisor: de,
  minimumDifficulty: le,
  difficultyBoundDivisor: he,
  durationLimit: fe,
  maximumExtraDataSize: pe,
  epochDuration: ge,
  stackLimit: me,
  callCreateDepth: ve,
  tierStepGas: ye,
  expGas: we,
  expByteGas: be,
  sha3Gas: _e,
  sha3WordGas: ke,
  sloadGas: Ee,
  sstoreSetGas: Te,
  sstoreResetGas: Pe,
  sstoreRefundGas: Re,
  jumpdestGas: xe,
  logGas: Ce,
  logDataGas: Se,
  logTopicGas: Be,
  createGas: Ne,
  callGas: Ae,
  callStipend: Ie,
  callValueTransferGas: De,
  callNewAccountGas: Oe,
  suicideRefundGas: Le,
  memoryGas: Me,
  quadCoeffDiv: Ge,
  createDataGas: Fe,
  txGas: Ue,
  txCreation: qe,
  txDataZeroGas: je,
  txDataNonZeroGas: He,
  copyGas: Ve,
  ecrecoverGas: We,
  sha256Gas: ze,
  sha256WordGas: Je,
  ripemd160Gas: Ke,
  ripemd160WordGas: $e,
  identityGas: Ze,
  identityWordGas: Xe,
  minerReward: Ye,
  ommerReward: Qe,
  niblingReward: et,
  homeSteadForkNumber: tt,
  homesteadRepriceForkNumber: nt,
  timebombPeriod: rt,
  freeBlockPeriod: ot
},
    at = (0, _indexD3bd.h)(Object.freeze({
  __proto__: null,
  genesisGasLimit: re,
  genesisDifficulty: oe,
  genesisNonce: ie,
  genesisExtraData: ae,
  genesisHash: se,
  genesisStateRoot: ce,
  minGasLimit: ue,
  gasLimitBoundDivisor: de,
  minimumDifficulty: le,
  difficultyBoundDivisor: he,
  durationLimit: fe,
  maximumExtraDataSize: pe,
  epochDuration: ge,
  stackLimit: me,
  callCreateDepth: ve,
  tierStepGas: ye,
  expGas: we,
  expByteGas: be,
  sha3Gas: _e,
  sha3WordGas: ke,
  sloadGas: Ee,
  sstoreSetGas: Te,
  sstoreResetGas: Pe,
  sstoreRefundGas: Re,
  jumpdestGas: xe,
  logGas: Ce,
  logDataGas: Se,
  logTopicGas: Be,
  createGas: Ne,
  callGas: Ae,
  callStipend: Ie,
  callValueTransferGas: De,
  callNewAccountGas: Oe,
  suicideRefundGas: Le,
  memoryGas: Me,
  quadCoeffDiv: Ge,
  createDataGas: Fe,
  txGas: Ue,
  txCreation: qe,
  txDataZeroGas: je,
  txDataNonZeroGas: He,
  copyGas: Ve,
  ecrecoverGas: We,
  sha256Gas: ze,
  sha256WordGas: Je,
  ripemd160Gas: Ke,
  ripemd160WordGas: $e,
  identityGas: Ze,
  identityWordGas: Xe,
  minerReward: Ye,
  ommerReward: Qe,
  niblingReward: et,
  homeSteadForkNumber: tt,
  homesteadRepriceForkNumber: nt,
  timebombPeriod: rt,
  freeBlockPeriod: ot,
  default: it
}));

var st = _subscriptionManager0493518a.a.BN,
    ct = new st("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0", 16),
    ut = function () {
  function e(t) {
    !function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }(this, e), t = t || {};
    var n = [{
      name: "nonce",
      length: 32,
      allowLess: !0,
      default: new Buffer([])
    }, {
      name: "gasPrice",
      length: 32,
      allowLess: !0,
      default: new Buffer([])
    }, {
      name: "gasLimit",
      alias: "gas",
      length: 32,
      allowLess: !0,
      default: new Buffer([])
    }, {
      name: "to",
      allowZero: !0,
      length: 20,
      default: new Buffer([])
    }, {
      name: "value",
      length: 32,
      allowLess: !0,
      default: new Buffer([])
    }, {
      name: "data",
      alias: "input",
      allowZero: !0,
      default: new Buffer([])
    }, {
      name: "v",
      allowZero: !0,
      default: new Buffer([28])
    }, {
      name: "r",
      length: 32,
      allowZero: !0,
      allowLess: !0,
      default: new Buffer([])
    }, {
      name: "s",
      length: 32,
      allowZero: !0,
      allowLess: !0,
      default: new Buffer([])
    }];
    _subscriptionManager0493518a.a.defineProperties(this, n, t), Object.defineProperty(this, "from", {
      enumerable: !0,
      configurable: !0,
      get: this.getSenderAddress.bind(this)
    });

    var r = _subscriptionManager0493518a.a.bufferToInt(this.v),
        o = Math.floor((r - 35) / 2);

    o < 0 && (o = 0), this._chainId = o || t.chainId || 0, this._homestead = !0;
  }

  return e.prototype.toCreationAddress = function () {
    return "" === this.to.toString("hex");
  }, e.prototype.hash = function (e) {
    void 0 === e && (e = !0);
    var t = void 0;
    if (e) t = this.raw;else if (this._chainId > 0) {
      var n = this.raw.slice();
      this.v = this._chainId, this.r = 0, this.s = 0, t = this.raw, this.raw = n;
    } else t = this.raw.slice(0, 6);
    return _subscriptionManager0493518a.a.rlphash(t);
  }, e.prototype.getChainId = function () {
    return this._chainId;
  }, e.prototype.getSenderAddress = function () {
    if (this._from) return this._from;
    var e = this.getSenderPublicKey();
    return this._from = _subscriptionManager0493518a.a.publicToAddress(e), this._from;
  }, e.prototype.getSenderPublicKey = function () {
    if (!(this._senderPubKey && this._senderPubKey.length || this.verifySignature())) throw new Error("Invalid Signature");
    return this._senderPubKey;
  }, e.prototype.verifySignature = function () {
    var e = this.hash(!1);
    if (this._homestead && 1 === new st(this.s).cmp(ct)) return !1;

    try {
      var t = _subscriptionManager0493518a.a.bufferToInt(this.v);

      this._chainId > 0 && (t -= 2 * this._chainId + 8), this._senderPubKey = _subscriptionManager0493518a.a.ecrecover(e, t, this.r, this.s);
    } catch (e) {
      return !1;
    }

    return !!this._senderPubKey;
  }, e.prototype.sign = function (e) {
    var t = this.hash(!1),
        n = _subscriptionManager0493518a.a.ecsign(t, e);

    this._chainId > 0 && (n.v += 2 * this._chainId + 8), Object.assign(this, n);
  }, e.prototype.getDataFee = function () {
    for (var e = this.raw[5], t = new st(0), n = 0; n < e.length; n++) 0 === e[n] ? t.iaddn(at.txDataZeroGas.v) : t.iaddn(at.txDataNonZeroGas.v);

    return t;
  }, e.prototype.getBaseFee = function () {
    var e = this.getDataFee().iaddn(at.txGas.v);
    return this._homestead && this.toCreationAddress() && e.iaddn(at.txCreation.v), e;
  }, e.prototype.getUpfrontCost = function () {
    return new st(this.gasLimit).imul(new st(this.gasPrice)).iadd(new st(this.value));
  }, e.prototype.validate = function (e) {
    var t = [];
    return this.verifySignature() || t.push("Invalid Signature"), this.getBaseFee().cmp(new st(this.gasLimit)) > 0 && t.push(["gas limit is too low. Need at least " + this.getBaseFee()]), void 0 === e || !1 === e ? 0 === t.length : t.join(" ");
  }, e;
}();

const dt = _util_commonjsExternal6c.r.inherits,
      lt = k;
var ht = ft;

function ft(e) {
  this.nonceCache = {};
}

dt(ft, N), ft.prototype.handleRequest = function (e, t, n) {
  const r = this;

  switch (e.method) {
    case "eth_getTransactionCount":
      var o = lt(e),
          i = e.params[0].toLowerCase(),
          s = r.nonceCache[i];
      return void ("pending" === o ? s ? n(null, s) : t(function (e, t, n) {
        if (e) return n();
        void 0 === r.nonceCache[i] && (r.nonceCache[i] = t), n();
      }) : t());

    case "eth_sendRawTransaction":
      return void t(function (t, n, o) {
        if (t) return o();

        var i = e.params[0],
            s = (_subscriptionManager0493518a.a.stripHexPrefix(i), Buffer.from(_subscriptionManager0493518a.a.stripHexPrefix(i), "hex"), new ut(Buffer.from(_subscriptionManager0493518a.a.stripHexPrefix(i), "hex"))),
            c = "0x" + s.getSenderAddress().toString("hex").toLowerCase(),
            u = _subscriptionManager0493518a.a.bufferToInt(s.nonce),
            d = (++u).toString(16);

        d.length % 2 && (d = "0" + d), d = "0x" + d, r.nonceCache[c] = d, o();
      });

    case "evm_revert":
      return r.nonceCache = {}, void t();

    default:
      return void t();
  }
};
var pt = class extends I {
  constructor() {
    super(({
      blockTracker: e,
      provider: t,
      engine: n
    }) => {
      const {
        events: r,
        middleware: o
      } = (0, _subscriptionManager0493518a.c)({
        blockTracker: e,
        provider: t
      });
      return r.on("notification", e => n.emit("data", null, e)), o;
    });
  }

},
    gt = (0, _indexD3bd.d)(function (e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = t.ERR_NOT_IN_IFRAME = t.ERR_CONNECTION_TIMEOUT = t.ERR_CONNECTION_DESTROYED = void 0;
  var n = "message";
  t.ERR_CONNECTION_DESTROYED = "ConnectionDestroyed";
  t.ERR_CONNECTION_TIMEOUT = "ConnectionTimeout";
  t.ERR_NOT_IN_IFRAME = "NotInIframe";

  var r,
      o = {
    "http:": "80",
    "https:": "443"
  },
      i = /^(https?:)?\/\/([^/:]+)(:(\d+))?/,
      a = {
    ERR_CONNECTION_DESTROYED: "ConnectionDestroyed",
    ERR_CONNECTION_TIMEOUT: "ConnectionTimeout",
    ERR_NOT_IN_IFRAME: "NotInIframe",
    Promise: function () {
      try {
        return window ? window.Promise : null;
      } catch (e) {
        return null;
      }
    }(),
    debug: !1
  },
      s = (r = 0, function () {
    return ++r;
  }),
      c = function () {
    if (a.debug) {
      for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];

      (e = console).log.apply(e, ["[Penpal]"].concat(n));
    }
  },
      u = function (e) {
    var t = [];
    return e(function () {
      t.forEach(function (e) {
        e();
      });
    }), {
      then: function (e) {
        t.push(e);
      }
    };
  },
      d = function (e) {
    return {
      name: e.name,
      message: e.message,
      stack: e.stack
    };
  },
      l = function (e) {
    var t = new Error();
    return Object.keys(e).forEach(function (n) {
      return t[n] = e[n];
    }), t;
  },
      h = function (e, t, r, o) {
    var i = t.localName,
        u = t.local,
        d = t.remote,
        h = t.remoteOrigin,
        f = !1;
    c("".concat(i, ": Connecting call sender"));
    o.then(function () {
      f = !0;
    }), r.reduce(function (e, t) {
      return e[t] = function (e) {
        return function () {
          for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++) r[o] = arguments[o];

          if (c("".concat(i, ": Sending ").concat(e, "() call")), f) {
            var p = new Error("Unable to send ".concat(e, "() call due ") + "to destroyed connection");
            throw p.code = "ConnectionDestroyed", p;
          }

          return new a.Promise(function (t, o) {
            var a = s();
            u.addEventListener(n, function r(s) {
              if (s.source === d && s.origin === h && "reply" === s.data.penpal && s.data.id === a) {
                c("".concat(i, ": Received ").concat(e, "() reply")), u.removeEventListener(n, r);
                var f = s.data.returnValue;
                s.data.returnValueIsError && (f = l(f)), ("fulfilled" === s.data.resolution ? t : o)(f);
              }
            }), d.postMessage({
              penpal: "call",
              id: a,
              methodName: e,
              args: r
            }, h);
          });
        };
      }(t), e;
    }, e);
  },
      f = function (e, t, r) {
    var o = e.localName,
        i = e.local,
        s = e.remote,
        u = e.remoteOrigin,
        l = !1;
    c("".concat(o, ": Connecting call receiver"));

    var h = function (e) {
      if (e.source === s && e.origin === u && "call" === e.data.penpal) {
        var n = e.data,
            r = n.methodName,
            i = n.args,
            h = n.id;

        if (c("".concat(o, ": Received ").concat(r, "() call")), r in t) {
          var f = function (e) {
            return function (t) {
              if (c("".concat(o, ": Sending ").concat(r, "() reply")), l) c("".concat(o, ": Unable to send ").concat(r, "() reply due to destroyed connection"));else {
                var n = {
                  penpal: "reply",
                  id: h,
                  resolution: e,
                  returnValue: t
                };
                "rejected" === e && t instanceof Error && (n.returnValue = d(t), n.returnValueIsError = !0);

                try {
                  s.postMessage(n, u);
                } catch (e) {
                  throw "DataCloneError" === e.name && s.postMessage({
                    penpal: "reply",
                    id: h,
                    resolution: "rejected",
                    returnValue: d(e),
                    returnValueIsError: !0
                  }, u), e;
                }
              }
            };
          };

          new a.Promise(function (e) {
            return e(t[r].apply(t, i));
          }).then(f("fulfilled"), f("rejected"));
        }
      }
    };

    i.addEventListener(n, h), r.then(function () {
      l = !0, i.removeEventListener(n, h);
    });
  };

  a.connectToChild = function (e) {
    var t,
        r = e.url,
        s = e.appendTo,
        d = e.methods,
        l = void 0 === d ? {} : d,
        p = e.timeout,
        g = new u(function (e) {
      t = e;
    }),
        m = window,
        v = document.createElement("iframe");
    (s || document.body).appendChild(v), g.then(function () {
      v.parentNode && v.parentNode.removeChild(v);
    });

    var y = v.contentWindow || v.contentDocument.parentWindow,
        w = function (e) {
      var t,
          n,
          r,
          a = document.location,
          s = i.exec(e);
      s ? (t = s[1] ? s[1] : a.protocol, n = s[2], r = s[4]) : (t = a.protocol, n = a.hostname, r = a.port);
      var c = r && r !== o[t] ? ":".concat(r) : "";
      return "".concat(t, "//").concat(n).concat(c);
    }(r);

    return {
      promise: new a.Promise(function (e, o) {
        var i;
        void 0 !== p && (i = setTimeout(function () {
          var e = new Error("Connection to child timed out after ".concat(p, "ms"));
          e.code = "ConnectionTimeout", o(e), t();
        }, p));

        var a,
            s,
            d = {},
            b = function (t) {
          if (t.source === y && t.origin === w && "handshake" === t.data.penpal) {
            c("Parent: Received handshake, sending reply"), t.source.postMessage({
              penpal: "handshake-reply",
              methodNames: Object.keys(l)
            }, t.origin);
            var n = {
              localName: "Parent",
              local: m,
              remote: y,
              remoteOrigin: t.origin
            };
            s && s();
            var r = new u(function (e) {
              g.then(e), s = e;
            });
            f(n, l, r), a && a.forEach(function (e) {
              delete d[e];
            }), a = t.data.methodNames, h(d, n, a, g), clearTimeout(i), e(d);
          }
        };

        m.addEventListener(n, b), g.then(function () {
          m.removeEventListener(n, b);
          var e = new Error("Connection destroyed");
          e.code = "ConnectionDestroyed", o(e);
        }), c("Parent: Loading iframe"), v.src = r;
      }),
      iframe: v,
      destroy: t
    };
  }, a.connectToParent = function () {
    var e,
        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        r = t.parentOrigin,
        o = void 0 === r ? "*" : r,
        i = t.methods,
        s = void 0 === i ? {} : i,
        d = t.timeout;

    if (window === window.top) {
      var l = new Error("connectToParent() must be called within an iframe");
      throw l.code = "NotInIframe", l;
    }

    var p = new u(function (t) {
      e = t;
    }),
        g = window,
        m = g.parent,
        v = new a.Promise(function (t, r) {
      var i;
      void 0 !== d && (i = setTimeout(function () {
        var t = new Error("Connection to parent timed out after ".concat(d, "ms"));
        t.code = "ConnectionTimeout", r(t), e();
      }, d));

      var a = function e(r) {
        if (("*" === o || o === r.origin) && r.source === m && "handshake-reply" === r.data.penpal) {
          c("Child: Received handshake reply"), g.removeEventListener(n, e);
          var a = {
            localName: "Child",
            local: g,
            remote: m,
            remoteOrigin: r.origin
          },
              u = {};
          f(a, s, p), h(u, a, r.data.methodNames, p), clearTimeout(i), t(u);
        }
      };

      g.addEventListener(n, a), p.then(function () {
        g.removeEventListener(n, a);
        var e = new Error("Connection destroyed");
        e.code = "ConnectionDestroyed", r(e);
      }), c("Child: Sending handshake"), m.postMessage({
        penpal: "handshake",
        methodNames: Object.keys(s)
      }, o);
    });
    return {
      promise: v,
      destroy: e
    };
  };
  var p = a;
  t.default = p;
}),
    mt = (0, _indexD3bd.e)(gt);
gt.ERR_NOT_IN_IFRAME, gt.ERR_CONNECTION_TIMEOUT, gt.ERR_CONNECTION_DESTROYED;

function vt(e, t) {
  var n = "string" == typeof e ? Object.assign({}, yt[e]) : e;
  if ("object" != typeof n) throw new Error("[Portis] illegal 'network' parameter. Read more about it here: https://docs.portis.io/#/configuration?id=network");
  if (!n.nodeUrl) throw new Error("[Portis] 'nodeUrl' is required. Read more about it here: https://docs.portis.io/#/configuration?id=network");
  if (t && !n.gasRelayHubAddress) throw new Error("[Portis] can't find default gas relay hub for " + e);
  return "string" != typeof e || t || delete n.gasRelayHubAddress, n;
}

var yt = {
  mainnet: {
    nodeUrl: "https://mainnet.infura.io/v3/faa4639b090f46499f29d894da0551a0",
    chainId: "1",
    gasRelayHubAddress: "0xD216153c06E857cD7f72665E0aF1d7D82172F494"
  },
  ropsten: {
    nodeUrl: "https://ropsten.infura.io/v3/faa4639b090f46499f29d894da0551a0",
    chainId: "3",
    gasRelayHubAddress: "0xD216153c06E857cD7f72665E0aF1d7D82172F494"
  },
  rinkeby: {
    nodeUrl: "https://rinkeby.infura.io/v3/faa4639b090f46499f29d894da0551a0",
    chainId: "4",
    gasRelayHubAddress: "0xD216153c06E857cD7f72665E0aF1d7D82172F494"
  },
  goerli: {
    nodeUrl: "https://goerli.prylabs.net",
    chainId: "5"
  },
  ubiq: {
    nodeUrl: "https://rpc1.ubiqscan.io",
    chainId: "8"
  },
  thundercoreTestnet: {
    nodeUrl: "https://testnet-rpc.thundercore.com:8544",
    chainId: "18"
  },
  orchid: {
    nodeUrl: "https://public-node.rsk.co",
    chainId: "30"
  },
  orchidTestnet: {
    nodeUrl: "https://public-node.testnet.rsk.co",
    chainId: "31"
  },
  kovan: {
    nodeUrl: "https://kovan.infura.io/v3/faa4639b090f46499f29d894da0551a0",
    chainId: "42",
    gasRelayHubAddress: "0xD216153c06E857cD7f72665E0aF1d7D82172F494"
  },
  classic: {
    nodeUrl: "https://ethereumclassic.network",
    chainId: "61"
  },
  sokol: {
    nodeUrl: "https://sokol.poa.network",
    chainId: "77"
  },
  core: {
    nodeUrl: "https://core.poa.network",
    chainId: "99"
  },
  xdai: {
    nodeUrl: "https://dai.poa.network",
    chainId: "100",
    gasRelayHubAddress: "0xD216153c06E857cD7f72665E0aF1d7D82172F494"
  },
  thundercore: {
    nodeUrl: "https://mainnet-rpc.thundercore.com",
    chainId: "108"
  },
  fuse: {
    nodeUrl: "https://rpc.fusenet.io",
    chainId: "122"
  },
  lightstreams: {
    nodeUrl: "https://node.mainnet.lightstreams.io",
    chainId: "163"
  },
  maticAlpha: {
    nodeUrl: "https://alpha.ethereum.matic.network",
    chainId: "4626"
  },
  maticTestnet: {
    nodeUrl: "https://testnet2.matic.network",
    chainId: "8995"
  }
},
    wt = window && window.__awaiter || function (e, t, n, r) {
  return new (n || (n = Promise))(function (o, i) {
    function a(e) {
      try {
        c(r.next(e));
      } catch (e) {
        i(e);
      }
    }

    function s(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        i(e);
      }
    }

    function c(e) {
      e.done ? o(e.value) : new n(function (t) {
        t(e.value);
      }).then(a, s);
    }

    c((r = r.apply(e, t || [])).next());
  });
},
    bt = window && window.__generator || function (e, t) {
  var n,
      r,
      o,
      i,
      a = {
    label: 0,
    sent: function () {
      if (1 & o[0]) throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  };
  return i = {
    next: s(0),
    throw: s(1),
    return: s(2)
  }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
    return this;
  }), i;

  function s(i) {
    return function (s) {
      return function (i) {
        if (n) throw new TypeError("Generator is already executing.");

        for (; a;) try {
          if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

          switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
            case 0:
            case 1:
              o = i;
              break;

            case 4:
              return a.label++, {
                value: i[1],
                done: !1
              };

            case 5:
              a.label++, r = i[1], i = [0];
              continue;

            case 7:
              i = a.ops.pop(), a.trys.pop();
              continue;

            default:
              if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                a = 0;
                continue;
              }

              if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                a.label = i[1];
                break;
              }

              if (6 === i[0] && a.label < o[1]) {
                a.label = o[1], o = i;
                break;
              }

              if (o && a.label < o[2]) {
                a.label = o[2], a.ops.push(i);
                break;
              }

              o[2] && a.ops.pop(), a.trys.pop();
              continue;
          }

          i = t.call(e, a);
        } catch (e) {
          i = [6, e], r = 0;
        } finally {
          n = o = 0;
        }

        if (5 & i[0]) throw i[1];
        return {
          value: i[0] ? i[1] : void 0,
          done: !0
        };
      }([i, s]);
    };
  }
},
    _t = require("ethereumjs-util"),
    kt = _t.addHexPrefix,
    Et = _t.stripHexPrefix,
    Tt = _t.BN;

function Pt(e, t) {
  return wt(this, void 0, void 0, function () {
    var n, r, o, i, a;
    return bt(this, function (s) {
      switch (s.label) {
        case 0:
          return [4, e.getBlockByNumber("latest", !1)];

        case 1:
          return n = s.sent(), [4, Rt(e, t, n.gasLimit)];

        case 2:
          if (r = s.sent(), o = r.safeGas, i = r.simpleSend, a = r.gasLimitSpecified, i || a) return [2, o];
          s.label = 3;

        case 3:
          return s.trys.push([3, 5,, 6]), [4, xt(e, t, n.gasLimit, o)];

        case 4:
          return [2, s.sent()];

        case 5:
          return s.sent(), [2, o];

        case 6:
          return [2];
      }
    });
  });
}

function Rt(e, t, n) {
  return wt(this, void 0, void 0, function () {
    var r, o, i;
    return bt(this, function (a) {
      switch (a.label) {
        case 0:
          return Boolean(t.gas) ? [2, {
            safeGas: t.gas,
            simpleSend: !1,
            gasLimitSpecified: !0
          }] : (r = t.to, Boolean(r) ? [4, e.getCode(r)] : [3, 2]);

        case 1:
          if (o = a.sent(), !o || "0x" === o || "0x0" === o) {
            if (t.data) throw new Error("Trying to call a function on a non-contract address");
            return [2, {
              safeGas: "0x5208",
              simpleSend: !0,
              gasLimitSpecified: !1
            }];
          }

          a.label = 2;

        case 2:
          return i = St(n), s = i, c = 20, u = new Tt(19), d = new Tt(c), [2, {
            safeGas: Bt(s.mul(u).div(d)),
            simpleSend: !1,
            gasLimitSpecified: !1
          }];
      }

      var s, c, u, d;
    });
  });
}

function xt(e, t, n, r) {
  return wt(this, void 0, void 0, function () {
    var o;
    return bt(this, function (i) {
      switch (i.label) {
        case 0:
          return t.gas = r, o = kt, [4, e.estimateGas(t)];

        case 1:
          return [2, Ct(o.apply(void 0, [i.sent()]), n)];
      }
    });
  });
}

function Ct(e, t) {
  var n = St(e),
      r = St(t).muln(.9),
      o = n.muln(1.5);
  return n.gt(r) ? Bt(n) : o.lt(r) ? Bt(o) : Bt(r);
}

function St(e) {
  return new Tt(Et(e), 16);
}

function Bt(e) {
  return kt(e.toString(16));
}

var Nt = function () {
  function e(e) {
    this.provider = e;
  }

  return e.prototype.getBlockByNumber = function (e, t) {
    return this.sendAsync("eth_getBlockByNumber", e, t);
  }, e.prototype.getCode = function (e, t) {
    return void 0 === t && (t = "latest"), this.sendAsync("eth_getCode", e, t);
  }, e.prototype.estimateGas = function (e) {
    return this.sendAsync("eth_estimateGas", e);
  }, e.prototype.sendAsync = function (e) {
    for (var t = this, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];

    return new Promise(function (r, o) {
      t.provider.sendAsync({
        id: 42,
        jsonrpc: "2.0",
        method: e,
        params: n
      }, function (e, t) {
        e ? o(e) : r(t.result);
      });
    });
  }, e;
}(),
    At = !1;

function It() {
  return new Promise(function (e) {
    At ? e() : ["loaded", "interactive", "complete"].indexOf(document.readyState) > -1 ? (At = !0, e()) : window.addEventListener("load", function () {
      At = !0, e();
    }, !1);
  });
}

var Dt = {
  Blockchain: class {
    constructor(e, t) {
      this.name = e, this.netID = t;
    }

    toJSON() {
      return JSON.parse('{ "name":"' + this.name + '", "netID":"' + this.netID + '"}');
    }

  }
},
    Ot = function (e, t) {
  return function () {
    for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];

    return e.apply(t, n);
  };
},
    Lt = Object.prototype.toString;

function Mt(e) {
  return "[object Array]" === Lt.call(e);
}

function Gt(e) {
  return null !== e && "object" == typeof e;
}

function Ft(e) {
  return "[object Function]" === Lt.call(e);
}

function Ut(e, t) {
  if (null != e) if ("object" != typeof e && (e = [e]), Mt(e)) for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
}

var qt = {
  isArray: Mt,
  isArrayBuffer: function (e) {
    return "[object ArrayBuffer]" === Lt.call(e);
  },
  isBuffer: function (e) {
    return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
  },
  isFormData: function (e) {
    return "undefined" != typeof FormData && e instanceof FormData;
  },
  isArrayBufferView: function (e) {
    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
  },
  isString: function (e) {
    return "string" == typeof e;
  },
  isNumber: function (e) {
    return "number" == typeof e;
  },
  isObject: Gt,
  isUndefined: function (e) {
    return void 0 === e;
  },
  isDate: function (e) {
    return "[object Date]" === Lt.call(e);
  },
  isFile: function (e) {
    return "[object File]" === Lt.call(e);
  },
  isBlob: function (e) {
    return "[object Blob]" === Lt.call(e);
  },
  isFunction: Ft,
  isStream: function (e) {
    return Gt(e) && Ft(e.pipe);
  },
  isURLSearchParams: function (e) {
    return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
  },
  isStandardBrowserEnv: function () {
    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
  },
  forEach: Ut,
  merge: function e() {
    var t = {};

    function n(n, r) {
      "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n;
    }

    for (var r = 0, o = arguments.length; r < o; r++) Ut(arguments[r], n);

    return t;
  },
  extend: function (e, t, n) {
    return Ut(t, function (t, r) {
      e[r] = n && "function" == typeof t ? Ot(t, n) : t;
    }), e;
  },
  trim: function (e) {
    return e.replace(/^\s*/, "").replace(/\s*$/, "");
  }
},
    jt = function (e, t, n, r, o) {
  return function (e, t, n, r, o) {
    return e.config = t, n && (e.code = n), e.request = r, e.response = o, e;
  }(new Error(e), t, n, r, o);
};

function Ht(e) {
  return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}

var Vt = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
    Wt = qt.isStandardBrowserEnv() ? function () {
  var e,
      t = /(msie|trident)/i.test(navigator.userAgent),
      n = document.createElement("a");

  function r(e) {
    var r = e;
    return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
      href: n.href,
      protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
      host: n.host,
      search: n.search ? n.search.replace(/^\?/, "") : "",
      hash: n.hash ? n.hash.replace(/^#/, "") : "",
      hostname: n.hostname,
      port: n.port,
      pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
    };
  }

  return e = r(window.location.href), function (t) {
    var n = qt.isString(t) ? r(t) : t;
    return n.protocol === e.protocol && n.host === e.host;
  };
}() : function () {
  return !0;
},
    zt = qt.isStandardBrowserEnv() ? {
  write: function (e, t, n, r, o, i) {
    var a = [];
    a.push(e + "=" + encodeURIComponent(t)), qt.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), qt.isString(r) && a.push("path=" + r), qt.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), document.cookie = a.join("; ");
  },
  read: function (e) {
    var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
    return t ? decodeURIComponent(t[3]) : null;
  },
  remove: function (e) {
    this.write(e, "", Date.now() - 864e5);
  }
} : {
  write: function () {},
  read: function () {
    return null;
  },
  remove: function () {}
},
    Jt = function (e) {
  return new Promise(function (t, n) {
    var r = e.data,
        o = e.headers;
    qt.isFormData(r) && delete o["Content-Type"];
    var i = new XMLHttpRequest();

    if (e.auth) {
      var a = e.auth.username || "",
          s = e.auth.password || "";
      o.Authorization = "Basic " + btoa(a + ":" + s);
    }

    if (i.open(e.method.toUpperCase(), function (e, t, n) {
      if (!t) return e;
      var r;
      if (n) r = n(t);else if (qt.isURLSearchParams(t)) r = t.toString();else {
        var o = [];
        qt.forEach(t, function (e, t) {
          null != e && (qt.isArray(e) ? t += "[]" : e = [e], qt.forEach(e, function (e) {
            qt.isDate(e) ? e = e.toISOString() : qt.isObject(e) && (e = JSON.stringify(e)), o.push(Ht(t) + "=" + Ht(e));
          }));
        }), r = o.join("&");
      }
      return r && (e += (-1 === e.indexOf("?") ? "?" : "&") + r), e;
    }(e.url, e.params, e.paramsSerializer), !0), i.timeout = e.timeout, i.onreadystatechange = function () {
      if (i && 4 === i.readyState && (0 !== i.status || i.responseURL && 0 === i.responseURL.indexOf("file:"))) {
        var r,
            o,
            a,
            s,
            c,
            u = "getAllResponseHeaders" in i ? (r = i.getAllResponseHeaders(), c = {}, r ? (qt.forEach(r.split("\n"), function (e) {
          if (s = e.indexOf(":"), o = qt.trim(e.substr(0, s)).toLowerCase(), a = qt.trim(e.substr(s + 1)), o) {
            if (c[o] && Vt.indexOf(o) >= 0) return;
            c[o] = "set-cookie" === o ? (c[o] ? c[o] : []).concat([a]) : c[o] ? c[o] + ", " + a : a;
          }
        }), c) : c) : null,
            d = {
          data: e.responseType && "text" !== e.responseType ? i.response : i.responseText,
          status: i.status,
          statusText: i.statusText,
          headers: u,
          config: e,
          request: i
        };
        !function (e, t, n) {
          var r = n.config.validateStatus;
          n.status && r && !r(n.status) ? t(jt("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n);
        }(t, n, d), i = null;
      }
    }, i.onerror = function () {
      n(jt("Network Error", e, null, i)), i = null;
    }, i.ontimeout = function () {
      n(jt("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", i)), i = null;
    }, qt.isStandardBrowserEnv()) {
      var c = zt,
          u = (e.withCredentials || Wt(e.url)) && e.xsrfCookieName ? c.read(e.xsrfCookieName) : void 0;
      u && (o[e.xsrfHeaderName] = u);
    }

    if ("setRequestHeader" in i && qt.forEach(o, function (e, t) {
      void 0 === r && "content-type" === t.toLowerCase() ? delete o[t] : i.setRequestHeader(t, e);
    }), e.withCredentials && (i.withCredentials = !0), e.responseType) try {
      i.responseType = e.responseType;
    } catch (t) {
      if ("json" !== e.responseType) throw t;
    }
    "function" == typeof e.onDownloadProgress && i.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && i.upload && i.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
      i && (i.abort(), n(e), i = null);
    }), void 0 === r && (r = null), i.send(r);
  });
},
    Kt = {
  "Content-Type": "application/x-www-form-urlencoded"
};

function $t(e, t) {
  !qt.isUndefined(e) && qt.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}

var Zt,
    Xt = {
  adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process) && (Zt = Jt), Zt),
  transformRequest: [function (e, t) {
    return function (e, t) {
      qt.forEach(e, function (n, r) {
        r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);
      });
    }(t, "Content-Type"), qt.isFormData(e) || qt.isArrayBuffer(e) || qt.isBuffer(e) || qt.isStream(e) || qt.isFile(e) || qt.isBlob(e) ? e : qt.isArrayBufferView(e) ? e.buffer : qt.isURLSearchParams(e) ? ($t(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : qt.isObject(e) ? ($t(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;
  }],
  transformResponse: [function (e) {
    if ("string" == typeof e) try {
      e = JSON.parse(e);
    } catch (e) {}
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  }
};
Xt.headers = {
  common: {
    Accept: "application/json, text/plain, */*"
  }
}, qt.forEach(["delete", "get", "head"], function (e) {
  Xt.headers[e] = {};
}), qt.forEach(["post", "put", "patch"], function (e) {
  Xt.headers[e] = qt.merge(Kt);
});
var Yt = Xt;

function Qt() {
  this.handlers = [];
}

Qt.prototype.use = function (e, t) {
  return this.handlers.push({
    fulfilled: e,
    rejected: t
  }), this.handlers.length - 1;
}, Qt.prototype.eject = function (e) {
  this.handlers[e] && (this.handlers[e] = null);
}, Qt.prototype.forEach = function (e) {
  qt.forEach(this.handlers, function (t) {
    null !== t && e(t);
  });
};

var en = Qt,
    tn = function (e, t, n) {
  return qt.forEach(n, function (n) {
    e = n(e, t);
  }), e;
},
    nn = function (e) {
  return !(!e || !e.__CANCEL__);
};

function rn(e) {
  e.cancelToken && e.cancelToken.throwIfRequested();
}

var on = function (e) {
  var t, n, r;
  return rn(e), e.baseURL && (r = e.url, !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(r)) && (e.url = (t = e.baseURL, (n = e.url) ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t)), e.headers = e.headers || {}, e.data = tn(e.data, e.headers, e.transformRequest), e.headers = qt.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), qt.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
    delete e.headers[t];
  }), (e.adapter || Yt.adapter)(e).then(function (t) {
    return rn(e), t.data = tn(t.data, t.headers, e.transformResponse), t;
  }, function (t) {
    return nn(t) || (rn(e), t && t.response && (t.response.data = tn(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
  });
};

function an(e) {
  this.defaults = e, this.interceptors = {
    request: new en(),
    response: new en()
  };
}

an.prototype.request = function (e) {
  "string" == typeof e && (e = qt.merge({
    url: arguments[0]
  }, arguments[1])), (e = qt.merge(Yt, {
    method: "get"
  }, this.defaults, e)).method = e.method.toLowerCase();
  var t = [on, void 0],
      n = Promise.resolve(e);

  for (this.interceptors.request.forEach(function (e) {
    t.unshift(e.fulfilled, e.rejected);
  }), this.interceptors.response.forEach(function (e) {
    t.push(e.fulfilled, e.rejected);
  }); t.length;) n = n.then(t.shift(), t.shift());

  return n;
}, qt.forEach(["delete", "get", "head", "options"], function (e) {
  an.prototype[e] = function (t, n) {
    return this.request(qt.merge(n || {}, {
      method: e,
      url: t
    }));
  };
}), qt.forEach(["post", "put", "patch"], function (e) {
  an.prototype[e] = function (t, n, r) {
    return this.request(qt.merge(r || {}, {
      method: e,
      url: t,
      data: n
    }));
  };
});
var sn = an;

function cn(e) {
  this.message = e;
}

cn.prototype.toString = function () {
  return "Cancel" + (this.message ? ": " + this.message : "");
}, cn.prototype.__CANCEL__ = !0;
var un = cn;

function dn(e) {
  if ("function" != typeof e) throw new TypeError("executor must be a function.");
  var t;
  this.promise = new Promise(function (e) {
    t = e;
  });
  var n = this;
  e(function (e) {
    n.reason || (n.reason = new un(e), t(n.reason));
  });
}

dn.prototype.throwIfRequested = function () {
  if (this.reason) throw this.reason;
}, dn.source = function () {
  var e;
  return {
    token: new dn(function (t) {
      e = t;
    }),
    cancel: e
  };
};
var ln = dn;

function hn(e) {
  var t = new sn(e),
      n = Ot(sn.prototype.request, t);
  return qt.extend(n, sn.prototype, t), qt.extend(n, t), n;
}

var fn = hn(Yt);
fn.Axios = sn, fn.create = function (e) {
  return hn(qt.merge(Yt, e));
}, fn.Cancel = un, fn.CancelToken = ln, fn.isCancel = nn, fn.all = function (e) {
  return Promise.all(e);
}, fn.spread = function (e) {
  return function (t) {
    return e.apply(null, t);
  };
};
var pn = fn,
    gn = fn;
pn.default = gn;
var mn = pn;
var vn = "https://dispatch.pokt.network",
    yn = "/v1/dispatch",
    wn = "/v1/report",
    bn = "/v1/relay/";
var _n = {
  Node: class {
    constructor(e, t, n) {
      this.network = e, this.netID = t;
      var r = n.split(":");
      this.ip = r[0], this.port = r[1], n.includes("https://") || n.includes("http://") ? this.ipPort = n : "443" === this.port || 443 === this.port ? this.ipPort = "https://" + n : this.ipPort = "http://" + n;
    }

    isValid() {
      for (var e in this) if (!this.hasOwnProperty(e) || "" == this[e]) return !1;

      return !0;
    }

    isEqual(e, t) {
      return this.netID == e.toString() && this.network == t.toString();
    }

    async sendRelay(e, t) {
      try {
        const o = mn.create({
          baseURL: this.ipPort,
          timeout: e.configuration.requestTimeOut,
          headers: {
            "Content-Type": "application/json"
          }
        });
        var n = await o.post(bn, e.toJSON());

        if (200 == n.status && null != n.data) {
          var r = n.data;
          return t ? void t(r, null) : r;
        }

        return t ? void t(null, new Error("Failed to send relay with error: " + n.data)) : new Error("Failed to send relay with error: " + n.data);
      } catch (e) {
        return t ? void t(null, new Error("Failed to send relay with error: " + e)) : new Error("Failed to send relay with error: " + e);
      }
    }

  }
};
const kn = _n.Node;
var En = {
  Dispatch: class {
    constructor(e) {
      this.configuration = e, this.axiosInstance = mn.create({
        baseURL: vn,
        path: yn,
        timeout: this.configuration.requestTimeOut,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    blockchainsJSON() {
      var e = [];
      return this.configuration.blockchains.forEach(t => {
        e.push(t);
      }), e;
    }

    async retrieveServiceNodes(e) {
      try {
        var t;

        if (null != (t = await this.axiosInstance.post(yn, {
          DevID: this.configuration.devID,
          Blockchains: this.blockchainsJSON()
        })) && 200 == t.status && null != t.data) {
          var n = this.parseDispatchResponse(t.data);
          return e ? void e(n, null) : n;
        }

        return e ? void e(null, new Error("Failed to retrieve service nodes with error: " + t.data)) : new Error("Failed to retrieve service nodes with error: " + t.data);
      } catch (t) {
        return e ? void e(null, new Error("Failed to retrieve service nodes with error: " + t)) : new Error("Failed to retrieve service nodes with error: " + t);
      }
    }

    parseDispatchResponse(e) {
      try {
        var t = [];
        if (Array.isArray(e)) e.forEach(e => {
          var n = e.name,
              r = e.netid;
          e.ips && e.ips.forEach(e => {
            var o = new kn(n, r, e);
            t.push(o);
          });
        });else {
          var n = e.name,
              r = e.netid;
          e.ips && e.ips.forEach(e => {
            var o = new kn(n, r, e);
            t.push(o);
          });
        }
        return t;
      } catch (e) {
        return new Error("Failed to parsed service nodes with error: " + e);
      }
    }

  }
};
var Tn = {
  Relay: class {
    constructor(e, t, n, r) {
      this.blockchain = e, this.netID = t, this.data = n, this.configuration = r;
    }

    toJSON() {
      return {
        Blockchain: this.blockchain,
        NetID: this.netID,
        Data: this.data,
        DevID: this.configuration.devID
      };
    }

    isValid() {
      for (var e in this) if (!this.hasOwnProperty(e) || "" == this[e]) return !1;

      return !0;
    }

  }
};
var Pn = {
  Report: class {
    constructor(e, t, n) {
      this.ip = e, this.message = t, this.configuration = n;
    }

    toJSON() {
      return {
        IP: this.ip,
        Message: this.message
      };
    }

    isValid() {
      for (var e in this) if (!this.hasOwnProperty(e) || "" == this[e]) return !1;

      return !0;
    }

    async send(e) {
      const t = mn.create({
        baseURL: vn,
        timeout: this.configuration.requestTimeOut,
        headers: {
          "Content-Type": "application/json"
        }
      });
      var n = await t.post(wn, this.toJSON());
      return 200 == n.status && null != n.data ? e ? void e(null, n.data) : n.data : e ? void e(new Error("Failed to send report with error: " + n.data)) : new Error("Failed to send report with error: " + n.data);
    }

  }
};
var Rn = {
  Wallet: class {
    constructor(e, t, n, r, o) {
      this.address = e, this.privateKey = t, this.network = n, this.networkID = r, this.data = o;
    }

  }
},
    xn = (0, _indexD3bd.d)(function (e) {
  e.exports = Object.assign(e.exports, Dt, En, _n, Tn, Pn, Rn);
});
const Cn = xn.Blockchain,
      Sn = xn.Dispatch,
      Bn = xn.Relay,
      Nn = xn.Report;

class An {
  constructor(e, t, n, r) {
    this.devID = e, this.blockchains = t, this.maxNodes = n || 5, this.nodes = [], this.requestTimeOut = r || 1e4, this.dispatch = null;
  }

  nodesIsEmpty() {
    return null == this.nodes || 0 == this.nodes.length;
  }

}

var In = {
  Pocket: class {
    constructor(e) {
      var t = [];
      if (null == e.devID || null == e.networkName || null == e.netIDs) return new Error("Invalid number of arguments");
      if (Array.isArray(e.netIDs)) e.netIDs.forEach(n => {
        var r = new Cn(e.networkName, n);
        t.push(r.toJSON());
      });else {
        var n = new Cn(e.networkName, e.netIDs);
        t.push(n.toJSON());
      }
      this.configuration = new An(e.devID, t, e.maxNodes || 5, e.requestTimeOut || 1e4);
    }

    createRelay(e, t, n) {
      return new Bn(e, t, "string" == typeof n ? n : JSON.stringify(n), this.configuration);
    }

    createReport(e, t) {
      return new Nn(e, t, this.configuration);
    }

    getDispatch() {
      return null == this.dispatch && (this.dispatch = new Sn(this.configuration)), this.dispatch;
    }

    async getNode(e, t) {
      try {
        var n = [];

        if (this.configuration.nodesIsEmpty()) {
          var r = await this.retrieveNodes();
          if (r instanceof Error == 1) throw r;
          this.configuration.nodes = r;
        }

        return this.configuration.nodes.forEach(r => {
          r.isEqual(e, t) && n.push(r);
        }), n.length <= 0 ? null : n[Math.floor(Math.random() * n.length)];
      } catch (e) {
        return null;
      }
    }

    async sendReport(e, t) {
      try {
        if (null == e) throw new Error("Report is null");
        if (!e.isValid()) throw new Error("One or more Report properties are empty.");
        var n = await e.send();
        return n instanceof Error == 0 ? t ? void t(null, n) : n : t ? void t(n) : n;
      } catch (e) {
        return t ? void t(e) : e;
      }
    }

    async sendRelay(e, t) {
      try {
        if (null == e || null == e.data) return t ? void t(new Error("Relay is null or data field is missing")) : new Error("Relay is null or data field is missing");
        if (!e.isValid()) return t ? void t(new Error("Relay is missing a property, please verify all properties.")) : new Error("Relay is missing a property, please verify all properties.");
        var n = await this.getNode(e.netID, e.blockchain);
        if (null == n) return t ? void t(new Error("Node is empty.")) : new Error("Node is empty.");
        var r = await n.sendRelay(e);
        return r instanceof Error == 0 ? t ? void t(null, r) : r : t ? void t(r) : r;
      } catch (e) {
        return t ? void t(new Error("Failed to send relay with error: " + e)) : new Error("Failed to send relay with error: " + e);
      }
    }

    async retrieveNodes(e) {
      try {
        var t = this.getDispatch(),
            n = await t.retrieveServiceNodes();
        return n instanceof Error == 0 && 0 != n.length ? (this.configuration.nodes = n, e ? void e(null, n) : n) : e ? void e(new Error("Failed to retrieve a list of nodes."), null) : new Error("Failed to retrieve a list of nodes.");
      } catch (t) {
        return e ? void e(new Error("Failed to retrieve a list of nodes with error: " + t), null) : new Error("Failed to retrieve a list of nodes with error: " + t);
      }
    }

  },
  Wallet: xn.Wallet,
  Relay: xn.Relay
},
    Dn = window && window.__awaiter || function (e, t, n, r) {
  return new (n || (n = Promise))(function (o, i) {
    function a(e) {
      try {
        c(r.next(e));
      } catch (e) {
        i(e);
      }
    }

    function s(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        i(e);
      }
    }

    function c(e) {
      e.done ? o(e.value) : new n(function (t) {
        t(e.value);
      }).then(a, s);
    }

    c((r = r.apply(e, t || [])).next());
  });
},
    On = window && window.__generator || function (e, t) {
  var n,
      r,
      o,
      i,
      a = {
    label: 0,
    sent: function () {
      if (1 & o[0]) throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  };
  return i = {
    next: s(0),
    throw: s(1),
    return: s(2)
  }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
    return this;
  }), i;

  function s(i) {
    return function (s) {
      return function (i) {
        if (n) throw new TypeError("Generator is already executing.");

        for (; a;) try {
          if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;

          switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
            case 0:
            case 1:
              o = i;
              break;

            case 4:
              return a.label++, {
                value: i[1],
                done: !1
              };

            case 5:
              a.label++, r = i[1], i = [0];
              continue;

            case 7:
              i = a.ops.pop(), a.trys.pop();
              continue;

            default:
              if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                a = 0;
                continue;
              }

              if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                a.label = i[1];
                break;
              }

              if (6 === i[0] && a.label < o[1]) {
                a.label = o[1], o = i;
                break;
              }

              if (o && a.label < o[2]) {
                a.label = o[2], a.ops.push(i);
                break;
              }

              o[2] && a.ops.pop(), a.trys.pop();
              continue;
          }

          i = t.call(e, a);
        } catch (e) {
          i = [6, e], r = 0;
        } finally {
          n = o = 0;
        }

        if (5 & i[0]) throw i[1];
        return {
          value: i[0] ? i[1] : void 0,
          done: !0
        };
      }([i, s]);
    };
  }
},
    Ln = ["email", "reputation"],
    Mn = document.createElement("iframe");

Mn.style.width = "0", Mn.style.height = "0", Mn.style.border = "none", Mn.style.position = "absolute", Mn.style.top = "-999px", Mn.style.left = "-999px", Mn.src = "https://widget.portis.io", It().then(function () {
  document.body.appendChild(Mn);
});

var Gn = function () {
  function e(e, t, n) {
    void 0 === n && (n = {}), this._widgetUrl = "https://widget.portis.io", function () {
      var e = "localhost" === location.hostname || "127.0.0.1" === location.hostname,
          t = "https:" === location.protocol;
      if (!(e || t)) throw "[Portis] Access to the WebCrypto API is restricted to secure origins.\nIf this is a development environment please use http://localhost:" + location.port + " instead.\nOtherwise, please use an SSL certificate.";
    }(), this._valiadateParams(e, t, n), this.config = {
      dappId: e,
      network: vt(t, n.gasRelay),
      version: "2.0.0-beta.54",
      scope: n.scope,
      registerPageByDefault: n.registerPageByDefault
    }, this.widget = this._initWidget(), this.provider = this._initProvider(n);
  }

  return e.prototype.changeNetwork = function (e, t) {
    var n = vt(e, t);
    this.clearSubprovider(ht), this.clearSubprovider(j), this.config.network = n;
  }, e.prototype.setDefaultEmail = function (e) {
    this.config.defaultEmail = e;
  }, e.prototype.showPortis = function () {
    return Dn(this, void 0, void 0, function () {
      return On(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, e.sent().communication.showPortis(this.config)];
        }
      });
    });
  }, e.prototype.logout = function () {
    return Dn(this, void 0, void 0, function () {
      return On(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, e.sent().communication.logout()];
        }
      });
    });
  }, e.prototype.onLogin = function (e) {
    this._onLoginCallback = e;
  }, e.prototype.onLogout = function (e) {
    this._onLogoutCallback = e;
  }, e.prototype.onActiveWalletChanged = function (e) {
    this._onActiveWalletChangedCallback = e;
  }, e.prototype.onError = function (e) {
    this._onErrorCallback = e;
  }, e.prototype.getExtendedPublicKey = function (e, t) {
    return void 0 === e && (e = "m/44'/60'/0'/0/0"), void 0 === t && (t = "Ethereum"), Dn(this, void 0, void 0, function () {
      return On(this, function (n) {
        switch (n.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, n.sent().communication.getExtendedPublicKey(e, t, this.config)];
        }
      });
    });
  }, e.prototype.importWallet = function (e) {
    return Dn(this, void 0, void 0, function () {
      return On(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, t.sent().communication.importWallet(e, this.config)];
        }
      });
    });
  }, e.prototype.isLoggedIn = function () {
    return Dn(this, void 0, void 0, function () {
      return On(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, e.sent().communication.isLoggedIn()];
        }
      });
    });
  }, e.prototype.signBitcoinTransaction = function (e) {
    return Dn(this, void 0, void 0, function () {
      return On(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, t.sent().communication.signBitcoinTransaction(e, this.config)];
        }
      });
    });
  }, e.prototype.showBitcoinWallet = function (e) {
    return void 0 === e && (e = "m/49'/0'/0'/0/0"), Dn(this, void 0, void 0, function () {
      return On(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return [2, t.sent().communication.showBitcoinWallet(e, this.config)];
        }
      });
    });
  }, e.prototype._valiadateParams = function (e, t, n) {
    if (!e) throw new Error("[Portis] 'dappId' is required. Get your dappId here: https://dashboard.portis.io");
    if (!t) throw new Error("[Portis] 'network' is required. Read more about it here: https://docs.portis.io/#/configuration?id=network");

    if (n.scope) {
      if (!Array.isArray(n.scope)) throw new Error("[Portis] 'scope' must be an array. Read more about it here: https://docs.portis.io/#/configuration?id=scope");
      if (n.scope.filter(function (e) {
        return Ln.indexOf(e) < 0;
      }).length > 0) throw new Error("[Portis] invalid 'scope' parameter. Read more about it here: https://docs.portis.io/#/configuration?id=scope");
    }

    if (void 0 !== n.registerPageByDefault && "boolean" != typeof n.registerPageByDefault) throw new Error("[Portis] invalid 'registerPageByDefault' parameter, must be a boolean. Read more about it here: https://docs.portis.io/#/configuration?id=registerPageByDefault");
  }, e.prototype._initWidget = function () {
    return Dn(this, void 0, void 0, function () {
      var e, t, n, r, o;
      return On(this, function (i) {
        switch (i.label) {
          case 0:
            return [4, It()];

          case 1:
            return i.sent(), document.body.contains(Mn) && document.body.removeChild(Mn), (e = document.createElement("style")).innerHTML = "\n.por_portis-container {\n  position: fixed;\n  width: 0px;\n  height: 0px;\n  top: 0px;\n  right: 0px;\n  z-index: 2147483647;\n}\n\n@media (max-width: 576px) {\n  .por_portis-container {\n    bottom: 0;\n    top: auto;\n  }\n}\n\n.por_portis-widget-frame {\n  position: fixed;\n  width: 375px;\n  height: 0;\n  top: 20px;\n  right: 20px;\n  box-shadow: 0 5px 40px rgba(0,0,0,.16);\n  border-radius: 8px;\n  overflow: hidden;\n  z-index: 2147483000;\n}\n\n@media (max-width: 576px) {\n  .por_portis-widget-frame {\n    bottom: 0;\n    top: auto;\n    width: 100%;\n    right: 0;\n    left: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n}\n", (t = document.createElement("div")).className = "por_portis-container", (n = document.createElement("div")).id = "portis-container-" + Date.now(), n.className = "por_portis-widget-frame", t.appendChild(n), document.body.appendChild(t), document.head.appendChild(e), (r = mt.connectToChild({
              url: this._widgetUrl,
              appendTo: document.getElementById(n.id),
              methods: {
                setHeight: this._setHeight.bind(this),
                getWindowSize: this._getWindowSize.bind(this),
                onLogin: this._onLogin.bind(this),
                onLogout: this._onLogout.bind(this),
                onActiveWalletChanged: this._onActiveWalletChanged.bind(this),
                onError: this._onError.bind(this)
              }
            })).iframe.style.position = "absolute", r.iframe.style.height = "100%", r.iframe.style.width = "100%", r.iframe.style.border = "0 transparent", [4, r.promise];

          case 2:
            return (o = i.sent()).retrieveSession(this.config), [2, {
              communication: o,
              iframe: r.iframe,
              widgetFrame: n
            }];
        }
      });
    });
  }, e.prototype._initProvider = function (e) {
    var t = this,
        n = new S(),
        r = new Nt(n);

    if (n.send = function (e, r) {
      if ("string" == typeof e) return new Promise(function (t, o) {
        n.sendAsync({
          jsonrpc: "2.0",
          id: 42,
          method: e,
          params: r || []
        }, function (e, n) {
          e ? o(e) : t(n.result);
        });
      });

      if (!r) {
        var o = null;

        switch (e.method) {
          case "eth_accounts":
          case "eth_coinbase":
            o = t._selectedAddress ? [t._selectedAddress] : [];
            break;

          case "net_version":
            o = t._network;
            break;

          case "eth_uninstallFilter":
            n.sendAsync(e, function (e) {
              return e;
            }), o = !0;
            break;

          default:
            var i = "The Portis Web3 object does not support synchronous methods like " + e.method + " without a callback parameter.";
            throw new Error(i);
        }

        return {
          id: e.id,
          jsonrpc: e.jsonrpc,
          result: o
        };
      }

      n.sendAsync(e, r);
    }, n.addProvider(new V({
      web3_clientVersion: "Portis/v" + this.config.version + "/javascript",
      net_listening: !0,
      eth_hashrate: "0x00",
      eth_mining: !1,
      eth_syncing: !0
    })), n.addProvider(new j()), n.addProvider(new pt()), n.addProvider(new z()), n.addProvider(new ht()), n.addProvider({
      setEngine: function (e) {
        return e;
      },
      handleRequest: function (e, n, r) {
        return Dn(t, void 0, void 0, function () {
          return On(this, function (t) {
            return e.id || (e.id = 42), n(), [2];
          });
        });
      }
    }), n.addProvider(new Z({
      getAccounts: function (e) {
        return Dn(t, void 0, void 0, function () {
          var t, n, r;
          return On(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return [4, o.sent().communication.getAccounts(this.config)];

              case 2:
                return t = o.sent(), n = t.error, r = t.result, !n && r && (this._selectedAddress = r[0]), e(n, r), [2];
            }
          });
        });
      },
      signTransaction: function (e, n) {
        return Dn(t, void 0, void 0, function () {
          var t, r, o;
          return On(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return [4, i.sent().communication.signTransaction(e, this.config)];

              case 2:
                return t = i.sent(), r = t.error, o = t.result, n(r, o), [2];
            }
          });
        });
      },
      signMessage: function (e, n) {
        return Dn(t, void 0, void 0, function () {
          var t, r, o, i, a;
          return On(this, function (s) {
            switch (s.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return t = s.sent().communication, r = Object.assign({}, e, {
                  messageStandard: "signMessage"
                }), [4, t.signMessage(r, this.config)];

              case 2:
                return o = s.sent(), i = o.error, a = o.result, n(i, a), [2];
            }
          });
        });
      },
      signPersonalMessage: function (e, n) {
        return Dn(t, void 0, void 0, function () {
          var t, r, o, i, a;
          return On(this, function (s) {
            switch (s.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return t = s.sent().communication, r = Object.assign({}, e, {
                  messageStandard: "signPersonalMessage"
                }), [4, t.signMessage(r, this.config)];

              case 2:
                return o = s.sent(), i = o.error, a = o.result, n(i, a), [2];
            }
          });
        });
      },
      signTypedMessage: function (e, n) {
        return Dn(t, void 0, void 0, function () {
          var t, r, o, i, a;
          return On(this, function (s) {
            switch (s.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return t = s.sent().communication, r = Object.assign({}, e, {
                  messageStandard: "signTypedMessage"
                }), [4, t.signMessage(r, this.config)];

              case 2:
                return o = s.sent(), i = o.error, a = o.result, n(i, a), [2];
            }
          });
        });
      },
      signTypedMessageV3: function (e, n) {
        return Dn(t, void 0, void 0, function () {
          var t, r, o, i, a;
          return On(this, function (s) {
            switch (s.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return t = s.sent().communication, r = Object.assign({}, e, {
                  messageStandard: "signTypedMessageV3"
                }), [4, t.signMessage(r, this.config)];

              case 2:
                return o = s.sent(), i = o.error, a = o.result, n(i, a), [2];
            }
          });
        });
      },
      estimateGas: function (e, n) {
        return Dn(t, void 0, void 0, function () {
          var t;
          return On(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, Pt(r, e)];

              case 1:
                return t = o.sent(), n(null, t), [2];
            }
          });
        });
      },
      getGasPrice: function (e) {
        return Dn(t, void 0, void 0, function () {
          return On(this, function (t) {
            return e(null, ""), [2];
          });
        });
      }
    })), e.pocketDevId) {
      var o = new In.Pocket({
        devID: e.pocketDevId,
        networkName: "ETH",
        netIDs: [this.config.network.chainId]
      });
      n.addProvider({
        setEngine: function (e) {
          return e;
        },
        handleRequest: function (e, r, i) {
          return Dn(t, void 0, void 0, function () {
            var t, r, a;
            return On(this, function (s) {
              switch (s.label) {
                case 0:
                  return [4, o.sendRelay(new In.Relay("ETH", this.config.network.chainId, JSON.stringify(e), o.configuration))];

                case 1:
                  if ((t = s.sent()) instanceof Error || !t) a = t || new Error("Unknown error"), r = null;else try {
                    r = JSON.parse(t).result, a = null;
                  } catch (e) {
                    r = null, a = e;
                  }
                  return "net_version" === e.method && (this._network = r, n.networkVersion = this._network), i(a, r), [2];
              }
            });
          });
        }
      });
    } else n.addProvider({
      setEngine: function (e) {
        return e;
      },
      handleRequest: function (e, r, o) {
        return Dn(t, void 0, void 0, function () {
          var t, r, i;
          return On(this, function (a) {
            switch (a.label) {
              case 0:
                return [4, this.widget];

              case 1:
                return [4, a.sent().communication.relay(e, this.config)];

              case 2:
                return t = a.sent(), r = t.error, i = t.result, "net_version" === e.method && (this._network = i, n.networkVersion = this._network), o(r, i), [2];
            }
          });
        });
      }
    });

    return n.enable = function () {
      return new Promise(function (e, t) {
        n.sendAsync({
          method: "eth_accounts"
        }, function (n, r) {
          n ? t(n) : e(r.result);
        });
      });
    }, n.isConnected = function () {
      return !0;
    }, n.isPortis = !0, n.on("error", function (e) {
      e && e.message && e.message.includes("PollingBlockTracker") ? console.warn("If you see this warning constantly, there might be an error with your RPC node.") : console.error(e);
    }), n.start(), n;
  }, e.prototype._setHeight = function (e) {
    return Dn(this, void 0, void 0, function () {
      return On(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, this.widget];

          case 1:
            return t.sent().widgetFrame.style.height = e + "px", [2];
        }
      });
    });
  }, e.prototype._getWindowSize = function () {
    var e = document.getElementsByTagName("body")[0];
    return {
      width: window.innerWidth || document.documentElement.clientWidth || e.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || e.clientHeight
    };
  }, e.prototype._onLogin = function (e, t, n) {
    this._onLoginCallback && this._onLoginCallback(e, t, n);
  }, e.prototype._onLogout = function () {
    this._selectedAddress = "", this._onLogoutCallback && this._onLogoutCallback();
  }, e.prototype._onActiveWalletChanged = function (e) {
    this._onActiveWalletChangedCallback && this._onActiveWalletChangedCallback(e);
  }, e.prototype._onError = function (e) {
    this._onErrorCallback && this._onErrorCallback(e);
  }, e.prototype.clearSubprovider = function (e) {
    var t = this.provider._providers.find(function (t) {
      return t instanceof e;
    });

    this.provider.removeProvider(t), this.provider.addProvider(new e());
  }, e;
}();

var _default = Gn;
exports.default = _default;
},{"./index-d3bd4678.js":"../node_modules/use-wallet/dist/index-d3bd4678.js","react":"../node_modules/react/index.js","@aragon/provided-connector":"../node_modules/@aragon/provided-connector/dist/provided-connector.esm.js","events":"../node_modules/events/events.js","buffer":"../node_modules/node-libs-browser/node_modules/buffer/index.js","./_crypto_commonjs-external-1a228943.js":"../node_modules/use-wallet/dist/_crypto_commonjs-external-1a228943.js","./subscriptionManager-0493518a.js":"../node_modules/use-wallet/dist/subscriptionManager-0493518a.js","stream":"../node_modules/stream-browserify/index.js","string_decoder":"../node_modules/node-libs-browser/node_modules/string_decoder/lib/string_decoder.js","./_util_commonjs-external-6c254708.js":"../node_modules/use-wallet/dist/_util_commonjs-external-6c254708.js","crypto":"../node_modules/crypto-browserify/index.js","assert":"../node_modules/assert/assert.js","util":"../node_modules/util/util.js","./index-77f376c4.js":"../node_modules/use-wallet/dist/index-77f376c4.js","ethereumjs-util":"../node_modules/ethereumjs-util/dist/index.js","process":"../node_modules/process/browser.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
//# sourceMappingURL=/index-b6b58529.93759c6e.js.map