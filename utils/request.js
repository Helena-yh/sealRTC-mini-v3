const config = require('../config');

const host = config.appServer;

const post = (url, postData) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      data: postData,
      method: 'POST',
      success: (res) => {
        resolve(res.data);
      },
      fail: (e) => {
        reject(e);
      },
    })
  });
}

const get = (url) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      method: 'GET',
      success: function (res) {
        resolve(res.data);
      },
      fail: function () {
        reject(e);
      },
    })
  });
}

module.exports = {
  post,
  get
};