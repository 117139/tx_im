(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!****************************************!*\
  !*** H:/phpStudy/WWW/tx_im/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!************************************************!*\
  !*** H:/phpStudy/WWW/tx_im/commen/tim/user.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var userList = [{
  user: 'a',
  userId: '1',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoZQweKU7MSCgswUJStDEwMDYwsjA3MTiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazNDYxtDCyNISakpkONDPQIDXDP6DErFw7xSzL3NzdMqqkIswtJDgtMbMooCzPLNfD2StG3zWsOMDQ01apFgAy4i*X',
  img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1735490596,2760195857&fm=26&gp=0.jpg' },

{
  user: 'user1',
  userId: 'user1',
  img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg',
  userSig: 'eJwtzM0KgkAYheF7mXXIN384Ci2khLQpksx9MJN*ZDGNFkV074m6PM*B90tKfQxe1pOYsADIYtxo7L3HC4787Kyn89GZ69k5NCSmAoArBqGYHvt26O3gUkoGAJP2eBst4oIqkGquYD10mzrJqu3a5y2t2mLTZmmi7aHQu4i7dPXYf3LWaJmHZXRakt8fDLcwbg__' },

{
  user: 'user2',
  userId: 'user2',
  img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=366135374,1364401596&fm=26&gp=0.jpg',
  userSig: 'eJwtzMEKgkAUheF3udtC7oxjjkKLahFSVpg9gDGjXUSxGRUpevdEXZ7vwP*F9Hx3em0gBO4grKdNStct5TRxZ7Xhy2FVmTUNKQiZQHQlR1-Mjx4aMnp0z-M4Is7aUjVZ4AomGfpLhYqxmzxun11tn-FJRhv-nb*qygayO5ikGDBK3UtcXMt9362OYgu-PyCUMVA_' },

{
  user: 'user3',
  userId: 'user3',
  img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=275868592,2250122918&fm=26&gp=0.jpg',
  userSig: 'eJwtzNsKgkAUheF3mevQPSechG6EAqlA6AAT3giOtanxMJoY0bsn6uX6Fvxfcj6cvN44EhLmAVlNG3NTdljgxO-WOL4cbf7M6hpzElIBwBWDQMyPGWp0ZnQpJQOAWTu0k625oIpytVTwPnb1kcU2UZncP3ZYDFvd6r6qbtfoIpLmA469yiZIfWoh9eMN*f0BgOQx1Q__' },

{
  user: 'user4',
  userId: '5',
  img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2473035870,2692619587&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwqZQweKU7MSCgswUJStDEwMDYwsjA3MTiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazNDYxtDA2NIWakpkONDMwvSi4qkK7IK-KLS0wvyAjwzHdPTA8yavQUdszoFy7osTfvaQ0KDCiKjLfVqkWAC3sMNQ_' },

{
  user: 'user5',
  userId: '6',
  img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293099503,606929711&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwmZQweKU7MSCgswUJStDEwMDYwsjA3MTiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazNDYxtDA2MYKakpkONLM83CLSyafQPbfAPCnHINTTLSDTJLfQo9DS2Cc3wzHHzK-IIqXYMtjHybHYVqkWAAlfL2A_' },

{
  user: 'user6',
  userId: '7',
  img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1643922863,2228588017&fm=26&gp=0.jpg',
  userSig: 'eJwtzLEKgzAUheF3yVz0ahITBZe00EUnM7oUTeViK0maWqH03SvqeL4D-5foqolm40lB0gjIadvYmyngHTcWB7768WYt9qRIGACVKQi2P2ax6M3qnPMUAHYN*NwspyyRNJNHBYe16V0yBiqn3GTVWVlXva9t-GhjUecXVX-EvDjd0KHjWpmuJL8-ZZ0v7Q__' },

{
  user: 'user7',
  userId: '8',
  img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1179876196,102524513&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwhZQweKU7MSCgswUJStDEwMDYwsjA3MTiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazNDYxtDC2MIeakpkONLM4wj20PCQv0NfExCLXNCk9yDUiICzYRdujOKrYPKzcKMstuSzDycLHMjXZVqkWAAh-L1U_' },

{
  user: 'user8',
  userId: '9',
  img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3206878631,547916318&fm=26&gp=0.jpg',
  userSig: 'eJwtzEELgjAYxvHvsmth7*ZmU*iix*oQdWjQRdm0V0nFDXFE3z1Rj8-vgf*XPC73YDQDSQgLgOyXjdq0DktcON7Q6ibve9QkoRwglAyOfH3M1ONgZhdCMABY1eFnsTjkVHKItgpWc1MN3e7dyTE7*6j1dXS1DbrudaA*t1VW3KaCpkzVKn0W-ER*f1cJMI4_' },

{
  user: 'user9',
  userId: '10',
  img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1779444511,689185070&fm=26&gp=0.jpg',
  userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYw0eKU7MSCgswUJStDEwMDYwsjA3MTiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxazNDYxtDAxsoSakpkONDRG3zjY1S-S1dHCK83CPUbfojgoLMDdPcM0yS2z0jnFz9ykyDFAuzS4ItU4ytNWqRYAZG4vOw__' }];var _default =






userList;exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!***********************************************!*\
  !*** H:/phpStudy/WWW/tx_im/commen/tim/tim.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timWxSdk = _interopRequireDefault(__webpack_require__(/*! tim-wx-sdk */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import COS from "cos-js-sdk-v5";


var options = {
  SDKAppID: 1400382074 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
var tim = _timWxSdk.default.create(options); // SDK 实例通常用 tim 表示
var TIMData = _timWxSdk.default;
// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});



/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
  var SDKAPPID = 1400382074;
  var EXPIRETIME = 604800;
  var SECRETKEY = 'ade83a64b9d6c06c7beef62f8218f10e3f1cb5eaa8b8bacaa950f172dfc68d9d';

  if (SDKAPPID === '' || SECRETKEY === '') {
    alert(
    '请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
    '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js');

  }
  var generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  var userSig = generator.genTestUserSig(userID);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig };

}var _default =

{
  tim: tim,
  TIMData: TIMData,
  genTestUserSig: genTestUserSig };exports.default = _default;

/***/ }),
/* 13 */
/*!***************************************************************!*\
  !*** H:/phpStudy/WWW/tx_im/node_modules/tim-wx-sdk/tim-wx.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {var e = { SDK_READY: "sdkStateReady", SDK_NOT_READY: "sdkStateNotReady", SDK_DESTROY: "sdkDestroy", MESSAGE_RECEIVED: "onMessageReceived", MESSAGE_REVOKED: "onMessageRevoked", MESSAGE_READ_BY_PEER: "onMessageReadByPeer", CONVERSATION_LIST_UPDATED: "onConversationListUpdated", GROUP_LIST_UPDATED: "onGroupListUpdated", GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice", PROFILE_UPDATED: "onProfileUpdated", BLACKLIST_UPDATED: "blacklistUpdated", KICKED_OUT: "kickedOut", ERROR: "error", NET_STATE_CHANGE: "netStateChange" },t = { MSG_TEXT: "TIMTextElem", MSG_IMAGE: "TIMImageElem", MSG_SOUND: "TIMSoundElem", MSG_AUDIO: "TIMSoundElem", MSG_FILE: "TIMFileElem", MSG_FACE: "TIMFaceElem", MSG_VIDEO: "TIMVideoFileElem", MSG_GEO: "TIMLocationElem", MSG_GRP_TIP: "TIMGroupTipElem", MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem", MSG_CUSTOM: "TIMCustomElem", MSG_PRIORITY_HIGH: "High", MSG_PRIORITY_NORMAL: "Normal", MSG_PRIORITY_LOW: "Low", MSG_PRIORITY_LOWEST: "Lowest", CONV_C2C: "C2C", CONV_GROUP: "GROUP", CONV_SYSTEM: "@TIM#SYSTEM", GRP_PRIVATE: "Private", GRP_WORK: "Private", GRP_PUBLIC: "Public", GRP_CHATROOM: "ChatRoom", GRP_MEETING: "ChatRoom", GRP_AVCHATROOM: "AVChatRoom", GRP_MBR_ROLE_OWNER: "Owner", GRP_MBR_ROLE_ADMIN: "Admin", GRP_MBR_ROLE_MEMBER: "Member", GRP_TIP_MBR_JOIN: 1, GRP_TIP_MBR_QUIT: 2, GRP_TIP_MBR_KICKED_OUT: 3, GRP_TIP_MBR_SET_ADMIN: 4, GRP_TIP_MBR_CANCELED_ADMIN: 5, GRP_TIP_GRP_PROFILE_UPDATED: 6, GRP_TIP_MBR_PROFILE_UPDATED: 7, MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify", MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify", MSG_REMIND_DISCARD: "Discard", GENDER_UNKNOWN: "Gender_Type_Unknown", GENDER_FEMALE: "Gender_Type_Female", GENDER_MALE: "Gender_Type_Male", KICKED_OUT_MULT_ACCOUNT: "multipleAccount", KICKED_OUT_MULT_DEVICE: "multipleDevice", KICKED_OUT_USERSIG_EXPIRED: "userSigExpired", ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny", ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny", FORBID_TYPE_NONE: "AdminForbid_Type_None", FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut", JOIN_OPTIONS_FREE_ACCESS: "FreeAccess", JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission", JOIN_OPTIONS_DISABLE_APPLY: "DisableApply", JOIN_STATUS_SUCCESS: "JoinedSuccess", JOIN_STATUS_ALREADY_IN_GROUP: "AlreadyInGroup", JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval", GRP_PROFILE_OWNER_ID: "ownerID", GRP_PROFILE_CREATE_TIME: "createTime", GRP_PROFILE_LAST_INFO_TIME: "lastInfoTime", GRP_PROFILE_MEMBER_NUM: "memberNum", GRP_PROFILE_MAX_MEMBER_NUM: "maxMemberNum", GRP_PROFILE_JOIN_OPTION: "joinOption", GRP_PROFILE_INTRODUCTION: "introduction", GRP_PROFILE_NOTIFICATION: "notification", GRP_PROFILE_MUTE_ALL_MBRS: "muteAllMembers", NET_STATE_CONNECTED: "connected", NET_STATE_CONNECTING: "connecting", NET_STATE_DISCONNECTED: "disconnected" };function n(e) {return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function o(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}function i(e, t, n) {return t && o(e.prototype, t), n && o(e, n), e;}function s(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function a(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var r = Object.getOwnPropertySymbols(e);t && (r = r.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, r);}return n;}function u(e) {for (var t = 1; t < arguments.length; t++) {var n = null != arguments[t] ? arguments[t] : {};t % 2 ? a(Object(n), !0).forEach(function (t) {s(e, t, n[t]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function (t) {Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));});}return e;}function c(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && p(e, t);}function l(e) {return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);})(e);}function p(e, t) {return (p = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;})(e, t);}function h() {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}function d(e, t, n) {return (d = h() ? Reflect.construct : function (e, t, n) {var r = [null];r.push.apply(r, t);var o = new (Function.bind.apply(e, r))();return n && p(o, n.prototype), o;}).apply(null, arguments);}function f(e) {var t = "function" == typeof Map ? new Map() : void 0;return (f = function f(e) {if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;var n;if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");if (void 0 !== t) {if (t.has(e)) return t.get(e);t.set(e, r);}function r() {return d(e, arguments, l(this).constructor);}return r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), p(r, e);})(e);}function g(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}function m(e, t) {return !t || "object" != typeof t && "function" != typeof t ? g(e) : t;}function _(e) {return function () {var t,n = l(e);if (h()) {var r = l(this).constructor;t = Reflect.construct(n, arguments, r);} else t = n.apply(this, arguments);return m(this, t);};}function y(e, t) {return function (e) {if (Array.isArray(e)) return e;}(e) || function (e, t) {if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;var n = [],r = !0,o = !1,i = void 0;try {for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0) {;}} catch (u) {o = !0, i = u;} finally {try {r || null == a.return || a.return();} finally {if (o) throw i;}}return n;}(e, t) || I(e, t) || function () {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function v(e) {return function (e) {if (Array.isArray(e)) return M(e);}(e) || function (e) {if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);}(e) || I(e) || function () {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function I(e, t) {if (e) {if ("string" == typeof e) return M(e, t);var n = Object.prototype.toString.call(e).slice(8, -1);return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? M(e, t) : void 0;}}function M(e, t) {(null == t || t > e.length) && (t = e.length);for (var n = 0, r = new Array(t); n < t; n++) {r[n] = e[n];}return r;}function C(e) {if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {if (Array.isArray(e) || (e = I(e))) {var t = 0,n = function n() {};return { s: n, n: function n() {return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };}, e: function e(_e2) {throw _e2;}, f: n };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var r,o,i = !0,s = !1;return { s: function s() {r = e[Symbol.iterator]();}, n: function n() {var e = r.next();return i = e.done, e;}, e: function e(_e3) {s = !0, o = _e3;}, f: function f() {try {i || null == r.return || r.return();} finally {if (s) throw o;}} };}var E = function () {function e() {r(this, e), this.cache = [], this.options = null;}return i(e, [{ key: "use", value: function value(e) {if ("function" != typeof e) throw "middleware must be a function";return this.cache.push(e), this;} }, { key: "next", value: function value(e) {if (this.middlewares && this.middlewares.length > 0) return this.middlewares.shift().call(this, this.options, this.next.bind(this));} }, { key: "run", value: function value(e) {return this.middlewares = this.cache.map(function (e) {return e;}), this.options = e, this.next();} }]), e;}(),S = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function T(e, t) {return e(t = { exports: {} }, t.exports), t.exports;}var D,A,k,R = T(function (e, t) {var n, r, o, i, s, a, u, c, l, p, h, d, f, g, m, _, y, v;e.exports = (n = "function" == typeof Promise, r = "object" == typeof self ? self : S, o = "undefined" != typeof Symbol, i = "undefined" != typeof Map, s = "undefined" != typeof Set, a = "undefined" != typeof WeakMap, u = "undefined" != typeof WeakSet, c = "undefined" != typeof DataView, l = o && void 0 !== Symbol.iterator, p = o && void 0 !== Symbol.toStringTag, h = s && "function" == typeof Set.prototype.entries, d = i && "function" == typeof Map.prototype.entries, f = h && Object.getPrototypeOf(new Set().entries()), g = d && Object.getPrototypeOf(new Map().entries()), m = l && "function" == typeof Array.prototype[Symbol.iterator], _ = m && Object.getPrototypeOf([][Symbol.iterator]()), y = l && "function" == typeof String.prototype[Symbol.iterator], v = y && Object.getPrototypeOf(""[Symbol.iterator]()), function (e) {var t = typeof e;if ("object" !== t) return t;if (null === e) return "null";if (e === r) return "global";if (Array.isArray(e) && (!1 === p || !(Symbol.toStringTag in e))) return "Array";if ("object" == typeof window && null !== window) {if ("object" == typeof window.location && e === window.location) return "Location";if ("object" == typeof window.document && e === window.document) return "Document";if ("object" == typeof window.navigator) {if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes) return "MimeTypeArray";if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins) return "PluginArray";}if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";if ("TD" === e.tagName) return "HTMLTableDataCellElement";if ("TH" === e.tagName) return "HTMLTableHeaderCellElement";}}var o = p && e[Symbol.toStringTag];if ("string" == typeof o) return o;var l = Object.getPrototypeOf(e);return l === RegExp.prototype ? "RegExp" : l === Date.prototype ? "Date" : n && l === Promise.prototype ? "Promise" : s && l === Set.prototype ? "Set" : i && l === Map.prototype ? "Map" : u && l === WeakSet.prototype ? "WeakSet" : a && l === WeakMap.prototype ? "WeakMap" : c && l === DataView.prototype ? "DataView" : i && l === g ? "Map Iterator" : s && l === f ? "Set Iterator" : m && l === _ ? "Array Iterator" : y && l === v ? "String Iterator" : null === l ? "Object" : Object.prototype.toString.call(e).slice(8, -1);});}),O = "undefined" != typeof window,N = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync,L = O && window.navigator && window.navigator.userAgent || "",w = /AppleWebKit\/([\d.]+)/i.exec(L),P = (w && parseFloat(w.pop()), /iPad/i.test(L)),G = (/iPhone/i.test(L), /iPod/i.test(L), (D = L.match(/OS (\d+)_/i)) && D[1] && D[1], /Android/i.test(L)),b = function () {var e = L.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if (!e) return null;var t = e[1] && parseFloat(e[1]),n = e[2] && parseFloat(e[2]);return t && n ? parseFloat(e[1] + "." + e[2]) : t || null;}(),U = (G && /webkit/i.test(L), /Firefox/i.test(L), /Edge/i.test(L)),q = !U && /Chrome/i.test(L),x = (function () {var e = L.match(/Chrome\/(\d+)/);e && e[1] && parseFloat(e[1]);}(), /MSIE/.test(L)),F = (/MSIE\s8\.0/.test(L), function () {var e = /MSIE\s(\d+)\.\d/.exec(L),t = e && parseFloat(e[1]);return !t && /Trident\/7.0/i.test(L) && /rv:11.0/.test(L) && (t = 11), t;}()),V = (/Safari/i.test(L), /TBS\/\d+/i.test(L)),K = (function () {var e = L.match(/TBS\/(\d+)/i);if (e && e[1]) e[1];}(), !V && /MQQBrowser\/\d+/i.test(L), !V && / QQBrowser\/\d+/i.test(L), /(micromessenger|webbrowser)/i.test(L)),B = (/Windows/i.test(L), /MAC OS X/i.test(L), /MicroMessenger/i.test(L), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});A = "undefined" != typeof console ? console : void 0 !== B && B.console ? B.console : "undefined" != typeof window && window.console ? window.console : {};for (var H = function H() {}, j = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], Y = j.length; Y--;) {k = j[Y], console[k] || (A[k] = H);}A.methods = j;var $ = A,W = 0,z = new Map();function X() {var e = new Date();return "TIM " + e.toLocaleTimeString("en-US", { hour12: !1 }) + "." + function (e) {var t;switch (e.toString().length) {case 1:t = "00" + e;break;case 2:t = "0" + e;break;default:t = e;}return t;}(e.getMilliseconds()) + ":";}var J = { _data: [], _length: 0, _visible: !1, arguments2String: function arguments2String(e) {var t;if (1 === e.length) t = X() + e[0];else {t = X();for (var n = 0, r = e.length; n < r; n++) {ie(e[n]) ? ae(e[n]) ? t += de(e[n]) : t += JSON.stringify(e[n]) : t += e[n], t += " ";}}return t;}, debug: function debug() {if (W <= -1) {var e = this.arguments2String(arguments);J.record(e, "debug"), $.debug(e);}}, log: function log() {if (W <= 0) {var e = this.arguments2String(arguments);J.record(e, "log"), $.log(e);}}, info: function info() {if (W <= 1) {var e = this.arguments2String(arguments);J.record(e, "info"), $.info(e);}}, warn: function warn() {if (W <= 2) {var e = this.arguments2String(arguments);J.record(e, "warn"), $.warn(e);}}, error: function error() {if (W <= 3) {var e = this.arguments2String(arguments);J.record(e, "error"), $.error(e);}}, time: function time(e) {z.set(e, pe.now());}, timeEnd: function timeEnd(e) {if (z.has(e)) {var t = pe.now() - z.get(e);return z.delete(e), t;}return $.warn("未找到对应label: ".concat(e, ", 请在调用 logger.timeEnd 前，调用 logger.time")), 0;}, setLevel: function setLevel(e) {e < 4 && $.log(X() + "set level from " + W + " to " + e), W = e;}, record: function record(e, t) {1100 === J._length && (J._data.splice(0, 100), J._length = 1e3), J._length++, J._data.push("".concat(e, " [").concat(t, "] \n"));}, getLog: function getLog() {return J._data;} },Q = function Q(e) {return "file" === ue(e);},Z = function Z(e) {return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" === n(e) && e.constructor === Number);},ee = function ee(e) {return "string" == typeof e;},te = function te(e) {return null !== e && "object" === n(e);},ne = function ne(e) {if ("object" !== n(e) || null === e) return !1;var t = Object.getPrototypeOf(e);if (null === t) return !0;for (var r = t; null !== Object.getPrototypeOf(r);) {r = Object.getPrototypeOf(r);}return t === r;},re = function re(e) {return "function" == typeof Array.isArray ? Array.isArray(e) : "array" === ue(e);},oe = function oe(e) {return void 0 === e;},ie = function ie(e) {return re(e) || te(e);},se = function se(e) {return "function" == typeof e;},ae = function ae(e) {return e instanceof Error;},ue = function ue(e) {return Object.prototype.toString.call(e).match(/^\[object (.*)\]$/)[1].toLowerCase();},ce = function ce(e) {if ("string" != typeof e) return !1;var t = e[0];return !/[^a-zA-Z0-9]/.test(t);},le = 0;Date.now || (Date.now = function () {return new Date().getTime();});var pe = { now: function now() {0 === le && (le = Date.now() - 1);var e = Date.now() - le;return e > 4294967295 ? (le += 4294967295, Date.now() - le) : e;}, utc: function utc() {return Math.round(Date.now() / 1e3);} },he = function e(t, n, r, o) {if (!ie(t) || !ie(n)) return 0;for (var i, s = 0, a = Object.keys(n), u = 0, c = a.length; u < c; u++) {if (i = a[u], !(oe(n[i]) || r && r.includes(i))) if (ie(t[i]) && ie(n[i])) s += e(t[i], n[i], r, o);else {if (o && o.includes(n[i])) continue;t[i] !== n[i] && (t[i] = n[i], s += 1);}}return s;},de = function de(e) {return JSON.stringify(e, ["message", "code"]);},fe = function fe() {var e = new Date(),t = e.toISOString(),n = e.getTimezoneOffset() / 60,r = "";return r = n < 0 ? n > -10 ? "+0" + Math.abs(100 * n) : "+" + Math.abs(100 * n) : n >= 10 ? "-" + 100 * n : "-0" + 100 * n, t.replace("Z", r);},ge = function ge(e) {if (0 === e.length) return 0;for (var t = 0, n = 0, r = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e[t];) {n += e[t++].charCodeAt[t] <= 255 ? 1 : !1 === r ? 3 : 2;}return n;},me = function me(e) {var t = e || 99999999;return Math.round(Math.random() * t);},_e = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",ye = _e.length,ve = function ve(e, t) {for (var n in e) {if (e[n] === t) return !0;}return !1;},Ie = {},Me = function Me() {if (N) return "https:";var e = window.location.protocol;return ["http:", "https:"].indexOf(e) < 0 && (e = "http:"), e;},Ce = function Ce(e) {return -1 === e.indexOf("http://") || -1 === e.indexOf("https://") ? "https://" + e : e.replace(/https|http/, "https");};function Ee(e, t) {re(e) && re(t) ? t.forEach(function (t) {var n = t.key,r = t.value,o = e.find(function (e) {return e.key === n;});o ? o.value = r : e.push({ key: n, value: r });}) : J.warn("updateCustomField target 或 source 不是数组，忽略此次更新。");}var Se = function Se(e) {return e === t.GRP_PUBLIC;},Te = function Te(e) {return e === t.GRP_MEETING;},De = function De(e) {return e === t.GRP_AVCHATROOM;},Ae = function Ae(e) {return ee(e) && e === t.CONV_SYSTEM;};function ke(e, t) {var n = {};return Object.keys(e).forEach(function (r) {n[r] = t(e[r], r);}), n;}var Re = Object.prototype.hasOwnProperty;function Oe(e) {if (null == e) return !0;if ("boolean" == typeof e) return !1;if ("number" == typeof e) return 0 === e;if ("string" == typeof e) return 0 === e.length;if ("function" == typeof e) return 0 === e.length;if (Array.isArray(e)) return 0 === e.length;if (e instanceof Error) return "" === e.message;if (ne(e)) {for (var t in e) {if (Re.call(e, t)) return !1;}return !0;}return !("map" !== ue(e) && !function (e) {return "set" === ue(e);}(e) && !Q(e)) && 0 === e.size;}function Ne(e, t, n) {if (void 0 === t) return !0;var r = !0;if ("object" === R(t).toLowerCase()) Object.keys(t).forEach(function (o) {var i = 1 === e.length ? e[0][o] : void 0;r = !!Le(i, t[o], n, o) && r;});else if ("array" === R(t).toLowerCase()) for (var o = 0; o < t.length; o++) {r = !!Le(e[o], t[o], n, t[o].name) && r;}if (r) return r;throw new Error("Params validate failed.");}function Le(e, t, n, r) {if (void 0 === t) return !0;var o = !0;return t.required && Oe(e) && ($.error("TIM [".concat(n, '] Missing required params: "').concat(r, '".')), o = !1), Oe(e) || R(e).toLowerCase() === t.type.toLowerCase() || ($.error("TIM [".concat(n, '] Invalid params: type check failed for "').concat(r, '".Expected ').concat(t.type, ".")), o = !1), t.validator && !t.validator(e) && ($.error("TIM [".concat(n, "] Invalid params: custom validator check failed for params.")), o = !1), o;}var we = { SUCCESS: "JoinedSuccess", WAIT_APPROVAL: "WaitAdminApproval" },Pe = { SUCCESS: 0 },Ge = { IS_LOGIN: 1, IS_NOT_LOGIN: 0 },be = { UNSEND: "unSend", SUCCESS: "success", FAIL: "fail" },Ue = { NOT_START: "notStart", PENDING: "pengding", RESOLVED: "resolved", REJECTED: "rejected" },qe = function () {function e(n) {r(this, e), this.type = t.MSG_TEXT, this.content = { text: n.text || "" };}return i(e, [{ key: "setText", value: function value(e) {this.content.text = e;} }, { key: "sendable", value: function value() {return 0 !== this.content.text.length;} }]), e;}(),xe = { JSON: { TYPE: { C2C: { NOTICE: 1, COMMON: 9, EVENT: 10 }, GROUP: { COMMON: 3, TIP: 4, SYSTEM: 5, TIP2: 6 }, FRIEND: { NOTICE: 7 }, PROFILE: { NOTICE: 8 } }, SUBTYPE: { C2C: { COMMON: 0, READED: 92, KICKEDOUT: 96 }, GROUP: { COMMON: 0, LOVEMESSAGE: 1, TIP: 2, REDPACKET: 3 } }, OPTIONS: { GROUP: { JOIN: 1, QUIT: 2, KICK: 3, SET_ADMIN: 4, CANCEL_ADMIN: 5, MODIFY_GROUP_INFO: 6, MODIFY_MEMBER_INFO: 7 } } }, PROTOBUF: {}, IMAGE_TYPES: { ORIGIN: 1, LARGE: 2, SMALL: 3 }, IMAGE_FORMAT: { JPG: 1, JPEG: 1, GIF: 2, PNG: 3, BMP: 4, UNKNOWN: 255 } },Fe = 1,Ve = 2,Ke = 3,Be = 4,He = 5,je = 7,Ye = 8,$e = 9,We = 10,ze = 15,Xe = 255,Je = 2,Qe = 0,Ze = 1,et = { NICK: "Tag_Profile_IM_Nick", GENDER: "Tag_Profile_IM_Gender", BIRTHDAY: "Tag_Profile_IM_BirthDay", LOCATION: "Tag_Profile_IM_Location", SELFSIGNATURE: "Tag_Profile_IM_SelfSignature", ALLOWTYPE: "Tag_Profile_IM_AllowType", LANGUAGE: "Tag_Profile_IM_Language", AVATAR: "Tag_Profile_IM_Image", MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings", ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType", LEVEL: "Tag_Profile_IM_Level", ROLE: "Tag_Profile_IM_Role" },tt = { UNKNOWN: "Gender_Type_Unknown", FEMALE: "Gender_Type_Female", MALE: "Gender_Type_Male" },nt = { NONE: "AdminForbid_Type_None", SEND_OUT: "AdminForbid_Type_SendOut" },rt = { NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_ANY: "AllowType_Type_AllowAny", DENY_ANY: "AllowType_Type_DenyAny" },ot = function () {function e(n) {r(this, e), this._imageMemoryURL = "", this._file = n.file, N ? this.createImageDataASURLInWXMiniApp(n.file) : this.createImageDataASURLInWeb(n.file), this._initImageInfoModel(), this.type = t.MSG_IMAGE, this._percent = 0, this.content = { imageFormat: xe.IMAGE_FORMAT[n.imageFormat] || xe.IMAGE_FORMAT.UNKNOWN, uuid: n.uuid, imageInfoArray: [] }, this.initImageInfoArray(n.imageInfoArray), this._defaultImage = "http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg", this._autoFixUrl();}return i(e, [{ key: "_initImageInfoModel", value: function value() {var e = this;this._ImageInfoModel = function (t) {this.instanceID = me(9999999), this.sizeType = t.type || 0, this.size = t.size || 0, this.width = t.width || 0, this.height = t.height || 0, this.imageUrl = t.url || "", this.url = t.url || e._imageMemoryURL || e._defaultImage;}, this._ImageInfoModel.prototype = { setSizeType: function setSizeType(e) {this.sizeType = e;}, setImageUrl: function setImageUrl(e) {e && (this.imageUrl = e);}, getImageUrl: function getImageUrl() {return this.imageUrl;} };} }, { key: "initImageInfoArray", value: function value(e) {for (var t = 2, n = null, r = null; t >= 0;) {r = void 0 === e || void 0 === e[t] ? { type: 0, size: 0, width: 0, height: 0, url: "" } : e[t], (n = new this._ImageInfoModel(r)).setSizeType(t + 1), this.addImageInfo(n), t--;}} }, { key: "updateImageInfoArray", value: function value(e) {for (var t, n = this.content.imageInfoArray.length, r = 0; r < n; r++) {t = this.content.imageInfoArray[r], e.size && (t.size = e.size), e.url && t.setImageUrl(e.url), e.width && (t.width = e.width), e.height && (t.height = e.height);}} }, { key: "_autoFixUrl", value: function value() {for (var e = this.content.imageInfoArray.length, t = "", n = "", r = ["http", "https"], o = null, i = 0; i < e; i++) {this.content.imageInfoArray[i].url && "" !== (o = this.content.imageInfoArray[i]).imageUrl && (n = o.imageUrl.slice(0, o.imageUrl.indexOf("://") + 1), t = o.imageUrl.slice(o.imageUrl.indexOf("://") + 1), r.indexOf(n) < 0 && (n = "https:"), this.content.imageInfoArray[i].setImageUrl([n, t].join("")));}} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateImageFormat", value: function value(e) {this.content.imageFormat = e;} }, { key: "createImageDataASURLInWeb", value: function value(e) {void 0 !== e && e.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e.files[0]));} }, { key: "createImageDataASURLInWXMiniApp", value: function value(e) {e && e.url && (this._imageMemoryURL = e.url);} }, { key: "replaceImageInfo", value: function value(e, t) {this.content.imageInfoArray[t] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t] = e);} }, { key: "addImageInfo", value: function value(e) {this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e);} }, { key: "sendable", value: function value() {return 0 !== this.content.imageInfoArray.length && "" !== this.content.imageInfoArray[0].imageUrl && 0 !== this.content.imageInfoArray[0].size;} }]), e;}(),it = function () {function e(n) {r(this, e), this.type = t.MSG_FACE, this.content = n || null;}return i(e, [{ key: "sendable", value: function value() {return null !== this.content;} }]), e;}(),st = function () {function e(n) {r(this, e), this.type = t.MSG_AUDIO, this._percent = 0, this.content = { downloadFlag: 2, second: n.second, size: n.size, url: n.url, remoteAudioUrl: "", uuid: n.uuid };}return i(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateAudioUrl", value: function value(e) {this.content.remoteAudioUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.remoteAudioUrl;} }]), e;}(),at = { from: !0, groupID: !0, groupName: !0, to: !0 },ut = function () {function e(n) {r(this, e), this.type = t.MSG_GRP_TIP, this.content = {}, this._initContent(n);}return i(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "remarkInfo":break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;case "operatorInfo":case "memberInfoList":break;case "msgMemberInfo":t.content.memberList = e[n], Object.defineProperty(t.content, "msgMemberInfo", { get: function get() {return J.warn("!!! 禁言的群提示消息中的 payload.msgMemberInfo 属性即将废弃，请使用 payload.memberList 属性替代。 \n", "msgMemberInfo 中的 shutupTime 属性对应更改为 memberList 中的 muteTime 属性，表示禁言时长。 \n", "参考：群提示消息 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupTipPayload"), t.content.memberList.map(function (e) {return { userID: e.userID, shutupTime: e.muteTime };});} });break;default:t.content[n] = e[n];}}), this.content.userIDList || (this.content.userIDList = [this.content.operatorID]);} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var r = t[n];at[r] && (this.content.groupProfile[r] = e[r]);}} }]), e;}(),ct = { from: !0, groupID: !0, name: !0, to: !0 },lt = function () {function e(n) {r(this, e), this.type = t.MSG_GRP_SYS_NOTICE, this.content = {}, this._initContent(n);}return i(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "memberInfoList":break;case "remarkInfo":t.content.handleMessage = e[n];break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;default:t.content[n] = e[n];}});} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var r = t[n];ct[r] && (this.content.groupProfile[r] = e[r]);}} }]), e;}(),pt = { 70001: "UserSig 已过期，请重新生成。建议 UserSig 有效期设置不小于24小时。", 70002: "UserSig 长度为0，请检查传入的 UserSig 是否正确。", 70003: "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70005: "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70009: "UserSig 验证失败，可能因为生成 UserSig 时混用了其他 SDKAppID 的私钥或密钥导致，请使用对应 SDKAppID 下的私钥或密钥重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70013: "请求中的 UserID 与生成 UserSig 时使用的 UserID 不匹配，您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70014: "请求中的 SDKAppID 与生成 UserSig 时使用的 SDKAppID 不匹配，您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70016: "密钥不存在，UserSig 验证失败，请在即时通信 IM 控制台获取密钥(https://cloud.tencent.com/document/product/269/32578#.E8.8E.B7.E5.8F.96.E5.AF.86.E9.92.A5)。", 70020: "SDKAppID 未找到，请在即时通信 IM 控制台确认应用信息。", 70050: "UserSig 验证次数过于频繁。请检查 UserSig 是否正确，并于1分钟后重新验证。您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70051: "帐号被拉入黑名单。", 70052: "UserSig 已经失效，请重新生成，再次尝试。", 70107: "因安全原因被限制登录，请不要频繁登录。", 70169: "请求的用户帐号不存在。", 70114: "服务端内部超时，请稍后重试。", 70202: "服务端内部超时，请稍后重试。", 70206: "请求中批量数量不合法。", 70402: "参数非法，请检查必填字段是否填充，或者字段的填充是否满足协议要求。", 70403: "请求失败，需要 App 管理员权限。", 70398: "帐号数超限。如需创建多于100个帐号，请将应用升级为专业版，具体操作指引请参见购买指引(https://cloud.tencent.com/document/product/269/32458)。", 70500: "服务端内部错误，请稍后重试。", 71e3: "删除帐号失败。仅支持删除体验版帐号，您当前应用为专业版，暂不支持帐号删除。", 20001: "请求包非法。", 20002: "UserSig 或 A2 失效。", 20003: "消息发送方或接收方 UserID 无效或不存在，请检查 UserID 是否已导入即时通信 IM。", 20004: "网络异常，请重试。", 20005: "服务端内部错误，请重试。", 20006: "触发发送单聊消息之前回调，App 后台返回禁止下发该消息。", 20007: "发送单聊消息，被对方拉黑，禁止发送。消息发送状态默认展示为失败，您可以登录控制台修改该场景下的消息发送状态展示结果，具体操作请参见消息保留设置(https://cloud.tencent.com/document/product/269/38656)。", 20009: "消息发送双方互相不是好友，禁止发送（配置单聊消息校验好友关系才会出现）。", 20010: "发送单聊消息，自己不是对方的好友（单向关系），禁止发送。", 20011: "发送单聊消息，对方不是自己的好友（单向关系），禁止发送。", 20012: "发送方被禁言，该条消息被禁止发送。", 20016: "消息撤回超过了时间限制（默认2分钟）。", 20018: "删除漫游内部错误。", 90001: "JSON 格式解析失败，请检查请求包是否符合 JSON 规范。", 90002: "JSON 格式请求包中 MsgBody 不符合消息格式描述，或者 MsgBody 不是 Array 类型，请参考 TIMMsgElement 对象的定义(https://cloud.tencent.com/document/product/269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。", 90003: "JSON 格式请求包体中缺少 To_Account 字段或者 To_Account 帐号不存在。", 90005: "JSON 格式请求包体中缺少 MsgRandom 字段或者 MsgRandom 字段不是 Integer 类型。", 90006: "JSON 格式请求包体中缺少 MsgTimeStamp 字段或者 MsgTimeStamp 字段不是 Integer 类型。", 90007: "JSON 格式请求包体中 MsgBody 类型不是 Array 类型，请将其修改为 Array 类型。", 90008: "JSON 格式请求包体中缺少 From_Account 字段或者 From_Account 帐号不存在。", 90009: "请求需要 App 管理员权限。", 90010: "JSON 格式请求包不符合消息格式描述，请参考 TIMMsgElement 对象的定义(https://cloud.tencent.com/document/product/269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。", 90011: "批量发消息目标帐号超过500，请减少 To_Account 中目标帐号数量。", 90012: "To_Account 没有注册或不存在，请确认 To_Account 是否导入即时通信 IM 或者是否拼写错误。", 90026: "消息离线存储时间错误（最多不能超过7天）。", 90031: "JSON 格式请求包体中 SyncOtherMachine 字段不是 Integer 类型。", 90044: "JSON 格式请求包体中 MsgLifeTime 字段不是 Integer 类型。", 90048: "请求的用户帐号不存在。", 90054: "撤回请求中的 MsgKey 不合法。", 90994: "服务内部错误，请重试。", 90995: "服务内部错误，请重试。", 91e3: "服务内部错误，请重试。", 90992: "服务内部错误，请重试；如果所有请求都返回该错误码，且 App 配置了第三方回调，请检查 App 服务端是否正常向即时通信 IM 后台服务端返回回调结果。", 93e3: "JSON 数据包超长，消息包体请不要超过8k。", 91101: "Web 端长轮询被踢（Web 端同时在线实例个数超出限制）。", 10002: "服务端内部错误，请重试。", 10003: "请求中的接口名称错误，请核对接口名称并重试。", 10004: "参数非法，请根据错误描述检查请求是否正确。", 10005: "请求包体中携带的帐号数量过多。", 10006: "操作频率限制，请尝试降低调用的频率。", 10007: "操作权限不足，例如 Work 群组中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。", 10008: "请求非法，可能是请求中携带的签名信息验证不正确，请再次尝试。", 10009: "该群不允许群主主动退出。", 10010: "群组不存在，或者曾经存在过，但是目前已经被解散。", 10011: "解析 JSON 包体失败，请检查包体的格式是否符合 JSON 格式。", 10012: "发起操作的 UserID 非法，请检查发起操作的用户 UserID 是否填写正确。", 10013: "被邀请加入的用户已经是群成员。", 10014: "群已满员，无法将请求中的用户加入群组，如果是批量加人，可以尝试减少加入用户的数量。", 10015: "找不到指定 ID 的群组。", 10016: "App 后台通过第三方回调拒绝本次操作。", 10017: "因被禁言而不能发送消息，请检查发送者是否被设置禁言。", 10018: "应答包长度超过最大包长（1MB），请求的内容过多，请尝试减少单次请求的数据量。", 10019: "请求的用户帐号不存在。", 10021: "群组 ID 已被使用，请选择其他的群组 ID。", 10023: "发消息的频率超限，请延长两次发消息时间的间隔。", 10024: "此邀请或者申请请求已经被处理。", 10025: "群组 ID 已被使用，并且操作者为群主，可以直接使用。", 10026: "该 SDKAppID 请求的命令字已被禁用。", 10030: "请求撤回的消息不存在。", 10031: "消息撤回超过了时间限制（默认2分钟）。", 10032: "请求撤回的消息不支持撤回操作。", 10033: "群组类型不支持消息撤回操作。", 10034: "该消息类型不支持删除操作。", 10035: "直播群和在线成员广播大群不支持删除消息。", 10036: "直播群创建数量超过了限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买预付费套餐“IM直播群”。", 10037: "单个用户可创建和加入的群组数量超过了限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买或升级预付费套餐“单人可创建与加入群组数”。", 10038: "群成员数量超过限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买或升级预付费套餐“扩展群人数上限”。", 10041: "该应用（SDKAppID）已配置不支持群消息撤回。" },ht = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this)).code = e.code, o.message = pt[e.code] || e.message, o.data = e.data || {}, o;}return n;}(f(Error)),dt = { NO_SDKAPPID: 2e3, NO_ACCOUNT_TYPE: 2001, NO_IDENTIFIER: 2002, NO_USERSIG: 2003, NO_TINYID: 2022, NO_A2KEY: 2023, COS_UNDETECTED: 2040, MESSAGE_SEND_FAIL: 2100, MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS: 2103, MESSAGE_SEND_NEED_MESSAGE_INSTANCE: 2105, MESSAGE_SEND_INVALID_CONVERSATION_TYPE: 2106, MESSAGE_FILE_IS_EMPTY: 2108, MESSAGE_ONPROGRESS_FUNCTION_ERROR: 2109, MESSAGE_REVOKE_FAIL: 2110, MESSAGE_IMAGE_SELECT_FILE_FIRST: 2251, MESSAGE_IMAGE_TYPES_LIMIT: 2252, MESSAGE_IMAGE_SIZE_LIMIT: 2253, MESSAGE_AUDIO_UPLOAD_FAIL: 2300, MESSAGE_AUDIO_SIZE_LIMIT: 2301, MESSAGE_VIDEO_UPLOAD_FAIL: 2350, MESSAGE_VIDEO_SIZE_LIMIT: 2351, MESSAGE_VIDEO_TYPES_LIMIT: 2352, MESSAGE_FILE_UPLOAD_FAIL: 2400, MESSAGE_FILE_SELECT_FILE_FIRST: 2401, MESSAGE_FILE_SIZE_LIMIT: 2402, MESSAGE_FILE_URL_IS_EMPTY: 2403, CONVERSATION_NOT_FOUND: 2500, USER_OR_GROUP_NOT_FOUND: 2501, CONVERSATION_UN_RECORDED_TYPE: 2502, ILLEGAL_GROUP_TYPE: 2600, CANNOT_JOIN_WORK: 2601, CANNOT_CHANGE_OWNER_IN_AVCHATROOM: 2620, CANNOT_CHANGE_OWNER_TO_SELF: 2621, CANNOT_DISMISS_Work: 2622, JOIN_GROUP_FAIL: 2660, CANNOT_ADD_MEMBER_IN_AVCHATROOM: 2661, CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN: 2662, CANNOT_KICK_MEMBER_IN_AVCHATROOM: 2680, NOT_OWNER: 2681, CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM: 2682, INVALID_MEMBER_ROLE: 2683, CANNOT_SET_SELF_MEMBER_ROLE: 2684, CANNOT_MUTE_SELF: 2685, DEL_FRIEND_INVALID_PARAM: 2700, UPDATE_PROFILE_INVALID_PARAM: 2721, UPDATE_PROFILE_NO_KEY: 2722, ADD_BLACKLIST_INVALID_PARAM: 2740, DEL_BLACKLIST_INVALID_PARAM: 2741, CANNOT_ADD_SELF_TO_BLACKLIST: 2742, NETWORK_ERROR: 2800, NETWORK_TIMEOUT: 2801, NETWORK_BASE_OPTIONS_NO_URL: 2802, NETWORK_UNDEFINED_SERVER_NAME: 2803, NETWORK_PACKAGE_UNDEFINED: 2804, NO_NETWORK: 2805, CONVERTOR_IRREGULAR_PARAMS: 2900, NOTICE_RUNLOOP_UNEXPECTED_CONDITION: 2901, NOTICE_RUNLOOP_OFFSET_LOST: 2902, UNCAUGHT_ERROR: 2903, GET_LONGPOLL_ID_FAILED: 2904, SDK_IS_NOT_READY: 2999, LONG_POLL_KICK_OUT: 91101, MESSAGE_A2KEY_EXPIRED: 20002, ACCOUNT_A2KEY_EXPIRED: 70001, LONG_POLL_API_PARAM_ERROR: 90001 },ft = "无 SDKAppID",gt = "无 accountType",mt = "无 userID",_t = "无 userSig",yt = "无 tinyID",vt = "无 a2key",It = "未检测到 COS 上传插件",Mt = "消息发送失败",Ct = "MessageController.constructor() 需要参数 options",Et = "需要 Message 的实例",St = 'Message.conversationType 只能为 "C2C" 或 "GROUP"',Tt = "无法发送空文件",Dt = "回调函数运行时遇到错误，请检查接入侧代码",At = "消息撤回失败",kt = "请先选择一个图片",Rt = "只允许上传 jpg png jpeg gif 格式的图片",Ot = "图片大小超过20M，无法发送",Nt = "语音上传失败",Lt = "语音大小大于20M，无法发送",wt = "视频上传失败",Pt = "视频大小超过100M，无法发送",Gt = "只允许上传 mp4 格式的视频",bt = "文件上传失败",Ut = "请先选择一个文件",qt = "文件大小超过100M，无法发送 ",xt = "缺少必要的参数文件 URL",Ft = "没有找到相应的会话，请检查传入参数",Vt = "没有找到相应的用户或群组，请检查传入参数",Kt = "未记录的会话类型",Bt = "非法的群类型，请检查传入参数",Ht = "不能加入 Work 类型的群组",jt = "AVChatRoom 类型的群组不能转让群主",Yt = "不能把群主转让给自己",$t = "不能解散 Work 类型的群组",Wt = "加群失败，请检查传入参数或重试",zt = "AVChatRoom 类型的群不支持邀请群成员",Xt = "非 AVChatRoom 类型的群组不允许匿名加群，请先登录后再加群",Jt = "不能在 AVChatRoom 类型的群组踢人",Qt = "你不是群主，只有群主才有权限操作",Zt = "不能在 Work / AVChatRoom 类型的群中设置群成员身份",en = "不合法的群成员身份，请检查传入参数",tn = "不能设置自己的群成员身份，请检查传入参数",nn = "不能将自己禁言，请检查传入参数",rn = "传入 deleteFriend 接口的参数无效",on = "传入 updateMyProfile 接口的参数无效",sn = "updateMyProfile 无标配资料字段或自定义资料字段",an = "传入 addToBlacklist 接口的参数无效",un = "传入 removeFromBlacklist 接口的参数无效",cn = "不能拉黑自己",ln = "网络层初始化错误，缺少 URL 参数",pn = "打包错误，未定义的 serverName",hn = "未定义的 packageConfig",dn = "未连接到网络",fn = "不规范的参数名称",gn = "意料外的通知条件",mn = "_syncOffset 丢失",_n = "获取 longpolling id 失败",yn = "接口需要 SDK 处于 ready 状态后才能调用",vn = ["jpg", "jpeg", "gif", "png"],In = ["mp4"],Mn = function () {function e(n) {r(this, e);var o = this._check(n);if (o instanceof ht) throw o;this.type = t.MSG_FILE, this._percent = 0;var i = this._getFileInfo(n);this.content = { downloadFlag: 2, fileUrl: n.url || "", uuid: n.uuid, fileName: i.name || "", fileSize: i.size || 0 };}return i(e, [{ key: "_getFileInfo", value: function value(e) {if (e.fileName && e.fileSize) return { size: e.fileSize, name: e.fileName };if (N) return {};var t = e.file.files[0];return { size: t.size, name: t.name, type: t.type.slice(t.type.lastIndexOf("/") + 1).toLowerCase() };} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateFileUrl", value: function value(e) {this.content.fileUrl = e;} }, { key: "_check", value: function value(e) {if (e.size > 104857600) return new ht({ code: dt.MESSAGE_FILE_SIZE_LIMIT, message: "".concat(qt, ": ").concat(104857600, " bytes") });} }, { key: "sendable", value: function value() {return "" !== this.content.fileUrl && "" !== this.content.fileName && 0 !== this.content.fileSize;} }]), e;}(),Cn = function () {function e(n) {r(this, e), this.type = t.MSG_CUSTOM, this.content = { data: n.data || "", description: n.description || "", extension: n.extension || "" };}return i(e, [{ key: "setData", value: function value(e) {return this.content.data = e, this;} }, { key: "setDescription", value: function value(e) {return this.content.description = e, this;} }, { key: "setExtension", value: function value(e) {return this.content.extension = e, this;} }, { key: "sendable", value: function value() {return 0 !== this.content.data.length || 0 !== this.content.description.length || 0 !== this.content.extension.length;} }]), e;}(),En = function () {function e(n) {r(this, e), this.type = t.MSG_VIDEO, this._percent = 0, this.content = { remoteVideoUrl: n.remoteVideoUrl, videoFormat: n.videoFormat, videoSecond: parseInt(n.videoSecond, 10), videoSize: n.videoSize, videoUrl: n.videoUrl, videoDownloadFlag: 2, videoUUID: n.videoUUID, thumbUUID: n.thumbUUID, thumbFormat: n.thumbFormat, thumbWidth: n.thumbWidth, thumbHeight: n.thumbHeight, thumbSize: n.thumbSize, thumbDownloadFlag: 2, thumbUrl: n.thumbUrl };}return i(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateVideoUrl", value: function value(e) {e && (this.content.remoteVideoUrl = e);} }, { key: "sendable", value: function value() {return "" !== this.content.remoteVideoUrl;} }]), e;}(),Sn = function e(n) {r(this, e), this.type = t.MSG_GEO, this.content = n;},Tn = { 1: t.MSG_PRIORITY_HIGH, 2: t.MSG_PRIORITY_NORMAL, 3: t.MSG_PRIORITY_LOW, 4: t.MSG_PRIORITY_LOWEST },Dn = function () {function e(n) {r(this, e), this.ID = "", this.conversationID = n.conversationID || null, this.conversationType = n.conversationType || t.CONV_C2C, this.conversationSubType = n.conversationSubType, this.time = n.time || Math.ceil(Date.now() / 1e3), this.sequence = n.sequence || 0, this.clientSequence = n.clientSequence || n.sequence || 0, this.random = n.random || me(), this.priority = this._computePriority(n.priority), this.nick = "", this.avatar = "", this.isPeerRead = !1, this._elements = [], this.isPlaceMessage = n.isPlaceMessage || 0, this.isRevoked = 2 === n.isPlaceMessage || 8 === n.msgFlagBits, this.geo = {}, this.from = n.from || null, this.to = n.to || null, this.flow = "", this.isSystemMessage = n.isSystemMessage || !1, this.protocol = n.protocol || "JSON", this.isResend = !1, this.isRead = !1, this.status = n.status || be.SUCCESS, this.reInitialize(n.currentUser), this.extractGroupInfo(n.groupProfile || null);}return i(e, [{ key: "getElements", value: function value() {return this._elements;} }, { key: "extractGroupInfo", value: function value(e) {null !== e && (ee(e.fromAccountNick) && (this.nick = e.fromAccountNick), ee(e.fromAccountHeadurl) && (this.avatar = e.fromAccountHeadurl));} }, { key: "_initProxy", value: function value() {this.payload = this._elements[0].content, this.type = this._elements[0].type;} }, { key: "reInitialize", value: function value(e) {e && (this.status = this.from ? be.SUCCESS : be.UNSEND, !this.from && (this.from = e)), this._initFlow(e), this._initielizeSequence(e), this._concactConversationID(e), this.generateMessageID(e);} }, { key: "isSendable", value: function value() {return 0 !== this._elements.length && ("function" != typeof this._elements[0].sendable ? (J.warn("".concat(this._elements[0].type, ' need "boolean : sendable()" method')), !1) : this._elements[0].sendable());} }, { key: "_initTo", value: function value(e) {this.conversationType === t.CONV_GROUP && (this.to = e.groupID);} }, { key: "_initielizeSequence", value: function value(e) {0 === this.clientSequence && e && (this.clientSequence = function (e) {if (!e) return J.error("autoincrementIndex(string: key) need key parameter"), !1;if (void 0 === Ie[e]) {var t = new Date(),n = "3".concat(t.getHours()).slice(-2),r = "0".concat(t.getMinutes()).slice(-2),o = "0".concat(t.getSeconds()).slice(-2);Ie[e] = parseInt([n, r, o, "0001"].join("")), n = null, r = null, o = null, J.warn("utils.autoincrementIndex() create new sequence : ".concat(e, " = ").concat(Ie[e]));}return Ie[e]++;}(e)), 0 === this.sequence && this.conversationType === t.CONV_C2C && (this.sequence = this.clientSequence);} }, { key: "generateMessageID", value: function value(e) {var t = e === this.from ? 1 : 0,n = this.sequence > 0 ? this.sequence : this.clientSequence;this.ID = "".concat(this.conversationID, "-").concat(n, "-").concat(this.random, "-").concat(t);} }, { key: "_initFlow", value: function value(e) {"" !== e && (e === this.from ? (this.flow = "out", this.isRead = !0) : this.flow = "in");} }, { key: "_concactConversationID", value: function value(e) {var n = this.to,r = "",o = this.conversationType;o !== t.CONV_SYSTEM ? (r = o === t.CONV_C2C ? e === this.from ? n : this.from : this.to, this.conversationID = "".concat(o).concat(r)) : this.conversationID = t.CONV_SYSTEM;} }, { key: "isElement", value: function value(e) {return e instanceof qe || e instanceof ot || e instanceof it || e instanceof st || e instanceof Mn || e instanceof En || e instanceof ut || e instanceof lt || e instanceof Cn || e instanceof Sn;} }, { key: "setElement", value: function value(e) {var n = this;if (this.isElement(e)) return this._elements = [e], void this._initProxy();var r = function r(e) {switch (e.type) {case t.MSG_TEXT:n.setTextElement(e.content);break;case t.MSG_IMAGE:n.setImageElement(e.content);break;case t.MSG_AUDIO:n.setAudioElement(e.content);break;case t.MSG_FILE:n.setFileElement(e.content);break;case t.MSG_VIDEO:n.setVideoElement(e.content);break;case t.MSG_CUSTOM:n.setCustomElement(e.content);break;case t.MSG_GEO:n.setGEOElement(e.content);break;case t.MSG_GRP_TIP:n.setGroupTipElement(e.content);break;case t.MSG_GRP_SYS_NOTICE:n.setGroupSystemNoticeElement(e.content);break;case t.MSG_FACE:n.setFaceElement(e.content);break;default:J.warn(e.type, e.content, "no operation......");}};if (Array.isArray(e)) for (var o = 0; o < e.length; o++) {r(e[o]);} else r(e);this._initProxy();} }, { key: "setTextElement", value: function value(e) {var t = "string" == typeof e ? e : e.text,n = new qe({ text: t });this._elements.push(n);} }, { key: "setImageElement", value: function value(e) {var t = new ot(e);this._elements.push(t);} }, { key: "setAudioElement", value: function value(e) {var t = new st(e);this._elements.push(t);} }, { key: "setFileElement", value: function value(e) {var t = new Mn(e);this._elements.push(t);} }, { key: "setVideoElement", value: function value(e) {var t = new En(e);this._elements.push(t);} }, { key: "setGEOElement", value: function value(e) {var t = new Sn(e);this._elements.push(t);} }, { key: "setCustomElement", value: function value(e) {var t = new Cn(e);this._elements.push(t);} }, { key: "setGroupTipElement", value: function value(e) {if (e.operatorInfo) {var t = e.operatorInfo,n = t.nick,r = t.avatar;ee(n) && (this.nick = n), ee(r) && (this.avatar = r);}var o = new ut(e);this._elements.push(o);} }, { key: "setGroupSystemNoticeElement", value: function value(e) {var t = new lt(e);this._elements.push(t);} }, { key: "setFaceElement", value: function value(e) {var t = new it(e);this._elements.push(t);} }, { key: "setIsRead", value: function value(e) {this.isRead = e;} }, { key: "_computePriority", value: function value(e) {if (oe(e)) return t.MSG_PRIORITY_NORMAL;if (ee(e) && -1 !== Object.values(Tn).indexOf(e)) return e;if (Z(e)) {var n = "" + e;if (-1 !== Object.keys(Tn).indexOf(n)) return Tn[n];}return t.MSG_PRIORITY_NORMAL;} }, { key: "elements", get: function get() {return J.warn("！！！Message 实例的 elements 属性即将废弃，请尽快修改。使用 type 和 payload 属性处理单条消息，兼容组合消息使用 _elements 属性！！！"), this._elements;} }]), e;}(),An = function An(e) {return !!e && (!!(function (e) {return ee(e) && e.slice(0, 3) === t.CONV_C2C;}(e) || function (e) {return ee(e) && e.slice(0, 5) === t.CONV_GROUP;}(e) || Ae(e)) || (console.warn("非法的会话 ID:".concat(e, "。会话 ID 组成方式：\n  C2C + userID（单聊）\n  GROUP + groupID（群聊）\n  @TIM#SYSTEM（系统通知会话）")), !1));},kn = { login: { userID: { type: "String", required: !0 }, userSig: { type: "String", required: !0 } }, addToBlacklist: { userIDList: { type: "Array", required: !0 } }, mutilParam: [{ name: "paramName", type: "Number", required: !0 }, { name: "paramName", type: "String", required: !0 }], on: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("on 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("on 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。"), !0);} }], once: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("once 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("once 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("once 接口的 handler 参数推荐使用具名函数。"), !0);} }], off: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("off 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("off 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("off 接口的 handler 参数为匿名函数，无法取消订阅。"), !0);} }], sendMessage: [{ name: "message", type: "Object", required: !0 }], getMessageList: { conversationID: { type: "String", required: !0, validator: function validator(e) {return An(e);} }, nextReqMessageID: { type: "String" }, count: { type: "Number", validator: function validator(e) {return !(!oe(e) && !/^[1-9][0-9]*$/.test(e)) || (console.warn("getMessageList 接口的 count 参数必须为正整数"), !1);} } }, setMessageRead: { conversationID: { type: "String", required: !0, validator: function validator(e) {return An(e);} } }, getConversationProfile: [{ name: "conversationID", type: "String", required: !0, validator: function validator(e) {return An(e);} }], deleteConversation: [{ name: "conversationID", type: "String", required: !0, validator: function validator(e) {return An(e);} }], getGroupList: { groupProfileFilter: { type: "Array" } }, getGroupProfile: { groupID: { type: "String", required: !0 }, groupCustomFieldFilter: { type: "Array" }, memberCustomFieldFilter: { type: "Array" } }, getGroupProfileAdvance: { groupIDList: { type: "Array", required: !0 } }, createGroup: { name: { type: "String", required: !0 } }, joinGroup: { groupID: { type: "String", required: !0 }, type: { type: "String" }, applyMessage: { type: "String" } }, quitGroup: [{ name: "groupID", type: "String", required: !0 }], handleApplication: { message: { type: "Object", required: !0 }, handleAction: { type: "String", required: !0 }, handleMessage: { type: "String" } }, changeGroupOwner: { groupID: { type: "String", required: !0 }, newOwnerID: { type: "String", required: !0 } }, updateGroupProfile: { groupID: { type: "String", required: !0 }, muteAllMembers: { type: "Boolean" } }, dismissGroup: [{ name: "groupID", type: "String", required: !0 }], searchGroupByID: [{ name: "groupID", type: "String", required: !0 }], getGroupMemberList: { groupID: { type: "String", required: !0 }, offset: { type: "Number" }, count: { type: "Number" } }, getGroupMemberProfile: { groupID: { type: "String", required: !0 }, userIDList: { type: "Array", required: !0 }, memberCustomFieldFilter: { type: "Array" } }, addGroupMemeber: { groupID: { type: "String", required: !0 }, userIDList: { type: "Array", required: !0 } }, setGroupMemberRole: { groupID: { type: "String", required: !0 }, userID: { type: "String", required: !0 }, role: { type: "String", required: !0 } }, setGroupMemberMuteTime: { groupID: { type: "String", required: !0 }, userID: { type: "String", required: !0 }, muteTime: { type: "Number", validator: function validator(e) {return e >= 0;} } }, setGroupMemberNameCard: { groupID: { type: "String", required: !0 }, userID: { type: "String" }, nameCard: { type: "String", required: !0, validator: function validator(e) {return !0 !== /^\s+$/.test(e);} } }, setMessageRemindType: { groupID: { type: "String", required: !0 }, messageRemindType: { type: "String", required: !0 } }, setGroupMemberCustomField: { groupID: { type: "String", required: !0 }, userID: { type: "String" }, memberCustomField: { type: "Array", required: !0 } }, deleteGroupMember: { groupID: { type: "String", required: !0 } }, createTextMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return ee(e.text) ? 0 !== e.text.length || (console.warn("createTextMessage 消息内容不能为空。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createTextMessage"), !1) : (console.warn("createTextMessage payload.text 类型必须为字符串。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createTextMessage"), !1);} } }, createCustomMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return e.data && !ee(e.data) ? (console.warn("createCustomMessage payload.data 类型必须为 String。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createCustomMessage"), !1) : e.description && !ee(e.description) ? (console.warn("createCustomMessage payload.description 类型必须为 String。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createCustomMessage"), !1) : !(e.extension && !ee(e.extension)) || (console.warn("createCustomMessage payload.extension 类型必须为 String。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createCustomMessage"), !1);} } }, createImageMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (oe(e.file)) return console.warn("createImageMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;if (O) {if (!(e.file instanceof HTMLInputElement || Q(e.file))) return console.warn("createImageMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createImageMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;}return !0;}, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createImageMessage 没有 onProgress 回调，您将无法获取图片上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !0;} } } }, createAudioMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0 }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createAudioMessage 没有 onProgress 回调，您将无法获取音频上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createAudioMessage"), !0;} } }, createVideoMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (oe(e.file)) return console.warn("createVideoMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;if (O) {if (!(e.file instanceof HTMLInputElement || Q(e.file))) return console.warn("createVideoMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createVideoMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;}return !0;} }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createVideoMessage 没有 onProgress 回调，您将无法获取视频上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !0;} } }, createFaceMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return !!ne(e) && (Z(e.index) ? !!ee(e.data) || (console.warn("createFaceMessage payload.data 类型必须为 String！"), !1) : (console.warn("createFaceMessage payload.index 类型必须为 Number！"), !1));} } }, createFileMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (oe(e.file)) return console.warn("createFileMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;if (O) {if (!(e.file instanceof HTMLInputElement || Q(e.file))) return console.warn("createFileMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createFileMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;}return !0;} }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createFileMessage 没有 onProgress 回调，您将无法获取文件上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !0;} } }, revokeMessage: [{ name: "message", type: "Object", required: !0, validator: function validator(e) {return e instanceof Dn ? e.conversationType === t.CONV_SYSTEM ? (console.warn("revokeMessage 不能撤回系统会话消息，只能撤回单聊消息或群消息"), !1) : !0 !== e.isRevoked || (console.warn("revokeMessage 消息已经被撤回，请勿重复操作"), !1) : (console.warn("revokeMessage 参数 message 必须为 Message(https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html) 实例。"), !1);} }], getUserProfile: { userIDList: { type: "Array", validator: function validator(e) {return re(e) ? (0 === e.length && console.warn("getUserProfile userIDList 不能为空数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile"), !0) : (console.warn("getUserProfile userIDList 必须为数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile"), !1);} } }, updateMyProfile: { profileCustomField: { type: "Array", validator: function validator(e) {return !!oe(e) || !!re(e) || (console.warn("updateMyProfile profileCustomField 必须为数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile"), !1);} } } },Rn = { login: "login", logout: "logout", on: "on", once: "once", off: "off", setLogLevel: "setLogLevel", downloadLog: "downloadLog", registerPlugin: "registerPlugin", destroy: "destroy", createTextMessage: "createTextMessage", createImageMessage: "createImageMessage", createAudioMessage: "createAudioMessage", createVideoMessage: "createVideoMessage", createCustomMessage: "createCustomMessage", createFaceMessage: "createFaceMessage", createFileMessage: "createFileMessage", sendMessage: "sendMessage", resendMessage: "resendMessage", getMessageList: "getMessageList", setMessageRead: "setMessageRead", revokeMessage: "revokeMessage", getConversationList: "getConversationList", getConversationProfile: "getConversationProfile", deleteConversation: "deleteConversation", getGroupList: "getGroupList", getGroupProfile: "getGroupProfile", createGroup: "createGroup", joinGroup: "joinGroup", updateGroupProfile: "updateGroupProfile", quitGroup: "quitGroup", dismissGroup: "dismissGroup", changeGroupOwner: "changeGroupOwner", searchGroupByID: "searchGroupByID", setMessageRemindType: "setMessageRemindType", handleGroupApplication: "handleGroupApplication", getGroupMemberProfile: "getGroupMemberProfile", getGroupMemberList: "getGroupMemberList", addGroupMember: "addGroupMember", deleteGroupMember: "deleteGroupMember", setGroupMemberNameCard: "setGroupMemberNameCard", setGroupMemberMuteTime: "setGroupMemberMuteTime", setGroupMemberRole: "setGroupMemberRole", setGroupMemberCustomField: "setGroupMemberCustomField", getMyProfile: "getMyProfile", getUserProfile: "getUserProfile", updateMyProfile: "updateMyProfile", getBlacklist: "getBlacklist", addToBlacklist: "addToBlacklist", removeFromBlacklist: "removeFromBlacklist", getFriendList: "getFriendList" },On = "1.7.3",Nn = "537048168",Ln = "10",wn = "protobuf",Pn = "json",Gn = { HOST: { TYPE: 3, ACCESS_LAYER_TYPES: { SANDBOX: 1, TEST: 2, PRODUCTION: 3 }, CURRENT: { COMMON: "https://webim.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, PRODUCTION: { COMMON: "https://webim.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, SANDBOX: { COMMON: "https://events.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, TEST: { COMMON: "https://test.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://test.tim.qq.com" }, setCurrent: function setCurrent() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;switch (e) {case this.ACCESS_LAYER_TYPES.SANDBOX:this.CURRENT = this.SANDBOX, this.TYPE = this.ACCESS_LAYER_TYPES.SANDBOX;break;case this.ACCESS_LAYER_TYPES.TEST:this.CURRENT = this.TEST, this.TYPE = this.ACCESS_LAYER_TYPES.TEST;break;default:this.CURRENT = this.PRODUCTION, this.TYPE = this.ACCESS_LAYER_TYPES.PRODUCTION;}} }, NAME: { OPEN_IM: "openim", GROUP: "group_open_http_svc", FRIEND: "sns", PROFILE: "profile", RECENT_CONTACT: "recentcontact", PIC: "openpic", BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc", BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc", IM_OPEN_STAT: "imopenstat", WEB_IM: "webim", IM_COS_SIGN: "im_cos_sign_svr" }, CMD: { ACCESS_LAYER: "accesslayer", LOGIN: "login", LOGOUT_LONG_POLL: "longpollinglogout", LOGOUT_ALL: "logout", PORTRAIT_GET: "portrait_get_all", PORTRAIT_SET: "portrait_set", GET_LONG_POLL_ID: "getlongpollingid", LONG_POLL: "longpolling", AVCHATROOM_LONG_POLL: "get_msg", FRIEND_ADD: "friend_add", FRIEND_GET_ALL: "friend_get_all", FRIEND_DELETE: "friend_delete", RESPONSE_PENDENCY: "friend_response", GET_PENDENCY: "pendency_get", DELETE_PENDENCY: "pendency_delete", GET_GROUP_PENDENCY: "get_pendency", GET_BLACKLIST: "black_list_get", ADD_BLACKLIST: "black_list_add", DELETE_BLACKLIST: "black_list_delete", CREATE_GROUP: "create_group", GET_JOINED_GROUPS: "get_joined_group_list", SEND_MESSAGE: "sendmsg", REVOKE_C2C_MESSAGE: "msgwithdraw", SEND_GROUP_MESSAGE: "send_group_msg", REVOKE_GROUP_MESSAGE: "group_msg_recall", GET_GROUP_INFO: "get_group_info", GET_GROUP_MEMBER_INFO: "get_specified_group_member_info", GET_GROUP_MEMBER_LIST: "get_group_member_info", QUIT_GROUP: "quit_group", CHANGE_GROUP_OWNER: "change_group_owner", DESTROY_GROUP: "destroy_group", ADD_GROUP_MEMBER: "add_group_member", DELETE_GROUP_MEMBER: "delete_group_member", SEARCH_GROUP_BY_ID: "get_group_public_info", APPLY_JOIN_GROUP: "apply_join_group", HANDLE_APPLY_JOIN_GROUP: "handle_apply_join_group", MODIFY_GROUP_INFO: "modify_group_base_info", MODIFY_GROUP_MEMBER_INFO: "modify_group_member_info", DELETE_GROUP_SYSTEM_MESSAGE: "deletemsg", GET_CONVERSATION_LIST: "get", PAGING_GET_CONVERSATION_LIST: "page_get", DELETE_CONVERSATION: "delete", GET_MESSAGES: "getmsg", GET_C2C_ROAM_MESSAGES: "getroammsg", GET_GROUP_ROAM_MESSAGES: "group_msg_get", SET_C2C_MESSAGE_READ: "msgreaded", GET_PEER_READ_TIME: "get_peer_read_time", SET_GROUP_MESSAGE_READ: "msg_read_report", FILE_READ_AND_WRITE_AUTHKEY: "authkey", FILE_UPLOAD: "pic_up", COS_SIGN: "cos", TIM_WEB_REPORT: "tim_web_report", BIG_DATA_HALLWAY_AUTH_KEY: "authkey" }, CHANNEL: { SOCKET: 1, XHR: 2, AUTO: 0 }, NAME_VERSION: { openim: "v4", group_open_http_svc: "v4", sns: "v4", profile: "v4", recentcontact: "v4", openpic: "v4", group_open_http_noauth_svc: "v1", group_open_long_polling_http_noauth_svc: "v1", imopenstat: "v4", im_cos_sign_svr: "v4", webim: "v4" } };Gn.HOST.setCurrent(Gn.HOST.ACCESS_LAYER_TYPES.PRODUCTION);var bn = { request: { toAccount: "To_Account", fromAccount: "From_Account", to: "To_Account", from: "From_Account", groupID: "GroupId", avatar: "FaceUrl" }, response: { GroupId: "groupID", Member_Account: "userID", MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", MsgSeq: "sequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", MsgBody: "elements", GroupWithdrawInfoArray: "revokedInfos", WithdrawC2cMsgNotify: "c2cMessageRevokedNotify", C2cWithdrawInfoArray: "revokedInfos", C2cReadedReceipt: "c2cMessageReadReceipt", LastReadTime: "peerReadTime", MsgRand: "random", MsgType: "type", MsgShow: "messageShow", NextMsgSeq: "nextMessageSeq", FaceUrl: "avatar", ProfileDataMod: "profileModify", Profile_Account: "userID", ValueBytes: "value", ValueNum: "value", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation", Operator_Account: "operatorID", OpType: "operationType", ReportType: "operationType", UserId: "userID", User_Account: "userID", List_Account: "userIDList", MsgOperatorMemberExtraInfo: "operatorInfo", MsgMemberExtraInfo: "memberInfoList", ImageUrl: "avatar", NickName: "nick", MsgGroupNewInfo: "newGroupProfile", MsgAppDefinedData: "groupCustomField", Owner_Account: "ownerID", GroupName: "name", GroupFaceUrl: "avatar", GroupIntroduction: "introduction", GroupNotification: "notification", GroupApplyJoinOption: "joinOption", MsgKey: "messageKey", GroupInfo: "groupProfile", ShutupTime: "muteTime", Desc: "description", Ext: "extension" }, ignoreKeyWord: ["C2C", "ID", "USP"] },Un = "_contextWasUpdated",qn = "_contextWasReset",xn = "_a2KeyAndTinyIDUpdated",Fn = "_specifiedConfigUpdated",Vn = "_noticeIsSynchronizing",Kn = "_noticeIsSynchronized",Bn = "_messageSent",Hn = "_syncMessageProcessing",jn = "_syncMessageFinished",Yn = "_receiveInstantMessage",$n = "_receiveGroupInstantMessage",Wn = "_receveGroupSystemNotice",zn = "_messageRevoked",Xn = "_longPollGetIDFailed",Jn = "_longPollRequestFailed",Qn = "_longPollResponseOK",Zn = "_longPollFastStart",er = "_longPollSlowStart",tr = "_longPollKickedOut",nr = "_longPollMitipuleDeviceKickedOut",rr = "_longPollGetNewC2CNotice",or = "_longPollGetNewGroupMessages",ir = "_longPollGetNewGroupTips",sr = "_longPollGetNewGroupNotice",ar = "_longPollGetNewFriendMessages",ur = "_longPollProfileModified",cr = "_longPollNoticeReceiveSystemOrders",lr = " _longpollGroupMessageRevoked",pr = "_longpollC2CMessageRevoked",hr = "_longpollC2CMessageReadReceipt",dr = "_avlongPollRequestFailed",fr = "_avlongPollResponseOK",gr = "_onGroupListUpdated",mr = "_loginSuccess",_r = "_signLogoutExcuting",yr = "_logoutSuccess",vr = "_a2keyExpired",Ir = "_errorHasBeenDetected",Mr = "_onConversationListUpdated",Cr = "_onConversationListProfileUpdated",Er = "_conversationDeleted",Sr = "onProfileUpdated",Tr = "joinAVChatRoomSuccess",Dr = "joinAVChatRoomSuccessNoAuth",Ar = "_sdkStateReady";function kr(e, t) {if ("string" != typeof e && !Array.isArray(e)) throw new TypeError("Expected the input to be `string | string[]`");t = Object.assign({ pascalCase: !1 }, t);var n;return 0 === (e = Array.isArray(e) ? e.map(function (e) {return e.trim();}).filter(function (e) {return e.length;}).join("-") : e.trim()).length ? "" : 1 === e.length ? t.pascalCase ? e.toUpperCase() : e.toLowerCase() : (e !== e.toLowerCase() && (e = Rr(e)), e = e.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (e, t) {return t.toUpperCase();}).replace(/\d+(\w|$)/g, function (e) {return e.toUpperCase();}), n = e, t.pascalCase ? n.charAt(0).toUpperCase() + n.slice(1) : n);}var Rr = function Rr(e) {for (var t = !1, n = !1, r = !1, o = 0; o < e.length; o++) {var i = e[o];t && /[a-zA-Z]/.test(i) && i.toUpperCase() === i ? (e = e.slice(0, o) + "-" + e.slice(o), t = !1, r = n, n = !0, o++) : n && r && /[a-zA-Z]/.test(i) && i.toLowerCase() === i ? (e = e.slice(0, o - 1) + "-" + e.slice(o - 1), r = n, n = !1, t = !0) : (t = i.toLowerCase() === i && i.toUpperCase() !== i, r = n, n = i.toUpperCase() === i && i.toLowerCase() !== i);}return e;};function Or(e, t, n) {var r = [],o = 0,i = function e(t, n) {if (++o > 10) return o--, t;if (re(t)) {var i = t.map(function (t) {return te(t) ? e(t, n) : t;});return o--, i;}if (te(t)) {var s = (a = t, u = function u(e, t) {if (!ce(t)) return !1;if ((s = t) !== kr(s)) {for (var o = !0, i = 0; i < bn.ignoreKeyWord.length; i++) {if (t.includes(bn.ignoreKeyWord[i])) {o = !1;break;}}o && r.push(t);}var s;return oe(n[t]) ? function (e) {return "OPPOChannelID" === e ? e : e[0].toUpperCase() + kr(e).slice(1);}(t) : n[t];}, c = Object.create(null), Object.keys(a).forEach(function (e) {var t = u(a[e], e);t && (c[t] = a[e]);}), c);return s = ke(s, function (t, r) {return re(t) || te(t) ? e(t, n) : t;}), o--, s;}var a, u, c;}(e, t = u({}, bn.request, {}, t));return r.length > 0 && n.innerEmitter.emit(Ir, { code: dt.CONVERTOR_IRREGULAR_PARAMS, message: fn }), i;}function Nr(e, t) {if (t = u({}, bn.response, {}, t), re(e)) return e.map(function (e) {return te(e) ? Nr(e, t) : e;});if (te(e)) {var n = (r = e, o = function o(e, n) {return oe(t[n]) ? kr(n) : t[n];}, i = {}, Object.keys(r).forEach(function (e) {i[o(r[e], e)] = r[e];}), i);return n = ke(n, function (e) {return re(e) || te(e) ? Nr(e, t) : e;});}var r, o, i;}var Lr = function () {function e(t) {var n = this;r(this, e), this.url = "", this.requestData = null, this.method = t.method || "POST", this.callback = function (e) {return Nr(e = t.decode(e), n._getResponseMap(t));}, this._initializeServerMap(), this._initializeURL(t), this._initializeRequestData(t);}return i(e, [{ key: "_initializeServerMap", value: function value() {this._serverMap = Object.create(null);var e = "";for (var t in Gn.NAME) {if (Object.prototype.hasOwnProperty.call(Gn.NAME, t)) switch (e = Gn.NAME[t]) {case Gn.NAME.PIC:this._serverMap[e] = Gn.HOST.CURRENT.PIC;break;case Gn.NAME.IM_COS_SIGN:this._serverMap[e] = Gn.HOST.CURRENT.COS;break;default:this._serverMap[e] = Gn.HOST.CURRENT.COMMON;}}} }, { key: "_getHost", value: function value(e) {if (void 0 !== this._serverMap[e]) return this._serverMap[e];throw new ht({ code: dt.NETWORK_UNDEFINED_SERVER_NAME, message: pn });} }, { key: "_initializeURL", value: function value(e) {var t = e.serverName,n = e.cmd,r = this._getHost(t),o = "".concat(r, "/").concat(Gn.NAME_VERSION[t], "/").concat(t, "/").concat(n);o += "?".concat(this._getQueryString(e.queryString)), this.url = o;} }, { key: "getUrl", value: function value() {return this.url.replace(/&reqtime=(\d+)/, "&reqtime=".concat(Math.ceil(+new Date() / 1e3)));} }, { key: "_initializeRequestData", value: function value(e) {var t,n = e.requestData;t = this._requestDataCleaner(n), this.requestData = e.encode(t);} }, { key: "_requestDataCleaner", value: function value(e) {var t = Array.isArray(e) ? [] : Object.create(null);for (var r in e) {Object.prototype.hasOwnProperty.call(e, r) && ce(r) && null !== e[r] && ("object" !== n(e[r]) ? t[r] = e[r] : t[r] = this._requestDataCleaner.bind(this)(e[r]));}return t;} }, { key: "_getQueryString", value: function value(e) {var t = [];for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && ("function" != typeof e[n] ? t.push("".concat(n, "=").concat(e[n])) : t.push("".concat(n, "=").concat(e[n]())));}return t.join("&");} }, { key: "_getResponseMap", value: function value(e) {if (e.keyMaps && e.keyMaps.response && Object.keys(e.keyMaps.response).length > 0) return e.keyMaps.response;} }]), e;}();function wr(e) {this.mixin(e);}wr.mixin = function (e) {var t = e.prototype || e;t._isReady = !1, t.ready = function (e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e) return this._isReady ? void (t ? e.call(this) : setTimeout(e, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e));}, t.triggerReady = function () {var e = this;this._isReady = !0, setTimeout(function () {var t = e._readyQueue;e._readyQueue = [], t && t.length > 0 && t.forEach(function (e) {e.call(this);}, e);}, 1);}, t.resetReady = function () {this._isReady = !1, this._readyQueue = [];}, t.isReady = function () {return this._isReady;};};var Pr = function () {function e(t) {r(this, e), wr.mixin(this), this.tim = t;}return i(e, [{ key: "isLoggedIn", value: function value() {return this.tim.context.login === Ge.IS_LOGIN || !!this.tim.context.a2Key;} }, { key: "createTransportCapsule", value: function value(e) {var t = this.tim.packageConfig.get(e);return t ? new Lr(t) : null;} }, { key: "request", value: function value(e) {var t = this.createTransportCapsule(e);return t || J.error("unknown transport capsule, please check!", e), this.tim.connectionController.request(t);} }, { key: "emitInnerEvent", value: function value(e, t) {this.tim.innerEmitter.emit(e, t);} }, { key: "emitOuterEvent", value: function value(e, t) {this.tim.outerEmitter.emit(e, t);} }, { key: "reset", value: function value() {J.warn(["method: IMController.reset() method must be implemented"].join());} }, { key: "probeNetwork", value: function value() {return this.tim.netMonitor.probe();} }, { key: "getNetworkType", value: function value() {return this.tim.netMonitor.getNetworkType();} }, { key: "getPlatform", value: function value() {var e = "web";return K ? e = "wechat" : N && (e = "wxmp"), e;} }]), e;}(),Gr = function () {function e(t, n) {r(this, e), this.data = t, this._innerEmitter = n, this.defaultData = {}, Object.assign(this.defaultData, t), this.initGetterAndSetter();}return i(e, [{ key: "initGetterAndSetter", value: function value() {var e = this,t = function t(_t2) {Object.defineProperty(e, _t2, { enumerable: !0, configurable: !0, get: function get() {return e.data[_t2];}, set: function set(n) {e.data[_t2] !== n && (e.data[_t2] = n, e.onChange.bind(e)(_t2, n));} });};for (var n in e.data) {Object.prototype.hasOwnProperty.call(e.data, n) && t(n);}} }, { key: "onChange", value: function value(e, t) {this._innerEmitter.emit(Un, { key: e, value: t });} }, { key: "reset", value: function value() {for (var e in J.log("Context.reset"), this.data) {Object.prototype.hasOwnProperty.call(this.data, e) && (this.data[e] = this.defaultData.hasOwnProperty(e) ? this.defaultData[e] : null);}} }]), e;}(),br = function (e) {c(n, e);var t = _(n);function n(e) {var o;r(this, n);var i = (o = t.call(this, e)).tim.loginInfo;return o._context = new Gr({ login: Ge.IS_NOT_LOGIN, SDKAppID: i.SDKAppID, appIDAt3rd: null, accountType: i.accountType, identifier: i.identifier, tinyID: null, identifierNick: i.identifierNick, userSig: i.userSig, a2Key: null, contentType: "json", apn: 1, unlimitedAVChatRoom: i.unlimitedAVChatRoom }, o.tim.innerEmitter), o._initListener(), o;}return i(n, [{ key: "reset", value: function value() {this._context.reset(), this.emitInnerEvent(qn);} }, { key: "_initListener", value: function value() {this.tim.innerEmitter.on(Un, this._onContextMemberChange, this), this.tim.innerEmitter.on(mr, this._updateA2KeyAndTinyID, this);} }, { key: "_updateA2KeyAndTinyID", value: function value(e) {var t = e.data,n = t.a2Key,r = t.tinyID;this._context.a2Key = n, this._context.tinyID = r, this.emitInnerEvent(xn), this.triggerReady();} }, { key: "getContext", value: function value() {return this._context;} }, { key: "_onContextMemberChange", value: function value(e) {var t = e.data,n = t.key,r = t.value;("tinyID" === n || "a2Key" === n) && (r.length <= 0 ? this._context.login = Ge.IS_NOT_LOGIN : this._context.login = null !== this._context.a2Key ? Ge.IS_LOGIN : Ge.IS_NOT_LOGIN);} }]), n;}(Pr),Ur = function e(t) {r(this, e), this.code = 0, this.data = t || {};},qr = null,xr = function xr(e) {qr = e;},Fr = function Fr(e) {return e instanceof Ur ? (J.warn("IMPromise.resolve 此函数会自动用options创建IMResponse实例，调用侧不需创建，建议修改！"), Promise.resolve(e)) : Promise.resolve(new Ur(e));},Vr = function Vr(t) {var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (t instanceof ht) return n && null !== qr && qr.emit(e.ERROR, t), Promise.reject(t);if (t instanceof Error) {var r = new ht({ code: dt.UNCAUGHT_ERROR, message: t.message });return n && null !== qr && qr.emit(e.ERROR, r), Promise.reject(r);}if (oe(t) || oe(t.code) || oe(t.message)) J.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");else {if (Z(t.code) && ee(t.message)) {var o = new ht(t);return n && null !== qr && qr.emit(e.ERROR, o), Promise.reject(o);}J.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!");}},Kr = { SDK_READY: "sdkReady", LOGIN: "login", LONG_POLLING: "longpolling", LONG_POLLING_AV: "longpollingAV", SEND_MESSAGE: "sendMessage", SEND_MESSAGE_C2C: "sendMessageC2C", SEND_MESSAGE_GROUP_WORK: "sendMessageGroupWork", SEND_MESSAGE_GROUP_PUBLIC: "sendMessageGroupPublic", SEND_MESSAGE_GROUP_MEETING: "sendMessageGroupMeeting", SEND_MESSAGE_GROUP_AV: "sendMessageGroupAV", MESSAGE_RECEIVED: "messageReceived", MESSAGE_RECEIVED_AV: "messageReceivedAV", INIT_CONVERSATION_LIST: "initConversationList", INIT_GROUP_LIST: "initGroupList", UPLOAD: "upload" },Br = function () {function e() {r(this, e), this.SDKAppID = "", this.version = "", this.tinyID = "", this.userID = "", this.platform = "", this.method = "", this.time = "", this.startts = 0, this.endts = 0, this.timespan = 0, this.codeint = 0, this.message = "", this.text = "", this.msgType = "", this.networkType = "", this.platform = "", this._sentFlag = !1;}return i(e, [{ key: "setCommonInfo", value: function value(e, t, n, r, o) {this.SDKAppID = "".concat(e), this.version = "".concat(t), this.tinyID = n, this.userID = r, this.platform = o, this.time = fe(), this.startts && this.endts && !this.timespan && (this.timespan = Math.abs(this.endts - this.startts));} }, { key: "setMethod", value: function value(e) {return this.method = e, this;} }, { key: "setStart", value: function value() {this.startts = Date.now();} }, { key: "setEnd", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];this._sentFlag || (this.endts = Date.now(), t ? (this._sentFlag = !0, this._eventStatController.pushIn(this)) : setTimeout(function () {e._sentFlag = !0, e._eventStatController.pushIn(e);}, 0));} }, { key: "setError", value: function value(e, t, n) {return e instanceof Error ? (this._sentFlag || (this.setNetworkType(n), t ? (e.code && this.setCode(e.code), e.message && this.setMessage(e.message)) : (this.setCode(dt.NO_NETWORK), this.setMessage(dn))), this) : (J.warn("SSOLogData.setError value not instanceof Error, please check!"), this);} }, { key: "setCode", value: function value(e) {return oe(e) || this._sentFlag || ("ECONNABORTED" === e && (this.codeint = 103), Z(e) ? this.codeint = e : J.warn("SSOLogData.setCode value not a number, please check!", e, n(e))), this;} }, { key: "setMessage", value: function value(e) {return oe(e) || this._sentFlag ? this : ee(e) ? (this.message = e, this) : this;} }, { key: "setText", value: function value(e) {return Z(e) ? this.text = e.toString() : ee(e) && (this.text = e), this;} }, { key: "setMessageType", value: function value(e) {return this.msgType = e, this;} }, { key: "setNetworkType", value: function value(e) {return oe(e) ? J.warn("SSOLogData.setNetworkType value is undefined, please check!") : this.networkType = e, this;} }], [{ key: "bindController", value: function value(t) {e.prototype._eventStatController = t;} }]), e;}(),Hr = "sdkConstruct",jr = "sdkReady",Yr = "accessLayer",$r = "login",Wr = "logout",zr = "kickedOut",Xr = "registerPlugin",Jr = "getCosAuthKey",Qr = "upload",Zr = "sendMessage",eo = "getC2CRoamingMessages",to = "getGroupRoamingMessages",no = "revokeMessage",ro = "setC2CMessageRead",oo = "setGroupMessageRead",io = "emptyMessageBody",so = "getPeerReadTime",ao = "getConversationList",uo = "getConversationProfile",co = "deleteConversation",lo = "getConversationListInStorage",po = "syncConversationList",ho = "createGroup",fo = "applyJoinGroup",go = "quitGroup",mo = "searchGroupByID",_o = "changeGroupOwner",yo = "handleGroupApplication",vo = "setMessageRemindType",Io = "dismissGroup",Mo = "updateGroupProfile",Co = "getGroupList",Eo = "getGroupProfile",So = "getGroupListInStorage",To = "getGroupLastSequence",Do = "getGroupMemberList",Ao = "getGroupMemberProfile",ko = "addGroupMember",Ro = "deleteGroupMember",Oo = "setGroupMemberMuteTime",No = "setGroupMemberNameCard",Lo = "setGroupMemberRole",wo = "setGroupMemberCustomField",Po = "getLongPollID",Go = "longPollingError",bo = "networkJitter",Uo = "fastStart",qo = "slowStart",xo = "messageLoss",Fo = "getUserProfile",Vo = "updateMyProfile",Ko = "getBlacklist",Bo = "addToBlacklist",Ho = "removeFromBlacklist",jo = "mpHideToShow",Yo = "callbackFunctionError",$o = "exceptionError",Wo = function (n) {c(s, n);var o = _(s);function s(e) {var t;return r(this, s), (t = o.call(this, e))._initializeListener(), t;}return i(s, [{ key: "login", value: function value(e) {if (this.isLoggedIn()) {var t = "您已经登录账号".concat(e.identifier, "！如需切换账号登录，请先调用 logout 接口登出，再调用 login 接口登录。");return J.warn(t), Fr({ actionStatus: "OK", errorCode: 0, errorInfo: t, repeatLogin: !0 });}J.log("SignController.login userID=", e.identifier), J.time(Kr.LOGIN);var n = this._checkLoginInfo(e);return Oe(n) ? (this.tim.context.identifier = e.identifier, this.tim.context.userSig = e.userSig, this.tim.context.identifier && this.tim.context.userSig ? this._accessLayer() : void 0) : Vr(n);} }, { key: "_isLoginCurrentUser", value: function value(e) {return this.tim.context.identifier === e;} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(tr, this._onMultipleAccountKickedOut, this), e.on(nr, this._onMultipleDeviceKickedOut, this), e.on(vr, this._onUserSigExpired, this);} }, { key: "_accessLayer", value: function value() {var e = this,t = new Br();return t.setMethod(Yr).setStart(), J.log("SignController._accessLayer."), this.request({ name: "accessLayer", action: "query" }).then(function (n) {return t.setCode(0).setNetworkType(e.getNetworkType()).setText(n.data.webImAccessLayer).setEnd(), J.log("SignController._accessLayer ok. webImAccessLayer=".concat(n.data.webImAccessLayer)), 1 === n.data.webImAccessLayer && Gn.HOST.setCurrent(n.data.webImAccessLayer), e._login();}).catch(function (n) {return e.probeNetwork().then(function (r) {var o = y(r, 2),i = o[0],s = o[1];t.setError(n, i, s).setEnd(!0), e.tim.eventStatController.reportAtOnce();}), J.error("SignController._accessLayer failed. error:", n), Vr(n);});} }, { key: "_login", value: function value() {var e = this,t = new Br();return t.setMethod($r).setStart(), this.request({ name: "login", action: "query" }).then(function (n) {var r = null;if (!n.data.tinyID) throw r = new ht({ code: dt.NO_TINYID, message: yt }), t.setError(r, !0, e.getNetworkType()).setEnd(), r;if (!n.data.a2Key) throw r = new ht({ code: dt.NO_A2KEY, message: vt }), t.setError(r, !0, e.getNetworkType()).setEnd(), r;return t.setCode(0).setNetworkType(e.getNetworkType()).setText("".concat(e.tim.loginInfo.identifier)).setEnd(), J.log("SignController.login ok. userID=".concat(e.tim.loginInfo.identifier, " loginCost=").concat(J.timeEnd(Kr.LOGIN), "ms")), e.emitInnerEvent(mr, { a2Key: n.data.a2Key, tinyID: n.data.tinyID }), Fr(n.data);}).catch(function (n) {return e.probeNetwork().then(function (e) {var r = y(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd(!0);}), J.error("SignController.login failed. error:", n), Vr(n);});} }, { key: "logout", value: function value() {var e = new Br();return e.setMethod(Wr).setStart(), e.setCode(0).setNetworkType(this.getNetworkType()).setText("userID=".concat(this.tim.loginInfo.identifier, " type=").concat("longPollLogout")).setEnd(!0), J.info("SignController.logout"), this.emitInnerEvent(_r), this._logout(Ze).then(this._emitLogoutSuccess.bind(this)).catch(this._emitLogoutSuccess.bind(this));} }, { key: "_logout", value: function value(e) {var t = this.tim.notificationController,n = e === Qe ? "logout" : "longPollLogout",r = e === Qe ? { name: n, action: "query" } : { name: n, action: "query", param: { longPollID: t.getLongPollID() } };return this.request(r).catch(function (e) {return J.error("SignController._logout error:", e), Vr(e);});} }, { key: "_checkLoginInfo", value: function value(e) {var t = 0,n = "";return null === e.SDKAppID ? (t = dt.NO_SDKAPPID, n = ft) : null === e.accountType ? (t = dt.NO_ACCOUNT_TYPE, n = gt) : null === e.identifier ? (t = dt.NO_IDENTIFIER, n = mt) : null === e.userSig && (t = dt.NO_USERSIG, n = _t), Oe(t) || Oe(n) ? {} : { code: t, message: n };} }, { key: "_emitLogoutSuccess", value: function value() {return this.emitInnerEvent(yr), Fr({});} }, { key: "_onMultipleAccountKickedOut", value: function value() {var n = this,r = new Br();r.setMethod(zr).setStart(), r.setCode(0).setNetworkType(this.getNetworkType()).setText(t.KICKED_OUT_MULT_ACCOUNT).setEnd(!0), J.warn("SignController._onMultipleAccountKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)), this.tim.logout().then(function () {n.emitOuterEvent(e.KICKED_OUT, { type: t.KICKED_OUT_MULT_ACCOUNT });});} }, { key: "_onMultipleDeviceKickedOut", value: function value() {var n = this,r = new Br();r.setMethod(zr).setStart(), r.setCode(0).setNetworkType(this.getNetworkType()).setText(t.KICKED_OUT_MULT_DEVICE).setEnd(!0), J.warn("SignController._onMultipleDeviceKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)), this.tim.logout().then(function () {n.emitOuterEvent(e.KICKED_OUT, { type: t.KICKED_OUT_MULT_DEVICE });});} }, { key: "_onUserSigExpired", value: function value() {var n = new Br();n.setMethod(zr).setStart(), n.setCode(0).setNetworkType(this.getNetworkType()).setText(t.KICKED_OUT_USERSIG_EXPIRED).setEnd(!0), J.warn("SignController._onUserSigExpired: userSig 签名过期被踢下线"), this.emitOuterEvent(e.KICKED_OUT, { type: t.KICKED_OUT_USERSIG_EXPIRED }), this.tim.resetSDK();} }, { key: "reset", value: function value() {J.info("SignController.reset");} }]), s;}(Pr),zo = function zo(e, t) {return function () {for (var n = new Array(arguments.length), r = 0; r < n.length; r++) {n[r] = arguments[r];}return e.apply(t, n);};},Xo = Object.prototype.toString;function Jo(e) {return "[object Array]" === Xo.call(e);}function Qo(e) {return void 0 === e;}function Zo(e) {return null !== e && "object" == typeof e;}function ei(e) {return "[object Function]" === Xo.call(e);}function ti(e, t) {if (null != e) if ("object" != typeof e && (e = [e]), Jo(e)) for (var n = 0, r = e.length; n < r; n++) {t.call(null, e[n], n, e);} else for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);}}var ni = { isArray: Jo, isArrayBuffer: function isArrayBuffer(e) {return "[object ArrayBuffer]" === Xo.call(e);}, isBuffer: function isBuffer(e) {return null !== e && !Qo(e) && null !== e.constructor && !Qo(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}, isFormData: function isFormData(e) {return "undefined" != typeof FormData && e instanceof FormData;}, isArrayBufferView: function isArrayBufferView(e) {return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;}, isString: function isString(e) {return "string" == typeof e;}, isNumber: function isNumber(e) {return "number" == typeof e;}, isObject: Zo, isUndefined: Qo, isDate: function isDate(e) {return "[object Date]" === Xo.call(e);}, isFile: function isFile(e) {return "[object File]" === Xo.call(e);}, isBlob: function isBlob(e) {return "[object Blob]" === Xo.call(e);}, isFunction: ei, isStream: function isStream(e) {return Zo(e) && ei(e.pipe);}, isURLSearchParams: function isURLSearchParams(e) {return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;}, isStandardBrowserEnv: function isStandardBrowserEnv() {return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;}, forEach: ti, merge: function e() {var t = {};function n(n, r) {"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n;}for (var r = 0, o = arguments.length; r < o; r++) {ti(arguments[r], n);}return t;}, deepMerge: function e() {var t = {};function n(n, r) {"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n;}for (var r = 0, o = arguments.length; r < o; r++) {ti(arguments[r], n);}return t;}, extend: function extend(e, t, n) {return ti(t, function (t, r) {e[r] = n && "function" == typeof t ? zo(t, n) : t;}), e;}, trim: function trim(e) {return e.replace(/^\s*/, "").replace(/\s*$/, "");} };function ri(e) {return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");}var oi = function oi(e, t, n) {if (!t) return e;var r;if (n) r = n(t);else if (ni.isURLSearchParams(t)) r = t.toString();else {var o = [];ni.forEach(t, function (e, t) {null != e && (ni.isArray(e) ? t += "[]" : e = [e], ni.forEach(e, function (e) {ni.isDate(e) ? e = e.toISOString() : ni.isObject(e) && (e = JSON.stringify(e)), o.push(ri(t) + "=" + ri(e));}));}), r = o.join("&");}if (r) {var i = e.indexOf("#");-1 !== i && (e = e.slice(0, i)), e += (-1 === e.indexOf("?") ? "?" : "&") + r;}return e;};function ii() {this.handlers = [];}ii.prototype.use = function (e, t) {return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;}, ii.prototype.eject = function (e) {this.handlers[e] && (this.handlers[e] = null);}, ii.prototype.forEach = function (e) {ni.forEach(this.handlers, function (t) {null !== t && e(t);});};var si = ii,ai = function ai(e, t, n) {return ni.forEach(n, function (n) {e = n(e, t);}), e;},ui = function ui(e) {return !(!e || !e.__CANCEL__);};function ci() {throw new Error("setTimeout has not been defined");}function li() {throw new Error("clearTimeout has not been defined");}var pi = ci,hi = li;function di(e) {if (pi === setTimeout) return setTimeout(e, 0);if ((pi === ci || !pi) && setTimeout) return pi = setTimeout, setTimeout(e, 0);try {return pi(e, 0);} catch (t) {try {return pi.call(null, e, 0);} catch (t) {return pi.call(this, e, 0);}}}"function" == typeof B.setTimeout && (pi = setTimeout), "function" == typeof B.clearTimeout && (hi = clearTimeout);var fi,gi = [],mi = !1,_i = -1;function yi() {mi && fi && (mi = !1, fi.length ? gi = fi.concat(gi) : _i = -1, gi.length && vi());}function vi() {if (!mi) {var e = di(yi);mi = !0;for (var t = gi.length; t;) {for (fi = gi, gi = []; ++_i < t;) {fi && fi[_i].run();}_i = -1, t = gi.length;}fi = null, mi = !1, function (e) {if (hi === clearTimeout) return clearTimeout(e);if ((hi === li || !hi) && clearTimeout) return hi = clearTimeout, clearTimeout(e);try {hi(e);} catch (t) {try {return hi.call(null, e);} catch (t) {return hi.call(this, e);}}}(e);}}function Ii(e, t) {this.fun = e, this.array = t;}Ii.prototype.run = function () {this.fun.apply(null, this.array);};function Mi() {}var Ci = Mi,Ei = Mi,Si = Mi,Ti = Mi,Di = Mi,Ai = Mi,ki = Mi;var Ri = B.performance || {},Oi = Ri.now || Ri.mozNow || Ri.msNow || Ri.oNow || Ri.webkitNow || function () {return new Date().getTime();};var Ni = new Date();var Li = { nextTick: function nextTick(e) {var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}gi.push(new Ii(e, t)), 1 !== gi.length || mi || di(vi);}, title: "browser", browser: !0, env: {}, argv: [], version: "", versions: {}, on: Ci, addListener: Ei, once: Si, off: Ti, removeListener: Di, removeAllListeners: Ai, emit: ki, binding: function binding(e) {throw new Error("process.binding is not supported");}, cwd: function cwd() {return "/";}, chdir: function chdir(e) {throw new Error("process.chdir is not supported");}, umask: function umask() {return 0;}, hrtime: function hrtime(e) {var t = .001 * Oi.call(Ri),n = Math.floor(t),r = Math.floor(t % 1 * 1e9);return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r];}, platform: "browser", release: {}, config: {}, uptime: function uptime() {return (new Date() - Ni) / 1e3;} },wi = function wi(e, t) {ni.forEach(e, function (n, r) {r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);});},Pi = function Pi(e, t, n, r, o) {return function (e, t, n, r, o) {return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () {return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code };}, e;}(new Error(e), t, n, r, o);},Gi = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],bi = ni.isStandardBrowserEnv() ? function () {var e,t = /(msie|trident)/i.test(navigator.userAgent),n = document.createElement("a");function r(e) {var r = e;return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname };}return e = r(window.location.href), function (t) {var n = ni.isString(t) ? r(t) : t;return n.protocol === e.protocol && n.host === e.host;};}() : function () {return !0;},Ui = ni.isStandardBrowserEnv() ? { write: function write(e, t, n, r, o, i) {var s = [];s.push(e + "=" + encodeURIComponent(t)), ni.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), ni.isString(r) && s.push("path=" + r), ni.isString(o) && s.push("domain=" + o), !0 === i && s.push("secure"), document.cookie = s.join("; ");}, read: function read(e) {var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));return t ? decodeURIComponent(t[3]) : null;}, remove: function remove(e) {this.write(e, "", Date.now() - 864e5);} } : { write: function write() {}, read: function read() {return null;}, remove: function remove() {} },qi = function qi(e) {return new Promise(function (t, n) {var r = e.data,o = e.headers;ni.isFormData(r) && delete o["Content-Type"];var i = new XMLHttpRequest();if (e.auth) {var s = e.auth.username || "",a = e.auth.password || "";o.Authorization = "Basic " + btoa(s + ":" + a);}var u,c,l = (u = e.baseURL, c = e.url, u && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c) ? function (e, t) {return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;}(u, c) : c);if (i.open(e.method.toUpperCase(), oi(l, e.params, e.paramsSerializer), !0), i.timeout = e.timeout, i.onreadystatechange = function () {if (i && 4 === i.readyState && (0 !== i.status || i.responseURL && 0 === i.responseURL.indexOf("file:"))) {var r,o,s,a,u,c = "getAllResponseHeaders" in i ? (r = i.getAllResponseHeaders(), u = {}, r ? (ni.forEach(r.split("\n"), function (e) {if (a = e.indexOf(":"), o = ni.trim(e.substr(0, a)).toLowerCase(), s = ni.trim(e.substr(a + 1)), o) {if (u[o] && Gi.indexOf(o) >= 0) return;u[o] = "set-cookie" === o ? (u[o] ? u[o] : []).concat([s]) : u[o] ? u[o] + ", " + s : s;}}), u) : u) : null,l = { data: e.responseType && "text" !== e.responseType ? i.response : i.responseText, status: i.status, statusText: i.statusText, headers: c, config: e, request: i };!function (e, t, n) {var r = n.config.validateStatus;!r || r(n.status) ? e(n) : t(Pi("Request failed with status code " + n.status, n.config, null, n.request, n));}(t, n, l), i = null;}}, i.onabort = function () {i && (n(Pi("Request aborted", e, "ECONNABORTED", i)), i = null);}, i.onerror = function () {n(Pi("Network Error", e, null, i)), i = null;}, i.ontimeout = function () {var t = "timeout of " + e.timeout + "ms exceeded";e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(Pi(t, e, "ECONNABORTED", i)), i = null;}, ni.isStandardBrowserEnv()) {var p = Ui,h = (e.withCredentials || bi(l)) && e.xsrfCookieName ? p.read(e.xsrfCookieName) : void 0;h && (o[e.xsrfHeaderName] = h);}if ("setRequestHeader" in i && ni.forEach(o, function (e, t) {void 0 === r && "content-type" === t.toLowerCase() ? delete o[t] : i.setRequestHeader(t, e);}), ni.isUndefined(e.withCredentials) || (i.withCredentials = !!e.withCredentials), e.responseType) try {i.responseType = e.responseType;} catch (d) {if ("json" !== e.responseType) throw d;}"function" == typeof e.onDownloadProgress && i.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && i.upload && i.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {i && (i.abort(), n(e), i = null);}), void 0 === r && (r = null), i.send(r);});},xi = { "Content-Type": "application/x-www-form-urlencoded" };function Fi(e, t) {!ni.isUndefined(e) && ni.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);}var Vi,Ki = { adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== Li && "[object process]" === Object.prototype.toString.call(Li)) && (Vi = qi), Vi), transformRequest: [function (e, t) {return wi(t, "Accept"), wi(t, "Content-Type"), ni.isFormData(e) || ni.isArrayBuffer(e) || ni.isBuffer(e) || ni.isStream(e) || ni.isFile(e) || ni.isBlob(e) ? e : ni.isArrayBufferView(e) ? e.buffer : ni.isURLSearchParams(e) ? (Fi(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : ni.isObject(e) ? (Fi(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;}], transformResponse: [function (e) {if ("string" == typeof e) try {e = JSON.parse(e);} catch (t) {}return e;}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(e) {return e >= 200 && e < 300;} };Ki.headers = { common: { Accept: "application/json, text/plain, */*" } }, ni.forEach(["delete", "get", "head"], function (e) {Ki.headers[e] = {};}), ni.forEach(["post", "put", "patch"], function (e) {Ki.headers[e] = ni.merge(xi);});var Bi = Ki;function Hi(e) {e.cancelToken && e.cancelToken.throwIfRequested();}var ji = function ji(e) {return Hi(e), e.headers = e.headers || {}, e.data = ai(e.data, e.headers, e.transformRequest), e.headers = ni.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), ni.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {delete e.headers[t];}), (e.adapter || Bi.adapter)(e).then(function (t) {return Hi(e), t.data = ai(t.data, t.headers, e.transformResponse), t;}, function (t) {return ui(t) || (Hi(e), t && t.response && (t.response.data = ai(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);});},Yi = function Yi(e, t) {t = t || {};var n = {},r = ["url", "method", "params", "data"],o = ["headers", "auth", "proxy"],i = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];ni.forEach(r, function (e) {void 0 !== t[e] && (n[e] = t[e]);}), ni.forEach(o, function (r) {ni.isObject(t[r]) ? n[r] = ni.deepMerge(e[r], t[r]) : void 0 !== t[r] ? n[r] = t[r] : ni.isObject(e[r]) ? n[r] = ni.deepMerge(e[r]) : void 0 !== e[r] && (n[r] = e[r]);}), ni.forEach(i, function (r) {void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);});var s = r.concat(o).concat(i),a = Object.keys(t).filter(function (e) {return -1 === s.indexOf(e);});return ni.forEach(a, function (r) {void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);}), n;};function $i(e) {this.defaults = e, this.interceptors = { request: new si(), response: new si() };}$i.prototype.request = function (e) {"string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = Yi(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";var t = [ji, void 0],n = Promise.resolve(e);for (this.interceptors.request.forEach(function (e) {t.unshift(e.fulfilled, e.rejected);}), this.interceptors.response.forEach(function (e) {t.push(e.fulfilled, e.rejected);}); t.length;) {n = n.then(t.shift(), t.shift());}return n;}, $i.prototype.getUri = function (e) {return e = Yi(this.defaults, e), oi(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");}, ni.forEach(["delete", "get", "head", "options"], function (e) {$i.prototype[e] = function (t, n) {return this.request(ni.merge(n || {}, { method: e, url: t }));};}), ni.forEach(["post", "put", "patch"], function (e) {$i.prototype[e] = function (t, n, r) {return this.request(ni.merge(r || {}, { method: e, url: t, data: n }));};});var Wi = $i;function zi(e) {this.message = e;}zi.prototype.toString = function () {return "Cancel" + (this.message ? ": " + this.message : "");}, zi.prototype.__CANCEL__ = !0;var Xi = zi;function Ji(e) {if ("function" != typeof e) throw new TypeError("executor must be a function.");var t;this.promise = new Promise(function (e) {t = e;});var n = this;e(function (e) {n.reason || (n.reason = new Xi(e), t(n.reason));});}Ji.prototype.throwIfRequested = function () {if (this.reason) throw this.reason;}, Ji.source = function () {var e;return { token: new Ji(function (t) {e = t;}), cancel: e };};var Qi = Ji;function Zi(e) {var t = new Wi(e),n = zo(Wi.prototype.request, t);return ni.extend(n, Wi.prototype, t), ni.extend(n, t), n;}var es = Zi(Bi);es.Axios = Wi, es.create = function (e) {return Zi(Yi(es.defaults, e));}, es.Cancel = Xi, es.CancelToken = Qi, es.isCancel = ui, es.all = function (e) {return Promise.all(e);}, es.spread = function (e) {return function (t) {return e.apply(null, t);};};var ts = es,ns = es;ts.default = ns;var rs = ts,os = rs.create({ timeout: 3e4, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });os.interceptors.response.use(function (e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return Z(n) && (r = n), r !== Pe.SUCCESS && (e.data.ErrorCode = Number(r)), e;}, function (e) {return "Network Error" === e.message && (!0 === os.defaults.withCredentials && J.warn("Network Error, try to close `IMAxios.defaults.withCredentials` to false. (IMAxios.js)"), os.defaults.withCredentials = !1), Promise.reject(e);});var is = function () {function e() {r(this, e);}return i(e, [{ key: "request", value: function value(e) {console.warn("请注意： ConnectionBase.request() 方法必须被派生类重写:"), console.log("参数如下：\n    * @param {String} options.url string 是 开发者服务器接口地址\n    * @param {*} options.data - string/object/ArrayBuffer 否 请求的参数\n    * @param {Object} options.header - Object 否 设置请求的 header，\n    * @param {String} options.method - string GET 否 HTTP 请求方法\n    * @param {String} options.dataType - string json 否 返回的数据格式\n    * @param {String} options.responseType - string text 否 响应的数据类型\n    * @param {Boolean} isRetry - string text false 是否为重试的请求\n   ");} }, { key: "_checkOptions", value: function value(e) {if (!1 == !!e.url) throw new ht({ code: dt.NETWORK_BASE_OPTIONS_NO_URL, message: ln });} }, { key: "_initOptions", value: function value(e) {e.method = ["POST", "GET", "PUT", "DELETE", "OPTION"].indexOf(e.method) >= 0 ? e.method : "POST", e.dataType = e.dataType || "json", e.responseType = e.responseType || "json";} }]), e;}(),ss = function (e) {c(n, e);var t = _(n);function n() {var e;return r(this, n), (e = t.call(this)).retry = 2, e;}return i(n, [{ key: "request", value: function value(e) {return this._checkOptions(e), this._initOptions(e), this._requestWithRetry({ url: e.url, data: e.data, method: e.method });} }, { key: "_requestWithRetry", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;return os(e).catch(function (r) {return t.retry && n < t.retry ? t._requestWithRetry(e, ++n) : Vr(new ht({ code: r.code || "", message: r.message || "" }));});} }]), n;}(is),as = [],us = [],cs = "undefined" != typeof Uint8Array ? Uint8Array : Array,ls = !1;function ps() {ls = !0;for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, n = e.length; t < n; ++t) {as[t] = e[t], us[e.charCodeAt(t)] = t;}us["-".charCodeAt(0)] = 62, us["_".charCodeAt(0)] = 63;}function hs(e, t, n) {for (var r, o, i = [], s = t; s < n; s += 3) {r = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], i.push(as[(o = r) >> 18 & 63] + as[o >> 12 & 63] + as[o >> 6 & 63] + as[63 & o]);}return i.join("");}function ds(e) {var t;ls || ps();for (var n = e.length, r = n % 3, o = "", i = [], s = 0, a = n - r; s < a; s += 16383) {i.push(hs(e, s, s + 16383 > a ? a : s + 16383));}return 1 === r ? (t = e[n - 1], o += as[t >> 2], o += as[t << 4 & 63], o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o += as[t >> 10], o += as[t >> 4 & 63], o += as[t << 2 & 63], o += "="), i.push(o), i.join("");}function fs(e, t, n, r, o) {var i,s,a = 8 * o - r - 1,u = (1 << a) - 1,c = u >> 1,l = -7,p = n ? o - 1 : 0,h = n ? -1 : 1,d = e[t + p];for (p += h, i = d & (1 << -l) - 1, d >>= -l, l += a; l > 0; i = 256 * i + e[t + p], p += h, l -= 8) {;}for (s = i & (1 << -l) - 1, i >>= -l, l += r; l > 0; s = 256 * s + e[t + p], p += h, l -= 8) {;}if (0 === i) i = 1 - c;else {if (i === u) return s ? NaN : Infinity * (d ? -1 : 1);s += Math.pow(2, r), i -= c;}return (d ? -1 : 1) * s * Math.pow(2, i - r);}function gs(e, t, n, r, o, i) {var s,a,u,c = 8 * i - o - 1,l = (1 << c) - 1,p = l >> 1,h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,d = r ? 0 : i - 1,f = r ? 1 : -1,g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || Infinity === t ? (a = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + p >= 1 ? h / u : h * Math.pow(2, 1 - p)) * u >= 2 && (s++, u /= 2), s + p >= l ? (a = 0, s = l) : s + p >= 1 ? (a = (t * u - 1) * Math.pow(2, o), s += p) : (a = t * Math.pow(2, p - 1) * Math.pow(2, o), s = 0)); o >= 8; e[n + d] = 255 & a, d += f, a /= 256, o -= 8) {;}for (s = s << o | a, c += o; c > 0; e[n + d] = 255 & s, d += f, s /= 256, c -= 8) {;}e[n + d - f] |= 128 * g;}var ms = {}.toString,_s = Array.isArray || function (e) {return "[object Array]" == ms.call(e);};function ys() {return Is.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;}function vs(e, t) {if (ys() < t) throw new RangeError("Invalid typed array length");return Is.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = Is.prototype : (null === e && (e = new Is(t)), e.length = t), e;}function Is(e, t, n) {if (!(Is.TYPED_ARRAY_SUPPORT || this instanceof Is)) return new Is(e, t, n);if ("number" == typeof e) {if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return Es(this, e);}return Ms(this, e, t, n);}function Ms(e, t, n, r) {if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, n, r) {if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);Is.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = Is.prototype : e = Ss(e, t);return e;}(e, t, n, r) : "string" == typeof t ? function (e, t, n) {"string" == typeof n && "" !== n || (n = "utf8");if (!Is.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');var r = 0 | As(t, n),o = (e = vs(e, r)).write(t, n);o !== r && (e = e.slice(0, o));return e;}(e, t, n) : function (e, t) {if (Ds(t)) {var n = 0 | Ts(t.length);return 0 === (e = vs(e, n)).length || t.copy(e, 0, 0, n), e;}if (t) {if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? vs(e, 0) : Ss(e, t);if ("Buffer" === t.type && _s(t.data)) return Ss(e, t.data);}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");}(e, t);}function Cs(e) {if ("number" != typeof e) throw new TypeError('"size" argument must be a number');if (e < 0) throw new RangeError('"size" argument must not be negative');}function Es(e, t) {if (Cs(t), e = vs(e, t < 0 ? 0 : 0 | Ts(t)), !Is.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) {e[n] = 0;}return e;}function Ss(e, t) {var n = t.length < 0 ? 0 : 0 | Ts(t.length);e = vs(e, n);for (var r = 0; r < n; r += 1) {e[r] = 255 & t[r];}return e;}function Ts(e) {if (e >= ys()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ys().toString(16) + " bytes");return 0 | e;}function Ds(e) {return !(null == e || !e._isBuffer);}function As(e, t) {if (Ds(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var n = e.length;if (0 === n) return 0;for (var r = !1;;) {switch (t) {case "ascii":case "latin1":case "binary":return n;case "utf8":case "utf-8":case void 0:return Zs(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return 2 * n;case "hex":return n >>> 1;case "base64":return ea(e).length;default:if (r) return Zs(e).length;t = ("" + t).toLowerCase(), r = !0;}}}function ks(e, t, n) {var r = !1;if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";if ((n >>>= 0) <= (t >>>= 0)) return "";for (e || (e = "utf8");;) {switch (e) {case "hex":return Ks(this, t, n);case "utf8":case "utf-8":return xs(this, t, n);case "ascii":return Fs(this, t, n);case "latin1":case "binary":return Vs(this, t, n);case "base64":return qs(this, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return Bs(this, t, n);default:if (r) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), r = !0;}}}function Rs(e, t, n) {var r = e[t];e[t] = e[n], e[n] = r;}function Os(e, t, n, r, o) {if (0 === e.length) return -1;if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {if (o) return -1;n = e.length - 1;} else if (n < 0) {if (!o) return -1;n = 0;}if ("string" == typeof t && (t = Is.from(t, r)), Ds(t)) return 0 === t.length ? -1 : Ns(e, t, n, r, o);if ("number" == typeof t) return t &= 255, Is.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : Ns(e, [t], n, r, o);throw new TypeError("val must be string, number or Buffer");}function Ns(e, t, n, r, o) {var i,s = 1,a = e.length,u = t.length;if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {if (e.length < 2 || t.length < 2) return -1;s = 2, a /= 2, u /= 2, n /= 2;}function c(e, t) {return 1 === s ? e[t] : e.readUInt16BE(t * s);}if (o) {var l = -1;for (i = n; i < a; i++) {if (c(e, i) === c(t, -1 === l ? 0 : i - l)) {if (-1 === l && (l = i), i - l + 1 === u) return l * s;} else -1 !== l && (i -= i - l), l = -1;}} else for (n + u > a && (n = a - u), i = n; i >= 0; i--) {for (var p = !0, h = 0; h < u; h++) {if (c(e, i + h) !== c(t, h)) {p = !1;break;}}if (p) return i;}return -1;}function Ls(e, t, n, r) {n = Number(n) || 0;var o = e.length - n;r ? (r = Number(r)) > o && (r = o) : r = o;var i = t.length;if (i % 2 != 0) throw new TypeError("Invalid hex string");r > i / 2 && (r = i / 2);for (var s = 0; s < r; ++s) {var a = parseInt(t.substr(2 * s, 2), 16);if (isNaN(a)) return s;e[n + s] = a;}return s;}function ws(e, t, n, r) {return ta(Zs(t, e.length - n), e, n, r);}function Ps(e, t, n, r) {return ta(function (e) {for (var t = [], n = 0; n < e.length; ++n) {t.push(255 & e.charCodeAt(n));}return t;}(t), e, n, r);}function Gs(e, t, n, r) {return Ps(e, t, n, r);}function bs(e, t, n, r) {return ta(ea(t), e, n, r);}function Us(e, t, n, r) {return ta(function (e, t) {for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) {n = e.charCodeAt(s), r = n >> 8, o = n % 256, i.push(o), i.push(r);}return i;}(t, e.length - n), e, n, r);}function qs(e, t, n) {return 0 === t && n === e.length ? ds(e) : ds(e.slice(t, n));}function xs(e, t, n) {n = Math.min(e.length, n);for (var r = [], o = t; o < n;) {var i,s,a,u,c = e[o],l = null,p = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;if (o + p <= n) switch (p) {case 1:c < 128 && (l = c);break;case 2:128 == (192 & (i = e[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (l = u);break;case 3:i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (l = u);break;case 4:i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (l = u);}null === l ? (l = 65533, p = 1) : l > 65535 && (l -= 65536, r.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), r.push(l), o += p;}return function (e) {var t = e.length;if (t <= 4096) return String.fromCharCode.apply(String, e);var n = "",r = 0;for (; r < t;) {n += String.fromCharCode.apply(String, e.slice(r, r += 4096));}return n;}(r);}Is.TYPED_ARRAY_SUPPORT = void 0 === B.TYPED_ARRAY_SUPPORT || B.TYPED_ARRAY_SUPPORT, Is.poolSize = 8192, Is._augment = function (e) {return e.__proto__ = Is.prototype, e;}, Is.from = function (e, t, n) {return Ms(null, e, t, n);}, Is.TYPED_ARRAY_SUPPORT && (Is.prototype.__proto__ = Uint8Array.prototype, Is.__proto__ = Uint8Array), Is.alloc = function (e, t, n) {return function (e, t, n, r) {return Cs(t), t <= 0 ? vs(e, t) : void 0 !== n ? "string" == typeof r ? vs(e, t).fill(n, r) : vs(e, t).fill(n) : vs(e, t);}(null, e, t, n);}, Is.allocUnsafe = function (e) {return Es(null, e);}, Is.allocUnsafeSlow = function (e) {return Es(null, e);}, Is.isBuffer = function (e) {return null != e && (!!e._isBuffer || na(e) || function (e) {return "function" == typeof e.readFloatLE && "function" == typeof e.slice && na(e.slice(0, 0));}(e));}, Is.compare = function (e, t) {if (!Ds(e) || !Ds(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) {if (e[o] !== t[o]) {n = e[o], r = t[o];break;}}return n < r ? -1 : r < n ? 1 : 0;}, Is.isEncoding = function (e) {switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return !0;default:return !1;}}, Is.concat = function (e, t) {if (!_s(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return Is.alloc(0);var n;if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) {t += e[n].length;}var r = Is.allocUnsafe(t),o = 0;for (n = 0; n < e.length; ++n) {var i = e[n];if (!Ds(i)) throw new TypeError('"list" argument must be an Array of Buffers');i.copy(r, o), o += i.length;}return r;}, Is.byteLength = As, Is.prototype._isBuffer = !0, Is.prototype.swap16 = function () {var e = this.length;if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {Rs(this, t, t + 1);}return this;}, Is.prototype.swap32 = function () {var e = this.length;if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {Rs(this, t, t + 3), Rs(this, t + 1, t + 2);}return this;}, Is.prototype.swap64 = function () {var e = this.length;if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {Rs(this, t, t + 7), Rs(this, t + 1, t + 6), Rs(this, t + 2, t + 5), Rs(this, t + 3, t + 4);}return this;}, Is.prototype.toString = function () {var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? xs(this, 0, e) : ks.apply(this, arguments);}, Is.prototype.equals = function (e) {if (!Ds(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === Is.compare(this, e);}, Is.prototype.inspect = function () {var e = "";return this.length > 0 && (e = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), this.length > 50 && (e += " ... ")), "<Buffer " + e + ">";}, Is.prototype.compare = function (e, t, n, r, o) {if (!Ds(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");if (r >= o && t >= n) return 0;if (r >= o) return -1;if (t >= n) return 1;if (this === e) return 0;for (var i = (o >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (t >>>= 0), a = Math.min(i, s), u = this.slice(r, o), c = e.slice(t, n), l = 0; l < a; ++l) {if (u[l] !== c[l]) {i = u[l], s = c[l];break;}}return i < s ? -1 : s < i ? 1 : 0;}, Is.prototype.includes = function (e, t, n) {return -1 !== this.indexOf(e, t, n);}, Is.prototype.indexOf = function (e, t, n) {return Os(this, e, t, n, !0);}, Is.prototype.lastIndexOf = function (e, t, n) {return Os(this, e, t, n, !1);}, Is.prototype.write = function (e, t, n, r) {if (void 0 === t) r = "utf8", n = this.length, t = 0;else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;else {if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);}var o = this.length - t;if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");r || (r = "utf8");for (var i = !1;;) {switch (r) {case "hex":return Ls(this, e, t, n);case "utf8":case "utf-8":return ws(this, e, t, n);case "ascii":return Ps(this, e, t, n);case "latin1":case "binary":return Gs(this, e, t, n);case "base64":return bs(this, e, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return Us(this, e, t, n);default:if (i) throw new TypeError("Unknown encoding: " + r);r = ("" + r).toLowerCase(), i = !0;}}}, Is.prototype.toJSON = function () {return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };};function Fs(e, t, n) {var r = "";n = Math.min(e.length, n);for (var o = t; o < n; ++o) {r += String.fromCharCode(127 & e[o]);}return r;}function Vs(e, t, n) {var r = "";n = Math.min(e.length, n);for (var o = t; o < n; ++o) {r += String.fromCharCode(e[o]);}return r;}function Ks(e, t, n) {var r = e.length;(!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);for (var o = "", i = t; i < n; ++i) {o += Qs(e[i]);}return o;}function Bs(e, t, n) {for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) {o += String.fromCharCode(r[i] + 256 * r[i + 1]);}return o;}function Hs(e, t, n) {if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");if (e + t > n) throw new RangeError("Trying to access beyond buffer length");}function js(e, t, n, r, o, i) {if (!Ds(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');if (n + r > e.length) throw new RangeError("Index out of range");}function Ys(e, t, n, r) {t < 0 && (t = 65535 + t + 1);for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o) {e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);}}function $s(e, t, n, r) {t < 0 && (t = 4294967295 + t + 1);for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) {e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255;}}function Ws(e, t, n, r, o, i) {if (n + r > e.length) throw new RangeError("Index out of range");if (n < 0) throw new RangeError("Index out of range");}function zs(e, t, n, r, o) {return o || Ws(e, 0, n, 4), gs(e, t, n, r, 23, 4), n + 4;}function Xs(e, t, n, r, o) {return o || Ws(e, 0, n, 8), gs(e, t, n, r, 52, 8), n + 8;}Is.prototype.slice = function (e, t) {var n,r = this.length;if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), Is.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = Is.prototype;else {var o = t - e;n = new Is(o, void 0);for (var i = 0; i < o; ++i) {n[i] = this[i + e];}}return n;}, Is.prototype.readUIntLE = function (e, t, n) {e |= 0, t |= 0, n || Hs(e, t, this.length);for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) {r += this[e + i] * o;}return r;}, Is.prototype.readUIntBE = function (e, t, n) {e |= 0, t |= 0, n || Hs(e, t, this.length);for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);) {r += this[e + --t] * o;}return r;}, Is.prototype.readUInt8 = function (e, t) {return t || Hs(e, 1, this.length), this[e];}, Is.prototype.readUInt16LE = function (e, t) {return t || Hs(e, 2, this.length), this[e] | this[e + 1] << 8;}, Is.prototype.readUInt16BE = function (e, t) {return t || Hs(e, 2, this.length), this[e] << 8 | this[e + 1];}, Is.prototype.readUInt32LE = function (e, t) {return t || Hs(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];}, Is.prototype.readUInt32BE = function (e, t) {return t || Hs(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);}, Is.prototype.readIntLE = function (e, t, n) {e |= 0, t |= 0, n || Hs(e, t, this.length);for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) {r += this[e + i] * o;}return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r;}, Is.prototype.readIntBE = function (e, t, n) {e |= 0, t |= 0, n || Hs(e, t, this.length);for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256);) {i += this[e + --r] * o;}return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;}, Is.prototype.readInt8 = function (e, t) {return t || Hs(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];}, Is.prototype.readInt16LE = function (e, t) {t || Hs(e, 2, this.length);var n = this[e] | this[e + 1] << 8;return 32768 & n ? 4294901760 | n : n;}, Is.prototype.readInt16BE = function (e, t) {t || Hs(e, 2, this.length);var n = this[e + 1] | this[e] << 8;return 32768 & n ? 4294901760 | n : n;}, Is.prototype.readInt32LE = function (e, t) {return t || Hs(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;}, Is.prototype.readInt32BE = function (e, t) {return t || Hs(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];}, Is.prototype.readFloatLE = function (e, t) {return t || Hs(e, 4, this.length), fs(this, e, !0, 23, 4);}, Is.prototype.readFloatBE = function (e, t) {return t || Hs(e, 4, this.length), fs(this, e, !1, 23, 4);}, Is.prototype.readDoubleLE = function (e, t) {return t || Hs(e, 8, this.length), fs(this, e, !0, 52, 8);}, Is.prototype.readDoubleBE = function (e, t) {return t || Hs(e, 8, this.length), fs(this, e, !1, 52, 8);}, Is.prototype.writeUIntLE = function (e, t, n, r) {(e = +e, t |= 0, n |= 0, r) || js(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var o = 1,i = 0;for (this[t] = 255 & e; ++i < n && (o *= 256);) {this[t + i] = e / o & 255;}return t + n;}, Is.prototype.writeUIntBE = function (e, t, n, r) {(e = +e, t |= 0, n |= 0, r) || js(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var o = n - 1,i = 1;for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) {this[t + o] = e / i & 255;}return t + n;}, Is.prototype.writeUInt8 = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 1, 255, 0), Is.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;}, Is.prototype.writeUInt16LE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 2, 65535, 0), Is.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : Ys(this, e, t, !0), t + 2;}, Is.prototype.writeUInt16BE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 2, 65535, 0), Is.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : Ys(this, e, t, !1), t + 2;}, Is.prototype.writeUInt32LE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 4, 4294967295, 0), Is.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : $s(this, e, t, !0), t + 4;}, Is.prototype.writeUInt32BE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 4, 4294967295, 0), Is.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : $s(this, e, t, !1), t + 4;}, Is.prototype.writeIntLE = function (e, t, n, r) {if (e = +e, t |= 0, !r) {var o = Math.pow(2, 8 * n - 1);js(this, e, t, n, o - 1, -o);}var i = 0,s = 1,a = 0;for (this[t] = 255 & e; ++i < n && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;}return t + n;}, Is.prototype.writeIntBE = function (e, t, n, r) {if (e = +e, t |= 0, !r) {var o = Math.pow(2, 8 * n - 1);js(this, e, t, n, o - 1, -o);}var i = n - 1,s = 1,a = 0;for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;}return t + n;}, Is.prototype.writeInt8 = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 1, 127, -128), Is.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;}, Is.prototype.writeInt16LE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 2, 32767, -32768), Is.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : Ys(this, e, t, !0), t + 2;}, Is.prototype.writeInt16BE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 2, 32767, -32768), Is.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : Ys(this, e, t, !1), t + 2;}, Is.prototype.writeInt32LE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 4, 2147483647, -2147483648), Is.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : $s(this, e, t, !0), t + 4;}, Is.prototype.writeInt32BE = function (e, t, n) {return e = +e, t |= 0, n || js(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Is.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : $s(this, e, t, !1), t + 4;}, Is.prototype.writeFloatLE = function (e, t, n) {return zs(this, e, t, !0, n);}, Is.prototype.writeFloatBE = function (e, t, n) {return zs(this, e, t, !1, n);}, Is.prototype.writeDoubleLE = function (e, t, n) {return Xs(this, e, t, !0, n);}, Is.prototype.writeDoubleBE = function (e, t, n) {return Xs(this, e, t, !1, n);}, Is.prototype.copy = function (e, t, n, r) {if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;if (0 === e.length || 0 === this.length) return 0;if (t < 0) throw new RangeError("targetStart out of bounds");if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");if (r < 0) throw new RangeError("sourceEnd out of bounds");r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);var o,i = r - n;if (this === e && n < t && t < r) for (o = i - 1; o >= 0; --o) {e[o + t] = this[o + n];} else if (i < 1e3 || !Is.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) {e[o + t] = this[o + n];} else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);return i;}, Is.prototype.fill = function (e, t, n, r) {if ("string" == typeof e) {if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {var o = e.charCodeAt(0);o < 256 && (e = o);}if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");if ("string" == typeof r && !Is.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);} else "number" == typeof e && (e &= 255);if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");if (n <= t) return this;var i;if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (i = t; i < n; ++i) {this[i] = e;} else {var s = Ds(e) ? e : Zs(new Is(e, r).toString()),a = s.length;for (i = 0; i < n - t; ++i) {this[i + t] = s[i % a];}}return this;};var Js = /[^+\/0-9A-Za-z-_]/g;function Qs(e) {return e < 16 ? "0" + e.toString(16) : e.toString(16);}function Zs(e, t) {var n;t = t || Infinity;for (var r = e.length, o = null, i = [], s = 0; s < r; ++s) {if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {if (!o) {if (n > 56319) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}if (s + 1 === r) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}o = n;continue;}if (n < 56320) {(t -= 3) > -1 && i.push(239, 191, 189), o = n;continue;}n = 65536 + (o - 55296 << 10 | n - 56320);} else o && (t -= 3) > -1 && i.push(239, 191, 189);if (o = null, n < 128) {if ((t -= 1) < 0) break;i.push(n);} else if (n < 2048) {if ((t -= 2) < 0) break;i.push(n >> 6 | 192, 63 & n | 128);} else if (n < 65536) {if ((t -= 3) < 0) break;i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);} else {if (!(n < 1114112)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);}}return i;}function ea(e) {return function (e) {var t, n, r, o, i, s;ls || ps();var a = e.length;if (a % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");i = "=" === e[a - 2] ? 2 : "=" === e[a - 1] ? 1 : 0, s = new cs(3 * a / 4 - i), r = i > 0 ? a - 4 : a;var u = 0;for (t = 0, n = 0; t < r; t += 4, n += 3) {o = us[e.charCodeAt(t)] << 18 | us[e.charCodeAt(t + 1)] << 12 | us[e.charCodeAt(t + 2)] << 6 | us[e.charCodeAt(t + 3)], s[u++] = o >> 16 & 255, s[u++] = o >> 8 & 255, s[u++] = 255 & o;}return 2 === i ? (o = us[e.charCodeAt(t)] << 2 | us[e.charCodeAt(t + 1)] >> 4, s[u++] = 255 & o) : 1 === i && (o = us[e.charCodeAt(t)] << 10 | us[e.charCodeAt(t + 1)] << 4 | us[e.charCodeAt(t + 2)] >> 2, s[u++] = o >> 8 & 255, s[u++] = 255 & o), s;}(function (e) {if ((e = function (e) {return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");}(e).replace(Js, "")).length < 2) return "";for (; e.length % 4 != 0;) {e += "=";}return e;}(e));}function ta(e, t, n, r) {for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) {t[o + n] = e[o];}return o;}function na(e) {return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}var ra = function (e) {c(n, e);var t = _(n);function n() {var e;return r(this, n), (e = t.call(this)).retry = 2, e._request = e.promisify(wx.request), e;}return i(n, [{ key: "request", value: function value(e) {return this._checkOptions(e), this._initOptions(e), e = u({}, e, { responseType: "text" }), this._requestWithRetry(e);} }, { key: "_requestWithRetry", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;return this._request(e).then(this._handleResolve).catch(function (r) {if (ee(r.errMsg)) {if (r.errMsg.includes("abort")) return Fr({});if (r.errMsg.includes("timeout")) return t.retry > 0 && n < t.retry ? t._requestWithRetry(e, ++n) : Vr(new ht({ code: dt.NETWORK_TIMEOUT, message: r.errMsg }));if (r.errMsg.includes("fail")) return t.retry > 0 && n < t.retry ? t._requestWithRetry(e, ++n) : Vr(new ht({ code: dt.NETWORK_ERROR, message: r.errMsg }));}return Vr(new ht(u({ code: dt.UNCAUGHT_ERROR, message: r.message }, r)));});} }, { key: "_handleResolve", value: function value(e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return "number" == typeof n && (r = n), r !== Pe.SUCCESS && (e.data.ErrorCode = Number("".concat(r))), e;} }, { key: "promisify", value: function value(e) {return function (t) {return new Promise(function (n, r) {var o = e(Object.assign({}, t, { success: n, fail: r }));t.updateAbort && t.updateAbort(function () {o && se(o.abort) && o.abort();});});};} }]), n;}(is),oa = function () {function e() {r(this, e), this.request = 0, this.success = 0, this.fail = 0, this.reportRate = 10, this.requestTimeCost = [];}return i(e, [{ key: "report", value: function value() {if (1 !== this.request) {if (this.request % this.reportRate != 0) return null;var e = this.avgRequestTime(),t = "runLoop reports: success=".concat(this.success, ",fail=").concat(this.fail, ",total=").concat(this.request, ",avg=").concat(e, ",cur=").concat(this.requestTimeCost[this.requestTimeCost.length - 1], ",max=").concat(Math.max.apply(null, this.requestTimeCost), ",min=").concat(Math.min.apply(null, this.requestTimeCost));J.log(t);}} }, { key: "setRequestTime", value: function value(e, t) {var n = Math.abs(t - e);100 === this.requestTimeCost.length && this.requestTimeCost.shift(), this.requestTimeCost.push(n);} }, { key: "avgRequestTime", value: function value() {for (var e, t = this.requestTimeCost.length, n = 0, r = 0; r < t; r++) {n += this.requestTimeCost[r];}return e = n / t, Math.round(100 * e) / 100;} }]), e;}(),ia = rs.create({ timeout: 6e3, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });ia.interceptors.response.use(function (e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return Z(n) && (r = n), r !== Pe.SUCCESS && (e.data.ErrorCode = Number(r)), e;}, function (e) {return "Network Error" === e.message && (!0 === ia.defaults.withCredentials && J.warn("Network Error, try to close `IMAxiosAVChatroom.defaults.withCredentials` to false. (IMAxiosAVChatroom.js)"), ia.defaults.withCredentials = !1), Promise.reject(e);});var sa = rs.CancelToken,aa = function () {function e(t) {r(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new oa();}return i(e, [{ key: "destructor", value: function value() {clearTimeout(this._seedID);var e = this._index();for (var t in this) {Object.prototype.hasOwnProperty.call(this, t) && (this[t] = null);}return e;} }, { key: "setIndex", value: function value(e) {this._index = e;} }, { key: "getIndex", value: function value() {return this._index;} }, { key: "isRunning", value: function value() {return !this._stoped;} }, { key: "_initializeOptions", value: function value(e) {this.options = e;} }, { key: "_initializeMembers", value: function value() {this._index = -1, this._seedID = 0, this._requestStatus = !1, this._stoped = !1, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.options.isAVChatRoomLoop ? this.requestor = ia : this.requestor = os, J.log("XHRRunLoop._initializeMembers isAVChatRoomLoop=".concat(!!this.options.isAVChatRoomLoop)), this.abort = null;} }, { key: "start", value: function value() {0 === this._seedID ? (this._stoped = !1, this._send()) : J.log('XHRRunLoop.start(), XHRRunLoop is running now, if you want to restart runLoop , please run "stop()" first.');} }, { key: "_reset", value: function value() {J.log("XHRRunLoop._reset(), reset long poll _intervalTime", this._intervalTime), this.stop(), this.start();} }, { key: "_intervalTimeIncrease", value: function value() {this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold));} }, { key: "_intervalTimeDecrease", value: function value() {0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0));} }, { key: "_intervalTimeAdjustment", value: function value() {var e = Date.now();100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e;} }, { key: "_intervalTimeAdjustmentBaseOnResponseData", value: function value(e) {e.ErrorCode === Pe.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease();} }, { key: "_send", value: function value() {var e = this;if (!0 !== this._requestStatus) {this._requestStatus = !0, this.status.request++, "function" == typeof this.options.before && this.options.before(this.options.pack.requestData);var t = Date.now(),n = 0;this.requestor.request({ url: this.options.pack.getUrl(), data: this.options.pack.requestData, method: this.options.pack.method, cancelToken: new sa(function (t) {e.abort = t;}) }).then(function (r) {if (e._intervalTimeAdjustmentBaseOnResponseData.bind(e)(r.data), e._retryCount > 0 && (e._retryCount = 0), e.status.success++, n = Date.now(), e.status.setRequestTime(t, n), r.data.timecost = n - t, "function" == typeof e.options.success) try {e.options.success({ pack: e.options.pack, error: !1, data: e.options.pack.callback(r.data) });} catch (o) {J.warn("XHRRunLoop._send(), error:", o);}e._requestStatus = !1, !1 === e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e.status.report();}).catch(function (r) {if (e.status.fail++, e._retryCount++, e._intervalTimeAdjustment.bind(e)(), !1 === e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e._requestStatus = !1, "function" == typeof e.options.fail && void 0 !== r.request) try {e.options.fail({ pack: e.options.pack, error: r, data: !1 });} catch (o) {J.warn("XHRRunLoop._send(), fail callback error:", o), J.error(o);}n = Date.now(), e.status.setRequestTime(t, n), e.status.report();});}} }, { key: "stop", value: function value() {this._clearAllTimeOut(), this._stoped = !0;} }, { key: "_clearAllTimeOut", value: function value() {clearTimeout(this._seedID), this._seedID = 0;} }]), e;}(),ua = function () {function e(t) {r(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new oa();}return i(e, [{ key: "destructor", value: function value() {clearTimeout(this._seedID);var e = this._index();for (var t in this) {Object.prototype.hasOwnProperty.call(this, t) && (this[t] = null);}return e;} }, { key: "setIndex", value: function value(e) {this._index = e;} }, { key: "isRunning", value: function value() {return !this._stoped;} }, { key: "getIndex", value: function value() {return this._index;} }, { key: "_initializeOptions", value: function value(e) {this.options = e;} }, { key: "_initializeMembers", value: function value() {this._index = -1, this._seedID = 0, this._requestStatus = !1, this._stoped = !1, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.requestor = new ra(), this.abort = null;} }, { key: "start", value: function value() {0 === this._seedID ? (this._stoped = !1, this._send()) : J.log('WXRunLoop.start(): WXRunLoop is running now, if you want to restart runLoop , please run "stop()" first.');} }, { key: "_reset", value: function value() {J.log("WXRunLoop.reset(), long poll _intervalMaxRate", this._intervalMaxRate), this.stop(), this.start();} }, { key: "_intervalTimeIncrease", value: function value() {this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold));} }, { key: "_intervalTimeDecrease", value: function value() {0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0));} }, { key: "_intervalTimeAdjustment", value: function value() {var e = Date.now();100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e;} }, { key: "_intervalTimeAdjustmentBaseOnResponseData", value: function value(e) {e.ErrorCode === Pe.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease();} }, { key: "_send", value: function value() {var e = this;if (!0 !== this._requestStatus) {var t = this;this._requestStatus = !0, this.status.request++, "function" == typeof this.options.before && this.options.before(t.options.pack.requestData);var n = Date.now(),r = 0;this.requestor.request({ url: t.options.pack.getUrl(), data: t.options.pack.requestData, method: t.options.pack.method, updateAbort: function updateAbort(t) {e.abort = t;} }).then(function (o) {if (t._intervalTimeAdjustmentBaseOnResponseData.bind(e)(o.data), t._retryCount > 0 && (t._retryCount = 0), e.status.success++, r = Date.now(), e.status.setRequestTime(n, r), o.data.timecost = r - n, "function" == typeof t.options.success) try {e.options.success({ pack: e.options.pack, error: !1, data: e.options.pack.callback(o.data) });} catch (i) {J.warn("WXRunLoop._send(), error:", i);}t._requestStatus = !1, !1 === t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), e.status.report();}).catch(function (o) {if (e.status.fail++, t._retryCount++, t._intervalTimeAdjustment.bind(e)(), !1 === t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), t._requestStatus = !1, "function" == typeof t.options.fail) try {e.options.fail({ pack: e.options.pack, error: o, data: !1 });} catch (i) {J.warn("WXRunLoop._send(), fail callback error:", i), J.error(i);}r = Date.now(), e.status.setRequestTime(n, r), e.status.report();});}} }, { key: "stop", value: function value() {this._clearAllTimeOut(), this._stoped = !0;} }, { key: "_clearAllTimeOut", value: function value() {clearTimeout(this._seedID), this._seedID = 0;} }]), e;}(),ca = function () {function e(t) {r(this, e), this.tim = t, this.httpConnection = N ? new ra() : new ss(), this.keepAliveConnections = [];}return i(e, [{ key: "initializeListener", value: function value() {this.tim.innerEmitter.on(_r, this._stopAllRunLoop, this);} }, { key: "request", value: function value(e) {var t = { url: e.url, data: e.requestData, method: e.method, callback: e.callback };return this.httpConnection.request(t).then(function (t) {return t.data = e.callback(t.data), t.data.errorCode !== Pe.SUCCESS ? Vr(new ht({ code: t.data.errorCode, message: t.data.errorInfo })) : t;});} }, { key: "createRunLoop", value: function value(e) {var t = this.createKeepAliveConnection(e);return t.setIndex(this.keepAliveConnections.push(t) - 1), t;} }, { key: "stopRunLoop", value: function value(e) {e.stop();} }, { key: "_stopAllRunLoop", value: function value() {for (var e = this.keepAliveConnections.length, t = 0; t < e; t++) {this.keepAliveConnections[t].stop();}} }, { key: "destroyRunLoop", value: function value(e) {e.stop();var t = e.destructor();this.keepAliveConnections.slice(t, 1);} }, { key: "startRunLoopExclusive", value: function value(e) {for (var t = e.getIndex(), n = 0; n < this.keepAliveConnections.length; n++) {n !== t && this.keepAliveConnections[n].stop();}e.start();} }, { key: "createKeepAliveConnection", value: function value(e) {return N ? new ua(e) : (this.tim.options.runLoopNetType === Je || this.tim.options.runLoopNetType, new aa(e));} }, { key: "clearAll", value: function value() {this.conn.cancelAll();} }, { key: "reset", value: function value() {this.keepAliveConnections = [];} }]), e;}(),la = function () {function t(e) {r(this, t), this.tim = e, this.tim.innerEmitter.on(Ir, this._onErrorDetected, this);}return i(t, [{ key: "_onErrorDetected", value: function value(t) {var n = t.data,r = new Br();r.setMethod($o).setStart(), r.setCode(0).setText("code=".concat(n.code, " message=").concat(n.message)).setNetworkType(this.tim.netMonitor.getNetworkType()).setEnd(), n.code ? J.warn("Oops! code:".concat(n.code, " message:").concat(n.message)) : J.warn("Oops! message:".concat(n.message, " stack:").concat(n.stack)), this.tim.outerEmitter.emit(e.ERROR, n);} }]), t;}(),pa = function () {function e(n) {var o = this;r(this, e), Oe(n) || (this.userID = n.userID || "", this.nick = n.nick || "", this.gender = n.gender || "", this.birthday = n.birthday || 0, this.location = n.location || "", this.selfSignature = n.selfSignature || "", this.allowType = n.allowType || t.ALLOW_TYPE_ALLOW_ANY, this.language = n.language || 0, this.avatar = n.avatar || "", this.messageSettings = n.messageSettings || 0, this.adminForbidType = n.adminForbidType || t.FORBID_TYPE_NONE, this.level = n.level || 0, this.role = n.role || 0, this.lastUpdatedTime = 0, this.profileCustomField = [], Oe(n.profileCustomField) || n.profileCustomField.forEach(function (e) {o.profileCustomField.push({ key: e.key, value: e.value });}));}return i(e, [{ key: "validate", value: function value(e) {var t = !0,n = "";if (Oe(e)) return { valid: !1, tips: "empty options" };if (e.profileCustomField) for (var r = e.profileCustomField.length, o = null, i = 0; i < r; i++) {if (o = e.profileCustomField[i], !ee(o.key) || -1 === o.key.indexOf("Tag_Profile_Custom")) return { valid: !1, tips: "自定义资料字段的前缀必须是 Tag_Profile_Custom" };if (!ee(o.value)) return { valid: !1, tips: "自定义资料字段的 value 必须是字符串" };}for (var s in e) {if (Object.prototype.hasOwnProperty.call(e, s)) {if ("profileCustomField" === s) continue;if (Oe(e[s]) && !ee(e[s]) && !Z(e[s])) {n = "key:" + s + ", invalid value:" + e[s], t = !1;continue;}switch (s) {case "nick":ee(e[s]) || (n = "nick should be a string", t = !1), ge(e[s]) > 500 && (n = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(ge(e[s]), " bytes"), t = !1);break;case "gender":ve(tt, e.gender) || (n = "key:gender, invalid value:" + e.gender, t = !1);break;case "birthday":Z(e.birthday) || (n = "birthday should be a number", t = !1);break;case "location":ee(e.location) || (n = "location should be a string", t = !1);break;case "selfSignature":ee(e.selfSignature) || (n = "selfSignature should be a string", t = !1);break;case "allowType":ve(rt, e.allowType) || (n = "key:allowType, invalid value:" + e.allowType, t = !1);break;case "language":Z(e.language) || (n = "language should be a number", t = !1);break;case "avatar":ee(e.avatar) || (n = "avatar should be a string", t = !1);break;case "messageSettings":0 !== e.messageSettings && 1 !== e.messageSettings && (n = "messageSettings should be 0 or 1", t = !1);break;case "adminForbidType":ve(nt, e.adminForbidType) || (n = "key:adminForbidType, invalid value:" + e.adminForbidType, t = !1);break;case "level":Z(e.level) || (n = "level should be a number", t = !1);break;case "role":Z(e.role) || (n = "role should be a number", t = !1);break;default:n = "unknown key:" + s + "  " + e[s], t = !1;}}}return { valid: t, tips: n };} }]), e;}(),ha = function () {function t(e) {r(this, t), this.userController = e, this.TAG = "profile", this.Actions = { Q: "query", U: "update" }, this.accountProfileMap = new Map(), this.expirationTime = 864e5;}return i(t, [{ key: "setExpirationTime", value: function value(e) {this.expirationTime = e;} }, { key: "getUserProfile", value: function value(e) {var t = this,n = e.userIDList;e.fromAccount = this.userController.getMyAccount(), n.length > 100 && (J.warn("ProfileHandler.getUserProfile 获取用户资料人数不能超过100人"), n.length = 100);for (var r, o = [], i = [], s = 0, a = n.length; s < a; s++) {r = n[s], this.userController.isMyFriend(r) && this._containsAccount(r) ? i.push(this._getProfileFromMap(r)) : o.push(r);}if (0 === o.length) return Fr(i);e.toAccount = o;var u = e.bFromGetMyProfile || !1,c = [];e.toAccount.forEach(function (e) {c.push({ toAccount: e, standardSequence: 0, customSequence: 0 });}), e.userItem = c;var l = new Br();l.setMethod(Fo).setText(n.length > 5 ? "userIDList.length=".concat(n.length) : "userIDList=".concat(n)).setStart();var p = this.userController.generateConfig(this.TAG, this.Actions.Q, e);return this.userController.request(p).then(function (e) {l.setCode(0).setNetworkType(t.userController.getNetworkType()).setEnd(), J.info("ProfileHandler.getUserProfile ok");var n = t._handleResponse(e).concat(i);return u ? (t.userController.onGotMyProfile(), new Ur(n[0])) : new Ur(n);}).catch(function (e) {return t.userController.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];l.setError(e, r, o).setEnd();}), J.error("ProfileHandler.getUserProfile error:", e), Vr(e);});} }, { key: "getMyProfile", value: function value() {var e = this.userController.getMyAccount();if (J.log("ProfileHandler.getMyProfile myAccount=" + e), this._fillMap(), this._containsAccount(e)) {var t = this._getProfileFromMap(e);return J.debug("ProfileHandler.getMyProfile from cache, myProfile:" + JSON.stringify(t)), this.userController.onGotMyProfile(), Fr(t);}return this.getUserProfile({ fromAccount: e, userIDList: [e], bFromGetMyProfile: !0 });} }, { key: "_handleResponse", value: function value(e) {for (var t, n, r = pe.now(), o = e.data.userProfileItem, i = [], s = 0, a = o.length; s < a; s++) {"@TLS#NOT_FOUND" !== o[s].to && "" !== o[s].to && (t = o[s].to, n = this._updateMap(t, this._getLatestProfileFromResponse(t, o[s].profileItem)), i.push(n));}return J.log("ProfileHandler._handleResponse cost " + (pe.now() - r) + " ms"), i;} }, { key: "_getLatestProfileFromResponse", value: function value(e, t) {var n = {};if (n.userID = e, n.profileCustomField = [], !Oe(t)) for (var r = 0, o = t.length; r < o; r++) {if (t[r].tag.indexOf("Tag_Profile_Custom") > -1) n.profileCustomField.push({ key: t[r].tag, value: t[r].value });else switch (t[r].tag) {case et.NICK:n.nick = t[r].value;break;case et.GENDER:n.gender = t[r].value;break;case et.BIRTHDAY:n.birthday = t[r].value;break;case et.LOCATION:n.location = t[r].value;break;case et.SELFSIGNATURE:n.selfSignature = t[r].value;break;case et.ALLOWTYPE:n.allowType = t[r].value;break;case et.LANGUAGE:n.language = t[r].value;break;case et.AVATAR:n.avatar = t[r].value;break;case et.MESSAGESETTINGS:n.messageSettings = t[r].value;break;case et.ADMINFORBIDTYPE:n.adminForbidType = t[r].value;break;case et.LEVEL:n.level = t[r].value;break;case et.ROLE:n.role = t[r].value;break;default:J.warn("ProfileHandler._handleResponse unkown tag->", t[r].tag, t[r].value);}}return n;} }, { key: "updateMyProfile", value: function value(t) {var n = this,r = new Br();r.setMethod(Vo).setText(JSON.stringify(t)).setStart();var o = new pa().validate(t);if (!o.valid) return r.setCode(dt.UPDATE_PROFILE_INVALID_PARAM).setMessage("ProfileHandler.updateMyProfile info:".concat(o.tips)).setNetworkType(this.userController.getNetworkType()).setEnd(), J.error("ProfileHandler.updateMyProfile info:".concat(o.tips, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")), Vr({ code: dt.UPDATE_PROFILE_INVALID_PARAM, message: on });var i = [];for (var s in t) {Object.prototype.hasOwnProperty.call(t, s) && ("profileCustomField" === s ? t.profileCustomField.forEach(function (e) {i.push({ tag: e.key, value: e.value });}) : i.push({ tag: et[s.toUpperCase()], value: t[s] }));}if (0 === i.length) return r.setCode(dt.UPDATE_PROFILE_NO_KEY).setMessage(sn).setNetworkType(this.userController.getNetworkType()).setEnd(), J.error("ProfileHandler.updateMyProfile info:".concat(sn, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")), Vr({ code: dt.UPDATE_PROFILE_NO_KEY, message: sn });var a = this.userController.generateConfig(this.TAG, this.Actions.U, { fromAccount: this.userController.getMyAccount(), profileItem: i });return this.userController.request(a).then(function (o) {r.setCode(0).setNetworkType(n.userController.getNetworkType()).setEnd(), J.info("ProfileHandler.updateMyProfile ok");var i = n._updateMap(n.userController.getMyAccount(), t);return n.userController.emitOuterEvent(e.PROFILE_UPDATED, [i]), Fr(i);}).catch(function (e) {return n.userController.probeNetwork().then(function (t) {var n = y(t, 2),o = n[0],i = n[1];r.setError(e, o, i).setEnd();}), J.error("ProfileHandler.updateMyProfile error:", e), Vr(e);});} }, { key: "onProfileModified", value: function value(t) {var n = t.data;if (!Oe(n)) {var r,o,i = n.length;J.info("ProfileHandler.onProfileModified length=" + i);for (var s = [], a = 0; a < i; a++) {r = n[a].userID, o = this._updateMap(r, this._getLatestProfileFromResponse(r, n[a].profileList)), s.push(o);}this.userController.emitInnerEvent(Sr, s), this.userController.emitOuterEvent(e.PROFILE_UPDATED, s);}} }, { key: "_fillMap", value: function value() {if (0 === this.accountProfileMap.size) {for (var e = this._getCachedProfiles(), t = Date.now(), n = 0, r = e.length; n < r; n++) {t - e[n].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e[n].userID, e[n]);}J.log("ProfileHandler._fillMap from cache, map.size=" + this.accountProfileMap.size);}} }, { key: "_updateMap", value: function value(e, t) {var n,r = Date.now();return this._containsAccount(e) ? (n = this._getProfileFromMap(e), t.profileCustomField && Ee(n.profileCustomField, t.profileCustomField), he(n, t, ["profileCustomField"]), n.lastUpdatedTime = r) : (n = new pa(t), (this.userController.isMyFriend(e) || e === this.userController.getMyAccount()) && (n.lastUpdatedTime = r, this.accountProfileMap.set(e, n))), this._flushMap(e === this.userController.getMyAccount()), n;} }, { key: "_flushMap", value: function value(e) {var t = v(this.accountProfileMap.values()),n = this.userController.tim.storage;J.debug("ProfileHandler._flushMap length=".concat(t.length, " flushAtOnce=").concat(e)), n.setItem(this.TAG, t, e);} }, { key: "_containsAccount", value: function value(e) {return this.accountProfileMap.has(e);} }, { key: "_getProfileFromMap", value: function value(e) {return this.accountProfileMap.get(e);} }, { key: "_getCachedProfiles", value: function value() {var e = this.userController.tim.storage.getItem(this.TAG);return Oe(e) ? [] : e;} }, { key: "onConversationsProfileUpdated", value: function value(e) {for (var t, n, r, o = [], i = 0, s = e.length; i < s; i++) {n = (t = e[i]).userID, this.userController.isMyFriend(n) && (this._containsAccount(n) ? (r = this._getProfileFromMap(n), he(r, t) > 0 && o.push(n)) : o.push(t.userID));}0 !== o.length && (J.info("ProfileHandler.onConversationsProfileUpdated toAccount:", o), this.getUserProfile({ userIDList: o }));} }, { key: "reset", value: function value() {this._flushMap(!0), this.accountProfileMap.clear();} }]), t;}(),da = function () {function e(t) {r(this, e), this.options = t ? t.options : { enablePointer: !0 }, this.pointsList = {}, this.reportText = {}, this.maxNameLen = 0, this.gapChar = "-", this.log = console.log, this.currentTask = "";}return i(e, [{ key: "newTask", value: function value(e) {!1 !== this.options.enablePointer && (e || (e = ["task", this._timeFormat()].join("-")), this.pointsList[e] = [], this.currentTask = e, console.log("Pointer new Task : ".concat(this.currentTask)));} }, { key: "deleteTask", value: function value(e) {!1 !== this.options.enablePointer && (e || (e = this.currentTask), this.pointsList[e].length = 0, delete this.pointsList[e]);} }, { key: "dot", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",t = arguments.length > 1 ? arguments[1] : void 0;if (!1 !== this.options.enablePointer) {t = t || this.currentTask;var n = +new Date();this.maxNameLen = this.maxNameLen < e.length ? e.length : this.maxNameLen, this.flen = this.maxNameLen + 10, this.pointsList[t].push({ pointerName: e, time: n });}} }, { key: "_analisys", value: function value(e) {if (!1 !== this.options.enablePointer) {e = e || this.currentTask;for (var t = this.pointsList[e], n = t.length, r = [], o = [], i = 0; i < n; i++) {0 !== i && (o = this._analisysTowPoints(t[i - 1], t[i]), r.push(o.join("")));}return o = this._analisysTowPoints(t[0], t[n - 1], !0), r.push(o.join("")), r.join("");}} }, { key: "_analisysTowPoints", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];if (!1 !== this.options.enablePointer) {var r = this.flen,o = t.time - e.time,i = o.toString(),s = e.pointerName + this.gapChar.repeat(r - e.pointerName.length),a = t.pointerName + this.gapChar.repeat(r - t.pointerName.length),u = this.gapChar.repeat(4 - i.length) + i,c = n ? ["%c", s, a, u, "ms\n%c"] : [s, a, u, "ms\n"];return c;}} }, { key: "report", value: function value(e) {if (!1 !== this.options.enablePointer) {e = e || this.currentTask;var t = this._analisys(e);this.pointsList = [];var n = this._timeFormat(),r = "Pointer[".concat(e, "(").concat(n, ")]"),o = 4 * this.maxNameLen,i = (o - r.length) / 2;console.log(["-".repeat(i), r, "-".repeat(i)].join("")), console.log("%c" + t, "color:#66a", "color:red", "color:#66a"), console.log("-".repeat(o));}} }, { key: "_timeFormat", value: function value() {var e = new Date(),t = this.zeroFix(e.getMonth() + 1, 2),n = this.zeroFix(e.getDate(), 2);return "".concat(t, "-").concat(n, " ").concat(e.getHours(), ":").concat(e.getSeconds(), ":").concat(e.getMinutes(), "~").concat(e.getMilliseconds());} }, { key: "zeroFix", value: function value(e, t) {return ("000000000" + e).slice(-t);} }, { key: "reportAll", value: function value() {if (!1 !== this.options.enablePointer) for (var e in this.pointsList) {Object.prototype.hasOwnProperty.call(this.pointsList, e) && this.eport(e);}} }]), e;}(),fa = function e(t, n) {r(this, e), this.userID = t;var o = {};if (o.userID = t, !Oe(n)) for (var i = 0, s = n.length; i < s; i++) {switch (n[i].tag) {case et.NICK:o.nick = n[i].value;break;case et.GENDER:o.gender = n[i].value;break;case et.BIRTHDAY:o.birthday = n[i].value;break;case et.LOCATION:o.location = n[i].value;break;case et.SELFSIGNATURE:o.selfSignature = n[i].value;break;case et.ALLOWTYPE:o.allowType = n[i].value;break;case et.LANGUAGE:o.language = n[i].value;break;case et.AVATAR:o.avatar = n[i].value;break;case et.MESSAGESETTINGS:o.messageSettings = n[i].value;break;case et.ADMINFORBIDTYPE:o.adminForbidType = n[i].value;break;case et.LEVEL:o.level = n[i].value;break;case et.ROLE:o.role = n[i].value;break;default:J.debug("snsProfileItem unkown tag->", n[i].tag);}}this.profile = new pa(o);},ga = function () {function e(t) {r(this, e), this.userController = t, this.TAG = "friend", this.Actions = { G: "get", D: "delete" }, this.friends = new Map(), this.pointer = new da();}return i(e, [{ key: "isMyFriend", value: function value(e) {var t = this.friends.has(e);return t || J.debug("FriendHandler.isMyFriend " + e + " is not my friend"), t;} }, { key: "_transformFriendList", value: function value(e) {if (!Oe(e) && !Oe(e.infoItem)) {J.info("FriendHandler._transformFriendList friendNum=" + e.friendNum);for (var t, n, r = e.infoItem, o = 0, i = r.length; o < i; o++) {n = r[o].infoAccount, t = new fa(n, r[o].snsProfileItem), this.friends.set(n, t);}}} }, { key: "_friends2map", value: function value(e) {var t = new Map();for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && t.set(n, e[n]);}return t;} }, { key: "getFriendList", value: function value() {var e = this,t = {};t.fromAccount = this.userController.getMyAccount(), J.info("FriendHandler.getFriendList myAccount=" + t.fromAccount);var n = this.userController.generateConfig(this.TAG, this.Actions.G, t);return this.userController.request(n).then(function (t) {J.info("FriendHandler.getFriendList ok"), e._transformFriendList(t.data);var n = v(e.friends.values());return Fr(n);}).catch(function (e) {return J.error("FriendHandler.getFriendList error:", e), Vr(e);});} }, { key: "deleteFriend", value: function value(e) {if (!Array.isArray(e.toAccount)) return J.error("FriendHandler.deleteFriend options.toAccount 必需是数组"), Vr({ code: dt.DEL_FRIEND_INVALID_PARAM, message: rn });e.toAccount.length > 1e3 && (J.warn("FriendHandler.deleteFriend 删除好友人数不能超过1000人"), e.toAccount.length = 1e3);var t = this.userController.generateConfig(this.TAG, this.Actions.D, e);return this.userController.request(t).then(function (e) {return J.info("FriendHandler.deleteFriend ok"), Fr();}).catch(function (e) {return J.error("FriendHandler.deleteFriend error:", e), Vr(e);});} }]), e;}(),ma = function e(t) {r(this, e), Oe || (this.userID = t.userID || "", this.timeStamp = t.timeStamp || 0);},_a = function () {function t(e) {r(this, t), this.userController = e, this.TAG = "blacklist", this.Actions = { G: "get", C: "create", D: "delete" }, this.blacklistMap = new Map(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0;}return i(t, [{ key: "getBlacklist", value: function value() {var e = this,t = {};t.fromAccount = this.userController.getMyAccount(), t.maxLimited = this.maxLimited, t.startIndex = 0, t.lastSequence = this.curruentSequence;var n = new Br();n.setMethod(Ko).setStart();var r = this.userController.generateConfig(this.TAG, this.Actions.G, t);return this.userController.request(r).then(function (t) {var r = Oe(t.data.blackListItem) ? 0 : t.data.blackListItem.length;return n.setCode(0).setNetworkType(e.userController.getNetworkType()).setText(r).setEnd(), J.info("BlacklistHandler.getBlacklist ok"), e.curruentSequence = t.data.curruentSequence, e._handleResponse(t.data.blackListItem, !0), e._onBlacklistUpdated();}).catch(function (t) {return e.userController.probeNetwork().then(function (e) {var r = y(e, 2),o = r[0],i = r[1];n.setError(t, o, i).setEnd();}), J.error("BlacklistHandler.getBlacklist error:", t), Vr(t);});} }, { key: "addBlacklist", value: function value(e) {var t = this,n = new Br();if (n.setMethod(Bo).setStart(), !re(e.userIDList)) return n.setCode(dt.ADD_BLACKLIST_INVALID_PARAM).setMessage("BlacklistHandler.addBlacklist options.userIDList 必需是数组").setNetworkType(this.userController.getNetworkType()).setEnd(), J.error("BlacklistHandler.addBlacklist options.userIDList 必需是数组"), Vr({ code: dt.ADD_BLACKLIST_INVALID_PARAM, message: an });var r = this.userController.tim.loginInfo.identifier;if (1 === e.userIDList.length && e.userIDList[0] === r) return n.setCode(dt.CANNOT_ADD_SELF_TO_BLACKLIST).setMessage(cn).setNetworkType(this.userController.getNetworkType()).setEnd(), J.error("BlacklistHandler.addBlacklist 不能把自己拉黑"), Vr({ code: dt.CANNOT_ADD_SELF_TO_BLACKLIST, message: cn });e.userIDList.includes(r) && (e.userIDList = e.userIDList.filter(function (e) {return e !== r;}), J.warn("BlacklistHandler.addBlacklist 不能把自己拉黑，已过滤")), e.fromAccount = this.userController.getMyAccount(), e.toAccount = e.userIDList;var o = this.userController.generateConfig(this.TAG, this.Actions.C, e);return this.userController.request(o).then(function (r) {return n.setCode(0).setNetworkType(t.userController.getNetworkType()).setText(e.userIDList.length > 5 ? "userIDList.length=".concat(e.userIDList.length) : "userIDList=".concat(e.userIDList)).setEnd(), J.info("BlacklistHandler.addBlacklist ok"), t._handleResponse(r.data.resultItem, !0), t._onBlacklistUpdated();}).catch(function (e) {return t.userController.probeNetwork().then(function (t) {var r = y(t, 2),o = r[0],i = r[1];n.setError(e, o, i).setEnd();}), J.error("BlacklistHandler.addBlacklist error:", e), Vr(e);});} }, { key: "_handleResponse", value: function value(e, t) {if (!Oe(e)) for (var n, r, o, i = 0, s = e.length; i < s; i++) {r = e[i].to, o = e[i].resultCode, (oe(o) || 0 === o) && (t ? ((n = this.blacklistMap.has(r) ? this.blacklistMap.get(r) : new ma()).userID = r, !Oe(e[i].addBlackTimeStamp) && (n.timeStamp = e[i].addBlackTimeStamp), this.blacklistMap.set(r, n)) : this.blacklistMap.has(r) && (n = this.blacklistMap.get(r), this.blacklistMap.delete(r)));}J.log("BlacklistHandler._handleResponse total=" + this.blacklistMap.size + " bAdd=" + t);} }, { key: "deleteBlacklist", value: function value(e) {var t = this,n = new Br();if (n.setMethod(Ho).setStart(), !re(e.userIDList)) return n.setCode(dt.DEL_BLACKLIST_INVALID_PARAM).setMessage("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组").setNetworkType(this.userController.getNetworkType()).setEnd(), J.error("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组"), Vr({ code: dt.DEL_BLACKLIST_INVALID_PARAM, message: un });e.fromAccount = this.userController.getMyAccount(), e.toAccount = e.userIDList;var r = this.userController.generateConfig(this.TAG, this.Actions.D, e);return this.userController.request(r).then(function (r) {return n.setCode(0).setNetworkType(t.userController.getNetworkType()).setText(e.userIDList.length > 5 ? "userIDList.length=".concat(e.userIDList.length) : "userIDList=".concat(e.userIDList)).setEnd(), J.info("BlacklistHandler.deleteBlacklist ok"), t._handleResponse(r.data.resultItem, !1), t._onBlacklistUpdated();}).catch(function (e) {return t.userController.probeNetwork().then(function (t) {var r = y(t, 2),o = r[0],i = r[1];n.setError(e, o, i).setEnd();}), J.error("BlacklistHandler.deleteBlacklist error:", e), Vr(e);});} }, { key: "_onBlacklistUpdated", value: function value() {var t = v(this.blacklistMap.keys());return this.userController.emitOuterEvent(e.BLACKLIST_UPDATED, t), Fr(t);} }, { key: "handleBlackListDelAccount", value: function value(t) {for (var n, r = [], o = 0, i = t.length; o < i; o++) {n = t[o], this.blacklistMap.has(n) && (this.blacklistMap.delete(n), r.push(n));}r.length > 0 && (J.log("BlacklistHandler.handleBlackListDelAccount delCount=" + r.length + " : " + r.join(",")), this.userController.emitOuterEvent(e.BLACKLIST_UPDATED, v(this.blacklistMap.keys())));} }, { key: "handleBlackListAddAccount", value: function value(t) {for (var n, r = [], o = 0, i = t.length; o < i; o++) {n = t[o], this.blacklistMap.has(n) || (this.blacklistMap.set(n, new ma({ userID: n })), r.push(n));}r.length > 0 && (J.log("BlacklistHandler.handleBlackListAddAccount addCount=" + r.length + " : " + r.join(",")), this.userController.emitOuterEvent(e.BLACKLIST_UPDATED, v(this.blacklistMap.keys())));} }, { key: "reset", value: function value() {this.blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0;} }]), t;}(),ya = function () {function e(t) {r(this, e), this.userController = t, this.TAG = "applyC2C", this.Actions = { C: "create", G: "get", D: "delete", U: "update" };}return i(e, [{ key: "applyAddFriend", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.C, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("applyAddFriend", t.Actions.C, e);}).catch(function (e) {}), r;} }, { key: "getPendency", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.G, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("getPendency", t.Actions.G, e);}).catch(function (e) {}), r;} }, { key: "deletePendency", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.D, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("deletePendency", t.Actions.D, e);}).catch(function (e) {}), r;} }, { key: "replyPendency", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},n = this.userController.generateConfig(this.TAG, this.Actions.U, t),r = this.userController.request(n);return r.then(function (t) {e.userController.isActionSuccessful("replyPendency", e.Actions.U, t);}).catch(function (e) {}), r;} }]), e;}(),va = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).profileHandler = new ha(g(o)), o.friendHandler = new ga(g(o)), o.blacklistHandler = new _a(g(o)), o.applyC2CHandler = new ya(g(o)), o._initializeListener(), o;}return i(n, [{ key: "_initializeListener", value: function value(e) {var t = this.tim.innerEmitter;t.on(xn, this.onContextUpdated, this), t.on(ur, this.onProfileModified, this), t.on(ar, this.onNewFriendMessages, this), t.on(Cr, this.onConversationsProfileUpdated, this);} }, { key: "onContextUpdated", value: function value(e) {var t = this.tim.context;!1 != !!t.a2Key && !1 != !!t.tinyID && (this.profileHandler.getMyProfile(), this.friendHandler.getFriendList(), this.blacklistHandler.getBlacklist());} }, { key: "onGotMyProfile", value: function value() {this.triggerReady();} }, { key: "onProfileModified", value: function value(e) {this.profileHandler.onProfileModified(e);} }, { key: "onNewFriendMessages", value: function value(e) {J.debug("onNewFriendMessages", JSON.stringify(e.data)), Oe(e.data.blackListDelAccount) || this.blacklistHandler.handleBlackListDelAccount(e.data.blackListDelAccount), Oe(e.data.blackListAddAccount) || this.blacklistHandler.handleBlackListAddAccount(e.data.blackListAddAccount);} }, { key: "onConversationsProfileUpdated", value: function value(e) {this.profileHandler.onConversationsProfileUpdated(e.data);} }, { key: "getMyAccount", value: function value() {return this.tim.context.identifier;} }, { key: "isMyFriend", value: function value(e) {return this.friendHandler.isMyFriend(e);} }, { key: "generateConfig", value: function value(e, t, n) {return { name: e, action: t, param: n };} }, { key: "getMyProfile", value: function value() {return this.profileHandler.getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this.profileHandler.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this.profileHandler.updateMyProfile(e);} }, { key: "getFriendList", value: function value() {return this.friendHandler.getFriendList();} }, { key: "deleteFriend", value: function value(e) {return this.friendHandler.deleteFriend(e);} }, { key: "getBlacklist", value: function value() {return this.blacklistHandler.getBlacklist();} }, { key: "addBlacklist", value: function value(e) {return this.blacklistHandler.addBlacklist(e);} }, { key: "deleteBlacklist", value: function value(e) {return this.blacklistHandler.deleteBlacklist(e);} }, { key: "applyAddFriend", value: function value(e) {return this.applyC2CHandler.applyAddFriend(e);} }, { key: "getPendency", value: function value(e) {return this.applyC2CHandler.getPendency(e);} }, { key: "deletePendency", value: function value(e) {return this.applyC2CHandler.deletePendency(e);} }, { key: "replyPendency", value: function value(e) {return this.applyC2CHandler.replyPendency(e);} }, { key: "reset", value: function value() {J.info("UserController.reset"), this.resetReady(), this.profileHandler.reset(), this.blacklistHandler.reset(), this.checkTimes = 0;} }]), n;}(Pr),Ia = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField", "muteAllMembers"],Ma = function () {function e(t) {r(this, e), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = { messageRemindType: "", joinTime: "", nameCard: "", role: "" }, this.lastMessage = { lastTime: "", lastSequence: "", fromAccount: "", messageForShow: "" }, this.nextMessageSeq = "", this.memberNum = "", this.maxMemberNum = "", this.joinOption = "", this.groupCustomField = [], this.muteAllMembers = void 0, this._initGroup(t);}return i(e, [{ key: "_initGroup", value: function value(e) {for (var t in e) {Ia.indexOf(t) < 0 || ("selfInfo" !== t ? this[t] = e[t] : this.updateSelfInfo(e[t]));}} }, { key: "updateGroup", value: function value(e) {e.lastMsgTime && (this.lastMessage.lastTime = e.lastMsgTime), oe(e.muteAllMembers) || ("On" === e.muteAllMembers ? e.muteAllMembers = !0 : e.muteAllMembers = !1), e.groupCustomField && Ee(this.groupCustomField, e.groupCustomField), he(this, e, ["members", "errorCode", "lastMsgTime", "groupCustomField"]);} }, { key: "updateSelfInfo", value: function value(e) {var t = e.nameCard,n = e.joinTime,r = e.role,o = e.messageRemindType;he(this.selfInfo, { nameCard: t, joinTime: n, role: r, messageRemindType: o }, [], ["", null, void 0, 0, NaN]);} }, { key: "setSelfNameCard", value: function value(e) {this.selfInfo.nameCard = e;} }]), e;}(),Ca = function Ca(e, n) {if (oe(n)) return "";switch (e) {case t.MSG_TEXT:return n.text;case t.MSG_IMAGE:return "[图片]";case t.MSG_GEO:return "[位置]";case t.MSG_AUDIO:return "[语音]";case t.MSG_VIDEO:return "[视频]";case t.MSG_FILE:return "[文件]";case t.MSG_CUSTOM:return "[自定义消息]";case t.MSG_GRP_TIP:return "[群提示消息]";case t.MSG_GRP_SYS_NOTICE:return "[群系统通知]";case t.MSG_FACE:return "[动画表情]";default:return "";}},Ea = function Ea(e) {return oe(e) ? { lastTime: 0, lastSequence: 0, fromAccount: 0, messageForShow: "", payload: null, type: "", isRevoked: !1 } : e instanceof Dn ? { lastTime: e.time || 0, lastSequence: e.sequence || 0, fromAccount: e.from || "", messageForShow: Ca(e.type, e.payload), payload: e.payload || null, type: e.type || null, isRevoked: !1 } : u({}, e, { isRevoked: !1, messageForShow: Ca(e.type, e.payload) });},Sa = function () {function e(t) {r(this, e), this.conversationID = t.conversationID || "", this.unreadCount = t.unreadCount || 0, this.type = t.type || "", this.lastMessage = Ea(t.lastMessage), t.lastMsgTime && (this.lastMessage.lastTime = t.lastMsgTime), this._isInfoCompleted = !1, this.peerReadTime = t.peerReadTime || 0, this._initProfile(t);}return i(e, [{ key: "_initProfile", value: function value(e) {var n = this;Object.keys(e).forEach(function (t) {switch (t) {case "userProfile":n.userProfile = e.userProfile;break;case "groupProfile":n.groupProfile = e.groupProfile;}}), oe(this.userProfile) && this.type === t.CONV_C2C ? this.userProfile = new pa({ userID: e.conversationID.replace("C2C", "") }) : oe(this.groupProfile) && this.type === t.CONV_GROUP && (this.groupProfile = new Ma({ groupID: e.conversationID.replace("GROUP", "") }));} }, { key: "updateUnreadCount", value: function value(e, n) {oe(e) || (Te(this.subType) || De(this.subType) ? this.unreadCount = 0 : n && this.type === t.CONV_GROUP ? this.unreadCount = e : this.unreadCount = this.unreadCount + e);} }, { key: "updateLastMessage", value: function value(e) {this.lastMessage = Ea(e);} }, { key: "reduceUnreadCount", value: function value() {this.unreadCount >= 1 && (this.unreadCount -= 1);} }, { key: "isLastMessageRevoked", value: function value(e) {var n = e.sequence,r = e.time;return this.type === t.CONV_C2C && n === this.lastMessage.lastSequence && r === this.lastMessage.lastTime || this.type === t.CONV_GROUP && n === this.lastMessage.lastSequence;} }, { key: "setLastMessageRevoked", value: function value(e) {this.lastMessage.isRevoked = e;} }, { key: "toAccount", get: function get() {return this.conversationID.replace("C2C", "").replace("GROUP", "");} }, { key: "subType", get: function get() {return this.groupProfile ? this.groupProfile.type : "";} }]), e;}(),Ta = function (n) {c(s, n);var o = _(s);function s(e) {var t;return r(this, s), (t = o.call(this, e)).pagingStatus = Ue.NOT_START, t.pagingTimeStamp = 0, t.conversationMap = new Map(), t.tempGroupList = [], t._initListeners(), t;}return i(s, [{ key: "hasLocalConversationMap", value: function value() {return this.conversationMap.size > 0;} }, { key: "_createLocalConversation", value: function value(e) {return this.conversationMap.has(e) ? this.conversationMap.get(e) : (J.log("ConversationController._createLocalConversation conversationID:".concat(e)), new Sa({ conversationID: e, type: e.slice(0, 3) === t.CONV_C2C ? t.CONV_C2C : t.CONV_GROUP }));} }, { key: "hasLocalConversation", value: function value(e) {return this.conversationMap.has(e);} }, { key: "getConversationList", value: function value() {var e = this;J.log("ConversationController.getConversationList."), this.pagingStatus === Ue.REJECTED && (J.log("ConversationController.getConversationList. continue to sync conversationList"), this._syncConversationList());var t = new Br();return t.setMethod(ao).setStart(), this.request({ name: "conversation", action: "query" }).then(function (n) {var r = n.data.conversations,o = void 0 === r ? [] : r,i = e._getConversationOptions(o);return e._updateLocalConversationList(i, !0), e._setStorageConversationList(), e._handleC2CPeerReadTime(), t.setCode(0).setText(o.length).setNetworkType(e.getNetworkType()).setEnd(), J.log("ConversationController.getConversationList ok."), Fr({ conversationList: e.getLocalConversationList() });}).catch(function (n) {return e.probeNetwork().then(function (e) {var r = y(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd();}), J.error("ConversationController.getConversationList error:", n), Vr(n);});} }, { key: "_syncConversationList", value: function value() {var e = this,t = new Br();return t.setMethod(po).setStart(), this.pagingStatus === Ue.NOT_START && this.conversationMap.clear(), this._autoPagingSyncConversationList().then(function (n) {return e.pagingStatus = Ue.RESOLVED, e._setStorageConversationList(), e._handleC2CPeerReadTime(), t.setCode(0).setText("".concat(e.conversationMap.size)).setNetworkType(e.getNetworkType()).setEnd(), n;}).catch(function (n) {return e.pagingStatus = Ue.REJECTED, t.setText(e.pagingTimeStamp), e.probeNetwork().then(function (e) {var r = y(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd();}), Vr(n);});} }, { key: "_autoPagingSyncConversationList", value: function value() {var e = this;return this.pagingStatus = Ue.PENDING, this.request({ name: "conversation", action: "pagingQuery", param: { fromAccount: this.tim.context.identifier, timeStamp: this.pagingTimeStamp, orderType: 1 } }).then(function (t) {var n = t.data,r = n.completeFlag,o = n.conversations,i = void 0 === o ? [] : o,s = n.timeStamp;if (J.log("ConversationController._autoPagingSyncConversationList completeFlag=".concat(r, " nums=").concat(i.length)), i.length > 0) {var a = e._getConversationOptions(i);e._updateLocalConversationList(a, !0);}return e._isReady ? e._emitConversationUpdate() : e.triggerReady(), e.pagingTimeStamp = s, 1 !== r ? e._autoPagingSyncConversationList() : Fr();});} }, { key: "_handleC2CPeerReadTime", value: function value() {var e,n = this.tim.messageController,r = C(this.conversationMap);try {for (r.s(); !(e = r.n()).done;) {var o = y(e.value, 2),i = o[0],s = o[1];s.type === t.CONV_C2C && (J.debug("ConversationController._handleC2CPeerReadTime", i, s.peerReadTime), n.recordPeerReadTime(i, s.peerReadTime));}} catch (a) {r.e(a);} finally {r.f();}} }, { key: "getConversationProfile", value: function value(e) {var n = this,r = this.conversationMap.has(e) ? this.conversationMap.get(e) : this._createLocalConversation(e);if (r._isInfoCompleted || r.type === t.CONV_SYSTEM) return Fr({ conversation: r });var o = new Br();return o.setMethod(uo).setStart(), J.log("ConversationController.getConversationProfile. conversationID:".concat(e, " lastMessage:"), r.lastMessage), this._updateUserOrGroupProfileCompletely(r).then(function (t) {return o.setCode(0).setNetworkType(n.getNetworkType()).setText("conversationID=".concat(e, " unreadCount=").concat(t.data.conversation.unreadCount)).setEnd(), J.log("ConversationController.getConversationProfile ok. conversationID:", e), t;}).catch(function (t) {return n.probeNetwork().then(function (n) {var r = y(n, 2),i = r[0],s = r[1];o.setError(t, i, s).setText("conversationID=".concat(e)).setEnd();}), J.error("ConversationController.getConversationProfile error:", t), Vr(t);});} }, { key: "deleteConversation", value: function value(e) {var n = this,r = {};if (!this.conversationMap.has(e)) {var o = new ht({ code: dt.CONVERSATION_NOT_FOUND, message: Ft });return Vr(o);}switch (this.conversationMap.get(e).type) {case t.CONV_C2C:r.type = 1, r.toAccount = e.replace(t.CONV_C2C, "");break;case t.CONV_GROUP:r.type = 2, r.toGroupID = e.replace(t.CONV_GROUP, "");break;case t.CONV_SYSTEM:return this.tim.groupController.deleteGroupSystemNotice({ messageList: this.tim.messageController.getLocalMessageList(e) }), this.deleteLocalConversation(e), Fr({ conversationID: e });default:var i = new ht({ code: dt.CONVERSATION_UN_RECORDED_TYPE, message: Kt });return Vr(i);}var s = new Br();return s.setMethod(co).setText("conversationID=".concat(e)).setStart(), J.log("ConversationController.deleteConversation. conversationID=".concat(e)), this.tim.setMessageRead({ conversationID: e }).then(function () {return n.request({ name: "conversation", action: "delete", param: r });}).then(function () {return s.setCode(0).setNetworkType(n.getNetworkType()).setEnd(), J.log("ConversationController.deleteConversation ok."), n.deleteLocalConversation(e), Fr({ conversationID: e });}).catch(function (e) {return n.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];s.setError(e, r, o).setEnd();}), J.error("ConversationController.deleteConversation error:", e), Vr(e);});} }, { key: "getLocalConversationList", value: function value() {return v(this.conversationMap.values());} }, { key: "getLocalConversation", value: function value(e) {return this.conversationMap.get(e);} }, { key: "_initLocalConversationList", value: function value() {var e = new Br();e.setMethod(lo).setStart(), J.time(Kr.INIT_CONVERSATION_LIST), J.log("ConversationController._initLocalConversationList init");var t = this._getStorageConversationList();if (t) {for (var n = t.length, r = 0; r < n; r++) {this.conversationMap.set(t[r].conversationID, new Sa(t[r]));}this._emitConversationUpdate(!0, !1), e.setCode(0).setNetworkType(this.getNetworkType()).setText(n).setEnd();} else e.setCode(0).setNetworkType(this.getNetworkType()).setText(0).setEnd();this._syncConversationList();} }, { key: "_getStorageConversationList", value: function value() {return this.tim.storage.getItem("conversationMap");} }, { key: "_setStorageConversationList", value: function value() {var e = this.getLocalConversationList().slice(0, 20).map(function (e) {return { conversationID: e.conversationID, type: e.type, subType: e.subType, lastMessage: e.lastMessage, groupProfile: e.groupProfile, userProfile: e.userProfile };});this.tim.storage.setItem("conversationMap", e);} }, { key: "_initListeners", value: function value() {var e = this;this.tim.innerEmitter.once(xn, this._initLocalConversationList, this), this.tim.innerEmitter.on(Bn, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(Hn, this._handleSyncMessages, this), this.tim.innerEmitter.on(jn, this._handleSyncMessages, this), this.tim.innerEmitter.on(Yn, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on($n, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(Wn, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(gr, this._onGroupListUpdated, this), this.tim.innerEmitter.on(Sr, this._updateConversationUserProfile, this), this.tim.innerEmitter.on(zn, this._onMessageRevoked, this), this.ready(function () {e.tempGroupList.length > 0 && (e._updateConversationGroupProfile(e.tempGroupList), e.tempGroupList.length = 0);});} }, { key: "_onGroupListUpdated", value: function value(e) {this._updateConversationGroupProfile(e.data);} }, { key: "_updateConversationGroupProfile", value: function value(e) {var t = this;re(e) && 0 === e.length || (this.hasLocalConversationMap() ? (e.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t.conversationMap.has(n)) {var r = t.conversationMap.get(n);r.groupProfile = e, r.lastMessage.lastSequence < e.nextMessageSeq && (r.lastMessage.lastSequence = e.nextMessageSeq - 1), r.subType || (r.subType = e.type);}}), this._emitConversationUpdate(!0, !1)) : this.tempGroupList = e);} }, { key: "_updateConversationUserProfile", value: function value(e) {var t = this;e.data.forEach(function (e) {var n = "C2C".concat(e.userID);t.conversationMap.has(n) && (t.conversationMap.get(n).userProfile = e);}), this._emitConversationUpdate(!0, !1);} }, { key: "_onMessageRevoked", value: function value(e) {var t = this,n = e.data;if (0 !== n.length) {var r = null,o = !1;n.forEach(function (e) {(r = t.conversationMap.get(e.conversationID)) && r.isLastMessageRevoked(e) && (o = !0, r.setLastMessageRevoked(!0));}), o && this._emitConversationUpdate(!0, !1);}} }, { key: "_handleSyncMessages", value: function value(e) {this._onSendOrReceiveMessage(e, !0);} }, { key: "_onSendOrReceiveMessage", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],r = e.data.eventDataList;this._isReady ? 0 !== r.length && (this._getPeerReadTime(r), this._updateLocalConversationList(r, !1, n), this._setStorageConversationList(), this._emitConversationUpdate()) : this.ready(function () {t._onSendOrReceiveMessage(e, n);});} }, { key: "_getPeerReadTime", value: function value(e) {var n = this,r = [];e.forEach(function (e) {n.conversationMap.has(e.conversationID) || e.type !== t.CONV_C2C || r.push(e.conversationID.replace(t.CONV_C2C, ""));}), r.length > 0 && (J.debug("ConversationController._getPeerReadTime userIDList:".concat(r)), this.tim.messageController.getPeerReadTime(r));} }, { key: "_updateLocalConversationList", value: function value(e, t, n) {var r;r = this._updateTempConversations(e, t, n), this.conversationMap = new Map(this._sortConversations([].concat(v(r.conversations), v(this.conversationMap)))), t || this._updateUserOrGroupProfile(r.newerConversations);} }, { key: "_updateTempConversations", value: function value(e, n, r) {for (var o = [], i = [], s = 0, a = e.length; s < a; s++) {var u = new Sa(e[s]),c = this.conversationMap.get(u.conversationID);if (this.conversationMap.has(u.conversationID)) {var l = ["unreadCount", "allowType", "adminForbidType", "payload"];r && l.push("lastMessage"), he(c, u, l, [null, void 0, "", 0, NaN]), c.updateUnreadCount(u.unreadCount, n), r || (c.lastMessage.payload = e[s].lastMessage.payload), this.conversationMap.delete(c.conversationID), o.push([c.conversationID, c]);} else {if (u.type === t.CONV_GROUP) {var p = u.groupProfile.groupID,h = this.tim.groupController.getLocalGroupProfile(p);h && (u.groupProfile = h, u.updateUnreadCount(0));}i.push(u), o.push([u.conversationID, u]);}}return { conversations: o, newerConversations: i };} }, { key: "_sortConversations", value: function value(e) {return e.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;});} }, { key: "_updateUserOrGroupProfile", value: function value(e) {var n = this;if (0 !== e.length) {var r = [],o = [];e.forEach(function (e) {if (e.type === t.CONV_C2C) r.push(e.toAccount);else if (e.type === t.CONV_GROUP) {var i = e.toAccount;n.tim.groupController.hasLocalGroup(i) ? e.groupProfile = n.tim.groupController.getLocalGroupProfile(i) : o.push(i);}}), r.length > 0 && this.tim.getUserProfile({ userIDList: r }).then(function (e) {var t = e.data;re(t) ? t.forEach(function (e) {n.conversationMap.get("C2C".concat(e.userID)).userProfile = e;}) : n.conversationMap.get("C2C".concat(t.userID)).userProfile = t;}), o.length > 0 && this.tim.groupController.getGroupProfileAdvance({ groupIDList: o, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "FaceUrl"] } }).then(function (e) {e.data.successGroupList.forEach(function (e) {var t = "GROUP".concat(e.groupID);if (n.conversationMap.has(t)) {var r = n.conversationMap.get(t);he(r.groupProfile, e, [], [null, void 0, "", 0, NaN]), !r.subType && e.type && (r.subType = e.type);}});});}} }, { key: "_updateUserOrGroupProfileCompletely", value: function value(e) {var n = this;return e.type === t.CONV_C2C ? this.tim.getUserProfile({ userIDList: [e.toAccount] }).then(function (t) {var r = t.data;return 0 === r.length ? Vr(new ht({ code: dt.USER_OR_GROUP_NOT_FOUND, message: Vt })) : (e.userProfile = r[0], e._isInfoCompleted = !0, n._unshiftConversation(e), Fr({ conversation: e }));}) : this.tim.getGroupProfile({ groupID: e.toAccount }).then(function (t) {return e.groupProfile = t.data.group, e._isInfoCompleted = !0, n._unshiftConversation(e), Fr({ conversation: e });});} }, { key: "_unshiftConversation", value: function value(e) {e instanceof Sa && !this.conversationMap.has(e.conversationID) && (this.conversationMap = new Map([[e.conversationID, e]].concat(v(this.conversationMap))), this._setStorageConversationList(), this._emitConversationUpdate(!0, !1));} }, { key: "deleteLocalConversation", value: function value(e) {this.conversationMap.delete(e), this._setStorageConversationList(), this.emitInnerEvent(Er, e), this._emitConversationUpdate(!0, !1);} }, { key: "_getConversationOptions", value: function value(e) {var t = [],n = e.filter(function (e) {var t = e.lastMsg;return ne(t);}).map(function (e) {if (1 === e.type) {var n = { userID: e.userID, nick: e.c2CNick, avatar: e.c2CImage };return t.push(n), { conversationID: "C2C".concat(e.userID), type: "C2C", lastMessage: { lastTime: e.time, lastSequence: e.sequence, fromAccount: e.lastC2CMsgFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null }, userProfile: new pa(n), peerReadTime: e.c2cPeerReadTime };}return { conversationID: "GROUP".concat(e.groupID), type: "GROUP", lastMessage: { lastTime: e.time, lastSequence: e.messageReadSeq + e.unreadCount, fromAccount: e.msgGroupFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null }, groupProfile: new Ma({ groupID: e.groupID, name: e.groupNick, avatar: e.groupImage }), unreadCount: e.unreadCount, peerReadTime: 0 };});return t.length > 0 && this.emitInnerEvent(Cr, t), n;} }, { key: "_emitConversationUpdate", value: function value() {var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],r = v(this.conversationMap.values());n && this.emitInnerEvent(Mr, r), t && this.emitOuterEvent(e.CONVERSATION_LIST_UPDATED, r);} }, { key: "_conversationMapTreeShaking", value: function value(e) {var n = this,r = new Map(v(this.conversationMap));e.forEach(function (e) {return r.delete(e.conversationID);}), r.has(t.CONV_SYSTEM) && r.delete(t.CONV_SYSTEM);var o = this.tim.groupController.getJoinedAVChatRoom();o && o.forEach(function (e) {r.delete("".concat(t.CONV_GROUP).concat(e));}), v(r.keys()).forEach(function (e) {return n.conversationMap.delete(e);});} }, { key: "reset", value: function value() {this.pagingStatus = Ue.NOT_START, this.pagingTimeStamp = 0, this.conversationMap.clear(), this.resetReady(), this.tim.innerEmitter.once(xn, this._initLocalConversationList, this);} }]), s;}(Pr),Da = function () {function e(t) {if (r(this, e), void 0 === t) throw new ht({ code: dt.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS, message: Ct });if (void 0 === t.tim) throw new ht({ code: dt.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS, message: "".concat(Ct, ".tim") });this.list = new Map(), this.tim = t.tim, this._initializeOptions(t);}return i(e, [{ key: "getLocalOldestMessageByConversationID", value: function value(e) {if (!e) return null;if (!this.list.has(e)) return null;var t = this.list.get(e).values();return t ? t.next().value : null;} }, { key: "_initializeOptions", value: function value(e) {this.options = {};var t = { memory: { maxDatasPerKey: 100, maxBytesPerData: 256, maxKeys: 0 }, cache: { maxDatasPerKey: 10, maxBytesPerData: 256, maxKeys: 0 } };for (var n in t) {if (Object.prototype.hasOwnProperty.call(t, n)) {if (void 0 === e[n]) {this.options[n] = t[n];continue;}var r = t[n];for (var o in r) {if (Object.prototype.hasOwnProperty.call(r, o)) {if (void 0 === e[n][o]) {this.options[n][o] = r[o];continue;}this.options[n][o] = e[n][o];}}}}} }, { key: "pushIn", value: function value(e) {var t = e.conversationID,n = e.ID,r = !0;return this.list.has(t) || this.list.set(t, new Map()), this.list.has(t) && this.list.get(t).has(n) ? r = !1 : this.list.get(t).set(n, e), r;} }, { key: "unshift", value: function value(e) {re(e) ? e.length > 0 && this._unshiftMultipleMessages(e) : this._unshiftSingleMessage(e);} }, { key: "_unshiftSingleMessage", value: function value(e) {var t = e.conversationID,n = e.ID;if (!this.list.has(t)) return this.list.set(t, new Map()), void this.list.get(t).set(n, e);var r = Array.from(this.list.get(t));r.unshift([n, e]), this.list.set(t, new Map(r));} }, { key: "_unshiftMultipleMessages", value: function value(e) {for (var t = e.length, n = [], r = e[0].conversationID, o = this.list.has(r) ? Array.from(this.list.get(r)) : [], i = 0; i < t; i++) {n.push([e[i].ID, e[i]]);}this.list.set(r, new Map(n.concat(o)));} }, { key: "remove", value: function value(e) {var t = e.conversationID,n = e.ID;this.list.has(t) && this.list.get(t).delete(n);} }, { key: "revoke", value: function value(e, t, n) {if (J.debug("revoke message", e, t, n), this.list.has(e)) {var r,o = C(this.list.get(e));try {for (o.s(); !(r = o.n()).done;) {var i = y(r.value, 2)[1];if (i.sequence === t && !i.isRevoked && (oe(n) || i.random === n)) return i.isRevoked = !0, i;}} catch (s) {o.e(s);} finally {o.f();}}return null;} }, { key: "removeByConversationID", value: function value(e) {this.list.has(e) && this.list.delete(e);} }, { key: "updateMessageIsPeerReadProperty", value: function value(e, t) {var n = [];if (this.list.has(e)) {var r,o = C(this.list.get(e));try {for (o.s(); !(r = o.n()).done;) {var i = y(r.value, 2)[1];i.time <= t && !i.isPeerRead && "out" === i.flow && (i.isPeerRead = !0, n.push(i));}} catch (s) {o.e(s);} finally {o.f();}J.log("MessagesList.updateMessageIsPeerReadProperty conversationID=".concat(e, " peerReadTime=").concat(t, " count=").concat(n.length));}return n;} }, { key: "hasLocalMessageList", value: function value(e) {return this.list.has(e);} }, { key: "getLocalMessageList", value: function value(e) {return this.hasLocalMessageList(e) ? v(this.list.get(e).values()) : [];} }, { key: "hasLocalMessage", value: function value(e, t) {return !!this.hasLocalMessageList(e) && this.list.get(e).has(t);} }, { key: "getLocalMessage", value: function value(e, t) {return this.hasLocalMessage(e, t) ? this.list.get(e).get(t) : null;} }, { key: "reset", value: function value() {this.list.clear();} }]), e;}(),Aa = function () {function e(t) {r(this, e), this.tim = t;}return i(e, [{ key: "setMessageRead", value: function value(e) {var n = e.conversationID,r = e.messageID,o = this.tim.conversationController.getLocalConversation(n);if (J.log("ReadReportHandler.setMessageRead conversationID=".concat(n, " unreadCount=").concat(o ? o.unreadCount : 0)), !o || 0 === o.unreadCount) return Fr();var i = r ? this.tim.messageController.getLocalMessage(n, r) : null;switch (o.type) {case t.CONV_C2C:return this._setC2CMessageRead({ conversationID: n, lastMessageTime: i ? i.time : o.lastMessage.lastTime });case t.CONV_GROUP:return this._setGroupMessageRead({ conversationID: n, lastMessageSeq: i ? i.sequence : o.lastMessage.lastSequence });case t.CONV_SYSTEM:return o.unreadCount = 0, Fr();default:return Fr();}} }, { key: "_setC2CMessageRead", value: function value(e) {var t = this,n = e.conversationID,r = e.lastMessageTime;J.log("ReadReportHandler._setC2CMessageRead conversationID=".concat(n, " lastMessageTime=").concat(r)), Z(r) || J.warn("ReadReportHandler._setC2CMessageRead 请勿修改 Conversation.lastMessage.lastTime，否则可能会导致已读上报结果不准确");var o = new Br();return o.setMethod(ro).setText("".concat(n, "-").concat(r)).setStart(), this.tim.messageController.request({ name: "conversation", action: "setC2CMessageRead", param: { C2CMsgReaded: { cookie: "", C2CMsgReadedItem: [{ toAccount: n.replace("C2C", ""), lastMessageTime: r, receipt: 1 }] } } }).then(function () {return o.setCode(0).setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(), J.log("ReadReportHandler._setC2CMessageRead ok."), t._updateIsReadAfterReadReport({ conversationID: n, lastMessageTime: r }), t._updateUnreadCount(n), new Ur();}).catch(function (e) {return t.tim.netMonitor.probe().then(function (t) {var n = y(t, 2),r = n[0],i = n[1];o.setError(e, r, i).setEnd();}), J.log("ReadReportHandler._setC2CMessageRead failed. ".concat(de(e))), Vr(e);});} }, { key: "_setGroupMessageRead", value: function value(e) {var t = this,n = e.conversationID,r = e.lastMessageSeq;J.log("ReadReportHandler._setGroupMessageRead conversationID=".concat(n, " lastMessageSeq=").concat(r)), Z(r) || J.warn("ReadReportHandler._setGroupMessageRead 请勿修改 Conversation.lastMessage.lastSequence，否则可能会导致已读上报结果不准确");var o = new Br();return o.setMethod(oo).setText("".concat(n, "-").concat(r)).setStart(), this.tim.messageController.request({ name: "conversation", action: "setGroupMessageRead", param: { groupID: n.replace("GROUP", ""), messageReadSeq: r } }).then(function () {return o.setCode(0).setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(), J.log("ReadReportHandler._setGroupMessageRead ok."), t._updateIsReadAfterReadReport({ conversationID: n, lastMessageSeq: r }), t._updateUnreadCount(n), new Ur();}).catch(function (e) {return t.tim.netMonitor.probe().then(function (t) {var n = y(t, 2),r = n[0],i = n[1];o.setError(e, r, i).setEnd();}), J.log("ReadReportHandler._setGroupMessageRead failed. ".concat(de(e))), Vr(e);});} }, { key: "_updateUnreadCount", value: function value(e) {var t = this.tim,n = t.conversationController,r = t.messageController,o = n.getLocalConversation(e),i = r.getLocalMessageList(e);o && (o.unreadCount = i.filter(function (e) {return !e.isRead;}).length, J.log("ReadReportHandler._updateUnreadCount conversationID=".concat(o.conversationID, " unreadCount=").concat(o.unreadCount)));} }, { key: "_updateIsReadAfterReadReport", value: function value(e) {var t = e.conversationID,n = e.lastMessageSeq,r = e.lastMessageTime,o = this.tim.messageController.getLocalMessageList(t);if (0 !== o.length) for (var i, s = o.length - 1; s >= 0; s--) {if (i = o[s], !(r && i.time > r || n && i.sequence > n)) {if ("in" === i.flow && i.isRead) break;i.setIsRead(!0);}}} }, { key: "updateIsRead", value: function value(e) {var n = this.tim,r = n.conversationController,o = n.messageController,i = r.getLocalConversation(e),s = o.getLocalMessageList(e);if (i && 0 !== s.length && !Ae(i.type)) {for (var a = [], u = 0; u < s.length; u++) {"in" !== s[u].flow ? "out" !== s[u].flow || s[u].isRead || s[u].setIsRead(!0) : a.push(s[u]);}var c = 0;if (i.type === t.CONV_C2C) {var l = a.slice(-i.unreadCount).filter(function (e) {return e.isRevoked;}).length;c = a.length - i.unreadCount - l;} else c = a.length - i.unreadCount;for (var p = 0; p < c && !a[p].isRead; p++) {a[p].setIsRead(!0);}}} }]), e;}(),ka = function () {function e(t) {var n = t.tim,o = t.messageController;r(this, e), this.tim = n, this.messageController = o, this.completedMap = new Map(), this._initListener();}return i(e, [{ key: "getMessageList", value: function value(e) {var t = this,n = e.conversationID,r = e.nextReqMessageID,o = e.count;if (this.tim.groupController.checkJoinedAVChatRoomByID(n.replace("GROUP", ""))) return J.log("GetMessageHandler.getMessageList not available in avchatroom. conversationID=".concat(n)), Fr({ messageList: [], nextReqMessageID: "", isCompleted: !0 });(oe(o) || o > 15) && (o = 15);var i = this._computeLeftCount({ conversationID: n, nextReqMessageID: r });return J.log("GetMessageHandler.getMessageList. conversationID=".concat(n, " leftCount=").concat(i, " count=").concat(o, " nextReqMessageID=").concat(r)), this._needGetHistory({ conversationID: n, leftCount: i, count: o }) ? this.messageController.getHistoryMessages({ conversationID: n, count: 20 }).then(function () {return i = t._computeLeftCount({ conversationID: n, nextReqMessageID: r }), new Ur(t._computeResult({ conversationID: n, nextReqMessageID: r, count: o, leftCount: i }));}) : (J.log("GetMessageHandler.getMessageList. get messagelist from memory"), Fr(this._computeResult({ conversationID: n, nextReqMessageID: r, count: o, leftCount: i })));} }, { key: "setCompleted", value: function value(e) {J.log("GetMessageHandler.setCompleted. conversationID=".concat(e)), this.completedMap.set(e, !0);} }, { key: "deleteCompletedItem", value: function value(e) {J.log("GetMessageHandler.deleteCompletedItem. conversationID=".concat(e)), this.completedMap.delete(e);} }, { key: "_initListener", value: function value() {var e = this;this.tim.innerEmitter.on(Ar, function () {e.setCompleted(t.CONV_SYSTEM);}), this.tim.innerEmitter.on(Tr, function (n) {var r = n.data;e.setCompleted("".concat(t.CONV_GROUP).concat(r));});} }, { key: "_getMessageListSize", value: function value(e) {return this.messageController.getLocalMessageList(e).length;} }, { key: "_needGetHistory", value: function value(e) {var n = e.conversationID,r = e.leftCount,o = e.count,i = this.tim.conversationController.getLocalConversation(n),s = !!i && i.type === t.CONV_SYSTEM,a = !!i && i.subType === t.GRP_AVCHATROOM;return !s && !a && r < o && !this.completedMap.has(n);} }, { key: "_computeResult", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,r = e.count,o = e.leftCount,i = this._computeMessageList({ conversationID: t, nextReqMessageID: n, count: r }),s = this._computeIsCompleted({ conversationID: t, leftCount: o, count: r }),a = this._computeNextReqMessageID({ messageList: i, isCompleted: s, conversationID: t });return J.log("GetMessageHandler._computeResult. conversationID=".concat(t, " leftCount=").concat(o, " count=").concat(r, " nextReqMessageID=").concat(a, " nums=").concat(i.length, " isCompleted=").concat(s)), { messageList: i, nextReqMessageID: a, isCompleted: s };} }, { key: "_computeNextReqMessageID", value: function value(e) {var t = e.messageList,n = e.isCompleted,r = e.conversationID;if (!n) return 0 === t.length ? "" : t[0].ID;var o = this.messageController.getLocalMessageList(r);return 0 === o.length ? "" : o[0].ID;} }, { key: "_computeMessageList", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,r = e.count,o = this.messageController.getLocalMessageList(t),i = this._computeIndexEnd({ nextReqMessageID: n, messageList: o }),s = this._computeIndexStart({ indexEnd: i, count: r });return o.slice(s, i);} }, { key: "_computeIndexEnd", value: function value(e) {var t = e.messageList,n = void 0 === t ? [] : t,r = e.nextReqMessageID;return r ? n.findIndex(function (e) {return e.ID === r;}) : n.length;} }, { key: "_computeIndexStart", value: function value(e) {var t = e.indexEnd,n = e.count;return t > n ? t - n : 0;} }, { key: "_computeLeftCount", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;return n ? this.messageController.getLocalMessageList(t).findIndex(function (e) {return e.ID === n;}) : this._getMessageListSize(t);} }, { key: "_computeIsCompleted", value: function value(e) {var t = e.conversationID;return !!(e.leftCount <= e.count && this.completedMap.has(t));} }, { key: "reset", value: function value() {J.log("GetMessageHandler.reset"), this.completedMap.clear();} }]), e;}(),Ra = function e(t) {r(this, e), this.value = t, this.next = null;},Oa = function () {function e(t) {r(this, e), this.MAX_LENGTH = t, this.pTail = null, this.pNodeToDel = null, this.map = new Map(), J.log("SinglyLinkedList init MAX_LENGTH=".concat(this.MAX_LENGTH));}return i(e, [{ key: "pushIn", value: function value(e) {var t = new Ra(e);if (this.map.size < this.MAX_LENGTH) null === this.pTail ? (this.pTail = t, this.pNodeToDel = t) : (this.pTail.next = t, this.pTail = t), this.map.set(e, 1);else {var n = this.pNodeToDel;this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n.value), n.next = null, n = null, this.pTail.next = t, this.pTail = t, this.map.set(e, 1);}} }, { key: "has", value: function value(e) {return this.map.has(e);} }, { key: "tail", value: function value() {return this.pTail;} }, { key: "size", value: function value() {return this.map.size;} }, { key: "data", value: function value() {return Array.from(this.map.keys());} }, { key: "reset", value: function value() {for (var e; null !== this.pNodeToDel;) {e = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e.next = null, e = null;}this.pTail = null, this.map.clear();} }]), e;}(),Na = function () {function e(t) {r(this, e), this.tim = t;}return i(e, [{ key: "upload", value: function value(e) {switch (e.type) {case t.MSG_IMAGE:return this._uploadImage(e);case t.MSG_FILE:return this._uploadFile(e);case t.MSG_AUDIO:return this._uploadAudio(e);case t.MSG_VIDEO:return this._uploadVideo(e);default:return Promise.resolve();}} }, { key: "_uploadImage", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadImage({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Vr(new ht({ code: dt.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: "".concat(Dt) }));}} }).then(function (e) {var t,n = e.location,r = e.fileType,i = e.fileSize,s = Ce(n);return o.updateImageFormat(r), o.updateImageInfoArray({ size: i, url: s }), t = o._imageMemoryURL, N ? new Promise(function (e, n) {wx.getImageInfo({ src: t, success: function success(t) {e({ width: t.width, height: t.height });}, fail: function fail() {e({ width: 0, height: 0 });} });}) : x && 9 === F ? Promise.resolve({ width: 0, height: 0 }) : new Promise(function (e, n) {var r = new Image();r.onload = function () {e({ width: this.width, height: this.height }), r = null;}, r.onerror = function () {e({ width: 0, height: 0 }), r = null;}, r.src = t;});}).then(function (t) {var n = t.width,r = t.height;return o.updateImageInfoArray({ width: n, height: r }), e;});} }, { key: "_uploadFile", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadFile({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Vr(new ht({ code: dt.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: "".concat(Dt) }));}} }).then(function (t) {var n = t.location,r = Ce(n);return o.updateFileUrl(r), e;});} }, { key: "_uploadAudio", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadAudio({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Vr(new ht({ code: dt.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: "".concat(Dt) }));}} }).then(function (t) {var n = t.location,r = Ce(n);return o.updateAudioUrl(r), e;});} }, { key: "_uploadVideo", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadVideo({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Vr(new ht({ code: dt.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: "".concat(Dt) }));}} }).then(function (t) {var n = Ce(t.location);return o.updateVideoUrl(n), e;});} }]), e;}(),La = function (n) {c(s, n);var o = _(s);function s(e) {var t;return r(this, s), (t = o.call(this, e))._initializeMembers(), t._initializeListener(), t._initialzeHandlers(), t.messageOptionMap = new Map(), t;}return i(s, [{ key: "_initializeMembers", value: function value() {this.messagesList = new Da({ tim: this.tim }), this.currentMessageKey = {}, this.singlyLinkedList = new Oa(100), this._peerReadTimeMap = new Map();} }, { key: "_initialzeHandlers", value: function value() {this.readReportHandler = new Aa(this.tim, this), this.getMessageHandler = new ka({ messageController: this, tim: this.tim }), this.uploadFileHandler = new Na(this.tim);} }, { key: "reset", value: function value() {this.messagesList.reset(), this.currentMessageKey = {}, this.getMessageHandler.reset(), this.singlyLinkedList.reset(), this._peerReadTimeMap.clear(), this.messageOptionMap.clear();} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(rr, this._onReceiveC2CMessage, this), e.on(Vn, this._onSyncMessagesProcessing, this), e.on(Kn, this._onSyncMessagesFinished, this), e.on(or, this._onReceiveGroupMessage, this), e.on(ir, this._onReceiveGroupTips, this), e.on(sr, this._onReceiveSystemNotice, this), e.on(lr, this._onReceiveGroupMessageRevokedNotice, this), e.on(pr, this._onReceiveC2CMessageRevokedNotice, this), e.on(hr, this._onC2CMessageReadReceipt, this), e.on(Er, this._clearConversationMessages, this);} }, { key: "sendMessageInstance", value: function value(e, n) {var r,o = this,i = null;switch (e.conversationType) {case t.CONV_C2C:i = this._handleOnSendC2CMessageSuccess.bind(this);break;case t.CONV_GROUP:i = this._handleOnSendGroupMessageSuccess.bind(this);break;default:return Vr(new ht({ code: dt.MESSAGE_SEND_INVALID_CONVERSATION_TYPE, message: St }));}return this.singlyLinkedList.pushIn(e.random), this.uploadFileHandler.upload(e).then(function () {var i = null;return e.isSendable() ? e.conversationType !== t.CONV_GROUP || o.tim.groupController.hasLocalGroup(e.to) ? (o._addSendMessageTotalCount(e), r = Date.now(), e.conversationType === t.CONV_C2C ? i = o._createC2CMessagePack(e, n) : e.conversationType === t.CONV_GROUP && (i = o._createGroupMessagePack(e, n)), o.request(i)) : (J.warn("MessageController.sendMessageInstance failed. userId=".concat(e.from, " 未加入群 groupID=").concat(e.to, "。发消息前先使用 joinGroup 接口申请加群，详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#joinGroup")), Vr(new ht({ code: dt.MESSAGE_SEND_FAIL, message: Mt }))) : Vr({ code: dt.MESSAGE_FILE_URL_IS_EMPTY, message: xt });}).then(function (n) {return o._addSendMessageSuccessCount(e, r), e.conversationType === t.CONV_GROUP && (e.sequence = n.data.sequence, e.time = n.data.time, e.generateMessageID(o.tim.context.identifier)), o.messagesList.pushIn(e), i(e, n.data), o.messageOptionMap.delete(e.messageID), o.emitInnerEvent(Bn, { eventDataList: [{ conversationID: e.conversationID, unreadCount: 0, type: e.conversationType, subType: e.conversationSubType, lastMessage: e }] }), new Ur({ message: e });}).catch(function (t) {e.status = be.FAIL;var n = new Br();return n.setMethod(Zr).setMessageType(e.type).setText("".concat(o._generateTjgID(e), "-").concat(e.type, "-").concat(e.from, "-").concat(e.to)).setStart(), o.probeNetwork().then(function (e) {var r = y(e, 2),o = r[0],i = r[1];n.setError(t, o, i).setEnd();}), J.error("MessageController.sendMessageInstance error:", t), Vr(new ht({ code: t && t.code ? t.code : dt.MESSAGE_SEND_FAIL, message: t && t.message ? t.message : Mt, data: { message: e } }));});} }, { key: "_getSendMessageSpecifiedKey", value: function value(e) {if (e.conversationType === t.CONV_C2C) return Kr.SEND_MESSAGE_C2C;if (e.conversationType === t.CONV_GROUP) {var n = this.tim.groupController.getLocalGroupProfile(e.to).type;if (function (e) {return e === t.GRP_WORK;}(n)) return Kr.SEND_MESSAGE_GROUP_WORK;if (Se(n)) return Kr.SEND_MESSAGE_GROUP_PUBLIC;if (Te(n)) return Kr.SEND_MESSAGE_GROUP_MEETING;if (De(n)) return Kr.SEND_MESSAGE_GROUP_AV;}} }, { key: "_addSendMessageTotalCount", value: function value(e) {var t = this.tim.sumStatController;t.addTotalCount(Kr.SEND_MESSAGE);var n = this._getSendMessageSpecifiedKey(e);t.addTotalCount(n);} }, { key: "_addSendMessageSuccessCount", value: function value(e, t) {var n = this.tim.sumStatController,r = Math.abs(Date.now() - t);n.addSuccessCount(Kr.SEND_MESSAGE), n.addCost(Kr.SEND_MESSAGE, r);var o = this._getSendMessageSpecifiedKey(e);n.addSuccessCount(o), n.addCost(o, r);} }, { key: "resendMessage", value: function value(e) {return e.isResend = !0, e.status = be.UNSEND, this.sendMessageInstance(e);} }, { key: "_isFileLikeMessage", value: function value(e) {return [t.MSG_IMAGE, t.MSG_FILE, t.MSG_AUDIO, t.MSG_VIDEO].indexOf(e.type) >= 0;} }, { key: "_resendBinaryTypeMessage", value: function value() {} }, { key: "_canIUseOnlineOnlyFlag", value: function value(e) {var n = this.tim.groupController.getJoinedAVChatRoom();return !n || !n.includes(e.to) || e.conversationType !== t.CONV_GROUP;} }, { key: "_createC2CMessagePack", value: function value(e, t) {var n = 0,r = null;return t && (t.offlinePushInfo && (r = t.offlinePushInfo), !0 === t.onlineUserOnly && (n = 1, r ? r.disablePush = !0 : r = { disablePush: !0 })), { name: "c2cMessage", action: "create", tjgID: this._generateTjgID(e), param: { toAccount: e.to, msgBody: e.getElements(), msgSeq: e.sequence, msgRandom: e.random, msgLifeTime: this._canIUseOnlineOnlyFlag(e) && n ? 0 : void 0, offlinePushInfo: r ? { pushFlag: !0 === r.disablePush ? 1 : 0, title: r.title || "", desc: r.description || "", ext: r.extension || "", apnsInfo: { badgeMode: !0 === r.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: r.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "_handleOnSendC2CMessageSuccess", value: function value(e, t) {e.status = be.SUCCESS, e.time = t.time;} }, { key: "_createGroupMessagePack", value: function value(e, t) {var n = 0,r = null;return t && (!0 === t.onlineUserOnly && (n = 1), t.offlinePushInfo && (r = t.offlinePushInfo)), { name: "groupMessage", action: "create", tjgID: this._generateTjgID(e), param: { groupID: e.to, msgBody: e.getElements(), random: e.random, priority: e.priority, clientSequence: e.clientSequence, onlineOnlyFlag: this._canIUseOnlineOnlyFlag(e) ? n : 0, offlinePushInfo: r ? { pushFlag: !0 === r.disablePush ? 1 : 0, title: r.title || "", desc: r.description || "", ext: r.extension || "", apnsInfo: { badgeMode: !0 === r.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: r.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "_handleOnSendGroupMessageSuccess", value: function value(e, t) {e.sequence = t.sequence, e.time = t.time, e.status = be.SUCCESS;} }, { key: "_onReceiveC2CMessage", value: function value(n) {J.debug("MessageController._onReceiveC2CMessage nums=".concat(n.data.length));var r = Date.now(),o = this._newC2CMessageStoredAndSummary({ notifiesList: n.data, type: t.CONV_C2C, C2CRemainingUnreadList: n.C2CRemainingUnreadList }),i = o.eventDataList,s = o.result;if (i.length > 0 && this.emitInnerEvent(Yn, { eventDataList: i, result: s }), s.length > 0) {var a = this.tim.sumStatController;a.addTotalCount(Kr.MESSAGE_RECEIVED), a.addSuccessCount(Kr.MESSAGE_RECEIVED), a.addCost(Kr.MESSAGE_RECEIVED, Date.now() - r), this.emitOuterEvent(e.MESSAGE_RECEIVED, s);}} }, { key: "_onReceiveGroupMessage", value: function value(t) {J.debug("MessageController._onReceiveGroupMessage nums=".concat(t.data.length));var n = Date.now(),r = this.newGroupMessageStoredAndSummary(t.data),o = r.eventDataList,i = r.result;if (o.length > 0 && this.emitInnerEvent($n, { eventDataList: o, result: i, isGroupTip: !1 }), i.length > 0) {var s = this.tim.sumStatController;s.addTotalCount(Kr.MESSAGE_RECEIVED), s.addSuccessCount(Kr.MESSAGE_RECEIVED), s.addCost(Kr.MESSAGE_RECEIVED, Date.now() - n), this.emitOuterEvent(e.MESSAGE_RECEIVED, i);}} }, { key: "_onReceiveGroupTips", value: function value(t) {var n = Date.now(),r = t.data;J.debug("MessageController._onReceiveGroupTips nums=".concat(r.length));var o = this.newGroupTipsStoredAndSummary(r),i = o.eventDataList,s = o.result;if (i.length > 0 && this.emitInnerEvent($n, { eventDataList: i, result: s, isGroupTip: !0 }), s.length > 0) {var a = this.tim.sumStatController;a.addTotalCount(Kr.MESSAGE_RECEIVED), a.addSuccessCount(Kr.MESSAGE_RECEIVED), a.addCost(Kr.MESSAGE_RECEIVED, Date.now() - n), this.emitOuterEvent(e.MESSAGE_RECEIVED, s);}} }, { key: "_onReceiveSystemNotice", value: function value(t) {var n = Date.now(),r = t.data,o = r.groupSystemNotices,i = r.type;J.debug("MessageController._onReceiveSystemNotice nums=".concat(o.length));var s = this.newSystemNoticeStoredAndSummary({ notifiesList: o, type: i }),a = s.eventDataList,u = s.result;if (a.length > 0 && this.emitInnerEvent(Wn, { eventDataList: a, result: u, type: i }), u.length > 0 && "poll" === i) {var c = this.tim.sumStatController;c.addTotalCount(Kr.MESSAGE_RECEIVED), c.addSuccessCount(Kr.MESSAGE_RECEIVED), c.addCost(Kr.MESSAGE_RECEIVED, Date.now() - n), this.emitOuterEvent(e.MESSAGE_RECEIVED, u);}} }, { key: "_onReceiveGroupMessageRevokedNotice", value: function value(t) {var n = this;J.debug("MessageController._onReceiveGroupMessageRevokedNotice nums=".concat(t.data.length));var r = [],o = null;t.data.forEach(function (e) {e.elements.revokedInfos.forEach(function (e) {(o = n.messagesList.revoke("GROUP".concat(e.groupID), e.sequence)) && r.push(o);});}), 0 !== r.length && (this.emitInnerEvent(zn, r), this.emitOuterEvent(e.MESSAGE_REVOKED, r));} }, { key: "_onReceiveC2CMessageRevokedNotice", value: function value(t) {var n = this;J.debug("MessageController._onReceiveC2CMessageRevokedNotice nums=".concat(t.data.length));var r = [],o = null;t.data.forEach(function (e) {e.c2cMessageRevokedNotify.revokedInfos.forEach(function (e) {var t = n.tim.context.identifier === e.from ? "C2C".concat(e.to) : "C2C".concat(e.from);(o = n.messagesList.revoke(t, e.sequence, e.random)) && r.push(o);});}), 0 !== r.length && (this.emitInnerEvent(zn, r), this.emitOuterEvent(e.MESSAGE_REVOKED, r));} }, { key: "_onC2CMessageReadReceipt", value: function value(e) {var t = this;e.data.forEach(function (e) {var n = e.c2cMessageReadReceipt.to;e.c2cMessageReadReceipt.uinPairReadArray.forEach(function (e) {var r = e.peerReadTime;J.debug("MessageController._onC2CMessageReadReceipt to=".concat(n, " peerReadTime=").concat(r));var o = "C2C".concat(n);t.recordPeerReadTime(o, r), t._updateMessageIsPeerReadProperty(o, r);});});} }, { key: "_updateMessageIsPeerReadProperty", value: function value(n, r) {if (n.startsWith(t.CONV_C2C) && r > 0) {var o = this.messagesList.updateMessageIsPeerReadProperty(n, r);o.length > 0 && this.emitOuterEvent(e.MESSAGE_READ_BY_PEER, o);}} }, { key: "getPeerReadTime", value: function value(e) {var t = this;if (!Oe(e)) {var n = new Br();return n.setMethod(so).setStart(), J.log("MessageController.getPeerReadTime userIDList:".concat(e)), this.request({ name: "c2cPeerReadTime", action: "get", param: { userIDList: e } }).then(function (r) {var o = r.data.peerReadTimeList;J.log("MessageController.getPeerReadTime ok. peerReadTimeList:".concat(o));for (var i = "", s = 0; s < e.length; s++) {i += "".concat(e[s], "-").concat(o[s], " "), o[s] > 0 && t.recordPeerReadTime("C2C".concat(e[s]), o[s]);}n.setCode(0).setNetworkType(t.getNetworkType()).setText(i).setEnd();}).catch(function (e) {t.probeNetwork().then(function (t) {var r = y(t, 2),o = r[0],i = r[1];n.setError(e, o, i).setEnd();}), J.warn("MessageController.getPeerReadTime failed. error:", e);});}} }, { key: "recordPeerReadTime", value: function value(e, t) {this._peerReadTimeMap.has(e) ? this._peerReadTimeMap.get(e) < t && this._peerReadTimeMap.set(e, t) : this._peerReadTimeMap.set(e, t);} }, { key: "_clearConversationMessages", value: function value(e) {var t = e.data;this.messagesList.removeByConversationID(t), this.getMessageHandler.deleteCompletedItem(t);} }, { key: "_pushIntoNoticeResult", value: function value(e, t) {return !(!this.messagesList.pushIn(t) || this.singlyLinkedList.has(t.random)) && (e.push(t), !0);} }, { key: "_newC2CMessageStoredAndSummary", value: function value(e) {for (var n = e.notifiesList, r = e.type, o = e.C2CRemainingUnreadList, i = e.isFromSync, s = null, a = [], u = [], c = {}, l = this.tim.bigDataHallwayController, p = 0, h = n.length; p < h; p++) {var d = n[p];if (d.currentUser = this.tim.context.identifier, d.conversationType = r, d.isSystemMessage = !!d.isSystemMessage, s = new Dn(d), d.elements = l.parseElements(d.elements, d.from), s.setElement(d.elements), !i) if (!this._pushIntoNoticeResult(u, s)) continue;void 0 === c[s.conversationID] ? c[s.conversationID] = a.push({ conversationID: s.conversationID, unreadCount: "out" === s.flow ? 0 : 1, type: s.conversationType, subType: s.conversationSubType, lastMessage: s }) - 1 : (a[c[s.conversationID]].type = s.conversationType, a[c[s.conversationID]].subType = s.conversationSubType, a[c[s.conversationID]].lastMessage = s, "in" === s.flow && a[c[s.conversationID]].unreadCount++);}if (re(o)) for (var f = function f(e, n) {var r = a.find(function (t) {return t.conversationID === "C2C".concat(o[e].from);});r ? r.unreadCount += o[e].count : a.push({ conversationID: "C2C".concat(o[e].from), unreadCount: o[e].count, type: t.CONV_C2C, lastMsgTime: o[e].lastMsgTime });}, g = 0, m = o.length; g < m; g++) {f(g);}return { eventDataList: a, result: u };} }, { key: "newGroupMessageStoredAndSummary", value: function value(e) {var n = null,r = [],o = {},i = [],s = t.CONV_GROUP,a = this.tim.bigDataHallwayController,u = e.length;u > 1 && e.sort(function (e, t) {return e.sequence - t.sequence;});for (var c = 0; c < u; c++) {var l = e[c];if (l.currentUser = this.tim.context.identifier, l.conversationType = s, l.isSystemMessage = !!l.isSystemMessage, n = new Dn(l), l.elements = a.parseElements(l.elements, l.from), n.setElement(l.elements), !this._isMessageFromAVChatroom(n)) this._pushIntoNoticeResult(i, n) && (void 0 === o[n.conversationID] ? o[n.conversationID] = r.push({ conversationID: n.conversationID, unreadCount: "out" === n.flow ? 0 : 1, type: n.conversationType, subType: n.conversationSubType, lastMessage: n }) - 1 : (r[o[n.conversationID]].type = n.conversationType, r[o[n.conversationID]].subType = n.conversationSubType, r[o[n.conversationID]].lastMessage = n, "in" === n.flow && r[o[n.conversationID]].unreadCount++));}return { eventDataList: r, result: i };} }, { key: "_isMessageFromAVChatroom", value: function value(e) {var t = e.conversationID.slice(5);return this.tim.groupController.checkJoinedAVChatRoomByID(t);} }, { key: "newGroupTipsStoredAndSummary", value: function value(e) {for (var n = null, r = [], o = [], i = {}, s = 0, a = e.length; s < a; s++) {var c = e[s];if (c.currentUser = this.tim.context.identifier, c.conversationType = t.CONV_GROUP, (n = new Dn(c)).setElement({ type: t.MSG_GRP_TIP, content: u({}, c.elements, { groupProfile: c.groupProfile }) }), n.isSystemMessage = !1, !this._isMessageFromAVChatroom(n)) this._pushIntoNoticeResult(o, n) && (void 0 === i[n.conversationID] ? i[n.conversationID] = r.push({ conversationID: n.conversationID, unreadCount: "out" === n.flow ? 0 : 1, type: n.conversationType, subType: n.conversationSubType, lastMessage: n }) - 1 : (r[i[n.conversationID]].type = n.conversationType, r[i[n.conversationID]].subType = n.conversationSubType, r[i[n.conversationID]].lastMessage = n, "in" === n.flow && r[i[n.conversationID]].unreadCount++));}return { eventDataList: r, result: o };} }, { key: "newSystemNoticeStoredAndSummary", value: function value(e) {var n = e.notifiesList,r = e.type,o = null,i = n.length,s = 0,a = [],c = { conversationID: t.CONV_SYSTEM, unreadCount: 0, type: t.CONV_SYSTEM, subType: null, lastMessage: null };for (s = 0; s < i; s++) {var l = n[s];if (l.elements.operationType !== ze) l.currentUser = this.tim.context.identifier, l.conversationType = t.CONV_SYSTEM, l.conversationID = t.CONV_SYSTEM, (o = new Dn(l)).setElement({ type: t.MSG_GRP_SYS_NOTICE, content: u({}, l.elements, { groupProfile: l.groupProfile }) }), o.isSystemMessage = !0, (1 === o.sequence && 1 === o.random || 2 === o.sequence && 2 === o.random) && (o.sequence = me(), o.random = me(), o.generateMessageID(l.currentUser), J.log("MessageController.newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID=".concat(o.ID))), this._pushIntoNoticeResult(a, o) && ("poll" === r ? c.unreadCount++ : "sync" === r && o.setIsRead(!0), c.subType = o.conversationSubType);}return c.lastMessage = a[a.length - 1], { eventDataList: a.length > 0 ? [c] : [], result: a };} }, { key: "_onSyncMessagesProcessing", value: function value(e) {var n = this._newC2CMessageStoredAndSummary({ notifiesList: e.data, type: t.CONV_C2C, isFromSync: !0, C2CRemainingUnreadList: e.C2CRemainingUnreadList }),r = n.eventDataList,o = n.result;this.emitInnerEvent(Hn, { eventDataList: r, result: o });} }, { key: "_onSyncMessagesFinished", value: function value(e) {this.triggerReady();var n = this._newC2CMessageStoredAndSummary({ notifiesList: e.data.messageList, type: t.CONV_C2C, isFromSync: !0, C2CRemainingUnreadList: e.data.C2CRemainingUnreadList }),r = n.eventDataList,o = n.result;this.emitInnerEvent(jn, { eventDataList: r, result: o });} }, { key: "getHistoryMessages", value: function value(e) {if (e.conversationID === t.CONV_SYSTEM) return Fr();!e.count && (e.count = 15), e.count > 20 && (e.count = 20);var n = this.messagesList.getLocalOldestMessageByConversationID(e.conversationID);n || ((n = {}).time = 0, n.sequence = 0, 0 === e.conversationID.indexOf(t.CONV_C2C) ? (n.to = e.conversationID.replace(t.CONV_C2C, ""), n.conversationType = t.CONV_C2C) : 0 === e.conversationID.indexOf(t.CONV_GROUP) && (n.to = e.conversationID.replace(t.CONV_GROUP, ""), n.conversationType = t.CONV_GROUP));var r = "";switch (n.conversationType) {case t.CONV_C2C:return r = e.conversationID.replace(t.CONV_C2C, ""), this.getC2CRoamMessages({ conversationID: e.conversationID, peerAccount: r, count: e.count, lastMessageTime: void 0 === this.currentMessageKey[e.conversationID] ? 0 : n.time });case t.CONV_GROUP:return this.getGroupRoamMessages({ conversationID: e.conversationID, groupID: n.to, count: e.count, sequence: n.sequence - 1 });default:return Fr();}} }, { key: "getC2CRoamMessages", value: function value(e) {var n = this,r = e.conversationID,o = void 0 !== this.currentMessageKey[r] ? this.currentMessageKey[r] : "";J.log("MessageController.getC2CRoamMessages toAccount=".concat(e.peerAccount, " count=").concat(e.count || 15, " lastMessageTime=").concat(e.lastMessageTime || 0, " messageKey=").concat(o));var i = new Br();return i.setMethod(eo).setStart(), this.request({ name: "c2cMessage", action: "query", param: { peerAccount: e.peerAccount, count: e.count || 15, lastMessageTime: e.lastMessageTime || 0, messageKey: o } }).then(function (s) {var a = s.data,u = a.complete,c = a.messageList;oe(c) ? J.log("MessageController.getC2CRoamMessages ok. complete=".concat(u, " but messageList is undefined!")) : J.log("MessageController.getC2CRoamMessages ok. complete=".concat(u, " nums=").concat(c.length)), i.setCode(0).setNetworkType(n.getNetworkType()).setText("".concat(e.peerAccount, "-").concat(e.count || 15, "-").concat(e.lastMessageTime || 0, "-").concat(o, "-").concat(u, "-").concat(c ? c.length : "undefined")).setEnd(), 1 === u && n.getMessageHandler.setCompleted(r);var l = n._roamMessageStore(c, t.CONV_C2C, r);n.readReportHandler.updateIsRead(r), n.currentMessageKey[r] = s.data.messageKey;var p = n._peerReadTimeMap.get(r);if (J.log("MessageController.getC2CRoamMessages update isPeerRead property. conversationID=".concat(r, " peerReadTime=").concat(p)), p) n._updateMessageIsPeerReadProperty(r, p);else {var h = r.replace(t.CONV_C2C, "");n.getPeerReadTime([h]).then(function () {n._updateMessageIsPeerReadProperty(r, n._peerReadTimeMap.get(r));});}return l;}).catch(function (t) {return n.probeNetwork().then(function (n) {var r = y(n, 2),s = r[0],a = r[1];i.setError(t, s, a).setText("".concat(e.peerAccount, "-").concat(e.count || 15, "-").concat(e.lastMessageTime || 0, "-").concat(o)).setEnd();}), J.warn("MessageController.getC2CRoamMessages failed. ".concat(t)), Vr(t);});} }, { key: "_computeLastSequence", value: function value(e) {return e.sequence >= 0 ? Promise.resolve(e.sequence) : this.tim.groupController.getGroupLastSequence(e.groupID);} }, { key: "getGroupRoamMessages", value: function value(e) {var n = this,r = new Br(),o = 0;return this._computeLastSequence(e).then(function (t) {return o = t, J.log("MessageController.getGroupRoamMessages groupID=".concat(e.groupID, " lastSequence=").concat(o)), r.setMethod(to).setStart(), n.request({ name: "groupMessage", action: "query", param: { groupID: e.groupID, count: 21, sequence: o } });}).then(function (i) {var s = i.data,a = s.messageList,u = s.complete;oe(a) ? J.log("MessageController.getGroupRoamMessages ok. complete=".concat(u, " but messageList is undefined!")) : J.log("MessageController.getGroupRoamMessages ok. complete=".concat(u, " nums=").concat(a.length)), r.setCode(0).setNetworkType(n.getNetworkType()).setText("".concat(e.groupID, "-").concat(o, "-").concat(u, "-").concat(a ? a.length : "undefined")).setEnd();var c = "GROUP".concat(e.groupID);if (2 === u || Oe(a)) return n.getMessageHandler.setCompleted(c), [];var l = n._roamMessageStore(a, t.CONV_GROUP, c);return n.readReportHandler.updateIsRead(c), n._patchConversationLastMessage(c), l;}).catch(function (t) {return n.probeNetwork().then(function (n) {var i = y(n, 2),s = i[0],a = i[1];r.setError(t, s, a).setText("".concat(e.groupID, "-").concat(o)).setEnd();}), J.warn("MessageController.getGroupRoamMessages failed. ".concat(t)), Vr(t);});} }, { key: "_patchConversationLastMessage", value: function value(e) {var t = this.tim.conversationController.getLocalConversation(e);if (t) {var n = t.lastMessage,r = n.messageForShow,o = n.payload;if (Oe(r) || Oe(o)) {var i = this.messagesList.getLocalMessageList(e);if (0 === i.length) return;var s = i[i.length - 1];J.log("MessageController._patchConversationLastMessage conversationID:".concat(e, " payload:"), s.payload), t.updateLastMessage(s);}}} }, { key: "_roamMessageStore", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],n = arguments.length > 1 ? arguments[1] : void 0,r = arguments.length > 2 ? arguments[2] : void 0,o = null,i = [],s = 0,a = e.length,c = null,l = n === t.CONV_GROUP,p = this.tim.bigDataHallwayController,h = function h() {s = l ? e.length - 1 : 0, a = l ? 0 : e.length;},d = function d() {l ? --s : ++s;},f = function f() {return l ? s >= a : s < a;};for (h(); f(); d()) {if (l && 1 === e[s].sequence && this.getMessageHandler.setCompleted(r), 1 !== e[s].isPlaceMessage) if ((o = new Dn(e[s])).to = e[s].to, o.isSystemMessage = !!e[s].isSystemMessage, o.conversationType = n, e[s].event === xe.JSON.TYPE.GROUP.TIP ? c = { type: t.MSG_GRP_TIP, content: u({}, e[s].elements, { groupProfile: e[s].groupProfile }) } : (e[s].elements = p.parseElements(e[s].elements, e[s].from), c = e[s].elements), Oe(c)) {var g = new Br();g.setMethod(io).setText("from:".concat(o.from, " to:").concat(o.to, " sequence:").concat(o.sequence, " event:").concat(e[s].event)).setStart(), g.setCode(0).setNetworkType(this.getNetworkType()).setEnd();} else o.setElement(c), o.reInitialize(this.tim.context.identifier), i.push(o);}return this.messagesList.unshift(i), h = d = f = null, i;} }, { key: "getLocalMessageList", value: function value(e) {return this.messagesList.getLocalMessageList(e);} }, { key: "getLocalMessage", value: function value(e, t) {return this.messagesList.getLocalMessage(e, t);} }, { key: "hasLocalMessage", value: function value(e, t) {return this.messagesList.hasLocalMessage(e, t);} }, { key: "deleteLocalMessage", value: function value(e) {e instanceof Dn && this.messagesList.remove(e);} }, { key: "revokeMessage", value: function value(e) {var n,r = this;e.conversationType === t.CONV_C2C ? n = { name: "c2cMessageWillBeRevoked", action: "create", param: { msgInfo: { fromAccount: e.from, toAccount: e.to, msgSeq: e.sequence, msgRandom: e.random, msgTimeStamp: e.time } } } : e.conversationType === t.CONV_GROUP && (n = { name: "groupMessageWillBeRevoked", action: "create", param: { to: e.to, msgSeqList: [{ msgSeq: e.sequence }] } });var o = new Br();return o.setMethod(no).setMessageType(e.type).setText("".concat(this._generateTjgID(e), "-").concat(e.type, "-").concat(e.from, "-").concat(e.to)).setStart(), this.request(n).then(function (t) {var n = t.data.recallRetList;if (!Oe(n) && 0 !== n[0].retCode) {var i = new ht({ code: n[0].retCode, message: pt[n[0].retCode] || At, data: { message: e } });return o.setCode(i.code).setMessage(i.message).setEnd(), Vr(i);}return J.info("MessageController.revokeMessage ok. ID=".concat(e.ID)), e.isRevoked = !0, o.setCode(0).setEnd(), r.emitInnerEvent(zn, [e]), new Ur({ message: e });}).catch(function (t) {r.probeNetwork().then(function (e) {var n = y(e, 2),r = n[0],i = n[1];o.setError(t, r, i).setEnd();});var n = new ht({ code: t && t.code ? t.code : dt.MESSAGE_REVOKE_FAIL, message: t && t.message ? t.message : At, data: { message: e } });return J.warn("MessageController.revokeMessage failed. ID=".concat(e.ID, " code=").concat(n.code, " message=").concat(n.message)), Vr(n);});} }, { key: "setMessageRead", value: function value(e) {var t = this;return new Promise(function (n, r) {t.ready(function () {t.readReportHandler.setMessageRead(e).then(n).catch(r);});});} }, { key: "getMessageList", value: function value(e) {return this.getMessageHandler.getMessageList(e);} }, { key: "createTextMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Dn(e),n = "string" == typeof e.payload ? e.payload : e.payload.text,r = new qe({ text: n });return t.setElement(r), t;} }, { key: "createCustomMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Dn(e),n = new Cn({ data: e.payload.data, description: e.payload.description, extension: e.payload.extension });return t.setElement(n), t;} }, { key: "createImageMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Dn(e);if (N) {var n = e.payload.file;if (Q(n)) return void J.warn("微信小程序环境下调用 createImageMessage 接口时，payload.file 不支持传入 File 对象");var r = n.tempFilePaths[0],o = { url: r, name: r.slice(r.lastIndexOf("/") + 1), size: n.tempFiles[0].size, type: r.slice(r.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = o;} else if (O && Q(e.payload.file)) {var i = e.payload.file;e.payload.file = { files: [i] };}var s = new ot({ imageFormat: "UNKNOWN", uuid: this._generateUUID(), file: e.payload.file });return t.setElement(s), this.messageOptionMap.set(t.messageID, e), t;} }, { key: "createFileMessage", value: function value(e) {if (!N) {if (O && Q(e.payload.file)) {var t = e.payload.file;e.payload.file = { files: [t] };}e.currentUser = this.tim.context.identifier;var n = new Dn(e),r = new Mn({ uuid: this._generateUUID(), file: e.payload.file });return n.setElement(r), this.messageOptionMap.set(n.messageID, e), n;}J.warn("微信小程序目前不支持选择文件， createFileMessage 接口不可用！");} }, { key: "createAudioMessage", value: function value(e) {if (N) {var t = e.payload.file;if (N) {var n = { url: t.tempFilePath, name: t.tempFilePath.slice(t.tempFilePath.lastIndexOf("/") + 1), size: t.fileSize, second: parseInt(t.duration) / 1e3, type: t.tempFilePath.slice(t.tempFilePath.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = n;}e.currentUser = this.tim.context.identifier;var r = new Dn(e),o = new st({ second: Math.floor(t.duration / 1e3), size: t.fileSize, url: t.tempFilePath, uuid: this._generateUUID() });return r.setElement(o), this.messageOptionMap.set(r.messageID, e), r;}J.warn("createAudioMessage 目前只支持微信小程序发语音消息");} }, { key: "createVideoMessage", value: function value(e) {e.currentUser = this.tim.context.identifier, e.payload.file.thumbUrl = "https://webim-1252463788.cos.ap-shanghai.myqcloud.com/assets/images/transparent.png", e.payload.file.thumbSize = 1668;var t = {};if (N) {if (Q(e.payload.file)) return void J.warn("微信小程序环境下调用 createVideoMessage 接口时，payload.file 不支持传入 File 对象");var n = e.payload.file;t.url = n.tempFilePath, t.name = n.tempFilePath.slice(n.tempFilePath.lastIndexOf("/") + 1), t.size = n.size, t.second = n.duration, t.type = n.tempFilePath.slice(n.tempFilePath.lastIndexOf(".") + 1).toLowerCase();} else if (O) {if (Q(e.payload.file)) {var r = e.payload.file;e.payload.file.files = [r];}var o = e.payload.file;t.url = window.URL.createObjectURL(o.files[0]), t.name = o.files[0].name, t.size = o.files[0].size, t.second = o.files[0].duration || 0, t.type = o.files[0].type.split("/")[1];}e.payload.file.videoFile = t;var i = new Dn(e),s = new En({ videoFormat: t.type, videoSecond: Number(t.second.toFixed(0)), videoSize: t.size, remoteVideoUrl: "", videoUrl: t.url, videoUUID: this._generateUUID(), thumbUUID: this._generateUUID(), thumbWidth: e.payload.file.width || 200, thumbHeight: e.payload.file.height || 200, thumbUrl: e.payload.file.thumbUrl, thumbSize: e.payload.file.thumbSize, thumbFormat: e.payload.file.thumbUrl.slice(e.payload.file.thumbUrl.lastIndexOf(".") + 1).toLowerCase() });return i.setElement(s), this.messageOptionMap.set(i.messageID, e), i;} }, { key: "createFaceMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Dn(e),n = new it(e.payload);return t.setElement(n), t;} }, { key: "_generateUUID", value: function value() {var e = this.tim.context;return "".concat(e.SDKAppID, "-").concat(e.identifier, "-").concat(function () {for (var e = "", t = 32; t > 0; --t) {e += _e[Math.floor(Math.random() * ye)];}return e;}());} }, { key: "_generateTjgID", value: function value(e) {return this.tim.context.tinyID + "-" + e.random;} }, { key: "getMessageOptionByID", value: function value(e) {return this.messageOptionMap.get(e);} }, { key: "isMessageSentByCurrentInstance", value: function value(e) {return !(!this.messagesList.hasLocalMessage(e.conversationID, e.ID) && !this.singlyLinkedList.has(e.random));} }]), s;}(Pr),wa = function () {function e(t) {r(this, e), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this._initMember(t);}return i(e, [{ key: "_initMember", value: function value(e) {this.updateMember(e);} }, { key: "updateMember", value: function value(e) {var t = [null, void 0, "", 0, NaN];e.memberCustomField && Ee(this.memberCustomField, e.memberCustomField), he(this, e, ["memberCustomField"], t);} }, { key: "updateRole", value: function value(e) {["Owner", "Admin", "Member"].indexOf(e) < 0 || (this.role = e);} }, { key: "updateMuteUntil", value: function value(e) {oe(e) || (this.muteUntil = Math.floor((Date.now() + 1e3 * e) / 1e3));} }, { key: "updateNameCard", value: function value(e) {oe(e) || (this.nameCard = e);} }, { key: "updateMemberCustomField", value: function value(e) {e && Ee(this.memberCustomField, e);} }]), e;}(),Pa = function () {function e(t) {r(this, e), this.tim = t.tim, this.groupController = t.groupController, this._initListeners();}return i(e, [{ key: "_initListeners", value: function value() {this.tim.innerEmitter.on($n, this._onReceivedGroupTips, this);} }, { key: "_onReceivedGroupTips", value: function value(e) {var t = this,n = e.data,r = n.result;n.isGroupTip && r.forEach(function (e) {switch (e.payload.operationType) {case 1:t._onNewMemberComeIn(e);break;case 2:t._onMemberQuit(e);break;case 3:t._onMemberKickedOut(e);break;case 4:t._onMemberSetAdmin(e);break;case 5:t._onMemberCancelledAdmin(e);break;case 6:t._onGroupProfileModified(e);break;case 7:t._onMemberInfoModified(e);break;default:J.warn("GroupTipsHandler._onReceivedGroupTips Unhandled groupTips. operationType=", e.payload.operationType);}});} }, { key: "_onNewMemberComeIn", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && Z(n) && (o.memberNum = n);} }, { key: "_onMemberQuit", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && Z(n) && (o.memberNum = n), this.groupController.deleteLocalGroupMembers(r, e.payload.userIDList);} }, { key: "_onMemberKickedOut", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && Z(n) && (o.memberNum = n), this.groupController.deleteLocalGroupMembers(r, e.payload.userIDList);} }, { key: "_onMemberSetAdmin", value: function value(e) {var n = this,r = e.payload.groupProfile.groupID;e.payload.userIDList.forEach(function (e) {var o = n.groupController.getLocalGroupMemberInfo(r, e);o && o.updateRole(t.GRP_MBR_ROLE_ADMIN);});} }, { key: "_onMemberCancelledAdmin", value: function value(e) {var n = this,r = e.payload.groupProfile.groupID;e.payload.userIDList.forEach(function (e) {var o = n.groupController.getLocalGroupMemberInfo(r, e);o && o.updateRole(t.GRP_MBR_ROLE_MEMBER);});} }, { key: "_onGroupProfileModified", value: function value(e) {var t = this,n = e.payload.newGroupProfile,r = e.payload.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);Object.keys(n).forEach(function (e) {switch (e) {case "ownerID":t._ownerChaged(o, n);break;default:o[e] = n[e];}}), this.groupController.emitGroupListUpdate(!0, !0);} }, { key: "_ownerChaged", value: function value(e, n) {var r = e.groupID,o = this.groupController.getLocalGroupProfile(r),i = this.tim.context.identifier;if (i === n.ownerID) {o.updateGroup({ selfInfo: { role: t.GRP_MBR_ROLE_OWNER } });var s = this.groupController.getLocalGroupMemberInfo(r, i),a = this.groupController.getLocalGroupProfile(r).ownerID,u = this.groupController.getLocalGroupMemberInfo(r, a);s && s.updateRole(t.GRP_MBR_ROLE_OWNER), u && u.updateRole(t.GRP_MBR_ROLE_MEMBER);}} }, { key: "_onMemberInfoModified", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;e.payload.memberList.forEach(function (e) {var r = t.groupController.getLocalGroupMemberInfo(n, e.userID);r && e.muteTime && r.updateMuteUntil(e.muteTime);});} }]), e;}(),Ga = function () {function n(e) {r(this, n), this.groupController = e.groupController, this.tim = e.tim, this.pendencyMap = new Map(), this._initLiceners();}return i(n, [{ key: "_initLiceners", value: function value() {this.tim.innerEmitter.on(Wn, this._onReceivedGroupSystemNotice, this), this.tim.innerEmitter.on(Kn, this._clearGroupSystemNotice, this);} }, { key: "_clearGroupSystemNotice", value: function value() {var e = this;this.getPendencyList().then(function (n) {n.forEach(function (t) {e.pendencyMap.set("".concat(t.from, "_").concat(t.groupID, "_").concat(t.to), t);});var r = e.tim.messageController.getLocalMessageList(t.CONV_SYSTEM),o = [];r.forEach(function (t) {var n = t.payload,r = n.operatorID,i = n.operationType,s = n.groupProfile;if (i === Fe) {var a = "".concat(r, "_").concat(s.groupID, "_").concat(s.to),u = e.pendencyMap.get(a);u && Z(u.handled) && 0 !== u.handled && o.push(t);}}), e.groupController.deleteGroupSystemNotice({ messageList: o });});} }, { key: "getPendencyList", value: function value(e) {var t = this;return this.groupController.request({ name: "group", action: "getGroupPendency", param: { startTime: e && e.startTime ? e.startTime : 0, limit: e && e.limit ? e.limit : 10, handleAccount: this.tim.context.identifier } }).then(function (e) {var n = e.data,r = n.pendencyList;return 0 !== n.nextStartTime ? t.getPendencyList({ startTime: n.nextStartTime }).then(function (e) {return [].concat(v(r), v(e));}) : r;});} }, { key: "_onReceivedGroupSystemNotice", value: function value(t) {var n = this,r = t.data,o = r.result;"sync" !== r.type && o.forEach(function (t) {switch (t.payload.operationType) {case 1:n._onApplyGroupRequest(t);break;case 2:n._onApplyGroupRequestAgreed(t);break;case 3:n._onApplyGroupRequestRefused(t);break;case 4:n._onMemberKicked(t);break;case 5:n._onGroupDismissed(t);break;case 6:break;case 7:n._onInviteGroup(t);break;case 8:n._onQuitGroup(t);break;case 9:n._onSetManager(t);break;case 10:n._onDeleteManager(t);break;case 11:case 12:case 15:break;case 255:n.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Xe });}});} }, { key: "_onApplyGroupRequest", value: function value(t) {this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Fe });} }, { key: "_onApplyGroupRequestAgreed", value: function value(t) {var n = this,r = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(r) || this.groupController.getGroupProfile({ groupID: r }).then(function (e) {var t = e.data.group;t && (n.groupController.updateGroupMap([t]), n.groupController.emitGroupListUpdate());}), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Ve });} }, { key: "_onApplyGroupRequestRefused", value: function value(t) {this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Ke });} }, { key: "_onMemberKicked", value: function value(t) {var n = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n) && this.groupController.deleteLocalGroupAndConversation(n), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Be });} }, { key: "_onGroupDismissed", value: function value(t) {var n = t.payload.groupProfile.groupID,r = this.groupController.hasLocalGroup(n),o = this.groupController.AVChatRoomHandler;r && this.groupController.deleteLocalGroupAndConversation(n), o.checkJoinedAVChatRoomByID(n) && o.reset(n), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: He });} }, { key: "_onInviteGroup", value: function value(t) {var n = this,r = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(r) || this.groupController.getGroupProfile({ groupID: r }).then(function (e) {var t = e.data.group;t && (n.groupController.updateGroupMap([t]), n.groupController.emitGroupListUpdate());}), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: je });} }, { key: "_onQuitGroup", value: function value(t) {var n = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n) && this.groupController.deleteLocalGroupAndConversation(n), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Ye });} }, { key: "_onSetManager", value: function value(n) {var r = n.payload.groupProfile,o = r.to,i = r.groupID,s = this.groupController.getLocalGroupMemberInfo(i, o);s && s.updateRole(t.GRP_MBR_ROLE_ADMIN), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: n, type: $e });} }, { key: "_onDeleteManager", value: function value(n) {var r = n.payload.groupProfile,o = r.to,i = r.groupID,s = this.groupController.getLocalGroupMemberInfo(i, o);s && s.updateRole(t.GRP_MBR_ROLE_MEMBER), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: n, type: We });} }, { key: "reset", value: function value() {this.pendencyMap.clear();} }]), n;}(),ba = { 3: !0, 4: !0, 5: !0, 6: !0 },Ua = function () {function n(e) {var t = e.tim,o = e.groupController;r(this, n), this.tim = t, this.groupController = o, this.sequencesLinkedList = new Oa(100), this.receivedMessageCount = 0, this._pollingRequestInfoMap = new Map(), this._pollingInstanceMap = new Map(), this._joinedGroupMap = new Map();}return i(n, [{ key: "hasJoinedAVChatRoom", value: function value() {return this._joinedGroupMap.size > 0;} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return this._joinedGroupMap.has(e);} }, { key: "getJoinedAVChatRoom", value: function value() {return this._joinedGroupMap.size > 0 ? v(this._joinedGroupMap.keys()) : null;} }, { key: "start", value: function value(e) {var t = this._pollingRequestInfoMap.get(e),n = { key: t.key, startSeq: t.startSeq };if (this._pollingInstanceMap.has(e)) {var r = this._pollingInstanceMap.get(e);r.isRunning() || r.start();} else {var o = this.groupController.createTransportCapsule({ name: "AVChatRoom", action: "startLongPoll", param: n }),i = this.tim.connectionController.createRunLoop({ pack: o, before: this._updateRequestData.bind(this, e), success: this._handleSuccess.bind(this, e), fail: this._handleFailure.bind(this), isAVChatRoomLoop: !0 });i.start(), this._pollingInstanceMap.set(e, i), J.log("AVChatRoomHandler.start message channel started. groupID=".concat(e));}} }, { key: "stop", value: function value(e) {var t = this._pollingInstanceMap.get(e);t && t.isRunning() && (t.abort(), t.stop(), J.log("AVChatRoomHandler.stop message channel stopped. groupID=".concat(e)));} }, { key: "startRunLoop", value: function value(e) {var t = this;return this._precheck().then(function () {var n = e.longPollingKey,r = e.group,o = r.groupID;return t._pollingRequestInfoMap.set(o, { key: n, startSeq: 0 }), t._joinedGroupMap.set(o, r), t.groupController.updateGroupMap([r]), t.groupController.emitGroupListUpdate(!0, !1), t.start(o), t.groupController.isLoggedIn() ? Fr({ status: we.SUCCESS, group: r }) : Fr({ status: we.SUCCESS });});} }, { key: "joinWithoutAuth", value: function value(e) {var t = this;return this.groupController.request({ name: "group", action: "applyJoinAVChatRoom", param: e }).then(function (n) {var r = n.data.longPollingKey;if (oe(r)) return Vr(new ht({ code: dt.CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN, message: Xt }));J.log("AVChatRoomHandler.joinWithoutAuth ok. groupID:", e.groupID), t.groupController.emitInnerEvent(Dr), t.groupController.emitInnerEvent(Tr, e.groupID);var o = new Ma({ groupID: e.groupID });return t.startRunLoop({ group: o, longPollingKey: r }), new Ur({ status: we.SUCCESS });}).catch(function (t) {return J.error("AVChatRoomHandler.joinWithoutAuth error:".concat(de(t), ". groupID:").concat(e.groupID)), Vr(t);});} }, { key: "_precheck", value: function value() {if (this.tim.context.unlimitedAVChatRoom) return Promise.resolve();if (!this.hasJoinedAVChatRoom()) return Promise.resolve();var e = y(this._joinedGroupMap.entries().next().value, 2),n = e[0],r = e[1];if (this.groupController.isLoggedIn()) {if (!(r.selfInfo.role === t.GRP_MBR_ROLE_OWNER || r.ownerID === this.tim.loginInfo.identifier)) return this.groupController.quitGroup(n);this.groupController.deleteLocalGroupAndConversation(n);} else this.groupController.deleteLocalGroupAndConversation(n);return this.reset(n), Promise.resolve();} }, { key: "_updateRequestData", value: function value(e, t) {var n = this._pollingRequestInfoMap.get(e),r = n.key,o = n.startSeq;t.StartSeq = o, t.key = r, this.tim.sumStatController.addTotalCount(Kr.LONG_POLLING_AV);} }, { key: "_handleSuccess", value: function value(e, t) {this.tim.sumStatController.addSuccessCount(Kr.LONG_POLLING_AV), this.tim.sumStatController.addCost(Kr.LONG_POLLING_AV, t.data.timecost);var n = t.data,r = n.key,o = n.nextSeq,i = n.rspMsgList;this._pollingRequestInfoMap.set(e, { key: r, startSeq: o }), re(i) && i.length > 0 && (i.forEach(function (e) {e.to = e.groupID;}), this._dispatchNotice(i)), this.groupController.emitInnerEvent(fr);} }, { key: "_handleFailure", value: function value(e) {if (e.error) if ("ECONNABORTED" === e.error.code || e.error.code === dt.NETWORK_TIMEOUT) {if (e.error.config) {var t = e.error.config.url,n = e.error.config.data;J.log("AVChatRoomHandler._handleFailure request timed out. url=".concat(t, " data=").concat(n));} else J.log("AVChatRoomHandler._handleFailure request timed out");} else J.log("AVChatRoomHandler._handleFailure request failed due to network error");this.groupController.emitInnerEvent(dr);} }, { key: "_dispatchNotice", value: function value(n) {if (re(n) && 0 !== n.length) {var r = Date.now(),o = null,i = [],s = [],a = n.length;a > 1 && n.sort(function (e, t) {return e.sequence - t.sequence;});for (var u = 0; u < a; u++) {if (ba[n[u].event]) {this.receivedMessageCount += 1;var c = (o = this.packMessage(n[u], n[u].event)).conversationID;if (this.receivedMessageCount % 40 == 0 && this.tim.messageLossController.detectMessageLoss(c, this.sequencesLinkedList.data()), null !== this.sequencesLinkedList.tail()) {var l = this.sequencesLinkedList.tail().value,p = o.sequence - l;p > 1 && p <= 20 ? this.tim.messageLossController.onMessageMaybeLost(c, l + 1, p - 1) : p < -1 && p >= -20 && this.tim.messageLossController.onMessageMaybeLost(c, o.sequence + 1, Math.abs(p) - 1);}this.sequencesLinkedList.pushIn(o.sequence), this._isMessageSentByCurrentInstance(o) || (o.conversationType === t.CONV_SYSTEM && s.push(o), i.push(o));} else J.warn("AVChatRoomHandler._dispatchMessage 未处理的 event 类型：", n[u].event);}if (s.length > 0 && this.groupController.emitInnerEvent(Wn, { result: s, eventDataList: [], type: "poll" }), 0 !== i.length) {var h = this.packConversationOption(i);h.length > 0 && this.groupController.emitInnerEvent($n, { eventDataList: h, type: "poll" }), J.debug("AVChatRoomHandler._dispatchNotice nums=".concat(i.length));var d = this.tim.sumStatController;d.addTotalCount(Kr.MESSAGE_RECEIVED_AV), d.addSuccessCount(Kr.MESSAGE_RECEIVED_AV), d.addCost(Kr.MESSAGE_RECEIVED_AV, Date.now() - r), this.groupController.emitOuterEvent(e.MESSAGE_RECEIVED, i);}}} }, { key: "_isMessageSentByCurrentInstance", value: function value(e) {return !!this.tim.messageController.isMessageSentByCurrentInstance(e);} }, { key: "packMessage", value: function value(e, n) {e.currentUser = this.tim.context.identifier, e.conversationType = 5 === n ? t.CONV_SYSTEM : t.CONV_GROUP, e.isSystemMessage = !!e.isSystemMessage;var r = new Dn(e),o = this.packElements(e, n);return r.setElement(o), r;} }, { key: "packElements", value: function value(e, n) {return 4 === n || 6 === n ? { type: t.MSG_GRP_TIP, content: u({}, e.elements, { groupProfile: e.groupProfile }) } : 5 === n ? { type: t.MSG_GRP_SYS_NOTICE, content: u({}, e.elements, { groupProfile: e.groupProfile }) } : this.tim.bigDataHallwayController.parseElements(e.elements, e.from);} }, { key: "packConversationOption", value: function value(e) {for (var t = new Map(), n = 0; n < e.length; n++) {var r = e[n],o = r.conversationID;if (t.has(o)) {var i = t.get(o);i.lastMessage = r, "in" === r.flow && i.unreadCount++;} else t.set(o, { conversationID: r.conversationID, unreadCount: "out" === r.flow ? 0 : 1, type: r.conversationType, subType: r.conversationSubType, lastMessage: r });}return v(t.values());} }, { key: "reset", value: function value(e) {if (0 !== this._pollingInstanceMap.size) {if (e) J.log("AVChatRoomHandler.reset groupID=".concat(e)), this.stop(e), this._pollingInstanceMap.delete(e), this._joinedGroupMap.delete(e), this._pollingRequestInfoMap.delete(e);else {J.log("AVChatRoomHandler.reset all");var t,n = C(this._pollingInstanceMap.keys());try {for (n.s(); !(t = n.n()).done;) {var r = t.value;this.stop(r);}} catch (o) {n.e(o);} finally {n.f();}this._pollingInstanceMap.clear(), this._joinedGroupMap.clear(), this._pollingRequestInfoMap.clear();}this.sequencesLinkedList.reset(), this.receivedMessageCount = 0;}} }]), n;}(),qa = function (n) {c(s, n);var o = _(s);function s(e) {var t;return r(this, s), (t = o.call(this, e)).groupMap = new Map(), t.groupMemberListMap = new Map(), t.groupNoticeHandler = new Ga({ tim: e, groupController: g(t) }), t.groupTipsHandler = new Pa({ tim: e, groupController: g(t) }), t.AVChatRoomHandler = new Ua({ tim: e, groupController: g(t) }), t._initListeners(), t;}return i(s, [{ key: "createGroup", value: function value(e) {var n = this;if (!["Public", "Private", "ChatRoom", "AVChatRoom"].includes(e.type)) {var r = new ht({ code: dt.ILLEGAL_GROUP_TYPE, message: Bt });return Vr(r);}De(e.type) && !oe(e.memberList) && e.memberList.length > 0 && (J.warn("GroupController.createGroup 创建AVChatRoom时不能添加群成员，自动忽略该字段"), e.memberList = void 0), Se(e.type) || oe(e.joinOption) || (J.warn("GroupController.createGroup 创建Work/Meeting/AVChatRoom群时不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0);var o = new Br();return o.setMethod(ho).setStart(), J.log("GroupController.createGroup."), this.request({ name: "group", action: "create", param: e }).then(function (r) {if (o.setCode(0).setNetworkType(n.getNetworkType()).setText("groupType=".concat(e.type, " groupID=").concat(r.data.groupID)).setEnd(), J.log("GroupController.createGroup ok. groupID:", r.data.groupID), e.type === t.GRP_AVCHATROOM) return n.getGroupProfile({ groupID: r.data.groupID });n.updateGroupMap([u({}, e, { groupID: r.data.groupID })]);var i = n.tim.createCustomMessage({ to: r.data.groupID, conversationType: t.CONV_GROUP, payload: { data: "group_create", extension: "".concat(n.tim.context.identifier, "创建群组") } });return n.tim.sendMessage(i), n.emitGroupListUpdate(), n.getGroupProfile({ groupID: r.data.groupID });}).then(function (e) {var n = e.data.group;return n.selfInfo.messageRemindType = t.MSG_REMIND_ACPT_AND_NOTE, n.selfInfo.role = t.GRP_MBR_ROLE_OWNER, e;}).catch(function (t) {return o.setText("groupType=".concat(e.type)), n.probeNetwork().then(function (e) {var n = y(e, 2),r = n[0],i = n[1];o.setError(t, r, i).setEnd();}), J.error("GroupController.createGroup error:", t), Vr(t);});} }, { key: "joinGroup", value: function value(e) {if (this.hasLocalGroup(e.groupID)) {var n = { status: t.JOIN_STATUS_ALREADY_IN_GROUP };return Fr(n);}if (e.type === t.GRP_WORK) {var r = new ht({ code: dt.CANNOT_JOIN_WORK, message: Ht });return Vr(r);}return J.log("GroupController.joinGroup. groupID:", e.groupID), this.isLoggedIn() ? this.applyJoinGroup(e) : this.AVChatRoomHandler.joinWithoutAuth(e);} }, { key: "quitGroup", value: function value(e) {var t = this;J.log("GroupController.quitGroup. groupID:", e);var n = this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);if (n && !this.isLoggedIn()) return J.log("GroupController.quitGroup anonymously ok. groupID:", e), this.deleteLocalGroupAndConversation(e), this.AVChatRoomHandler.reset(e), Fr({ groupID: e });var r = new Br();return r.setMethod(go).setStart(), this.request({ name: "group", action: "quitGroup", param: { groupID: e } }).then(function () {return r.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e)).setEnd(), J.log("GroupController.quitGroup ok. groupID:", e), n && t.AVChatRoomHandler.reset(e), t.deleteLocalGroupAndConversation(e), new Ur({ groupID: e });}).catch(function (n) {return r.setText("groupID=".concat(e)), t.probeNetwork().then(function (e) {var t = y(e, 2),o = t[0],i = t[1];r.setError(n, o, i).setEnd();}), J.error("GroupController.quitGroup error. error:".concat(de(n), " groupID:").concat(e)), Vr(n);});} }, { key: "changeGroupOwner", value: function value(e) {var n = this;if (this.hasLocalGroup(e.groupID) && this.getLocalGroupProfile(e.groupID).type === t.GRP_AVCHATROOM) return Vr(new ht({ code: dt.CANNOT_CHANGE_OWNER_IN_AVCHATROOM, message: jt }));if (e.newOwnerID === this.tim.loginInfo.identifier) return Vr(new ht({ code: dt.CANNOT_CHANGE_OWNER_TO_SELF, message: Yt }));var r = new Br();return r.setMethod(_o).setStart(), J.log("GroupController.changeGroupOwner. groupID:", e.groupID), this.request({ name: "group", action: "changeGroupOwner", param: e }).then(function () {r.setCode(0).setNetworkType(n.getNetworkType()).setText("groupID=".concat(e.groupID)).setEnd(), J.log("GroupController.changeGroupOwner ok. groupID:", e.groupID);var t = e.groupID,o = e.newOwnerID;n.groupMap.get(t).ownerID = o;var i = n.groupMemberListMap.get(t);if (i instanceof Map) {var s = i.get(n.tim.loginInfo.identifier);oe(s) || (s.updateRole("Member"), n.groupMap.get(t).selfInfo.role = "Member");var a = i.get(o);oe(a) || a.updateRole("Owner");}return n.emitGroupListUpdate(!0, !1), new Ur({ group: n.groupMap.get(t) });}).catch(function (t) {return r.setText("groupID=".concat(e.groupID)), n.probeNetwork().then(function (e) {var n = y(e, 2),o = n[0],i = n[1];r.setError(t, o, i).setEnd();}), J.error("GroupController.changeGroupOwner error:".concat(de(t), " groupID:").concat(e.groupID)), Vr(t);});} }, { key: "dismissGroup", value: function value(e) {var n = this;if (this.hasLocalGroup(e) && this.getLocalGroupProfile(e).type === t.GRP_WORK) return Vr(new ht({ code: dt.CANNOT_DISMISS_WORK, message: $t }));var r = new Br();return r.setMethod(Io).setStart(), J.log("GroupController.dismissGroup. groupID:".concat(e)), this.request({ name: "group", action: "destroyGroup", param: { groupID: e } }).then(function () {return r.setCode(0).setNetworkType(n.getNetworkType()).setText("groupID=".concat(e)).setEnd(), J.log("GroupController.dismissGroup ok. groupID:".concat(e)), n.deleteLocalGroupAndConversation(e), n.checkJoinedAVChatRoomByID(e) && n.AVChatRoomHandler.reset(e), new Ur({ groupID: e });}).catch(function (t) {return r.setText("groupID=".concat(e)), n.probeNetwork().then(function (e) {var n = y(e, 2),o = n[0],i = n[1];r.setError(t, o, i).setEnd();}), J.error("GroupController.dismissGroup error:".concat(de(t), " groupID:").concat(e)), Vr(t);});} }, { key: "updateGroupProfile", value: function value(e) {var t = this;!this.hasLocalGroup(e.groupID) || Se(this.getLocalGroupProfile(e.groupID).type) || oe(e.joinOption) || (J.warn("GroupController.updateGroupProfile Work/Meeting/AVChatRoom群不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0), oe(e.muteAllMembers) || (e.muteAllMembers ? e.muteAllMembers = "On" : e.muteAllMembers = "Off");var n = new Br();return n.setMethod(Mo).setStart(), n.setText(JSON.stringify(e)), J.log("GroupController.updateGroupProfile. groupID:", e.groupID), this.request({ name: "group", action: "updateGroupProfile", param: e }).then(function () {(n.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.updateGroupProfile ok. groupID:", e.groupID), t.hasLocalGroup(e.groupID)) && (t.groupMap.get(e.groupID).updateGroup(e), t._setStorageGroupList());return new Ur({ group: t.groupMap.get(e.groupID) });}).catch(function (r) {return t.probeNetwork().then(function (e) {var t = y(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), J.log("GroupController.updateGroupProfile failed. error:".concat(de(r), " groupID:").concat(e.groupID)), Vr(r);});} }, { key: "setGroupMemberRole", value: function value(e) {var n = this,r = e.groupID,o = e.userID,i = e.role,s = this.groupMap.get(r);if (s.selfInfo.role !== t.GRP_MBR_ROLE_OWNER) return Vr(new ht({ code: dt.NOT_OWNER, message: Qt }));if ([t.GRP_WORK, t.GRP_AVCHATROOM].includes(s.type)) return Vr(new ht({ code: dt.CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM, message: Zt }));if ([t.GRP_MBR_ROLE_ADMIN, t.GRP_MBR_ROLE_MEMBER].indexOf(i) < 0) return Vr(new ht({ code: dt.INVALID_MEMBER_ROLE, message: en }));if (o === this.tim.loginInfo.identifier) return Vr(new ht({ code: dt.CANNOT_SET_SELF_MEMBER_ROLE, message: tn }));var a = new Br();return a.setMethod(Lo).setStart(), a.setText("groupID=".concat(r, " userID=").concat(o, " role=").concat(i)), J.log("GroupController.setGroupMemberRole. groupID:".concat(r, ". userID: ").concat(o)), this._modifyGroupMemberInfo({ groupID: r, userID: o, role: i }).then(function (e) {return a.setCode(0).setNetworkType(n.getNetworkType()).setEnd(), J.log("GroupController.setGroupMemberRole ok. groupID:".concat(r, ". userID: ").concat(o)), new Ur({ group: s, member: e });}).catch(function (e) {return n.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberRole error:".concat(de(e), " groupID:").concat(r, " userID:").concat(o)), Vr(e);});} }, { key: "setGroupMemberMuteTime", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = e.muteTime;if (r === this.tim.loginInfo.identifier) return Vr(new ht({ code: dt.CANNOT_MUTE_SELF, message: nn }));J.log("GroupController.setGroupMemberMuteTime. groupID:".concat(n, ". userID: ").concat(r));var i = new Br();return i.setMethod(Oo).setStart(), i.setText("groupID=".concat(n, " userID=").concat(r, " muteTime=").concat(o)), this._modifyGroupMemberInfo({ groupID: n, userID: r, muteTime: o }).then(function (e) {return i.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.setGroupMemberMuteTime ok. groupID:".concat(n, ". userID: ").concat(r)), new Ur({ group: t.getLocalGroupProfile(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];i.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberMuteTime error:".concat(de(e), " groupID:").concat(n, " userID:").concat(r)), Vr(e);});} }, { key: "setMessageRemindType", value: function value(e) {var t = this,n = new Br();n.setMethod(vo).setStart(), n.setText("groupID=".concat(e.groupID, " userID=").concat(e.userID || this.tim.loginInfo.identifier)), J.log("GroupController.setMessageRemindType. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || this.tim.loginInfo.identifier));var r = e.groupID,o = e.messageRemindType;return this._modifyGroupMemberInfo({ groupID: r, messageRemindType: o, userID: this.tim.loginInfo.identifier }).then(function () {n.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.setMessageRemindType ok. groupID:".concat(e.groupID, " userID:").concat(e.userID || t.tim.loginInfo.identifier));var r = t.getLocalGroupProfile(e.groupID);return r && (r.selfInfo.messageRemindType = o), new Ur({ group: r });}).catch(function (r) {return t.probeNetwork().then(function (e) {var t = y(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), J.error("GroupController.setMessageRemindType error:".concat(de(r), " groupID:").concat(e.groupID, " userID:").concat(e.userID || t.tim.loginInfo.identifier)), Vr(r);});} }, { key: "setGroupMemberNameCard", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = void 0 === r ? this.tim.loginInfo.identifier : r,i = e.nameCard;J.log("GroupController.setGroupMemberNameCard. groupID:".concat(n, ". userID: ").concat(o));var s = new Br();return s.setMethod(No).setStart(), s.setText("groupID=".concat(n, " userID=").concat(o, " nameCard=").concat(i)), this._modifyGroupMemberInfo({ groupID: n, userID: o, nameCard: i }).then(function (e) {J.log("GroupController.setGroupMemberNameCard ok. groupID:".concat(n, ". userID: ").concat(o)), s.setCode(0).setNetworkType(t.getNetworkType()).setEnd();var r = t.getLocalGroupProfile(n);return o === t.tim.loginInfo.identifier && r && r.setSelfNameCard(i), new Ur({ group: r, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];s.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberNameCard error:".concat(de(e), " groupID:").concat(n, " userID:").concat(o)), Vr(e);});} }, { key: "setGroupMemberCustomField", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = void 0 === r ? this.tim.loginInfo.identifier : r,i = e.memberCustomField;J.log("GroupController.setGroupMemberCustomField. groupID:".concat(n, ". userID: ").concat(o));var s = new Br();return s.setMethod(wo).setStart(), s.setText("groupID=".concat(n, " userID=").concat(o, " memberCustomField=").concat(i)), this._modifyGroupMemberInfo({ groupID: n, userID: o, memberCustomField: i }).then(function (e) {return s.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.setGroupMemberCustomField ok. groupID:".concat(n, ". userID: ").concat(o)), new Ur({ group: t.groupMap.get(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];s.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberCustomField error:".concat(de(e), " groupID:").concat(n, " userID:").concat(o)), Vr(e);});} }, { key: "getGroupList", value: function value(e) {var t = this,n = new Br();n.setMethod(Co).setStart(), J.log("GroupController.getGroupList");var r = { introduction: "Introduction", notification: "Notification", createTime: "CreateTime", ownerID: "Owner_Account", lastInfoTime: "LastInfoTime", memberNum: "MemberNum", maxMemberNum: "MaxMemberNum", joinOption: "ApplyJoinOption", muteAllMembers: "ShutUpAllMember" },o = ["Type", "Name", "FaceUrl", "NextMsgSeq", "LastMsgTime"];return e && e.groupProfileFilter && e.groupProfileFilter.forEach(function (e) {r[e] && o.push(r[e]);}), this.request({ name: "group", action: "list", param: { responseFilter: { groupBaseInfoFilter: o, selfInfoFilter: ["Role", "JoinTime", "MsgFlag"] } } }).then(function (e) {var r = e.data.groups;return n.setCode(0).setNetworkType(t.getNetworkType()).setText(r.length).setEnd(), J.log("GroupController.getGroupList ok. nums=".concat(r.length)), t._groupListTreeShaking(r), t.updateGroupMap(r), t.tempConversationList && (J.log("GroupController.getGroupList update last message with tempConversationList, nums=".concat(t.tempConversationList.length)), t._handleUpdateGroupLastMessage({ data: t.tempConversationList }), t.tempConversationList = null), t.emitGroupListUpdate(), new Ur({ groupList: t.getLocalGroups() });}).catch(function (e) {return t.probeNetwork().then(function (t) {var r = y(t, 2),o = r[0],i = r[1];n.setError(e, o, i).setEnd();}), J.error("GroupController.getGroupList error:", e), Vr(e);});} }, { key: "getGroupMemberList", value: function value(e) {var t = this,n = e.groupID,r = e.offset,o = void 0 === r ? 0 : r,i = e.count,s = void 0 === i ? 15 : i,a = new Br();a.setMethod(Do).setStart(), J.log("GroupController.getGroupMemberList groupID: ".concat(n, " offset: ").concat(o, " count: ").concat(s));var u = [];return this.request({ name: "group", action: "getGroupMemberList", param: { groupID: n, offset: o, limit: s > 100 ? 100 : s, memberInfoFilter: ["Role", "NameCard", "ShutUpUntil"] } }).then(function (e) {var r = e.data,o = r.members,i = r.memberNum;return re(o) && 0 !== o.length ? (t.hasLocalGroup(n) && (t.getLocalGroupProfile(n).memberNum = i), u = t._updateLocalGroupMemberMap(n, o), t.tim.getUserProfile({ userIDList: o.map(function (e) {return e.userID;}), tagList: [et.NICK, et.AVATAR] })) : Promise.resolve([]);}).then(function (e) {var r = e.data;if (!re(r) || 0 === r.length) return Fr({ memberList: [] });var i = r.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});return t._updateLocalGroupMemberMap(n, i), a.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(n, " offset=").concat(o, " count=").concat(s)).setEnd(), J.log("GroupController.getGroupMemberList ok."), new Ur({ memberList: u });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), J.error("GroupController.getGroupMemberList error:", e), Vr(e);});} }, { key: "getLocalGroups", value: function value() {return v(this.groupMap.values());} }, { key: "getLocalGroupProfile", value: function value(e) {return this.groupMap.get(e);} }, { key: "hasLocalGroup", value: function value(e) {return this.groupMap.has(e);} }, { key: "getLocalGroupMemberInfo", value: function value(e, t) {return this.groupMemberListMap.has(e) ? this.groupMemberListMap.get(e).get(t) : null;} }, { key: "setLocalGroupMember", value: function value(e, t) {if (this.groupMemberListMap.has(e)) this.groupMemberListMap.get(e).set(t.userID, t);else {var n = new Map().set(t.userID, t);this.groupMemberListMap.set(e, n);}} }, { key: "hasLocalGroupMember", value: function value(e, t) {return this.groupMemberListMap.has(e) && this.groupMemberListMap.get(e).has(t);} }, { key: "hasLocalGroupMemberMap", value: function value(e) {return this.groupMemberListMap.has(e);} }, { key: "getGroupProfile", value: function value(e) {var t = this,n = new Br();n.setMethod(Eo).setStart(), J.log("GroupController.getGroupProfile. groupID:", e.groupID);var r = e.groupID,o = e.groupCustomFieldFilter,i = { groupIDList: [r], responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: o } };return this.getGroupProfileAdvance(i).then(function (o) {var i,s = o.data,a = s.successGroupList,u = s.failureGroupList;return J.log("GroupController.getGroupProfile ok. groupID:".concat(e.groupID)), u.length > 0 ? Vr(u[0]) : (De(a[0].type) && !t.hasLocalGroup(r) ? i = new Ma(a[0]) : (t.updateGroupMap(a), i = t.getLocalGroupProfile(r)), n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(i.groupID, " type=").concat(i.type, " muteAllMembers=").concat(i.muteAllMembers, " ownerID=").concat(i.ownerID)).setEnd(), i && i.selfInfo && !i.selfInfo.nameCard ? t.updateSelfInfo(i).then(function (e) {return new Ur({ group: e });}) : new Ur({ group: i }));}).catch(function (r) {return t.probeNetwork().then(function (t) {var o = y(t, 2),i = o[0],s = o[1];n.setError(r, i, s).setText("groupID=".concat(e.groupID)).setEnd();}), J.error("GroupController.getGroupProfile error:".concat(de(r), " groupID:").concat(e.groupID)), Vr(r);});} }, { key: "getGroupMemberProfile", value: function value(e) {var t = this,n = new Br();n.setMethod(Ao).setText(e.userIDList.length > 5 ? "userIDList.length=".concat(e.userIDList.length) : "userIDList=".concat(e.userIDList)).setStart(), J.log("GroupController.getGroupMemberProfile groupID:".concat(e.groupID, " userIDList:").concat(e.userIDList.join(","))), e.userIDList.length > 50 && (e.userIDList = e.userIDList.slice(0, 50));var r = e.groupID,o = e.userIDList;return this._getGroupMemberProfileAdvance(u({}, e, { userIDList: o })).then(function (e) {var n = e.data.members;return re(n) && 0 !== n.length ? (t._updateLocalGroupMemberMap(r, n), t.tim.getUserProfile({ userIDList: n.map(function (e) {return e.userID;}), tagList: [et.NICK, et.AVATAR] })) : Fr([]);}).then(function (e) {var i = e.data.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});t._updateLocalGroupMemberMap(r, i);var s = o.filter(function (e) {return t.hasLocalGroupMember(r, e);}).map(function (e) {return t.getLocalGroupMemberInfo(r, e);});return n.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), new Ur({ memberList: s });});} }, { key: "_getGroupMemberProfileAdvance", value: function value(e) {return this.request({ name: "group", action: "getGroupMemberProfile", param: u({}, e, { memberInfoFilter: e.memberInfoFilter ? e.memberInfoFilter : ["Role", "JoinTime", "NameCard", "ShutUpUntil"] }) });} }, { key: "updateSelfInfo", value: function value(e) {var t = e.groupID;J.log("GroupController.updateSelfInfo groupID:", t);var n = { groupID: t, userIDList: [this.tim.loginInfo.identifier] };return this.getGroupMemberProfile(n).then(function (n) {var r = n.data.memberList;return J.log("GroupController.updateSelfInfo ok. groupID:", t), e && 0 !== r.length && e.updateSelfInfo(r[0]), e;});} }, { key: "addGroupMember", value: function value(e) {var t = this,n = new Br();n.setMethod(ko).setText("groupID=".concat(e.groupID)).setStart();var r = this.getLocalGroupProfile(e.groupID);if (De(r.type)) {var o = new ht({ code: dt.CANNOT_ADD_MEMBER_IN_AVCHATROOM, message: zt });return n.setCode(dt.CANNOT_ADD_MEMBER_IN_AVCHATROOM).setMessage(zt).setNetworkType(this.getNetworkType()).setText("groupID=".concat(e.groupID, " groupType=").concat(r.type)).setEnd(), Vr(o);}return e.userIDList = e.userIDList.map(function (e) {return { userID: e };}), J.log("GroupController.addGroupMember. groupID:", e.groupID), this.request({ name: "group", action: "addGroupMember", param: e }).then(function (o) {var i = o.data.members;n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID)).setEnd(), J.log("GroupController.addGroupMember ok. groupID:", e.groupID);var s = i.filter(function (e) {return 1 === e.result;}).map(function (e) {return e.userID;}),a = i.filter(function (e) {return 0 === e.result;}).map(function (e) {return e.userID;}),u = i.filter(function (e) {return 2 === e.result;}).map(function (e) {return e.userID;});return 0 === s.length ? new Ur({ successUserIDList: s, failureUserIDList: a, existedUserIDList: u }) : (r.memberNum += s.length, new Ur({ successUserIDList: s, failureUserIDList: a, existedUserIDList: u, group: r }));}).catch(function (r) {return t.probeNetwork().then(function (t) {var o = y(t, 2),i = o[0],s = o[1];n.setError(r, i, s).setText("groupID=".concat(e.groupID)).setEnd();}), J.error("GroupController.addGroupMember error:".concat(de(r), " groupID:").concat(e.groupID)), Vr(r);});} }, { key: "deleteGroupMember", value: function value(e) {var n = this,r = new Br();r.setMethod(Ro).setText(e.userIDList.length > 5 ? "userIDList.length=".concat(e.userIDList.length) : "userIDList=".concat(e.userIDList)).setStart(), J.log("GroupController.deleteGroupMember groupID:".concat(e.groupID, " userIDList:").concat(e.userIDList));var o = this.getLocalGroupProfile(e.groupID);return o.type === t.GRP_AVCHATROOM ? Vr(new ht({ code: dt.CANNOT_KICK_MEMBER_IN_AVCHATROOM, message: Jt })) : this.request({ name: "group", action: "deleteGroupMember", param: e }).then(function () {return r.setCode(0).setNetworkType(n.getNetworkType()).setEnd(), J.log("GroupController.deleteGroupMember ok"), o.memberNum--, n.deleteLocalGroupMembers(e.groupID, e.userIDList), new Ur({ group: o, userIDList: e.userIDList });}).catch(function (t) {return n.probeNetwork().then(function (n) {var o = y(n, 2),i = o[0],s = o[1];r.setError(t, i, s).setText("groupID=".concat(e.groupID)).setEnd();}), J.error("GroupController.deleteGroupMember error:".concat(de(t), " groupID:").concat(e.groupID)), Vr(t);});} }, { key: "searchGroupByID", value: function value(e) {var t = this,n = { groupIDList: [e] },r = new Br();return r.setMethod(mo).setText("groupID=".concat(e)).setStart(), J.log("GroupController.searchGroupByID. groupID:".concat(e)), this.request({ name: "group", action: "searchGroupByID", param: n }).then(function (n) {var o = n.data.groupProfile;if (o[0].errorCode !== Pe.SUCCESS) throw new ht({ code: o[0].errorCode, message: o[0].errorInfo });return r.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.searchGroupByID ok. groupID:".concat(e)), new Ur({ group: new Ma(o[0]) });}).catch(function (n) {return t.probeNetwork().then(function (e) {var t = y(e, 2),o = t[0],i = t[1];r.setError(n, o, i).setEnd();}), J.warn("GroupController.searchGroupByID error:".concat(de(n), " groupID:").concat(e)), Vr(n);});} }, { key: "applyJoinGroup", value: function value(e) {var t = this,n = new Br();return n.setMethod(fo).setStart(), this.request({ name: "group", action: "applyJoinGroup", param: e }).then(function (r) {var o = r.data,i = o.joinedStatus,s = o.longPollingKey;switch (n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID, " joinedStatus=").concat(i)).setEnd(), J.log("GroupController.joinGroup ok. groupID:".concat(e.groupID, " joinedStatus:").concat(i, " longPollingKey:").concat(s)), i) {case we.WAIT_APPROVAL:return new Ur({ status: we.WAIT_APPROVAL });case we.SUCCESS:return t.getGroupProfile({ groupID: e.groupID }).then(function (n) {var r = n.data.group,o = { status: we.SUCCESS, group: r };return oe(s) ? (t.emitGroupListUpdate(!0, !1), new Ur(o)) : (t.emitInnerEvent(Tr, e.groupID), t.AVChatRoomHandler.startRunLoop({ longPollingKey: s, group: r }));});default:var a = new ht({ code: dt.JOIN_GROUP_FAIL, message: Wt });return J.error("GroupController.joinGroup error:".concat(de(a), " groupID:").concat(e.groupID)), Vr(a);}}).catch(function (r) {return n.setText("groupID=".concat(e.groupID)), t.probeNetwork().then(function (e) {var t = y(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), J.error("GroupController.joinGroup error:".concat(de(r), " groupID:").concat(e.groupID)), Vr(r);});} }, { key: "applyJoinAVChatRoom", value: function value(e) {return this.AVChatRoomHandler.applyJoinAVChatRoom(e);} }, { key: "handleGroupApplication", value: function value(e) {var t = this,n = e.message.payload,r = n.groupProfile.groupID,o = n.authentication,i = n.messageKey,s = n.operatorID,a = new Br();return a.setMethod(yo).setText("groupID=".concat(r)).setStart(), J.log("GroupController.handleApplication. groupID:", r), this.request({ name: "group", action: "handleApplyJoinGroup", param: u({}, e, { applicant: s, groupID: r, authentication: o, messageKey: i }) }).then(function () {return a.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.handleApplication ok. groupID:", r), t.deleteGroupSystemNotice({ messageList: [e.message] }), new Ur({ group: t.getLocalGroupProfile(r) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = y(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), J.error("GroupController.handleApplication error. error:".concat(de(e), " groupID:").concat(r)), Vr(e);});} }, { key: "deleteGroupSystemNotice", value: function value(e) {var n = this;return re(e.messageList) && 0 !== e.messageList.length ? (J.log("GroupController.deleteGroupSystemNotice " + e.messageList.map(function (e) {return e.ID;})), this.request({ name: "group", action: "deleteGroupSystemNotice", param: { messageListToDelete: e.messageList.map(function (e) {return { from: t.CONV_SYSTEM, messageSeq: e.clientSequence, messageRandom: e.random };}) } }).then(function () {return J.log("GroupController.deleteGroupSystemNotice ok"), e.messageList.forEach(function (e) {n.tim.messageController.deleteLocalMessage(e);}), new Ur();}).catch(function (e) {return J.error("GroupController.deleteGroupSystemNotice error:", e), Vr(e);})) : Fr();} }, { key: "getGroupProfileAdvance", value: function value(e) {return re(e.groupIDList) && e.groupIDList.length > 50 && (J.warn("GroupController.getGroupProfileAdvance 获取群资料的数量不能超过50个"), e.groupIDList.length = 50), J.log("GroupController.getGroupProfileAdvance. groupIDList:", e.groupIDList), this.request({ name: "group", action: "query", param: e }).then(function (e) {J.log("GroupController.getGroupProfileAdvance ok.");var t = e.data.groups,n = t.filter(function (e) {return oe(e.errorCode) || e.errorCode === Pe.SUCCESS;}),r = t.filter(function (e) {return e.errorCode && e.errorCode !== Pe.SUCCESS;}).map(function (e) {return new ht({ code: Number("500".concat(e.errorCode)), message: e.errorInfo, data: { groupID: e.groupID } });});return new Ur({ successGroupList: n, failureGroupList: r });}).catch(function (t) {return J.error("GroupController.getGroupProfileAdvance error:".concat(de(t), " groupIDList:").concat(e.groupIDList)), Vr(t);});} }, { key: "_deleteLocalGroup", value: function value(e) {return this.groupMap.delete(e), this.groupMemberListMap.delete(e), this._setStorageGroupList(), this.groupMap.has(e) && this.groupMemberListMap.has(e);} }, { key: "_initGroupList", value: function value() {var e = this,t = new Br();t.setMethod(So).setStart(), J.time(Kr.INIT_GROUP_LIST), J.log("GroupController._initGroupList");var n = this._getStorageGroupList();re(n) && n.length > 0 ? (n.forEach(function (t) {e.groupMap.set(t.groupID, new Ma(t));}), this.emitGroupListUpdate(!0, !1), t.setCode(0).setNetworkType(this.getNetworkType()).setText(this.groupMap.size).setEnd()) : t.setCode(0).setNetworkType(this.getNetworkType()).setText(0).setEnd(), this.triggerReady(), J.log("GroupController._initGroupList ok. initCost=".concat(J.timeEnd(Kr.INIT_GROUP_LIST), "ms")), this.getGroupList();} }, { key: "_initListeners", value: function value() {var e = this.tim.innerEmitter;e.once(xn, this._initGroupList, this), e.on(Mr, this._handleUpdateGroupLastMessage, this), e.on($n, this._handleReceivedGroupMessage, this), e.on(Sr, this._handleProfileUpdated, this);} }, { key: "emitGroupListUpdate", value: function value() {var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],r = this.getLocalGroups();n && this.emitInnerEvent(gr, r), t && this.emitOuterEvent(e.GROUP_LIST_UPDATED, r);} }, { key: "_handleReceivedGroupMessage", value: function value(e) {var n = this,r = e.data.eventDataList;Array.isArray(r) && r.forEach(function (e) {var r = e.conversationID.replace(t.CONV_GROUP, "");n.groupMap.has(r) && (n.groupMap.get(r).nextMessageSeq = e.lastMessage.sequence + 1);});} }, { key: "_onReceivedGroupSystemNotice", value: function value(e) {var t = e.data;this.groupNoticeHandler._onReceivedGroupNotice(t);} }, { key: "_handleUpdateGroupLastMessage", value: function value(e) {var n = e.data;if (J.log("GroupController._handleUpdateGroupLastMessage convNums=".concat(n.length, " groupNums=").concat(this.groupMap.size)), 0 !== this.groupMap.size) {for (var r, o, i, s = !1, a = 0, u = n.length; a < u; a++) {(r = n[a]).conversationID && r.type !== t.CONV_GROUP && (o = r.conversationID.split(/^GROUP/)[1], (i = this.getLocalGroupProfile(o)) && (i.lastMessage = r.lastMessage, s = !0));}s && (this.groupMap = this._sortLocalGroupList(this.groupMap), this.emitGroupListUpdate(!0, !1));} else this.tempConversationList = n;} }, { key: "_sortLocalGroupList", value: function value(e) {var t = v(e).filter(function (e) {var t = y(e, 2);t[0];return !Oe(t[1].lastMessage);});return t.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}), new Map([].concat(v(t), v(e)));} }, { key: "_getStorageGroupList", value: function value() {return this.tim.storage.getItem("groupMap");} }, { key: "_setStorageGroupList", value: function value() {var e = this.getLocalGroups().filter(function (e) {var t = e.type;return !De(t);}).slice(0, 20).map(function (e) {return { groupID: e.groupID, name: e.name, avatar: e.avatar, type: e.type };});this.tim.storage.setItem("groupMap", e);} }, { key: "updateGroupMap", value: function value(e) {var t = this;e.forEach(function (e) {t.groupMap.has(e.groupID) ? t.groupMap.get(e.groupID).updateGroup(e) : t.groupMap.set(e.groupID, new Ma(e));}), this._setStorageGroupList();} }, { key: "_updateLocalGroupMemberMap", value: function value(e, t) {var n = this;return re(t) && 0 !== t.length ? t.map(function (t) {return n.hasLocalGroupMember(e, t.userID) ? n.getLocalGroupMemberInfo(e, t.userID).updateMember(t) : n.setLocalGroupMember(e, new wa(t)), n.getLocalGroupMemberInfo(e, t.userID);}) : [];} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {var n = this.groupMemberListMap.get(e);n && t.forEach(function (e) {n.delete(e);});} }, { key: "_modifyGroupMemberInfo", value: function value(e) {var t = this,n = e.groupID,r = e.userID;return this.request({ name: "group", action: "modifyGroupMemberInfo", param: e }).then(function () {if (t.hasLocalGroupMember(n, r)) {var o = t.getLocalGroupMemberInfo(n, r);return oe(e.muteTime) || o.updateMuteUntil(e.muteTime), oe(e.role) || o.updateRole(e.role), oe(e.nameCard) || o.updateNameCard(e.nameCard), oe(e.memberCustomField) || o.updateMemberCustomField(e.memberCustomField), o;}return t.getGroupMemberProfile({ groupID: n, userIDList: [r] }).then(function (e) {return y(e.data.memberList, 1)[0];});});} }, { key: "_groupListTreeShaking", value: function value(e) {for (var t = new Map(v(this.groupMap)), n = 0, r = e.length; n < r; n++) {t.delete(e[n].groupID);}this.AVChatRoomHandler.hasJoinedAVChatRoom() && this.AVChatRoomHandler.getJoinedAVChatRoom().forEach(function (e) {t.delete(e);});for (var o = v(t.keys()), i = 0, s = o.length; i < s; i++) {this.groupMap.delete(o[i]);}} }, { key: "_handleProfileUpdated", value: function value(e) {for (var t = this, n = e.data, r = function r(e) {var r = n[e];t.groupMemberListMap.forEach(function (e) {e.has(r.userID) && e.get(r.userID).updateMember({ nick: r.nick, avatar: r.avatar });});}, o = 0; o < n.length; o++) {r(o);}} }, { key: "getJoinedAVChatRoom", value: function value() {return this.AVChatRoomHandler.getJoinedAVChatRoom();} }, { key: "deleteLocalGroupAndConversation", value: function value(e) {this._deleteLocalGroup(e), this.tim.conversationController.deleteLocalConversation("GROUP".concat(e)), this.emitGroupListUpdate(!0, !1);} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "getGroupLastSequence", value: function value(e) {var t = this,n = new Br();n.setMethod(To).setStart();var r = 0;if (this.hasLocalGroup(e)) {var o = this.getLocalGroupProfile(e);if (o.lastMessage.lastSequence > 0) return r = o.lastMessage.lastSequence, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local group profile[lastMessage.lastSequence]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local group profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(), Promise.resolve(r);if (o.nextMessageSeq > 1) return r = o.nextMessageSeq - 1, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local group profile[nextMessageSeq]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local group profile[nextMessageSeq]. groupID=").concat(e)).setEnd(), Promise.resolve(r);}var i = "GROUP".concat(e),s = this.tim.conversationController.getLocalConversation(i);if (s && s.lastMessage.lastSequence) return r = s.lastMessage.lastSequence, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(), Promise.resolve(r);var a = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["NextMsgSeq"] } };return this.getGroupProfileAdvance(a).then(function (o) {var i = o.data.successGroupList;return Oe(i) ? J.log("GroupController.getGroupLastSequence successGroupList is empty. groupID=".concat(e)) : (r = i[0].nextMessageSeq - 1, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from getGroupProfileAdvance. groupID=").concat(e))), n.setCode(0).setNetworkType(t.getNetworkType()).setText("got lastSequence=".concat(r, " from getGroupProfileAdvance. groupID=").concat(e)).setEnd(), r;}).catch(function (r) {return t.probeNetwork().then(function (t) {var o = y(t, 2),i = o[0],s = o[1];n.setError(r, i, s).setText("get lastSequence failed from getGroupProfileAdvance. groupID=".concat(e)).setEnd();}), J.warn("GroupController.getGroupLastSequence failed. ".concat(r)), Vr(r);});} }, { key: "reset", value: function value() {this.groupMap.clear(), this.groupMemberListMap.clear(), this.resetReady(), this.groupNoticeHandler.reset(), this.AVChatRoomHandler.reset(), this.tim.innerEmitter.once(xn, this._initGroupList, this);} }]), s;}(Pr),xa = function (n) {c(s, n);var o = _(s);function s(e) {var n;r(this, s), (n = o.call(this, e)).REALTIME_MESSAGE_TIMEOUT = 11e4, n.LONGPOLLING_ID_TIMEOUT = 3e5, n._currentState = t.NET_STATE_CONNECTED, n._status = { OPENIM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 }, AVCHATROOM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 } };var i = n.tim.innerEmitter;return i.on(Xn, n._onGetLongPollIDFailed, g(n)), i.on(Qn, n._onOpenIMResponseOK, g(n)), i.on(Jn, n._onOpenIMRequestFailed, g(n)), i.on(fr, n._onAVChatroomResponseOK, g(n)), i.on(dr, n._onAVChatroomRequestFailed, g(n)), n;}return i(s, [{ key: "_onGetLongPollIDFailed", value: function value() {this._currentState !== t.NET_STATE_DISCONNECTED && this._emitNetStateChangeEvent(t.NET_STATE_DISCONNECTED);} }, { key: "_onOpenIMResponseOK", value: function value() {this._onResponseOK("OPENIM");} }, { key: "_onOpenIMRequestFailed", value: function value() {this._onRequestFailed("OPENIM");} }, { key: "_onAVChatroomResponseOK", value: function value() {this.isLoggedIn() || this._onResponseOK("AVCHATROOM");} }, { key: "_onAVChatroomRequestFailed", value: function value() {this.isLoggedIn() || this._onRequestFailed("AVCHATROOM");} }, { key: "_onResponseOK", value: function value(e) {var n = this._status[e],r = Date.now();if (0 !== n.lastResponseReceivedTime) {var o = r - n.lastResponseReceivedTime;if (J.debug("StatusController._onResponseOK key=".concat(e, " currentState=").concat(this._currentState, " interval=").concat(o, " failedCount=").concat(n.failedCount, " jitterCount=").concat(n.jitterCount)), n.failedCount > 0 && (n.failedCount = 0, n.jitterCount += 1, this._currentState !== t.NET_STATE_CONNECTED && this._emitNetStateChangeEvent(t.NET_STATE_CONNECTED)), o <= this.REALTIME_MESSAGE_TIMEOUT) {if (n.jitterCount >= 3) {var i = new Br();i.setMethod(bo).setStart(), i.setCode(0).setText("".concat(e, "-").concat(o, "-").concat(n.jitterCount)).setNetworkType(this.getNetworkType()).setEnd(), n.jitterCount = 0;}} else if (o >= this.REALTIME_MESSAGE_TIMEOUT && o < this.LONGPOLLING_ID_TIMEOUT) {var s = new Br();s.setMethod(Uo).setStart(), s.setCode(0).setText("".concat(e, "-").concat(o)).setNetworkType(this.getNetworkType()).setEnd(), J.warn("StatusController._onResponseOK, fast start. key=".concat(e, " interval=").concat(o, " ms")), this.emitInnerEvent(Zn);} else if (o >= this.LONGPOLLING_ID_TIMEOUT) {var a = new Br();a.setMethod(qo).setStart(), a.setCode(0).setText("".concat(e, "-").concat(o)).setNetworkType(this.getNetworkType()).setEnd(), J.warn("StatusController._onResponseOK, slow start. key=".concat(e, " interval=").concat(o, " ms")), this.emitInnerEvent(er);}n.lastResponseReceivedTime = r;} else n.lastResponseReceivedTime = r;} }, { key: "_onRequestFailed", value: function value(e) {var n = this,r = this._status[e];Date.now() - r.lastResponseReceivedTime >= this.LONGPOLLING_ID_TIMEOUT ? this._currentState !== t.NET_STATE_DISCONNECTED && (J.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable more than 5min. key=".concat(e, " networkType=").concat(this.getNetworkType())), this._emitNetStateChangeEvent(t.NET_STATE_DISCONNECTED)) : (r.failedCount += 1, r.failedCount > 5 ? this.probeNetwork().then(function (o) {var i = y(o, 2),s = i[0],a = i[1];s ? (n._currentState !== t.NET_STATE_CONNECTING && n._emitNetStateChangeEvent(t.NET_STATE_CONNECTING), J.warn("StatusController._onRequestFailed, connecting, network jitter. key=".concat(e, " networkType=").concat(a))) : (n._currentState !== t.NET_STATE_DISCONNECTED && n._emitNetStateChangeEvent(t.NET_STATE_DISCONNECTED), J.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable. key=".concat(e, " networkType=").concat(a))), r.failedCount = 0, r.jitterCount = 0;}) : this._currentState === t.NET_STATE_CONNECTED && this._emitNetStateChangeEvent(t.NET_STATE_CONNECTING));} }, { key: "_emitNetStateChangeEvent", value: function value(t) {J.log("StatusController._emitNetStateChangeEvent net state changed from ".concat(this._currentState, " to ").concat(t)), this._currentState = t, this.emitOuterEvent(e.NET_STATE_CHANGE, { state: t });} }, { key: "reset", value: function value() {J.log("StatusController.reset"), this._currentState = t.NET_STATE_CONNECTED, this._status = { OPENIM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 }, AVCHATROOM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 } };} }]), s;}(Pr);function Fa() {return null;}var Va = function () {function e(t) {r(this, e), this.tim = t, this.isWX = N, this.storageQueue = new Map(), this.checkTimes = 0, this.checkTimer = setInterval(this._onCheckTimer.bind(this), 1e3), this._errorTolerantHandle();}return i(e, [{ key: "_errorTolerantHandle", value: function value() {!this.isWX && oe(window.localStorage) && (this.getItem = Fa, this.setItem = Fa, this.removeItem = Fa, this.clear = Fa);} }, { key: "_onCheckTimer", value: function value() {if (this.checkTimes++, this.checkTimes % 20 == 0) {if (0 === this.storageQueue.size) return;this._doFlush();}} }, { key: "_doFlush", value: function value() {try {var e,t = C(this.storageQueue);try {for (t.s(); !(e = t.n()).done;) {var n = y(e.value, 2),r = n[0],o = n[1];this.isWX ? wx.setStorageSync(this._getKey(r), o) : localStorage.setItem(this._getKey(r), JSON.stringify(o));}} catch (i) {t.e(i);} finally {t.f();}this.storageQueue.clear();} catch (s) {J.warn("Storage._doFlush error", s);}} }, { key: "_getPrefix", value: function value() {var e = this.tim.loginInfo,t = e.SDKAppID,n = e.identifier;return "TIM_".concat(t, "_").concat(n, "_");} }, { key: "getItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;return this.isWX ? wx.getStorageSync(n) : JSON.parse(localStorage.getItem(n));} catch (r) {J.warn("Storage.getItem error:", r);}} }, { key: "setItem", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];if (n) {var o = r ? this._getKey(e) : e;this.isWX ? wx.setStorageSync(o, t) : localStorage.setItem(o, JSON.stringify(t));} else this.storageQueue.set(e, t);} }, { key: "clear", value: function value() {try {this.isWX ? wx.clearStorageSync() : localStorage.clear();} catch (e) {J.warn("Storage.clear error:", e);}} }, { key: "removeItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;this.isWX ? wx.removeStorageSync(n) : localStorage.removeItem(n);} catch (r) {J.warn("Storage.removeItem error:", r);}} }, { key: "getSize", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";try {var r = { size: 0, limitSize: 5242880, unit: n };if (Object.defineProperty(r, "leftSize", { enumerable: !0, get: function get() {return r.limitSize - r.size;} }), this.isWX && (r.limitSize = 1024 * wx.getStorageInfoSync().limitSize), e) r.size = JSON.stringify(this.getItem(e)).length + this._getKey(e).length;else if (this.isWX) {var o = wx.getStorageInfoSync(),i = o.keys;i.forEach(function (e) {r.size += JSON.stringify(wx.getStorageSync(e)).length + t._getKey(e).length;});} else for (var s in localStorage) {localStorage.hasOwnProperty(s) && (r.size += localStorage.getItem(s).length + s.length);}return this._convertUnit(r);} catch (a) {J.warn("Storage.getSize error:", a);}} }, { key: "_convertUnit", value: function value(e) {var t = {},n = e.unit;for (var r in t.unit = n, e) {"number" == typeof e[r] && ("kb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024) : "mb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024 / 1024) : t[r] = e[r]);}return t;} }, { key: "_getKey", value: function value(e) {return "".concat(this._getPrefix()).concat(e);} }, { key: "reset", value: function value() {this._doFlush(), this.checkTimes = 0;} }]), e;}(),Ka = T(function (e) {var t = Object.prototype.hasOwnProperty,n = "~";function r() {}function o(e, t, n) {this.fn = e, this.context = t, this.once = n || !1;}function i(e, t, r, i, s) {if ("function" != typeof r) throw new TypeError("The listener must be a function");var a = new o(r, i || e, s),u = n ? n + t : t;return e._events[u] ? e._events[u].fn ? e._events[u] = [e._events[u], a] : e._events[u].push(a) : (e._events[u] = a, e._eventsCount++), e;}function s(e, t) {0 == --e._eventsCount ? e._events = new r() : delete e._events[t];}function a() {this._events = new r(), this._eventsCount = 0;}Object.create && (r.prototype = Object.create(null), new r().__proto__ || (n = !1)), a.prototype.eventNames = function () {var e,r,o = [];if (0 === this._eventsCount) return o;for (r in e = this._events) {t.call(e, r) && o.push(n ? r.slice(1) : r);}return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o;}, a.prototype.listeners = function (e) {var t = n ? n + e : e,r = this._events[t];if (!r) return [];if (r.fn) return [r.fn];for (var o = 0, i = r.length, s = new Array(i); o < i; o++) {s[o] = r[o].fn;}return s;}, a.prototype.listenerCount = function (e) {var t = n ? n + e : e,r = this._events[t];return r ? r.fn ? 1 : r.length : 0;}, a.prototype.emit = function (e, t, r, o, i, s) {var a = n ? n + e : e;if (!this._events[a]) return !1;var u,c,l = this._events[a],p = arguments.length;if (l.fn) {switch (l.once && this.removeListener(e, l.fn, void 0, !0), p) {case 1:return l.fn.call(l.context), !0;case 2:return l.fn.call(l.context, t), !0;case 3:return l.fn.call(l.context, t, r), !0;case 4:return l.fn.call(l.context, t, r, o), !0;case 5:return l.fn.call(l.context, t, r, o, i), !0;case 6:return l.fn.call(l.context, t, r, o, i, s), !0;}for (c = 1, u = new Array(p - 1); c < p; c++) {u[c - 1] = arguments[c];}l.fn.apply(l.context, u);} else {var h,d = l.length;for (c = 0; c < d; c++) {switch (l[c].once && this.removeListener(e, l[c].fn, void 0, !0), p) {case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context, t);break;case 3:l[c].fn.call(l[c].context, t, r);break;case 4:l[c].fn.call(l[c].context, t, r, o);break;default:if (!u) for (h = 1, u = new Array(p - 1); h < p; h++) {u[h - 1] = arguments[h];}l[c].fn.apply(l[c].context, u);}}}return !0;}, a.prototype.on = function (e, t, n) {return i(this, e, t, n, !1);}, a.prototype.once = function (e, t, n) {return i(this, e, t, n, !0);}, a.prototype.removeListener = function (e, t, r, o) {var i = n ? n + e : e;if (!this._events[i]) return this;if (!t) return s(this, i), this;var a = this._events[i];if (a.fn) a.fn !== t || o && !a.once || r && a.context !== r || s(this, i);else {for (var u = 0, c = [], l = a.length; u < l; u++) {(a[u].fn !== t || o && !a[u].once || r && a[u].context !== r) && c.push(a[u]);}c.length ? this._events[i] = 1 === c.length ? c[0] : c : s(this, i);}return this;}, a.prototype.removeAllListeners = function (e) {var t;return e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new r(), this._eventsCount = 0), this;}, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a;}),Ba = function Ba(e) {var t, n, r, o, i;return Oe(e.context) ? (t = "", n = 0, r = 0, o = 0, i = 1) : (t = e.context.a2Key, n = e.context.tinyID, r = e.context.SDKAppID, o = e.context.contentType, i = e.context.apn), { platform: Ln, websdkappid: Nn, v: On, a2: t, tinyid: n, sdkappid: r, contentType: o, apn: i, reqtime: function reqtime() {return +new Date();} };},Ha = function () {function e(t) {r(this, e), this.tim = t, this.tim.innerEmitter.on(Un, this._update, this), this.tim.innerEmitter.on(qn, this._update, this), this.tim.innerEmitter.on(Fn, this._updateSpecifiedConfig, this), this._initConfig();}return i(e, [{ key: "_update", value: function value(e) {this._initConfig();} }, { key: "_updateSpecifiedConfig", value: function value(e) {var t = this;e.data.forEach(function (e) {t._set(e);});} }, { key: "get", value: function value(e) {var t = e.name,r = e.action,o = e.param,i = e.tjgID;if (oe(this.config[t]) || oe(this.config[t][r])) throw new ht({ code: dt.NETWORK_PACKAGE_UNDEFINED, message: "".concat(hn, ": PackageConfig.").concat(t) });var s = function e(t) {if (0 === Object.getOwnPropertyNames(t).length) return Object.create(null);var r = Array.isArray(t) ? [] : Object.create(null),o = "";for (var i in t) {null !== t[i] ? void 0 !== t[i] ? (o = n(t[i]), ["string", "number", "function", "boolean"].indexOf(o) >= 0 ? r[i] = t[i] : r[i] = e(t[i])) : r[i] = void 0 : r[i] = null;}return r;}(this.config[t][r]);return s.requestData = this._initRequestData(o, s), s.encode = this._initEncoder(s), s.decode = this._initDecoder(s), i && (s.queryString.tjg_id = i), s;} }, { key: "_set", value: function value(e) {var t = e.key,r = e.value;if (!1 != !!t) {var o = t.split(".");if (!(o.length <= 0)) {!function e(t, r, o, i) {var s = r[o];"object" === n(t[s]) ? e(t[s], r, o + 1, i) : t[s] = i;}(this.config, o, 0, r);}}} }, { key: "_initConfig", value: function value() {var e;this.config = {}, this.config.accessLayer = (e = this.tim, { create: null, query: { serverName: Gn.NAME.WEB_IM, cmd: Gn.CMD.ACCESS_LAYER, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: { platform: Ln, identifier: e.context.identifier, usersig: e.context.userSig, contentType: e.context.contentType, apn: null !== e.context ? e.context.apn : 1, websdkappid: Nn, v: On }, requestData: {} }, update: null, delete: null }), this.config.login = function (e) {return { create: null, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.LOGIN, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: { websdkappid: Nn, v: On, platform: Ln, identifier: e.loginInfo.identifier, usersig: e.loginInfo.userSig, sdkappid: e.loginInfo.SDKAppID, accounttype: e.loginInfo.accountType, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: +new Date() / 1e3 }, requestData: { state: "Online" }, keyMaps: { request: { tinyID: "tinyId" }, response: { TinyId: "tinyID" } } }, update: null, delete: null };}(this.tim), this.config.logout = function (e) {return { create: null, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.LOGOUT_ALL, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: { websdkappid: Nn, v: On, platform: Ln, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : "", sdkappid: null !== e.loginInfo ? e.loginInfo.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : "", reqtime: +new Date() / 1e3 }, requestData: {} }, update: null, delete: null };}(this.tim), this.config.longPollLogout = function (e) {return { create: null, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.LOGOUT_LONG_POLL, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: { websdkappid: Nn, v: On, platform: Ln, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return Date.now();} }, requestData: { longPollID: "" }, keyMaps: { request: { longPollID: "LongPollingId" } } }, update: null, delete: null };}(this.tim), this.config.profile = function (e) {var t = Ba(e),n = Gn.NAME.PROFILE,r = Gn.CHANNEL.XHR,o = Pn;return { query: { serverName: n, cmd: Gn.CMD.PORTRAIT_GET, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", userItem: [] }, keyMaps: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } }, update: { serverName: n, cmd: Gn.CMD.PORTRAIT_SET, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", profileItem: [{ tag: et.NICK, value: "" }, { tag: et.GENDER, value: "" }, { tag: et.ALLOWTYPE, value: "" }, { tag: et.AVATAR, value: "" }] } } };}(this.tim), this.config.group = function (e) {var n = { websdkappid: Nn, v: On, platform: Ln, a2: null !== e.context && e.context.a2Key ? e.context.a2Key : void 0, tinyid: null !== e.context && e.context.tinyID ? e.context.tinyID : void 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.context.accountType : 0 },r = { request: { ownerID: "Owner_Account", userID: "Member_Account", newOwnerID: "NewOwner_Account", maxMemberNum: "MaxMemberCount", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", groupCustomFieldFilter: "AppDefinedDataFilter_Group", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember", messageRemindType: "MsgFlag", userIDList: "MemberList", groupIDList: "GroupIdList", applyMessage: "ApplyMsg", muteTime: "ShutUpTime", muteAllMembers: "ShutUpAllMember", joinOption: "ApplyJoinOption" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType", AppDefinedData: "groupCustomField", AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_Group: "groupCustomFieldFilter", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", InfoSeq: "infoSequence", MemberList: "members", GroupInfo: "groups", ShutUpUntil: "muteUntil", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } };return { create: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.CREATE_GROUP, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { type: t.GRP_WORK, name: void 0, groupID: void 0, ownerID: e.loginInfo.identifier, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, memberList: void 0, groupCustomField: void 0 }, keyMaps: r }, list: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.GET_JOINED_GROUPS, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { userID: e.loginInfo.identifier, limit: void 0, offset: void 0, groupType: void 0, responseFilter: void 0 }, keyMaps: r }, query: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.GET_GROUP_INFO, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupIDList: void 0, responseFilter: void 0 }, keyMaps: r }, getGroupMemberProfile: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.GET_GROUP_MEMBER_INFO, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, userIDList: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMaps: { request: u({}, r.request, { userIDList: "Member_List_Account" }), response: r.response } }, getGroupMemberList: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.GET_GROUP_MEMBER_LIST, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, limit: 0, offset: 0, memberRoleFilter: void 0, memberInfoFilter: void 0 }, keyMaps: r }, quitGroup: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.QUIT_GROUP, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0 } }, changeGroupOwner: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.CHANGE_GROUP_OWNER, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, newOwnerID: void 0 }, keyMaps: r }, destroyGroup: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.DESTROY_GROUP, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0 } }, updateGroupProfile: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.MODIFY_GROUP_INFO, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, name: void 0, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, groupCustomField: void 0, muteAllMembers: void 0 }, keyMaps: { request: u({}, r.request, { groupCustomField: "AppDefinedData" }), response: r.response } }, modifyGroupMemberInfo: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.MODIFY_GROUP_MEMBER_INFO, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, userID: void 0, messageRemindType: void 0, nameCard: void 0, role: void 0, memberCustomField: void 0, muteTime: void 0 }, keyMaps: r }, addGroupMember: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.ADD_GROUP_MEMBER, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, silence: void 0, userIDList: void 0 }, keyMaps: r }, deleteGroupMember: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.DELETE_GROUP_MEMBER, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, userIDList: void 0, reason: void 0 }, keyMaps: { request: { userIDList: "MemberToDel_Account" } } }, searchGroupByID: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.SEARCH_GROUP_BY_ID, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupIDList: void 0, responseFilter: { groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption"] } }, keyMaps: { request: { groupIDList: "GroupIdList" } } }, applyJoinGroup: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.APPLY_JOIN_GROUP, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0 }, keyMaps: r }, applyJoinAVChatRoom: { serverName: Gn.NAME.BIG_GROUP_NO_AUTH, cmd: Gn.CMD.APPLY_JOIN_GROUP, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: { websdkappid: Nn, v: On, platform: Ln, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.context.accountType : 0 }, requestData: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0 }, keyMaps: r }, handleApplyJoinGroup: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.HANDLE_APPLY_JOIN_GROUP, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { groupID: void 0, applicant: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMaps: { request: { applicant: "Applicant_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" }, response: { MsgKey: "messageKey" } } }, deleteGroupSystemNotice: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.DELETE_GROUP_SYSTEM_MESSAGE, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { messageListToDelete: void 0 }, keyMaps: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } }, getGroupPendency: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.GET_GROUP_PENDENCY, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: n, requestData: { startTime: void 0, limit: void 0, handleAccount: void 0 }, keyMaps: { request: { handleAccount: "Handle_Account" } } } };}(this.tim), this.config.longPollID = function (e) {return { create: {}, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.GET_LONG_POLL_ID, channel: Gn.CHANNEL.XHR, protocol: Pn, queryString: { websdkappid: Nn, v: On, platform: Ln, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: +new Date() / 1e3 }, requestData: {}, keyMaps: { response: { LongPollingId: "longPollingID" } } }, update: {}, delete: {} };}(this.tim), this.config.longPoll = function (e) {var t = { websdkappid: Nn, v: On, platform: Ln, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.loginInfo.accountType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: Math.ceil(+new Date() / 1e3) };return { create: {}, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.LONG_POLL, channel: Gn.CHANNEL.AUTO, protocol: Pn, queryString: t, requestData: { timeout: null, cookie: { notifySeq: 0, noticeSeq: 0, longPollingID: 0 } }, keyMaps: { response: { C2cMsgArray: "C2CMessageArray", GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", C2cNotifyMsgArray: "C2CNotifyMessageArray", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension" } } }, update: {}, delete: {} };}(this.tim), this.config.applyC2C = function (e) {var t = Ba(e),n = Gn.NAME.FRIEND,r = Gn.CHANNEL.XHR,o = Pn;return { create: { serverName: n, cmd: Gn.CMD.FRIEND_ADD, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", addFriendItem: [] } }, get: { serverName: n, cmd: Gn.CMD.GET_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", pendencyType: "Pendency_Type_ComeIn" } }, update: { serverName: n, cmd: Gn.CMD.RESPONSE_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", responseFriendItem: [] } }, delete: { serverName: n, cmd: Gn.CMD.DELETE_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", toAccount: [], pendencyType: "Pendency_Type_ComeIn" } } };}(this.tim), this.config.friend = function (e) {var t = Ba(e),n = Gn.NAME.FRIEND,r = Gn.CHANNEL.XHR,o = Pn;return { get: { serverName: n, cmd: Gn.CMD.FRIEND_GET_ALL, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", timeStamp: 0, tagList: [et.NICK, "Tag_SNS_IM_Remark", et.AVATAR] }, keyMaps: { request: {}, response: {} } }, delete: { serverName: n, cmd: Gn.CMD.FRIEND_DELETE, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [], deleteType: "Delete_Type_Single" } } };}(this.tim), this.config.blacklist = function (e) {var t = Ba(e);return { create: { serverName: Gn.NAME.FRIEND, cmd: Gn.CMD.ADD_BLACKLIST, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [] } }, get: { serverName: Gn.NAME.FRIEND, cmd: Gn.CMD.GET_BLACKLIST, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: "", startIndex: 0, maxLimited: 30, lastSequence: 0 } }, delete: { serverName: Gn.NAME.FRIEND, cmd: Gn.CMD.DELETE_BLACKLIST, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [] } }, update: {} };}(this.tim), this.config.c2cMessage = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} },n = { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", count: "MaxCnt", lastMessageTime: "LastMsgTime", messageKey: "MsgKey", peerAccount: "Peer_Account", data: "Data", description: "Desc", extension: "Ext", type: "MsgType", content: "MsgContent", sizeType: "Type", uuid: "UUID", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag" }, response: { MsgContent: "content", MsgTime: "time", Data: "data", Desc: "description", Ext: "extension", MsgKey: "messageKey", MsgType: "type", MsgBody: "elements", Download_Flag: "downloadFlag", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } };return { create: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.SEND_MESSAGE, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, toAccount: "", msgTimeStamp: Math.ceil(+new Date() / 1e3), msgSeq: 0, msgRandom: 0, msgBody: [], msgLifeTime: void 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0 }, androidInfo: { OPPOChannelID: "" } } }, keyMaps: n }, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.GET_C2C_ROAM_MESSAGES, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { peerAccount: "", count: 15, lastMessageTime: 0, messageKey: "", withRecalledMsg: 1 }, keyMaps: n } };}(this.tim), this.config.c2cMessageWillBeRevoked = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { create: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.REVOKE_C2C_MESSAGE, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { msgInfo: { fromAccount: "", toAccount: "", msgTimeStamp: Math.ceil(+new Date() / 1e3), msgSeq: 0, msgRandom: 0 } }, keyMaps: { request: { msgInfo: "MsgInfo", fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody" } } } };}(this.tim), this.config.c2cPeerReadTime = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { get: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.GET_PEER_READ_TIME, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { userIDList: void 0 }, keyMaps: { request: { userIDList: "To_Account" }, response: { ReadTime: "peerReadTimeList" } } } };}(this.tim), this.config.groupMessage = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} },n = { request: { to: "GroupId", extension: "Ext", data: "Data", description: "Desc", random: "Random", sequence: "ReqMsgSeq", count: "ReqMsgNumber", type: "MsgType", priority: "MsgPriority", content: "MsgContent", elements: "MsgBody", sizeType: "Type", uuid: "UUID", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", clientSequence: "ClientSeq" }, response: { Random: "random", MsgTime: "time", MsgSeq: "sequence", ReqMsgSeq: "sequence", RspMsgList: "messageList", IsPlaceMsg: "isPlaceMessage", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgPriority: "priority", MsgBody: "elements", MsgType: "type", MsgContent: "content", IsFinished: "complete", Download_Flag: "downloadFlag", ClientSeq: "clientSequence", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } };return { create: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.SEND_GROUP_MESSAGE, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { groupID: "", fromAccount: e.loginInfo.identifier, random: 0, clientSequence: 0, priority: "", msgBody: [], onlineOnlyFlag: 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0 }, androidInfo: { OPPOChannelID: "" } } }, keyMaps: n }, query: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.GET_GROUP_ROAM_MESSAGES, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { withRecalledMsg: 1, groupID: "", count: 15, sequence: "" }, keyMaps: n }, update: null, delete: null };}(this.tim), this.config.groupMessageWillBeRevoked = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { create: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.REVOKE_GROUP_MESSAGE, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { to: "", msgSeqList: [] }, keyMaps: { request: { to: "GroupId", msgSeqList: "MsgSeqList", msgSeq: "MsgSeq" } } } };}(this.tim), this.config.conversation = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1 };return { query: { serverName: Gn.NAME.RECENT_CONTACT, cmd: Gn.CMD.GET_CONVERSATION_LIST, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, count: 0 }, keyMaps: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq" } } }, pagingQuery: { serverName: Gn.NAME.RECENT_CONTACT, cmd: Gn.CMD.PAGING_GET_CONVERSATION_LIST, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: void 0, timeStamp: void 0, orderType: void 0 }, keyMaps: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq", C2cPeerReadTime: "c2cPeerReadTime" } } }, delete: { serverName: Gn.NAME.RECENT_CONTACT, cmd: Gn.CMD.DELETE_CONVERSATION, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, toAccount: void 0, type: 1, toGroupID: void 0 }, keyMaps: { request: { toGroupID: "ToGroupid" } } }, setC2CMessageRead: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.SET_C2C_MESSAGE_READ, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { C2CMsgReaded: void 0 }, keyMaps: { request: { lastMessageTime: "LastedMsgTime" } } }, setGroupMessageRead: { serverName: Gn.NAME.GROUP, cmd: Gn.CMD.SET_GROUP_MESSAGE_READ, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { groupID: void 0, messageReadSeq: void 0 }, keyMaps: { request: { messageReadSeq: "MsgReadedSeq" } } } };}(this.tim), this.config.syncMessage = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return [Math.ceil(+new Date()), Math.random()].join("");} };return { create: null, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.GET_MESSAGES, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { cookie: "", syncFlag: 0, needAbstract: 1 }, keyMaps: { request: { fromAccount: "From_Account", toAccount: "To_Account", from: "From_Account", to: "To_Account", time: "MsgTimeStamp", sequence: "MsgSeq", random: "MsgRandom", elements: "MsgBody" }, response: { MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", ClientSeq: "clientSequence", MsgSeq: "sequence", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", ToGroupId: "groupID", MsgKey: "messageKey", GroupTips: "groupTips", MsgBody: "elements", MsgType: "type", C2CRemainingUnreadCount: "C2CRemainingUnreadList" } } }, update: null, delete: null };}(this.tim), this.config.AVChatRoom = function (e) {return { startLongPoll: { serverName: Gn.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH, cmd: Gn.CMD.AVCHATROOM_LONG_POLL, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: { websdkappid: Nn, v: On, platform: Ln, sdkappid: e.loginInfo.SDKAppID, accounttype: "792", apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} }, requestData: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMaps: { request: { USP: "USP" }, response: { ToGroupId: "groupID", MsgPriority: "priority" } } } };}(this.tim), this.config.cosUpload = function (e) {var t = { platform: Ln, websdkappid: Nn, v: On, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return Date.now();} };return { create: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.FILE_UPLOAD, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { appVersion: "2.1", fromAccount: "", toAccount: "", sequence: 0, time: function time() {return Math.ceil(Date.now() / 1e3);}, random: function random() {return me();}, fileStrMd5: "", fileSize: "", serverVer: 1, authKey: "", busiId: 1, pkgFlag: 1, sliceOffset: 0, sliceSize: 0, sliceData: "", contentType: "application/x-www-form-urlencoded" }, keyMaps: { request: {}, response: {} } }, update: null, delete: null };}(this.tim), this.config.cosSig = function (e) {var t = { sdkappid: function sdkappid() {return e.loginInfo.SDKAppID;}, identifier: function identifier() {return e.loginInfo.identifier;}, userSig: function userSig() {return e.context.userSig;} };return { create: null, query: { serverName: Gn.NAME.IM_COS_SIGN, cmd: Gn.CMD.COS_SIGN, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: t, requestData: { cmd: "open_im_cos_svc", subCmd: "get_cos_token", duration: 300, version: 2 }, keyMaps: { request: { userSig: "usersig", subCmd: "sub_cmd", cmd: "cmd", duration: "duration", version: "version" }, response: { expired_time: "expiredTime", bucket_name: "bucketName", session_token: "sessionToken", tmp_secret_id: "secretId", tmp_secret_key: "secretKey" } } }, update: null, delete: null };}(this.tim), this.config.bigDataHallwayAuthKey = function (e) {return { create: null, query: { serverName: Gn.NAME.OPEN_IM, cmd: Gn.CMD.BIG_DATA_HALLWAY_AUTH_KEY, channel: Gn.CHANNEL.XHR, protocol: Pn, method: "POST", queryString: { websdkappid: Nn, v: On, platform: Ln, sdkappid: e.loginInfo.SDKAppID, accounttype: "792", apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} }, requestData: {} } };}(this.tim), this.config.ssoEventStat = function (e) {var t = { sdkappid: e.loginInfo.SDKAppID, reqtime: Math.ceil(+new Date() / 1e3) };return { create: { serverName: Gn.NAME.IM_OPEN_STAT, cmd: Gn.CMD.TIM_WEB_REPORT, channel: Gn.CHANNEL.AUTO, protocol: Pn, queryString: t, requestData: { table: "", report: [] }, keyMaps: { request: { table: "table", report: "report", SDKAppID: "sdkappid", version: "version", tinyID: "tinyid", userID: "userid", platform: "platform", method: "method", time: "time", start: "start", end: "end", cost: "cost", status: "status", codeint: "codeint", message: "message", pointer: "pointer", text: "text", msgType: "msgtype", networkType: "networktype", startts: "startts", endts: "endts", timespan: "timespan" } } }, query: {}, update: {}, delete: {} };}(this.tim), this.config.ssoSumStat = function (e) {var t = null;null !== e.context && (t = { sdkappid: e.context.SDKAppID, reqtime: Math.ceil(+new Date() / 1e3) });return { create: { serverName: Gn.NAME.IM_OPEN_STAT, cmd: Gn.CMD.TIM_WEB_REPORT, channel: Gn.CHANNEL.AUTO, protocol: Pn, queryString: t, requestData: { table: "", report: [] }, keyMaps: { request: { table: "table", report: "report", SDKAppID: "sdkappid", version: "version", tinyID: "tinyid", userID: "userid", item: "item", lpID: "lpid", platform: "platform", networkType: "networktype", total: "total", successRate: "successrate", avg: "avg", timespan: "timespan", time: "time" } } }, query: {}, update: {}, delete: {} };}(this.tim);} }, { key: "_initRequestData", value: function value(e, t) {if (void 0 === e) return Or(t.requestData, this._getRequestMap(t), this.tim);var n = t.requestData,r = Object.create(null);for (var o in n) {if (Object.prototype.hasOwnProperty.call(n, o)) {if (r[o] = "function" == typeof n[o] ? n[o]() : n[o], void 0 === e[o]) continue;r[o] = e[o];}}return r = Or(r, this._getRequestMap(t), this.tim);} }, { key: "_getRequestMap", value: function value(e) {if (e.keyMaps && e.keyMaps.request && Object.keys(e.keyMaps.request).length > 0) return e.keyMaps.request;} }, { key: "_initEncoder", value: function value(e) {switch (e.protocol) {case Pn:return function (e) {if ("string" === n(e)) try {return JSON.parse(e);} catch (t) {return e;}return e;};case wn:return function (e) {return e;};default:return function (e) {return J.warn("PackageConfig._initEncoder(), unknow response type, data: ", JSON.stringify(e)), e;};}} }, { key: "_initDecoder", value: function value(e) {switch (e.protocol) {case Pn:return function (e) {if ("string" === n(e)) try {return JSON.parse(e);} catch (t) {return e;}return e;};case wn:return function (e) {return e;};default:return function (e) {return J.warn("PackageConfig._initDecoder(), unknow response type, data: ", e), e;};}} }]), e;}(),ja = function ja() {for (var e = [], t = Ya(arguments), n = 0; n < arguments.length; n++) {Number.isInteger(arguments[n]) ? e.push(arguments[n]) : e.push(!0 == !!arguments[n] ? "1" : "0");}return e.join(t);},Ya = function Ya(e) {var t = e.length,n = e[t - 1];if ("string" != typeof n) return "";if (n.length > 1) return "";var r = e[t - 1];return delete e[t - 1], e.length -= t === e.length ? 1 : 0, r;},$a = { C2CMessageArray: 1, groupMessageArray: 1, groupTips: 1, C2CNotifyMessageArray: 1, profileModify: 1, friendListMod: 1 },Wa = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this, e))._initialization(), o;}return i(n, [{ key: "_initialization", value: function value() {this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = !1, this._syncMessagesFinished = !1, this._isLongPoll = !1, this._longPollID = 0, this._noticeSequence = 0, this._initializeListener(), this._runLoop = null, this._initShuntChannels();} }, { key: "_initShuntChannels", value: function value() {this._shuntChannels = Object.create(null), this._shuntChannels.C2CMessageArray = this._C2CMessageArrayChannel.bind(this), this._shuntChannels.groupMessageArray = this._groupMessageArrayChannel.bind(this), this._shuntChannels.groupTips = this._groupTipsChannel.bind(this), this._shuntChannels.C2CNotifyMessageArray = this._C2CNotifyMessageArrayChannel.bind(this), this._shuntChannels.profileModify = this._profileModifyChannel.bind(this), this._shuntChannels.friendListMod = this._friendListModChannel.bind(this);} }, { key: "_C2CMessageArrayChannel", value: function value(e, t, n) {this.emitInnerEvent(rr, t);} }, { key: "_groupMessageArrayChannel", value: function value(e, t, n) {this.emitInnerEvent(or, t);} }, { key: "_groupTipsChannel", value: function value(e, t, n) {var r = this;switch (e) {case 4:case 6:this.emitInnerEvent(ir, t);break;case 5:t.forEach(function (e) {re(e.elements.revokedInfos) ? r.emitInnerEvent(lr, t) : r.emitInnerEvent(sr, { groupSystemNotices: t, type: n });});break;default:J.log("NotificationController._groupTipsChannel unknown event=".concat(e, " type=").concat(n), t);}} }, { key: "_C2CNotifyMessageArrayChannel", value: function value(e, t, n) {if (t[0]) {var r = t[0];r.hasOwnProperty("kickoutMsgNotify") ? this.emitInnerEvent(nr) : r.hasOwnProperty("sysCmdMsgNotify") ? this.emitInnerEvent(cr) : r.hasOwnProperty("c2cMessageRevokedNotify") ? this.emitInnerEvent(pr, t) : r.hasOwnProperty("c2cMessageReadReceipt") && this.emitInnerEvent(hr, t);}} }, { key: "_profileModifyChannel", value: function value(e, t, n) {this.emitInnerEvent(ur, t);} }, { key: "_friendListModChannel", value: function value(e, t, n) {this.emitInnerEvent(ar, t);} }, { key: "_dispatchNotice", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "poll";if (re(e)) for (var n = null, r = null, o = "", i = "", s = "", a = 0, u = 0, c = e.length; u < c; u++) {a = (n = e[u]).event, o = Object.keys(n).find(function (e) {return void 0 !== $a[e];}), se(this._shuntChannels[o]) ? (r = n[o], "poll" === t && this._updatenoticeSequence(r), this._shuntChannels[o](a, r, t)) : ("poll" === t && this._updatenoticeSequence(), i = "".concat(dt.NOTICE_RUNLOOP_UNEXPECTED_CONDITION), s = "".concat(gn, ": ").concat(a, ", ").concat(o), this.emitInnerEvent(Ir, new ht({ code: i, message: s, data: { payloadName: o, event: a } })), i = "", s = "");}} }, { key: "getLongPollID", value: function value() {return this._longPollID;} }, { key: "_IAmReady", value: function value() {this.triggerReady();} }, { key: "reset", value: function value() {this._noticeSequence = 0, this._resetSync(), this.closeNoticeChannel();} }, { key: "_resetSync", value: function value() {this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = !1, this._syncMessagesFinished = !1;} }, { key: "_setNoticeSeqInRequestData", value: function value(e) {e.Cookie.NoticeSeq = this._noticeSequence, this.tim.sumStatController.addTotalCount(Kr.LONG_POLLING);} }, { key: "_updatenoticeSequence", value: function value(e) {if (e) {var t = e[e.length - 1].noticeSequence;t && "number" == typeof t ? t <= this._noticeSequence || (this._noticeSequence = t) : this._noticeSequence++;} else this._noticeSequence++;} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(xn, this._startSyncMessages, this), e.on(yr, this.closeNoticeChannel, this), e.on(Zn, this._onFastStart, this);} }, { key: "openNoticeChannel", value: function value() {J.log("NotificationController.openNoticeChannel"), this._getLongPollID();} }, { key: "closeNoticeChannel", value: function value() {J.log("NotificationController.closeNoticeChannel"), (this._runLoop instanceof aa || this._runLoop instanceof ua) && (this._runLoop.abort(), this._runLoop.stop()), this._longPollID = 0, this._isLongPoll = !1;} }, { key: "_getLongPollID", value: function value() {var e = this;if (0 === this._longPollID) {var t = new Br();t.setMethod(Po).setStart(), this.request({ name: "longPollID", action: "query" }).then(function (n) {var r = n.data.longPollingID;e._onGetLongPollIDSuccess(r), t.setCode(0).setText("longPollingID=".concat(r)).setNetworkType(e.getNetworkType()).setEnd();}).catch(function (n) {var r = new ht({ code: n.code || dt.GET_LONGPOLL_ID_FAILED, message: n.message || _n });e.emitInnerEvent(Xn), e.emitInnerEvent(Ir, r), e.probeNetwork().then(function (e) {var n = y(e, 2),o = n[0],i = n[1];t.setError(r, o, i).setEnd();});});} else this._onGetLongPollIDSuccess(this._longPollID);} }, { key: "_onGetLongPollIDSuccess", value: function value(e) {this.emitInnerEvent(Fn, [{ key: "long_poll_logout.query.requestData.longPollingID", value: e }, { key: "longPoll.query.requestData.cookie.longPollingID", value: e }]), this._longPollID = e, this._startLongPoll(), this._IAmReady(), this.tim.sumStatController.recordLongPollingID(this._longPollID);} }, { key: "_startLongPoll", value: function value() {if (!0 !== this._isLongPoll) {J.log("NotificationController._startLongPoll...");var e = this.tim.connectionController,t = this.createTransportCapsule({ name: "longPoll", action: "query" });this._isLongPoll = !0, this._runLoop = e.createRunLoop({ pack: t, before: this._setNoticeSeqInRequestData.bind(this), success: this._onNoticeReceived.bind(this), fail: this._onNoticeFail.bind(this) }), this._runLoop.start();} else J.log("NotificationController._startLongPoll is running...");} }, { key: "_onFastStart", value: function value() {this.closeNoticeChannel(), this.syncMessage();} }, { key: "_onNoticeReceived", value: function value(e) {var t = e.data;if (t.errorCode !== Pe.SUCCESS) {var n = new Br();n.setMethod(Go).setStart(), n.setMessage(t.errorInfo || JSON.stringify(t)).setCode(t.errorCode).setNetworkType(this.getNetworkType()).setEnd(!0), this._onResponseError(t);} else this.emitInnerEvent(Qn);this.tim.sumStatController.addSuccessCount(Kr.LONG_POLLING), this.tim.sumStatController.addCost(Kr.LONG_POLLING, t.timecost), e.data.eventArray && this._dispatchNotice(e.data.eventArray);} }, { key: "_onResponseError", value: function value(e) {switch (e.errorCode) {case dt.LONG_POLL_KICK_OUT:J.warn("NotificationController._onResponseError, longPollingID=".concat(this._longPollID, " was kicked out")), this.emitInnerEvent(tr), this.closeNoticeChannel();break;case dt.MESSAGE_A2KEY_EXPIRED:case dt.ACCOUNT_A2KEY_EXPIRED:this.emitInnerEvent(vr);break;default:oe(e.errorCode) || oe(e.errorInfo) ? J.log("NotificationController._onResponseError, errorCode or errorInfo undefined!", e) : this.emitInnerEvent(Ir, new ht({ code: e.errorCode, message: e.errorInfo }));}} }, { key: "_onNoticeFail", value: function value(e) {if (e.error) if ("ECONNABORTED" === e.error.code || e.error.code === dt.NETWORK_TIMEOUT) {if (e.error.config) {var t = e.error.config.url,n = e.error.config.data;J.log("NotificationController._onNoticeFail request timed out. url=".concat(t, " data=").concat(n));} else J.log("NotificationController._onNoticeFail request timed out.");} else J.log("NotificationController._onNoticeFail request failed due to network error");this.emitInnerEvent(Jn);} }, { key: "_startSyncMessages", value: function value(e) {!0 !== this._syncMessagesFinished && this.syncMessage();} }, { key: "syncMessage", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;this._syncMessagesIsRunning = !0, this.request({ name: "syncMessage", action: "query", param: { cookie: t, syncFlag: n } }).then(function (t) {var n = t.data;switch (ja(n.cookie, n.syncFlag)) {case "00":case "01":e.emitInnerEvent(Ir, { code: dt.NOTICE_RUNLOOP_OFFSET_LOST, message: mn });break;case "10":case "11":n.eventArray && e._dispatchNotice(n.eventArray, "sync"), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), e.emitInnerEvent(Vn, { data: n.messageList, C2CRemainingUnreadList: n.C2CRemainingUnreadList }), e._syncOffset = n.cookie, e.syncMessage(n.cookie, n.syncFlag);break;case "12":n.eventArray && e._dispatchNotice(n.eventArray, "sync"), e.openNoticeChannel(), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), e.emitInnerEvent(Kn, { messageList: n.messageList, C2CRemainingUnreadList: n.C2CRemainingUnreadList }), e._syncOffset = n.cookie, e._syncNoticeList = [], e._syncMessagesIsRunning = !1, e._syncMessagesFinished = !0;}}).catch(function (t) {e._syncMessagesIsRunning = !1, J.error("NotificationController.syncMessage failed. error:", t);});} }]), n;}(Pr),za = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).COSSDK = null, o._cosUploadMethod = null, o.expiredTimeLimit = 300, o.appid = 0, o.bucketName = "", o.ciUrl = "", o.directory = "", o.downloadUrl = "", o.uploadUrl = "", o.expiredTimeOut = o.expiredTimeLimit, o.region = "ap-shanghai", o.cos = null, o.cosOptions = { secretId: "", secretKey: "", sessionToken: "", expiredTime: 0 }, o._timer = 0, o.tim.innerEmitter.on(xn, o._init, g(o)), o.triggerReady(), o;}return i(n, [{ key: "_expiredTimer", value: function value() {var e = this;this._timer = setInterval(function () {Math.ceil(Date.now() / 1e3) >= e.cosOptions.expiredTime - 60 && (e._getAuthorizationKey(), clearInterval(e._timer));}, 3e4);} }, { key: "_init", value: function value() {var e = N ? "cos-wx-sdk" : "cos-js-sdk";this.COSSDK = this.tim.getPlugin(e), this.COSSDK ? this._getAuthorizationKey() : J.warn("UploadController._init 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin");} }, { key: "_getAuthorizationKey", value: function value() {var e = this,t = Math.ceil(Date.now() / 1e3),n = new Br();n.setMethod(Jr).setStart(), this.request({ name: "cosSig", action: "query", param: { duration: this.expiredTimeLimit } }).then(function (r) {J.log("UploadController._getAuthorizationKey ok. data:", r.data);var o = r.data,i = o.expiredTime - t;n.setCode(0).setText("timeout=".concat(i, "s")).setNetworkType(e.getNetworkType()).setEnd(), e.appid = o.appid, e.bucketName = o.bucketName, e.ciUrl = o.ciUrl, e.directory = o.directory, e.downloadUrl = o.downloadUrl, e.uploadUrl = o.uploadUrl, e.expiredTimeOut = i, e.cosOptions = { secretId: o.secretId, secretKey: o.secretKey, sessionToken: o.sessionToken, expiredTime: o.expiredTime }, e._initUploaderMethod(), e._expiredTimer();}).catch(function (t) {e.probeNetwork().then(function (n) {var r = y(n, 2),o = r[0],i = r[1];e.setError(t, o, i).setEnd();}), J.warn("UploadController._getAuthorizationKey failed. error:", t);});} }, { key: "_initUploaderMethod", value: function value() {var e = this;this.appid && (this.cos = N ? new this.COSSDK({ ForcePathStyle: !0, getAuthorization: this._getAuthorization.bind(this) }) : new this.COSSDK({ getAuthorization: this._getAuthorization.bind(this) }), this._cosUploadMethod = N ? function (t, n) {e.cos.postObject(t, n);} : function (t, n) {e.cos.uploadFiles(t, n);});} }, { key: "_getAuthorization", value: function value(e, t) {t({ TmpSecretId: this.cosOptions.secretId, TmpSecretKey: this.cosOptions.secretKey, XCosSecurityToken: this.cosOptions.sessionToken, ExpiredTime: this.cosOptions.expiredTime });} }, { key: "uploadImage", value: function value(e) {if (!e.file) return Vr(new ht({ code: dt.MESSAGE_IMAGE_SELECT_FILE_FIRST, message: kt }));var t = this._checkImageType(e.file);if (!0 !== t) return t;var n = this._checkImageMime(e.file);if (!0 !== n) return n;var r = this._checkImageSize(e.file);return !0 !== r ? r : this.upload(e);} }, { key: "_checkImageType", value: function value(e) {var t = "";return t = N ? e.url.slice(e.url.lastIndexOf(".") + 1) : e.files[0].name.slice(e.files[0].name.lastIndexOf(".") + 1), vn.indexOf(t.toLowerCase()) >= 0 || Vr(new ht({ coe: dt.MESSAGE_IMAGE_TYPES_LIMIT, message: Rt }));} }, { key: "_checkImageMime", value: function value(e) {return !0;} }, { key: "_checkImageSize", value: function value(e) {var t = 0;return 0 === (t = N ? e.size : e.files[0].size) ? Vr(new ht({ code: dt.MESSAGE_FILE_IS_EMPTY, message: "".concat(Tt) })) : t < 20971520 || Vr(new ht({ coe: dt.MESSAGE_IMAGE_SIZE_LIMIT, message: "".concat(Ot) }));} }, { key: "uploadFile", value: function value(e) {var t = null;return e.file ? e.file.files[0].size > 104857600 ? (t = new ht({ code: dt.MESSAGE_FILE_SIZE_LIMIT, message: qt }), Vr(t)) : 0 === e.file.files[0].size ? (t = new ht({ code: dt.MESSAGE_FILE_IS_EMPTY, message: "".concat(Tt) }), Vr(t)) : this.upload(e) : (t = new ht({ code: dt.MESSAGE_FILE_SELECT_FILE_FIRST, message: Ut }), Vr(t));} }, { key: "uploadVideo", value: function value(e) {return e.file.videoFile.size > 104857600 ? Vr(new ht({ code: dt.MESSAGE_VIDEO_SIZE_LIMIT, message: "".concat(Pt) })) : 0 === e.file.videoFile.size ? Vr(new ht({ code: dt.MESSAGE_FILE_IS_EMPTY, message: "".concat(Tt) })) : -1 === In.indexOf(e.file.videoFile.type) ? Vr(new ht({ code: dt.MESSAGE_VIDEO_TYPES_LIMIT, message: "".concat(Gt) })) : N ? this.handleVideoUpload({ file: e.file.videoFile }) : O ? this.handleVideoUpload(e) : void 0;} }, { key: "handleVideoUpload", value: function value(e) {var t = this;return new Promise(function (n, r) {t.upload(e).then(function (e) {n(e);}).catch(function () {t.upload(e).then(function (e) {n(e);}).catch(function () {r(new ht({ code: dt.MESSAGE_VIDEO_UPLOAD_FAIL, message: wt }));});});});} }, { key: "uploadAudio", value: function value(e) {return e.file ? e.file.size > 20971520 ? Vr(new ht({ code: dt.MESSAGE_AUDIO_SIZE_LIMIT, message: "".concat(Lt) })) : 0 === e.file.size ? Vr(new ht({ code: dt.MESSAGE_FILE_IS_EMPTY, message: "".concat(Tt) })) : this.upload(e) : Vr(new ht({ code: dt.MESSAGE_AUDIO_UPLOAD_FAIL, message: Nt }));} }, { key: "upload", value: function value(e) {var t = this;if (!se(this._cosUploadMethod)) return J.warn("UploadController.upload 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin"), Vr(new ht({ code: dt.COS_UNDETECTED, message: It }));var n = new Br();n.setMethod(Qr).setStart(), J.time(Kr.UPLOAD);var r = N ? e.file : e.file.files[0];return new Promise(function (o, i) {var s = N ? t._createCosOptionsWXMiniApp(e) : t._createCosOptionsWeb(e),a = t;t._cosUploadMethod(s, function (e, s) {var u = Object.create(null);if (s) {if (e || re(s.files) && s.files[0].error) {var c = new ht({ code: dt.MESSAGE_FILE_UPLOAD_FAIL, message: bt });return n.setError(c, !0, t.getNetworkType()).setEnd(), J.log("UploadController.upload failed, error:", s.files[0].error), 403 === s.files[0].error.statusCode && (J.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"), t._getAuthorizationKey()), void i(c);}u.fileName = r.name, u.fileSize = r.size, u.fileType = r.type.slice(r.type.indexOf("/") + 1).toLowerCase(), u.location = N ? s.Location : s.files[0].data.Location;var l = J.timeEnd(Kr.UPLOAD),p = a._formatFileSize(r.size),h = a._formatSpeed(1e3 * r.size / l),d = "size=".concat(p, ",time=").concat(l, "ms,speed=").concat(h);return J.log("UploadController.upload success name=".concat(r.name, ",").concat(d)), o(u), void n.setCode(0).setNetworkType(t.getNetworkType()).setText(d).setEnd();}var f = new ht({ code: dt.MESSAGE_FILE_UPLOAD_FAIL, message: bt });n.setError(f, !0, a.getNetworkType()).setEnd(), J.warn("UploadController.upload failed, error:", e), 403 === e.statusCode && (J.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"), t._getAuthorizationKey()), i(f);});});} }, { key: "_formatFileSize", value: function value(e) {return e < 1024 ? e + "B" : e < 1048576 ? Math.floor(e / 1024) + "KB" : Math.floor(e / 1048576) + "MB";} }, { key: "_formatSpeed", value: function value(e) {return e <= 1048576 ? (e / 1024).toFixed(1) + "KB/s" : (e / 1048576).toFixed(1) + "MB/s";} }, { key: "_createCosOptionsWeb", value: function value(e) {var t = this.tim.context.identifier,n = this._genFileName(t, e.to, e.file.files[0].name);return { files: [{ Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), Body: e.file.files[0] }], SliceSize: 1048576, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {J.warn("onProgress callback error:", n), J.error(n);}}, onFileFinish: function onFileFinish(e, t, n) {} };} }, { key: "_createCosOptionsWXMiniApp", value: function value(e) {var t = this.tim.context.identifier,n = this._genFileName(t, e.to, e.file.name),r = e.file.url;return { Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), FilePath: r, onProgress: function onProgress(t) {if (J.log(JSON.stringify(t)), "function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {J.warn("onProgress callback error:", n), J.error(n);}} };} }, { key: "_genFileName", value: function value(e, t, n) {return "".concat(e, "-").concat(t, "-").concat(me(99999), "-").concat(n);} }, { key: "reset", value: function value() {this._timer && (clearInterval(this._timer), this._timer = 0);} }]), n;}(Pr),Xa = function (e) {c(o, e);var n = _(o);function o(e) {var t;return r(this, o), (t = n.call(this, e)).FILETYPE = { SOUND: 2106, FILE: 2107, VIDEO: 2113 }, t._bdh_download_server = "grouptalk.c2c.qq.com", t._BDHBizID = 10001, t._authKey = "", t._expireTime = 0, t.tim.innerEmitter.on(xn, t._getAuthKey, g(t)), t;}return i(o, [{ key: "_getAuthKey", value: function value() {var e = this;this.request({ name: "bigDataHallwayAuthKey", action: "query" }).then(function (t) {t.data.authKey && (e._authKey = t.data.authKey, e._expireTime = parseInt(t.data.expireTime));});} }, { key: "_isFromOlderVersion", value: function value(e) {return 2 !== e.content.downloadFlag;} }, { key: "parseElements", value: function value(e, t) {if (!re(e) || !t) return [];for (var n = [], r = null, o = 0; o < e.length; o++) {r = e[o], this._needParse(r) ? n.push(this._parseElement(r, t)) : n.push(e[o]);}return n;} }, { key: "_needParse", value: function value(e) {return !(!this._isFromOlderVersion(e) || e.type !== t.MSG_AUDIO && e.type !== t.MSG_FILE && e.type !== t.MSG_VIDEO);} }, { key: "_parseElement", value: function value(e, n) {switch (e.type) {case t.MSG_AUDIO:return this._parseAudioElement(e, n);case t.MSG_FILE:return this._parseFileElement(e, n);case t.MSG_VIDEO:return this._parseVideoElement(e, n);}} }, { key: "_parseAudioElement", value: function value(e, t) {return e.content.url = this._genAudioUrl(e.content.uuid, t), e;} }, { key: "_parseFileElement", value: function value(e, t) {return e.content.url = this._genFileUrl(e.content.uuid, t, e.content.fileName), e;} }, { key: "_parseVideoElement", value: function value(e, t) {return e.content.url = this._genVideoUrl(e.content.uuid, t), e;} }, { key: "_genAudioUrl", value: function value(e, t) {return "" === this._authKey ? (J.warn("BigDataHallwayController._genAudioUrl no authKey!"), "") : "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.SOUND, "&openid=").concat(t, "&ver=0");} }, { key: "_genFileUrl", value: function value(e, t, n) {return "" === this._authKey ? (J.warn("BigDataHallwayController._genFileUrl no authKey!"), "") : (n || (n = "".concat(Math.floor(1e5 * Math.random()), "-").concat(Date.now())), "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.FILE, "&openid=").concat(t, "&ver=0&filename=").concat(encodeURIComponent(n)));} }, { key: "_genVideoUrl", value: function value(e, t) {return "" === this._authKey ? (J.warn("BigDataHallwayController._genVideoUrl no authKey!"), "") : "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.VIDEO, "&openid=").concat(t, "&ver=0");} }, { key: "reset", value: function value() {this._authKey = "", this.expireTime = 0;} }]), o;}(Pr),Ja = { app_id: "", event_id: "", api_base: "https://pingtas.qq.com/pingd", prefix: "_mta_", version: "1.3.9", stat_share_app: !1, stat_pull_down_fresh: !1, stat_reach_bottom: !1, stat_param: !0 };function Qa() {try {var e = "s" + Za();return wx.setStorageSync(Ja.prefix + "ssid", e), e;} catch (t) {}}function Za(e) {for (var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], n = 10; 1 < n; n--) {var r = Math.floor(10 * Math.random()),o = t[r];t[r] = t[n - 1], t[n - 1] = o;}for (n = r = 0; 5 > n; n++) {r = 10 * r + t[n];}return (e || "") + (r + "") + +new Date();}function eu() {try {var e = getCurrentPages(),t = "/";return 0 < e.length && (t = e.pop().__route__), t;} catch (n) {console.log("get current page path error:" + n);}}function tu() {var e,t = { dm: "wechat.apps.xx", url: encodeURIComponent(eu() + ou(iu.Data.pageQuery)), pvi: "", si: "", ty: 0 };return t.pvi = ((e = function () {try {return wx.getStorageSync(Ja.prefix + "auid");} catch (t) {}}()) || (e = function () {try {var t = Za();return wx.setStorageSync(Ja.prefix + "auid", t), t;} catch (e) {}}(), t.ty = 1), e), t.si = function () {var e = function () {try {return wx.getStorageSync(Ja.prefix + "ssid");} catch (e) {}}();return e || (e = Qa()), e;}(), t;}function nu() {var e = function () {var e = wx.getSystemInfoSync();return { adt: encodeURIComponent(e.model), scl: e.pixelRatio, scr: e.windowWidth + "x" + e.windowHeight, lg: e.language, fl: e.version, jv: encodeURIComponent(e.system), tz: encodeURIComponent(e.platform) };}();return function (e) {wx.getNetworkType({ success: function success(t) {e(t.networkType);} });}(function (e) {try {wx.setStorageSync(Ja.prefix + "ntdata", e);} catch (t) {}}), e.ct = wx.getStorageSync(Ja.prefix + "ntdata") || "4g", e;}function ru() {var e,t = iu.Data.userInfo,n = [];for (e in t) {t.hasOwnProperty(e) && n.push(e + "=" + t[e]);}return t = n.join(";"), { r2: Ja.app_id, r4: "wx", ext: "v=" + Ja.version + (null !== t && "" !== t ? ";ui=" + encodeURIComponent(t) : "") };}function ou(e) {if (!Ja.stat_param || !e) return "";e = function (e) {if (1 > Ja.ignore_params.length) return e;var t,n = {};for (t in e) {0 <= Ja.ignore_params.indexOf(t) || (n[t] = e[t]);}return n;}(e);var t,n = [];for (t in e) {n.push(t + "=" + e[t]);}return 0 < n.length ? "?" + n.join("&") : "";}var iu = { App: { init: function init(e) {"appID" in e && (Ja.app_id = e.appID), "eventID" in e && (Ja.event_id = e.eventID), "statShareApp" in e && (Ja.stat_share_app = e.statShareApp), "statPullDownFresh" in e && (Ja.stat_pull_down_fresh = e.statPullDownFresh), "statReachBottom" in e && (Ja.stat_reach_bottom = e.statReachBottom), "ignoreParams" in e && (Ja.ignore_params = e.ignoreParams), "statParam" in e && (Ja.stat_param = e.statParam), Qa();try {"lauchOpts" in e && (iu.Data.lanchInfo = e.lauchOpts, iu.Data.lanchInfo.landing = 1);} catch (t) {}"autoReport" in e && e.autoReport && function () {var e = Page;Page = function Page(t) {var n = t.onLoad;t.onLoad = function (e) {n && n.call(this, e), iu.Data.lastPageQuery = iu.Data.pageQuery, iu.Data.pageQuery = e, iu.Data.lastPageUrl = iu.Data.pageUrl, iu.Data.pageUrl = eu(), iu.Data.show = !1, iu.Page.init();}, e(t);};}();} }, Page: { init: function init() {var e,t = getCurrentPages()[getCurrentPages().length - 1];t.onShow && (e = t.onShow, t.onShow = function () {if (!0 === iu.Data.show) {var t = iu.Data.lastPageQuery;iu.Data.lastPageQuery = iu.Data.pageQuery, iu.Data.pageQuery = t, iu.Data.lastPageUrl = iu.Data.pageUrl, iu.Data.pageUrl = eu();}iu.Data.show = !0, iu.Page.stat(), e.apply(this, arguments);}), Ja.stat_pull_down_fresh && t.onPullDownRefresh && function () {var e = t.onPullDownRefresh;t.onPullDownRefresh = function () {iu.Event.stat(Ja.prefix + "pulldownfresh", { url: t.__route__ }), e.apply(this, arguments);};}(), Ja.stat_reach_bottom && t.onReachBottom && function () {var e = t.onReachBottom;t.onReachBottom = function () {iu.Event.stat(Ja.prefix + "reachbottom", { url: t.__route__ }), e.apply(this, arguments);};}(), Ja.stat_share_app && t.onShareAppMessage && function () {var e = t.onShareAppMessage;t.onShareAppMessage = function () {return iu.Event.stat(Ja.prefix + "shareapp", { url: t.__route__ }), e.apply(this, arguments);};}();}, multiStat: function multiStat(e, t) {if (1 == t) iu.Page.stat(e);else {var n = getCurrentPages()[getCurrentPages().length - 1];n.onShow && function () {var t = n.onShow;n.onShow = function () {iu.Page.stat(e), t.call(this, arguments);};}();}}, stat: function stat(e) {if ("" != Ja.app_id) {var t = [],n = ru();if (e && (n.r2 = e), e = [tu(), n, nu()], iu.Data.lanchInfo) {e.push({ ht: iu.Data.lanchInfo.scene }), iu.Data.pageQuery && iu.Data.pageQuery._mta_ref_id && e.push({ rarg: iu.Data.pageQuery._mta_ref_id });try {1 == iu.Data.lanchInfo.landing && (n.ext += ";lp=1", iu.Data.lanchInfo.landing = 0);} catch (i) {}}e.push({ rdm: "/", rurl: 0 >= iu.Data.lastPageUrl.length ? iu.Data.pageUrl + ou(iu.Data.lastPageQuery) : encodeURIComponent(iu.Data.lastPageUrl + ou(iu.Data.lastPageQuery)) }), e.push({ rand: +new Date() }), n = 0;for (var r = e.length; n < r; n++) {for (var o in e[n]) {e[n].hasOwnProperty(o) && t.push(o + "=" + (void 0 === e[n][o] ? "" : e[n][o]));}}wx.request({ url: Ja.api_base + "?" + t.join("&").toLowerCase() });}} }, Event: { stat: function stat(e, t) {if ("" != Ja.event_id) {var n = [],r = tu(),o = ru();r.dm = "wxapps.click", r.url = e, o.r2 = Ja.event_id;var i,s = void 0 === t ? {} : t,a = [];for (i in s) {s.hasOwnProperty(i) && a.push(encodeURIComponent(i) + "=" + encodeURIComponent(s[i]));}for (s = a.join(";"), o.r5 = s, s = 0, o = (r = [r, o, nu(), { rand: +new Date() }]).length; s < o; s++) {for (var u in r[s]) {r[s].hasOwnProperty(u) && n.push(u + "=" + (void 0 === r[s][u] ? "" : r[s][u]));}}wx.request({ url: Ja.api_base + "?" + n.join("&").toLowerCase() });}} }, Data: { userInfo: null, lanchInfo: null, pageQuery: null, lastPageQuery: null, pageUrl: "", lastPageUrl: "", show: !1 } },su = iu,au = function () {function e() {r(this, e), this.cache = [], this.MtaWX = null, this._init();}return i(e, [{ key: "report", value: function value(e, t) {var n = this;try {O ? window.MtaH5 ? (window.MtaH5.clickStat(e, t), this.cache.forEach(function (e) {var t = e.name,r = e.param;window.MtaH5.clickStat(t, r), n.cache.shift();})) : this.cache.push({ name: e, param: t }) : N && (this.MtaWX ? (this.MtaWX.Event.stat(e, t), this.cache.forEach(function (e) {var t = e.name,r = e.param;n.MtaWX.stat(t, r), n.cache.shift();})) : this.cache.push({ name: e, param: t }));} catch (r) {}} }, { key: "stat", value: function value() {try {O && window.MtaH5 ? window.MtaH5.pgv() : N && this.MtaWX && this.MtaWX.Page.stat();} catch (e) {}} }, { key: "_init", value: function value() {try {if (O) {window._mtac = { autoReport: 0 };var e = document.createElement("script"),t = Me();e.src = "".concat(t, "//pingjs.qq.com/h5/stats.js?v2.0.4"), e.setAttribute("name", "MTAH5"), e.setAttribute("sid", "500690998"), e.setAttribute("cid", "500691017");var n = document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e, n);} else N && (this.MtaWX = su, this.MtaWX.App.init({ appID: "500690995", eventID: "500691014", autoReport: !1, statParam: !0 }));} catch (r) {}} }]), e;}(),uu = function (e) {c(n, e);var t = _(n);function n(e) {var o;r(this, n), (o = t.call(this, e)).MTA = new au();var i = o.tim.innerEmitter;return i.on(Ar, o._stat, g(o)), i.on(Dr, o._stat, g(o)), o;}return i(n, [{ key: "_stat", value: function value() {this.MTA.report("sdkappid", { value: this.tim.context.SDKAppID }), this.MTA.report("version", { value: Eu.VERSION }), this.MTA.stat();} }]), n;}(Pr),cu = function () {function e(t) {r(this, e), this._table = "timwebii", this._report = [];}return i(e, [{ key: "pushIn", value: function value(e) {J.debug("SSOLogBody.pushIn", this._report.length, e), this._report.push(e);} }, { key: "backfill", value: function value(e) {var t;re(e) && 0 !== e.length && (J.debug("SSOLogBody.backfill", this._report.length, e.length), (t = this._report).unshift.apply(t, v(e)));} }, { key: "getLogsNumInMemory", value: function value() {return this._report.length;} }, { key: "isEmpty", value: function value() {return 0 === this._report.length;} }, { key: "_reset", value: function value() {this._report.length = 0, this._report = [];} }, { key: "getTable", value: function value() {return this._table;} }, { key: "getLogsInMemory", value: function value() {var e = this._report.slice();return this._reset(), e;} }]), e;}(),lu = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).TAG = "im-ssolog-event", o._reportBody = new cu(), o._version = "2.7.1", o.MIN_THRESHOLD = 20, o.MAX_THRESHOLD = 100, o.WAITING_TIME = 6e4, o.INTERVAL = 2e4, o._timerID = 0, o._resetLastReportTime(), o._startReportTimer(), o._retryCount = 0, o.MAX_RETRY_COUNT = 3, o.tim.innerEmitter.on(mr, o._onLoginSuccess, g(o)), o;}return i(n, [{ key: "reportAtOnce", value: function value() {J.debug("EventStatController.reportAtOnce"), this._report();} }, { key: "_onLoginSuccess", value: function value() {var e = this,t = this.tim.storage,n = t.getItem(this.TAG, !1);Oe(n) || (J.log("EventStatController._onLoginSuccess get ssolog in storage, nums=" + n.length), n.forEach(function (t) {e._reportBody.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "pushIn", value: function value(e) {e instanceof Br && (e.setCommonInfo(this.tim.context.SDKAppID, this._version, this.tim.context.tinyID, this.tim.loginInfo.identifier, this.getPlatform()), this._reportBody.pushIn(e), this._reportBody.getLogsNumInMemory() >= this.MIN_THRESHOLD && this._report());} }, { key: "_resetLastReportTime", value: function value() {this._lastReportTime = Date.now();} }, { key: "_startReportTimer", value: function value() {var e = this;this._timerID = setInterval(function () {Date.now() < e._lastReportTime + e.WAITING_TIME || e._reportBody.isEmpty() || e._report();}, this.INTERVAL);} }, { key: "_stopReportTimer", value: function value() {this._timerID > 0 && (clearInterval(this._timerID), this._timerID = 0);} }, { key: "_report", value: function value() {var e = this;if (!this._reportBody.isEmpty()) {var t = this._reportBody.getLogsInMemory();this.request({ name: "ssoEventStat", action: "create", param: { table: this._reportBody.getTable(), report: t } }).then(function () {e._resetLastReportTime(), e._retryCount > 0 && (J.debug("EventStatController.report retry success"), e._retryCount = 0);}).catch(function (n) {if (J.warn("EventStatController.report, networkType:".concat(e.getNetworkType(), " error:").concat(de(n))), e._reportBody.backfill(t), e._reportBody.getLogsNumInMemory() > e.MAX_THRESHOLD || e._retryCount === e.MAX_RETRY_COUNT || 0 === e._timerID) return e._retryCount = 0, void e._flushAtOnce();e._retryCount += 1;});}} }, { key: "_flushAtOnce", value: function value() {var e = this.tim.storage,t = e.getItem(this.TAG, !1),n = this._reportBody.getLogsInMemory();if (Oe(t)) J.log("EventStatController._flushAtOnce nums=" + n.length), e.setItem(this.TAG, n, !0, !1);else {var r = n.concat(t);r.length > this.MAX_THRESHOLD && (r = r.slice(0, this.MAX_THRESHOLD)), J.log("EventStatController._flushAtOnce nums=" + r.length), e.setItem(this.TAG, r, !0, !1);}} }, { key: "reset", value: function value() {J.log("EventStatController.reset"), this._stopReportTimer(), this._report();} }]), n;}(Pr),pu = "none",hu = "online",du = function () {function e() {r(this, e), this._networkType = "", this.maxWaitTime = 3e3;}return i(e, [{ key: "start", value: function value() {var e = this;N ? (wx.getNetworkType({ success: function success(t) {e._networkType = t.networkType, t.networkType === pu ? J.warn("NetMonitor no network, please check!") : J.info("NetMonitor networkType:".concat(t.networkType));} }), wx.onNetworkStatusChange(this._onWxNetworkStatusChange.bind(this))) : this._networkType = hu;} }, { key: "_onWxNetworkStatusChange", value: function value(e) {this._networkType = e.networkType, e.isConnected ? J.info("NetMonitor networkType:".concat(e.networkType)) : J.warn("NetMonitor no network, please check!");} }, { key: "probe", value: function value() {var e = this;return new Promise(function (t, n) {if (N) wx.getNetworkType({ success: function success(n) {e._networkType = n.networkType, n.networkType === pu ? (J.warn("NetMonitor no network, please check!"), t([!1, n.networkType])) : (J.info("NetMonitor networkType:".concat(n.networkType)), t([!0, n.networkType]));} });else if (window && window.fetch) fetch("".concat(Me(), "//webim-1252463788.file.myqcloud.com/assets/test/speed.xml?random=").concat(Math.random())).then(function (e) {e.ok ? t([!0, hu]) : t([!1, pu]);}).catch(function (e) {t([!1, pu]);});else {var r = new XMLHttpRequest(),o = setTimeout(function () {J.warn("NetMonitor fetch timeout. Probably no network, please check!"), r.abort(), e._networkType = pu, t([!1, pu]);}, e.maxWaitTime);r.onreadystatechange = function () {4 === r.readyState && (clearTimeout(o), 200 === r.status || 304 === r.status ? (this._networkType = hu, t([!0, hu])) : (J.warn("NetMonitor fetch status:".concat(r.status, ". Probably no network, please check!")), this._networkType = pu, t([!1, pu])));}, r.open("GET", "".concat(Me(), "//webim-1252463788.file.myqcloud.com/assets/test/speed.xml?random=").concat(Math.random())), r.send();}});} }, { key: "getNetworkType", value: function value() {return this._networkType;} }, { key: "reset", value: function value() {this._networkType = "";} }]), e;}(),fu = function () {function e(t) {var n = this;r(this, e), re(t) ? (this._map = new Map(), t.forEach(function (e) {n._map.set(e, []);})) : J.warn("AverageCalculator.constructor need keys");}return i(e, [{ key: "push", value: function value(e, t) {return !(oe(e) || !this._map.has(e) || !Z(t)) && (this._map.get(e).push(t), !0);} }, { key: "getSize", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : this._map.get(e).length;} }, { key: "getAvg", value: function value(e) {if (oe(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = t.length;if (0 === n) return 0;var r = 0;return t.forEach(function (e) {r += e;}), t.length = 0, this._map.set(e, []), parseInt(r / n);} }, { key: "getMax", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : Math.max.apply(null, this._map.get(e));} }, { key: "getMin", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : Math.min.apply(null, this._map.get(e));} }, { key: "reset", value: function value() {this._map.forEach(function (e) {e.length = 0;});} }]), e;}(),gu = function () {function e(t) {var n = this;r(this, e), re(t) ? (this._map = new Map(), t.forEach(function (e) {n._map.set(e, { totalCount: 0, successCount: 0 });})) : J.warn("SuccessRateCalculator.constructor need keys");}return i(e, [{ key: "addTotalCount", value: function value(e) {return !(oe(e) || !this._map.has(e)) && (this._map.get(e).totalCount += 1, !0);} }, { key: "addSuccessCount", value: function value(e) {return !(oe(e) || !this._map.has(e)) && (this._map.get(e).successCount += 1, !0);} }, { key: "getSuccessRate", value: function value(e) {if (oe(e) || !this._map.has(e)) return -1;var t = this._map.get(e);if (0 === t.totalCount) return 1;var n = parseFloat((t.successCount / t.totalCount).toFixed(2));return n > 1 && (n = 1), t.totalCount = t.successCount = 0, n;} }, { key: "getTotalCount", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : this._map.get(e).totalCount;} }, { key: "reset", value: function value() {this._map.forEach(function (e) {e.totalCount = 0, e.successCount = 0;});} }]), e;}(),mu = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).TABLE = "timwebsum", o.TAG = "im-ssolog-sumstat", o._items = [Kr.LONG_POLLING, Kr.LONG_POLLING_AV, Kr.SEND_MESSAGE, Kr.SEND_MESSAGE_C2C, Kr.SEND_MESSAGE_GROUP_WORK, Kr.SEND_MESSAGE_GROUP_PUBLIC, Kr.SEND_MESSAGE_GROUP_MEETING, Kr.SEND_MESSAGE_GROUP_AV, Kr.MESSAGE_RECEIVED, Kr.MESSAGE_RECEIVED_AV], o._thresholdMap = new Map(), o._thresholdMap.set(Kr.LONG_POLLING, 100), o._thresholdMap.set(Kr.LONG_POLLING_AV, 150), o._thresholdMap.set(Kr.SEND_MESSAGE, 15), o._thresholdMap.set(Kr.SEND_MESSAGE_C2C, 6), o._thresholdMap.set(Kr.SEND_MESSAGE_GROUP_WORK, 6), o._thresholdMap.set(Kr.SEND_MESSAGE_GROUP_PUBLIC, 6), o._thresholdMap.set(Kr.SEND_MESSAGE_GROUP_MEENTING, 6), o._thresholdMap.set(Kr.SEND_MESSAGE_GROUP_AV, 6), o._thresholdMap.set(Kr.MESSAGE_RECEIVED, 50), o._thresholdMap.set(Kr.MESSAGE_RECEIVED_AV, 50), o._lpID = "", o._platform = o.getPlatform(), o._lastReportTime = 0, o._statInfoArr = [], o._retryCount = 0, o._avgCalc = new fu(o._items), o._successRateCalc = new gu(o._items), o.tim.innerEmitter.on(mr, o._onLoginSuccess, g(o)), o;}return i(n, [{ key: "_onLoginSuccess", value: function value() {var e = this,t = this.tim.storage,n = t.getItem(this.TAG, !1);Oe(n) || (J.log("SumStatController._onLoginSuccess get sumstatlog in storage, nums=" + n.length), n.forEach(function (t) {e._statInfoArr.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "recordLongPollingID", value: function value(e) {this._lpID = e;} }, { key: "addTotalCount", value: function value(e) {this._successRateCalc.addTotalCount(e) ? 1 === this._successRateCalc.getTotalCount(e) && (this._lastReportTime = Date.now()) : J.warn("SumStatController.addTotalCount invalid key:", e);} }, { key: "addSuccessCount", value: function value(e) {this._successRateCalc.addSuccessCount(e) || J.warn("SumStatController.addSuccessCount invalid key:", e);} }, { key: "addCost", value: function value(e, t) {this._avgCalc.push(e, t) ? (J.debug("SumStatController.addCost", e, t, this._avgCalc.getSize(e)), this._avgCalc.getSize(e) >= this._thresholdMap.get(e) && this._report(e)) : J.warn("SumStatController.addCost invalid key or cost:", e, t);} }, { key: "_getItemNum", value: function value(e) {switch (e) {case Kr.LONG_POLLING:return 1;case Kr.LONG_POLLING_AV:return 2;case Kr.SEND_MESSAGE:return 3;case Kr.MESSAGE_RECEIVED:return 4;case Kr.MESSAGE_RECEIVED_AV:return 5;case Kr.SEND_MESSAGE_C2C:return 6;case Kr.SEND_MESSAGE_GROUP_WORK:return 7;case Kr.SEND_MESSAGE_GROUP_PUBLIC:return 8;case Kr.SEND_MESSAGE_GROUP_MEETING:return 9;case Kr.SEND_MESSAGE_GROUP_AV:return 10;default:return 100;}} }, { key: "_getStatInfo", value: function value(e) {var t = null;return this._avgCalc.getSize(e) > 0 && (t = { SDKAppID: "".concat(this.tim.context.SDKAppID), version: "".concat("2.7.1"), tinyID: this.tim.context.tinyID, userID: this.tim.loginInfo.identifier, item: this._getItemNum(e), lpID: e === Kr.LONG_POLLING ? this._lpID : "", platform: this._platform, networkType: this.getNetworkType(), total: this._successRateCalc.getTotalCount(e), successRate: this._successRateCalc.getSuccessRate(e), avg: this._avgCalc.getAvg(e), timespan: Date.now() - this._lastReportTime, time: fe() }), t;} }, { key: "_report", value: function value(e) {var t = this,n = [],r = null;oe(e) ? this._items.forEach(function (e) {null !== (r = t._getStatInfo(e)) && n.push(r);}) : null !== (r = this._getStatInfo(e)) && n.push(r), J.debug("SumStatController._report", n), this._statInfoArr.length > 0 && (n = n.concat(this.statInfoArr), this._statInfoArr = []), this._doReport(n);} }, { key: "_doReport", value: function value(e) {var t = this;Oe(e) ? J.warn("SumStatController._doReport statInfoArr is empty, do nothing") : this.request({ name: "ssoSumStat", action: "create", param: { table: this.TABLE, report: e } }).then(function () {t._lastReportTime = Date.now(), t._retryCount > 0 && (J.debug("SumStatController._doReport retry success"), t._retryCount = 0);}).catch(function (n) {J.warn("SumStatController._doReport, online:".concat(t.getNetworkType(), " error:").concat(de(n)), e), t._retryCount <= 1 ? setTimeout(function () {J.info("SumStatController._doReport retry", e), t._retryCount += 1, t._doReport(e);}, 5e3) : (t._retryCount = 0, t._statInfoArr = t._statInfoArr.concat(e), t._flusgAtOnce());});} }, { key: "_flushAtOnce", value: function value() {var e = this.tim.storage,t = e.getItem(this.TAG, !1),n = this._statInfoArr;if (Oe(t)) J.log("SumStatController._flushAtOnce nums=" + n.length), e.setItem(this.TAG, n, !0, !1);else {var r = n.concat(t);r.length > 10 && (r = r.slice(0, 10)), J.log("SumStatController._flushAtOnce nums=" + r.length), e.setItem(this.TAG, r, !0, !1);}this._statInfoArr = [];} }, { key: "reset", value: function value() {J.info("SumStatController.reset"), this._report(), this._avgCalc.reset(), this._successRateCalc.reset();} }]), n;}(Pr),_u = function () {function e() {r(this, e), this._funcMap = new Map();}return i(e, [{ key: "defense", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;if ("string" != typeof e) return null;if (0 === e.length) return null;if ("function" != typeof t) return null;if (this._funcMap.has(e) && this._funcMap.get(e).has(t)) return this._funcMap.get(e).get(t);this._funcMap.has(e) || this._funcMap.set(e, new Map());var r = null;return this._funcMap.get(e).has(t) ? r = this._funcMap.get(e).get(t) : (r = this._pack(e, t, n), this._funcMap.get(e).set(t, r)), r;} }, { key: "defenseOnce", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;return "function" != typeof t ? null : this._pack(e, t, n);} }, { key: "find", value: function value(e, t) {return "string" != typeof e || 0 === e.length || "function" != typeof t ? null : this._funcMap.has(e) ? this._funcMap.get(e).has(t) ? this._funcMap.get(e).get(t) : (J.log("SafetyCallback.find: 找不到 func —— ".concat(e, "/").concat("" !== t.name ? t.name : "[anonymous]")), null) : (J.log("SafetyCallback.find: 找不到 eventName-".concat(e, " 对应的 func")), null);} }, { key: "delete", value: function value(e, t) {return "function" == typeof t && !!this._funcMap.has(e) && !!this._funcMap.get(e).has(t) && (this._funcMap.get(e).delete(t), 0 === this._funcMap.get(e).size && this._funcMap.delete(e), !0);} }, { key: "_pack", value: function value(e, t, n) {return function () {try {t.apply(n, Array.from(arguments));} catch (o) {var r = new Br();r.setMethod(Yo).setText("eventName=".concat(e)).setStart(), r.setCode(0).setMessage(o.message).setEnd();}};} }]), e;}(),yu = function (e) {c(n, e);var t = _(n);function n(e) {var o;return r(this, n), (o = t.call(this, e))._maybeLostSequencesMap = new Map(), o;}return i(n, [{ key: "onMessageMaybeLost", value: function value(e, t, n) {this._maybeLostSequencesMap.has(e) || this._maybeLostSequencesMap.set(e, []);for (var r = this._maybeLostSequencesMap.get(e), o = 0; o < n; o++) {r.push(t + o);}J.debug("MessageLossController.onMessageMaybeLost. maybeLostSequences:".concat(r));} }, { key: "detectMessageLoss", value: function value(e, t) {var n = this._maybeLostSequencesMap.get(e);if (!Oe(n) && !Oe(t)) {var r = t.filter(function (e) {return -1 !== n.indexOf(e);});if (J.debug("MessageLossController.detectMessageLoss. matchedSequences:".concat(r)), n.length === r.length) J.info("MessageLossController.detectMessageLoss no message loss. conversationID=".concat(e));else {var o,i = n.filter(function (e) {return -1 === r.indexOf(e);}),s = i.length;s <= 5 ? o = e + "-" + i.join("-") : (i.sort(function (e, t) {return e - t;}), o = e + " start:" + i[0] + " end:" + i[s - 1] + " count:" + s);var a = new Br();a.setMethod(xo).setStart(), a.setCode(0).setText(o).setNetworkType(this.getNetworkType()).setEnd(), J.warn("MessageLossController.detectMessageLoss message loss detected. conversationID:".concat(e, " lostSequences:").concat(i));}n.length = 0;}} }, { key: "reset", value: function value() {J.log("MessageLossController.reset"), this._maybeLostSequencesMap.clear();} }]), n;}(Pr),vu = function () {function t(e) {r(this, t);var n = new Br();n.setMethod(Hr).setStart(), wr.mixin(this), this._initOptions(e), this._initMemberVariables(), this._initControllers(), this._initListener(), Br.bindController(this.eventStatController), n.setCode(0).setText("mp=".concat(N, "-ua=").concat(L)).setEnd(), J.info("SDK inWxMiniApp:".concat(N, ", SDKAppID:").concat(e.SDKAppID, ", UserAgent:").concat(L)), this._safetyCallbackFactory = new _u();}return i(t, [{ key: "login", value: function value(e) {return J.time(Kr.SDK_READY), this._ssoLog = new Br(), this._ssoLog.setMethod(jr).setStart(), this.netMonitor.start(), this.loginInfo.identifier = e.identifier || e.userID, this.loginInfo.userSig = e.userSig, this.signController.login(this.loginInfo);} }, { key: "logout", value: function value() {var e = this.signController.logout();return this.resetSDK(), e;} }, { key: "on", value: function value(t, n, r) {t === e.GROUP_SYSTEM_NOTICE_RECEIVED && J.warn("！！！TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED v2.6.0起弃用，为了更好的体验，请在 TIM.EVENT.MESSAGE_RECEIVED 事件回调内接收处理群系统通知，详细请参考：https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupSystemNoticePayload"), J.debug("on", "eventName:".concat(t)), this.outerEmitter.on(t, this._safetyCallbackFactory.defense(t, n, r), r);} }, { key: "once", value: function value(e, t, n) {J.debug("once", "eventName:".concat(e)), this.outerEmitter.once(e, this._safetyCallbackFactory.defenseOnce(e, t, n), n || this);} }, { key: "off", value: function value(e, t, n, r) {J.debug("off", "eventName:".concat(e));var o = this._safetyCallbackFactory.find(e, t);null !== o && (this.outerEmitter.off(e, o, n, r), this._safetyCallbackFactory.delete(e, t));} }, { key: "registerPlugin", value: function value(e) {var t = this;this.plugins || (this.plugins = {}), Object.keys(e).forEach(function (n) {t.plugins[n] = e[n];});var n = new Br();n.setMethod(Xr).setStart(), n.setCode(0).setText("key=".concat(Object.keys(e))).setEnd();} }, { key: "getPlugin", value: function value(e) {return this.plugins[e] || void 0;} }, { key: "setLogLevel", value: function value(e) {if (e <= 0) {console.log(["", " ________  ______  __       __  __       __  ________  _______", "|        \\|      \\|  \\     /  \\|  \\  _  |  \\|        \\|       \\", " \\$$$$$$$$ \\$$$$$$| $$\\   /  $$| $$ / \\ | $$| $$$$$$$$| $$$$$$$\\", "   | $$     | $$  | $$$\\ /  $$$| $$/  $\\| $$| $$__    | $$__/ $$", "   | $$     | $$  | $$$$\\  $$$$| $$  $$$\\ $$| $$  \\   | $$    $$", "   | $$     | $$  | $$\\$$ $$ $$| $$ $$\\$$\\$$| $$$$$   | $$$$$$$\\", "   | $$    _| $$_ | $$ \\$$$| $$| $$$$  \\$$$$| $$_____ | $$__/ $$", "   | $$   |   $$ \\| $$  \\$ | $$| $$$    \\$$$| $$     \\| $$    $$", "    \\$$    \\$$$$$$ \\$$      \\$$ \\$$      \\$$ \\$$$$$$$$ \\$$$$$$$", "", ""].join("\n")), console.log("%cIM 智能客服，随时随地解决您的问题 →_→ https://cloud.tencent.com/act/event/smarty-service?from=im-doc", "color:#ff0000");console.log(["", "参考以下文档，会更快解决问题哦！(#^.^#)\n", "SDK 更新日志: https://cloud.tencent.com/document/product/269/38492\n", "SDK 接口文档: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html\n", "常见问题: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/tutorial-01-faq.html\n", "反馈问题？戳我提 issue: https://github.com/tencentyun/TIMSDK/issues\n", "如果您需要在生产环境关闭上面的日志，请 tim.setLogLevel(1)\n"].join("\n"));}J.setLevel(e);} }, { key: "downloadLog", value: function value() {var e = document.createElement("a"),t = new Date(),n = new Blob(this.getLog());e.download = "TIM-" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + "-" + this.loginInfo.SDKAppID + "-" + this.context.identifier + ".txt", e.href = URL.createObjectURL(n), e.click(), URL.revokeObjectURL(n);} }, { key: "destroy", value: function value() {this.logout(), this.outerEmitter.emit(e.SDK_DESTROY, { SDKAppID: this.loginInfo.SDKAppID });} }, { key: "createTextMessage", value: function value(e) {return this.messageController.createTextMessage(e);} }, { key: "createImageMessage", value: function value(e) {return this.messageController.createImageMessage(e);} }, { key: "createAudioMessage", value: function value(e) {return this.messageController.createAudioMessage(e);} }, { key: "createVideoMessage", value: function value(e) {return this.messageController.createVideoMessage(e);} }, { key: "createCustomMessage", value: function value(e) {return this.messageController.createCustomMessage(e);} }, { key: "createFaceMessage", value: function value(e) {return this.messageController.createFaceMessage(e);} }, { key: "createFileMessage", value: function value(e) {return this.messageController.createFileMessage(e);} }, { key: "sendMessage", value: function value(e, t) {return e instanceof Dn ? this.messageController.sendMessageInstance(e, t) : Vr(new ht({ code: dt.MESSAGE_SEND_NEED_MESSAGE_INSTANCE, message: Et }));} }, { key: "revokeMessage", value: function value(e) {return this.messageController.revokeMessage(e);} }, { key: "resendMessage", value: function value(e) {return this.messageController.resendMessage(e);} }, { key: "getMessageList", value: function value(e) {return this.messageController.getMessageList(e);} }, { key: "setMessageRead", value: function value(e) {return this.messageController.setMessageRead(e);} }, { key: "getConversationList", value: function value() {return this.conversationController.getConversationList();} }, { key: "getConversationProfile", value: function value(e) {return this.conversationController.getConversationProfile(e);} }, { key: "deleteConversation", value: function value(e) {return this.conversationController.deleteConversation(e);} }, { key: "getMyProfile", value: function value() {return this.userController.getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this.userController.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this.userController.updateMyProfile(e);} }, { key: "getFriendList", value: function value() {return this.userController.getFriendList();} }, { key: "deleteFriend", value: function value(e) {return this.userController.deleteFriend(e);} }, { key: "getBlacklist", value: function value() {return this.userController.getBlacklist();} }, { key: "addToBlacklist", value: function value(e) {return this.userController.addBlacklist(e);} }, { key: "removeFromBlacklist", value: function value(e) {return this.userController.deleteBlacklist(e);} }, { key: "getGroupList", value: function value(e) {return this.groupController.getGroupList(e);} }, { key: "getGroupProfile", value: function value(e) {return this.groupController.getGroupProfile(e);} }, { key: "createGroup", value: function value(e) {return this.groupController.createGroup(e);} }, { key: "dismissGroup", value: function value(e) {return this.groupController.dismissGroup(e);} }, { key: "updateGroupProfile", value: function value(e) {return this.groupController.updateGroupProfile(e);} }, { key: "joinGroup", value: function value(e) {return this.groupController.joinGroup(e);} }, { key: "quitGroup", value: function value(e) {return this.groupController.quitGroup(e);} }, { key: "searchGroupByID", value: function value(e) {return this.groupController.searchGroupByID(e);} }, { key: "changeGroupOwner", value: function value(e) {return this.groupController.changeGroupOwner(e);} }, { key: "handleGroupApplication", value: function value(e) {return this.groupController.handleGroupApplication(e);} }, { key: "setMessageRemindType", value: function value(e) {return this.groupController.setMessageRemindType(e);} }, { key: "getGroupMemberList", value: function value(e) {return this.groupController.getGroupMemberList(e);} }, { key: "getGroupMemberProfile", value: function value(e) {return this.groupController.getGroupMemberProfile(e);} }, { key: "addGroupMember", value: function value(e) {return this.groupController.addGroupMember(e);} }, { key: "deleteGroupMember", value: function value(e) {return this.groupController.deleteGroupMember(e);} }, { key: "setGroupMemberMuteTime", value: function value(e) {return this.groupController.setGroupMemberMuteTime(e);} }, { key: "setGroupMemberRole", value: function value(e) {return this.groupController.setGroupMemberRole(e);} }, { key: "setGroupMemberNameCard", value: function value(e) {return this.groupController.setGroupMemberNameCard(e);} }, { key: "setGroupMemberCustomField", value: function value(e) {return this.groupController.setGroupMemberCustomField(e);} }, { key: "_initOptions", value: function value(e) {this.plugins = {};var t = e.SDKAppID || 0,n = me();this.context = { SDKAppID: t, accountType: n }, this.loginInfo = { SDKAppID: t, accountType: n, identifier: null, userSig: null, unlimitedAVChatRoom: e.unlimitedAVChatRoom || !1 }, this.options = { runLoopNetType: e.runLoopNetType || Je, enablePointer: e.enablePointer || !1 };} }, { key: "_initMemberVariables", value: function value() {this.innerEmitter = new Ka(), this.outerEmitter = new Ka(), xr(this.outerEmitter), this.packageConfig = new Ha(this), this.storage = new Va(this), this.netMonitor = new du(), this.outerEmitter._emit = this.outerEmitter.emit, this.outerEmitter.emit = function (e, t) {var n = arguments[0],r = [n, { name: arguments[0], data: arguments[1] }];this.outerEmitter._emit.apply(this.outerEmitter, r);}.bind(this), this.innerEmitter._emit = this.innerEmitter.emit, this.innerEmitter.emit = function (e, t) {var n;ne(arguments[1]) && arguments[1].data ? (J.warn("inner eventData has data property, please check!"), n = [e, { name: arguments[0], data: arguments[1].data }]) : n = [e, { name: arguments[0], data: arguments[1] }], this.innerEmitter._emit.apply(this.innerEmitter, n);}.bind(this);} }, { key: "_initControllers", value: function value() {this.exceptionController = new la(this), this.connectionController = new ca(this), this.contextController = new br(this), this.context = this.contextController.getContext(), this.signController = new Wo(this), this.messageController = new La(this), this.conversationController = new Ta(this), this.userController = new va(this), this.groupController = new qa(this), this.notificationController = new Wa(this), this.bigDataHallwayController = new Xa(this), this.statusController = new xa(this), this.uploadController = new za(this), this.messageLossController = new yu(this), this.eventStatController = new lu(this), this.sumStatController = new mu(this), this.mtaReportController = new uu(this), this._initReadyListener();} }, { key: "_initListener", value: function value() {var e = this;if (this.innerEmitter.on(er, this._onSlowStart, this), N && "function" == typeof wx.onAppShow && "function" == typeof wx.onAppHide) {var t = null;wx.onAppHide(function () {(t = new Br()).setMethod(jo).setStart();}), wx.onAppShow(function () {null !== t && t.setCode(0).setNetworkType(e.netMonitor.getNetworkType()).setEnd();});}} }, { key: "_initReadyListener", value: function value() {for (var e = this, t = this.readyList, n = 0, r = t.length; n < r; n++) {this[t[n]].ready(function () {return e._readyHandle();});}} }, { key: "_onSlowStart", value: function value() {J.log("slow start longpolling..."), this.resetSDK(), this.login(this.loginInfo);} }, { key: "resetSDK", value: function value() {var t = this;this.initList.forEach(function (e) {t[e].reset && t[e].reset();}), this.netMonitor.reset(), this.storage.reset(), this.resetReady(), this._initReadyListener(), this.outerEmitter.emit(e.SDK_NOT_READY);} }, { key: "_readyHandle", value: function value() {for (var t = this.readyList, n = !0, r = 0, o = t.length; r < o; r++) {if (!this[t[r]].isReady()) {n = !1;break;}}if (n) {var i = J.timeEnd(Kr.SDK_READY);J.warn("SDK is ready. cost=".concat(i, "ms")), this.triggerReady(), this.innerEmitter.emit(Ar), this.outerEmitter.emit(e.SDK_READY), this._ssoLog.setCode(0).setNetworkType(this.netMonitor.getNetworkType()).setText(i).setEnd();}} }]), t;}();vu.prototype.readyList = ["conversationController"], vu.prototype.initList = ["exceptionController", "connectionController", "signController", "contextController", "messageController", "conversationController", "userController", "groupController", "notificationController", "eventStatController", "sumStatController", "messageLossController", "statusController"];var Iu = { login: "login", on: "on", off: "off", ready: "ready", setLogLevel: "setLogLevel", joinGroup: "joinGroup", quitGroup: "quitGroup", registerPlugin: "registerPlugin" };function Mu(e, t) {return !(!e.isReady() && void 0 === Iu[t]) || (e.innerEmitter.emit(Ir, new ht({ code: dt.SDK_IS_NOT_READY, message: "".concat(t, " ").concat(yn, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/module-EVENT.html#.SDK_READY") })), !1);}var Cu = {},Eu = {};return Eu.create = function (t) {if (t.SDKAppID && Cu[t.SDKAppID]) return Cu[t.SDKAppID];J.log("TIM.create");var n = new vu(t);n.on(e.SDK_DESTROY, function (e) {Cu[e.data.SDKAppID] = null, delete Cu[e.data.SDKAppID];});var r = function (e) {var t = Object.create(null);return Object.keys(Rn).forEach(function (n) {if (e[n]) {var r = Rn[n],o = new E();t[r] = function () {var t = Array.from(arguments);return o.use(function (t, r) {if (Mu(e, n)) return r();}).use(function (e, t) {if (!0 === Ne(e, kn[n], r)) return t();}).use(function (t, r) {return e[n].apply(e, t);}), o.run(t);};}}), t;}(n);return Cu[t.SDKAppID] = r, J.log("TIM.create ok"), r;}, Eu.TYPES = t, Eu.EVENT = e, Eu.VERSION = "2.7.1", J.log("TIM.VERSION: ".concat(Eu.VERSION)), Eu;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../rj/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3)))

/***/ }),
/* 14 */
/*!**********************************************!*\
  !*** H:/phpStudy/WWW/tx_im/commen/commen.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var commen = {};


commen.emojiList = [
[{
  "url": "100.gif",
  alt: "[微笑]" },
{
  "url": "101.gif",
  alt: "[伤心]" },
{
  "url": "102.gif",
  alt: "[美女]" },
{
  "url": "103.gif",
  alt: "[发呆]" },
{
  "url": "104.gif",
  alt: "[墨镜]" },
{
  "url": "105.gif",
  alt: "[哭]" },
{
  "url": "106.gif",
  alt: "[羞]" },
{
  "url": "107.gif",
  alt: "[哑]" },
{
  "url": "108.gif",
  alt: "[睡]" },
{
  "url": "109.gif",
  alt: "[哭]" },
{
  "url": "110.gif",
  alt: "[囧]" },
{
  "url": "111.gif",
  alt: "[怒]" },
{
  "url": "112.gif",
  alt: "[调皮]" },
{
  "url": "113.gif",
  alt: "[笑]" },
{
  "url": "114.gif",
  alt: "[惊讶]" },
{
  "url": "115.gif",
  alt: "[难过]" },
{
  "url": "116.gif",
  alt: "[酷]" },
{
  "url": "117.gif",
  alt: "[汗]" },
{
  "url": "118.gif",
  alt: "[抓狂]" },
{
  "url": "119.gif",
  alt: "[吐]" },
{
  "url": "120.gif",
  alt: "[笑]" },
{
  "url": "121.gif",
  alt: "[快乐]" },
{
  "url": "122.gif",
  alt: "[奇]" },
{
  "url": "123.gif",
  alt: "[傲]" }],

[{
  "url": "124.gif",
  alt: "[饿]" },
{
  "url": "125.gif",
  alt: "[累]" },
{
  "url": "126.gif",
  alt: "[吓]" },
{
  "url": "127.gif",
  alt: "[汗]" },
{
  "url": "128.gif",
  alt: "[高兴]" },
{
  "url": "129.gif",
  alt: "[闲]" },
{
  "url": "130.gif",
  alt: "[努力]" },
{
  "url": "131.gif",
  alt: "[骂]" },
{
  "url": "132.gif",
  alt: "[疑问]" },
{
  "url": "133.gif",
  alt: "[秘密]" },
{
  "url": "134.gif",
  alt: "[乱]" },
{
  "url": "135.gif",
  alt: "[疯]" },
{
  "url": "136.gif",
  alt: "[哀]" },
{
  "url": "137.gif",
  alt: "[鬼]" },
{
  "url": "138.gif",
  alt: "[打击]" },
{
  "url": "139.gif",
  alt: "[bye]" },
{
  "url": "140.gif",
  alt: "[汗]" },
{
  "url": "141.gif",
  alt: "[抠]" },
{
  "url": "142.gif",
  alt: "[鼓掌]" },
{
  "url": "143.gif",
  alt: "[糟糕]" },
{
  "url": "144.gif",
  alt: "[恶搞]" },
{
  "url": "145.gif",
  alt: "[什么]" },
{
  "url": "146.gif",
  alt: "[什么]" },
{
  "url": "147.gif",
  alt: "[累]" }],

[{
  "url": "148.gif",
  alt: "[看]" },
{
  "url": "149.gif",
  alt: "[难过]" },
{
  "url": "150.gif",
  alt: "[难过]" },
{
  "url": "151.gif",
  alt: "[坏]" },
{
  "url": "152.gif",
  alt: "[亲]" },
{
  "url": "153.gif",
  alt: "[吓]" },
{
  "url": "154.gif",
  alt: "[可怜]" },
{
  "url": "155.gif",
  alt: "[刀]" },
{
  "url": "156.gif",
  alt: "[水果]" },
{
  "url": "157.gif",
  alt: "[酒]" },
{
  "url": "158.gif",
  alt: "[篮球]" },
{
  "url": "159.gif",
  alt: "[乒乓]" },
{
  "url": "160.gif",
  alt: "[咖啡]" },
{
  "url": "161.gif",
  alt: "[美食]" },
{
  "url": "162.gif",
  alt: "[动物]" },
{
  "url": "163.gif",
  alt: "[鲜花]" },
{
  "url": "164.gif",
  alt: "[枯]" },
{
  "url": "165.gif",
  alt: "[唇]" },
{
  "url": "166.gif",
  alt: "[爱]" },
{
  "url": "167.gif",
  alt: "[分手]" },
{
  "url": "168.gif",
  alt: "[生日]" },
{
  "url": "169.gif",
  alt: "[电]" },
{
  "url": "170.gif",
  alt: "[炸弹]" },
{
  "url": "171.gif",
  alt: "[刀子]" }],

[{
  "url": "172.gif",
  alt: "[足球]" },
{
  "url": "173.gif",
  alt: "[瓢虫]" },
{
  "url": "174.gif",
  alt: "[翔]" },
{
  "url": "175.gif",
  alt: "[月亮]" },
{
  "url": "176.gif",
  alt: "[太阳]" },
{
  "url": "177.gif",
  alt: "[礼物]" },
{
  "url": "178.gif",
  alt: "[抱抱]" },
{
  "url": "179.gif",
  alt: "[拇指]" },
{
  "url": "180.gif",
  alt: "[贬低]" },
{
  "url": "181.gif",
  alt: "[握手]" },
{
  "url": "182.gif",
  alt: "[剪刀手]" },
{
  "url": "183.gif",
  alt: "[抱拳]" },
{
  "url": "184.gif",
  alt: "[勾引]" },
{
  "url": "185.gif",
  alt: "[拳头]" },
{
  "url": "186.gif",
  alt: "[小拇指]" },
{
  "url": "187.gif",
  alt: "[拇指八]" },
{
  "url": "188.gif",
  alt: "[食指]" },
{
  "url": "189.gif",
  alt: "[ok]" },
{
  "url": "190.gif",
  alt: "[情侣]" },
{
  "url": "191.gif",
  alt: "[爱心]" },
{
  "url": "192.gif",
  alt: "[蹦哒]" },
{
  "url": "193.gif",
  alt: "[颤抖]" },
{
  "url": "194.gif",
  alt: "[怄气]" },
{
  "url": "195.gif",
  alt: "[跳舞]" }],

[{
  "url": "196.gif",
  alt: "[发呆]" },
{
  "url": "197.gif",
  alt: "[背着]" },
{
  "url": "198.gif",
  alt: "[伸手]" },
{
  "url": "199.gif",
  alt: "[耍帅]" },
{
  "url": "200.png",
  alt: "[微笑]" },
{
  "url": "201.png",
  alt: "[生病]" },
{
  "url": "202.png",
  alt: "[哭泣]" },
{
  "url": "203.png",
  alt: "[吐舌]" },
{
  "url": "204.png",
  alt: "[迷糊]" },
{
  "url": "205.png",
  alt: "[瞪眼]" },
{
  "url": "206.png",
  alt: "[恐怖]" },
{
  "url": "207.png",
  alt: "[忧愁]" },
{
  "url": "208.png",
  alt: "[眨眉]" },
{
  "url": "209.png",
  alt: "[闭眼]" },
{
  "url": "210.png",
  alt: "[鄙视]" },
{
  "url": "211.png",
  alt: "[阴暗]" },
{
  "url": "212.png",
  alt: "[小鬼]" },
{
  "url": "213.png",
  alt: "[礼物]" },
{
  "url": "214.png",
  alt: "[拜佛]" },
{
  "url": "215.png",
  alt: "[力量]" },
{
  "url": "216.png",
  alt: "[金钱]" },
{
  "url": "217.png",
  alt: "[蛋糕]" },
{
  "url": "218.png",
  alt: "[彩带]" },
{
  "url": "219.png",
  alt: "[礼物]" }]];



/**@dateTimeFliter 转换格林日期时间格式为常用日期格式
                    * @time[必填] 						Date  		格林日期格式
                    * @part[可选,默认:0]				Number      选择返回日期时间部分  列:0:返回所有 1:只返回日期  2:只返回时间
                    * @dateComplete[可选,默认:true] 	Boolean 	日期位数不足是否添0补齐:true:补齐,false:不补齐
                    * @timeComplete[可选,默认:true] 	Boolean 	时间位数不足是否添0补齐:true:补齐,false:不补齐
                    * @dateConnector[可选,默认:-] 		String 		年月日连接符  例: - : /
                    * @timeConnector[可选,默认::] 		String 		时间连接符   例: - : /
                    * @hour12[可选,默认:false]          Boolean     是否返回12小时制时间   例: true:返回12小时制时间   false:返回24小时制时间
                    * @return   '2019-11-25 15:05:54'  String    返回示例
                    * **/
commen.dateTimeFliter = function (time)
{var part = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var dateComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;var timeComplete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;var dateConnector = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '-';var timeConnector = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ':';var hour12 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var dateStr = '';
  var timeStr = '';
  //转换日期
  if (dateComplete) {//添0补齐
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
  }
  dateStr = year + dateConnector + month + dateConnector + day;
  //转换时间
  //修改小时制
  if (hour12) {
    if (hour > 12) {
      hour = hour - 12;
      if (timeComplete) {
        if (hour < 10) {
          hour = '下午 ' + '0' + hour;
        } else {
          hour = '下午 ' + hour;
        }
      }
    } else {
      if (timeComplete) {
        if (hour < 10) {
          hour = '上午 ' + '0' + hour;
        } else {
          hour = '上午 ' + hour;
        }
      }
    }
  }
  //判断分钟与秒
  if (timeComplete) {//添0补齐
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
  }
  timeStr = hour + timeConnector + minute + timeConnector + second;
  //合成输出值
  if (part == 0) {
    return dateStr + ' ' + timeStr;
  } else if (part == 1) {
    return dateStr;
  } else if (part == 2) {
    return timeStr;
  }
  return '传参有误';
};var _default =



commen;exports.default = _default;

/***/ }),
/* 15 */
/*!********************************************!*\
  !*** H:/phpStudy/WWW/tx_im/store/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));
var _tim = _interopRequireDefault(__webpack_require__(/*! ../commen/tim/tim */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready

    conversationActive: {}, //聊天进行中的会话
    toUserId: '', //聊天对象id
    conversationList: [], //会话列表
    currentMessageList: [] //消息列表
  },


  mutations: {
    //更新登录状态
    toggleIsLogin: function toggleIsLogin(state, isLogin) {
      state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin;
    },
    //更新TIMSDK状态
    toggleIsSDKReady: function toggleIsSDKReady(state, isSDKReady) {
      state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady;
    },
    //退出登录重置状态
    reset: function reset(state) {
      state.isLogin = false;
      state.isSDKReady = false;
    },
    //选择好友聊天--创建会话/拼接会话id
    createConversationActive: function createConversationActive(state, toUserId) {
      state.conversationActive.conversationID = 'C2C' + toUserId;
      state.toUserId = toUserId;
      state.currentMessageList = [];
    },
    //选择已有会话聊天--更新选中会话详情
    updateConversationActive: function updateConversationActive(state, conversationItem) {
      state.conversationActive = Object.assign({}, conversationItem);
      state.toUserId = conversationItem.userProfile.userID;
      state.currentMessageList = [];
    },
    //更新会话列表
    updateConversationList: function updateConversationList(state, newConversationList) {
      state.conversationList = newConversationList;
    },
    /**
        * 将消息插入当前会话列表
        * 调用时机：收/发消息事件触发时
        * @param {Object} state
        * @param {Message[]|Message} data
        * @returns
        */
    pushCurrentMessageList: function pushCurrentMessageList(state, data) {
      // 还没当前会话，则跳过
      if (Array.isArray(data)) {
        // 筛选出当前会话的消息
        var result = data.filter(function (item) {return item.conversationID === state.conversationActive.conversationID;});
        state.currentMessageList = [].concat(_toConsumableArray(state.currentMessageList), _toConsumableArray(result));
      } else if (data.conversationID === state.conversationActive.conversationID) {
        state.currentMessageList = [].concat(_toConsumableArray(state.currentMessageList), [data]);
      }
      console.log('1111');
      console.log(state.currentMessageList);
    },
    /**
        * 滑到顶部请求更多的历史消息
        * */
    unshiftCurrentMessageList: function unshiftCurrentMessageList(state, data) {
      console.log(data);
      if (data) {
        state.currentMessageList = [].concat(_toConsumableArray(data), _toConsumableArray(state.currentMessageList));
      }
    } },


  actions: {} });var _default =



store;exports.default = _default;

/***/ }),
/* 16 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map