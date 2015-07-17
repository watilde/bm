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
