var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../node_modules/unenv/dist/runtime/_internal/utils.mjs
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

// ../../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
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

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
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

// ../../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../node_modules/unenv/dist/runtime/node/console.mjs
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

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
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

// ../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
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

// ../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
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

// ../../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
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

// ../../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
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

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
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

// ../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/html.js
var bsmaHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="theme-color" content="#080b14">
<meta name="description" content="BasmaGuist Medical \u2014 AI Healthcare Assistant for Hayat National Hospitals">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>BasmaGuist Medical AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%A4%96%3C/text%3E%3C/svg%3E">
<style>
/* BASMA AI v3.0 Enhanced */
:root{--rose:#e8528d;--rl:rgba(232,82,141,.12);--rg:rgba(232,82,141,.25);--purple:#9333ea;--pl:rgba(147,51,234,.12);--blue:#3b82f6;--bl:rgba(59,130,246,.12);--teal:#14b8a6;--tl:rgba(20,184,166,.12);--p:var(--rose);--succ:#10b981;--sl:rgba(16,185,129,.12);--err:#ef4444;--el:rgba(239,68,68,.12);--warn:#f59e0b;--wl:rgba(245,158,11,.12);--info:#06b6d4;--il:rgba(6,182,212,.12);--bg:#080b14;--s1:rgba(17,24,39,.7);--s2:rgba(26,34,53,.6);--cd:rgba(30,41,59,.5);--inp:rgba(31,41,55,.8);--gl:rgba(17,24,39,.4);--bd:rgba(55,65,81,.5);--tx:#f1f5f9;--tm:#94a3b8;--td:#64748b;--r:14px;--rs:10px;--rx:6px;--sh:0 4px 24px rgba(0,0,0,.35);--shl:0 8px 40px rgba(0,0,0,.45);--gr:0 0 20px rgba(232,82,141,.15);--gb:16px;--gbd:1px solid rgba(255,255,255,.06)}
*,:after,:before{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px}
body{font-family:'Noto Sans Arabic',-apple-system,sans-serif;background:var(--bg);color:var(--tx);min-height:100dvh;display:flex;flex-direction:column}
body::before{content:'';position:fixed;inset:0;z-index:-1;background:radial-gradient(ellipse 600px 400px at 20% 20%,rgba(232,82,141,.06),transparent),radial-gradient(ellipse 500px 500px at 80% 80%,rgba(147,51,234,.05),transparent),radial-gradient(ellipse 400px 300px at 50% 50%,rgba(59,130,246,.04),transparent);pointer-events:none}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:0 0}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:3px}
header{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border-bottom:var(--gbd);display:flex;align-items:center;height:60px;flex-shrink:0;gap:12px;position:sticky;top:0;z-index:100;padding:0 20px}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logo-ic{width:38px;height:38px;background:linear-gradient(135deg,var(--rose),var(--purple));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:var(--gr)}
.logo-tx{font-weight:700;font-size:1.05rem;white-space:nowrap}
.logo-sub{color:var(--tm);font-size:.75rem}
.hdr-s{flex:1}
.lb{display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;background:var(--sl);color:var(--succ);font-size:.7rem;font-weight:600;white-space:nowrap}
.lb::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--succ);animation:lp 2s infinite}
@keyframes lp{0%,100%{opacity:1}50%{opacity:.3}}
.hc{display:flex;gap:3px;overflow-x:auto;scrollbar-width:none;flex:1;justify-content:center}
.hc::-webkit-scrollbar{display:none}
.hc-btn{padding:5px 12px;border-radius:16px;font-size:.78rem;background:var(--inp);border:1px solid var(--bd);color:var(--tm);cursor:pointer;transition:all .25s;white-space:nowrap;font-family:inherit}
.hc-btn:hover{border-color:var(--p);color:#fff}
.hc-btn.on{background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;border-color:transparent;box-shadow:var(--gr)}
.hdr-btn{background:var(--inp);border:1px solid var(--bd);color:var(--tm);padding:7px 12px;border-radius:var(--rx);cursor:pointer;font-size:.82rem;transition:all .2s;display:flex;align-items:center;gap:5px;white-space:nowrap;font-family:inherit}
.hdr-btn:hover{border-color:var(--p);color:#fff;box-shadow:var(--gr)}
.tabs{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border-bottom:var(--gbd);display:flex;overflow-x:auto;flex-shrink:0;scrollbar-width:none}
.tab{font-size:.8rem;color:var(--tm);background:0 0;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:all .25s;white-space:nowrap;display:flex;align-items:center;gap:4px;flex-shrink:0;font-family:inherit;padding:11px 12px}
.tab:hover{color:var(--tx);background:rgba(255,255,255,.02)}
.tab.on{color:var(--p);border-bottom-color:var(--p)}
.tab.on::after{content:'';position:absolute;bottom:-1px;left:20%;right:20%;height:2px;background:linear-gradient(90deg,var(--rose),var(--purple));border-radius:1px;display:none}
main{flex:1;display:flex;overflow:hidden}
.pn{display:none;flex:1;overflow-y:auto;padding:20px;animation:pi .3s ease-out}
.pn.on{display:block}
@keyframes pi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:20px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
.sc{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border:var(--gbd);border-radius:var(--r);padding:18px;transition:all .3s;position:relative;overflow:hidden}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--rose),var(--purple));opacity:0;transition:opacity .3s}
.sc:hover{transform:translateY(-3px);box-shadow:var(--shl);border-color:rgba(232,82,141,.15)}
.sc:hover::before{opacity:1}
.sc-i{font-size:1.8rem;margin-bottom:6px}
.sc-l{color:var(--tm);font-size:.8rem;margin-bottom:2px}
.sc-v{font-size:1.6rem;font-weight:800;background:linear-gradient(135deg,var(--tx),var(--rose));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sc-d{font-size:.72rem;color:var(--td);margin-top:2px}
.cd{background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border:var(--gbd);border-radius:var(--r);margin-bottom:14px;overflow:hidden}
.cd-h{padding:14px 18px;border-bottom:var(--gbd);display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:.9rem;cursor:pointer}
.cd-h:hover{background:rgba(255,255,255,.02)}
.cd-b{padding:14px 18px}
.cd-b.hide{display:none}
.fg{margin-bottom:12px}
.fg label{display:block;margin-bottom:4px;font-size:.82rem;color:var(--tm);font-weight:500}
.fg input,.fg select{width:100%;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rx);color:var(--tx);padding:10px 12px;font-size:.88rem;font-family:inherit;transition:all .25s}
.fg input:focus,.fg select:focus{border-color:var(--p);outline:none;box-shadow:var(--gr)}
.fg select option{background:var(--s1);color:var(--tx)}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn{padding:10px 18px;border-radius:var(--rs);border:none;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:6px;font-family:inherit}
.btn:active{transform:scale(.97)}
.btn-p{background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;box-shadow:0 2px 12px rgba(232,82,141,.25)}
.btn-p:hover{box-shadow:0 4px 20px rgba(232,82,141,.35)}
.btn-o{background:0 0;border:1px solid var(--bd);color:var(--tx)}
.btn-o:hover{border-color:var(--p);color:#fff}
.btn-s{background:linear-gradient(135deg,#10b981,#059669);color:#fff}
.btn-d{background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff}
.btn-w{width:100%;justify-content:center}
.btn-sm{padding:6px 12px;font-size:.78rem;border-radius:var(--rx)}
.tw{border-radius:var(--rs);overflow-x:auto}
.tw table{width:100%;border-collapse:collapse;font-size:.8rem}
.tw th{background:rgba(15,23,42,.6);color:var(--tm);font-weight:600;padding:9px 10px;border-bottom:var(--gbd);white-space:nowrap}
.tw td{padding:9px 10px;border-bottom:var(--gbd)}
.tw tr:hover td{background:rgba(255,255,255,.02)}
.bd{display:inline-flex;align-items:center;gap:3px;padding:3px 10px;border-radius:12px;font-size:.72rem;font-weight:600}
.bd-ok{background:var(--sl);color:var(--succ)}
.bd-er{background:var(--el);color:var(--err)}
.bd-wa{background:var(--wl);color:var(--warn)}
.bd-in{background:var(--il);color:var(--info)}
.vp{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center}
.vr{width:180px;height:180px;border-radius:50%;background:var(--gl);border:2px solid var(--bd);display:flex;align-items:center;justify-content:center;margin-bottom:20px;cursor:pointer;transition:all .4s}
.vr:hover{border-color:var(--p);box-shadow:var(--gr)}
.vr.ls{border-color:var(--rose);box-shadow:0 0 40px rgba(232,82,141,.3);animation:vp 2s infinite}
.vr.th{border-color:var(--purple);box-shadow:0 0 40px rgba(147,51,234,.3);animation:vs 1.5s linear infinite}
.vr.sp{border-color:var(--teal);box-shadow:0 0 40px rgba(20,184,166,.3)}
@keyframes vp{0%,100%{box-shadow:0 0 20px rgba(232,82,141,.2)}50%{box-shadow:0 0 50px rgba(232,82,141,.4)}}
@keyframes vs{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.vi{font-size:3.5rem;transition:all .3s}
.vr.ls .vi{animation:vb .8s infinite}
@keyframes vb{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.vs{font-size:1.1rem;font-weight:600;margin-bottom:6px}
.vsu{color:var(--tm);font-size:.85rem;margin-bottom:16px}
.vtx{max-width:500px;min-height:40px;padding:12px 20px;background:var(--cd);border:var(--gbd);border-radius:var(--r);font-size:.9rem;line-height:1.6;margin-bottom:16px}
.vw{display:flex;align-items:center;gap:3px;height:30px;margin-bottom:16px}
.vw span{width:3px;background:var(--rose);border-radius:2px;animation:wv 1.2s ease-in-out infinite}
.vw span:nth-child(1){animation-delay:0s;height:12px}
.vw span:nth-child(2){animation-delay:.1s;height:20px}
.vw span:nth-child(3){animation-delay:.2s;height:16px}
.vw span:nth-child(4){animation-delay:.3s;height:24px}
.vw span:nth-child(5){animation-delay:.4s;height:14px}
@keyframes wv{0%,100%{height:8px}50%{height:24px}}
.vw.pa span{animation:none;height:4px;opacity:.3}
.vh{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:500px}
.vh button{padding:6px 14px;border-radius:16px;font-size:.78rem;background:var(--inp);border:1px solid var(--bd);color:var(--tm);cursor:pointer;transition:all .25s;font-family:inherit}
.vh button:hover{border-color:var(--p);color:#fff;background:var(--rl)}
.ca{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.cs{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px;border-top:var(--gbd);background:var(--gl)}
.cs button{padding:6px 14px;border-radius:16px;font-size:.78rem;background:var(--inp);border:1px solid var(--bd);color:var(--tm);cursor:pointer;transition:all .25s;font-family:inherit}
.cs button:hover{border-color:var(--p);color:#fff;background:var(--rl)}
.cb{display:flex;align-items:center;gap:8px;padding:10px 16px;border-top:var(--gbd);background:var(--gl)}
.cb textarea{flex:1;background:var(--inp);border:1px solid var(--bd);border-radius:var(--rs);color:var(--tx);font-size:.88rem;padding:10px 14px;resize:none;min-height:42px;max-height:100px;font-family:inherit}
.cb textarea:focus{border-color:var(--p);outline:none;box-shadow:var(--gr)}
.cb .sb{width:42px;height:42px;border-radius:var(--rs);border:none;background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;box-shadow:var(--gr)}
.cb .sb:hover{transform:scale(1.05)}
.cb .mb{width:42px;height:42px;border-radius:var(--rs);border:1px solid var(--bd);background:var(--inp);color:var(--tm);font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s}
.cb .mb.on{background:linear-gradient(135deg,#ef4444,#dc2626);border-color:transparent;animation:cpl 1.5s infinite}
@keyframes cpl{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
.msg{max-width:82%;padding:12px 16px;border-radius:var(--r);line-height:1.65;font-size:.88rem;word-wrap:break-word;animation:mi .3s ease-out}
@keyframes mi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg.us{background:linear-gradient(135deg,var(--rose),var(--purple));color:#fff;align-self:flex-end;border-end-end-radius:4px}
.msg.bo{background:var(--cd);align-self:flex-start;border:var(--gbd)}
.msg .mt{font-size:.68rem;color:rgba(255,255,255,.5);margin-top:4px}
.msg.bo .mt{color:var(--td)}
.ty{display:flex;gap:5px;padding:12px 18px;align-self:flex-start;background:var(--cd);border-radius:var(--r);border:var(--gbd)}
.ty span{width:7px;height:7px;border-radius:50%;background:var(--rose);animation:tb 1.4s infinite}
.ty span:nth-child(2){animation-delay:.15s}
.ty span:nth-child(3){animation-delay:.3s}
@keyframes tb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);padding:12px 22px;border-radius:var(--rs);background:var(--gl);-webkit-backdrop-filter:blur(var(--gb));backdrop-filter:blur(var(--gb));border:var(--gbd);color:var(--tx);font-size:.85rem;box-shadow:var(--shl);z-index:999;display:none;align-items:center;gap:8px;max-width:88%}
.toast.on{display:flex;animation:ti .35s ease-out}
@keyframes ti{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.ld{display:flex;align-items:center;justify-content:center;gap:8px;padding:24px;color:var(--tm)}
.em{display:flex;flex-direction:column;align-items:center;padding:48px 24px;text-align:center;color:var(--tm)}
.em .ei{font-size:2.5rem;margin-bottom:12px;opacity:.5}
.em h3{font-size:.95rem;margin-bottom:6px;color:var(--tx)}
.em p{font-size:.82rem;max-width:320px;line-height:1.5}
.ib{display:flex;gap:6px;flex-wrap:wrap}
.ib span{padding:3px 9px;border-radius:10px;font-size:.7rem;display:inline-flex;align-items:center;gap:3px}
.ib .up{background:var(--sl);color:var(--succ)}
.ib .dn{background:var(--el);color:var(--err)}
.ib .wa{background:var(--wl);color:var(--warn)}
@media(max-width:768px){.g2{grid-template-columns:1fr}.fr{grid-template-columns:1fr}header{padding:0 12px;height:auto;flex-wrap:wrap;gap:6px}.hc{order:3;width:100%;justify-content:flex-start;padding:4px 0}.pn{padding:14px}.tab{padding:9px 8px;font-size:.75rem}.sc{padding:14px}.sc-v{font-size:1.3rem}}

.ib{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px}
.ib-tag{padding:3px 10px;border-radius:20px;font-size:.75rem;font-weight:600}
.ib-tag.ok{background:rgba(0,200,120,.12);color:var(--green);border:1px solid rgba(0,200,120,.3)}
.ib-tag.err{background:rgba(255,80,80,.12);color:var(--err);border:1px solid rgba(255,80,80,.3)}
</style>
</head>
<body>
<div class="toast" id="toast"></div>
<header>
  <div class="logo"><div class="logo-ic">\u{1F916}</div><div><div class="logo-tx">\u0628\u0633\u0645\u0629 <span class="logo-sub">| AI Agent</span></div></div></div>
  <div class="hdr-s"></div>
  <span class="lb" id="liveBadge">\u0645\u062A\u0635\u0644</span>
  <div class="hc" id="hospChips">
    <button class="hc-btn on" data-h="riyadh">\u0627\u0644\u0631\u064A\u0627\u0636</button>
    <button class="hc-btn" data-h="madinah">\u0627\u0644\u0645\u062F\u064A\u0646\u0629</button>
    <button class="hc-btn" data-h="unaizah">\u0639\u0646\u064A\u0632\u0629</button>
    <button class="hc-btn" data-h="khamis">\u062E\u0645\u064A\u0633</button>
    <button class="hc-btn" data-h="jizan">\u062C\u064A\u0632\u0627\u0646</button>
    <button class="hc-btn" data-h="abha">\u0623\u0628\u0647\u0627</button>
  </div>
  <button class="hdr-btn" id="langBtn">\u{1F1F8}\u{1F1E6} AR</button>
</header>
<nav class="tabs" id="tabNav">
  <button class="tab on" data-tab="voice">\u{1F399}\uFE0F \u0635\u0648\u062A\u064A</button>
  <button class="tab" data-tab="chat">\u{1F4AC} \u0645\u062D\u0627\u062F\u062B\u0629</button>
  <button class="tab" data-tab="insights">\u{1F4CA} \u062A\u062D\u0644\u064A\u0644\u0627\u062A</button>
  <button class="tab" data-tab="nphies">\u{1F3DB}\uFE0F NPHIES</button>
  <button class="tab" data-tab="elig">\u{1F6E1}\uFE0F \u0623\u0647\u0644\u064A\u0629</button>
  <button class="tab" data-tab="appt">\u{1F4C5} \u0645\u0648\u0627\u0639\u064A\u062F</button>
  <button class="tab" data-tab="oracle">\u{1F517} Oracle</button>
</nav>
<main>
<section class="pn on" id="pn-voice">
  <div class="vp">
    <div class="vr" id="voiceRing" data-a="toggleVoice"><span class="vi" id="voiceIcon">\u{1F399}\uFE0F</span></div>
    <div class="vs" id="voiceStatus">\u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629</div>
    <div class="vsu" id="voiceSub">\u062A\u062A\u062D\u062F\u062B \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629</div>
    <div class="vtx" id="voiceTranscript"></div>
    <div class="vw pa" id="voiceWaves"><span></span><span></span><span></span><span></span><span></span></div>
    <button class="btn btn-o btn-sm" data-a="clearVoice">\u{1F5D1}\uFE0F \u0645\u0633\u062D</button>
    <div class="vh" style="margin-top:16px">
      <button data-q="\u0627\u0639\u0631\u0641 \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A" class="vq">\u{1F552} \u0645\u0648\u0627\u0639\u064A\u062F</button>
      <button data-q="\u0623\u0628\u064A \u0623\u062A\u0623\u0643\u062F \u0645\u0646 \u0623\u0647\u0644\u064A\u062A\u064A \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A\u0629" class="vq">\u{1F6E1}\uFE0F \u0623\u0647\u0644\u064A\u0629</button>
      <button data-q="\u0643\u0645 \u0639\u062F\u062F \u0627\u0644\u0623\u0637\u0628\u0627\u0621" class="vq">\u{1F468}\u200D\u2695\uFE0F \u0623\u0637\u0628\u0627\u0621</button>
      <button data-q="\u0643\u064A\u0641 \u0623\u062D\u062C\u0632 \u0645\u0648\u0639\u062F" class="vq">\u{1F4C5} \u062D\u062C\u0632</button>
      <button data-q="\u062C\u0647\u0627\u062A \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0645\u062A\u0639\u0627\u0642\u062F \u0645\u0639\u0647\u0627" class="vq">\u{1F3E6} \u062A\u0623\u0645\u064A\u0646</button>
    </div>
  </div>
</section>
<section class="pn" id="pn-chat">
  <div class="ca" id="chatMsgs"></div>
  <div class="cs" id="chatSugg">
    <button data-q="\u0639\u0631\u0636 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649">\u{1F4CA} \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A</button>
    <button data-q="\u0623\u0628\u064A \u0623\u062A\u0623\u0643\u062F \u0645\u0646 \u0623\u0647\u0644\u064A\u0629 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 1234567890">\u{1F6E1}\uFE0F \u0623\u0647\u0644\u064A\u0629</button>
    <button data-q="\u0639\u0631\u0636 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0641\u0631\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649">\u{1F3E5} \u0641\u0631\u0648\u0639</button>
    <button data-q="\u062C\u0647\u0627\u062A \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0645\u062A\u0639\u0627\u0642\u062F \u0645\u0639\u0647\u0627">\u{1F3E6} \u062A\u0623\u0645\u064A\u0646</button>
  </div>
  <div class="cb">
    <textarea id="chatIn" placeholder="\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u062A\u0643 \u0647\u0646\u0627..." rows="1"></textarea>
    <button class="mb" id="chatMicBtn" data-a="toggleChatMic" aria-label="\u062A\u0633\u062C\u064A\u0644">\u{1F3A4}</button>
    <button class="sb" data-a="sendChat" aria-label="\u0625\u0631\u0633\u0627\u0644">\u27A4</button>
  </div>
</section>
<section class="pn" id="pn-insights">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
    <h2 style="font-size:1.1rem;font-weight:700" id="insightsTitle">\u{1F4CA} \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621</h2>
    <div class="ib" id="integBar"></div>
  </div>
  <div class="g3" id="insightCards"></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">\u{1F3E5} \u0623\u062F\u0627\u0621 \u0627\u0644\u0641\u0631\u0648\u0639 <span>\u25BC</span></div><div class="cd-b" id="branchTable"></div></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">\u{1F4CB} \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A <span>\u25BC</span></div><div class="cd-b" id="claimsDetail"></div></div>
</section>
<section class="pn" id="pn-nphies">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">\u{1F3DB}\uFE0F NPHIES Mirror</h2>
  <div class="g3" id="nphiesStats"></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">\u{1F4E6} \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 <span>\u25BC</span></div><div class="cd-b" id="nphiesDetail"></div></div>
</section>
<section class="pn" id="pn-elig">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">\u{1F6E1}\uFE0F \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629</h2>
  <div class="cd"><div class="cd-b">
    <div class="fg"><label for="eidIn">\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629</label><input id="eidIn" placeholder="\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 (10 \u0623\u0631\u0642\u0627\u0645)" maxlength="10"></div>
    <div class="fg"><label for="eidType">\u0627\u0644\u0646\u0648\u0639</label><select id="eidType"><option value="NATIONAL NUMBER">\u0647\u0648\u064A\u0629 \u0648\u0637\u0646\u064A\u0629</option><option value="IQAMA">\u0625\u0642\u0627\u0645\u0629</option><option value="PASSPORT">\u062C\u0648\u0627\u0632 \u0633\u0641\u0631</option></select></div>
    <button class="btn btn-p btn-w" data-a="checkElig">\u{1F50D} \u062A\u062D\u0642\u0642</button>
    <div id="eligResult" style="margin-top:12px"></div>
  </div></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">\u{1F3E6} \u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0623\u0645\u064A\u0646 <span>\u25BC</span></div><div class="cd-b" id="insPartnerList"></div></div>
</section>
<section class="pn" id="pn-appt">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">\u{1F4C5} \u062D\u062C\u0632 \u0645\u0648\u0639\u062F</h2>
  <form id="apptForm"><div class="cd"><div class="cd-b">
    <div class="fg"><label>\u0627\u0644\u0627\u0633\u0645</label><input id="apName" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"></div>
    <div class="fg"><label>\u0627\u0644\u062C\u0648\u0627\u0644</label><input id="apPhone" placeholder="05xxxxxxxx" maxlength="10"></div>
    <div class="fr">
      <div class="fg"><label>\u0627\u0644\u0641\u0631\u0639</label><select id="apHosp"><option value="riyadh">\u0627\u0644\u0631\u064A\u0627\u0636</option><option value="madinah">\u0627\u0644\u0645\u062F\u064A\u0646\u0629</option><option value="unaizah">\u0639\u0646\u064A\u0632\u0629</option><option value="khamis">\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637</option><option value="jizan">\u062C\u064A\u0632\u0627\u0646</option><option value="abha">\u0623\u0628\u0647\u0627</option></select></div>
      <div class="fg"><label>\u0627\u0644\u062A\u062E\u0635\u0635</label><select id="apSpec"><option value="general">\u0637\u0628 \u0639\u0627\u0645</option><option value="cardiology">\u0642\u0644\u0628</option><option value="neurology">\u0623\u0639\u0635\u0627\u0628</option><option value="orthopedics">\u0639\u0638\u0627\u0645</option><option value="pediatrics">\u0623\u0637\u0641\u0627\u0644</option><option value="internal">\u0628\u0627\u0637\u0646\u0629</option><option value="surgery">\u062C\u0631\u0627\u062D\u0629</option><option value="obgyn">\u0646\u0633\u0627\u0621 \u0648\u062A\u0648\u0644\u064A\u062F</option><option value="ophthalmology">\u0639\u064A\u0648\u0646</option><option value="dermatology">\u062C\u0644\u062F\u064A\u0629</option></select></div>
    </div>
    <div class="fr">
      <div class="fg"><label>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label><input id="apDate" type="date"></div>
      <div class="fg"><label>\u0627\u0644\u0648\u0642\u062A</label><input id="apTime" type="time"></div>
    </div>
    <button class="btn btn-p btn-w" type="submit">\u{1F4C5} \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632</button>
    <div id="apptResult" style="margin-top:12px"></div>
  </div></div></form>
</section>
<section class="pn" id="pn-oracle">
  <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">\u{1F517} Oracle Health</h2>
  <div class="g3" id="oracleStats"></div>
  <div class="cd"><div class="cd-h" data-a="toggleCard">\u{1F504} \u062D\u0627\u0644\u0629 \u0627\u0644\u0631\u0628\u0637 <span>\u25BC</span></div><div class="cd-b" id="oracleDetail"></div></div>
</section>
</main>
<script>
(function(){'use strict';

// \u2500\u2500\u2500 Translations \u2500\u2500\u2500
const T={ar:{
  listening:'\u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639...',tapTalk:'\u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629',thinking:'\u0628\u0633\u0645\u0629 \u062A\u0641\u0643\u0631...',speaking:'\u0628\u0633\u0645\u0629 \u062A\u062A\u0643\u0644\u0645...',
  voiceSub:'\u062A\u062A\u062D\u062F\u062B \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629',loading:'\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...',failed:'\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644',retry:'\u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649',
  totalVal:'\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629',approvalRate:'\u0646\u0633\u0628\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A',claims:'\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A',priorAuth:'\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629',
  nphiesGSS:'\u0625\u062C\u0645\u0627\u0644\u064A GSS',nphiesPA:'\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629',nphiesCoC:'\u0634\u0647\u0627\u062F\u0627\u062A \u0627\u0644\u0639\u0644\u0627\u062C',nphiesSync:'\u0622\u062E\u0631 \u0645\u0632\u0627\u0645\u0646\u0629',
  oracleBridge:'Oracle Bridge',oracleTunnel:'Oracle Tunnel',connected:'\u0645\u062A\u0635\u0644',disconnected:'\u063A\u064A\u0631 \u0645\u062A\u0635\u0644',
  branch:'\u0627\u0644\u0641\u0631\u0639',total:'\u0627\u0644\u0642\u064A\u0645\u0629',approval:'\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629',status:'\u0627\u0644\u062D\u0627\u0644\u0629',auths:'\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A',
  eligible:'\u0645\u0624\u0647\u0644',notEligible:'\u063A\u064A\u0631 \u0645\u0624\u0647\u0644',checkFailed:'\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062A\u062D\u0642\u0642',
  booking:'\u062D\u062C\u0632 \u0645\u0648\u0639\u062F',bookingOk:'\u062A\u0645 \u0627\u0644\u062D\u062C\u0632 \u0628\u0646\u062C\u0627\u062D',bookingFail:'\u062A\u0639\u0630\u0651\u0631 \u0627\u0644\u062D\u062C\u0632',
  d1:'D1 \u0631\u0626\u064A\u0633\u064A',d1his:'D1 HIS',d1basma:'D1 Basma',dbDown:'\u063A\u064A\u0631 \u0645\u062A\u0635\u0644',
  mirror:'NPHIES Mirror',claimlinc:'ClaimLinc',sbs:'SBS',givc:'GIVC',
  authHealthy:'\u0627\u0644\u0645\u0635\u0627\u062F\u0642\u0629 \u0633\u0644\u064A\u0645\u0629',errors:'\u0623\u062E\u0637\u0627\u0621',nphiesAvailable:'NPHIES \u0645\u062A\u0627\u062D',yes:'\u0646\u0639\u0645',no:'\u0644\u0627',
  bookingSuccess:'\u062A\u0645 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0628\u0646\u062C\u0627\u062D',phoneInvalid:'\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u062C\u0648\u0627\u0644 \u0635\u062D\u064A\u062D',nameRequired:'\u0623\u062F\u062E\u0644 \u0627\u0644\u0627\u0633\u0645',
  idRequired:'\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629',idShort:'\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0647\u0648\u064A\u0629 \u0635\u062D\u064A\u062D (10 \u0623\u0631\u0642\u0627\u0645)',live:'\u0645\u062A\u0635\u0644',
},en:{
  listening:'Listening...',tapTalk:'Tap to talk to Basma',thinking:'Basma thinking...',speaking:'Basma speaking...',
  voiceSub:'Speaks Arabic and English',loading:'Loading...',failed:'Connection failed',retry:'Try again',
  totalVal:'Total Value',approvalRate:'Approval Rate',claims:'Claims',priorAuth:'Prior Authorizations',
  nphiesGSS:'Total GSS',nphiesPA:'Prior Auths',nphiesCoC:'CoC',nphiesSync:'Last Sync',
  oracleBridge:'Oracle Bridge',oracleTunnel:'Oracle Tunnel',connected:'Connected',disconnected:'Disconnected',
  branch:'Branch',total:'Total',approval:'Approval',status:'Status',auths:'Auths',
  eligible:'Eligible',notEligible:'Not Eligible',checkFailed:'Check Failed',
  booking:'Book Appointment',bookingOk:'Booked',bookingFail:'Booking Failed',
  d1:'D1 Primary',d1his:'D1 HIS',d1basma:'D1 Basma',dbDown:'DB Down',
  mirror:'NPHIES Mirror',claimlinc:'ClaimLinc',sbs:'SBS',givc:'GIVC',
  authHealthy:'Auth Healthy',errors:'Errors',nphiesAvailable:'NPHIES Available',yes:'Yes',no:'No',
  bookingSuccess:'Appointment booked',phoneInvalid:'Enter valid phone',nameRequired:'Enter name',
  idRequired:'Enter ID',idShort:'Enter valid ID (10 digits)',live:'Live',
}};

// \u2500\u2500\u2500 Helpers \u2500\u2500\u2500
const HM={riyadh:{ar:'\u0627\u0644\u0631\u064A\u0627\u0636',en:'Riyadh'},madinah:{ar:'\u0627\u0644\u0645\u062F\u064A\u0646\u0629',en:'Madinah'},unaizah:{ar:'\u0639\u0646\u064A\u0632\u0629',en:'Unayzah'},khamis:{ar:'\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637',en:'Khamis Mushayt'},jizan:{ar:'\u062C\u064A\u0632\u0627\u0646',en:'Jazan'},abha:{ar:'\u0623\u0628\u0647\u0627',en:'Abha'}};
const SM={general:{ar:'\u0637\u0628 \u0639\u0627\u0645',en:'General'},cardiology:{ar:'\u0642\u0644\u0628',en:'Cardiology'},neurology:{ar:'\u0623\u0639\u0635\u0627\u0628',en:'Neurology'},orthopedics:{ar:'\u0639\u0638\u0627\u0645',en:'Orthopedics'},pediatrics:{ar:'\u0623\u0637\u0641\u0627\u0644',en:'Pediatrics'},internal:{ar:'\u0628\u0627\u0637\u0646\u0629',en:'Internal Medicine'},surgery:{ar:'\u062C\u0631\u0627\u062D\u0629',en:'Surgery'},obgyn:{ar:'\u0646\u0633\u0627\u0621 \u0648\u062A\u0648\u0644\u064A\u062F',en:'OB/GYN'},ophthalmology:{ar:'\u0639\u064A\u0648\u0646',en:'Ophthalmology'},dermatology:{ar:'\u062C\u0644\u062F\u064A\u0629',en:'Dermatology'}};

let lang=localStorage.getItem('bm_lang')||'ar',hosp=localStorage.getItem('bm_hosp')||'riyadh';
let recog=null,isL=false,chL=false,chH=[];
function _(k){return(T[lang]&&T[lang][k])||k||'';}
function $(id){return document.getElementById(id);}
function qa(s,e){return(e||document).querySelectorAll(s);}
function qs(s,e){return(e||document).querySelector(s);}
function html(e,s){if(e)e.innerHTML=s||'';}
function n2(v){if(v===null||v===undefined)return'\u2014';return Number(v).toLocaleString(lang==='ar'?'ar-SA':'en-US');}
function pct(v){return n2(v)+'%';}
function sar(v){return n2(v)+(lang==='ar'?' \u0631.\u0633':' SAR');}
function dt(s){if(!s)return'\u2014';return new Date(s).toLocaleString(lang==='ar'?'ar-SA':'en-US',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});}
function nw(){return new Date().toLocaleTimeString(lang==='ar'?'ar-SA':'en-US',{hour:'2-digit',minute:'2-digit'});}
function tt(m,t){const e=$('toast');if(!e)return;e.textContent=m;e.className='toast on'+(t?' '+t:'');setTimeout(()=>e.classList.remove('on'),3500);}

// \u2500\u2500\u2500 API \u2500\u2500\u2500
const BA='https://bsma.elfadil.com',HN='https://hnh.brainsait.org';
async function chatApi(m){const r=await fetch(BA+'/basma/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({message:m,lang,hospital:hosp})});return r.json();}
async function netApi(){const r=await fetch(BA+'/basma/network',{signal:AbortSignal.timeout(10000)});return r.json();}
async function mirApi(){const r=await fetch(BA+'/basma/mirror',{signal:AbortSignal.timeout(10000)});return r.json();}
async function hnh(p,b){try{const r=await fetch(HN+p,{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(10000),body:JSON.stringify(b)});return r.json();}catch(e){return{success:false,error:e.message};}}

// \u2500\u2500\u2500 Voice \u2500\u2500\u2500
async function sV(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){tt('\u0645\u062A\u0635\u0641\u062D\u0643 \u0644\u0627 \u064A\u062F\u0639\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0635\u0648\u062A','err');return;}

  // If already listening → stop
  if(isL){
    if(recog){try{recog.stop();}catch(e){}}
    isL=false;
    const ri=$('voiceRing');const ic=$('voiceIcon');const si=$('voiceStatus');const wi=$('voiceWaves');
    if(ri)ri.className='vr';if(ic)ic.textContent='\u{1F399}\uFE0F';
    if(si)si.textContent='\u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629';
    if(wi)wi.className='vw pa';
    if(window._bsmaAudio){try{window._bsmaAudio.pause();}catch(e){}}
    return;
  }

  isL=true;
  const ri=$('voiceRing');const ic=$('voiceIcon');const si=$('voiceStatus');const wi=$('voiceWaves');
  if(ri)ri.className='vr sp';if(ic)ic.textContent='\u{1F50A}';
  if(si)si.textContent='\u{1F50A} \u0628\u0633\u0645\u0629 \u062A\u062A\u062D\u062F\u062B...';
  if(wi)wi.className='vw';

  // === Proactive welcome ===
  const greetings=[
    '\u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B! \u0623\u0646\u0627 \u0628\u0633\u0645\u0629\u060C \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. \u0643\u064A\u0641 \u0623\u0642\u062F\u0631 \u0623\u062E\u062F\u0645\u0643\u061F',
    '\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643! \u0623\u0646\u0627 \u0628\u0633\u0645\u0629\u060C \u062C\u0627\u0647\u0632\u0629 \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u062D\u062C\u0632 \u0645\u0648\u0627\u0639\u064A\u062F\u0643 \u0623\u0648 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u062A\u0623\u0645\u064A\u0646\u0643. \u062A\u0641\u0636\u0644 \u062A\u0643\u0644\u0645!',
    '\u0623\u0647\u0644\u0627\u064B! \u0645\u0639\u0643 \u0628\u0633\u0645\u0629 \u0645\u0646 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. \u0623\u0646\u0627 \u0647\u0646\u0627 \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643. \u062A\u0641\u0636\u0644!'
  ];
  const welcome=greetings[Math.floor(Math.random()*greetings.length)];
  const tx=$('voiceTranscript');if(tx)tx.textContent=welcome;

  // Speak welcome, then start listening after audio ends
  await sp(welcome);
  // sp() auto-restarts recog via onended callback — but set up recog now
  _startRecog();
}

function _startRecog(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR||!isL)return;
  recog=new SR();
  recog.lang='ar-SA';
  recog.interimResults=true;
  recog.continuous=false; // single utterance — restart after each response
  recog.maxAlternatives=1;

  let silenceTimer=null;
  let finalTx='';

  recog.onstart=()=>{
    const ri=$('voiceRing');const ic=$('voiceIcon');const si=$('voiceStatus');const wi=$('voiceWaves');
    if(ri)ri.className='vr ls';if(ic)ic.textContent='\u{1F534}';
    if(si)si.textContent='\u{1F534} \u0627\u0633\u062A\u0645\u0639 \u0648\u062A\u062D\u062F\u062B\u2026';
    if(wi)wi.className='vw';
  };

  recog.onresult=(e)=>{
    let interim='',final_='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      if(e.results[i].isFinal) final_+=e.results[i][0].transcript;
      else interim+=e.results[i][0].transcript;
    }
    const tx=$('voiceTranscript');
    if(tx)tx.textContent=(final_||interim)+'...';
    if(final_){
      finalTx=final_;
      clearTimeout(silenceTimer);
      silenceTimer=setTimeout(()=>{
        if(recog)try{recog.stop();}catch(e){}
      },800);
    }
  };

  recog.onspeechend=()=>{
    clearTimeout(silenceTimer);
    silenceTimer=setTimeout(()=>{if(recog)try{recog.stop();}catch(e){}},600);
  };

  recog.onend=()=>{
    if(finalTx.trim()&&isL){pV(finalTx);}
    else if(isL){
      // No speech detected — restart listening quietly
      setTimeout(()=>{if(isL)_startRecog();},400);
    }
    finalTx='';
  };

  recog.onerror=(e)=>{
    if(e.error==='no-speech'&&isL)setTimeout(()=>{if(isL)_startRecog();},400);
  };

  try{recog.start();}catch(e){}
}
async function pV(t){
  if(!t||!t.trim())return;
  const ri=$('voiceRing'),ic=$('voiceIcon'),si=$('voiceStatus'),tx=$('voiceTranscript');
  if(ri)ri.className='vr th';if(ic)ic.textContent='\u{1F9E0}';
  if(si)si.textContent='\u{1F9E0} \u0628\u0633\u0645\u0629 \u062A\u0641\u0643\u0631...';
  if(tx)tx.innerHTML='<span style="color:var(--tm);font-size:.85rem">\u{1F464} '+t+'</span>';

  const low=t.toLowerCase();
  let reply='',action=null;

  // ── Intent Router ──
  const idMatch=t.match(/\b(1\d{9}|2\d{9})\b/);
  const numId=idMatch?idMatch[1]:null;

  // Intent: ELIGIBILITY / INSURANCE CHECK
  if(/(أهلية|تأمين|مؤمن|elig|insur|coverage|كفالة|شركة التأمين)/.test(low)){
    action='eligibility';
    if(numId){
      try{
        if(si)si.textContent='\u{1F50D} \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0623\u0645\u064A\u0646...';
        const r=await fetch(BA+'/api/eligibility/check',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({identity_number:numId,branch:hosp}),signal:AbortSignal.timeout(15000)});
        const d=await r.json();
        if(d.success||d.source==='oracle-bridge'){
          reply='\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642. \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 '+numId+'. '+(d.eligible?'\u0627\u0644\u0645\u0631\u064A\u0636 \u0645\u0624\u0647\u0644 \u0644\u0644\u062A\u0623\u0645\u064A\u0646.':'\u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0634\u0631\u0643\u0629 \u0627\u0644\u062A\u0623\u0645\u064A\u0646.');
        }else reply='\u0644\u0645 \u0623\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645. \u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629.';
      }catch(e){reply='\u062A\u0639\u0630\u0631 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0628\u0648\u0627\u0628\u0629 Oracle. \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0646\u0641\u0642.';}
    }else reply='\u062A\u0641\u0636\u0644 \u0632\u0648\u062F\u0646\u064A \u0628\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629 (10 \u0623\u0631\u0642\u0627\u0645) \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0623\u0645\u064A\u0646.';
  }

  // Intent: BOOK APPOINTMENT
  else if(/(حجز|احجز|موعد|appointment|book|أريد موعد|أبي أحجز)/.test(low)){
    action='book';
    const depts={'\u0639\u064A\u0648\u0646':'Ophthalmology','\u0642\u0644\u0628':'Cardiology','\u0639\u0638\u0627\u0645':'Orthopedics','\u0623\u0633\u0646\u0627\u0646':'Dentistry','\u0623\u0637\u0641\u0627\u0644':'Pediatrics','\u0646\u0633\u0627\u0621':'Gynecology','\u0637\u0648\u0627\u0631\u0626':'Emergency','\u0628\u0627\u0637\u0646\u0629':'Internal Medicine'};
    let dept='General';
    for(const[ar,en] of Object.entries(depts)){if(low.includes(ar.toLowerCase())||low.includes(en.toLowerCase()))dept=en;}
    const nameM=t.match(/اسم[يي]?\s+([\u0600-\u06FF\s]{3,20})/);
    const ptName=nameM?nameM[1].trim():'';
    if(ptName||numId){
      try{
        if(si)si.textContent='\u{1F4C5} \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u062C\u0632...';
        const today=new Date();const apDate=new Date(today.setDate(today.getDate()+1)).toISOString().slice(0,10);
        const r=await fetch(BA+'/api/appointments',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({patient_id:numId||1,patient_name:ptName||'مريض صوتي',appointment_date:apDate,appointment_time:'10:00',department:dept,branch:hosp,notes:'حجز صوتي عبر بسمة',source:'voice'}),
          signal:AbortSignal.timeout(15000)});
        const d=await r.json();
        if(d.success)reply='\u062A\u0645 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0628\u0646\u062C\u0627\u062D! \u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632: '+d.id+'. \u0642\u0633\u0645 '+dept+' \u0641\u064A \u0641\u0631\u0639 '+hosp+' \u063A\u062F\u0627\u064B.';
        else reply='\u062A\u0639\u0630\u0631 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632. \u0647\u0644 \u062A\u0648\u062F \u0623\u0646 \u062A\u062D\u062F\u062F \u0627\u0633\u0645\u0643 \u0648\u0631\u0642\u0645 \u0647\u0648\u064A\u062A\u0643\u061F';
      }catch(e){reply='\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u062C\u0632. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0623\u0648 \u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644.';}
    }else reply='\u064A\u0633\u0639\u062F\u0646\u064A \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643. \u0645\u0627 \u0627\u0633\u0645\u0643 \u0648\u0645\u0627 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u061F';
  }

  // Intent: CLAIM STATUS / NPHIES
  else if(/(مطالبة|مطالبات|claim|nphies|رفض|موافقة|تأمين|فاتورة|سداد|تسوية)/.test(low)){
    action='claims';
    try{
      if(si)si.textContent='\u{1F4CB} \u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A...';
      const r=await fetch(BA+'/api/billing/status',{signal:AbortSignal.timeout(10000)});
      const d=await r.json();
      const s=d.summary||{};
      reply='\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A: \u0625\u062C\u0645\u0627\u0644\u064A '+n2(s.count||0)+' \u0645\u0637\u0627\u0644\u0628\u0629\u060C \u0645\u0639\u062A\u0645\u062F '+n2(s.approved_count||0)+'\u060C \u0645\u0639\u0644\u0642\u0629 '+n2(s.pending||0)+'\u060C \u0645\u0631\u0641\u0648\u0636\u0629 '+n2(s.rejected||0)+'. \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0628\u0643\u0629: 835 \u0645\u0644\u064A\u0648\u0646 \u0631\u064A\u0627\u0644 \u0628\u0646\u0633\u0628\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 98.6%.';
    }catch(e){reply='\u0644\u0645 \u0623\u062A\u0645\u0643\u0646 \u0645\u0646 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0622\u0646. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.';}
  }

  // Intent: FOLLOW-UP / RESULTS
  else if(/(متابعة|نتيجة|تحليل|نتائج|follow.?up|result|lab|مختبر|أشعة|radiol)/.test(low)){
    action='followup';
    if(numId){
      try{
        if(si)si.textContent='\u{1F50D} \u0628\u062D\u062B \u0639\u0646 \u0645\u0644\u0641 \u0627\u0644\u0645\u0631\u064A\u0636...';
        const r=await fetch('https://oracle-bridge.brainsait.org/patient/search?api_key=bsma-oracle-b2af3196522b556636b09f5d268cb976&hospital='+hosp+'&q='+numId,{signal:AbortSignal.timeout(15000)});
        const d=await r.json();
        if(d.patients&&d.patients.length)reply='\u0648\u062C\u062F\u062A \u0645\u0644\u0641 \u0644\u0644\u0645\u0631\u064A\u0636 \u0628\u0631\u0642\u0645 \u0647\u0648\u064A\u0629 '+numId+'. \u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636: '+((d.patients[0].name||d.patients[0].Name)||'--')+'. \u064A\u0645\u0643\u0646\u0646\u064A \u062A\u062D\u0648\u064A\u0644\u0643 \u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629.';
        else reply='\u0644\u0645 \u0623\u062C\u062F \u0645\u0644\u0641\u0627\u064B \u0644\u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645 \u0641\u064A \u0641\u0631\u0639 '+hosp+'. \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0641\u0631\u0639 \u0627\u0644\u0635\u062D\u064A\u062D.';
      }catch(e){reply='\u0628\u0648\u0627\u0628\u0629 Oracle \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0627\u0644\u0622\u0646. \u064A\u0645\u0643\u0646\u0643 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649 \u0645\u0628\u0627\u0634\u0631\u0629.';}
    }else reply='\u0644\u0644\u0628\u062D\u062B \u0639\u0646 \u0646\u062A\u0627\u0626\u062C\u0643 \u0623\u0648 \u0645\u062A\u0627\u0628\u0639\u062A\u0643\u060C \u062A\u0641\u0636\u0644 \u0632\u0648\u062F\u0646\u064A \u0628\u0631\u0642\u0645 \u0647\u0648\u064A\u062A\u0643.';
  }

  // Intent: OPEN PATIENT FILE / ORACLE
  else if(/(ملف|فتح ملف|patient|open file|سجل|معلومات المريض|بيانات المريض)/.test(low)){
    action='patient_file';
    if(numId){
      try{
        if(si)si.textContent='\u{1F4C2} \u0641\u062A\u062D \u0645\u0644\u0641 \u0627\u0644\u0645\u0631\u064A\u0636...';
        const r=await fetch('https://oracle-bridge.brainsait.org/patient/search?api_key=bsma-oracle-b2af3196522b556636b09f5d268cb976&hospital='+hosp+'&q='+numId,{signal:AbortSignal.timeout(15000)});
        const d=await r.json();
        const pt=d.patients&&d.patients[0];
        if(pt)reply='\u062A\u0645 \u0641\u062A\u062D \u0627\u0644\u0645\u0644\u0641. \u0627\u0644\u0627\u0633\u0645: '+(pt.name||pt.Name||'--')+'. \u0627\u0644\u062A\u0627\u0631\u064A\u062E: '+(pt.dob||pt.DOB||'--')+'. \u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0623\u0648 \u0641\u062D\u0635 \u0646\u062A\u0627\u0626\u062C\u0647\u061F';
        else reply='\u0644\u0645 \u0623\u062C\u062F \u0645\u0644\u0641\u0627\u064B \u0628\u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645. \u062A\u0623\u0643\u062F \u0645\u0646 \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629.';
      }catch(e){reply='\u062A\u0639\u0630\u0631 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0628\u0648\u0627\u0628\u0629 Oracle \u0627\u0644\u0622\u0646. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.';}
    }else reply='\u0623\u0639\u0637\u0646\u064A \u0631\u0642\u0645 \u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0631\u064A\u0636 (10 \u0623\u0631\u0642\u0627\u0645) \u0644\u0623\u0641\u062A\u062D \u0645\u0644\u0641\u0647.';
  }

  // ── Default: DeepSeek AI chat with action awareness ──
  if(!reply){
    try{
      const d=await chatApi(t);
      reply=d.reply||d.response||'\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u0645 \u0623\u0641\u0647\u0645. \u0647\u0644 \u064A\u0645\u0643\u0646\u0643 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0635\u064A\u0627\u063A\u0629\u061F';
    }catch(e){reply='\u062D\u062F\u062B \u062E\u0637\u0623. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.';}
  }

  if(ri)ri.className='vr sp';if(ic)ic.textContent='\u{1F50A}';
  if(si)si.textContent='\u{1F50A} \u0628\u0633\u0645\u0629 \u062A\u062A\u062D\u062F\u062B...';
  if(tx)tx.innerHTML='<span style="color:var(--tm);font-size:.85rem">\u{1F464} '+t+'</span><br><span style="font-size:.8rem;color:var(--tm)">\u{1F3F7}\uFE0F '+(action||'chat')+'</span><br><br>\u{1F916} '+reply;

  // Log to chat history for context continuity
  chH.push({role:'user',content:t},{role:'assistant',content:reply});
  await sp(reply);
}
async function sp(t){
  if(!t||!t.trim())return;
  try{
    const r=await fetch('https://voice.elfadil.com/basma/speak',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({text:t.slice(0,500),lang,voice_id:'KxMRrXEjbJ6kZ93yT3fq',model_id:'eleven_multilingual_v2',voice_settings:{stability:0.55,similarity_boost:0.85,style:0.15,use_speaker_boost:true}}),
      signal:AbortSignal.timeout(15000)
    });
    if(r.ok){
      const blob=await r.blob();
      const url=URL.createObjectURL(blob);
      if(window._bsmaAudio){try{window._bsmaAudio.pause();URL.revokeObjectURL(window._bsmaAudio.src);}catch(e){}}
      window._bsmaAudio=new Audio(url);
      window._bsmaAudio.onended=()=>{
        const ri=$('voiceRing');const si=$('voiceStatus');
        if(ri)ri.className='vr ls';if(si)si.textContent='\u{1F534} \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639 \u062C\u0627\u0631\u064A...';
        if(recog&&isL)try{recog.start();}catch(e){}
      };
      await window._bsmaAudio.play();return;
    }
  }catch(e){}
  // Fallback: browser TTS
  try{const u=new SpeechSynthesisUtterance(t);u.lang='ar-SA';u.rate=0.95;u.pitch=1.05;speechSynthesis.speak(u);}catch(e){}
}
function clV(){const t=$('voiceTranscript');if(t)t.textContent='';chH=[];}

// \u2500\u2500\u2500 Chat \u2500\u2500\u2500
function aCM(c,t){
  const a=$('chatMsgs');if(!a)return;
  const d=document.createElement('div');d.className='msg '+c;
  d.innerHTML=t+'<div class="mt">'+nw()+'</div>';a.appendChild(d);a.scrollTop=a.scrollHeight;
}
function sTp(){const a=$('chatMsgs');if(!a)return;const d=document.createElement('div');d.className='ty';d.id='cL';for(let i=0;i<3;i++){const s=document.createElement('span');d.appendChild(s);}a.appendChild(d);a.scrollTop=a.scrollHeight;}
function rTp(){const e=$('cL');if(e)e.remove();}
async function sC(t){
  const inp=$('chatIn');const m=(t||(inp?inp.value:'')).trim();
  if(!m)return;if(inp&&!t){inp.value='';inp.style.height='auto';}
  aCM('us',m);sTp();
  // Smart intent: detect billing or eligibility queries, augment chat with real data
  let augment='';
  try{
    const lower=m.toLowerCase();
    if(/فاتور|bill|payment|claim|دفع|مطالب/.test(lower)){
      const br=await fetch(BA+'/api/billing/status?branch='+(hosp||'riyadh')).then(r=>r.json()).catch(()=>null);
      if(br&&br.summary){augment=' [Live SBS data: '+JSON.stringify(br.summary).slice(0,200)+']';}
    } else if(/تأمين|insurance|elig|أهلية|coverage/.test(lower)){
      augment=' [hint: user can check insurance coverage via the Eligibility tab with national ID]';
    }
  }catch(e){}
  try{const d=await chatApi(m+augment);rTp();const r=d.reply||d.response||_('failed');aCM('bo',r);chH.push({role:'user',content:m},{role:'assistant',content:r});sp(r);}catch(e){rTp();aCM('bo','\u26A0\uFE0F '+_('failed'));}
}
function tCM(){
  if(chL){if(recog)recog.stop();chL=false;const b=$('chatMicBtn');if(b)b.classList.remove('on');return;}
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){tt(_('failed'),'err');return;}
  recog=new SR();recog.lang=lang==='ar'?'ar-SA':'en-US';recog.interimResults=true;
  recog.onstart=()=>{chL=true;const b=$('chatMicBtn');if(b)b.classList.add('on');};
  recog.onend=()=>{chL=false;const b=$('chatMicBtn');if(b)b.classList.remove('on');};
  recog.onresult=(e)=>{const inp=$('chatIn');if(!inp)return;if(e.results[0].isFinal){inp.value=e.results[0][0].transcript;sC();}else inp.value=e.results[0][0].transcript;};
  recog.start();
}

// \u2500\u2500\u2500 Insights \u2500\u2500\u2500
async function lI(){
  const c=$('insightCards'),b=$('branchTable'),cd=$('claimsDetail'),ib=$('integBar');
  if(!c)return;html(c,'<div class="ld">\u23F3 '+_('loading')+'</div>');
  try{
    const [d,billing]=await Promise.all([
      netApi(),
      fetch(BA+'/api/billing/status',{signal:AbortSignal.timeout(8000)}).then(r=>r.json()).catch(()=>null)
    ]);
    const f=d.financials||{},bb=d.by_branch||{},pa=d.prior_auth||{};
    html(c,
      '<div class="sc"><div class="sc-i">\u{1F4B0}</div><div class="sc-l">'+_('totalVal')+'</div><div class="sc-v">'+(f.network_total_sar?sar(f.network_total_sar):'\u2014')+'</div><div class="sc-d">\u0635\u0627\u0641\u064A \u0627\u0644\u0634\u0628\u0643\u0629</div></div>'+
      '<div class="sc"><div class="sc-i">\u2705</div><div class="sc-l">'+_('approvalRate')+'</div><div class="sc-v" style="color:var(--green)">'+(f.network_approval_rate_pct?pct(f.network_approval_rate_pct):'\u2014')+'</div><div class="sc-d">'+n2(f.network_approved_sar||0)+' \u0645\u0639\u062A\u0645\u062F</div></div>'+
      '<div class="sc"><div class="sc-i">\u{1F4CB}</div><div class="sc-l">\u0645\u0637\u0627\u0644\u0628\u0627\u062A GSS</div><div class="sc-v">'+n2(f.total_claims_gss||0)+'</div></div>'+
      '<div class="sc"><div class="sc-i">\u{1F4DD}</div><div class="sc-l">\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0645\u0633\u0628\u0642\u0629</div><div class="sc-v">'+n2(pa.network_total||0)+'</div></div>'+
      (billing&&billing.summary?'<div class="sc" style="border-left:3px solid var(--blue)"><div class="sc-i">\u{1F4C4}</div><div class="sc-l">\u0641\u0648\u0627\u062A\u064A\u0631 D1</div><div class="sc-v">'+n2(billing.summary.count||0)+'</div><div class="sc-d">'+n2(billing.summary.total_sar||0)+' \u0631.\u0633</div></div>':'')
    );
    if(ib){
      const integs=[
        {k:'Oracle Bridge',ok:true,icon:'\u{1F517}'},
        {k:'NPHIES ClaimLinc',ok:true,icon:'\u{1F3DB}\uFE0F'},
        {k:'SBS D1',ok:!!(billing&&billing.success),icon:'\u{1F4CA}'},
        {k:'GIVC Handoffs',ok:true,icon:'\u{1F3E5}'}
      ];
      html(ib,integs.map(x=>'<span class="ib-tag '+(x.ok?'ok':'err')+'">'+x.icon+' '+x.k+'</span>').join(''));
    }
    // Branch table
    const brs=Object.entries(bb);
    if(brs.length&&b){
      let h='<div class="tw"><table><thead><tr><th>\u0627\u0644\u0641\u0631\u0639</th><th>\u0625\u062C\u0645\u0627\u0644\u064A</th><th>\u0646\u0633\u0628\u0629</th><th>PA</th><th>\u062D\u0627\u0644\u0629</th></tr></thead><tbody>';
      brs.forEach(([br,v])=>{
        const pct_=v.approval_pct||v.approvalPct||100;
        const flag=v.flag?'<span style="color:var(--warn);font-size:.75rem">\u26A0\uFE0F</span>':'<span style="color:var(--green)">\u2705</span>';
        h+='<tr><td style="font-weight:600">'+br+'</td><td>'+n2(v.total_sar||0)+'</td><td style="color:'+(pct_<95?'var(--err)':'var(--green)')+'">'+pct_.toFixed(1)+'%</td><td>'+n2(v.pa||0)+'</td><td>'+flag+'</td></tr>';
      });
      h+='</tbody></table></div>';
      html(b,h);
    }
    if(cd){
      html(cd,'<div style="line-height:2;font-size:.88rem;padding:8px 0">'+
        '<div>\u{1F4CA} <strong>GSS:</strong> '+n2(f.total_claims_gss||0)+'</div>'+
        '<div>\u{1F4DD} <strong>PA:</strong> '+n2(pa.network_total||0)+'</div>'+
        '<div>\u2705 <strong>\u0645\u0639\u062A\u0645\u062F:</strong> '+n2(f.network_approved_sar||0)+' \u0631.\u0633</div>'+
        '<div>\u{1F4C5} <strong>\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B:</strong> '+(d.as_of||'\u2014')+'</div>'+
        '<div>\u{1F3E2} <strong>\u0627\u0644\u0645\u0646\u0638\u0645\u0629:</strong> '+(d.org||'\u2014')+'</div>'+
      '</div>');
    }
  }catch(e){html(c,'<div style="color:var(--err)">\u274C '+e.message+'</div>');}
}

// \u2500\u2500\u2500 NPHIES \u2500\u2500\u2500
async function lM(){
  const st=$('nphiesStats'),dt=$('nphiesDetail');
  if(!st)return;html(st,'<div class="ld">\u23F3 '+_('loading')+'</div>');
  try{
    const [net,mir]=await Promise.all([netApi(),mirApi()]);
    const f=net.financials||{},pa=net.prior_auth||{};
    html(st,
      '<div class="sc"><div class="sc-i">\u{1F4E6}</div><div class="sc-l">GSS \u0645\u0637\u0627\u0644\u0628\u0627\u062A</div><div class="sc-v">'+n2(f.total_claims_gss||mir.total_gss||0)+'</div></div>'+
      '<div class="sc"><div class="sc-i">\u{1F4DD}</div><div class="sc-l">\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0645\u0633\u0628\u0642\u0629</div><div class="sc-v">'+n2(pa.network_total||mir.total_pa||0)+'</div></div>'+
      '<div class="sc"><div class="sc-i">\u{1F4CB}</div><div class="sc-l">\u0634\u0647\u0627\u062F\u0627\u062A CoC</div><div class="sc-v">'+n2(pa.network_check_status||mir.total_coc||0)+'</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--green)"><div class="sc-i">\u{1F4B5}</div><div class="sc-l">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0628\u0643\u0629</div><div class="sc-v" style="font-size:.9rem">'+n2(f.network_total_sar||0)+' \u0631</div></div>'
    );
    if(dt){
      const bb=net.by_branch||{},brs=Object.entries(bb);
      let rows=brs.map(([br,v])=>{
        const p=v.approval_pct||100;
        const bar='<div style="height:6px;border-radius:4px;background:var(--sl);margin-top:4px"><div style="height:6px;border-radius:4px;width:'+Math.round(p)+'%;background:'+(p<90?'var(--err)':p<99?'var(--warn)':'var(--green)')+'"></div></div>';
        return '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between"><strong>'+br+'</strong><span style="color:'+(p<90?'var(--err)':p<99?'var(--warn)':'var(--green)')+'">'+p.toFixed(1)+'%</span></div>'+bar+
          '<div style="font-size:.78rem;color:var(--tm);margin-top:3px">PA: '+n2(v.pa||0)+' | '+n2(v.total_sar||0)+' \u0631</div></div>';
      }).join('');
      rows+='<div style="font-size:.78rem;color:var(--tm);margin-top:8px">\u{1F4E1} Mirror: '+(mir.last_sync?new Date(mir.last_sync).toLocaleString('ar-SA'):'--')+'</div>';
      html(dt,rows||'<div style="color:var(--tm)">--</div>');
    }
  }catch(e){html(st,'<div style="color:var(--err)">\u274C '+e.message+'</div>');}
}

// \u2500\u2500\u2500 Oracle \u2500\u2500\u2500
async function lO(){
  const st=$('oracleStats'),dt=$('oracleDetail');
  if(!st)return;html(st,'<div class="ld">\u23F3 '+_('loading')+'</div>');
  try{
    const [health,handoffs]=await Promise.all([
      fetch(HN+'/api/health',{signal:AbortSignal.timeout(8000)}).then(r=>r.json()).catch(()=>({})),
      fetch(HN+'/api/handoffs/pending?limit=20',{signal:AbortSignal.timeout(8000)}).then(r=>r.json()).catch(()=>({count:0}))
    ]);
    const ints=health.integrations||{};
    const diagnose=await fetch('https://oracle-bridge.brainsait.org/diagnose?api_key=bsma-oracle-b2af3196522b556636b09f5d268cb976',{signal:AbortSignal.timeout(12000)}).then(r=>r.json()).catch(()=>({hospitals:[]}));
    const hs=diagnose.hospitals||[];
    const ok=hs.filter(h=>h.reachable).length;
    html(st,
      '<div class="sc" style="border-left:3px solid var(--blue)"><div class="sc-i">\u{1F517}</div><div class="sc-l">Oracle Bridge</div><div class="sc-v" style="font-size:.95rem">'+(ints.oracle_bridge==='connected'?'\u2705 \u0645\u062A\u0635\u0644':'\u{1F7E1} OK')+'</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--green)"><div class="sc-i">\u{1F3E5}</div><div class="sc-l">\u0641\u0631\u0648\u0639 \u0627\u0644\u062A\u0648\u0646\u0644</div><div class="sc-v">'+ok+'/'+hs.length+'</div><div class="sc-d">\u0645\u062A\u0635\u0644\u0629</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--purple)"><div class="sc-i">\u{1F4CB}</div><div class="sc-l">Handoffs BSMA\u2192GIVC</div><div class="sc-v">'+n2(handoffs.count||0)+'</div><div class="sc-d">\u0645\u0639\u0644\u0642\u0629</div></div>'+
      '<div class="sc" style="border-left:3px solid var(--blue)"><div class="sc-i">\u{1F4E1}</div><div class="sc-l">NPHIES Mirror</div><div class="sc-v" style="font-size:.95rem">'+(ints.nphies_mirror==='connected'?'\u2705 \u0645\u062A\u0635\u0644':'\u{1F7E1} OK')+'</div></div>'
    );
    if(dt){
      // 6 branches status
      let brRows=hs.map(h=>{
        const st_=h.reachable?'\u{1F7E2}':'\u{1F534}';
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--bo)">'+
          '<span>'+st_+' <strong>'+h.hospital+'</strong></span>'+
          '<span style="font-size:.8rem;color:var(--tm)">'+(h.ms?h.ms+'ms':'--')+'</span>'+
          '</div>';
      }).join('');
      // Handoffs list
      let hRows='';
      if(handoffs.handoffs&&handoffs.handoffs.length){
        hRows='<div style="margin-top:12px"><strong style="font-size:.85rem">\u{1F514} Handoffs \u0627\u0644\u0645\u0639\u0644\u0642\u0629:</strong>';
        hRows+=handoffs.handoffs.slice(0,5).map(h=>'<div style="padding:6px 0;font-size:.82rem;border-bottom:1px solid var(--bo)">'+
          '\u{1F464} '+(h.patient_name||'--')+' \u2192 '+(h.department||'--')+' ('+h.branch+')'+
          '<span style="float:'+(lang==='ar'?'left':'right')+';color:var(--tm)">'+new Date(h.created_at).toLocaleTimeString()+'</span>'+
          '</div>').join('');
        hRows+='</div>';
      }
      html(dt,'<div style="margin-bottom:8px;font-weight:600;font-size:.85rem">\u{1F4F6} \u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0648\u0639</div>'+(brRows||'--')+hRows);
    }
  }catch(e){html(st,'<div style="color:var(--err)">\u274C '+e.message+'</div>');}
}

// \u2500\u2500\u2500 Eligibility \u2500\u2500\u2500
async function cE(){
  const inp=$('eidIn'),tp=$('eidType'),res=$('eligResult');
  if(!inp||!res)return;const id=inp.value.trim();
  if(!id||id.length<9){tt(_('idShort'),'err');return;}
  html(res,'<div class="ld">\u23F3 '+_('loading')+'</div>');
  try{
    const d=await fetch(BA+'/api/eligibility/check',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({identity_number:id,identity_type:tp?tp.value:'NATIONAL NUMBER',branch:hosp})}).then(r=>r.json()).catch(e=>({success:false,error:e.message}));
    if(d.success&&d.eligible)html(res,'<div style="padding:12px;background:var(--sl);border-radius:var(--rs);color:var(--succ);font-size:.9rem;line-height:1.8">\u2705 <strong>'+_('eligible')+'</strong><br>'+(d.payer_name?'\u0627\u0644\u0645\u0624\u0645\u0651\u0646: '+d.payer_name+'<br>':'')+(d.network?'\u0627\u0644\u0634\u0628\u0643\u0629: '+d.network+'<br>':'')+(d.pct?'\u0627\u0644\u0646\u0633\u0628\u0629: '+d.pct+'%<br>':'')+(d.policy_number?'\u0627\u0644\u0648\u062B\u064A\u0642\u0629: '+d.policy_number:'')+'</div>');
    else html(res,'<div style="padding:12px;background:var(--el);border-radius:var(--rs);color:var(--err);font-size:.9rem">\u274C <strong>'+_('notEligible')+'</strong><br>'+(d.message||'')+'</div>');
  }catch(e){html(res,'<div style="padding:12px;background:var(--el);border-radius:var(--rs);color:var(--err)">\u26A0\uFE0F '+_('checkFailed')+'</div>');}
}
async function lP(){
  const pl=$('insPartnerList');if(!pl)return;
  try{
    const d=await hnh('/api/eligibility',{identity_number:'0000000000',identity_type:'NATIONAL NUMBER'});
    const ps=d.insurance_partners||d.partners||[];
    if(ps.length){let h='<div class="tw"><table><thead><tr><th>#</th><th>\u0627\u0644\u0634\u0631\u0643\u0629</th><th>\u0627\u0644\u0634\u0628\u0643\u0629</th><th>\u0627\u0644\u0646\u0633\u0628\u0629</th></tr></thead><tbody>';ps.forEach((p,i)=>{h+='<tr><td>'+(i+1)+'</td><td>'+(p.name||p.id)+'</td><td>'+(p.network||'\u2014')+'</td><td>'+(p.pct?pct(p.pct):'\u2014')+'</td></tr>';});h+='</tbody></table></div>';html(pl,h);}else html(pl,'<div style="color:var(--tm);font-size:.85rem">\u2014</div>');
  }catch(e){html(pl,'<div style="color:var(--tm);font-size:.85rem">\u2014</div>');}
}

// \u2500\u2500\u2500 Appointments \u2500\u2500\u2500
async function bA(e){
  e.preventDefault();const n=$('apName'),p=$('apPhone');
  if(!n||!n.value.trim()){tt(_('nameRequired'),'err');return;}
  if(!p||p.value.length<10){tt(_('phoneInvalid'),'err');return;}
  const h=$('apHosp').value,s=$('apSpec').value,d=$('apDate').value,t=$('apTime').value;
  const hn=(HM[h]?HM[h][lang]:h),sn=(SM[s]?SM[s][lang]:s);
  const res=$('apptResult');
  html(res,'<div class="ld">\u23F3 '+_('loading')+'</div>');
  try{
    const branchMap={riyadh:'R001',madinah:'M001',unaizah:'U001',khamis:'K001',jizan:'J001',abha:'A001'};
    const r=await fetch(BA+'/api/appointments',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({patient_name:n.value,patient_phone:p.value,patient_id:1,appointment_date:d,appointment_time:t,department:sn,branch:branchMap[h]||'R001',notes:'BSMA portal booking — '+hn})});
    const data=await r.json();
    if(data.success&&data.id){
      tt(_('bookingSuccess')+' \u2014 '+hn,'ok');
      html(res,'<div style="padding:12px;background:var(--sl);border-radius:var(--rs);color:var(--succ);line-height:1.8">\u2705 <strong>'+_('bookingOk')+'</strong><br>ID: <code>'+data.id+'</code><br>'+hn+' | '+sn+' | '+d+' '+t+'<br>'+n.value+' | '+p.value+'<br><small>\u{1F4E4} \u062A\u0645 \u062D\u0641\u0638\u0647\u0627 \u0641\u064A D1</small></div>');
      // Also push handoff to clinician
      try{await fetch(BA+'/api/clinician/handoff',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointment_id:data.id,patient_name:n.value,patient_phone:p.value,department:sn,branch:branchMap[h]||'R001',date:d,time:t,source:'bsma-booking'})});}catch(e){}
    } else {
      tt(_('failed'),'err');
      html(res,'<div style="padding:12px;background:var(--sl);border-radius:var(--rs);color:var(--err);line-height:1.8">\u274C '+(data.error||data.message||_('failed'))+'</div>');
    }
  }catch(err){
    tt(_('failed'),'err');
    html(res,'<div style="padding:12px;background:var(--sl);border-radius:var(--rs);color:var(--err)">\u274C '+err.message+'</div>');
  }
}

// \u2500\u2500\u2500 Language \u2500\u2500\u2500
function tL(){
  lang=lang==='ar'?'en':'ar';localStorage.setItem('bm_lang',lang);
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.documentElement.lang=lang;
  const lb=$('langBtn');if(lb)lb.textContent=lang==='ar'?'\u{1F1F8}\u{1F1E6} AR':'\u{1F1EC}\u{1F1E7} EN';
  ['voiceSub','voiceStatus'].forEach(k=>{const e=$(k);if(e)e.textContent=_(k==='voiceSub'?'voiceSub':lang==='ar'?'\u0627\u0636\u063A\u0637 \u0644\u0644\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629':'Tap to talk to Basma');});
}

// \u2500\u2500\u2500 Init \u2500\u2500\u2500
function init(){
  // Set initial lang
  if(lang==='en'){document.documentElement.dir='ltr';document.documentElement.lang='en';}
  const lb=$('langBtn');if(lb)lb.textContent=lang==='ar'?'\u{1F1F8}\u{1F1E6} AR':'\u{1F1EC}\u{1F1E7} EN';

  // Event delegation
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-a]');if(!t)return;
    const a=t.dataset.a;
    if(a==='toggleVoice')sV();else if(a==='clearVoice')clV();else if(a==='sendChat')sC();else if(a==='toggleChatMic')tCM();else if(a==='checkElig')cE();
  });

  // Hospital chips
  qa('.hc-btn').forEach(b=>{b.addEventListener('click',()=>{qa('.hc-btn').forEach(x=>x.classList.remove('on'));b.classList.add('on');hosp=b.dataset.h;localStorage.setItem('bm_hosp',hosp);lI();lM();lO();});});

  // Tab switching
  qa('.tab').forEach(t=>{t.addEventListener('click',()=>{qa('.tab').forEach(x=>x.classList.remove('on'));qa('.pn').forEach(p=>p.classList.remove('on'));t.classList.add('on');const pn=$('pn-'+t.dataset.tab);if(pn)pn.classList.add('on');if(t.dataset.tab==='insights')lI();if(t.dataset.tab==='nphies')lM();if(t.dataset.tab==='oracle')lO();if(t.dataset.tab==='elig')lP();if(t.dataset.tab==='chat'&&!chH.length)aCM('bo','\u{1F44B} \u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645! \u0623\u0646\u0627 \u0628\u0633\u0645\u0629\u060C \u0645\u0633\u0627\u0639\u062F \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0627\u0644\u0630\u0643\u064A. \u0643\u064A\u0641 \u0623\u0642\u062F\u0631 \u0623\u0633\u0627\u0639\u062F\u0643 \u0627\u0644\u064A\u0648\u0645\u061F');});});

  // Voice hints
  qa('.vq').forEach(b=>{b.addEventListener('click',()=>{const q=b.dataset.q;if(q){const t=$('voiceTranscript');if(t)t.textContent=q;pV(q);}});});
  qa('#chatSugg button').forEach(b=>{b.addEventListener('click',()=>{if(b.dataset.q)sC(b.dataset.q);});});

  // Card toggles
  qa('[data-a="toggleCard"]').forEach(h=>{h.addEventListener('click',()=>{const b=h.nextElementSibling;if(b){b.classList.toggle('hide');const s=h.querySelector('span');if(s)s.textContent=b.classList.contains('hide')?'\u25B6':'\u25BC';}});});

  // Chat input
  const ci=$('chatIn');if(ci){ci.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sC();}});ci.addEventListener('input',()=>{ci.style.height='auto';ci.style.height=Math.min(ci.scrollHeight,100)+'px';});}

  // Lang toggle
  if(lb)lb.addEventListener('click',tL);

  // Appointments form
  const af=$('apptForm');if(af)af.addEventListener('submit',bA);

  // Set default date
  const ad=$('apDate');if(ad){const d=new Date();d.setDate(d.getDate()+1);ad.value=d.toISOString().split('T')[0];}
  const at=$('apTime');if(at)at.value='10:00';

  // Initial data load
  setTimeout(()=>{lI();lM();lO();lP();},500);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
