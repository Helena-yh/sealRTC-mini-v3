const JoinMode = {
  '2': 0,
  '0': 1,
  '-1': 2
};

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isEqual = (target, source) => {
  return target == source;
};

const isEmpty = (str) => {
  return isEqual(str.length, 0)
};

const isMPStrict = (value) => {
  return /^1[3456789]\d{9}$/.test(value)
};

const timer = (content) => {
  let promise = new Promise((resolve, reject) => {
    let setTimer = setInterval(() => {
        let second = content.data.second - 1;
        content.setData({
          second: second,
          smsCodeBtn: second + ' ' + wx.locales.second,
          btnDisabled: true
        })
        if (content.data.second <= 0) {
          content.setData({
            second: 60,
            smsCodeBtn: wx.locales.smsCodeBtn,
            btnDisabled: false
          })
          resolve(setTimer)
        }
      }, 1000)
  })
  promise.then((setTimer) => {
    clearInterval(setTimer)
  })
}

const createUid = (value) => {
  return value + '_mini'
}
function ObserverList () {
  var checkIndexOutBound = function (index, bound) {
    return index > -1 && index < bound;
  };

  this.observerList = [];

  this.add = function (observer, force) {
    if (force) {
      this.observerList.length = 0;
    }
    this.observerList.push(observer);
  };

  this.get = function (index) {
    if (checkIndexOutBound(index, this.observerList.length)) {
      return this.observerList[index];
    }
  };

  this.count = function () {
    return this.observerList.length;
  };

  this.removeAt = function (index) {
    checkIndexOutBound(index, this.observerList.length) && this.observerList.splice(index, 1);
  };

  this.remove = function (observer) {
    if (!observer) {
      this.observerList.length = 0;
      return;
    }
    var observerList = Object.prototype.toString.call(observer) === '[object Function]' ? [observer] : observer;
    for (var i = 0, len = this.observerList.length; i < len; i++) {
      for (var j = 0; j < observerList.length; j++) {
        if (this.observerList[i] === observerList[j]) {
          this.removeAt(i);
          break;
        }
      }
    }
  };

  this.notify = function (val) {
    for (var i = 0, len = this.observerList.length; i < len; i++) {
      this.observerList[i](val);
    }
  };

  this.indexOf = function (observer, startIndex) {
    var i = startIndex || 0,
      len = this.observerList.length;
    while (i < len) {
      if (this.observerList[i] === observer) {
        return i;
      }
      i++;
    }
    return -1;
  };
}

module.exports = {
  formatTime,
  isEqual,
  isEmpty,
  isMPStrict,
  timer,
  createUid,
  ObserverList,
  JoinMode
}