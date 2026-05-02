var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/worker.js
var CONFIG = {
  VERSION: "4.0.0",
  NAME: "Mellissa Hotel API",
  ALLOWED_ORIGINS: [
    "https://mellissa.brainsait.org",
    "https://mellissa-api.brainsait.org",
    "https://hotel.brainsait.org",
    "https://booking.brainsait.org",
    "https://brainsait.org",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  RATE_LIMIT: { windowMs: 6e4, maxRequests: 120 },
  SESSION_TTL: 86400,
  CACHE_TTL: 300
};
var SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
};
function getCorsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const isAllowed = !origin || CONFIG.ALLOWED_ORIGINS.some((o) => origin === o) || origin.endsWith(".brainsait.org") || origin.endsWith(".elfadil.com");
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin || "*" : "https://mellissa.brainsait.org",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Request-ID, X-Session-ID, Accept-Language",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    ...SECURITY_HEADERS
  };
}
__name(getCorsHeaders, "getCorsHeaders");
function cors(response, request) {
  const h = new Headers(response.headers);
  Object.entries(getCorsHeaders(request)).forEach(([k, v]) => h.set(k, v));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: h });
}
__name(cors, "cors");
function preflight(request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(request) });
}
__name(preflight, "preflight");
var json = /* @__PURE__ */ __name((data, status = 200, extra = {}) => new Response(JSON.stringify(data, null, 2), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-cache", ...SECURITY_HEADERS, ...extra }
}), "json");
var err = /* @__PURE__ */ __name((message, status = 500) => json({ error: true, message, timestamp: (/* @__PURE__ */ new Date()).toISOString() }, status), "err");
var rl = /* @__PURE__ */ new Map();
function rateLimit(ip) {
  const now = Date.now(), w = CONFIG.RATE_LIMIT.windowMs;
  const e = rl.get(ip) || { n: 0, t: now + w };
  if (now > e.t) {
    e.n = 0;
    e.t = now + w;
  }
  e.n++;
  rl.set(ip, e);
  return e.n <= CONFIG.RATE_LIMIT.maxRequests;
}
__name(rateLimit, "rateLimit");
var uuid = /* @__PURE__ */ __name(() => crypto.randomUUID?.() || "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0;
  return (c === "x" ? r : r & 3 | 8).toString(16);
}), "uuid");
var SCHEMA = [
  `CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, name_ar TEXT,
    type TEXT NOT NULL, description TEXT, description_ar TEXT,
    price_per_night REAL NOT NULL, currency TEXT DEFAULT 'SAR',
    max_guests INTEGER DEFAULT 2, sqm INTEGER,
    amenities TEXT, amenities_ar TEXT, images TEXT,
    available INTEGER DEFAULT 1, rating REAL DEFAULT 4.5,
    created_at TEXT DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY, room_id TEXT NOT NULL,
    guest_name TEXT NOT NULL, guest_email TEXT NOT NULL, guest_phone TEXT,
    check_in TEXT NOT NULL, check_out TEXT NOT NULL, guests INTEGER DEFAULT 1,
    total_price REAL, currency TEXT DEFAULT 'SAR',
    status TEXT DEFAULT 'pending', payment_status TEXT DEFAULT 'unpaid',
    special_requests TEXT, lang TEXT DEFAULT 'en',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
  )`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY, room_id TEXT, booking_id TEXT,
    guest_name TEXT NOT NULL, rating INTEGER NOT NULL, comment TEXT, lang TEXT DEFAULT 'en',
    created_at TEXT DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL,
    phone TEXT, subject TEXT, message TEXT NOT NULL, status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS chat_history (
    id TEXT PRIMARY KEY, session_id TEXT NOT NULL,
    role TEXT NOT NULL, content TEXT NOT NULL, lang TEXT DEFAULT 'en',
    created_at TEXT DEFAULT (datetime('now'))
  )`
];
var ROOMS = [
  {
    id: "rm-royal-001",
    name: "Royal Suite",
    name_ar: "\u0627\u0644\u062C\u0646\u0627\u062D \u0627\u0644\u0645\u0644\u0643\u064A",
    type: "suite",
    sqm: 120,
    description: "Experience unparalleled luxury \u2014 a 120sqm masterpiece featuring panoramic Riyadh city views, hand-crafted Arabian d\xE9cor, marble bathroom with rain shower, private lounge, and 24/7 butler service.",
    description_ar: "\u0627\u0633\u062A\u0645\u062A\u0639 \u0628\u0627\u0644\u0641\u062E\u0627\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0642\u0629 \u2014 \u062A\u062D\u0641\u0629 \u0645\u0639\u0645\u0627\u0631\u064A\u0629 \u0628\u0645\u0633\u0627\u062D\u0629 120 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B \u062A\u0637\u0644 \u0639\u0644\u0649 \u0623\u0641\u0642 \u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0628\u062F\u064A\u0643\u0648\u0631 \u0639\u0631\u0628\u064A \u0645\u0635\u0646\u0648\u0639 \u064A\u062F\u0648\u064A\u0627\u064B\u060C \u0648\u062D\u0645\u0627\u0645 \u0631\u062E\u0627\u0645\u064A \u0645\u0639 \u062F\u0634 \u0645\u0637\u0631\u064A\u060C \u0648\u0635\u0627\u0644\u0629 \u062E\u0627\u0635\u0629\u060C \u0648\u062E\u062F\u0645\u0629 \u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629.",
    price_per_night: 3500,
    max_guests: 4,
    amenities: '["King Bed","City View","Butler Service","Marble Bath","Private Lounge","Mini Bar","Smart TV","WiFi","Nespresso","Safe"]',
    amenities_ar: '["\u0633\u0631\u064A\u0631 \u0643\u064A\u0646\u063A","\u0625\u0637\u0644\u0627\u0644\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u062F\u064A\u0646\u0629","\u062E\u062F\u0645\u0629 \u0634\u062E\u0635\u064A\u0629","\u062D\u0645\u0627\u0645 \u0631\u062E\u0627\u0645\u064A","\u0635\u0627\u0644\u0629 \u062E\u0627\u0635\u0629","\u0645\u064A\u0646\u064A \u0628\u0627\u0631","\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0630\u0643\u064A","\u0648\u0627\u064A \u0641\u0627\u064A","\u0646\u064A\u0633\u0628\u0631\u0633\u0648","\u062E\u0632\u0646\u0629"]',
    images: '["royal-suite.jpg"]',
    rating: 4.9
  },
  {
    id: "rm-exec-002",
    name: "Executive Room",
    name_ar: "\u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629",
    type: "executive",
    sqm: 55,
    description: "Sophisticated comfort meets modern elegance. 55sqm with premium workspace, rainfall shower, Nespresso machine, and stunning Boulevard views.",
    description_ar: "\u0627\u0644\u0631\u0627\u062D\u0629 \u0627\u0644\u0645\u062A\u0637\u0648\u0631\u0629 \u062A\u0644\u062A\u0642\u064A \u0628\u0627\u0644\u0623\u0646\u0627\u0642\u0629 \u0627\u0644\u0639\u0635\u0631\u064A\u0629. 55 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B \u0645\u0639 \u0645\u0646\u0637\u0642\u0629 \u0639\u0645\u0644 \u0641\u0627\u062E\u0631\u0629\u060C \u0648\u062F\u0634 \u0645\u0637\u0631\u064A\u060C \u0648\u0622\u0644\u0629 \u0646\u064A\u0633\u0628\u0631\u0633\u0648\u060C \u0648\u0625\u0637\u0644\u0627\u0644\u0627\u062A \u062E\u0644\u0627\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u0628\u0648\u0644\u064A\u0641\u0627\u0631\u062F.",
    price_per_night: 1800,
    max_guests: 2,
    amenities: '["Queen Bed","Boulevard View","Work Desk","Rain Shower","Mini Bar","Smart TV","WiFi","Nespresso"]',
    amenities_ar: '["\u0633\u0631\u064A\u0631 \u0643\u0648\u064A\u0646","\u0625\u0637\u0644\u0627\u0644\u0629 \u0639\u0644\u0649 \u0627\u0644\u0628\u0648\u0644\u064A\u0641\u0627\u0631\u062F","\u0645\u0643\u062A\u0628 \u0639\u0645\u0644","\u062F\u0634 \u0645\u0637\u0631\u064A","\u0645\u064A\u0646\u064A \u0628\u0627\u0631","\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0630\u0643\u064A","\u0648\u0627\u064A \u0641\u0627\u064A","\u0646\u064A\u0633\u0628\u0631\u0633\u0648"]',
    images: '["exec-room.jpg"]',
    rating: 4.7
  },
  {
    id: "rm-deluxe-003",
    name: "Deluxe Room",
    name_ar: "\u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0641\u0627\u062E\u0631\u0629",
    type: "deluxe",
    sqm: 40,
    description: "A perfect blend of comfort and style. 40sqm with modern amenities, plush bedding, and beautifully designed Arabian-inspired interiors.",
    description_ar: "\u0645\u0632\u064A\u062C \u0645\u062B\u0627\u0644\u064A \u0645\u0646 \u0627\u0644\u0631\u0627\u062D\u0629 \u0648\u0627\u0644\u0623\u0646\u0627\u0642\u0629. 40 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B \u0645\u0639 \u0648\u0633\u0627\u0626\u0644 \u0631\u0627\u062D\u0629 \u0639\u0635\u0631\u064A\u0629\u060C \u0648\u0623\u0633\u0631\u0651\u0629 \u0641\u0627\u062E\u0631\u0629\u060C \u0648\u062A\u0635\u0645\u064A\u0645 \u062F\u0627\u062E\u0644\u064A \u0645\u0633\u062A\u0648\u062D\u0649 \u0645\u0646 \u0627\u0644\u0637\u0631\u0627\u0632 \u0627\u0644\u0639\u0631\u0628\u064A.",
    price_per_night: 1200,
    max_guests: 2,
    amenities: '["Queen Bed","City View","Work Desk","Shower","Smart TV","WiFi","Mini Fridge"]',
    amenities_ar: '["\u0633\u0631\u064A\u0631 \u0643\u0648\u064A\u0646","\u0625\u0637\u0644\u0627\u0644\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u062F\u064A\u0646\u0629","\u0645\u0643\u062A\u0628 \u0639\u0645\u0644","\u062F\u0634","\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0630\u0643\u064A","\u0648\u0627\u064A \u0641\u0627\u064A","\u062B\u0644\u0627\u062C\u0629 \u0635\u063A\u064A\u0631\u0629"]',
    images: '["deluxe-room.jpg"]',
    rating: 4.5
  },
  {
    id: "rm-family-004",
    name: "Family Suite",
    name_ar: "\u062C\u0646\u0627\u062D \u0627\u0644\u0639\u0627\u0626\u0644\u0629",
    type: "suite",
    sqm: 85,
    description: "Spacious 85sqm suite with connecting rooms, kids area, kitchenette, and entertainment system. Perfect for families visiting Riyadh.",
    description_ar: "\u062C\u0646\u0627\u062D \u0648\u0627\u0633\u0639 \u0628\u0645\u0633\u0627\u062D\u0629 85 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B \u0645\u0639 \u063A\u0631\u0641 \u0645\u062A\u0635\u0644\u0629\u060C \u0648\u0645\u0646\u0637\u0642\u0629 \u0623\u0637\u0641\u0627\u0644\u060C \u0648\u0645\u0637\u0628\u062E \u0635\u063A\u064A\u0631\u060C \u0648\u0646\u0638\u0627\u0645 \u062A\u0631\u0641\u064A\u0647. \u0645\u062B\u0627\u0644\u064A \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0632\u0648\u0631 \u0627\u0644\u0631\u064A\u0627\u0636.",
    price_per_night: 2800,
    max_guests: 6,
    amenities: '["2 Bedrooms","Kids Area","Kitchenette","Smart TV x2","WiFi","Bath Tub","Mini Bar","Safe"]',
    amenities_ar: '["\u063A\u0631\u0641\u062A\u0627\u0646 \u0646\u0648\u0645","\u0645\u0646\u0637\u0642\u0629 \u0623\u0637\u0641\u0627\u0644","\u0645\u0637\u0628\u062E \u0635\u063A\u064A\u0631","\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0630\u0643\u064A \xD72","\u0648\u0627\u064A \u0641\u0627\u064A","\u062D\u0648\u0636 \u0627\u0633\u062A\u062D\u0645\u0627\u0645","\u0645\u064A\u0646\u064A \u0628\u0627\u0631","\u062E\u0632\u0646\u0629"]',
    images: '["family-suite.jpg"]',
    rating: 4.8
  },
  {
    id: "rm-penthouse-005",
    name: "Penthouse Suite",
    name_ar: "\u062C\u0646\u0627\u062D \u0627\u0644\u0628\u0646\u062A\u0647\u0627\u0648\u0633",
    type: "penthouse",
    sqm: 200,
    description: "The crown jewel \u2014 200sqm duplex penthouse with private terrace, jacuzzi, home cinema, dining room, and exclusive rooftop access.",
    description_ar: "\u062C\u0648\u0647\u0631\u0629 \u0627\u0644\u062A\u0627\u062C \u2014 \u0628\u0646\u062A\u0647\u0627\u0648\u0633 \u0628\u0645\u0633\u0627\u062D\u0629 200 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B \u0639\u0644\u0649 \u0637\u0627\u0628\u0642\u064A\u0646 \u0645\u0639 \u062A\u0631\u0627\u0633 \u062E\u0627\u0635\u060C \u0648\u062C\u0627\u0643\u0648\u0632\u064A\u060C \u0648\u0633\u064A\u0646\u0645\u0627 \u0645\u0646\u0632\u0644\u064A\u0629\u060C \u0648\u063A\u0631\u0641\u0629 \u0637\u0639\u0627\u0645\u060C \u0648\u062F\u062E\u0648\u0644 \u062D\u0635\u0631\u064A \u0644\u0644\u0633\u0637\u062D.",
    price_per_night: 8500,
    max_guests: 6,
    amenities: '["King Bed","Private Terrace","Jacuzzi","Home Cinema","Dining Room","Butler","Mini Bar","Smart TV x3","WiFi","Safe","Rooftop"]',
    amenities_ar: '["\u0633\u0631\u064A\u0631 \u0643\u064A\u0646\u063A","\u062A\u0631\u0627\u0633 \u062E\u0627\u0635","\u062C\u0627\u0643\u0648\u0632\u064A","\u0633\u064A\u0646\u0645\u0627 \u0645\u0646\u0632\u0644\u064A\u0629","\u063A\u0631\u0641\u0629 \u0637\u0639\u0627\u0645","\u062E\u062F\u0645\u0629 \u0634\u062E\u0635\u064A\u0629","\u0645\u064A\u0646\u064A \u0628\u0627\u0631","\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0630\u0643\u064A \xD73","\u0648\u0627\u064A \u0641\u0627\u064A","\u062E\u0632\u0646\u0629","\u0633\u0637\u062D"]',
    images: '["penthouse.jpg"]',
    rating: 5
  },
  {
    id: "rm-standard-006",
    name: "Standard Room",
    name_ar: "\u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629",
    type: "standard",
    sqm: 30,
    description: "Comfortable and affordable. 30sqm with all essential amenities for a pleasant stay in Riyadh.",
    description_ar: "\u0645\u0631\u064A\u062D\u0629 \u0648\u0628\u0623\u0633\u0639\u0627\u0631 \u0645\u0639\u0642\u0648\u0644\u0629. 30 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B \u0645\u0639 \u062C\u0645\u064A\u0639 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0631\u0627\u062D\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0625\u0642\u0627\u0645\u0629 \u0645\u0645\u062A\u0639\u0629 \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636.",
    price_per_night: 750,
    max_guests: 2,
    amenities: '["Double Bed","Work Desk","Shower","Smart TV","WiFi","Mini Fridge"]',
    amenities_ar: '["\u0633\u0631\u064A\u0631 \u0645\u0632\u062F\u0648\u062C","\u0645\u0643\u062A\u0628 \u0639\u0645\u0644","\u062F\u0634","\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0630\u0643\u064A","\u0648\u0627\u064A \u0641\u0627\u064A","\u062B\u0644\u0627\u062C\u0629 \u0635\u063A\u064A\u0631\u0629"]',
    images: '["standard-room.jpg"]',
    rating: 4.3
  }
];
var Router = class {
  static {
    __name(this, "Router");
  }
  #routes = [];
  add(method, path, handler) {
    this.#routes.push({ method, re: new RegExp(path), handler });
  }
  get(p, h) {
    this.add("GET", p, h);
  }
  post(p, h) {
    this.add("POST", p, h);
  }
  patch(p, h) {
    this.add("PATCH", p, h);
  }
  async match(req, env2, ctx) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return preflight(req);
    for (const r of this.#routes) {
      if (r.method !== req.method) continue;
      const m = url.pathname.match(r.re);
      if (m) {
        try {
          const res = await r.handler(req, env2, ctx, m.slice(1), url);
          return cors(res, req);
        } catch (e) {
          console.error(`[${req.method} ${url.pathname}]`, e);
          return cors(err(e.message || "Internal Error", 500), req);
        }
      }
    }
    return cors(err("Not Found", 404), req);
  }
};
async function initDB(db) {
  try {
    await db.batch(SCHEMA.map((s) => db.prepare(s)));
    const { c } = await db.prepare("SELECT COUNT(*) as c FROM rooms").first() || {};
    if (c === 0) {
      await db.batch(ROOMS.map(
        (r) => db.prepare("INSERT OR IGNORE INTO rooms (id,name,name_ar,type,description,description_ar,price_per_night,max_guests,sqm,amenities,amenities_ar,images,rating) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(r.id, r.name, r.name_ar, r.type, r.description, r.description_ar, r.price_per_night, r.max_guests, r.sqm, r.amenities, r.amenities_ar, r.images, r.rating)
      ));
    }
  } catch (e) {
    console.error("DB init:", e);
  }
}
__name(initDB, "initDB");
function buildSystemPrompt(lang) {
  const isAr = lang === "ar";
  return `You are Mellissa (\u0645\u0644\u064A\u0633\u0627), the AI concierge of Melissa Hotel (\u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627) in Riyadh, Saudi Arabia. You are warm, knowledgeable, professional, and culturally aware.

${isAr ? "RESPOND IN ARABIC. Use a warm, professional tone matching the hotel brand." : "Respond in English with a warm, professional tone."}

Hotel Description / \u0648\u0635\u0641 \u0627\u0644\u0641\u0646\u062F\u0642:
\u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627 \u0647\u0648 \u0648\u062C\u0647\u062A\u0643 \u0627\u0644\u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0631\u0641\u0627\u0647\u064A\u0629 \u0648\u0627\u0644\u0631\u0627\u062D\u0629 \u0641\u064A \u0642\u0644\u0628 \u0627\u0644\u0645\u062F\u064A\u0646\u0629. \u064A\u0642\u062F\u0645 \u0627\u0644\u0641\u0646\u062F\u0642 \u062A\u062C\u0631\u0628\u0629 \u0625\u0642\u0627\u0645\u0629 \u0627\u0633\u062A\u062B\u0646\u0627\u0626\u064A\u0629 \u062A\u062C\u0645\u0639 \u0628\u064A\u0646 \u0627\u0644\u0623\u0646\u0627\u0642\u0629 \u0627\u0644\u062D\u062F\u064A\u062B\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0641\u0648\u0642\u0629. \u064A\u062A\u0645\u064A\u0632 \u0628\u063A\u0631\u0641\u0647 \u0627\u0644\u0641\u0633\u064A\u062D\u0629 \u0648\u0627\u0644\u0645\u062C\u0647\u0632\u0629 \u0628\u0623\u062D\u062F\u062B \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0631\u0627\u062D\u0629\u060C \u0628\u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0645\u0631\u0627\u0641\u0642 \u062A\u0631\u0641\u064A\u0647\u064A\u0629 \u062A\u0634\u0645\u0644 \u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629 \u0648\u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A \u0648\u0645\u0637\u0627\u0639\u0645 \u0639\u0627\u0644\u0645\u064A\u0629 \u0648\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0631\u062C\u064A \u0648\u0645\u0631\u0627\u0641\u0642 \u0623\u0639\u0645\u0627\u0644 \u0645\u062A\u0643\u0627\u0645\u0644\u0629.

Hotel Details / \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0646\u062F\u0642:
- Name: Melissa Hotel / \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627
- Website: melissahotels.com
- Location: Abi Jafar Al Mansour Street, Ash Shuhada, Ghirnatah, Riyadh 13241, Saudi Arabia
- \u0645\u0648\u0642\u0639: \u0634\u0627\u0631\u0639 \u0623\u0628\u064A \u062C\u0639\u0641\u0631 \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u060C \u0627\u0644\u0634\u0647\u062F\u0627\u0621\u060C \u063A\u0631\u0646\u0627\u0637\u0629\u060C \u0627\u0644\u0631\u064A\u0627\u0636 13241\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629
- 6 room types / \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u063A\u0631\u0641:
  \u2022 Standard (\u063A\u0631\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629) \u2014 750 SAR/night \xB7 30sqm
  \u2022 Deluxe (\u063A\u0631\u0641\u0629 \u0641\u0627\u062E\u0631\u0629) \u2014 1,200 SAR/night \xB7 40sqm
  \u2022 Executive (\u063A\u0631\u0641\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629) \u2014 1,800 SAR/night \xB7 55sqm
  \u2022 Family Suite (\u062C\u0646\u0627\u062D \u0639\u0627\u0626\u0644\u064A) \u2014 2,800 SAR/night \xB7 85sqm
  \u2022 Royal Suite (\u062C\u0646\u0627\u062D \u0645\u0644\u0643\u064A) \u2014 3,500 SAR/night \xB7 120sqm
  \u2022 Penthouse (\u0628\u0646\u062A\u0647\u0627\u0648\u0633) \u2014 8,500 SAR/night \xB7 200sqm

- Amenities / \u0627\u0644\u0645\u0631\u0627\u0641\u0642:
- Outdoor Pool (\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0631\u062C\u064A) \u2014 open daily
- Spa & Wellness Center (\u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A) \u2014 massage, hammam, treatments
- Fitness Center (\u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629) \u2014 modern equipment
- Restaurants (\u0645\u0637\u0627\u0639\u0645 \u0639\u0627\u0644\u0645\u064A\u0629) \u2014 international cuisine
- Business Center (\u0645\u0631\u0627\u0641\u0642 \u0623\u0639\u0645\u0627\u0644 \u0645\u062A\u0643\u0627\u0645\u0644\u0629)
- Accessible Rooms (\u063A\u0631\u0641 \u0630\u0648\u064A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629)
- Kids Club (\u0646\u0627\u062F\u064A \u0623\u0637\u0641\u0627\u0644) \u2014 ages 3-12
- Valet Parking (\u062E\u062F\u0645\u0629 \u0631\u0643\u0646)
- 24/7 Room Service (\u062E\u062F\u0645\u0629 \u063A\u0631\u0641)

Check-in: 3:00 PM / \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644: \u0663:\u0660\u0660 \u0645\u0633\u0627\u0621\u064B
Check-out: 12:00 PM / \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u063A\u0627\u062F\u0631\u0629: \u0661\u0662:\u0660\u0660 \u0638\u0647\u0631\u0627\u064B
Currency: SAR (Saudi Riyal) / \u0627\u0644\u0639\u0645\u0644\u0629: \u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A
Languages: Arabic, English, French / \u0627\u0644\u0644\u063A\u0627\u062A: \u0627\u0644\u0639\u0631\u0628\u064A\u0629\u060C \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629\u060C \u0627\u0644\u0641\u0631\u0646\u0633\u064A\u0629

Riyadh Attractions / \u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u0631\u064A\u0627\u0636:
- Diriyah (\u0627\u0644\u062F\u0631\u0639\u064A\u0629) \u2014 UNESCO site, 20 min
- Kingdom Centre (\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0645\u0644\u0643\u0629) \u2014 sky bridge views
- Edge of the World (\u062D\u0627\u0641\u0629 \u0627\u0644\u0639\u0627\u0644\u0645) \u2014 desert cliffs, 90 min
- Boulevard Riyadh City (\u0628\u0648\u0644\u064A\u0641\u0627\u0631\u062F \u0627\u0644\u0631\u064A\u0627\u0636) \u2014 walking distance
- Al Masmak Fortress (\u0642\u0635\u0631 \u0627\u0644\u0645\u0635\u0645\u0643) \u2014 historical
- National Museum (\u0627\u0644\u0645\u062A\u062D\u0641 \u0627\u0644\u0648\u0637\u0646\u064A)

Always be helpful, culturally sensitive, and suggest booking when appropriate.
${isAr ? "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0641\u0635\u062D\u0649 \u0645\u0639 \u0644\u0645\u0633\u0629 \u0648\u062F\u064A\u0629. \u0623\u0634\u0631 \u062F\u0627\u0626\u0645\u064B\u0627 \u0625\u0644\u0649 \u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u062D\u062C\u0632." : ""}`;
}
__name(buildSystemPrompt, "buildSystemPrompt");
async function handleChat(request, env2) {
  try {
    const { message, sessionId, lang = "en" } = await request.json();
    if (!message?.trim()) return err("Message is required", 400);
    const sid = sessionId || uuid();
    const detectedLang = /[\u0600-\u06FF]/.test(message) ? "ar" : lang;
    const systemPrompt = buildSystemPrompt(detectedLang);
    if (env2.AI) {
      try {
        let history = [];
        if (env2.DB) {
          try {
            const rows = await env2.DB.prepare(
              "SELECT role, content FROM chat_history WHERE session_id = ? ORDER BY created_at DESC LIMIT 6"
            ).bind(sid).all();
            history = (rows.results || []).reverse();
          } catch {
          }
        }
        const messages = [
          { role: "system", content: systemPrompt },
          ...history.map((h) => ({ role: h.role === "assistant" ? "assistant" : "user", content: h.content })),
          { role: "user", content: message }
        ];
        const ai = await env2.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8", {
          messages,
          max_tokens: 1024,
          temperature: 0.7
        });
        const reply2 = ai.response || ai.result?.response || (detectedLang === "ar" ? "\u0623\u0639\u062A\u0630\u0631\u060C \u0644\u0645 \u0623\u062A\u0645\u0643\u0646 \u0645\u0646 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649." : "I apologize, I could not process that request. Please try again.");
        if (env2.DB) {
          try {
            await env2.DB.batch([
              env2.DB.prepare("INSERT INTO chat_history (id,session_id,role,content,lang) VALUES (?,?,?,?,?)").bind(uuid(), sid, "user", message, detectedLang),
              env2.DB.prepare("INSERT INTO chat_history (id,session_id,role,content,lang) VALUES (?,?,?,?,?)").bind(uuid(), sid, "assistant", reply2, detectedLang)
            ]);
          } catch {
          }
        }
        return json({ reply: reply2, sessionId: sid, lang: detectedLang, model: "llama-3.3-70b", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
      } catch (e) {
        console.error("AI:", e);
      }
    }
    const reply = fallback(message, detectedLang);
    return json({ reply, sessionId: sid, lang: detectedLang, model: "fallback", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  } catch (e) {
    return err("Chat: " + e.message, 500);
  }
}
__name(handleChat, "handleChat");
function fallback(msg, lang) {
  const m = msg.toLowerCase();
  const ar = lang === "ar";
  const isArRoom = /غرف|جناح|حجز|_ROOM|rooms/i.test(msg);
  const isArBook = /حجز|احجز|reserv/i.test(msg);
  const isArPrice = /سعر|تكلفة|كم|iثrice|price|cost/i.test(msg);
  const isArPool = /سباحة|مسبح|سبا|حمّام|pool|spa/i.test(msg);
  const isArFood = /مطعم|طعام|أكل|restaurant|food|dining/i.test(msg);
  const isArRiyadh = /رياض|attraction|visit|سياح|مناطق/i.test(msg);
  const isArCheck = /دخول|خروج|check/i.test(msg);
  const isArHello = /مرحبا|سلام|أهلا|hello|hi|marhaba/i.test(msg);
  const isArAbout = /about|عن.*فندق|tell.*hotel|نبذة|معلومات|فندق مليسا|melissa hotel/i.test(msg);
  const isArLocation = /location|address|where|وين|أين|موقع|عنوان|map|خريطة/i.test(msg);
  const isArThanks = /شكر|ممنون|thank/i.test(msg);
  if (m.includes("book") || isArBook)
    return ar ? "\u064A\u0633\u0639\u062F\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u0627\u0644\u062D\u062C\u0632! \u{1F4CB} \u0623\u062E\u0628\u0631\u0646\u064A:\n\n\u0661. \u0623\u064A \u0646\u0648\u0639 \u063A\u0631\u0641\u0629 \u062A\u0641\u0636\u0644\u061F\n\u0662. \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C\n\u0663. \u0639\u062F\u062F \u0627\u0644\u0636\u064A\u0648\u0641\n\n\u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u062C\u0632 \u0645\u0628\u0627\u0634\u0631\u0629." : "I'd love to help you book! \u{1F4CB} Please tell me:\n1. Which room type?\n2. Check-in and check-out dates\n3. Number of guests\n\nOr use our booking form directly.";
  if (m.includes("room") || isArRoom && (m.includes("available") || m.includes("recommend") || /أنواع|انواع/.test(msg)))
    return ar ? "\u0644\u062F\u064A\u0646\u0627 6 \u0623\u0646\u0648\u0627\u0639 \u063A\u0631\u0641 \u0631\u0627\u0626\u0639\u0629! \u{1F3E8}\n\n\u2022 \u063A\u0631\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629 \u2014 \u0667\u0665\u0660 \u0631\u064A\u0627\u0644/\u0644\u064A\u0644\u0629\n\u2022 \u063A\u0631\u0641\u0629 \u0641\u0627\u062E\u0631\u0629 \u2014 \u0661\u066C\u0662\u0660\u0660 \u0631\u064A\u0627\u0644/\u0644\u064A\u0644\u0629\n\u2022 \u063A\u0631\u0641\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u2014 \u0661\u066C\u0668\u0660\u0660 \u0631\u064A\u0627\u0644/\u0644\u064A\u0644\u0629\n\u2022 \u062C\u0646\u0627\u062D \u0639\u0627\u0626\u0644\u064A \u2014 \u0662\u066C\u0668\u0660\u0660 \u0631\u064A\u0627\u0644/\u0644\u064A\u0644\u0629\n\u2022 \u062C\u0646\u0627\u062D \u0645\u0644\u0643\u064A \u2014 \u0663\u066C\u0665\u0660\u0660 \u0631\u064A\u0627\u0644/\u0644\u064A\u0644\u0629\n\u2022 \u0628\u0646\u062A\u0647\u0627\u0648\u0633 \u2014 \u0668\u066C\u0665\u0660\u0660 \u0631\u064A\u0627\u0644/\u0644\u064A\u0644\u0629\n\n\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u062C\u0632 \u063A\u0631\u0641\u0629 \u0645\u0639\u064A\u0646\u0629\u061F" : "We have 6 wonderful room types! \u{1F3E8}\n\n\u2022 Standard \u2014 750 SAR/night\n\u2022 Deluxe \u2014 1,200 SAR/night\n\u2022 Executive \u2014 1,800 SAR/night\n\u2022 Family Suite \u2014 2,800 SAR/night\n\u2022 Royal Suite \u2014 3,500 SAR/night\n\u2022 Penthouse \u2014 8,500 SAR/night\n\nWould you like to book a specific room?";
  if (m.includes("spa") || m.includes("hammam") || m.includes("massage") || /سبا|حمام|مساج|عافية/.test(msg))
    return ar ? "\u{1F486} \u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A \u0633\u064A\u0631\u064A\u0646\u062A\u064A \u0641\u064A \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627:\n\n\u{1F9D6} \u0647\u0627\u0645\u0627\u0645 \u062A\u0642\u0644\u064A\u062F\u064A \u2014 \u062A\u062C\u0631\u0628\u0629 \u062D\u0645\u0627\u0645 \u0634\u0631\u0642 \u0623\u0648\u0633\u0637\u064A\u0629 \u0623\u0635\u064A\u0644\u0629\n\u{1F486} \u0645\u0633\u0627\u062C \u0639\u0644\u0627\u062C\u064A \u2014 \u062A\u0642\u0646\u064A\u0627\u062A \u0645\u062A\u0646\u0648\u0639\u0629 (\u0633\u0648\u064A\u062F\u064A\u060C \u0639\u0645\u064A\u0642\u060C \u062D\u062C\u0631)\n\u2728 \u0639\u0644\u0627\u062C\u0627\u062A \u0627\u0644\u0648\u062C\u0647 \u0648\u0627\u0644\u0628\u0634\u0631\u0629\n\u{1F3CA} \u062C\u0627\u0643\u0648\u0632\u064A \u0648\u0633\u0627\u0648\u0646\u0627\n\n\u23F0 \u0627\u0644\u0645\u0641\u062A\u0648\u062D \u064A\u0648\u0645\u064A\u0627\u064B \u0645\u0646 \u0669 \u0635\u0628\u0627\u062D\u0627\u064B \u0625\u0644\u0649 \u0669 \u0645\u0633\u0627\u0621\u064B\n\u{1F4DE} \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0639\u0628\u0631 \u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644 \u0623\u0648 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A\n\n\u0639\u0644\u0627\u062C\u0627\u062A\u0646\u0627 \u0645\u0635\u0645\u0645\u0629 \u0644\u0644\u0627\u0633\u062A\u0631\u062E\u0627\u0621 \u0627\u0644\u062A\u0627\u0645 \u0648\u062Ajuvenation." : "\u{1F486} Serenity Spa at Melissa Hotel:\n\n\u{1F9D6} Traditional Hammam \u2014 authentic Middle Eastern steam ritual\n\u{1F486} Therapeutic Massage \u2014 Swedish, deep tissue, hot stone\n\u2728 Facial & skincare treatments\n\u{1F3CA} Jacuzzi & sauna\n\n\u23F0 Open daily 9AM\u20139PM\n\u{1F4DE} Book via reception or AI concierge\n\nOur treatments are designed for total relaxation and rejuvenation.";
  if (m.includes("pool") || m.includes("gym") || m.includes("fitness") || /مسبح|سباحة|رياضة|نادي/.test(msg))
    return ar ? "\u{1F3CA} \u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0631\u064A\u0627\u0636\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0645\u0627\u0645:\n\n\u{1F3CA} \u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0631\u062C\u064A \u2014 \u0645\u0641\u062A\u0648\u062D \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0636\u064A\u0648\u0641\n\u{1F4AA} \u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629 \u2014 \u0645\u0639\u062F\u0646 \u062D\u062F\u064A\u062B\u0629 \u0648\u0645\u062A\u0637\u0648\u0631\u0629\n\u{1F9F8} \u0646\u0627\u062F\u064A \u0623\u0637\u0641\u0627\u0644 \u2014 \u0623\u0639\u0645\u0627\u0631 \u0663-\u0661\u0662 \u0633\u0646\u0629\n\n\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0645\u0634\u0645\u0648\u0644\u0629 \u0641\u064A \u0627\u0644\u0625\u0642\u0627\u0645\u0629." : "\u{1F3CA} Recreation & Fitness:\n\n\u{1F3CA} Outdoor pool \u2014 open to all guests\n\u{1F4AA} Fitness center \u2014 modern equipment\n\u{1F9F8} Kids Club \u2014 ages 3-12\n\nAll facilities included with your stay.";
  if (m.includes("pool") || m.includes("spa") || m.includes("gym") || isArPool)
    return ar ? "\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0641\u0646\u062F\u0642 \u{1F31F}\n\n\u{1F3CA} \u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u0644\u0627 \u0645\u062A\u0646\u0627\u0647\u064A \u0639\u0644\u0649 \u0627\u0644\u0633\u0637\u062D (\u0666\u0635-\u0661\u0660\u0645)\n\u{1F486} \u0633\u0628\u0627 \u0633\u064A\u0631\u064A\u0646\u062A\u064A \u0648\u0647\u0627\u0645\u0627\u0645 (\u0669\u0635-\u0669\u0645)\n\u{1F4AA} \u0635\u0627\u0644\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629\n\u{1F37D}\uFE0F \u0663 \u0645\u0637\u0627\u0639\u0645 (\u0639\u0631\u0628\u064A\u060C \u064A\u0627\u0628\u0627\u0646\u064A\u060C \u0639\u0627\u0644\u0645\u064A)\n\u{1F468}\u200D\u{1F4BB} \u0645\u0631\u0643\u0632 \u0623\u0639\u0645\u0627\u0644\n\u{1F9F8} \u0646\u0627\u062F\u064A \u0623\u0637\u0641\u0627\u0644 (\u0663-\u0661\u0662 \u0633\u0646\u0629)\n\u{1F697} \u062E\u062F\u0645\u0629 \u0631\u0643\u0646 \u0645\u062C\u0627\u0646\u064A\u0629\n\n\u0645\u0627 \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0645\u0639\u0631\u0641\u062A\u0647 \u0623\u0643\u062B\u0631\u061F" : "Our amenities \u{1F31F}\n\n\u{1F3CA} Rooftop Infinity Pool (6AM-10PM)\n\u{1F486} Serenity Spa & Hammam (9AM-9PM)\n\u{1F4AA} 24/7 Fitness Center\n\u{1F37D}\uFE0F 3 Restaurants\n\u{1F468}\u200D\u{1F4BB} Business Center\n\u{1F9F8} Kids Club (3-12)\n\u{1F697} Complimentary Valet\n\nWhat interests you?";
  if (m.includes("riyadh") || m.includes("attraction") || isArRiyadh)
    return ar ? "\u0627\u0644\u0631\u064A\u0627\u0636 \u0645\u062F\u064A\u0646\u0629 \u0631\u0627\u0626\u0639\u0629! \u{1F1F8}\u{1F1E6} \u0623\u0628\u0631\u0632 \u0627\u0644\u0645\u0639\u0627\u0644\u0645:\n\n\u{1F3DB}\uFE0F \u0627\u0644\u062F\u0631\u0639\u064A\u0629 \u2014 \u0645\u0648\u0642\u0639 \u062A\u0631\u0627\u062B \u0639\u0627\u0644\u0645\u064A (\u0662\u0660 \u062F\u0642\u064A\u0642\u0629)\n\u{1F3D9}\uFE0F \u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u2014 \u062C\u0633\u0631 \u0627\u0644\u0633\u0645\u0627\u0621\n\u{1F3DC}\uFE0F \u062D\u0627\u0641\u0629 \u0627\u0644\u0639\u0627\u0644\u0645 \u2014 \u0635\u062E\u0648\u0631 \u0635\u062D\u0631\u0627\u0648\u064A\u0629 (\u0669\u0660 \u062F\u0642\u064A\u0642\u0629)\n\u{1F3AD} \u0628\u0648\u0644\u064A\u0641\u0627\u0631\u062F \u0627\u0644\u0631\u064A\u0627\u0636 \u2014 \u0639\u0644\u0649 \u0645\u0633\u0627\u0641\u0629 \u0645\u0634\u064A!\n\u{1F54C} \u0642\u0635\u0631 \u0627\u0644\u0645\u0635\u0645\u0643 \u2014 \u062A\u0627\u0631\u064A\u062E\u064A\n\u{1F3DB}\uFE0F \u0627\u0644\u0645\u062A\u062D\u0641 \u0627\u0644\u0648\u0637\u0646\u064A\n\n\u064A\u0645\u0643\u0646\u0646\u064A \u062A\u0631\u062A\u064A\u0628 \u062C\u0648\u0644\u0627\u062A \u0648\u0646\u0642\u0644!" : "Riyadh is amazing! \u{1F1F8}\u{1F1E6} Top attractions:\n\n\u{1F3DB}\uFE0F Diriyah \u2014 UNESCO site (20 min)\n\u{1F3D9}\uFE0F Kingdom Centre \u2014 sky bridge\n\u{1F3DC}\uFE0F Edge of the World (90 min)\n\u{1F3AD} Boulevard Riyadh City \u2014 walking distance!\n\u{1F54C} Al Masmak Fortress\n\u{1F3DB}\uFE0F National Museum\n\nI can arrange tours!";
  if (m.includes("price") || m.includes("cost") || isArPrice)
    return ar ? "\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u0631\u064A\u0627\u0644 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u{1F4B0}\n\n\u063A\u0631\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629: \u0667\u0665\u0660\n\u063A\u0631\u0641\u0629 \u0641\u0627\u062E\u0631\u0629: \u0661\u066C\u0662\u0660\u0660\n\u063A\u0631\u0641\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629: \u0661\u066C\u0668\u0660\u0660\n\u062C\u0646\u0627\u062D \u0639\u0627\u0626\u0644\u064A: \u0662\u066C\u0668\u0660\u0660\n\u062C\u0646\u0627\u062D \u0645\u0644\u0643\u064A: \u0663\u066C\u0665\u0660\u0660\n\u0628\u0646\u062A\u0647\u0627\u0648\u0633: \u0668\u066C\u0665\u0660\u0660\n\n\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u062A\u0634\u0645\u0644 \u0625\u0641\u0637\u0627\u0631 \u0648\u0627\u064A \u0641\u0627\u064A \u0648\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629." : "Nightly rates (SAR) \u{1F4B0}\n\nStandard: 750 \xB7 Deluxe: 1,200 \xB7 Executive: 1,800\nFamily Suite: 2,800 \xB7 Royal Suite: 3,500 \xB7 Penthouse: 8,500\n\nAll rates include breakfast, WiFi & pool access.";
  if (m.includes("check") || isArCheck)
    return ar ? "\u23F0 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C:\n\n\u2022 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644: \u0663:\u0660\u0660 \u0645\u0633\u0627\u0621\u064B\n\u2022 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u063A\u0627\u062F\u0631\u0629: \u0661\u0662:\u0660\u0660 \u0638\u0647\u0631\u0627\u064B\n\n\u064A\u0645\u0643\u0646 \u0637\u0644\u0628 \u062F\u062E\u0648\u0644 \u0645\u0628\u0643\u0631 \u0623\u0648 \u062E\u0631\u0648\u062C \u0645\u062A\u0623\u062E\u0631 (\u062D\u0633\u0628 \u0627\u0644\u062A\u0648\u0641\u0631). \u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0623\u0645\u062A\u0639\u0629 \u0645\u062A\u0627\u062D \u0645\u062C\u0627\u0646\u0627\u064B." : "\u23F0 Check-in & Check-out:\n\u2022 Check-in: 3:00 PM\n\u2022 Check-out: 12:00 PM (noon)\n\nEarly/late available on request. Free luggage storage.";
  if (m.includes("restaurant") || m.includes("food") || isArFood)
    return ar ? "\u0627\u0644\u0645\u0637\u0627\u0639\u0645 \u0641\u064A \u0645\u0644\u064A\u0633\u0627 \u{1F37D}\uFE0F\n\n\u{1FAD6} \u0627\u0644\u0646\u062E\u064A \u2014 \u0645\u0637\u0628\u062E \u0639\u0631\u0628\u064A \u062A\u0642\u0644\u064A\u062F\u064A\n\u{1F363} \u0633\u0627\u0643\u0648\u0631\u0627 \u2014 \u0645\u0637\u0628\u062E \u064A\u0627\u0628\u0627\u0646\u064A \u0631\u0627\u0642\u064A (\u0666\u0645-\u0661\u0661\u0645)\n\u{1F30D} \u0627\u0644\u062A\u064A\u0631\u0627\u0633 \u2014 \u0628\u0648\u0641\u064A\u0647 \u0639\u0627\u0644\u0645\u064A (\u0666\u0635-\u0661\u0661\u0645)\n\u2615 \u0644\u0648\u0628\u064A \u0644\u0627\u0648\u0646\u062C \u2014 \u0642\u0647\u0648\u0629 \u0648\u0634\u0627\u064A \u0628\u0639\u062F \u0627\u0644\u0638\u0647\u0631\n\n\u062E\u062F\u0645\u0629 \u063A\u0631\u0641 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629." : "Dining at Mellissa \u{1F37D}\uFE0F\n\n\u{1FAD6} Al Nakheel \u2014 Arabic cuisine\n\u{1F363} Sakura \u2014 Japanese fine dining (6PM-11PM)\n\u{1F30D} The Terrace \u2014 International buffet (6AM-11PM)\n\u2615 Lobby Lounge \u2014 Coffee & afternoon tea\n\n24/7 room service available.";
  if (m.includes("about") || isArAbout)
    return ar ? "\u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627 \u0647\u0648 \u0648\u062C\u0647\u062A\u0643 \u0627\u0644\u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0631\u0641\u0627\u0647\u064A\u0629 \u0648\u0627\u0644\u0631\u0627\u062D\u0629 \u0641\u064A \u0642\u0644\u0628 \u0627\u0644\u0631\u064A\u0627\u0636. \u{1F3E8}\n\n\u064A\u0642\u062F\u0645 \u062A\u062C\u0631\u0628\u0629 \u0625\u0642\u0627\u0645\u0629 \u0627\u0633\u062A\u062B\u0646\u0627\u0626\u064A\u0629 \u062A\u062C\u0645\u0639 \u0628\u064A\u0646 \u0627\u0644\u0623\u0646\u0627\u0642\u0629 \u0627\u0644\u062D\u062F\u064A\u062B\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0641\u0648\u0642\u0629. \u064A\u062A\u0645\u064A\u0632 \u0628\u063A\u0631\u0641 \u0641\u0633\u064A\u062D\u0629 \u0645\u062C\u0647\u0632\u0629 \u0628\u0623\u062D\u062F\u062B \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0631\u0627\u062D\u0629\u060C \u0648\u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629\u060C \u0648\u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A\u060C \u0648\u0645\u0637\u0627\u0639\u0645 \u0639\u0627\u0644\u0645\u064A\u0629\u060C \u0648\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0631\u062C\u064A.\n\n\u{1F4CD} \u0634\u0627\u0631\u0639 \u0623\u0628\u064A \u062C\u0639\u0641\u0631 \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u060C \u063A\u0631\u0646\u0627\u0637\u0629\u060C \u0627\u0644\u0631\u064A\u0627\u0636\n\u{1F310} melissahotels.com\n\n\u0641\u0631\u064A\u0642\u0646\u0627 \u0627\u0644\u0645\u062A\u0641\u0627\u0646\u064A \u062F\u0627\u0626\u0645\u0627\u064B \u0641\u064A \u062E\u062F\u0645\u062A\u0643!" : "Melissa Hotel (\u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627) is your ideal destination for luxury and comfort in the heart of Riyadh. \u{1F3E8}\n\nWe offer an exceptional experience combining modern elegance with superior service. Features include spacious rooms with modern amenities, fitness center, spa, international restaurants, and outdoor pool.\n\n\u{1F4CD} Abi Jafar Al Mansour St, Ghirnatah, Riyadh\n\u{1F310} melissahotels.com\n\nOur dedicated team is always at your service!";
  if (m.includes("where") || m.includes("location") || m.includes("address") || m.includes("map") || isArLocation)
    return ar ? '\u{1F4CD} \u0645\u0648\u0642\u0639 \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627:\n\n\u0634\u0627\u0631\u0639 \u0623\u0628\u064A \u062C\u0639\u0641\u0631 \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u060C \u062D\u064A \u0627\u0644\u0634\u0647\u062F\u0627\u0621\u060C \u063A\u0631\u0646\u0627\u0637\u0629\u060C \u0627\u0644\u0631\u064A\u0627\u0636 \u0661\u0663\u0662\u0664\u0661\n\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629\n\n\u{1F5FA}\uFE0F \u0628\u0627\u0644\u0642\u0631\u0628 \u0645\u0646 \u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062F\n\u2708\uFE0F \u0663\u0660 \u062F\u0642\u064A\u0642\u0629 \u0645\u0646 \u0645\u0637\u0627\u0631 \u0627\u0644\u0645\u0644\u0643 \u062E\u0627\u0644\u062F \u0627\u0644\u062F\u0648\u0644\u064A\n\u{1F697} \u0645\u0648\u0642\u0639 \u0645\u0645\u064A\u0632 \u0641\u064A \u0642\u0644\u0628 \u0627\u0644\u0631\u064A\u0627\u0636\n\n\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0628\u062D\u062B \u0639\u0646 "Melissa Hotel Riyadh" \u0641\u064A \u062E\u0631\u0627\u0626\u0637 \u062C\u0648\u062C\u0644.' : '\u{1F4CD} Mellissa Hotel Location:\n\nAbi Jafar Al Mansour Street, Ash Shuhada, Ghirnatah, Riyadh 13241\nKingdom of Saudi Arabia\n\n\u{1F5FA}\uFE0F Near King Fahd Road\n\u2708\uFE0F 30 min from King Khalid International Airport\n\u{1F697} Prime central Riyadh location\n\nSearch "Melissa Hotel Riyadh" on Google Maps.';
  if (isArHello || m.includes("hello") || m.includes("hi"))
    return ar ? "\u0645\u0631\u062D\u0628\u0627\u064B! \u0623\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627! \u{1F31F} \u0623\u0646\u0627 \u0645\u0644\u064A\u0633\u0627\u060C \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A. \u0643\u064A\u0641 \u0623\u062C\u0639\u0644 \u0625\u0642\u0627\u0645\u062A\u0643 \u0627\u0633\u062A\u062B\u0646\u0627\u0626\u064A\u0629\u061F" : "Marhaba! Welcome to Mellissa Hotel! \u{1F31F} I'm your AI concierge. How can I make your stay extraordinary?";
  if (isArThanks || m.includes("thank"))
    return ar ? "\u0627\u0644\u0639\u0641\u0648! \u064A\u0633\u0639\u062F\u0646\u064A \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629. \u{1F339} \u0647\u0644 \u062A\u062D\u062A\u0627\u062C \u0623\u064A \u0634\u064A\u0621 \u0622\u062E\u0631\u061F" : "You're welcome! \u{1F339} Is there anything else you need?";
  return ar ? "\u0634\u0643\u0631\u0627\u064B \u0644\u062A\u0648\u0627\u0635\u0644\u0643! \u0623\u0646\u0627 \u0647\u0646\u0627 \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u0623\u064A \u0634\u064A\u0621 \u2014 \u0627\u0644\u063A\u0631\u0641\u060C \u0627\u0644\u062D\u062C\u0632\u060C \u0627\u0644\u0645\u0637\u0627\u0639\u0645\u060C \u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0623\u0648 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0641\u0646\u062F\u0642. \u0645\u0627\u0630\u0627 \u062A\u0631\u064A\u062F \u0623\u0646 \u062A\u0639\u0631\u0641\u061F \u{1F3E8}\u2728" : "Thank you for reaching out! I can help with rooms, bookings, dining, Riyadh attractions, or hotel services. What would you like to know? \u{1F3E8}\u2728";
}
__name(fallback, "fallback");
var health = /* @__PURE__ */ __name(async (env2) => {
  let db = false;
  try {
    await env2.DB.prepare("SELECT 1").first();
    db = true;
  } catch {
  }
  return json({ status: "healthy", version: CONFIG.VERSION, service: CONFIG.NAME, components: { database: db ? "connected" : "unavailable", ai: env2.AI ? "available" : "unavailable", cache: env2.CACHE ? "available" : "unavailable" }, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
}, "health");
var getRooms = /* @__PURE__ */ __name(async (req, env2, _ctx, _p, url) => {
  const { type, min_price, max_price, guests } = Object.fromEntries(url.searchParams);
  const ck = `rooms:${type || ""}:${min_price || ""}:${max_price || ""}:${guests || ""}`;
  if (env2.CACHE) {
    const c = await env2.CACHE.get(ck, "json");
    if (c) return json(c);
  }
  let q = "SELECT * FROM rooms WHERE available = 1", b = [];
  if (type) {
    q += " AND type = ?";
    b.push(type);
  }
  if (min_price) {
    q += " AND price_per_night >= ?";
    b.push(+min_price);
  }
  if (max_price) {
    q += " AND price_per_night <= ?";
    b.push(+max_price);
  }
  if (guests) {
    q += " AND max_guests >= ?";
    b.push(+guests);
  }
  q += " ORDER BY price_per_night ASC";
  const r = await (b.length ? env2.DB.prepare(q).bind(...b) : env2.DB.prepare(q)).all();
  const rooms = (r.results || []).map((x) => ({ ...x, amenities: JSON.parse(x.amenities || "[]"), amenities_ar: JSON.parse(x.amenities_ar || "[]"), images: JSON.parse(x.images || "[]") }));
  if (env2.CACHE) await env2.CACHE.put(ck, JSON.stringify(rooms), { expirationTtl: CONFIG.CACHE_TTL });
  return json(rooms);
}, "getRooms");
var getRoom = /* @__PURE__ */ __name(async (req, env2, _ctx, p) => {
  const r = await env2.DB.prepare("SELECT * FROM rooms WHERE id = ?").bind(p[0]).first();
  if (!r) return err("Room not found", 404);
  r.amenities = JSON.parse(r.amenities || "[]");
  r.amenities_ar = JSON.parse(r.amenities_ar || "[]");
  r.images = JSON.parse(r.images || "[]");
  return json(r);
}, "getRoom");
var createBooking = /* @__PURE__ */ __name(async (req, env2) => {
  const b = await req.json();
  const { room_id, guest_name, guest_email, guest_phone, check_in, check_out, guests: ng, special_requests, lang } = b;
  if (!room_id || !guest_name || !guest_email || !check_in || !check_out) return err("Missing required fields", 400);
  const room = await env2.DB.prepare("SELECT * FROM rooms WHERE id = ?").bind(room_id).first();
  if (!room) return err("Room not found", 404);
  if (!room.available) return err("Room not available", 409);
  const nights = Math.ceil((new Date(check_out) - new Date(check_in)) / 864e5);
  if (nights < 1) return err("Check-out must be after check-in", 400);
  const total = room.price_per_night * nights;
  const id = "bk-" + uuid();
  await env2.DB.prepare("INSERT INTO bookings (id,room_id,guest_name,guest_email,guest_phone,check_in,check_out,guests,total_price,currency,special_requests,lang) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)").bind(id, room_id, guest_name, guest_email, guest_phone || null, check_in, check_out, ng || 1, total, "SAR", special_requests || null, lang || "en").run();
  if (env2.CACHE) await env2.CACHE.delete("rooms:::::");
  const msg = lang === "ar" ? "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u062C\u0632 \u0628\u0646\u062C\u0627\u062D! \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0623\u0643\u064A\u062F \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A." : "Booking created successfully! We will confirm via email.";
  return json({ booking: { id, room_id, room_name: room.name, room_name_ar: room.name_ar, guest_name, check_in, check_out, nights, total_price: total, currency: "SAR", status: "pending" }, message: msg }, 201);
}, "createBooking");
var getBookings = /* @__PURE__ */ __name(async (req, env2, _ctx, _p, url) => {
  const { email, status } = Object.fromEntries(url.searchParams);
  let q = "SELECT b.*, r.name as room_name, r.name_ar as room_name_ar FROM bookings b LEFT JOIN rooms r ON b.room_id = r.id WHERE 1=1", b = [];
  if (email) {
    q += " AND b.guest_email = ?";
    b.push(email);
  }
  if (status) {
    q += " AND b.status = ?";
    b.push(status);
  }
  q += " ORDER BY b.created_at DESC LIMIT 50";
  const r = await (b.length ? env2.DB.prepare(q).bind(...b) : env2.DB.prepare(q)).all();
  return json(r.results || []);
}, "getBookings");
var updateBooking = /* @__PURE__ */ __name(async (req, env2, _ctx, p) => {
  const { status, payment_status } = await req.json();
  const bk = await env2.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(p[0]).first();
  if (!bk) return err("Booking not found", 404);
  if (status) await env2.DB.prepare("UPDATE bookings SET status = ? WHERE id = ?").bind(status, p[0]).run();
  if (payment_status) await env2.DB.prepare("UPDATE bookings SET payment_status = ? WHERE id = ?").bind(payment_status, p[0]).run();
  return json({ message: "Updated", id: p[0], status: status || bk.status, payment_status: payment_status || bk.payment_status });
}, "updateBooking");
var submitContact = /* @__PURE__ */ __name(async (req, env2) => {
  const { name, email, phone, subject, message } = await req.json();
  if (!name || !email || !message) return err("Name, email, and message required", 400);
  const id = "ct-" + uuid();
  await env2.DB.prepare("INSERT INTO contacts (id,name,email,phone,subject,message) VALUES (?,?,?,?,?,?)").bind(id, name, email, phone || null, subject || null, message).run();
  return json({ id, message: "Thank you! We will respond within 24 hours. / \u0634\u0643\u0631\u0627\u064B! \u0633\u0646\u0631\u062F \u062E\u0644\u0627\u0644 \u0662\u0664 \u0633\u0627\u0639\u0629." }, 201);
}, "submitContact");
var getReviews = /* @__PURE__ */ __name(async (req, env2, _ctx, _p, url) => {
  const room = url.searchParams.get("room_id");
  let q = "SELECT * FROM reviews WHERE 1=1", b = [];
  if (room) {
    q += " AND room_id = ?";
    b.push(room);
  }
  q += " ORDER BY created_at DESC LIMIT 20";
  const r = await (b.length ? env2.DB.prepare(q).bind(...b) : env2.DB.prepare(q)).all();
  return json(r.results || []);
}, "getReviews");
var submitReview = /* @__PURE__ */ __name(async (req, env2) => {
  const { room_id, guest_name, rating, comment, lang } = await req.json();
  if (!guest_name || !rating) return err("Name and rating required", 400);
  const id = "rv-" + uuid();
  await env2.DB.prepare("INSERT INTO reviews (id,room_id,guest_name,rating,comment,lang) VALUES (?,?,?,?,?,?)").bind(id, room_id || null, guest_name, rating, comment || null, lang || "en").run();
  return json({ id, message: "Review submitted! Thank you. / \u0634\u0643\u0631\u0627\u064B \u0644\u062A\u0642\u064A\u064A\u0645\u0643!" }, 201);
}, "submitReview");
var getStats = /* @__PURE__ */ __name(async (env2) => {
  try {
    const [rooms, bookings, reviews, contacts] = await Promise.all([
      env2.DB.prepare("SELECT COUNT(*) as total, type, AVG(price_per_night) as avg_price FROM rooms GROUP BY type").all(),
      env2.DB.prepare("SELECT COUNT(*) as total, status, SUM(total_price) as revenue FROM bookings GROUP BY status").all(),
      env2.DB.prepare("SELECT COUNT(*) as total, AVG(rating) as avg_rating FROM reviews").first(),
      env2.DB.prepare("SELECT COUNT(*) as total FROM contacts WHERE status = ?").bind("new").first()
    ]);
    return json({ rooms: rooms.results || [], bookings: bookings.results || [], reviews: reviews || { total: 0, avg_rating: 0 }, unread_contacts: contacts?.total || 0, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  } catch (e) {
    return json({ error: e.message });
  }
}, "getStats");
var spa = /* @__PURE__ */ __name(() => new Response(HTML, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", ...SECURITY_HEADERS } }), "spa");
var router = new Router();
router.get("/api/health", (_, env2) => health(env2));
router.get("/api/stats", (_, env2) => getStats(env2));
router.get("/api/version", () => json({ version: CONFIG.VERSION, name: CONFIG.NAME, powered_by: "BrainSAIT", bilingual: true }));
router.get("/api/rooms", (...a) => getRooms(...a));
router.get("/api/rooms/([^/]+)", (...a) => getRoom(...a));
router.post("/api/bookings", (...a) => createBooking(...a));
router.get("/api/bookings", (...a) => getBookings(...a));
router.patch("/api/bookings/([^/]+)", (...a) => updateBooking(...a));
router.post("/api/contact", (...a) => submitContact(...a));
router.get("/api/reviews", (...a) => getReviews(...a));
router.post("/api/reviews", (...a) => submitReview(...a));
router.post("/api/chat", (...a) => handleChat(...a));
router.get("/", spa);
router.get("/(.*)", spa);
var worker_default = {
  async fetch(request, env2, ctx) {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (!rateLimit(ip)) return cors(err("Rate limit exceeded", 429), request);
    if (env2.DB) ctx.waitUntil(initDB(env2.DB));
    return router.match(request, env2, ctx);
  }
};
var HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=yes">
<meta name="theme-color" content="#08081a" media="(prefers-color-scheme: dark)">
<title>Mellissa Hotel \u2014 \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627 | Riyadh's Premier AI-Powered Luxury Hotel</title>
<meta name="description" content="\u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627 \u2014 \u0648\u062C\u0647\u062A\u0643 \u0627\u0644\u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0631\u0641\u0627\u0647\u064A\u0629 \u0648\u0627\u0644\u0631\u0627\u062D\u0629 \u0641\u064A \u0642\u0644\u0628 \u0627\u0644\u0631\u064A\u0627\u0636. \u063A\u0631\u0641 \u0641\u0627\u062E\u0631\u0629\u060C \u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A\u060C \u0645\u0637\u0627\u0639\u0645 \u0639\u0627\u0644\u0645\u064A\u0629. | Melissa Hotel \u2014 luxury stays in Riyadh">
<meta name="keywords" content="hotel, riyadh, luxury, booking, saudi arabia, mellissa, brainsait, AI, \u0641\u0646\u062F\u0642, \u0627\u0644\u0631\u064A\u0627\u0636, \u0641\u0627\u062E\u0631, \u062D\u062C\u0632">
<meta property="og:title" content="Mellissa Hotel \u2014 \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627">
<meta property="og:description" content="AI-powered luxury hospitality in Riyadh | \u0636\u064A\u0627\u0641\u0629 \u0641\u0627\u062E\u0631\u0629 \u0645\u062F\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A">
<meta property="og:type" content="website">
<meta property="og:url" content="https://mellissa.brainsait.org">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0a0a1a">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#08081a;--bg2:#0e0e28;--bg3:#141432;
  --glass:rgba(255,255,255,0.035);--border:rgba(255,255,255,0.07);
  --t1:#f0f0f5;--t2:#a0a0b8;--t3:#6a6a80;
  --gold:#c9a84c;--gold2:#e2c87a;--blue:#4a90d9;--emerald:#34d399;--rose:#f472b6;
  --grad:linear-gradient(135deg,#c9a84c,#e2c87a,#c9a84c);
  --hero:linear-gradient(160deg,#08081a 0%,#161640 40%,#0b0b22 100%);
  --card:linear-gradient(145deg,rgba(20,20,50,0.75),rgba(12,12,35,0.55));
  --glow:0 0 40px rgba(201,168,76,0.12);
  --r1:10px;--r2:18px;--r3:28px;
  --font:'Inter',-apple-system,system-ui,sans-serif;
  --display:'Playfair Display',Georgia,serif;
  --ar:'Noto Kufi Arabic',var(--font);
  --ease:cubic-bezier(.4,0,.2,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--t1);line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:var(--gold);color:var(--bg)}
::-webkit-scrollbar{width:7px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--gold);border-radius:4px}
h1,h2,h3,h4{font-family:var(--display);font-weight:600;line-height:1.15}
h1{font-size:clamp(2.4rem,5.5vw,4.2rem)}
h2{font-size:clamp(1.7rem,3.5vw,2.8rem)}
h3{font-size:clamp(1.1rem,2.2vw,1.6rem)}
p{max-width:65ch}

/* \u2500\u2500\u2500 Layout \u2500\u2500\u2500 */
.wrap{max-width:1260px;margin:0 auto;padding:0 2rem}
section{padding:5.5rem 0}
.g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:2rem}
.g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:2rem}
.g4{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem}
.st{text-align:center;margin-bottom:3.5rem}
.st h2{margin-bottom:.8rem;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.st p{color:var(--t2);font-size:1.05rem;max-width:580px;margin:0 auto}

/* \u2500\u2500\u2500 Buttons \u2500\u2500\u2500 */
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.8rem;border-radius:var(--r1);font-family:var(--font);font-weight:600;font-size:.92rem;text-decoration:none;cursor:pointer;border:none;transition:.3s var(--ease);position:relative;overflow:hidden}
.btn-g{background:var(--grad);color:var(--bg)}
.btn-g:hover{transform:translateY(-2px);box-shadow:var(--glow)}
.btn-o{background:0;color:var(--gold);border:1.5px solid var(--gold)}
.btn-o:hover{background:rgba(201,168,76,.08);transform:translateY(-2px)}
.btn-s{background:var(--glass);color:var(--t1);border:1px solid var(--border);backdrop-filter:blur(16px)}
.btn-s:hover{background:rgba(255,255,255,.07)}

/* \u2500\u2500\u2500 Cards \u2500\u2500\u2500 */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:1.8rem;backdrop-filter:blur(16px);transition:.3s var(--ease)}
.card:hover{border-color:rgba(201,168,76,.25);transform:translateY(-3px);box-shadow:var(--glow)}
.badge{display:inline-block;padding:.25rem .7rem;border-radius:100px;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em}
.badge-g{background:rgba(201,168,76,.12);color:var(--gold)}
.badge-b{background:rgba(74,144,217,.12);color:var(--blue)}
.badge-e{background:rgba(52,211,153,.12);color:var(--emerald)}
.inp{width:100%;padding:.8rem 1.1rem;background:var(--glass);border:1px solid var(--border);border-radius:var(--r1);color:var(--t1);font-family:var(--font);font-size:.92rem;transition:.3s var(--ease)}
.inp:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,168,76,.08)}
.inp::placeholder{color:var(--t3)}
textarea.inp{resize:vertical;min-height:110px}

/* \u2500\u2500\u2500 Nav \u2500\u2500\u2500 */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:1rem 0;transition:.3s var(--ease);background:transparent}
.nav.scrolled{background:rgba(8,8,26,.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:.65rem 0}
.nav-in{display:flex;align-items:center;justify-content:space-between;max-width:1260px;margin:0 auto;padding:0 2rem}
.nav-logo{display:flex;align-items:center;gap:.7rem;text-decoration:none}
.nav-ico{width:38px;height:38px;background:var(--grad);border-radius:var(--r1);display:flex;align-items:center;justify-content:center;font-size:1.2rem}
.nav-txt{font-family:var(--display);font-size:1.35rem;font-weight:700;color:var(--t1)}
.nav-sub{font-size:.6rem;color:var(--gold);text-transform:uppercase;letter-spacing:.14em}
.nav-links{display:flex;align-items:center;gap:1.8rem;list-style:none}
.nav-links a{color:var(--t2);text-decoration:none;font-size:.88rem;font-weight:500;transition:.3s var(--ease);position:relative}
.nav-links a:hover,.nav-links a.on{color:var(--gold)}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--gold);transition:.3s var(--ease)}
.nav-links a:hover::after,.nav-links a.on::after{width:100%}
.nav-r{display:flex;align-items:center;gap:.8rem}
.nav-lang{padding:.35rem .7rem;background:var(--glass);border:1px solid var(--border);border-radius:var(--r1);color:var(--t2);cursor:pointer;font-size:.82rem}
.nav-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
.nav-burger span{width:22px;height:2px;background:var(--t1);transition:.3s var(--ease)}
@media(max-width:768px){.nav-links,.nav-r{display:none}.nav-burger{display:flex}.nav-links.open{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(8,8,26,.98);backdrop-filter:blur(20px);padding:2rem;border-bottom:1px solid var(--border);gap:1.4rem}}

/* \u2500\u2500\u2500 Hero \u2500\u2500\u2500 */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;background:var(--hero);overflow:hidden}
.hero::before{content:'';position:absolute;top:-40%;right:-25%;width:70%;height:130%;background:radial-gradient(ellipse,rgba(201,168,76,.05) 0%,transparent 65%);pointer-events:none}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:180px;background:linear-gradient(to top,var(--bg),transparent);pointer-events:none}
.hero-c{position:relative;z-index:2;max-width:680px}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.45rem .9rem;background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.18);border-radius:100px;font-size:.78rem;color:var(--gold);margin-bottom:1.8rem;animation:fadeUp .8s ease}
.hero h1{margin-bottom:1.3rem;animation:fadeUp .8s ease .15s both}
.hero h1 em{display:block;font-style:normal;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero>p,.hero-c>p{font-size:1.1rem;color:var(--t2);margin-bottom:2.2rem;animation:fadeUp .8s ease .3s both}
.hero-acts{display:flex;gap:.8rem;flex-wrap:wrap;animation:fadeUp .8s ease .45s both}
.hero-stats{display:flex;gap:2.5rem;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--border);animation:fadeUp .8s ease .6s both}
.hero-stat-n{font-family:var(--display);font-size:2.2rem;font-weight:700;color:var(--gold)}
.hero-stat-l{font-size:.82rem;color:var(--t3);margin-top:.2rem}
@media(max-width:768px){.hero-stats{gap:1.5rem;flex-wrap:wrap}.hero-stat-n{font-size:1.6rem}}

/* \u2500\u2500\u2500 Floating \u2500\u2500\u2500 */
.hero-float{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:400px;height:400px;z-index:1}
.float-c{position:absolute;background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:1.3rem;backdrop-filter:blur(16px);animation:float 6s ease-in-out infinite}
.float-c:nth-child(1){top:0;right:0;animation-delay:0s}
.float-c:nth-child(2){top:38%;right:48%;animation-delay:2s}
.float-c:nth-child(3){bottom:8%;right:8%;animation-delay:4s}
.float-e{font-size:1.8rem;margin-bottom:.4rem}
.float-t{font-weight:600;font-size:.85rem;margin-bottom:.2rem}
.float-s{color:var(--t3);font-size:.75rem}
@media(max-width:1024px){.hero-float{display:none}}

/* \u2500\u2500\u2500 Rooms \u2500\u2500\u2500 */
.room-card{overflow:hidden;position:relative}
.room-img{height:210px;background:linear-gradient(135deg,#161640,#262660);border-radius:var(--r2) var(--r2) 0 0;display:flex;align-items:center;justify-content:center;font-size:3.5rem;position:relative;overflow:hidden}
.room-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,26,.75),transparent)}
.room-price{position:absolute;top:.8rem;right:.8rem;background:var(--grad);color:var(--bg);padding:.35rem .9rem;border-radius:100px;font-weight:700;font-size:.85rem;z-index:2}
.room-body{padding:1.4rem}
.room-type{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--gold);margin-bottom:.4rem}
.room-name{font-family:var(--font-display);font-size:1.2rem;margin-bottom:.6rem}
.room-desc{color:var(--t2);font-size:.88rem;margin-bottom:.8rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.room-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.2rem}
.room-tag{padding:.2rem .5rem;background:var(--glass);border:1px solid var(--border);border-radius:100px;font-size:.68rem;color:var(--t3)}
.room-foot{display:flex;align-items:center;justify-content:space-between}
.room-rating{color:var(--gold);font-weight:600;font-size:.88rem}
.room-guests{color:var(--t3);font-size:.82rem}

/* \u2500\u2500\u2500 AI Chat \u2500\u2500\u2500 */
.chat-trig{position:fixed;bottom:2rem;right:2rem;width:56px;height:56px;background:var(--grad);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;cursor:pointer;z-index:999;box-shadow:0 8px 28px rgba(201,168,76,.25);transition:.3s var(--ease);border:none}
.chat-trig:hover{transform:scale(1.08);box-shadow:0 10px 36px rgba(201,168,76,.35)}
.chat-panel{position:fixed;bottom:5.5rem;right:2rem;width:380px;max-height:580px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--r3);z-index:1000;display:none;flex-direction:column;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,.5);animation:slideUp .3s ease}
.chat-panel.open{display:flex}
.chat-hd{padding:1.1rem 1.3rem;background:var(--grad);color:var(--bg);display:flex;align-items:center;justify-content:space-between}
.chat-hd-i{display:flex;align-items:center;gap:.65rem}
.chat-av{width:32px;height:32px;background:rgba(0,0,0,.18);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem}
.chat-hd-t h4{font-family:var(--display);font-size:.95rem}
.chat-hd-t span{font-size:.7rem;opacity:.75}
.chat-close{background:none;border:none;color:var(--bg);font-size:1.2rem;cursor:pointer;opacity:.7}
.chat-msgs{flex:1;overflow-y:auto;padding:1.3rem;display:flex;flex-direction:column;gap:.8rem;min-height:280px;max-height:380px}
.cmsg{max-width:85%;padding:.75rem 1rem;border-radius:var(--r2);font-size:.88rem;line-height:1.5;animation:fadeUp .25s ease;white-space:pre-wrap}
.cmsg.bot{align-self:flex-start;background:var(--glass);border:1px solid var(--border);color:var(--t1)}
.cmsg.user{align-self:flex-end;background:var(--gold);color:var(--bg)}
.chat-inp{padding:.85rem 1.3rem;border-top:1px solid var(--border);display:flex;gap:.65rem}
.chat-inp input{flex:1;padding:.7rem .9rem;background:var(--glass);border:1px solid var(--border);border-radius:var(--r1);color:var(--t1);font-size:.88rem}
.chat-inp input:focus{outline:none;border-color:var(--gold)}
.chat-send{padding:.7rem .9rem;background:var(--grad);color:var(--bg);border:none;border-radius:var(--r1);cursor:pointer;font-weight:600;transition:.2s}
.chat-send:hover{opacity:.85}
@media(max-width:480px){.chat-panel{width:calc(100vw - 2rem);right:1rem;bottom:4.5rem}}

/* \u2500\u2500\u2500 Framework \u2500\u2500\u2500 */
.fw-card{text-align:center;padding:2.2rem 1.3rem}
.fw-ico{width:56px;height:56px;margin:0 auto 1.1rem;background:rgba(201,168,76,.08);border-radius:var(--r2);display:flex;align-items:center;justify-content:center;font-size:1.6rem}
.fw-card h4{margin-bottom:.6rem}
.fw-card p{color:var(--t2);font-size:.88rem}

/* \u2500\u2500\u2500 Dashboard \u2500\u2500\u2500 */
.dash{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.3rem;margin-bottom:2.5rem}
.stat-c{padding:1.8rem;text-align:center}
.stat-ico{font-size:2.2rem;margin-bottom:.8rem}
.stat-n{font-family:var(--display);font-size:2.2rem;font-weight:700;color:var(--gold);margin-bottom:.2rem}
.stat-l{color:var(--t2);font-size:.88rem}
.stat-t{display:inline-flex;align-items:center;gap:.2rem;margin-top:.4rem;font-size:.78rem;color:var(--emerald)}

/* \u2500\u2500\u2500 Pitch \u2500\u2500\u2500 */
.pitch-g{display:grid;grid-template-columns:1fr 1fr;gap:3.5rem;align-items:center}
@media(max-width:768px){.pitch-g{grid-template-columns:1fr;gap:2rem}}
.pitch-m{display:flex;align-items:center;gap:1.3rem;padding:1.3rem;background:var(--glass);border:1px solid var(--border);border-radius:var(--r2);margin-bottom:.8rem}
.pitch-m-n{font-family:var(--display);font-size:1.8rem;font-weight:700;color:var(--gold);min-width:70px}
.pitch-m-l{color:var(--t2);font-size:.88rem}

/* \u2500\u2500\u2500 Team \u2500\u2500\u2500 */
.team-c{text-align:center;padding:2.2rem 1.3rem}
.team-av{width:90px;height:90px;margin:0 auto 1.3rem;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:2.2rem}
.team-c h4{margin-bottom:.2rem}
.team-r{color:var(--gold);font-size:.82rem;margin-bottom:.6rem}
.team-c p{color:var(--t2);font-size:.88rem}

/* \u2500\u2500\u2500 FAQ \u2500\u2500\u2500 */
.faq{border-bottom:1px solid var(--border);overflow:hidden}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:1.3rem 0;background:none;border:none;color:var(--t1);font-family:var(--font);font-size:1rem;font-weight:600;cursor:pointer;text-align:left;transition:.2s}
.faq-q:hover{color:var(--gold)}
.faq-ico{font-size:1.4rem;color:var(--gold);transition:.3s var(--ease);min-width:22px;text-align:center}
.faq.open .faq-ico{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease}
.faq.open .faq-a{max-height:500px}
.faq-a-i{padding-bottom:1.3rem;color:var(--t2);line-height:1.8}

/* \u2500\u2500\u2500 Blog \u2500\u2500\u2500 */
.blog-card{overflow:hidden}
.blog-img{height:190px;background:linear-gradient(135deg,#161640,#262660);border-radius:var(--r2) var(--r2) 0 0;display:flex;align-items:center;justify-content:center;font-size:2.8rem}
.blog-body{padding:1.3rem}
.blog-meta{display:flex;align-items:center;gap:.8rem;margin-bottom:.6rem;font-size:.78rem;color:var(--t3)}
.blog-card h3{font-size:1.08rem;margin-bottom:.6rem}
.blog-card p{color:var(--t2);font-size:.88rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}

/* \u2500\u2500\u2500 Glossary \u2500\u2500\u2500 */
.gloss{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.1rem}
.gloss-i{padding:1.3rem}
.gloss-t{font-family:var(--font-display);font-size:1.05rem;color:var(--gold);margin-bottom:.4rem}
.gloss-d{color:var(--t2);font-size:.88rem}

/* \u2500\u2500\u2500 Modal \u2500\u2500\u2500 */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(8px);z-index:2000;display:none;align-items:center;justify-content:center;padding:2rem}
.modal-bg.open{display:flex}
.modal{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r3);width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:slideUp .3s ease}
.modal-hd{padding:1.3rem 1.8rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.modal-hd h3{font-size:1.2rem}
.modal-x{background:none;border:none;color:var(--t3);font-size:1.4rem;cursor:pointer}
.modal-bd{padding:1.8rem}
.fg{margin-bottom:1.1rem}
.fl{display:block;margin-bottom:.4rem;font-size:.82rem;font-weight:600;color:var(--t2)}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.bk-sum{background:var(--glass);border:1px solid var(--border);border-radius:var(--r2);padding:1.3rem;margin:1.3rem 0}
.bk-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.88rem}
.bk-total{border-top:1px solid var(--border);margin-top:.4rem;padding-top:.6rem;font-weight:700;font-size:1.05rem}
.bk-total span:last-child{color:var(--gold)}

/* \u2500\u2500\u2500 Contact \u2500\u2500\u2500 */
.contact-g{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem}
@media(max-width:768px){.contact-g{grid-template-columns:1fr}}
.ci-card{display:flex;align-items:flex-start;gap:.8rem;padding:1.1rem;margin-bottom:.8rem}
.ci-ico{width:40px;height:40px;background:rgba(201,168,76,.08);border-radius:var(--r1);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.ci-t h4{font-size:.92rem;margin-bottom:.2rem}
.ci-t p{color:var(--t2);font-size:.88rem}

/* \u2500\u2500\u2500 Footer \u2500\u2500\u2500 */
.footer{background:var(--bg2);border-top:1px solid var(--border);padding:3.5rem 0 1.8rem}
.footer-g{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.5rem;margin-bottom:2.5rem}
@media(max-width:768px){.footer-g{grid-template-columns:1fr 1fr;gap:1.5rem}}
@media(max-width:480px){.footer-g{grid-template-columns:1fr}}
.footer-b p{color:var(--t2);margin:.8rem 0;font-size:.88rem}
.footer h4{font-family:var(--font);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;color:var(--gold);margin-bottom:1.1rem}
.footer-links{list-style:none}
.footer-links li{margin-bottom:.6rem}
.footer-links a{color:var(--t2);text-decoration:none;font-size:.88rem;transition:.2s}
.footer-links a:hover{color:var(--gold)}
.footer-bot{padding-top:1.8rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.8rem}
.footer-bot p{color:var(--t3);font-size:.82rem}

/* \u2500\u2500\u2500 Toast \u2500\u2500\u2500 */
.toast{position:fixed;top:2rem;right:2rem;padding:.9rem 1.3rem;background:var(--bg2);border:1px solid var(--emerald);border-radius:var(--r2);color:var(--emerald);z-index:3000;display:none;animation:slideUp .3s ease;max-width:380px;font-size:.9rem}
.toast.show{display:flex;align-items:center;gap:.6rem}
.toast.err{border-color:var(--rose);color:var(--rose)}

/* \u2500\u2500\u2500 Animations \u2500\u2500\u2500 */
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes slideUp{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}}
.aos{opacity:0;transform:translateY(25px);transition:opacity .6s ease,transform .6s ease}
.aos.vis{opacity:1;transform:translateY(0)}

/* \u2500\u2500\u2500 RTL \u2500\u2500\u2500 */
[dir="rtl"]{font-family:var(--ar)}
[dir="rtl"] .hero h1{letter-spacing:0}
[dir="rtl"] .faq-q{text-align:right}
.divider{height:1px;background:linear-gradient(to right,transparent,var(--border),transparent);margin:0 auto;max-width:550px}

/* \u2550\u2550\u2550 MOBILE-FIRST ENHANCEMENTS \u2550\u2550\u2550 */

/* Safe areas for notched phones */
@supports(padding:max(0px)){
  body{padding-left:max(0px,env(safe-area-inset-left));padding-right:max(0px,env(safe-area-inset-right))}
  .nav-in,.wrap{padding-left:max(1rem,env(safe-area-inset-left));padding-right:max(1rem,env(safe-area-inset-right))}
  .footer{padding-bottom:max(1.5rem,env(safe-area-inset-bottom))}
  .chat-trig{bottom:max(1.5rem,calc(env(safe-area-inset-bottom) + .5rem));right:max(1rem,env(safe-area-inset-right))}
  .chat-panel{bottom:max(5rem,calc(env(safe-area-inset-bottom) + 3.5rem))}
}

/* Touch targets \u2014 minimum 44px */
.btn,.nav-links a,.faq-q,.chat-trig,.chat-send,.nav-lang,.nav-burger,.modal-x{min-height:44px;min-width:44px}
.btn{padding:.75rem 1.5rem}
.inp{min-height:44px;font-size:16px /* prevents iOS zoom */}

/* Mobile typography scale */
@media(max-width:640px){
  h1{font-size:2rem}
  h2{font-size:1.5rem}
  h3{font-size:1.15rem}
  p{font-size:.95rem}
  .hero{min-height:min(100vh,100svh);padding-top:5rem}
  .hero-c{padding:0 .5rem}
  .hero-badge{font-size:.72rem;padding:.35rem .7rem}
  .hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:1rem;padding-top:1.5rem;margin-top:2rem}
  .hero-stat-n{font-size:1.4rem}
  .hero-stat-l{font-size:.75rem}
  section{padding:3.5rem 0}
  .st{margin-bottom:2.5rem}
  .st p{font-size:.92rem}
  .g2,.g3{grid-template-columns:1fr;gap:1.2rem}
  .g4{grid-template-columns:1fr 1fr;gap:1rem}
  .card{padding:1.3rem}
  .room-img{height:170px;font-size:2.8rem}
  .room-body{padding:1rem}
  .room-name{font-size:1.05rem}
  .room-desc{font-size:.82rem;-webkit-line-clamp:2}
  .room-tags{gap:.3rem}
  .room-tag{font-size:.62rem;padding:.15rem .4rem}
  .fw-card{padding:1.5rem 1rem}
  .fw-ico{width:48px;height:48px;font-size:1.3rem}
  .stat-c{padding:1.2rem}
  .stat-n{font-size:1.6rem}
  .stat-ico{font-size:1.8rem}
  .dash{gap:1rem}
  .pitch-g{gap:1.5rem}
  .pitch-m{padding:1rem;gap:1rem}
  .pitch-m-n{font-size:1.3rem;min-width:55px}
  .team-av{width:72px;height:72px;font-size:1.8rem}
  .blog-img{height:150px;font-size:2.2rem}
  .blog-body{padding:1rem}
  .blog-card h3{font-size:.95rem}
  .contact-g{gap:1.5rem}
  .ci-card{padding:.8rem}
  .footer-g{grid-template-columns:1fr;gap:1.5rem}
  .footer-bot{flex-direction:column;text-align:center}
  .modal{margin:1rem;border-radius:var(--r2)}
  .modal-bd{padding:1.3rem}
  .fr{grid-template-columns:1fr;gap:.6rem}
  .bk-sum{padding:1rem}
  .chat-panel{width:calc(100vw - 1.5rem);right:.75rem;border-radius:var(--r2)}
  .chat-msgs{padding:1rem;min-height:240px;max-height:55vh}
  .chat-inp{padding:.7rem 1rem}
  .gloss{grid-template-columns:1fr}
}

/* Small phones */
@media(max-width:380px){
  h1{font-size:1.7rem}
  .hero-stats{grid-template-columns:1fr 1fr;gap:.8rem}
  .hero-stat-n{font-size:1.2rem}
  .g4{grid-template-columns:1fr}
  .btn{padding:.65rem 1.2rem;font-size:.85rem}
  .nav-txt{font-size:1.1rem}
}

/* Tablet */
@media(min-width:641px) and (max-width:1024px){
  .g3{grid-template-columns:1fr 1fr}
  .g4{grid-template-columns:1fr 1fr 1fr}
  .hero-float{display:none}
  .pitch-g{grid-template-columns:1fr}
}

/* Desktop enhancements */
@media(min-width:1025px){
  .g3{grid-template-columns:1fr 1fr 1fr}
  .g4{grid-template-columns:1fr 1fr 1fr 1fr}
  .room-card:hover .room-img{transform:scale(1.03)}
  .room-img{transition:transform .4s var(--ease)}
}

/* Smooth scrolling & reduced motion */
@media(prefers-reduced-motion:reduce){
  *{animation-duration:0.01ms !important;transition-duration:0.01ms !important}
  html{scroll-behavior:auto}
}

/* Dark mode enhancements for OLED */
@media(prefers-color-scheme:dark){
  :root{--bg:#050510;--bg2:#0a0a20}
}

/* Print styles */
@media print{
  .nav,.chat-trig,.chat-panel,.modal-bg,.toast,.hero-float{display:none !important}
  body{background:white;color:black}
  .card{border:1px solid #ddd;background:white}
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav" id="nav">
<div class="nav-in">
  <a href="#" class="nav-logo"><div class="nav-ico">\u{1F3E8}</div><div><div class="nav-txt">Mellissa</div><div class="nav-sub">by BrainSAIT</div></div></a>
  <ul class="nav-links" id="navLinks">
    <li><a href="#rooms" class="on" data-en="Rooms" data-ar="\u0627\u0644\u063A\u0631\u0641">Rooms</a></li>
    <li><a href="#amenities" data-en="Amenities" data-ar="\u0627\u0644\u0645\u0631\u0627\u0641\u0642">Amenities</a></li>
    <li><a href="#frameworks" data-en="Technology" data-ar="\u0627\u0644\u062A\u0642\u0646\u064A\u0629">Technology</a></li>
    <li><a href="#market" data-en="Market" data-ar="\u0627\u0644\u0633\u0648\u0642">Market</a></li>
    <li><a href="#investors" data-en="Investors" data-ar="\u0627\u0644\u0645\u0633\u062A\u062B\u0645\u0631\u0648\u0646">Investors</a></li>
    <li><a href="#blog" data-en="Blog" data-ar="\u0627\u0644\u0645\u062F\u0648\u0646\u0629">Blog</a></li>
    <li><a href="#contact" data-en="Contact" data-ar="\u062A\u0648\u0627\u0635\u0644">Contact</a></li>
  </ul>
  <div class="nav-r">
    <button class="nav-lang" onclick="toggleLang()">EN / \u0639\u0631\u0628\u064A</button>
    <a href="#" class="btn btn-g" onclick="openBooking()" data-en="Book Now" data-ar="\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646">Book Now</a>
  </div>
  <button class="nav-burger" onclick="document.getElementById('navLinks').classList.toggle('open')"><span></span><span></span><span></span></button>
</div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
<div class="wrap">
  <div class="hero-c">
    <div class="hero-badge" data-en="\u2728 Where Luxury Meets Comfort \xB7 \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627" data-ar="\u2728 \u062D\u064A\u062B \u062A\u062A\u062C\u062A\u0645\u0639 \u0627\u0644\u0641\u062E\u0627\u0645\u0629 \u0648\u0627\u0644\u0631\u0627\u062D\u0629 \xB7 \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627">\u2728 Where Luxury Meets Comfort \xB7 \u0641\u0646\u062F\u0642 \u0645\u0644\u064A\u0633\u0627</div>
    <h1><span data-en="Welcome to" data-ar="\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643\u0645 \u0641\u064A">Welcome to</span> <em>Mellissa Hotel</em></h1>
    <p data-en="An unforgettable stay where luxury meets comfort. Spacious rooms with modern amenities, a fitness center, spa, international restaurants, outdoor pool, and a dedicated team ready to make you feel at home." data-ar="\u062A\u062C\u0631\u0628\u0629 \u0625\u0642\u0627\u0645\u0629 \u0644\u0627 \u062A\u064F\u0646\u0633\u0649 \u062D\u064A\u062B \u062A\u062A\u062C\u062A\u0645\u0639 \u0627\u0644\u0641\u062E\u0627\u0645\u0629 \u0648\u0627\u0644\u0631\u0627\u062D\u0629. \u063A\u0631\u0641 \u0641\u0633\u064A\u062D\u0629 \u0645\u062C\u0647\u0632\u0629 \u0628\u0623\u062D\u062F\u062B \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0631\u0627\u062D\u0629\u060C \u0648\u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629\u060C \u0648\u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A\u060C \u0648\u0645\u0637\u0627\u0639\u0645 \u0639\u0627\u0644\u0645\u064A\u0629\u060C \u0648\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0631\u062C\u064A\u060C \u0648\u0641\u0631\u064A\u0642 \u0645\u062A\u0641\u0627\u0646\u064A \u0644\u062E\u062F\u0645\u062A\u0643.">An unforgettable stay where luxury meets comfort. Spacious rooms with modern amenities, a fitness center, spa, international restaurants, outdoor pool, and a dedicated team ready to make you feel at home.</p>
    <div class="hero-acts">
      <button class="btn btn-g" onclick="openBooking()" data-en="\u{1F4C5} Book Your Stay" data-ar="\u{1F4C5} \u0627\u062D\u062C\u0632 \u0625\u0642\u0627\u0645\u062A\u0643">\u{1F4C5} Book Your Stay</button>
      <button class="btn btn-o" onclick="scrollTo('#rooms')" data-en="Explore Rooms \u2193" data-ar="\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u063A\u0631\u0641 \u2193">Explore Rooms \u2193</button>
      <button class="btn btn-s" onclick="toggleChat()" data-en="\u{1F916} Talk to Mellissa AI" data-ar="\u{1F916} \u062A\u062D\u062F\u062B \u0645\u0639 \u0645\u0644\u064A\u0633\u0627">\u{1F916} Talk to Mellissa AI</button>
    </div>
    <div class="hero-stats">
      <div><div class="hero-stat-n">6</div><div class="hero-stat-l" data-en="Room Types" data-ar="\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u063A\u0631\u0641">Room Types</div></div>
      <div><div class="hero-stat-n">4.8\u2605</div><div class="hero-stat-l" data-en="Guest Rating" data-ar="\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0636\u064A\u0648\u0641">Guest Rating</div></div>
      <div><div class="hero-stat-n">24/7</div><div class="hero-stat-l" data-en="AI Concierge" data-ar="\u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0630\u0643\u064A">AI Concierge</div></div>
      <div><div class="hero-stat-n">3</div><div class="hero-stat-l" data-en="Restaurants" data-ar="\u0645\u0637\u0627\u0639\u0645">Restaurants</div></div>
    </div>
  </div>
  <div class="hero-float">
    <div class="float-c"><div class="float-e">\u{1F916}</div><div class="float-t">AI Concierge</div><div class="float-s">Always available</div></div>
    <div class="float-c"><div class="float-e">\u2B50</div><div class="float-t">5-Star Rated</div><div class="float-s">1,200+ reviews</div></div>
    <div class="float-c"><div class="float-e">\u{1F3C6}</div><div class="float-t">Vision 2030</div><div class="float-s">Aligned partner</div></div>
  </div>
</div>
</section>

<!-- ROOMS -->
<section id="rooms"><div class="wrap">
  <div class="st aos"><h2 data-en="Rooms &amp; Suites" data-ar="\u0627\u0644\u063A\u0631\u0641 \u0648\u0627\u0644\u0623\u062C\u0646\u062D\u0629">Rooms &amp; Suites</h2><p data-en="From cozy standard rooms to our breathtaking penthouse \u2014 every stay is an experience crafted with care." data-ar="\u0645\u0646 \u0627\u0644\u063A\u0631\u0641 \u0627\u0644\u0645\u0631\u064A\u062D\u0629 \u0625\u0644\u0649 \u0627\u0644\u0628\u0646\u062A\u0647\u0627\u0648\u0633 \u0627\u0644\u0645\u0630\u0647\u0644 \u2014 \u0643\u0644 \u0625\u0642\u0627\u0645\u0629 \u062A\u062C\u0631\u0628\u0629 \u0645\u0635\u0645\u0645\u0629 \u0628\u0639\u0646\u0627\u064A\u0629.">From cozy standard rooms to our breathtaking penthouse \u2014 every stay is an experience crafted with care.</p></div>
  <div class="g3" id="roomsGrid"></div>
</div></section>
<div class="divider"></div>

<!-- AMENITIES -->
<section id="amenities"><div class="wrap">
  <div class="st aos"><h2 data-en="Hotel Amenities" data-ar="\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0641\u0646\u062F\u0642">Hotel Amenities</h2><p data-en="Everything you need for a perfect stay." data-ar="\u0643\u0644 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0644\u0625\u0642\u0627\u0645\u0629 \u0645\u062B\u0627\u0644\u064A\u0629.">Everything you need for a perfect stay.</p></div>
  <div class="g4 aos" id="amenGrid"></div>
</div></section>
<div class="divider"></div>

<!-- FRAMEWORKS -->
<section id="frameworks"><div class="wrap">
  <div class="st aos"><h2 data-en="Frameworks &amp; Technology" data-ar="\u0627\u0644\u0623\u064F\u0637\u0631 \u0648\u0627\u0644\u062A\u0642\u0646\u064A\u0629">Frameworks &amp; Technology</h2><p data-en="Built on cutting-edge technology stacks for seamless hospitality." data-ar="\u0645\u0628\u0646\u064A \u0639\u0644\u0649 \u0623\u062D\u062F\u062B \u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A \u0644\u0636\u064A\u0627\u0641\u0629 \u0633\u0644\u0633\u0629.">Built on cutting-edge technology stacks for seamless hospitality.</p></div>
  <div class="g3 aos" id="fwGrid"></div>
</div></section>
<div class="divider"></div>

<!-- KSA MARKET -->
<section id="market" style="background:var(--bg2)"><div class="wrap">
  <div class="st aos"><h2 data-en="KSA Hospitality Market" data-ar="\u0633\u0648\u0642 \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A">KSA Hospitality Market</h2><p data-en="Saudi Arabia's booming tourism \u2014 aligned with Vision 2030." data-ar="\u0627\u0644\u0633\u064A\u0627\u062D\u0629 \u0627\u0644\u0645\u0632\u062F\u0647\u0631\u0629 \u0641\u064A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u2014 \u0645\u062A\u0648\u0627\u0641\u0642\u0629 \u0645\u0639 \u0631\u0624\u064A\u0629 2030.">Saudi Arabia's booming tourism \u2014 aligned with Vision 2030.</p></div>
  <div class="dash aos" id="dashGrid"></div>
  <div class="g2 aos">
    <div class="card"><h3 style="margin-bottom:1rem" data-en="\u{1F3AF} Why Riyadh?" data-ar="\u{1F3AF} \u0644\u0645\u0627\u0630\u0627 \u0627\u0644\u0631\u064A\u0627\u0636\u061F">\u{1F3AF} Why Riyadh?</h3><ul id="whyRiyadh" style="list-style:none;color:var(--t2);line-height:2.2"></ul></div>
    <div class="card"><h3 style="margin-bottom:1rem" data-en="\u{1F4CA} Mellissa's Edge" data-ar="\u{1F4CA} \u0645\u064A\u0632\u0629 \u0645\u0644\u064A\u0633\u0627">\u{1F4CA} Mellissa's Edge</h3><ul id="edgeList" style="list-style:none;color:var(--t2);line-height:2.2"></ul></div>
  </div>
</div></section>
<div class="divider"></div>

<!-- INVESTORS -->
<section id="investors"><div class="wrap">
  <div class="st aos"><h2 data-en="Investment Opportunity" data-ar="\u0641\u0631\u0635\u0629 \u0627\u0633\u062A\u062B\u0645\u0627\u0631\u064A\u0629">Investment Opportunity</h2><p data-en="A unique convergence of luxury hospitality and AI in the world's fastest-growing tourism market." data-ar="\u062A\u0642\u0627\u0637\u0639 \u0641\u0631\u064A\u062F \u0628\u064A\u0646 \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0627\u0644\u0641\u0627\u062E\u0631\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u0623\u0633\u0631\u0639 \u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0633\u064A\u0627\u062D\u0629 \u0646\u0645\u0648\u0627\u064B.">A unique convergence of luxury hospitality and AI in the world's fastest-growing tourism market.</p></div>
  <div class="pitch-g aos">
    <div>
      <h3 style="margin-bottom:1.8rem" data-en="The Numbers Speak" data-ar="\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u062A\u062A\u062D\u062F\u062B">The Numbers Speak</h3>
      <div id="pitchMetrics"></div>
    </div>
    <div class="card" style="border-color:rgba(201,168,76,.25)">
      <h3 style="margin-bottom:1.3rem" data-en="\u{1F680} Investment Highlights" data-ar="\u{1F680} \u0623\u0628\u0631\u0632 \u0627\u0644\u0646\u0642\u0627\u0637">\u{1F680} Investment Highlights</h3>
      <div id="pitchHighlights"></div>
      <div style="margin-top:1.8rem"><button class="btn btn-g" onclick="scrollTo('#contact')" data-en="\u{1F4E9} Request Pitch Deck" data-ar="\u{1F4E9} \u0627\u0637\u0644\u0628 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A">\u{1F4E9} Request Pitch Deck</button></div>
    </div>
  </div>
</div></section>
<div class="divider"></div>

<!-- TEAM -->
<section id="team" style="background:var(--bg2)"><div class="wrap">
  <div class="st aos"><h2 data-en="Our Team" data-ar="\u0641\u0631\u064A\u0642\u0646\u0627">Our Team</h2><p data-en="World-class team combining hospitality, AI engineering, and Saudi market expertise." data-ar="\u0641\u0631\u064A\u0642 \u0639\u0627\u0644\u0645\u064A \u064A\u062C\u0645\u0639 \u0628\u064A\u0646 \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0648\u062E\u0628\u0631\u0629 \u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u0633\u0639\u0648\u062F\u064A.">World-class team combining hospitality, AI engineering, and Saudi market expertise.</p></div>
  <div class="g4 aos" id="teamGrid"></div>
</div></section>
<div class="divider"></div>

<!-- BLOG -->
<section id="blog"><div class="wrap">
  <div class="st aos"><h2 data-en="Latest Insights" data-ar="\u0623\u062D\u062F\u062B \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A">Latest Insights</h2><p data-en="Stories from the intersection of hospitality and technology." data-ar="\u0642\u0635\u0635 \u0645\u0646 \u062A\u0642\u0627\u0637\u0639 \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627.">Stories from the intersection of hospitality and technology.</p></div>
  <div class="g3 aos" id="blogGrid"></div>
</div></section>
<div class="divider"></div>

<!-- FAQ -->
<section id="faq" style="background:var(--bg2)"><div class="wrap">
  <div class="st aos"><h2 data-en="Frequently Asked Questions" data-ar="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629">Frequently Asked Questions</h2><p data-en="Everything you need to know about staying at Mellissa." data-ar="\u0643\u0644 \u0645\u0627 \u062A\u0631\u064A\u062F \u0645\u0639\u0631\u0641\u062A\u0647 \u0639\u0646 \u0627\u0644\u0625\u0642\u0627\u0645\u0629 \u0641\u064A \u0645\u0644\u064A\u0633\u0627.">Everything you need to know about staying at Mellissa.</p></div>
  <div style="max-width:780px;margin:0 auto" class="aos" id="faqList"></div>
</div></section>
<div class="divider"></div>

<!-- GLOSSARY -->
<section id="glossary"><div class="wrap">
  <div class="st aos"><h2 data-en="Hospitality &amp; Tech Glossary" data-ar="\u0645\u0635\u0637\u0644\u062D\u0627\u062A \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u0642\u0646\u064A\u0629">Hospitality &amp; Tech Glossary</h2><p data-en="Key terms at the intersection of luxury hospitality, AI, and Saudi tourism." data-ar="\u0645\u0635\u0637\u0644\u062D\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 \u0641\u064A \u062A\u0642\u0627\u0637\u0639 \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0627\u0644\u0641\u0627\u062E\u0631\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0627\u0644\u0633\u064A\u0627\u062D\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629.">Key terms at the intersection of luxury hospitality, AI, and Saudi tourism.</p></div>
  <div class="gloss aos" id="glossGrid"></div>
</div></section>
<div class="divider"></div>

<!-- CONTACT -->
<section id="contact" style="background:var(--bg2)"><div class="wrap">
  <div class="st aos"><h2 data-en="Get In Touch" data-ar="\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627">Get In Touch</h2><p data-en="Whether booking, partnerships, or investment \u2014 we'd love to hear from you." data-ar="\u0633\u0648\u0627\u0621 \u0644\u0644\u062D\u062C\u0632 \u0623\u0648 \u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062A \u0623\u0648 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631 \u2014 \u064A\u0633\u0639\u062F\u0646\u0627 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643.">Whether booking, partnerships, or investment \u2014 we'd love to hear from you.</p></div>
  <div class="contact-g aos">
    <div>
      <div class="ci-card card"><div class="ci-ico">\u{1F4CD}</div><div class="ci-t"><h4 data-en="Location" data-ar="\u0627\u0644\u0645\u0648\u0642\u0639">Location</h4><p data-en="Abi Jafar Al Mansour St, Ash Shuhada, Ghirnatah, Riyadh 13241, Saudi Arabia" data-ar="\u0634\u0627\u0631\u0639 \u0623\u0628\u064A \u062C\u0639\u0641\u0631 \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u060C \u0627\u0644\u0634\u0647\u062F\u0627\u0621\u060C \u063A\u0631\u0646\u0627\u0637\u0629\u060C \u0627\u0644\u0631\u064A\u0627\u0636 \u0661\u0663\u0662\u0664\u0661\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629">Abi Jafar Al Mansour St, Ash Shuhada, Ghirnatah, Riyadh 13241, Saudi Arabia</p></div></div>
      <div class="ci-card card"><div class="ci-ico">\u{1F4DE}</div><div class="ci-t"><h4>Phone</h4><p>+966 11 XXX XXXX</p></div></div>
      <div class="ci-card card"><div class="ci-ico">\u{1F4E7}</div><div class="ci-t"><h4>Email</h4><p>info@mellissa.brainsait.org</p></div></div>
      <div class="ci-card card"><div class="ci-ico">\u{1F550}</div><div class="ci-t"><h4 data-en="Reception" data-ar="\u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644">Reception</h4><p data-en="24/7 \u2014 We never close" data-ar="\u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 \u2014 \u0644\u0627 \u0646\u063A\u0644\u0642 \u0623\u0628\u062F\u0627\u064B">24/7 \u2014 We never close</p></div></div>
    </div>
    <div class="card">
      <form id="contactForm" onsubmit="submitContact(event)">
        <div class="fr">
          <div class="fg"><label class="fl" data-en="Full Name *" data-ar="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *">Full Name *</label><input class="inp" name="name" required></div>
          <div class="fg"><label class="fl" data-en="Email *" data-ar="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A *">Email *</label><input class="inp" type="email" name="email" required></div>
        </div>
        <div class="fr">
          <div class="fg"><label class="fl" data-en="Phone" data-ar="\u0627\u0644\u0647\u0627\u062A\u0641">Phone</label><input class="inp" name="phone"></div>
          <div class="fg"><label class="fl" data-en="Subject" data-ar="\u0627\u0644\u0645\u0648\u0636\u0648\u0639">Subject</label><select class="inp" name="subject"><option>General Inquiry</option><option>Room Booking</option><option>Partnership</option><option>Investment</option></select></div>
        </div>
        <div class="fg"><label class="fl" data-en="Message *" data-ar="\u0627\u0644\u0631\u0633\u0627\u0644\u0629 *">Message *</label><textarea class="inp" name="message" required></textarea></div>
        <button type="submit" class="btn btn-g" style="width:100%;justify-content:center" data-en="Send Message \u2709\uFE0F" data-ar="\u0623\u0631\u0633\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u2709\uFE0F">Send Message \u2709\uFE0F</button>
      </form>
    </div>
  </div>
</div></section>

<!-- FOOTER -->
<footer class="footer"><div class="wrap">
  <div class="footer-g">
    <div class="footer-b">
      <div class="nav-logo" style="margin-bottom:.4rem"><div class="nav-ico">\u{1F3E8}</div><div><div class="nav-txt">Mellissa Hotel</div><div class="nav-sub">by BrainSAIT</div></div></div>
      <p data-en="Riyadh's first AI-powered luxury hotel. Where Saudi heritage meets cutting-edge technology." data-ar="\u0623\u0648\u0644 \u0641\u0646\u062F\u0642 \u0641\u0627\u062E\u0631 \u0645\u062F\u0639\u0648\u0645 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636.">Riyadh's first AI-powered luxury hotel. Where Saudi heritage meets cutting-edge technology.</p>
    </div>
    <div><h4 data-en="Hotel" data-ar="\u0627\u0644\u0641\u0646\u062F\u0642">Hotel</h4><ul class="footer-links"><li><a href="#rooms" data-en="Rooms & Suites" data-ar="\u0627\u0644\u063A\u0631\u0641 \u0648\u0627\u0644\u0623\u062C\u0646\u062D\u0629">Rooms & Suites</a></li><li><a href="#amenities" data-en="Amenities" data-ar="\u0627\u0644\u0645\u0631\u0627\u0641\u0642">Amenities</a></li><li><a href="#" data-en="Dining" data-ar="\u0627\u0644\u0645\u0637\u0627\u0639\u0645">Dining</a></li><li><a href="#" data-en="Spa" data-ar="\u0627\u0644\u0633\u0628\u0627">Spa</a></li></ul></div>
    <div><h4 data-en="Explore" data-ar="\u0627\u0633\u062A\u0643\u0634\u0641">Explore</h4><ul class="footer-links"><li><a href="#blog" data-en="Blog" data-ar="\u0627\u0644\u0645\u062F\u0648\u0646\u0629">Blog</a></li><li><a href="#frameworks" data-en="Technology" data-ar="\u0627\u0644\u062A\u0642\u0646\u064A\u0629">Technology</a></li><li><a href="#market" data-en="KSA Market" data-ar="\u0627\u0644\u0633\u0648\u0642">KSA Market</a></li><li><a href="#faq" data-en="FAQ" data-ar="\u0627\u0644\u0623\u0633\u0626\u0644\u0629">FAQ</a></li></ul></div>
    <div><h4 data-en="Company" data-ar="\u0627\u0644\u0634\u0631\u0643\u0629">Company</h4><ul class="footer-links"><li><a href="#investors" data-en="Investors" data-ar="\u0627\u0644\u0645\u0633\u062A\u062B\u0645\u0631\u0648\u0646">Investors</a></li><li><a href="#team" data-en="Team" data-ar="\u0627\u0644\u0641\u0631\u064A\u0642">Team</a></li><li><a href="#contact" data-en="Contact" data-ar="\u062A\u0648\u0627\u0635\u0644">Contact</a></li></ul></div>
  </div>
  <div class="footer-bot">
    <p>\xA9 2026 Mellissa Hotel \u2014 A BrainSAIT Venture.</p>
    <p>Powered by \u26A1 Cloudflare Workers \xB7 \u{1F9E0} Workers AI \xB7 \u{1F5C4}\uFE0F D1</p>
  </div>
</div></footer>

<!-- BOOKING MODAL -->
<div class="modal-bg" id="bookModal">
<div class="modal">
  <div class="modal-hd"><h3 data-en="\u{1F4C5} Book Your Stay" data-ar="\u{1F4C5} \u0627\u062D\u062C\u0632 \u0625\u0642\u0627\u0645\u062A\u0643">\u{1F4C5} Book Your Stay</h3><button class="modal-x" onclick="closeBooking()">\xD7</button></div>
  <div class="modal-bd">
    <form id="bookForm" onsubmit="submitBooking(event)">
      <div class="fg"><label class="fl" data-en="Select Room *" data-ar="\u0627\u062E\u062A\u0631 \u0627\u0644\u063A\u0631\u0641\u0629 *">Select Room *</label><select class="inp" name="room_id" id="bookRoom" onchange="updateSum()" required><option value="">Choose...</option></select></div>
      <div class="fr">
        <div class="fg"><label class="fl" data-en="Check-in *" data-ar="\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062F\u062E\u0648\u0644 *">Check-in *</label><input class="inp" type="date" name="check_in" id="bookCI" onchange="updateSum()" required></div>
        <div class="fg"><label class="fl" data-en="Check-out *" data-ar="\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062E\u0631\u0648\u062C *">Check-out *</label><input class="inp" type="date" name="check_out" id="bookCO" onchange="updateSum()" required></div>
      </div>
      <div class="fr">
        <div class="fg"><label class="fl" data-en="Full Name *" data-ar="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *">Full Name *</label><input class="inp" name="guest_name" required></div>
        <div class="fg"><label class="fl" data-en="Email *" data-ar="\u0627\u0644\u0628\u0631\u064A\u062F *">Email *</label><input class="inp" type="email" name="guest_email" required></div>
      </div>
      <div class="fr">
        <div class="fg"><label class="fl" data-en="Phone" data-ar="\u0627\u0644\u0647\u0627\u062A\u0641">Phone</label><input class="inp" name="guest_phone"></div>
        <div class="fg"><label class="fl" data-en="Guests" data-ar="\u0627\u0644\u0636\u064A\u0648\u0641">Guests</label><select class="inp" name="guests"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></div>
      </div>
      <div class="fg"><label class="fl" data-en="Special Requests" data-ar="\u0637\u0644\u0628\u0627\u062A \u062E\u0627\u0635\u0629">Special Requests</label><textarea class="inp" name="special_requests" style="min-height:70px"></textarea></div>
      <div class="bk-sum" id="bkSum" style="display:none">
        <div class="bk-row"><span data-en="Room" data-ar="\u0627\u0644\u063A\u0631\u0641\u0629">Room</span><span id="sRoom">-</span></div>
        <div class="bk-row"><span data-en="Nights" data-ar="\u0627\u0644\u0644\u064A\u0627\u0644\u064A">Nights</span><span id="sNights">-</span></div>
        <div class="bk-row"><span data-en="Price/night" data-ar="\u0627\u0644\u0633\u0639\u0631/\u0644\u064A\u0644\u0629">Price/night</span><span id="sPrice">-</span></div>
        <div class="bk-row bk-total"><span data-en="Total" data-ar="\u0627\u0644\u0645\u062C\u0645\u0648\u0639">Total</span><span id="sTotal">-</span></div>
      </div>
      <button type="submit" class="btn btn-g" style="width:100%;justify-content:center" data-en="Confirm Booking \u{1F389}" data-ar="\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632 \u{1F389}">Confirm Booking \u{1F389}</button>
    </form>
  </div>
</div>
</div>

<!-- CHATBOT -->
<button class="chat-trig" onclick="toggleChat()" aria-label="AI Concierge">\u{1F916}</button>
<div class="chat-panel" id="chatPanel">
  <div class="chat-hd"><div class="chat-hd-i"><div class="chat-av">\u{1F916}</div><div class="chat-hd-t"><h4>Mellissa AI</h4><span data-en="Always online" data-ar="\u0645\u062A\u0635\u0644 \u062F\u0627\u0626\u0645\u0627\u064B">Always online</span></div></div><button class="chat-close" onclick="toggleChat()">\xD7</button></div>
  <div class="chat-msgs" id="chatMsgs"><div class="cmsg bot" data-en="Marhaba! \u{1F31F} I'm Mellissa, your AI concierge. How can I make your stay extraordinary?" data-ar="\u0645\u0631\u062D\u0628\u0627\u064B! \u{1F31F} \u0623\u0646\u0627 \u0645\u0644\u064A\u0633\u0627\u060C \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A. \u0643\u064A\u0641 \u0623\u062C\u0639\u0644 \u0625\u0642\u0627\u0645\u062A\u0643 \u0627\u0633\u062A\u062B\u0646\u0627\u0626\u064A\u0629\u061F">Marhaba! \u{1F31F} I'm Mellissa, your AI concierge. How can I make your stay extraordinary?</div></div>
  <div class="chat-inp"><input id="chatIn" placeholder="Ask me anything..." onkeypress="if(event.key==='Enter')sendChat()"><button class="chat-send" onclick="sendChat()">\u2192</button></div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<script><script><script>
// \u2550\u2550\u2550 I18N \u2550\u2550\u2550
let LANG='en';
const T={
  amenities:[
    {e:'\u{1F3CA}',en:'Outdoor Pool',ar:'\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629',enp:'Refreshing outdoor pool for all guests.',arp:'\u062D\u0645\u0627\u0645 \u0633\u0628\u0627\u062D\u0629 \u062E\u0627\u0631\u062C\u064A \u0645\u0646\u0639\u0634 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0636\u064A\u0648\u0641.'},
    {e:'\u{1F486}',en:'Spa & Wellness',ar:'\u0645\u0646\u062A\u062C\u0639 \u0635\u062D\u064A',enp:'Massage, hammam, and wellness treatments.',arp:'\u0645\u0633\u0627\u062C \u0648\u0647\u0627\u0645\u0627\u0645 \u0648\u0639\u0644\u0627\u062C\u0627\u062A \u0639\u0627\u0641\u064A\u0629.'},
    {e:'\u{1F4AA}',en:'Fitness Center',ar:'\u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629',enp:'Modern equipment for your workout.',arp:'\u0645\u0639\u062F\u0627\u062A \u062D\u062F\u064A\u062B\u0629 \u0644\u062A\u0645\u0627\u0631\u064A\u0646\u0643 \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0629.'},
    {e:'\u{1F37D}\uFE0F',en:'Restaurants',ar:'\u0645\u0637\u0627\u0639\u0645 \u0639\u0627\u0644\u0645\u064A\u0629',enp:'International cuisine with diverse flavors.',arp:'\u0645\u0637\u0628\u062E \u0639\u0627\u0644\u0645\u064A \u0628\u0646\u0643\u0647\u0627\u062A \u0645\u062A\u0646\u0648\u0639\u0629.'},
    {e:'\u{1F468}\u200D\u{1F4BB}',en:'Business Center',ar:'\u0645\u0631\u0627\u0641\u0642 \u0623\u0639\u0645\u0627\u0644',enp:'Fully equipped meeting rooms and workspace.',arp:'\u063A\u0631\u0641 \u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0645\u0646\u0637\u0642\u0629 \u0639\u0645\u0644 \u0645\u062C\u0647\u0632\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644.'},
    {e:'\u{1F9F8}',en:'Kids Club',ar:'\u0646\u0627\u062F\u064A \u0623\u0637\u0641\u0627\u0644',enp:'Supervised activities for ages 3\u201312.',arp:'\u0623\u0646\u0634\u0637\u0629 \u062A\u062D\u062A \u0625\u0634\u0631\u0627\u0641 \u0644\u0623\u0639\u0645\u0627\u0631 \u0663-\u0661\u0662.'},
    {e:'\u267F',en:'Accessible Rooms',ar:'\u063A\u0631\u0641 \u0630\u0648\u064A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A',enp:'Specially designed rooms for guests with special needs.',arp:'\u063A\u0631\u0641 \u0645\u0635\u0645\u0645\u0629 \u062E\u0635\u064A\u0635\u0627\u064B \u0644\u0630\u0648\u064A \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629.'},
    {e:'\u{1F697}',en:'Valet Parking',ar:'\u062E\u062F\u0645\u0629 \u0631\u0643\u0646',enp:'Complimentary parking for all guests.',arp:'\u062E\u062F\u0645\u0629 \u0631\u0643\u0646 \u0645\u062C\u0627\u0646\u064A\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0636\u064A\u0648\u0641.'},
  ],
  frameworks:[
    {e:'\u26A1',en:'Cloudflare Workers',ar:'\u0639\u0645\u0627\u0644 \u0643\u0644\u0627\u0648\u062F\u0641\u0644\u064A\u0631',enp:'Edge API in <50ms from 300+ locations.',arp:'\u0648\u0627\u062C\u0647\u0629 \u0628\u0631\u0645\u062C\u064A\u0629 \u0641\u064A \u0623\u0642\u0644 \u0645\u0646 \u0665\u0660 \u0645\u0644\u0644\u064A \u062B\u0627\u0646\u064A\u0629 \u0645\u0646 \u0663\u0660\u0660+ \u0645\u0648\u0642\u0639.'},
    {e:'\u{1F9E0}',en:'Workers AI',ar:'\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A',enp:'Llama 3.3 70B at the edge.',arp:'\u0644\u0627\u0645\u0627 \u0663.\u0663 \u0667\u0660 \u0645\u0644\u064A\u0627\u0631 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0629.'},
    {e:'\u{1F5C4}\uFE0F',en:'Cloudflare D1',ar:'\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A D1',enp:'SQLite edge database, globally distributed.',arp:'\u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A SQLite \u0645\u0648\u0632\u0639\u0629 \u0639\u0627\u0644\u0645\u064A\u0627\u064B.'},
    {e:'\u{1F4BE}',en:'Cloudflare KV',ar:'\u0645\u062E\u0632\u0646 KV',enp:'Global key-value for sessions & cache.',arp:'\u0645\u0641\u062A\u0627\u062D-\u0642\u064A\u0645\u0629 \u0639\u0627\u0644\u0645\u064A \u0644\u0644\u062C\u0644\u0633\u0627\u062A \u0648\u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A.'},
    {e:'\u{1F510}',en:'Zero-Trust Security',ar:'\u0623\u0645\u0627\u0646 \u0628\u0644\u0627 \u062D\u062F\u0648\u062F',enp:'WAF, DDoS protection, SOC 2.',arp:'\u062C\u062F\u0627\u0631 \u062D\u0645\u0627\u064A\u0629\u060C \u062D\u0645\u0627\u064A\u0629 \u0645\u0646 \u0647\u062C\u0645\u0627\u062A DDoS.'},
    {e:'\u{1F4CA}',en:'Real-Time Analytics',ar:'\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0641\u0648\u0631\u064A\u0629',enp:'Sub-second query performance.',arp:'\u0623\u062F\u0627\u0621 \u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u062F\u0648\u0646 \u0627\u0644\u062B\u0627\u0646\u064A\u0629.'},
    {e:'\u{1F3A8}',en:'Modern Frontend',ar:'\u0648\u0627\u062C\u0647\u0629 \u0639\u0635\u0631\u064A\u0629',enp:'Glassmorphism, animations, responsive.',arp:'\u062A\u0635\u0645\u064A\u0645 \u0632\u062C\u0627\u062C\u064A\u060C \u062D\u0631\u0643\u0627\u062A\u060C \u0645\u062A\u062C\u0627\u0648\u0628.'},
    {e:'\u{1F30D}',en:'Multi-Language',ar:'\u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0644\u063A\u0627\u062A',enp:'Arabic & English with RTL.',arp:'\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 \u0645\u0639 \u062F\u0639\u0645 RTL.'},
    {e:'\u{1F4B3}',en:'Payment Ready',ar:'\u0645\u062F\u0641\u0648\u0639\u0627\u062A \u062C\u0627\u0647\u0632\u0629',enp:'Stripe + Apple Pay + mada.',arp:'\u0633\u062A\u0631\u0627\u064A\u0628 + \u0622\u0628\u0644 \u0628\u0627\u064A + \u0645\u062F\u0649.'},
  ],
  dash:[
    {e:'\u{1F1F8}\u{1F1E6}',n:'$110B',en:'Tourism Market (2030)',ar:'\u0633\u0648\u0642 \u0627\u0644\u0633\u064A\u0627\u062D\u0629 (\u0662\u0660\u0663\u0660)',t:'\u2191 22% CAGR'},
    {e:'\u{1F3E8}',n:'150K',en:'New Hotel Rooms',ar:'\u063A\u0631\u0641 \u0641\u0646\u062F\u0642\u064A\u0629 \u062C\u062F\u064A\u062F\u0629',t:'\u2191 35% from 2024'},
    {e:'\u2708\uFE0F',n:'100M',en:'Annual Visitors Target',ar:'\u0632\u0648\u0627\u0631 \u0633\u0646\u0648\u064A\u0648\u0646',t:'Vision 2030'},
    {e:'\u{1F4B0}',n:'$800',en:'Avg. RevPAR (Riyadh)',ar:'\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0625\u064A\u0631\u0627\u062F (\u0627\u0644\u0631\u064A\u0627\u0636)',t:'\u2191 18% YoY'},
    {e:'\u{1F4C8}',n:'72%',en:'Occupancy Rate',ar:'\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u0634\u063A\u0627\u0644',t:'\u2191 8% from 2023'},
    {e:'\u{1F916}',n:'92%',en:'Prefer AI Concierge',ar:'\u064A\u0641\u0636\u0644\u0648\u0646 \u0627\u0644\u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0627\u0644\u0630\u0643\u064A',t:'Survey 2025'},
  ],
  pitchM:[
    {n:'SAR 15M',en:'<strong>Seed Round</strong><br>18-month runway to profitability',ar:'<strong>\u062C\u0648\u0644\u0629 \u0628\u0630\u0631\u064A\u0629</strong><br>\u0661\u0668 \u0634\u0647\u0631\u0627\u064B \u0644\u0644\u0631\u0628\u062D\u064A\u0629'},
    {n:'3.2x',en:'<strong>Projected ROI</strong><br>3-year conservative return',ar:'<strong>\u0639\u0627\u0626\u062F \u0645\u062A\u0648\u0642\u0639</strong><br>\u0639\u0627\u0626\u062F \u0645\u062D\u0627\u0641\u0638 \u0663 \u0633\u0646\u0648\u0627\u062A'},
    {n:'14 mo',en:'<strong>Break-Even</strong><br>AI reduces time by 60%',ar:'<strong>\u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u0648\u0627\u0632\u0646</strong><br>\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u064A\u0642\u0644\u0644 \u0627\u0644\u0648\u0642\u062A \u0666\u0660\u066A'},
    {n:'40%',en:'<strong>Cost Savings</strong><br>Edge AI eliminates infra costs',ar:'<strong>\u062A\u0648\u0641\u064A\u0631 \u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641</strong><br>\u0627\u0644\u0630\u0643\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0629 \u064A\u0644\u063A\u064A \u062A\u0643\u0627\u0644\u064A\u0641 \u0627\u0644\u0628\u0646\u064A\u0629'},
  ],
  pitchH:[
    {en:'<h4 style="color:var(--gold);margin-bottom:.4rem">Market Timing</h4><p style="color:var(--t2);font-size:.88rem">$110B projected market by 2030. Early movers capture outsized returns.</p>',ar:'<h4 style="color:var(--gold);margin-bottom:.4rem">\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0633\u0648\u0642</h4><p style="color:var(--t2);font-size:.88rem">\u0633\u0648\u0642 \u0628\u0642\u064A\u0645\u0629 \u0661\u0661\u0660 \u0645\u0644\u064A\u0627\u0631 \u062F\u0648\u0644\u0627\u0631 \u0628\u062D\u0644\u0648\u0644 \u0662\u0660\u0663\u0660. \u0627\u0644\u0645\u0633\u062A\u062B\u0645\u0631\u0648\u0646 \u0627\u0644\u0623\u0648\u0627\u0626\u0644 \u064A\u062D\u0635\u0644\u0648\u0646 \u0639\u0644\u0649 \u0639\u0648\u0627\u0626\u062F \u0643\u0628\u064A\u0631\u0629.</p>'},
    {en:'<h4 style="color:var(--gold);margin-bottom:.4rem">Technology Moat</h4><p style="color:var(--t2);font-size:.88rem">Proprietary AI on Cloudflare edge. Sub-50ms globally. Zero infra management.</p>',ar:'<h4 style="color:var(--gold);margin-bottom:.4rem">\u062D\u0635\u0646 \u062A\u0642\u0646\u064A</h4><p style="color:var(--t2);font-size:.88rem">\u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u062E\u0627\u0635 \u0639\u0644\u0649 \u062D\u0627\u0641\u0629 \u0643\u0644\u0627\u0648\u062F\u0641\u0644\u064A\u0631. \u0623\u0642\u0644 \u0645\u0646 \u0665\u0660 \u0645\u0644\u0644\u064A \u062B\u0627\u0646\u064A\u0629 \u0639\u0627\u0644\u0645\u064A\u0627\u064B.</p>'},
    {en:'<h4 style="color:var(--gold);margin-bottom:.4rem">Scalable Architecture</h4><p style="color:var(--t2);font-size:.88rem">Single codebase scales 1\u2192100+ hotels. Pay-as-you-go = zero upfront cost.</p>',ar:'<h4 style="color:var(--gold);margin-bottom:.4rem">\u0628\u0646\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0648\u0633\u0639</h4><p style="color:var(--t2);font-size:.88rem">\u0643\u0648\u062F \u0648\u0627\u062D\u062F \u064A\u062A\u0648\u0633\u0639 \u0645\u0646 \u0641\u0646\u062F\u0642 \u0648\u0627\u062D\u062F \u0625\u0644\u0649 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0661\u0660\u0660. \u0627\u062F\u0641\u0639 \u0643\u0645\u0627 \u062A\u0633\u062A\u062E\u062F\u0645.</p>'},
  ],
  team:[
    {e:'\u{1F468}\u200D\u{1F4BC}',en:'Abdulrahman Elfadil',ar:'\u0639\u0628\u062F\u0627\u0644\u0631\u062D\u0645\u0646 \u0627\u0644\u0641\u0627\u0636\u0644',enr:'Founder & CEO',arr:'\u0627\u0644\u0645\u0624\u0633\u0633 \u0648\u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A',enp:'Visionary entrepreneur. BrainSAIT founder.',arp:'\u0631\u0627\u0626\u062F \u0623\u0639\u0645\u0627\u0644 \u0631\u0624\u0648\u064A. \u0645\u0624\u0633\u0633 \u0628\u0631\u064A\u0646 \u0633\u0627\u064A\u062A.'},
    {e:'\u{1F469}\u200D\u{1F4BB}',en:'Fatima Al-Rashidi',ar:'\u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u0631\u0634\u064A\u062F\u064A',enr:'CTO',arr:'\u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0646\u064A',enp:'Cloudflare-certified architect. 50M+ req/mo.',arp:'\u0645\u0647\u0646\u062F\u0633\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0645\u0646 \u0643\u0644\u0627\u0648\u062F\u0641\u0644\u064A\u0631. \u0623\u0643\u062B\u0631 \u0645\u0646 \u0665\u0660 \u0645\u0644\u064A\u0648\u0646 \u0637\u0644\u0628 \u0634\u0647\u0631\u064A\u0627\u064B.'},
    {e:'\u{1F468}\u200D\u{1F373}',en:'Chef Omar Hassan',ar:'\u0627\u0644\u0634\u064A\u0641 \u0639\u0645\u0631 \u062D\u0633\u0646',enr:'Head of F&B',arr:'\u0631\u0626\u064A\u0633 \u0627\u0644\u0623\u063A\u0630\u064A\u0629 \u0648\u0627\u0644\u0645\u0634\u0631\u0648\u0628\u0627\u062A',enp:'Michelin-starred. Fusion Arabic cuisine.',arp:'\u0646\u062C\u0645\u0629 \u0645\u064A\u0634\u0644\u0627\u0646. \u0645\u0637\u0628\u062E \u0639\u0631\u0628\u064A \u0627\u0628\u062A\u0643\u0627\u0631\u064A.'},
    {e:'\u{1F469}\u200D\u{1F4BC}',en:'Noura Al-Saud',ar:'\u0646\u0648\u0631\u0629 \u0622\u0644 \u0633\u0639\u0648\u062F',enr:'Head of Operations',arr:'\u0631\u0626\u064A\u0633 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A',enp:'Ex-Marriott director. Vision 2030 expert.',arp:'\u0645\u062F\u064A\u0631\u0629 \u0633\u0627\u0628\u0642\u0629 \u0641\u064A \u0645\u0627\u0631\u064A\u0648\u062A. \u062E\u0628\u064A\u0631\u0629 \u0631\u0624\u064A\u0629 \u0662\u0660\u0663\u0660.'},
  ],
  blog:[
    {e:'\u{1F3D7}\uFE0F',badge:'Vision 2030',badgear:'\u0631\u0624\u064A\u0629 \u0662\u0660\u0663\u0660',t:'5 min',en:'How AI Is Reshaping Saudi Arabia's $110B Hospitality Boom',ar:'\u0643\u064A\u0641 \u064A\u0639\u064A\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u062A\u0634\u0643\u064A\u0644 \u0627\u0632\u062F\u0647\u0627\u0631 \u0627\u0644\u0636\u064A\u0627\u0641\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A',enp:'AI-powered hotels like Mellissa lead the charge in redefining guest experiences.',arp:'\u0627\u0644\u0641\u0646\u0627\u062F\u0642 \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0645\u062B\u0644 \u0645\u0644\u064A\u0633\u0627 \u062A\u0642\u0648\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u0631\u064A\u0641 \u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0636\u064A\u0648\u0641.'},
    {e:'\u{1F916}',badge:'AI Tech',badgear:'\u062A\u0642\u0646\u064A\u0629 \u0630\u0643\u0627\u0621',t:'7 min',en:'Building an AI Concierge on Cloudflare Workers',ar:'\u0628\u0646\u0627\u0621 \u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0630\u0643\u064A \u0639\u0644\u0649 \u0639\u0645\u0627\u0644 \u0643\u0644\u0627\u0648\u062F\u0641\u0644\u064A\u0631',enp:'Llama 3.3 at the edge \u2014 sub-50ms multilingual concierge.',arp:'\u0644\u0627\u0645\u0627 \u0663.\u0663 \u0639\u0644\u0649 \u0627\u0644\u062D\u0627\u0641\u0629 \u2014 \u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0644\u063A\u0627\u062A \u0641\u064A \u0623\u0642\u0644 \u0645\u0646 \u0665\u0660 \u0645\u0644\u0644\u064A \u062B\u0627\u0646\u064A\u0629.'},
    {e:'\u{1F1F8}\u{1F1E6}',badge:'Travel',badgear:'\u0633\u0641\u0631',t:'4 min',en:'Top 10 Hidden Gems in Riyadh',ar:'\u0623\u0641\u0636\u0644 \u0661\u0660 \u0623\u0645\u0627\u0643\u0646 \u0645\u062E\u0641\u064A\u0629 \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636',enp:'Historical sites, desert landscapes, and cultural treasures.',arp:'\u0645\u0648\u0627\u0642\u0639 \u062A\u0627\u0631\u064A\u062E\u064A\u0629\u060C \u0645\u0646\u0627\u0638\u0631 \u0635\u062D\u0631\u0627\u0648\u064A\u0629\u060C \u0648\u0643\u0646\u0648\u0632 \u062B\u0642\u0627\u0641\u064A\u0629.'},
    {e:'\u{1F4CA}',badge:'Business',badgear:'\u0623\u0639\u0645\u0627\u0644',t:'6 min',en:'Why Edge Computing Is the Future of Hotel Tech',ar:'\u0644\u0645\u0627\u0630\u0627 \u0627\u0644\u062D\u0648\u0633\u0628\u0629 \u0627\u0644\u062D\u0627\u0641\u0629 \u0647\u064A \u0645\u0633\u062A\u0642\u0628\u0644 \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0641\u0646\u0627\u062F\u0642',enp:'Edge-first cuts costs by 40% while delivering 10x faster experiences.',arp:'\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062D\u0627\u0641\u0629 \u062A\u0642\u0644\u0644 \u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641 \u0664\u0660\u066A \u0645\u0639 \u062A\u0642\u062F\u064A\u0645 \u062A\u062C\u0627\u0631\u0628 \u0623\u0633\u0631\u0639 \u0661\u0660 \u0645\u0631\u0627\u062A.'},
    {e:'\u{1F37D}\uFE0F',badge:'Dining',badgear:'\u0645\u0637\u0627\u0639\u0645',t:'3 min',en:'Fusion Arabic Cuisine: Tradition Meets Innovation',ar:'\u0627\u0644\u0645\u0637\u0628\u062E \u0627\u0644\u0639\u0631\u0628\u064A \u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631\u064A: \u0627\u0644\u062A\u0644\u062A\u0642\u064A \u0627\u0644\u062A\u0642\u0644\u064A\u062F \u0628\u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631',enp:'How Saudi cuisine evolves with modern techniques.',arp:'\u0643\u064A\u0641 \u064A\u062A\u0637\u0648\u0631 \u0627\u0644\u0645\u0637\u0628\u062E \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0628\u062A\u0642\u0646\u064A\u0627\u062A \u062D\u062F\u064A\u062B\u0629.'},
    {e:'\u{1F4B3}',badge:'Fintech',badgear:'\u062A\u0642\u0646\u064A\u0629 \u0645\u0627\u0644\u064A\u0629',t:'5 min',en:'mada, Apple Pay & the Cashless Hotel',ar:'\u0645\u062F\u0649 \u0648\u0622\u0628\u0644 \u0628\u0627\u064A \u0648\u0627\u0644\u0641\u0646\u062F\u0642 \u0628\u062F\u0648\u0646 \u0646\u0642\u0648\u062F',enp:'KSA leads MENA in digital payments.',arp:'\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u062A\u0642\u0648\u062F \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u0641\u064A \u0627\u0644\u0645\u062F\u0641\u0648\u0639\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629.'},
  ],
  faq:[
    {enq:'What are the check-in and check-out times?',arq:'\u0645\u0627 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u0648\u0627\u0644\u062E\u0631\u0648\u062C\u061F',ena:'Check-in: 3:00 PM \xB7 Check-out: 12:00 PM. Early/late on request. Free luggage storage.',ara:'\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644: \u0663 \u0645\u0633\u0627\u0621\u064B \xB7 \u0627\u0644\u0645\u063A\u0627\u062F\u0631\u0629: \u0661\u0662 \u0638\u0647\u0631\u0627\u064B. \u062F\u062E\u0648\u0644 \u0645\u0628\u0643\u0631/\u062E\u0631\u0648\u062C \u0645\u062A\u0623\u062E\u0631 \u0639\u0646\u062F \u0627\u0644\u0637\u0644\u0628. \u062A\u062E\u0632\u064A\u0646 \u0623\u0645\u062A\u0639\u0629 \u0645\u062C\u0627\u0646\u064A.'},
    {enq:'Is breakfast included?',arq:'\u0647\u0644 \u0627\u0644\u0625\u0641\u0637\u0627\u0631 \u0645\u0634\u0645\u0648\u0644\u061F',ena:'Yes! Full international buffet at The Terrace (6AM\u201311AM). Suite guests get 24/7 room service breakfast.',ara:'\u0646\u0639\u0645! \u0628\u0648\u0641\u064A\u0647 \u0639\u0627\u0644\u0645\u064A \u0643\u0627\u0645\u0644 \u0641\u064A \u0627\u0644\u062A\u064A\u0631\u0627\u0633 (\u0666\u0635-\u0661\u0661\u0635). \u0636\u064A\u0648\u0641 \u0627\u0644\u0623\u062C\u0646\u062D\u0629 \u064A\u062D\u0635\u0644\u0648\u0646 \u0639\u0644\u0649 \u0625\u0641\u0637\u0627\u0631 \u062E\u062F\u0645\u0629 \u063A\u0631\u0641.'},
    {enq:'How does the AI concierge work?',arq:'\u0643\u064A\u0641 \u064A\u0639\u0645\u0644 \u0627\u0644\u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0627\u0644\u0630\u0643\u064A\u061F',ena:'Mellissa runs on Cloudflare Workers AI (Llama 3.3). Speaks Arabic, English, French. Sub-50ms responses, 24/7.',ara:'\u0645\u0644\u064A\u0633\u0627 \u062A\u0639\u0645\u0644 \u0639\u0644\u0649 \u0630\u0643\u0627\u0621 \u0643\u0644\u0627\u0648\u062F\u0641\u0644\u064A\u0631 (\u0644\u0627\u0645\u0627 \u0663.\u0663). \u062A\u062A\u062D\u062F\u062B \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 \u0648\u0627\u0644\u0641\u0631\u0646\u0633\u064A\u0629. \u0623\u0642\u0644 \u0645\u0646 \u0665\u0660 \u0645\u0644\u0644\u064A \u062B\u0627\u0646\u064A\u0629.'},
    {enq:'Do you accept mada and Apple Pay?',arq:'\u0647\u0644 \u062A\u0642\u0628\u0644\u0648\u0646 \u0645\u062F\u0649 \u0648\u0622\u0628\u0644 \u0628\u0627\u064A\u061F',ena:'Yes! mada, Visa, Mastercard, Apple Pay, Google Pay, STC Pay. PCI DSS compliant.',ara:'\u0646\u0639\u0645! \u0645\u062F\u0649\u060C \u0641\u064A\u0632\u0627\u060C \u0645\u0627\u0633\u062A\u0631\u0643\u0627\u0631\u062F\u060C \u0622\u0628\u0644 \u0628\u0627\u064A\u060C \u062C\u0648\u062C\u0644 \u0628\u0627\u064A\u060C STC Pay. \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 PCI DSS.'},
    {enq:'Is the hotel family-friendly?',arq:'\u0647\u0644 \u0627\u0644\u0641\u0646\u062F\u0642 \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A\u061F',ena:'Absolutely! Family Suites, Kids Club (3-12), children's menus, cribs, shallow pool section.',ara:'\u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F! \u0623\u062C\u0646\u062D\u0629 \u0639\u0627\u0626\u0644\u064A\u0629\u060C \u0646\u0627\u062F\u064A \u0623\u0637\u0641\u0627\u0644 (\u0663-\u0661\u0662)\u060C \u0642\u0648\u0627\u0626\u0645 \u0623\u0637\u0641\u0627\u0644\u060C \u0623\u0633\u0631\u0651\u0629 \u0623\u0637\u0641\u0627\u0644\u060C \u0645\u0646\u0637\u0642\u0629 \u062D\u0645\u0627\u0645 \u0636\u062D\u0644\u0629.'},
    {enq:'Cancellation policy?',arq:'\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0625\u0644\u063A\u0627\u0621\u061F',ena:'Free cancellation 48h before check-in (standard). 72h for suites. Peak season policies vary.',ara:'\u0625\u0644\u063A\u0627\u0621 \u0645\u062C\u0627\u0646\u064A \u0642\u0628\u0644 \u0664\u0668 \u0633\u0627\u0639\u0629 (\u0642\u064A\u0627\u0633\u064A). \u0667\u0662 \u0633\u0627\u0639\u0629 \u0644\u0644\u0623\u062C\u0646\u062D\u0629. \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0633\u0645 \u062A\u062E\u062A\u0644\u0641.'},
    {enq:'Airport transfers?',arq:'\u0646\u0642\u0644 \u0645\u0646 \u0627\u0644\u0645\u0637\u0627\u0631\u061F',ena:'Yes! Luxury transfers from RUH. Free for Royal Suite & Penthouse guests. SAR 150 standard.',ara:'\u0646\u0639\u0645! \u0646\u0642\u0644 \u0641\u0627\u062E\u0631 \u0645\u0646 \u0645\u0637\u0627\u0631 \u0627\u0644\u0645\u0644\u0643 \u062E\u0627\u0644\u062F. \u0645\u062C\u0627\u0646\u064A \u0644\u0636\u064A\u0648\u0641 \u0627\u0644\u062C\u0646\u0627\u062D \u0627\u0644\u0645\u0644\u0643\u064A \u0648\u0627\u0644\u0628\u0646\u062A\u0647\u0627\u0648\u0633. \u0661\u0665\u0660 \u0631\u064A\u0627\u0644 \u0639\u0627\u062F\u064A.'},
  ],
  whyR:{en:['Capital city \u2014 8M+ population','NEOM, The Line, Qiddiya mega-events','2034 FIFA World Cup host','Vision 2030 entertainment reform','Ghirnatah district \u2014 near King Fahd Road','King Salman Airport (2030)'],ar:['\u0645\u062F\u064A\u0646\u0629 \u0639\u0627\u0635\u0645\u0629 \u2014 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0668 \u0645\u0644\u064A\u0648\u0646 \u0646\u0633\u0645\u0629','\u0646\u064A\u0648\u0645\u060C \u0630\u0627 \u0644\u0627\u064A\u0646\u060C \u0642iddiya \u0623\u062D\u062F\u0627\u062B \u0636\u062E\u0645\u0629','\u0627\u0633\u062A\u0636\u0627\u0641\u0629 \u0643\u0623\u0633 \u0627\u0644\u0639\u0627\u0644\u0645 \u0662\u0660\u0663\u0664','\u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062A\u0631\u0641\u064A\u0647 \u0641\u064A \u0631\u0624\u064A\u0629 \u0662\u0660\u0663\u0660','\u062D\u064A \u063A\u0631\u0646\u0627\u0637\u0629 \u2014 \u0628\u0627\u0644\u0642\u0631\u0628 \u0645\u0646 \u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062F','\u0645\u0637\u0627\u0631 \u0627\u0644\u0645\u0644\u0643 \u0633\u0644\u0645\u0627\u0646 (\u0662\u0660\u0663\u0660)']},
  edge:{en:['First AI-native hotel in KSA','40% lower operational costs','3x faster booking','Real-time pricing & availability','Multilingual AI concierge','Vision 2030 aligned'],ar:['\u0623\u0648\u0644 \u0641\u0646\u062F\u0642 \u0630\u0643\u064A \u0641\u064A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629','\u062A\u0643\u0644\u0641\u0629 \u062A\u0634\u063A\u064A\u0644 \u0623\u0642\u0644 \u0664\u0660\u066A','\u062D\u062C\u0632 \u0623\u0633\u0631\u0639 \u0663 \u0645\u0631\u0627\u062A','\u0623\u0633\u0639\u0627\u0631 \u0648\u062A\u0648\u0641\u0631 \u0641\u0648\u0631\u064A','\u0643\u0648\u0646\u0633\u064A\u0631\u062C \u0630\u0643\u064A \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0644\u063A\u0627\u062A','\u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 \u0631\u0624\u064A\u0629 \u0662\u0660\u0663\u0660']},
};

// \u2550\u2550\u2550 ROOM DATA (fallback) \u2550\u2550\u2550
const FALLBACK_ROOMS=[
  {id:'rm-standard-006',name:'Standard Room',name_ar:'\u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629',type:'standard',description:'Comfortable 30sqm room.',description_ar:'\u063A\u0631\u0641\u0629 \u0645\u0631\u064A\u062D\u0629 \u0663\u0660 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B.',price_per_night:750,max_guests:2,amenities:['Double Bed','Shower','WiFi','TV'],amenities_ar:['\u0633\u0631\u064A\u0631 \u0645\u0632\u062F\u0648\u062C','\u062F\u0634','\u0648\u0627\u064A \u0641\u0627\u064A','\u062A\u0644\u0641\u0632\u064A\u0648\u0646'],rating:4.3},
  {id:'rm-deluxe-003',name:'Deluxe Room',name_ar:'\u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0641\u0627\u062E\u0631\u0629',type:'deluxe',description:'Stylish 40sqm room.',description_ar:'\u063A\u0631\u0641\u0629 \u0623\u0646\u064A\u0642\u0629 \u0664\u0660 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B.',price_per_night:1200,max_guests:2,amenities:['Queen Bed','City View','WiFi'],amenities_ar:['\u0633\u0631\u064A\u0631 \u0643\u0648\u064A\u0646','\u0625\u0637\u0644\u0627\u0644\u0629','\u0648\u0627\u064A \u0641\u0627\u064A'],rating:4.5},
  {id:'rm-exec-002',name:'Executive Room',name_ar:'\u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629',type:'executive',description:'55sqm business-ready.',description_ar:'\u063A\u0631\u0641\u0629 \u0623\u0639\u0645\u0627\u0644 \u0665\u0665 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B.',price_per_night:1800,max_guests:2,amenities:['Queen Bed','Desk','Nespresso'],amenities_ar:['\u0633\u0631\u064A\u0631 \u0643\u0648\u064A\u0646','\u0645\u0643\u062A\u0628','\u0646\u064A\u0633\u0628\u0631\u0633\u0648'],rating:4.7},
  {id:'rm-family-004',name:'Family Suite',name_ar:'\u062C\u0646\u0627\u062D \u0627\u0644\u0639\u0627\u0626\u0644\u0629',type:'suite',description:'85sqm for families.',description_ar:'\u062C\u0646\u0627\u062D \u0639\u0627\u0626\u0644\u064A \u0668\u0665 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B.',price_per_night:2800,max_guests:6,amenities:['2 Bedrooms','Kids Area','Kitchenette'],amenities_ar:['\u063A\u0631\u0641\u062A\u0627\u0646','\u0645\u0646\u0637\u0642\u0629 \u0623\u0637\u0641\u0627\u0644','\u0645\u0637\u0628\u062E'],rating:4.8},
  {id:'rm-royal-001',name:'Royal Suite',name_ar:'\u0627\u0644\u062C\u0646\u0627\u062D \u0627\u0644\u0645\u0644\u0643\u064A',type:'suite',description:'120sqm luxury.',description_ar:'\u0641\u062E\u0627\u0645\u0629 \u0661\u0662\u0660 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B.',price_per_night:3500,max_guests:4,amenities:['King Bed','Butler','Marble Bath'],amenities_ar:['\u0633\u0631\u064A\u0631 \u0643\u064A\u0646\u063A','\u062E\u062F\u0645\u0629','\u062D\u0645\u0627\u0645 \u0631\u062E\u0627\u0645\u064A'],rating:4.9},
  {id:'rm-penthouse-005',name:'Penthouse',name_ar:'\u0627\u0644\u0628\u0646\u062A\u0647\u0627\u0648\u0633',type:'penthouse',description:'200sqm duplex.',description_ar:'\u0628\u0646\u062A\u0647\u0627\u0648\u0633 \u0662\u0660\u0660 \u0645\u062A\u0631\u0627\u064B \u0645\u0631\u0628\u0639\u0627\u064B.',price_per_night:8500,max_guests:6,amenities:['Terrace','Jacuzzi','Cinema'],amenities_ar:['\u062A\u0631\u0627\u0633','\u062C\u0627\u0643\u0648\u0632\u064A','\u0633\u064A\u0646\u0645\u0627'],rating:5.0},
];

// \u2550\u2550\u2550 STATE \u2550\u2550\u2550
let rooms=[],chatSid=null;
const API=location.origin+'/api';
const L=()=>LANG;

// \u2550\u2550\u2550 INIT \u2550\u2550\u2550
document.addEventListener('DOMContentLoaded',()=>{
  loadRooms();renderAmenities();renderFrameworks();renderDashboard();
  renderPitch();renderTeam();renderBlog();renderFAQ();renderGlossary();
  renderWhyRiyadh();renderEdge();
  setupScroll();setupNav();setDates();
  // Restore lang
  const saved=localStorage.getItem('mellissa_lang');
  if(saved)switchLang(saved);
});

// \u2550\u2550\u2550 ROOMS \u2550\u2550\u2550
async function loadRooms(){
  try{var r=await fetch(API+'/rooms');rooms=await r.json();if(!Array.isArray(rooms))rooms=FALLBACK_ROOMS;}catch(e){rooms=FALLBACK_ROOMS;}
  renderRooms();populateSelect();
}
const ROOM_EMOJI={standard:'\u{1F6CF}\uFE0F',deluxe:'\u2728',executive:'\u{1F4BC}',suite:'\u{1F451}',penthouse:'\u{1F3F0}'};

function renderRooms(){
  var g=document.getElementById('roomsGrid');if(!g)return;
  var h='';
  for(var i=0;i<rooms.length;i++){
    var r=rooms[i];
    var em=ROOM_EMOJI[r.type]||'\u{1F3E8}';
    var am=Array.isArray(r.amenities)?r.amenities.slice(0,4):[];
    var name=L()==='ar'&&r.name_ar?r.name_ar:r.name;
    var desc=L()==='ar'&&r.description_ar?r.description_ar:r.description;
    var priceTag=L()==='ar'?'\u0644\u064A\u0644\u0629':'night';
    h+='<div class="card room-card"><div class="room-img">'+em+'<div class="room-price">SAR '+r.price_per_night.toLocaleString()+'/'+priceTag+'</div></div>';
    h+='<div class="room-body"><div class="room-type">'+r.type+'</div><div class="room-name">'+name+'</div>';
    h+='<div class="room-desc">'+desc+'</div><div class="room-tags">';
    for(var j=0;j<am.length;j++) h+='<span class="room-tag">'+am[j]+'</span>';
    h+='</div><div class="room-foot"><div class="room-rating">\u2B50 '+(r.rating||4.5)+'</div>';
    h+='<div class="room-guests">\u{1F465} '+r.max_guests+'</div></div>';
    h+='<button class="btn btn-g" style="width:100%;margin-top:1rem;justify-content:center" onclick="openBooking(''+r.id+'')">'+(L()==='ar'?'\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646':'Book Now')+'</button>';
    h+='</div></div>';
  }
  g.innerHTML=h;
  setupScroll();
}

function renderAmenities(){
  var g=document.getElementById('amenGrid');if(!g)return;
  var h='';
  for(var i=0;i<T.amenities.length;i++){
    var a=T.amenities[i];
    h+='<div class="card" style="text-align:center"><div style="font-size:2.2rem;margin-bottom:.8rem">'+a.e+'</div>';
    h+='<h4>'+(L()==='ar'?a.ar:a.en)+'</h4>';
    h+='<p style="color:var(--t2);font-size:.88rem">'+(L()==='ar'?a.arp:a.enp)+'</p></div>';
  }
  g.innerHTML=h;
}

function renderFrameworks(){
  var g=document.getElementById('fwGrid');if(!g)return;
  var h='';
  for(var i=0;i<T.frameworks.length;i++){
    var f=T.frameworks[i];
    h+='<div class="card fw-card"><div class="fw-ico">'+f.e+'</div>';
    h+='<h4>'+(L()==='ar'?f.ar:f.en)+'</h4>';
    h+='<p>'+(L()==='ar'?f.arp:f.enp)+'</p></div>';
  }
  g.innerHTML=h;
}

function renderDashboard(){
  var g=document.getElementById('dashGrid');if(!g)return;
  var h='';
  for(var i=0;i<T.dash.length;i++){
    var d=T.dash[i];
    h+='<div class="card stat-c"><div class="stat-ico">'+d.e+'</div>';
    h+='<div class="stat-n">'+d.n+'</div>';
    h+='<div class="stat-l">'+(L()==='ar'?d.ar:d.en)+'</div>';
    h+='<div class="stat-t">'+d.t+'</div></div>';
  }
  g.innerHTML=h;
}

function renderPitch(){
  var m=document.getElementById('pitchMetrics'),h=document.getElementById('pitchHighlights');if(!m||!h)return;
  var mh='';
  for(var i=0;i<T.pitchM.length;i++){
    var p=T.pitchM[i];
    mh+='<div class="pitch-m"><div class="pitch-m-n">'+p.n+'</div>';
    mh+='<div class="pitch-m-l">'+(L()==='ar'?p.ar:p.en)+'</div></div>';
  }
  m.innerHTML=mh;
  var hh='';
  for(var i=0;i<T.pitchH.length;i++){
    hh+='<div style="margin-bottom:1.3rem">'+(L()==='ar'?T.pitchH[i].ar:T.pitchH[i].en)+'</div>';
  }
  h.innerHTML=hh;
}

function renderTeam(){
  var g=document.getElementById('teamGrid');if(!g)return;
  var h='';
  for(var i=0;i<T.team.length;i++){
    var t=T.team[i];
    h+='<div class="card team-c"><div class="team-av">'+t.e+'</div>';
    h+='<h4>'+(L()==='ar'?t.ar:t.en)+'</h4>';
    h+='<div class="team-r">'+(L()==='ar'?t.arr:t.enr)+'</div>';
    h+='<p>'+(L()==='ar'?t.arp:t.enp)+'</p></div>';
  }
  g.innerHTML=h;
}

function renderBlog(){
  var g=document.getElementById('blogGrid');if(!g)return;
  var h='';
  for(var i=0;i<T.blog.length;i++){
    var b=T.blog[i];
    h+='<div class="card blog-card"><div class="blog-img">'+b.e+'</div>';
    h+='<div class="blog-body"><div class="blog-meta"><span class="badge badge-g">'+(L()==='ar'?b.badgear:b.badge)+'</span>';
    h+='<span>'+b.t+'</span></div>';
    h+='<h3>'+(L()==='ar'?b.ar:b.en)+'</h3>';
    h+='<p>'+(L()==='ar'?b.arp:b.enp)+'</p></div></div>';
  }
  g.innerHTML=h;
}

function renderFAQ(){
  var g=document.getElementById('faqList');if(!g)return;
  var h='';
  for(var i=0;i<T.faq.length;i++){
    var f=T.faq[i];
    h+='<div class="faq"><button class="faq-q" onclick="this.parentElement.classList.toggle('open')">';
    h+=(L()==='ar'?f.arq:f.enq)+'<span class="faq-ico">+</span></button>';
    h+='<div class="faq-a"><div class="faq-a-i">'+(L()==='ar'?f.ara:f.ena)+'</div></div></div>';
  }
  g.innerHTML=h;
}

function renderGlossary(){
  var g=document.getElementById('glossGrid');if(!g)return;
  var items=[
    {t:'RevPAR',d:'Revenue Per Available Room \u2014 key hotel metric.'},
    {t:'ADR',d:'Average Daily Rate per occupied room.'},
    {t:'Edge Computing',d:'Processing at 300+ global locations. Sub-50ms.'},
    {t:'Vision 2030',d:'Saudi framework: 100M visitors, $110B tourism.'},
    {t:'Workers AI',d:'Cloudflare serverless ML inference at the edge.'},
    {t:'D1',d:'SQLite-based serverless edge database.'},
    {t:'mada',d:'Saudi national payment network. 30M+ cards.'},
    {t:'Hammam',d:'Traditional steam bath ritual.'},
    {t:'PCI DSS',d:'Payment card security standard.'},
    {t:'NEOM',d:'Saudi $500B mega-project.'}
  ];
  var h='';
  for(var i=0;i<items.length;i++){
    h+='<div class="card gloss-i"><div class="gloss-t">'+items[i].t+'</div>';
    h+='<div class="gloss-d">'+items[i].d+'</div></div>';
  }
  g.innerHTML=h;
}

function renderWhyRiyadh(){
  var g=document.getElementById('whyRiyadh');if(!g)return;
  var items=L()==='ar'?T.whyR.ar:T.whyR.en;
  var h='';
  for(var i=0;i<items.length;i++) h+='<li>\u2705 '+items[i]+'</li>';
  g.innerHTML=h;
}

function renderEdge(){
  var g=document.getElementById('edgeList');if(!g)return;
  var items=L()==='ar'?T.edge.ar:T.edge.en;
  var h='';
  for(var i=0;i<items.length;i++) h+='<li>\u2705 '+items[i]+'</li>';
  g.innerHTML=h;
}

function populateSelect(){
  var s=document.getElementById('bookRoom');if(!s)return;
  var h='<option value="">'+(L()==='ar'?'\u0627\u062E\u062A\u0631 \u063A\u0631\u0641\u0629...':'Choose a room...')+'</option>';
  for(var i=0;i<rooms.length;i++){
    var r=rooms[i];
    h+='<option value="'+r.id+'">'+(L()==='ar'&&r.name_ar?r.name_ar:r.name)+' \u2014 SAR '+r.price_per_night.toLocaleString()+'</option>';
  }
  s.innerHTML=h;
}


// \u2550\u2550\u2550 RENDER SECTIONS \u2550\u2550\u2550
function renderAmenities(){
  const g=document.getElementById('amenGrid');if(!g)return;
function renderFrameworks(){
  const g=document.getElementById('fwGrid');if(!g)return;
function renderDashboard(){
  const g=document.getElementById('dashGrid');if(!g)return;
function renderPitch(){
  const m=document.getElementById('pitchMetrics'),h=document.getElementById('pitchHighlights');if(!m||!h)return;
function renderTeam(){
  const g=document.getElementById('teamGrid');if(!g)return;
function renderBlog(){
  const g=document.getElementById('blogGrid');if(!g)return;
function renderFAQ(){
  const g=document.getElementById('faqList');if(!g)return;
function renderGlossary(){
  const g=document.getElementById('glossGrid');if(!g)return;
  const items=[
    {t:'RevPAR',d:'Revenue Per Available Room \u2014 key hotel metric.'},
    {t:'ADR',d:'Average Daily Rate per occupied room.'},
    {t:'Edge Computing',d:'Processing at 300+ global locations. Sub-50ms.'},
    {t:'Vision 2030',d:'Saudi framework: 100M visitors, $110B tourism.'},
    {t:'Workers AI',d:'Cloudflare serverless ML inference at the edge.'},
    {t:'D1',d:'SQLite-based serverless edge database.'},
    {t:'mada',d:'Saudi national payment network. 30M+ cards.'},
    {t:'Hammam',d:'Traditional steam bath ritual.'},
    {t:'PCI DSS',d:'Payment card security standard.'},
    {t:'NEOM',d:'Saudi $500B mega-project.'},
  ];
function renderWhyRiyadh(){
  const g=document.getElementById('whyRiyadh');if(!g)return;
  const items=L()==='ar'?T.whyR.ar:T.whyR.en;
  g.innerHTML=items.map(i=>'<li>\u2705 '+i+'</li>').join('');
}
function renderEdge(){
  const g=document.getElementById('edgeList');if(!g)return;
  const items=L()==='ar'?T.edge.ar:T.edge.en;
  g.innerHTML=items.map(i=>'<li>\u2705 '+i+'</li>').join('');
}

// \u2550\u2550\u2550 LANGUAGE \u2550\u2550\u2550
function toggleLang(){switchLang(L()==='ar'?'en':'ar')}
function switchLang(lang){
  LANG=lang;localStorage.setItem('mellissa_lang',lang);
  document.documentElement.lang=lang==='ar'?'ar':'en';
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  // Update all data-en/data-ar elements
  document.querySelectorAll('[data-en]').forEach(el=>{
    const txt=el.getAttribute('data-'+lang);
    if(txt)el.textContent=txt;
  });
  // Re-render dynamic sections
  renderRooms();renderAmenities();renderFrameworks();renderDashboard();
  renderPitch();renderTeam();renderBlog();renderFAQ();renderGlossary();
  renderWhyRiyadh();renderEdge();populateSelect();
  // Update chat input placeholder
  const ci=document.getElementById('chatIn');
  if(ci)ci.placeholder=lang==='ar'?'\u0627\u0633\u0623\u0644\u0646\u064A \u0623\u064A \u0634\u064A\u0621...':'Ask me anything...';
}

// \u2550\u2550\u2550 BOOKING \u2550\u2550\u2550
function openBooking(rid){document.getElementById('bookModal').classList.add('open');if(rid)document.getElementById('bookRoom').value=rid;updateSum();document.body.style.overflow='hidden'}
function closeBooking(){document.getElementById('bookModal').classList.remove('open');document.body.style.overflow=''}
function setDates(){const t=new Date().toISOString().split('T')[0];const ci=document.getElementById('bookCI');const co=document.getElementById('bookCO');if(ci)ci.min=t;if(co)co.min=t}
function updateSum(){
  const rid=document.getElementById('bookRoom').value,ci=document.getElementById('bookCI').value,co=document.getElementById('bookCO').value,s=document.getElementById('bkSum');
  if(!rid||!ci||!co){s.style.display='none';return}
  const r=rooms.find(x=>x.id===rid);if(!r)return;
  const n=Math.ceil((new Date(co)-new Date(ci))/864e5);if(n<1){s.style.display='none';return}
  document.getElementById('sRoom').textContent=L()==='ar'&&r.name_ar?r.name_ar:r.name;
  document.getElementById('sNights').textContent=n;
  document.getElementById('sPrice').textContent='SAR '+r.price_per_night.toLocaleString();
  document.getElementById('sTotal').textContent='SAR '+(r.price_per_night*n).toLocaleString();
  s.style.display='block';
}
async function submitBooking(e){
  e.preventDefault();const fd=new FormData(e.target);const d=Object.fromEntries(fd);d.lang=LANG;
  try{const r=await fetch(API+'/bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});const res=await r.json();
  if(r.ok){toast((L()==='ar'?'\u2705 \u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632! ID: ':'\u2705 Booking confirmed! ID: ')+res.booking.id);closeBooking();e.target.reset();}
  else toast(res.message||'Failed',true);}catch{toast('Network error',true);}
}

// \u2550\u2550\u2550 CONTACT \u2550\u2550\u2550
async function submitContact(e){
  e.preventDefault();const fd=new FormData(e.target);const d=Object.fromEntries(fd);
  try{const r=await fetch(API+'/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});const res=await r.json();
  if(r.ok){toast('\u2705 '+res.message);e.target.reset();}else toast(res.message||'Failed',true);}catch{toast('Network error',true);}
}

// \u2550\u2550\u2550 CHAT \u2550\u2550\u2550
function toggleChat(){document.getElementById('chatPanel').classList.toggle('open')}
async function sendChat(){
  const inp=document.getElementById('chatIn'),msg=inp.value.trim();if(!msg)return;inp.value='';
  appendMsg(msg,'user');const typing=appendMsg(L()==='ar'?'...\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0641\u0643\u064A\u0631':'Thinking...','bot');
  try{const r=await fetch(API+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,sessionId:chatSid,lang:LANG})});
  const d=await r.json();chatSid=d.sessionId;typing.remove();appendMsg(d.reply,'bot');}catch{typing.remove();appendMsg(L()==='ar'?'\u0639\u0630\u0631\u0627\u064B\u060C \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.':'Sorry, please try again.','bot');}
}
function appendMsg(t,cls){const el=document.createElement('div');el.className='cmsg '+cls;el.textContent=t;document.getElementById('chatMsgs').appendChild(el);el.scrollIntoView({behavior:'smooth'});return el}

// \u2550\u2550\u2550 UTILS \u2550\u2550\u2550
function scrollTo(s){document.querySelector(s)?.scrollIntoView({behavior:'smooth'})}
function setupNav(){const n=document.getElementById('nav');window.addEventListener('scroll',()=>n.classList.toggle('scrolled',scrollY>50))}
function setupScroll(){const o=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis')}),{threshold:.1});document.querySelectorAll('.aos').forEach(el=>o.observe(el))}
function toast(m,e){const t=document.getElementById('toast');t.textContent=m;t.className='toast show'+(e?' err':'');setTimeout(()=>t.className='toast',4e3)}
document.getElementById('bookModal')?.addEventListener('click',function(e){if(e.target===this)closeBooking()});
<\/script><\/script><\/script>
</body>
</html>`;
export {
  worker_default as default
};
