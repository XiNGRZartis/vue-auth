"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  request: function request(req, token) {
    this.http.setHeaders.call(this, req, {
      Authorization: 'Bearer ' + token
    });
  },
  response: function response(res) {
    var headers = this.http.getHeaders.call(this, res),
        token = headers.Authorization || headers.authorization;

    if (token) {
      token = token.split(/Bearer:?\s?/i);
      return token[token.length > 1 ? 1 : 0].trim();
    }
  }
};
exports["default"] = _default;