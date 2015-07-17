(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
}

},{"../lib/config":5,"../lib/get":6,"../lib/isFunction":7,"../lib/isNumber":8}],2:[function(require,module,exports){
module.exports.get = require("./get");
module.exports.update = require("./update");

},{"./get":1,"./update":3}],3:[function(require,module,exports){
var post = require("../lib/post");
var config = require("../lib/config");
var url = config.url;
var isNumber = require("../lib/isNumber");
var isFunction = require("../lib/isFunction");
var api = config.endpoint.updateAchievement;

/**
 * Updates user’s achievement progress with the given s​tepsComplete,
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
/*
module.exports = {
  url: "http://example.com",
  envs: ["dev", "stage", "production"],
  endpoint: {
    "postScore": "/api/v1/postScore",
    "getScore": "/api/v1/getScore",
    "updateAchievement": "/api/v1/updateAchievement",
    "getAchievement": "/api/v1/getAchievement"
  }
};
*/
module.exports = {
  url: "http://localhost:8000/test",
  envs: ["dev", "stage", "production"],
  endpoint: {
    "postScore": "/fixture/postScore.json",
    "getScore": "/fixture/getScore.json",
    "updateAchievement": "/fixture/updateAchievement.json",
    "getAchievement": "/fixture/getAchievement.json"
  }
};

},{}],6:[function(require,module,exports){
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

function buildUrl(url, params) {
  if (params.length === 0) return url;
  url += "?";
  Object.keys(params).forEach(function (key) {
    var val = params[key];
    url += key + "=" + val;
    url += "&";
  });
  url = url.slice(0, -1);

  return url;
}

},{}],7:[function(require,module,exports){
module.exports = function (func) {
  return typeof func === "function";
}

},{}],8:[function(require,module,exports){
module.exports = function (val) {
  return typeof val === "number";
};

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
/**
 * Output debug information to use console.log only when env is dev
 * @param {String} message
 */
module.exports = function (message) {
  if (this.env !== "dev") return;
  console.log(message);
};

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWNoaWV2ZW1lbnQvZ2V0LmpzIiwic3JjL2FjaGlldmVtZW50L2luZGV4LmpzIiwic3JjL2FjaGlldmVtZW50L3VwZGF0ZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9saWIvY29uZmlnLmpzIiwic3JjL2xpYi9nZXQuanMiLCJzcmMvbGliL2lzRnVuY3Rpb24uanMiLCJzcmMvbGliL2lzTnVtYmVyLmpzIiwic3JjL2xpYi9wb3N0LmpzIiwic3JjL3Njb3JlL2dldC5qcyIsInNyYy9zY29yZS9pbmRleC5qcyIsInNyYy9zY29yZS9wb3N0LmpzIiwic3JjL3V0aWwvaW5kZXguanMiLCJzcmMvdXRpbC9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZ2V0ID0gcmVxdWlyZShcIi4uL2xpYi9nZXRcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2xpYi9jb25maWdcIik7XG52YXIgdXJsID0gY29uZmlnLnVybDtcbnZhciBpc051bWJlciA9IHJlcXVpcmUoXCIuLi9saWIvaXNOdW1iZXJcIik7XG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCIuLi9saWIvaXNGdW5jdGlvblwiKTtcbnZhciBhcGkgPSBjb25maWcuZW5kcG9pbnQuZ2V0QWNoaWV2ZW1lbnQ7XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGFjaGlldmVtZW50SWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uc3VjY2Vzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25lcnJvclxuICogQHJldHVybiB7e3N0ZXBzQ29tcGxldGU6IE51bWJlciwgc3RlcHNUb3RhbDogTnVtYmVyfX1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWNoaWV2ZW1lbnRJZCwgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gIGlmICghaXNOdW1iZXIoYWNoaWV2ZW1lbnRJZCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIGFjaGlldmVtZW50SWQgaGF2ZSB0byBiZSBudW1iZXJcIik7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG9uc3VjY2VzcykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIG9uc3VjY2VzcyBoYXZlIHRvIGJlIGZ1bmN0aW9uXCIpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihvbmVycm9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2Ygb25lcnJvciBoYXZlIHRvIGJlIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgdmFyIHBhcmFtcyA9IHt1c2VySWQ6IHRoaXMudXNlcklkLCBhY2hpZXZlbWVudElkOiBhY2hpZXZlbWVudElkfTtcbiAgZ2V0KHVybCArIGFwaSwgcGFyYW1zLCBvbnN1Y2Nlc3MsIG9uZXJyb3IpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMuZ2V0ID0gcmVxdWlyZShcIi4vZ2V0XCIpO1xubW9kdWxlLmV4cG9ydHMudXBkYXRlID0gcmVxdWlyZShcIi4vdXBkYXRlXCIpO1xuIiwidmFyIHBvc3QgPSByZXF1aXJlKFwiLi4vbGliL3Bvc3RcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2xpYi9jb25maWdcIik7XG52YXIgdXJsID0gY29uZmlnLnVybDtcbnZhciBpc051bWJlciA9IHJlcXVpcmUoXCIuLi9saWIvaXNOdW1iZXJcIik7XG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCIuLi9saWIvaXNGdW5jdGlvblwiKTtcbnZhciBhcGkgPSBjb25maWcuZW5kcG9pbnQudXBkYXRlQWNoaWV2ZW1lbnQ7XG5cbi8qKlxuICogVXBkYXRlcyB1c2Vy4oCZcyBhY2hpZXZlbWVudCBwcm9ncmVzcyB3aXRoIHRoZSBnaXZlbiBz4oCLdGVwc0NvbXBsZXRlLFxuICogb3ZlcndyaXRpbmcgdGhlIGN1cnJlbnQgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gYWNoaWV2ZW1lbnRJZFxuICogQHBhcmFtIHtOdW1iZX0gc3RlcHNDb21wbGV0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25zdWNjZXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmVycm9yXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjaGlldmVtZW50SWQsIHN0ZXBzQ29tcGxldGUsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICBpZiAoIWlzTnVtYmVyKGFjaGlldmVtZW50SWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH1cbiAgaWYgKCFpc051bWJlcihzdGVwc0NvbXBsZXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihvbnN1Y2Nlc3MpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBvbnN1Y2Nlc3MgaGF2ZSB0byBiZSBmdW5jdGlvblwiKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24ob25lcnJvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIG9uZXJyb3IgaGF2ZSB0byBiZSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHZhciBwYXJhbXMgPSB7XG4gICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICBhY2hpZXZlbWVudElkOiBhY2hpZXZlbWVudElkLFxuICAgIHN0ZXBzQ29tcGxldGU6IHN0ZXBzQ29tcGxldGVcbiAgfTtcbiAgcG9zdCh1cmwgKyBhcGksIHBhcmFtcywgb25zdWNjZXNzLCBvbmVycm9yKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTnVtYmVyID0gcmVxdWlyZShcIi4vbGliL2lzTnVtYmVyXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuL2xpYi9jb25maWdcIik7XG52YXIgZW52cyA9IGNvbmZpZy5lbnZzO1xuXG4vKipcbiAqIENyZWF0ZSBuZXcgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge051bWJlcn0gdXNlcklkXG4gKiBAcGFyYW0ge1N0cmluZ30gZW52XG4gKi9cbmZ1bmN0aW9uIGJtKHVzZXJJZCwgZW52KSB7XG4gIGlmICghaXNOdW1iZXIodXNlcklkKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2YgVXNlciBJRCBoYXZlIHRvIGJlIG51bWJlclwiKTtcbiAgfVxuICBpZiAoZW52cy5pbmRleE9mKGVudikgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZW52IGhhdmUgdG8gZGV2L3N0YWdlL3Byb2R1Y3Rpb25cIik7XG4gIH1cbiAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gIHRoaXMuZW52ID0gZW52O1xufVxuXG5ibS5wcm90b3R5cGUudXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvXCIpO1xuYm0ucHJvdG90eXBlLnNjb3JlR2V0ID0gcmVxdWlyZShcIi4vc2NvcmUvXCIpLmdldDtcbmJtLnByb3RvdHlwZS5zY29yZVBvc3QgPSByZXF1aXJlKFwiLi9zY29yZS9cIikucG9zdDtcbmJtLnByb3RvdHlwZS5hY2hpZXZlbWVudEdldCA9IHJlcXVpcmUoXCIuL2FjaGlldmVtZW50L1wiKS5nZXQ7XG5ibS5wcm90b3R5cGUuYWNoaWV2ZW1lbnRVcGRhdGUgPSByZXF1aXJlKFwiLi9hY2hpZXZlbWVudC9cIikudXBkYXRlO1xuXG4vLyBJbiBicm93c2VyaWZ5LCBnbG9iYWwgaXMganVzdCBhbiBhbGlhcyBmb3IgdGhlIHdpbmRvdyBvYmplY3QuXG5nbG9iYWwuYm0gPSBibTtcbiIsIi8qXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXJsOiBcImh0dHA6Ly9leGFtcGxlLmNvbVwiLFxuICBlbnZzOiBbXCJkZXZcIiwgXCJzdGFnZVwiLCBcInByb2R1Y3Rpb25cIl0sXG4gIGVuZHBvaW50OiB7XG4gICAgXCJwb3N0U2NvcmVcIjogXCIvYXBpL3YxL3Bvc3RTY29yZVwiLFxuICAgIFwiZ2V0U2NvcmVcIjogXCIvYXBpL3YxL2dldFNjb3JlXCIsXG4gICAgXCJ1cGRhdGVBY2hpZXZlbWVudFwiOiBcIi9hcGkvdjEvdXBkYXRlQWNoaWV2ZW1lbnRcIixcbiAgICBcImdldEFjaGlldmVtZW50XCI6IFwiL2FwaS92MS9nZXRBY2hpZXZlbWVudFwiXG4gIH1cbn07XG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvdGVzdFwiLFxuICBlbnZzOiBbXCJkZXZcIiwgXCJzdGFnZVwiLCBcInByb2R1Y3Rpb25cIl0sXG4gIGVuZHBvaW50OiB7XG4gICAgXCJwb3N0U2NvcmVcIjogXCIvZml4dHVyZS9wb3N0U2NvcmUuanNvblwiLFxuICAgIFwiZ2V0U2NvcmVcIjogXCIvZml4dHVyZS9nZXRTY29yZS5qc29uXCIsXG4gICAgXCJ1cGRhdGVBY2hpZXZlbWVudFwiOiBcIi9maXh0dXJlL3VwZGF0ZUFjaGlldmVtZW50Lmpzb25cIixcbiAgICBcImdldEFjaGlldmVtZW50XCI6IFwiL2ZpeHR1cmUvZ2V0QWNoaWV2ZW1lbnQuanNvblwiXG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcywgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IHZvaWQgMCkge1xuICAgIC8vIFRoaXMgaXNuJ3QgTm9kZS5qcyBhcHAgeWV0XG4gICAgcmV0dXJuO1xuICB9XG4gIHVybCA9IGJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICB4aHIub25lcnJvciA9IG9uZXJyb3I7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBvbmVycm9yKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbnN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XG4gIH07XG4gIHhoci5zZW5kKG51bGwpO1xufTtcblxuZnVuY3Rpb24gYnVpbGRVcmwodXJsLCBwYXJhbXMpIHtcbiAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHJldHVybiB1cmw7XG4gIHVybCArPSBcIj9cIjtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgdmFsID0gcGFyYW1zW2tleV07XG4gICAgdXJsICs9IGtleSArIFwiPVwiICsgdmFsO1xuICAgIHVybCArPSBcIiZcIjtcbiAgfSk7XG4gIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgcmV0dXJuIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCI7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSB2b2lkIDApIHtcbiAgICAvLyBUaGlzIGlzbid0IE5vZGUuanMgYXBwIHlldFxuICAgIHJldHVybjtcbiAgfVxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuICB4aHIub25lcnJvciA9IG9uZXJyb3I7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBvbmVycm9yKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbnN1Y2Nlc3MoeGhyLnJlc3BvbnNlVGV4dCk7XG4gIH07XG4gIHBhcmFtcyA9IGJ1aWxkUGFyYW1zKHBhcmFtcyk7XG4gIHhoci5zZW5kKHBhcmFtcyk7XG59O1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyhwYXJhbXMpIHtcbiAgdmFyIG91dCA9IFwiXCI7XG4gIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHZhbCA9IHBhcmFtc1trZXldO1xuICAgIG91dCArPSBrZXkgKyBcIj1cIiArIHZhbDtcbiAgICBvdXQgKz0gXCImXCI7XG4gIH0pO1xuICBvdXQgPSBvdXQuc2xpY2UoMCwgLTEpO1xuXG4gIHJldHVybiBvdXQ7XG59XG4iLCJ2YXIgZ2V0ID0gcmVxdWlyZShcIi4uL2xpYi9nZXRcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2xpYi9jb25maWdcIik7XG52YXIgdXJsID0gY29uZmlnLnVybDtcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcIi4uL2xpYi9pc0Z1bmN0aW9uXCIpO1xudmFyIGFwaSA9IGNvbmZpZy5lbmRwb2ludC5nZXRTY29yZTtcblxuLyoqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbnN1Y2Nlc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uZXJyb3JcbiAqL1xuIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9uc3VjY2Vzcywgb25lcnJvcikge1xuICAgaWYgKCFpc0Z1bmN0aW9uKG9uc3VjY2VzcykpIHtcbiAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInR5cGVvZiBvbnN1Y2Nlc3MgaGF2ZSB0byBiZSBmdW5jdGlvblwiKTtcbiAgIH1cbiAgIGlmICghaXNGdW5jdGlvbihvbmVycm9yKSkge1xuICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIG9uZXJyb3IgaGF2ZSB0byBiZSBmdW5jdGlvblwiKTtcbiAgIH1cbiAgIGdldCh1cmwgKyBhcGksIHt1c2VySWQ6IHRoaXMudXNlcklkfSwgb25zdWNjZXNzLCBvbmVycm9yKTtcbiB9O1xuIiwibW9kdWxlLmV4cG9ydHMuZ2V0ID0gcmVxdWlyZShcIi4vZ2V0XCIpO1xubW9kdWxlLmV4cG9ydHMucG9zdCA9IHJlcXVpcmUoXCIuL3Bvc3RcIik7XG4iLCJ2YXIgcG9zdCA9IHJlcXVpcmUoXCIuLi9saWIvcG9zdFwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vbGliL2NvbmZpZ1wiKTtcbnZhciB1cmwgPSBjb25maWcudXJsO1xudmFyIGlzTnVtYmVyID0gcmVxdWlyZShcIi4uL2xpYi9pc051bWJlclwiKTtcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcIi4uL2xpYi9pc0Z1bmN0aW9uXCIpO1xudmFyIGFwaSA9IGNvbmZpZy5lbmRwb2ludC5wb3N0U2NvcmU7XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbnN1Y2Nlc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uZXJyb3JcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2NvcmUsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICBpZiAoIWlzTnVtYmVyKHNjb3JlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2Ygc2NvcmUgaGF2ZSB0byBiZSBudW1iZXJcIik7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG9uc3VjY2VzcykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidHlwZW9mIG9uc3VjY2VzcyBoYXZlIHRvIGJlIGZ1bmN0aW9uXCIpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihvbmVycm9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0eXBlb2Ygb25lcnJvciBoYXZlIHRvIGJlIGZ1bmN0aW9uXCIpO1xuICB9XG4gIHBvc3QodXJsICsgYXBpLCB7dXNlcklkOiB0aGlzLnVzZXJJZCwgc2NvcmU6IHNjb3JlfSwgb25zdWNjZXNzLCBvbmVycm9yKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cy5sb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG4iLCIvKipcbiAqIE91dHB1dCBkZWJ1ZyBpbmZvcm1hdGlvbiB0byB1c2UgY29uc29sZS5sb2cgb25seSB3aGVuIGVudiBpcyBkZXZcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgaWYgKHRoaXMuZW52ICE9PSBcImRldlwiKSByZXR1cm47XG4gIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xufTtcbiJdfQ==
