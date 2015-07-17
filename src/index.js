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
