"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _this2 = void 0;

var _default = {
  init: function init() {
    if (!this.Vue.frisbee) {
      return 'firsbee.js : Vue.frisbee must be set.';
    }
  },
  interceptor: function interceptor(req, res) {
    var _this = this;

    this.Vue.frisbee.interceptors.register({
      request: function request(path, options) {
        req.call(_this, options);
        return [path, options];
      },
      requestError: function requestError(err) {
        req.call(_this, error.request);
        return Promise.reject(err);
      },
      response: function response(_response) {
        res.call(_this, _response);
        return _response;
      },
      responseError: function responseError(err) {
        res.call(_this, error.response);
        return Promise.reject(err);
      }
    });
  },
  invalidToken: function invalidToken(res) {
    if (res.status === 401) {
      return true;
    }
  },
  httpData: function httpData(res) {
    return res.body || {};
  },
  http: function http(data) {
    var http = _this2.Vue.frisbee(data);

    http.then(data.success, data.error);
    return http;
  },
  getHeaders: function getHeaders(res) {
    return res.headers;
  },
  setHeaders: function setHeaders(req, headers) {
    req.headers = Object.assign({}, req.headers, headers);
  }
};
exports["default"] = _default;