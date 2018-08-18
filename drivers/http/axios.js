module.exports = {
  _init: function () {
      if ( ! this.options.Vue.axios) {
          return 'axios.js : Vue.axios must be set.'
      }
  },
  
  _interceptor: function (req, res) {
    var _this = this;

    if (req) {
      this.options.Vue.axios.interceptors.request.use((request) => {
        req.call(_this, request);
        return request;
      })
    }

    if (res) {
      this.options.Vue.axios.interceptors.response.use((response) => {
        res.call(_this, response);
        return response;
      })
    }
  },

  _invalidToken: function (res) {
    if (res.status === 401) {
      this.logout();
    }
  },

  _httpData: function (res) {
    return res.data || {};
  },

  _http: function (data) {
    this.options.Vue.axios(data).then(data.success, data.error);
  },

  _getHeaders: function (res) {
    return res.headers;
  },

  _setHeaders: function (req, headers) {
    req.headers.common = Object.assign(req.headers.common, headers);
  }
}
