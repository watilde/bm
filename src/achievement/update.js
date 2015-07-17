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
