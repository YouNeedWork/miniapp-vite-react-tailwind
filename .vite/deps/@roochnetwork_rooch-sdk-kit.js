import {
  require_jsx_runtime,
  useMutation,
  useQuery
} from "./chunk-NQME7A3X.js";
import {
  require_react
} from "./chunk-H3PZ5NGW.js";
import {
  Authenticator,
  BitcoinAddress,
  BitcoinSignMessage,
  ErrorValidateInvalidAccountAuthKey,
  ErrorValidateSessionIsExpired,
  RoochClient,
  RoochHTTPTransport,
  Secp256k1PublicKey,
  Session,
  Signer,
  bytes,
  fromHEX,
  getRoochNodeUrl,
  isRoochClient,
  str
} from "./chunk-ONUP7KAW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-RDKGUBC5.js";

// node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React = require_react();
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useState3 = React.useState, useEffect3 = React.useEffect, useLayoutEffect2 = React.useLayoutEffect, useDebugValue2 = React.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState3({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect2(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect3(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue2(value);
          return value;
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
        var useSyncExternalStore$2 = React.useSyncExternalStore !== void 0 ? React.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React = require_react();
        var shim = require_shim();
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useSyncExternalStore = shim.useSyncExternalStore;
        var useRef3 = React.useRef, useEffect3 = React.useEffect, useMemo3 = React.useMemo, useDebugValue2 = React.useDebugValue;
        function useSyncExternalStoreWithSelector2(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
          var instRef = useRef3(null);
          var inst;
          if (instRef.current === null) {
            inst = {
              hasValue: false,
              value: null
            };
            instRef.current = inst;
          } else {
            inst = instRef.current;
          }
          var _useMemo = useMemo3(function() {
            var hasMemo = false;
            var memoizedSnapshot;
            var memoizedSelection;
            var memoizedSelector = function(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                var _nextSelection = selector(nextSnapshot);
                if (isEqual !== void 0) {
                  if (inst.hasValue) {
                    var currentSelection = inst.value;
                    if (isEqual(currentSelection, _nextSelection)) {
                      memoizedSelection = currentSelection;
                      return currentSelection;
                    }
                  }
                }
                memoizedSelection = _nextSelection;
                return _nextSelection;
              }
              var prevSnapshot = memoizedSnapshot;
              var prevSelection = memoizedSelection;
              if (objectIs(prevSnapshot, nextSnapshot)) {
                return prevSelection;
              }
              var nextSelection = selector(nextSnapshot);
              if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
                return prevSelection;
              }
              memoizedSnapshot = nextSnapshot;
              memoizedSelection = nextSelection;
              return nextSelection;
            };
            var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
            var getSnapshotWithSelector = function() {
              return memoizedSelector(getSnapshot());
            };
            var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            };
            return [getSnapshotWithSelector, getServerSnapshotWithSelector];
          }, [getSnapshot, getServerSnapshot, selector, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
          var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
          useEffect3(function() {
            inst.hasValue = true;
            inst.value = value;
          }, [value]);
          useDebugValue2(value);
          return value;
        }
        exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/.pnpm/use-sync-external-store@1.2.2_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/.pnpm/@roochnetwork+rooch-sdk-kit@0.2.7_@tanstack+react-query@5.59.20_react@18.3.1__@types+react@18_x5qqh6vsf7o6f74axd3c32weji/node_modules/@roochnetwork/rooch-sdk-kit/dist/esm/index.js
var import_react2 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_react4 = __toESM(require_react());
var import_react5 = __toESM(require_react());

// node_modules/.pnpm/zustand@4.5.5_@types+react@18.3.12_react@18.3.1/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners2 = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners2.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners2.add(listener);
    return () => listeners2.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners2.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/.pnpm/zustand@4.5.5_@types+react@18.3.12_react@18.3.1/node_modules/zustand/esm/index.mjs
var import_react = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var { useDebugValue } = import_react.default;
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var didWarnAboutEqualityFn = false;
var identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}

// node_modules/.pnpm/@roochnetwork+rooch-sdk-kit@0.2.7_@tanstack+react-query@5.59.20_react@18.3.1__@types+react@18_x5qqh6vsf7o6f74axd3c32weji/node_modules/@roochnetwork/rooch-sdk-kit/dist/esm/index.js
var import_jsx_runtime = __toESM(require_jsx_runtime());

// node_modules/.pnpm/zustand@4.5.5_@types+react@18.3.12_react@18.3.1/node_modules/zustand/esm/middleware.mjs
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (_e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str22) => {
        if (str22 === null) {
          return null;
        }
        return JSON.parse(str22, options == null ? void 0 : options.reviver);
      };
      const str2 = (_a = storage.getItem(name)) != null ? _a : null;
      if (str2 instanceof Promise) {
        return str2.then(parse);
      }
      return parse(str2);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, options == null ? void 0 : options.replacer)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
var toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
var oldImpl = (config, baseOptions) => (set, get2, api) => {
  let options = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options.getStorage();
  } catch (_e) {
  }
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get2,
      api
    );
  }
  const thenableSerialize = toThenable(options.serialize);
  const setItem = () => {
    const state = options.partialize({ ...get2() });
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options.version }).then(
      (serializedValue) => storage.setItem(options.name, serializedValue)
    ).catch((e) => {
      errorInSync = e;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get2,
    api
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => cb(get2()));
    const postRehydrationCallback = ((_a = options.onRehydrateStorage) == null ? void 0 : _a.call(options, get2())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((storageValue) => {
      if (storageValue) {
        return options.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get2()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};
var newImpl = (config, baseOptions) => (set, get2, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get2,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get2() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get2,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get2()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get2()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return [
              true,
              options.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              )
            ];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get2()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get2();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
var persistImpl = (config, baseOptions) => {
  if ("getStorage" in baseOptions || "serialize" in baseOptions || "deserialize" in baseOptions) {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
      );
    }
    return oldImpl(config, baseOptions);
  }
  return newImpl(config, baseOptions);
};
var persist = persistImpl;

// node_modules/.pnpm/@roochnetwork+rooch-sdk-kit@0.2.7_@tanstack+react-query@5.59.20_react@18.3.1__@types+react@18_x5qqh6vsf7o6f74axd3c32weji/node_modules/@roochnetwork/rooch-sdk-kit/dist/esm/index.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_react6 = __toESM(require_react());
var import_react7 = __toESM(require_react());
var import_react8 = __toESM(require_react());
var import_react9 = __toESM(require_react());
var import_react10 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
function useSessionStore(selector) {
  const store = (0, import_react5.useContext)(RoochContext);
  if (!store) {
    throw new Error(
      "Could not find RoochSessionContext. Ensure that you have set up the RoochClientProvider."
    );
  }
  return useStore(store, selector);
}
var HTTPTransport = class extends RoochHTTPTransport {
  constructor(options, sessionExpiredCallback) {
    super(options);
    this.sessionExpiredCallback = sessionExpiredCallback;
  }
  async request(input) {
    let result;
    try {
      result = await super.request(input);
      return result;
    } catch (e) {
      if ("code" in e && (e.code === ErrorValidateInvalidAccountAuthKey || e.code === ErrorValidateSessionIsExpired)) {
        this.sessionExpiredCallback();
      }
      throw e;
    }
  }
};
var DEFAULT_CREATE_CLIENT = (_name, config, setCurrentSession) => {
  if (isRoochClient(config)) {
    return config;
  }
  config.transport = new HTTPTransport(
    {
      url: config.url.toString()
    },
    setCurrentSession
  );
  return new RoochClient(config);
};
function useDefaultClient(params) {
  const { currentNetwork, networks } = params;
  const currentSession = useSessionStore((state) => state.currentSession);
  const removeSession = useSessionStore((state) => state.removeSession);
  const clearSession = (0, import_react4.useCallback)(() => {
    try {
      if (currentSession) {
        removeSession(currentSession);
      }
    } catch (e) {
      console.error(e);
    }
  }, [removeSession, currentSession]);
  const client = (0, import_react4.useMemo)(() => {
    return DEFAULT_CREATE_CLIENT(currentNetwork, networks[currentNetwork], clearSession);
  }, [currentNetwork, networks, clearSession]);
  return client;
}
var ClientContext = (0, import_react3.createContext)(null);
var DEFAULT_NETWORKS = {
  localnet: { url: getRoochNodeUrl("localnet") }
};
function RoochClientProvider(props) {
  const { onNetworkChange, network, children } = props;
  const networks = props.networks ?? DEFAULT_NETWORKS;
  const [selectedNetwork, setSelectedNetwork] = (0, import_react3.useState)(
    props.network ?? props.defaultNetwork ?? Object.keys(networks)[0]
  );
  const currentNetwork = props.network ?? selectedNetwork;
  const client = useDefaultClient({ currentNetwork, networks });
  const ctx = (0, import_react3.useMemo)(() => {
    return {
      client,
      network: currentNetwork,
      networks,
      config: networks[currentNetwork] instanceof RoochClient ? null : networks[currentNetwork],
      selectNetwork: (newNetwork) => {
        if (currentNetwork === newNetwork) {
          return;
        }
        if (!network && newNetwork !== selectedNetwork) {
          setSelectedNetwork(newNetwork);
        }
        onNetworkChange == null ? void 0 : onNetworkChange(newNetwork);
      }
    };
  }, [client, currentNetwork, networks, network, selectedNetwork, onNetworkChange]);
  return (0, import_jsx_runtime.jsx)(ClientContext.Provider, { value: ctx, children });
}
function createSessionStore({ storage, storageKey }) {
  return createStore()(
    persist(
      (set, get2) => ({
        sessions: [],
        currentSession: null,
        addSession(session) {
          const cache = get2().sessions;
          cache.push(session);
          set(() => ({
            sessions: cache
          }));
        },
        setCurrentSession(session) {
          if (!session) {
            set(() => ({
              currentSession: null
            }));
          } else {
            const cache = get2().sessions;
            if (!cache.find((item) => item.getAuthKey() === session.getAuthKey())) {
              cache.push(session);
            }
            set(() => ({
              currentSession: session,
              sessions: cache
            }));
          }
        },
        removeSession(session) {
          const cacheSessions = get2().sessions;
          const cacheCurSession = get2().currentSession;
          set(() => ({
            currentSession: (cacheCurSession == null ? void 0 : cacheCurSession.getAuthKey()) === session.getAuthKey() ? null : cacheCurSession,
            sessions: cacheSessions.filter((c) => c.getAuthKey() !== session.getAuthKey())
          }));
        }
      }),
      {
        name: storageKey,
        storage: createJSONStorage(() => storage, {
          reviver: (key, value) => {
            if (key === "sessions") {
              return value.map((session) => Session.fromJson(session));
            }
            return value;
          }
        }),
        partialize: ({ sessions }) => ({
          sessions
        })
      }
    )
  );
}
function createInMemoryStore() {
  const store = /* @__PURE__ */ new Map();
  return {
    getItem(key) {
      return store.get(key);
    },
    setItem(key, value) {
      store.set(key, value);
    },
    removeItem(key) {
      store.delete(key);
    }
  };
}
function getDefaultStorage(type) {
  let storage;
  switch (type) {
    case 0:
      storage = typeof window !== "undefined" && window.sessionStorage ? sessionStorage : void 0;
      break;
    case 1:
      storage = typeof window !== "undefined" && window.localStorage ? localStorage : void 0;
  }
  if (!storage) {
    storage = createInMemoryStore();
  }
  return storage;
}
var Wallet = class extends Signer {
  /**
   * Checks if the wallet is installed.
   * @returns A promise that resolves to true if the wallet is installed, otherwise false.
   */
  async checkInstalled() {
    for (let i = 1; i < 10 && !this.getTarget(); i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 100 * i));
    }
    return Promise.resolve(this.getTarget() !== void 0);
  }
};
var BitcoinWallet = class extends Wallet {
  async signTransaction(input) {
    const message = new BitcoinSignMessage(input.hashData(), input.getInfo() || "");
    return Authenticator.bitcoin(message, this, "raw");
  }
  getPublicKey() {
    if (!this.publicKey) {
      throw Error("Please connect your wallet first");
    }
    return new Secp256k1PublicKey(fromHEX(this.publicKey));
  }
  getRoochAddress() {
    if (!this.currentAddress) {
      throw Error("Please connect your wallet first");
    }
    return this.currentAddress.genRoochAddress();
  }
  getBitcoinAddress() {
    if (!this.currentAddress) {
      throw Error("Please connect your wallet first");
    }
    return this.currentAddress;
  }
  getKeyScheme() {
    return "Secp256k1";
  }
  normalize_recovery_id(v) {
    let normalizeV = v - 27 - 4;
    if (normalizeV < 0) {
      normalizeV = normalizeV + 4;
    }
    return normalizeV;
  }
  switchAccount() {
    throw new Error("Method not implemented.");
  }
  getChain() {
    return "bitcoin";
  }
};
var All_NETWORK = ["testnet", "livenet"];
var UniSatWallet = class extends BitcoinWallet {
  getName() {
    return "UniSat";
  }
  getIcon(_) {
    return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iX2ZyYW1lXzIiIGRhdGEtbmFtZT0iZnJhbWUgMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iLTE1IDAgMTAwIDEwMCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogdXJsKCNfbGxfMTI2KTsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiB1cmwoI19sbF8xMjMpOwogICAgICB9CgogICAgICAuY2xzLTMgewogICAgICAgIGZpbGw6IHVybCgjX2xsXzEyMSk7CiAgICAgIH0KCiAgICAgIC5jbHMtNCB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgICBmb250LWZhbWlseTogSmV0QnJhaW5zTW9ub1JvbWFuLU1lZGl1bSwgJ0pldEJyYWlucyBNb25vJzsKICAgICAgICBmb250LXNpemU6IDI0Ljc5cHg7CiAgICAgICAgZm9udC12YXJpYXRpb24tc2V0dGluZ3M6ICd3Z2h0JyA1MDA7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Il9sbF8xMjYiICB4MT0iOTYxLjY4IiB5MT0iLTQ1LjU3IiB4Mj0iOTg2LjE0IiB5Mj0iLTExMC4wNiIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg3ODAuOTkgNjcxLjcpIHJvdGF0ZSgtMTM0LjczKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwNzAxMDAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3NzM5MGQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjciIHN0b3AtY29sb3I9IiNlYTgxMDEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjRiODUyIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJfbGxfMTIxIiAgeDE9Ijk2NS4xNyIgeTE9Ii0xMzIuNDEiIHgyPSI5MjkuMjIiIHkyPSItNjUuMjIiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzgwLjk5IDY3MS43KSByb3RhdGUoLTEzNC43MykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDcwMTAwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjM3IiBzdG9wLWNvbG9yPSIjNzczOTBkIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjY3IiBzdG9wLWNvbG9yPSIjZWE4MTAxIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y0ZmI1MiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iX2xsXzEyMyIgIGN4PSIzNS41OSIgY3k9IjMwLjc2IiBmeD0iMzUuNTkiIGZ5PSIzMC43NiIgcj0iNy40NyIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y0Yjg1MiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zMyIgc3RvcC1jb2xvcj0iI2VhODEwMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42NCIgc3RvcC1jb2xvcj0iIzc3MzkwZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNzAxMDAiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIGlkPSJfZnJhbWVfMS0yIiA+CiAgICA8Zz4KICAgICAgPGc+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTQuODEsOC45MWwyMC4zNCwyMC4xNGMxLjczLDEuNzEsMi41OCwzLjQ0LDIuNTUsNS4xOS0uMDMsMS43NC0uNzcsMy4zNC0yLjIzLDQuNzgtMS41MiwxLjUxLTMuMTYsMi4yOC00LjkyLDIuMzEtMS43NiwuMDMtMy41LS44Mi01LjI0LTIuNTNsLTIwLjgtMjAuNmMtMi4zNi0yLjM0LTQuNjQtNC02Ljg0LTQuOTctMi4xOS0uOTctNC41LTEuMTItNi45Mi0uNDYtMi40MiwuNjYtNS4wMiwyLjM3LTcuOCw1LjEzLTMuODQsMy44LTUuNjcsNy4zNy01LjQ4LDEwLjcxLC4xOSwzLjM0LDIuMDksNi43OSw1LjcxLDEwLjM4bDIwLjk3LDIwLjc3YzEuNzUsMS43MywyLjYxLDMuNDYsMi41OCw1LjE4LS4wMywxLjcyLS43OCwzLjMyLTIuMjYsNC43OC0xLjQ4LDEuNDYtMy4xLDIuMjMtNC44OCwyLjI5LTEuNzcsLjA2LTMuNTMtLjc4LTUuMjgtMi41MUwxMy45OSw0OS4zNmMtMy4zMS0zLjI4LTUuNy02LjM4LTcuMTctOS4zLTEuNDctMi45Mi0yLjAyLTYuMjMtMS42NC05LjkyLC4zNC0zLjE2LDEuMzYtNi4yMiwzLjA0LTkuMTksMS42OS0yLjk3LDQuMS02LDcuMjMtOS4xMSwzLjczLTMuNyw3LjI5LTYuNTMsMTAuNjktOC41QzI5LjU0LDEuMzcsMzIuODIsLjI3LDM1Ljk5LC4wNGMzLjE3LS4yMyw2LjMsLjQsOS40LDEuODksMy4wOSwxLjQ5LDYuMjMsMy44MSw5LjQzLDYuOThaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0zIiBkPSJNMjIuOTIsOTAuMTlMMi41OCw3MC4wNUMuODUsNjguMzQsMCw2Ni42MSwuMDMsNjQuODZzLjc3LTMuMzQsMi4yMy00Ljc4YzEuNTItMS41MSwzLjE2LTIuMjgsNC45Mi0yLjMxLDEuNzYtLjAzLDMuNSwuODEsNS4yNCwyLjUzbDIwLjgsMjAuNmMyLjM3LDIuMzQsNC42NCw0LDYuODQsNC45N3M0LjUsMS4xMiw2LjkyLC40NmMyLjQyLS42Niw1LjAyLTIuMzcsNy44LTUuMTMsMy44NC0zLjgsNS42Ny03LjM3LDUuNDgtMTAuNzEtLjE5LTMuMzQtMi4wOS02LjgtNS43MS0xMC4zOGwtMTEuMTctMTAuOTdjLTEuNzUtMS43My0yLjYxLTMuNDYtMi41OC01LjE4LC4wMy0xLjcyLC43OC0zLjMyLDIuMjYtNC43OCwxLjQ4LTEuNDYsMy4xLTIuMjMsNC44OC0yLjI5LDEuNzctLjA2LDMuNTMsLjc4LDUuMjgsMi41MWwxMC41MywxMC4zNGMzLjMxLDMuMjgsNS43LDYuMzgsNy4xNyw5LjMsMS40NywyLjkyLDIuMDIsNi4yMywxLjY0LDkuOTItLjM0LDMuMTYtMS4zNiw2LjIyLTMuMDQsOS4xOS0xLjY5LDIuOTctNC4xLDYtNy4yMyw5LjExLTMuNzMsMy43LTcuMjksNi41My0xMC42OSw4LjUtMy40LDEuOTctNi42OCwzLjA3LTkuODUsMy4zLTMuMTcsLjIzLTYuMy0uNC05LjQtMS44OS0zLjA5LTEuNDktNi4yNC0zLjgxLTkuNDMtNi45OFoiLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMiIgY3g9IjM1LjYiIGN5PSIzMC43NSIgcj0iNy40NyIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K";
  }
  getDescription() {
    return "UniSat Wallet";
  }
  getInstallUrl() {
    return "";
  }
  getTarget() {
    return window.unisat;
  }
  async connect() {
    let addresses = await this.getTarget().getAccounts();
    if (!addresses || addresses.length === 0) {
      await this.getTarget().requestAccounts();
      return this.connect();
    }
    let publicKey = await this.getTarget().getPublicKey();
    this.address = addresses.map((item) => new BitcoinAddress(item));
    this.currentAddress = this.address[0];
    this.publicKey = publicKey;
    return this.address;
  }
  switchNetwork(network) {
    this.getTarget().switchNetwork(network);
  }
  getNetwork() {
    return this.getTarget().getNetwork();
  }
  getSupportNetworks() {
    return All_NETWORK;
  }
  onAccountsChanged(callback) {
    this.getTarget().on("accountsChanged", callback);
  }
  removeAccountsChanged(callback) {
    this.getTarget().removeListener("accountsChanged", callback);
  }
  onNetworkChanged(callback) {
    this.getTarget().on("networkChanged", callback);
  }
  removeNetworkChanged(callback) {
    this.getTarget().removeListener("networkChanged", callback);
  }
  async sign(msg) {
    const msgStr = str("utf8", msg);
    const sign = await this.getTarget().signMessage(msgStr);
    return bytes("base64", sign).subarray(1);
  }
  sendBtc(input) {
    return this.getTarget().sendBitcoin(input.toAddress, input.satoshis, input.options);
  }
  getBalance() {
    return this.getTarget().getBalance();
  }
};
var OkxWallet = class extends BitcoinWallet {
  getName() {
    return "OKX";
  }
  getIcon(_) {
    return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTAgMTUwIj48ZGVmcz48c3R5bGU+LmV7ZmlsbDpub25lO308L3N0eWxlPjwvZGVmcz48ZyBpZD0iYiI+PGcgaWQ9ImMiPjxwYXRoIGlkPSJkIiBjbGFzcz0iZSIgZD0iTTAsMEgxNTBWMTUwSDBWMFoiLz48L2c+PC9nPjxwYXRoIGQ9Ik0xMy44MSwxMy41N3YxMjMuOThoMTIzLjk4VjEzLjU3SDEzLjgxWm0yNi44MiwyOC42NGMwLS44NywuNzEtMS41OCwxLjU4LTEuNThoMjAuM2MuODcsMCwxLjU4LC43MSwxLjU4LDEuNTh2MjAuM2MwLC44OC0uNzEsMS41OS0xLjU4LDEuNTloLTIwLjNjLS44NywwLTEuNTgtLjcxLTEuNTgtMS41OXYtMjAuM1ptMjMuNDYsNjYuN2MwLC44Ny0uNzEsMS41OC0xLjU4LDEuNThoLTIwLjNjLS44NywwLTEuNTgtLjcxLTEuNTgtMS41OHYtMjAuM2MwLS44OCwuNzEtMS41OSwxLjU4LTEuNTloMjAuM2MuODcsMCwxLjU4LC43MSwxLjU4LDEuNTl2MjAuM1ptMjEuODYtMjEuNjJoLTIwLjNjLS44NywwLTEuNTktLjcxLTEuNTktMS41OXYtMjAuM2MwLS44NywuNzEtMS41OSwxLjU5LTEuNTloMjAuM2MuODcsMCwxLjU5LC43MSwxLjU5LDEuNTl2MjAuM2MwLC44Ny0uNzEsMS41OS0xLjU5LDEuNTlabTI1LjA1LDIxLjYyYzAsLjg3LS43MSwxLjU4LTEuNTksMS41OGgtMjAuM2MtLjg3LDAtMS41OC0uNzEtMS41OC0xLjU4di0yMC4zYzAtLjg4LC43MS0xLjU5LDEuNTgtMS41OWgyMC4zYy44NywwLDEuNTksLjcxLDEuNTksMS41OXYyMC4zWm0wLTQ2LjQxYzAsLjg4LS43MSwxLjU5LTEuNTksMS41OWgtMjAuM2MtLjg3LDAtMS41OC0uNzEtMS41OC0xLjU5di0yMC4zYzAtLjg3LC43MS0xLjU4LDEuNTgtMS41OGgyMC4zYy44NywwLDEuNTksLjcxLDEuNTksMS41OHYyMC4zWiIvPjwvc3ZnPg==";
  }
  getDescription() {
    return "OKX Wallet";
  }
  getInstallUrl() {
    return "https://chromewebstore.google.com/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge";
  }
  async sign(msg) {
    var _a;
    const msgStr = str("utf8", msg);
    const sign = await this.getTarget().signMessage(msgStr, {
      from: (_a = this.currentAddress) == null ? void 0 : _a.toStr()
    });
    return bytes("base64", sign).subarray(1);
  }
  getTarget() {
    var _a;
    return (_a = window.okxwallet) == null ? void 0 : _a.bitcoin;
  }
  async connect() {
    const obj = await this.getTarget().connect();
    this.currentAddress = new BitcoinAddress(obj.address);
    this.publicKey = obj.compressedPublicKey !== "" ? obj.compressedPublicKey : obj.publicKey;
    this.address = [this.currentAddress];
    return this.address;
  }
  switchNetwork(_) {
    throw Error("okx not support switch network!");
  }
  getNetwork() {
    return this.getTarget().getNetwork();
  }
  getSupportNetworks() {
    return ["livenet"];
  }
  onAccountsChanged(callback) {
    this.getTarget().on("accountsChanged", callback);
  }
  removeAccountsChanged(callback) {
    this.getTarget().removeListener("accountsChanged", callback);
  }
  onNetworkChanged(callback) {
    this.getTarget().on("networkChanged", callback);
  }
  removeNetworkChanged(callback) {
    this.getTarget().removeListener("networkChanged", callback);
  }
  // TODO: okx not support test btc
  sendBtc(input) {
    return this.getTarget().sendBitcoin(input.toAddress, input.satoshis, input.options);
  }
  getBalance() {
    return this.getTarget().getBalance();
  }
};
var OnekeyWallet = class extends BitcoinWallet {
  getName() {
    return "OneKey";
  }
  getIcon(theme) {
    if (theme === "dark") {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDE0NCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzIgMTQ0QzEyMS43MDYgMTQ0IDE0NCAxMjEuNzA2IDE0NCA3MkMxNDQgMjIuMjk0NCAxMjEuNzA2IDAgNzIgMEMyMi4yOTQ0IDAgMCAyMi4yOTQ0IDAgNzJDMCAxMjEuNzA2IDIyLjI5NDQgMTQ0IDcyIDE0NFpNNTguNDc1MyAzMC41MzA1SDc4LjUwNTNWNjMuNTM4MUg2Ni4wODY1VjQxLjE1NjJINTQuOTYxM0w1OC40NzUzIDMwLjUzMDVaTTcyLjAwMDQgMTEzLjQ2OUM4NC42MTY0IDExMy40NjkgOTQuODQzNyAxMDMuMjQyIDk0Ljg0MzcgOTAuNjI2MUM5NC44NDM3IDc4LjAxMDEgODQuNjE2NCA2Ny43ODI4IDcyLjAwMDQgNjcuNzgyOEM1OS4zODQ0IDY3Ljc4MjggNDkuMTU3MSA3OC4wMTAxIDQ5LjE1NzEgOTAuNjI2MUM0OS4xNTcxIDEwMy4yNDIgNTkuMzg0NCAxMTMuNDY5IDcyLjAwMDQgMTEzLjQ2OVpNNzIuMDAwNCAxMDMuMDk5Qzc4Ljg4ODkgMTAzLjA5OSA4NC40NzMxIDk3LjUxNDUgODQuNDczMSA5MC42MjZDODQuNDczMSA4My43Mzc1IDc4Ljg4ODkgNzguMTUzMyA3Mi4wMDA0IDc4LjE1MzNDNjUuMTExOSA3OC4xNTMzIDU5LjUyNzYgODMuNzM3NSA1OS41Mjc2IDkwLjYyNkM1OS41Mjc2IDk3LjUxNDUgNjUuMTExOSAxMDMuMDk5IDcyLjAwMDQgMTAzLjA5OVoiIGZpbGw9ImJsYWNrIiBzdHlsZT0iZmlsbDpibGFjaztmaWxsLW9wYWNpdHk6MTsiLz4KPC9zdmc+Cg==";
    }
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDE0NCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzIgMTQ0QzEyMS43MDYgMTQ0IDE0NCAxMjEuNzA2IDE0NCA3MkMxNDQgMjIuMjk0NCAxMjEuNzA2IDAgNzIgMEMyMi4yOTQ0IDAgMCAyMi4yOTQ0IDAgNzJDMCAxMjEuNzA2IDIyLjI5NDQgMTQ0IDcyIDE0NFpNNTguNDc1MyAzMC41MzA1SDc4LjUwNTNWNjMuNTM4MUg2Ni4wODY1VjQxLjE1NjJINTQuOTYxM0w1OC40NzUzIDMwLjUzMDVaTTcyLjAwMDQgMTEzLjQ2OUM4NC42MTY0IDExMy40NjkgOTQuODQzNyAxMDMuMjQyIDk0Ljg0MzcgOTAuNjI2MUM5NC44NDM3IDc4LjAxMDEgODQuNjE2NCA2Ny43ODI4IDcyLjAwMDQgNjcuNzgyOEM1OS4zODQ0IDY3Ljc4MjggNDkuMTU3MSA3OC4wMTAxIDQ5LjE1NzEgOTAuNjI2MUM0OS4xNTcxIDEwMy4yNDIgNTkuMzg0NCAxMTMuNDY5IDcyLjAwMDQgMTEzLjQ2OVpNNzIuMDAwNCAxMDMuMDk5Qzc4Ljg4ODkgMTAzLjA5OSA4NC40NzMxIDk3LjUxNDUgODQuNDczMSA5MC42MjZDODQuNDczMSA4My43Mzc1IDc4Ljg4ODkgNzguMTUzMyA3Mi4wMDA0IDc4LjE1MzNDNjUuMTExOSA3OC4xNTMzIDU5LjUyNzYgODMuNzM3NSA1OS41Mjc2IDkwLjYyNkM1OS41Mjc2IDk3LjUxNDUgNjUuMTExOSAxMDMuMDk5IDcyLjAwMDQgMTAzLjA5OVoiIGZpbGw9IiM0NEQ2MkMiIHN0eWxlPSJmaWxsOiM0NEQ2MkM7ZmlsbDpjb2xvcihkaXNwbGF5LXAzIDAuMjY2NyAwLjgzOTIgMC4xNzI1KTtmaWxsLW9wYWNpdHk6MTsiLz4KPC9zdmc+Cg==";
  }
  getDescription() {
    return "OneKey Wallet";
  }
  getInstallUrl() {
    return "https://chromewebstore.google.com/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj";
  }
  async sign(msg) {
    const msgStr = str("utf8", msg);
    const sign = await this.getTarget().signMessage(msgStr);
    return bytes("base64", sign).subarray(1);
  }
  getTarget() {
    var _a;
    return (_a = window.$onekey) == null ? void 0 : _a.btc;
  }
  async connect() {
    let addresses = await this.getTarget().getAccounts();
    if (!addresses || addresses.length === 0) {
      await this.getTarget().requestAccounts();
      return this.connect();
    }
    let publicKey = await this.getTarget().getPublicKey();
    this.address = addresses.map((item) => new BitcoinAddress(item));
    this.currentAddress = this.address[0];
    this.publicKey = publicKey;
    return this.address;
  }
  // TODO: onekey provider switch api, But it doesn't work.
  switchNetwork(_) {
    throw Error("onekey not support switch network!");
  }
  getNetwork() {
    return this.getTarget().getNetwork();
  }
  getSupportNetworks() {
    return All_NETWORK;
  }
  onAccountsChanged(callback) {
    this.getTarget().on("accountsChanged", callback);
  }
  removeAccountsChanged(callback) {
    this.getTarget().removeListener("accountsChanged", callback);
  }
  onNetworkChanged(callback) {
    this.getTarget().on("networkChanged", callback);
  }
  removeNetworkChanged(callback) {
    this.getTarget().removeListener("networkChanged", callback);
  }
  sendBtc(input) {
    return this.getTarget().sendBitcoin(input.toAddress, input.satoshis, input.options);
  }
  getBalance() {
    return this.getTarget().getBalance();
  }
};
var USER_REJECTED = 4001;
var NOT_SUPPORT_ADDRESS = 99991;
var AMOUNT_INVALID = 99999;
var WalletError = class extends Error {
  constructor(code, msg) {
    super(msg);
    this.code = code;
  }
};
async function checkWallets(filter) {
  const wallets2 = [new UniSatWallet(), new OkxWallet(), new OnekeyWallet()].filter(
    (wallet) => wallet.getChain() === filter || !filter
  );
  return await Promise.all(wallets2.filter(async (w) => await w.checkInstalled()));
}
var DEFAULT_SESSION_STORAGE_KEY = function(_) {
  return "rooch-sdk-kit:rooch-session-info";
};
var RoochContext = (0, import_react2.createContext)(null);
function RoochProvider(props) {
  const { children, networks, defaultNetwork } = props;
  const storeRef = (0, import_react2.useRef)(
    createSessionStore({
      storage: getDefaultStorage(
        1
        /* Local */
      ),
      storageKey: DEFAULT_SESSION_STORAGE_KEY()
    })
  );
  return (0, import_jsx_runtime2.jsx)(RoochContext.Provider, { value: storeRef.current, children: (0, import_jsx_runtime2.jsx)(RoochClientProvider, { networks, defaultNetwork, children }) });
}
function createWalletStore({
  chain,
  currentWallet,
  wallets: wallets2,
  storage,
  storageKey,
  autoConnectEnabled
}) {
  return createStore()(
    persist(
      (set, get2) => ({
        currentChain: chain,
        autoConnectEnabled,
        currentWallet,
        wallets: wallets2,
        addresses: [],
        currentAddress: void 0,
        lastConnectedAddress: void 0,
        lastConnectedWalletName: void 0,
        connectionStatus: "disconnected",
        setChain(chain2) {
          const currentChain = get2().currentChain;
          if (currentChain === chain2) {
            return;
          }
          set(() => ({
            currentChain: chain2,
            accounts: [],
            // currentWallet: supportWallets.find((v) => v.getSupportNetworks()),
            sessionAccount: null,
            connectionStatus: "disconnected"
          }));
        },
        setConnectionStatus(connectionStatus) {
          set(() => ({
            connectionStatus
          }));
        },
        setWalletConnected(wallet, connectedAddresses, selectedAddress) {
          set(() => ({
            currentWallet: wallet,
            accounts: connectedAddresses,
            currentAddress: selectedAddress || void 0,
            lastConnectedWalletName: wallet.getName(),
            lastConnectedAddress: selectedAddress == null ? void 0 : selectedAddress.toStr(),
            connectionStatus: "connected"
          }));
        },
        setWalletDisconnected() {
          set(() => ({
            accounts: [],
            currentAddress: void 0,
            lastConnectedWalletName: void 0,
            lastConnectedAddress: void 0,
            connectionStatus: "disconnected"
          }));
        },
        setAddressSwitched(selected) {
          set(() => ({
            currentAddress: selected,
            lastConnectedAddress: selected.toStr() ?? ""
          }));
        },
        updateWalletAddresses(addresses) {
          const currentAddr = get2().currentAddress;
          set(() => ({
            currentAddress: currentAddr && addresses.find((addr) => addr.toStr() === currentAddr.toStr()) || addresses[0]
          }));
        },
        updateWallets(wallets3) {
          set(() => ({
            wallets: wallets3
          }));
        }
      }),
      {
        name: storageKey,
        storage: createJSONStorage(() => storage),
        partialize: ({ lastConnectedWalletName, lastConnectedAddress }) => ({
          lastConnectedWalletName,
          lastConnectedAddress
        })
      }
    )
  );
}
function useCurrentNetwork() {
  return useRoochContext().network;
}
function useRoochContext() {
  const context = (0, import_react7.useContext)(ClientContext);
  if (!context) {
    throw new Error(
      "Could not find RoochClientContext. Ensure that you have set up the RoochClientProvider."
    );
  }
  return context;
}
function useRoochClient() {
  return useRoochContext().client;
}
function useRoochClientQuery(...args) {
  const [method, params, { queryKey = [], ...options } = {}] = args;
  const network = useCurrentNetwork();
  const roochClient = useRoochClient();
  return useQuery({
    ...options,
    queryKey: [network, method, params, ...queryKey],
    queryFn: async () => {
      return await roochClient[method](params);
    }
  });
}
function formMutationKeyFn(baseEntity) {
  return function mutationKeyFn(additionalKeys = []) {
    return [{ ...roochMutationKeys.all, baseEntity }, ...additionalKeys];
  };
}
var roochMutationKeys = {
  all: { baseScope: "rooch" },
  addNetwork: formMutationKeyFn("add-network"),
  switchNetwork: formMutationKeyFn("switch-network"),
  removeNetwork: formMutationKeyFn("remove-network"),
  removeSession: formMutationKeyFn("remove-session"),
  transferObject: formMutationKeyFn("transfer-object"),
  transferCoin: formMutationKeyFn("transfer-coin"),
  signAndExecuteTransaction: formMutationKeyFn("sign-and-execute-transaction")
};
function formMutationKeyFn2(baseEntity) {
  return function mutationKeyFn(additionalKeys = []) {
    return [{ ...walletMutationKeys.all, baseEntity }, ...additionalKeys];
  };
}
var walletMutationKeys = {
  all: { baseScope: "wallet" },
  connectWallet: formMutationKeyFn2("connect-wallet"),
  autoConnectWallet: formMutationKeyFn2("auto-connect-wallet"),
  switchAccount: formMutationKeyFn2("switch-account"),
  createSessionKey: formMutationKeyFn2("create-session-key")
};
function useSwitchNetwork({
  mutationKey,
  ...mutationOptions
} = {}) {
  const switchNetwork = useRoochContext().selectNetwork;
  return useMutation({
    mutationKey: roochMutationKeys.switchNetwork(mutationKey),
    mutationFn: async (args) => {
      switchNetwork(args);
    },
    ...mutationOptions
  });
}
function useTransferObject({
  mutationKey,
  ...mutationOptions
} = {}) {
  const client = useRoochClient();
  return useMutation({
    mutationKey: roochMutationKeys.transferObject(mutationKey),
    mutationFn: async (args) => {
      const result = await client.transferObject(args);
      if (result.execution_info.status.type !== "executed") {
        Error("transfer failed" + result.execution_info.status.type);
      }
    },
    ...mutationOptions
  });
}
function useCurrentSession() {
  return useSessionStore((state) => state.currentSession);
}
function useTransferCoin({
  mutationKey,
  ...mutationOptions
} = {}) {
  const client = useRoochClient();
  const curSession = useCurrentSession();
  return useMutation({
    mutationKey: roochMutationKeys.transferCoin(mutationKey),
    mutationFn: async (args) => {
      const signer = args.signer || curSession;
      if (signer === null) {
        throw Error("");
      }
      const result = await client.transfer({
        ...args,
        signer: args.signer || curSession
      });
      if (result.execution_info.status.type !== "executed") {
        Error("transfer failed" + result.execution_info.status.type);
      }
    },
    ...mutationOptions
  });
}
function createNetworkConfig(networkConfig) {
  function useNetworkConfig() {
    const { config } = useRoochContext();
    if (!config) {
      throw new Error("No network config found");
    }
    return config;
  }
  function useNetworkVariables() {
    const { variables } = useNetworkConfig();
    return variables ?? {};
  }
  function useNetworkVariable(name) {
    const variables = useNetworkVariables();
    return variables[name];
  }
  return {
    networkConfig,
    useNetworkConfig,
    useNetworkVariables,
    useNetworkVariable
  };
}
function UseSignAndExecuteTransaction({
  mutationKey,
  ...mutationOptions
} = {}) {
  const client = useRoochClient();
  const session = useCurrentSession();
  return useMutation({
    mutationKey: roochMutationKeys.signAndExecuteTransaction(mutationKey),
    mutationFn: async (args) => {
      if (!session) {
        throw Error("Create a session first");
      }
      const result = await client.signAndExecuteTransaction({
        transaction: args.transaction,
        signer: args.signer || session
      });
      if (result.execution_info.status.type !== "executed" && result.execution_info.status) {
        Error("transfer failed" + result.execution_info.status.type);
      }
      return result;
    },
    ...mutationOptions
  });
}
function useWalletStore(selector) {
  const store = (0, import_react8.useContext)(WalletContext);
  if (!store) {
    throw new Error("Could not find WalletContext. Ensure that you have set up the WalletProvider.");
  }
  return useStore(store, selector);
}
function useAddresses() {
  return useWalletStore((state) => state.addresses);
}
function useAutoConnectWallet() {
  const { mutateAsync: connectWallet } = useConnectWallet();
  const autoConnectEnabled = useWalletStore((state) => state.autoConnectEnabled);
  const lastConnectedWalletName = useWalletStore((state) => state.lastConnectedWalletName);
  const lastConnectedAddress = useWalletStore((state) => state.lastConnectedAddress);
  const { isConnected } = useCurrentWallet();
  const wallets2 = useWallets();
  const [clientOnly, setClientOnly] = (0, import_react9.useState)(false);
  const currentAddress = useCurrentAddress();
  (0, import_react9.useLayoutEffect)(() => {
    setClientOnly(true);
  }, []);
  const { data, isError } = useQuery({
    queryKey: [
      "@rooch/sdk-kit",
      "autoconnect",
      {
        isConnected,
        autoConnectEnabled,
        lastConnectedWalletName,
        lastConnectedAddress
      }
    ],
    queryFn: async () => {
      if (!autoConnectEnabled) {
        return "disabled";
      }
      if (!lastConnectedWalletName || !lastConnectedAddress || isConnected) {
        return "attempted";
      }
      let wallet = wallets2.find((wallet2) => wallet2.getName() === lastConnectedWalletName);
      if (wallet) {
        await connectWallet({ wallet });
        if (wallet.getChain() !== "bitcoin" && (currentAddress == null ? void 0 : currentAddress.toStr()) !== lastConnectedAddress) {
          wallet.switchAccount(lastConnectedAddress);
        }
      }
      return "attempted";
    },
    enabled: autoConnectEnabled,
    persister: void 0,
    gcTime: 0,
    staleTime: 0,
    networkMode: "always",
    retry: (_) => {
      return false;
    },
    retryOnMount: false,
    refetchInterval: 1e3,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
  if (!autoConnectEnabled) {
    return "disabled";
  }
  if (!clientOnly) {
    return "idle";
  }
  if (!lastConnectedWalletName) {
    return "attempted";
  }
  return isError ? "attempted" : data ?? "idle";
}
function useSession() {
  return useSessionStore(
    (state) => state.sessions.sort((a, b) => b.getCreateTime() - a.getCreateTime())
  );
}
function useConnectWallet({
  mutationKey,
  ...mutationOptions
} = {}) {
  const sessions = useSession();
  const setCurrentSession = useSessionStore((state) => state.setCurrentSession);
  const setWalletConnected = useWalletStore((state) => state.setWalletConnected);
  const setWalletDisconnected = useWalletStore((state) => state.setWalletDisconnected);
  const setConnectionStatus = useWalletStore((state) => state.setConnectionStatus);
  return useMutation({
    mutationKey: walletMutationKeys.connectWallet(mutationKey),
    mutationFn: async ({ wallet }) => {
      try {
        setConnectionStatus("connecting");
        const connectAddress = await wallet.connect();
        const selectedAddress = connectAddress[0];
        setWalletConnected(wallet, connectAddress, selectedAddress);
        const cur = sessions.find(
          (item) => item.getRoochAddress().toStr() === (selectedAddress == null ? void 0 : selectedAddress.genRoochAddress().toStr())
        );
        setCurrentSession(cur);
        return connectAddress;
      } catch (error) {
        setWalletDisconnected();
        throw error;
      }
    },
    ...mutationOptions
  });
}
function useCurrentAddress() {
  return useWalletStore((state) => state.currentAddress);
}
function useCurrentWallet() {
  const currentWallet = useWalletStore((state) => state.currentWallet);
  const connectionStatus = useWalletStore((state) => state.connectionStatus);
  switch (connectionStatus) {
    case "connecting":
      return {
        status: connectionStatus,
        wallet: currentWallet,
        isDisconnected: false,
        isConnecting: true,
        isConnected: false
      };
    case "disconnected":
      return {
        status: connectionStatus,
        wallet: currentWallet,
        isDisconnected: true,
        isConnecting: false,
        isConnected: false
      };
    case "connected": {
      return {
        status: connectionStatus,
        wallet: currentWallet,
        isDisconnected: false,
        isConnecting: false,
        isConnected: true
      };
    }
  }
}
var WalletNotConnectedError = class extends Error {
};
function useCreateSessionKey({
  mutationKey,
  ...mutationOptions
} = {}) {
  const client = useRoochClient();
  const currentWallet = useCurrentWallet();
  const setCurrentSession = useSessionStore((state) => state.setCurrentSession);
  return useMutation({
    mutationKey: walletMutationKeys.createSessionKey(mutationKey),
    mutationFn: async (args) => {
      if (!currentWallet.isConnected) {
        throw new WalletNotConnectedError("No wallet is connected.");
      }
      const sessionAccount = await client.createSession({
        signer: currentWallet.wallet,
        sessionArgs: args
      });
      setCurrentSession(sessionAccount);
      return sessionAccount;
    },
    ...mutationOptions
  });
}
function useWallets() {
  return useWalletStore((state) => state.wallets);
}
var wallets = void 0;
var registered = /* @__PURE__ */ new Set();
var listeners = {};
function getWallets() {
  if (wallets)
    return wallets;
  wallets = Object.freeze({ register, get, on });
  return wallets;
}
function register(...wallets2) {
  var _a;
  wallets2.forEach((wallet) => registered.add(wallet));
  (_a = listeners["register"]) == null ? void 0 : _a.forEach((listener) => guard(() => listener(...wallets2)));
  return function unregister() {
    var _a2;
    wallets2.forEach((wallet) => registered.delete(wallet));
    (_a2 = listeners["unregister"]) == null ? void 0 : _a2.forEach((listener) => guard(() => listener(...wallets2)));
  };
}
function get() {
  return [...registered];
}
function on(event, listener) {
  var _a;
  ((_a = listeners[event]) == null ? void 0 : _a.push(listener)) || (listeners[event] = [listener]);
  return function off() {
    var _a2;
    listeners[event] = (_a2 = listeners[event]) == null ? void 0 : _a2.filter((existingListener) => listener !== existingListener);
  };
}
function guard(callback) {
  try {
    callback();
  } catch (error) {
    console.error(error);
  }
}
function getRegisteredWallets(preferredWallets, walletFilter) {
  const walletsApi = getWallets();
  const wallets2 = walletsApi.get();
  const Wallets = wallets2.filter((wallet) => !walletFilter || walletFilter(wallet));
  return [
    // Preferred wallets, in order:
    ...preferredWallets.map((name) => Wallets.find((wallet) => wallet.getName() === name)),
    // Wallets in default order:
    ...Wallets.filter((wallet) => !preferredWallets.includes(wallet.getName()))
  ].filter((wallet) => wallet !== void 0);
}
function useWalletChanged(preferredWallets, walletFilter) {
  const updateWallets = useWalletStore((state) => state.updateWallets);
  (0, import_react10.useEffect)(() => {
    const api = getWallets();
    updateWallets(getRegisteredWallets(preferredWallets, walletFilter));
    const unsubscribeFromRegister = api.on("register", () => {
      updateWallets(getRegisteredWallets(preferredWallets, walletFilter));
    });
    return () => {
      unsubscribeFromRegister();
    };
  }, [preferredWallets, updateWallets, walletFilter]);
}
function useRemoveSession({
  mutationKey,
  ...mutationOptions
} = {}) {
  const sessionsKeys = useSession();
  const removeSession = useSessionStore((state) => state.removeSession);
  const setCurrentSession = useSessionStore((state) => state.setCurrentSession);
  const currentSession = useCurrentSession();
  const client = useRoochClient();
  return useMutation({
    mutationKey: roochMutationKeys.removeSession(mutationKey),
    mutationFn: async (args) => {
      try {
        if (!currentSession) {
          return;
        }
        const result = await client.removeSession({
          authKey: args.authKey,
          signer: currentSession
        });
        if (result) {
          let cacheSession = sessionsKeys.find(
            (item) => item.getAuthKey() === args.authKey
          );
          if (cacheSession) {
            removeSession(cacheSession);
            if (cacheSession.getAuthKey() === (currentSession == null ? void 0 : currentSession.getAuthKey())) {
              setCurrentSession(void 0);
            }
          }
        }
      } catch (e) {
        throw e;
      }
    },
    ...mutationOptions
  });
}
var DEFAULT_STORAGE_KEY = "rooch-sdk-kit:wallet-connect-info";
var WalletContext = (0, import_react6.createContext)(null);
function WalletProvider({
  preferredWallets = ["UniSat", "OKX"],
  chain = "bitcoin",
  storage,
  storageKey = DEFAULT_STORAGE_KEY,
  autoConnect = false,
  children
}) {
  const network = useCurrentNetwork();
  const storeRef = (0, import_react6.useRef)(
    createWalletStore({
      chain,
      wallets: getRegisteredWallets(preferredWallets, (w) => w.getChain() === chain),
      currentWallet: void 0,
      autoConnectEnabled: autoConnect,
      storage: storage || getDefaultStorage(
        1
        /* Local */
      ),
      storageKey: storageKey + network + (chain == null ? void 0 : chain.toString())
    })
  );
  (0, import_react6.useEffect)(() => {
    const fetchWallet = async () => {
      const wallets2 = await checkWallets(chain);
      getWallets().register(...wallets2);
    };
    fetchWallet();
  }, [chain]);
  return (0, import_jsx_runtime3.jsx)(WalletContext.Provider, { value: storeRef.current, children: (0, import_jsx_runtime3.jsx)(WalletConnectionManager, { preferredWallets, chain, children }) });
}
function WalletConnectionManager({ children, preferredWallets }) {
  useAutoConnectWallet();
  useWalletChanged(preferredWallets);
  const connectionStatus = useWalletStore((store) => store.connectionStatus);
  const currentWallet = useWalletStore((store) => store.currentWallet);
  const setWalletDisconnected = useWalletStore((store) => store.setWalletDisconnected);
  const setConnectionStatus = useWalletStore((state) => state.setConnectionStatus);
  const setAddressSwitched = useWalletStore((store) => store.setAddressSwitched);
  const currentAddress = useWalletStore((state) => state.currentAddress);
  const sessions = useSession();
  const curSession = useCurrentSession();
  const setCurrentSession = useSessionStore((state) => state.setCurrentSession);
  const accountsChangedHandler = (0, import_react6.useCallback)(
    async (address) => {
      if (address.length === 0) {
        setWalletDisconnected();
      } else {
        setConnectionStatus("connecting");
        const selectedAddress = address[0];
        if (selectedAddress !== (currentAddress == null ? void 0 : currentAddress.toStr())) {
          setAddressSwitched(new BitcoinAddress(selectedAddress));
          setCurrentSession(void 0);
          const cur = sessions.find(
            (item) => item.getRoochAddress().toStr() === (currentAddress == null ? void 0 : currentAddress.genRoochAddress().toStr())
          );
          if (cur && cur.getAuthKey() !== (curSession == null ? void 0 : curSession.getAuthKey())) {
            setCurrentSession(cur);
          }
        }
      }
    },
    [
      sessions,
      curSession,
      currentAddress,
      setAddressSwitched,
      setConnectionStatus,
      setCurrentSession,
      setWalletDisconnected
    ]
  );
  (0, import_react6.useEffect)(() => {
    if (connectionStatus === "connected") {
      currentWallet == null ? void 0 : currentWallet.onAccountsChanged(accountsChangedHandler);
    }
    return () => {
      if (connectionStatus === "connected") {
        currentWallet == null ? void 0 : currentWallet.removeAccountsChanged(accountsChangedHandler);
      }
    };
  }, [accountsChangedHandler, connectionStatus, currentWallet]);
  return children;
}
export {
  AMOUNT_INVALID,
  All_NETWORK,
  BitcoinWallet,
  NOT_SUPPORT_ADDRESS,
  OkxWallet,
  OnekeyWallet,
  RoochContext,
  RoochProvider,
  USER_REJECTED,
  UniSatWallet,
  UseSignAndExecuteTransaction,
  Wallet,
  WalletContext,
  WalletError,
  WalletProvider,
  createNetworkConfig,
  useAddresses,
  useAutoConnectWallet,
  useConnectWallet,
  useCreateSessionKey,
  useCurrentAddress,
  useCurrentNetwork,
  useCurrentSession,
  useCurrentWallet,
  useRemoveSession,
  useRoochClient,
  useRoochClientQuery,
  useRoochContext,
  useSession,
  useSwitchNetwork,
  useTransferCoin,
  useTransferObject,
  useWalletChanged,
  useWalletStore,
  useWallets
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@roochnetwork_rooch-sdk-kit.js.map
