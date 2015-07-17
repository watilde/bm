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
