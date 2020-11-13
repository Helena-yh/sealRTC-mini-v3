/**
 * RongRTC-wechat-minip.js v3.2.3
 * Code Version: 0b957bee7f6f1cf9dd94ad77ee9a2b3d71f49eac
 * Copyright (c) 2020 RongCloud, Inc.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RongRTC = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var noop = function noop() {};
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  var isArray = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  var isFunction = function isFunction(arr) {
    return Object.prototype.toString.call(arr) === '[object Function]';
  };
  var isString = function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  };
  var isBoolean = function isBoolean(str) {
    return Object.prototype.toString.call(str) === '[object Boolean]';
  };
  var isUndefined = function isUndefined(str) {
    return Object.prototype.toString.call(str) === '[object Undefined]';
  };
  var isNull = function isNull(str) {
    return Object.prototype.toString.call(str) === '[object Null]';
  };
  var isNumber = function isNumber(str) {
    return Object.prototype.toString.call(str) === '[object Number]';
  };
  var stringify = function stringify(obj) {
    return JSON.stringify(obj);
  };
  var parse = function parse(str) {
    return JSON.parse(str);
  };

  /**
   * options.isReverse  是否反向循环
   * */
  var forEach = function forEach(obj, callback, options) {
    options = options || {};
    callback = callback || noop;
    var _options = options,
        isReverse = _options.isReverse;

    var loopObj = function loopObj() {
      for (var key in obj) {
        callback(obj[key], key, obj);
      }
    };
    var loopArr = function loopArr() {
      if (isReverse) {
        for (var i = obj.length - 1; i >= 0; i--) {
          callback(obj[i], i);
        }
      } else {
        for (var j = 0, len = obj.length; j < len; j++) {
          callback(obj[j], j);
        }
      }
    };
    if (isObject(obj)) {
      loopObj();
    }
    if (isArray(obj)) {
      loopArr();
    }
  };

  var isEmpty = function isEmpty(obj) {
    var result = true;
    if (isObject(obj)) {
      forEach(obj, function () {
        result = false;
      });
    }
    if (isString(obj) || isArray(obj)) {
      result = obj.length === 0;
    }
    if (isNumber(obj)) {
      result = obj === 0;
    }
    return result;
  };
  var rename = function rename(origin, newNames) {
    var isObj = isObject(origin);
    if (isObj) {
      origin = [origin];
    }
    origin = parse(stringify(origin));
    var updateProperty = function updateProperty(val, key, obj) {
      delete obj[key];
      key = newNames[key];
      obj[key] = val;
    };
    forEach(origin, function (item) {
      forEach(item, function (val, key, obj) {
        var isRename = key in newNames;
        (isRename ? updateProperty : noop)(val, key, obj);
      });
    });
    return isObject ? origin[0] : origin;
  };
  var extend = function extend(destination, sources) {
    for (var key in sources) {
      var value = sources[key];
      if (!isUndefined(value)) {
        destination[key] = value;
      }
    }
    return destination;
  };
  var Defer = Promise;
  var deferred = function deferred(callback) {
    return new Defer(callback);
  };
  var tplEngine = function tplEngine(tpl, data, regexp) {
    if (!isArray(data)) {
      data = [data];
    }
    var ret = [];
    var replaceAction = function replaceAction(object) {
      return tpl.replace(regexp || /\\?\{([^}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') return match.slice(1);
        return object[name] !== undefined ? object[name] : '{' + name + '}';
      });
    };
    for (var i = 0, j = data.length; i < j; i++) {
      ret.push(replaceAction(data[i]));
    }
    return ret.join('');
  };
  // 暂时支持 String
  var isContain = function isContain(str, keyword) {
    return str.indexOf(keyword) > -1;
  };
  var isEqual = function isEqual(source, target) {
    return source === target;
  };
  var Cache = function Cache(cache) {
    if (!isObject(cache)) {
      cache = {};
    }
    var set$$1 = function set$$1(key, value) {
      cache[key] = value;
    };
    var get$$1 = function get$$1(key) {
      return cache[key];
    };
    var remove = function remove(key) {
      delete cache[key];
    };
    var getKeys = function getKeys() {
      var keys = [];
      for (var key in cache) {
        keys.push(key);
      }
      return keys;
    };
    var clear = function clear() {
      cache = {};
    };
    return {
      set: set$$1,
      get: get$$1,
      remove: remove,
      getKeys: getKeys,
      clear: clear
    };
  };
  var request = function request(url, option) {
    return deferred(function (resolve, reject) {
      option = option || {};
      var method = option.method || 'GET';
      var body = option.body || {};
      var headers = option.headers || {};
      var isSuccess = function isSuccess(status) {
        return (/^(10000)$/.test(status)
        );
      };
      wx.request({
        url: url,
        method: method,
        data: JSON.parse(body),
        header: headers,
        success: function success(res) {
          var result = res.data;
          var status = result.resultCode;
          if (isSuccess(status)) {
            resolve(result);
          } else {
            extend(result, {
              status: status
            });
            reject(result);
          }
        },
        error: function error(_error) {
          reject(_error);
        }
      });
    });
  };
  var map = function map(arrs, callback) {
    return arrs.map(callback);
  };
  var filter = function filter(arrs, callback) {
    return arrs.filter(callback);
  };
  var isMiniprogram = function isMiniprogram() {
    var isMini = false;
    try {
      var system = wx.getSystemInfoSync();
      isMini = true;
    } catch (e) {}
    return isMini;
  };
  var uniq = function uniq(arrs, callback) {
    var newData = [],
        tempData = {};
    arrs.forEach(function (target) {
      var temp = callback(target);
      tempData[temp.key] = temp.value;
    });
    forEach(tempData, function (val) {
      newData.push(val);
    });
    return newData;
  };
  var some = function some(arrs, callback) {
    return arrs.some(callback);
  };
  var toJSON = function toJSON(value) {
    return JSON.stringify(value);
  };
  var toArray$1 = function toArray$$1(obj) {
    var arrs = [];
    forEach(obj, function (v, k) {
      arrs.push([k, v]);
    });
    return arrs;
  };
  var isPromise = function isPromise(val) {
    var isTrue = false;
    try {
      isTrue = Object.prototype.toString.call(val) === '[object Promise]' || val && val.then && val.catch && val.finally;
    } catch (e) {
      isTrue = false;
    }
    return isTrue;
  };
  function Timer(_option) {
    _option = _option || {};
    var option = {
      timeout: 0,
      // interval | timeout
      type: 'interval'
    };
    extend(option, _option);
    var timers = [];
    var _timeout = option.timeout,
        type = option.type;

    var timerType = {
      resume: {
        interval: function interval(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setInterval(callback, _timeout);
        },
        timeout: function timeout(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setTimeout(callback, _timeout);
        }
      },
      pause: {
        interval: function interval(timer) {
          return clearInterval(timer);
        },
        timeout: function timeout(timer) {
          return clearTimeout(timer);
        }
      }
    };
    this.resume = function (callback, immediate) {
      callback = callback || noop;
      var resume = timerType.resume;

      var timer = resume[type](callback, immediate);
      timers.push(timer);
    };
    this.pause = function () {
      var pause = timerType.pause;

      forEach(timers, function (timer) {
        pause[type](timer);
      });
    };
  }
  var isInclude = function isInclude(str, match) {
    return str.indexOf(match) > -1;
  };
  var clone = function clone(source) {
    return JSON.parse(JSON.stringify(source));
  };
  function Index() {
    var index = 0;
    this.add = function () {
      index += 1;
    };
    this.get = function () {
      return index;
    };
    this.reset = function () {
      index = 0;
    };
  }
  function Observer() {
    var observers = [];
    this.add = function (observer, force) {
      if (isFunction(observer)) {
        if (force) {
          return observers = [observer];
        }
        observers.push(observer);
      }
    };
    this.remove = function (observer) {
      observers = filter(observers, function (_observer) {
        return _observer !== observer;
      });
    };
    this.emit = function (data) {
      forEach(observers, function (observer) {
        observer(data);
      });
    };
  }
  function Prosumer() {
    var data = [],
        isConsuming = false;
    this.produce = function (res) {
      data.push(res);
    };
    this.consume = function (callback, finished) {
      if (isConsuming) {
        return;
      }
      isConsuming = true;
      var next = function next() {
        var res = data.shift();
        if (isUndefined(res)) {
          isConsuming = false;
          finished && finished();
          return;
        }
        callback(res, next);
      };
      next();
    };
    this.isExeuting = function () {
      return isConsuming;
    };
  }
  /* 
   prosumer.consume(function(data, next){
    //dosomething
    next();
   });
  */
  var Log = console;
  var getBrowser = function getBrowser() {
    var name = '',
        version = '';
    if (isMiniprogram()) {
      var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
          system = _wx$getSystemInfoSync.system,
          model = _wx$getSystemInfoSync.model;

      name = model;
      version = system;
    } else {
      var userAgent = navigator.userAgent;
      if (/(Msie|Firefox|Opera|Chrome|Netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        name = RegExp.$1;
        version = RegExp.$2;
      }
      if (/Version\D+(\d[\d.]*).*Safari/.test(userAgent)) {
        name = 'Safari';
        version = RegExp.$1;
      }
    }
    return {
      name: name,
      version: version
    };
  };

  var string10to64 = function string10to64(number) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ+/'.split(''),
        radix = chars.length + 1,
        qutient = +number,
        arr = [];
    do {
      var mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join('');
  };

  var getUUID = function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  /* 获取 22 位的 UUID */
  var getUUID22 = function getUUID22() {
    var uuid = getUUID();
    uuid = uuid.replace(/-/g, '') + '0';
    uuid = parseInt(uuid, 16);
    uuid = string10to64(uuid);
    if (uuid.length > 22) {
      uuid = uuid.slice(0, 22);
    }
    return uuid;
  };

  var Storage = function () {
    var keyNS = 'rong-rtc-';

    function isKeyExist(key) {
      // do not depend on value cause of '和0
      return Object.prototype.hasOwnProperty.call(localStorage, key) || Object.prototype.hasOwnProperty.call(sessionStorage, key);
    }

    function get$$1(key) {
      var tempKey = keyNS + key;
      if (!isKeyExist(tempKey)) {
        return null;
      }
      var val = localStorage.getItem(tempKey) || sessionStorage.getItem(tempKey);
      val = JSON.parse(val);
      if (val !== null && Object.prototype.hasOwnProperty.call(val, 'type') && Object.prototype.hasOwnProperty.call(val, 'data')) {
        return val.data;
      }
      return null;
    }

    function set$$1(key, val, isTemp) {
      var store = void 0;
      if (isTemp) {
        store = sessionStorage;
      } else {
        store = localStorage;
      }
      store.setItem(keyNS + key, JSON.stringify({
        data: val,
        type: typeof val === 'undefined' ? 'undefined' : _typeof(val)
      }));
    }

    function remove(key) {
      var tempKey = keyNS + key;
      localStorage.removeItem(tempKey);
      sessionStorage.removeItem(tempKey);
    }

    return {
      get: get$$1,
      set: set$$1,
      remove: remove
    };
  }();

  var handleObjKeys = function handleObjKeys(obj, event) {
    obj = obj || {};
    var newObj = {};
    forEach(obj, function (value, key) {
      var newKey = event ? event(key) : key;
      newObj[newKey] = isObject(value) ? handleObjKeys(value, event) : value;
    });
    return newObj;
  };

  var clearEselessFields = function clearEselessFields(obj) {
    obj = obj || {};
    var newObj = clone(obj);
    forEach(newObj, function (value, key) {
      if (isUndefined(value)) {
        delete newObj[key];
      } else if (isObject(value)) {
        value = clearEselessFields(value);
      }
    });
    return newObj;
  };

  var lineToHump = function lineToHump(str) {
    return str.replace(/_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  };

  var humpToLine = function humpToLine(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  };

  var getKeys = function getKeys(_object) {
    var keys = [];
    for (var key in _object) {
      keys.push(key);
    }
    return keys;
  };

  /* 去重合并 */
  var merge = function merge(arr1, arr2, options) {
    options = options || {};
    var isReverse = options.isReverse;
    var newArr = [];
    forEach(arr1, function (item) {
      newArr.push(item);
    });
    forEach(arr2, function (item) {
      var index = newArr.indexOf(item);
      if (index > -1) {
        newArr.splice(index, 1);
      }
      isReverse ? newArr.unshift(item) : newArr.push(item);
    }, options);
    return newArr;
  };

  var utils = {
    Prosumer: Prosumer,
    Log: Log,
    Observer: Observer,
    Timer: Timer,
    isMiniprogram: isMiniprogram,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isString: isString,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    stringify: stringify,
    parse: parse,
    rename: rename,
    extend: extend,
    clone: clone,
    deferred: deferred,
    Defer: Defer,
    forEach: forEach,
    tplEngine: tplEngine,
    isContain: isContain,
    noop: noop,
    Cache: Cache,
    request: request,
    map: map,
    filter: filter,
    uniq: uniq,
    some: some,
    isEqual: isEqual,
    isEmpty: isEmpty,
    toJSON: toJSON,
    isInclude: isInclude,
    isNull: isNull,
    isNumber: isNumber,
    toArray: toArray$1,
    isPromise: isPromise,
    Index: Index,
    getBrowser: getBrowser,
    getUUID: getUUID,
    getUUID22: getUUID22,
    Storage: Storage,
    handleObjKeys: handleObjKeys,
    lineToHump: lineToHump,
    humpToLine: humpToLine,
    clearEselessFields: clearEselessFields,
    getKeys: getKeys,
    merge: merge
  };

  var DownEvent = {
    ROOM_USER_JOINED: 'room_user_joined',
    ROOM_USER_LEFT: 'room_user_left',
    ROOM_USER_KICK: 'room_user_kick',

    STREAM_PUBLISHED: 'stream_published',
    STREAM_UNPUBLISHED: 'stream_unpublished',
    STREAM_DISABLED: 'stream_disabled',
    STREAM_ENABLED: 'stream_enabled',
    STREAM_MUTED: 'stream_muted',
    STREAM_UNMUTED: 'stream_unmuted',

    RTC_ERROR: 'rtc_error',
    RTC_MOUNTED: 'rtc_mounted',
    RTC_UNMOUNTED: 'rtc_unmounted',

    MESSAGE_RECEIVED: 'message_received',

    REPORT_SPOKE: 'report_spoke',

    MONITOR_STATS: 'monitor_stats'
  };

  var UpEvent = {
    ROOM_JOIN: 'room_join',
    ROOM_LEAVE: 'room_leave',
    ROOM_GET: 'room_get',
    ROOM_GET_SESSONID: 'room_getsessionid',

    STREAM_PUBLISH: 'stream_publish',
    STREAM_PUBLISH_DEFAULT: 'stream_publish_default',
    STREAM_UNPUBLISH: 'stream_UNPUBLISH',
    STREAM_SUBSCRIBE: 'stream_subscribe',
    STREAM_UNSUBSCRIBE: 'stream_unsubscribe',
    STREAM_RESIZE: 'stream_resize',
    STREAM_GET: 'stream_get',

    LIVE_CONFIG: 'live_config',

    AUDIO_MUTE: 'audio_mute',
    AUDIO_UNMUTE: 'audio_unmute',

    VIDEO_DISABLE: 'video_disable',
    VIDEO_ENABLE: 'video_enable',

    STORAGE_SET: 'strorage_set',
    STORAGE_GET: 'strorage_get',
    STORAGE_REMOVE: 'strorage_remove',

    MESSAGE_SEND: 'message_send',

    DEVICE_GET: 'device_get',

    REPORT_START: 'report_start',
    REPORT_STOP: 'report_stop',

    MONITOR_SET_FREQUENCY: 'monitor_set_frequency'
  };

  var RoomEvents = [{
    name: DownEvent.ROOM_USER_JOINED,
    type: 'joined'
  }, {
    name: DownEvent.ROOM_USER_LEFT,
    type: 'left'
  }, {
    name: DownEvent.ROOM_USER_KICK,
    type: 'kick'
  }];

  var StreamEvents = [{
    name: DownEvent.STREAM_PUBLISHED,
    type: 'published'
  }, {
    name: DownEvent.STREAM_UNPUBLISHED,
    type: 'unpublished'
  }, {
    name: DownEvent.STREAM_DISABLED,
    type: 'disabled'
  }, {
    name: DownEvent.STREAM_ENABLED,
    type: 'enabled'
  }, {
    name: DownEvent.STREAM_MUTED,
    type: 'muted'
  }, {
    name: DownEvent.STREAM_UNMUTED,
    type: 'unmuted'
  }];

  var MessageEvents = [{
    name: DownEvent.MESSAGE_RECEIVED,
    type: 'received'
  }];

  var getErrors = function getErrors() {
    var errors = [{
      code: 10000,
      name: 'INSTANCE_IS_DESTROYED',
      msg: 'RongRTC instance has been destroyed'
    }, {
      code: 50000,
      name: 'IM_NOT_CONNECTED',
      msg: 'IM not connected'
    }, {
      code: 50001,
      name: 'ROOM_ID_IS_ILLEGAL',
      msg: 'The roomId is illegal and can contain only upper and lower case letters, Arabic numerals, +, =, -, _ and cannot exceed 64 characters in length'
    }, {
      code: 50002,
      name: 'ROOM_REPEAT_JOIN',
      msg: 'Not rejoin the room'
    }, {
      code: 50004,
      name: 'RTC_NOT_JOIN_ROOM',
      msg: 'Please join the room first'
    }, {
      code: 50056,
      name: 'ENGINE_ERROR',
      msg: 'RTC engine error'
    }, {
      code: 50010,
      name: '',
      msg: 'Http request timeout'
    }, {
      code: 50011,
      name: '',
      msg: 'http response error'
    }, {
      code: 50012,
      name: '',
      msg: 'Network unavailable'
    }, {
      code: 50020,
      name: '',
      msg: 'Resources has been published'
    }, {
      code: 50021,
      name: 'SET_OFFER_ERROR',
      msg: 'Set offer error'
    }, {
      code: 50022,
      name: 'SET_ANSWER_ERROR',
      msg: 'Set answer error'
    }, {
      code: 50023,
      name: 'PUBLISH_STREAM_EXCEED_LIMIT',
      msg: 'The maximum number of published resources has been reached'
    }, {
      code: 50024,
      name: 'STREAM_NOT_EXIST',
      msg: 'Stream not exist. Please check user.id、stream.type or stream.tag'
    }, {
      code: 50030,
      name: 'SUBSCRIBE_STREAM_NOT_EXIST',
      msg: 'Subscribe to non-existent resource'
    }, {
      code: 50030,
      name: 'STREAM_TRACK_NOT_EXIST',
      msg: 'Track not exist. Please check user.id、stream.type or stream.tag'
    }, {
      code: 50031,
      name: 'STREAM_SUBSCRIBED',
      msg: 'Resources has been subscribed'
    }, {
      code: 50032,
      name: 'UNSUBSCRIBE_STREAM_NOT_EXIST',
      msg: 'Unsubscribe to non-existent resource'
    }, {
      code: 50051,
      name: 'SOCKET_UNAVAILABLE',
      msg: 'IM socket unavailable'
    }, {
      code: 50052,
      name: 'NETWORK_UNAVAILABLE',
      msg: 'Network unavailable'
    }, {
      code: 50053,
      name: 'IM_SDK_VER_NOT_MATCH',
      msg: 'IM SDK version is too low, minimum version 2.4.0, please check: https://www.rongcloud.cn/docs/web_rtclib.html'
    }, {
      code: 50054,
      name: 'STREAM_DESKTOPID_ILLEGAL',
      msg: 'Failed to get screen shared stream, illegal desktopStreamId'
    }, {
      code: 50055,
      name: 'PARAMTER_ILLEGAL',
      msg: 'Please check the parameters, the {name} parameter is mandatory'
    }, {
      code: 50057,
      name: 'MEDIA_SERVER_ERROR',
      msg: 'Network is abnormal or Media Server is unavailable'
    }, {
      code: 50058,
      name: 'MEDIA_SERVER_RESPONSE_EMPTY',
      msg: 'Media Server response body is empty'
    }, {
      code: 50059,
      name: 'NO_AUDIO_AND_VIDEO_SERVICE',
      msg: 'No audio and video services have been activated'
    }, {
      code: 50060,
      name: 'WRONG_ROLE_SETTING',
      msg: 'The set role is invalid'
    }, {
      code: 50061,
      name: 'WRONG_AUDIENCE_EVENT',
      msg: 'This method cannot be called by the audience'
    }, {
      code: 50062,
      name: 'SET_LIVE_CONFIG_MODE_ERROR',
      msg: 'This method can only be called in live mode'
    }, {
      code: 50063,
      name: 'SET_LIVE_CONFIG_ROLE_ERROR',
      msg: 'This method can only be called by the anchor'
    }, {
      code: 50064,
      name: 'MUST_PUBLISHED_BEFORE_SETMIXCONFIG',
      msg: 'Must be published before setMixConfig'
    }, {
      code: 50065,
      name: 'ROOM_USER_KICK',
      msg: 'You have been removed from the room！'
    }, {
      code: 50066,
      name: 'ROOM_USER_BLOCK',
      msg: 'You are not allowed to join the room！'
    }, {
      code: 50067,
      name: 'STREAM_PUBLISH_ERROR',
      msg: 'Can only initiate audio calls'
    }, {
      code: 50101,
      name: 'MINI_PUBLISH_ERROR',
      msg: 'Resource publishing error'
    }, {
      code: 40001,
      name: 'NOT_IN_ROOM',
      msg: 'Not in the room'
    }, {
      code: 40002,
      name: 'INTERNAL_ERROR',
      msg: 'IM Server internal error'
    }, {
      code: 40003,
      name: 'HAS_NO_ROOM',
      msg: 'IM Server room info not exist'
    }, {
      code: 40004,
      name: 'INVALID_USERID',
      msg: 'UserId illegal'
    }, {
      code: 40005,
      name: 'REPEAT_JOIN_ROOM',
      msg: 'Not rejoin the room'
    }];

    var errorMap = {
      Inner: {},
      Outer: {}
    };
    utils.forEach(errors, function (error) {
      var name = error.name,
          code = error.code,
          msg = error.msg;

      var info = {
        code: code,
        msg: msg
      };
      errorMap.Inner[name] = info;
      errorMap[code] = info;
      errorMap.Outer[name] = code;
    });
    return errorMap;
  };
  var ErrorType = getErrors();

  var StreamType = {
    NODE: -1,
    AUDIO: 0,
    VIDEO: 1,
    AUDIO_AND_VIDEO: 2
  };

  var StreamSize = {
    MAX: 1,
    MIN: 2
  };

  var StreamState = {
    ENABLE: 1,
    DISBALE: 0
  };

  var UserState = {
    JOINED: 0,
    LEFT: 1,
    OFFLINE: 2
  };

  var PingCount = 4;

  var LogTag = {
    ICE: 'ice',
    LIFECYCLE: 'lifecycle',
    ROOM: 'room',
    STREAM: 'stream',
    STREAM_HANDLER: 'stream_handler',
    LIVE_HANDLER: 'live_handler',
    ROOM_HANDLER: 'room_handler',
    STORAGE_HANDLER: 'storage_handler',
    IM: 'im',
    MESSAGE: 'message',
    DEVICE: 'device',
    STAT: 'stat'
  };

  var LogLevel = {
    INFO: 'I',
    DEBUG: 'D',
    VERBOSE: 'V',
    WARN: 'W',
    ERROR: 'E'
  };

  var EventType = {
    REQUEST: 1,
    RESPONSE: 2
  };

  var StorageType = {
    ROOM: 1,
    USER: 2
  };

  var REGEXP_ROOM_ID = /[A-Za-z0-9+=-_]+$/;

  var LENGTH_ROOM_ID = 64;

  var DEFAULT_MS_PROFILE = {
    height: 720,
    width: 1280,
    frameRate: 15
  };
  var MIN_STREAM_SUFFIX = 'tiny';

  var REQUEST_TIMEOUT = 10 * 1000; // 默认改为 10s

  var MEDIASERVER_SUCCESS = 10000;

  /* 直播模式 */
  var RTC_MODE = {
    RTC: 0, // 普通音视频
    LIVE: 2 // 直播
  };

  /* 直播类型 */
  var LIVE_TYPE = {
    AUDIO_AND_VIDEO: 0,
    AUDIO: 1
  };

  /* 直播角色 */
  var LIVE_ROLE = {
    ANCHOR: 1, // 主播
    AUDIENCE: 2 // 观众
  };

  /* 直播布局模式 */
  var LIVE_LAYOUT_MODE = {
    CUSTOMIZE: 1, // 自定义布局
    SUSPENSION: 2, // 悬浮
    ADAPTATION: 3 // 自适应布局
  };

  /* 直播自定义布局, 视频渲染方式 */
  var LIVE_RENDER_MODE = {
    CROP: 1, // 裁剪
    WHOLE: 2 // 填充
  };

  var LIVE_CONFIG_VERSION = 1;

  /* 直播设置(自定义布局设置, 请求 mediaServer 时传入) */
  var LIVE_CONFIG = {
    version: LIVE_CONFIG_VERSION
    // mode: LIVE_LAYOUT_MODE.SUSPENSION
  };

  var TAG_V2 = '';

  var STAT_NAME = {
    R1: 'r1',
    R2: 'r2',
    R3: 'r3',
    R4: 'r4'
  };

  var SDK_VERSION = '3.2.1';

  var STORAGE_KEY = {
    UUID: 'uuid'
  };

  var PROTOCOL = {
    HTTP: 'http://',
    HTTPS: 'https://'
  };

  var PROTOCOL_SUFFIX = '://';

  var Storage$1 = utils.Storage;


  var getClientID = function getClientID() {
    var key = STORAGE_KEY.UUID;
    var uuid = Storage$1.get(key);
    if (!uuid) {
      uuid = utils.getUUID22();
      Storage$1.set(key, uuid);
    }
    return uuid;
  };

  /* 
    data： 任意对象
    rules: 校验规则，数组
    let user = {
      id: '',
      stream: {
        type: 1,
        tag: 2
      }
    };
    // 校验必传入参数, 暂时支持 2 级
    check(user, ['id', 'stream.type', 'stream.tag', 'stream.mediaStream']);
  */
  var check = function check(data, rules) {
    var isIllegal = false,
        name = '';
    var getBody = function getBody() {
      return {
        isIllegal: isIllegal,
        name: name
      };
    };
    if (!utils.isArray(rules)) {
      rules = [rules];
    }
    if (!utils.isObject(data)) {
      throw new Error('check(data, rules): data must be an object');
    }
    utils.forEach(rules, function (rule) {
      var isTier = rule.indexOf('.') > -1;
      if (!isTier) {
        isIllegal = utils.isUndefined(data[rule]);
        if (isIllegal) {
          return name = rule;
        }
      }
      if (isTier) {
        var props = rule.split('.');

        var _props = slicedToArray(props, 2),
            parent = _props[0],
            child = _props[1];

        var parentData = data[parent];
        isIllegal = utils.isUndefined(parentData);
        if (isIllegal) {
          return name = parent;
        }
        if (!utils.isArray(parentData)) {
          parentData = [parentData];
        }
        utils.forEach(parentData, function (parent) {
          var childData = parent[child];
          isIllegal = utils.isUndefined(childData);
          if (isIllegal) {
            return name = child;
          }
        });
      }
    });
    return getBody();
  };

  var getError = function getError(name) {
    var error = ErrorType.Inner.PARAMTER_ILLEGAL;
    var msg = error.msg;

    msg = utils.tplEngine(msg, {
      name: name
    });
    return utils.extend(error, {
      msg: msg
    });
  };

  var getHeaders = function getHeaders(im, option, others) {
    others = others || {};
    var roomId = im.getRoomId();
    var token = im.getRTCToken();
    var userId = im.getUserId();

    var _im$getAppInfo = im.getAppInfo(),
        appKey = _im$getAppInfo.appKey;

    var browser = utils.getBrowser();
    var tpl = 'WeChat-MiniProgram';
    var type = utils.tplEngine(tpl, browser);
    var headers = {
      'App-Key': appKey,
      RoomId: roomId,
      Token: token,
      ClientType: type,
      ClientVersion: SDK_VERSION
    };
    var liveMode = RTC_MODE.LIVE;
    if (option.setUserId) {
      headers.UserId = userId;
    }
    if (option.mode === liveMode) {
      headers.RoomType = liveMode;
    }
    headers = utils.extend(headers, others);
    return headers;
  };

  var formatLiveConfig = function formatLiveConfig(config) {
    config = config || {};
    config.video = config.video || {};
    config.audio = config.audio || {};

    var customLayout = utils.handleObjKeys(config.customLayout, utils.humpToLine); // 驼峰转化为下划线
    var liveConfig = utils.extend(LIVE_CONFIG, {
      host_user_id: config.hostUserId,
      host_stream_id: config.hostStreamId,
      mode: config.layoutMode || LIVE_LAYOUT_MODE.SUSPENSION,
      output: {
        video: {
          normal: config.video,
          exparams: {
            renderMode: config.video.renderMode
          }
        },
        audio: config.audio
      },
      input: customLayout
    });
    return utils.clearEselessFields(liveConfig);
  };

  var dispatchStreamEvent = function dispatchStreamEvent(user, callback) {
    var id = user.id,
        uris = user.uris;

    if (utils.isString(uris)) {
      uris = utils.parse(uris);
    }
    var streams = [user];
    if (uris) {
      streams = utils.uniq(uris, function (target) {
        var tag = target.tag,
            mediaType = target.mediaType,
            state = target.state;

        var streamId = target.streamId || target.msid;
        var msUris = utils.filter(uris, function (uri) {
          var _msid = uri.streamId || uri.msid;
          return utils.isEqual(_msid, streamId);
        });
        return {
          key: [streamId].join('_'),
          value: {
            tag: tag,
            uris: msUris,
            mediaType: mediaType,
            state: state
          }
        };
      });
    }
    utils.forEach(streams, function (stream) {
      callback({
        id: id,
        stream: stream
      });
    });
  };

  var dispatchOperationEvent = function dispatchOperationEvent(user, callback) {
    var getModifyEvents = function getModifyEvents() {
      var events = {},
          tpl = '{type}_{state}';
      // 禁用视频
      var name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_DISABLED;
      // 启用视频
      name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_ENABLED;
      // 音频静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_MUTED;
      // 音频取消静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_UNMUTED;
      return events;
    };
    var _user$stream = user.stream,
        type = _user$stream.mediaType,
        state = _user$stream.state;

    var tpl = '{type}_{state}';
    var name = utils.tplEngine(tpl, {
      type: type,
      state: state
    });
    var events = getModifyEvents();
    var event = events[name];
    return callback(event, user);
  };

  var isV2Tag = function isV2Tag(tag) {
    return utils.isUndefined(tag) || utils.isEmpty(tag);
  };

  var isLiveAudience = function isLiveAudience(rongRTC) {
    var mode = rongRTC.option.mode;

    var liveRole = rongRTC.getLiveRole();
    return mode === RTC_MODE.LIVE && liveRole === LIVE_ROLE.AUDIENCE;
  };

  var isAudienceToAnchor = function isAudienceToAnchor(newRole, oldRole) {
    return oldRole === LIVE_ROLE.AUDIENCE && newRole === LIVE_ROLE.ANCHOR;
  };

  var getTrackIds = function getTrackIds(user) {
    var id = user.id,
        streams = user.stream;

    if (!utils.isArray(streams)) {
      streams = [streams];
    }
    var getTracks = function getTracks(type) {
      var tracks = [{
        kind: 'video',
        type: StreamType.VIDEO
      }, {
        kind: 'audio',
        type: StreamType.AUDIO
      }];
      if (utils.isEqual(type, StreamType.AUDIO_AND_VIDEO)) {
        return tracks;
      }
      return utils.filter(tracks, function (track) {
        return utils.isEqual(track.type, type);
      });
    };
    var trackIds = [];
    var tpl = '{id}_{tag}_{kind}';
    utils.forEach(streams, function (stream) {
      var tag = stream.tag,
          type = stream.type;

      var tracks = getTracks(type);
      utils.forEach(tracks, function (track) {
        var kind = track.kind;

        var trackId = utils.tplEngine(tpl, {
          id: id,
          tag: tag,
          kind: kind
        });
        trackIds.push(trackId);
      });
    });
    return trackIds;
  };

  var formatProtocolPath = function formatProtocolPath(path) {
    if (utils.isMiniprogram()) {
      return path;
    }
    path = path || '';
    var flag = PROTOCOL_SUFFIX;
    var hasProtocol = utils.isContain(path, flag);
    var protocol = '';
    if (utils.isEqual(location.protocol, 'https:')) {
      protocol = PROTOCOL.HTTPS;
      if (hasProtocol) {
        var domainSplitIndex = path.indexOf(flag) + flag.length;
        path = path.substring(domainSplitIndex);
      }
    } else {
      if (!hasProtocol) {
        protocol = PROTOCOL.HTTP;
      }
    }

    return utils.tplEngine('{protocol}{domain}', {
      protocol: protocol,
      domain: path
    });
  };

  /* 
    1. http 下, 全部认为有效
    2. https 下, 没有协议头(请求时会自动拼接)或协议头为 https 认为有效
   */
  var isValidMediaServer = function isValidMediaServer(url) {
    if (utils.isMiniprogram()) {
      return true;
    }
    if (utils.isEqual(location.protocol, 'http:')) {
      return true;
    }
    var flag = PROTOCOL_SUFFIX;
    var hasProtocol = utils.isContain(url, flag);
    if (hasProtocol) {
      var protocol = url.substring(0, url.indexOf(flag) + flag.length);
      return protocol === PROTOCOL.HTTPS;
    } else {
      return true;
    }
  };

  function Logger() {
    var observer = new utils.Observer();
    var write = function write(level, tag, meta) {
      var time = new Date().getTime();
      var log = {
        level: level,
        tag: tag,
        meta: meta,
        time: time,
        platform: 'web'
      };
      observer.emit(log);
    };
    var warn = function warn(tag, meta) {
      return write(LogLevel.WARN, tag, meta);
    };
    var error = function error(tag, meta) {
      return write(LogLevel.ERROR, tag, meta);
    };
    var info = function info(tag, meta) {
      return write(LogLevel.INFO, tag, meta);
    };
    var log = function log(tag, meta) {
      return write(LogLevel.VERBOSE, tag, meta);
    };
    var watch = function watch(watcher, force) {
      observer.add(watcher, force);
    };
    return {
      warn: warn,
      error: error,
      info: info,
      log: log,
      watch: watch
    };
  }
  var Logger$1 = Logger();

  var Room = function () {
    function Room(option) {
      classCallCheck(this, Room);

      var context = this;

      var _ref = option || '',
          id = _ref.id;

      var roomIdLen = id.length;
      var client = context.getClient();
      if (!REGEXP_ROOM_ID.test(id) || roomIdLen > LENGTH_ROOM_ID) {
        var Inner = ErrorType.Inner;

        return client.emit(DownEvent.RTC_ERROR, Inner.ROOM_ID_IS_ILLEGAL);
      }
      utils.forEach(RoomEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.ROOM, {
            event: type,
            user: user
          });
        });
      });
      utils.extend(context, {
        option: option,
        client: client,
        room: {
          id: id
        }
      });
    }

    createClass(Room, [{
      key: 'join',
      value: function join(user) {
        var _check = check(user, ['id']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var room = this.room,
            client = this.client;

        utils.extend(room, {
          user: user
        });
        return client.exec({
          event: UpEvent.ROOM_JOIN,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'leave',
      value: function leave() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_LEAVE,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'get',
      value: function get$$1() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'getSessionId',
      value: function getSessionId() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET_SESSONID,
          type: 'room',
          args: [room]
        });
      }
    }]);
    return Room;
  }();

  function Video(client) {
    return {
      disable: function disable(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_DISABLE,
          type: 'stream',
          args: [user]
        });
      },
      enable: function enable(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_ENABLE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  function Audio(client) {
    return {
      mute: function mute(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_MUTE,
          type: 'stream',
          args: [user]
        });
      },
      unmute: function unmute(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_UNMUTE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  var Stream = function () {
    function Stream(option) {
      classCallCheck(this, Stream);

      var context = this;
      var client = context.getClient();
      utils.forEach(StreamEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.STREAM, {
            event: type,
            user: user
          });
        });
      });
      client.extendOption(option);
      utils.extend(context, {
        option: option,
        client: client,
        video: new Video(client),
        audio: new Audio(client)
      });
    }

    createClass(Stream, [{
      key: 'publish',
      value: function publish(user) {
        var _check = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }

        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_PUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unpublish',
      value: function unpublish(user) {
        // let { client } = this;
        // let { rongRTC } = client;
        // if (isLiveAudience(rongRTC)) {
        //   return utils.Defer.reject(error);
        // }

        var _check2 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UNPUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(user) {
        var client = this.client;
        var rongRTC = client.rongRTC;


        var checkResult = void 0;
        if (isLiveAudience(rongRTC)) {
          checkResult = check(user, ['liveUrl']);
        } else {
          checkResult = check(user, ['id', 'stream.tag', 'stream.type']);
        }
        var _checkResult = checkResult,
            isIllegal = _checkResult.isIllegal,
            name = _checkResult.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.STREAM_SUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(user) {
        var client = this.client;
        var rongRTC = client.rongRTC;


        var checkResult = void 0;
        if (isLiveAudience(rongRTC)) {
          checkResult = check(user, []);
        } else {
          checkResult = check(user, ['id', 'stream.tag', 'stream.type']);
        }
        var _checkResult2 = checkResult,
            isIllegal = _checkResult2.isIllegal,
            name = _checkResult2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.STREAM_UNSUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'resize',
      value: function resize(user) {
        var _check3 = check(user, ['id', 'stream.tag']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_RESIZE,
          type: 'stream',
          args: [user]
        });
      }
      // 仅直播模式此方法有效

    }, {
      key: 'setMixConfig',
      value: function setMixConfig(config) {
        var client = this.client;
        var rongRTC = client.rongRTC;
        var mode = rongRTC.option.mode;

        var liveRole = rongRTC.getLiveRole();

        var isLiveMode = mode === RTC_MODE.LIVE; // 直播模式
        var isAnchor = liveRole === LIVE_ROLE.ANCHOR; // 主播

        if (!isLiveMode) {
          // 非直播模式
          return utils.Defer.reject(ErrorType.Inner.SET_LIVE_CONFIG_MODE_ERROR);
        }
        if (!isAnchor) {
          // 非主播
          return utils.Defer.reject(ErrorType.Inner.SET_LIVE_CONFIG_ROLE_ERROR);
        }

        var _check4 = check(config, ['layoutMode']),
            isIllegal = _check4.isIllegal,
            name = _check4.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.LIVE_CONFIG,
          type: 'stream',
          args: [config]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(constraints) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_GET,
          type: 'stream',
          args: [constraints]
        });
      }
    }, {
      key: 'publishDefault',
      value: function publishDefault(constraints) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_PUBLISH_DEFAULT,
          type: 'stream',
          args: [constraints]
        });
      }
    }]);
    return Stream;
  }();

  var EventEmitter = function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);

      this.events = {};
      this.onceEvents = {};
    }

    createClass(EventEmitter, [{
      key: 'on',
      value: function on(name, event) {
        var events = this.events[name] || [];
        events.includes(event) || events.push(event);
        this.events[name] = events;
      }
    }, {
      key: 'off',
      value: function off(name, offEvent) {
        if (offEvent) {
          var events = this.events[name] || [];
          utils.forEach(events, function (event, index) {
            if (utils.isEqual(event, offEvent)) {
              events.splice(index, 1);
            }
          }, {
            isReverse: true
          });
        } else {
          delete this.events[name];
        }
      }
    }, {
      key: 'emit',
      value: function emit(name, data, error) {
        var events = this.events[name];
        utils.forEach(events, function (event) {
          event(error, data);
        });

        var onceEvent = this.onceEvents[name] || utils.noop;
        onceEvent(error, data);
        delete this.onceEvents[name];
      }
    }, {
      key: 'once',
      value: function once(name, event) {
        this.onceEvents[name] = event;
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        for (var name in this.events) {
          this.off(name);
        }
        for (var _name in this.onceEvents) {
          delete this.onceEvents[_name];
        }
      }
    }]);
    return EventEmitter;
  }();

  var CommonEvent = {
    JOINED: 'common_joined',
    LEFT: 'common_left',
    ERROR: 'common_error',
    CONSUME: 'common_consume',
    REQUEST_CONSUME: 'common_request_consume',
    CONNECTED: 'common_connected',
    PEERCONN_CREATED: 'common_peerconn_created',
    PEERCONN_DESTROYED: 'common_peerconn_destroyed',
    PUBLISHED_STREAM: 'common_published_stream',
    SEND_REPORT: 'common_send_report',
    TRACK_MODIFY: 'common_track_modify',
    SET_URIS: 'common_set_uris',
    CHANGE_ROLE: 'common_change_role'
  };

  function request$1() {
    var config = {
      errorUrls: [],
      urls: [],
      timeout: REQUEST_TIMEOUT
    };

    var prosumer = new utils.Prosumer();
    var eventEmitter = new EventEmitter();

    var getUrl = function getUrl() {
      var errorUrls = config.errorUrls;

      var urls = utils.clone(config.urls);
      urls = utils.filter(urls, function (url) {
        return !utils.isInclude(errorUrls, url);
      });
      if (utils.isEmpty(urls)) {
        urls = config.urls;
      }
      return utils.isEmpty(urls) ? '' : urls[0];
    };

    var setUrls = function setUrls(urls) {
      if (utils.isEmpty(urls) || !utils.isArray(urls)) {
        return;
      }

      urls = utils.map(urls, function (url) {
        // 检验格式
        return formatProtocolPath(url);
      });
      config.urls = utils.merge(config.urls, urls, { isReverse: true }); // 反向合并
    };

    var setOption = function setOption(_config) {
      _config = _config || {};
      var urls = _config.urls;
      if (!utils.isEmpty(urls)) {
        // 将 urls 设置提出, 统一在 setUrls 内校验格式
        setUrls(urls);
        delete _config.urls;
      }
      utils.extend(config, _config);
    };

    var getOption = function getOption() {
      return config;
    };

    var addUrls = function addUrls(mediaServerList) {
      setUrls(mediaServerList);
    };

    var addUrl = function addUrl(mediaServer) {
      setUrls([mediaServer]);
    };
    var isUrlsExisted = function isUrlsExisted(urls) {
      if (!utils.isArray(urls)) {
        urls = [urls];
      }
      var isExisted = true;
      utils.forEach(urls, function (url) {
        var formatedUrl = formatProtocolPath(url);
        if (!utils.isInclude(config.urls, formatedUrl)) {
          isExisted = false;
        }
      });
      return isExisted;
    };
    var postProcess = function postProcess(option) {
      var path = option.path,
          body = option.body;

      var tpl = '{domain}{path}';

      return utils.deferred(function (resolve, reject) {
        var doRequest = function doRequest(error) {
          var domain = getUrl();
          if (utils.isEmpty(domain)) {
            var Inner = ErrorType.Inner;
            error = Inner.NO_AUDIO_AND_VIDEO_SERVICE;
          }
          if (error) {
            error = utils.isEqual(error.status, 0) ? Inner.MEDIA_SERVER_ERROR : error;
            return reject(error);
          }
          var url = utils.tplEngine(tpl, {
            domain: domain,
            path: path
          });
          var headers = {
            'Content-Type': 'application/json;charset=UTF-8'
          };
          var _headers = option.headers;

          if (utils.isObject(_headers)) {
            utils.extend(headers, _headers);
          }
          utils.request(url, {
            method: 'POST',
            timeout: config.timeout || REQUEST_TIMEOUT,
            body: JSON.stringify(body),
            headers: headers
          }).then(function (result) {
            var code = result.resultCode;

            if (utils.isEqual(code, MEDIASERVER_SUCCESS)) {
              resolve(result);
            } else {
              reject(result);
            }
          }, function (error) {
            var status = error.status;

            if (utils.isInclude([403], status)) {
              return reject(error);
            }
            config.errorUrls.push(domain);
            doRequest(error);
          });
        };
        doRequest();
      });
    };
    eventEmitter.on(CommonEvent.REQUEST_CONSUME, function () {
      prosumer.consume(function (_ref, next) {
        var option = _ref.option,
            resolve = _ref.resolve,
            reject = _ref.reject;

        postProcess(option).then(function (result) {
          resolve(result);
          next();
        }, function (error) {
          reject(error);
          next();
        });
      });
    });
    var post = function post(option) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({ option: option, resolve: resolve, reject: reject });
        eventEmitter.emit(CommonEvent.REQUEST_CONSUME);
      });
    };
    return {
      setOption: setOption,
      getOption: getOption,
      post: post,
      addUrls: addUrls,
      addUrl: addUrl,
      isUrlsExisted: isUrlsExisted
    };
  }
  var request$2 = request$1();

  var isIMV3 = function isIMV3(option) {
    var RongIMLib = option.RongIMLib;

    return RongIMLib.SDK_VERSION; // im v3 可通过 SDK_VERSION 获取版本号
  };

  var getIMEventsByV2 = function getIMEventsByV2(option) {
    var im = option.RongIMLib.RongIMClient,
        RongIMLib = option.RongIMLib;

    var instance = im.getInstance();

    var isCompatibleIM = function isCompatibleIM(key) {
      var imInstance = im.getInstance();
      if (imInstance[key]) {
        return true;
      }
      Logger$1.warn(LogTag.IM, {
        msg: 'Low version IM SDK is not supported, please update IM SDK'
      });
      return false;
    };

    var registMessage = function registMessage(name, message) {
      var isCounted = false,
          isPersited = false;
      var tag = new RongIMLib.MessageTag(isCounted, isPersited);
      var content = message.content;

      var props = utils.map(utils.toArray(content), function (columns) {
        return columns[0];
      });
      im.registerMessageType(name, name, tag, props);
    };

    var getCurrentConnectionStatus = function getCurrentConnectionStatus() {
      var connectState = -1;
      try {
        connectState = im.getInstance().getCurrentConnectionStatus();
      } catch (error) {
        Logger$1.error(LogTag.IM, {
          content: error,
          pos: 'new RongRTC'
        });
      }
      return connectState;
    };

    return {
      CONNECTION_STATUS: RongIMLib.ConnectionStatus,
      isConnected: function isConnected() {
        var connectState = getCurrentConnectionStatus();
        return utils.isEqual(connectState, RongIMLib.ConnectionStatus.CONNECTED);
      },
      statusWatch: im.statusWatch,
      messageWatch: function messageWatch(event) {
        event = event || utils.noop;
        im.messageWatch(function (message) {
          var messageType = message.messageType;

          var isCustom = utils.isEqual(im.MessageType.UnknownMessage, messageType);
          var msg = utils.parse(utils.toJSON(message));
          var content = {};
          if (isCustom) {
            var customMsg = msg.content;
            content = customMsg.message.content;
          } else {
            content = msg.content;
          }
          utils.extend(msg, {
            content: content
          });
          msg = {
            name: msg.objectName,
            uId: msg.messageUId,
            senderId: msg.senderUserId,
            content: msg.content
          };
          event(msg);
        });
      },
      joinRTCRoom: function joinRTCRoom(room) {
        return utils.deferred(function (resolve, reject) {
          instance.joinRTCRoom(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      quitRTCRoom: function quitRTCRoom(room) {
        return utils.deferred(function (resolve, reject) {
          instance.quitRTCRoom(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCRoomInfo: function getRTCRoomInfo(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCRoomInfo(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCUserInfoList: function getRTCUserInfoList(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCUserInfoList(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCToken: function getRTCToken(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCToken(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getNavi: function getNavi() {
        return instance.getNavi();
      },
      getCurrentUserId: function getCurrentUserId() {
        return instance.getCurrentUserId();
      },
      getCurrentConnectionStatus: getCurrentConnectionStatus,
      setRTCUserInfo: function setRTCUserInfo(room, info) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      removeRTCUserInfo: function removeRTCUserInfo(room, info) {
        return utils.deferred(function (resolve, reject) {
          instance.removeRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      /**
       * 发布资源 / 取消发布
       */
      setRTCUserData: function setRTCUserData(id, key, value, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCUserData(id, key, value, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      },
      /**
       * 全量 URI 资源发布
       * @param {string} roomId 房间 ID
       * @param {{ name: string, content: string }} message 旧版本消息，含消息名及消息内容
       * @param {string} valueInfo 全量消息数据
       * @param {string} objectName 全量 URI 消息名
       */
      setRTCUserTotalRes: function setRTCUserTotalRes(roomId, message, valueInfo, objectName) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCUserTotalRes(roomId, message, valueInfo, objectName, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },

      getRTCUserData: function getRTCUserData(id, keys, isInner) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      removeRTCUserData: function removeRTCUserData(id, keys, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.removeRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      },
      setRTCRoomData: function setRTCRoomData(id, key, value, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCRoomData(id, key, value, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      },
      getRTCRoomData: function getRTCRoomData(id, keys, isInner) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCRoomData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      removeRTCRoomData: function removeRTCRoomData(id, keys, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.removeRTCRoomData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          });
        }, message);
      },
      setRTCState: function setRTCState(room, content) {
        if (!isCompatibleIM('setRTCState')) {
          return '';
        }
        return utils.deferred(function (resolve, reject) {
          instance.setRTCState(room, content, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCUserList: function getRTCUserList(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCUserList(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getAppInfo: function getAppInfo() {
        var appInfo = instance.getAppInfo();
        return {
          appKey: appInfo.appKey
        };
      },
      RTCPing: function RTCPing(room) {
        return utils.deferred(function (resolve, reject) {
          instance.RTCPing(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getIMVersion: function getIMVersion() {
        if (!isCompatibleIM('getSDKInfo')) {
          return '';
        }
        var info = im.getInstance().getSDKInfo();
        return info.version || '';
      },
      isSupportRTC: function isSupportRTC() {
        var isSupport = false;
        if (utils.isFunction(im.prototype.RTCPing)) {
          isSupport = true;
        }
        return isSupport;
      },
      sendMessage: function sendMessage(message, roomId) {
        var name = message.name,
            content = message.content;

        var conversationType = 12;
        var isRegisted = im.RegisterMessage[name];
        !isRegisted && registMessage(name, message);
        var msg = new im.RegisterMessage[name](content);
        return utils.deferred(function (resolve, reject) {
          instance.sendMessage(conversationType, roomId, msg, {
            onSuccess: resolve,
            onError: reject
          });
        });
      }
    };
  };

  var getIMEventsByV3 = function getIMEventsByV3(option) {
    var RongIMLib = option.RongIMLib;

    var im = RongIMLib.RongIMClient ? RongIMLib.RongIMClient.getIMv3() : RongIMLib.getInstance();
    var CONNECTION_STATUS = RongIMLib.CONNECTION_STATUS;

    if (!(im.rtcInnerUnwatch && im.rtcInnerWatch)) {
      throw new Error('Please upgrade RongIMLib version');
    }

    return {
      CONNECTION_STATUS: CONNECTION_STATUS,
      isConnected: function isConnected() {
        var connectionStatus = im.getConnectionStatus();
        return utils.isEqual(connectionStatus, CONNECTION_STATUS.CONNECTED);
      },
      statusWatch: function statusWatch(event) {
        im.rtcInnerWatch({
          status: function status(_ref) {
            var _status = _ref.status;

            event(_status);
          }
        });
      },
      messageWatch: function messageWatch(event) {
        event = event || utils.noop;
        im.rtcInnerWatch({
          message: function message(_ref2) {
            var _message = _ref2.message;
            var name = _message.messageType,
                type = _message.type;

            var isRTCMsg = utils.isEqual(type, RongIMLib.CONVERSATION_TYPE.RTC_ROOM);
            isRTCMsg && event({
              name: name,
              uId: _message.messageUId,
              senderId: _message.senderUserId,
              content: _message.content
            });
          }
        });
      },
      joinRTCRoom: function joinRTCRoom(room) {
        var rtc = new im.RTC(room);
        return rtc.join();
      },
      quitRTCRoom: function quitRTCRoom(room) {
        var rtc = new im.RTC(room);
        return rtc.quit();
      },
      getRTCRoomInfo: function getRTCRoomInfo(room) {
        var rtc = new im.RTC(room);
        return rtc.getRoomInfo();
      },
      getRTCUserInfoList: function getRTCUserInfoList(room) {
        var rtc = new im.RTC(room);
        return rtc.getUserInfoList();
      },
      getRTCToken: function getRTCToken(room) {
        var rtc = new im.RTC(room);
        return rtc.getToken();
      },
      getNavi: function getNavi() {
        var appInfo = im.getAppInfo();
        return appInfo.navi;
      },
      getCurrentUserId: function getCurrentUserId() {
        return im.getConnectionUserId();
      },
      getCurrentConnectionStatus: function getCurrentConnectionStatus() {
        return im.getConnectionStatus();
      },
      setRTCUserInfo: function setRTCUserInfo(room, info) {
        var rtc = new im.RTC(room);
        return rtc.setUserInfo(info);
      },
      removeRTCUserInfo: function removeRTCUserInfo(room, info) {
        var rtc = new im.RTC(room);
        return rtc.removeUserInfo(info);
      },
      setRTCUserData: function setRTCUserData(id, key, value, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.setUserData(key, value, isInner, message);
      },
      /**
       * 全量 URI 资源发布
       * @param {string} roomId 房间 ID
       * @param {{ name: string, content: string }} message 旧版本消息，含消息名及消息内容
       * @param {string} valueInfo 全量消息数据
       * @param {string} objectName 全量 URI 消息名
       */
      setRTCUserTotalRes: function setRTCUserTotalRes(roomId, message, valueInfo, objectName) {
        var rtc = new im.RTC({ id: roomId });
        return rtc.setRTCUserData(message, valueInfo, objectName);
      },

      getRTCUserData: function getRTCUserData(id, keys, isInner) {
        var rtc = new im.RTC({ id: id });
        return rtc.getUserData(keys, isInner);
      },
      removeRTCUserData: function removeRTCUserData(id, keys, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.removeUserData(keys, isInner, message);
      },
      setRTCRoomData: function setRTCRoomData(id, key, value, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.setRoomData(key, value, isInner, message);
      },
      getRTCRoomData: function getRTCRoomData(id, keys, isInner) {
        var rtc = new im.RTC({ id: id });
        return rtc.getRoomData(keys, isInner);
      },
      removeRTCRoomData: function removeRTCRoomData(id, keys, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.removeRoomData(keys, isInner, message);
      },
      setRTCState: function setRTCState(room, content) {
        var rtc = new im.RTC(room);
        return rtc.setState(content);
      },
      getRTCUserList: function getRTCUserList(room) {
        var rtc = new im.RTC(room);
        return rtc.getUserList();
      },
      getAppInfo: function getAppInfo() {
        var appInfo = im.getAppInfo();
        return {
          appKey: appInfo.appkey
        };
      },
      RTCPing: function RTCPing(room) {
        var rtc = new im.RTC(room);
        return rtc.ping();
      },
      getIMVersion: function getIMVersion() {
        return RongIMLib.SDK_VERSION;
      },
      isSupportRTC: function isSupportRTC() {
        var isSupport = false;
        if (im.RTC) {
          isSupport = true;
        }
        return isSupport;
      },
      sendMessage: function sendMessage(message, roomId) {
        var name = message.name,
            content = message.content;

        var rtc = new im.RTC({ id: roomId });
        return rtc.send({
          messageType: name,
          content: content
        });
      }
    };
  };

  var get$1 = function get(option) {
    return isIMV3(option) ? getIMEventsByV3(option) : getIMEventsByV2(option);
  };

  var IMAdapt = {
    get: get$1
  };

  var Message = {
    PUBLISH: 'RTCPublishResourceMessage',
    UNPUBLISH: 'RTCUnpublishResourceMessage',
    MODIFY: 'RTCModifyResourceMessage',
    STATE: 'RTCUserChangeMessage',
    ROOM_NOTIFY: 'RTCRoomDataNotifyMessage',
    USER_NOTIFY: 'RTCUserDataNotifyMessage',
    KICK: 'RTCUserKickMessage'
  };

  var MessageName = {
    PUBLISH: 'RCRTC:PublishResource',
    UNPUBLISH: 'RCRTC:UnpublishResource',
    MODIFY: 'RCRTC:ModifyResource',
    STATE: 'RCRTC:state',
    ROOM_NOTIFY: 'RCRTC:RoomNtf',
    USER_NOTIFY: 'RCRTC:UserNtf',
    KICK: 'RCRTC:kick'
  };
  var Timeout = {
    TIME: 10 * 1000
  };
  var errorHandler = function errorHandler(code) {
    var error = ErrorType[code] || {
      code: code
    };
    return error;
  };
  var getMsgName = function getMsgName(type) {
    switch (type) {
      case Message.PUBLISH:
        return MessageName.PUBLISH;
      case Message.UNPUBLISH:
        return MessageName.UNPUBLISH;
      case Message.MODIFY:
        return MessageName.MODIFY;
      case Message.STATE:
        return MessageName.STATE;
      case Message.ROOM_NOTIFY:
        return MessageName.ROOM_NOTIFY;
      case Message.USER_NOTIFY:
        return MessageName.USER_NOTIFY;
      case Message.KICK:
        return MessageName.KICK;
    }
  };
  var IM = function (_EventEmitter) {
    inherits(IM, _EventEmitter);

    function IM(option) {
      classCallCheck(this, IM);

      var _this = possibleConstructorReturn(this, (IM.__proto__ || Object.getPrototypeOf(IM)).call(this));

      var timer = new utils.Timer({
        timeout: Timeout.TIME
      });
      var v2Users = utils.Cache();
      var context = _this;
      var isJoinRoom = false;
      utils.extend(context, {
        timer: timer,
        isJoinRoom: isJoinRoom,
        v2Users: v2Users,
        option: option
      });
      var im = IMAdapt.get(option);
      var CONNECTION_STATUS = im.CONNECTION_STATUS;
      var init = function init() {
        if (context.isJoinRoom) {
          context.rePing();
        }
        var urls = context.getMSUrl();
        var timeout = context.getRequestTimeout();
        !request$2.isUrlsExisted(urls) && request$2.addUrls(urls);
        request$2.setOption({ timeout: timeout });
      };
      var connectState = im.getCurrentConnectionStatus();
      utils.extend(context, {
        connectState: connectState,
        im: im
      });
      // 如果实例化 RongRTC 时，IM 已连接成功，主动触发内部 init
      if (im.isConnected()) {
        init();
      }
      im.statusWatch = im.statusWatch || utils.noop;
      im.statusWatch(function (status) {
        switch (status) {
          case CONNECTION_STATUS.CONNECTED:
            init();
            context.emit(CommonEvent.CONNECTED);
            break;
        }
        utils.extend(context, {
          connectState: status
        });
      });
      var roomEventHandler = function roomEventHandler(users) {
        utils.forEach(users, function (user) {
          var id = user.userId,
              state = user.state;

          switch (+state) {
            case UserState.JOINED:
              context.emit(DownEvent.ROOM_USER_JOINED, { id: id });
              break;
            case UserState.LEFT:
            case UserState.OFFLINE:
              Logger$1.log(LogTag.ROOM, {
                msg: 'room:member:left',
                user: user
              });
              context.emit(DownEvent.ROOM_USER_LEFT, { id: id });
              break;

            default:
              Logger$1.warn('UserState: unkown state ' + state);
          }
        });
      };
      im.messageWatch = im.messageWatch || utils.noop;
      im.messageWatch(function (message) {
        var name = message.name,
            id = message.senderId,
            _message$content = message.content,
            uris = _message$content.uris,
            users = _message$content.users;

        var user = { id: id };
        if (utils.isArray(uris)) {
          uris = utils.map(uris, function (uri) {
            var tag = uri.tag;

            if (isV2Tag(tag)) {
              utils.extend(uri, {
                tag: TAG_V2
              });
            }
            return uri;
          });
        }
        switch (name) {
          case MessageName.STATE:
            roomEventHandler(users);
            break;
          case MessageName.KICK:
            context.emit(DownEvent.ROOM_USER_KICK, { msg: ErrorType.Inner.ROOM_USER_KICK });
            break;
          case MessageName.PUBLISH:
            user = { id: id, uris: uris };
            if (utils.isInclude(id, '_')) {
              v2Users.set(id, true);
            }
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_PUBLISHED, user);
            });
            break;
          case MessageName.UNPUBLISH:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_UNPUBLISHED, user);
            });
            break;
          case MessageName.MODIFY:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              dispatchOperationEvent(user, function (event, user) {
                context.emit(event, user);
              });
            });
            break;
          default:
            context.emit(DownEvent.MESSAGE_RECEIVED, message);
        }
        Logger$1.log(LogTag.IM, {
          msg: 'receive:message',
          message: message
        });
      });
      return _this;
    }

    createClass(IM, [{
      key: 'joinRoom',
      value: function joinRoom(room) {
        var context = this;
        var im = context.im;

        utils.extend(context, {
          room: room,
          isJoinRoom: true
        });
        return im.joinRTCRoom(room).then(function (_ref) {
          var users = _ref.users,
              token = _ref.token,
              sessionId = _ref.sessionId;

          context.rtcPing(room);

          var _context$getUser = context.getUser(),
              currentUserId = _context$getUser.id;

          var tempUsers = utils.clone(users);
          Logger$1.log(LogTag.IM, {
            msg: 'join:room:inner:success',
            users: tempUsers
          });
          utils.forEach(tempUsers, function (tUser, userId) {
            tUser = tUser || {};
            // 过滤自己 utils.isEmpty(tUser) ||
            if (utils.isEqual(currentUserId, userId)) {
              delete users[userId];
            } else {
              var user = users[userId];
              var uris = user.uris;

              context.v2Users.set(userId, true);
              if (!utils.isUndefined(uris)) {
                uris = utils.parse(uris);
                utils.extend(user, {
                  uris: uris
                });
              }
            }
          });
          utils.extend(room, {
            rtcToken: token,
            users: users,
            sessionId: sessionId
          });
          context.emit(CommonEvent.JOINED, room);
          return users;
        }).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'leaveRoom',
      value: function leaveRoom() {
        var context = this;
        var im = context.im,
            room = context.room,
            timer = context.timer;

        timer.pause();
        utils.extend(context, {
          isJoinRoom: false
        });
        context.emit(CommonEvent.LEFT, room);
        return im.quitRTCRoom(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'getRoom',
      value: function getRoom() {
        var im = this.im,
            room = this.room;

        return im.getRTCRoomInfo(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'getUsers',
      value: function getUsers() {
        var im = this.im,
            room = this.room;

        return im.getRTCUserInfoList(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'getRTCToken',
      value: function getRTCToken() {
        var rtcToken = this.room.rtcToken;

        return rtcToken;
      }
    }, {
      key: 'getRTCTokenAsyn',
      value: function getRTCTokenAsyn(id) {
        var im = this.im,
            _option = this.option,
            mode = _option.mode,
            liveType = _option.liveType;

        return im.getRTCToken({
          id: id,
          mode: mode,
          broadcastType: liveType
        });
      }
    }, {
      key: 'getRoomId',
      value: function getRoomId() {
        var id = this.room.id;

        return id;
      }
    }, {
      key: 'getSessionId',
      value: function getSessionId() {
        var sessionId = this.room.sessionId;

        return sessionId;
      }
    }, {
      key: 'getNaviRTCInfo',
      value: function getNaviRTCInfo() {
        var im = this.im;

        var navi = im.getNavi();
        var rtcInfo = navi.voipCallInfo;

        rtcInfo = rtcInfo || '{"callEngine": [{}]}';
        rtcInfo = utils.parse(rtcInfo);
        var engines = rtcInfo.callEngine;
        var engine = utils.filter(engines, function (e) {
          return e.engineType === 4;
        })[0] || {};
        return engine;
      }
    }, {
      key: 'getRequestTimeout',
      value: function getRequestTimeout() {
        var engine = this.getNaviRTCInfo();
        var timeOut = engine.timeOut;

        if (timeOut && utils.isNumber(timeOut)) {
          timeOut = timeOut * 1000; // navi 下发单位为 s
        } else {
          timeOut = REQUEST_TIMEOUT;
        }
        return timeOut;
      }
    }, {
      key: 'getMSUrl',
      value: function getMSUrl() {
        var engine = this.getNaviRTCInfo();
        var urls = engine.backupMediaServer,
            mediaServer = engine.mediaServer;

        if (utils.isMiniprogram()) {
          return ['https://rtc-miniapp-wctgw-prod-bdcbj.ronghub.com/wechat'];
        }
        if (utils.isUndefined(urls)) {
          urls = [];
        }
        if (!utils.isUndefined(mediaServer)) {
          urls.unshift(mediaServer);
        }
        urls = utils.filter(urls, function (url) {
          return isValidMediaServer(url);
        });
        return urls;
      }
    }, {
      key: 'getUser',
      value: function getUser() {
        var user = this.room.user;

        return user;
      }
    }, {
      key: 'getUserId',
      value: function getUserId() {
        var im = this.im;

        return im.getCurrentUserId();
      }
    }, {
      key: 'setUserInfo',
      value: function setUserInfo(key, value) {
        var room = this.room,
            im = this.im;

        value = utils.toJSON(value);
        var info = {
          key: key,
          value: value
        };
        return im.setRTCUserInfo(room, info);
      }
    }, {
      key: 'removeUserInfo',
      value: function removeUserInfo(keys) {
        var room = this.room,
            im = this.im;

        var info = {
          keys: keys
        };
        return im.removeRTCUserInfo(room, info);
      }
    }, {
      key: 'setUserData',
      value: function setUserData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        value = utils.toJSON(value);
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'setUserData:before',
          roomId: id,
          value: value,
          message: message
        });
        return im.setRTCUserData(id, key, value, isInner, message).then(function () {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'setUserData:after',
            roomId: id,
            value: value,
            message: message
          });
          return;
        });
      }
    }, {
      key: 'getUserData',
      value: function getUserData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.getRTCUserData(id, keys, isInner);
      }
    }, {
      key: 'removeUserData',
      value: function removeUserData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.removeRTCUserData(id, keys, isInner, message);
      }
    }, {
      key: 'setRoomData',
      value: function setRoomData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        return im.setRTCRoomData(id, key, value, isInner, message);
      }
    }, {
      key: 'getRoomData',
      value: function getRoomData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.getRTCRoomData(id, keys, isInner);
      }
    }, {
      key: 'removeRoomData',
      value: function removeRoomData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.removeRTCRoomData(id, keys, isInner, message);
      }
    }, {
      key: 'getExistUsers',
      value: function getExistUsers() {
        var im = this.im,
            room = this.room;

        return im.getRTCUserList(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'sendMessage',
      value: function sendMessage(message) {
        var im = this.im,
            room = this.room;

        Logger$1.log(LogTag.IM, {
          msg: 'send:before',
          message: message
        });
        return im.sendMessage(message, room.id).then(function () {
          Logger$1.log(LogTag.IM, {
            msg: 'send:after',
            message: message
          });
          return room;
        }).catch(function (code) {
          Logger$1.log(LogTag.IM, {
            msg: 'send:after',
            error: code
          });
          return utils.Defer.reject(code);
        });
      }
    }, {
      key: 'getMessage',
      value: function getMessage(type, content) {
        var name = getMsgName(type);
        content = utils.toJSON(content);
        return {
          name: name,
          content: content
        };
      }
    }, {
      key: 'isIMReady',
      value: function isIMReady() {
        var context = this;
        var im = context.im;

        return context.connectState === im.CONNECTION_STATUS.CONNECTED;
      }
    }, {
      key: 'getAppInfo',
      value: function getAppInfo() {
        var context = this;
        var im = context.im;

        return im.getAppInfo();
      }
    }, {
      key: 'isJoined',
      value: function isJoined() {
        var context = this;
        return context.isJoinRoom;
      }
    }, {
      key: 'isSupportRTC',
      value: function isSupportRTC() {
        var context = this;
        var im = context.im;

        return im.isSupportRTC();
      }
    }, {
      key: 'rePing',
      value: function rePing() {
        var context = this;
        var timer = context.timer;

        var roomId = context.getRoomId();
        if (!utils.isUndefined(roomId)) {
          timer.pause();
          context.rtcPing({
            id: roomId
          });
        }
      }
    }, {
      key: 'rtcPing',
      value: function rtcPing(room) {
        var context = this;
        var im = context.im,
            timer = context.timer;

        var count = 0;
        var isPinging = false;
        var Status = {
          reset: function reset() {
            count = 0;
            isPinging = false;
          },
          sum: function sum() {
            count += 1;
          }
        };
        var Inner = ErrorType.Inner;

        timer.resume(function () {
          if (count > PingCount) {
            timer.pause();
            utils.extend(context, {
              isJoinRoom: false
            });
            im.isJoinedRTCRoom = false;
            context.emit(CommonEvent.LEFT);
            return context.emit(CommonEvent.ERROR, Inner.SOCKET_UNAVAILABLE);
          }
          // 如果上次 Ping 没有结束，累计 Ping 次数
          if (isPinging) {
            Status.sum();
          }
          isPinging = true;
          im.RTCPing(room).then(function () {
            Status.reset();
          }).catch(function (code) {
            Logger$1.error(LogTag.IM, {
              msg: 'RTC Ping Error' + code
            });
          });
        }, true);
      }
    }, {
      key: 'getIMVersion',
      value: function getIMVersion() {
        return this.im.getIMVersion();
      }
    }, {
      key: 'setRTCState',
      value: function setRTCState(content) {
        var im = this.im,
            room = this.room;

        return im.setRTCState(room, content);
      }
    }, {
      key: 'isCompatibleIM',
      value: function isCompatibleIM(key) {
        var context = this;
        var im = context.im;

        var imInstance = im.getInstance();
        if (imInstance[key]) {
          return true;
        }
        Logger$1.warn(LogTag.IM, {
          msg: 'Low version IM SDK is not supported, please update IM SDK'
        });
        return false;
      }
    }]);
    return IM;
  }(EventEmitter);

  var Path = {
    PUBLISH: '/exchange',
    UNPUBLISH: '/exchange',
    RESIZE: '/exchange',
    SUBSCRIBE: '/exchange',
    ONLY_SUBSCRIBE: '/subscribe',
    UNSUBSCRIBE: '/exchange',
    LIVE_SUBSCRIBE: '/broadcast/subscribe', // 直播模式, 订阅接口
    LIVE_CONFIG: '/server/mcu/config', // 直播模式, 自定义更改配置接口
    LIVE_EXIT: '/broadcast/exit', // 直播模式, 退出接口
    EXIT: '/exit'
  };

  var PeerConnection = function (_EventEmitter) {
    inherits(PeerConnection, _EventEmitter);

    function PeerConnection(option) {
      classCallCheck(this, PeerConnection);

      var _this = possibleConstructorReturn(this, (PeerConnection.__proto__ || Object.getPrototypeOf(PeerConnection)).call(this));

      var context = _this;
      utils.extend(context, {
        option: option
      });
      return _this;
    }

    createClass(PeerConnection, [{
      key: 'getStreamId',
      value: function getStreamId(user, size) {
        var tpl = '{userId}_{tag}';
        var userId = user.id,
            stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }

        var _stream = stream,
            _stream2 = slicedToArray(_stream, 1),
            tag = _stream2[0].tag;

        if (utils.isEqual(size, StreamSize.MIN)) {
          tpl = '{userId}_{tag}_{suffix}';
        }
        if (isV2Tag(tag)) {
          return userId;
        }
        return utils.tplEngine(tpl, {
          userId: userId,
          tag: tag,
          suffix: MIN_STREAM_SUFFIX
        });
      }
    }, {
      key: 'getTagByStreamId',
      value: function getTagByStreamId(id) {
        var details = id.split('_');
        return details[details.length - 1];
      }
    }, {
      key: 'getUserIdByStreamId',
      value: function getUserIdByStreamId(id) {
        var details = id.split('_');
        details.pop();
        return details.join('_');
      }
    }, {
      key: 'getStreamSymbolById',
      value: function getStreamSymbolById(id) {
        var connector = '_';
        var details = id.split(connector);
        if (utils.isEqual(details.length, 1)) {
          details.push(TAG_V2);
          return details;
        }
        var tag = details.pop();
        var userId = details.join(connector);
        return [userId, tag];
      }
    }]);
    return PeerConnection;
  }(EventEmitter);

  var DataCacheName = {
    USERS: 'room_users',
    // 全部通知后一次性交换 SDP
    IS_NOTIFY_READY: 'is_notify_ready'
  };

  var getUser = function getUser(im) {
    return {
      SET_USERINFO: 'uris',
      set: function set$$1(key, data, isInner, message) {
        return im.setUserData(key, data, isInner, message);
      }
    };
  };

  var getUserMedia = function getUserMedia(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
      return { mediaStream: mediaStream };
    });
  };

  var getScreen = function getScreen(constraints) {
    var _constraints = constraints,
        desktopStreamId = _constraints.desktopStreamId;

    if (!desktopStreamId) {
      var _Inner = ErrorType.Inner;

      return utils.Defer.reject(_Inner.STREAM_DESKTOPID_ILLEGAL);
    }
    constraints = {
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: desktopStreamId
        }
      }
    };
    return getUserMedia(constraints);
  };

  var getMS = function getMS(constraints) {
    if (utils.isEmpty(constraints)) {
      constraints = {
        video: true,
        audio: true
      };
    }
    var _constraints2 = constraints,
        video = _constraints2.video;

    if (utils.isObject(video)) {
      video = utils.extend(DEFAULT_MS_PROFILE, video);
    }
    if (utils.isBoolean(video) && video) {
      video = DEFAULT_MS_PROFILE;
    }
    utils.extend(constraints, {
      video: video
    });
    return getUserMedia(constraints);
  };

  var getRTMP = function getRTMP(msid, user) {
    var _user$stream = user.stream,
        mediaType = _user$stream.type,
        _user$stream$resoluti = _user$stream.resolution,
        resolution = _user$stream$resoluti === undefined ? '640X480' : _user$stream$resoluti;

    var rtmp = {
      msid: msid,
      mediaType: mediaType
    };
    if (utils.isEqual(mediaType, StreamType.VIDEO)) {
      utils.extend(rtmp, { resolution: resolution });
    }
    return [rtmp];
  };

  var DefaultStream = function () {
    function DefaultStream(im, option) {
      classCallCheck(this, DefaultStream);

      var self = this;

      self.StreamCache = utils.Cache(); // 缓存已订阅 MediaStream, 规则 userId_type: mediaStream, 方便视频流操作
      self.DataCache = utils.Cache();
      self.MiniDataCache = utils.Cache();
      self.PubResourceCache = utils.Cache(); // 缓存发布资源
      self.PubRTMPCache = utils.Cache(); // 缓存发布资源
      self.RTMP_CACHE_KEY = 'pub_rtmp_key';

      self.subCache = utils.Cache(); // 缓存订阅关系，每次修改需同步全量数据. userId: [{ streamId: '', uri: '', type: 1, tag: ''}]
      self.subscribeRTMPCache = utils.Cache(); // 缓存订阅关系，每次修改需同步全量数据. userId: [{ streamId: '', uri: '', type: 1, tag: ''}]
      var detect = option.detect;

      var pc = new PeerConnection();
      utils.extend(self, {
        pc: pc,
        option: option,
        im: im
      });

      self.User = getUser(im);
      self.SubscribeCache = {
        get: function get$$1(userId) {
          return self.subCache.get(userId);
        },
        set: function set$$1(userId, subs) {
          return self.subCache.set(userId, subs);
        },
        getKeys: function getKeys() {
          return self.subCache.getKeys();
        },
        remove: function remove(user) {
          var pc = self.pc;
          var userId = user.id;

          var subs = self.subCache.get(userId) || [];
          var streamId = pc.getStreamId(user);
          subs = utils.filter(subs, function (_ref) {
            var msid = _ref.msid;

            return !utils.isEqual(streamId, msid);
          });
          self.subCache.set(userId, subs);
        },
        clear: function clear() {
          self.subCache.clear();
        },
        setState: function setState(userId, option) {
          option = option || {};
          var _option = option,
              type = _option.type,
              state = _option.state;

          var subs = self.SubscribeCache.get(userId);
          utils.forEach(subs, function (sub, index) {
            var subType = sub.type;

            if (utils.isEqual(type, subType)) {
              subs[index].state = state;
            }
          });
        }
      };

      im.on(CommonEvent.CONNECTED, function () {
        var DataCache = self.DataCache;

        var users = DataCache.get(DataCacheName.USERS);
      });

      im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
        if (error) {
          throw error;
        }
        // 缓存 URIs 上报数据
        var stream = user.stream;

        im.emit(CommonEvent.SET_URIS, stream.uris);
        self.dispatchStreamEvent(user, function (key, uri) {
          self.DataCache.set(key, uri);
        });
      });

      im.on(CommonEvent.LEFT, function () {
        var StreamCache = self.StreamCache;

        var streamIds = StreamCache.getKeys();
        utils.forEach(streamIds, function (streamId) {
          var stream = StreamCache.get(streamId);
          var tracks = stream.getTracks();
          utils.forEach(tracks, function (track) {
            track.stop();
          });
        });
        self.clear();
      });

      im.on(CommonEvent.JOINED, function (error, room) {
        if (error) {
          throw error;
        }
        var users = room.users;

        self.usersHandler(users);
        Logger$1.log(LogTag.ROOM, {
          msg: 'join successfully',
          room: room
        });
      });

      im.on(DownEvent.ROOM_USER_LEFT, function (error, user) {
        if (error) {
          throw error;
        }
        var users = self.getUsersById(user);
        utils.forEach(users, function (user) {
          self.unsubscribe(user);
        });
      });

      im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
        if (error) {
          throw error;
        }
        self.dispatchStreamEvent(user, function (key) {
          self.DataCache.remove(key);
        });
        self.unsubscribe(user);
      });

      im.on(DownEvent.STREAM_DISABLED, function (error, user) {
        var pc = self.pc,
            StreamCache = self.StreamCache;

        var streamId = pc.getStreamId(user);
        var stream = StreamCache.get(streamId);
        self.SubscribeCache.setState(user.id, {
          type: StreamType.VIDEO,
          state: StreamState.DISBALE
        });
        if (!stream) return;
        var videoTracks = stream.getVideoTracks();
        utils.forEach(videoTracks, function (track) {
          track.enabled = false;
        });
      });

      im.on(DownEvent.STREAM_ENABLED, function (error, user) {
        var pc = self.pc,
            StreamCache = self.StreamCache;

        var streamId = pc.getStreamId(user);
        var stream = StreamCache.get(streamId);
        self.SubscribeCache.setState(user.id, {
          type: StreamType.VIDEO,
          state: StreamState.ENABLE
        });
        if (!stream) return;
        var videoTracks = stream.getVideoTracks();
        utils.forEach(videoTracks, function (track) {
          track.enabled = true;
        });
      });

      im.on(DownEvent.STREAM_MUTED, function (error, user) {
        self.SubscribeCache.setState(user.id, {
          type: StreamType.AUDIO,
          state: StreamState.DISABLE
        });
      });

      im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
        self.SubscribeCache.setState(user.id, {
          type: StreamType.AUDIO,
          state: StreamState.ENABLE
        });
      });
    }

    /* 清空缓存数据 */


    createClass(DefaultStream, [{
      key: 'clear',
      value: function clear() {
        var self = this;
        self.DataCache.clear();
        self.PubResourceCache.clear();
        self.StreamCache.clear();
        self.SubscribeCache.clear();
        self.subscribeRTMPCache.clear();
      }
    }, {
      key: 'getUsersById',
      value: function getUsersById(user) {
        var SubscribeCache = this.SubscribeCache;
        var id = user.id;

        var subs = SubscribeCache.get(id);
        var streams = {},
            msTypes = {};
        utils.forEach(subs, function (_ref2) {
          var msid = _ref2.msid,
              tag = _ref2.tag,
              type = _ref2.type;

          streams[msid] = tag;
          var types = msTypes[msid] || [];
          types.push(type);
          msTypes[msid] = types;
        });
        var users = [];
        utils.forEach(streams, function (tag, msid) {
          var types = msTypes[msid] || [];
          var type = msTypes[0];
          type = utils.isEqual(types.length, 2) ? StreamType.AUDIO_AND_VIDEO : type;
          users.push({
            id: id,
            stream: {
              tag: tag,
              type: type
            }
          });
        });
        return users;
      }

      /* 可共用 */

    }, {
      key: 'getUId',
      value: function getUId(user, tpl) {
        tpl = tpl || '{userId}_{tag}_{type}';
        var userId = user.id,
            _user$stream2 = user.stream,
            tag = _user$stream2.tag,
            type = _user$stream2.type;

        if (utils.isEmpty(tag)) {
          tpl = '{userId}_{type}';
        }
        return utils.tplEngine(tpl, {
          userId: userId,
          tag: tag,
          type: type
        });
      }

      /* 获取缓存的所有 subs */

    }, {
      key: 'getSubs',
      value: function getSubs() {
        var self = this;
        var SubscribeCache = self.SubscribeCache;

        var subs = [];
        var userIds = SubscribeCache.getKeys();
        utils.forEach(userIds, function (userId) {
          var streams = SubscribeCache.get(userId);
          utils.forEach(streams, function (stream) {
            subs.push(stream);
          });
        });
        return subs;
      }
    }, {
      key: 'getRTCMPSubs',
      value: function getRTCMPSubs() {
        var self = this;
        var subscribeRTMPCache = self.subscribeRTMPCache;

        var subs = [];
        var userIds = subscribeRTMPCache.getKeys();
        utils.forEach(userIds, function (userId) {
          var streams = subscribeRTMPCache.get(userId);
          utils.forEach(streams, function (stream) {
            subs.push(stream);
          });
        });
        return subs;
      }
      /* 获取请求 body 体 */

    }, {
      key: 'getBody',
      value: function getBody(user) {
        var self = this;
        var subs = self.getSubs();

        var rtmp = self.PubRTMPCache.get(self.RTMP_CACHE_KEY) || [];
        var body = {
          rtmp: rtmp,
          subscribeList: subs
        };
        return body;
      }
    }, {
      key: 'getUris',
      value: function getUris(publishList) {
        var pc = this.pc;

        return utils.map(publishList, function (stream) {
          var msid = stream.msid;

          var tag = pc.getTagByStreamId(msid);
          utils.extend(stream, {
            tag: tag,
            state: StreamState.ENABLE
          });
          return stream;
        });
      }

      /* 获取流 track 的可用状态, 格式为: { video: false, audio: true }. 可共用 */

    }, {
      key: 'getTrackState',
      value: function getTrackState(streams) {
        if (!utils.isArray(streams)) {
          streams = [streams];
        }
        var result = {};
        utils.forEach(streams, function (_ref3) {
          var mediaStream = _ref3.mediaStream;
          var streamId = mediaStream.streamId;

          var videoTracks = mediaStream.getVideoTracks();
          var audioTracks = mediaStream.getAudioTracks();
          var func = function func(track) {
            return utils.isEqual(track.enabled, false);
          };
          var video = StreamState.ENABLE;
          if (utils.some(videoTracks, func)) {
            video = StreamState.DISBALE;
          }
          var audio = StreamState.ENABLE;
          if (utils.some(audioTracks, func)) {
            audio = StreamState.DISBALE;
          }
          result[streamId] = {
            video: video,
            audio: audio
          };
        });
        return result;
      }
    }, {
      key: 'dispatchStreamEvent',
      value: function dispatchStreamEvent$$1(user, callback) {
        var self = this;
        var id = user.id,
            uris = user.stream.uris;

        utils.forEach(uris, function (uri) {
          var tag = uri.tag,
              type = uri.mediaType;

          var key = self.getUId({ id: id, stream: { tag: tag, type: type } });
          callback(key, uri);
        });
      }
    }, {
      key: 'updateTrackState',
      value: function updateTrackState(user, sendUris, uris) {
        var self = this;
        var streams = user.stream;

        var states = self.getTrackState(streams);
        var update = function update(_uris) {
          utils.forEach(states, function (_ref4, streamId) {
            var audio = _ref4.audio,
                video = _ref4.video;

            utils.map(_uris, function (uri) {
              var isSameStream = utils.isEqual(uri.msid, streamId);
              if (isSameStream && utils.isEqual(uri.mediaType, StreamType.VIDEO)) {
                utils.extend(uri, {
                  state: video
                });
              }
              if (isSameStream && utils.isEqual(uri.mediaType, StreamType.AUDIO)) {
                utils.extend(uri, {
                  state: audio
                });
              }
              return uri;
            });
          });
        };
        update(sendUris);
        update(uris);
        return {
          sendUris: sendUris,
          uris: uris
        };
      }
    }, {
      key: 'appendStreamId',
      value: function appendStreamId(user) {
        var pc = this.pc;
        var id = user.id;
        var streams = user.stream;

        if (!utils.isArray(streams)) {
          streams = [streams];
        }
        utils.map(streams, function (stream) {
          var streamId = pc.getStreamId({
            id: id,
            stream: stream
          });
          utils.extend(stream, {
            streamId: streamId
          });
        });
      }
    }, {
      key: 'usersHandler',
      value: function usersHandler(users) {
        var self = this;
        var DataCache = self.DataCache,
            im = self.im;

        DataCache.set(DataCacheName.USERS, users);

        var _im$getUser = im.getUser(),
            currentUserId = _im$getUser.id;

        utils.forEach(users, function (data, id) {
          var uris = data.uris;

          if (utils.isUndefined(uris)) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'user exist, uris is empty',
              user: {
                id: id
              }
            });
            return;
          }
          if (utils.isEqual(currentUserId, id)) {
            var _uris2 = slicedToArray(uris, 1),
                stream = _uris2[0];

            if (utils.isUndefined(stream)) {
              return;
            }
            var type = stream.mediaType,
                tag = stream.tag;

            type = utils.isEqual(uris.length, 1) ? type : StreamType.AUDIO_AND_VIDEO;
            var currentUser = {
              id: id,
              stream: {
                tag: tag,
                type: type
              }
            };
            return self.unpublish(currentUser); // 会议内已有自己, 先 unpublish
          }
          utils.forEach(uris, function (uri) {
            var type = uri.mediaType,
                tag = uri.tag;

            var key = self.getUId({
              id: id,
              stream: {
                type: type,
                tag: tag
              }
            });
            DataCache.set(key, uri);
          });
          var streams = utils.uniq(uris, function (target) {
            var tag = target.tag;

            var streamId = target.msid || target.streamId;
            if (isV2Tag(tag)) {
              tag = TAG_V2;
            }
            return {
              key: [streamId].join('_'),
              value: {
                tag: tag
              }
            };
          });
          utils.forEach(streams, function (stream) {
            var tag = stream.tag;

            var msUris = utils.filter(uris, function (_ref5) {
              var msid = _ref5.msid;

              return utils.isInclude(msid, tag);
            });
            setTimeout(function () {
              im.emit(DownEvent.STREAM_PUBLISHED, {
                id: id,
                stream: {
                  tag: tag,
                  uris: msUris
                }
              });
            });
          });
        });
      }
    }, {
      key: 'exchangeHandler',
      value: function exchangeHandler(result, user, type) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            PubResourceCache = self.PubResourceCache,
            User = self.User;
        var publishList = result.publishList,
            rtmpSubscribeList = result.rtmpSubscribeList;

        var uris = self.getUris(publishList);
        self.appendStreamId(user);
        var getTempUris = function getTempUris(type) {
          var userId = user.id;

          var cacheUris = PubResourceCache.get(userId) || [];
          var isPublish = utils.isEqual(type, Message.PUBLISH);
          if (isPublish) {
            cacheUris = uris;
          }
          var streamId = pc.getStreamId(user);
          var getCondition = function getCondition(stream) {
            var msid = stream.msid;

            return utils.isEqual(msid, streamId);
          };
          var tempUris = utils.filter(cacheUris, function (stream) {
            return getCondition(stream);
          });
          // 第一次 publish 过滤后 tempUris 为空，使用默认值
          return utils.isEmpty(tempUris) ? uris : tempUris;
        };
        var sendUris = getTempUris(type);
        var content = {
          uris: sendUris
        };
        var message = im.getMessage(type, content);
        var isInner = true;
        User.set(User.SET_USERINFO, uris, isInner, message);
        return PubResourceCache.set(user.id, uris);
      }
    }, {
      key: 'publish',
      value: function publish(user) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            StreamCache = self.StreamCache,
            option = self.option;
        var stream = user.stream,
            type = user.stream.type;


        var roomId = im.getRoomId();
        var msid = pc.getStreamId(user);
        var rtmp = getRTMP(msid, user);
        self.PubRTMPCache.set(self.RTMP_CACHE_KEY, rtmp);
        return utils.deferred(function (resolve, reject) {
          var body = self.getBody(user);
          var url = utils.tplEngine(Path.PUBLISH, {
            roomId: roomId
          });
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publish:request',
            roomId: roomId,
            user: user,
            body: body
          });
          var headers = getHeaders(im, option);
          return request$2.post({
            path: url,
            body: body,
            headers: headers
          }).then(function (response) {
            var publishList = response.publishList,
                urls = response.urls,
                clusterId = response.clusterId,
                rtmpPublishList = response.rtmpPublishList;
            urls = urls || {};
            if (utils.isArray(publishList)) {
              im.emit(CommonEvent.SET_URIS, publishList);
            }
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'publish:response',
              roomId: roomId,
              user: user,
              response: response
            });
            utils.extend(user.stream, {
              rtmpPublishList: rtmpPublishList
            });
            self.exchangeHandler(response, user, Message.PUBLISH);
            clusterId && request$2.addUrl(clusterId);
            var rtmp = rtmpPublishList.filter(function (rtmp) {
              return utils.isEqual(rtmp.msid, msid);
            })[0];
            if (rtmp) {
              var uri = rtmp.uri;

              return resolve({
                id: user.id,
                stream: {
                  type: type,
                  tag: stream.tag,
                  uri: uri
                }
              });
            } else {
              reject(ErrorType.Inner.MINI_PUBLISH_ERROR);
            }
          }, function (error) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'publish:response:error',
              roomId: roomId,
              user: user,
              error: error
            });
            reject(error);
          });
        });
      }
    }, {
      key: 'unpublish',
      value: function unpublish(user) {
        var self = this;
        var im = self.im,
            pc = self.pc,
            option = self.option,
            StreamCache = self.StreamCache;


        user = utils.clone(user);
        var streamId = pc.getStreamId(user);
        var mediaStream = StreamCache.get(streamId);
        if (!mediaStream) {
          mediaStream = new MediaStream();
        }
        var streams = [];
        var _user = user,
            stream = _user.stream;

        var tinyStream = utils.clone(stream);
        var _user2 = user,
            id = _user2.id;

        stream = utils.extend(stream, {
          mediaStream: mediaStream
        });
        streams.push(stream);

        var tinyStreamId = pc.getStreamId({
          id: id,
          stream: tinyStream
        }, StreamSize.MIN);
        var tinyMeidaStream = StreamCache.get(tinyStreamId);
        if (tinyMeidaStream) {
          tinyStream = utils.extend(tinyStream, {
            mediaStream: tinyMeidaStream
          });
          streams.push(tinyStream);
        }
        utils.extend(user, {
          stream: streams
        });
        var roomId = im.getRoomId();
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unpublish:start',
          roomId: roomId,
          user: user
        });
        StreamCache.remove(streamId);
        var trackIds = getTrackIds(user);
        im.emit(CommonEvent.SEND_REPORT, {
          type: STAT_NAME.R2,
          name: UpEvent.STREAM_UNPUBLISH,
          content: {
            trackIds: trackIds
          }
        });
        var body = self.getBody(user);
        var url = utils.tplEngine(Path.UNPUBLISH, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unpublish:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders(im, option);
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unpublish:response',
            roomId: roomId,
            user: user,
            response: response
          });
          self.exchangeHandler(response, user, Message.UNPUBLISH);
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unpublish:response',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      }
    }, {
      key: 'publishDefault',
      value: function publishDefault(constraints) {
        var self = this;
        return getMS(constraints).then(function (_ref6) {
          var mediaStream = _ref6.mediaStream;

          var user = {
            id: constraints.userId,
            stream: {
              tag: 'RongCloudRTC',
              type: constraints.type,
              mediaStream: mediaStream
            }
          };
          return self.publish(user).then(function () {
            return utils.Defer.resolve({ mediaStream: mediaStream });
          });
        }, function (error) {
          utils.Defer.reject(Inner.STREAM_TRACK_NOT_EXIST);
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(user, callback) {
        var self = this;
        var im = self.im,
            option = self.option,
            SubscribeCache = self.SubscribeCache,
            DataCache = self.DataCache,
            pc = self.pc;
        var userId = user.id,
            _user$stream3 = user.stream,
            tag = _user$stream3.tag,
            type = _user$stream3.type;

        var subs = SubscribeCache.get(userId) || [];
        var types = [StreamType.VIDEO, StreamType.AUDIO];
        if (!utils.isEqual(type, StreamType.AUDIO_AND_VIDEO)) {
          types = [type];
        }

        utils.forEach(types, function (type) {
          var tUser = {
            id: userId,
            stream: {
              tag: tag,
              type: type
            }
          };
          var key = self.getUId(tUser);
          var uri = DataCache.get(key);
          var isAdd = true;
          utils.forEach(subs, function (sub) {
            var existType = sub.type,
                existTag = sub.tag;

            if (isV2Tag(existTag)) {
              tag = TAG_V2;
            }
            var isExist = utils.isEqual(type, existType) && utils.isEqual(tag, existTag);
            if (isExist) {
              isAdd = false;
            }
          });
          if (isAdd && !utils.isUndefined(uri)) {
            uri = utils.clone(uri);
            uri = utils.rename(uri, {
              mediaType: 'type'
            });
            if (uri.type == StreamType.VIDEO) {
              uri.simulcast = StreamSize.MIN;
            }
            subs.push(uri);
          }
        });
        var roomId = im.getRoomId();
        var url = utils.tplEngine(Path.SUBSCRIBE, {
          roomId: roomId
        });
        SubscribeCache.set(userId, subs);
        return utils.deferred(function (resolve, reject) {
          var body = self.getBody(user);
          var headers = getHeaders(im, option);
          var reqOption = {
            path: url,
            body: body,
            headers: headers
          };
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'subscribe:request',
            roomId: roomId,
            reqOption: reqOption
          });
          request$2.post(reqOption).then(function (response) {
            var answer = response.sdp;

            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'subscribe:response',
              roomId: roomId,
              user: user,
              response: response
            });
            var _response$rtmpSubscri = response.rtmpSubscribeList,
                rtmpSubscribeList = _response$rtmpSubscri === undefined ? [] : _response$rtmpSubscri;

            var rtmp = rtmpSubscribeList.filter(function (item) {
              var _userId = pc.getUserIdByStreamId(item.msid);
              return utils.isEqual(_userId, userId);
            })[0] || {};
            var uri = rtmp.uri;

            resolve({
              id: userId,
              stream: { type: type, tag: tag, uri: uri }
            });
            callback();
          }, function (error) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'subscribe:response:error',
              roomId: roomId,
              user: user,
              error: error
            });
            reject(error);
          });
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(user) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            option = self.option,
            SubscribeCache = self.SubscribeCache;


        if (utils.isNull(pc) || !SubscribeCache.get(user.id)) {
          return utils.Defer.resolve();
        }
        SubscribeCache.remove(user);
        var roomId = im.getRoomId();
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unsubscribe:start',
          roomId: roomId,
          user: user
        });
        var trackIds = getTrackIds(user);
        im.emit(CommonEvent.SEND_REPORT, {
          type: STAT_NAME.R2,
          name: UpEvent.STREAM_UNSUBSCRIBE,
          content: {
            trackIds: trackIds
          }
        });

        var body = self.getBody(user);
        var url = utils.tplEngine(Path.UNSUBSCRIBE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unsubscribe:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders(im, option);
        // let { sdp: offer } = body;
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response',
            roomId: roomId,
            user: user,
            response: response
          });
        }, function (error) {
          Logger$1.error(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response:error',
            roomId: roomId,
            user: user,
            error: error
          });
        }).catch(function (error) {
          Logger$1.error(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response:error',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      }
    }, {
      key: 'resize',
      value: function resize(user) {
        var self = this;
        var im = self.im,
            pc = self.pc,
            option = self.option,
            SubscribeCache = self.SubscribeCache;
        var size = user.stream.size,
            id = user.id;

        var streams = SubscribeCache.get(id);
        if (utils.isUndefined(streams)) {
          return utils.Defer.reject(ErrorType.Inner.STREAM_NOT_EXIST);
        }
        var roomId = im.getRoomId();
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'resize:start',
          roomId: roomId,
          user: user
        });
        var body = self.getBody(user);
        var streamId = pc.getStreamId(user);
        var stream = utils.filter(streams, function (stream) {
          var msid = stream.msid;

          return utils.isEqual(streamId, msid);
        })[0];
        if (!stream) {
          var error = ErrorType.Inner.STREAM_NOT_EXIST;
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            error: error
          });
          return utils.Defer.reject(error);
        }
        var uri = stream.uri;

        utils.forEach(body.subscribeList, function (stream) {
          if (utils.isEqual(stream.uri, uri)) {
            utils.extend(stream, {
              simulcast: size
            });
          }
        });
        var url = utils.tplEngine(Path.RESIZE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'resize:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders(im, option);
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            response: response
          });
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      }
    }, {
      key: 'get',
      value: function get$$1(constraints) {
        constraints = constraints || {};
        var _constraints3 = constraints,
            screen = _constraints3.screen;

        return screen ? getScreen(constraints) : getMS(constraints);
      }
    }, {
      key: 'setMixConfig',
      value: function setMixConfig(config) {
        var im = this.im,
            option = this.option;

        var domains = request$2.getOption().mcuUrls || [];
        if (utils.isEmpty(domains)) {
          return utils.Defer.reject(ErrorType.Inner.MUST_PUBLISHED_BEFORE_SETMIXCONFIG);
        }

        var url = Path.LIVE_CONFIG;
        var sessionId = im.getSessionId();
        var headers = getHeaders(im, option, {
          SessionId: sessionId
        });
        headers['AppKey'] = headers['App-Key'];
        delete headers['App-Key'];

        var body = formatLiveConfig(config);

        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'setMixConfig:request',
          headers: headers,
          body: body
        });
        return request$2.post({
          urls: domains,
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'setMixConfig:response',
            headers: headers,
            body: body,
            response: response
          });
          return response;
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'setMixConfig:error',
            headers: headers,
            body: body,
            error: error
          });
          return error;
        });
      }
    }, {
      key: 'trackHandler',
      value: function trackHandler(user, type, isEnable) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            StreamCache = self.StreamCache;

        var streamId = pc.getStreamId(user);
        var stream = StreamCache.get(streamId);
        if (stream) {
          var isAudio = utils.isEqual(type, StreamType.AUDIO);
          type = isAudio ? 'Audio' : 'Video';
          var tpl = 'get{type}Tracks';
          type = utils.tplEngine(tpl, {
            type: type
          });
          var tracks = stream[type]();
          utils.forEach(tracks, function (track) {
            im.emit(CommonEvent.TRACK_MODIFY, {
              id: track.id,
              isEnable: isEnable
            });
            track.enabled = isEnable;
          });
        }
      }
    }, {
      key: 'getFitUris',
      value: function getFitUris(user, type, state) {
        var self = this;
        var PubResourceCache = self.PubResourceCache,
            pc = self.pc;
        var id = user.id;

        var uris = PubResourceCache.get(id) || [];
        var targetId = pc.getStreamId(user);
        uris = utils.filter(uris, function (stream) {
          var msid = stream.msid,
              mediaType = stream.mediaType;

          var isSameStream = utils.isEqual(targetId, msid),
              isSameType = utils.isEqual(mediaType, type);
          var isFit = isSameStream && isSameType;
          // state 默认为 StreamState.ENABLE，为 DISABLE 未发布资源
          if (isFit) {
            utils.extend(stream, {
              state: state
            });
          }
          return isFit;
        });
        return uris;
      }
    }, {
      key: 'saveModify',
      value: function saveModify(user, type, state) {
        var self = this;
        var im = self.im,
            PubResourceCache = self.PubResourceCache,
            User = self.User;

        var uris = self.getFitUris(user, type, state);
        // uris 为空表示没有发布资源，不需要修改
        if (!utils.isEmpty(uris)) {
          var id = user.id;

          var fullUris = PubResourceCache.get(id);
          var content = {
            uris: uris
          };
          var message = im.getMessage(Message.MODIFY, content);
          var isInner = true;
          User.set(User.SET_USERINFO, fullUris, isInner, message);
        }
        return utils.Defer.resolve();
      }
    }, {
      key: 'isCurrentUser',
      value: function isCurrentUser(user) {
        var im = this.im;

        var _im$getUser2 = im.getUser(),
            id = _im$getUser2.id;

        return utils.isEqual(user.id, id);
      }
    }, {
      key: 'modifyTrack',
      value: function modifyTrack(user, type, state, isEnabled) {
        var self = this;
        self.trackHandler(user, type, isEnabled);
        if (self.isCurrentUser(user)) {
          self.saveModify(user, type, state);
        }
        return utils.Defer.resolve();
      }
    }, {
      key: 'mute',
      value: function mute(user) {
        var isEnabled = false;
        return this.modifyTrack(user, StreamType.AUDIO, StreamState.DISBALE, isEnabled);
      }
    }, {
      key: 'unmute',
      value: function unmute(user) {
        var isEnabled = true;
        return this.modifyTrack(user, StreamType.AUDIO, StreamState.ENABLE, isEnabled);
      }
    }, {
      key: 'enable',
      value: function enable(user) {
        var isEnabled = true;
        return this.modifyTrack(user, StreamType.VIDEO, StreamState.ENABLE, isEnabled);
      }
    }, {
      key: 'disable',
      value: function disable(user) {
        var isEnabled = false;
        return this.modifyTrack(user, StreamType.VIDEO, StreamState.DISBALE, isEnabled);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var self = this;
        var pc = self.pc,
            im = self.im;

        self.clear();
      }
    }]);
    return DefaultStream;
  }();

  function StreamHandler(im, option, rongRTC) {

    var prosumer = new utils.Prosumer();
    var eventEmitter = new EventEmitter();

    var stream = void 0;

    var reloadStream = function reloadStream() {
      if (stream) {
        stream.destroy();
      }
      stream = new DefaultStream(im, option);
    };

    reloadStream();

    im.on(CommonEvent.CHANGE_ROLE, function (error, roles) {
      var newRole = roles.newRole,
          oldRole = roles.oldRole;
      // 当由观众转化为主播时

      if (isAudienceToAnchor(newRole, oldRole)) {
        reloadStream();
      }
    });

    eventEmitter.on(CommonEvent.CONSUME, function () {
      prosumer.consume(function (_ref, next) {
        var _stream, _stream2, _stream3, _stream4, _stream5, _stream6, _stream7, _stream8, _stream9, _stream10, _stream11, _stream12;

        var event = _ref.event,
            args = _ref.args,
            resolve = _ref.resolve,
            reject = _ref.reject;

        switch (event) {
          case UpEvent.STREAM_PUBLISH:
            return (_stream = stream).publish.apply(_stream, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_PUBLISH_DEFAULT:
            return (_stream2 = stream).publishDefault.apply(_stream2, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNPUBLISH:
            return (_stream3 = stream).unpublish.apply(_stream3, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_SUBSCRIBE:
            return (_stream4 = stream).subscribe.apply(_stream4, toConsumableArray(args).concat([function () {
              next();
            }])).then(function (result) {
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNSUBSCRIBE:
            return (_stream5 = stream).unsubscribe.apply(_stream5, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_RESIZE:
            return (_stream6 = stream).resize.apply(_stream6, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_GET:
            return (_stream7 = stream).get.apply(_stream7, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_MUTE:
            return (_stream8 = stream).mute.apply(_stream8, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_UNMUTE:
            return (_stream9 = stream).unmute.apply(_stream9, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_DISABLE:
            return (_stream10 = stream).disable.apply(_stream10, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_ENABLE:
            return (_stream11 = stream).enable.apply(_stream11, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.LIVE_CONFIG:
            return (_stream12 = stream).setMixConfig.apply(_stream12, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          default:
            Logger$1.warn(LogTag.STREAM_HANDLER, {
              event: event,
              msg: 'unkown event'
            });
        }
      });
    });

    var dispatch = function dispatch(event, args) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({ event: event, args: args, resolve: resolve, reject: reject });
        eventEmitter.emit(CommonEvent.CONSUME);
      });
    };
    return {
      dispatch: dispatch
    };
  }

  function RoomHandler(im, option) {
    var join = function join(room) {
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'join:before',
        room: room
      });
      var Inner = ErrorType.Inner;

      if (im.isJoined()) {
        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'join:after',
          extra: 'repeate join room'
        });
        return utils.Defer.reject(Inner.ROOM_REPEAT_JOIN);
      }
      if (!im.isIMReady()) {
        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'im:connected',
          extra: 'IM not connected'
        });
        return utils.Defer.reject(Inner.IM_NOT_CONNECTED);
      }
      return utils.deferred(function (resolve, reject) {
        var mode = option.mode,
            liveType = option.liveType;

        utils.extend(room, {
          mode: mode,
          broadcastType: liveType
        });
        im.joinRoom(room).then(function (users) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after',
            users: users
          });
          users = utils.toArray(users);
          users = utils.map(users, function (user) {
            return {
              id: user[0]
            };
          });
          im.emit(CommonEvent.SEND_REPORT, {
            type: STAT_NAME.R1,
            name: UpEvent.ROOM_JOIN,
            content: {}
          });
          resolve({
            users: users
          });
        }).catch(function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after:error',
            room: room,
            error: error
          });
          reject(error);
        });
      });
    };
    var leave = function leave() {
      var roomId = im.getRoomId();
      var user = im.getUser();
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'leave:before',
        roomId: roomId,
        user: user
      });
      var token = im.getRTCToken();
      var url = utils.tplEngine(Path.EXIT, {
        roomId: roomId
      });
      var headers = getHeaders(im, option);
      utils.extend(im, {
        isJoinRoom: false
      });
      var leaveRoom = function leaveRoom(resolve, reject) {
        im.leaveRoom().then(function () {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:after',
            roomId: roomId,
            user: user
          });
          resolve();
        }, function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:im:error',
            roomId: roomId,
            error: error,
            user: user
          });
          reject(error);
        });
      };
      return utils.deferred(function (resolve, reject) {
        request$2.post({
          path: url,
          headers: headers,
          body: {
            token: token
          }
        }).then(function () {
          leaveRoom(resolve, reject);
        }, function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:ms:error',
            roomId: roomId,
            error: error,
            user: user
          });
          leaveRoom(resolve, reject);
        });
      });
    };
    var get$$1 = function get$$1() {
      return im.getRoom();
    };
    var getSessionId = function getSessionId() {
      // let sessionId = im.getSessionId();
      // return utils.Defer.resolve(sessionId);
      return im.getSessionId();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.ROOM_JOIN:
          return join.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_LEAVE:
          return leave.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET_SESSONID:
          return getSessionId.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.ROOM_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function StorageHandler(im) {
    var isInner = false;
    var getType = function getType(type) {
      return utils.isEqual(type, StorageType.ROOM) ? 'Room' : 'User';
    };
    var getName = function getName(operate, type) {
      var tpl = '{operate}{type}Data';
      type = getType(type);
      return utils.tplEngine(tpl, {
        operate: operate,
        type: type
      });
    };
    var set$$1 = function set$$1(type, key, value, message) {
      var name = getName('set', type);
      return im[name](key, value, isInner, message);
    };
    var get$$1 = function get$$1(type, key) {
      var name = getName('get', type);
      return im[name](key, isInner);
    };
    var remove = function remove(type, key, message) {
      var name = getName('remove', type);
      return im[name](key, isInner, message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.STORAGE_SET:
          return set$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_REMOVE:
          return remove.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.STORAGE_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function MessageHandler(im) {
    var send = function send(message) {
      return im.sendMessage(message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.MESSAGE_SEND:
          return send.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.MESSAGE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  var Client = function (_EventEmitter) {
    inherits(Client, _EventEmitter);

    function Client(option, rongRTC) {
      classCallCheck(this, Client);

      var _this = possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this));

      var context = _this;
      var im = new IM(option);
      var RequestHandler = {
        room: RoomHandler(im, option),
        stream: StreamHandler(im, option, rongRTC),
        storage: StorageHandler(im),
        message: MessageHandler(im)
      };
      var RongIMLib = option.RongIMLib;

      var destroyed = false;
      utils.extend(context, {
        RongIMLib: RongIMLib,
        option: option,
        destroyed: destroyed,
        im: im,
        RequestHandler: RequestHandler,
        rongRTC: rongRTC
      });
      var bindEvent = function bindEvent(event) {
        var name = event.name;

        im.on(name, function (error, user) {
          context.emit(name, user, error);
        });
      };
      // 离开房间时, 需将 client 绑定的 RoomEvents 事件取消, 否则重新加入房间会重复触发前后多次的监听
      var unbindRoomEvents = function unbindRoomEvents() {
        utils.forEach(RoomEvents, function (event) {
          var name = event.name;

          context.off(name);
        });
      };
      utils.forEach(RoomEvents, bindEvent);
      im.on(CommonEvent.JOINED, function () {
        var urls = im.getMSUrl();
        var customUrl = option.url;

        if (!utils.isEmpty(customUrl)) {
          urls = [customUrl];
        }
        if (utils.isEmpty(urls)) {
          var Inner = ErrorType.Inner;

          var error = Inner.ENGINE_ERROR;
          return context.emit(DownEvent.RTC_ERROR, error);
        }
        !request$2.isUrlsExisted(urls) && request$2.addUrls(urls);
        context.emit(DownEvent.RTC_MOUNTED);
      });
      im.on(CommonEvent.LEFT, function () {
        context.emit(DownEvent.RTC_UNMOUNTED);
        unbindRoomEvents();
      });
      im.on(CommonEvent.ERROR, function (error, data) {
        context.emit(DownEvent.RTC_ERROR, data, error);
      });
      im.on(DownEvent.MESSAGE_RECEIVED, function (error, message) {
        context.emit(DownEvent.MESSAGE_RECEIVED, message, error);
      });
      im.on(DownEvent.REPORT_SPOKE, function (error, user) {
        context.emit(DownEvent.REPORT_SPOKE, user, error);
      });
      im.on(DownEvent.MONITOR_STATS, function (error, data) {
        context.emit(DownEvent.MONITOR_STATS, data, error);
      });
      var getMSType = function getMSType(uris) {
        var check$$1 = function check$$1(msType) {
          return utils.some(uris, function (_ref) {
            var mediaType = _ref.mediaType;

            // return utils.isEqual(msType, mediaType) && utils.isEqual(state, StreamState.ENABLE);
            // 只区分 track 不区分
            return utils.isEqual(msType, mediaType);
          });
        };
        var type = StreamType.NODE;
        var hasAudio = check$$1(StreamType.AUDIO);
        var hasVideo = check$$1(StreamType.VIDEO);
        if (hasAudio) {
          type = StreamType.AUDIO;
        }
        if (hasVideo) {
          type = StreamType.VIDEO;
        }
        if (hasVideo && hasAudio) {
          type = StreamType.AUDIO_AND_VIDEO;
        }
        return type;
      };
      var eventHandler = function eventHandler(name, result, error) {
        var id = result.id,
            _result$stream = result.stream,
            tag = _result$stream.tag,
            uris = _result$stream.uris;

        var type = getMSType(uris);
        var user = {
          id: id,
          stream: {
            tag: tag,
            type: type
          }
        };
        context.emit(name, user, error);
      };
      im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_PUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNPUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_DISABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_DISABLED, user, error);
      });
      im.on(DownEvent.STREAM_ENABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_ENABLED, user, error);
      });
      im.on(DownEvent.STREAM_MUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_MUTED, user, error);
      });
      im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNMUTED, user, error);
      });
      return _this;
    }

    createClass(Client, [{
      key: 'exec',
      value: function exec(params) {
        var context = this;
        var im = context.im,
            rongRTC = context.rongRTC;
        // let liveRole = rongRTC.getLiveRole();

        var isLiveAudience$$1 = isLiveAudience(rongRTC);

        if (context.isDestroyed()) {
          return utils.Defer.reject(ErrorType.Inner.INSTANCE_IS_DESTROYED);
        }
        if (!im.isSupportRTC()) {
          return utils.Defer.reject(ErrorType.Inner.IM_SDK_VER_NOT_MATCH);
        }
        var type = params.type,
            args = params.args,
            event = params.event;

        var APIWhitelist = [UpEvent.ROOM_JOIN, UpEvent.DEVICE_GET, UpEvent.STREAM_GET];
        var isNeedJoined = !utils.isInclude(APIWhitelist, event);
        var AudienceEvents = [UpEvent.STREAM_SUBSCRIBE, UpEvent.STREAM_UNSUBSCRIBE];
        var isValidAudienceEvent = utils.isInclude(AudienceEvents, event);

        // 判断是否链接 IM
        if (!im.isIMReady() && isNeedJoined) {
          return utils.Defer.reject(ErrorType.Inner.IM_NOT_CONNECTED);
        }

        // 判断是否加入房间
        if (isNeedJoined && !im.isJoined() && !isLiveAudience$$1) {
          return utils.Defer.reject(ErrorType.Inner.RTC_NOT_JOIN_ROOM);
        }

        // 判断观众端是否非法调用
        if (isLiveAudience$$1 && !isValidAudienceEvent) {
          return utils.Defer.reject(ErrorType.Inner.WRONG_AUDIENCE_EVENT);
        }

        var RequestHandler = this.RequestHandler;

        Logger$1.log(type, {
          func: event,
          type: EventType.REQUEST,
          args: args
        });
        var defer = RequestHandler[type].dispatch(event, args);
        return utils.isPromise(defer) ? defer.then(function (result) {
          Logger$1.log(type, {
            func: event,
            type: EventType.RESPONSE,
            result: result
          });
          return result;
        }, function (error) {
          Logger$1.error(type, {
            func: event,
            type: EventType.RESPONSE,
            error: error
          });
          error = utils.rename(error, {
            resultCode: 'code'
          });
          throw error;
        }) : defer;
      }
    }, {
      key: 'isDestroyed',
      value: function isDestroyed() {
        return this.destroyed;
      }
    }, {
      key: 'extendOption',
      value: function extendOption(_option) {
        var context = this;
        utils.extend(context.option, _option);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var context = this;
        utils.extend(context, {
          destroyed: true
        });
        context.teardown();
        context.im.teardown();
      }
    }]);
    return Client;
  }(EventEmitter);

  var Storage$2 = function () {
    function Storage(_option) {
      classCallCheck(this, Storage);

      _option = _option || {};
      var context = this;
      var client = context.getClient();
      var option = {
        type: StorageType.ROOM
      };
      utils.extend(option, _option);
      utils.extend(context, {
        option: option,
        client: client
      });
    }

    createClass(Storage, [{
      key: 'set',
      value: function set$$1(key, value, message) {
        var _check = check({ key: key, value: value }, ['key', 'value']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_SET,
          type: 'storage',
          args: [type, key, value, message]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(key) {
        var _check2 = check({ key: key }, ['key']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_GET,
          type: 'storage',
          args: [type, key]
        });
      }
    }, {
      key: 'remove',
      value: function remove(key, message) {
        var _check3 = check({ key: key }, ['key']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_REMOVE,
          type: 'storage',
          args: [type, key, message]
        });
      }
    }]);
    return Storage;
  }();

  var Message$1 = function () {
    function Message(_option) {
      classCallCheck(this, Message);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(MessageEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, message) {
          event = option[type] || utils.noop;
          event(message, error);
          Logger$1.log(LogTag.MESSAGE, {
            event: type,
            message: message
          });
        });
      });
    }

    createClass(Message, [{
      key: 'send',
      value: function send(message) {
        var _check = check(message, ['name', 'content']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client;

        return client.exec({
          event: UpEvent.MESSAGE_SEND,
          type: 'message',
          args: [message]
        });
      }
    }]);
    return Message;
  }();

  var RongRTC = function () {
    function RongRTC(_option) {
      classCallCheck(this, RongRTC);

      var context = this;
      var option = {
        url: '',
        debug: false,
        bitrate: {
          max: 1000,
          min: 100,
          start: 300
        },
        mode: RTC_MODE.RTC,
        liveRole: LIVE_ROLE.ANCHOR,
        liveType: LIVE_TYPE.AUDIO_AND_VIDEO,
        setUserId: true,
        created: function created() {},
        mounted: function mounted() {},
        unmounted: function unmounted() {},
        destroyed: function destroyed() {},
        error: function error() {}
      };
      utils.extend(option, _option);

      var logger = option.logger,
          debug = option.debug;
      var Outer = ErrorType.Outer;

      if (utils.isFunction(logger)) {
        Logger$1.watch(logger, true);
      }
      if (debug) {
        Logger$1.watch(function (log) {
          utils.Log.log(log);
        });
      }
      utils.extend(context, {
        Room: Room,
        Stream: Stream,
        Storage: Storage$2,
        StreamType: StreamType,
        StreamSize: StreamSize,
        StorageType: StorageType,
        Mode: RTC_MODE,
        ROLE: LIVE_ROLE,
        LiveType: LIVE_TYPE,
        LayoutMode: LIVE_LAYOUT_MODE,
        RenderMode: LIVE_RENDER_MODE,
        Message: Message$1,
        ErrorType: Outer,
        option: option
      });
      var client = new Client(option, context);
      utils.forEach([Room, Stream, Storage$2, Message$1], function (module) {
        module.prototype.getClient = function () {
          return client;
        };
      });
      utils.extend(context, {
        client: client
      });
      var created = option.created,
          mounted = option.mounted,
          unmounted = option.unmounted,
          error = option.error;

      created();
      Logger$1.log(LogTag.LIFECYCLE, {
        state: 'created'
      });
      client.on(DownEvent.RTC_MOUNTED, function () {
        mounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'mounted'
        });
      });
      client.on(DownEvent.RTC_UNMOUNTED, function () {
        unmounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'unmounted'
        });
      });
      client.on(DownEvent.RTC_ERROR, function (e, data) {
        if (e) {
          throw new Error(e);
        }
        error(data);
      });
    }

    createClass(RongRTC, [{
      key: 'changeLiveRole',
      value: function changeLiveRole(newRole) {
        var context = this;
        var liveRole = context.option.liveRole,
            im = context.client.im;

        if (isAudienceToAnchor(newRole, liveRole)) {
          context.option.liveRole = newRole;
          im.emit(CommonEvent.CHANGE_ROLE, {
            oldRole: liveRole,
            newRole: newRole
          });
          return utils.Defer.resolve();
        } else {
          return utils.Defer.reject(ErrorType.Inner.WRONG_ROLE_SETTING);
        }
      }
    }, {
      key: 'getLiveRole',
      value: function getLiveRole() {
        var liveRole = this.option.liveRole;

        return liveRole;
      }
    }, {
      key: 'getClientId',
      value: function getClientId() {
        return getClientID();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var destroyed = this.option.destroyed,
            client = this.client;

        destroyed();
        client.destroy();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'destroyed'
        });
      }
    }]);
    return RongRTC;
  }();

  utils.extend(RongRTC, {
    StreamType: StreamType,
    StreamSize: StreamSize,
    StorageType: StorageType,
    Mode: RTC_MODE,
    ROLE: LIVE_ROLE,
    LiveType: LIVE_TYPE,
    LayoutMode: LIVE_LAYOUT_MODE,
    RenderMode: LIVE_RENDER_MODE
  });

  return RongRTC;

})));
