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
