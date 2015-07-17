(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var get = require("../lib/get");
var config = require("../lib/config");
var url = config.url;
var isNumber = require("../lib/isNumber");
var isFunction = require("../lib/isFunction");
var api = config.endpoint.getAchievement;

/**
 * @param {Number} achievementId
 * @param {Function} onsuccess
 * @param {Function} onerror
 * @return {{stepsComplete: Number, stepsTotal: Number}}
 */
module.exports = function (achievementId, onsuccess, onerror) {
  if (!isNumber(achievementId)) {
    throw new TypeError("typeof achievementId have to be number");
  }
  if (!isFunction(onsuccess)) {
    throw new TypeError("typeof onsuccess have to be function");
  }
  if (!isFunction(onerror)) {
    throw new TypeError("typeof onerror have to be function");
  }

  var params = {userId: this.userId, achievementId: achievementId};
  get(url + api, params, onsuccess, onerror);
};

},{"../lib/config":5,"../lib/get":6,"../lib/isFunction":7,"../lib/isNumber":8}],2:[function(require,module,exports){
module.exports.get = require("./get");
module.exports.update = require("./update");

},{"./get":1,"./update":3}],3:[function(require,module,exports){
"use strict";
var post = require("../lib/post");
var config = require("../lib/config");
var url = config.url;
var isNumber = require("../lib/isNumber");
var isFunction = require("../lib/isFunction");
var api = config.endpoint.updateAchievement;

/**
 * Updates user’s achievement progress with the given stepsCompete,
 * overwriting the current value
 *
 * @param {Number} achievementId
 * @param {Numbe} stepsComplete
 * @param {Function} onsuccess
 * @param {Function} onerror
 */
module.exports = function (achievementId, stepsComplete, onsuccess, onerror) {
  if (!isNumber(achievementId)) {
    throw new Error();
  }
  if (!isNumber(stepsComplete)) {
    throw new Error();
  }
  if (!isFunction(onsuccess)) {
    throw new TypeError("typeof onsuccess have to be function");
  }
  if (!isFunction(onerror)) {
    throw new TypeError("typeof onerror have to be function");
  }

  var params = {
    userId: this.userId,
    achievementId: achievementId,
    stepsComplete: stepsComplete
  };
  post(url + api, params, onsuccess, onerror);
};

},{"../lib/config":5,"../lib/isFunction":7,"../lib/isNumber":8,"../lib/post":9}],4:[function(require,module,exports){
(function (global){
"use strict";

var isNumber = require("./lib/isNumber");
var config = require("./lib/config");
var envs = config.envs;

/**
 * Create new instance.
 * @param {Number} userId
 * @param {String} env
 */
function bm(userId, env) {
  if (!isNumber(userId)) {
    throw new TypeError("typeof User ID have to be number");
  }
  if (envs.indexOf(env) === -1) {
    throw new Error("env have to dev/stage/production");
  }
  this.userId = userId;
  this.env = env;
}

bm.prototype.util = require("./util/");
bm.prototype.scoreGet = require("./score/").get;
bm.prototype.scorePost = require("./score/").post;
bm.prototype.achievementGet = require("./achievement/").get;
bm.prototype.achievementUpdate = require("./achievement/").update;

// In browserify, global is just an alias for the window object.
global.bm = bm;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./achievement/":2,"./lib/config":5,"./lib/isNumber":8,"./score/":11,"./util/":13}],5:[function(require,module,exports){
module.exports = {
  url: "http://example.com",
  // url: "",
  envs: ["dev", "stage", "production"],
  endpoint: {
    "postScore": "/api/v1/postScore",
    "getScore": "/api/v1/getScore",
    "updateAchievement": "/api/v1/updateAchievement",
    "getAchievement": "/api/v1/getAchievement"
  }
};

},{}],6:[function(require,module,exports){
"use strict";

function buildUrl(url, params) {
  if (params.length === 0) { return url; }
  url += "?";
  Object.keys(params).forEach(function (key) {
    var val = params[key];
    url += key + "=" + val;
    url += "&";
  });
  url = url.slice(0, -1);

  return url;
}

module.exports = function (url, params, onsuccess, onerror) {
  if (typeof XMLHttpRequest === void 0) {
    // This isn't Node.js app yet
    return;
  }
  url = buildUrl(url, params);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onerror = onerror;
  xhr.onload = function (e) {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      onerror(e);
      return;
    }
    onsuccess(xhr.responseText);
  };
  xhr.send(null);
};

},{}],7:[function(require,module,exports){
"use strict";
module.exports = function (func) {
  return typeof func === "function";
};

},{}],8:[function(require,module,exports){
"use strict";
module.exports = function (val) {
  return typeof val === "number";
};

},{}],9:[function(require,module,exports){
"use strict";

function buildParams(params) {
  var out = "";
  Object.keys(params).forEach(function (key) {
    var val = params[key];
    out += key + "=" + val;
    out += "&";
  });
  out = out.slice(0, -1);

  return out;
}

module.exports = function (url, params, onsuccess, onerror) {
  if (typeof XMLHttpRequest === void 0) {
    // This isn't Node.js app yet
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onerror = onerror;
  xhr.onload = function (e) {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      onerror(e);
      return;
    }
    onsuccess(xhr.responseText);
  };
  params = buildParams(params);
  xhr.send(params);
};

},{}],10:[function(require,module,exports){
"use strict";
var get = require("../lib/get");
var config = require("../lib/config");
var url = config.url;
var isFunction = require("../lib/isFunction");
var api = config.endpoint.getScore;

/**
 * @param {Function} onsuccess
 * @param {Function} onerror
 */
 module.exports = function (onsuccess, onerror) {
   if (!isFunction(onsuccess)) {
     throw new TypeError("typeof onsuccess have to be function");
   }
   if (!isFunction(onerror)) {
     throw new TypeError("typeof onerror have to be function");
   }
   get(url + api, {userId: this.userId}, onsuccess, onerror);
 };

},{"../lib/config":5,"../lib/get":6,"../lib/isFunction":7}],11:[function(require,module,exports){
module.exports.get = require("./get");
module.exports.post = require("./post");

},{"./get":10,"./post":12}],12:[function(require,module,exports){
"use strict";
var post = require("../lib/post");
var config = require("../lib/config");
var url = config.url;
var isNumber = require("../lib/isNumber");
var isFunction = require("../lib/isFunction");
var api = config.endpoint.postScore;

/**
 * @param {Number} score
 * @param {Function} onsuccess
 * @param {Function} onerror
 */
module.exports = function (score, onsuccess, onerror) {
  if (!isNumber(score)) {
    throw new TypeError("typeof score have to be number");
  }
  if (!isFunction(onsuccess)) {
    throw new TypeError("typeof onsuccess have to be function");
  }
  if (!isFunction(onerror)) {
    throw new TypeError("typeof onerror have to be function");
  }
  post(url + api, {userId: this.userId, score: score}, onsuccess, onerror);
};

},{"../lib/config":5,"../lib/isFunction":7,"../lib/isNumber":8,"../lib/post":9}],13:[function(require,module,exports){
module.exports.log = require("./log");

},{"./log":14}],14:[function(require,module,exports){
"use strict";
/**
 * Output debug information to use console.log only when env is dev
 * @param {String} message
 */
module.exports = function (message) {
  if (this.env !== "dev") {
    return;
  }
  console.log(message);
};

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWNoaWV2ZW1lbnQvZ2V0LmpzIiwic3JjL2FjaGlldmVtZW50L2luZGV4LmpzIiwic3JjL2FjaGlldmVtZW50L3VwZGF0ZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9saWIvY29uZmlnLmpzIiwic3JjL2xpYi9nZXQuanMiLCJzcmMvbGliL2lzRnVuY3Rpb24uanMiLCJzcmMvbGliL2lzTnVtYmVyLmpzIiwic3JjL2xpYi9wb3N0LmpzIiwic3JjL3Njb3JlL2dldC5qcyIsInNyYy9zY29yZS9pbmRleC5qcyIsInNyYy9zY29yZS9wb3N0LmpzIiwic3JjL3V0aWwvaW5kZXguanMiLCJzcmMvdXRpbC9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBnZXQgPSByZXF1aXJlKFwiLi4vbGliL2dldFwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vbGliL2NvbmZpZ1wiKTtcbnZhciB1cmwgPSBjb25maWcudXJsO1xudmFyIGlzTnVtYmVyID0gcmVxdWlyZShcIi4uL2xpYi9pc051bWJlclwiKTtcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcIi4uL2xpYi9pc0Z1bmN0aW9uXCIpO1xudmFyIGFwaSA9IGNvbmZpZy5lbmRwb2ludC5nZXRBY2hpZXZlbWVudDtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gYWNoaWV2ZW1lbnRJZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25zdWNjZXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmVycm9yXG4gKiBAcmV0dXJuIHt7c3RlcHNDb21wbGV0ZTogTnVtYmVyLCBzdGVwc1RvdGFsOiBOdW1iZXJ9fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY2hpZXZlbWVudElkLCBvbnN1Y2Nlc3MsIG9uZXJyb3IpIHtcbiAgaWYgKCFpc051bWJlcihhY2hpZXZlbWVudElkKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2YgYWNoaWV2ZW1lbnRJZCBoYXZlIHRvIGJlIG51bWJlclwiKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24ob25zdWNjZXNzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2Ygb25zdWNjZXNzIGhhdmUgdG8gYmUgZnVuY3Rpb25cIik7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG9uZXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBvbmVycm9yIGhhdmUgdG8gYmUgZnVuY3Rpb25cIik7XG4gIH1cblxuICB2YXIgcGFyYW1zID0ge3VzZXJJZDogdGhpcy51c2VySWQsIGFjaGlldmVtZW50SWQ6IGFjaGlldmVtZW50SWR9O1xuICBnZXQodXJsICsgYXBpLCBwYXJhbXMsIG9uc3VjY2Vzcywgb25lcnJvcik7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMuZ2V0ID0gcmVxdWlyZShcIi4vZ2V0XCIpO1xubW9kdWxlLmV4cG9ydHMudXBkYXRlID0gcmVxdWlyZShcIi4vdXBkYXRlXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcG9zdCA9IHJlcXVpcmUoXCIuLi9saWIvcG9zdFwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vbGliL2NvbmZpZ1wiKTtcbnZhciB1cmwgPSBjb25maWcudXJsO1xudmFyIGlzTnVtYmVyID0gcmVxdWlyZShcIi4uL2xpYi9pc051bWJlclwiKTtcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcIi4uL2xpYi9pc0Z1bmN0aW9uXCIpO1xudmFyIGFwaSA9IGNvbmZpZy5lbmRwb2ludC51cGRhdGVBY2hpZXZlbWVudDtcblxuLyoqXG4gKiBVcGRhdGVzIHVzZXLigJlzIGFjaGlldmVtZW50IHByb2dyZXNzIHdpdGggdGhlIGdpdmVuIHN0ZXBzQ29tcGV0ZSxcbiAqIG92ZXJ3cml0aW5nIHRoZSBjdXJyZW50IHZhbHVlXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGFjaGlldmVtZW50SWRcbiAqIEBwYXJhbSB7TnVtYmV9IHN0ZXBzQ29tcGxldGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uc3VjY2Vzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25lcnJvclxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY2hpZXZlbWVudElkLCBzdGVwc0NvbXBsZXRlLCBvbnN1Y2Nlc3MsIG9uZXJyb3IpIHtcbiAgaWYgKCFpc051bWJlcihhY2hpZXZlbWVudElkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9XG4gIGlmICghaXNOdW1iZXIoc3RlcHNDb21wbGV0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24ob25zdWNjZXNzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2Ygb25zdWNjZXNzIGhhdmUgdG8gYmUgZnVuY3Rpb25cIik7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG9uZXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBvbmVycm9yIGhhdmUgdG8gYmUgZnVuY3Rpb25cIik7XG4gIH1cblxuICB2YXIgcGFyYW1zID0ge1xuICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgYWNoaWV2ZW1lbnRJZDogYWNoaWV2ZW1lbnRJZCxcbiAgICBzdGVwc0NvbXBsZXRlOiBzdGVwc0NvbXBsZXRlXG4gIH07XG4gIHBvc3QodXJsICsgYXBpLCBwYXJhbXMsIG9uc3VjY2Vzcywgb25lcnJvcik7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoXCIuL2xpYi9pc051bWJlclwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi9saWIvY29uZmlnXCIpO1xudmFyIGVudnMgPSBjb25maWcuZW52cztcblxuLyoqXG4gKiBDcmVhdGUgbmV3IGluc3RhbmNlLlxuICogQHBhcmFtIHtOdW1iZXJ9IHVzZXJJZFxuICogQHBhcmFtIHtTdHJpbmd9IGVudlxuICovXG5mdW5jdGlvbiBibSh1c2VySWQsIGVudikge1xuICBpZiAoIWlzTnVtYmVyKHVzZXJJZCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIFVzZXIgSUQgaGF2ZSB0byBiZSBudW1iZXJcIik7XG4gIH1cbiAgaWYgKGVudnMuaW5kZXhPZihlbnYpID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImVudiBoYXZlIHRvIGRldi9zdGFnZS9wcm9kdWN0aW9uXCIpO1xuICB9XG4gIHRoaXMudXNlcklkID0gdXNlcklkO1xuICB0aGlzLmVudiA9IGVudjtcbn1cblxuYm0ucHJvdG90eXBlLnV0aWwgPSByZXF1aXJlKFwiLi91dGlsL1wiKTtcbmJtLnByb3RvdHlwZS5zY29yZUdldCA9IHJlcXVpcmUoXCIuL3Njb3JlL1wiKS5nZXQ7XG5ibS5wcm90b3R5cGUuc2NvcmVQb3N0ID0gcmVxdWlyZShcIi4vc2NvcmUvXCIpLnBvc3Q7XG5ibS5wcm90b3R5cGUuYWNoaWV2ZW1lbnRHZXQgPSByZXF1aXJlKFwiLi9hY2hpZXZlbWVudC9cIikuZ2V0O1xuYm0ucHJvdG90eXBlLmFjaGlldmVtZW50VXBkYXRlID0gcmVxdWlyZShcIi4vYWNoaWV2ZW1lbnQvXCIpLnVwZGF0ZTtcblxuLy8gSW4gYnJvd3NlcmlmeSwgZ2xvYmFsIGlzIGp1c3QgYW4gYWxpYXMgZm9yIHRoZSB3aW5kb3cgb2JqZWN0LlxuZ2xvYmFsLmJtID0gYm07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXJsOiBcImh0dHA6Ly9leGFtcGxlLmNvbVwiLFxuICAvLyB1cmw6IFwiXCIsXG4gIGVudnM6IFtcImRldlwiLCBcInN0YWdlXCIsIFwicHJvZHVjdGlvblwiXSxcbiAgZW5kcG9pbnQ6IHtcbiAgICBcInBvc3RTY29yZVwiOiBcIi9hcGkvdjEvcG9zdFNjb3JlXCIsXG4gICAgXCJnZXRTY29yZVwiOiBcIi9hcGkvdjEvZ2V0U2NvcmVcIixcbiAgICBcInVwZGF0ZUFjaGlldmVtZW50XCI6IFwiL2FwaS92MS91cGRhdGVBY2hpZXZlbWVudFwiLFxuICAgIFwiZ2V0QWNoaWV2ZW1lbnRcIjogXCIvYXBpL3YxL2dldEFjaGlldmVtZW50XCJcbiAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBidWlsZFVybCh1cmwsIHBhcmFtcykge1xuICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdXJsOyB9XG4gIHVybCArPSBcIj9cIjtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgdmFsID0gcGFyYW1zW2tleV07XG4gICAgdXJsICs9IGtleSArIFwiPVwiICsgdmFsO1xuICAgIHVybCArPSBcIiZcIjtcbiAgfSk7XG4gIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSB2b2lkIDApIHtcbiAgICAvLyBUaGlzIGlzbid0IE5vZGUuanMgYXBwIHlldFxuICAgIHJldHVybjtcbiAgfVxuICB1cmwgPSBidWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgeGhyLm9uZXJyb3IgPSBvbmVycm9yO1xuICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgb25lcnJvcihlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25zdWNjZXNzKHhoci5yZXNwb25zZVRleHQpO1xuICB9O1xuICB4aHIuc2VuZChudWxsKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgcmV0dXJuIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFyYW1zKHBhcmFtcykge1xuICB2YXIgb3V0ID0gXCJcIjtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgdmFsID0gcGFyYW1zW2tleV07XG4gICAgb3V0ICs9IGtleSArIFwiPVwiICsgdmFsO1xuICAgIG91dCArPSBcIiZcIjtcbiAgfSk7XG4gIG91dCA9IG91dC5zbGljZSgwLCAtMSk7XG5cbiAgcmV0dXJuIG91dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSB2b2lkIDApIHtcbiAgICAvLyBUaGlzIGlzbid0IE5vZGUuanMgYXBwIHlldFxuICAgIHJldHVybjtcbiAgfVxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuICB4aHIub25lcnJvciA9IG9uZXJyb3I7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBvbmVycm9yKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbnN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XG4gIH07XG4gIHBhcmFtcyA9IGJ1aWxkUGFyYW1zKHBhcmFtcyk7XG4gIHhoci5zZW5kKHBhcmFtcyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZ2V0ID0gcmVxdWlyZShcIi4uL2xpYi9nZXRcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2xpYi9jb25maWdcIik7XG52YXIgdXJsID0gY29uZmlnLnVybDtcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcIi4uL2xpYi9pc0Z1bmN0aW9uXCIpO1xudmFyIGFwaSA9IGNvbmZpZy5lbmRwb2ludC5nZXRTY29yZTtcblxuLyoqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbnN1Y2Nlc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uZXJyb3JcbiAqL1xuIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9uc3VjY2Vzcywgb25lcnJvcikge1xuICAgaWYgKCFpc0Z1bmN0aW9uKG9uc3VjY2VzcykpIHtcbiAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBvbnN1Y2Nlc3MgaGF2ZSB0byBiZSBmdW5jdGlvblwiKTtcbiAgIH1cbiAgIGlmICghaXNGdW5jdGlvbihvbmVycm9yKSkge1xuICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIG9uZXJyb3IgaGF2ZSB0byBiZSBmdW5jdGlvblwiKTtcbiAgIH1cbiAgIGdldCh1cmwgKyBhcGksIHt1c2VySWQ6IHRoaXMudXNlcklkfSwgb25zdWNjZXNzLCBvbmVycm9yKTtcbiB9O1xuIiwibW9kdWxlLmV4cG9ydHMuZ2V0ID0gcmVxdWlyZShcIi4vZ2V0XCIpO1xubW9kdWxlLmV4cG9ydHMucG9zdCA9IHJlcXVpcmUoXCIuL3Bvc3RcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBwb3N0ID0gcmVxdWlyZShcIi4uL2xpYi9wb3N0XCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9saWIvY29uZmlnXCIpO1xudmFyIHVybCA9IGNvbmZpZy51cmw7XG52YXIgaXNOdW1iZXIgPSByZXF1aXJlKFwiLi4vbGliL2lzTnVtYmVyXCIpO1xudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKFwiLi4vbGliL2lzRnVuY3Rpb25cIik7XG52YXIgYXBpID0gY29uZmlnLmVuZHBvaW50LnBvc3RTY29yZTtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NvcmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uc3VjY2Vzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25lcnJvclxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzY29yZSwgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gIGlmICghaXNOdW1iZXIoc2NvcmUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBzY29yZSBoYXZlIHRvIGJlIG51bWJlclwiKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24ob25zdWNjZXNzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2Ygb25zdWNjZXNzIGhhdmUgdG8gYmUgZnVuY3Rpb25cIik7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG9uZXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBvbmVycm9yIGhhdmUgdG8gYmUgZnVuY3Rpb25cIik7XG4gIH1cbiAgcG9zdCh1cmwgKyBhcGksIHt1c2VySWQ6IHRoaXMudXNlcklkLCBzY29yZTogc2NvcmV9LCBvbnN1Y2Nlc3MsIG9uZXJyb3IpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzLmxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBPdXRwdXQgZGVidWcgaW5mb3JtYXRpb24gdG8gdXNlIGNvbnNvbGUubG9nIG9ubHkgd2hlbiBlbnYgaXMgZGV2XG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIGlmICh0aGlzLmVudiAhPT0gXCJkZXZcIikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbn07XG4iXX0=
