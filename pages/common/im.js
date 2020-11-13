const { ObserverList } = require('../../utils/util');

module.exports = (config) => {
  let { im } = config;
  let watcher = new ObserverList();
  let disconnect = () => {
    return im.disconnect();
  };
  let connect = (user) => {
    im.watch({
      message: function(event){
        var message = event.message;
        console.log('收到新消息:', message);
      },
      status: function(event){
        var status = event.status;
        console.log('连接状态码:', status);
      }
    });
    return im.connect(user)
  };

  let watch = (watch) => {
    var force = true;
    watcher.add(watch, force);
  };

  return {
    disconnect,
    connect,
    watch
  };
};