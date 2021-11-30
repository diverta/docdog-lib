var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function() {
  "use strict";
  function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(",");
    for (let i2 = 0; i2 < list.length; i2++) {
      map[list[i2]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function normalizeStyle(value) {
    if (isArray$7(value)) {
      const res = {};
      for (let i2 = 0; i2 < value.length; i2++) {
        const item = value[i2];
        const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString$2(value)) {
      return value;
    } else if (isObject$2(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString$2(value)) {
      res = value;
    } else if (isArray$7(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        const normalized = normalizeClass(value[i2]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject$2(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const toDisplayString = (val) => {
    return val == null ? "" : isArray$7(val) || isObject$2(val) && (val.toString === objectToString$2 || !isFunction$2(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (val && val.__v_isRef) {
      return replacer(_key, val.value);
    } else if (isMap$1(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
          entries[`${key} =>`] = val2;
          return entries;
        }, {})
      };
    } else if (isSet$1(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()]
      };
    } else if (isObject$2(val) && !isArray$7(val) && !isPlainObject$2(val)) {
      return String(val);
    }
    return val;
  };
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend$1 = Object.assign;
  const remove = (arr, el) => {
    const i2 = arr.indexOf(el);
    if (i2 > -1) {
      arr.splice(i2, 1);
    }
  };
  const hasOwnProperty$9 = Object.prototype.hasOwnProperty;
  const hasOwn$2 = (val, key) => hasOwnProperty$9.call(val, key);
  const isArray$7 = Array.isArray;
  const isMap$1 = (val) => toTypeString(val) === "[object Map]";
  const isSet$1 = (val) => toTypeString(val) === "[object Set]";
  const isFunction$2 = (val) => typeof val === "function";
  const isString$2 = (val) => typeof val === "string";
  const isSymbol$2 = (val) => typeof val === "symbol";
  const isObject$2 = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject$2(val) && isFunction$2(val.then) && isFunction$2(val.catch);
  };
  const objectToString$2 = Object.prototype.toString;
  const toTypeString = (value) => objectToString$2.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject$2 = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, arg) => {
    for (let i2 = 0; i2 < fns.length; i2++) {
      fns[i2](arg);
    }
  };
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  const toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  let activeEffectScope;
  const effectScopeStack = [];
  class EffectScope {
    constructor(detached = false) {
      this.active = true;
      this.effects = [];
      this.cleanups = [];
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    run(fn) {
      if (this.active) {
        try {
          this.on();
          return fn();
        } finally {
          this.off();
        }
      }
    }
    on() {
      if (this.active) {
        effectScopeStack.push(this);
        activeEffectScope = this;
      }
    }
    off() {
      if (this.active) {
        effectScopeStack.pop();
        activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
      }
    }
    stop(fromParent) {
      if (this.active) {
        this.effects.forEach((e) => e.stop());
        this.cleanups.forEach((cleanup) => cleanup());
        if (this.scopes) {
          this.scopes.forEach((e) => e.stop(true));
        }
        if (this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.active = false;
      }
    }
  }
  function recordEffectScope(effect, scope) {
    scope = scope || activeEffectScope;
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i2 = 0; i2 < deps.length; i2++) {
        deps[i2].w |= trackOpBit;
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i2 = 0; i2 < deps.length; i2++) {
        const dep = deps[i2];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  const targetMap = new WeakMap();
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  const maxMarkerBits = 30;
  const effectStack = [];
  let activeEffect;
  const ITERATE_KEY = Symbol("");
  const MAP_KEY_ITERATE_KEY = Symbol("");
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      if (!effectStack.includes(this)) {
        try {
          effectStack.push(activeEffect = this);
          enableTracking();
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          resetTracking();
          effectStack.pop();
          const n = effectStack.length;
          activeEffect = n > 0 ? effectStack[n - 1] : void 0;
        }
      }
    }
    stop() {
      if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i2 = 0; i2 < deps.length; i2++) {
        deps[i2].delete(effect);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!isTracking()) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
  function isTracking() {
    return shouldTrack && activeEffect !== void 0;
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray$7(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray$7(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray$7(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap$1(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    if (deps.length === 1) {
      if (deps[0]) {
        {
          triggerEffects(deps[0]);
        }
      }
    } else {
      const effects = [];
      for (const dep of deps) {
        if (dep) {
          effects.push(...dep);
        }
      }
      {
        triggerEffects(createDep(effects));
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    for (const effect of isArray$7(dep) ? dep : [...dep]) {
      if (effect !== activeEffect || effect.allowRecurse) {
        if (effect.scheduler) {
          effect.scheduler();
        } else {
          effect.run();
        }
      }
    }
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol$2));
  const get$1 = /* @__PURE__ */ createGetter();
  const shallowGet = /* @__PURE__ */ createGetter(false, true);
  const readonlyGet = /* @__PURE__ */ createGetter(true);
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i2 = 0, l = this.length; i2 < l; i2++) {
          track(arr, "get", i2 + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly2 = false, shallow = false) {
    return function get2(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray$7(target);
      if (!isReadonly2 && targetIsArray && hasOwn$2(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol$2(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject$2(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  const set = /* @__PURE__ */ createSetter();
  const shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set2(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray$7(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray$7(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$2(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn$2(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  function has$4(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol$2(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray$7(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
    get: get$1,
    set,
    deleteProperty,
    has: has$4,
    ownKeys
  };
  const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      return true;
    },
    deleteProperty(target, key) {
      return true;
    }
  };
  const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  const toShallow = (value) => value;
  const getProto$1 = (v) => Reflect.getPrototypeOf(v);
  function get$1$1(target, key, isReadonly2 = false, isShallow = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly2 && track(rawTarget, "get", key);
    }
    !isReadonly2 && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto$1(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1$1(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly2 && track(rawTarget, "has", key);
    }
    !isReadonly2 && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto$1(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto$1(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto$1(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    }
    get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow) {
    return function forEach2(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap$1(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn$2(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const reactiveMap = new WeakMap();
  const shallowReactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  const shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (target && target["__v_isReadonly"]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$2(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  const toReactive = (value) => isObject$2(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject$2(value) ? readonly(value) : value;
  function trackRefValue(ref2) {
    if (isTracking()) {
      ref2 = toRaw(ref2);
      if (!ref2.dep) {
        ref2.dep = createDep();
      }
      {
        trackEffects(ref2.dep);
      }
    }
  }
  function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    if (ref2.dep) {
      {
        triggerEffects(ref2.dep);
      }
    }
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, _shallow) {
      this._shallow = _shallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = _shallow ? value : toRaw(value);
      this._value = _shallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      newVal = this._shallow ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = this._shallow ? newVal : toReactive(newVal);
        triggerRefValue(this);
      }
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  class ObjectRefImpl {
    constructor(_object, _key) {
      this._object = _object;
      this._key = _key;
      this.__v_isRef = true;
    }
    get value() {
      return this._object[this._key];
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
  }
  function toRef(object, key) {
    const val = object[key];
    return isRef(val) ? val : new ObjectRefImpl(object, key);
  }
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2) {
      this._setter = _setter;
      this.dep = void 0;
      this._dirty = true;
      this.__v_isRef = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  function computed(getterOrOptions, debugOptions) {
    let getter;
    let setter;
    const onlyGetter = isFunction$2(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
    return cRef;
  }
  Promise.resolve();
  function emit$1(instance, event, ...rawArgs) {
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
      const { number, trim: trim2 } = props[modifiersKey] || EMPTY_OBJ;
      if (trim2) {
        args = rawArgs.map((a) => a.trim());
      } else if (number) {
        args = rawArgs.map(toNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction$2(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend$1(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      cache.set(comp, null);
      return null;
    }
    if (isArray$7(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend$1(normalized, raw);
    }
    cache.set(comp, normalized);
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn$2(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$2(options, hyphenate(key)) || hasOwn$2(options, key);
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function pushScopeId(id) {
    currentScopeId = id;
  }
  function popScopeId() {
    currentScopeId = null;
  }
  function withCtx(fn, ctx2 = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx2)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx2);
      const res = fn(...args);
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render: render2, renderCache, data: data2, setupState, ctx: ctx2, inheritAttrs } = instance;
    let result;
    let fallthroughAttrs;
    const prev = setCurrentRenderingInstance(instance);
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data2, ctx2));
        fallthroughAttrs = attrs;
      } else {
        const render3 = Component;
        if (false)
          ;
        result = normalizeVNode(render3.length > 1 ? render3(props, false ? {
          get attrs() {
            markAttrsAccessed();
            return attrs;
          },
          slots,
          emit
        } : { attrs, slots, emit }) : render3(props, null));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root2 = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root2;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root2 = cloneVNode(root2, fallthroughAttrs);
        }
      }
    }
    if (vnode.dirs) {
      root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      root2.transition = vnode.transition;
    }
    {
      result = root2;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i2 = 0; i2 < dynamicProps.length; i2++) {
          const key = dynamicProps[i2];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i2 = 0; i2 < nextKeys.length; i2++) {
      const key = nextKeys[i2];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$7(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key, value) {
    if (!currentInstance)
      ;
    else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
      const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction$2(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else
        ;
    }
  }
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: TransitionHookValidator,
      onEnter: TransitionHookValidator,
      onAfterEnter: TransitionHookValidator,
      onEnterCancelled: TransitionHookValidator,
      onBeforeLeave: TransitionHookValidator,
      onLeave: TransitionHookValidator,
      onAfterLeave: TransitionHookValidator,
      onLeaveCancelled: TransitionHookValidator,
      onBeforeAppear: TransitionHookValidator,
      onAppear: TransitionHookValidator,
      onAfterAppear: TransitionHookValidator,
      onAppearCancelled: TransitionHookValidator
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevTransitionKey;
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        const rawProps = toRaw(props);
        const { mode } = rawProps;
        const child = children[0];
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getKeepAliveChild(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
        setTransitionHooks(innerChild, enterHooks);
        const oldChild = instance.subTree;
        const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
        let transitionKeyChanged = false;
        const { getTransitionKey } = innerChild.type;
        if (getTransitionKey) {
          const key = getTransitionKey();
          if (prevTransitionKey === void 0) {
            prevTransitionKey = key;
          } else if (key !== prevTransitionKey) {
            prevTransitionKey = key;
            transitionKeyChanged = true;
          }
        }
        if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
          const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in") {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              instance.update();
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el._leaveCb = () => {
                earlyRemove();
                el._leaveCb = void 0;
                delete enterHooks.delayedLeave;
              };
              enterHooks.delayedLeave = delayedLeave;
            };
          }
        }
        return child;
      };
    }
  };
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance) {
    const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(hook, instance, 9, args);
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el._leaveCb) {
          el._leaveCb(true);
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
          leavingVNode.el._leaveCb();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el._enterCb = (cancelled) => {
          if (called)
            return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el._enterCb = void 0;
        };
        if (hook) {
          hook(el, done);
          if (hook.length <= 1) {
            done();
          }
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el._enterCb) {
          el._enterCb(true);
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        const done = el._leaveCb = (cancelled) => {
          if (called)
            return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el._leaveCb = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          onLeave(el, done);
          if (onLeave.length <= 1) {
            done();
          }
        } else {
          done();
        }
      },
      clone(vnode2) {
        return resolveTransitionHooks(vnode2, props, state, instance);
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i2 = 0; i2 < children.length; i2++) {
      const child = children[i2];
      if (child.type === Fragment) {
        if (child.patchFlag & 128)
          keyedFragmentCount++;
        ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
      } else if (keepComment || child.type !== Comment) {
        ret.push(child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i2 = 0; i2 < ret.length; i2++) {
        ret[i2].patchFlag = -2;
      }
    }
    return ret;
  }
  function defineComponent(options) {
    return isFunction$2(options) ? { setup: options, name: options.name } : options;
  }
  const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, true);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook("bu");
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook("bum");
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook("sp");
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx2 = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    const {
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render: render2,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      expose,
      inheritAttrs,
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx2, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction$2(methodHandler)) {
          {
            ctx2[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data2 = dataOptions.call(publicThis, publicThis);
      if (!isObject$2(data2))
        ;
      else {
        instance.data = reactive(data2);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction$2(opt) ? opt.bind(publicThis, publicThis) : isFunction$2(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set2 = !isFunction$2(opt) && isFunction$2(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c2 = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx2, key, {
          enumerable: true,
          configurable: true,
          get: () => c2.value,
          set: (v) => c2.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx2, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction$2(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray$7(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$7(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render2 && instance.render === NOOP) {
      instance.render = render2;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx2, checkDuplicateProperties = NOOP, unwrapRef = false) {
    if (isArray$7(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject$2(opt)) {
        if ("default" in opt) {
          injected = inject(opt.from || key, opt.default, true);
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        if (unwrapRef) {
          Object.defineProperty(ctx2, key, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v) => injected.value = v
          });
        } else {
          ctx2[key] = injected;
        }
      } else {
        ctx2[key] = injected;
      }
    }
  }
  function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(isArray$7(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx2, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString$2(raw)) {
      const handler = ctx2[raw];
      if (isFunction$2(handler)) {
        watch(getter, handler);
      }
    } else if (isFunction$2(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject$2(raw)) {
      if (isArray$7(raw)) {
        raw.forEach((r) => createWatcher(r, ctx2, publicThis, key));
      } else {
        const handler = isFunction$2(raw.handler) ? raw.handler.bind(publicThis) : ctx2[raw.handler];
        if (isFunction$2(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else
      ;
  }
  function resolveMergedOptions(instance) {
    const base2 = instance.type;
    const { mixins, extends: extendsOptions } = base2;
    const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
    const cached = cache.get(base2);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base2;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base2, optionMergeStrategies);
    }
    cache.set(base2, resolved);
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose")
        ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend$1(isFunction$2(to) ? to.call(this, this) : to, isFunction$2(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$7(raw)) {
      const res = {};
      for (let i2 = 0; i2 < raw.length; i2++) {
        res[raw[i2]] = raw[i2];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend$1(extend$1(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend$1(Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
          let key = propsToUpdate[i2];
          const value = rawProps[key];
          if (options) {
            if (hasOwn$2(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || !hasOwn$2(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn$2(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn$2(rawProps, key)) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn$2(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i2 = 0; i2 < needCastKeys.length; i2++) {
        const key = needCastKeys[i2];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$2(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn$2(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && isFunction$2(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[0]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction$2(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend$1(normalized, props);
        if (keys)
          needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      cache.set(comp, EMPTY_ARR);
      return EMPTY_ARR;
    }
    if (isArray$7(raw)) {
      for (let i2 = 0; i2 < raw.length; i2++) {
        const normalizedKey = camelize(raw[i2]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray$7(opt) || isFunction$2(opt) ? { type: opt } : opt;
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[0] = booleanIndex > -1;
            prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn$2(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    cache.set(comp, res);
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    }
    return false;
  }
  function getType(ctor) {
    const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match2 ? match2[1] : ctor === null ? "null" : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray$7(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction$2(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  const isInternalKey = (key) => key[0] === "_" || key === "$stable";
  const normalizeSlotValue = (value) => isArray$7(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx2) => {
    const normalized = withCtx((...args) => {
      return normalizeSlotValue(rawSlot(...args));
    }, ctx2);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx2 = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction$2(value)) {
        slots[key] = normalizeSlot(key, value, ctx2);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend$1(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
          delete slots[key];
        }
      }
    }
  };
  function withDirectives(vnode, directives) {
    const internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
      return vnode;
    }
    const instance = internalInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i2 = 0; i2 < directives.length; i2++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
      if (isFunction$2(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i2 = 0; i2 < bindings.length; i2++) {
      const binding = bindings[i2];
      if (oldBindings) {
        binding.oldValue = oldBindings[i2].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap()
    };
  }
  let uid = 0;
  function createAppAPI(render2, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (rootProps != null && !isObject$2(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = new Set();
      let isMounted2 = false;
      const app = context.app = {
        _uid: uid++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin2, ...options) {
          if (installedPlugins.has(plugin2))
            ;
          else if (plugin2 && isFunction$2(plugin2.install)) {
            installedPlugins.add(plugin2);
            plugin2.install(app, ...options);
          } else if (isFunction$2(plugin2)) {
            installedPlugins.add(plugin2);
            plugin2(app, ...options);
          } else
            ;
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted2) {
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render2(vnode, rootContainer, isSVG);
            }
            isMounted2 = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          }
        },
        unmount() {
          if (isMounted2) {
            render2(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app;
        }
      };
      return app;
    };
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis();
    target.__VUE__ = true;
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
    const patch = (n12, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n12 === n2) {
        return;
      }
      if (n12 && !isSameVNodeType(n12, n2)) {
        anchor = getNextHostNode(n12);
        unmount2(n12, parentComponent, parentSuspense, true);
        n12 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref2, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n12, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n12, n2, container, anchor);
          break;
        case Static:
          if (n12 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          }
          break;
        case Fragment:
          processFragment(n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else
            ;
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n12 && n12.ref, parentSuspense, n2 || n12, !n2);
      }
    };
    const processText = (n12, n2, container, anchor) => {
      if (n12 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        const el = n2.el = n12.el;
        if (n2.children !== n12.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n12, n2, container, anchor) => {
      if (n12 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n12.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      isSVG = isSVG || n2.type === "svg";
      if (n12 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n12, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
      if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props) {
          for (const key in props) {
            if (key !== "value" && !isReservedProp(key)) {
              hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
          hostSetScopeId(el, slotScopeIds[i2]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
      for (let i2 = start; i2 < children.length; i2++) {
        const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const patchElement = (n12, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const el = n2.el = n12.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n12.patchFlag & 16;
      const oldProps = n12.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n12);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n12, parentComponent, "beforeUpdate");
      }
      const areChildrenSVG = isSVG && n2.type !== "foreignObject";
      if (dynamicChildren) {
        patchBlockChildren(n12.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      } else if (!optimized) {
        patchChildren(n12, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, isSVG);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
              const key = propsToUpdate[i2];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, isSVG, n12.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n12.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n12);
          dirs && invokeDirectiveHook(n2, n12, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
      for (let i2 = 0; i2 < newChildren.length; i2++) {
        const oldVNode = oldChildren[i2];
        const newVNode = newChildren[i2];
        const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
      if (oldProps !== newProps) {
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value);
        }
      }
    };
    const processFragment = (n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n12 ? n12.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n12 ? n12.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n12 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n12.dynamicChildren) {
          patchBlockChildren(n12.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
            traverseStaticChildren(n12, n2, true);
          }
        } else {
          patchChildren(n12, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    const processComponent = (n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n12 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n12, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    };
    const updateComponent = (n12, n2, optimized) => {
      const instance = n2.component = n12.component;
      if (shouldUpdateComponent(n12, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.update();
        }
      } else {
        n2.component = n12.component;
        n2.el = n12.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          effect.allowRecurse = false;
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          effect.allowRecurse = true;
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              instance.subTree = renderComponentRoot(instance);
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
            } else {
              hydrateSubTree();
            }
          } else {
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          let originNext = next;
          let vnodeHook;
          effect.allowRecurse = false;
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          effect.allowRecurse = true;
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          }
        }
      };
      const effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
      const update = instance.update = effect.run.bind(effect);
      update.id = instance.uid;
      effect.allowRecurse = update.allowRecurse = true;
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(void 0, instance.update);
      resetTracking();
    };
    const patchChildren = (n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
      const c1 = n12 && n12.children;
      const prevShapeFlag = n12 ? n12.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i2;
      for (i2 = 0; i2 < commonLength; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let i2 = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i2 <= e1 && i2 <= e2) {
        const n12 = c1[i2];
        const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (isSameVNodeType(n12, n2)) {
          patch(n12, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i2++;
      }
      while (i2 <= e1 && i2 <= e2) {
        const n12 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n12, n2)) {
          patch(n12, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i2 > e1) {
        if (i2 <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i2 <= e2) {
            patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i2++;
          }
        }
      } else if (i2 > e2) {
        while (i2 <= e1) {
          unmount2(c1[i2], parentComponent, parentSuspense, true);
          i2++;
        }
      } else {
        const s1 = i2;
        const s2 = i2;
        const keyToNewIndexMap = new Map();
        for (i2 = s2; i2 <= e2; i2++) {
          const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i2);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i2 = 0; i2 < toBePatched; i2++)
          newIndexToOldIndexMap[i2] = 0;
        for (i2 = s1; i2 <= e1; i2++) {
          const prevChild = c1[i2];
          if (patched >= toBePatched) {
            unmount2(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount2(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i2 = toBePatched - 1; i2 >= 0; i2--) {
          const nextIndex = s2 + i2;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i2] === 0) {
            patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i2 !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i2 = 0; i2 < children.length; i2++) {
          move(children[i2], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove3 = () => hostInsert(el, container, anchor);
          const performLeave = () => {
            leave(el, () => {
              remove3();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove3, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount2 = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
      if (ref2 != null) {
        setRef(ref2, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        removeFragment(el, anchor);
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const { bum, scope, update, subTree, um } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount2(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i2 = start; i2 < children.length; i2++) {
        unmount2(children[i2], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    const render2 = (vnode, container, isSVG) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount2(container._vnode, null, null, true);
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
      }
      flushPostFlushCbs();
      container._vnode = vnode;
    };
    const internals = {
      p: patch,
      um: unmount2,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render: render2,
      hydrate,
      createApp: createAppAPI(render2, hydrate)
    };
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray$7(rawRef)) {
      rawRef.forEach((r, i2) => setRef(r, oldRawRef && (isArray$7(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref2 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref2) {
      if (isString$2(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn$2(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isString$2(ref2)) {
      const doSet = () => {
        {
          refs[ref2] = value;
        }
        if (hasOwn$2(setupState, ref2)) {
          setupState[ref2] = value;
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (isRef(ref2)) {
      const doSet = () => {
        ref2.value = value;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (isFunction$2(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else
      ;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  function traverseStaticChildren(n12, n2, shallow = false) {
    const ch1 = n12.children;
    const ch2 = n2.children;
    if (isArray$7(ch1) && isArray$7(ch2)) {
      for (let i2 = 0; i2 < ch1.length; i2++) {
        const c1 = ch1[i2];
        let c2 = ch2[i2];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i2, j, u, v, c2;
    const len2 = arr.length;
    for (i2 = 0; i2 < len2; i2++) {
      const arrI = arr[i2];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i2] = j;
          result.push(i2);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c2 = u + v >> 1;
          if (arr[result[c2]] < arrI) {
            u = c2 + 1;
          } else {
            v = c2;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i2] = result[u - 1];
          }
          result[u] = i2;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  const isTeleport = (type) => type.__isTeleport;
  const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
  const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
  const resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString$2(targetSelector)) {
      if (!select) {
        return null;
      } else {
        const target = select(targetSelector);
        return target;
      }
    } else {
      return targetSelector;
    }
  };
  const TeleportImpl = {
    __isTeleport: true,
    process(n12, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
      const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
      const disabled = isTeleportDisabled(n2.props);
      let { shapeFlag, children, dynamicChildren } = n2;
      if (n12 == null) {
        const placeholder = n2.el = createText("");
        const mainAnchor = n2.anchor = createText("");
        insert(placeholder, container, anchor);
        insert(mainAnchor, container, anchor);
        const target = n2.target = resolveTarget(n2.props, querySelector);
        const targetAnchor = n2.targetAnchor = createText("");
        if (target) {
          insert(targetAnchor, target);
          isSVG = isSVG || isTargetSVG(target);
        }
        const mount2 = (container2, anchor2) => {
          if (shapeFlag & 16) {
            mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        };
        if (disabled) {
          mount2(container, mainAnchor);
        } else if (target) {
          mount2(target, targetAnchor);
        }
      } else {
        n2.el = n12.el;
        const mainAnchor = n2.anchor = n12.anchor;
        const target = n2.target = n12.target;
        const targetAnchor = n2.targetAnchor = n12.targetAnchor;
        const wasDisabled = isTeleportDisabled(n12.props);
        const currentContainer = wasDisabled ? container : target;
        const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
        isSVG = isSVG || isTargetSVG(target);
        if (dynamicChildren) {
          patchBlockChildren(n12.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
          traverseStaticChildren(n12, n2, true);
        } else if (!optimized) {
          patchChildren(n12, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
        }
        if (disabled) {
          if (!wasDisabled) {
            moveTeleport(n2, container, mainAnchor, internals, 1);
          }
        } else {
          if ((n2.props && n2.props.to) !== (n12.props && n12.props.to)) {
            const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
            if (nextTarget) {
              moveTeleport(n2, nextTarget, null, internals, 0);
            }
          } else if (wasDisabled) {
            moveTeleport(n2, target, targetAnchor, internals, 1);
          }
        }
      }
    },
    remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount2, o: { remove: hostRemove } }, doRemove) {
      const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
      if (target) {
        hostRemove(targetAnchor);
      }
      if (doRemove || !isTeleportDisabled(props)) {
        hostRemove(anchor);
        if (shapeFlag & 16) {
          for (let i2 = 0; i2 < children.length; i2++) {
            const child = children[i2];
            unmount2(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
          }
        }
      }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
    if (moveType === 0) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2;
    if (isReorder) {
      insert(el, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
      if (shapeFlag & 16) {
        for (let i2 = 0; i2 < children.length; i2++) {
          move(children[i2], container, parentAnchor, 2);
        }
      }
    }
    if (isReorder) {
      insert(anchor, container, parentAnchor);
    }
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    if (target) {
      const targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) {
        if (isTeleportDisabled(vnode.props)) {
          vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
          vnode.targetAnchor = targetNode;
        } else {
          vnode.anchor = nextSibling(node);
          vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
      }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  const Teleport = TeleportImpl;
  const COMPONENTS = "components";
  function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
  }
  const NULL_DYNAMIC_COMPONENT = Symbol();
  function resolveDynamicComponent(component) {
    if (isString$2(component)) {
      return resolveAsset(COMPONENTS, component, false) || component;
    } else {
      return component || NULL_DYNAMIC_COMPONENT;
    }
  }
  function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
      const Component = instance.type;
      if (type === COMPONENTS) {
        const selfName = getComponentName(Component);
        if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
          return Component;
        }
      }
      const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
      if (!res && maybeSelfReference) {
        return Component;
      }
      return res;
    }
  }
  function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
  }
  const Fragment = Symbol(void 0);
  const Text = Symbol(void 0);
  const Comment = Symbol(void 0);
  const Static = Symbol(void 0);
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n12, n2) {
    return n12.type === n2.type && n12.key === n2.key;
  }
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({ ref: ref2 }) => {
    return ref2 != null ? isString$2(ref2) || isRef(ref2) || isFunction$2(ref2) ? { i: currentRenderingInstance, r: ref2 } : ref2 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString$2(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(type, props, true);
      if (children) {
        normalizeChildren(cloned, children);
      }
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style: style2 } = props;
      if (klass && !isString$2(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject$2(style2)) {
        if (isProxy(style2) && !isArray$7(style2)) {
          style2 = extend$1({}, style2);
        }
        props.style = normalizeStyle(style2);
      }
    }
    const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$2(type) ? 4 : isFunction$2(type) ? 2 : 0;
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend$1({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    const { props, ref: ref2, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$7(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor
    };
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray$7(child)) {
      return createVNode(Fragment, null, child.slice());
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray$7(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction$2(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i2 = 0; i2 < args.length; i2++) {
      const toMerge = args[i2];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (existing !== incoming) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.isCE) {
      return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
    }
    let slot = slots[name];
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
    if (!noSlotted && rendered.scopeId) {
      rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode(child))
        return true;
      if (child.type === Comment)
        return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  const getPublicInstance = (i2) => {
    if (!i2)
      return null;
    if (isStatefulComponent(i2))
      return getExposeProxy(i2) || i2.proxy;
    return getPublicInstance(i2.parent);
  };
  const publicPropertiesMap = extend$1(Object.create(null), {
    $: (i2) => i2,
    $el: (i2) => i2.vnode.el,
    $data: (i2) => i2.data,
    $props: (i2) => i2.props,
    $attrs: (i2) => i2.attrs,
    $slots: (i2) => i2.slots,
    $refs: (i2) => i2.refs,
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => () => queueJob(i2.update),
    $nextTick: (i2) => nextTick.bind(i2.proxy),
    $watch: (i2) => instanceWatch.bind(i2)
  });
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx: ctx2, setupState, data: data2, props, accessCache, type, appContext } = instance;
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 0:
              return setupState[key];
            case 1:
              return data2[key];
            case 3:
              return ctx2[key];
            case 2:
              return props[key];
          }
        } else if (setupState !== EMPTY_OBJ && hasOwn$2(setupState, key)) {
          accessCache[key] = 0;
          return setupState[key];
        } else if (data2 !== EMPTY_OBJ && hasOwn$2(data2, key)) {
          accessCache[key] = 1;
          return data2[key];
        } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$2(normalizedProps, key)) {
          accessCache[key] = 2;
          return props[key];
        } else if (ctx2 !== EMPTY_OBJ && hasOwn$2(ctx2, key)) {
          accessCache[key] = 3;
          return ctx2[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 4;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance, "get", key);
        }
        return publicGetter(instance);
      } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
        return cssModule;
      } else if (ctx2 !== EMPTY_OBJ && hasOwn$2(ctx2, key)) {
        accessCache[key] = 3;
        return ctx2[key];
      } else if (globalProperties = appContext.config.globalProperties, hasOwn$2(globalProperties, key)) {
        {
          return globalProperties[key];
        }
      } else
        ;
    },
    set({ _: instance }, key, value) {
      const { data: data2, setupState, ctx: ctx2 } = instance;
      if (setupState !== EMPTY_OBJ && hasOwn$2(setupState, key)) {
        setupState[key] = value;
      } else if (data2 !== EMPTY_OBJ && hasOwn$2(data2, key)) {
        data2[key] = value;
      } else if (hasOwn$2(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx2[key] = value;
        }
      }
      return true;
    },
    has({ _: { data: data2, setupState, accessCache, ctx: ctx2, appContext, propsOptions } }, key) {
      let normalizedProps;
      return accessCache[key] !== void 0 || data2 !== EMPTY_OBJ && hasOwn$2(data2, key) || setupState !== EMPTY_OBJ && hasOwn$2(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$2(normalizedProps, key) || hasOwn$2(ctx2, key) || hasOwn$2(publicPropertiesMap, key) || hasOwn$2(appContext.config.globalProperties, key);
    }
  };
  const emptyAppContext = createAppContext();
  let uid$1 = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid$1++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      update: null,
      scope: new EffectScope(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: type.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit$1.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  const setCurrentInstance = (instance) => {
    currentInstance = instance;
    instance.scope.on();
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
      resetTracking();
      unsetCurrentInstance();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction$2(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject$2(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else
      ;
    finishComponentSetup(instance, isSSR);
  }
  let compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template;
        if (template) {
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend$1(extend$1({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      setCurrentInstance(instance);
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      unsetCurrentInstance();
    }
  }
  function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    });
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    let attrs;
    {
      return {
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        }
      }));
    }
  }
  function getComponentName(Component) {
    return isFunction$2(Component) ? Component.displayName || Component.name : Component.name;
  }
  function isClassComponent(value) {
    return isFunction$2(value) && "__vccOpts" in value;
  }
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction$2(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i2 = 0; i2 < fn.length; i2++) {
      values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = type;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
            if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    {
      console.error(err);
    }
  }
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPreFlushCbs = [];
  let activePreFlushCbs = null;
  let preFlushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  let currentPreFlushParentJob = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJobId = getId(queue[middle]);
      middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    const i2 = queue.indexOf(job);
    if (i2 > flushIndex) {
      queue.splice(i2, 1);
    }
  }
  function queueCb(cb, activeQueue, pendingQueue, index2) {
    if (!isArray$7(cb)) {
      if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
        pendingQueue.push(cb);
      }
    } else {
      pendingQueue.push(...cb);
    }
    queueFlush();
  }
  function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
      currentPreFlushParentJob = parentJob;
      activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
      pendingPreFlushCbs.length = 0;
      for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
        activePreFlushCbs[preFlushIndex]();
      }
      activePreFlushCbs = null;
      preFlushIndex = 0;
      currentPreFlushParentJob = null;
      flushPreFlushCbs(seen, parentJob);
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    flushPreFlushCbs(seen);
    queue.sort((a, b) => getId(a) - getId(b));
    const check = NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (false)
            ;
          callWithErrorHandling(job, null, 14);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs();
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function watchEffect(effect, options) {
    return doWatch(effect, null, options);
  }
  const INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    const instance = currentInstance;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = !!source._shallow;
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray$7(source)) {
      isMultiSource = true;
      forceTrigger = source.some(isReactive);
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction$2(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else
          ;
      });
    } else if (isFunction$2(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(source, instance, 2);
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onInvalidate = (fn) => {
      cleanup = effect.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
      };
    };
    if (isInSSRComponentSetup) {
      onInvalidate = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onInvalidate
        ]);
      }
      return NOOP;
    }
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!effect.active) {
        return;
      }
      if (cb) {
        const newValue = effect.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
            onInvalidate
          ]);
          oldValue = newValue;
        }
      } else {
        effect.run();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      scheduler = () => {
        if (!instance || instance.isMounted) {
          queuePreFlushCb(job);
        } else {
          job();
        }
      };
    }
    const effect = new ReactiveEffect(getter, scheduler);
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    } else {
      effect.run();
    }
    return () => {
      effect.stop();
      if (instance && instance.scope) {
        remove(instance.scope.effects, effect);
      }
    };
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction$2(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
      setCurrentInstance(cur);
    } else {
      unsetCurrentInstance();
    }
    return res;
  }
  function createPathGetter(ctx2, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx2;
      for (let i2 = 0; i2 < segments.length && cur; i2++) {
        cur = cur[segments[i2]];
      }
      return cur;
    };
  }
  function traverse(value, seen) {
    if (!isObject$2(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray$7(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        traverse(value[i2], seen);
      }
    } else if (isSet$1(value) || isMap$1(value)) {
      value.forEach((v) => {
        traverse(v, seen);
      });
    } else if (isPlainObject$2(value)) {
      for (const key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject$2(propsOrChildren) && !isArray$7(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  const version = "3.2.21";
  const svgNS = "http://www.w3.org/2000/svg";
  const doc = typeof document !== "undefined" ? document : null;
  const staticTemplateCache = new Map();
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is, props) => {
      const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    cloneNode(el) {
      const cloned = el.cloneNode(true);
      if (`_value` in el) {
        cloned._value = el._value;
      }
      return cloned;
    },
    insertStaticContent(content, parent, anchor, isSVG) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      let template = staticTemplateCache.get(content);
      if (!template) {
        const t = doc.createElement("template");
        t.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
        template = t.content;
        if (isSVG) {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        staticTemplateCache.set(content, template);
      }
      parent.insertBefore(template.cloneNode(true), anchor);
      return [
        before ? before.nextSibling : parent.firstChild,
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  function patchClass(el, value, isSVG) {
    const transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    const style2 = el.style;
    const isCssString = isString$2(next);
    if (next && !isCssString) {
      for (const key in next) {
        setStyle(style2, key, next[key]);
      }
      if (prev && !isString$2(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style2, key, "");
          }
        }
      }
    } else {
      const currentDisplay = style2.display;
      if (isCssString) {
        if (prev !== next) {
          style2.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
      if ("_vod" in el) {
        style2.display = currentDisplay;
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style2, name, val) {
    if (isArray$7(val)) {
      val.forEach((v) => setStyle(style2, name, v));
    } else {
      if (name.startsWith("--")) {
        style2.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style2, name);
        if (importantRE.test(val)) {
          style2.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style2[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style2, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style2) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i2 = 0; i2 < prefixes.length; i2++) {
      const prefixed = prefixes[i2] + name;
      if (prefixed in style2) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean2 = isSpecialBooleanAttr(key);
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean2 ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    if (key === "value" && el.tagName !== "PROGRESS") {
      el._value = value;
      const newValue = value == null ? "" : value;
      if (el.value !== newValue) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        el[key] = includeBooleanAttr(value);
        return;
      } else if (value == null && type === "string") {
        el[key] = "";
        el.removeAttribute(key);
        return;
      } else if (type === "number") {
        try {
          el[key] = 0;
        } catch (_a) {
        }
        el.removeAttribute(key);
        return;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
  }
  let _getNow = Date.now;
  let skipTimestampCheck = false;
  if (typeof window !== "undefined") {
    if (_getNow() > document.createEvent("Event").timeStamp) {
      _getNow = () => performance.now();
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  let cachedNow = 0;
  const p = Promise.resolve();
  const reset = () => {
    cachedNow = 0;
  };
  const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    return [hyphenate(name.slice(2)), options];
  }
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      const timeStamp = e.timeStamp || _getNow();
      if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
      }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$7(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn(e2));
    } else {
      return value;
    }
  }
  const nativeOnRE = /^on[a-z]/;
  const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && nativeOnRE.test(key) && isFunction$2(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key) && isString$2(value)) {
      return false;
    }
    return key in el;
  }
  const TRANSITION = "transition";
  const ANIMATION = "animation";
  const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
  Transition.displayName = "Transition";
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
  const callHook = (hook, args = []) => {
    if (isArray$7(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  const hasExplicitCallback = (hook) => {
    return hook ? isArray$7(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const { name = "v", type, duration: duration2, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
    const durations = normalizeDuration(duration2);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
    const finishEnter = (el, isAppear, done) => {
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el, done) => {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve2 = () => finishEnter(el, isAppear, done);
        callHook(hook, [el, resolve2]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve2);
          }
        });
      };
    };
    return extend$1(baseProps, {
      onBeforeEnter(el) {
        callHook(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        const resolve2 = () => finishLeave(el, done);
        addTransitionClass(el, leaveFromClass);
        forceReflow();
        addTransitionClass(el, leaveActiveClass);
        nextFrame(() => {
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve2);
          }
        });
        callHook(onLeave, [el, resolve2]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false);
        callHook(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true);
        callHook(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook(onLeaveCancelled, [el]);
      }
    });
  }
  function normalizeDuration(duration2) {
    if (duration2 == null) {
      return null;
    } else if (isObject$2(duration2)) {
      return [NumberOf(duration2.enter), NumberOf(duration2.leave)];
    } else {
      const n = NumberOf(duration2);
      return [n, n];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    return res;
  }
  function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
    (el._vtc || (el._vtc = new Set())).add(cls);
  }
  function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
    const { _vtc } = el;
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el._vtc = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  let endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el._endId) {
        resolve2();
      }
    };
    if (explicitTimeout) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve2();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e) => {
      if (e.target === el && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = (key) => (styles[key] || "").split(", ");
    const transitionDelays = getStyleProperties(TRANSITION + "Delay");
    const transitionDurations = getStyleProperties(TRANSITION + "Duration");
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(ANIMATION + "Delay");
    const animationDurations = getStyleProperties(ANIMATION + "Duration");
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i2) => toMs(d) + toMs(delays[i2])));
  }
  function toMs(s) {
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow() {
    return document.body.offsetHeight;
  }
  const positionMap = new WeakMap();
  const newPositionMap = new WeakMap();
  const TransitionGroupImpl = {
    name: "TransitionGroup",
    props: /* @__PURE__ */ extend$1({}, TransitionPropsValidators, {
      tag: String,
      moveClass: String
    }),
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevChildren;
      let children;
      onUpdated(() => {
        if (!prevChildren.length) {
          return;
        }
        const moveClass = props.moveClass || `${props.name || "v"}-move`;
        if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
          return;
        }
        prevChildren.forEach(callPendingCbs);
        prevChildren.forEach(recordPosition);
        const movedChildren = prevChildren.filter(applyTranslation);
        forceReflow();
        movedChildren.forEach((c2) => {
          const el = c2.el;
          const style2 = el.style;
          addTransitionClass(el, moveClass);
          style2.transform = style2.webkitTransform = style2.transitionDuration = "";
          const cb = el._moveCb = (e) => {
            if (e && e.target !== el) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener("transitionend", cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          };
          el.addEventListener("transitionend", cb);
        });
      });
      return () => {
        const rawProps = toRaw(props);
        const cssTransitionProps = resolveTransitionProps(rawProps);
        let tag = rawProps.tag || Fragment;
        prevChildren = children;
        children = slots.default ? getTransitionRawChildren(slots.default()) : [];
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          if (child.key != null) {
            setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          }
        }
        if (prevChildren) {
          for (let i2 = 0; i2 < prevChildren.length; i2++) {
            const child = prevChildren[i2];
            setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
            positionMap.set(child, child.el.getBoundingClientRect());
          }
        }
        return createVNode(tag, null, children);
      };
    }
  };
  const TransitionGroup = TransitionGroupImpl;
  function callPendingCbs(c2) {
    const el = c2.el;
    if (el._moveCb) {
      el._moveCb();
    }
    if (el._enterCb) {
      el._enterCb();
    }
  }
  function recordPosition(c2) {
    newPositionMap.set(c2, c2.el.getBoundingClientRect());
  }
  function applyTranslation(c2) {
    const oldPos = positionMap.get(c2);
    const newPos = newPositionMap.get(c2);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
      const s = c2.el.style;
      s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
      s.transitionDuration = "0s";
      return c2;
    }
  }
  function hasCSSTransform(el, root2, moveClass) {
    const clone = el.cloneNode();
    if (el._vtc) {
      el._vtc.forEach((cls) => {
        cls.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
      });
    }
    moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
    clone.style.display = "none";
    const container = root2.nodeType === 1 ? root2 : root2.parentNode;
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
  }
  const systemModifiers = ["ctrl", "shift", "alt", "meta"];
  const modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
  };
  const withModifiers = (fn, modifiers) => {
    return (event, ...args) => {
      for (let i2 = 0; i2 < modifiers.length; i2++) {
        const guard = modifierGuards[modifiers[i2]];
        if (guard && guard(event, modifiers))
          return;
      }
      return fn(event, ...args);
    };
  };
  const vShow = {
    beforeMount(el, { value }, { transition }) {
      el._vod = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue)
        return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el._vod : "none";
  }
  const rendererOptions = extend$1({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    const { mount: mount2 } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app._component;
      if (!isFunction$2(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      const proxy = mount2(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function normalizeContainer(container) {
    if (isString$2(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  function getMargin(value, position) {
    const parts = value.trim().split(/\s+/g);
    const margin = {
      top: parts[0]
    };
    switch (parts.length) {
      case 1:
        margin.right = parts[0];
        margin.bottom = parts[0];
        margin.left = parts[0];
        break;
      case 2:
        margin.right = parts[1];
        margin.left = parts[1];
        margin.bottom = parts[0];
        break;
      case 3:
        margin.right = parts[1];
        margin.bottom = parts[2];
        margin.left = parts[1];
        break;
      case 4:
        margin.right = parts[1];
        margin.bottom = parts[2];
        margin.left = parts[3];
        break;
      default:
        throw new Error("[seemly/getMargin]:" + value + " is not a valid value.");
    }
    if (position === void 0)
      return margin;
    return margin[position];
  }
  var colors = {
    black: "#000",
    silver: "#C0C0C0",
    gray: "#808080",
    white: "#FFF",
    maroon: "#800000",
    red: "#F00",
    purple: "#800080",
    fuchsia: "#F0F",
    green: "#008000",
    lime: "#0F0",
    olive: "#808000",
    yellow: "#FF0",
    navy: "#000080",
    blue: "#00F",
    teal: "#008080",
    aqua: "#0FF",
    transparent: "#0000"
  };
  const prefix$1 = "^\\s*";
  const suffix = "\\s*$";
  const float = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*";
  const hex = "([0-9A-Fa-f])";
  const dhex = "([0-9A-Fa-f]{2})";
  const rgbRegex = new RegExp(`${prefix$1}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
  const rgbaRegex = new RegExp(`${prefix$1}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
  const sHexRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${suffix}`);
  const hexRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${suffix}`);
  const sHexaRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${hex}${suffix}`);
  const hexaRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
  function parseHex(value) {
    return parseInt(value, 16);
  }
  function rgba(color) {
    try {
      let i2;
      if (i2 = hexRegex.exec(color)) {
        return [parseHex(i2[1]), parseHex(i2[2]), parseHex(i2[3]), 1];
      } else if (i2 = rgbRegex.exec(color)) {
        return [roundChannel(i2[1]), roundChannel(i2[5]), roundChannel(i2[9]), 1];
      } else if (i2 = rgbaRegex.exec(color)) {
        return [
          roundChannel(i2[1]),
          roundChannel(i2[5]),
          roundChannel(i2[9]),
          roundAlpha(i2[13])
        ];
      } else if (i2 = sHexRegex.exec(color)) {
        return [
          parseHex(i2[1] + i2[1]),
          parseHex(i2[2] + i2[2]),
          parseHex(i2[3] + i2[3]),
          1
        ];
      } else if (i2 = hexaRegex.exec(color)) {
        return [
          parseHex(i2[1]),
          parseHex(i2[2]),
          parseHex(i2[3]),
          roundAlpha(parseHex(i2[4]) / 255)
        ];
      } else if (i2 = sHexaRegex.exec(color)) {
        return [
          parseHex(i2[1] + i2[1]),
          parseHex(i2[2] + i2[2]),
          parseHex(i2[3] + i2[3]),
          roundAlpha(parseHex(i2[4] + i2[4]) / 255)
        ];
      } else if (color in colors) {
        return rgba(colors[color]);
      }
      throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
    } catch (e) {
      throw e;
    }
  }
  function normalizeAlpha(alphaValue) {
    return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
  }
  function stringifyRgba(r, g, b, a) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
  }
  function compositeChannel(v1, a1, v2, a2, a) {
    return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
  }
  function composite(background, overlay2) {
    if (!Array.isArray(background))
      background = rgba(background);
    if (!Array.isArray(overlay2))
      overlay2 = rgba(overlay2);
    const a1 = background[3];
    const a2 = overlay2[3];
    const alpha = roundAlpha(a1 + a2 - a1 * a2);
    return stringifyRgba(compositeChannel(background[0], a1, overlay2[0], a2, alpha), compositeChannel(background[1], a1, overlay2[1], a2, alpha), compositeChannel(background[2], a1, overlay2[2], a2, alpha), alpha);
  }
  function changeColor(base2, options) {
    const [r, g, b, a = 1] = Array.isArray(base2) ? base2 : rgba(base2);
    if (options.alpha) {
      return stringifyRgba(r, g, b, options.alpha);
    }
    return stringifyRgba(r, g, b, a);
  }
  function scaleColor(base2, options) {
    const [r, g, b, a = 1] = Array.isArray(base2) ? base2 : rgba(base2);
    const { lightness = 1, alpha = 1 } = options;
    return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
  }
  function roundAlpha(value) {
    const v = Math.round(Number(value) * 100) / 100;
    if (v > 1)
      return 1;
    if (v < 0)
      return 0;
    return v;
  }
  function roundChannel(value) {
    const v = Math.round(Number(value));
    if (v > 255)
      return 255;
    if (v < 0)
      return 0;
    return v;
  }
  function toRgbaString(base2) {
    const [r, g, b] = base2;
    if (3 in base2) {
      return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base2[3])})`;
    }
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
  }
  globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  function createId(length = 8) {
    return Math.random().toString(16).slice(2, 2 + length);
  }
  const formItemInjectionKey = Symbol("formItem");
  function useFormItem(props, { defaultSize = "medium", mergedSize, mergedDisabled } = {}) {
    const NFormItem = inject(formItemInjectionKey, null);
    provide(formItemInjectionKey, null);
    const mergedSizeRef = computed(mergedSize ? () => mergedSize(NFormItem) : () => {
      const { size: size2 } = props;
      if (size2)
        return size2;
      if (NFormItem) {
        const { mergedSize: mergedSize2 } = NFormItem;
        if (mergedSize2.value !== void 0) {
          return mergedSize2.value;
        }
      }
      return defaultSize;
    });
    const mergedDisabledRef = computed(mergedDisabled ? () => mergedDisabled(NFormItem) : () => {
      const { disabled } = props;
      if (disabled !== void 0) {
        return disabled;
      }
      if (NFormItem) {
        return NFormItem.disabled.value;
      }
      return false;
    });
    onBeforeUnmount(() => {
      if (NFormItem) {
        NFormItem.restoreValidation();
      }
    });
    return {
      mergedSizeRef,
      mergedDisabledRef,
      nTriggerFormBlur() {
        if (NFormItem) {
          NFormItem.handleContentBlur();
        }
      },
      nTriggerFormChange() {
        if (NFormItem) {
          NFormItem.handleContentChange();
        }
      },
      nTriggerFormFocus() {
        if (NFormItem) {
          NFormItem.handleContentFocus();
        }
      },
      nTriggerFormInput() {
        if (NFormItem) {
          NFormItem.handleContentInput();
        }
      }
    };
  }
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  var root$1 = root;
  var Symbol$1 = root$1.Symbol;
  var Symbol$2 = Symbol$1;
  var objectProto$a = Object.prototype;
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$a.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$9 = Object.prototype;
  var nativeObjectToString = objectProto$9.toString;
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag = "[object Symbol]";
  function isSymbol$1(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  function arrayMap(array, iteratee) {
    var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index2 < length) {
      result[index2] = iteratee(array[index2], index2, array);
    }
    return result;
  }
  var isArray$5 = Array.isArray;
  var isArray$6 = isArray$5;
  var INFINITY = 1 / 0;
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$6(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol$1(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function isObject$1(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction$1(value) {
    if (!isObject$1(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root$1["__core-js_shared__"];
  var coreJsData$1 = coreJsData;
  var maskSrcKey = function() {
    var uid2 = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
    return uid2 ? "Symbol(src)_1." + uid2 : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$2 = Function.prototype;
  var funcToString$2 = funcProto$2.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto$1 = Function.prototype, objectProto$8 = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
  var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function baseIsNative(value) {
    if (!isObject$1(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var objectCreate = Object.create;
  var baseCreate = function() {
    function object() {
    }
    return function(proto) {
      if (!isObject$1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  }();
  var baseCreate$1 = baseCreate;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function copyArray(source, array) {
    var index2 = -1, length = source.length;
    array || (array = Array(length));
    while (++index2 < length) {
      array[index2] = source[index2];
    }
    return array;
  }
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  var defineProperty$1 = defineProperty;
  var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
    return defineProperty$1(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  var baseSetToString$1 = baseSetToString;
  var setToString = shortOut(baseSetToString$1);
  var setToString$1 = setToString;
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty$1) {
      defineProperty$1(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index2 = -1, length = props.length;
    while (++index2 < length) {
      var key = props[index2];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index2 < length) {
        array[index2] = args[start + index2];
      }
      index2 = -1;
      var otherArgs = Array(start + 1);
      while (++index2 < start) {
        otherArgs[index2] = args[index2];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }
  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + "");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction$1(value);
  }
  function isIterateeCall(value, index2, object) {
    if (!isObject$1(object)) {
      return false;
    }
    var type = typeof index2;
    if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
      return eq(object[index2], value);
    }
    return false;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index2 < length) {
        var source = sources[index2];
        if (source) {
          assigner(object, source, index2, customizer);
        }
      }
      return object;
    });
  }
  var objectProto$6 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$6;
    return value === proto;
  }
  function baseTimes(n, iteratee) {
    var index2 = -1, result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  var argsTag$1 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$1;
  }
  var objectProto$5 = Object.prototype;
  var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments$1 = isArguments;
  function stubFalse() {
    return false;
  }
  var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
  var isBuffer$2 = nativeIsBuffer || stubFalse;
  var isBuffer$3 = isBuffer$2;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var freeProcess = moduleExports$1 && freeGlobal$1.process;
  var nodeUtil = function() {
    try {
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeUtil$1 = nodeUtil;
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  var isTypedArray$1 = isTypedArray;
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$6(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$3(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject$1(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  var nativeCreate = getNative(Object, "create");
  var nativeCreate$1 = nativeCreate;
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  var objectProto$2 = Object.prototype;
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  function hashGet(key) {
    var data2 = this.__data__;
    if (nativeCreate$1) {
      var result = data2[key];
      return result === HASH_UNDEFINED$1 ? void 0 : result;
    }
    return hasOwnProperty$2.call(data2, key) ? data2[key] : void 0;
  }
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  function hashHas(key) {
    var data2 = this.__data__;
    return nativeCreate$1 ? data2[key] !== void 0 : hasOwnProperty$1.call(data2, key);
  }
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data2 = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data2[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  function Hash(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data2 = this.__data__, index2 = assocIndexOf(data2, key);
    if (index2 < 0) {
      return false;
    }
    var lastIndex = data2.length - 1;
    if (index2 == lastIndex) {
      data2.pop();
    } else {
      splice.call(data2, index2, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data2 = this.__data__, index2 = assocIndexOf(data2, key);
    return index2 < 0 ? void 0 : data2[index2][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data2 = this.__data__, index2 = assocIndexOf(data2, key);
    if (index2 < 0) {
      ++this.size;
      data2.push([key, value]);
    } else {
      data2[index2][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map$1 = getNative(root$1, "Map");
  var Map$2 = Map$1;
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$2 || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map, key) {
    var data2 = map.__data__;
    return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data2 = getMapData(this, key), size2 = data2.size;
    data2.set(key, value);
    this.size += data2.size == size2 ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function toString$1(value) {
    return value == null ? "" : baseToString(value);
  }
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  var getPrototype$1 = getPrototype;
  var objectTag = "[object Object]";
  var funcProto = Function.prototype, objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject$1(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  function baseSlice(array, start, end) {
    var index2 = -1, length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index2 < length) {
      result[index2] = array[index2 + start];
    }
    return result;
  }
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === void 0 ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
  }
  var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
  var rsZWJ$1 = "\\u200d";
  var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function asciiToArray(string) {
    return string.split("");
  }
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
  var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
  var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function createCaseFirst(methodName) {
    return function(string) {
      string = toString$1(string);
      var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  var upperFirst = createCaseFirst("toUpperCase");
  var upperFirst$1 = upperFirst;
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data2 = this.__data__, result = data2["delete"](key);
    this.size = data2.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data2 = this.__data__;
    if (data2 instanceof ListCache) {
      var pairs = data2.__data__;
      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data2.size;
        return this;
      }
      data2 = this.__data__ = new MapCache(pairs);
    }
    data2.set(key, value);
    this.size = data2.size;
    return this;
  }
  function Stack(entries) {
    var data2 = this.__data__ = new ListCache(entries);
    this.size = data2.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  var Uint8Array$1 = root$1.Uint8Array;
  var Uint8Array$2 = Uint8Array$1;
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
    return result;
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
  }
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index2];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var baseFor = createBaseFor();
  var baseFor$1 = baseFor;
  function assignMergeValue(object, key, value) {
    if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray$6(srcValue), isBuff = !isArr && isBuffer$3(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray$6(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject$1(srcValue) || isArguments$1(srcValue)) {
        newValue = objValue;
        if (isArguments$1(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject$1(objValue) || isFunction$1(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor$1(source, function(srcValue, key) {
      stack || (stack = new Stack());
      if (isObject$1(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }
  var merge$2 = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });
  var merge$3 = merge$2;
  const ssrContextKey = Symbol("@css-render/vue3-ssr");
  function createStyleString(id, style2) {
    return `<style cssr-id="${id}">
${style2}
</style>`;
  }
  function ssrAdapter(id, style2) {
    const ssrContext = inject(ssrContextKey, null);
    if (ssrContext === null) {
      console.error("[css-render/vue3-ssr]: no ssr context found.");
      return;
    }
    const { styles, ids } = ssrContext;
    if (ids.has(id))
      return;
    if (styles !== null) {
      ids.add(id);
      styles.push(createStyleString(id, style2));
    }
  }
  function useSsrAdapter() {
    const context = inject(ssrContextKey, null);
    if (context === null)
      return void 0;
    return {
      adapter: ssrAdapter,
      context
    };
  }
  function ampCount(selector) {
    let cnt = 0;
    for (let i2 = 0; i2 < selector.length; ++i2) {
      if (selector[i2] === "&")
        ++cnt;
    }
    return cnt;
  }
  const seperatorRegex = /\s*,(?![^(]*\))\s*/g;
  const extraSpaceRegex = /\s+/g;
  function resolveSelectorWithAmp(amp, selector) {
    const nextAmp = [];
    selector.split(seperatorRegex).forEach((partialSelector) => {
      let round = ampCount(partialSelector);
      if (!round) {
        amp.forEach((partialAmp) => {
          nextAmp.push((partialAmp && partialAmp + " ") + partialSelector);
        });
        return;
      } else if (round === 1) {
        amp.forEach((partialAmp) => {
          nextAmp.push(partialSelector.replace("&", partialAmp));
        });
        return;
      }
      let partialNextAmp = [
        partialSelector
      ];
      while (round--) {
        const nextPartialNextAmp = [];
        partialNextAmp.forEach((selectorItr) => {
          amp.forEach((partialAmp) => {
            nextPartialNextAmp.push(selectorItr.replace("&", partialAmp));
          });
        });
        partialNextAmp = nextPartialNextAmp;
      }
      partialNextAmp.forEach((part) => nextAmp.push(part));
    });
    return nextAmp;
  }
  function resolveSelector(amp, selector) {
    const nextAmp = [];
    selector.split(seperatorRegex).forEach((partialSelector) => {
      amp.forEach((partialAmp) => {
        nextAmp.push((partialAmp && partialAmp + " ") + partialSelector);
      });
    });
    return nextAmp;
  }
  function parseSelectorPath(selectorPaths) {
    let amp = [""];
    selectorPaths.forEach((selector) => {
      selector = selector && selector.trim();
      if (!selector) {
        return;
      }
      if (selector.includes("&")) {
        amp = resolveSelectorWithAmp(amp, selector);
      } else {
        amp = resolveSelector(amp, selector);
      }
    });
    return amp.join(", ").replace(extraSpaceRegex, " ");
  }
  const kebabRegex = /[A-Z]/g;
  function kebabCase(pattern) {
    return pattern.replace(kebabRegex, (match2) => "-" + match2.toLowerCase());
  }
  function upwrapProperty(prop, indent = "  ") {
    if (typeof prop === "object" && prop !== null) {
      return " {\n" + Object.entries(prop).map((v) => {
        return indent + `  ${kebabCase(v[0])}: ${v[1]};`;
      }).join("\n") + "\n" + indent + "}";
    }
    return `: ${prop};`;
  }
  function upwrapProperties(props, instance, params) {
    if (typeof props === "function") {
      return props({
        context: instance.context,
        props: params
      });
    }
    return props;
  }
  function createStyle(selector, props, instance, params) {
    if (!props)
      return "";
    const unwrappedProps = upwrapProperties(props, instance, params);
    if (!unwrappedProps)
      return "";
    if (typeof unwrappedProps === "string") {
      return `${selector} {
${unwrappedProps}
}`;
    }
    const propertyNames = Object.keys(unwrappedProps);
    if (propertyNames.length === 0) {
      if (instance.config.keepEmptyBlock)
        return selector + " {\n}";
      return "";
    }
    const statements = selector ? [
      selector + " {"
    ] : [];
    propertyNames.forEach((propertyName) => {
      const property = unwrappedProps[propertyName];
      if (propertyName === "raw") {
        statements.push("\n" + property + "\n");
        return;
      }
      propertyName = kebabCase(propertyName);
      if (property !== null && property !== void 0) {
        statements.push(`  ${propertyName}${upwrapProperty(property)}`);
      }
    });
    if (selector) {
      statements.push("}");
    }
    return statements.join("\n");
  }
  function loopCNodeListWithCallback(children, options, callback) {
    if (!children)
      return;
    children.forEach((child) => {
      if (Array.isArray(child)) {
        loopCNodeListWithCallback(child, options, callback);
      } else if (typeof child === "function") {
        const grandChildren = child(options);
        if (Array.isArray(grandChildren)) {
          loopCNodeListWithCallback(grandChildren, options, callback);
        } else if (grandChildren) {
          callback(grandChildren);
        }
      } else if (child) {
        callback(child);
      }
    });
  }
  function traverseCNode(node, selectorPaths, styles, instance, params, styleSheet) {
    const $ = node.$;
    if (!$ || typeof $ === "string") {
      selectorPaths.push($);
    } else if (typeof $ === "function") {
      selectorPaths.push($({
        context: instance.context,
        props: params
      }));
    } else {
      if ($.before)
        $.before(instance.context);
      if (!$.$ || typeof $.$ === "string") {
        selectorPaths.push($.$);
      } else if ($.$) {
        selectorPaths.push($.$({
          context: instance.context,
          props: params
        }));
      }
    }
    const selector = parseSelectorPath(selectorPaths);
    const style2 = createStyle(selector, node.props, instance, params);
    if (styleSheet && style2) {
      styleSheet.insertRule(style2);
    }
    if (!styleSheet && style2.length)
      styles.push(style2);
    if (node.children) {
      loopCNodeListWithCallback(node.children, {
        context: instance.context,
        props: params
      }, (childNode) => {
        if (typeof childNode === "string") {
          const style3 = createStyle(selector, { raw: childNode }, instance, params);
          if (styleSheet) {
            styleSheet.insertRule(style3);
          } else {
            styles.push(style3);
          }
        } else {
          traverseCNode(childNode, selectorPaths, styles, instance, params, styleSheet);
        }
      });
    }
    selectorPaths.pop();
    if ($ && $.after)
      $.after(instance.context);
  }
  function render$1(node, instance, props, insertRule = false) {
    const styles = [];
    traverseCNode(node, [], styles, instance, props, insertRule ? node.instance.__styleSheet : void 0);
    if (insertRule)
      return "";
    return styles.join("\n\n");
  }
  function murmur2(str) {
    var h2 = 0;
    var k, i2 = 0, len2 = str.length;
    for (; len2 >= 4; ++i2, len2 -= 4) {
      k = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
      k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
      k ^= k >>> 24;
      h2 = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    }
    switch (len2) {
      case 3:
        h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
      case 2:
        h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
      case 1:
        h2 ^= str.charCodeAt(i2) & 255;
        h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    }
    h2 ^= h2 >>> 13;
    h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
  }
  function removeElement(el) {
    if (!el)
      return;
    const parentElement = el.parentElement;
    if (parentElement)
      parentElement.removeChild(el);
  }
  function queryElement(id) {
    return document.querySelector(`style[cssr-id="${id}"]`);
  }
  function createElement(id) {
    const el = document.createElement("style");
    el.setAttribute("cssr-id", id);
    return el;
  }
  if (typeof window !== "undefined") {
    window.__cssrContext = {};
  }
  function unmount(intance, node, id) {
    const { els } = node;
    if (id === void 0) {
      els.forEach(removeElement);
      node.els = [];
    } else {
      const target = queryElement(id);
      if (target && els.includes(target)) {
        removeElement(target);
        node.els = els.filter((el) => el !== target);
      }
    }
  }
  function addElementToList(els, target) {
    els.push(target);
  }
  function mount(instance, node, id, props, head, slient, force, ssrAdapter2) {
    var _a;
    if (slient && !ssrAdapter2) {
      if (id === void 0) {
        console.error("[css-render/mount]: `id` is required in `slient` mode.");
        return;
      }
      const cssrContext = window.__cssrContext;
      if (!cssrContext[id]) {
        cssrContext[id] = true;
        render$1(node, instance, props, slient);
      }
      return;
    }
    let style2;
    if (id === void 0) {
      style2 = node.render(props);
      id = murmur2(style2);
    }
    if (ssrAdapter2) {
      ssrAdapter2.adapter(id, style2 !== null && style2 !== void 0 ? style2 : node.render(props));
      return;
    }
    const queriedTarget = queryElement(id);
    if (queriedTarget !== null && !force) {
      return queriedTarget;
    }
    const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : createElement(id);
    if (style2 === void 0)
      style2 = node.render(props);
    target.textContent = style2;
    if (queriedTarget !== null)
      return queriedTarget;
    if (head) {
      const firstStyleEl = (_a = document.head.querySelector("style, link")) !== null && _a !== void 0 ? _a : null;
      document.head.insertBefore(target, firstStyleEl);
    } else {
      document.head.appendChild(target);
    }
    addElementToList(node.els, target);
    return queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : target;
  }
  function wrappedRender(props) {
    return render$1(this, this.instance, props);
  }
  function wrappedMount(options = {}) {
    const { id, ssr, props, head = false, slient = false, force = false } = options;
    const targetElement = mount(this.instance, this, id, props, head, slient, force, ssr);
    return targetElement;
  }
  function wrappedUnmount(options = {}) {
    const { id } = options;
    unmount(this.instance, this, id);
  }
  const createCNode = function(instance, $, props, children) {
    return {
      instance,
      $,
      props,
      children,
      els: [],
      render: wrappedRender,
      mount: wrappedMount,
      unmount: wrappedUnmount
    };
  };
  const c$1 = function(instance, $, props, children) {
    if (Array.isArray($)) {
      return createCNode(instance, { $: null }, null, $);
    }
    if (Array.isArray(props)) {
      return createCNode(instance, $, null, props);
    } else if (Array.isArray(children)) {
      return createCNode(instance, $, props, children);
    } else {
      return createCNode(instance, $, props, null);
    }
  };
  function CssRender(config = {}) {
    let styleSheet = null;
    const cssr2 = {
      c: (...args) => c$1(cssr2, ...args),
      use: (plugin2, ...args) => plugin2.install(cssr2, ...args),
      find: queryElement,
      context: {},
      config,
      get __styleSheet() {
        if (!styleSheet) {
          const style2 = document.createElement("style");
          document.head.appendChild(style2);
          styleSheet = document.styleSheets[document.styleSheets.length - 1];
          return styleSheet;
        }
        return styleSheet;
      }
    };
    return cssr2;
  }
  function exists(id, ssr) {
    if (id === void 0)
      return false;
    if (ssr) {
      const { context: { ids } } = ssr;
      return ids.has(id);
    }
    return queryElement(id) !== null;
  }
  function plugin$1(options) {
    let _bPrefix = ".";
    let _ePrefix = "__";
    let _mPrefix = "--";
    let c2;
    if (options) {
      let t = options.blockPrefix;
      if (t) {
        _bPrefix = t;
      }
      t = options.elementPrefix;
      if (t) {
        _ePrefix = t;
      }
      t = options.modifierPrefix;
      if (t) {
        _mPrefix = t;
      }
    }
    const _plugin = {
      install(instance) {
        c2 = instance.c;
        const ctx2 = instance.context;
        ctx2.bem = {};
        ctx2.bem.b = null;
        ctx2.bem.els = null;
      }
    };
    function b(arg) {
      let memorizedB;
      let memorizedE;
      return {
        before(ctx2) {
          memorizedB = ctx2.bem.b;
          memorizedE = ctx2.bem.els;
          ctx2.bem.els = null;
        },
        after(ctx2) {
          ctx2.bem.b = memorizedB;
          ctx2.bem.els = memorizedE;
        },
        $({ context, props }) {
          arg = typeof arg === "string" ? arg : arg({ context, props });
          context.bem.b = arg;
          return `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}`;
        }
      };
    }
    function e(arg) {
      let memorizedE;
      return {
        before(ctx2) {
          memorizedE = ctx2.bem.els;
        },
        after(ctx2) {
          ctx2.bem.els = memorizedE;
        },
        $({ context, props }) {
          arg = typeof arg === "string" ? arg : arg({ context, props });
          context.bem.els = arg.split(",").map((v) => v.trim());
          return context.bem.els.map((el) => `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}__${el}`).join(", ");
        }
      };
    }
    function m(arg) {
      return {
        $({ context, props }) {
          arg = typeof arg === "string" ? arg : arg({ context, props });
          const modifiers = arg.split(",").map((v) => v.trim());
          function elementToSelector(el) {
            return modifiers.map((modifier) => `&${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${el !== void 0 ? `${_ePrefix}${el}` : ""}${_mPrefix}${modifier}`).join(", ");
          }
          const els = context.bem.els;
          if (els !== null) {
            return elementToSelector(els[0]);
          } else {
            return elementToSelector();
          }
        }
      };
    }
    function notM(arg) {
      return {
        $({ context, props }) {
          arg = typeof arg === "string" ? arg : arg({ context, props });
          const els = context.bem.els;
          return `&:not(${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${els !== null && els.length > 0 ? `${_ePrefix}${els[0]}` : ""}${_mPrefix}${arg})`;
        }
      };
    }
    const cB2 = (...args) => c2(b(args[0]), args[1], args[2]);
    const cE2 = (...args) => c2(e(args[0]), args[1], args[2]);
    const cM2 = (...args) => c2(m(args[0]), args[1], args[2]);
    const cNotM2 = (...args) => c2(notM(args[0]), args[1], args[2]);
    Object.assign(_plugin, {
      cB: cB2,
      cE: cE2,
      cM: cM2,
      cNotM: cNotM2
    });
    return _plugin;
  }
  function createKey(prefix2, suffix2) {
    return prefix2 + (suffix2 === "default" ? "" : suffix2.replace(/^[a-z]/, (startChar) => startChar.toUpperCase()));
  }
  createKey("abc", "def");
  const namespace = "n";
  const prefix = `.${namespace}-`;
  const elementPrefix = "__";
  const modifierPrefix = "--";
  const cssr = CssRender();
  const plugin = plugin$1({
    blockPrefix: prefix,
    elementPrefix,
    modifierPrefix
  });
  cssr.use(plugin);
  const { c, find } = cssr;
  const { cB, cE, cM, cNotM } = plugin;
  function insideFormItem(status, style2) {
    if (status === null)
      return style2;
    return c([
      ({ props: { bPrefix } }) => c(`${bPrefix || prefix}form-item`, [
        c(`${bPrefix || prefix}form-item-blank`, [
          c(`&${bPrefix || prefix}form-item-blank${modifierPrefix}${status}`, [
            style2
          ])
        ])
      ])
    ]);
  }
  function insideModal(style2) {
    return c(({ props: { bPrefix } }) => `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`, [style2]);
  }
  function insidePopover(style2) {
    return c(({ props: { bPrefix } }) => `${bPrefix || prefix}popover:not(${bPrefix || prefix}tooltip)`, [style2]);
  }
  function asModal(style2) {
    return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style2);
  }
  var commonVariables$3 = {
    fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
    fontWeight: "400",
    fontWeightStrong: "500",
    cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
    cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
    cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
    borderRadius: "3px",
    borderRadiusSmall: "2px",
    fontSize: "14px",
    fontSizeTiny: "12px",
    fontSizeSmall: "14px",
    fontSizeMedium: "14px",
    fontSizeLarge: "15px",
    fontSizeHuge: "16px",
    lineHeight: "1.6",
    heightTiny: "22px",
    heightSmall: "28px",
    heightMedium: "34px",
    heightLarge: "40px",
    heightHuge: "46px",
    transformDebounceScale: "scale(1)"
  };
  var globalStyle = c("body", `
 margin: 0;
 font-size: ${commonVariables$3.fontSize};
 font-family: ${commonVariables$3.fontFamily};
 line-height: ${commonVariables$3.lineHeight};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [c("input", `
 font-family: inherit;
 font-size: inherit;
 `)]);
  function useFalseUntilTruthy(originalRef) {
    const currentRef = ref(!!originalRef.value);
    if (currentRef.value)
      return readonly(currentRef);
    const stop = watch(originalRef, (value) => {
      if (value) {
        currentRef.value = true;
        stop();
      }
    });
    return readonly(currentRef);
  }
  function useMemo(getterOrOptions) {
    const computedValueRef = computed(getterOrOptions);
    const valueRef = ref(computedValueRef.value);
    watch(computedValueRef, (value) => {
      valueRef.value = value;
    });
    if (typeof getterOrOptions === "function") {
      return valueRef;
    } else {
      return {
        __v_isRef: true,
        get value() {
          return valueRef.value;
        },
        set value(v) {
          getterOrOptions.set(v);
        }
      };
    }
  }
  function hasInstance() {
    return getCurrentInstance() !== null;
  }
  const isBrowser$1 = typeof window !== "undefined";
  const traps = {
    mousemoveoutside: new WeakMap(),
    clickoutside: new WeakMap()
  };
  function createTrapHandler(name, el, originalHandler) {
    if (name === "mousemoveoutside") {
      const moveHandler = (e) => {
        if (el.contains(e.target))
          return;
        originalHandler(e);
      };
      return {
        mousemove: moveHandler,
        touchstart: moveHandler
      };
    } else if (name === "clickoutside") {
      let mouseDownOutside = false;
      const downHandler = (e) => {
        mouseDownOutside = !el.contains(e.target);
      };
      const upHanlder = (e) => {
        if (!mouseDownOutside)
          return;
        if (el.contains(e.target))
          return;
        originalHandler(e);
      };
      return {
        mousedown: downHandler,
        mouseup: upHanlder,
        touchstart: downHandler,
        touchend: upHanlder
      };
    }
    console.error(`[evtd/create-trap-handler]: name \`${name}\` is invalid. This could be a bug of evtd.`);
    return {};
  }
  function ensureTrapHandlers(name, el, handler) {
    const handlers = traps[name];
    let elHandlers = handlers.get(el);
    if (elHandlers === void 0) {
      handlers.set(el, elHandlers = new WeakMap());
    }
    let trapHandler = elHandlers.get(handler);
    if (trapHandler === void 0) {
      elHandlers.set(handler, trapHandler = createTrapHandler(name, el, handler));
    }
    return trapHandler;
  }
  function trapOn(name, el, handler, options) {
    if (name === "mousemoveoutside" || name === "clickoutside") {
      const trapHandlers = ensureTrapHandlers(name, el, handler);
      Object.keys(trapHandlers).forEach((key) => {
        on(key, document, trapHandlers[key], options);
      });
      return true;
    }
    return false;
  }
  function trapOff(name, el, handler, options) {
    if (name === "mousemoveoutside" || name === "clickoutside") {
      const trapHandlers = ensureTrapHandlers(name, el, handler);
      Object.keys(trapHandlers).forEach((key) => {
        off(key, document, trapHandlers[key], options);
      });
      return true;
    }
    return false;
  }
  function createDelegate() {
    if (typeof window === "undefined") {
      return {
        on: () => {
        },
        off: () => {
        }
      };
    }
    const propagationStopped = new WeakMap();
    const immediatePropagationStopped = new WeakMap();
    function trackPropagation() {
      propagationStopped.set(this, true);
    }
    function trackImmediate() {
      propagationStopped.set(this, true);
      immediatePropagationStopped.set(this, true);
    }
    function spy(event, propName, fn) {
      const source = event[propName];
      event[propName] = function() {
        fn.apply(event, arguments);
        return source.apply(event, arguments);
      };
      return event;
    }
    function unspy(event, propName) {
      event[propName] = Event.prototype[propName];
    }
    const currentTargets = new WeakMap();
    const currentTargetDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function getCurrentTarget() {
      var _a;
      return (_a = currentTargets.get(this)) !== null && _a !== void 0 ? _a : null;
    }
    function defineCurrentTarget(event, getter) {
      if (currentTargetDescriptor === void 0)
        return;
      Object.defineProperty(event, "currentTarget", {
        configurable: true,
        enumerable: true,
        get: getter !== null && getter !== void 0 ? getter : currentTargetDescriptor.get
      });
    }
    const phaseToTypeToElToHandlers = {
      bubble: {},
      capture: {}
    };
    const typeToWindowEventHandlers = {};
    function createUnifiedHandler() {
      const delegeteHandler = function(e) {
        const { type, eventPhase, target, bubbles } = e;
        if (eventPhase === 2)
          return;
        const phase = eventPhase === 1 ? "capture" : "bubble";
        let cursor = target;
        const path = [];
        while (true) {
          if (cursor === null)
            cursor = window;
          path.push(cursor);
          if (cursor === window) {
            break;
          }
          cursor = cursor.parentNode || null;
        }
        const captureElToHandlers = phaseToTypeToElToHandlers.capture[type];
        const bubbleElToHandlers = phaseToTypeToElToHandlers.bubble[type];
        spy(e, "stopPropagation", trackPropagation);
        spy(e, "stopImmediatePropagation", trackImmediate);
        defineCurrentTarget(e, getCurrentTarget);
        if (phase === "capture") {
          if (captureElToHandlers === void 0)
            return;
          for (let i2 = path.length - 1; i2 >= 0; --i2) {
            if (propagationStopped.has(e))
              break;
            const target2 = path[i2];
            const handlers = captureElToHandlers.get(target2);
            if (handlers !== void 0) {
              currentTargets.set(e, target2);
              for (const handler of handlers) {
                if (immediatePropagationStopped.has(e))
                  break;
                handler(e);
              }
            }
            if (i2 === 0 && !bubbles && bubbleElToHandlers !== void 0) {
              const bubbleHandlers = bubbleElToHandlers.get(target2);
              if (bubbleHandlers !== void 0) {
                for (const handler of bubbleHandlers) {
                  if (immediatePropagationStopped.has(e))
                    break;
                  handler(e);
                }
              }
            }
          }
        } else if (phase === "bubble") {
          if (bubbleElToHandlers === void 0)
            return;
          for (let i2 = 0; i2 < path.length; ++i2) {
            if (propagationStopped.has(e))
              break;
            const target2 = path[i2];
            const handlers = bubbleElToHandlers.get(target2);
            if (handlers !== void 0) {
              currentTargets.set(e, target2);
              for (const handler of handlers) {
                if (immediatePropagationStopped.has(e))
                  break;
                handler(e);
              }
            }
          }
        }
        unspy(e, "stopPropagation");
        unspy(e, "stopImmediatePropagation");
        defineCurrentTarget(e);
      };
      delegeteHandler.displayName = "evtdUnifiedHandler";
      return delegeteHandler;
    }
    function createUnifiedWindowEventHandler() {
      const delegateHandler = function(e) {
        const { type, eventPhase } = e;
        if (eventPhase !== 2)
          return;
        const handlers = typeToWindowEventHandlers[type];
        if (handlers === void 0)
          return;
        handlers.forEach((handler) => handler(e));
      };
      delegateHandler.displayName = "evtdUnifiedWindowEventHandler";
      return delegateHandler;
    }
    const unifiedHandler = createUnifiedHandler();
    const unfiendWindowEventHandler = createUnifiedWindowEventHandler();
    function ensureElToHandlers(phase, type) {
      const phaseHandlers = phaseToTypeToElToHandlers[phase];
      if (phaseHandlers[type] === void 0) {
        phaseHandlers[type] = new Map();
        window.addEventListener(type, unifiedHandler, phase === "capture");
      }
      return phaseHandlers[type];
    }
    function ensureWindowEventHandlers(type) {
      const windowEventHandlers = typeToWindowEventHandlers[type];
      if (windowEventHandlers === void 0) {
        typeToWindowEventHandlers[type] = new Set();
        window.addEventListener(type, unfiendWindowEventHandler);
      }
      return typeToWindowEventHandlers[type];
    }
    function ensureHandlers(elToHandlers, el) {
      let elHandlers = elToHandlers.get(el);
      if (elHandlers === void 0) {
        elToHandlers.set(el, elHandlers = new Set());
      }
      return elHandlers;
    }
    function handlerExist(el, phase, type, handler) {
      const elToHandlers = phaseToTypeToElToHandlers[phase][type];
      if (elToHandlers !== void 0) {
        const handlers = elToHandlers.get(el);
        if (handlers !== void 0) {
          if (handlers.has(handler))
            return true;
        }
      }
      return false;
    }
    function windowEventHandlerExist(type, handler) {
      const handlers = typeToWindowEventHandlers[type];
      if (handlers !== void 0) {
        if (handlers.has(handler)) {
          return true;
        }
      }
      return false;
    }
    function on2(type, el, handler, options) {
      const trapped = trapOn(type, el, handler, options);
      if (trapped)
        return;
      const phase = options === true || typeof options === "object" && options.capture === true ? "capture" : "bubble";
      const elToHandlers = ensureElToHandlers(phase, type);
      const handlers = ensureHandlers(elToHandlers, el);
      if (!handlers.has(handler))
        handlers.add(handler);
      if (el === window) {
        const windowEventHandlers = ensureWindowEventHandlers(type);
        if (!windowEventHandlers.has(handler)) {
          windowEventHandlers.add(handler);
        }
      }
    }
    function off2(type, el, handler, options) {
      const trapped = trapOff(type, el, handler, options);
      if (trapped)
        return;
      const capture = options === true || typeof options === "object" && options.capture === true;
      const phase = capture ? "capture" : "bubble";
      const elToHandlers = ensureElToHandlers(phase, type);
      const handlers = ensureHandlers(elToHandlers, el);
      if (el === window) {
        const mirrorPhase = capture ? "bubble" : "capture";
        if (!handlerExist(el, mirrorPhase, type, handler) && windowEventHandlerExist(type, handler)) {
          const windowEventHandlers = typeToWindowEventHandlers[type];
          windowEventHandlers.delete(handler);
          if (windowEventHandlers.size === 0) {
            window.removeEventListener(type, unfiendWindowEventHandler);
            typeToWindowEventHandlers[type] = void 0;
          }
        }
      }
      if (handlers.has(handler))
        handlers.delete(handler);
      if (handlers.size === 0) {
        elToHandlers.delete(el);
      }
      if (elToHandlers.size === 0) {
        window.removeEventListener(type, unifiedHandler, phase === "capture");
        phaseToTypeToElToHandlers[phase][type] = void 0;
      }
    }
    return {
      on: on2,
      off: off2
    };
  }
  const { on, off } = createDelegate();
  const mousePositionRef = ref(null);
  function clickHandler(e) {
    mousePositionRef.value = {
      x: e.clientX,
      y: e.clientY
    };
  }
  let usedCount$1 = 0;
  let managable$1 = true;
  function useClickPosition() {
    if (!isBrowser$1)
      return readonly(ref(null));
    if (usedCount$1 === 0)
      on("click", window, clickHandler, true);
    const setup = () => {
      usedCount$1 += 1;
    };
    if (managable$1 && (managable$1 = hasInstance())) {
      onBeforeMount(setup);
      onBeforeUnmount(() => {
        usedCount$1 -= 1;
        if (usedCount$1 === 0)
          off("click", window, clickHandler, true);
      });
    } else {
      setup();
    }
    return readonly(mousePositionRef);
  }
  const clickedTimeRef = ref(void 0);
  let usedCount = 0;
  function handleClick() {
    clickedTimeRef.value = Date.now();
  }
  let managable = true;
  function useClicked(timeout) {
    if (!isBrowser$1)
      return readonly(ref(false));
    const clickedRef = ref(false);
    let timerId = null;
    function clearTimer() {
      if (timerId !== null)
        window.clearTimeout(timerId);
    }
    function clickedHandler() {
      clearTimer();
      clickedRef.value = true;
      timerId = window.setTimeout(() => {
        clickedRef.value = false;
      }, timeout);
    }
    if (usedCount === 0) {
      on("click", window, handleClick, true);
    }
    const setup = () => {
      usedCount += 1;
      on("click", window, clickedHandler, true);
    };
    if (managable && (managable = hasInstance())) {
      onBeforeMount(setup);
      onBeforeUnmount(() => {
        usedCount -= 1;
        if (usedCount === 0) {
          off("click", window, handleClick, true);
        }
        off("click", window, clickedHandler, true);
        clearTimer();
      });
    } else {
      setup();
    }
    return readonly(clickedRef);
  }
  function useMergedState(controlledStateRef, uncontrolledStateRef) {
    watch(controlledStateRef, (value) => {
      if (value !== void 0) {
        uncontrolledStateRef.value = value;
      }
    });
    return computed(() => {
      if (controlledStateRef.value === void 0) {
        return uncontrolledStateRef.value;
      }
      return controlledStateRef.value;
    });
  }
  function isMounted() {
    const isMounted2 = ref(false);
    onMounted(() => {
      isMounted2.value = true;
    });
    return readonly(isMounted2);
  }
  const isIos = (typeof window === "undefined" ? false : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
  function useIsIos() {
    return isIos;
  }
  function keep(object, keys = [], rest) {
    const keepedObject = {};
    keys.forEach((key) => {
      keepedObject[key] = object[key];
    });
    return Object.assign(keepedObject, rest);
  }
  function omit(object, keys = [], rest) {
    const omitedObject = {};
    const originalKeys = Object.getOwnPropertyNames(object);
    originalKeys.forEach((originalKey) => {
      if (!keys.includes(originalKey)) {
        omitedObject[originalKey] = object[originalKey];
      }
    });
    return Object.assign(omitedObject, rest);
  }
  function flatten(vNodes, filterCommentNode = true, result = []) {
    vNodes.forEach((vNode) => {
      if (vNode === null)
        return;
      if (typeof vNode !== "object") {
        if (typeof vNode === "string" || typeof vNode === "number") {
          result.push(createTextVNode(String(vNode)));
        }
        return;
      }
      if (Array.isArray(vNode)) {
        flatten(vNode, filterCommentNode, result);
        return;
      }
      if (vNode.type === Fragment) {
        if (vNode.children === null)
          return;
        if (Array.isArray(vNode.children)) {
          flatten(vNode.children, filterCommentNode, result);
        }
      } else if (vNode.type !== Comment) {
        result.push(vNode);
      }
    });
    return result;
  }
  function call(funcs, ...args) {
    if (Array.isArray(funcs)) {
      funcs.forEach((func) => call(func, ...args));
    } else
      return funcs(...args);
  }
  function keysOf(obj) {
    return Object.keys(obj);
  }
  const render = (r, ...args) => {
    if (typeof r === "function") {
      return r(...args);
    } else if (typeof r === "string") {
      return createTextVNode(r);
    } else if (typeof r === "number") {
      return createTextVNode(String(r));
    } else {
      return null;
    }
  };
  function warn$2(location, message) {
    console.error(`[naive/${location}]: ${message}`);
  }
  function getFirstSlotVNode(slots, slotName = "default", props = void 0) {
    const slot = slots[slotName];
    if (!slot) {
      warn$2("getFirstSlotVNode", `slot[${slotName}] is empty`);
      return null;
    }
    const slotContent = flatten(slot(props));
    if (slotContent.length === 1) {
      return slotContent[0];
    } else {
      warn$2("getFirstSlotVNode", `slot[${slotName}] should have exactly one child`);
      return null;
    }
  }
  const modalBodyInjectionKey = Symbol("modalBody");
  const modalInjectionKey = Symbol("modal");
  const drawerBodyInjectionKey = Symbol("drawerBody");
  const popoverBodyInjectionKey = Symbol("popoverBodyInjection");
  const configProviderInjectionKey = Symbol("configProviderInjection");
  const configProviderProps = {
    abstract: Boolean,
    bordered: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: String,
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: {
      type: String,
      default: "div"
    },
    hljs: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    as: {
      type: String,
      validator: () => {
        warn$2("config-provider", "`as` is deprecated, please use `tag` instead.");
        return true;
      },
      default: void 0
    }
  };
  defineComponent({
    name: "ConfigProvider",
    alias: ["App"],
    props: configProviderProps,
    setup(props) {
      const NConfigProvider = inject(configProviderInjectionKey, null);
      const mergedThemeRef = computed(() => {
        const { theme } = props;
        if (theme === null)
          return void 0;
        const inheritedTheme = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value;
        return theme === void 0 ? inheritedTheme : inheritedTheme === void 0 ? theme : Object.assign({}, inheritedTheme, theme);
      });
      const mergedThemeOverridesRef = computed(() => {
        const { themeOverrides } = props;
        if (themeOverrides === null)
          return void 0;
        if (themeOverrides === void 0) {
          return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
        } else {
          const inheritedThemeOverrides = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
          if (inheritedThemeOverrides === void 0) {
            return themeOverrides;
          } else {
            return merge$3({}, inheritedThemeOverrides, themeOverrides);
          }
        }
      });
      const mergedNamespaceRef = useMemo(() => {
        const { namespace: namespace2 } = props;
        return namespace2 === void 0 ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedNamespaceRef.value : namespace2;
      });
      const mergedBorderedRef = useMemo(() => {
        const { bordered } = props;
        return bordered === void 0 ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBorderedRef.value : bordered;
      });
      const mergedIconsRef = computed(() => {
        const { icons } = props;
        return icons === void 0 ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedIconsRef.value : icons;
      });
      const mergedComponentPropsRef = computed(() => {
        const { componentOptions } = props;
        if (componentOptions !== void 0)
          return componentOptions;
        return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value;
      });
      const mergedClsPrefixRef = computed(() => {
        const { clsPrefix } = props;
        if (clsPrefix !== void 0)
          return clsPrefix;
        return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedClsPrefixRef.value;
      });
      const mergedRtlRef = computed(() => {
        const { rtl } = props;
        if (rtl === void 0) {
          return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef.value;
        }
        const rtlEnabledState = {};
        for (const rtlInfo of rtl) {
          rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo);
        }
        return rtlEnabledState;
      });
      const mergedBreakpointsRef = computed(() => {
        return props.breakpoints || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBreakpointsRef.value);
      });
      provide(configProviderInjectionKey, {
        mergedBreakpointsRef,
        mergedRtlRef,
        mergedIconsRef,
        mergedComponentPropsRef,
        mergedBorderedRef,
        mergedNamespaceRef,
        mergedClsPrefixRef,
        mergedLocaleRef: computed(() => {
          const { locale: locale2 } = props;
          if (locale2 === null)
            return void 0;
          return locale2 === void 0 ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedLocaleRef.value : locale2;
        }),
        mergedDateLocaleRef: computed(() => {
          const { dateLocale } = props;
          if (dateLocale === null)
            return void 0;
          return dateLocale === void 0 ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedDateLocaleRef.value : dateLocale;
        }),
        mergedHljsRef: computed(() => {
          const { hljs } = props;
          return hljs === void 0 ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value : hljs;
        }),
        mergedThemeRef,
        mergedThemeOverridesRef
      });
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        mergedBordered: mergedBorderedRef,
        mergedNamespace: mergedNamespaceRef,
        mergedTheme: mergedThemeRef,
        mergedThemeOverrides: mergedThemeOverridesRef
      };
    },
    render() {
      return !this.abstract ? h(this.as || this.tag, {
        class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`
      }, renderSlot(this.$slots, "default")) : renderSlot(this.$slots, "default");
    }
  });
  function createTheme(theme) {
    return theme;
  }
  function useTheme(resolveId, mountId, style2, defaultTheme, props, clsPrefixRef) {
    const ssrAdapter2 = useSsrAdapter();
    if (style2) {
      const mountStyle = () => {
        const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
        style2.mount({
          id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
          head: true,
          props: {
            bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
          },
          ssr: ssrAdapter2
        });
        globalStyle.mount({
          id: "naive-ui/global",
          head: true,
          ssr: ssrAdapter2
        });
      };
      if (ssrAdapter2) {
        mountStyle();
      } else {
        onBeforeMount(mountStyle);
      }
    }
    const NConfigProvider = inject(configProviderInjectionKey, null);
    const mergedThemeRef = computed(() => {
      var _a;
      const { theme: { common: selfCommon, self: self2, peers = {} } = {}, themeOverrides: selfOverrides = {}, builtinThemeOverrides: builtinOverrides = {} } = props;
      const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides;
      const { common: globalCommon = void 0, [resolveId]: { common: globalSelfCommon = void 0, self: globalSelf = void 0, peers: globalPeers = {} } = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) || {};
      const { common: globalCommonOverrides = void 0, [resolveId]: globalSelfOverrides = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value) || {};
      const { common: globalSelfCommonOverrides, peers: globalPeersOverrides = {} } = globalSelfOverrides;
      const mergedCommon = merge$3({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
      const mergedSelf = merge$3((_a = self2 || globalSelf || defaultTheme.self) === null || _a === void 0 ? void 0 : _a(mergedCommon), builtinOverrides, globalSelfOverrides, selfOverrides);
      return {
        common: mergedCommon,
        self: mergedSelf,
        peers: merge$3({}, defaultTheme.peers, globalPeers, peers),
        peerOverrides: merge$3({}, globalPeersOverrides, peersOverrides)
      };
    });
    return mergedThemeRef;
  }
  useTheme.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  const defaultClsPrefix = "n";
  function useConfig(props = {}, options = {
    defaultBordered: true
  }) {
    const NConfigProvider = inject(configProviderInjectionKey, null);
    return {
      NConfigProvider,
      mergedBorderedRef: computed(() => {
        var _a, _b;
        const { bordered } = props;
        if (bordered !== void 0)
          return bordered;
        return (_b = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBorderedRef.value) !== null && _a !== void 0 ? _a : options.defaultBordered) !== null && _b !== void 0 ? _b : true;
      }),
      mergedClsPrefixRef: computed(() => {
        const clsPrefix = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedClsPrefixRef.value;
        return clsPrefix || defaultClsPrefix;
      }),
      namespaceRef: computed(() => NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedNamespaceRef.value)
    };
  }
  const enUS = {
    name: "en-US",
    global: {
      undo: "Undo",
      redo: "Redo",
      confirm: "Confirm"
    },
    Popconfirm: {
      positiveText: "Confirm",
      negativeText: "Cancel"
    },
    Cascader: {
      placeholder: "Please Select",
      loading: "Loading",
      loadingRequiredMessage: (label) => `Please load all ${label}'s descedants before checking it.`
    },
    Time: {
      dateFormat: "yyyy-MM-dd",
      dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    },
    DatePicker: {
      yearFormat: "yyyy",
      monthFormat: "MMM",
      dayFormat: "eeeeee",
      clear: "Clear",
      now: "Now",
      confirm: "Confirm",
      selectTime: "Select Time",
      selectDate: "Select Date",
      datePlaceholder: "Select Date",
      datetimePlaceholder: "Select Date and Time",
      monthPlaceholder: "Select Month",
      startDatePlaceholder: "Start Date",
      endDatePlaceholder: "End Date",
      startDatetimePlaceholder: "Start Date and Time",
      endDatetimePlaceholder: "End Date and Time",
      monthBeforeYear: true,
      firstDayOfWeek: 6,
      today: "Today"
    },
    DataTable: {
      checkTableAll: "Select all in the table",
      uncheckTableAll: "Unselect all in the table",
      confirm: "Confirm",
      clear: "Clear"
    },
    Transfer: {
      sourceTitle: "Source",
      targetTitle: "Target"
    },
    Empty: {
      description: "No Data"
    },
    Select: {
      placeholder: "Please Select"
    },
    TimePicker: {
      placeholder: "Select Time",
      positiveText: "OK",
      negativeText: "Cancel",
      now: "Now"
    },
    Pagination: {
      goto: "Goto",
      selectionSuffix: "page"
    },
    DynamicTags: {
      add: "Add"
    },
    Log: {
      loading: "Loading"
    },
    Input: {
      placeholder: "Please Input"
    },
    InputNumber: {
      placeholder: "Please Input"
    },
    DynamicInput: {
      create: "Create"
    },
    ThemeEditor: {
      title: "Theme Editor",
      clearAllVars: "Clear All Variables",
      clearSearch: "Clear Search",
      filterCompName: "Filter Component Name",
      filterVarName: "Filter Variable Name",
      import: "Import",
      export: "Export",
      restore: "Reset to Default"
    }
  };
  var enUS$1 = enUS;
  function buildFormatLongFn(args) {
    return function() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }
  function buildLocalizeFn(args) {
    return function(dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var context = options.context ? String(options.context) : "standalone";
      var valuesArray;
      if (context === "formatting" && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index2 = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index2];
    };
  }
  function buildMatchPatternFn(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  function buildMatchFn(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      }) : findKey(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      });
      var value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  var formatDistance = function(token, count, options) {
    var result;
    var tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  var formatDistance$1 = formatDistance;
  var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  var timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  var formatLong$1 = formatLong;
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  var formatRelative = function(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  };
  var formatRelative$1 = formatRelative;
  var eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  var quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  var monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  var dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  var ordinalNumber = function(dirtyNumber, _options) {
    var number = Number(dirtyNumber);
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  var localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: function(quarter) {
        return quarter - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  var localize$1 = localize;
  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match$1 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function(value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: function(index2) {
        return index2 + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  var match$2 = match$1;
  var locale = {
    code: "en-US",
    formatDistance: formatDistance$1,
    formatLong: formatLong$1,
    formatRelative: formatRelative$1,
    localize: localize$1,
    match: match$2,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  var defaultLocale = locale;
  const dateEnUs = {
    name: "en-US",
    locale: defaultLocale
  };
  var dateEnUS = dateEnUs;
  function createLocaleMixin(ns) {
    const { mergedLocaleRef, mergedDateLocaleRef } = inject(configProviderInjectionKey, null) || {};
    const localeRef = computed(() => {
      var _a, _b;
      return (_b = (_a = mergedLocaleRef === null || mergedLocaleRef === void 0 ? void 0 : mergedLocaleRef.value) === null || _a === void 0 ? void 0 : _a[ns]) !== null && _b !== void 0 ? _b : enUS$1[ns];
    });
    const dateLocaleRef = computed(() => {
      var _a;
      return (_a = mergedDateLocaleRef === null || mergedDateLocaleRef === void 0 ? void 0 : mergedDateLocaleRef.value) !== null && _a !== void 0 ? _a : dateEnUS;
    });
    return {
      dateLocaleRef,
      localeRef
    };
  }
  function useStyle(mountId, style2, clsPrefixRef) {
    if (!style2) {
      return;
    }
    const ssrAdapter2 = useSsrAdapter();
    const mountStyle = () => {
      const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
      style2.mount({
        id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
        },
        ssr: ssrAdapter2
      });
      globalStyle.mount({
        id: "naive-ui/global",
        head: true,
        ssr: ssrAdapter2
      });
    };
    if (ssrAdapter2) {
      mountStyle();
    } else {
      onBeforeMount(mountStyle);
    }
  }
  function replaceable(name, icon) {
    return defineComponent({
      name: upperFirst$1(name),
      setup() {
        const { NConfigProvider } = useConfig();
        return () => {
          var _a;
          const iconOverride = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedIconsRef.value) === null || _a === void 0 ? void 0 : _a[name];
          return iconOverride ? iconOverride() : icon;
        };
      }
    });
  }
  var ErrorIcon$1 = replaceable("close", h("svg", { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { fill: "currentColor", "fill-rule": "nonzero" }, h("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })))));
  var EyeIcon = defineComponent({
    name: "Eye",
    render() {
      return h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }), h("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }));
    }
  });
  var EyeOffIcon = defineComponent({
    name: "EyeOff",
    render() {
      return h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }), h("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }), h("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }), h("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }), h("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" }));
    }
  });
  var ErrorIcon = replaceable("error", h("svg", { viewBox: "0 0 48 48", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, h("g", { "fill-rule": "nonzero" }, h("path", { d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z" })))));
  var InfoIcon = replaceable("info", h("svg", { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, h("g", { "fill-rule": "nonzero" }, h("path", { d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z" })))));
  var SuccessIcon = replaceable("success", h("svg", { viewBox: "0 0 48 48", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, h("g", { "fill-rule": "nonzero" }, h("path", { d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z" })))));
  var WarningIcon = replaceable("warning", h("svg", { viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, h("g", { "fill-rule": "nonzero" }, h("path", { d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z" })))));
  var ChevronDownIcon = defineComponent({
    name: "ChevronDown",
    render() {
      return h("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" }));
    }
  });
  var ClearIcon = replaceable("clear", h("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { fill: "currentColor", "fill-rule": "nonzero" }, h("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })))));
  var NIconSwitchTransition = defineComponent({
    name: "BaseIconSwitchTransition",
    setup(_2, { slots }) {
      const isMountedRef = isMounted();
      return () => h(Transition, { name: "icon-switch-transition", appear: isMountedRef.value }, slots);
    }
  });
  var NFadeInExpandTransition = defineComponent({
    name: "FadeInExpandTransition",
    props: {
      appear: Boolean,
      group: Boolean,
      mode: String,
      onLeave: Function,
      onAfterLeave: Function,
      onAfterEnter: Function,
      width: Boolean,
      reverse: Boolean
    },
    setup(props, { slots }) {
      function handleBeforeLeave(el) {
        if (props.width) {
          el.style.maxWidth = `${el.offsetWidth}px`;
        } else {
          el.style.maxHeight = `${el.offsetHeight}px`;
        }
        void el.offsetWidth;
      }
      function handleLeave(el) {
        if (props.width) {
          el.style.maxWidth = "0";
        } else {
          el.style.maxHeight = "0";
        }
        void el.offsetWidth;
        const { onLeave } = props;
        if (onLeave)
          onLeave();
      }
      function handleAfterLeave(el) {
        if (props.width) {
          el.style.maxWidth = "";
        } else {
          el.style.maxHeight = "";
        }
        const { onAfterLeave } = props;
        if (onAfterLeave)
          onAfterLeave();
      }
      function handleEnter(el) {
        el.style.transition = "none";
        if (props.width) {
          const memorizedWidth = el.offsetWidth;
          el.style.maxWidth = "0";
          void el.offsetWidth;
          el.style.transition = "";
          el.style.maxWidth = `${memorizedWidth}px`;
        } else {
          if (props.reverse) {
            el.style.maxHeight = `${el.offsetHeight}px`;
            void el.offsetHeight;
            el.style.transition = "";
            el.style.maxHeight = "0";
          } else {
            const memorizedHeight = el.offsetHeight;
            el.style.maxHeight = "0";
            void el.offsetWidth;
            el.style.transition = "";
            el.style.maxHeight = `${memorizedHeight}px`;
          }
        }
        void el.offsetWidth;
      }
      function handleAfterEnter(el) {
        var _a;
        if (props.width) {
          el.style.maxWidth = "";
        } else {
          if (!props.reverse) {
            el.style.maxHeight = "";
          }
        }
        (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
      }
      return () => {
        const type = props.group ? TransitionGroup : Transition;
        return h(type, {
          name: props.width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
          mode: props.mode,
          appear: props.appear,
          onEnter: handleEnter,
          onAfterEnter: handleAfterEnter,
          onBeforeLeave: handleBeforeLeave,
          onLeave: handleLeave,
          onAfterLeave: handleAfterLeave
        }, slots);
      };
    }
  });
  var style$b = cB("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [c("svg", {
    height: "1em",
    width: "1em"
  })]);
  var NBaseIcon = defineComponent({
    name: "BaseIcon",
    props: {
      role: String,
      ariaLabel: String,
      ariaDisabled: {
        type: Boolean,
        default: void 0
      },
      ariaHidden: {
        type: Boolean,
        default: void 0
      },
      clsPrefix: {
        type: String,
        required: true
      },
      onClick: Function,
      onMousedown: Function,
      onMouseup: Function
    },
    setup(props) {
      useStyle("BaseIcon", style$b, toRef(props, "clsPrefix"));
    },
    render() {
      return h("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
    }
  });
  var style$a = cB("base-close", `
 cursor: pointer;
 color: var(--close-color);
`, [c("&:hover", {
    color: "var(--close-color-hover)"
  }), c("&:active", {
    color: "var(--close-color-pressed)"
  }), cM("disabled", {
    cursor: "not-allowed!important",
    color: "var(--close-color-disabled)"
  })]);
  var NBaseClose = defineComponent({
    name: "BaseClose",
    props: {
      clsPrefix: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: void 0
      },
      onClick: Function
    },
    setup(props) {
      useStyle("BaseClose", style$a, toRef(props, "clsPrefix"));
      return () => {
        const { clsPrefix, disabled } = props;
        return h(NBaseIcon, { role: "button", ariaDisabled: disabled, ariaLabel: "close", clsPrefix, class: [
          `${clsPrefix}-base-close`,
          disabled && `${clsPrefix}-base-close--disabled`
        ], onClick: disabled ? void 0 : props.onClick }, {
          default: () => h(ErrorIcon$1, null)
        });
      };
    }
  });
  function createIconSwitchTransition({
    originalTransform = "",
    left = 0,
    top = 0,
    transition = `all .3s ${commonVariables$3.cubicBezierEaseInOut} !important`
  } = {}) {
    return [c("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
      transform: originalTransform + " scale(0.75)",
      left,
      top,
      opacity: 0
    }), c("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
      transform: `${commonVariables$3.transformDebounceScale} ${originalTransform}`,
      left,
      top,
      opacity: 1
    }), c("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
      transformOrigin: "center",
      position: "absolute",
      left,
      top,
      transition
    })];
  }
  var style$9 = cB("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
`, [cE("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [createIconSwitchTransition({
    left: "50%",
    top: "50%",
    originalTransform: "translateX(-50%) translateY(-50%)"
  })]), cE("icon", `
 height: 1em;
 width: 1em;
 `, [createIconSwitchTransition()])]);
  const duration = "1.6s";
  var NBaseLoading = defineComponent({
    name: "BaseLoading",
    props: {
      clsPrefix: {
        type: String,
        required: true
      },
      scale: {
        type: Number,
        default: 1
      },
      radius: {
        type: Number,
        default: 100
      },
      strokeWidth: {
        type: Number,
        default: 28
      },
      stroke: {
        type: String,
        default: void 0
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      useStyle("BaseLoading", style$9, toRef(props, "clsPrefix"));
    },
    render() {
      const { clsPrefix, radius, strokeWidth, stroke, scale } = this;
      const scaledRadius = radius / scale;
      return h("div", { class: `${clsPrefix}-base-loading`, role: "img", "aria-label": "loading" }, h(NIconSwitchTransition, null, {
        default: () => this.show ? h("svg", { class: `${clsPrefix}-base-loading__icon`, viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`, xmlns: "http://www.w3.org/2000/svg", style: { color: stroke } }, h("g", null, h("animateTransform", { attributeName: "transform", type: "rotate", values: `0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`, begin: "0s", dur: duration, fill: "freeze", repeatCount: "indefinite" }), h("circle", { fill: "none", stroke: "currentColor", "stroke-width": strokeWidth, "stroke-linecap": "round", cx: scaledRadius, cy: scaledRadius, r: radius - strokeWidth / 2, "stroke-dasharray": 5.67 * radius, "stroke-dashoffset": 18.48 * radius }, h("animateTransform", { attributeName: "transform", type: "rotate", values: `0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`, begin: "0s", dur: duration, fill: "freeze", repeatCount: "indefinite" }), h("animate", { attributeName: "stroke-dashoffset", values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`, begin: "0s", dur: duration, fill: "freeze", repeatCount: "indefinite" })))) : h("div", { key: "placeholder", class: `${clsPrefix}-base-loading__placeholder` }, this.$slots)
      }));
    }
  });
  function getSlot(slots, slotName = "default") {
    const slot = slots[slotName];
    if (slot === void 0) {
      throw new Error(`[vueuc/binder]: slot[${slotName}] is empty.`);
    }
    return slot();
  }
  const ctxKey = "@@coContext";
  const clickoutside = {
    mounted(el, { value }) {
      el[ctxKey] = {
        handler: void 0
      };
      if (typeof value === "function") {
        el[ctxKey].handler = value;
        on("clickoutside", el, value);
      }
    },
    updated(el, { value }) {
      const ctx2 = el[ctxKey];
      if (typeof value === "function") {
        if (ctx2.handler) {
          if (ctx2.handler !== value) {
            off("clickoutside", el, ctx2.handler);
            ctx2.handler = value;
            on("clickoutside", el, value);
          }
        } else {
          el[ctxKey].handler = value;
          on("clickoutside", el, value);
        }
      } else {
        if (ctx2.handler) {
          off("clickoutside", el, ctx2.handler);
          ctx2.handler = void 0;
        }
      }
    },
    unmounted(el) {
      const { handler } = el[ctxKey];
      if (handler) {
        off("clickoutside", el, handler);
      }
      el[ctxKey].handler = void 0;
    }
  };
  var clickoutside$1 = clickoutside;
  function warn$1(location, message) {
    console.error(`[vdirs/${location}]: ${message}`);
  }
  class ZIndexManager {
    constructor() {
      this.elementZIndex = new Map();
      this.nextZIndex = 2e3;
    }
    get elementCount() {
      return this.elementZIndex.size;
    }
    ensureZIndex(el, zIndex) {
      const { elementZIndex } = this;
      if (zIndex !== void 0) {
        el.style.zIndex = `${zIndex}`;
        elementZIndex.delete(el);
        return;
      }
      const { nextZIndex } = this;
      if (elementZIndex.has(el)) {
        const currentZIndex = elementZIndex.get(el);
        if (currentZIndex + 1 === this.nextZIndex)
          return;
      }
      el.style.zIndex = `${nextZIndex}`;
      elementZIndex.set(el, nextZIndex);
      this.nextZIndex = nextZIndex + 1;
      this.squashState();
    }
    unregister(el) {
      const { elementZIndex } = this;
      if (elementZIndex.has(el)) {
        elementZIndex.delete(el);
      } else {
        warn$1("vdirs/z-index-manager/unregister-element", "Element not found when unregistering.");
      }
      this.squashState();
    }
    squashState() {
      const { elementCount } = this;
      if (!elementCount) {
        this.nextZIndex = 2e3;
      }
      if (this.nextZIndex - elementCount > 2500)
        this.rearrange();
    }
    rearrange() {
      const elementZIndexPair = Array.from(this.elementZIndex.entries());
      elementZIndexPair.sort((pair1, pair2) => {
        return pair1[1] - pair2[1];
      });
      this.nextZIndex = 2e3;
      elementZIndexPair.forEach((pair) => {
        const el = pair[0];
        const zIndex = this.nextZIndex++;
        if (`${zIndex}` !== el.style.zIndex)
          el.style.zIndex = `${zIndex}`;
      });
    }
  }
  var zIndexManager = new ZIndexManager();
  const ctx = "@@ziContext";
  const zindexable = {
    mounted(el, bindings) {
      const { value = {} } = bindings;
      const { zIndex, enabled } = value;
      zIndexManager.ensureZIndex(el, zIndex);
      el[ctx] = {
        enabled
      };
    },
    updated(el, bindings) {
      const { value = {} } = bindings;
      const { zIndex, enabled } = value;
      const cachedEnabled = el[ctx].enabled;
      if (enabled && !cachedEnabled) {
        zIndexManager.ensureZIndex(el, zIndex);
      }
      el[ctx].enabled = enabled;
    },
    unmounted(el) {
      zIndexManager.unregister(el);
    }
  };
  var zindexable$1 = zindexable;
  function warn(location, message) {
    console.error(`[vueuc/${location}]: ${message}`);
  }
  var LazyTeleport = defineComponent({
    name: "LazyTeleport",
    props: {
      to: {
        type: [String, Object],
        default: void 0
      },
      disabled: Boolean,
      show: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      return {
        showTeleport: useFalseUntilTruthy(toRef(props, "show")),
        mergedTo: computed(() => {
          const { to } = props;
          return to !== null && to !== void 0 ? to : "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? getSlot(this.$slots) : h(Teleport, {
        disabled: this.disabled,
        to: this.mergedTo
      }, getSlot(this.$slots)) : null;
    }
  });
  var MapShim = function() {
    if (typeof Map !== "undefined") {
      return Map;
    }
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function(entry, index2) {
        if (entry[0] === key) {
          result = index2;
          return true;
        }
        return false;
      });
      return result;
    }
    return function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx2) {
        if (ctx2 === void 0) {
          ctx2 = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx2, entry[1], entry[0]);
        }
      };
      return class_1;
    }();
  }();
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
  var global$1 = function() {
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    return Function("return this")();
  }();
  var requestAnimationFrame$1 = function() {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame.bind(global$1);
    }
    return function(callback) {
      return setTimeout(function() {
        return callback(Date.now());
      }, 1e3 / 60);
    };
  }();
  var trailingTimeout = 2;
  function throttle(callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }
  var REFRESH_DELAY = 20;
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }();
  var defineConfigurable = function(target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    return target;
  };
  var getWindowOf = function(target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  };
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size2, position) {
      var value = styles["border-" + position + "-width"];
      return size2 + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  function getHTMLElementContentRect(target) {
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    var width = toFloat(styles.width), height = toFloat(styles.height);
    if (styles.boxSizing === "border-box") {
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  var isSVGGraphicsElement = function() {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function(target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function(target) {
      return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
    };
  }();
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y,
      width,
      height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y, width, height) {
    return { x, y, width, height };
  }
  var ResizeObservation = function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }();
  var ResizeObserverEntry = function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }();
  var ResizeObserverSPI = function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx2 = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx2, entries, ctx2);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }();
  var observers = typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
  var ResizeObserver = function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }();
  [
    "observe",
    "unobserve",
    "disconnect"
  ].forEach(function(method) {
    ResizeObserver.prototype[method] = function() {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });
  var index = function() {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  }();
  class ResizeObserverDelegate {
    constructor() {
      this.handleResize = this.handleResize.bind(this);
      this.observer = new index(this.handleResize);
      this.elHandlersMap = new Map();
    }
    handleResize(entries) {
      for (const entry of entries) {
        const handler = this.elHandlersMap.get(entry.target);
        if (handler !== void 0) {
          handler(entry);
        }
      }
    }
    registerHandler(el, handler) {
      this.elHandlersMap.set(el, handler);
      this.observer.observe(el);
    }
    unregisterHandler(el) {
      if (!this.elHandlersMap.has(el)) {
        return;
      }
      this.elHandlersMap.delete(el);
      this.observer.unobserve(el);
    }
  }
  var delegate = new ResizeObserverDelegate();
  var VResizeObserver = defineComponent({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(props) {
      return {
        registered: false,
        handleResize(entry) {
          const { onResize } = props;
          if (onResize !== void 0)
            onResize(entry);
        }
      };
    },
    mounted() {
      const el = this.$el;
      if (el === void 0) {
        warn("resize-observer", "$el does not exist.");
      } else if (el.nextElementSibling !== el.nextSibling) {
        warn("resize-observer", "$el can not be observed (it may be a text node).");
      } else if (el.nextElementSibling !== null) {
        delegate.registerHandler(el.nextElementSibling, this.handleResize);
        this.registered = true;
      }
    },
    beforeUnmount() {
      if (this.registered) {
        delegate.unregisterHandler(this.$el.nextElementSibling);
      }
    },
    render() {
      return renderSlot(this.$slots, "default");
    }
  });
  const base = {
    neutralBase: "#FFF",
    neutralInvertBase: "#000",
    neutralTextBase: "#000",
    neutralPopover: "#fff",
    neutralCard: "#fff",
    neutralModal: "#fff",
    neutralBody: "#fff",
    alpha1: "0.82",
    alpha2: "0.72",
    alpha3: "0.38",
    alpha4: "0.24",
    alpha5: "0.18",
    alphaClose: "0.52",
    alphaDisabled: "0.5",
    alphaDisabledInput: "0.02",
    alphaPending: "0.05",
    alphaTablePending: "0.02",
    alphaPressed: "0.07",
    alphaAvatar: "0.2",
    alphaRail: "0.14",
    alphaProgressRail: ".08",
    alphaBorder: "0.12",
    alphaDivider: "0.06",
    alphaInput: "0",
    alphaAction: "0.02",
    alphaTab: "0.04",
    alphaScrollbar: "0.25",
    alphaScrollbarHover: "0.4",
    alphaCode: "0.05",
    alphaTag: "0.02",
    primaryHover: "#36ad6a",
    primaryDefault: "#18a058",
    primaryActive: "#0c7a43",
    primarySuppl: "#36ad6a",
    infoHover: "#4098fc",
    infoDefault: "#2080f0",
    infoActive: "#1060c9",
    infoSuppl: "#4098fc",
    errorHover: "#de576d",
    errorDefault: "#d03050",
    errorActive: "#ab1f3f",
    errorSuppl: "#de576d",
    warningHover: "#fcb040",
    warningDefault: "#f0a020",
    warningActive: "#c97c10",
    warningSuppl: "#fcb040",
    successHover: "#36ad6a",
    successDefault: "#18a058",
    successActive: "#0c7a43",
    successSuppl: "#36ad6a"
  };
  const baseBackgroundRgb = rgba(base.neutralBase);
  const baseInvertBackgroundRgb = rgba(base.neutralInvertBase);
  const overlayPrefix = "rgba(" + baseInvertBackgroundRgb.slice(0, 3).join(", ") + ", ";
  function overlay(alpha) {
    return overlayPrefix + String(alpha) + ")";
  }
  function neutral(alpha) {
    const overlayRgba = Array.from(baseInvertBackgroundRgb);
    overlayRgba[3] = Number(alpha);
    return composite(baseBackgroundRgb, overlayRgba);
  }
  const derived = Object.assign(Object.assign({ name: "common" }, commonVariables$3), {
    baseColor: base.neutralBase,
    primaryColor: base.primaryDefault,
    primaryColorHover: base.primaryHover,
    primaryColorPressed: base.primaryActive,
    primaryColorSuppl: base.primarySuppl,
    infoColor: base.infoDefault,
    infoColorHover: base.infoHover,
    infoColorPressed: base.infoActive,
    infoColorSuppl: base.infoSuppl,
    successColor: base.successDefault,
    successColorHover: base.successHover,
    successColorPressed: base.successActive,
    successColorSuppl: base.successSuppl,
    warningColor: base.warningDefault,
    warningColorHover: base.warningHover,
    warningColorPressed: base.warningActive,
    warningColorSuppl: base.warningSuppl,
    errorColor: base.errorDefault,
    errorColorHover: base.errorHover,
    errorColorPressed: base.errorActive,
    errorColorSuppl: base.errorSuppl,
    textColorBase: base.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(158, 164, 170)",
    textColorDisabled: neutral(base.alpha4),
    placeholderColor: neutral(base.alpha4),
    placeholderColorDisabled: neutral(base.alpha5),
    iconColor: neutral(base.alpha4),
    iconColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
    iconColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),
    iconColorDisabled: neutral(base.alpha5),
    opacity1: base.alpha1,
    opacity2: base.alpha2,
    opacity3: base.alpha3,
    opacity4: base.alpha4,
    opacity5: base.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    closeColor: neutral(Number(base.alphaClose)),
    closeColorHover: neutral(Number(base.alphaClose) * 1.25),
    closeColorPressed: neutral(Number(base.alphaClose) * 0.8),
    closeColorDisabled: neutral(base.alpha4),
    clearColor: neutral(base.alpha4),
    clearColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
    clearColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),
    scrollbarColor: overlay(base.alphaScrollbar),
    scrollbarColorHover: overlay(base.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: neutral(base.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: base.neutralPopover,
    tableColor: base.neutralCard,
    cardColor: base.neutralCard,
    modalColor: base.neutralModal,
    bodyColor: base.neutralBody,
    tagColor: "rgb(250, 250, 252)",
    avatarColor: neutral(base.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: neutral(base.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    tableColorHover: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: base.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  });
  var commonLight = derived;
  const self$6 = (vars) => {
    const { scrollbarColor, scrollbarColorHover } = vars;
    return {
      color: scrollbarColor,
      colorHover: scrollbarColorHover
    };
  };
  const scrollbarLight = {
    name: "Scrollbar",
    common: commonLight,
    self: self$6
  };
  var scrollbarLight$1 = scrollbarLight;
  const {
    cubicBezierEaseInOut: cubicBezierEaseInOut$1
  } = commonVariables$3;
  function fadeInTransition({
    name = "fade-in",
    enterDuration = "0.2s",
    leaveDuration = "0.2s",
    enterCubicBezier = cubicBezierEaseInOut$1,
    leaveCubicBezier = cubicBezierEaseInOut$1
  } = {}) {
    return [c(`&.${name}-transition-enter-active`, {
      transition: `all ${enterDuration} ${enterCubicBezier}!important`
    }), c(`&.${name}-transition-leave-active`, {
      transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
    }), c(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
      opacity: 0
    }), c(`&.${name}-transition-leave-from, &.${name}-transition-enter-to`, {
      opacity: 1
    })];
  }
  var style$8 = cB("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [c(">", [cB("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [c("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c(">", [cB("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])]), cB("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 `, [cM("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--scrollbar-height);
 `, [c(">", [cE("scrollbar", `
 height: var(--scrollbar-height);
 border-radius: var(--scrollbar-border-radius);
 right: 0;
 `)])]), cM("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--scrollbar-width);
 `, [c(">", [cE("scrollbar", `
 width: var(--scrollbar-width);
 border-radius: var(--scrollbar-border-radius);
 bottom: 0;
 `)])]), cM("disabled", [c(">", [cE("scrollbar", {
    pointerEvents: "none"
  })])]), c(">", [cE("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--scrollbar-color);
 transition: background-color .2s var(--scrollbar-bezier);
 `, [fadeInTransition(), c("&:hover", {
    backgroundColor: "var(--scrollbar-color-hover)"
  })])])])])]);
  const scrollbarProps = Object.assign(Object.assign({}, useTheme.props), {
    size: {
      type: Number,
      default: 5
    },
    duration: {
      type: Number,
      default: 0
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    xScrollable: {
      type: Boolean,
      default: false
    },
    container: Function,
    content: Function,
    containerStyle: [String, Object],
    contentClass: String,
    contentStyle: [String, Object],
    horizontalRailStyle: [String, Object],
    verticalRailStyle: [String, Object],
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    internalOnUpdateScrollLeft: Function
  });
  const Scrollbar = defineComponent({
    name: "Scrollbar",
    props: scrollbarProps,
    inheritAttrs: false,
    setup(props) {
      const { mergedClsPrefixRef } = useConfig(props);
      const containerRef = ref(null);
      const contentRef = ref(null);
      const yRailRef = ref(null);
      const xRailRef = ref(null);
      const contentHeightRef = ref(null);
      const contentWidthRef = ref(null);
      const containerHeightRef = ref(null);
      const containerWidthRef = ref(null);
      const yRailSizeRef = ref(null);
      const xRailSizeRef = ref(null);
      const containerScrollTopRef = ref(0);
      const containerScrollLeftRef = ref(0);
      const isShowXBarRef = ref(false);
      const isShowYBarRef = ref(false);
      let yBarPressed = false;
      let xBarPressed = false;
      let xBarVanishTimerId;
      let yBarVanishTimerId;
      let memoYTop = 0;
      let memoXLeft = 0;
      let memoMouseX = 0;
      let memoMouseY = 0;
      const isIos2 = useIsIos();
      const yBarSizeRef = computed(() => {
        const { value: containerHeight } = containerHeightRef;
        const { value: contentHeight } = contentHeightRef;
        const { value: yRailSize } = yRailSizeRef;
        if (containerHeight === null || contentHeight === null || yRailSize === null) {
          return 0;
        } else {
          return Math.min(containerHeight, yRailSize * containerHeight / contentHeight + props.size * 1.5);
        }
      });
      const yBarSizePxRef = computed(() => {
        return `${yBarSizeRef.value}px`;
      });
      const xBarSizeRef = computed(() => {
        const { value: containerWidth } = containerWidthRef;
        const { value: contentWidth } = contentWidthRef;
        const { value: xRailSize } = xRailSizeRef;
        if (containerWidth === null || contentWidth === null || xRailSize === null) {
          return 0;
        } else {
          return xRailSize * containerWidth / contentWidth + props.size * 1.5;
        }
      });
      const xBarSizePxRef = computed(() => {
        return `${xBarSizeRef.value}px`;
      });
      const yBarTopRef = computed(() => {
        const { value: containerHeight } = containerHeightRef;
        const { value: containerScrollTop } = containerScrollTopRef;
        const { value: contentHeight } = contentHeightRef;
        const { value: yRailSize } = yRailSizeRef;
        if (containerHeight === null || contentHeight === null || yRailSize === null) {
          return 0;
        } else {
          return containerScrollTop / (contentHeight - containerHeight) * (yRailSize - yBarSizeRef.value);
        }
      });
      const yBarTopPxRef = computed(() => {
        return `${yBarTopRef.value}px`;
      });
      const xBarLeftRef = computed(() => {
        const { value: containerWidth } = containerWidthRef;
        const { value: containerScrollLeft } = containerScrollLeftRef;
        const { value: contentWidth } = contentWidthRef;
        const { value: xRailSize } = xRailSizeRef;
        if (containerWidth === null || contentWidth === null || xRailSize === null) {
          return 0;
        } else {
          return containerScrollLeft / (contentWidth - containerWidth) * (xRailSize - xBarSizeRef.value);
        }
      });
      const xBarLeftPxRef = computed(() => {
        return `${xBarLeftRef.value}px`;
      });
      const needYBarRef = computed(() => {
        const { value: containerHeight } = containerHeightRef;
        const { value: contentHeight } = contentHeightRef;
        return containerHeight !== null && contentHeight !== null && contentHeight > containerHeight;
      });
      const needXBarRef = computed(() => {
        const { value: containerWidth } = containerWidthRef;
        const { value: contentWidth } = contentWidthRef;
        return containerWidth !== null && contentWidth !== null && contentWidth > containerWidth;
      });
      const mergedContainerRef = computed(() => {
        const { container } = props;
        if (container)
          return container();
        return containerRef.value;
      });
      const mergedContentRef = computed(() => {
        const { content } = props;
        if (content)
          return content();
        return contentRef.value;
      });
      const handleContentResize = sync;
      const handleContainerResize = (e) => {
        const { onResize } = props;
        if (onResize)
          onResize(e);
        sync();
      };
      const scrollTo = (options, y) => {
        if (!props.scrollable)
          return;
        if (typeof options === "number") {
          scrollToPosition(options, y !== null && y !== void 0 ? y : 0, 0, false, "auto");
          return;
        }
        const { left, top, index: index2, elSize, position, behavior, el, debounce = true } = options;
        if (left !== void 0 || top !== void 0) {
          scrollToPosition(left !== null && left !== void 0 ? left : 0, top !== null && top !== void 0 ? top : 0, 0, false, behavior);
        }
        if (el !== void 0) {
          scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior);
        } else if (index2 !== void 0 && elSize !== void 0) {
          scrollToPosition(0, index2 * elSize, elSize, debounce, behavior);
        } else if (position === "bottom") {
          scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior);
        } else if (position === "top") {
          scrollToPosition(0, 0, 0, false, behavior);
        }
      };
      function scrollToPosition(left, top, elSize, debounce, behavior) {
        const { value: container } = mergedContainerRef;
        if (!container)
          return;
        if (debounce) {
          const { scrollTop, offsetHeight } = container;
          if (top > scrollTop) {
            if (top + elSize <= scrollTop + offsetHeight)
              ;
            else {
              container.scrollTo({
                left,
                top: top + elSize - offsetHeight,
                behavior
              });
            }
            return;
          }
        }
        container.scrollTo({
          left,
          top,
          behavior
        });
      }
      function handleMouseEnterWrapper() {
        showXBar();
        showYBar();
        sync();
      }
      function handleMouseLeaveWrapper() {
        hideBar();
      }
      function hideBar() {
        hideYBar();
        hideXBar();
      }
      function hideYBar() {
        if (yBarVanishTimerId !== void 0) {
          window.clearTimeout(yBarVanishTimerId);
        }
        yBarVanishTimerId = window.setTimeout(() => {
          isShowYBarRef.value = false;
        }, props.duration);
      }
      function hideXBar() {
        if (xBarVanishTimerId !== void 0) {
          window.clearTimeout(xBarVanishTimerId);
        }
        xBarVanishTimerId = window.setTimeout(() => {
          isShowXBarRef.value = false;
        }, props.duration);
      }
      function showXBar() {
        if (xBarVanishTimerId !== void 0) {
          window.clearTimeout(xBarVanishTimerId);
        }
        isShowXBarRef.value = true;
      }
      function showYBar() {
        if (yBarVanishTimerId !== void 0) {
          window.clearTimeout(yBarVanishTimerId);
        }
        isShowYBarRef.value = true;
      }
      function handleScroll(e) {
        const { onScroll } = props;
        if (onScroll)
          onScroll(e);
        syncScrollState();
      }
      function syncScrollState() {
        const { value: container } = mergedContainerRef;
        if (container) {
          containerScrollTopRef.value = container.scrollTop;
          containerScrollLeftRef.value = container.scrollLeft;
        }
      }
      function syncPositionState() {
        const { value: content } = mergedContentRef;
        if (content) {
          contentHeightRef.value = content.offsetHeight;
          contentWidthRef.value = content.offsetWidth;
        }
        const { value: container } = mergedContainerRef;
        if (container) {
          containerHeightRef.value = container.offsetHeight;
          containerWidthRef.value = container.offsetWidth;
        }
        const { value: xRailEl } = xRailRef;
        const { value: yRailEl } = yRailRef;
        if (xRailEl) {
          xRailSizeRef.value = xRailEl.offsetWidth;
        }
        if (yRailEl) {
          yRailSizeRef.value = yRailEl.offsetHeight;
        }
      }
      function sync() {
        if (!props.scrollable)
          return;
        syncPositionState();
        syncScrollState();
      }
      function handleXScrollMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        xBarPressed = true;
        on("mousemove", window, handleXScrollMouseMove, true);
        on("mouseup", window, handleXScrollMouseUp, true);
        memoXLeft = containerScrollLeftRef.value;
        memoMouseX = e.clientX;
      }
      function handleXScrollMouseMove(e) {
        if (!xBarPressed)
          return;
        if (xBarVanishTimerId !== void 0) {
          window.clearTimeout(xBarVanishTimerId);
        }
        if (yBarVanishTimerId !== void 0) {
          window.clearTimeout(yBarVanishTimerId);
        }
        const { value: containerWidth } = containerWidthRef;
        const { value: contentWidth } = contentWidthRef;
        const { value: xBarSize } = xBarSizeRef;
        if (containerWidth === null || contentWidth === null)
          return;
        const dX = e.clientX - memoMouseX;
        const dScrollLeft = dX * (contentWidth - containerWidth) / (containerWidth - xBarSize);
        const toScrollLeftUpperBound = contentWidth - containerWidth;
        let toScrollLeft = memoXLeft + dScrollLeft;
        toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft);
        toScrollLeft = Math.max(toScrollLeft, 0);
        const { value: container } = mergedContainerRef;
        if (container) {
          container.scrollLeft = toScrollLeft;
          const { internalOnUpdateScrollLeft } = props;
          if (internalOnUpdateScrollLeft)
            internalOnUpdateScrollLeft(toScrollLeft);
        }
      }
      function handleXScrollMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        off("mousemove", window, handleXScrollMouseMove, true);
        off("mouseup", window, handleXScrollMouseUp, true);
        xBarPressed = false;
        sync();
        const { value: container } = mergedContainerRef;
        if (!(container === null || container === void 0 ? void 0 : container.contains(e.target))) {
          hideBar();
        }
      }
      function handleYScrollMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        yBarPressed = true;
        on("mousemove", window, handleYScrollMouseMove, true);
        on("mouseup", window, handleYScrollMouseUp, true);
        memoYTop = containerScrollTopRef.value;
        memoMouseY = e.clientY;
      }
      function handleYScrollMouseMove(e) {
        if (!yBarPressed)
          return;
        if (xBarVanishTimerId !== void 0) {
          window.clearTimeout(xBarVanishTimerId);
        }
        if (yBarVanishTimerId !== void 0) {
          window.clearTimeout(yBarVanishTimerId);
        }
        const { value: containerHeight } = containerHeightRef;
        const { value: contentHeight } = contentHeightRef;
        const { value: yBarSize } = yBarSizeRef;
        if (containerHeight === null || contentHeight === null)
          return;
        const dY = e.clientY - memoMouseY;
        const dScrollTop = dY * (contentHeight - containerHeight) / (containerHeight - yBarSize);
        const toScrollTopUpperBound = contentHeight - containerHeight;
        let toScrollTop = memoYTop + dScrollTop;
        toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop);
        toScrollTop = Math.max(toScrollTop, 0);
        const { value: container } = mergedContainerRef;
        if (container) {
          container.scrollTop = toScrollTop;
        }
      }
      function handleYScrollMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        off("mousemove", window, handleYScrollMouseMove, true);
        off("mouseup", window, handleYScrollMouseUp, true);
        yBarPressed = false;
        sync();
        const { value: container } = mergedContainerRef;
        if (!(container === null || container === void 0 ? void 0 : container.contains(e.target))) {
          hideBar();
        }
      }
      watchEffect(() => {
        const { value: needXBar } = needXBarRef;
        const { value: needYBar } = needYBarRef;
        const { value: mergedClsPrefix } = mergedClsPrefixRef;
        const { value: xRailEl } = xRailRef;
        const { value: yRailEl } = yRailRef;
        if (xRailEl) {
          if (!needXBar) {
            xRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
          } else {
            xRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
          }
        }
        if (yRailEl) {
          if (!needYBar) {
            yRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
          } else {
            yRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
          }
        }
      });
      onMounted(() => {
        if (props.container)
          return;
        sync();
      });
      onBeforeUnmount(() => {
        if (xBarVanishTimerId !== void 0) {
          window.clearTimeout(xBarVanishTimerId);
        }
        if (yBarVanishTimerId !== void 0) {
          window.clearTimeout(yBarVanishTimerId);
        }
        off("mousemove", window, handleYScrollMouseMove, true);
        off("mouseup", window, handleYScrollMouseUp, true);
      });
      const themeRef = useTheme("Scrollbar", "Scrollbar", style$8, scrollbarLight$1, props, mergedClsPrefixRef);
      return {
        sync,
        scrollTo,
        mergedClsPrefix: mergedClsPrefixRef,
        containerScrollTop: containerScrollTopRef,
        containerRef,
        contentRef,
        yRailRef,
        xRailRef,
        needYBar: needYBarRef,
        needXBar: needXBarRef,
        yBarSizePx: yBarSizePxRef,
        xBarSizePx: xBarSizePxRef,
        yBarTopPx: yBarTopPxRef,
        xBarLeftPx: xBarLeftPxRef,
        isShowXBar: isShowXBarRef,
        isShowYBar: isShowYBarRef,
        isIos: isIos2,
        handleScroll,
        handleContentResize,
        handleContainerResize,
        handleMouseEnterWrapper,
        handleMouseLeaveWrapper,
        handleYScrollMouseDown,
        handleXScrollMouseDown,
        cssVars: computed(() => {
          const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2, scrollbarBorderRadius, scrollbarHeight, scrollbarWidth }, self: { color, colorHover } } = themeRef.value;
          return {
            "--scrollbar-bezier": cubicBezierEaseInOut2,
            "--scrollbar-color": color,
            "--scrollbar-color-hover": colorHover,
            "--scrollbar-border-radius": scrollbarBorderRadius,
            "--scrollbar-width": scrollbarWidth,
            "--scrollbar-height": scrollbarHeight
          };
        })
      };
    },
    render() {
      const { $slots, mergedClsPrefix } = this;
      if (!this.scrollable)
        return renderSlot($slots, "default");
      const createChildren = () => h("div", mergeProps(this.$attrs, {
        class: `${mergedClsPrefix}-scrollbar`,
        style: this.cssVars,
        onMouseenter: this.handleMouseEnterWrapper,
        onMouseleave: this.handleMouseLeaveWrapper
      }), [
        this.container ? renderSlot($slots, "default") : h("div", { ref: "containerRef", class: `${mergedClsPrefix}-scrollbar-container`, style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel }, h(VResizeObserver, { onResize: this.handleContentResize }, {
          default: () => h("div", { ref: "contentRef", style: [
            {
              width: this.xScrollable ? "fit-content" : null
            },
            this.contentStyle
          ], class: [
            `${mergedClsPrefix}-scrollbar-content`,
            this.contentClass
          ] }, $slots)
        })),
        h("div", { ref: "yRailRef", class: `${mergedClsPrefix}-scrollbar-rail ${mergedClsPrefix}-scrollbar-rail--vertical`, style: [this.horizontalRailStyle] }, h(Transition, { name: "fade-in-transition" }, {
          default: () => this.needYBar && this.isShowYBar && !this.isIos ? h("div", { class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`, style: {
            height: this.yBarSizePx,
            top: this.yBarTopPx
          }, onMousedown: this.handleYScrollMouseDown }) : null
        })),
        h("div", { ref: "xRailRef", class: `${mergedClsPrefix}-scrollbar-rail ${mergedClsPrefix}-scrollbar-rail--horizontal`, style: [this.verticalRailStyle] }, h(Transition, { name: "fade-in-transition" }, {
          default: () => this.needXBar && this.isShowXBar && !this.isIos ? h("div", { class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`, style: {
            width: this.xBarSizePx,
            left: this.xBarLeftPx
          }, onMousedown: this.handleXScrollMouseDown }) : null
        }))
      ]);
      return this.container ? createChildren() : h(VResizeObserver, { onResize: this.handleContainerResize }, {
        default: createChildren
      });
    }
  });
  var NScrollbar = Scrollbar;
  const {
    cubicBezierEaseIn,
    cubicBezierEaseOut,
    transformDebounceScale
  } = commonVariables$3;
  function fadeInScaleUpTransition({
    transformOrigin = "inherit",
    duration: duration2 = ".2s",
    enterScale = ".9",
    originalTransform = "",
    originalTransition = ""
  } = {}) {
    return [c("&.fade-in-scale-up-transition-leave-active", {
      transformOrigin,
      transition: `opacity ${duration2} ${cubicBezierEaseIn}, transform ${duration2} ${cubicBezierEaseIn} ${originalTransition && "," + originalTransition}`
    }), c("&.fade-in-scale-up-transition-enter-active", {
      transformOrigin,
      transition: `opacity ${duration2} ${cubicBezierEaseOut}, transform ${duration2} ${cubicBezierEaseOut} ${originalTransition && "," + originalTransition}`
    }), c("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
      opacity: 0,
      transform: `${originalTransform} scale(${enterScale})`
    }), c("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
      opacity: 1,
      transform: `${originalTransform} scale(${transformDebounceScale})`
    })];
  }
  var style$7 = cB("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);
  var NBaseWave = defineComponent({
    name: "BaseWave",
    props: {
      clsPrefix: {
        type: String,
        required: true
      }
    },
    setup(props) {
      useStyle("BaseWave", style$7, toRef(props, "clsPrefix"));
      const selfRef = ref(null);
      const activeRef = ref(false);
      let animationTimerId = null;
      onBeforeUnmount(() => {
        if (animationTimerId !== null) {
          window.clearTimeout(animationTimerId);
        }
      });
      return {
        active: activeRef,
        selfRef,
        play() {
          if (animationTimerId !== null) {
            window.clearTimeout(animationTimerId);
            activeRef.value = false;
            animationTimerId = null;
          }
          void nextTick(() => {
            var _a;
            void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
            activeRef.value = true;
            animationTimerId = window.setTimeout(() => {
              activeRef.value = false;
              animationTimerId = null;
            }, 1e3);
          });
        }
      };
    },
    render() {
      const { clsPrefix } = this;
      return h("div", { ref: "selfRef", "aria-hidden": true, class: [
        `${clsPrefix}-base-wave`,
        this.active && `${clsPrefix}-base-wave--active`
      ] });
    }
  });
  function useRtl(mountId, rtlStateRef, clsPrefixRef) {
    if (!rtlStateRef)
      return void 0;
    const ssrAdapter2 = useSsrAdapter();
    const componentRtlStateRef = computed(() => {
      const { value: rtlState } = rtlStateRef;
      if (!rtlState) {
        return void 0;
      }
      const componentRtlState = rtlState[mountId];
      if (!componentRtlState) {
        return void 0;
      }
      return componentRtlState;
    });
    const mountStyle = () => {
      watchEffect(() => {
        const { value: clsPrefix } = clsPrefixRef;
        const id = `${clsPrefix}${mountId}Rtl`;
        if (exists(id, ssrAdapter2))
          return;
        const { value: componentRtlState } = componentRtlStateRef;
        if (!componentRtlState)
          return;
        componentRtlState.style.mount({
          id,
          head: true,
          props: {
            bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
          },
          ssr: ssrAdapter2
        });
      });
    };
    if (ssrAdapter2) {
      mountStyle();
    } else {
      onBeforeMount(mountStyle);
    }
    return componentRtlStateRef;
  }
  var style$6 = cB("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [c(">", [cE("clear", `
 font-size: var(--clear-size);
 cursor: pointer;
 color: var(--clear-color);
 transition: color .3s var(--bezier);
 `, [c("&:hover", `
 color: var(--clear-color-hover)!important;
 `), c("&:active", `
 color: var(--clear-color-pressed)!important;
 `)]), cE("placeholder", `
 display: flex;
 `), cE("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [createIconSwitchTransition({
    originalTransform: "translateX(-50%) translateY(-50%)",
    left: "50%",
    top: "50%"
  })])])]);
  var NBaseClear = defineComponent({
    name: "BaseClear",
    props: {
      clsPrefix: {
        type: String,
        required: true
      },
      show: Boolean,
      onClear: Function
    },
    setup(props) {
      useStyle("BaseClear", style$6, toRef(props, "clsPrefix"));
      const { NConfigProvider } = useConfig();
      return {
        NConfigProvider,
        handleMouseDown(e) {
          e.preventDefault();
        }
      };
    },
    render() {
      const { clsPrefix } = this;
      return h("div", { class: `${clsPrefix}-base-clear` }, h(NIconSwitchTransition, null, {
        default: () => {
          return this.show ? h(NBaseIcon, { clsPrefix, key: "dismiss", class: `${clsPrefix}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": true }, {
            default: () => h(ClearIcon, null)
          }) : h("div", { key: "icon", class: `${clsPrefix}-base-clear__placeholder` }, this.$slots);
        }
      }));
    }
  });
  var NBaseSuffix = defineComponent({
    name: "InternalSelectionSuffix",
    props: {
      clsPrefix: {
        type: String,
        required: true
      },
      showArrow: {
        type: Boolean,
        default: void 0
      },
      showClear: {
        type: Boolean,
        default: void 0
      },
      loading: Boolean,
      onClear: Function
    },
    setup(props) {
      return () => {
        const { clsPrefix } = props;
        return h(NBaseLoading, { clsPrefix, class: `${clsPrefix}-base-suffix`, strokeWidth: 24, scale: 0.85, show: props.loading }, {
          default: () => props.showArrow ? h(NBaseClear, { clsPrefix, show: props.showClear, onClear: props.onClear }, {
            default: () => h(NBaseIcon, { clsPrefix, class: `${clsPrefix}-base-suffix__arrow` }, { default: () => h(ChevronDownIcon, null) })
          }) : null
        });
      };
    }
  });
  const {
    cubicBezierEaseInOut
  } = commonVariables$3;
  function fadeInWidthExpandTransition({
    duration: duration2 = ".2s",
    delay = ".1s"
  } = {}) {
    return [c("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
      opacity: 1
    }), c("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), c("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${duration2} ${cubicBezierEaseInOut},
 max-width ${duration2} ${cubicBezierEaseInOut} ${delay},
 margin-left ${duration2} ${cubicBezierEaseInOut} ${delay},
 margin-right ${duration2} ${cubicBezierEaseInOut} ${delay};
 `), c("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${duration2} ${cubicBezierEaseInOut} ${delay},
 max-width ${duration2} ${cubicBezierEaseInOut},
 margin-left ${duration2} ${cubicBezierEaseInOut},
 margin-right ${duration2} ${cubicBezierEaseInOut};
 `)];
  }
  var commonVariables$2 = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  };
  const self$5 = (vars) => {
    const { textColor2, textColor3, textColorDisabled, primaryColor, primaryColorHover, inputColor, inputColorDisabled, borderColor, warningColor, warningColorHover, errorColor, errorColorHover, borderRadius, lineHeight, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightTiny, heightSmall, heightMedium, heightLarge, actionColor, clearColor, clearColorHover, clearColorPressed, placeholderColor, placeholderColorDisabled, iconColor, iconColorDisabled, iconColorHover, iconColorPressed } = vars;
    return Object.assign(Object.assign({}, commonVariables$2), {
      countTextColor: textColor3,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      lineHeightTextarea: lineHeight,
      borderRadius,
      iconSize: "16px",
      groupLabelColor: actionColor,
      groupLabelTextColor: textColor2,
      textColor: textColor2,
      textColorDisabled,
      textDecorationColor: textColor2,
      caretColor: primaryColor,
      placeholderColor,
      placeholderColorDisabled,
      color: inputColor,
      colorDisabled: inputColorDisabled,
      colorFocus: inputColor,
      groupLabelBorder: `1px solid ${borderColor}`,
      border: `1px solid ${borderColor}`,
      borderHover: `1px solid ${primaryColorHover}`,
      borderDisabled: `1px solid ${borderColor}`,
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      loadingColor: primaryColor,
      loadingColorWarning: warningColor,
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      colorFocusWarning: inputColor,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, {
        alpha: 0.2
      })}`,
      caretColorWarning: warningColor,
      loadingColorError: errorColor,
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      colorFocusError: inputColor,
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, {
        alpha: 0.2
      })}`,
      caretColorError: errorColor,
      clearColor,
      clearColorHover,
      clearColorPressed,
      iconColor,
      iconColorDisabled,
      iconColorHover,
      iconColorPressed,
      suffixTextColor: textColor2
    });
  };
  const inputLight = {
    name: "Input",
    common: commonLight,
    self: self$5
  };
  var inputLight$1 = inputLight;
  const inputInjectionKey = Symbol("input");
  function len(s) {
    let count = 0;
    for (const _2 of s) {
      count++;
    }
    return count;
  }
  function isEmptyValue(value) {
    return ["", void 0, null].includes(value);
  }
  var WordCount = defineComponent({
    name: "InputWordCount",
    setup(_2, { slots }) {
      const { mergedValueRef, maxlengthRef, mergedClsPrefixRef } = inject(inputInjectionKey);
      const wordCountRef = computed(() => {
        const { value: mergedValue } = mergedValueRef;
        if (mergedValue === null || Array.isArray(mergedValue))
          return 0;
        return len(mergedValue);
      });
      return () => {
        const { value: maxlength } = maxlengthRef;
        const { value: mergedValue } = mergedValueRef;
        return h("span", { class: `${mergedClsPrefixRef.value}-input-word-count` }, slots.default ? slots.default({
          value: mergedValue === null || Array.isArray(mergedValue) ? "" : mergedValue
        }) : maxlength === void 0 ? wordCountRef.value : `${wordCountRef.value} / ${maxlength}`);
      };
    }
  });
  var style$5 = c([cB("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--border-radius);
 background-color: var(--color);
 transition: background-color .3s var(--bezier);
 font-size: var(--font-size);
 --padding-vertical: calc((var(--height) - 1.5 * var(--font-size)) / 2);
 `, [
    cE("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
    cE("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 caret-color .3s var(--bezier),
 color .3s var(--bezier),
 text-decoration-color .3s var(--bezier);
 `),
    cE("input-el, textarea-el", `
 -webkit-appearance: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--text-decoration-color);
 color: var(--text-color);
 caret-color: var(--caret-color);
 `, [c("&::placeholder", {
      color: "#0000"
    })]),
    cM("round", [cNotM("textarea", {
      borderRadius: "calc(var(--height) / 2)"
    })]),
    cE("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--placeholder-color);
 `, [c("span", {
      width: "100%",
      display: "inline-block"
    })]),
    cNotM("autosize", {
      width: "100%"
    }),
    cM("autosize", [cE("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
    cB("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--padding-left);
 padding-right: var(--padding-right);
 `),
    cE("input-mirror", `
 padding: 0;
 height: var(--height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: nowrap;
 pointer-events: none;
 `),
    cE("input-el", `
 padding: 0;
 height: var(--height);
 line-height: var(--height);
 `, [c("+", [cE("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
    cNotM("textarea", [cE("placeholder", {
      whiteSpace: "nowrap"
    })]),
    cE("eye", `
 transition: color .3s var(--bezier);
 `),
    cM("textarea", {
      width: "100%"
    }, [cB("input-word-count", `
 position: absolute;
 right: var(--padding-right);
 bottom: var(--padding-vertical);
 `), cM("resizable", [cB("input-wrapper", `
 resize: vertical;
 overflow: auto;
 min-height: var(--height);
 `)]), cE("textarea-el, textarea-mirror, placeholder", `
 width: 100%;
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--padding-vertical);
 padding-bottom: var(--padding-vertical);
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--line-height-textarea);
 margin: 0;
 resize: none;
 `), cE("textarea-mirror", `
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
    cM("pair", [cE("input-el, placeholder", {
      textAlign: "center"
    }), cE("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--bezier);
 color: var(--text-color);
 `, [cB("icon", `
 color: var(--icon-color);
 `), cB("base-icon", `
 color: var(--icon-color);
 `)])]),
    cM("disabled", {
      cursor: "not-allowed",
      backgroundColor: "var(--color-disabled)"
    }, [cE("border", {
      border: "var(--border-disabled)"
    }), cE("input-el, textarea-el", {
      cursor: "not-allowed",
      color: "var(--text-color-disabled)",
      textDecorationColor: "var(--text-color-disabled)"
    }), cE("placeholder", {
      color: "var(--placeholder-color-disabled)"
    }), cE("separator", {
      color: "var(--text-color-disabled)"
    }, [cB("icon", `
 color: var(--icon-color-disabled);
 `), cB("base-icon", `
 color: var(--icon-color-disabled);
 `)]), cE("suffix, prefix", {
      color: "var(--text-color-disabled)"
    }, [cB("icon", `
 color: var(--icon-color-disabled);
 `), cB("internal-icon", `
 color: var(--icon-color-disabled);
 `)])]),
    cNotM("disabled", [cE("eye", `
 color: var(--icon-color);
 cursor: pointer;
 `, [c("&:hover", `
 color: var(--icon-color-hover);
 `), c("&:active", `
 color: var(--icon-color-pressed);
 `)]), cM("focus", {
      backgroundColor: "var(--color-focus)"
    }, [cE("state-border", {
      border: "var(--border-focus)",
      boxShadow: "var(--box-shadow-focus)"
    })]), c("&:hover", [cE("state-border", {
      border: "var(--border-focus)"
    })])]),
    cE("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--border);
 transition:
 box-shadow .3s var(--bezier),
 border-color .3s var(--bezier);
 `),
    cE("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
    cE("prefix", {
      marginRight: "4px"
    }),
    cE("suffix", `
 margin-left: 4px;
 `),
    cE("suffix, prefix", `
 transition: color .3s var(--bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--suffix-text-color);
 `, [cB("base-loading", `
 font-size: var(--icon-size);
 margin-left: 4px;
 color: var(--loading-color);
 `), cB("base-clear", `
 font-size: var(--icon-size);
 margin-left: 4px;
 `, [cE("placeholder", [cB("base-icon", `
 transition: color .3s var(--bezier);
 color: var(--icon-color);
 font-size: var(--icon-size);
 `)])]), cB("icon", `
 transition: color .3s var(--bezier);
 color: var(--icon-color);
 font-size: var(--icon-size);
 `), cB("base-icon", `
 font-size: var(--icon-size);
 `)]),
    cB("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--count-text-color);
 transition: color .3s var(--bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `)
  ]), ["warning", "error"].map((status) => insideFormItem(status, cB("input", [cNotM("disabled", [cB("base-loading", `
 color: var(--loading-color-${status})
 `), cE("input-el, textarea-el", {
    caretColor: `var(--caret-color-${status})`
  }), cE("state-border", {
    border: `var(--border-${status})`
  }), c("&:hover", [cE("state-border", `
 border: var(--border-hover-${status});
 `)]), c("&:focus", {
    backgroundColor: `var(--color-focus-${status})`
  }, [cE("state-border", `
 box-shadow: var(--box-shadow-focus-${status});
 border: var(--border-focus-${status});
 `)]), cM("focus", {
    backgroundColor: `var(--color-focus-${status})`
  }, [cE("state-border", `
 box-shadow: var(--box-shadow-focus-${status});
 border: var(--border-focus-${status});
 `)])])])))]);
  const inputProps = Object.assign(Object.assign({}, useTheme.props), {
    bordered: {
      type: Boolean,
      default: void 0
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: [Array, String],
    defaultValue: {
      type: [String, Array],
      default: null
    },
    value: [String, Array],
    disabled: {
      type: Boolean,
      default: void 0
    },
    size: String,
    rows: {
      type: [Number, String],
      default: 3
    },
    round: Boolean,
    minlength: [String, Number],
    maxlength: [String, Number],
    clearable: Boolean,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    pair: Boolean,
    separator: String,
    readonly: {
      type: [String, Boolean],
      default: false
    },
    passivelyActivated: Boolean,
    showPasswordOn: String,
    stateful: {
      type: Boolean,
      default: true
    },
    autofocus: Boolean,
    inputProps: Object,
    resizable: {
      type: Boolean,
      default: true
    },
    showCount: Boolean,
    loading: {
      type: Boolean,
      default: void 0
    },
    onMousedown: Function,
    onKeydown: Function,
    onKeyup: Function,
    onInput: [Function, Array],
    onFocus: [Function, Array],
    onBlur: [Function, Array],
    onClick: [Function, Array],
    onChange: [Function, Array],
    onClear: [Function, Array],
    "onUpdate:value": [Function, Array],
    onUpdateValue: [Function, Array],
    textDecoration: [String, Array],
    attrSize: {
      type: Number,
      default: 20
    },
    onInputBlur: [Function, Array],
    onInputFocus: [Function, Array],
    onDeactivate: [Function, Array],
    onActivate: [Function, Array],
    onWrapperFocus: [Function, Array],
    onWrapperBlur: [Function, Array],
    internalDeactivateOnEnter: Boolean,
    internalForceFocus: Boolean,
    showPasswordToggle: Boolean
  });
  var NInput = defineComponent({
    name: "Input",
    props: inputProps,
    setup(props) {
      const { mergedClsPrefixRef, mergedBorderedRef } = useConfig(props);
      const themeRef = useTheme("Input", "Input", style$5, inputLight$1, props, mergedClsPrefixRef);
      const wrapperElRef = ref(null);
      const textareaElRef = ref(null);
      const textareaMirrorElRef = ref(null);
      const inputMirrorElRef = ref(null);
      const inputElRef = ref(null);
      const inputEl2Ref = ref(null);
      const { localeRef } = createLocaleMixin("Input");
      const uncontrolledValueRef = ref(props.defaultValue);
      const controlledValueRef = toRef(props, "value");
      const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
      const formItem = useFormItem(props);
      const { mergedSizeRef, mergedDisabledRef } = formItem;
      const focusedRef = ref(false);
      const hoverRef = ref(false);
      const isComposingRef = ref(false);
      const activatedRef = ref(false);
      let syncSource = null;
      const mergedPlaceholderRef = computed(() => {
        const { placeholder, pair } = props;
        if (pair) {
          if (Array.isArray(placeholder)) {
            return placeholder;
          } else if (placeholder === void 0) {
            return ["", ""];
          }
          return [placeholder, placeholder];
        } else if (placeholder === void 0) {
          return [localeRef.value.placeholder];
        } else {
          return [placeholder];
        }
      });
      const showPlaceholder1Ref = computed(() => {
        const { value: isComposing } = isComposingRef;
        const { value: mergedValue } = mergedValueRef;
        const { value: mergedPlaceholder } = mergedPlaceholderRef;
        return !isComposing && (isEmptyValue(mergedValue) || Array.isArray(mergedValue) && isEmptyValue(mergedValue[0])) && mergedPlaceholder[0];
      });
      const showPlaceholder2Ref = computed(() => {
        const { value: isComposing } = isComposingRef;
        const { value: mergedValue } = mergedValueRef;
        const { value: mergedPlaceholder } = mergedPlaceholderRef;
        return !isComposing && mergedPlaceholder[1] && (isEmptyValue(mergedValue) || Array.isArray(mergedValue) && isEmptyValue(mergedValue[1]));
      });
      const mergedFocusRef = useMemo(() => {
        return props.internalForceFocus || focusedRef.value;
      });
      const showClearButton = useMemo(() => {
        if (mergedDisabledRef.value || props.readonly || !props.clearable || !mergedFocusRef.value && !hoverRef.value) {
          return false;
        }
        const { value: mergedValue } = mergedValueRef;
        const { value: mergedFocus } = mergedFocusRef;
        if (props.pair) {
          return !!(Array.isArray(mergedValue) && (mergedValue[0] || mergedValue[1])) && (hoverRef.value || mergedFocus);
        } else {
          return !!mergedValue && (hoverRef.value || mergedFocus);
        }
      });
      const mergedShowPasswordOnRef = computed(() => {
        const { showPasswordOn } = props;
        if (showPasswordOn) {
          return showPasswordOn;
        }
        if (props.showPasswordToggle)
          return "click";
        return void 0;
      });
      const passwordVisibleRef = ref(false);
      const textDecorationStyleRef = computed(() => {
        const { textDecoration } = props;
        if (!textDecoration)
          return ["", ""];
        if (Array.isArray(textDecoration)) {
          return textDecoration.map((v) => ({
            textDecoration: v
          }));
        }
        return [
          {
            textDecoration
          }
        ];
      });
      const updateTextAreaStyle = () => {
        if (props.type === "textarea") {
          const { autosize } = props;
          if (typeof autosize === "boolean")
            return;
          if (!textareaElRef.value)
            return;
          const { paddingTop: stylePaddingTop, paddingBottom: stylePaddingBottom, lineHeight: styleLineHeight } = window.getComputedStyle(textareaElRef.value);
          const paddingTop = Number(stylePaddingTop.slice(0, -2));
          const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
          const lineHeight = Number(styleLineHeight.slice(0, -2));
          const { value: textareaMirrorEl } = textareaMirrorElRef;
          if (!textareaMirrorEl)
            return;
          if (autosize.minRows) {
            const minRows = Math.max(autosize.minRows, 1);
            const styleMinHeight = `${paddingTop + paddingBottom + lineHeight * minRows}px`;
            textareaMirrorEl.style.minHeight = styleMinHeight;
          }
          if (autosize.maxRows) {
            const styleMaxHeight = `${paddingTop + paddingBottom + lineHeight * autosize.maxRows}px`;
            textareaMirrorEl.style.maxHeight = styleMaxHeight;
          }
        }
      };
      const maxlengthRef = computed(() => {
        const { maxlength } = props;
        return maxlength === void 0 ? void 0 : Number(maxlength);
      });
      onMounted(() => {
        const { value } = mergedValueRef;
        if (!Array.isArray(value)) {
          syncMirror(value);
        }
      });
      const vm = getCurrentInstance().proxy;
      function doUpdateValue(value) {
        const { onUpdateValue, "onUpdate:value": _onUpdateValue, onInput } = props;
        const { nTriggerFormInput } = formItem;
        if (onUpdateValue)
          call(onUpdateValue, value);
        if (_onUpdateValue)
          call(_onUpdateValue, value);
        if (onInput)
          call(onInput, value);
        uncontrolledValueRef.value = value;
        nTriggerFormInput();
      }
      function doChange(value) {
        const { onChange } = props;
        const { nTriggerFormChange } = formItem;
        if (onChange)
          call(onChange, value);
        uncontrolledValueRef.value = value;
        nTriggerFormChange();
      }
      function doBlur(e) {
        const { onBlur } = props;
        const { nTriggerFormBlur } = formItem;
        if (onBlur)
          call(onBlur, e);
        nTriggerFormBlur();
      }
      function doFocus(e) {
        const { onFocus } = props;
        const { nTriggerFormFocus } = formItem;
        if (onFocus)
          call(onFocus, e);
        nTriggerFormFocus();
      }
      function doClear(e) {
        const { onClear } = props;
        if (onClear)
          call(onClear, e);
      }
      function doUpdateValueBlur(e) {
        const { onInputBlur } = props;
        if (onInputBlur)
          call(onInputBlur, e);
      }
      function doUpdateValueFocus(e) {
        const { onInputFocus } = props;
        if (onInputFocus)
          call(onInputFocus, e);
      }
      function doDeactivate() {
        const { onDeactivate } = props;
        if (onDeactivate)
          call(onDeactivate);
      }
      function doActivate() {
        const { onActivate } = props;
        if (onActivate)
          call(onActivate);
      }
      function doClick(e) {
        const { onClick } = props;
        if (onClick)
          call(onClick, e);
      }
      function doWrapperFocus(e) {
        const { onWrapperFocus } = props;
        if (onWrapperFocus)
          call(onWrapperFocus, e);
      }
      function doWrapperBlur(e) {
        const { onWrapperBlur } = props;
        if (onWrapperBlur)
          call(onWrapperBlur, e);
      }
      function handleCompositionStart() {
        isComposingRef.value = true;
      }
      function handleCompositionEnd(e) {
        isComposingRef.value = false;
        if (e.target === inputEl2Ref.value) {
          handleInput(e, 1);
        } else {
          handleInput(e, 0);
        }
      }
      function handleInput(e, index2 = 0, event = "input") {
        const targetValue = e.target.value;
        syncMirror(targetValue);
        syncSource = targetValue;
        if (isComposingRef.value)
          return;
        const changedValue = targetValue;
        if (!props.pair) {
          event === "input" ? doUpdateValue(changedValue) : doChange(changedValue);
        } else {
          let { value } = mergedValueRef;
          if (!Array.isArray(value)) {
            value = ["", ""];
          } else {
            value = [...value];
          }
          value[index2] = changedValue;
          event === "input" ? doUpdateValue(value) : doChange(value);
        }
        vm.$forceUpdate();
      }
      function handleInputBlur(e) {
        doUpdateValueBlur(e);
        if (e.relatedTarget === wrapperElRef.value) {
          doDeactivate();
        }
        if (!(e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value))) {
          activatedRef.value = false;
        }
        dealWithEvent(e, "blur");
      }
      function handleInputFocus(e) {
        doUpdateValueFocus(e);
        focusedRef.value = true;
        activatedRef.value = true;
        doActivate();
        dealWithEvent(e, "focus");
      }
      function handleWrapperBlur(e) {
        if (props.passivelyActivated) {
          doWrapperBlur(e);
          dealWithEvent(e, "blur");
        }
      }
      function handleWrapperFocus(e) {
        if (props.passivelyActivated) {
          focusedRef.value = true;
          doWrapperFocus(e);
          dealWithEvent(e, "focus");
        }
      }
      function dealWithEvent(e, type) {
        if (e.relatedTarget !== null && (e.relatedTarget === inputElRef.value || e.relatedTarget === inputEl2Ref.value || e.relatedTarget === textareaElRef.value || e.relatedTarget === wrapperElRef.value))
          ;
        else {
          if (type === "focus") {
            doFocus(e);
            focusedRef.value = true;
          } else if (type === "blur") {
            doBlur(e);
            focusedRef.value = false;
          }
        }
      }
      function handleChange(e, index2) {
        handleInput(e, index2, "change");
      }
      function handleClick2(e) {
        doClick(e);
      }
      function handleClear(e) {
        doClear(e);
        if (props.pair) {
          doUpdateValue(["", ""]);
        } else {
          doUpdateValue("");
        }
      }
      function handleMouseDown(e) {
        const { onMousedown } = props;
        if (onMousedown)
          onMousedown(e);
        const { tagName } = e.target;
        if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
          if (props.resizable) {
            const { value: wrapperEl } = wrapperElRef;
            if (wrapperEl) {
              const { left, top, width, height } = wrapperEl.getBoundingClientRect();
              const resizeHandleSize = 14;
              if (left + width - resizeHandleSize < e.clientX && e.clientY < left + width && top + height - resizeHandleSize < e.clientY && e.clientY < top + height) {
                return;
              }
            }
          }
          e.preventDefault();
          if (!focusedRef.value) {
            focus();
          }
        }
      }
      function handleMouseEnter() {
        hoverRef.value = true;
      }
      function handleMouseLeave() {
        hoverRef.value = false;
      }
      function handlePasswordToggleClick() {
        if (mergedDisabledRef.value)
          return;
        if (mergedShowPasswordOnRef.value !== "click")
          return;
        passwordVisibleRef.value = !passwordVisibleRef.value;
      }
      function handlePasswordToggleMousedown(e) {
        if (mergedDisabledRef.value)
          return;
        e.preventDefault();
        const preventDefaultOnce = (e2) => {
          e2.preventDefault();
          off("mouseup", document, preventDefaultOnce);
        };
        on("mouseup", document, preventDefaultOnce);
        if (mergedShowPasswordOnRef.value !== "mousedown")
          return;
        passwordVisibleRef.value = true;
        const hidePassword = () => {
          passwordVisibleRef.value = false;
          off("mouseup", document, hidePassword);
        };
        on("mouseup", document, hidePassword);
      }
      function handleWrapperKeyDown(e) {
        var _a;
        (_a = props.onKeydown) === null || _a === void 0 ? void 0 : _a.call(props, e);
        switch (e.code) {
          case "Escape":
            handleWrapperKeyDownEsc();
            break;
          case "Enter":
          case "NumpadEnter":
            handleWrapperKeyDownEnter(e);
            break;
        }
      }
      function handleWrapperKeyDownEnter(e) {
        var _a, _b;
        if (props.passivelyActivated) {
          const { value: focused } = activatedRef;
          if (focused) {
            if (props.internalDeactivateOnEnter) {
              handleWrapperKeyDownEsc();
            }
            return;
          }
          e.preventDefault();
          if (props.type === "textarea") {
            (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
          } else {
            (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
          }
        }
      }
      function handleWrapperKeyDownEsc() {
        if (props.passivelyActivated) {
          activatedRef.value = false;
          void nextTick(() => {
            var _a;
            (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
          });
        }
      }
      function focus() {
        var _a, _b, _c;
        if (mergedDisabledRef.value)
          return;
        if (props.passivelyActivated) {
          (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        } else {
          (_b = textareaElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
          (_c = inputElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
        }
      }
      function blur() {
        var _a;
        if ((_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }
      function activate() {
        if (mergedDisabledRef.value)
          return;
        if (textareaElRef.value)
          textareaElRef.value.focus();
        else if (inputElRef.value)
          inputElRef.value.focus();
      }
      function deactivate() {
        const { value: wrapperEl } = wrapperElRef;
        if ((wrapperEl === null || wrapperEl === void 0 ? void 0 : wrapperEl.contains(document.activeElement)) && wrapperEl !== document.activeElement) {
          handleWrapperKeyDownEsc();
        }
      }
      function syncMirror(value) {
        const { type, pair, autosize } = props;
        if (!pair && autosize) {
          if (type === "textarea") {
            const { value: textareaMirrorEl } = textareaMirrorElRef;
            if (textareaMirrorEl) {
              textareaMirrorEl.textContent = (value !== null && value !== void 0 ? value : "") + "\r\n";
            }
          } else {
            const { value: inputMirrorEl } = inputMirrorElRef;
            if (inputMirrorEl) {
              if (value) {
                inputMirrorEl.textContent = value;
              } else {
                inputMirrorEl.innerHTML = "&nbsp;";
              }
            }
          }
        }
      }
      function handleTextAreaMirrorResize() {
        updateTextAreaStyle();
      }
      let stopWatchMergedValue = null;
      watchEffect(() => {
        const { autosize, type } = props;
        if (autosize && type === "textarea") {
          stopWatchMergedValue = watch(mergedValueRef, (value) => {
            if (!Array.isArray(value) && value !== syncSource) {
              syncMirror(value);
            }
          });
        } else {
          stopWatchMergedValue === null || stopWatchMergedValue === void 0 ? void 0 : stopWatchMergedValue();
        }
      });
      provide(inputInjectionKey, {
        mergedValueRef,
        maxlengthRef,
        mergedClsPrefixRef
      });
      const exposedProps = {
        wrapperElRef,
        inputElRef,
        textareaElRef,
        isCompositing: isComposingRef,
        focus,
        blur,
        deactivate,
        activate
      };
      return Object.assign(Object.assign({}, exposedProps), {
        wrapperElRef,
        inputElRef,
        inputMirrorElRef,
        inputEl2Ref,
        textareaElRef,
        textareaMirrorElRef,
        uncontrolledValue: uncontrolledValueRef,
        mergedValue: mergedValueRef,
        passwordVisible: passwordVisibleRef,
        mergedPlaceholder: mergedPlaceholderRef,
        showPlaceholder1: showPlaceholder1Ref,
        showPlaceholder2: showPlaceholder2Ref,
        mergedFocus: mergedFocusRef,
        isComposing: isComposingRef,
        activated: activatedRef,
        showClearButton,
        mergedSize: mergedSizeRef,
        mergedDisabled: mergedDisabledRef,
        textDecorationStyle: textDecorationStyleRef,
        mergedClsPrefix: mergedClsPrefixRef,
        mergedBordered: mergedBorderedRef,
        mergedShowPasswordOn: mergedShowPasswordOnRef,
        handleCompositionStart,
        handleCompositionEnd,
        handleInput,
        handleInputBlur,
        handleInputFocus,
        handleWrapperBlur,
        handleWrapperFocus,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseDown,
        handleChange,
        handleClick: handleClick2,
        handleClear,
        handlePasswordToggleClick,
        handlePasswordToggleMousedown,
        handleWrapperKeyDown,
        handleTextAreaMirrorResize,
        mergedTheme: themeRef,
        cssVars: computed(() => {
          const { value: size2 } = mergedSizeRef;
          const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { color, borderRadius, textColor, caretColor, caretColorError, caretColorWarning, textDecorationColor, border, borderDisabled, borderHover, borderFocus, placeholderColor, placeholderColorDisabled, lineHeightTextarea, colorDisabled, colorFocus, textColorDisabled, boxShadowFocus, iconSize, colorFocusWarning, boxShadowFocusWarning, borderWarning, borderFocusWarning, borderHoverWarning, colorFocusError, boxShadowFocusError, borderError, borderFocusError, borderHoverError, clearSize, clearColor, clearColorHover, clearColorPressed, iconColor, iconColorDisabled, suffixTextColor, countTextColor, iconColorHover, iconColorPressed, loadingColor, loadingColorError, loadingColorWarning, [createKey("padding", size2)]: padding, [createKey("fontSize", size2)]: fontSize, [createKey("height", size2)]: height } } = themeRef.value;
          const { left: paddingLeft, right: paddingRight } = getMargin(padding);
          return {
            "--bezier": cubicBezierEaseInOut2,
            "--count-text-color": countTextColor,
            "--color": color,
            "--font-size": fontSize,
            "--border-radius": borderRadius,
            "--height": height,
            "--padding-left": paddingLeft,
            "--padding-right": paddingRight,
            "--text-color": textColor,
            "--caret-color": caretColor,
            "--text-decoration-color": textDecorationColor,
            "--border": border,
            "--border-disabled": borderDisabled,
            "--border-hover": borderHover,
            "--border-focus": borderFocus,
            "--placeholder-color": placeholderColor,
            "--placeholder-color-disabled": placeholderColorDisabled,
            "--icon-size": iconSize,
            "--line-height-textarea": lineHeightTextarea,
            "--color-disabled": colorDisabled,
            "--color-focus": colorFocus,
            "--text-color-disabled": textColorDisabled,
            "--box-shadow-focus": boxShadowFocus,
            "--loading-color": loadingColor,
            "--caret-color-warning": caretColorWarning,
            "--color-focus-warning": colorFocusWarning,
            "--box-shadow-focus-warning": boxShadowFocusWarning,
            "--border-warning": borderWarning,
            "--border-focus-warning": borderFocusWarning,
            "--border-hover-warning": borderHoverWarning,
            "--loading-color-warning": loadingColorWarning,
            "--caret-color-error": caretColorError,
            "--color-focus-error": colorFocusError,
            "--box-shadow-focus-error": boxShadowFocusError,
            "--border-error": borderError,
            "--border-focus-error": borderFocusError,
            "--border-hover-error": borderHoverError,
            "--loading-color-error": loadingColorError,
            "--clear-color": clearColor,
            "--clear-size": clearSize,
            "--clear-color-hover": clearColorHover,
            "--clear-color-pressed": clearColorPressed,
            "--icon-color": iconColor,
            "--icon-color-hover": iconColorHover,
            "--icon-color-pressed": iconColorPressed,
            "--icon-color-disabled": iconColorDisabled,
            "--suffix-text-color": suffixTextColor
          };
        })
      });
    },
    render() {
      const { mergedClsPrefix } = this;
      return h("div", { ref: "wrapperElRef", class: [
        `${mergedClsPrefix}-input`,
        {
          [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
          [`${mergedClsPrefix}-input--textarea`]: this.type === "textarea",
          [`${mergedClsPrefix}-input--resizable`]: this.resizable && !this.autosize,
          [`${mergedClsPrefix}-input--autosize`]: this.autosize,
          [`${mergedClsPrefix}-input--round`]: this.round && !(this.type === "textarea"),
          [`${mergedClsPrefix}-input--pair`]: this.pair,
          [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
          [`${mergedClsPrefix}-input--stateful`]: this.stateful
        }
      ], style: this.cssVars, tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0, onFocus: this.handleWrapperFocus, onBlur: this.handleWrapperBlur, onClick: this.handleClick, onMousedown: this.handleMouseDown, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd, onKeyup: this.onKeyup, onKeydown: this.handleWrapperKeyDown }, h("div", { class: `${mergedClsPrefix}-input-wrapper` }, this.$slots.affix || this.$slots.prefix ? h("div", { class: `${mergedClsPrefix}-input__prefix` }, renderSlot(this.$slots, "affix", void 0, () => {
        return [renderSlot(this.$slots, "prefix")];
      })) : null, this.type === "textarea" ? h("div", { class: `${mergedClsPrefix}-input__textarea` }, h("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: `${mergedClsPrefix}-input__textarea-el`, autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: this.maxlength, minlength: this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: this.textDecorationStyle[0], onBlur: this.handleInputBlur, onFocus: this.handleInputFocus, onInput: this.handleInput, onChange: this.handleChange })), this.showPlaceholder1 ? h("div", { class: `${mergedClsPrefix}-input__placeholder`, key: "placeholder" }, this.mergedPlaceholder[0]) : null, this.autosize ? h(VResizeObserver, { onResize: this.handleTextAreaMirrorResize }, {
        default: () => h("div", { ref: "textareaMirrorElRef", class: `${mergedClsPrefix}-input__textarea-mirror`, key: "mirror" })
      }) : null) : h("div", { class: `${mergedClsPrefix}-input__input` }, h("input", Object.assign({}, this.inputProps, { ref: "inputElRef", type: this.type === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : this.type, class: `${mergedClsPrefix}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: this.maxlength, minlength: this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, style: this.textDecorationStyle[0], onBlur: this.handleInputBlur, onFocus: this.handleInputFocus, onInput: (e) => this.handleInput(e, 0), onChange: (e) => this.handleChange(e, 0) })), this.showPlaceholder1 ? h("div", { class: `${mergedClsPrefix}-input__placeholder` }, h("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? h("div", { class: `${mergedClsPrefix}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, "\xA0") : null), !this.pair && (this.$slots.suffix || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0) ? h("div", { class: `${mergedClsPrefix}-input__suffix` }, [
        this.clearable || this.$slots.clear ? h(NBaseClear, { clsPrefix: mergedClsPrefix, show: this.showClearButton, onClear: this.handleClear }, { default: () => renderSlot(this.$slots, "clear") }) : null,
        renderSlot(this.$slots, "suffix"),
        this.loading !== void 0 ? h(NBaseSuffix, { clsPrefix: mergedClsPrefix, loading: this.loading, showArrow: false, showClear: false, style: this.cssVars }) : null,
        this.showCount && this.type !== "textarea" ? h(WordCount, null, { default: this.$slots.count }) : null,
        this.mergedShowPasswordOn && this.type === "password" ? h(NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, {
          default: () => this.passwordVisible ? h(EyeIcon, null) : h(EyeOffIcon, null)
        }) : null
      ]) : null), this.pair ? h("span", { class: `${mergedClsPrefix}-input__separator` }, renderSlot(this.$slots, "separator", void 0, () => [
        this.separator
      ])) : null, this.pair ? h("div", { class: `${mergedClsPrefix}-input-wrapper` }, h("div", { class: `${mergedClsPrefix}-input__input` }, h("input", { ref: "inputEl2Ref", type: this.type, class: `${mergedClsPrefix}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: this.maxlength, minlength: this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: this.handleInputFocus, onInput: (e) => this.handleInput(e, 1), onChange: (e) => this.handleChange(e, 1) }), this.showPlaceholder2 ? h("div", { class: `${mergedClsPrefix}-input__placeholder` }, h("span", null, this.mergedPlaceholder[1])) : null), h("div", { class: `${mergedClsPrefix}-input__suffix` }, [
        this.clearable || this.$slots.clear ? h(NBaseClear, { clsPrefix: mergedClsPrefix, show: this.showClearButton, onClear: this.handleClear }, { default: () => renderSlot(this.$slots, "clear") }) : null,
        renderSlot(this.$slots, "suffix")
      ])) : null, this.mergedBordered ? h("div", { class: `${mergedClsPrefix}-input__border` }) : null, this.mergedBordered ? h("div", { class: `${mergedClsPrefix}-input__state-border` }) : null, this.showCount && this.type === "textarea" ? h(WordCount, null, { default: this.$slots.count }) : null);
    }
  });
  function createHoverColor(rgb) {
    return composite(rgb, [255, 255, 255, 0.16]);
  }
  function createPressedColor(rgb) {
    return composite(rgb, [0, 0, 0, 0.12]);
  }
  var commonVariables$1 = {
    paddingTiny: "0 6px",
    paddingSmall: "0 10px",
    paddingMedium: "0 14px",
    paddingLarge: "0 18px",
    paddingRoundTiny: "0 10px",
    paddingRoundSmall: "0 14px",
    paddingRoundMedium: "0 18px",
    paddingRoundLarge: "0 22px",
    iconMarginTiny: "6px",
    iconMarginSmall: "6px",
    iconMarginMedium: "6px",
    iconMarginLarge: "6px",
    iconSizeTiny: "14px",
    iconSizeSmall: "18px",
    iconSizeMedium: "18px",
    iconSizeLarge: "20px",
    rippleDuration: ".6s"
  };
  const self$4 = (vars) => {
    const { heightTiny, heightSmall, heightMedium, heightLarge, borderRadius, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, opacityDisabled, textColor1, textColor2, textColor3, primaryColorHover, primaryColorPressed, borderColor, primaryColor, baseColor, infoColor, infoColorHover, infoColorPressed, successColor, successColorHover, successColorPressed, warningColor, warningColorHover, warningColorPressed, errorColor, errorColorHover, errorColorPressed, fontWeight } = vars;
    return Object.assign(Object.assign({}, commonVariables$1), {
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      borderRadiusTiny: borderRadius,
      borderRadiusSmall: borderRadius,
      borderRadiusMedium: borderRadius,
      borderRadiusLarge: borderRadius,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      opacityDisabled,
      color: "#0000",
      colorHover: "#0000",
      colorPressed: "#0000",
      colorFocus: "#0000",
      colorDisabled: "#0000",
      textColor: textColor2,
      textColorHover: primaryColorHover,
      textColorPressed: primaryColorPressed,
      textColorFocus: primaryColorHover,
      textColorDisabled: textColor2,
      textColorText: textColor2,
      textColorTextDepth1: textColor1,
      textColorTextDepth2: textColor2,
      textColorTextDepth3: textColor3,
      textColorTextHover: primaryColorHover,
      textColorTextPressed: primaryColorPressed,
      textColorTextFocus: primaryColorHover,
      textColorTextDisabled: textColor2,
      textColorGhost: textColor2,
      textColorGhostHover: primaryColorHover,
      textColorGhostPressed: primaryColorPressed,
      textColorGhostFocus: primaryColorHover,
      textColorGhostDisabled: textColor2,
      border: `1px solid ${borderColor}`,
      borderHover: `1px solid ${primaryColorHover}`,
      borderPressed: `1px solid ${primaryColorPressed}`,
      borderFocus: `1px solid ${primaryColorHover}`,
      borderDisabled: `1px solid ${borderColor}`,
      rippleColor: primaryColor,
      colorPrimary: primaryColor,
      colorHoverPrimary: primaryColorHover,
      colorPressedPrimary: primaryColorPressed,
      colorFocusPrimary: primaryColorHover,
      colorDisabledPrimary: primaryColor,
      textColorPrimary: baseColor,
      textColorHoverPrimary: baseColor,
      textColorPressedPrimary: baseColor,
      textColorFocusPrimary: baseColor,
      textColorDisabledPrimary: baseColor,
      textColorTextPrimary: primaryColor,
      textColorTextHoverPrimary: primaryColorHover,
      textColorTextPressedPrimary: primaryColorPressed,
      textColorTextFocusPrimary: primaryColorHover,
      textColorTextDisabledPrimary: textColor2,
      textColorGhostPrimary: primaryColor,
      textColorGhostHoverPrimary: primaryColorHover,
      textColorGhostPressedPrimary: primaryColorPressed,
      textColorGhostFocusPrimary: primaryColorHover,
      textColorGhostDisabledPrimary: primaryColor,
      borderPrimary: `1px solid ${primaryColor}`,
      borderHoverPrimary: `1px solid ${primaryColorHover}`,
      borderPressedPrimary: `1px solid ${primaryColorPressed}`,
      borderFocusPrimary: `1px solid ${primaryColorHover}`,
      borderDisabledPrimary: `1px solid ${primaryColor}`,
      rippleColorPrimary: primaryColor,
      colorInfo: infoColor,
      colorHoverInfo: infoColorHover,
      colorPressedInfo: infoColorPressed,
      colorFocusInfo: infoColorHover,
      colorDisabledInfo: infoColor,
      textColorInfo: baseColor,
      textColorHoverInfo: baseColor,
      textColorPressedInfo: baseColor,
      textColorFocusInfo: baseColor,
      textColorDisabledInfo: baseColor,
      textColorTextInfo: infoColor,
      textColorTextHoverInfo: infoColorHover,
      textColorTextPressedInfo: infoColorPressed,
      textColorTextFocusInfo: infoColorHover,
      textColorTextDisabledInfo: textColor2,
      textColorGhostInfo: infoColor,
      textColorGhostHoverInfo: infoColorHover,
      textColorGhostPressedInfo: infoColorPressed,
      textColorGhostFocusInfo: infoColorHover,
      textColorGhostDisabledInfo: infoColor,
      borderInfo: `1px solid ${infoColor}`,
      borderHoverInfo: `1px solid ${infoColorHover}`,
      borderPressedInfo: `1px solid ${infoColorPressed}`,
      borderFocusInfo: `1px solid ${infoColorHover}`,
      borderDisabledInfo: `1px solid ${infoColor}`,
      rippleColorInfo: infoColor,
      colorSuccess: successColor,
      colorHoverSuccess: successColorHover,
      colorPressedSuccess: successColorPressed,
      colorFocusSuccess: successColorHover,
      colorDisabledSuccess: successColor,
      textColorSuccess: baseColor,
      textColorHoverSuccess: baseColor,
      textColorPressedSuccess: baseColor,
      textColorFocusSuccess: baseColor,
      textColorDisabledSuccess: baseColor,
      textColorTextSuccess: successColor,
      textColorTextHoverSuccess: successColorHover,
      textColorTextPressedSuccess: successColorPressed,
      textColorTextFocusSuccess: successColorHover,
      textColorTextDisabledSuccess: textColor2,
      textColorGhostSuccess: successColor,
      textColorGhostHoverSuccess: successColorHover,
      textColorGhostPressedSuccess: successColorPressed,
      textColorGhostFocusSuccess: successColorHover,
      textColorGhostDisabledSuccess: successColor,
      borderSuccess: `1px solid ${successColor}`,
      borderHoverSuccess: `1px solid ${successColorHover}`,
      borderPressedSuccess: `1px solid ${successColorPressed}`,
      borderFocusSuccess: `1px solid ${successColorHover}`,
      borderDisabledSuccess: `1px solid ${successColor}`,
      rippleColorSuccess: successColor,
      colorWarning: warningColor,
      colorHoverWarning: warningColorHover,
      colorPressedWarning: warningColorPressed,
      colorFocusWarning: warningColorHover,
      colorDisabledWarning: warningColor,
      textColorWarning: baseColor,
      textColorHoverWarning: baseColor,
      textColorPressedWarning: baseColor,
      textColorFocusWarning: baseColor,
      textColorDisabledWarning: baseColor,
      textColorTextWarning: warningColor,
      textColorTextHoverWarning: warningColorHover,
      textColorTextPressedWarning: warningColorPressed,
      textColorTextFocusWarning: warningColorHover,
      textColorTextDisabledWarning: textColor2,
      textColorGhostWarning: warningColor,
      textColorGhostHoverWarning: warningColorHover,
      textColorGhostPressedWarning: warningColorPressed,
      textColorGhostFocusWarning: warningColorHover,
      textColorGhostDisabledWarning: warningColor,
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      borderPressedWarning: `1px solid ${warningColorPressed}`,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      borderDisabledWarning: `1px solid ${warningColor}`,
      rippleColorWarning: warningColor,
      colorError: errorColor,
      colorHoverError: errorColorHover,
      colorPressedError: errorColorPressed,
      colorFocusError: errorColorHover,
      colorDisabledError: errorColor,
      textColorError: baseColor,
      textColorHoverError: baseColor,
      textColorPressedError: baseColor,
      textColorFocusError: baseColor,
      textColorDisabledError: baseColor,
      textColorTextError: errorColor,
      textColorTextHoverError: errorColorHover,
      textColorTextPressedError: errorColorPressed,
      textColorTextFocusError: errorColorHover,
      textColorTextDisabledError: textColor2,
      textColorGhostError: errorColor,
      textColorGhostHoverError: errorColorHover,
      textColorGhostPressedError: errorColorPressed,
      textColorGhostFocusError: errorColorHover,
      textColorGhostDisabledError: errorColor,
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      borderPressedError: `1px solid ${errorColorPressed}`,
      borderFocusError: `1px solid ${errorColorHover}`,
      borderDisabledError: `1px solid ${errorColor}`,
      rippleColorError: errorColor,
      waveOpacity: "0.6",
      fontWeightText: fontWeight,
      fontWeight,
      fontWeighGhost: fontWeight
    });
  };
  const buttonLight = {
    name: "Button",
    common: commonLight,
    self: self$4
  };
  var buttonLight$1 = buttonLight;
  const zero = "0!important";
  const n1 = "-1px!important";
  function createLeftBorderStyle(type) {
    return cM(type + "-type", [c("& +", [cB("button", {}, [cM(type + "-type", [cE("border", {
      borderLeftWidth: zero
    }), cE("state-border", {
      left: n1
    })])])])]);
  }
  function createTopBorderStyle(type) {
    return cM(type + "-type", [c("& +", [cB("button", [cM(type + "-type", [cE("border", {
      borderTopWidth: zero
    }), cE("state-border", {
      top: n1
    })])])])]);
  }
  var style$4 = cB("button-group", `
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`, [cNotM("vertical", {
    flexDirection: "row"
  }, [cB("button", [c("&:first-child:not(:last-child)", `
 margin-right: ${zero};
 border-top-right-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c("&:last-child:not(:first-child)", `
 margin-left: ${zero};
 border-top-left-radius: ${zero};
 border-bottom-left-radius: ${zero};
 `), c("&:not(:first-child):not(:last-child)", `
 margin-left: ${zero};
 margin-right: ${zero};
 border-radius: ${zero};
 `), createLeftBorderStyle("default"), cM("ghost", [createLeftBorderStyle("primary"), createLeftBorderStyle("info"), createLeftBorderStyle("success"), createLeftBorderStyle("warning"), createLeftBorderStyle("error")])])]), cM("vertical", {
    flexDirection: "column"
  }, [cB("button", [c("&:first-child:not(:last-child)", `
 margin-bottom: ${zero};
 margin-left: ${zero};
 margin-right: ${zero};
 border-bottom-left-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c("&:last-child:not(:first-child)", `
 margin-top: ${zero};
 margin-left: ${zero};
 margin-right: ${zero};
 border-top-left-radius: ${zero};
 border-top-right-radius: ${zero};
 `), c("&:not(:first-child):not(:last-child)", `
 margin: ${zero};
 border-radius: ${zero};
 `), createTopBorderStyle("default"), cM("ghost", [createTopBorderStyle("primary"), createTopBorderStyle("info"), createTopBorderStyle("success"), createTopBorderStyle("warning"), createTopBorderStyle("error")])])])]);
  const buttonGroupInjectionKey = Symbol("button-group");
  const buttonGroupProps = {
    size: {
      type: String,
      default: void 0
    },
    vertical: Boolean
  };
  defineComponent({
    name: "ButtonGroup",
    props: buttonGroupProps,
    setup(props) {
      const { mergedClsPrefixRef } = useConfig(props);
      useStyle("ButtonGroup", style$4, mergedClsPrefixRef);
      provide(buttonGroupInjectionKey, props);
      return {
        mergedClsPrefix: mergedClsPrefixRef
      };
    },
    render() {
      const { mergedClsPrefix } = this;
      return h("div", { class: [
        `${mergedClsPrefix}-button-group`,
        this.vertical && `${mergedClsPrefix}-button-group--vertical`
      ], role: "group" }, this.$slots);
    }
  });
  var style$3 = c([cB("button", `
 font-weight: var(--font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--padding);
 height: var(--height);
 font-size: var(--font-size);
 border-radius: var(--border-radius);
 color: var(--text-color);
 background-color: var(--color);
 width: var(--width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: center;
 justify-content: center;
 user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--bezier),
 background-color .3s var(--bezier),
 opacity .3s var(--bezier),
 border-color .3s var(--bezier);
 `, [cM("color", [cE("border", {
    borderColor: "var(--border-color)"
  }), cM("disabled", [cE("border", {
    borderColor: "var(--border-color-disabled)"
  })]), cNotM("disabled", [c("&:focus", [cE("state-border", {
    borderColor: "var(--border-color-focus)"
  })]), c("&:hover", [cE("state-border", {
    borderColor: "var(--border-color-hover)"
  })]), c("&:active", [cE("state-border", {
    borderColor: "var(--border-color-pressed)"
  })]), cM("pressed", [cE("state-border", {
    borderColor: "var(--border-color-pressed)"
  })])])]), cM("disabled", {
    backgroundColor: "var(--color-disabled)",
    color: "var(--text-color-disabled)"
  }, [cE("border", {
    border: "var(--border-disabled)"
  })]), cNotM("disabled", [c("&:focus", {
    backgroundColor: "var(--color-focus)",
    color: "var(--text-color-focus)"
  }, [cE("state-border", {
    border: "var(--border-focus)"
  })]), c("&:hover", {
    backgroundColor: "var(--color-hover)",
    color: "var(--text-color-hover)"
  }, [cE("state-border", {
    border: "var(--border-hover)"
  })]), c("&:active", {
    backgroundColor: "var(--color-pressed)",
    color: "var(--text-color-pressed)"
  }, [cE("state-border", {
    border: "var(--border-pressed)"
  })]), cM("pressed", {
    backgroundColor: "var(--color-pressed)",
    color: "var(--text-color-pressed)"
  }, [cE("state-border", {
    border: "var(--border-pressed)"
  })])]), cB("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--ripple-duration);
 animation-timing-function: var(--bezier-ease-out), var(--bezier-ease-out);
 `, [cM("active", {
    zIndex: 1,
    animationName: "button-wave-spread, button-wave-opacity"
  })]), typeof window !== "undefined" && "MozBoxSizing" in document.createElement("div").style ? c("&::moz-focus-inner", {
    border: 0
  }) : null, cE("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--bezier);
 pointer-events: none;
 `), cE("border", {
    border: "var(--border)"
  }), cE("state-border", {
    border: "var(--border)",
    borderColor: "#0000",
    zIndex: 1
  }), cE("icon", `
 margin: var(--icon-margin);
 margin-left: 0;
 height: var(--icon-size);
 width: var(--icon-size);
 max-width: var(--icon-size);
 font-size: var(--icon-size);
 position: relative;
 flex-shrink: 0;
 `, [cB("icon-slot", `
 height: var(--icon-size);
 width: var(--icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 `, [createIconSwitchTransition({
    top: "50%",
    originalTransform: "translateY(-50%)"
  })]), fadeInWidthExpandTransition()]), cE("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [c("~", [cE("icon", {
    margin: "var(--icon-margin)",
    marginRight: 0
  })])]), cM("block", `
 display: flex;
 width: 100%;
 `), cM("dashed", [cE("border, state-border", {
    borderStyle: "dashed !important"
  })]), cM("disabled", {
    cursor: "not-allowed",
    opacity: "var(--opacity-disabled)"
  })]), c("@keyframes button-wave-spread", {
    from: {
      boxShadow: "0 0 0.5px 0 var(--ripple-color)"
    },
    to: {
      boxShadow: "0 0 0.5px 4.5px var(--ripple-color)"
    }
  }), c("@keyframes button-wave-opacity", {
    from: {
      opacity: "var(--wave-opacity)"
    },
    to: {
      opacity: 0
    }
  })]);
  const buttonProps = Object.assign(Object.assign({}, useTheme.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, depth: [Number, String], focusable: {
    type: Boolean,
    default: true
  }, keyboard: {
    type: Boolean,
    default: true
  }, tag: {
    type: String,
    default: "button"
  }, type: {
    type: String,
    default: "default"
  }, dashed: Boolean, iconPlacement: {
    type: String,
    default: "left"
  }, attrType: {
    type: String,
    default: "button"
  }, onClick: [Function, Array], bordered: {
    type: Boolean,
    default: true
  } });
  const Button = defineComponent({
    name: "Button",
    props: buttonProps,
    setup(props) {
      const selfRef = ref(null);
      const waveRef = ref(null);
      const enterPressedRef = ref(false);
      const showBorderRef = useMemo(() => {
        return !props.text && (!props.color || props.ghost || props.dashed) && props.bordered;
      });
      const NButtonGroup = inject(buttonGroupInjectionKey, {});
      const { mergedSizeRef } = useFormItem({}, {
        defaultSize: "medium",
        mergedSize: (NFormItem) => {
          const { size: size2 } = props;
          if (size2)
            return size2;
          const { size: buttonGroupSize } = NButtonGroup;
          if (buttonGroupSize)
            return buttonGroupSize;
          const { mergedSize: formItemSize } = NFormItem || {};
          if (formItemSize) {
            return formItemSize.value;
          }
          return "medium";
        }
      });
      const mergedFocusableRef = computed(() => {
        return props.focusable && !props.disabled;
      });
      const handleMouseDown = (e) => {
        var _a;
        e.preventDefault();
        if (props.disabled) {
          return;
        }
        if (mergedFocusableRef.value) {
          (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
        }
      };
      const handleClick2 = (e) => {
        if (!props.disabled) {
          const { onClick } = props;
          if (onClick)
            call(onClick, e);
          if (!props.text) {
            const { value } = waveRef;
            if (value) {
              value.play();
            }
          }
        }
      };
      const handleKeyUp = (e) => {
        switch (e.code) {
          case "Enter":
          case "NumpadEnter":
            if (!props.keyboard) {
              e.preventDefault();
              return;
            }
            enterPressedRef.value = false;
            void nextTick(() => {
              var _a;
              if (!props.disabled) {
                (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.click();
              }
            });
        }
      };
      const handleKeyDown = (e) => {
        switch (e.code) {
          case "Enter":
          case "NumpadEnter":
            if (!props.keyboard) {
              e.preventDefault();
              return;
            }
            enterPressedRef.value = true;
        }
      };
      const handleBlur = () => {
        enterPressedRef.value = false;
      };
      const { mergedClsPrefixRef, NConfigProvider } = useConfig(props);
      const themeRef = useTheme("Button", "Button", style$3, buttonLight$1, props, mergedClsPrefixRef);
      const rtlEnabledRef = useRtl("Button", NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef, mergedClsPrefixRef);
      return {
        selfRef,
        waveRef,
        mergedClsPrefix: mergedClsPrefixRef,
        mergedFocusable: mergedFocusableRef,
        mergedSize: mergedSizeRef,
        showBorder: showBorderRef,
        enterPressed: enterPressedRef,
        rtlEnabled: rtlEnabledRef,
        handleMouseDown,
        handleKeyDown,
        handleBlur,
        handleKeyUp,
        handleClick: handleClick2,
        customColorCssVars: computed(() => {
          const { color } = props;
          if (!color)
            return null;
          const hoverColor = createHoverColor(color);
          return {
            "--border-color": color,
            "--border-color-hover": hoverColor,
            "--border-color-pressed": createPressedColor(color),
            "--border-color-focus": hoverColor,
            "--border-color-disabled": color
          };
        }),
        cssVars: computed(() => {
          const theme = themeRef.value;
          const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2, cubicBezierEaseOut: cubicBezierEaseOut2 }, self: self2 } = theme;
          const { rippleDuration, opacityDisabled, fontWeightText, fontWeighGhost, fontWeight } = self2;
          const size2 = mergedSizeRef.value;
          const { dashed, type, ghost, text, color, round, circle, textColor } = props;
          const fontProps = {
            fontWeight: text ? fontWeightText : ghost ? fontWeighGhost : fontWeight
          };
          let colorProps = {
            "--color": "initial",
            "--color-hover": "initial",
            "--color-pressed": "initial",
            "--color-focus": "initial",
            "--color-disabled": "initial",
            "--ripple-color": "initial",
            "--text-color": "initial",
            "--text-color-hover": "initial",
            "--text-color-pressed": "initial",
            "--text-color-focus": "initial",
            "--text-color-disabled": "initial"
          };
          if (text) {
            const { depth } = props;
            const propTextColor = textColor || color;
            const mergedTextColor = propTextColor || (type === "default" && depth !== void 0 ? self2[createKey("textColorTextDepth", String(depth))] : self2[createKey("textColorText", type)]);
            colorProps = {
              "--color": "#0000",
              "--color-hover": "#0000",
              "--color-pressed": "#0000",
              "--color-focus": "#0000",
              "--color-disabled": "#0000",
              "--ripple-color": "#0000",
              "--text-color": mergedTextColor,
              "--text-color-hover": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", type)],
              "--text-color-pressed": propTextColor ? createPressedColor(propTextColor) : self2[createKey("textColorTextPressed", type)],
              "--text-color-focus": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", type)],
              "--text-color-disabled": propTextColor || self2[createKey("textColorTextDisabled", type)]
            };
          } else if (ghost || dashed) {
            const mergedTextColor = textColor || color;
            colorProps = {
              "--color": "#0000",
              "--color-hover": "#0000",
              "--color-pressed": "#0000",
              "--color-focus": "#0000",
              "--color-disabled": "#0000",
              "--ripple-color": color || self2[createKey("rippleColor", type)],
              "--text-color": mergedTextColor || self2[createKey("textColorGhost", type)],
              "--text-color-hover": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", type)],
              "--text-color-pressed": mergedTextColor ? createPressedColor(mergedTextColor) : self2[createKey("textColorGhostPressed", type)],
              "--text-color-focus": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", type)],
              "--text-color-disabled": mergedTextColor || self2[createKey("textColorGhostDisabled", type)]
            };
          } else {
            colorProps = {
              "--color": color || self2[createKey("color", type)],
              "--color-hover": color ? createHoverColor(color) : self2[createKey("colorHover", type)],
              "--color-pressed": color ? createPressedColor(color) : self2[createKey("colorPressed", type)],
              "--color-focus": color ? createHoverColor(color) : self2[createKey("colorFocus", type)],
              "--color-disabled": color || self2[createKey("colorDisabled", type)],
              "--ripple-color": color || self2[createKey("rippleColor", type)],
              "--text-color": textColor || (color ? self2.textColorPrimary : self2[createKey("textColor", type)]),
              "--text-color-hover": textColor || (color ? self2.textColorHoverPrimary : self2[createKey("textColorHover", type)]),
              "--text-color-pressed": textColor || (color ? self2.textColorPressedPrimary : self2[createKey("textColorPressed", type)]),
              "--text-color-focus": textColor || (color ? self2.textColorFocusPrimary : self2[createKey("textColorFocus", type)]),
              "--text-color-disabled": textColor || (color ? self2.textColorDisabledPrimary : self2[createKey("textColorDisabled", type)])
            };
          }
          let borderProps = {
            "--border": "initial",
            "--border-hover": "initial",
            "--border-pressed": "initial",
            "--border-focus": "initial",
            "--border-disabled": "initial"
          };
          if (text) {
            borderProps = {
              "--border": "none",
              "--border-hover": "none",
              "--border-pressed": "none",
              "--border-focus": "none",
              "--border-disabled": "none"
            };
          } else {
            borderProps = {
              "--border": self2[createKey("border", type)],
              "--border-hover": self2[createKey("borderHover", type)],
              "--border-pressed": self2[createKey("borderPressed", type)],
              "--border-focus": self2[createKey("borderFocus", type)],
              "--border-disabled": self2[createKey("borderDisabled", type)]
            };
          }
          const { [createKey("height", size2)]: height, [createKey("fontSize", size2)]: fontSize, [createKey("padding", size2)]: padding, [createKey("paddingRound", size2)]: paddingRound, [createKey("iconSize", size2)]: iconSize, [createKey("borderRadius", size2)]: borderRadius, [createKey("iconMargin", size2)]: iconMargin, waveOpacity } = self2;
          const sizeProps = {
            "--width": circle && !text ? height : "initial",
            "--height": text ? "initial" : height,
            "--font-size": fontSize,
            "--padding": circle ? "initial" : text ? "initial" : round ? paddingRound : padding,
            "--icon-size": iconSize,
            "--icon-margin": iconMargin,
            "--border-radius": text ? "initial" : circle || round ? height : borderRadius
          };
          return Object.assign(Object.assign(Object.assign(Object.assign({ "--bezier": cubicBezierEaseInOut2, "--bezier-ease-out": cubicBezierEaseOut2, "--ripple-duration": rippleDuration, "--opacity-disabled": opacityDisabled, "--wave-opacity": waveOpacity }, fontProps), colorProps), borderProps), sizeProps);
        })
      };
    },
    render() {
      const { $slots, mergedClsPrefix, tag: Component } = this;
      return h(Component, { ref: "selfRef", class: [
        `${mergedClsPrefix}-button`,
        `${mergedClsPrefix}-button--${this.type}-type`,
        `${mergedClsPrefix}-button--${this.mergedSize}-type`,
        this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
        this.disabled && `${mergedClsPrefix}-button--disabled`,
        this.block && `${mergedClsPrefix}-button--block`,
        this.enterPressed && `${mergedClsPrefix}-button--pressed`,
        !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
        this.color && `${mergedClsPrefix}-button--color`,
        this.ghost && `${mergedClsPrefix}-button--ghost`
      ], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMouseDown, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown }, $slots.default && this.iconPlacement === "right" ? h("div", { class: `${mergedClsPrefix}-button__content` }, $slots) : null, h(NFadeInExpandTransition, { width: true }, {
        default: () => $slots.icon || this.loading ? h("span", { class: `${mergedClsPrefix}-button__icon`, style: {
          margin: !$slots.default ? 0 : ""
        } }, h(NIconSwitchTransition, null, {
          default: () => this.loading ? h(NBaseLoading, { clsPrefix: mergedClsPrefix, key: "loading", class: `${mergedClsPrefix}-icon-slot`, strokeWidth: 20 }) : h("div", { key: "icon", class: `${mergedClsPrefix}-icon-slot`, role: "none" }, renderSlot($slots, "icon"))
        })) : null
      }), $slots.default && this.iconPlacement === "left" ? h("span", { class: `${mergedClsPrefix}-button__content` }, $slots) : null, !this.text ? h(NBaseWave, { ref: "waveRef", clsPrefix: mergedClsPrefix }) : null, this.showBorder ? h("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__border`, style: this.customColorCssVars }) : null, this.showBorder ? h("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__state-border`, style: this.customColorCssVars }) : null);
    }
  });
  var NButton = Button;
  var commonVariables = {
    paddingSmall: "12px 16px 12px",
    paddingMedium: "19px 24px 20px",
    paddingLarge: "23px 32px 24px",
    paddingHuge: "27px 40px 28px",
    titleFontSizeSmall: "16px",
    titleFontSizeMedium: "18px",
    titleFontSizeLarge: "18px",
    titleFontSizeHuge: "18px",
    closeSize: "18px"
  };
  const self$3 = (vars) => {
    const { primaryColor, borderRadius, lineHeight, fontSize, cardColor, textColor2, textColor1, dividerColor, fontWeightStrong, closeColor, closeColorHover, closeColorPressed, modalColor, boxShadow1, popoverColor, actionColor } = vars;
    return Object.assign(Object.assign({}, commonVariables), { lineHeight, color: cardColor, colorModal: modalColor, colorPopover: popoverColor, colorTarget: primaryColor, colorEmbedded: actionColor, textColor: textColor2, titleTextColor: textColor1, borderColor: dividerColor, actionColor, titleFontWeight: fontWeightStrong, closeColor, closeColorHover, closeColorPressed, fontSizeSmall: fontSize, fontSizeMedium: fontSize, fontSizeLarge: fontSize, fontSizeHuge: fontSize, boxShadow: boxShadow1, borderRadius });
  };
  const cardLight = {
    name: "Card",
    common: commonLight,
    self: self$3
  };
  var cardLight$1 = cardLight;
  var style$2 = c([cB("card", `
 font-size: var(--font-size);
 line-height: var(--line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--border-radius);
 background-color: var(--color);
 color: var(--text-color);
 transition: 
 color .3s var(--bezier),
 background-color .3s var(--bezier),
 box-shadow .3s var(--bezier),
 border-color .3s var(--bezier);
 `, [cM("hoverable", [c("&:hover", "box-shadow: var(--box-shadow);")]), cM("content-segmented", [c(">", [cE("content", {
    paddingTop: "var(--padding-bottom)"
  })])]), cM("content-soft-segmented", [c(">", [cE("content", `
 margin: 0 var(--padding-left);
 padding: var(--padding-bottom) 0;
 `)])]), cM("footer-segmented", [c(">", [cE("footer", {
    paddingTop: "var(--padding-bottom)"
  })])]), cM("footer-soft-segmented", [c(">", [cE("footer", `
 padding: var(--padding-bottom) 0;
 margin: 0 var(--padding-left);
 `)])]), c(">", [cB("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--title-font-size);
 padding:
 var(--padding-top)
 var(--padding-left)
 var(--padding-bottom)
 var(--padding-left);
 `, [cE("main", `
 font-weight: var(--title-font-weight);
 transition: color .3s var(--bezier);
 flex: 1;
 color: var(--title-text-color);
 `), cE("extra", `
 display: flex;
 align-items: center;
 font-size: var(--font-size);
 font-weight: 400;
 transition: color .3s var(--bezier);
 color: var(--text-color);
 `), cE("close", `
 font-size: var(--close-size);
 transition: color .3s var(--bezier);
 `)]), cE("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--bezier),
 border-color .3s var(--bezier);
 background-clip: padding-box;
 background-color: var(--action-color);
 `), cE("content", "flex: 1;"), cE("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--padding-left) var(--padding-bottom) var(--padding-left);
 font-size: var(--font-size);
 `, [c("&:first-child", {
    paddingTop: "var(--padding-bottom)"
  })]), cE("action", `
 background-color: var(--action-color);
 padding: var(--padding-bottom) var(--padding-left);
 `)]), cB("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--border-radius) var(--border-radius) 0 0;
 `, [c("img", `
 display: block;
 width: 100%;
 `)]), cM("bordered", `
 border: 1px solid var(--border-color);
 `, [c("&:target", "border-color: var(--color-target);")]), cM("action-segmented", [c(">", [cE("action", [c("&:not(:first-child)", {
    borderTop: "1px solid var(--border-color)"
  })])])]), cM("content-segmented, content-soft-segmented", [c(">", [cE("content", {
    transition: "border-color 0.3s var(--bezier)"
  }, [c("&:not(:first-child)", {
    borderTop: "1px solid var(--border-color)"
  })])])]), cM("footer-segmented, footer-soft-segmented", [c(">", [cE("footer", {
    transition: "border-color 0.3s var(--bezier)"
  }, [c("&:not(:first-child)", {
    borderTop: "1px solid var(--border-color)"
  })])])])]), insideModal(cB("card", {
    background: "var(--color-modal)"
  })), insidePopover(cB("card", {
    background: "var(--color-popover)"
  })), cB("card", [asModal({
    background: "var(--color-modal)"
  })])]);
  const cardBaseProps = {
    title: String,
    contentStyle: [Object, String],
    headerStyle: [Object, String],
    footerStyle: [Object, String],
    embedded: Boolean,
    segmented: {
      type: [Boolean, Object],
      default: false
    },
    size: {
      type: String,
      default: "medium"
    },
    bordered: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    hoverable: Boolean,
    onClose: [Function, Array]
  };
  const cardBasePropKeys = keysOf(cardBaseProps);
  const cardProps = Object.assign(Object.assign({}, useTheme.props), cardBaseProps);
  var NCard = defineComponent({
    name: "Card",
    props: cardProps,
    setup(props) {
      const handleCloseClick = () => {
        const { onClose } = props;
        if (onClose)
          call(onClose);
      };
      const { mergedClsPrefixRef, NConfigProvider } = useConfig(props);
      const themeRef = useTheme("Card", "Card", style$2, cardLight$1, props, mergedClsPrefixRef);
      const rtlEnabledRef = useRtl("Card", NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef, mergedClsPrefixRef);
      return {
        rtlEnabled: rtlEnabledRef,
        mergedClsPrefix: mergedClsPrefixRef,
        mergedTheme: themeRef,
        handleCloseClick,
        cssVars: computed(() => {
          const { size: size2 } = props;
          const { self: { color, colorModal, colorTarget, textColor, titleTextColor, titleFontWeight, borderColor, actionColor, borderRadius, closeColor, closeColorHover, closeColorPressed, lineHeight, closeSize, boxShadow, colorPopover, colorEmbedded, [createKey("padding", size2)]: padding, [createKey("fontSize", size2)]: fontSize, [createKey("titleFontSize", size2)]: titleFontSize }, common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 } } = themeRef.value;
          const { top: paddingTop, left: paddingLeft, bottom: paddingBottom } = getMargin(padding);
          return {
            "--bezier": cubicBezierEaseInOut2,
            "--border-radius": borderRadius,
            "--color": props.embedded ? colorEmbedded : color,
            "--color-modal": colorModal,
            "--color-popover": colorPopover,
            "--color-target": colorTarget,
            "--text-color": textColor,
            "--line-height": lineHeight,
            "--action-color": actionColor,
            "--title-text-color": titleTextColor,
            "--title-font-weight": titleFontWeight,
            "--close-color": closeColor,
            "--close-color-hover": closeColorHover,
            "--close-color-pressed": closeColorPressed,
            "--border-color": borderColor,
            "--box-shadow": boxShadow,
            "--padding-top": paddingTop,
            "--padding-bottom": paddingBottom,
            "--padding-left": paddingLeft,
            "--font-size": fontSize,
            "--title-font-size": titleFontSize,
            "--close-size": closeSize
          };
        })
      };
    },
    render() {
      const { segmented, bordered, hoverable, mergedClsPrefix, rtlEnabled, $slots } = this;
      return h("div", { class: [
        `${mergedClsPrefix}-card`,
        {
          [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
          [`${mergedClsPrefix}-card--content${typeof segmented !== "boolean" && segmented.content === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.content,
          [`${mergedClsPrefix}-card--footer${typeof segmented !== "boolean" && segmented.footer === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.footer,
          [`${mergedClsPrefix}-card--action-segmented`]: segmented === true || segmented !== false && segmented.action,
          [`${mergedClsPrefix}-card--bordered`]: bordered,
          [`${mergedClsPrefix}-card--hoverable`]: hoverable
        }
      ], style: this.cssVars }, $slots.cover ? h("div", { class: `${mergedClsPrefix}-card-cover`, role: "none" }, renderSlot($slots, "cover")) : null, $slots.header || this.title || this.closable ? h("div", { class: `${mergedClsPrefix}-card-header`, style: this.headerStyle }, h("div", { class: `${mergedClsPrefix}-card-header__main`, role: "heading" }, renderSlot($slots, "header", {}, () => [this.title])), $slots["header-extra"] ? h("div", { class: `${mergedClsPrefix}-card-header__extra` }, renderSlot($slots, "header-extra")) : null, this.closable ? h(NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-card-header__close`, onClick: this.handleCloseClick }) : null) : null, h("div", { class: `${mergedClsPrefix}-card__content`, style: this.contentStyle, role: "none" }, $slots), $slots.footer ? h("div", { class: `${mergedClsPrefix}-card__footer`, style: this.footerStyle, role: "none" }, renderSlot($slots, "footer")) : null, $slots.action ? h("div", { class: `${mergedClsPrefix}-card__action`, role: "none" }, renderSlot($slots, "action")) : null);
    }
  });
  var commonVars = {
    titleFontSize: "18px",
    padding: "16px 28px 20px 28px",
    iconSize: "28px",
    actionSpace: "12px",
    contentMargin: "8px 0 16px 0",
    iconMargin: "0 4px 0 0",
    iconMarginIconTop: "4px 0 8px 0",
    closeSize: "18px",
    closeMargin: "22px 28px 0 0",
    closeMarginIconTop: "12px 18px 0 0"
  };
  const self$2 = (vars) => {
    const { textColor1, textColor2, modalColor, closeColor, closeColorHover, closeColorPressed, infoColor, successColor, warningColor, errorColor, primaryColor, dividerColor, borderRadius, fontWeightStrong, lineHeight, fontSize } = vars;
    return Object.assign(Object.assign({}, commonVars), {
      fontSize,
      lineHeight,
      border: `1px solid ${dividerColor}`,
      titleTextColor: textColor1,
      textColor: textColor2,
      color: modalColor,
      closeColor,
      closeColorHover,
      closeColorPressed,
      iconColor: primaryColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      titleFontWeight: fontWeightStrong
    });
  };
  const dialogLight = createTheme({
    name: "Dialog",
    common: commonLight,
    peers: {
      Button: buttonLight$1
    },
    self: self$2
  });
  var dialogLight$1 = dialogLight;
  var style$1 = c([cB("dialog", `
 line-height: var(--line-height);
 position: relative;
 background: var(--color);
 color: var(--text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--border-radius);
 padding: var(--padding);
 transition: 
 border-color .3s var(--bezier),
 background-color .3s var(--bezier),
 color .3s var(--bezier);
 `, [cE("icon", {
    color: "var(--icon-color)"
  }), cM("bordered", {
    border: "var(--border)"
  }), cM("icon-top", [cE("close", {
    margin: "var(--close-margin)"
  }), cE("icon", {
    margin: "var(--icon-margin)"
  }), cE("content", {
    textAlign: "center"
  }), cE("title", {
    justifyContent: "center"
  }), cE("action", {
    justifyContent: "center"
  })]), cM("icon-left", [cE("icon", {
    margin: "var(--icon-margin)"
  })]), cE("close", `
 font-size: var(--close-size);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--close-margin);
 transition: .3s color var(--bezier);
 z-index: 1;
 `), cE("content", `
 font-size: var(--font-size);
 margin: var(--content-margin);
 position: relative;
 `, [c("&:last-child", "margin-bottom: 0;")]), cE("action", `
 display: flex;
 justify-content: flex-end;
 `, [c("> *:not(:last-child)", {
    marginRight: "var(--action-space)"
  })]), cE("icon", {
    fontSize: "var(--icon-size)",
    transition: "color .3s var(--bezier)"
  }), cE("title", `
 transition: color .3s var(--bezier);
 display: flex;
 align-items: center;
 font-size: var(--title-font-size);
 font-weight: var(--title-font-weight);
 color: var(--title-text-color);
 `), cB("dialog-icon-container", {
    display: "flex",
    justifyContent: "center"
  })]), insideModal(cB("dialog", `
 width: 446px;
 max-width: calc(100vw - 32px);
 `)), cB("dialog", [asModal(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]);
  const infoIcon = h(InfoIcon, null);
  const iconMap = {
    default: infoIcon,
    info: infoIcon,
    success: h(SuccessIcon, null),
    warning: h(WarningIcon, null),
    error: h(ErrorIcon, null)
  };
  const dialogProps = {
    icon: Function,
    type: {
      type: String,
      default: "default"
    },
    title: [String, Function],
    closable: {
      type: Boolean,
      default: true
    },
    negativeText: String,
    positiveText: String,
    content: [String, Function],
    action: Function,
    showIcon: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    bordered: Boolean,
    iconPlacement: String,
    onPositiveClick: Function,
    onNegativeClick: Function,
    onClose: Function
  };
  const dialogPropKeys = keysOf(dialogProps);
  var NDialog = defineComponent({
    name: "Dialog",
    alias: [
      "NimbusConfirmCard",
      "Confirm"
    ],
    props: Object.assign(Object.assign({}, useTheme.props), dialogProps),
    setup(props) {
      const { NConfigProvider, mergedClsPrefixRef } = useConfig(props);
      const mergedIconPlacementRef = computed(() => {
        var _a, _b, _c;
        const { iconPlacement } = props;
        return (_c = iconPlacement !== null && iconPlacement !== void 0 ? iconPlacement : (_b = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Dialog) === null || _b === void 0 ? void 0 : _b.iconPlacement) !== null && _c !== void 0 ? _c : "left";
      });
      function handlePositiveClick(e) {
        const { onPositiveClick } = props;
        if (onPositiveClick)
          onPositiveClick(e);
      }
      function handleNegativeClick(e) {
        const { onNegativeClick } = props;
        if (onNegativeClick)
          onNegativeClick(e);
      }
      function handleCloseClick() {
        const { onClose } = props;
        if (onClose)
          onClose();
      }
      const themeRef = useTheme("Dialog", "Dialog", style$1, dialogLight$1, props, mergedClsPrefixRef);
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        mergedIconPlacement: mergedIconPlacementRef,
        mergedTheme: themeRef,
        handlePositiveClick,
        handleNegativeClick,
        handleCloseClick,
        cssVars: computed(() => {
          const { type, iconPlacement } = props;
          const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { fontSize, lineHeight, border, titleTextColor, textColor, color, closeColor, closeColorHover, closeColorPressed, borderRadius, titleFontWeight, titleFontSize, padding, iconSize, actionSpace, contentMargin, closeSize, [iconPlacement === "top" ? "iconMarginIconTop" : "iconMargin"]: iconMargin, [iconPlacement === "top" ? "closeMarginIconTop" : "closeMargin"]: closeMargin, [createKey("iconColor", type)]: iconColor } } = themeRef.value;
          return {
            "--font-size": fontSize,
            "--icon-color": iconColor,
            "--bezier": cubicBezierEaseInOut2,
            "--close-margin": closeMargin,
            "--icon-margin": iconMargin,
            "--icon-size": iconSize,
            "--close-size": closeSize,
            "--close-color": closeColor,
            "--close-color-hover": closeColorHover,
            "--close-color-pressed": closeColorPressed,
            "--color": color,
            "--text-color": textColor,
            "--border-radius": borderRadius,
            "--padding": padding,
            "--line-height": lineHeight,
            "--border": border,
            "--content-margin": contentMargin,
            "--title-font-size": titleFontSize,
            "--title-font-weight": titleFontWeight,
            "--title-text-color": titleTextColor,
            "--action-space": actionSpace
          };
        })
      };
    },
    render() {
      const { $slots, bordered, mergedIconPlacement, cssVars, closable, showIcon, title, content, action, negativeText, positiveText, handlePositiveClick, handleNegativeClick, mergedTheme, loading, type, mergedClsPrefix } = this;
      return h("div", { class: [
        `${mergedClsPrefix}-dialog`,
        `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`,
        bordered && `${mergedClsPrefix}-dialog--bordered`
      ], style: cssVars }, closable ? h(NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-dialog__close`, onClick: this.handleCloseClick }) : null, showIcon && mergedIconPlacement === "top" ? h("div", { class: `${mergedClsPrefix}-dialog-icon-container` }, h(NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-dialog__icon` }, {
        default: () => renderSlot($slots, "icon", void 0, () => [
          this.icon ? render(this.icon) : iconMap[this.type]
        ])
      })) : null, h("div", { class: `${mergedClsPrefix}-dialog__title` }, showIcon && mergedIconPlacement === "left" ? h(NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-dialog__icon` }, {
        default: () => renderSlot($slots, "icon", void 0, () => [
          this.icon ? render(this.icon) : iconMap[this.type]
        ])
      }) : null, renderSlot($slots, "header", void 0, () => [render(title)])), h("div", { class: `${mergedClsPrefix}-dialog__content` }, renderSlot($slots, "default", void 0, () => [render(content)])), $slots.action || positiveText || negativeText || action ? h("div", { class: `${mergedClsPrefix}-dialog__action` }, renderSlot($slots, "action", void 0, action ? () => [render(action)] : () => [
        this.negativeText && h(NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, ghost: true, size: "small", onClick: handleNegativeClick }, {
          default: () => render(this.negativeText)
        }),
        this.positiveText && h(NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, disabled: loading, loading, size: "small", type: type === "default" ? "primary" : type, onClick: handlePositiveClick }, {
          default: () => render(this.positiveText)
        })
      ])) : null);
    }
  });
  const self$1 = (vars) => {
    const { modalColor, textColor2, boxShadow3 } = vars;
    return {
      color: modalColor,
      textColor: textColor2,
      boxShadow: boxShadow3
    };
  };
  const modalLight = createTheme({
    name: "Modal",
    common: commonLight,
    peers: {
      Scrollbar: scrollbarLight$1,
      Dialog: dialogLight$1,
      Card: cardLight$1
    },
    self: self$1
  });
  var modalLight$1 = modalLight;
  const presetProps = Object.assign(Object.assign({}, cardBaseProps), dialogProps);
  const presetPropsKeys = keysOf(presetProps);
  var NModalBodyWrapper = defineComponent({
    name: "ModalBody",
    inheritAttrs: false,
    props: Object.assign(Object.assign({ show: {
      type: Boolean,
      required: true
    }, preset: String, displayDirective: {
      type: String,
      required: true
    } }, presetProps), {
      onClickoutside: {
        type: Function,
        required: true
      },
      onBeforeLeave: {
        type: Function,
        required: true
      },
      onAfterLeave: {
        type: Function,
        required: true
      },
      onPositiveClick: {
        type: Function,
        required: true
      },
      onNegativeClick: {
        type: Function,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      },
      onAfterEnter: Function
    }),
    setup(props) {
      const bodyRef = ref(null);
      const scrollbarRef = ref(null);
      const displayedRef = ref(props.show);
      const transformOriginXRef = ref(null);
      const transformOriginYRef = ref(null);
      watch(toRef(props, "show"), (value) => {
        if (value)
          displayedRef.value = true;
      });
      const NModal2 = inject(modalInjectionKey);
      function styleTransformOrigin() {
        if (NModal2.transformOriginRef.value === "center") {
          return "";
        }
        const { value: transformOriginX } = transformOriginXRef;
        const { value: transformOriginY } = transformOriginYRef;
        if (transformOriginX === null || transformOriginY === null) {
          return "";
        } else if (scrollbarRef.value) {
          const scrollTop = scrollbarRef.value.containerScrollTop;
          return `${transformOriginX}px ${transformOriginY + scrollTop}px`;
        }
        return "";
      }
      function syncTransformOrigin(el) {
        if (NModal2.transformOriginRef.value === "center") {
          return;
        }
        const mousePosition = NModal2.getMousePosition();
        if (!mousePosition) {
          return;
        }
        if (!scrollbarRef.value)
          return;
        const scrollTop = scrollbarRef.value.containerScrollTop;
        const { offsetLeft, offsetTop } = el;
        if (mousePosition) {
          const top = mousePosition.y;
          const left = mousePosition.x;
          transformOriginXRef.value = -(offsetLeft - left);
          transformOriginYRef.value = -(offsetTop - top - scrollTop);
        }
        el.style.transformOrigin = styleTransformOrigin();
      }
      function handleEnter(el) {
        void nextTick(() => {
          syncTransformOrigin(el);
        });
      }
      function handleBeforeLeave(el) {
        el.style.transformOrigin = styleTransformOrigin();
        props.onBeforeLeave();
      }
      function handleAfterLeave() {
        displayedRef.value = false;
        transformOriginXRef.value = null;
        transformOriginYRef.value = null;
        props.onAfterLeave();
      }
      function handleCloseClick() {
        const { onClose } = props;
        if (onClose) {
          onClose();
        }
      }
      function handleNegativeClick() {
        props.onNegativeClick();
      }
      function handlePositiveClick() {
        props.onPositiveClick();
      }
      function handleClickOutside(e) {
        props.onClickoutside(e);
      }
      provide(modalBodyInjectionKey, bodyRef);
      provide(drawerBodyInjectionKey, null);
      provide(popoverBodyInjectionKey, null);
      return {
        mergedTheme: NModal2.mergedThemeRef,
        appear: NModal2.appearRef,
        isMounted: NModal2.isMountedRef,
        mergedClsPrefix: NModal2.mergedClsPrefixRef,
        bodyRef,
        scrollbarRef,
        displayed: displayedRef,
        handleClickOutside,
        handlePositiveClick,
        handleNegativeClick,
        handleCloseClick,
        handleAfterLeave,
        handleBeforeLeave,
        handleEnter
      };
    },
    render() {
      const { $slots, $attrs, handleEnter, handleAfterLeave, handleBeforeLeave, handleClickOutside, preset, mergedClsPrefix } = this;
      let childNode = null;
      if (!preset) {
        childNode = getFirstSlotVNode($slots);
        if (!childNode) {
          warn$2("modal", "default slot is empty");
          return;
        }
        childNode = cloneVNode(childNode);
        childNode.props = mergeProps({
          class: `${mergedClsPrefix}-modal`
        }, $attrs, childNode.props || {});
      }
      return this.displayDirective === "show" || this.displayed || this.show ? withDirectives(h("div", { class: `${mergedClsPrefix}-modal-body-wrapper` }, h(NScrollbar, { ref: "scrollbarRef", theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar, contentClass: `${mergedClsPrefix}-modal-scroll-content` }, {
        default: () => {
          var _a;
          return h(Transition, { name: "fade-in-scale-up-transition", appear: (_a = this.appear) !== null && _a !== void 0 ? _a : this.isMounted, onEnter: handleEnter, onAfterEnter: this.onAfterEnter, onAfterLeave: handleAfterLeave, onBeforeLeave: handleBeforeLeave }, {
            default: () => withDirectives(this.preset === "confirm" || this.preset === "dialog" ? h(NDialog, Object.assign({}, this.$attrs, { class: [
              `${mergedClsPrefix}-modal`,
              this.$attrs.class
            ], ref: "bodyRef", theme: this.mergedTheme.peers.Dialog, themeOverrides: this.mergedTheme.peerOverrides.Dialog }, keep(this.$props, dialogPropKeys)), $slots) : this.preset === "card" ? h(NCard, Object.assign({}, this.$attrs, { ref: "bodyRef", class: [
              `${mergedClsPrefix}-modal`,
              this.$attrs.class
            ], theme: this.mergedTheme.peers.Card, themeOverrides: this.mergedTheme.peerOverrides.Card }, keep(this.$props, cardBasePropKeys)), $slots) : childNode, [
              [vShow, this.show],
              [clickoutside$1, handleClickOutside]
            ])
          });
        }
      })), [
        [
          vShow,
          this.displayDirective === "if" || this.displayed || this.show
        ]
      ]) : null;
    }
  });
  var style = c([cB("modal-container", `
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `), cB("modal-mask", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `, [fadeInTransition({
    enterDuration: ".25s",
    leaveDuration: ".25s",
    enterCubicBezier: "var(--bezier-ease-out)",
    leaveCubicBezier: "var(--bezier-ease-out)"
  })]), cB("modal-body-wrapper", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `, [cB("modal-scroll-content", `
 min-height: 100%;
 display: flex;
 position: relative;
 `)]), cB("modal", `
 align-self: center;
 color: var(--text-color);
 margin: auto;
 box-shadow: var(--box-shadow);
 `, [fadeInScaleUpTransition({
    duration: ".25s",
    enterScale: ".5"
  })])]);
  const modalProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), { show: Boolean, unstableShowMask: {
    type: Boolean,
    default: true
  }, maskClosable: {
    type: Boolean,
    default: true
  }, preset: String, to: [String, Object], displayDirective: {
    type: String,
    default: "if"
  }, transformOrigin: {
    type: String,
    default: "mouse"
  } }), presetProps), {
    "onUpdate:show": [Function, Array],
    onUpdateShow: [Function, Array],
    onAfterEnter: Function,
    onBeforeLeave: Function,
    onAfterLeave: Function,
    onClose: Function,
    onPositiveClick: Function,
    onNegativeClick: Function,
    onMaskClick: Function,
    dialog: Boolean,
    appear: {
      type: Boolean,
      default: void 0
    },
    overlayStyle: [String, Object],
    onBeforeHide: Function,
    onAfterHide: Function,
    onHide: Function
  });
  var NModal = defineComponent({
    name: "Modal",
    inheritAttrs: false,
    props: modalProps,
    setup(props) {
      const containerRef = ref(null);
      const { mergedClsPrefixRef, namespaceRef } = useConfig(props);
      const themeRef = useTheme("Modal", "Modal", style, modalLight$1, props, mergedClsPrefixRef);
      const clickedRef = useClicked(64);
      const clickedPositionRef = useClickPosition();
      const isMountedRef = isMounted();
      const NDialogProvider = props.dialog ? inject(dialogProviderInjectionKey, null) : null;
      function doUpdateShow(show) {
        const { onUpdateShow, "onUpdate:show": _onUpdateShow, onHide } = props;
        if (onUpdateShow)
          call(onUpdateShow, show);
        if (_onUpdateShow)
          call(_onUpdateShow, show);
        if (onHide && !show)
          onHide(show);
      }
      function handleCloseClick() {
        const { onClose } = props;
        if (onClose) {
          void Promise.resolve(onClose()).then((value) => {
            if (value === false)
              return;
            doUpdateShow(false);
          });
        } else {
          doUpdateShow(false);
        }
      }
      function handlePositiveClick() {
        const { onPositiveClick } = props;
        if (onPositiveClick) {
          void Promise.resolve(onPositiveClick()).then((value) => {
            if (value === false)
              return;
            doUpdateShow(false);
          });
        } else {
          doUpdateShow(false);
        }
      }
      function handleNegativeClick() {
        const { onNegativeClick } = props;
        if (onNegativeClick) {
          void Promise.resolve(onNegativeClick()).then((value) => {
            if (value === false)
              return;
            doUpdateShow(false);
          });
        } else {
          doUpdateShow(false);
        }
      }
      function handleBeforeLeave() {
        const { onBeforeLeave, onBeforeHide } = props;
        if (onBeforeLeave)
          call(onBeforeLeave);
        if (onBeforeHide)
          onBeforeHide();
      }
      function handleAfterLeave() {
        const { onAfterLeave, onAfterHide } = props;
        if (onAfterLeave)
          call(onAfterLeave);
        if (onAfterHide)
          onAfterHide();
      }
      function handleClickoutside(e) {
        var _a;
        const { onMaskClick } = props;
        if (onMaskClick) {
          onMaskClick(e);
        }
        if (props.maskClosable) {
          if ((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
            doUpdateShow(false);
          }
        }
      }
      provide(modalInjectionKey, {
        getMousePosition: () => {
          if (NDialogProvider) {
            const { clickedRef: clickedRef2, clickPositionRef } = NDialogProvider;
            if (clickedRef2.value && clickPositionRef.value) {
              return clickPositionRef.value;
            }
          }
          if (clickedRef.value) {
            return clickedPositionRef.value;
          }
          return null;
        },
        mergedClsPrefixRef,
        mergedThemeRef: themeRef,
        isMountedRef,
        appearRef: toRef(props, "appear"),
        transformOriginRef: toRef(props, "transformOrigin")
      });
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        namespace: namespaceRef,
        isMounted: isMountedRef,
        containerRef,
        presetProps: computed(() => {
          const pickedProps = keep(props, presetPropsKeys);
          return pickedProps;
        }),
        handleAfterLeave,
        handleClickoutside,
        handleBeforeLeave,
        doUpdateShow,
        handleNegativeClick,
        handlePositiveClick,
        handleCloseClick,
        cssVars: computed(() => {
          const { common: { cubicBezierEaseOut: cubicBezierEaseOut2 }, self: { boxShadow, color, textColor } } = themeRef.value;
          return {
            "--bezier-ease-out": cubicBezierEaseOut2,
            "--box-shadow": boxShadow,
            "--color": color,
            "--text-color": textColor
          };
        })
      };
    },
    render() {
      const { mergedClsPrefix } = this;
      return h(LazyTeleport, { to: this.to, show: this.show }, {
        default: () => {
          var _a;
          return [
            withDirectives(h("div", { ref: "containerRef", class: [`${mergedClsPrefix}-modal-container`, this.namespace], style: this.cssVars }, this.unstableShowMask ? h(Transition, { name: "fade-in-transition", key: "mask", appear: (_a = this.appear) !== null && _a !== void 0 ? _a : this.isMounted }, {
              default: () => {
                return this.show ? h("div", { ref: "containerRef", class: `${mergedClsPrefix}-modal-mask` }) : null;
              }
            }) : null, h(NModalBodyWrapper, Object.assign({ style: this.overlayStyle }, this.$attrs, { ref: "bodyWrapper", displayDirective: this.displayDirective, show: this.show, preset: this.preset }, this.presetProps, { onClose: this.handleCloseClick, onNegativeClick: this.handleNegativeClick, onPositiveClick: this.handlePositiveClick, onBeforeLeave: this.handleBeforeLeave, onAfterEnter: this.onAfterEnter, onAfterLeave: this.handleAfterLeave, onClickoutside: this.handleClickoutside }), this.$slots)), [
              [
                zindexable$1,
                {
                  enabled: this.show
                }
              ]
            ])
          ];
        }
      });
    }
  });
  const exposedDialogEnvProps = Object.assign(Object.assign({}, dialogProps), { internalStyle: [String, Object], maskClosable: {
    type: Boolean,
    default: true
  }, onPositiveClick: Function, onNegativeClick: Function, onClose: Function, onMaskClick: Function });
  var DialogEnvironment = defineComponent({
    name: "DialogEnvironment",
    props: Object.assign(Object.assign({}, exposedDialogEnvProps), {
      internalKey: {
        type: String,
        required: true
      },
      to: [String, Object],
      onInternalAfterLeave: {
        type: Function,
        required: true
      }
    }),
    setup(props) {
      const showRef = ref(true);
      function handleAfterLeave() {
        props.onInternalAfterLeave(props.internalKey);
      }
      function handlePositiveClick(e) {
        const { onPositiveClick } = props;
        if (onPositiveClick) {
          void Promise.resolve(onPositiveClick(e)).then((result) => {
            if (result === false)
              return;
            hide();
          });
        } else {
          hide();
        }
      }
      function handleNegativeClick(e) {
        const { onNegativeClick } = props;
        if (onNegativeClick) {
          void Promise.resolve(onNegativeClick(e)).then((result) => {
            if (result === false)
              return;
            hide();
          });
        } else {
          hide();
        }
      }
      function handleCloseClick() {
        const { onClose } = props;
        if (onClose) {
          void Promise.resolve(onClose()).then((result) => {
            if (result === false)
              return;
            hide();
          });
        } else {
          hide();
        }
      }
      function handleMaskClick(e) {
        const { onMaskClick, maskClosable } = props;
        if (onMaskClick) {
          onMaskClick(e);
          maskClosable && hide();
        }
      }
      function hide() {
        showRef.value = false;
      }
      function handleUpdateShow(value) {
        showRef.value = value;
      }
      return {
        show: showRef,
        hide,
        handleUpdateShow,
        handleAfterLeave,
        handleCloseClick,
        handleNegativeClick,
        handlePositiveClick,
        handleMaskClick
      };
    },
    render() {
      const { handlePositiveClick, handleUpdateShow, handleNegativeClick, handleCloseClick, handleAfterLeave, handleMaskClick, to, maskClosable, show } = this;
      return h(NModal, { show, onUpdateShow: handleUpdateShow, onMaskClick: handleMaskClick, appear: true, dialog: true, to, maskClosable, onAfterLeave: handleAfterLeave }, {
        default: () => h(NDialog, Object.assign({}, keep(this.$props, dialogPropKeys), { style: this.internalStyle, onClose: handleCloseClick, onNegativeClick: handleNegativeClick, onPositiveClick: handlePositiveClick }))
      });
    }
  });
  const dialogApiInjectionKey = Symbol("dialogApi");
  const dialogProviderInjectionKey = Symbol("dialogProvider");
  const dialogProviderProps = {
    injectionKey: String,
    to: [String, Object]
  };
  defineComponent({
    name: "DialogProvider",
    props: dialogProviderProps,
    setup() {
      const dialogListRef = ref([]);
      const dialogInstRefs = {};
      function create(options = {}) {
        const key = createId();
        const dialogReactive = reactive(Object.assign(Object.assign({}, options), { key, destroy: () => {
          dialogInstRefs[`n-dialog-${key}`].hide();
        } }));
        dialogListRef.value.push(dialogReactive);
        return dialogReactive;
      }
      const typedApi = ["info", "success", "warning", "error"].map((type) => (options) => {
        return create(Object.assign(Object.assign({}, options), { type }));
      });
      function handleAfterLeave(key) {
        const { value: dialogList } = dialogListRef;
        dialogList.splice(dialogList.findIndex((dialog) => dialog.key === key), 1);
      }
      function destroyAll() {
        Object.values(dialogInstRefs).forEach((dialogInstRef) => dialogInstRef.hide());
      }
      const api = {
        create,
        destroyAll,
        info: typedApi[0],
        success: typedApi[1],
        warning: typedApi[2],
        error: typedApi[3]
      };
      provide(dialogApiInjectionKey, api);
      provide(dialogProviderInjectionKey, {
        clickedRef: useClicked(64),
        clickPositionRef: useClickPosition()
      });
      return Object.assign(Object.assign({}, api), {
        dialogList: dialogListRef,
        dialogInstRefs,
        handleAfterLeave
      });
    },
    render() {
      var _a, _b;
      return h(Fragment, null, [
        this.dialogList.map((dialog) => h(DialogEnvironment, omit(dialog, ["destroy", "style"], {
          internalStyle: dialog.style,
          to: this.to,
          ref: (inst) => {
            if (inst === null) {
              delete this.dialogInstRefs[`n-dialog-${dialog.key}`];
            } else {
              this.dialogInstRefs[`n-dialog-${dialog.key}`] = inst;
            }
          },
          internalKey: dialog.key,
          onInternalAfterLeave: this.handleAfterLeave
        }))),
        (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
      ]);
    }
  });
  var Header_vue_vue_type_style_index_0_scoped_true_lang = "";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {
    props: {
      title: {
        type: String,
        default: "Default header"
      }
    },
    components: {
      NButton
    },
    emits: ["close"]
  };
  const _hoisted_1$5 = /* @__PURE__ */ createTextVNode("X");
  const _hoisted_2$3 = { class: "title" };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_n_button = resolveComponent("n-button");
    return openBlock(), createElementBlock(Fragment, null, [
      createVNode(_component_n_button, {
        class: "close-button",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
      }, {
        default: withCtx(() => [
          _hoisted_1$5
        ]),
        _: 1
      }),
      createBaseVNode("h1", _hoisted_2$3, toDisplayString($props.title), 1)
    ], 64);
  }
  var Header = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-706b708a"]]);
  const _sfc_main$8 = {
    emits: ["close"]
  };
  const _hoisted_1$4 = { align: "right" };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("h5", _hoisted_1$4, "DocDog - Powered by Kuroco");
  }
  var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7]]);
  const _sfc_main$7 = {
    props: {
      err: {
        type: String,
        default: ""
      }
    },
    emits: ["close", "err", "redirect"],
    unmount() {
      this.$emit("err", "");
    }
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var a = Object.defineProperty({}, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var axios$2 = { exports: {} };
  var bind$4 = function bind2(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i2 = 0; i2 < args.length; i2++) {
        args[i2] = arguments[i2];
      }
      return fn.apply(thisArg, args);
    };
  };
  var bind$3 = bind$4;
  var toString = Object.prototype.toString;
  function isArray$4(val) {
    return toString.call(val) === "[object Array]";
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer$1(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
  }
  function isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  }
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
  }
  function isString$1(val) {
    return typeof val === "string";
  }
  function isNumber$1(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  function isDate$1(val) {
    return toString.call(val) === "[object Date]";
  }
  function isFile(val) {
    return toString.call(val) === "[object File]";
  }
  function isBlob(val) {
    return toString.call(val) === "[object Blob]";
  }
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
  }
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray$4(obj)) {
      for (var i2 = 0, l = obj.length; i2 < l; i2++) {
        fn.call(null, obj[i2], i2, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge$1() {
    var result = {};
    function assignValue2(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge$1(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge$1({}, val);
      } else if (isArray$4(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
      forEach(arguments[i2], assignValue2);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue2(val, key) {
      if (thisArg && typeof val === "function") {
        a[key] = bind$3(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  var utils$g = {
    isArray: isArray$4,
    isArrayBuffer,
    isBuffer: isBuffer$1,
    isFormData,
    isArrayBufferView,
    isString: isString$1,
    isNumber: isNumber$1,
    isObject,
    isPlainObject,
    isUndefined,
    isDate: isDate$1,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge: merge$1,
    extend,
    trim,
    stripBOM
  };
  var utils$f = utils$g;
  function encode$1(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  var buildURL$2 = function buildURL2(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$f.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils$f.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils$f.isArray(val)) {
          key = key + "[]";
        } else {
          val = [val];
        }
        utils$f.forEach(val, function parseValue(v) {
          if (utils$f.isDate(v)) {
            v = v.toISOString();
          } else if (utils$f.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode$1(key) + "=" + encode$1(v));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  };
  var utils$e = utils$g;
  function InterceptorManager$1() {
    this.handlers = [];
  }
  InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  };
  InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  InterceptorManager$1.prototype.forEach = function forEach2(fn) {
    utils$e.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  };
  var InterceptorManager_1 = InterceptorManager$1;
  var utils$d = utils$g;
  var normalizeHeaderName$1 = function normalizeHeaderName2(headers, normalizedName) {
    utils$d.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  var enhanceError$2 = function enhanceError2(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    };
    return error;
  };
  var enhanceError$1 = enhanceError$2;
  var createError$2 = function createError2(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError$1(error, config, code, request, response);
  };
  var createError$1 = createError$2;
  var settle$1 = function settle2(resolve2, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve2(response);
    } else {
      reject(createError$1("Request failed with status code " + response.status, response.config, null, response.request, response));
    }
  };
  var utils$c = utils$g;
  var cookies$1 = utils$c.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils$c.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils$c.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils$c.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        var match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match2 ? decodeURIComponent(match2[3]) : null;
      },
      remove: function remove2(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove2() {
      }
    };
  }();
  var isAbsoluteURL$1 = function isAbsoluteURL2(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
  var combineURLs$1 = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  var isAbsoluteURL = isAbsoluteURL$1;
  var combineURLs = combineURLs$1;
  var buildFullPath$1 = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };
  var utils$b = utils$g;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  var parseHeaders$1 = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i2;
    if (!headers) {
      return parsed;
    }
    utils$b.forEach(headers.split("\n"), function parser(line) {
      i2 = line.indexOf(":");
      key = utils$b.trim(line.substr(0, i2)).toLowerCase();
      val = utils$b.trim(line.substr(i2 + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  var utils$a = utils$g;
  var isURLSameOrigin$1 = utils$a.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      var parsed = utils$a.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }();
  function Cancel$3(message) {
    this.message = message;
  }
  Cancel$3.prototype.toString = function toString2() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel$3.prototype.__CANCEL__ = true;
  var Cancel_1 = Cancel$3;
  var utils$9 = utils$g;
  var settle = settle$1;
  var cookies = cookies$1;
  var buildURL$1 = buildURL$2;
  var buildFullPath = buildFullPath$1;
  var parseHeaders = parseHeaders$1;
  var isURLSameOrigin = isURLSameOrigin$1;
  var createError = createError$2;
  var defaults$6 = defaults_1;
  var Cancel$2 = Cancel_1;
  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve2, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils$9.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve2(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(createError("Request aborted", config, "ECONNABORTED", request));
        request = null;
      };
      request.onerror = function handleError2() {
        reject(createError("Network Error", config, null, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        var transitional = config.transitional || defaults$6.transitional;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
        request = null;
      };
      if (utils$9.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request) {
        utils$9.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (!utils$9.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken || config.signal) {
        onCanceled = function(cancel) {
          if (!request) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new Cancel$2("canceled") : cancel);
          request.abort();
          request = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      request.send(requestData);
    });
  };
  var utils$8 = utils$g;
  var normalizeHeaderName = normalizeHeaderName$1;
  var enhanceError = enhanceError$2;
  var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  function setContentTypeIfUnset(headers, value) {
    if (!utils$8.isUndefined(headers) && utils$8.isUndefined(headers["Content-Type"])) {
      headers["Content-Type"] = value;
    }
  }
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
      adapter = xhr;
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
      adapter = xhr;
    }
    return adapter;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$8.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$8.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults$5 = {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: getDefaultAdapter(),
    transformRequest: [function transformRequest(data2, headers) {
      normalizeHeaderName(headers, "Accept");
      normalizeHeaderName(headers, "Content-Type");
      if (utils$8.isFormData(data2) || utils$8.isArrayBuffer(data2) || utils$8.isBuffer(data2) || utils$8.isStream(data2) || utils$8.isFile(data2) || utils$8.isBlob(data2)) {
        return data2;
      }
      if (utils$8.isArrayBufferView(data2)) {
        return data2.buffer;
      }
      if (utils$8.isURLSearchParams(data2)) {
        setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
        return data2.toString();
      }
      if (utils$8.isObject(data2) || headers && headers["Content-Type"] === "application/json") {
        setContentTypeIfUnset(headers, "application/json");
        return stringifySafely(data2);
      }
      return data2;
    }],
    transformResponse: [function transformResponse(data2) {
      var transitional = this.transitional || defaults$5.transitional;
      var silentJSONParsing = transitional && transitional.silentJSONParsing;
      var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
      if (strictJSONParsing || forcedJSONParsing && utils$8.isString(data2) && data2.length) {
        try {
          return JSON.parse(data2);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw enhanceError(e, this, "E_JSON_PARSE");
            }
            throw e;
          }
        }
      }
      return data2;
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils$8.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults$5.headers[method] = {};
  });
  utils$8.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults$5.headers[method] = utils$8.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_1 = defaults$5;
  var utils$7 = utils$g;
  var defaults$4 = defaults_1;
  var transformData$1 = function transformData2(data2, headers, fns) {
    var context = this || defaults$4;
    utils$7.forEach(fns, function transform(fn) {
      data2 = fn.call(context, data2, headers);
    });
    return data2;
  };
  var isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  var utils$6 = utils$g;
  var transformData = transformData$1;
  var isCancel = isCancel$1;
  var defaults$3 = defaults_1;
  var Cancel$1 = Cancel_1;
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new Cancel$1("canceled");
    }
  }
  var dispatchRequest$1 = function dispatchRequest2(config) {
    throwIfCancellationRequested(config);
    config.headers = config.headers || {};
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
    config.headers = utils$6.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils$6.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
      delete config.headers[method];
    });
    var adapter = config.adapter || defaults$3.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
        }
      }
      return Promise.reject(reason);
    });
  };
  var utils$5 = utils$g;
  var mergeConfig$2 = function mergeConfig2(config1, config2) {
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source) {
      if (utils$5.isPlainObject(target) && utils$5.isPlainObject(source)) {
        return utils$5.merge(target, source);
      } else if (utils$5.isPlainObject(source)) {
        return utils$5.merge({}, source);
      } else if (utils$5.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(prop) {
      if (!utils$5.isUndefined(config2[prop])) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (!utils$5.isUndefined(config1[prop])) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    function valueFromConfig2(prop) {
      if (!utils$5.isUndefined(config2[prop])) {
        return getMergedValue(void 0, config2[prop]);
      }
    }
    function defaultToConfig2(prop) {
      if (!utils$5.isUndefined(config2[prop])) {
        return getMergedValue(void 0, config2[prop]);
      } else if (!utils$5.isUndefined(config1[prop])) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    function mergeDirectKeys(prop) {
      if (prop in config2) {
        return getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        return getMergedValue(void 0, config1[prop]);
      }
    }
    var mergeMap = {
      "url": valueFromConfig2,
      "method": valueFromConfig2,
      "data": valueFromConfig2,
      "baseURL": defaultToConfig2,
      "transformRequest": defaultToConfig2,
      "transformResponse": defaultToConfig2,
      "paramsSerializer": defaultToConfig2,
      "timeout": defaultToConfig2,
      "timeoutMessage": defaultToConfig2,
      "withCredentials": defaultToConfig2,
      "adapter": defaultToConfig2,
      "responseType": defaultToConfig2,
      "xsrfCookieName": defaultToConfig2,
      "xsrfHeaderName": defaultToConfig2,
      "onUploadProgress": defaultToConfig2,
      "onDownloadProgress": defaultToConfig2,
      "decompress": defaultToConfig2,
      "maxContentLength": defaultToConfig2,
      "maxBodyLength": defaultToConfig2,
      "transport": defaultToConfig2,
      "httpAgent": defaultToConfig2,
      "httpsAgent": defaultToConfig2,
      "cancelToken": defaultToConfig2,
      "socketPath": defaultToConfig2,
      "responseEncoding": defaultToConfig2,
      "validateStatus": mergeDirectKeys
    };
    utils$5.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
      var merge2 = mergeMap[prop] || mergeDeepProperties;
      var configValue = merge2(prop);
      utils$5.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  };
  var data = {
    "version": "0.24.0"
  };
  var VERSION = data.version;
  var validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i2) {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
    };
  });
  var deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return function(value, opt, opts) {
      if (validator2 === false) {
        throw new Error(formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")));
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(formatMessage(opt, " has been deprecated since v" + version2 + " and will be removed in the near future"));
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new TypeError("options must be an object");
    }
    var keys = Object.keys(options);
    var i2 = keys.length;
    while (i2-- > 0) {
      var opt = keys[i2];
      var validator2 = schema[opt];
      if (validator2) {
        var value = options[opt];
        var result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new TypeError("option " + opt + " must be " + result);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw Error("Unknown option " + opt);
      }
    }
  }
  var validator$1 = {
    assertOptions,
    validators: validators$1
  };
  var utils$4 = utils$g;
  var buildURL = buildURL$2;
  var InterceptorManager = InterceptorManager_1;
  var dispatchRequest = dispatchRequest$1;
  var mergeConfig$1 = mergeConfig$2;
  var validator = validator$1;
  var validators = validator.validators;
  function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  Axios$1.prototype.request = function request(config) {
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
    config = mergeConfig$1(this.defaults, config);
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }
    var transitional = config.transitional;
    if (transitional !== void 0) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest, void 0];
      Array.prototype.unshift.apply(chain, requestInterceptorChain);
      chain = chain.concat(responseInterceptorChain);
      promise = Promise.resolve(config);
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }
    var newConfig = config;
    while (requestInterceptorChain.length) {
      var onFulfilled = requestInterceptorChain.shift();
      var onRejected = requestInterceptorChain.shift();
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected(error);
        break;
      }
    }
    try {
      promise = dispatchRequest(newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    while (responseInterceptorChain.length) {
      promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
  };
  Axios$1.prototype.getUri = function getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
  };
  utils$4.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$4.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    Axios$1.prototype[method] = function(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: data2
      }));
    };
  });
  var Axios_1 = Axios$1;
  var Cancel = Cancel_1;
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve2) {
      resolvePromise = resolve2;
    });
    var token = this;
    this.promise.then(function(cancel) {
      if (!token._listeners)
        return;
      var i2;
      var l = token._listeners.length;
      for (i2 = 0; i2 < l; i2++) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve2) {
        token.subscribe(resolve2);
        _resolve = resolve2;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  };
  var CancelToken_1 = CancelToken;
  var spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  var isAxiosError = function isAxiosError2(payload) {
    return typeof payload === "object" && payload.isAxiosError === true;
  };
  var utils$3 = utils$g;
  var bind$2 = bind$4;
  var Axios = Axios_1;
  var mergeConfig = mergeConfig$2;
  var defaults$2 = defaults_1;
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind$2(Axios.prototype.request, context);
    utils$3.extend(instance, Axios.prototype, context);
    utils$3.extend(instance, context);
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios$1 = createInstance(defaults$2);
  axios$1.Axios = Axios;
  axios$1.Cancel = Cancel_1;
  axios$1.CancelToken = CancelToken_1;
  axios$1.isCancel = isCancel$1;
  axios$1.VERSION = data.version;
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = spread;
  axios$1.isAxiosError = isAxiosError;
  axios$2.exports = axios$1;
  axios$2.exports.default = axios$1;
  var axios = axios$2.exports;
  var shams = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (sym in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = shams;
  var hasSymbols$1 = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var slice = Array.prototype.slice;
  var toStr$1 = Object.prototype.toString;
  var funcType = "[object Function]";
  var implementation$1 = function bind2(that) {
    var target = this;
    if (typeof target !== "function" || toStr$1.call(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(this, args.concat(slice.call(arguments)));
        if (Object(result) === result) {
          return result;
        }
        return this;
      } else {
        return target.apply(that, args.concat(slice.call(arguments)));
      }
    };
    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i2 = 0; i2 < boundLength; i2++) {
      boundArgs.push("$" + i2);
    }
    bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  var implementation = implementation$1;
  var functionBind = Function.prototype.bind || implementation;
  var bind$1 = functionBind;
  var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
  var undefined$1;
  var $SyntaxError = SyntaxError;
  var $Function = Function;
  var $TypeError$1 = TypeError;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = Object.getOwnPropertyDescriptor;
  if ($gOPD) {
    try {
      $gOPD({}, "");
    } catch (e) {
      $gOPD = null;
    }
  }
  var throwTypeError = function() {
    throw new $TypeError$1();
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols = hasSymbols$1();
  var getProto = Object.getPrototypeOf || function(x) {
    return x.__proto__;
  };
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto(Uint8Array);
  var INTRINSICS = {
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError$1,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
  };
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen) {
        value = getProto(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = functionBind;
  var hasOwn$1 = src;
  var $concat = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function(match2, number, quote2, subString) {
      result[result.length] = quote2 ? $replace(subString, reEscapeChar, "$1") : number || match2;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn$1(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError$1("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  var getIntrinsic = function GetIntrinsic2(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError$1("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError$1('"allowMissing" argument must be a boolean');
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
      var part = parts[i2];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError$1("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void 0;
        }
        if ($gOPD && i2 + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn$1(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  var callBind$1 = { exports: {} };
  (function(module2) {
    var bind2 = functionBind;
    var GetIntrinsic2 = getIntrinsic;
    var $apply = GetIntrinsic2("%Function.prototype.apply%");
    var $call = GetIntrinsic2("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic2("%Reflect.apply%", true) || bind2.call($call, $apply);
    var $gOPD2 = GetIntrinsic2("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic2("%Object.defineProperty%", true);
    var $max = GetIntrinsic2("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind2(originalFunction) {
      var func = $reflectApply(bind2, $call, arguments);
      if ($gOPD2 && $defineProperty) {
        var desc = $gOPD2(func, "length");
        if (desc.configurable) {
          $defineProperty(func, "length", { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) });
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind2, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  })(callBind$1);
  var GetIntrinsic$1 = getIntrinsic;
  var callBind = callBind$1.exports;
  var $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf"));
  var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic$1(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBind(intrinsic);
    }
    return intrinsic;
  };
  var __viteBrowserExternal = {};
  var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": __viteBrowserExternal
  });
  var require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var hasMap = typeof Map === "function" && Map.prototype;
  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
  var mapForEach = hasMap && Map.prototype.forEach;
  var hasSet = typeof Set === "function" && Set.prototype;
  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
  var setForEach = hasSet && Set.prototype.forEach;
  var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  var booleanValueOf = Boolean.prototype.valueOf;
  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var match = String.prototype.match;
  var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
  var gOPS = Object.getOwnPropertySymbols;
  var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
  var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
    return O.__proto__;
  } : null);
  var inspectCustom = require$$0.custom;
  var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
  var toStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag !== "undefined" ? Symbol.toStringTag : null;
  var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};
    if (has$3(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
    if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    }
    if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
      throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    if (typeof obj === "boolean") {
      return obj ? "true" : "false";
    }
    if (typeof obj === "string") {
      return inspectString(obj, opts);
    }
    if (typeof obj === "number") {
      if (obj === 0) {
        return Infinity / obj > 0 ? "0" : "-0";
      }
      return String(obj);
    }
    if (typeof obj === "bigint") {
      return String(obj) + "n";
    }
    var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
    if (typeof depth === "undefined") {
      depth = 0;
    }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
      return isArray$3(obj) ? "[Array]" : "[Object]";
    }
    var indent = getIndent(opts, depth);
    if (typeof seen === "undefined") {
      seen = [];
    } else if (indexOf(seen, obj) >= 0) {
      return "[Circular]";
    }
    function inspect2(value, from, noIndent) {
      if (from) {
        seen = seen.slice();
        seen.push(from);
      }
      if (noIndent) {
        var newOpts = {
          depth: opts.depth
        };
        if (has$3(opts, "quoteStyle")) {
          newOpts.quoteStyle = opts.quoteStyle;
        }
        return inspect_(value, newOpts, depth + 1, seen);
      }
      return inspect_(value, opts, depth + 1, seen);
    }
    if (typeof obj === "function") {
      var name = nameOf(obj);
      var keys = arrObjKeys(obj, inspect2);
      return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + keys.join(", ") + " }" : "");
    }
    if (isSymbol(obj)) {
      var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
      return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
      var s = "<" + String(obj.nodeName).toLowerCase();
      var attrs = obj.attributes || [];
      for (var i2 = 0; i2 < attrs.length; i2++) {
        s += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
      }
      s += ">";
      if (obj.childNodes && obj.childNodes.length) {
        s += "...";
      }
      s += "</" + String(obj.nodeName).toLowerCase() + ">";
      return s;
    }
    if (isArray$3(obj)) {
      if (obj.length === 0) {
        return "[]";
      }
      var xs = arrObjKeys(obj, inspect2);
      if (indent && !singleLineValues(xs)) {
        return "[" + indentedJoin(xs, indent) + "]";
      }
      return "[ " + xs.join(", ") + " ]";
    }
    if (isError(obj)) {
      var parts = arrObjKeys(obj, inspect2);
      if (parts.length === 0) {
        return "[" + String(obj) + "]";
      }
      return "{ [" + String(obj) + "] " + parts.join(", ") + " }";
    }
    if (typeof obj === "object" && customInspect) {
      if (inspectSymbol && typeof obj[inspectSymbol] === "function") {
        return obj[inspectSymbol]();
      } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
        return obj.inspect();
      }
    }
    if (isMap(obj)) {
      var mapParts = [];
      mapForEach.call(obj, function(value, key) {
        mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
      });
      return collectionOf("Map", mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
      var setParts = [];
      setForEach.call(obj, function(value) {
        setParts.push(inspect2(value, obj));
      });
      return collectionOf("Set", setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
      return weakCollectionOf("WeakMap");
    }
    if (isWeakSet(obj)) {
      return weakCollectionOf("WeakSet");
    }
    if (isWeakRef(obj)) {
      return weakCollectionOf("WeakRef");
    }
    if (isNumber(obj)) {
      return markBoxed(inspect2(Number(obj)));
    }
    if (isBigInt(obj)) {
      return markBoxed(inspect2(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
      return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
      return markBoxed(inspect2(String(obj)));
    }
    if (!isDate(obj) && !isRegExp$1(obj)) {
      var ys = arrObjKeys(obj, inspect2);
      var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
      var protoTag = obj instanceof Object ? "" : "null prototype";
      var stringTag2 = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? "Object" : "";
      var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
      var tag = constructorTag + (stringTag2 || protoTag ? "[" + [].concat(stringTag2 || [], protoTag || []).join(": ") + "] " : "");
      if (ys.length === 0) {
        return tag + "{}";
      }
      if (indent) {
        return tag + "{" + indentedJoin(ys, indent) + "}";
      }
      return tag + "{ " + ys.join(", ") + " }";
    }
    return String(obj);
  };
  function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
    return quoteChar + s + quoteChar;
  }
  function quote(s) {
    return String(s).replace(/"/g, "&quot;");
  }
  function isArray$3(obj) {
    return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isDate(obj) {
    return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isRegExp$1(obj) {
    return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isError(obj) {
    return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isString(obj) {
    return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isNumber(obj) {
    return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isBoolean(obj) {
    return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isSymbol(obj) {
    if (hasShammedSymbols) {
      return obj && typeof obj === "object" && obj instanceof Symbol;
    }
    if (typeof obj === "symbol") {
      return true;
    }
    if (!obj || typeof obj !== "object" || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isBigInt(obj) {
    if (!obj || typeof obj !== "object" || !bigIntValueOf) {
      return false;
    }
    try {
      bigIntValueOf.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty || function(key) {
    return key in this;
  };
  function has$3(obj, key) {
    return hasOwn.call(obj, key);
  }
  function toStr(obj) {
    return objectToString.call(obj);
  }
  function nameOf(f) {
    if (f.name) {
      return f.name;
    }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) {
      return m[1];
    }
    return null;
  }
  function indexOf(xs, x) {
    if (xs.indexOf) {
      return xs.indexOf(x);
    }
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (xs[i2] === x) {
        return i2;
      }
    }
    return -1;
  }
  function isMap(x) {
    if (!mapSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      mapSize.call(x);
      try {
        setSize.call(x);
      } catch (s) {
        return true;
      }
      return x instanceof Map;
    } catch (e) {
    }
    return false;
  }
  function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakMapHas.call(x, weakMapHas);
      try {
        weakSetHas.call(x, weakSetHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }
  function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakRefDeref.call(x);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isSet(x) {
    if (!setSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      setSize.call(x);
      try {
        mapSize.call(x);
      } catch (m) {
        return true;
      }
      return x instanceof Set;
    } catch (e) {
    }
    return false;
  }
  function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakSetHas.call(x, weakSetHas);
      try {
        weakMapHas.call(x, weakMapHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakSet;
    } catch (e) {
    }
    return false;
  }
  function isElement(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
      return true;
    }
    return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
  }
  function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
      return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    var s = str.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, "single", opts);
  }
  function lowbyte(c2) {
    var n = c2.charCodeAt(0);
    var x = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[n];
    if (x) {
      return "\\" + x;
    }
    return "\\x" + (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
  }
  function markBoxed(str) {
    return "Object(" + str + ")";
  }
  function weakCollectionOf(type) {
    return type + " { ? }";
  }
  function collectionOf(type, size2, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(", ");
    return type + " (" + size2 + ") {" + joinedEntries + "}";
  }
  function singleLineValues(xs) {
    for (var i2 = 0; i2 < xs.length; i2++) {
      if (indexOf(xs[i2], "\n") >= 0) {
        return false;
      }
    }
    return true;
  }
  function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === "	") {
      baseIndent = "	";
    } else if (typeof opts.indent === "number" && opts.indent > 0) {
      baseIndent = Array(opts.indent + 1).join(" ");
    } else {
      return null;
    }
    return {
      base: baseIndent,
      prev: Array(depth + 1).join(baseIndent)
    };
  }
  function indentedJoin(xs, indent) {
    if (xs.length === 0) {
      return "";
    }
    var lineJoiner = "\n" + indent.prev + indent.base;
    return lineJoiner + xs.join("," + lineJoiner) + "\n" + indent.prev;
  }
  function arrObjKeys(obj, inspect2) {
    var isArr = isArray$3(obj);
    var xs = [];
    if (isArr) {
      xs.length = obj.length;
      for (var i2 = 0; i2 < obj.length; i2++) {
        xs[i2] = has$3(obj, i2) ? inspect2(obj[i2], obj) : "";
      }
    }
    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k = 0; k < syms.length; k++) {
        symMap["$" + syms[k]] = syms[k];
      }
    }
    for (var key in obj) {
      if (!has$3(obj, key)) {
        continue;
      }
      if (isArr && String(Number(key)) === key && key < obj.length) {
        continue;
      }
      if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
        continue;
      } else if (/[^\w$]/.test(key)) {
        xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
      } else {
        xs.push(key + ": " + inspect2(obj[key], obj));
      }
    }
    if (typeof gOPS === "function") {
      for (var j = 0; j < syms.length; j++) {
        if (isEnumerable.call(obj, syms[j])) {
          xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
        }
      }
    }
    return xs;
  }
  var GetIntrinsic = getIntrinsic;
  var callBound = callBound$1;
  var inspect = objectInspect;
  var $TypeError = GetIntrinsic("%TypeError%");
  var $WeakMap = GetIntrinsic("%WeakMap%", true);
  var $Map = GetIntrinsic("%Map%", true);
  var $weakMapGet = callBound("WeakMap.prototype.get", true);
  var $weakMapSet = callBound("WeakMap.prototype.set", true);
  var $weakMapHas = callBound("WeakMap.prototype.has", true);
  var $mapGet = callBound("Map.prototype.get", true);
  var $mapSet = callBound("Map.prototype.set", true);
  var $mapHas = callBound("Map.prototype.has", true);
  var listGetNode = function(list, key) {
    for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
      if (curr.key === key) {
        prev.next = curr.next;
        curr.next = list.next;
        list.next = curr;
        return curr;
      }
    }
  };
  var listGet = function(objects, key) {
    var node = listGetNode(objects, key);
    return node && node.value;
  };
  var listSet = function(objects, key, value) {
    var node = listGetNode(objects, key);
    if (node) {
      node.value = value;
    } else {
      objects.next = {
        key,
        next: objects.next,
        value
      };
    }
  };
  var listHas = function(objects, key) {
    return !!listGetNode(objects, key);
  };
  var sideChannel = function getSideChannel2() {
    var $wm;
    var $m;
    var $o;
    var channel = {
      assert: function(key) {
        if (!channel.has(key)) {
          throw new $TypeError("Side channel does not contain " + inspect(key));
        }
      },
      get: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapGet($wm, key);
          }
        } else if ($Map) {
          if ($m) {
            return $mapGet($m, key);
          }
        } else {
          if ($o) {
            return listGet($o, key);
          }
        }
      },
      has: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapHas($wm, key);
          }
        } else if ($Map) {
          if ($m) {
            return $mapHas($m, key);
          }
        } else {
          if ($o) {
            return listHas($o, key);
          }
        }
        return false;
      },
      set: function(key, value) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if (!$wm) {
            $wm = new $WeakMap();
          }
          $weakMapSet($wm, key, value);
        } else if ($Map) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        } else {
          if (!$o) {
            $o = { key: {}, next: null };
          }
          listSet($o, key, value);
        }
      }
    };
    return channel;
  };
  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;
  var Format = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  var formats$3 = {
    "default": Format.RFC3986,
    formatters: {
      RFC1738: function(value) {
        return replace.call(value, percentTwenties, "+");
      },
      RFC3986: function(value) {
        return String(value);
      }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
  };
  var formats$2 = formats$3;
  var has$2 = Object.prototype.hasOwnProperty;
  var isArray$2 = Array.isArray;
  var hexTable = function() {
    var array = [];
    for (var i2 = 0; i2 < 256; ++i2) {
      array.push("%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase());
    }
    return array;
  }();
  var compactQueue = function compactQueue2(queue2) {
    while (queue2.length > 1) {
      var item = queue2.pop();
      var obj = item.obj[item.prop];
      if (isArray$2(obj)) {
        var compacted = [];
        for (var j = 0; j < obj.length; ++j) {
          if (typeof obj[j] !== "undefined") {
            compacted.push(obj[j]);
          }
        }
        item.obj[item.prop] = compacted;
      }
    }
  };
  var arrayToObject = function arrayToObject2(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i2 = 0; i2 < source.length; ++i2) {
      if (typeof source[i2] !== "undefined") {
        obj[i2] = source[i2];
      }
    }
    return obj;
  };
  var merge = function merge2(target, source, options) {
    if (!source) {
      return target;
    }
    if (typeof source !== "object") {
      if (isArray$2(target)) {
        target.push(source);
      } else if (target && typeof target === "object") {
        if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
          target[source] = true;
        }
      } else {
        return [target, source];
      }
      return target;
    }
    if (!target || typeof target !== "object") {
      return [target].concat(source);
    }
    var mergeTarget = target;
    if (isArray$2(target) && !isArray$2(source)) {
      mergeTarget = arrayToObject(target, options);
    }
    if (isArray$2(target) && isArray$2(source)) {
      source.forEach(function(item, i2) {
        if (has$2.call(target, i2)) {
          var targetItem = target[i2];
          if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
            target[i2] = merge2(targetItem, item, options);
          } else {
            target.push(item);
          }
        } else {
          target[i2] = item;
        }
      });
      return target;
    }
    return Object.keys(source).reduce(function(acc, key) {
      var value = source[key];
      if (has$2.call(acc, key)) {
        acc[key] = merge2(acc[key], value, options);
      } else {
        acc[key] = value;
      }
      return acc;
    }, mergeTarget);
  };
  var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function(acc, key) {
      acc[key] = source[key];
      return acc;
    }, target);
  };
  var decode = function(str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, " ");
    if (charset === "iso-8859-1") {
      return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    try {
      return decodeURIComponent(strWithoutPlus);
    } catch (e) {
      return strWithoutPlus;
    }
  };
  var encode = function encode2(str, defaultEncoder, charset, kind, format) {
    if (str.length === 0) {
      return str;
    }
    var string = str;
    if (typeof str === "symbol") {
      string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== "string") {
      string = String(str);
    }
    if (charset === "iso-8859-1") {
      return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
        return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
      });
    }
    var out = "";
    for (var i2 = 0; i2 < string.length; ++i2) {
      var c2 = string.charCodeAt(i2);
      if (c2 === 45 || c2 === 46 || c2 === 95 || c2 === 126 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || format === formats$2.RFC1738 && (c2 === 40 || c2 === 41)) {
        out += string.charAt(i2);
        continue;
      }
      if (c2 < 128) {
        out = out + hexTable[c2];
        continue;
      }
      if (c2 < 2048) {
        out = out + (hexTable[192 | c2 >> 6] + hexTable[128 | c2 & 63]);
        continue;
      }
      if (c2 < 55296 || c2 >= 57344) {
        out = out + (hexTable[224 | c2 >> 12] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63]);
        continue;
      }
      i2 += 1;
      c2 = 65536 + ((c2 & 1023) << 10 | string.charCodeAt(i2) & 1023);
      out += hexTable[240 | c2 >> 18] + hexTable[128 | c2 >> 12 & 63] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63];
    }
    return out;
  };
  var compact = function compact2(value) {
    var queue2 = [{ obj: { o: value }, prop: "o" }];
    var refs = [];
    for (var i2 = 0; i2 < queue2.length; ++i2) {
      var item = queue2[i2];
      var obj = item.obj[item.prop];
      var keys = Object.keys(obj);
      for (var j = 0; j < keys.length; ++j) {
        var key = keys[j];
        var val = obj[key];
        if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
          queue2.push({ obj, prop: key });
          refs.push(val);
        }
      }
    }
    compactQueue(queue2);
    return value;
  };
  var isRegExp = function isRegExp2(obj) {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  };
  var isBuffer = function isBuffer2(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };
  var combine = function combine2(a, b) {
    return [].concat(a, b);
  };
  var maybeMap = function maybeMap2(val, fn) {
    if (isArray$2(val)) {
      var mapped = [];
      for (var i2 = 0; i2 < val.length; i2 += 1) {
        mapped.push(fn(val[i2]));
      }
      return mapped;
    }
    return fn(val);
  };
  var utils$2 = {
    arrayToObject,
    assign,
    combine,
    compact,
    decode,
    encode,
    isBuffer,
    isRegExp,
    maybeMap,
    merge
  };
  var getSideChannel = sideChannel;
  var utils$1 = utils$2;
  var formats$1 = formats$3;
  var has$1 = Object.prototype.hasOwnProperty;
  var arrayPrefixGenerators = {
    brackets: function brackets(prefix2) {
      return prefix2 + "[]";
    },
    comma: "comma",
    indices: function indices(prefix2, key) {
      return prefix2 + "[" + key + "]";
    },
    repeat: function repeat(prefix2) {
      return prefix2;
    }
  };
  var isArray$1 = Array.isArray;
  var push = Array.prototype.push;
  var pushToArray = function(arr, valueOrArray) {
    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
  };
  var toISO = Date.prototype.toISOString;
  var defaultFormat = formats$1["default"];
  var defaults$1 = {
    addQueryPrefix: false,
    allowDots: false,
    charset: "utf-8",
    charsetSentinel: false,
    delimiter: "&",
    encode: true,
    encoder: utils$1.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats$1.formatters[defaultFormat],
    indices: false,
    serializeDate: function serializeDate(date) {
      return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
  };
  var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
    return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
  };
  var stringify$2 = function stringify2(object, prefix2, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel2) {
    var obj = object;
    if (sideChannel2.has(object)) {
      throw new RangeError("Cyclic object value");
    }
    if (typeof filter === "function") {
      obj = filter(prefix2, obj);
    } else if (obj instanceof Date) {
      obj = serializeDate(obj);
    } else if (generateArrayPrefix === "comma" && isArray$1(obj)) {
      obj = utils$1.maybeMap(obj, function(value2) {
        if (value2 instanceof Date) {
          return serializeDate(value2);
        }
        return value2;
      });
    }
    if (obj === null) {
      if (strictNullHandling) {
        return encoder && !encodeValuesOnly ? encoder(prefix2, defaults$1.encoder, charset, "key", format) : prefix2;
      }
      obj = "";
    }
    if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
      if (encoder) {
        var keyValue = encodeValuesOnly ? prefix2 : encoder(prefix2, defaults$1.encoder, charset, "key", format);
        return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$1.encoder, charset, "value", format))];
      }
      return [formatter(prefix2) + "=" + formatter(String(obj))];
    }
    var values = [];
    if (typeof obj === "undefined") {
      return values;
    }
    var objKeys;
    if (generateArrayPrefix === "comma" && isArray$1(obj)) {
      objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
    } else if (isArray$1(filter)) {
      objKeys = filter;
    } else {
      var keys = Object.keys(obj);
      objKeys = sort ? keys.sort(sort) : keys;
    }
    for (var i2 = 0; i2 < objKeys.length; ++i2) {
      var key = objKeys[i2];
      var value = typeof key === "object" && key.value !== void 0 ? key.value : obj[key];
      if (skipNulls && value === null) {
        continue;
      }
      var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix2, key) : prefix2 : prefix2 + (allowDots ? "." + key : "[" + key + "]");
      sideChannel2.set(object, true);
      var valueSideChannel = getSideChannel();
      pushToArray(values, stringify2(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
    }
    return values;
  };
  var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
    if (!opts) {
      return defaults$1;
    }
    if (opts.encoder !== null && opts.encoder !== void 0 && typeof opts.encoder !== "function") {
      throw new TypeError("Encoder has to be a function.");
    }
    var charset = opts.charset || defaults$1.charset;
    if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    }
    var format = formats$1["default"];
    if (typeof opts.format !== "undefined") {
      if (!has$1.call(formats$1.formatters, opts.format)) {
        throw new TypeError("Unknown format option provided.");
      }
      format = opts.format;
    }
    var formatter = formats$1.formatters[format];
    var filter = defaults$1.filter;
    if (typeof opts.filter === "function" || isArray$1(opts.filter)) {
      filter = opts.filter;
    }
    return {
      addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
      allowDots: typeof opts.allowDots === "undefined" ? defaults$1.allowDots : !!opts.allowDots,
      charset,
      charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
      delimiter: typeof opts.delimiter === "undefined" ? defaults$1.delimiter : opts.delimiter,
      encode: typeof opts.encode === "boolean" ? opts.encode : defaults$1.encode,
      encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$1.encoder,
      encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
      filter,
      format,
      formatter,
      serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$1.serializeDate,
      skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$1.skipNulls,
      sort: typeof opts.sort === "function" ? opts.sort : null,
      strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
  };
  var stringify_1 = function(object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);
    var objKeys;
    var filter;
    if (typeof options.filter === "function") {
      filter = options.filter;
      obj = filter("", obj);
    } else if (isArray$1(options.filter)) {
      filter = options.filter;
      objKeys = filter;
    }
    var keys = [];
    if (typeof obj !== "object" || obj === null) {
      return "";
    }
    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
      arrayFormat = opts.arrayFormat;
    } else if (opts && "indices" in opts) {
      arrayFormat = opts.indices ? "indices" : "repeat";
    } else {
      arrayFormat = "indices";
    }
    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (!objKeys) {
      objKeys = Object.keys(obj);
    }
    if (options.sort) {
      objKeys.sort(options.sort);
    }
    var sideChannel2 = getSideChannel();
    for (var i2 = 0; i2 < objKeys.length; ++i2) {
      var key = objKeys[i2];
      if (options.skipNulls && obj[key] === null) {
        continue;
      }
      pushToArray(keys, stringify$2(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel2));
    }
    var joined = keys.join(options.delimiter);
    var prefix2 = options.addQueryPrefix === true ? "?" : "";
    if (options.charsetSentinel) {
      if (options.charset === "iso-8859-1") {
        prefix2 += "utf8=%26%2310003%3B&";
      } else {
        prefix2 += "utf8=%E2%9C%93&";
      }
    }
    return joined.length > 0 ? prefix2 + joined : "";
  };
  var utils = utils$2;
  var has = Object.prototype.hasOwnProperty;
  var isArray = Array.isArray;
  var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1e3,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
  };
  var interpretNumericEntities = function(str) {
    return str.replace(/&#(\d+);/g, function($0, numberStr) {
      return String.fromCharCode(parseInt(numberStr, 10));
    });
  };
  var parseArrayValue = function(val, options) {
    if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
      return val.split(",");
    }
    return val;
  };
  var isoSentinel = "utf8=%26%2310003%3B";
  var charsetSentinel = "utf8=%E2%9C%93";
  var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
    var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1;
    var i2;
    var charset = options.charset;
    if (options.charsetSentinel) {
      for (i2 = 0; i2 < parts.length; ++i2) {
        if (parts[i2].indexOf("utf8=") === 0) {
          if (parts[i2] === charsetSentinel) {
            charset = "utf-8";
          } else if (parts[i2] === isoSentinel) {
            charset = "iso-8859-1";
          }
          skipIndex = i2;
          i2 = parts.length;
        }
      }
    }
    for (i2 = 0; i2 < parts.length; ++i2) {
      if (i2 === skipIndex) {
        continue;
      }
      var part = parts[i2];
      var bracketEqualsPos = part.indexOf("]=");
      var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
      var key, val;
      if (pos === -1) {
        key = options.decoder(part, defaults.decoder, charset, "key");
        val = options.strictNullHandling ? null : "";
      } else {
        key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
        val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function(encodedVal) {
          return options.decoder(encodedVal, defaults.decoder, charset, "value");
        });
      }
      if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
        val = interpretNumericEntities(val);
      }
      if (part.indexOf("[]=") > -1) {
        val = isArray(val) ? [val] : val;
      }
      if (has.call(obj, key)) {
        obj[key] = utils.combine(obj[key], val);
      } else {
        obj[key] = val;
      }
    }
    return obj;
  };
  var parseObject = function(chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);
    for (var i2 = chain.length - 1; i2 >= 0; --i2) {
      var obj;
      var root2 = chain[i2];
      if (root2 === "[]" && options.parseArrays) {
        obj = [].concat(leaf);
      } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root2.charAt(0) === "[" && root2.charAt(root2.length - 1) === "]" ? root2.slice(1, -1) : root2;
        var index2 = parseInt(cleanRoot, 10);
        if (!options.parseArrays && cleanRoot === "") {
          obj = { 0: leaf };
        } else if (!isNaN(index2) && root2 !== cleanRoot && String(index2) === cleanRoot && index2 >= 0 && (options.parseArrays && index2 <= options.arrayLimit)) {
          obj = [];
          obj[index2] = leaf;
        } else {
          obj[cleanRoot] = leaf;
        }
      }
      leaf = obj;
    }
    return leaf;
  };
  var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
      return;
    }
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;
    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;
    var keys = [];
    if (parent) {
      if (!options.plainObjects && has.call(Object.prototype, parent)) {
        if (!options.allowPrototypes) {
          return;
        }
      }
      keys.push(parent);
    }
    var i2 = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i2 < options.depth) {
      i2 += 1;
      if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
        if (!options.allowPrototypes) {
          return;
        }
      }
      keys.push(segment[1]);
    }
    if (segment) {
      keys.push("[" + key.slice(segment.index) + "]");
    }
    return parseObject(keys, val, options, valuesParsed);
  };
  var normalizeParseOptions = function normalizeParseOptions2(opts) {
    if (!opts) {
      return defaults;
    }
    if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
      throw new TypeError("Decoder has to be a function.");
    }
    if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    }
    var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
    return {
      allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
      allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
      allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
      arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
      charset,
      charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
      comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
      decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
      delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
      depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
      ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
      interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
      parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
      parseArrays: opts.parseArrays !== false,
      plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
      strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
    };
  };
  var parse$1 = function(str, opts) {
    var options = normalizeParseOptions(opts);
    if (str === "" || str === null || typeof str === "undefined") {
      return options.plainObjects ? Object.create(null) : {};
    }
    var tempObj = typeof str === "string" ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};
    var keys = Object.keys(tempObj);
    for (var i2 = 0; i2 < keys.length; ++i2) {
      var key = keys[i2];
      var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
      obj = utils.merge(obj, newObj, options);
    }
    if (options.allowSparse === true) {
      return obj;
    }
    return utils.compact(obj);
  };
  var stringify$1 = stringify_1;
  var parse = parse$1;
  var formats = formats$3;
  var lib = {
    formats,
    parse,
    stringify: stringify$1
  };
  var lodash = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  (function(module2, exports2) {
    (function() {
      var undefined$12;
      var VERSION2 = "4.17.21";
      var LARGE_ARRAY_SIZE2 = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT2 = 800, HOT_SPAN2 = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY2 = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", asyncTag2 = "[object AsyncFunction]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", domExcTag = "[object DOMException]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", nullTag2 = "[object Null]", objectTag2 = "[object Object]", promiseTag = "[object Promise]", proxyTag2 = "[object Proxy]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag2 = "[object Undefined]", weakMapTag2 = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar2.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar2 = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint2 = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange2 = "\\ud800-\\udfff", rsComboMarksRange2 = "\\u0300-\\u036f", reComboHalfMarksRange2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange2 = "\\u20d0-\\u20ff", rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange2 = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral2 = "[" + rsAstralRange2 + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo2 = "[" + rsComboRange2 + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz2 = "\\ud83c[\\udffb-\\udfff]", rsModifier2 = "(?:" + rsCombo2 + "|" + rsFitz2 + ")", rsNonAstral2 = "[^" + rsAstralRange2 + "]", rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ2 = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod2 = rsModifier2 + "?", rsOptVar2 = "[" + rsVarRange2 + "]?", rsOptJoin2 = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") + ")" + rsOptVar2 + reOptMod2 + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2, rsEmoji = "(?:" + [rsDingbat, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2, rsSymbol2 = "(?:" + [rsNonAstral2 + rsCombo2 + "?", rsCombo2, rsRegional2, rsSurrPair2, rsAstral2].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo2, "g");
      var reUnicode2 = RegExp(rsFitz2 + "(?=" + rsFitz2 + ")|" + rsSymbol2 + rsSeq2, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode2 = RegExp("[" + rsZWJ2 + rsAstralRange2 + rsComboRange2 + rsVarRange2 + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags2 = {};
      typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
      typedArrayTags2[argsTag2] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag2] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag2] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
      var cloneableTags = {};
      cloneableTags[argsTag2] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag2] = cloneableTags[dataViewTag2] = cloneableTags[boolTag2] = cloneableTags[dateTag2] = cloneableTags[float32Tag2] = cloneableTags[float64Tag2] = cloneableTags[int8Tag2] = cloneableTags[int16Tag2] = cloneableTags[int32Tag2] = cloneableTags[mapTag2] = cloneableTags[numberTag2] = cloneableTags[objectTag2] = cloneableTags[regexpTag2] = cloneableTags[setTag2] = cloneableTags[stringTag2] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag2] = cloneableTags[uint8ClampedTag2] = cloneableTags[uint16Tag2] = cloneableTags[uint32Tag2] = true;
      cloneableTags[errorTag2] = cloneableTags[funcTag2] = cloneableTags[weakMapTag2] = false;
      var deburredLetters = {
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
      var freeExports2 = exports2 && !exports2.nodeType && exports2;
      var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
      var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
      var freeProcess2 = moduleExports2 && freeGlobal2.process;
      var nodeUtil2 = function() {
        try {
          var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess2 && freeProcess2.binding && freeProcess2.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil2 && nodeUtil2.isArrayBuffer, nodeIsDate = nodeUtil2 && nodeUtil2.isDate, nodeIsMap = nodeUtil2 && nodeUtil2.isMap, nodeIsRegExp = nodeUtil2 && nodeUtil2.isRegExp, nodeIsSet = nodeUtil2 && nodeUtil2.isSet, nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
      function apply2(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          var value = array[index2];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (!predicate(array[index2], index2, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (predicate(value, index2, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (comparator(value, array[index2])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap2(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index2 = -1, length = values.length, offset = array.length;
        while (++index2 < length) {
          array[offset + index2] = values[index2];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index2 = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index2];
        }
        while (++index2 < length) {
          accumulator = iteratee(accumulator, array[index2], index2, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray2(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (comparator(array[index2], value)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined$12 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined$12 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index2, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index2, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index2 = -1, length = array.length;
        while (++index2 < length) {
          var current = iteratee(array[index2]);
          if (current !== undefined$12) {
            result = result === undefined$12 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes2(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap2(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary2(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap2(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue2(object, key) {
        return object == null ? undefined$12 : object[key];
      }
      function hasUnicode2(string) {
        return reHasUnicode2.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data2, result = [];
        while (!(data2 = iterator.next()).done) {
          result.push(data2.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index2 = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index2] = [key, value];
        });
        return result;
      }
      function overArg2(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index2 = -1, length = array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index2] = PLACEHOLDER;
            result[resIndex++] = index2;
          }
        }
        return result;
      }
      function setToArray(set2) {
        var index2 = -1, result = Array(set2.size);
        set2.forEach(function(value) {
          result[++index2] = value;
        });
        return result;
      }
      function setToPairs(set2) {
        var index2 = -1, result = Array(set2.size);
        set2.forEach(function(value) {
          result[++index2] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index2 = fromIndex + 1;
        while (index2--) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return index2;
      }
      function stringSize(string) {
        return hasUnicode2(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray2(string) {
        return hasUnicode2(string) ? unicodeToArray2(string) : asciiToArray2(string);
      }
      function trimmedEndIndex(string) {
        var index2 = string.length;
        while (index2-- && reWhitespace.test(string.charAt(index2))) {
        }
        return index2;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode2.lastIndex = 0;
        while (reUnicode2.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray2(string) {
        return string.match(reUnicode2) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root2 : _2.defaults(root2.Object(), context, _2.pick(root2, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto2 = Array2.prototype, funcProto2 = Function2.prototype, objectProto2 = Object2.prototype;
        var coreJsData2 = context["__core-js_shared__"];
        var funcToString2 = funcProto2.toString;
        var hasOwnProperty2 = objectProto2.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey2 = function() {
          var uid2 = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
          return uid2 ? "Symbol(src)_1." + uid2 : "";
        }();
        var nativeObjectToString2 = objectProto2.toString;
        var objectCtorString2 = funcToString2.call(Object2);
        var oldDash = root2._;
        var reIsNative2 = RegExp2("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        var Buffer3 = moduleExports2 ? context.Buffer : undefined$12, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe2 = Buffer3 ? Buffer3.allocUnsafe : undefined$12, getPrototype2 = overArg2(Object2.getPrototypeOf, Object2), objectCreate2 = Object2.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$12, symIterator = Symbol2 ? Symbol2.iterator : undefined$12, symToStringTag2 = Symbol2 ? Symbol2.toStringTag : undefined$12;
        var defineProperty2 = function() {
          try {
            var func = getNative2(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer2 = Buffer3 ? Buffer3.isBuffer : undefined$12, nativeIsFinite = context.isFinite, nativeJoin = arrayProto2.join, nativeKeys = overArg2(Object2.keys, Object2), nativeMax2 = Math2.max, nativeMin = Math2.min, nativeNow2 = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto2.reverse;
        var DataView2 = getNative2(context, "DataView"), Map2 = getNative2(context, "Map"), Promise2 = getNative2(context, "Promise"), Set2 = getNative2(context, "Set"), WeakMap2 = getNative2(context, "WeakMap"), nativeCreate2 = getNative2(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource2(DataView2), mapCtorString = toSource2(Map2), promiseCtorString = toSource2(Promise2), setCtorString = toSource2(Set2), weakMapCtorString = toSource2(WeakMap2);
        var symbolProto2 = Symbol2 ? Symbol2.prototype : undefined$12, symbolValueOf = symbolProto2 ? symbolProto2.valueOf : undefined$12, symbolToString2 = symbolProto2 ? symbolProto2.toString : undefined$12;
        function lodash2(value) {
          if (isObjectLike2(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty2.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate2 = function() {
          function object() {
          }
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate2) {
              return objectCreate2(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined$12;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined$12;
        }
        lodash2.templateSettings = {
          "escape": reEscape,
          "evaluate": reEvaluate,
          "interpolate": reInterpolate,
          "variable": "",
          "imports": {
            "_": lodash2
          }
        };
        lodash2.prototype = baseLodash.prototype;
        lodash2.prototype.constructor = lodash2;
        LodashWrapper.prototype = baseCreate2(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray2(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray2(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray2(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index2 = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index2 += dir;
              var iterIndex = -1, value = array[index2];
              while (++iterIndex < iterLength) {
                var data2 = iteratees[iterIndex], iteratee2 = data2.iteratee, type = data2.type, computed2 = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed2;
                } else if (!computed2) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate2(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash2(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear2() {
          this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
          this.size = 0;
        }
        function hashDelete2(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet2(key) {
          var data2 = this.__data__;
          if (nativeCreate2) {
            var result2 = data2[key];
            return result2 === HASH_UNDEFINED2 ? undefined$12 : result2;
          }
          return hasOwnProperty2.call(data2, key) ? data2[key] : undefined$12;
        }
        function hashHas2(key) {
          var data2 = this.__data__;
          return nativeCreate2 ? data2[key] !== undefined$12 : hasOwnProperty2.call(data2, key);
        }
        function hashSet2(key, value) {
          var data2 = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data2[key] = nativeCreate2 && value === undefined$12 ? HASH_UNDEFINED2 : value;
          return this;
        }
        Hash2.prototype.clear = hashClear2;
        Hash2.prototype["delete"] = hashDelete2;
        Hash2.prototype.get = hashGet2;
        Hash2.prototype.has = hashHas2;
        Hash2.prototype.set = hashSet2;
        function ListCache2(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear2() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete2(key) {
          var data2 = this.__data__, index2 = assocIndexOf2(data2, key);
          if (index2 < 0) {
            return false;
          }
          var lastIndex = data2.length - 1;
          if (index2 == lastIndex) {
            data2.pop();
          } else {
            splice2.call(data2, index2, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet2(key) {
          var data2 = this.__data__, index2 = assocIndexOf2(data2, key);
          return index2 < 0 ? undefined$12 : data2[index2][1];
        }
        function listCacheHas2(key) {
          return assocIndexOf2(this.__data__, key) > -1;
        }
        function listCacheSet2(key, value) {
          var data2 = this.__data__, index2 = assocIndexOf2(data2, key);
          if (index2 < 0) {
            ++this.size;
            data2.push([key, value]);
          } else {
            data2[index2][1] = value;
          }
          return this;
        }
        ListCache2.prototype.clear = listCacheClear2;
        ListCache2.prototype["delete"] = listCacheDelete2;
        ListCache2.prototype.get = listCacheGet2;
        ListCache2.prototype.has = listCacheHas2;
        ListCache2.prototype.set = listCacheSet2;
        function MapCache2(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear2() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash2(),
            "map": new (Map2 || ListCache2)(),
            "string": new Hash2()
          };
        }
        function mapCacheDelete2(key) {
          var result2 = getMapData2(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet2(key) {
          return getMapData2(this, key).get(key);
        }
        function mapCacheHas2(key) {
          return getMapData2(this, key).has(key);
        }
        function mapCacheSet2(key, value) {
          var data2 = getMapData2(this, key), size3 = data2.size;
          data2.set(key, value);
          this.size += data2.size == size3 ? 0 : 1;
          return this;
        }
        MapCache2.prototype.clear = mapCacheClear2;
        MapCache2.prototype["delete"] = mapCacheDelete2;
        MapCache2.prototype.get = mapCacheGet2;
        MapCache2.prototype.has = mapCacheHas2;
        MapCache2.prototype.set = mapCacheSet2;
        function SetCache(values2) {
          var index2 = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache2();
          while (++index2 < length) {
            this.add(values2[index2]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED2);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack2(entries) {
          var data2 = this.__data__ = new ListCache2(entries);
          this.size = data2.size;
        }
        function stackClear2() {
          this.__data__ = new ListCache2();
          this.size = 0;
        }
        function stackDelete2(key) {
          var data2 = this.__data__, result2 = data2["delete"](key);
          this.size = data2.size;
          return result2;
        }
        function stackGet2(key) {
          return this.__data__.get(key);
        }
        function stackHas2(key) {
          return this.__data__.has(key);
        }
        function stackSet2(key, value) {
          var data2 = this.__data__;
          if (data2 instanceof ListCache2) {
            var pairs = data2.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
              pairs.push([key, value]);
              this.size = ++data2.size;
              return this;
            }
            data2 = this.__data__ = new MapCache2(pairs);
          }
          data2.set(key, value);
          this.size = data2.size;
          return this;
        }
        Stack2.prototype.clear = stackClear2;
        Stack2.prototype["delete"] = stackDelete2;
        Stack2.prototype.get = stackGet2;
        Stack2.prototype.has = stackHas2;
        Stack2.prototype.set = stackSet2;
        function arrayLikeKeys2(value, inherited) {
          var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes2(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex2(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined$12;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray2(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray2(array));
        }
        function assignMergeValue2(object, key, value) {
          if (value !== undefined$12 && !eq2(object[key], value) || value === undefined$12 && !(key in object)) {
            baseAssignValue2(object, key, value);
          }
        }
        function assignValue2(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value)) || value === undefined$12 && !(key in object)) {
            baseAssignValue2(object, key, value);
          }
        }
        function assocIndexOf2(array, key) {
          var length = array.length;
          while (length--) {
            if (eq2(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject2(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject2(source, keysIn2(source), object);
        }
        function baseAssignValue2(object, key, value) {
          if (key == "__proto__" && defineProperty2) {
            defineProperty2(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index2 = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index2 < length) {
            result2[index2] = skip ? undefined$12 : get2(object, paths[index2]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined$12) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined$12) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined$12) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray2(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray2(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag2 || tag == genTag2;
            if (isBuffer2(value)) {
              return cloneBuffer2(value, isDeep);
            }
            if (tag == objectTag2 || tag == argsTag2 || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject2(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack2());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet2(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap2(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn2 : keys;
          var props = isArr ? undefined$12 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue2(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined$12 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined$12, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap2(values2, baseUnary2(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE2) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index2 < length) {
              var value = array[index2], computed2 = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed2 === computed2) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed2) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed2, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index2, collection2) {
            result2 = !!predicate(value, index2, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index2 = -1, length = array.length;
          while (++index2 < length) {
            var value = array[index2], current = iteratee2(value);
            if (current != null && (computed2 === undefined$12 ? current === current && !isSymbol2(current) : comparator(current, computed2))) {
              var computed2 = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined$12 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index2, collection2) {
            if (predicate(value, index2, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index2 = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index2 < length) {
            var value = array[index2];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor2 = createBaseFor2();
        var baseForRight = createBaseFor2(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor2(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction2(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index2 = 0, length = path.length;
          while (object != null && index2 < length) {
            object = object[toKey(path[index2++])];
          }
          return index2 && index2 == length ? object : undefined$12;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray2(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag2(value) {
          if (value == null) {
            return value === undefined$12 ? undefinedTag2 : nullTag2;
          }
          return symToStringTag2 && symToStringTag2 in Object2(value) ? getRawTag2(value) : objectToString2(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty2.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax2(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap2(array, baseUnary2(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$12;
          }
          array = arrays[0];
          var index2 = -1, seen = caches[0];
          outer:
            while (++index2 < length && result2.length < maxLength) {
              var value = array[index2], computed2 = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed2) : includes2(result2, computed2, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed2) : includes2(arrays[othIndex], computed2, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed2);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined$12 : apply2(func, object, args);
        }
        function baseIsArguments2(value) {
          return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike2(value) && baseGetTag2(value) == arrayBufferTag2;
        }
        function baseIsDate(value) {
          return isObjectLike2(value) && baseGetTag2(value) == dateTag2;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag(object), othTag = othIsArr ? arrayTag2 : getTag(other);
          objTag = objTag == argsTag2 ? objectTag2 : objTag;
          othTag = othTag == argsTag2 ? objectTag2 : othTag;
          var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer2(object)) {
            if (!isBuffer2(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack2());
            return objIsArr || isTypedArray2(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack2());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack2());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike2(value) && getTag(value) == mapTag2;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index2 = matchData.length, length = index2, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index2--) {
            var data2 = matchData[index2];
            if (noCustomizer && data2[2] ? data2[1] !== object[data2[0]] : !(data2[0] in object)) {
              return false;
            }
          }
          while (++index2 < length) {
            data2 = matchData[index2];
            var key = data2[0], objValue = object[key], srcValue = data2[1];
            if (noCustomizer && data2[2]) {
              if (objValue === undefined$12 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack2();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined$12 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative2(value) {
          if (!isObject2(value) || isMasked2(value)) {
            return false;
          }
          var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
          return pattern.test(toSource2(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike2(value) && baseGetTag2(value) == regexpTag2;
        }
        function baseIsSet(value) {
          return isObjectLike2(value) && getTag(value) == setTag2;
        }
        function baseIsTypedArray2(value) {
          return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity2;
          }
          if (typeof value == "object") {
            return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype2(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty2.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn2(object) {
          if (!isObject2(object)) {
            return nativeKeysIn2(object);
          }
          var isProto = isPrototype2(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index2 = -1, result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index2] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get2(object, path);
            return objValue === undefined$12 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge2(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor2(source, function(srcValue, key) {
            stack || (stack = new Stack2());
            if (isObject2(srcValue)) {
              baseMergeDeep2(object, source, key, srcIndex, baseMerge2, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet2(object, key), srcValue, key + "", object, source, stack) : undefined$12;
              if (newValue === undefined$12) {
                newValue = srcValue;
              }
              assignMergeValue2(object, key, newValue);
            }
          }, keysIn2);
        }
        function baseMergeDeep2(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet2(object, key), srcValue = safeGet2(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue2(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$12;
          var isCommon = newValue === undefined$12;
          if (isCommon) {
            var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray2(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray2(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject2(objValue)) {
                newValue = copyArray2(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer2(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray2(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject2(srcValue) || isArguments2(srcValue)) {
              newValue = objValue;
              if (isArguments2(objValue)) {
                newValue = toPlainObject2(objValue);
              } else if (!isObject2(objValue) || isFunction2(objValue)) {
                newValue = initCloneObject2(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue2(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex2(n, length) ? array[n] : undefined$12;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap2(iteratees, function(iteratee2) {
              if (isArray2(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity2];
          }
          var index2 = -1;
          iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap2(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index2, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index2 = -1, length = paths.length, result2 = {};
          while (++index2 < length) {
            var path = paths[index2], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf3 = comparator ? baseIndexOfWith : baseIndexOf, index2 = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray2(values2);
          }
          if (iteratee2) {
            seen = arrayMap2(array, baseUnary2(iteratee2));
          }
          while (++index2 < length) {
            var fromIndex = 0, value = values2[index2], computed2 = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf3(seen, computed2, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice2.call(seen, fromIndex, 1);
              }
              splice2.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index2 = indexes[length];
            if (length == lastIndex || index2 !== previous) {
              var previous = index2;
              if (isIndex2(index2)) {
                splice2.call(array, index2, 1);
              } else {
                baseUnset(array, index2);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index2 = -1, length = nativeMax2(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index2] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER2) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest2(func, start) {
          return setToString2(overRest2(func, start, identity2), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject2(object)) {
            return object;
          }
          path = castPath(path, object);
          var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index2 < length) {
            var key = toKey(path[index2]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index2 != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined$12;
              if (newValue === undefined$12) {
                newValue = isObject2(objValue) ? objValue : isIndex2(path[index2 + 1]) ? [] : {};
              }
            }
            assignValue2(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity2 : function(func, data2) {
          metaMap.set(func, data2);
          return func;
        };
        var baseSetToString2 = !defineProperty2 ? identity2 : function(func, string) {
          return defineProperty2(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant2(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice2(array, start, end) {
          var index2 = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index2 < length) {
            result2[index2] = array[index2 + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index2, collection2) {
            result2 = predicate(value, index2, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed2 = array[mid];
              if (computed2 !== null && !isSymbol2(computed2) && (retHighest ? computed2 <= value : computed2 < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity2, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined$12;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed2 = iteratee2(array[mid]), othIsDefined = computed2 !== undefined$12, othIsNull = computed2 === null, othIsReflexive = computed2 === computed2, othIsSymbol = isSymbol2(computed2);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed2 <= value : computed2 < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index2 = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array[index2], computed2 = iteratee2 ? iteratee2(value) : value;
            if (!index2 || !eq2(computed2, seen)) {
              var seen = computed2;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString2(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray2(value)) {
            return arrayMap2(value, baseToString2) + "";
          }
          if (isSymbol2(value)) {
            return symbolToString2 ? symbolToString2.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE2) {
            var set3 = iteratee2 ? null : createSet(array);
            if (set3) {
              return setToArray(set3);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index2 < length) {
              var value = array[index2], computed2 = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed2 === computed2) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed2) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed2);
                }
                result2.push(value);
              } else if (!includes2(seen, computed2, comparator)) {
                if (seen !== result2) {
                  seen.push(computed2);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index2 = fromRight ? length : -1;
          while ((fromRight ? index2-- : ++index2 < length) && predicate(array[index2], index2, array)) {
          }
          return isDrop ? baseSlice2(array, fromRight ? 0 : index2, fromRight ? index2 + 1 : length) : baseSlice2(array, fromRight ? index2 + 1 : 0, fromRight ? length : index2);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index2 = -1, result2 = Array2(length);
          while (++index2 < length) {
            var array = arrays[index2], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index2) {
                result2[index2] = baseDifference(result2[index2] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index2 = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index2 < length) {
            var value = index2 < valsLength ? values2[index2] : undefined$12;
            assignFunc(result2, props[index2], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject2(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity2;
        }
        function castPath(value, object) {
          if (isArray2(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath2(toString2(value));
        }
        var castRest = baseRest2;
        function castSlice2(array, start, end) {
          var length = array.length;
          end = end === undefined$12 ? length : end;
          return !start && end >= length ? array : baseSlice2(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function(id) {
          return root2.clearTimeout(id);
        };
        function cloneBuffer2(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe2 ? allocUnsafe2(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer2(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer2(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray2(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer2(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined$12, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
            var othIsDefined = other !== undefined$12, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index2 < length) {
            var result2 = compareAscending(objCriteria[index2], othCriteria[index2]);
            if (result2) {
              if (index2 >= ordersLength) {
                return result2;
              }
              var order = orders[index2];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray2(source, array) {
          var index2 = -1, length = source.length;
          array || (array = Array2(length));
          while (++index2 < length) {
            array[index2] = source[index2];
          }
          return array;
        }
        function copyObject2(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index2 = -1, length = props.length;
          while (++index2 < length) {
            var key = props[index2];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$12;
            if (newValue === undefined$12) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue2(object, key, newValue);
            } else {
              assignValue2(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject2(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject2(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner2(assigner) {
          return baseRest2(function(object, sources) {
            var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$12, guard = length > 2 ? sources[2] : undefined$12;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$12;
            if (guard && isIterateeCall2(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined$12 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index2 < length) {
              var source = sources[index2];
              if (source) {
                assigner(object, source, index2, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike2(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index2 = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index2-- : ++index2 < length) {
              if (iteratee2(iterable[index2], index2, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor2(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index2 = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index2];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst2(methodName) {
          return function(string) {
            string = toString2(string);
            var strSymbols = hasUnicode2(string) ? stringToArray2(string) : undefined$12;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice2(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate2(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length, placeholder = getHolder(wrapper);
            while (index2--) {
              args[index2] = arguments[index2];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$12, args, holders, undefined$12, undefined$12, arity - length);
            }
            var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return apply2(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike2(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index2 = findIndexFunc(collection, predicate, fromIndex);
            return index2 > -1 ? iterable[iteratee2 ? collection[index2] : index2] : undefined$12;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index2 = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index2--) {
              var func = funcs[index2];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index2 = wrapper ? index2 : length;
            while (++index2 < length) {
              func = funcs[index2];
              var funcName = getFuncName(func), data2 = funcName == "wrapper" ? getData(func) : undefined$12;
              if (data2 && isLaziable(data2[0]) && data2[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data2[4].length && data2[9] == 1) {
                wrapper = wrapper[getFuncName(data2[0])].apply(wrapper, data2[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray2(value)) {
                return wrapper.plant(value).value();
              }
              var index3 = 0, result2 = length ? funcs[index3].apply(this, args) : value;
              while (++index3 < length) {
                result2 = funcs[index3].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$12 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length;
            while (index2--) {
              args[index2] = arguments[index2];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root2 && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined$12 && other === undefined$12) {
              return defaultValue;
            }
            if (value !== undefined$12) {
              result2 = value;
            }
            if (other !== undefined$12) {
              if (result2 === undefined$12) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString2(value);
                other = baseToString2(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
            return baseRest2(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply2(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined$12 ? " " : baseToString2(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode2(chars) ? castSlice2(stringToArray2(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply2(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall2(start, end, step)) {
              end = step = undefined$12;
            }
            start = toFinite(start);
            if (end === undefined$12) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined$12 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber2(value);
              other = toNumber2(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$12, newHoldersRight = isCurry ? undefined$12 : holders, newPartials = isCurry ? partials : undefined$12, newPartialsRight = isCurry ? undefined$12 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined$12, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber2(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString2(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY2) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag2) {
              return mapToArray(object);
            }
            if (tag == setTag2) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined$12;
          }
          ary2 = ary2 === undefined$12 ? ary2 : nativeMax2(toInteger(ary2), 0);
          arity = arity === undefined$12 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined$12;
          }
          var data2 = isBindKey ? undefined$12 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data2) {
            mergeData(newData, data2);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined$12 ? isBindKey ? 0 : func.length : nativeMax2(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined$12, newData);
          }
          var setter = data2 ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined$12 || eq2(objValue, objectProto2[key]) && !hasOwnProperty2.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge2(objValue, srcValue, undefined$12, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject2(value) ? undefined$12 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$12;
          stack.set(array, other);
          stack.set(other, array);
          while (++index2 < arrLength) {
            var arrValue = array[index2], othValue = other[index2];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
            }
            if (compared !== undefined$12) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag2:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag2:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag2:
            case dateTag2:
            case numberTag2:
              return eq2(+object, +other);
            case errorTag2:
              return object.name == other.name && object.message == other.message;
            case regexpTag2:
            case stringTag2:
              return object == other + "";
            case mapTag2:
              var convert = mapToArray;
            case setTag2:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag2:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index2 = objLength;
          while (index2--) {
            var key = objProps[index2];
            if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index2 < objLength) {
            key = objProps[index2];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined$12 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString2(overRest2(func, undefined$12, flatten2), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn2, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty2.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data2 = array[length], otherFunc = data2.func;
            if (otherFunc == null || otherFunc == func) {
              return data2.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash2.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData2(map2, key) {
          var data2 = map2.__data__;
          return isKeyable2(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative2(object, key) {
          var value = getValue2(object, key);
          return baseIsNative2(value) ? value : undefined$12;
        }
        function getRawTag2(value) {
          var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
          try {
            value[symToStringTag2] = undefined$12;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString2.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag2] = tag;
            } else {
              delete value[symToStringTag2];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable2.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype2(object);
          }
          return result2;
        };
        var getTag = baseGetTag2;
        if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag(new Map2()) != mapTag2 || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag2 || WeakMap2 && getTag(new WeakMap2()) != weakMapTag2) {
          getTag = function(value) {
            var result2 = baseGetTag2(value), Ctor = result2 == objectTag2 ? value.constructor : undefined$12, ctorString = Ctor ? toSource2(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag2;
                case mapCtorString:
                  return mapTag2;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag2;
                case weakMapCtorString:
                  return weakMapTag2;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index2 = -1, length = transforms.length;
          while (++index2 < length) {
            var data2 = transforms[index2], size3 = data2.size;
            switch (data2.type) {
              case "drop":
                start += size3;
                break;
              case "dropRight":
                end -= size3;
                break;
              case "take":
                end = nativeMin(end, start + size3);
                break;
              case "takeRight":
                start = nativeMax2(start, end - size3);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match2 = source.match(reWrapDetails);
          return match2 ? match2[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index2 = -1, length = path.length, result2 = false;
          while (++index2 < length) {
            var key = toKey(path[index2]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index2 != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength2(length) && isIndex2(key, length) && (isArray2(object) || isArguments2(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject2(object) {
          return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate2(getPrototype2(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag2:
              return cloneArrayBuffer2(object);
            case boolTag2:
            case dateTag2:
              return new Ctor(+object);
            case dataViewTag2:
              return cloneDataView(object, isDeep);
            case float32Tag2:
            case float64Tag2:
            case int8Tag2:
            case int16Tag2:
            case int32Tag2:
            case uint8Tag2:
            case uint8ClampedTag2:
            case uint16Tag2:
            case uint32Tag2:
              return cloneTypedArray2(object, isDeep);
            case mapTag2:
              return new Ctor();
            case numberTag2:
            case stringTag2:
              return new Ctor(object);
            case regexpTag2:
              return cloneRegExp(object);
            case setTag2:
              return new Ctor();
            case symbolTag2:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray2(value) || isArguments2(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex2(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER2 : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall2(value, index2, object) {
          if (!isObject2(object)) {
            return false;
          }
          var type = typeof index2;
          if (type == "number" ? isArrayLike2(object) && isIndex2(index2, object.length) : type == "string" && index2 in object) {
            return eq2(object[index2], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray2(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable2(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash2[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data2 = getData(other);
          return !!data2 && func === data2[0];
        }
        function isMasked2(func) {
          return !!maskSrcKey2 && maskSrcKey2 in func;
        }
        var isMaskable = coreJsData2 ? isFunction2 : stubFalse2;
        function isPrototype2(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined$12 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data2, source) {
          var bitmask = data2[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data2[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data2;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data2[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data2[3];
            data2[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data2[4] = partials ? replaceHolders(data2[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data2[5];
            data2[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data2[6] = partials ? replaceHolders(data2[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data2[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data2[8] = data2[8] == null ? source[8] : nativeMin(data2[8], source[8]);
          }
          if (data2[9] == null) {
            data2[9] = source[9];
          }
          data2[0] = source[0];
          data2[1] = newBitmask;
          return data2;
        }
        function nativeKeysIn2(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString2(value) {
          return nativeObjectToString2.call(value);
        }
        function overRest2(func, start, transform2) {
          start = nativeMax2(start === undefined$12 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index2 = -1, length = nativeMax2(args.length - start, 0), array = Array2(length);
            while (++index2 < length) {
              array[index2] = args[start + index2];
            }
            index2 = -1;
            var otherArgs = Array2(start + 1);
            while (++index2 < start) {
              otherArgs[index2] = args[index2];
            }
            otherArgs[start] = transform2(array);
            return apply2(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice2(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray2(array);
          while (length--) {
            var index2 = indexes[length];
            array[length] = isIndex2(index2, arrLength) ? oldArray[index2] : undefined$12;
          }
          return array;
        }
        function safeGet2(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut2(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root2.setTimeout(func, wait);
        };
        var setToString2 = shortOut2(baseSetToString2);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString2(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut2(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow2(), remaining = HOT_SPAN2 - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT2) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined$12, arguments);
          };
        }
        function shuffleSelf(array, size3) {
          var index2 = -1, length = array.length, lastIndex = length - 1;
          size3 = size3 === undefined$12 ? length : size3;
          while (++index2 < size3) {
            var rand = baseRandom(index2, lastIndex), value = array[rand];
            array[rand] = array[index2];
            array[index2] = value;
          }
          array.length = size3;
          return array;
        }
        var stringToPath2 = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName2, function(match2, number, quote2, subString) {
            result2.push(quote2 ? subString.replace(reEscapeChar2, "$1") : number || match2);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol2(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
        }
        function toSource2(func) {
          if (func != null) {
            try {
              return funcToString2.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray2(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size3, guard) {
          if (guard ? isIterateeCall2(array, size3, guard) : size3 === undefined$12) {
            size3 = 1;
          } else {
            size3 = nativeMax2(toInteger(size3), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size3 < 1) {
            return [];
          }
          var index2 = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size3));
          while (index2 < length) {
            result2[resIndex++] = baseSlice2(array, index2, index2 += size3);
          }
          return result2;
        }
        function compact2(array) {
          var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array[index2];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index2 = length;
          while (index2--) {
            args[index2 - 1] = arguments[index2];
          }
          return arrayPush(isArray2(array) ? copyArray2(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest2(function(array, values2) {
          return isArrayLikeObject2(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject2, true)) : [];
        });
        var differenceBy = baseRest2(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject2(iteratee2)) {
            iteratee2 = undefined$12;
          }
          return isArrayLikeObject2(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject2, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest2(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject2(comparator)) {
            comparator = undefined$12;
          }
          return isArrayLikeObject2(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject2, true), undefined$12, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$12 ? 1 : toInteger(n);
          return baseSlice2(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$12 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice2(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall2(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex2(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax2(length + index2, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index2);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = length - 1;
          if (fromIndex !== undefined$12) {
            index2 = toInteger(fromIndex);
            index2 = fromIndex < 0 ? nativeMax2(length + index2, 0) : nativeMin(index2, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index2, true);
        }
        function flatten2(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY2) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined$12 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index2 = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index2 < length) {
            var pair = pairs[index2];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined$12;
        }
        function indexOf2(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax2(length + index2, 0);
          }
          return baseIndexOf(array, value, index2);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice2(array, 0, -1) : [];
        }
        var intersection = baseRest2(function(arrays) {
          var mapped = arrayMap2(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest2(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined$12;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest2(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined$12;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$12, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined$12;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = length;
          if (fromIndex !== undefined$12) {
            index2 = toInteger(fromIndex);
            index2 = index2 < 0 ? nativeMax2(length + index2, 0) : nativeMin(index2, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index2) : baseFindIndex(array, baseIsNaN, index2, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined$12;
        }
        var pull = baseRest2(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$12, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap2(indexes, function(index2) {
            return isIndex2(index2, length) ? +index2 : index2;
          }).sort(compareAscending));
          return result2;
        });
        function remove2(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index2 = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index2 < length) {
            var value = array[index2];
            if (predicate(value, index2, array)) {
              result2.push(value);
              indexes.push(index2);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice2(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall2(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined$12 ? length : toInteger(end);
          }
          return baseSlice2(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index2 = baseSortedIndex(array, value);
            if (index2 < length && eq2(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index2 = baseSortedIndex(array, value, true) - 1;
            if (eq2(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice2(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined$12 ? 1 : toInteger(n);
          return baseSlice2(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$12 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice2(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest2(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject2, true));
        });
        var unionBy = baseRest2(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject2(iteratee2)) {
            iteratee2 = undefined$12;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject2, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest2(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$12;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject2, true), undefined$12, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined$12;
          return array && array.length ? baseUniq(array, undefined$12, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject2(group)) {
              length = nativeMax2(group.length, length);
              return true;
            }
          });
          return baseTimes2(length, function(index2) {
            return arrayMap2(array, baseProperty(index2));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap2(result2, function(group) {
            return apply2(iteratee2, undefined$12, group);
          });
        }
        var without = baseRest2(function(array, values2) {
          return isArrayLikeObject2(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest2(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject2));
        });
        var xorBy = baseRest2(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject2(iteratee2)) {
            iteratee2 = undefined$12;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject2), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest2(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$12;
          return baseXor(arrayFilter(arrays, isArrayLikeObject2), undefined$12, comparator);
        });
        var zip = baseRest2(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue2);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest2(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$12;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$12;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash2(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex2(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined$12
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined$12);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined$12) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined$12 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined$12;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined$12
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue2(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray2(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall2(collection, predicate, guard)) {
            predicate = undefined$12;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find2 = createFind(findIndex2);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY2);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined$12 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach2(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue2(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike2(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax2(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest2(function(collection, path, args) {
          var index2 = -1, isFunc = typeof path == "function", result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index2] = isFunc ? apply2(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue2(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray2(collection) ? arrayMap2 : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray2(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined$12 : orders;
          if (!isArray2(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray2(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall2(collection, n, guard) : n === undefined$12) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray2(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size2(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike2(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag2 || tag == setTag2) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray2(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall2(collection, predicate, guard)) {
            predicate = undefined$12;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest2(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall2(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall2(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root2.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined$12 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined$12, undefined$12, undefined$12, undefined$12, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined$12;
            }
            return result2;
          };
        }
        var bind2 = baseRest2(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind2));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest2(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined$12 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$12, undefined$12, undefined$12, undefined$12, undefined$12, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined$12 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$12, undefined$12, undefined$12, undefined$12, undefined$12, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber2(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax2(toNumber2(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined$12;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined$12 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined$12;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined$12;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined$12) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined$12;
          }
          function flush() {
            return timerId === undefined$12 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined$12) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined$12) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest2(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest2(function(func, wait, args) {
          return baseDelay(func, toNumber2(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache2)();
          return memoized;
        }
        memoize.Cache = MapCache2;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap2(transforms[0], baseUnary2(getIteratee())) : arrayMap2(baseFlatten(transforms, 1), baseUnary2(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest2(function(args) {
            var index2 = -1, length = nativeMin(args.length, funcsLength);
            while (++index2 < length) {
              args[index2] = transforms[index2].call(this, args[index2]);
            }
            return apply2(func, this, args);
          });
        });
        var partial = baseRest2(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined$12, partials, holders);
        });
        var partialRight = baseRest2(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$12, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined$12, undefined$12, undefined$12, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined$12 ? start : toInteger(start);
          return baseRest2(func, start);
        }
        function spread2(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax2(toInteger(start), 0);
          return baseRest2(function(args) {
            var array = args[start], otherArgs = castSlice2(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply2(func, this, otherArgs);
          });
        }
        function throttle2(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray2(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$12;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$12;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq2(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments2 = baseIsArguments2(function() {
          return arguments;
        }()) ? baseIsArguments2 : function(value) {
          return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
        };
        var isArray2 = Array2.isArray;
        var isArrayBuffer2 = nodeIsArrayBuffer ? baseUnary2(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike2(value) {
          return value != null && isLength2(value.length) && !isFunction2(value);
        }
        function isArrayLikeObject2(value) {
          return isObjectLike2(value) && isArrayLike2(value);
        }
        function isBoolean2(value) {
          return value === true || value === false || isObjectLike2(value) && baseGetTag2(value) == boolTag2;
        }
        var isBuffer2 = nativeIsBuffer2 || stubFalse2;
        var isDate2 = nodeIsDate ? baseUnary2(nodeIsDate) : baseIsDate;
        function isElement2(value) {
          return isObjectLike2(value) && value.nodeType === 1 && !isPlainObject2(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike2(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray2(value) || isArguments2(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag2 || tag == setTag2) {
            return !value.size;
          }
          if (isPrototype2(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty2.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$12;
          var result2 = customizer ? customizer(value, other) : undefined$12;
          return result2 === undefined$12 ? baseIsEqual(value, other, undefined$12, customizer) : !!result2;
        }
        function isError2(value) {
          if (!isObjectLike2(value)) {
            return false;
          }
          var tag = baseGetTag2(value);
          return tag == errorTag2 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
        }
        function isFinite2(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction2(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag2(value);
          return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength2(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
        }
        function isObject2(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike2(value) {
          return value != null && typeof value == "object";
        }
        var isMap2 = nodeIsMap ? baseUnary2(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$12;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber2(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative2(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike2(value) && baseGetTag2(value) == numberTag2;
        }
        function isPlainObject2(value) {
          if (!isObjectLike2(value) || baseGetTag2(value) != objectTag2) {
            return false;
          }
          var proto = getPrototype2(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString2;
        }
        var isRegExp2 = nodeIsRegExp ? baseUnary2(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER2 && value <= MAX_SAFE_INTEGER2;
        }
        var isSet2 = nodeIsSet ? baseUnary2(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray2(value) && isObjectLike2(value) && baseGetTag2(value) == stringTag2;
        }
        function isSymbol2(value) {
          return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag2;
        }
        var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
        function isUndefined2(value) {
          return value === undefined$12;
        }
        function isWeakMap2(value) {
          return isObjectLike2(value) && getTag(value) == weakMapTag2;
        }
        function isWeakSet2(value) {
          return isObjectLike2(value) && baseGetTag2(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike2(value)) {
            return isString2(value) ? stringToArray2(value) : copyArray2(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag2 ? mapToArray : tag == setTag2 ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber2(value);
          if (value === INFINITY2 || value === -INFINITY2) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber2(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject2(value) {
          return copyObject2(value, keysIn2(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER2, MAX_SAFE_INTEGER2) : value === 0 ? value : 0;
        }
        function toString2(value) {
          return value == null ? "" : baseToString2(value);
        }
        var assign2 = createAssigner2(function(object, source) {
          if (isPrototype2(source) || isArrayLike2(source)) {
            copyObject2(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              assignValue2(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner2(function(object, source) {
          copyObject2(source, keysIn2(source), object);
        });
        var assignInWith = createAssigner2(function(object, source, srcIndex, customizer) {
          copyObject2(source, keysIn2(source), object, customizer);
        });
        var assignWith = createAssigner2(function(object, source, srcIndex, customizer) {
          copyObject2(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate2(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults2 = baseRest2(function(object, sources) {
          object = Object2(object);
          var index2 = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined$12;
          if (guard && isIterateeCall2(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index2 < length) {
            var source = sources[index2];
            var props = keysIn2(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined$12 || eq2(value, objectProto2[key]) && !hasOwnProperty2.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest2(function(args) {
          args.push(undefined$12, customDefaultsMerge);
          return apply2(mergeWith, undefined$12, args);
        });
        function findKey2(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor2(object, getIteratee(iteratee2, 3), keysIn2);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn2);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn2(object));
        }
        function get2(object, path, defaultValue) {
          var result2 = object == null ? undefined$12 : baseGet(object, path);
          return result2 === undefined$12 ? defaultValue : result2;
        }
        function has2(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString2.call(value);
          }
          result2[value] = key;
        }, constant2(identity2));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString2.call(value);
          }
          if (hasOwnProperty2.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest2(baseInvoke);
        function keys(object) {
          return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys(object);
        }
        function keysIn2(object) {
          return isArrayLike2(object) ? arrayLikeKeys2(object, true) : baseKeysIn2(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue2(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue2(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge2 = createAssigner2(function(object, source, srcIndex) {
          baseMerge2(object, source, srcIndex);
        });
        var mergeWith = createAssigner2(function(object, source, srcIndex, customizer) {
          baseMerge2(object, source, srcIndex, customizer);
        });
        var omit2 = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap2(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject2(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap2(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index2 = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined$12;
          }
          while (++index2 < length) {
            var value = object == null ? undefined$12 : object[toKey(path[index2])];
            if (value === undefined$12) {
              index2 = length;
              value = defaultValue;
            }
            object = isFunction2(value) ? value.call(object) : value;
          }
          return object;
        }
        function set2(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$12;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn2);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray2(object), isArrLike = isArr || isBuffer2(object) || isTypedArray2(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object)) {
              accumulator = isFunction2(Ctor) ? baseCreate2(getPrototype2(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index2, object2) {
            return iteratee2(accumulator, value, index2, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$12;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn2(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined$12) {
            upper = lower;
            lower = undefined$12;
          }
          if (upper !== undefined$12) {
            upper = toNumber2(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined$12) {
            lower = toNumber2(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber2(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined$12) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber2(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall2(lower, upper, floating)) {
            upper = floating = undefined$12;
          }
          if (floating === undefined$12) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined$12;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined$12;
            }
          }
          if (lower === undefined$12 && upper === undefined$12) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined$12) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index2) {
          word = word.toLowerCase();
          return result2 + (index2 ? capitalize2(word) : word);
        });
        function capitalize2(string) {
          return upperFirst2(toString2(string).toLowerCase());
        }
        function deburr(string) {
          string = toString2(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString2(string);
          target = baseToString2(target);
          var length = string.length;
          position = position === undefined$12 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape2(string) {
          string = toString2(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString2(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar2, "\\$&") : string;
        }
        var kebabCase2 = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst2("toLowerCase");
        function pad(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString2(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall2(string, n, guard) : n === undefined$12) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString2(string), n);
        }
        function replace2() {
          var args = arguments, string = toString2(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall2(string, separator, limit)) {
            separator = limit = undefined$12;
          }
          limit = limit === undefined$12 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString2(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp2(separator))) {
            separator = baseToString2(separator);
            if (!separator && hasUnicode2(string)) {
              return castSlice2(stringToArray2(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + upperFirst2(word);
        });
        function startsWith(string, target, position) {
          string = toString2(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString2(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash2.templateSettings;
          if (guard && isIterateeCall2(string, options, guard)) {
            options = undefined$12;
          }
          string = toString2(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
          var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index2 = offset + match2.length;
            return match2;
          });
          source += "';\n";
          var variable = hasOwnProperty2.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$12, importsValues);
          });
          result2.source = source;
          if (isError2(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString2(value).toLowerCase();
        }
        function toUpper(value) {
          return toString2(value).toUpperCase();
        }
        function trim2(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$12)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString2(chars))) {
            return string;
          }
          var strSymbols = stringToArray2(string), chrSymbols = stringToArray2(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice2(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$12)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString2(chars))) {
            return string;
          }
          var strSymbols = stringToArray2(string), end = charsEndIndex(strSymbols, stringToArray2(chars)) + 1;
          return castSlice2(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined$12)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString2(chars))) {
            return string;
          }
          var strSymbols = stringToArray2(string), start = charsStartIndex(strSymbols, stringToArray2(chars));
          return castSlice2(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString2(options.omission) : omission;
          }
          string = toString2(string);
          var strLength = string.length;
          if (hasUnicode2(string)) {
            var strSymbols = stringToArray2(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice2(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined$12) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp2(separator)) {
            if (string.slice(end).search(separator)) {
              var match2, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match2 = separator.exec(substring)) {
                var newEnd = match2.index;
              }
              result2 = result2.slice(0, newEnd === undefined$12 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString2(separator), end) != end) {
            var index2 = result2.lastIndexOf(separator);
            if (index2 > -1) {
              result2 = result2.slice(0, index2);
            }
          }
          return result2 + omission;
        }
        function unescape2(string) {
          string = toString2(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toUpperCase();
        });
        var upperFirst2 = createCaseFirst2("toUpperCase");
        function words(string, pattern, guard) {
          string = toString2(string);
          pattern = guard ? undefined$12 : pattern;
          if (pattern === undefined$12) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest2(function(func, args) {
          try {
            return apply2(func, undefined$12, args);
          } catch (e) {
            return isError2(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue2(object, key, bind2(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap2(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest2(function(args) {
            var index2 = -1;
            while (++index2 < length) {
              var pair = pairs[index2];
              if (apply2(pair[0], this, args)) {
                return apply2(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant2(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity2(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest2(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest2(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray2(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root2._ === this) {
            root2._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest2(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap2);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined$12 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse2() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER2) {
            return [];
          }
          var index2 = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes2(length, iteratee2);
          while (++index2 < n) {
            iteratee2(index2);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray2(value)) {
            return arrayMap2(value, toKey);
          }
          return isSymbol2(value) ? [value] : copyArray2(stringToPath2(toString2(value)));
        }
        function uniqueId(prefix2) {
          var id = ++idCounter;
          return toString2(prefix2) + id;
        }
        var add2 = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity2, baseGt) : undefined$12;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$12;
        }
        function mean(array) {
          return baseMean(array, identity2);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity2, baseLt) : undefined$12;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$12;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity2) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash2.after = after;
        lodash2.ary = ary;
        lodash2.assign = assign2;
        lodash2.assignIn = assignIn;
        lodash2.assignInWith = assignInWith;
        lodash2.assignWith = assignWith;
        lodash2.at = at;
        lodash2.before = before;
        lodash2.bind = bind2;
        lodash2.bindAll = bindAll;
        lodash2.bindKey = bindKey;
        lodash2.castArray = castArray;
        lodash2.chain = chain;
        lodash2.chunk = chunk;
        lodash2.compact = compact2;
        lodash2.concat = concat;
        lodash2.cond = cond;
        lodash2.conforms = conforms;
        lodash2.constant = constant2;
        lodash2.countBy = countBy;
        lodash2.create = create;
        lodash2.curry = curry;
        lodash2.curryRight = curryRight;
        lodash2.debounce = debounce;
        lodash2.defaults = defaults2;
        lodash2.defaultsDeep = defaultsDeep;
        lodash2.defer = defer;
        lodash2.delay = delay;
        lodash2.difference = difference;
        lodash2.differenceBy = differenceBy;
        lodash2.differenceWith = differenceWith;
        lodash2.drop = drop;
        lodash2.dropRight = dropRight;
        lodash2.dropRightWhile = dropRightWhile;
        lodash2.dropWhile = dropWhile;
        lodash2.fill = fill;
        lodash2.filter = filter;
        lodash2.flatMap = flatMap;
        lodash2.flatMapDeep = flatMapDeep;
        lodash2.flatMapDepth = flatMapDepth;
        lodash2.flatten = flatten2;
        lodash2.flattenDeep = flattenDeep;
        lodash2.flattenDepth = flattenDepth;
        lodash2.flip = flip;
        lodash2.flow = flow;
        lodash2.flowRight = flowRight;
        lodash2.fromPairs = fromPairs;
        lodash2.functions = functions;
        lodash2.functionsIn = functionsIn;
        lodash2.groupBy = groupBy;
        lodash2.initial = initial;
        lodash2.intersection = intersection;
        lodash2.intersectionBy = intersectionBy;
        lodash2.intersectionWith = intersectionWith;
        lodash2.invert = invert;
        lodash2.invertBy = invertBy;
        lodash2.invokeMap = invokeMap;
        lodash2.iteratee = iteratee;
        lodash2.keyBy = keyBy;
        lodash2.keys = keys;
        lodash2.keysIn = keysIn2;
        lodash2.map = map;
        lodash2.mapKeys = mapKeys;
        lodash2.mapValues = mapValues;
        lodash2.matches = matches;
        lodash2.matchesProperty = matchesProperty;
        lodash2.memoize = memoize;
        lodash2.merge = merge2;
        lodash2.mergeWith = mergeWith;
        lodash2.method = method;
        lodash2.methodOf = methodOf;
        lodash2.mixin = mixin;
        lodash2.negate = negate;
        lodash2.nthArg = nthArg;
        lodash2.omit = omit2;
        lodash2.omitBy = omitBy;
        lodash2.once = once;
        lodash2.orderBy = orderBy;
        lodash2.over = over;
        lodash2.overArgs = overArgs;
        lodash2.overEvery = overEvery;
        lodash2.overSome = overSome;
        lodash2.partial = partial;
        lodash2.partialRight = partialRight;
        lodash2.partition = partition;
        lodash2.pick = pick;
        lodash2.pickBy = pickBy;
        lodash2.property = property;
        lodash2.propertyOf = propertyOf;
        lodash2.pull = pull;
        lodash2.pullAll = pullAll;
        lodash2.pullAllBy = pullAllBy;
        lodash2.pullAllWith = pullAllWith;
        lodash2.pullAt = pullAt;
        lodash2.range = range;
        lodash2.rangeRight = rangeRight;
        lodash2.rearg = rearg;
        lodash2.reject = reject;
        lodash2.remove = remove2;
        lodash2.rest = rest;
        lodash2.reverse = reverse;
        lodash2.sampleSize = sampleSize;
        lodash2.set = set2;
        lodash2.setWith = setWith;
        lodash2.shuffle = shuffle;
        lodash2.slice = slice2;
        lodash2.sortBy = sortBy;
        lodash2.sortedUniq = sortedUniq;
        lodash2.sortedUniqBy = sortedUniqBy;
        lodash2.split = split;
        lodash2.spread = spread2;
        lodash2.tail = tail;
        lodash2.take = take;
        lodash2.takeRight = takeRight;
        lodash2.takeRightWhile = takeRightWhile;
        lodash2.takeWhile = takeWhile;
        lodash2.tap = tap;
        lodash2.throttle = throttle2;
        lodash2.thru = thru;
        lodash2.toArray = toArray;
        lodash2.toPairs = toPairs;
        lodash2.toPairsIn = toPairsIn;
        lodash2.toPath = toPath;
        lodash2.toPlainObject = toPlainObject2;
        lodash2.transform = transform;
        lodash2.unary = unary;
        lodash2.union = union;
        lodash2.unionBy = unionBy;
        lodash2.unionWith = unionWith;
        lodash2.uniq = uniq;
        lodash2.uniqBy = uniqBy;
        lodash2.uniqWith = uniqWith;
        lodash2.unset = unset;
        lodash2.unzip = unzip;
        lodash2.unzipWith = unzipWith;
        lodash2.update = update;
        lodash2.updateWith = updateWith;
        lodash2.values = values;
        lodash2.valuesIn = valuesIn;
        lodash2.without = without;
        lodash2.words = words;
        lodash2.wrap = wrap;
        lodash2.xor = xor;
        lodash2.xorBy = xorBy;
        lodash2.xorWith = xorWith;
        lodash2.zip = zip;
        lodash2.zipObject = zipObject;
        lodash2.zipObjectDeep = zipObjectDeep;
        lodash2.zipWith = zipWith;
        lodash2.entries = toPairs;
        lodash2.entriesIn = toPairsIn;
        lodash2.extend = assignIn;
        lodash2.extendWith = assignInWith;
        mixin(lodash2, lodash2);
        lodash2.add = add2;
        lodash2.attempt = attempt;
        lodash2.camelCase = camelCase;
        lodash2.capitalize = capitalize2;
        lodash2.ceil = ceil;
        lodash2.clamp = clamp;
        lodash2.clone = clone;
        lodash2.cloneDeep = cloneDeep;
        lodash2.cloneDeepWith = cloneDeepWith;
        lodash2.cloneWith = cloneWith;
        lodash2.conformsTo = conformsTo;
        lodash2.deburr = deburr;
        lodash2.defaultTo = defaultTo;
        lodash2.divide = divide;
        lodash2.endsWith = endsWith;
        lodash2.eq = eq2;
        lodash2.escape = escape2;
        lodash2.escapeRegExp = escapeRegExp;
        lodash2.every = every;
        lodash2.find = find2;
        lodash2.findIndex = findIndex2;
        lodash2.findKey = findKey2;
        lodash2.findLast = findLast;
        lodash2.findLastIndex = findLastIndex;
        lodash2.findLastKey = findLastKey;
        lodash2.floor = floor;
        lodash2.forEach = forEach2;
        lodash2.forEachRight = forEachRight;
        lodash2.forIn = forIn;
        lodash2.forInRight = forInRight;
        lodash2.forOwn = forOwn;
        lodash2.forOwnRight = forOwnRight;
        lodash2.get = get2;
        lodash2.gt = gt;
        lodash2.gte = gte;
        lodash2.has = has2;
        lodash2.hasIn = hasIn;
        lodash2.head = head;
        lodash2.identity = identity2;
        lodash2.includes = includes;
        lodash2.indexOf = indexOf2;
        lodash2.inRange = inRange;
        lodash2.invoke = invoke;
        lodash2.isArguments = isArguments2;
        lodash2.isArray = isArray2;
        lodash2.isArrayBuffer = isArrayBuffer2;
        lodash2.isArrayLike = isArrayLike2;
        lodash2.isArrayLikeObject = isArrayLikeObject2;
        lodash2.isBoolean = isBoolean2;
        lodash2.isBuffer = isBuffer2;
        lodash2.isDate = isDate2;
        lodash2.isElement = isElement2;
        lodash2.isEmpty = isEmpty;
        lodash2.isEqual = isEqual;
        lodash2.isEqualWith = isEqualWith;
        lodash2.isError = isError2;
        lodash2.isFinite = isFinite2;
        lodash2.isFunction = isFunction2;
        lodash2.isInteger = isInteger;
        lodash2.isLength = isLength2;
        lodash2.isMap = isMap2;
        lodash2.isMatch = isMatch;
        lodash2.isMatchWith = isMatchWith;
        lodash2.isNaN = isNaN2;
        lodash2.isNative = isNative;
        lodash2.isNil = isNil;
        lodash2.isNull = isNull;
        lodash2.isNumber = isNumber2;
        lodash2.isObject = isObject2;
        lodash2.isObjectLike = isObjectLike2;
        lodash2.isPlainObject = isPlainObject2;
        lodash2.isRegExp = isRegExp2;
        lodash2.isSafeInteger = isSafeInteger;
        lodash2.isSet = isSet2;
        lodash2.isString = isString2;
        lodash2.isSymbol = isSymbol2;
        lodash2.isTypedArray = isTypedArray2;
        lodash2.isUndefined = isUndefined2;
        lodash2.isWeakMap = isWeakMap2;
        lodash2.isWeakSet = isWeakSet2;
        lodash2.join = join;
        lodash2.kebabCase = kebabCase2;
        lodash2.last = last;
        lodash2.lastIndexOf = lastIndexOf;
        lodash2.lowerCase = lowerCase;
        lodash2.lowerFirst = lowerFirst;
        lodash2.lt = lt;
        lodash2.lte = lte;
        lodash2.max = max;
        lodash2.maxBy = maxBy;
        lodash2.mean = mean;
        lodash2.meanBy = meanBy;
        lodash2.min = min;
        lodash2.minBy = minBy;
        lodash2.stubArray = stubArray;
        lodash2.stubFalse = stubFalse2;
        lodash2.stubObject = stubObject;
        lodash2.stubString = stubString;
        lodash2.stubTrue = stubTrue;
        lodash2.multiply = multiply;
        lodash2.nth = nth;
        lodash2.noConflict = noConflict;
        lodash2.noop = noop;
        lodash2.now = now;
        lodash2.pad = pad;
        lodash2.padEnd = padEnd;
        lodash2.padStart = padStart;
        lodash2.parseInt = parseInt2;
        lodash2.random = random;
        lodash2.reduce = reduce;
        lodash2.reduceRight = reduceRight;
        lodash2.repeat = repeat;
        lodash2.replace = replace2;
        lodash2.result = result;
        lodash2.round = round;
        lodash2.runInContext = runInContext2;
        lodash2.sample = sample;
        lodash2.size = size2;
        lodash2.snakeCase = snakeCase;
        lodash2.some = some;
        lodash2.sortedIndex = sortedIndex;
        lodash2.sortedIndexBy = sortedIndexBy;
        lodash2.sortedIndexOf = sortedIndexOf;
        lodash2.sortedLastIndex = sortedLastIndex;
        lodash2.sortedLastIndexBy = sortedLastIndexBy;
        lodash2.sortedLastIndexOf = sortedLastIndexOf;
        lodash2.startCase = startCase;
        lodash2.startsWith = startsWith;
        lodash2.subtract = subtract;
        lodash2.sum = sum;
        lodash2.sumBy = sumBy;
        lodash2.template = template;
        lodash2.times = times;
        lodash2.toFinite = toFinite;
        lodash2.toInteger = toInteger;
        lodash2.toLength = toLength;
        lodash2.toLower = toLower;
        lodash2.toNumber = toNumber2;
        lodash2.toSafeInteger = toSafeInteger;
        lodash2.toString = toString2;
        lodash2.toUpper = toUpper;
        lodash2.trim = trim2;
        lodash2.trimEnd = trimEnd;
        lodash2.trimStart = trimStart;
        lodash2.truncate = truncate;
        lodash2.unescape = unescape2;
        lodash2.uniqueId = uniqueId;
        lodash2.upperCase = upperCase;
        lodash2.upperFirst = upperFirst2;
        lodash2.each = forEach2;
        lodash2.eachRight = forEachRight;
        lodash2.first = head;
        mixin(lodash2, function() {
          var source = {};
          baseForOwn(lodash2, function(func, methodName) {
            if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash2.VERSION = VERSION2;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash2[methodName].placeholder = lodash2;
        });
        arrayEach(["drop", "take"], function(methodName, index2) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined$12 ? 1 : nativeMax2(toInteger(n), 0);
            var result2 = this.__filtered__ && !index2 ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index2) {
          var type = index2 + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index2) {
          var takeName = "take" + (index2 ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index2) {
          var dropName = "drop" + (index2 ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity2);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest2(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined$12) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash2.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$12 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto2[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash2.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray2(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray2(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash2[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty2.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined$12, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined$12
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash2.prototype.at = wrapperAt;
        lodash2.prototype.chain = wrapperChain;
        lodash2.prototype.commit = wrapperCommit;
        lodash2.prototype.next = wrapperNext;
        lodash2.prototype.plant = wrapperPlant;
        lodash2.prototype.reverse = wrapperReverse;
        lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
        lodash2.prototype.first = lodash2.prototype.head;
        if (symIterator) {
          lodash2.prototype[symIterator] = wrapperToIterator;
        }
        return lodash2;
      };
      var _2 = runInContext();
      if (freeModule2) {
        (freeModule2.exports = _2)._ = _2;
        freeExports2._ = _2;
      } else {
        root2._ = _2;
      }
    }).call(commonjsGlobal);
  })(lodash, lodash.exports);
  var _ = lodash.exports;
  const API_RESPONSE_SUCCESS = 200;
  const API_HOST = "https://docdog.g.kuroco.app";
  function get(uri, headers = {}) {
    return axios.get(API_HOST + uri, {
      headers
    });
  }
  function post(uri, post_data = {}, headers = {}) {
    return axios.post(API_HOST + uri, JSON.stringify(post_data), {
      headers
    });
  }
  function processError(res) {
    if (!res.data) {
      return Promise.reject();
    }
    const data2 = res.data;
    if (!(data2 instanceof Object)) {
      return Promise.reject();
    }
    if (data2.validation_errors && data2.validation_errors.length > 0) {
      return Promise.reject({ validationErrors: data2.validation_errors });
    }
    if (data2.errors && data2.errors.length > 0) {
      return Promise.reject({ errors: data2.errors });
    }
    if (res.status !== API_RESPONSE_SUCCESS) {
      return Promise.reject();
    }
    return res.data;
  }
  const header_keys = {
    ACCESS_TOKEN: "X-RCMS-API-ACCESS-TOKEN"
  };
  const storage_keys = {
    REFRESH_TOKEN: "docdog.refresh_token",
    ACCESS_TOKEN: "docdog.access_token"
  };
  function isLogin(options = {
    autoLogin: true,
    anonLogin: false
  }) {
    return getAuthHeaders(options).then((headers) => {
      return header_keys.ACCESS_TOKEN in headers && headers[header_keys.ACCESS_TOKEN].length > 0;
    });
  }
  function getAuthHeaders(options = {
    autoLogin: true,
    anonLogin: false
  }) {
    const access_token = parseToken(storage_keys.ACCESS_TOKEN, fetchData(storage_keys.ACCESS_TOKEN));
    if (!access_token.value || !options.anonLogin && access_token.isPublic) {
      const token_data = {};
      let isPublic = true;
      const refresh_token = parseToken(storage_keys.REFRESH_TOKEN, fetchData(storage_keys.REFRESH_TOKEN));
      if (options.autoLogin && refresh_token.value) {
        token_data[refresh_token] = refresh_token.value;
        isPublic = false;
      } else if (!options.anonLogin) {
        return Promise.resolve({});
      }
      return getAccessToken(token_data).then((ret) => {
        storeData(storage_keys.ACCESS_TOKEN, __spreadProps(__spreadValues({}, ret.access_token), { isPublic }));
        return {
          [header_keys.ACCESS_TOKEN]: ret.access_token.value
        };
      });
    } else {
      return Promise.resolve({
        [header_keys.ACCESS_TOKEN]: access_token.value
      });
    }
  }
  function parseToken(key, token_data) {
    token_data.isPublic = token_data.isPublic && token_data.isPublic !== "false";
    if (token_data.expiresAt) {
      const expirationTimestamp = parseInt(token_data.expiresAt);
      if (expirationTimestamp <= Math.floor(Date.now() / 1e3)) {
        token_data.value = "";
        removeData(key);
      }
    }
    return token_data;
  }
  function storeData(key, value) {
    localStorage.setItem(key, lib.stringify(value));
  }
  function fetchData(key) {
    return lib.parse(localStorage.getItem(key));
  }
  function removeData(key) {
    localStorage.removeItem(key);
  }
  function doLogin({ email, password }) {
    return post("/rcms-api/3/login", { email, password }).then(processError).then((resp) => {
      if (resp.grant_token) {
        return getAccessToken({ grant_token: resp.grant_token }).then((ret) => {
          storeData(storage_keys.ACCESS_TOKEN, __spreadProps(__spreadValues({}, ret.access_token), { isPublic: false }));
          if (ret.refresh_token) {
            storeData(storage_keys.REFRESH_TOKEN, __spreadValues({}, ret.refresh_token));
          }
          return true;
        });
      } else {
        throw "Login API did not contain a grant token";
      }
    }).catch((err) => {
      let err_msg = "Error during login";
      switch (err.response.status) {
        case 401:
          err_msg = "Invalid Login ID or Password";
          break;
        case 404:
          err_msg = "The login endpoint could not be found";
          break;
      }
      return Promise.reject(err_msg);
    });
  }
  function getAccessToken({ grant_token, refresh_token }) {
    return post("/rcms-api/3/token", { grant_token, refresh_token }).then(processError).catch((err) => {
      let err_msg = "Problem fetching token";
      switch (err.response.status) {
        case 404:
          err_msg = "The token URL is invalid";
          break;
      }
      return Promise.reject(err_msg);
    });
  }
  var loginApi = {
    isLogin,
    getAuthHeaders,
    doLogin
  };
  var Login_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _sfc_main$6 = {
    extends: _sfc_main$7,
    components: {
      NButton,
      NInput
    },
    data() {
      return {
        login_id: "",
        password: ""
      };
    },
    methods: {
      login(event) {
        this.$emit("err", "");
        loginApi.doLogin({
          email: this.login_id,
          password: this.password
        }).then((login_ok) => {
          if (login_ok) {
            this.$emit("redirect", "Download");
          } else {
            this.$emit("err", "Could not login");
          }
          event.target.blur();
        }).catch((err) => {
          this.$emit("err", err);
        });
      }
    }
  };
  const _withScopeId$3 = (n) => (pushScopeId("data-v-16135dd3"), n = n(), popScopeId(), n);
  const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("h2", null, "This is a private file. Please login to download", -1));
  const _hoisted_2$2 = ["innerHTML"];
  const _hoisted_3$1 = /* @__PURE__ */ createTextVNode(" Login ID : ");
  const _hoisted_4$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
  const _hoisted_5$1 = /* @__PURE__ */ createTextVNode(" Password : ");
  const _hoisted_6$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
  const _hoisted_7$1 = /* @__PURE__ */ createTextVNode("Login");
  const _hoisted_8$1 = /* @__PURE__ */ createTextVNode("Sign Up");
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_n_input = resolveComponent("n-input");
    const _component_n_button = resolveComponent("n-button");
    return openBlock(), createElementBlock(Fragment, null, [
      _hoisted_1$3,
      _ctx.err.length > 0 ? (openBlock(), createElementBlock("p", {
        key: 0,
        class: "err",
        innerHTML: _ctx.err
      }, null, 8, _hoisted_2$2)) : createCommentVNode("", true),
      _hoisted_3$1,
      createVNode(_component_n_input, {
        type: "text",
        value: $data.login_id,
        "onUpdate:value": _cache[0] || (_cache[0] = ($event) => $data.login_id = $event)
      }, null, 8, ["value"]),
      _hoisted_4$1,
      _hoisted_5$1,
      createVNode(_component_n_input, {
        type: "password",
        value: $data.password,
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => $data.password = $event)
      }, null, 8, ["value"]),
      _hoisted_6$1,
      createVNode(_component_n_button, { onClick: $options.login }, {
        default: withCtx(() => [
          _hoisted_7$1
        ]),
        _: 1
      }, 8, ["onClick"]),
      createVNode(_component_n_button, {
        class: "signup-btn",
        href: "#",
        onClick: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.$emit("redirect", "SignUp"), ["prevent"]))
      }, {
        default: withCtx(() => [
          _hoisted_8$1
        ]),
        _: 1
      })
    ], 64);
  }
  var Login = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-16135dd3"]]);
  function doSignUp({ email, name1, name2, login_pwd }) {
    return loginApi.getAuthHeaders({
      autoLogin: true,
      anonLogin: true
    }).then((headers) => post("/rcms-api/3/member/new", { email, name1, name2, login_pwd }, headers).then(processError).catch((err) => {
      let err_msg = "Error during signup";
      if (err.response.data.errors) {
        err_msg = err.response.data.errors.reduce((carry, obj) => {
          if (carry != "") {
            carry += "<br/>";
          }
          return obj.field ? carry.concat(obj.field + ":" + obj.code) : carry.concat(obj.message);
        }, "");
      } else {
        switch (err.response.status) {
          case 404:
            err_msg = "The signup endpoint could not be found";
            break;
        }
      }
      return Promise.reject(err_msg);
    }));
  }
  var memberApi = {
    doSignUp
  };
  var SignUp_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _sfc_main$5 = {
    extends: _sfc_main$7,
    components: {
      NButton,
      NInput
    },
    data() {
      return {
        email: "",
        name1: "",
        name2: "",
        login_pwd: ""
      };
    },
    methods: {
      signup(event) {
        this.$emit("err", "");
        memberApi.doSignUp({
          email: this.email,
          name1: this.name1,
          name2: this.name2,
          login_pwd: this.login_pwd
        }).then((resp) => {
          loginApi.doLogin({
            email: this.email,
            password: this.login_pwd
          }).then(() => {
            this.$emit("redirect", "Download");
          }).catch((err) => {
            this.$emit("err", err);
          });
        }).catch((err) => {
          this.$emit("err", err);
        });
      }
    }
  };
  const _withScopeId$2 = (n) => (pushScopeId("data-v-aa052ece"), n = n(), popScopeId(), n);
  const _hoisted_1$2 = ["innerHTML"];
  const _hoisted_2$1 = /* @__PURE__ */ createTextVNode(" Email : ");
  const _hoisted_3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
  const _hoisted_4 = /* @__PURE__ */ createTextVNode(" Name1 : ");
  const _hoisted_5 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
  const _hoisted_6 = /* @__PURE__ */ createTextVNode(" Name2 : ");
  const _hoisted_7 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
  const _hoisted_8 = /* @__PURE__ */ createTextVNode(" Password : ");
  const _hoisted_9 = /* @__PURE__ */ createTextVNode("Sign Up");
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_n_input = resolveComponent("n-input");
    const _component_n_button = resolveComponent("n-button");
    return openBlock(), createElementBlock(Fragment, null, [
      _ctx.err.length > 0 ? (openBlock(), createElementBlock("p", {
        key: 0,
        class: "err",
        innerHTML: _ctx.err
      }, null, 8, _hoisted_1$2)) : createCommentVNode("", true),
      _hoisted_2$1,
      createVNode(_component_n_input, {
        type: "text",
        value: $data.email,
        "onUpdate:value": _cache[0] || (_cache[0] = ($event) => $data.email = $event)
      }, null, 8, ["value"]),
      _hoisted_3,
      _hoisted_4,
      createVNode(_component_n_input, {
        type: "text",
        value: $data.name1,
        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => $data.name1 = $event)
      }, null, 8, ["value"]),
      _hoisted_5,
      _hoisted_6,
      createVNode(_component_n_input, {
        type: "text",
        value: $data.name2,
        "onUpdate:value": _cache[2] || (_cache[2] = ($event) => $data.name2 = $event)
      }, null, 8, ["value"]),
      _hoisted_7,
      _hoisted_8,
      createVNode(_component_n_input, {
        type: "password",
        "show-password-on": "mousedown",
        placeholder: "Password",
        value: $data.login_pwd,
        "onUpdate:value": _cache[3] || (_cache[3] = ($event) => $data.login_pwd = $event)
      }, null, 8, ["value"]),
      createVNode(_component_n_button, { onClick: $options.signup }, {
        default: withCtx(() => [
          _hoisted_9
        ]),
        _: 1
      }, 8, ["onClick"])
    ], 64);
  }
  var SignUp = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-aa052ece"]]);
  function getDocumentData(id, isPublic = false) {
    return loginApi.getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic
    }).then((headers) => get("/rcms-api/3/file/" + id, headers).then(processError).catch((err) => {
      let err_msg = "Problem fetching document data";
      switch (err.response.status) {
        case 401:
          err_msg = "Unauthorized request";
          break;
        case 404:
          err_msg = "The document with id <" + id + "> could not be found";
          break;
      }
      return Promise.reject(err_msg);
    }));
  }
  var docsApi = {
    getDocumentData
  };
  var Download_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _sfc_main$4 = {
    extends: _sfc_main$7,
    props: {
      doc_id: {
        type: String,
        default: ""
      },
      isPublic: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      docsApi.getDocumentData(this.doc_id, this.isPublic).then((resp) => {
        this.download(resp.details.file.url, "a");
        this.$emit("close");
      }).catch((err) => {
        this.$emit("err", err);
      });
    },
    methods: {
      download(url, name) {
        const link = document.createElement("a");
        link.download = name;
        link.href = url;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  const _withScopeId$1 = (n) => (pushScopeId("data-v-3575c7e0"), n = n(), popScopeId(), n);
  const _hoisted_1$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("h2", null, "Please wait ...", -1));
  const _hoisted_2 = ["innerHTML"];
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock(Fragment, null, [
      _hoisted_1$1,
      _ctx.err.length > 0 ? (openBlock(), createElementBlock("p", {
        key: 0,
        class: "err",
        innerHTML: _ctx.err
      }, null, 8, _hoisted_2)) : createCommentVNode("", true)
    ], 64);
  }
  var Download = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-3575c7e0"]]);
  var Error_vue_vue_type_style_index_0_scoped_true_lang = "";
  const _sfc_main$3 = {
    extends: _sfc_main$7
  };
  const _withScopeId = (n) => (pushScopeId("data-v-1fde12da"), n = n(), popScopeId(), n);
  const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", null, "Error", -1));
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock(Fragment, null, [
      _hoisted_1,
      createBaseVNode("p", null, toDisplayString(_ctx.err), 1)
    ], 64);
  }
  var Error$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-1fde12da"]]);
  const _sfc_main$2 = {
    extends: _sfc_main$7
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("h2", null, "Loading ...");
  }
  var Loading = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  const pages = {
    Login,
    SignUp,
    Download,
    Loading,
    Error: Error$1
  };
  const _sfc_main$1 = {
    components: pages,
    props: {
      node_params: {
        type: Object,
        default: () => ({})
      },
      current_page: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        p_err_msg: ""
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      err: {
        get() {
          if (!this.current_page in pages) {
            return "Page component <" + this.current_page + "> does not exist";
          }
          switch (this.current_page) {
            case "Download":
              if (!this.node_params || !this.node_params.id) {
                return "Document id is undefined";
              }
          }
          return this.p_err_msg;
        },
        set(msg) {
          this.p_err_msg = msg;
        }
      },
      current_page_comp() {
        if (this.current_page in pages) {
          return pages[this.current_page];
        } else {
          return pages["Error"];
        }
      },
      comp_props() {
        const page_params = {};
        if (this.current_page == "Download" && this.node_params) {
          if (this.node_params.id) {
            page_params.doc_id = this.node_params.id;
          }
          if (this.node_params.public) {
            page_params.isPublic = true;
          }
        }
        return __spreadProps(__spreadValues({}, page_params), { err: this.err });
      }
    },
    methods: {
      init() {
        this.setCurrentPage("Loading");
        loginApi.isLogin({
          autoLogin: true,
          anonLogin: this.node_params.public || false
        }).then((isLogin2) => {
          this.setCurrentPage(isLogin2 ? "Download" : "Login");
        });
      },
      setCurrentPage(newPage) {
        this.$emit("update:current_page", newPage);
      },
      onRedirect(target) {
        this.setCurrentPage(target);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createBlock(resolveDynamicComponent($options.current_page_comp), mergeProps($options.comp_props, {
      onErr: _cache[0] || (_cache[0] = ($event) => $options.err = $event),
      onClose: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("close")),
      onRedirect: $options.onRedirect
    }), null, 16, ["onRedirect"]);
  }
  var PageController = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function validate(uuid) {
    return typeof uuid === "string" && REGEX.test(uuid);
  }
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return stringify(rnds);
  }
  var Lato = "";
  const _sfc_main = {
    components: {
      NModal,
      NCard,
      Header,
      Footer,
      PageController
    },
    data() {
      return {
        docdog_id_attr_name: "data-docdog-id",
        node_params_map: {},
        current_node_uuid: null,
        current_page: "Loading"
      };
    },
    computed: {
      is_node_selected: {
        get() {
          return this.current_node_uuid !== null;
        },
        set(unselect) {
          this.closeModal();
        }
      },
      current_node() {
        if (this.is_node_selected) {
          return this.node_params_map[this.current_node_uuid].node;
        } else {
          return null;
        }
      },
      current_node_params() {
        if (this.is_node_selected) {
          return this.node_params_map[this.current_node_uuid].params;
        } else {
          return null;
        }
      }
    },
    methods: {
      linkNode(node, params) {
        let uuid = node.getAttribute(this.docdog_id_attr_name);
        if (uuid == null || uuid == "") {
          uuid = v4();
          this.node_params_map[uuid] = { node, params };
          node.setAttribute(this.docdog_id_attr_name, uuid);
          node.addEventListener("click", this.nodeAction);
        } else {
          this.node_params_map[uuid].params = params;
        }
      },
      unlinkNode(node) {
        const uuid = node.getAttribute(this.docdog_id_attr_name);
        node.removeEventListener("click", this.nodeAction);
        delete this.node_params_map[uuid];
        node.removeAttribute(this.docdog_id_attr_name);
      },
      nodeAction(event) {
        const uuid = event.target.getAttribute(this.docdog_id_attr_name);
        if (this.current_node_uuid === null) {
          this.current_node_uuid = uuid;
        } else if (this.current_node_uuid === uuid) {
          this.closeModal();
        } else {
          this.current_node_uuid = uuid;
        }
      },
      closeModal() {
        this.current_node_uuid = null;
        this.current_page = "Loading";
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Header = resolveComponent("Header");
    const _component_PageController = resolveComponent("PageController");
    const _component_Footer = resolveComponent("Footer");
    const _component_n_card = resolveComponent("n-card");
    const _component_n_modal = resolveComponent("n-modal");
    return openBlock(), createBlock(_component_n_modal, {
      show: $options.is_node_selected,
      "onUpdate:show": _cache[1] || (_cache[1] = ($event) => $options.is_node_selected = $event)
    }, {
      default: withCtx(() => [
        createVNode(_component_n_card, {
          style: { "width": "600px" },
          title: "Docdog",
          bordered: false,
          size: "huge"
        }, {
          header: withCtx(() => [
            createVNode(_component_Header, {
              title: $data.current_page,
              onClose: $options.closeModal
            }, null, 8, ["title", "onClose"])
          ]),
          footer: withCtx(() => [
            createVNode(_component_Footer)
          ]),
          default: withCtx(() => [
            createVNode(_component_PageController, {
              current_page: $data.current_page,
              "onUpdate:current_page": _cache[0] || (_cache[0] = ($event) => $data.current_page = $event),
              node_params: $options.current_node_params,
              onClose: $options.closeModal
            }, null, 8, ["current_page", "node_params", "onClose"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["show"]);
  }
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  axios.defaults.headers.post["Content-Type"] = "application/json";
  if (window.Docdog === void 0) {
    window.Docdog = {
      app: null
    };
  }
  function linkNode(node, params) {
    if (window.Docdog.app) {
      window.Docdog.app.linkNode(node, params);
    }
  }
  function parseConfig(config) {
    if (typeof config === "string" || config instanceof String) {
      return config.split(",").reduce((carry, keyval) => {
        let [k, v] = keyval.split(":");
        if (v === void 0) {
          v = true;
        }
        return __spreadProps(__spreadValues({}, carry), { [k]: v });
      }, {});
    } else if (typeof config === "object") {
      return config;
    } else {
      return {};
    }
  }
  const initDocdogApp = _.once(() => {
    if (window.Docdog.app == null) {
      const docdogAppDiv = document.createElement("div");
      docdogAppDiv.classList.add("docdog-container");
      document.body.appendChild(docdogAppDiv);
      window.Docdog.app = createApp(App).mount(docdogAppDiv);
    }
  });
  function parseDOM() {
    initDocdogApp();
    document.querySelectorAll("[data-docdog]").forEach((node) => {
      const params = parseConfig(node.getAttribute("data-docdog"));
      linkNode(node, params);
    });
  }
  window.addEventListener("load", parseDOM);
  function styleInject(css,ref){if(ref===void 0){ref={}}var insertAt=ref.insertAt;if(!css||typeof document==="undefined"){return}var head=document.head||document.getElementsByTagName("head")[0];var style=document.createElement("style");style.type="text/css";if(insertAt==="top"){if(head.firstChild){head.insertBefore(style,head.firstChild)}else{head.appendChild(style)}}else{head.appendChild(style)}if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}};styleInject(`
.title[data-v-706b708a] {
  float: left;
}
.close-button[data-v-706b708a] {
  float: right;
}

@font-face {
  font-family: "v-sans";
  font-weight: 400;
  src: url("data:font/woff2;base64,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");
}

@font-face {
  font-family: "v-sans";
  font-weight: 600;
  src: url("data:font/woff2;base64,d09GMgABAAAAAK1EABEAAAACTYQAAKzfAAID1wAAAAAAAAAAAAAAAAAAAAAAAAAAG4HXGByFXAZgAI0ACDoJlxcRCAqCuxyCh0IBNgIkA45EE4SAAguHJAAEIAWvbweTOAyBClvfLtKgmd/22csBTUmLBytPREfly1WXyDoVkoRCf53qX14WpMnQt8NBAkKOu26zQ0Y7c4CqXy+ciObdKxqj85peCpkjLfv//////////////////////////////7/nZENc38MkQJq2a/ZM/cTsi54wJVU1M0WqKKgpSIwMROVGGhSmWR4KxospykqRYjCK5QqrprWEEh4pV6szo6ChVM8piY1QI001UdgELdSmAnVYy70LKlSnjLp7QG+mPMV156rPmOHenro5RZxi9Rpd+vpZgedFZr4bLsWBHAwOQNWElA+RlcOw5ZEijyFQGiwz45aOJElUy1KW95EBpUoPatAoKA/WUW0MajBkqSHDvVRi44qGJ3gyyaZIyTwUkJIidUzRdB+bcalRQEpBzCwYpOo06Ck2miAGgzZdRaZQwRxTVsOjA8q7gbLUwVDdPcVK8xlbYMUBsJjRAh8r0nx1IE8XWV6dBZrrElAr1UAYBxVK+izSnE5mtEztZjdSuFJuoTHS1iof1lG8BtblO2ywTbAKR1tUrWyxxLmtiganDBlW6uY9cMRhftvrgJedCNrUtQuWFmiPLeJFWCspVFh3KlFPSfw2agwrmmXrvVRxKPlSpyIcg9U+qL0o2iyqmyGzfmQu/XC/BttyW3RQmQpMKSaHRx0KPHDlepzT8XqBIu1RuYedsE5/wk5ptEDtKTp2bEtt1X1EPeGqzJQdOdiZqZ/G6SxrsYFS/57yoQhPO1ADNg8Viguw+5z19lwg81DAMz62C/twn6d9U51obomgS/E9V3StrOK97WPQ4QY35bZvwVXfbR9t2kRzt0FCHVQW1O9gdI50k5SNeezyswv6WMIK1GDzLMMhg+qxyLYczoQP3oI7jvVMQmWU7sDjE5l3XYL4C/m35Ff69wwsoYrAe/LZfekP5F/Lf0jrKvzRY6YoyLuGT0ZJwS495X2SevGzRYWTI+bWgqnzuGMcB8/lv5D/Uv4req0s56tc3TcVlXzUaLqObtOoeo0i3jgs+2n6nUWTLtu87C/z0VntchgQURCQ0a7gRVSP6zxdcy8hE1Fkb4VX2Tvx7+V/kH/PMZfUg/OPYk8cPn12S2VuyH4v+TXupS9uTZn78r/K/yb/N/m/y/8k/A+USd4RfA3rzgFOOKvTEk26rsgvyP9T8gT4C+YexqH6yGbV8W+2pX7KPs9c/5H/r+h58J/I56twCP5P3/1MwLqn+7CNfvgOfrKmY1H+inz6Kf+X5IfoO8g9lj2ssF7c4k3vsdvDS1YFPQrq7Mjom8ug/8zHTzYEluAdVdd1b28YjOt/gJBIpZsaahGbiGNcHj6PaM5m9+5yFzVIgyRBgwdJKRAIeAUJol5x1Cr+PFVKv6Ui+tb2zYThYZv9myvnjEIFREDCALSxUCIFJEoRBRUwCqNQzJg6a1FMV6XL2+bCxbn8u9ttri9c9tX+DR5+e3+peGD/WRqhO4AMb6waTBKqxBsYnCuVnNEBgJaP+KXb//9Osxs2QdggBYwyJRnL4wKCLeOxyi4oXQLHIxUwSyWyPCAYdI6mWdDRkRalwOt/FyG2RSwqaKVWquJXukdqMwDif+LbtL/3vjvt9O950zNJemrpiecuUtXUYlJqVJReoKQJSSUNxF6JESE0lEuxZVlkxWCXQIihEm/Hn+ttqjbXXI/YfiE3ZUAjqEN8j9tmdskxf3VIUgz4h1rc31aJiZYJSYiS2BgzZ5vQ77iXAAH/+R8AUAD/U3b9Vy9I4akV6qeDAzec8bnP6h6w21u3+JCT5BR+9H+AP8Ao8fuW6sxVaWZXJXo8FKic7HNp7fTJLp3lfqENcAOaYJcUQMDfpzNnLBFII0XpwNb/4es/SqTO1ms729uUVgQZGdcjTU764VqatZboyzIjRimMBqXKuwnHS0qV9/90tWTP/z+TjkdJU/FoipFsVvyCyobBtiVtfHKigvtKTQRgKYc0Ef4uB+VaaLSsWGqOPPdwk474GhNo4eFduu6kzJWkY+ZyazO8qVIoFA+Hcf2c0PjQ/crooW7GVP4ssbEFPjtf1azfqnyYLkDif1Yz1T/PomMkWiIsiQJJJeu08jl8PJ6n1v7z3O6e94HUImAQy0cSSLRRcanYJRViYQDVuhArHnqgNeqt1zCzdyGyKNyPZwXooggcsIyKBRSSQarEEW/DPOPaqXNqeyXvXMkooYQyRsVu88FtVCpk6wNCZ95uG2Lzk0h9CZF3LelMMwDgf965z2ZvKrEtH/CYhDpP+vSEAbbTH7kfkNrecZoMeFNXLThkOU6sKMDe5bscERfdQ1v9/NA2bCksxLC9p8PP8AtVBQj8wDxD7r/rCJ3/L6en6385VanZSYzVFQhJWHT9ZKyqmrQMnezrHfO4up6jLi1Rw0MCKDHo/+oqD6sQ9wsAvueEndfbu+xF25KB9DUsmTZFlfYIZhbQIVLSYt3gVLIyiHo+mUBFK/qkF4HLQwvZmNfJUCsUTNUmQXGEwjbkfH7HpKho4SFfOpvzN5lgmeE4o4ouNKxXOuAYLmpAWgYUPTG/DnudNTlN/uNcr1AD3wvQ6E0Cqm7sKc2fPGhyHwmFHed4DALdYk/sivuB4NtgnV1cTb9YWpptsZBw8MH/v8v/zVtfSOgxJ1xKyzh6aHmNWhJq5v0iNEKPUztDtyysfxCWTf9MXDkEGr1B23QKtEg6w/RJ3XELMQzxD9iEipIqq6vL/r6Sa6dqzpSS1+OFkONlAXwjWKF7fX+BDVuzUCvidWkfwd8hVNGLhWJoiIawiIvu4NjwWC4v4RVbMRZmgZZqaWulthZsgcoENgwxMf0Rl359dvkHGJiura8EuS1CIhRgI8Cms3ZL1jlb03sq2glKk9y+WEVLwNQSUzY5PcVUUMEKD0R6GNnVoiu+AizCQizS8hAxETbg2AeR6tgszs7w7E/QUNE1SpqjpKVlehrFYUwP/VKl/rMCRGOEDJgoPH+nXV5avwl3gUJhgQolHQYGoMy/Tct2vqQ5S8doBe0Q9MdQNIGiSzX/z4zsP19jeSQZJC3JkNzYCx5Z3rPkdSJe0QIfAWhknEWNvZu3OraDDB29HqhLU6UqqUp3bZkyZR8e/n+t/7S1560aUvN18IS4IlRY6nrVPXB+pwZV//486g7XcIWAHCkgNxXucIU73AGUUbGRYR0dJdKAJAABAv2vtdLu9p85oh+i8TGiXxCMjHCDe9Dzj6gDTLIraurUxK08IRNHqECJVIS6ilJRcTrw//2yZvdv1CMkQiJcsAp+vXqEU7daT70NeuuTmxQ6TOgmyZCEQ4FQXQhFjUIajNVICOr3Tkupjp3BGOTz7nCl61Il6bJpz3fg8qMS14UPETFzOnMOlRMSIfEufd6FXyWtQjgG1UlJEMjRWmpnJ2GVl62rixK1ZmcPOrtPuyG8TykAfCmxqytrhP+UWBIIFaNTawramrpUqBfOhaqFm//v2qfdkq+0PWvNAH8qECiE5N3kDSSL+UVQSEIBSrtCV6rZsiz/Tz+qUqrsI3lpb3XtHTaA4qyU5a3/Y/mRZ9CYVTQydAxHCkNDfZ18vNcWSgN+EEvlKPNsxw4s9eliAeLVwU83JwwJwpn2zdBNfolQUAukEot0IAsAIkhQ685LfdvAKIvopwSKTIKAO08okAN4kFQLgjANkiCK53//au9Z+yZ9BsYcxM1DEYMQwhjjlFK+2q7f+58Zwf60cEqRwVukDBKGMIQQQpgNIq77eP+djQB8zk/bSf6vlbYYnXGEGJ7OjFl+MG6lPUDFGKP9hr45hW+7zZ+7awQJcjwOu8af77TqABdDYJIstvQExp24e4Bfd8PYrKUXEbqgpjCYokipoB+qc4fXJZGFwQCNRm+1W+HpqvffqeLOYtWrWoxRWmultDYi4oqY948nMUKInfkUTjYs8QtMmiG4TR98y2a7GI4Iw/8FCABwgA10AMmKFSoArNRcVgjwlWXGAhBWl1lRDBJgEXh5vYD76n2IDvEZcVRQXlYMYDMUPA4fEUB9HEA09xUDAC7QuGVF3KOncEQylEyR5m1YbQzME4IF/l7k6rsRDX21IdqU4fX4+AU8L1RGeCxkEf2EldjXITR2KXmpgq6Ft7yCzAxM1aaM4TG1nFzORs75st5evkUYqEcifOmscO5wEbr0uBxwuefyzRVfSp6rzO25u92T/577Nxd7QBIgTerjkB2QIx7eHms9HnjaPEGDeoZ4JnhavXy8Mrw6PhgWr0PgOnhAnlbJTV7vvb42SvCgDQqgilILnAiXtWRGNXgXfBx+vusfCIPXA8S29rt/83p/Iz6/DOBdPhaftT7HfG77PEcuQXohGUgFMh/ZhepHXUXb+Tr7xiZsufhafLtASdbzL3GMX1Los02sMuk1P/WQIMA8n3U6MQZJcikhhH4dMj+R8lNJv4foofVZfU0NTKhkxVUommE5vhmAqEtylFA1mWPpX23NP7rwqVbp1ja2sWtt7/CHuP+T2/gq85bFnEXyYt3D4VPwaMbpEgx1jvgd14dGuPwVp5q9UFXOt9SFdNVFzUVb37HePMGuDiRKgxfDHxAeToWsj81NxrMzjrhUM22ExzGaCF38VNoO5ro5kUKoQjUsM7JDeWp7aCw7UZyKznhPwovjBF/vPi8sxoUUNoQamaZiaKx0VA/HVzj5vXvNQhxLoPFRcxpRjWnowzAaynX6nW1nBI2IGxIftpesqCib2W2bF8pNIiVpkocm1k4TY9oZuhj/zHsVKPFUyasumqIZi6Y3GnZE4mbSk6azyDOF8vBmgzrdiHYYOgjBCIrhBEnRDMvxgijJiqrpBqPJbLHa7M1D8thzco5L39XN3SOfw8s7P3z9/AUYThNkKnQYhi3OwcuwjmNYxsoplCq1RqvTxzBtnD8BwdiEtBmtC0/3mQovfBNVSE44KQUlFTW7JvBkeprM5ApAqVJrQAhGUAwPfdSw3JmTHT8tBrWYAJwOAOCz8cxzDMRPJ4ZrpSKdLCMrF/m+ANg5t+sSzyRBsSb/7K0nlcbbESgMHkSaRKExWBw+hB6RFHKHQqWFnjWYLDaHy+MLhCKxRCqTK6I8Xak1Wp3eECMWRCkyUdS4Tr28N3Qp956OvNmp2UQPJm0uo8FjKGokEOwJGYvvp/3d/T/yAsQR2jEblG/grut4ozwxZA7j65CMWO/F9TZFmb/vsxne6cjsVa3rkbeLoMq6SjHjpFYpYsR8vsoi+o2cE4qTBMM/mApYnodoWNvWlW1jexwsrkKlqqjeWk1VuwhLyVZLxIQIzAwWjL5tksv4xqj+8UlSVDMa5g19Z6SDJuFAMiQ3jrrxVr9qYszkaAbJrFqxFutAsflJuBSvtMcIXTIoWctyJa+g+Pjg6OTs4urmrvycdAyLOV4wmmQSrP2tFb8rO5acmtO8pCHQWWrnxHlGF+aPOKiiNHa6JCSV+H85qZr2KzljYCVFMyzHN4Psc4XhtIiDSY7irSZzLF2rLXbqcMalieUlSpUpV6FSlQ6dunTr0avPCv0GDFppyLARo3wUaLQ61GwJfkWQFM2wnMvt+cherr7M7aRy3lMXLB1l1rODZ8XO8dwV5sx1+1YZ9QLrwa3nQp/GD8QXe261vGsmuaLf6quprW503k2uuWPmw73fx11EFazhewyJoSqnNTtDZITrgNEhqSM+x9VETav2nov3p6GfxzZPbJzaPfNW7vPKO7X3sQzqTSaLy/zr/P4Xf7j8utP2Mtd35I2IqZ9fA4wNsm8ln4Yktvb84/rz4o3ZZeJIO3Sqbz+8nj9lPoKZ22DisyYrZnaz8QgJi8Aj60c5+diQYzO2/O6EYqdGKclxUpS1CjyEYARdqjW8K3ZIFM10CqabxW8NESVZUTW9UzrH5BRzWd5d5cZ+6rDAhFL6QAWVqkIlSA7MTmdbPKf5swR2C9OZNo61IpoAVEVVTV1DUyuYYnyc4EhxZesdcycZdspO841OKVx0wSX1Lk9XxiN/ukpsfzyPK6QOUmPdjqRbU6Qok+7u/cSB1odNTfGWs9s6unr6BoYx4j42MaUzmCw2h8vjC4Sizo3vHPnRkVnsnSrlODObtXNnkvl8Dk2xTdnUl5r3JR2Xrdd3XVu+Fnx7sdxbwAMNra5z82aY4+icZufqRBI3sqEPuDylnFrvdntqazk3Gc1ksTlcHl8gFIklUplcEeViQVI0w3LhcyezJdYni3rsyu+qnZ13VeZ5I/IAe8AMCQ0TmDzuEG1kKnhtyPi+v4d444+Yt4RUi2q2BiGG3NAJp437Gc5ORk5RclDzpzWXnr8DOoegJ97Ku9dify2s9bnac1v1QmsWdebprqzphtq8cMjauD8bQU4VZ+49kSwOV1m+bs7hYKeA5cYPcRzlG+Z/NaRLqNwapBgqQw1OCzjDZ+S+A+MOWfxS/D+MBtw9LxKCjc1PJKfwmdJcZN1yoko1lzOGNW5SXqDD3LEccTrur46aHbh33lDE/PQENVVuo/H7zFus2OFx9f9deTqSGHcM7XbaoDNkRo5QcqqmxwOaA00xbUiV/TXmVPadf95Zxe+qXFjto3Fu6swDnf3Rsd906dyJvocV7QfPd/smplIzD9+4qOa/dn/Wv396oa3y7Dr3dPmhTAd4WUGzm7mlz5GE475NQGZ4dn12T9jixPoxsCzPBU2xIjgePNT2h1TjNACdhYGqjw/Modm9KL7zvEMbjhN/3TxFNxVGo6EzMKDQ3pQDaxrHjn93PeIfuhio6JmKgQ15MM3zUaipnLSdJSfpbePGQxbmItGNL+NCb1XOX0BhQzCCYngI9iRFM8USc5PPQJRkRdV0g9Fktlht9jhitLdUUVHTV9fQ1Iq2t3TQupj9bvP7PUJPzI64vhzWKZxtA6/gvUPwK6KPSMiTe7oU31Nd8Xm4he4iwwdMn7HSRH6oCG8ljXUQSgZ/xjClGQtrJl5LSpV8PwDsVE08kwTFDj+XBylvpaLFSqy1jW3s5No7HDvpO+F83jMchDWl3NUQgmCWDa9Tfh6lIQhGUAwnSIpmWI4XRElWVE03GE1mi9Vm525C6/TGk2LzmdJ1knRXHtx2lzN3vHBINw51QTMkPD3zIxmkFJRU1Ox06dYT909yHnjokedPufLCCUTwYVKAK6CKpgm7ieAfDY6n2BkS3Qry+gU2IKpB3q0U2hC7bnCu3hiHhHGHiq+HXWm3842wom+NQBmDzp1X4y6TmSSm5ksnp+WWPD1KZpRByrNetpwsGHQ5208pcR3YGSZvhVuN2taYxga1tVJAQ+439WQkR23bxr8b4jjwxcgpuc08K+QTKCiFkKJ5x2JICaZpq4WBME0mgwQZsh5i1qBDjz4RGExr7n6+bSfvhkwieYrlUyroZbNzlM+WQcp6RRKqtclqG1V8r03dEIotT2K9lrRCQ/16EdZr1HYkBJdVCx9ZijRqG5uaoG879tMqyYKafURAxYkTJ121EydO2Jw47UNUH2kr3GzU1sbUN6i1lfwacq8pTo200dz2enNDJWr0Z+qx9dZbj6kHwnqD0LpRnwEWHBwcWdKP8mmXUq+zTtF5zQTCtBiwziYtOg9isLXyladYi5UCGXCnhWAJREhaCpqWoS4K8ezeNdCEv1OF2TOPI6UofAvvyt1J6R2bZkT6zFPGl+tYqEr23SmiQkX9/5h/sCEYQTE8BEJSNFMszE0+A1GSFVXTDUaT2WK12ePoI420SLerpZMhM7J8ZGBURDNRxqOQ3gmgKqpq6hqaWvtJtli6qbJN8671uz62P8bVa9Bv4/skobcT36Q0ybl31TElQ6kRtX+kpV+m1Iy+yOxsVjdRPw5R+GiIxhLEMmzjZEozFtbi0/7CnqRUydsdQwwv9zu7rVarVe/6yEet6e0eu9NgzJq7XhqaWto6unr6BoZGxiamZh5j5cRrG9vYuf69w+Zk93AmgO68lxL0lLSgEyA34mAuhTWlfqHIYnKzdBU5nbWf8malXv5/NTMdDpliMz7l9mce6jPSQ3X9YnPU3WIz+DNrxeNdRK/bO6TGjEDcmfvAhmAExXCCpGiG5XhBlGRF1XSD0WS2WG325mFag84Cn3EUwg+gKqpq6hqaWt9LgivdeoJ2RPQ5KTzXbcNEur5kjEzMLKwSklKRni4jKxelC5VVVKPWX11DU0tbR1dP38DQyNjE1MxjrAZb29jGrrN9dWjwVQurvgzPGoPVUfGVx72up+vqRdWFz9HdM4oKrg2ynFkdqKgpqmtoakXbtTpoXcxufQ6sO3FKaPKgfHz3J3RjYk8mIc/bK5fSS6m9mtZP0nst43wxq2Slifr5fxeuXbreZ6Ywe8W62BePN33xBLoqRnYqI9WmNSvu2sDRvjp8VGY0u9Xz3AduMxCYR/2As5dnoW4D3c9cRj8RuLisX5lDf7k7rGJYMLSXE3UdBFohySwX/Hobh28vf4cpIhG51wpBxFtNQwOTkLWe9PWp235rkcK7WabwyNE3UKfJGDbjIofL3VRMumrO/pLtmHRzM2NkVIq0jKycU4FUw5l/zoLdiCK8RmCvtoaOc7ayniv6ZdBq3T++wfHDTbGZXAEoVWoNCMEIiuEhri6paKd3eoPRZLZYQ9/YsFz49w5iXI69cu0mbh96V93v5CnrmmEKBIvnA2TFzWVRofc1LJf+KIMqLiqfXKNGjU95Y6e+qixJ0hNm5uc8157SSJIkSZKkJ5WZmZmZOeec53lmZiIXJs2gmN/szzLVrutr1wy98jPhn0tlfyAlnNDYQ2I2RbXVtOPSSe4x2YjAAbtD0Su60Ueiv7GOV7BkaXN7Y4l+jr27FhrPsQu+q4gG1XTDPKNujheKftJFayig+mmMxbR1wncq3CsqcaQlMrlCWapK9cxGtL0CAyEYQTGcICmaYTleECVZUTXdYDSZLVabvXn48BXw9fMXOgKRwOx0trz0UwIDwjRjXsQMQFVU1dQ1NLWCMeG7Z3wKrAf4Hpr2COgxWnk3eW+VXXv2HThsakxbeNs6unr6BoYx4j82MaUzmKwyI2hLB5fHFwhF8Usv/dVvAfVGYolUJldESbJSa2AExXCCpGLe6+surnH78O7h2Q0iJ/6S5sWwBwJoYPAgSkgUGoPF4cdCQExIs8gHFFRa6GcMJovN4fL4AqFILJHK5Ioomyq1RqvTG+LIvrxX34r6tpktToBcAB1ND39nYQR6gf4+CbaDIzhvCKgJd9iFRvgyLKTGPITQsEDWxuS5kAsxC/MQiz9xcSjiJaCioWNgYmHj4OJJxCcglERETEJKRk5BSSVZivKXiKexHcDvDegB9Y0QtZLd33SP9XBJTiUzMjGzsIZo0smZXAEoVWoNCMEIiuEhPltS0T610xuMJrPFGvr7DcuFv3AQ4+WubKpuPf8X7kO5fcDucNe9uH9GelA9XLRZ4runYSk7KuUuCBPZUm09PE7abt3Ai/brcsisPnPOGXLBRdtdvhzZ6dr1u6DxMoNwapjd9L+2PTU+K9VU37MXu61ACuVwQdGMRVjX/AizkTjS+izyYKFsVq11fRNtV6AhBCMohhMkRTMsxwuiJCuqphuMJrPFarM3T1zceXjEa/Lr5y+0FaeH2elsiwHy5yUW0jjmQtjBQFVU1dQ1NLWCIfF5CUKKlYv5SXblulV27dl34LCpIY/QxyamdAaTVd7oLXbSweXxBUJR/NIbfvVbQGwklkhlckWU9Cu1BkZQDCdIKuZd67qL6zIT4na5Zl9XiRqz7u6SJEnur+xGEQAAAACYmZnWVZ//HLbZsl4npjUV6037fxMzJuvo1PhyZpgNT5kXE5oZJgKPVXFrkWwuIrL0cvKxQWkztqicUGyS9EqUTkYZKpAQghEUwwmSohmW4wVRkhVV0w1Gk9lita32frAUKxKwDAO8mn3j5y90PqKE2WOHmUfFnyWgF2rGUIQJoCqqauoamlrBgPgzJwApWGbUfiukAu4Bu4cYj1g89nA3obfs2rPvwGFTA25htnV09fQNDGMEPjYxpTOYrHmv99Fv9OFv1uutPmCDO8Xl8QVCUXwoXiVZSuT1jl/9dgbS/7zwqgmpTK6IknKl1sAIiuEEScU82gDOr4/76QT7RvQ/ZHkvnCQBAADoU1UVMkmSJEmSJAkAQE2ybdvWWjtOdSb6/huOjdIcR4gk6WJ8O/UwrtbUGIvnmX2XRBQzMzMtLT09PZPWBhGSJEmSJEmSJEmSJEk1eXkAEBF4w7IIAAAA2LYrZTw0fnBIkqRtjDHGGKO11lprbd+ewVQY/j8NBwQjKIa/kBn4fLGnlFJKKSUiIiIiIkLyZU/VV5FnEQBEREREegYRWJZlAQAAAAAAAGCAwWAwGAx+ZTA1wGKTHWj0Ae06Pv5UAU61Eka5VUIAEUOiI/eKH1s0EN30LTZGL2SC1Er9lEXXXY2/czt/JfgSRTMsxzeDyqtDTCSWSGVyRZSglVoDIyiGEyQVi7ZLK+uvd8obTut2xqiz3icIw3ddD73BTbfcdsdd915Q17LwaJ695kR9Fvi6wcgp35PezVX9vGe6hBAM3/iG2nd/Ga2xD7cebd613cN+yKvmpPx8QfVzm/GDfWdZvk/76fsfLzyca5KWOSQUNF8YWLgmgzL1uVuO3Cg/6ipUqorqw69GbdSRV6T4eTui14Vj+36wh+dRWrCl+iirGVXtNIRx3U233fVoz+QlL0PjySPH1DQmUTbukuv55W/x/Z3M9OD64P1Q9mzAmz29oHqwywud0cLATeKMM85wc3Nzk5CMJXGfEBN7TPb01DOmj5oZYqu0r8UxyTnTJd3CM8QbPiR/BkSQ26y5mGe2YDGXWC4hkHCLRFQUlnislFVha6bXbRFTIs4gUZsknh2+Pc2LcFyGXxYqR75ZELZBbfMFzDEq6laUxRT1EIIRFMMJkqIZluMFUZIVVdMNRpPZYrXZ4zh8co7L0NVt+93sQ/A5/Bp6z/zI75o//gILuJogb6tCdLg9pE1xMJ/pEBZjgpGXQqlSa7Q6/fMEHLS311EZNwwdf9s31oFj226dUIUbSZIkgFZJ15eZmWFEYolUJo+CRaRSnGwrpCEEIyiGE0W6K6kxLMcLEaFJVlRNN8SopaLlFKEU/pGPfRLAlp/6LD5n+IUvfeVr3/jWd75/IRDB8Zbf4nf+f/gzIDQSS6QyuSJK6pVaAyMohhMkFfOxbdqjZ+gJJ51y2hlnnWue97YLwy+6FF6GDKEweBDVJAqNweLwIQyJpJDDCpUWesZgstgcLo8vEIrEEqlMrngxg5q9Zba0BPr7rZbnVa816QEHrsCCYATFcIKkaIbleEGUZEXVdIPRZLZYbXb6NMrkCqVKrdHqrujhxsNzeRpnHj8eeuAssXO6In4j8pfxKc9ynsiF0VWBy/oR0GvrumGIKcIaTWQi3ZVkRiZmFlYJSSk1dQ1NLW0dXT19A0MjYxNTM49xnO5UnS/2vzrTCAaD2akxGAwGg3Hz+Yc/erF/bdBLHQwG47bxTus7Jd8OBb0sqc/ZsYjKoYY6k4033CW0MlGVq6lCSpWqq7KoGsrM67w62dUT16C0RtaauNd8dn89djSUqD6WVvisUb9mzH8ZT9LKnBvyddvltvq6e1grufXY2cu8jRa3iUNW5ibc7bLspo//06dYO829M6KapeyS+G74yvdZyQ+fpx6v0VF0zQeqkbbCrk/07YaSCYecn7emCaXd0OcTmFTjZl5kax4hYRF4rNsqFnFpic+V1CHlCUItWCobgjbFlogTilESdDLKZoU0hGAExXCCpGiG5XhBlGRF1XSD0WS2WG32lxqkKiVAggTyElR1akRg1dhnZUF5FEqVWqPV6WMIGb/exDysx6PPjBX2JKfiBBiRhTTJRTHGWItpijVOIQDGKrqzyRiZmFlYmyJOQtPFTK4AlCq1BoRgBMXwEG8tqWhPd3qD0WS2WEP/pGG58NcO4uHnh6oGXgAABxhOcT57cX2pwq7SD5JQaAwWh38++FXOQQOTxeZweXyBUCSWSGVyRZRDlVqj1ekNMfZMZkuszZt9JJzZf7fxsjE1H3D7Gw6RZ4NYiI9EueaWR555BQ0WPO98QoYKnW+YsOGg9i0SOGXPJnh0IH/Ck5yMEZjRvrTKjpVdHerV/o7JdGQDa5TRNYaeI59ZdIPh+Zbr+J8ujE8R3k+KsgusUyO6QeKWZe5IuNRIddzi5c6YG+sS4LAw7CFuVu41//U6h+cGlVts7khmuykEtH8FUscUIKs/E8r0Vx9M+urCUFwqBjL2AAnc7d6m/G0C5NvZUjWronsjuo0xQJpW1ng+S5bzOrWBOryPHUxl7Z91gF81LruLdtVex663rz9vRWOT73zCzbtV95kHl4f1D5l0ZhmLXca2oHvLetiv7bI4XdwlXNO0i4iba+zYfgv3SCqgVRR5Qi0QhEFA9GlBoygq6lqaAW7ataCzSEsJhRDAQWrTQCNN1rLrh2stbX+G1toEtvqDLqZkS23GY2CYb4gXVeHmlUQnvu5oywqSKlFFaS+fQbJOSkpyrc6QlPm4HHksfSjj4r6UZGpof6/C7StEJ8Hunnf0n8/Mv2hF4SqVqKK0ddC6mGmWz0CYIEJ8TmmS7X01RZWKoqHpWtFXTDexxrMijxcFIsn+v6oyUg3tr1e4ayXbyYIor6nXnnCtNY8VwHncwALeIsGDxDWlST6xZw55rpawVTHdwupTCE5zlq/gUnqzQAdrt0qroqImoK6hqRVtbh20LiZZK+5VyAohhLYRFGWqW2nupM+xIcGUYY0mckdRcJciHwiAELyMPYEWHoq7WmmLV6qdhlAqHUE55eUEAERKLdu2LLAsEPdzxoR/zrOr0TgCQC7v886mz9XFjDxzAPzhgLbkw3LhxPAKBDiRjwQn81H4qRI0BF2aIcY0y+oNkvpldvcW5LYqCBOEySq5VkkYDj+4bhhREFWJKkpbB62Lmc9y4zxkIIAXJLibyE+a5O17fFSzDPNM17M0kVCiEE1a/qJEW5dpS1sUzCzJz1aAHjpvsfeSKUsxjT2UoS5yk7lJw68VMaoFmgh9niR/8pMmDq/y3ivZ9mxa6CAJxu3c5AiOGRaFwD1XRCjSJ00k557zbaaAhV+zV+cTTYT0VOxK5hHZXmZ2wrXtMgURERGxJiLWREbEVssxQmGy2J4+mE6eD8bDNrqegITw4bkqihFYWFgdNRYWlj39s2NRKbihDuCwQXfs0KSDyUN6enoBK97vmz179pmNd+1de9f27Gt7PPY0daxmm/sNbEx5dsDDu57nLHnMAs2sEKmjH8EUelYdGc6HuiGMY2uVRtpLX1ctrfmX6GVRe+ylMLdHZrN2a40Ye7noxVfJfoFtZ98VTB5P30uehHp1toKpfkUNKP88re1yrnQ/fb0wj0XDQ7+Xla1pdKojq7UsEA7vcXhY43A4GxzOy0/1p/4lXKeQBjgcLj9GkNu+wSj8CdpgkV48pItgkb4FvAR+K/6KCBpbUTr9u+u44P7frthWYgrsKk2qt87nIRRJ24GdtgP7QdkBA34B3qLfAXZgP6A9Iax4cLYTyihsl9JUUEnglhRRFiMbR2siBENp7CoQ3sj9BeZRZJg6t//hPIYHO5BgcPk+TsHFVwi/WQVHgOmn7AOm1qEBILT/6KweA8X3/LGTZewoycz2xx/5uemU7p3ADD59uTBY9CnAtf8AIQeJ1I8nfC+Av/ICMHfsEHiAPbP+OCgrQGLV4P6poyt2byB2p6Z20fAMYEFmAPtWpxdYTHhxLbsBWx3BH1OngWTHfLUjuYgrIyEwffEV9wCRqTNy5wkFy/Xe9R9Ayzdue8vWqx4+958BbGqLTLUlDo3IZFafOHoMWHj5uZlt1855aCEB/XEEkWNZMY4tayLxq8/axktgQCZHBvaYYQ1cEvESNnuAho4QXz32bM/yAGFLRCedb2mnap8OeWDb7KGZXc/pFJ26Dt4IWDK6MJLufqDpvoentKX5iaoYjJC+7LFz7/rHP6YcBj4KVhs6DaADf+iXK9bU1Zh3erN1/CtSFlRLiJsOEd6y8cPm9YOwNHKimgygA9M0eqDA7OQTideHguvS4hEJU1tv56zv2lvZf3e224FyRzb+hXde7QLia09P78jEQksfd/gM9cxszKT94+/b/wJlrnuecsMU280skF+YHt/iuYOhg6hR8w76LCjIrpdfeelJ6J9FPIcc75xskoW8UO4FgOBPZXr+b1oLBPLPezUOsEb56/x87hmyP3sNsOfjL39ZpTF+Wdazm2PNW+Soxg3LGe5zj+4cX3dgbMcTs/DhascAw03X6a7z+AQAj3zwKqBw/qX/qjj+95Ss5ZpLANHKnauVZCdiMaEnsuxO4INyEgv2AM5dX/8awLt9/uXb1p+u4pabgOHZ449z+nD7FgOa1QcGMqbVbMnd90ULH2cRFl47AApC8+GKvgU0X3DuQF5ysbbg+tc7Anyo+Fd9uv70Mxz/4LuA/d8YmRtdPvN6eacmn6Hpb38C0A/HoMPjrYolMeW6NdH9xwgULbCQkd11ldIV5oF6TiUSKx9CY2BsHAQuHhJ/QBGkLEISNCmGLB+bnBKHih2aPQ2uRQOSFo8jLqd8fM50BPQMhFy4EnEbiLmT8CDlScbYl3P7jAA4HhEQMRaOjKkorIREQycyBiZWZGInOjZOYkss5UhMipvUFPhJL4Ugv/bUIHxDBqKM5ZKUVwFZhb/b6gDLvjLObWoFspeeWGhiiavic100TRGJ+dPjI5AElDDU0YkXnwRJYlw+IuTHn1yAQCLBQsiZZWFkVy9VcuQRypeyQKh0wVEm/9kVqnBUqyVXBxz1hBqINKYcTZrZaSHUeonRZh3KehuwbaxIbSKzmUYXlu5Ua9ZRjuZIHMP1HInjKdcJ8xyc5OwUndOcnaFzMRQM33dh+OTZnQ4uUnbhUZIbJopgg7PmssKONhx1YomTOY0zY/xQJI04XdGHHyKC4GO7ccr0nvq3UV0Lea31YNLbAFXFXYUOQyVcFD3jbe3Eya6evdB6vAOzX8zBjrBrZ5dQudwt7NzuHlk/9hArj3qBthuXCRy4EyHBp+Y+ZY+QcRT/p6M7InzipfGJ3zX91Pxnhj+x56HRx18rfnTb+qev/r2EngdygPm7XwB4G9/eddbddFQbnbFtnae/bwmIibgwE5astEYh6uaJEyNKEhdGAqHF/h/Tz3xp79SHBrLr4OMbgueA+DEuJho7j4GV34GzQocgEgHO/f+n1HOEAy+/sGliM0fcNVUAwcEXARmwwumevxCOmL58BBctg9ux2MepY88dFqcnDu2XeSxIX2cVBhQhqLgVx4qn9p6LuT7QxpEp3TVfOPDknjPNHrzlw+e49th+FcLbX6UZJCfRQ4WXeP0xLuQbTw1/iCxUNjr7KqFnFsw7NkFRyUXkDjJj+1A0cHvg5fMfoccWPr5/F+ncsSN3LNtL4EqeAz5p4Zn+Pl45/9WjO1/THb/gnQVJtJ55E9ShoIlW/QX4vSLCuq3kE6l3idAHs0O7fwfy88WZ6icA0oiz9iVhQDx0XHrX0nuf3GcJzNftWf7j/QSkvjVxaTcUAnRPvXTe4Lzy9SGBF048Z6GTp0eHu7Z5aRtsR+XzloB3PNjmrXwmuBORXDLpQCCklMyyvPh27FC0lCtXcOB01uCKQ5s5MSA1J0R717Ts+O5/8ISP1ekp3Hc6X8HnIxDYwYaWqZRBhWb+2nQL5zxY4fWQ8qkAl1Taj8dWdW3S62hKaWO9oJmu1BG/ED51Doo0RwhGDHJxkbJYKGTJv1PChGOLkIqWxoaRKQvfQLGwB72VYkxzsNcav9b6j6Q6BxHgfsnTpgNfJy5SVlqFtnrPt+aYstY6tI0SEBIRkyRtADQafwj+VgtnTS3IdNWNNiwsdIxVYePgDt7NUfzMAU1AREJ6xn4j6T3wK5XDDGLjY4QmQt8wQ77ZYeTmmKDlgFGcCFnD4ByK8bAJsBKKTvaOkpoSSqMvKRs+dZPnoClQkkbFh8l29JWg0OIicZEWpVKTVFLCjl1UWga6hkGxv1y6KSIUx0Q8CsfoyA2RkOiz6W/kMUvEVJMIqcTgHIqxsRIKCntKKE1iU6Y0BwVJkkZ4R/8RZkICu0WJ+GXriy/1z+M4s8fubwQy08t1zDLobDCQu0q7wFjwqIolcLXV/w04fyNBmT5UaDqYpGbgsTmPPfRXs3+FV1Q/cuKB37zpO1t2PPzhm/0bbPCms0/cfW3VLOvMpPZ4HDt9O+VVH54BZWCRYSt5ej9g3vDu9M1Fp2Zfx26+gR3XQUN9HBQuAv1y+FH1cyPHrGKK+8C8iS3/msBjb1AJyr2nDcX64CIm5xbX+NPFLnW5K11tP5u2dn2HZ2Ht/NPWqVskYLoYg3Fndu5IVbeVZiKPUXl0yuFSHpHyKCQUnSYll4ySZgF7bljJQl27tEpbw2f9yxTO/2oGXYdO6ir6K/mnWEiJP+b/6vqkYushPcRNNBIgAI7fM5RqalVbSSV083iVR6ocRuVxSXgaFU+UlIWpa1sPjdF1fJXpKKFYPvS9Xzn4bv87CiYXX/abcKxLmb8uCOZ89XoK/bcRHf5zcKTLUKY8m08f1l7kbRhr00skvITCJwxo10sobD3QBe4QjIjFtkbk2yMgAQlwQAISsDmnxqsBLOZTF7NdUAJdHV0dFLaIMP33zAoQJCABDkjA5qCPKwq94/8RAkaFq4L/kyvB/3CdNNo9Ogrd+G4BSrIi+PRBhLjv4zmZQDYgzW3OQPFPW0No4RLGInhPRUSjRz0gGgiz43XxCGb5IuDBb4IgZqiYYJyUcZUsS5EqTVbaqN+4HaYdMe+CGx547HXv+tiXvvervwNogF6J+FGvfMIWWEjkKDHiJUoh9I6sr/AR51jBBZK5UCoX5cbFbFwiq6dNxspsIIF76+Y+iWaFjoVMP+lCPGAZD1r+y6y0GOZrCcwsDJYjFlYgDlYoBVaUK6xYGqwkT1i5TFhbMFi7dDg1xb5lYKguwyKNiDLKaky0cTEmUpisx5ZUtqZG9adnKfkKYRHfuOdGbbErnDvkmFPha9fc8cgahDbmDo4431ousK6nsEMr6+0s93WOV3SR+zvPA13gwS49uFInzNzuxJuVzUCrzOqna/Y8RfXcvdZxndQJzR+eI51yDdSc300bsvWMLBToHt7uIDNH91jfUDSCQJmi8MsXJglMTIMr7wSObwbV7+r+L0qE4Ab4p7ESH2vR4H2uoy8HeB5Q/93TwEJcGnWvshK6fi4CWnx2VuEAEBtfmH/zM89/9eKAF73t9Sh4yQuu/7Zo+dIhFzu/mrPe8a73vO8DH0bAR5HwsSMO+8G3fnTQywiDfSAbF594SkZORc2eNqydOIdflQs37jx4MrrpglseuaKPF19+AgQzy5bzLfofuiQbqFCpWp0GjZq0WW+jTTbr0q2+2jl3PA+yOBwmXhn3F5tRSaZKK6+sKv5Zqqu+xvoaaqSxdrS7Xe1pX3u70uWuds09r3jDmx646qEWTzz21IBx36Fo/OEnP/vFW73sT//6x35/6dHbS3zU5IBYQILb+N/3vSgxc47C0YYuySK1LrnsueqrzTnmG//lYbW+8Jry/GkipLvvmhPmEyDHgkIWErHY4oovJkHCXOKXnrY0hYaMmsyX72ybPXbYaxhoLQO4k+Wh/nmDCetrbGjYj6jx43g43ptb5uy8MuOa+fyXpElnutJ9PdZLekefqYGKZuVevzfuLfQ7XpZX6JX0w37Wr/pN/8o0De3/O781N3wE9zWz7Xlf6Y8c6EQXWtt+ct8Rn5cedNi+BLBRcMqCwf9f7wu6P/PLs7/5YD6Kw+mfl+kc4LtTP8+na97VP7s+Bme6sgafg2Vdz8tpdXYsN4O3O+Uz7yo/lLfmDspHMH3G1VL5At2vjg/Hp+PLRft3iOnd5SvwC+STwd/2j7LHh8Nq+0//qrec98B44R6n/eqiJya9UtVCIwYGtB+6Zk9s6HUmDuIiXifiOxprw6EwMUYqqJBiWnA3nMTHb8VVkxL5moZty96M8r4/N65MlVRaWeVV8eFfXZZ8xb0BQhIEvCvgPU7e5xs1EK6Et/ruq+9SuirCVonkHb7q/KopoNr8MxfIFEFgoTXlX3MBteAJKbiGIuoosM6C6iq47kLkEsmLUn/hDRbx2cs1KoimMHo9RTWU9bWmyWc1UkyjlMqD50yhLE5jJbSmuFb1mJ2qxG0qOWspbWbAB0SyxrO1pbQmSm9rGW2j01xy28ttV9naGXSkyzv4J6dmZxbnVhcVarGuBXeiQw+OPTny2I4D/0j/+7KvqOD8us+MDaRdMq44N/xB7CEjCnUf97s//HKq/B86H7nf4IV/Ws3fhDMUHp33SrfRRX5Yw3Yyp09efOf94D+p/5dAFNBC7H+w+BPHYBSQnpdFevwHBCmPYV1/yJh2cHusBxrTH8A6/GWKbCD9rm2c90A2YLXFBAiYNQUQOMZBAKM9cQNZfpjcErcud5evPmZv3o1ZhyRfZI/l0YmQ5J37Qh6LGkI07OH26N81Cd+JwxcLbrAkmDaYD+Fc5BrTjumac8YgCMrWwo9xICvFgOS8X0qAQCw+gtRhT1D+IkNJgiVJ9ukFFAESU2mk9hq1SEr1ONN+OiiWuxBzn9boGnP4fLLmWx+VKd/LXF+44VXJVnKaLNd5oV2JfKFPClBA+6UJsFmYdfs5kkyALg3gxQFoCQqoeYBGEs7g+u4fssgScQ5LlOyauhg9j2Giu8Bcpove0KdgY/gkh8GrkBlghdSq5ajLVlAgObAHsgnHHQmD6RgItWFB/0i4RS16ghPAvlzLVsCj0vymidshYrJ35stFH+DTcCWGsrwICACFBM8fFZWnHkkF/p1IFfzRASFCZA6W9qwX+dcQeNVYdIhAkgVEPH6TG7lalNPw1/YtIObxy/z4dYJ1flkkrS6hgdD6doewXg3KCaEVwArW1Hg7we8GjU06NL/IzXDdkJpG2xLPCXNvoHxNujxCr8G64aIFr1XndcoKdopjvdc2ADdbgBwIn1BC6w0gpWuEY95khJK0hCsJjoAiqYLyT9Fo1nIERhqLviSNhnZzp0pARgPppYCcho6gQAxKJECFJKiRAjtkgT3SoEEGFiF7HXfUg14DHlP4KPKEz5taS4c39UIbh2jjuJFOBUznqZv6aZgu03W67TNetIifYQWvERVRaM7fzG2RQ4Ex1DaNN3gZXvOAD9JaTsjZcN2asPi50o86Ar62yYfG+MwbleTL3ARR6Q7yA2WVrC5/dEXVawigg085nB1knCktB4of8LF5WHfsevNP4cWACUWtVf2XAOtwPRBIfywGgtAikO+iviKYhguPM+q1BnRBvffhOHgu2TQoN+kfWUCSpqDUlh++GAgBUEDql8rOC9sv7Y/eIsWRzQHmrBr18x5BSsJoFkV1farlMn/Hhzva1WvKnaykZIJxjTrMq7RVhfRq1FcFsoY+D/a6ZxA+7GVF2Ad31bX9eTNI/OMHkyBLW7kvN+ZbVmA9hAKcVZPCotxS83rcAqXDlkTwmQXadFQCf9990cIJYraWwGL9M3EDVBkdZPF6IDRpC4yk9GyFgFPgqM4ScwXSx2AeD7bcK5p3sWTpUxLMvYSld7WHPW9kJRi8sVN89TYEwoT33S5F7ZrJ8iV23BuOqQfsW6tXWbH0zTvRpUBE0iIvGiyYOP/+kRBiFPeLArONXANP8RUFo3dAeo+3BazBlQAbeNbhpqjertN6taNpTM2Q/PCfWAdeIHvQtiyJ1nyIrl7hi3pFjCES3enD2DpvU1+HsLwiLimvmG6COnhfDvWY5oH4tOkJNECyQwReo0QIPkDSdFAsTb1WowL+zC3FFy1Jm2HLmABYJ7EcEayoRIVIVjFISQCwORWGCNIMYpuC9AQAnTMQQaZBnKUgOwHA5BxEkGsQ5ynITwBwuAARFBrERQqKEwAMLkEEpQZxmdpTDovJJtYVN5bwc1GliDBVoSTbEmGB6kzoLXWNlEztIcnUidagvmyJblhXMo1LkmkSCZrLwnTLupJpXZJMm0gT2vnOruF/Ts9Il2DWODuhf2dNnOQhIaiX0IvLx7vl9aVPyQdg/WsBHPw3gJGbQXeRTJMpSXpqokot5AxQkh499HO1HYQb4HF01MOI8D25h6TIj+pF9GjhhwQ9glFCA3kZiCneMmJJSDIsQKk1jIn4Ri/hnZRwQ9BK4BqpNyDHVElKAJBTJXSRFK8TQiQtFxKoav+1LYzOAwJJbHVhovAdPFXwKilKmWyCFoKyShD3sbYEAZnSZjZEm2aickwkI5INbCwab4G3lCepYeSA8YT3kO7JHTFmS3tqBODQ/JXrKiXGfFEwYlU8MHGQjIlADKl0PVBUQHrwbfvZKjZV6MsZeSSdUzebv/BiVdOKM3L26m332d1cv+8NSp+o3C2399Zn61Np66/ry7f7H3pr50XiVhSpihH51YIUVZW/mDUkOB86YtGLvdBLs6Pvy6I/u00Hw4N3+jnKVoKFPPbFLHEuUoEoC00fSsYiJEGPujgnKjLJHNibbHGakiaMzJyhLWY5m1NIeXi4ON7xrykoQBz5z3NF4kZJYZe3e0/DOwe2rYXtAdsgwuVTQy0FqFWzZyoumGCcILkUBFfG5QSm21twiabYTGMReOYCHpt2xKgioZgkwVI8e2IoJ1kyfxkp5n1bqvlPZGJJiQgvbtWZilWiiBSk6iDSY6thphoVKl/JGZxHZ4RgeZFhOWU8wv3hLiDDBYzxtQt+JuD8oiyZfM2TgF2xD22RwGK81Dv5XALxHGz8JgJNTlVyvRZKjU6GCel2HVqzm32ztuud9qEX6e29uzg3aaaMIOvdS78NBfhy24sYjNBIMWvsHfypp9NM6KCkqnaUOJGu7lw0Se8S1AsN0GCth9zaDYteA9BIwGX9TNNFZFmZ8PL/lw5KGEBYHD1pGTHfaPxh/7NkCmKrLR8bA5YvkVBAYIw8AytviYSzxZ39GPoXfjeXKFmjUZRaIBKH11+RxP5nX9Ufzk/Tk/7pr7xCWsD1/JtNZsHMOzy5DNl2gqtRCmsJ0os+GmTDbYSBHN3xpQ9nG5QmFZJ7LSg+Vtl/CRlevyHij+uXyWsxbBJLAoYJZaGBsBiW6KbhPvQeQvrCmms23Erqs9IO3RTPOeQOyLKRaS71JhMA/LRWAHZvblxZMZg+LLY35jrX7oHFYkn+spuMVaHwVEAZAXt7rXKmxiu8RYt9JWxkYypp1TGslDeh2P2HQZCpEFeXKpIZFCRZUoSsIQSU43r6UNGolTPDEKhhKkL1YxWfwbIAY7BQR4JUY6MYlrRfOCDLN7GfGY1COOvWjThkFYO0IXHt3EupKlIr17CDdk3nMDTYOvUt7Rl5uhTbQcyCJN5JjzWjsulI54pGCLp+t8BIPatqx9UKmwhYFKK03h5dbtJP66o38tEt4cdNy1Kyp+R2aIHwvY8Z5p6K0tErO0IfU2ik5UmUMJmalRTVsM6e9B1PUGuUhZSOfX5rJ5in11pJx94gsNnHbDxY62goL75Sx+O9dgwowwpTQzJruzO0RMgeis0V+mTfIyYHBGbRBC2YRt/KLQSw4NZjO9iLdhzK+WVMUe6S5xaMauHRkwfqsoW3vLS2ZcsVCc9YFu6jbxz9gujmyX2VHS4SCp1a1LBxv/3FBdXpMjvVrT5SCujAFsOxN+kxijgu1dblnl9a1THaMesznCC7cXCI1141hZMaRD2S71GSKMtlO5usTR/QtFE0epH2NNx/41bEyqEm8sU9mXriOS0CRMt6JE09mmdUSMTwqoOqrsHLj1B1ircJtpmArcvSlhgf91oLRrqaLxN602BVWFmpDTgSHM/8U5Nq1CqlThzCQv8Vvk+63aTLp/AariengWdDgJ+HNQMHbyKYyVWCaAr9tF7MJwFrijSp6kW42nx55MlVWUgEN7EqHNnb1zssVLu2vjIH3jxCoo9SaleBMMlSgA7ZWvC+rpCS7HSrzUuWo9DDAnP3MfXK2zvDZKawzCYKFpNZdUNdYIRvb2KpsqmECDRUH20vz1z+XF3YJS3CcRsAZ850kLZ+hVGDYrVqR8HpkcR8pYXDArUsL87Dye6Xg4XL+G0Mgk5QWhJPuQ/EzBN1/pfDsPIp7/Zq695pNffsRv18U1qWJIYHm30Og7qefrzSpCqGbCE9WH06l5FKXYt1o2HMVuKur+M1RQwW5wCBHeAjwMMTUpIcJfC0VTuhOZyxVFNVNR6auHOgZSkVrcVxrZmn3EzbMBV3OcXKLTa66ly9Hk+CmdanKl1yv6T78HunYGqOlEp4SLaYMrvnYpoJmvu4j0aKxy+p0XHuclpGC9ywpwGrXm9m+2yWLJbXaJ9u3wD7jHw/aJW6fZZvz8H0T0UQSz2DJe1j4e33gtkudkunr7XOBEQqkMdcJlemtE8WSu3wfcjSsCK2Y0mNrtEm0ipdpZO01rRIVy4kZldaF+0Y74QDq1Lq8/ajzXi1y+dQgC5tJDtP01C6n8FyXKq3KsOKIz86In53KV5N2q0GXjp/4VI44dvMOS7nqcNSLWIyXXE1SZsJOpYRkSZ2s2U9JqCeAhhVpRzBkUxTnhyp43V8AqE+jUQ604tOI48mJyT7tfggO2TlP6GeeymUGhrpoEelYdjRsV1D1fChxrSMNWb0LSkV+8CEM822ADfXEBIP62gsdn+3kkrqVF+qjS22JfLlbMTV76miYredCIcXTI0qCdquyx1A3hU00OasfbtfLuPaqT0ZErVg10SuqtdaOIGxHOsABGBbQ5kSpDpS54mOqC64FeSW8ISLC7wHAByaSIGNI3KitSvVuIrPfKUWXuhiGy305rG/dala0cF31rdMjUklGeLw90fbltJhSJ5cSUZwG2q0kd+FsTffqkeitjKMFolP3EhsID0QZf/D1T4ErhIEJRlWhNbCyt7toZFZeVBliPc4dAc3Em/D6L81lRYyi1M+01Wvj+eoXLg5dS6Uh1SXmeQVbNuWBWKCJb2s7S/rwopGiwO/wrdGheZHoDT5S8XZj+bWU1mH3FFsa0n+xqvBOhMB1OE8uzDYEgbLyQRPHltcgdIKq7eMqqEomB55B63NSKRUD6GF37690Ur5gRYqMBEBq8c9u4A9W8x42NlNDQjsF2OfWAEMoiGY0VgyHocPb9vAqnIuxVGJxMtR30IyBmWOXAg283SXIXYgCUFjH4nP7gXp9NzzKWQ2vsE7nM3uolZyQttzaVPT2MrzQE0vjpcW+BJI5ZYclMbOAdzKSAv3+1YhKZ/EhWaNodXeH4sSgVBCGw7y//2MH00RG1gXsE9ml19fi+nlBxSNkytSfhpdw2MSOfWY9huSHesUBnGfhADGtocVpAhcZfV3ftjUPRrS9cUAG3w/AkddHoYmaA6YQ8PM8qJ0WH4t+VZJi0ulIgvROgb1Ti1LNtHs+6J15DJrMT+2i+dfbSBe8XK5ksLzMlNEBemch13ESo8NpmgZNVMpzub9wgq1ZnzABRc2hBJdbemcVyT9d0pHuqIsF/MDMJ1ScF18r0yxXIRBMHHCFPa5HyvJnkoFpqMiE4wUZ7rIbffRaFsoq66XwtsiZ0Wd6wBtypfnvonA6aifNSWlidSxOh1i9cuZyncndLkbaYTpHwNzbS630vguTUwZhhy6HB/psJMnQyAFWBawh+3Cxm7ETiSYuhamqcGQSuGiJlzlYX+hE3yqOnyGhdfXIhxbSAHOhfvHnsWlxJqAWUQHwBCrnOQDhpDUlMWnhPGTJ/vPmfiVCS4ErKQi/SsvOG1K6htzlU0R6w6hPRdNxff5UzUyfbr0E5SeaQf8a64kvJDufT1iqXZ2x/d1JXY5iodHmn8JRdwAuXvuJDn3/Gd8xbKi8hWDJfkL+6xmNZ3G82RxfGlJeaGDp7TaLnSO0e8ZpodF2c+LmoY45Tk+WxSR5BwwzKFaVMrYLEpfqrvEms57FV0bt5pUJn+VgfW4fxmZTcphsav3ssvBwtlQaTcyYLM/CC7mVcHHjCUjaSt49VOhgUISMD0HFyoSDYc0Uos/Qmaji8DueGGf8KxxtQhRsPMjSTbP4H3rDUYeiaEDB975YvFndmm74hBzrZK1VslAb4iKT7muu6scHQKbX06ZB19sj+wiuHHkgmbJGy2CYks6jUlp1v2BJBWTuSyEWiugp8vASbN5CZnkjFLqTNp7iR3ujfvlXVg/IG65ISfCglVdWMN2mUYq8H9vdGMyeebkPe15H/fjExM+cV1fLGdao59TKUeKL8iQDrC+fgbxswLXCtPXnX4vA5cqnOku2k74iJ/uahHHrb/UkdZTCQWj5DKHdFYrM7LaFFzd4npxkYOKA4aKGxZr6t3JTzTql507U+mh4Zf+bWR2Wr/cbeq9F4gBBQU82GCMrccTr8MRvxmfKc3l2eXHUuslz0+cK0avQZyhgCUek6gO3xQps0JgmW+pSZ+SgGV0CNKCZZc5ttBMtFAjtVy7RAemzoIW4YsRaUtgHiKVEfs6rrOEmprSwE5YHSZjZszdMP5VLXsmuc7CqP6YNaqFc7WoSWOkM2arTJDDD8y8oIrYmt3S+T/OIg9a4n5hH4U4lEw88PivJxNY4ZMECv3tUTYt3OeZZRm+qpyCgxLyYtnnSidk6UZ3hDfrs9DgFRxb6SnfgwbwMmC06M9B/pO7V/PvoqBsVTgW11ZCGESn2vjK6Hnw/5TtBT+yxRqW1AiuVC1ZmLHtGZpefMdIs9DevuhxnIkKSrWUH0Rfcwr8Nnv/KXYJSYYa8S2udVFwQCFhZ8mSCMsWq3MQbGhcvpK05Jp5HVsUo0VmjPKSQYuln7mO9Wquy2kEhvMn9WfSRW4GDbBvOmfD4gwJafa+JdDXrfSTjN/UWfYu363NRc7MjivntKrcXMI2wziJtRso/sIxdaWwYNTMT6vznWKhoThNYQH9ZJH2P3GnN/bhEU0zKotRKU7FY8jvVBq/XLiRtnLRkX+Gt0P0bx/QnoaVzW5cCaaOqyyxA6WWXAGU/34jnm/jJdMprQbqjMS4hM5jrsa1QTycY0Y6vC3rw0T6dnzAJJgftRvSuYzm1ZCU1LTxIR6Jg1Vk0m+7gFm/3rnl5z4gZ+iNn1MndA50y1yRiJKdVlqu9lNhr5vDHktHhSjDlgsrsVci5viYe2Y/KuvvAJ1P/YAn6H1UHsKt8oP7rg/8VtPXSXGEC7V4bXd5PYwyrAR64rFHFcToUz3VNiemyO5UYe2PCU7xscHB5RduNXc/tyjOyP0vwlkgt/AR8u+shTWP1nsE4njijjS43H0/LZ4ojhuHRoqGNMYm1MTqbW3F6WbMHmKsu2XIZ+XcwivEIxkGl+DuqoV57RUvhfTFg04JsHOrZZunAn+uz4gUqwa85GsFEckmTYB3PoXvX0RC4ajXkEqI1lKaeUB6VSqDhrFsEAP90o/vFi9BFo5YUq/QzzhmkC/UhneRvjQsnfXNI2iNqX8JccpRGRx4sewCKWwRH6YuPugg89FKh9PwhDIQCOAb81UiYtiX4rvO/nypwKclqU38ary9H+NYMECjtIUuAudIMBqzODGscbHF6DmuMgnM1BDFI7cs1oWoOUWr8TZx/RFOdE7lTXii+VMiruY0ZfHIJ5pDQw5ng0sh8NWS602OoovMNNGpeY/ncHQTDUBOdqKPppTxT2CQk20CkUGH5Ztw07x11coQqWEzlb7iNuxvwLFHBKITzbOWXOWPazUzYnd/fYqzf9uKjmgpx5K0YzKIY2UGKfApUAlbIDC+GIQpCxWHHoDb4TIbvzXma3j1OUWvFPYmZDDzMQKGvzY2ylv0Q9xjDNlVP+xYbm3dGfnqiYEwGY4XMU45+NxJeQUjLZiBQ2cWkGCvksAMFD4DSPJDPb/DYutHe3PAYqxLjk31vuBgUaXvg4r2XuDFtngfRmrHquML9ZGUl/ocxhy2voHYqOzPbgKT9lULJ2uzxYxovoHmtxAXjt8Dg2KLPsV6obfhIaOQw4udk0As9k75xUeLZHmFSDJ14KSYVA7bGL/jquNU0Far1/SNwEnI0f/IJ8G5C+JCLIvqowrL7qkYQ18KmXm5bbi8qLonb+RozzlTfWZsX0q4j5Ymy6QzIKG0RWnRq1uKT8fXOWvzh82QEEp3e5RmSM77/uPSxv8KD84UOYzPZDsev0UW7F3/tixZLiys1bm5Y0XEKqw6Zze3rpt1oaGRe7G+ayc3i6K1F2s4hOBQIHW+Jsn4vWSd7eN0NxGPjHY/r3ALD+A52EsZCvelTzhbXfFCiG8SjG/nbxmwe1oxfiZz4RoRmu5uj4B66sZ0ju3Jq7a5Myjl6x3Hnw/kynSO7dtNFsYFS+ckzxSJjzRNci1djPPgwcmpoz6j32VIJ+SWm2K+iMPKpnnoZGcqQdRv0+DKZpYf8ebpVVOuR12ngfUs1m3pExnnuxpcybVZX2jZ/LWA6XD1K5y3KGDLuhB7ey1iP6zwx5lah/H9OY5nZ8T5u5NHYI3BBcxLjPy/4GfPWHByVJG7oOwIv7mHfaG2OfFyZ9+ZhGp1D46B9rnkudq9HaRHWqm1fL3p5iaqa/qm42YV4GIdbs6/0vvHXoekNfA3DG5Y9mrZzWUvl22AbRinhYcYtQkrgXFWncRvNUf+MseeqejYwyuLMNoXcXt1nV6u/UHxWgxNiKpR7XkB0LRoJv4z/uDSQhZu1kaXkJV/76sJsvWq4knBgvybuPWhu909Ve0v5QuAhPnzdyxn/7tAG5yOEX4kbQJ1Yq307MvMsuObcK/l+0+Dmsqy6HvpHZU/0ftT8pZodMwIQq8mBkDvX0/blBNI2H3vefbrPftP73utKWfehyFLX6wTLlscWv4X0d/rINLgq50Yyu+9pfXvIAJsd/b3g04bvk9maIlKD5e4zHum5w04O6bprOd9QjEfCaRChjd1dTh5iyma2Wz56kylg/XePH3b/Oy4+co5LqxO7p5MNBVHlfpu5gVLfZX6rklesQm+97wAwn7Ojuq5GbG+jHwkgpmbkdWBFeEOS59JYEUOb8vWl7jvEPTS5BwlJQWqqofY3r7pZ21LSyyoSa6v+dLzkdIwtu40LmmbWw34eki/iW/qifux3hI3a+rdJNAbrAJTL2XWUk/50dRj5aszbMGVip8UeZ8r16x8W79rJl99xvW7bu+LrVzzuUqR91O2L09azVlRlZ+I55dDo+L1SewqrOS2362HI9cjO6ro24w57F3dtVdZXbfZdpwKNTOIs6kN6watSKB6i2wD5/K+Xngu/A+ObPVwffyIRwrPEOge00/+LUBZjDxp1lK/KcHaoiZ2MBC+kVTjxWy/jLiqdXUbT/0b+cfbJ+GnxY9tK91aWOLeoo/0XzW35ieMpgmIzYq8uiQRZOdbiLmza3OJq9s7Fj4dRaekIm758AhRMTxtuBnfQDBHaZUxdeoM+naL5Qi3kt0CqwrJYfcwTStOu3jWisJMgaLGnrqi+Bgh7jd6TL2/maxNiWnJElFWVpTsZhZbrifxucw/wVQRq401wxKt/d8t4SfBOpqNWVMUkkHPlUE/b8vDm+999d6t23WAVPawm9pJvfbiRUsnrTtW8jnwx0l5S1SqPrhPZXhhaJTMrVp/J6ury8wwG9JoeKlXBfepq8eXA8huWQ3l9AuW1Qf1JU4wytRSj/agESVuNj68cKq2snHx5fS+dYIbdYQOOfsQoFps1bdbb27xiV5NwzN8N0LklT3upXnqidndvZ0MmimrRhqvyLF2ksMcznYJRGF380HnHW1frvP8unoHdrnRmbPeTb5OvxLBIv6/rhtz3XpnhsFgz1jrfHOdcj8CSM+AF153B4y0uHa12n3/To97Tz55cvm5urg/HSdYZWG/Hyxx+fXWSfBjeMSLCNR84TVk/BH8QjKKfXYcySJjFw4n+1wH3FuJ7hesIQq647Qlze3AxpA21qdpLJi4WrZwgyaTuBeHzWoqRitqEnpjCvdY32V1RaflhPQnd2UgP+5xl2UJyBJcmmt0Qj46iUU0suMSTIMpr2P2LmQ1pBdoEuQ+N/+DezwdpOWI7T5uPjGibLrfxVurJfBsKWI22Q/f1jdbFm1wyAgLpOOSkjn8SA2KwcTncDfPmOF6Ml8SGFlqGXRoRq3U+zVYzRVl4uPYyTCrxhV1MCZRmB6fjS9wjiiZzo0pnFVJ88OrPCm8CoycSyzgxiWUD6a/jt+7MLA4vUySnVG337/HK8UnJOVVQ+lYGVmyO61SuZJeUEc5UBIWigDq74cXgqiNK46ena/dXCau4ITR1yew1kkN6n6WvjnyWIWFcrl0cLPIECp2ZWKaN9mKYoc9+wA1OweR1oj1CBcXLpHrSebkhnLSfNvkKlw7R2MIpiYkIcKTILCbFJFQHa9X9lUUpdvCqe3gzNSXUs/U9h4WVZt2cOl0ENM0kiDYzk+zfZrmJkqMrG+Gb2CJxQ33mQphArvABsWyweX57ZSjFcVXLDpJgrJAyCcLLhWQqA0rjh3WItvi5EocWVbFCaM5VMxo8dpqIRxzLabyxzWFql6WvpU801BGOVvaPy4xptZHu+JAKH5ytzqITs0KYKkwbRqtT2OcSImOIu5G92hNHCqZqCbwJzQFqj6qvpE8/VJlurR7XJj9ry7G9cXz/uePX388CTy203KDhAbiWpuCP0J5LLIaGcPOJXFEmIL4pIDKREmGv6uBtFJXx1iNPZy/kvakYdNxRZ1xD73JwpsqS0/YWlm/LTE3a6sggQ+pytuRGjfd4sf8ZSwtOUqngP17M+OOTYWKn+V0dIk0eFd5AOtgexwIw6VBPmlxrBR8bGV7u0vN4lZC5dUglOf7M6gab6bvN3fn/DIiTRdfgC91Jucf4rR186+05zOOWjqnRKXaTZTyStquojApgsnHQRR9baLcASac8mqNPqYJ6UbDwp1Jlm72xSYBPyazUr1D21eqlPWq5LBura4zTIl5cZcosFuGI3Hd0TBpvNhznbMc5RuwQENeW1VyIqE9WLZExWhZcXK/XU1kn8oxgJMdwOSjsikCZjl6KkAEBxc7RQ0Q+tg7RKHazkuhHuB9KFcemSX55n9bvlMu2QzEi/rU51Rg/r6zqC6daqJAfQ+y34zyDYqGKJWR0K/qvj2Qoy3N5NXSU57NGSj1YCROP74RGsElHm9AgjZug7n8CK3OX7Hs7hKT7Bd8erOvlIPN5eBK386lDcsBKfAyVeDvsvJDLfTNh8oGyYJyQyIbnc3KS5tjci3RG+rLL9DYrr1+64b9A7CKyGqXl1BarCKrHvvhjTi/ctCh88X68q5erKl811rH0Y8FsyDKsBxGQc3DoOecKTBYgus5KGzeN0FeQRTnmzDYzQR0viquCdRbOPqp0C0btMOIqEHweWDJP2OoJCckQWsh8dvXlB89KL9pt9NG7GE05LeBivZ+fUp0d5XuUGidPNVzbv1S82aQ2tYSR9vRTfmW9Fm/2/IdcqAJAQwXcE4xT/3W9aUyt+F2vgelL9NxkXO21D45wM393bQlsNE55/UFx33+Apq/h1Pr4uCer0ZKQYh9y4yhoUsS5RXBct/uWbpCbX5c4iakMCRdgYOYAt7+FDcVXmwz59810iR9v0gN8jjxxyLOfLj3ueTW20HxP99q+HgGRruNH3j6rjbyQcN0aF3qQhQvkdApXlClkGTap1JC5OGjuaUbmYXSlcu5MADUgdfiEx8mzVmMr2nqtIT8f93XNnNqiDyMBhg60P4akd8Gxic5M0pNglI2Epe5TlBz4Z1BvMau/hbZDwGSWL/5CTwb7E+rcC8Ww9cBZaNxHgXz5qIJdckUQuByUEJV2+UXahJy4R1BvKbOqf24mr3fLjGUGmUKfWb/bteQqfCHMp35ME20by7dI9kui8wmv/5FYQf5zNNwBgi3f0WyQ9tyif9fRuc1XEGsOUc5QFKgLl64cdYdvUnrYCbq2WaFNiJGzWPQ6y2ZB2PLy3YQSvjkzEheqjHJeziMHUOiZ9LRgoDknnRhrDlPOUhStWWSAWR/a++zYrNzmQU/iVrvqA7Jqqnl8Wpr9dFqx9EfxGcBZCrn4SqBXtFIULlCZZoz7V6Sya17OK7eXj3SNXLx9XsOXUjgEfDt29y3f8IR+iqODwKv0iN89Cr8uT6cKj1wUjwbE3wwTmtXefd7H0wjzeo2dEA0nbe/HepCq64FY/bqtuJnztC/uQGyOVtukWcDMo8atz5exVAAOThbEfAsUCvyrR/lLelf4GL9z4J7vYruODdzjNeEPDlI1c95gNZ/W4jHHFKuH2LhRZCgUCl8npT4xsAWKIMzPMJkTeEpWaSBtO65gcK0Qk0AF670kZDvvrZL1LnJFCNly3sgu125gBMk9lNDIi2FaMdF8FQq/Ye5pP1bpc/STQ9t3iYnxzqdWKIz9JMV1N2xLz2X2NTJPms2u76pa+tLy+Bu7ro3N3fKSzHlPR2/v7pLx/Gevs7jM/7OY+CZC1/T2PkhvHRch6rNX6XM/ieDUxB6O0wfQZmZnsBinKqmtW5+E7JoVwUX7isZvRzJYp+tZaldJmxBNcZJrfi0w24FIO2P9CFgRaTq09ub6o7u3WM53tRi4bhxlmMy6vLxqXXVsXLvPx7IoTfjRcK0J0LN0um82OLonDMlbcbtidVdDKnhdhyduxJzG08WRRkjM46UtSoH6XnDPhp9GXpD39EjA6LT0u36n4S2L6XMhGyWZKdaYnwnA0AQGyqRYvC5cYQN0hxVL1PfQj67qtRY6F6nvUvhc4Owk5gtCJJu36J6fd94FM5ar8gdgL3FhEqcWaiNG+wZFwjA/RNqcEZnsQ69sdhxs6+9o3C1A4kFzQzgImrnvtX7rhaBICuzPs7JpULNcw/1p7nONMCxp7m+GrgO6VMTSCGoEnjhZr16JDQjMss1BSUk3QuV9lvdIT2mJFhsCNtjTobwm+Rh0nC/EaYF8GiENGZ8SJFW3hOiydlO72L8CUYPLJGpzFFi26/fIN3s6lOWroqk8p4A19eOmTbQDBnBZeFx/vLr3JArAz5YdBIxJTSJF5aTJIurN3wQUazdwjnMcjNrxSxYKO7Ijmx0OJkuDdURpRSyihkVKKElCCJoUwadhLaIZd5x7aNbrLdef6eas6+14Tgb2I9EN/0m3YaWmDj39EgXEtvzk5c8Pr6T8YGHTv3OR1DiOuaZvMUzCE/rEyK7p8sHlDNdGzGucCOyE+nTkd0IpC7QLL/Tx8VgkNedDor9cUCiRreuhmwquwJxQuPdpyss/8AnYPatNLZ+vgneGQfZujIy54olYKQ8ZjrR3ai5hNhGnKfhcDTsbzyJoyHwEG+DlCxhXLXc54IkiALxXCBn0eZ+I8JoWUa7pXOcLn8k9HQPvRX3bX8PRTfAbcobAcJ++fathXDMSfsTJ0rslwqJ6K9hx2Gcux3cWlrKc8Ba+StFK9B0FHmpc/+qq6TJv0Envs1sJ24Sakv7SHoXIjWbPST3nqRI//QEmee+uZd/2+1z5PLq2guJW79cM2/DTsTwLrz7OCtd7ShMH4UIj51S0J96aD2/0n9QHHNP6jA6Jc3uKar27rr60sDLlc3PXw37+Wm1MxkOsu+u/4N8WtlEmsGGIi/IHgPauW8YnM+2F46bTqyCLTx6GT6b8ZHR9Vu1+cPq55GZS91BpG7c89Ujcod4u12q8O7PzD56+39A8ynvg9IxSueKuYYj0ZDfFbSskSSISva9jlSFN/A8BMOXWk99zkf7M9z/3hvgi2Eqyf2Y/AU+cb7h2Hehv7o602sBNHCKW0GQSUjlPD6pQiapIHB5lQS5hFTB55HK5ZItxP0yeuLEqCgxTat1MHAzHMBF3Rmul/reBgi5ka6buT7rHorWwS44xSEBiTrw66F9eANtGvxwh4sFYV/QWQjkn17r7ov6EMmbXQGpbfB3KnY3a+4htVsPjAqNCszl5ebuPZweFt6xK2odgPbsZfUR+2VFZnQanHUsCCGIlQDkazRUhF2rCa4gclCBmHu6fyAoMqE9wltJ5KADsfd0LwHq9WFPF81ml9ZgqDKEzvMLDklEXhTDPRdoZlzagqCqUEb8AqnAfeu3A65u6HA06tmTQcnALbYVGuf8M9RrCniqocQFB1XQmy6UPRUYB6bUsCnnhFFcDsKgBxdQwJLDKfxefr+anu5gNbAAlOxNKSYwBd76mFWomXlrgL98fsZxVYy3nikoJgAoa1lCG1LKIBjYW+l0nlLhh5++lUrQS1nlWLD8QgARzRsWwgMJSfBhXx6R6MsZSoITAoXwITSnkhDoRgoMDyRo8khuwH7sUACSJeHC/AJ4sAwkK8AfyTDxoAF+XKgOycjxC8CSAiMC8FQxAPXbgYv4Z3uoutVSXtydr1ab0OypD3UfiKOuAPUH4toHxxvQ7P7fXv9K7/j/D0gqtPzob4q/scCXikRkVXEQbQyVZTKUYgDobevhEiPOG/6FLYF7y9hfzk2EM8rA0aiO9DqidpqBz90n6euiJBcm+hfZ11E/eJoG84I3R8srMD5jRzBCGOoHfO70nsyGdgLW8VAPpul/sOSZgzDlT4RhtTebw5LTABPlwHoFteWX70BnPb8KvRPr6JDIa87WdZMPGCoF+xrLd8VodTtjhtmHq9JAPqDrblbz7R0E+p1o84JA5dKxbORoReF6ytnC4cLP0wf+yxweNhNMMA8Y/0e7frRCjRxTLg0EAjCWgeARGYFCT1pokPBgtGpAm8404lnmxckuNvlePsTPc5nZupoMZZ3GTz4493Y8l0kBfOYgAo/uRjsgm5YcEdQrBHOFnoHJGBE2prFm10HSUgO3hjuIUzIW7lYswp0Ms1D5AgTB8fEax+WTMmQcJ2QD+v+LD7+a67A79pH7cqA8aKWkOu3h6Scc9II9ORSbUT2CoYT4IHBsGcJHysaetyp3JR0suoB0SApI9cv3SJD3BBlUUbVCIaGYKRVTOBFYsfvokOOW5X5MRpyEzGYGy+P8Hmm4noFxUvhgqgPypW1bPILBxiEQOCU7Srk9Asv+WfkHQPyKRfvASGgbhG90oC0qCGaMMAh1S+mdRctdHNf+8v/tWpBZV2wy7JhHiQLUFqhVNsSKZfjDQtcW4JT2OdLSJX9dzAGL4UQBMmP7YVbMjna+a0rIlpR6/n0rGRz94+XGPWz0ty5vMT34ng2vpr5Y5qu+vQAPMTH1jS+nvr74VjVvGf7yagNWqWC53Zd0f18NbvGdXw7jNcDu9uJtQOtcz13y1HDe5rYNsw0QT2bz8Kt+ydadiqH7PwdVh/498i+Yn8avw4M6qwKA3aPSIHB8pN+9HxxPUVBHioqHqHLFMHWYraJQUIeKimYo5ENUMBgdFEux+6490mFfPjyOxex5+PXZrMvXjgFO+dOcwawDzXEVb9q1sfyynD/oTxGvLXXWQ3+aM88v08a2v2mLa86azBkAYrztBzInKcP2uthEw/xWdZY9/kgs01FlZWUeyBkECnkNWOKxGvbBU9kB6NAOped7GDjlefR9gK1ONbwvT5tewxenS6PtDYJMntYXB2FUdviz3eQmQYi99rEsY7BUnMZ3dKSUmZHqlmCVKrAmMcwxQ6Rz1Pn+gkwzvZF+/NQQR93D11CGf2JgjUrVEqyOzPRc5AiOxnRzCrkYxMEpITlNGmVvFIpTE8hNbDf/jkoIA/cCH3sbQqSS9EQnBxmOipxyn0GQHh2WslVnd2vvI/fTudOEPf7hW7RhKRPaCByGvEU3rry493/up2a6M035NlMdy3wW2GjsgHuroGHBOY9XNNqrwxga+nmuU2YdDM1bJuAm8eX2zxOZ0i9PchBweWw0TGeecuWBMW0/D/dXBJpni7EtT7GDIsn+LmfQEX/heP1EOrr7gf2rQVSaPqIu+MRTN3pAKIWhi6wirfsVKZfz06EISClMYrt/bvL2/ZxENPjneFMikzjBmniJoFmG/xyTweaF1xqeeUzJrxIkHlI7IIHFa/RiBsFe4m30Kwg0hknYIel0icKSjPkSlycceKhuo68G6W0v3oLFR66MwMIol6W52xMqC6iDMjV1ZeW+AWNyxYAuO7De/VDJT2seZJhrI6/+uDPjvOeWzndD4OcaCkMImHsT8VWJivwgVmQWQo2RIHwpjCTASNmdxIrQU76FgetrVpTrOuU/OBTMOI9soMCjSU1k8oAiLjCNQ01Dh+k3M56joD+5TOSKT1abtfL3uhWy9VF1uYIxHZtoluQWyemIaEH4AJ8f2ZqdORSdrugIz0gmlwo74W6/V5h/PjrrFsRDYGFsf9T9fx0xfasx9ID+JTxZjXs7WMt7Ss8CdDfCVwKrPEahC7YwWJSkWO+VQqLg+VaICyvF+hFBkkZSMjFdsg7FpdHOa1Zz2+PSHfsz3vVuz/n30M4vyhVr5yOSSEWxFQhRHttVfmAy2PTwp3VBpwvJs4YDK4b25l6KKU6f8t8obq/MGIs8WlAQf6yoczQpOdHIdOHH8tvoovjUwDg+IpsS410eXaDSlrEH/FW8PMhnEHX23ca/2FxhFGt7YoV+M7u0NmGn3sjeWWvexswqXsutiRJxSI5On96NcY+iGwO4SbhiNg9vYgnT8RVK5z78/tsvtwW67+7gkb7/aL50fadjT/+ufSN9DbTf3sFjfb+0LaOfhcap8dKrDG3ax1t3/FbcrNpE6JKUlIp7CdaUFMJ4/IpTUtYl3URUNf9WsnWX9ikIc34dyXEdXozx/V3yPrTao2rLoZ2N9ZrMNgM8bvzIlfCDfva7lBsaYEzZ8Qa3kUhaYhvPs2oLUSiYbtTozQUsVk6/Wbvn3rZ7c+IzFlUrf1nyIcp7jAfm/dZYW2Viq6rR3fPUsPvb/v0Pt7rv83MDix4b2eFmtbo2nMutC09Vh5vZrPDq6VUXweXWRqjVW2CM4QdnLmBq/P09jwuc6ecPZ7m+lmIDZ4EqayAysYqPCiQIUFXIxC4Lya8WIAmBfGQ1kk/4ODZ2Qu8TTc5CrFm9Kr8wMvvoB/LO2rlqVUHB2OhuQ7pl16qtRkdfm4isNWOrABqe6oXUZVzs7z0iKOg+W8FUJ8q6E1zsSy4kRbOdg+lFRFVKfKuTkseU2Xg/dMG6OcLspzf/oVfCj+871hrOdyvMel3uaPdZjUbJybtZOlD5g6hrpeq6c2NHrcUe5uiGdakHRdurHGo3GAnfTff6npL3HVZiK6B0XOCvNC52U0sAF9IXYZKx6tI1FGtl7S5h4ZLlz5AfoRLne5UOlzO4PFpW3xkxZAHdqA68hH3Mdu+KKExmtBoEsStKirdy8hct66E+QCWO53Id19g6w8UylFN7PRuxHbh0Gbsdui9tHCqfzIU+tKcv+yExb+nyfbI/YGLnu+rla1aUtCUcLi2mn2joPS6tWWR/UPYRKnZ5InFoskjJgjqii8PbkWwO+cdhIUKX6wqfAQH7fQTYmj+15G0my3ZeqbjOT8fipI0qox7p8/1yH1r9ykqHGv/akQzBwPPvsCPy7jMc6O0alzM9zpCz3V6//genEX6mq3qrAmPmG/i1fJ/bPvu3PQPfjIGGE6aQadu/2C2VM0tK3FlfP9m1NiEOAePp7N9jAn6/fk+oTt0fVBUdsAk9V7KM9Yl4Q5bTXlVGGJXxGzWp1oDRiTc0o++Y7Fh3owMe4RXooEuz/DCZ4vW/qxQdpkBCFwO2641piduKw6eTTSar9h0Wu01Pi937Dp1OuS8hZcUhifvDk9awX+SNRZFxlMLIkUN/sVpDI2thJCWuaOxhvwBayMSEywSxIwT9dOabzw8KkxnpkxX7/+3G3y5hG6/oalAt1xM8kOGnz/Sn5CTkoPLjYnxVswrv8FAZnBYayFr9/Jv7TW6OxtQ19dnjEboMa3RFLn1UKwnqFNflV+zW6HerHPzAUoMs++1wPbkkk9IpZaNyKeLkyMx2fPuu5tykzW2mA7F60+aIiqykXpgqDS9mOLz5/op/nebPYmcTWRx0MoEMTeVTu7CmdanA4sunoJThUWj5rBwuCUWg7jxyBTfcHKm2/E9WpVtc8zzXFJ4oNHnaMeVFhPDVl0eAStoXq11GLN3DqKiM3ZheLj6xou1MXAmjCppDTI4NpmuSMB5UFjYdSeeaSEKZXzmbitXz2EVYXmSxS0s7rnL/D+lBa1jbgPWLVRfo1owZ6XhXQ1qHZZX/94H8P/dH7kNAav3c1NVVxzAEsDkYLZmKz+KwM7Gx8Zl+bA4uo+SvaO+nEY14nmggwpTLWGvUcbY3Wia5hQV7WWYLfU8u3aM8sJCSq5Q9eTKHuwCiyowTxv4+USpvO9PtRUQQff7MJguAjUB3eaY5hTtNvvf6Kx3NP0u8CC5+fn+eO/jrp+kOTvVjBQVRKcgfUUlBAV7Mjepr/YOrlnoAiX2VUcqMVMHCyEqfg0gWvrEk6A8aPz6OoOJGp3mHRCkgtGASfyFDs/byZv4/q0xweOPxn6XeX6OPE3MGVwT84kn4jxD41bpt72Ood5v18I17QDwpXv7BkXOkZUcApIxkz0j9efQK7A83BGA04YdT6Ep8GmC0iFZM7J/oHc9S94+vAKM/1Izng1j4WZ2allZaptGIRMV4d6GwrKy4Wg10736c+THzEIKhGDzsn5VrVzwQ9MfkT+T/S6/A5X+TD3dO3G7/sFbN/0wkfnTZPP7e9GQtJui3GeBnNfms+OxXA+uiV5KokTlIPV6HJKI2fPEyo1rZ1aHsyNzHi65FEjQoesC7mUSnsa0gcfhKDsJtbeiC1dnbsN2uiFSQcOv61bzLjfnzaksEo9uc+FNXcxCu60Dhh9nx2SWt9uOjmfsy+8b7CvcVgqmfnMaF8tfM2ou3Vpi7D1+NcB0J+VCfEoG1I66o++DCqz/k4x8pCfpHXKlXuw+bxbcuFpi7p+47uo6AiOLQI4hD5dYpnmhIj11XbNqQoM+w0sorqJt0HhnkP9vyz5extaHhML985FlTSm25PJhtLlorPOVXsc+j+Ny56uUb9hQ6nPtRUDZTeT5yY2ZNp2wz4YhNxgZAaV4ldqldnhN8Ubo/b6Q+vz9OREsnxAt8DLF67f49qz42joT5FrkMYJS+aAwD/SBCRttPgArVrZWZA1FSVlGksDbgwqDtjW9EJiHapMpaJbjqWmH035llLmbW0CgRNEB32YxqO+5FI5G86MfbUOie4Ed6/a/BPcwz9Sv1aHPQqJHjUDqJBKUdH+ldTmsNS9aEN4lE4Y3JmrtuWlQqUhiZwD16lMoVRGqQUfTyMJUmvDHP0qSqTo/SIAWR1H8jCVxhZCoS/LuWUhCizmZaXU2rfPndEjRZXBUtNvh1y8wlbYvb9lqEBBlC4xSVtopfuCLuSvO1BNnoh9/aVqlHYgsKKWszK5Jmu4enFSbjyqTgRHi4x4n2U+X+LLeuCUf7dWfBIv2cfXbUsEHXShJhRQ6Am2rf5D8PjZV5VSDlBbbYffbGqJGZEbO3ZsDrU1dFAUiq2usr/Yc/9gyil4awU6BLpWuyDjsJY3tdGNB2G1mVDZF9fnEAsCiP2tfgGnhYaPLoCxCff1HpPU7NhOccPZTkPDGtf6N/Nj3uIjwEAp/OfvUBgrDKy9xZ75/9/vHrzomOSe1efMjBOfW5kDGMywkeA+6/5cGtThm2gLILpD1q3iPdPHB61vOd1TBKeb9/+JyZ3/7y2ss/ibVE71feJ2tP2nGugmD/37fVbaNDMLC87JD8hNh0ZvWZujN0D194S0/Yvg57t4Gf1wwN1DlWbftUtFrol8qLMXknGZ/nttlmxK9pyD8SXWN8+2Cku7Z7Db3peER9Dn314qwuIP9stpidfPQ/APTN9IJAoSAgJ57hn8vn5uKp9FxCosDPGEPD5LH52QHLX30699Nb9QiqYg25opBtzTPw9rY2HeOXlBzkNrQwj5ZmyW8lV2be+3wNfwpY19CNWBYDoyEz/HW8BL1PbGzNeAnrZQYZo2ExjNhF7qVxKZh13pKvz3eVZIbaj07Pe8gMLyWJ5C3ZnYzZDm/zb5ts03HXNBccii0urpgx5rq21+f9CwILJ8ql1N6K7IlYvX48Nltar7Tca4HXpyx5RKs6rTKEzqkKUaWFtsqVoR22VaEcTne3f92xVRHvpdiyDe07NuKpiKd4SodGfdFbx72kwxV7H2vWMZSNez96WpW/y+WRrWrNYzQ1IYWQVnpVSK/aOF2FQ2302JbW+Ci6MHUWWFOhpIUqOoWjSVmZuUzzUXzskRfUKeIXHzp7NcoDpdQHIVOuWnnOZoDwx//jJ5nynY5eol4RVXMyjykQR3BIQTS30eE6afFnMMLEJE50kCCmkIHgYxkrgw1qHH1eQj99nv7c76D5vdEllPoroqmSHWHM1+I7+pYI/O5etMW0HNbdp33CvXW+r1RCqvDqcObvJ7allzN6MLtL1rIjumHXP3QpT185rsITIpe9t3G75VYKSchoJCWpka0qop50r3q5/hebb/tst8woojGp3aN+8nvjdFelgtTMKFbldm05vbei+E1XBrxUfTvXkDsYid7w+4meEXicXQ4TIlZOERuCU3rd5Z/FGdEGfGmyXM53a8CNC5+IDk79r+6PCu+GvPtOPKsD1jvkPM1tVX9kOS3zmY4E1ZXtHl+Wlx2suiKmXTQ2yHF3ZNRvw3JFFz3HAohbmV2uQMRZmT9a1wpVDfl+TVNlzsntV7cbZXNMV7Q9eMEOP4tzZVLxp8V2R3Scoe/7b3lNs82oQlDH/ciSPLdJyZ/UWlJPtPi6nDv7HtnjhlXerHI5HPOH66ocujETshVIHIsfDqdFfI57S+6nb9kMitvLUbUd7IQ7fEJ71uOR7pofbC310PkLhzo6klDDCC2mtrM7666MYP6l0168y237vd3LusofziceefLUX3xgc5prVlexH4oJGnL/MdNHW7wxFo/U9R0zFiWnXKLPxcKjoBbaYmEnOd+jPzikv77cdBqmmpnqgjN5fkh15H/NQC02wx5Pcuf4yk/AYnKgGkkDLBaw+urUAkuMDgGAIm7ASX2LXSy5pjy6xmDfyTXhbWnNxo44BGNtB1oLajn06mCWZtxtm32BJ04anphdaoWxwc8PniBajzmbAztXBCKF6KC1FXSCTtjFTq74ZGY65Z+iF+wLFaZHP4VrN8JnufsTxAWdL0ZZi+CTM7c37edTtj70xVhSooXFn04hrTz0GTnW6MfyFxXpEcw2NFa3pmudq9MV7xtufqZ+qm5kvsjEYFe7/u+k9XbUTJmIcn+ihIP7jqXFCZzCrbw9B0On8mAjEOxu13mWcxu3ei8FHNx3wtc4hVvtbl/RiYAHzaWpvLujZd5X2gvEQNH/5bs+uM3YN/QJfUrfunj318/7KukoBRaTtRriWVBXDH7dDrvP/ruoNTf1DEUN7uqV3VcriL1V7kDCwZC7DXACp3Crv1OcDHBvAu+LEOfy0CnoK275IoDF9FLovrgwdGNHHAy5aYATOIVb991euuwsk3u5f7QDDvLE6Mo9oegj4Ak/iBHcp2B3e9+AJ72Aot8z3nvXoVMvXXq37PebcaiDu0ZMf2hWwikpIDCxUNj+0BcGsV0L5TLWYMjwGvh8RYjz+bc+9JmNO7/jaYt+DsYpeiRQxikuNzBO26XtyW/Z8ZqbR2R5nZRk7zGCmEq57YSJlBuKgvR2jxMCiYXC9k/ue8i85K6Olxl3ysoDhPOapOfkfdlOGVHPPFRzjQzfNEoeHSI/BhcKUEgoYLvOW+QFeDKGapBCcT1GIaGAoQyE6e4+WiGwUNiy3Z2CnDKl5agPEH7lORR9DX6dLej7QwCFecdd0YfHTV273nHcsJwnm4BVfgqAAMOMLwXQ/un39lz+jh+lyl9f+ufM0j9N788Fn3vKXuf8/1/XHyvji46lmo0AF0D9cT+y7MT0nk/sBdqn+wb9oendbYZupI+Dw3IfKK9cIxtONLHU1z++RFvmR1pPbAaKKhmTEzGQP62VXgBunrvGnouztowZ7XOPJ/FkGoU2TEBc0gF46mudw2N4T4uabSPlKhAxLUNYOM+6Qy+jZNA9vMelgu5uGPsz+8jxgvrbntYHaqUe8ALdc5J6Pa4hCXua0e5U1j7mP1Hf2+Okf3amrTrRfLC3nRWgu/emp22uf+jvph3b3B7NGWzaFd10UOLNgbZ+Gw3bXN9NO7a5PQi+BseGSxB8RG3OPnBEIK/ekYZAeflRrDQoT1bioDxQLQzK8UovKPcE2AVysTXU7Lat4C2weArbJcLALSs1eA50N9y07Lr+xgB5p+3E/FVCZNrm+pteEI8kWkEWJfuf1BbyU20wKT9vqeB64iOJdg/0WHeeyPaKzvDWHNDfTTsgDuiMAAQlGNY4Gnpd361A63EAAW/8xBGXXjA884mmfR+gx+heWkpbn/2tpBPL9j1PT+9wTyL+aC8G0NP0ULYU6HmPF2hXe8d+b3J1N2oEtorTQN8r9aCqxzFibN84JMgze14PKPvLcizWzXvsOKzzd++xTV28pWuPVdfntexIPZAHP6W2mwVpe3aB+v2ez/S0sA3LcC6eNPd5So1M9BjdS0sdVozcBcrXQAH+aXTf9MjBc0uooeisteCsKbwH8MWGo8orO4xL643sexlJg9+HSIYGbrGfJjZBbGkX3z1msLpL1Wxd2Lpntu62rbtr685Cth7PNp/pITrFhjF+D/67fDUYzAVlL/7/PyJ5Ww4Y1hBQb+gIBvV6K9nECOKDdsf10/R4S33ji2OJn3RCyt/B/r4B+PgPrk3j+uNz++nV/yvZ+XcGMAIDFei/5tMLYOS1x6v/RQ9i/sexnigfrxCeIX+A7q6z4v9OY8DGnbh25raf9NdAH8xdBKC20dxA1Sr2PNv+vlcpohx0jRGlbCooN9vcYvO6keT6OxXCsDhvAltSPNTJWBfyOM31z6b09XVtsQoe19tOu2Z47h/tHOTjfNK7Um5/3PbXWbwLvOcbZnjBJRa6cnXNG5Lm2ZLDLINCeZavUgkLL3GoNi4w3tHlT47ZzSbCYKprreIF2zMm9+3tgSHnDSSvkg7wwJRf8+VPDBXr4N5Qxl0qe38wZUEFryxdKs69bZF+UPU4S++N9MMZ6cfaumS6CowN3Hui71qH9WF6h6RVKey6NTlvS0l+GmeMP3TNamawy3rdxyXxGve5jHsMY577NnFZb8Db8l1QcX8/0uVV+fdaWVbtCiEcBFLP/xM0GX4dFzx+lTMx0iZKVVXiC/KsFl0o4QzIwplFWC0ToVaDRjZXPHS4mrqgBdXSC3yT76yJ9IsM2ZkUV4qCdVDX+lDc8NM7hy3tmqIBsb5vWrurZH+qmR2U0ZSC8VHG+KCgScvG+5qiKBzxOmaVwvrcHXOV8AHg0mDBPGx7oXN1OXkFWzs3iqnxiaFUMnykWIeOwnOttXnotB4/bMo0rS6lo/lMwd7Eumarh23IqnV8/6x7veRrUPFVLX+Y3PPSZ4Llq8uqopZqIw8O3AWbkm5pL2yRZSJ/rJfNIqyo8nrs38tixjr+fdHbuIP29O+OTru3Hr7qblfUwvb0Lb+TbkvnW0R7n8uuFLtV4tusJ08V0Uf9eHV+O6RwOvNSSR3LYdVYL6pFDHWhvH1B8j4sdf9SitlkxZPgOdzc8Y5/9F0ekv3PWe9qQe/Yp/oA9QAC/4owZ+oqcDI4k3DvhH5sMfmTCFgmRaHq9+ZG5BGZDW1zaAo3w/ChX3ukXfueOW494bzdhbxa0cVyil8BAo4t45nvQqbFBbFuGRTzAkj2BQgYGA/ExKUIWBgPyTGeUboUr5Z6N/9C9pCsHrAcwiIcKdtIy9i1pc/kZbq5tYxfcXvEsWh8pGCU3sSzAIplLQ+4cozQ8ZphtnRRcY16HbkMfqkPebeqh0xi4DIQCwPk6oQQLhLeuCdFXLkqto9j6xV8k/2Ifget/u57MHHgT4AR5qF6TBcPxpYwFAcI0YUZIuSB/t4lqw2pg85mffuO+jXucSegGE6Q1Aljvq7vEcyJuVu4k+OeR0HxlILvZVT+5/9/UgoBG/HOLyO+RjBiGfG+LyPe9GVkFXLkOVaMXEYuI2uRyF9T/A6O4l9S0eR2U6abmdqsszk2D2kyFCptqGoY9jzEI/0GgsYweAnbye3WOGXzXaHWwAiK4QRJdUpX5/UvhXoMRhMIwcg5M14mh3MFJEUzLKvwSsqPyrdHSrAHkG5xrLF1tngdc7dwZ8S/j2Jsx1U7wenj7FvyGaUfs5RSJvX5aAwKtgRFHFUIEIGPvuvCf4FeOVChDYwBR1A6xiwMWbN0OgYChcERSFQGRAg+YhPkLHRlbZM6rwQAAAAE9VUFAAAAAAAAAILfvAEAAAAAAAAAAAAAAAAAAPAp/n/tP6XlNGvpgLf+o+GrjBht/C4TTd5pynQzN27W2Rzf58fPr5AgU6i0VrSk62tXD4PJGuo0DHvO1rzI+VagbaEWMS6WCGIAGqPAy1grDPdMbm0/6+x0tTM6h3WB2qW5eiuJX7VOr6353W3V0dXTNzA8sxl/DW+EWCKVyRWVulRqDYygGE6Q1FlM/V5iZd0JPZ1s75Thzps4Hgd6G7S69Z02YDSBEIyMNjxPl+TdFjvrjt2t2B3n5DIO5wpIimZYruuw2/P77x6bKB1wfLH/4pjllJQflb97upKySgKamIQhU6ZtTadbyJm2GuqzqtbotC1pF2vvy/7r2q3t+94gGk9rj3sb2nXo1KVbj159+g2ckXT3UYwZ34batGXbjl179nee9/tF/o4rUQmjrEJ9zuNdDbYvW69rt+51qNegUZNmLc+8OBzu3Y477QSnj7Nvz5XULyUtIyvnVIJhYhIdmZLq0TRnOlVZXHDZFes2ZurzfvDPnutps2Q7TrsGt1fsrylatTXV0ZdNIHsTs01pThf0b/r8N+rrpO11yj1TuQJQqtQaEIIRFMPPNsY94QAQghEUwwmS6uWu3sjp1QwsxwuidPK0buFUbkM3TMt2zp3ofWBrC4qnNON7mUdlz7/J1ufzJQGkpGVk5ZwK+REuD1OIyI13OpCdQENMgpIpqYzTnOlUpXTBZVes25hZtRrqszptR9rVtT2xXxOsVdsvdVTMzt7H3tsn1PNhfR9tYIZNSDclX1lz1YLnO4jt+eXz+WIfx/GbSFbffp1E/nIKkMkVgFKl1oAQjKAYfsQYdwlVO6bTG4wms8Wa/jTDcsfv5D0gtp2wHwAhGEExnCApmmE5XhCl8h3K6lzX0A3Tsp1u5jHSN0rL01rhUXc17MnoKTE2jY3GAIcjbAK5sBCRtbC+UAshqG0EaiNtP/Ss8oXqIwAAtQ1JBYDagWG5tkEQQ1gBAAAAIFqOoWGleInRHfxlgiABQmA/iIGkepDVjLFF4neZ240UkqIZluNDbe48ovJdZBJp7ZU6ayVJkiRJkiRJkiRJyvEZAAAAAAAAAAAAICcHAAAAACAh1xh4V1m4HdzF6QnWg5VIIlNSSafZdLqFnclqqLNyfJfrC14jG43fZjpe4/g7AcVwgqROmPHrrfc2tOvQqUu3Hr369Bs4I9nvoxgz3rRyC6RtVG0TW7bt2LX32P92MgaGjSMLAeEIPOpxoKsiao6TSz2PRozGzTjeQvbXOF90vSUUzbAcf0J8y+daFKnMnUeK7e4pPg/qfG4rSQAAQG4cAAAA4Ff7LEciVMKYCDqgTfAXMYmZTEk1Os2ZDvN54T5OP21WVbsc21P7awasxexVE7Yz5XVi67VOdI+EOTF3C3daA+4pBQAhGEExnCApmmE5XhCl1XRr6IZp2Y/zbSJj3MbMk8gUKk0cwQH6/Fn3O9m7/7y8nls3Y3m1wqMOIcIAAAAAAACAGY3ugn+NYpRDsVLCzyWBUtJxOMvYssg5VUmGskqC1cQka8mUVFunOdOpSkA3kZI/P0VTXaS1Yk2679uVOQMma6jTMOw5W/Mi51uBdQu1iGSxRHAHoDGf4iXyS+WVyS1XUCG7Z6p6rrkXRLXV6HTqrLPO7enC8V2qq5XS9y7vR+nvxrd/Sl+0+F+0lNPW0dXTNzBsBDQ2MaUzmKxmOLNtDlweXyAUBf0cklFsc4mNSynzVrnPV/iVVld5p9r7a1bDDhL1ZkxWXOaETDJFiz+0/PpZXRYXx3IloBwsD7k9bONF9PvKxN1zvBrIbUSrq/+PDQGNX9xkIDQsyGjD5l3aoq3Xta1uz9ux6swdK+P7OQFJ0QzL5ecJolReoKhds7uX7bEf76lmEGgE0o+GW7/s/UcAyAVrcuZWDa7XHVQa0QArpWVYpxNSeWrrmfqz9pzuvOwKznrDNS4vLd5g6njTkG9uvmX11tq3pe8KjsfBY0bb2AqOwKx/sB8cd/9l0uiDXElpWXlFZdWuyLvCYmJG2yKYD8VGEWw1gtkoimBb1186MGmgUsdH0RZFEQ262rWuj2ABI5iNYNxe6f4dNEwzhTqj2QpSvImLxsr4vCcgKZphuXyuIErlJxX1XJfLxxX2eNq7P37AWPkSdPJxLCrBVi4qCVhiEgeZkoqY5kynW9CZuhrqs2prwLfFDlY56Cnfli+dl1mKr+CFVCyRyuSKlW2rUGtgBMVwgqTOIvu1xMp619UNN91y253dxb3zaLzrMZ54ep4PfL3g8XLTJrPf4QAAAAAAAAAAzn3fGTbNntPB7PLdvvt/FeAHgSWLi25XTdk0jEXhoyJx6YOy8scVyqq1q5011FaFgUSmUGmtKEwnbFcdg8ka6jQMe47Oi5xvBUoXahH5YonQDkBjmvAScClkWW05U2EdkOQ4saOJ5iqZJ43UGDch6h7lpuZ+M6eaUy+gB3Q9BL2twq8T8b+M50NQDCdIqmukQRibmNIZTFYzVbN1DlweXyAUHbgbv0COEktKnVumz/v0d4pKB1dptQtrCCtCRok5Pc4EJBXH0wtPZq73rCwnAbUD9+qXCVJUMebeuFReBdZptLr1XTdgNIEQjIw2bKF16baB24M7Vp21YzK+hxOQFM2wXD4iiFI5pqjnugQ/ToDq5+lj//tdZ3l8jPaBLaE8zrVKriurEIhJBGRKqkvTnOlUpQsREplCpbWC93xT68/+dnViMFlDnYZhz9maFznfCvAXahHVYomwDEBjZHgZWwVFzzQ87zW+9vfZ36kWzjo33AV2l+bqrXT/Rev00prf1VYdXT19A8Mzm/FX8EKIJVKZXKFUqTUwgmI4QVJnMfWLIxlk5QLuDkYikjGluPXjGcBt0OrW99uA0QRCMDLasIXWfFt79Q47515dJodzBSRFMyx3rv28N54f706rQY9CUHT0EARF0U+aoC/EJGNkSqrhac50qtK44LIr1m3MrKpGt7rN6rQd2S72tk9N6rVKbZI6urOJmwBMm0O+BK8TtR+HBSiKoiiKjh4ToCiKoij6E7013T1hoIAQjKAYTpBUL/f2Vp5ezcByvCBKsrI68Bq6YVq2c+4UL/2h8ygontJc72UelcFbn/8aYhSDWEr4tKR+Kenv3PPgd9wAAL+GzkBAZ6WSDGWVBOuJSV4iU1LtmOZMp6pmF1x2pXX126BbPny+pfqvoXfkgt4XH/hwZqfVUN9HW7Mit2k1vLotbdud7Ui7RNvDfk0FWrUJ1smyLtludeB4jt3dNdgRWa5dvEYOGjexv3tubGrubzbp5rgL5PmO7YNlsAyWA8t/BycS/fP44jspKIYTJNW1+113w0133HXP/RPy8Tt9AAAAAHjX25G9U+99qHaOvDuMCwz4DrgT/A4sNAKu1zZ4FGZwk3ZhBR4AP4Kt4Dcwgx+Ch2HceNl9U8BB+OHd4+/lfM72Vs7NK5tFa20d9X/d0HUjpuCsIT34erqE0Ybmti20frVt9tl3+B6rzqKxEn9oQiahaIbl8usFUSq/pahdjVWF3VN77McrG/qpb6sByipQ9vakQqZQaRGgxGlbeNygoDGNl7T0ndxen/Lxs18AAOBdP4n9xT4BAB6+a6yMJ5qApGiG5Y4f5gZEaXm8FR5131j5Xd+dJ+/681p/3f7x///MPHJyZlPFOHy21SH/GXDEoXiXBqsOWeqhNiBfdwtYIU1LhiJoMdbxWbW91j3ukTAn2fueQlpmsTPLw317NY4+ZC0ccSIeP2oo8G5F6PPe9l2fsHdIUw9cH76BGebrasFQSLVlTBFTMWLHclb+69B5iXIRf5dKHZ3ibmC54xPdA+I5THc/4nH8TQjJgiN48boDOU38MM03KGx47u1PwqLhLoU6uu1uYLnjO90Dj7jZoEgAAAAA4PPFNgreoqKKqqavrqGptba/DmhdTL9H1BNrR7y+XKxTcbYbeCXeOwl+leijSUZuTzfF96mupBmlu5jhg0yfzeIN+eGVGH+TOPmkNwAIIyg2pXYqtLPKfltjY3t2Y9z2OPz+SR9JuVOn0rb+0CfmNK7jDAEAAAAAAKC5VFVVVVVVLfo1QbU1TGT8H1bOOUn0gctFFaAD1UXgOWJifM5o9ri5E6AwOAKJShizjwO6FZzzCrAQX5Ekaf9lt8wbpDFGVVVjjDHGGKNarZrYOT2xvZNvRczIF3CE7Pmo9u4NVLyIrUtCHe1cBpabr13gEb/dDlkFl2dXiKiN1xLIlLzvQ7yenx08X2rformtFaThQ5RuE/1KgkrbtTroGRiZmFlYo+PLgMXFJ6rAirMAjOFZgA0AAACA2hkoFIPBYDBm7AaDwWAwGAwUCsVgMBgMBoPBYDAYDAbjj73em0Fvl8wMKWkZWTmnQnLhiLF4eECYACImQciUVNppznSYauqzqprQNiUfbY4ITrh6SbNcmcgVgFKl1oAQjKAYfsR4l4Q6esjLwHLHj30FxLONcaUQIKtBCEZQDCdIimZYjhfEkVr07iEAAAAAAAAAAAAW/xrXdU4zbvv1hzaOGC34KJVUQ7VmN/U00kxL29chdLph+nvX6t2FzjuK2nd9WX+8cBoPeiAcGhoaGhoa2httQt5iVf1Djf7om5dm+IKms2OVE/lxF1O0hL528qkbAARDoLBRGkYFzV+PWRlkNVKvYcM2u/F6D4fvya6l/A09WwDdxAEAAAHJDugbCQAAQEDGAAEAAAAknQnNB/4zh6kZ87HMFXgIvMHbKFlgfUVoXVifoDukrQeuj9rADPNJtogppNyytgjUdB7+mWV+g8xnToLJLHPZxUerJb9af0jHsG3D8UKbT8eIGu440jky0DObzAEAgEwl88gkAMjwAAAAAABAP0aqalvbtq2qquCB2JnostS/R9F7Du64ihw7ADs7ALvdbgcBNRigCwAAAAAAAABQlW/WL+SdgCWE8qSCfH2gIfO5hO91VY/AJFnbU5Amk7i5W5abzVPZuMgQwso5NsgZjAQtdVsgsgi47yVn8zw33s1csuA50sHYmZ5ZNN952fzbHMd0olAYHIFEJUx0rHsEJnGWbsElm6tXs2o+jZAXwOY5KEhclXdf8Im+xy4QhnT3t9DllNQqs4nmkqDS9qgOegZGJmYW1uiwMmBx8fEVWHE20qmDnVK/3zPKfSXgfiAqjCBSlIv5HremYDG9O0TX323TXV9t/dm3wTdfvdi6vcSr89q5vcFb7/a+dh94fBx0BYDSd41ZtGrNehumbdJt2d6O2rM/F1EHvugrs2u/hcz/AwAAAAAAAPYAALiCbyCW+40O1z1nAwCglFLwW3iVH+YGBIIRFMOPIjcV2o8KxSbQjCVppZMkSdLcFgEAAAAYQmIA5vQE52sCAABY5yz4mV1JjN4FG6d0yBkmAo4SBwQVQamwHI9yPeY1IjduZqCp3BRe+8662v8W7XHMZ6IohhMkdcNE5+arrV3teZSRwrV5rBGtmtc5S49WVhk6WDlXRPLAEohUt6DeIkoHpovEcwRl7AzoAmsIzjLmGHcCFAZHIFEJsxzrHoFJnKJbcMkm+v0bRzrTPY6hKyldDQPabAC7EUtFbMvyZKGkMk9zpsNUU59VZbIpbyG6d+dwRFe3upMRlZbJALq6281i2Zq29o7Oru6e3r7+gY3Nre2d3b2pCDB2H4YhLbM4RZDtZYwgURJApMhChXLIuRRlz8hgW41zoZe9tLaQ9oMYc58RRTGcIKk2DzTGSGHaPMq512CXPY81UlrbA/sDuNolZPK0ghpD+Llk24NXR78nOOdbVQIUFt5WwZIfxr9OJEJWIdDQoEm4rPn2JBQvimzIj3I8305lffuYaIA12R9rzHfX0OXynzRsZgyyQYo0GbLkOCVSDTaPpiBRJK9RsNe2xnQatJXtuTJ9GDA0vuHneJ/W9gxyCgAlFTUNEASGQGHwiNRdgkqbvXfQMzAyMbOwRg/ZDVhc/Ng9QJzLyLmCa25yO49+x7r/3A1pFlNIsCeQ7cVWl6DGM4EVP0chjZSnzZGjOpqMKPW8vED0zy2ZIiUtIyvnVHaeW+6yFNqWaCvSdpe2bW1NbUsCl8vlcsudO4yoXAEoVWoNCMEIiuGByy13WTq9wWgyW6xtPpUjynJtPt0jyqpdW5K8gmLbQcqtvd4zb5oLu9OFvnPtzfHKv/wk/vk3ZJ/9GBzYEr6KU10JrKySYIyYZIhMed5ef+6nOdNltxqYaqszixqwbfFM9HM/F14jbxo3MWDajKC5EcHbA/bXOPudgGI4QVInHO/rGoU3hFgilckVp9RbhVoDIyiGEyQ1F+rttD70G2iIayMiGuXVGN8mxSw91jAsN48gSm3P/Y388ffxb10Qn3LJLwEAAAAAAAAAAAAAAAAAAAAAAAAAAJcekBVV0w2EZqPVZm7f1JHTddT9sKfYN9MOclN2vQ/I5ApAqVJrQAhGUAxvy5HU1RnP8b0QFWtGEO9l9vPbi3a9Yty1XxEqZrZDAACogLeZCjmW+3juIqGUx56At9dOj8Akye9DPhMma3LXjtXlPvfiDIjsFrsgIZI3LGUQ7LfLrM3mgR3/5uhc5pHPnvodozMsWekGO0fO3r3gzhPQF778YYXlNA+cVVVVBQAAAFgmO1VOW2yx8+RcrxAM9/5GJXHTkmTJU6RsVak2DVXfiofdBcSIGQvyYWJz4Fn8BgaEUsYUvp2Z8vw2lV+vJdvlV5nmO+FVa5hbu+jo6ukbGJ7ZwF+DN4RYIpXJFadMeqtQa2AExXCCpM5iTrclVtadcOdY45VJ3FexZn0bbdvElm07du3Z3wEdTuzIOn5gJ+LU2T7Nb5/xxVfffPeDf15SZmbzb8TC8aHPUwu8DxZC2q6/PezXNlAHmG2kvlbDYve+HPf23Dr5/PLnpufgm88vf+4zUrh7Lufp4Az/yT/HPa8KiqcUfC/zqHybx2kIuRwmjlBHIQFufeiX4euw9uv6HsGcuOpuebgFXQUCgUAgEAgEAoFAINivJ5h5fl1efl3+sLhq6bH87bdCUki6oGjGojArEpfWy8qDCmVV62pnDaltrZ62GrA9BDybeW0FHAuJsAM0hsRLECfN8vFXHT/92ijpbawmpnQGk8XmcHl8gVA0GDOEWCKVyRWV9Cq1BkZQDCdI6nkLeNc5KUmcj8l91dfAcrwgSudnlvcXf/5PnugtnMrH36BIkrSCJu54Hn3NbsmH4SMzLwEAHA6wNkVzs7TwrNsQAgCErZeMu2TFJdhwCUIAAAAAAMDaztF2wMkwKg1ddDfZg/fZF5MzDiK/8vpoe4mtK4WiGZbjzy3g3vHwpAqdwWT1eh/1Rh/2Zr2zdQ5cHl8gFAXpIbFEKpMrKilVag2MoBhOkFQnfNE5nl48wH5+RS4KDD6idiQoNAaLw09omDjLSTY59ZRCpaU3MVbu1SrUGq1Ob9g4uU2YLa1Jm/0cl8h98aB+L4kgYOMuCQQCESJEiKyF4c2EkWa042szsQ0RIgTC3h4RYt0lMefyJqiN1rU2utVotruLiBEzFmTJfjCxOVu8YL41AAlVLMgWkNAycHgTFmlVc6zCPKLl+3hm54nOJcZIMTGlM5gsJ/Z6d3ojafZqDlweXyAUBZkhsUQqkysqaVVqDYygGE6QVCd88vz2eIjvo7qcQAwKg4+oHQkKjcHi8B+z/M0TUnKIQqVNd2awcuqrUGu0Or2hMW0yW1qzNvsO9RKnDfrtoqf1NEpkgR20JZLRcisQUhHqVK4CjTAHU2iD2dUkY9WzauddjOg46ju3RU+jEYlEIpFIVHRYNqKVGdUV9Ro0atKsZd86pE27Dp26dOvRq0+/gccjg12OKcaMz6fALfazKm1UtYkt23bs2rM/70FEIlHxI6h4xGteFmslxyUgiEksZEoqdJozHaaa+qyqviPIsWEuPCPjTdiUZu6fB7k+HiPFYrFYLBY/4j889Ndb722qXYdOXbr16NWn30CT+KapLTi/ja1tYsu2Hbv2Hvur7clcdyAAAAAAAAAAAAAAAAAAAM8K/qyW84wa+2jzbts92Q/zqnPS/PwO9h2vL7zg5ouAYjhBUkcHXBHMSXKlkJY5cdhlebh1z3h+Z/vmV348lVmne3TPrVn5jbvfzqbuE9s8o+2WbMObX/IaJ/04Hc7JMjkRzuEyXH69S4ReSpZOkrswVz00T62mhbFoc0vbJe0a7LN5ecX5jxdGReLSatmNfo9eVW/aqrQ4rxFKIJg935ePtjChmQgGoGNb4yyJfEvZXxua/PPGCHQ3xmJieo6NfTd0YTBnCZvD5fEFQtEBE1pjdtxzMe1TAAAAAEzHBAAAAABuatjIRBlLisKg4BArdQdsZM/R870wfEUQGRUdExvH761ArGdhKM5XWzPpIbCOB3WJ43VElPHmb8Rs8Ku6ADSkfVwyDVqDK7I1uERHeU8KatsG12ZuD9Y+i4FlWN+YaDWuAN90p53GnkcBwX5HAQEBAQGBJVASGvOjXIbKcyLkneASwvKkBfnbwSbCqnEJf6J/RMRck7Xb38j7CgIAWSZuxn0V2Fkfu+cTfD6eSN1xhXtgSdX2RyYJClrdtjNmZmbX7u7eubu79/x775X5/d8PfT8oE0aCJElSpN40qmVQYE1QyFGJABK4FCjo1YGOWzsejjCMWRiyZukUBgKFwRFIVMLgg64ITGLKstxAalgAAAAAAAAAAAAAAAAAAABHfN5OgCOmmsntpkx/nxnvNutsjs1DmgyFShuqGoY9D/FIv4GgMQxewnZyu2tUwlVqDYygGE6QVKd0dV7/0mutDMvxgigJbZcwcDXRtZInqRumZTsODWN88wYAAAAAOAcAAGZ6AQAAAAAAAAAAAAAAAAAAQFVVVVVVVVVVVVVVVVVVVR2pAQAAAACyDAAAZneamZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAQAAAAAAAAAAAAAAAAAAgCRJkiRJkiRJkiRJkiRJqklLkiRJkiRJkg5Qfqeg+5eU8j9xdntNktaxgNnxf57/ukS5Va6SCnYAAADA5ZevJwsA8KkLFXlbSj5yAQAAAJ/rkgv9pKRlZOWcStjGxKTtRKakbvNpznSqbj8uuOyKdRsToVlVbWR1m9VpO9Lug9sr9tcUrdqcdeSy2ZuYbUpzuqB/0+e/UV+StpeUK1O5AlCq1BoQghEUw882xmXeNrTr0KlLtx69+vQbuD+m/yh+VVVVVVVVVVVVVVVVlc+qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyrOqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqiqfV1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVZXnVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVZfj3DQYN1oRROSoRUIKQggT9OjBdJJ4jLGMWd/wly34NA4HC4AgkKmHwkW4RmMQ0y3JzrJY6ngMAAAD8////UQwAAACoqqqqqqqqqv7///////9/6AEAAABVVVVVVVVVFeS7SBCKGCNBC7QK/kJUYkZGUTU6mjM6mNa2Tt3Gqppmv2mpE19/pluy2kRwSUHFUwFitk6V0gA0EGFCGRdSaWOdDzGlcZ8/UKpJa+iGadlOZ441hPHNGACwiAQEoDHilK/m7D8DAAAAAACABQAAAAAAAAAAAAAAAAAAAADAc8KBxTyJTKHSxCVLcABqcpOd+bXPrTImr6aw6giLOAAA/v9/EayqqqqqPGr3YfjzGoNRHmwJP5cESknH4SxjyyLnVCUZyioJVhOTrCVTUm2d5kynKgG9CCn581M01UVaK9ak+75dmTNgsoY6DcOeszUvcr4VWLdQi0gWSwR3ABrzKV4iv1RemdxyBRWye6aq55p7QVRbjU6nzjrr3J4uHN+lulopfe/yfpT+bnz7p/S1Fv/Pt5Tf2+jo6ukbGDYCGpuY0hlM1pnt8N22OcLl8QVCUdDPIRnFNpfYuJQyb5X7fIVfaXWVd6q9v2Y17CBRb8ZkxWVOyCRTtPhDy6+3umbr0gnznSy/wX+k3AAAAPyGdjCZQCCQU7CrQYF2CgQWCGw4DTTsOvCCBq4w3MCC+RRI/s4/+Tf/5X8IJi8QCARTEEieYbODBhp+5uXca33/vIW5TszgKonPKhxLKsFWLioJWGIqYhrT6RZ0JquhnsVRA25rB6sc9BRq+6cjr2eRX4d3hFgilckVK9tWodbACIrhBEmdRfb7EivrXVc33HTLlRdCwyBnHe9u2B3nGvjePJ5NGng31s7gz9nnyQMAAAAAAADQAwAAAAAAAABADwAAAAAAAAAAPQAAAAAAAAAA9AAAAAAAAAAA0AMAAAAAAAAALIoBAAAAAAAAoGuhSQNA5goAmSiZJQAAAAAAAAAAAMCsz1kWo33BllAe51ol15VVCMQkAjIl1aVpznSq0tUIiUyh0lrBSydtVyeDyRrqNAx7js6LnG8F+Au1iGqxRFgGoDEyvIytgqJnGmpr0ulUi7PODXeB3aW6eivdf611+udb2u9t0dHV0zcwbOZa0HVILJHK5AqlSq2BERTDCZJqsf+8T0ZWLuDL4BvPV7CZ8cMOfBo9CXZGo9Wt77QBowmEYGS0YQut+bb26h3W2TLG+FwnICmaYblz7eS98fx4dy41u8Q5BQAAAAAAAAAAAAAA9AkTutABAAAA0AwAAAAAAAAAAAAAAAAAAACgGQAAAAAAAAAAAAAAAAAAAPxdv5vTvlwRAAAAAAAAAAAAAAAAAAAAAAAAAAAAME7rpsAvBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVtUbs96cBAbSqrEug7I1EplBpAShx2hb7pxAUNIbES+hLwSe315q8LnvcK1VrYATFcIKkOmGoM7qWwhqG5XhBlE5Oeoucym3ohmnZzrnD3AfrO0dpebwVHnV2Yw8FAAAAAAAAAKCqqqqqqqqqqqqqqqqqqqqqKvQO/j8VpgaoWzSoL4Knj2O6Oedafq21d9h7nxPPOfdm99738vfe/8X/H/IVYAvJApbgyesW5Djx42e6CUqCiq4qAxYX31aBFeduyQIYY4yxi77a0HAnnUWm28zMzMxIkuRwY4whSZKkJEmq8SRJkiRJMN+2FMMTfJV6YOWhxR41A/S7XWCGGpcGI9SY5Tirtv16dICtCmvZ710DTKxBzmCWPbniJs2u67quu9f8//////8/AAAAW24AAACqqqqqqqrq////////H1JVVVVVVVUlIVciXyiGMhCEr0KJm9gqCSraKQMWN752AivOI6nrJwgAAAAkSZIkSZJt27Zt2x4bwwKCiipKWweti1lhFV0buYpqVVQ1dHWtmm6KNSKP7z4QEbiAgIALuIDLjLiz01LBg5FqumWwbpj/2M+ziBCZ8hqD1I8/R/sQe3SrIVFThlX+I3ck3Mdzwr/2IEFJSn0ZT9rHnKJLDdfWRMR6idyUcmL4jy85qxJor24669IYDvSqv7Mim6pKF+1GE7o9ItfFOQ9xcYK7SZmuf1jfFJmZzEhJy8jKORWSC0eMxcMDwgQQMQlCpqTSTnOmw1RTn1XVhLYp+WhzRHDC1Uua5cpErgCUKrUGhGAExfAjxrsk1NFDXgaWyy8UxLNFy8cf1G233Xbbbbfddtttt93Puw/10SefffHVt8f3vfr4aq8V49ubkFVweXaFiNp4LYHMDp3V89MgX0pwd/R5oxWk4UOUbhP9SoJK27U66BkYmZhZWKPjy4DFxSeqwIrzNJIxogkAAAAAAAAAAFVVVVVVVVVVraqqqqqqqqqqkP4uqJdhvL4sibaHtL3BqtKyiPVl0HawODpemwAnUpOMnCKZGpOmnF6bAWUSs/QNga+rgjmTcK/vAparm7uHp5e3T1sAQbG2HgR51UgfTZk3m/3+KaWUUkqoBwAAAAAA+P//////B48BAAAAAAAAVVVVVVVVVVVVVVVV27Zt27ZtE8zMyEQZMNu2bdu2bdu2bZvh581gDSWGEBvnWEg+HEELw9ugCATsoQ5F6ejTJcNzpIOxMz364XMV3eGARoDC4AgkKmGWI90iMIlTNAsu2UStmlUz73aDZQgAAABAhgEAAABAUlUqqeron5vmXL2F8zGeqqqqKn0uZMgLC1yeQyHiarz7gU/efORFVF0S6rS1V4feYDSZLdaju14Gljs+5go84j5M0gHAw3chlUjTpVvfEPORehMAAPyF0sdAtZEhqqqqqqrWGDNDnjdgZgDAXIr1P5LgfZzzef98596bO241QU5xWmFinqV2VtY2rWvsaK2htdZak5B/31EMhaAUzFc7fYZ1Ls+OVU2QU2pbYWLO0tyVtc2Y6L/3vff33vufPgAAAABQVVVV1aqqqqr6////f0QAADCH9957gXgJkDLKj8fj8Xg8Ho/HvzlraDJ0sHKuiOSBJRCpbkG9RZQOTBeJ5wjK2BnQBdYQnD01HKISFBqDxeETshyxCXKWFF1hy56oB+scBotuAAAAAAAAAACAbxCgNDGsJAxKlYVF4HbFkAQloAi0KLUqVIdclwLPkUHGzgy4QBuCzqVxaVvEVIJCY7A4fEKiIzZBzpKl8bl3tto81kip843xItkAwADDAADDMAAAAADD8KsAAAAAAAAAAADAUkEJ7GfyqQCrSqHfiRpse/idYcla1Q12jpxtvVj3EAAAwBoQNzoYAAAAIEmSJEmSZLXw2fKvSkmSJEmSJEmSJEmS9O8JPW40BPLx/2OD1vAdTfwugnQCL7xKnXqvFyys4z/eoX64yO+D5C7PSiHsr0UqP+9q7HLQMeVnQJLGEN+KDFO1wYjgDhttrb02RnXpjFNf1SbcvsbPJLtbrnhsbIB510cQ/cMnmGBEiVDyBIdketKJUvXkBBb9Uwxa0VMuhu/T7SlXw9O5CGf482fF4PJ9MQGP/4s1+Ol98QgB00vdtojkpaxHrm4x0UvVzPL3D52nSamBjLhAtVypFHeb0QB+Qp//aqORsVgH+Qujl3B2oYSMFzHfSyXD1k2fE2FiN6H9iywYiYodO9uDMyY6AivqDGtBoW8EFpJ4ePLTpCOzQdd59r/9ifXkgclnjnyFE5uLDlRIhZsuTCYzfENpW2zli/XPf17YQbpwq0sG9tzlri3/z2U1sq+JFri3aPrzI3+Lm/OjmvE5OPz/bbFOyqRKGo1WhYmIqU0Rjp4AZM3FclunbvbAEDgg9ew6lENAxBGHYl/HoBwM2ihzJzsQ70bOa0uMdcsBvpp+po7DkyxrqiD4tAYaoljJoS1S5QfvQKThbMJ34yfvlBgOdWknbHYpgzPUsEzH6p1NV1KmdwPl5+CR84Sav6icyZyeN07+zrPJYaHDBcI8EDINh0UuvNGDZfWIV3fqoQFtwg6tEGS8r6bY2Dg1GomB2hmJBo8QShxV6NibpJBRkJioGJTF/g4qgFVXy0Dmjr8lwbC0icSTYdcRb2Aqw516eRRc8wldwm7gK2CIgm3x2ejkCJl2FBnUrHc6Ek6oPyArbEB5sW9wqAzRyF0SrnpiOtVCdPgVxPpD0oqg2nP/i8u9MZiB6Zxsify/1ZUHxwcLOIJtV+tupcGEDB5Z13HaxNu4gNK6QT/WAlY4j5bO4MkkGa/Axnw4fEqgeiCkA2MhH5J5FGh2KJ1qKKrTuWHIQ4G8QErfLB98/8W6SoUK2MqOSAOOtqZPsHFCLDOqcp/MQMxC7nL76vKe0TYHSfPQD8uXdH0V7xEMDnNzpsxmU9I5Ua9gqjQ4IgzTdHkYsVIsY3BJD/bHMXSXJmEW0na4Lh/s7lNm+Ck1b3X1gr4q5EnPbteY4hqGt8nUKXrPedymDGusX+YSrEP1wYZambPz4LZzVkdsZCSDYbipTXqFHaGCmiSlhgcifQJtb9VydIXMazm8mpQ3oFEWFfYrNJK7h6dJK7bi+wwwh+HWjm5qDicF16H/foek6uDgRJZQ8KqGqhCYMdiDpFEIskNAejpRfXlNjbREPUPt7V+sXiIe8v++L4qZ8Qs+/aDzNCk1kBEXqJYreDyvn6LiMtUAfkLPf/avNhoZi3WQvzAainDOJLopL2K+l547ho3k3Pn0JrR/0XwzI1GxY2d7UNYx0cH1d1bUGdaCQhcIo7okHnUlIx2DTQC1Yr7/7VawnrgWbUd1ucKpMly2T1Ehrx5xgUnR0xk+TqO0LbYy3b/++c8LR2NsGaF8es9d7sqQxUdZKs3sa7NDPSOu/rn0UFz4Vn0Y+Xjv8P+3xVcmghBebUzf3qrweRVunbq0GFbQkuK3TpVnmqUFXKGgtXYbhu6LpSX69iZQDgZtlFF1sgPkK3bzu93QS3VHw+fRz2PB4cmxZE1lbxMDFY16P+RgQSC+zA/hYKV1UCWCz0zeS2IsT3dpJ1S636WM3jEPNLpmvvrTesmsHZYZzuRncb+toLaqBQxn2Wc7PW/cO7iD09tb9LRiAWhnSnwKi0P1xtCMvSFee/SIhoOQ5oK+CJbBexeYbkecfGGqgr69n5GoIhkqQteFjr2dkqcpWMzkPCua8s6QoIyqLckr2NngvyiPtDiC5fobwyfPGCETY8NsYOwGFa75Lm1i/mTloWmHrQ9T6PgUaXwpVCfUuu/7JbytRYmKsfnBSzJbR5hzEAh8Q4k6Jai6st6I4ZFtkgmcR5Vpzj/3IvdG2eHPks45KbkvriCHx5Zj6gFH3Nhb0+U1uglpF/Ayndf47JRbjYtf2GJgGPQV7nKhZdHVA/jt5xvz0eclUC2nUId3kcKVvdBoYmHgH6J90OMEo8KS0eBhYOoj1fKtG7rK97FG0Ej5RKQfyaFx1lMh65CTZe41N+X7OPtCuBPE7dukET45R5AZQ4/+HgPHbnFDOIwXbJX3pxHImJpHXb0tcVTDPoKP1diKpTNLhPvXLZEjjujuoHE4xu1F+4eBlgfVcASqH+Cos2pZ3Ih6t/QiwliqlXoifJjZq5wmzydtKrH2PWx4iVfUhLqhVn6S50nbwVSN9G0iW2BBFR9sx77L5iyK2qGHuyK/CTvfgiQcTraWrWNHa1+yuK+XRcWIG1doVGh4zM7jVZmWqhPMwOhatTVTc6zPXcdC//3OO6keDQ66jsBseLhxqBL2g5z16IuKolBOG7dUIrxUonFth2kjRh3yYuYjIOt5gpn8F9DZiL0KnA/IaRmdCfsa0c/v/81F7lc+BilA0LcQxhm4KOPqK24t+t3qsdW2GIwtAS/efHwc3e5jtuBvwrwA3zEJFOQfwS2DkOzAzC0caIkw0S2HaTFTFOKe/78G+Fp8jpCQExLlAsC7vBvJguiNsyIyIHx++Vd8ZXmWnkRJ+bIhWVqQNywr2PJCfJKfZCmFSfWsk9J8zya0W/e/BgqQWUSRkYsqmkPWSZFVPKzsjZcrT7699rGWYKQIb/ooi7eKNFpUzFjeKcZ7xfqgOO8W730flqAlG8BuJGdCWq1l9znnnHfmPyQ677rmuseur0ShL0UQyfk6o/S1HJLpC2e5sEvi214uS69+kYpxUNh0hgwa1uVqK6Jntx7bsEBnPgUlKlNNkyRpsv+Dl3scckSUoluJTus0FfVua5tf6RaRjZE1atbkkQ5zMybLQZ/5nnxICGObEpOSlCYG3FI9tYZmhnU5CZmz6hsaZ+thZNBr35y59ltZ7dnhq8ELmRwEPgFaRDZzmc9NqwAzs6xkXbV6TfNau9nYGjY6tAkOgepzePPzWkTLS+FXXjX92uucs3GiEMg3Fe5fl1/wViFFzxlYJrl7o9kiR1ctdeK1ds1mRZ7e/bm/jUqVKLtB+Y1bPthaXLLNwoM7dqpUoeoO1ahEOF6V3Xv27tuv5qSTanGcdurUwUOHy49UfGTmKAjNP/bJErR4vdONqA80BBtDTc3OMtQmrqU1HInG4gnBpNEUT7pNi8Z23MLmKR5n2scgo599Tjw042MwzDqSht5sjwsTltP7OHk4pJmODQ3LM9rwECSZaiM3HfA+eu2e/O5+O607uUCEioaOgYklujKXxYfAtfGiOUJDx8DEInQsV4hQaVVTRqzHi87xq2p6JorRyY38D14pShQBUECZP98Lc/pJ485oMNAY5KxFkJMvqB8saKJueJ/Qu0pdCFQkWruPFILmEyMSVWlA9riEZFjJq84RjZwjQqJjmVatlW3H1L7/nHPvE5aYreFUWdjCWCXD+6w5xhJdkOsrS40TVbZErz0DvIIohAkXrhSvUnizzfUm+ng+DwmZG894xjOe8YxnPIszL17HY1rjaDmY4O+V7XbY74RfvBnCbtdDVEdG5rN7HEd+Q6MxHN9NNONiNJ5aj1GLmymDxmkiLgK/MGdZ40hlEcrGo4103hv92fwsU/JHGbIgo5Vv+cgq7FSpJOWU+VgzpPU3d+ugyZPoNJJW3KHruxMesh/Ntdnzm6coOWAdVGzsk6FyVN4/0vGli6PE5HdHYevOXuiVn+lr5wWvzjaycIllc4XF3JAK6xt4wjgQK24ExI1iHKWUIhFJTq1l5iy8L/Wscol35Z4ujWe6trqJL9Wj0s9XpObe/Lpkv5Rg0S0RRItjxF6MsfeF76IU3DBKH+VY4ziv97Vaqau6Vq7xTkGpojLlKlSqirGVKTtlOlyDSkWpcmxxpVOx0qv2qvXqxmrd7NU21r5pMevDhRWZy4vfX2L6xbVvl+QaQdJv4cG7UyYRGn3PAfS/JfaGT0wC6/DPVQh4nC7+gssgZtoqZ91LH/49ARDseYVpA8vba9mbJvWo610pByxdWXPlctVxZiPUvsdKFfN+9cf3HeQziOfx2yxcf7pGfjYg+mdU2ZsAAA==");
}

.err[data-v-16135dd3] {
  color: red;
}
.signup-btn[data-v-16135dd3] {
  float: right;
}


.err[data-v-aa052ece] {
  color: red;
}


.err[data-v-3575c7e0] {
  color: red;
}


.h3[data-v-1fde12da] {
  color: red;
}
`);
})();
