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
