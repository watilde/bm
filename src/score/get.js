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
