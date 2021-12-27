"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  tokens: ['Token-Type', 'Access-Token', 'Client', 'Uid', 'Expiry', 'token-type', 'access-token', 'client', 'uid', 'expiry'],
  request: function request(req, token) {
    var headers = {},
        tokens = token.split(';');
    var auth = this.deviseAuth || this.auth;
    auth.tokens.forEach(function (tokenName, index) {
      if (tokens[index]) {
        headers[tokenName] = tokens[index];
      }
    });
    this.http.setHeaders.call(this, req, headers);
  },
  response: function response(res) {
    var token = [],
        headers = this.http.getHeaders.call(this, res);

    if (headers['access-token'] || headers['Access-Token']) {
      var auth = this.deviseAuth || this.auth;
      auth.tokens.forEach(function (tokenName) {
        if (headers[tokenName]) {
          token.push(headers[tokenName]);
        }
      }); // Check if access-token more recent than last one

      if (!this.token() || parseInt(token[4], 10) >= parseInt(this.token().split(';')[4], 10)) {
        return token.join(';');
      }
    }
  }
};
exports["default"] = _default;