<\/script>
</body>
</html>`;
var html_default = bsmaHtml;

// src/worker.js
var CORS = {
  "Access-Control-Allow-Origin": "https://bsma.elfadil.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Session-ID, X-Hospital, X-API-Key"
};
var SECURITY_HEADERS = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://bsma.elfadil.com https://hnh.brainsait.org https://api.brainsait.org https://voice.elfadil.com https://nphies-mirror.brainsait-fadil.workers.dev; media-src 'self' blob:; frame-ancestors 'none'; form-action 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "microphone=self, camera=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-XSS-Protection": "1; mode=block",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  ...CORS
};
var worker_default = {
  async fetch(request, env2, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (path === "/health" || path === "/basma/status") {
      return new Response(JSON.stringify({
        service: "BSMA Healthcare Portal",
        version: "3.0.0",
        status: "healthy",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        features: ["voice", "chat", "oracle", "nphies", "insights", "eligibility"],
        hospitals: ["riyadh", "madinah", "unaizah", "khamis", "jizan", "abha"]
      }), {
        headers: { "Content-Type": "application/json", ...CORS }
      });
    }
    if (path === "/basma/chat" && method === "POST") {
      try {
        const bodyText = await request.clone().text();
        // Proxy to HNH unified which has direct DeepSeek access
        const hnnResp = await fetch("https://hnh.brainsait.org/basma/chat", {
          method: "POST",
          headers: {"Content-Type":"application/json","X-Source":"bsma-portal"},
          body: bodyText,
          signal: AbortSignal.timeout(20000)
        });
        const data = await hnnResp.json();
        return new Response(JSON.stringify(data), {
          status: hnnResp.ok ? 200 : hnnResp.status,
          headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
        });
      } catch(e) {
        return new Response(JSON.stringify({error:true, message:"Chat service error", detail:e.message}),
          {status:200, headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});
      }
    
    }
    if (path === "/basma/tts" && method === "POST") {
      try {
        const { text, lang = "ar" } = await request.json();
        const apiKey = env2.ELEVENLABS_API_KEY || "c1d91fafae6e5acfeae2366c3163e3a9";
        const voiceId = lang === "ar" ? "KxMRrXEjbJ6kZ93yT3fq" : "EXAVITQu4vr4xnSDxMaL";
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey
          },
          body: JSON.stringify({
            text: text.slice(0, 400),
            model_id: lang === "ar" ? "eleven_multilingual_v2" : "eleven_turbo_v2_5",
            voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.25, speaker_boost: true }
          }),
          signal: AbortSignal.timeout(2e4)
        });
        return new Response(res.body, {
          status: res.status,
          headers: { "Content-Type": "audio/mpeg", ...CORS, "Cache-Control": "no-cache" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "TTS service error" }), {
          status: 503,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path === "/basma/network") {
      try {
        const claimLincUrl = env2.CLAIMLINC_URL || "https://api.brainsait.org";
        const apiKey = env2.CLAIMLINC_API_KEY || "";
        const res = await fetch(`${claimLincUrl}/nphies/network/summary`, {
          headers: { "X-API-Key": apiKey },
          signal: AbortSignal.timeout(15e3)
        });
        const data = res.ok ? await res.json() : { error: "Network summary unavailable" };
        return new Response(JSON.stringify(data), {
          status: res.ok ? 200 : 502,
          headers: { "Content-Type": "application/json", ...CORS, "Cache-Control": "max-age=300" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "Network service unavailable" }), {
          status: 503,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path === "/basma/mirror") {
      try {
        const mirrorUrl = env2.NPHIES_MIRROR_URL || "https://nphies-mirror.brainsait-fadil.workers.dev";
        const res = await fetch(`${mirrorUrl}/mirror/status`, { signal: AbortSignal.timeout(8e3) });
        const data = res.ok ? await res.json() : { error: true, message: "Mirror unavailable" };
        return new Response(JSON.stringify(data), {
          status: res.ok ? 200 : 502,
          headers: { "Content-Type": "application/json", ...CORS, "Cache-Control": "max-age=120" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "NPHIES mirror timeout" }), {
          status: 504,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path === "/basma/session") {
      return new Response(JSON.stringify({
        session_id: crypto.randomUUID(),
        model: "deepseek-chat",
        compliance: "PDPL",
        version: "3.0.0"
      }), { headers: { "Content-Type": "application/json", ...CORS } });
    }
    if (path.startsWith("/basma/drugs")) {
      try {
        const voiceAgentUrl = env2.VOICE_AGENT_URL || "https://voice.elfadil.com";
        const qs = url.search || "";
        const res = await fetch(`${voiceAgentUrl}${path}${qs}`, {
          signal: AbortSignal.timeout(1e4)
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json", ...CORS }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "Drug search unavailable" }), {
          status: 503,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path.startsWith("/basma/oracle")) {
      try {
        const voiceAgentUrl = env2.VOICE_AGENT_URL || "https://voice.elfadil.com";
        const opts = { method, headers: { "Content-Type": "application/json" } };
        if (method === "POST") opts.body = await request.clone().text();
        const res = await fetch(`${voiceAgentUrl}${path}${url.search}`, {
          ...opts,
          signal: AbortSignal.timeout(15e3)
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json", ...CORS }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "Oracle service unavailable" }), {
          status: 503,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path.startsWith("/basma/rag/") && method === "POST") {
      try {
        const voiceAgentUrl = env2.VOICE_AGENT_URL || "https://voice.elfadil.com";
        const opts = { method, headers: { "Content-Type": "application/json" } };
        opts.body = await request.clone().text();
        const res = await fetch(`${voiceAgentUrl}${path}${url.search}`, {
          ...opts,
          signal: AbortSignal.timeout(15e3)
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json", ...CORS }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "RAG service unavailable" }), {
          status: 503,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path === "/basma/crm") {
      try {
        const res = await fetch(`${env2.HNH_BACKEND || "https://hnh.brainsait.org"}/api/patients`, {
          method: "GET",
          headers: { "Content-Type": "application/json", "X-Source": "bsma-portal" },
          signal: AbortSignal.timeout(1e4)
        });
        const patients = res.ok ? await res.json() : [];
        let claims = [];
        try {
          const cRes = await fetch(`${env2.HNH_BACKEND || "https://hnh.brainsait.org"}/api/claims`, {
            headers: { "Content-Type": "application/json", "X-Source": "bsma-portal" },
            signal: AbortSignal.timeout(5e3)
          });
          if (cRes.ok) claims = await cRes.json();
        } catch {
        }
        return new Response(JSON.stringify({ visitors: patients.results || [], appointments: claims.results || [], segments: [{ id: "s1", name: "All Patients", color: "#0ea5e9" }] }), {
          headers: { "Content-Type": "application/json", ...CORS }
        });
      } catch (err) {
        return new Response(JSON.stringify({ visitors: [], appointments: [], error: err.message }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path.startsWith("/basma/moh")) {
      try {
        const voiceAgentUrl = env2.VOICE_AGENT_URL || "https://voice.elfadil.com";
        const opts = { method, headers: { "Content-Type": "application/json" } };
        if (method === "POST") opts.body = await request.clone().text();
        const res = await fetch(`${voiceAgentUrl}${path}${url.search}`, {
          ...opts,
          signal: AbortSignal.timeout(1e4)
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json", ...CORS }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "MOH service unavailable" }), {
          status: 503,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    if (path === "/basma/hospitals") {
      return new Response(JSON.stringify({
        hospitals: [
          { id: "riyadh", name_ar: "\u0627\u0644\u0631\u064A\u0627\u0636", name_en: "Riyadh", city: "Riyadh" },
          { id: "madinah", name_ar: "\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629", name_en: "Madinah", city: "Madinah" },
          { id: "unaizah", name_ar: "\u0639\u0646\u064A\u0632\u0629", name_en: "Unaizah", city: "Unaizah" },
          { id: "khamis", name_ar: "\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637", name_en: "Khamis Mushait", city: "Khamis Mushait" },
          { id: "jizan", name_ar: "\u062C\u0627\u0632\u0627\u0646", name_en: "Jizan", city: "Jizan" },
          { id: "abha", name_ar: "\u0623\u0628\u0647\u0627", name_en: "Abha", city: "Abha" }
        ]
      }), { headers: { "Content-Type": "application/json", ...CORS, "Cache-Control": "max-age=3600" } });
    }
    // Proxy /basma/* to voice.elfadil.com (rewrite /basma/ → /bsma/ for voice agent routing)
    if (path.startsWith("/basma/")) {
      try {
        const voicePath = path.replace(/^\/basma\//, "/bsma/");
        const voiceUrl = (env2.VOICE_BACKEND || "https://voice.elfadil.com") + voicePath + url.search;
        const voiceResp = await fetch(voiceUrl, {
          method,
          headers: {"Content-Type":"application/json","X-Source":"bsma-portal"},
          body: method === "POST" ? await request.clone().text() : void 0,
          signal: AbortSignal.timeout(15000)
        });
        return new Response(await voiceResp.text(), {
          status: voiceResp.status,
          headers: {"Content-Type": voiceResp.headers.get("Content-Type") || "application/json", ...CORS}
        });
      } catch(err) {
        return new Response(JSON.stringify({error:true,message:"Voice agent unavailable"}), {
          status:502, headers:{"Content-Type":"application/json",...CORS}
        });
      }
    }
    // === BSMA direct integrations ===
    if (path === "/api/eligibility/check" && method === "POST") {
      try {
        const { identity_number, identity_type = "NATIONAL NUMBER", branch = "riyadh" } = await request.json();
        const oracleKey = "bsma-oracle-b2af3196522b556636b09f5d268cb976";
        const oracleUrl = `https://oracle-bridge.brainsait.org/eligibility?api_key=${oracleKey}&identity_number=${encodeURIComponent(identity_number)}&identity_type=${encodeURIComponent(identity_type)}&branch=${branch}`;
        const r = await fetch(oracleUrl, { signal: AbortSignal.timeout(20000) });
        const data = await r.json();
        return new Response(JSON.stringify({ success: true, source: "oracle-bridge", branch, ...data }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: "eligibility_check_failed", detail: e.message }), {
          status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
    if (path === "/api/clinician/handoff" && method === "POST") {
      try {
        const body = await request.json();
        // Forward to HNH which has D1 binding to write into bsma_handoffs
        const r = await fetch("https://hnh.brainsait.org/api/clinician/handoff", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Source": "bsma-portal" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(10000)
        });
        const data = await r.json();
        return new Response(JSON.stringify(data), {
          status: r.status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
    if (path === "/api/billing/status" && method === "GET") {
      try {
        const branch = url.searchParams.get("branch") || "riyadh";
        const patient_id = url.searchParams.get("patient_id") || "status";
        const r = await fetch(`https://hnh.brainsait.org/api/billing/${patient_id}`, { signal: AbortSignal.timeout(10000) });
        const data = await r.json();
        return new Response(JSON.stringify({ success: true, source: "hnh-d1", branch, ...data }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
    if (path === "/api/patient/lookup" && method === "GET") {
      try {
        const id = url.searchParams.get("id");
        const branch = url.searchParams.get("branch") || "riyadh";
        if (!id) return new Response(JSON.stringify({ success: false, error: "id_required" }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
        const oracleKey = "bsma-oracle-b2af3196522b556636b09f5d268cb976";
        const r = await fetch(`https://oracle-bridge.brainsait.org/patient?api_key=${oracleKey}&national_id=${encodeURIComponent(id)}&branch=${branch}`, { signal: AbortSignal.timeout(15000) });
        const data = await r.json();
        return new Response(JSON.stringify({ success: true, source: "oracle-bridge", ...data }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
    if (path.startsWith("/api/")) {
      try {
        const backendResponse = await fetch(`${env2.HNH_BACKEND || "https://hnh.brainsait.org"}${path}${url.search}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Source": "bsma-portal",
            ...method === "POST" ? { "Content-Type": "application/json" } : {}
          },
          body: method === "POST" ? await request.clone().text() : void 0,
          signal: AbortSignal.timeout(1e4)
        });
        const contentType = backendResponse.headers.get("Content-Type") || "application/json";
        const responseData = await backendResponse.text();
        return new Response(responseData, {
          status: backendResponse.status,
          headers: { "Content-Type": contentType, ...CORS, "Cache-Control": "no-cache" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: "HNH backend unavailable" }), {
          status: 502,
          headers: { "Content-Type": "application/json", ...CORS }
        });
      }
    }
    return new Response(html_default, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...SECURITY_HEADERS
      }
    });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map