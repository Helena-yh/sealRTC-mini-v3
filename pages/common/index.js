const RongIMLib = require('../../lib/RongIMLib-3.0.6-dev');
// const RongIMClient = RongIMLib.RongIMClient;

const Connection = require('./im');
const RTC = require('./rtc.js');

module.exports = (config) => {
  // RongIMClient.init(config.APPKEY);
  var config = {
    appkey: config.APPKEY,
  };
  var im = RongIMLib.init(config);
  return {
    Connection: Connection({
      im: im
    }),
    RTC: RTC(config,  RongIMLib)
  };
};