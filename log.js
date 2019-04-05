/*prettier-ignore*/
"use strict";

var levelEmojis = {
  debug: "🐛",
  error: "🛑",
  info: "ℹ️",
  trace: "💻",
  warn: "⚠️",
}

var levelSpaces = {
  debug: "",
  error: "",
  info: " ",
  trace: "",
  warn: " ",
}

var levels = ["debug", "trace", "info", "warn", "error"]

module.exports = function(emit) {
  if (emit.log) {
    return
  }

  emit.state.log = {
    events: {
      logLevel: { info: "debug" },
    },
    level: defaultLevel(),
    levels: levels,
    time: false,
  }

  require("./logAny")(emit)
  require("./logLevel")(emit)

  emit.any("log", log)
}

function log(arg, prop, emit, signal) {
  var state = emit.state.log

  var custom =
    arg &&
    (arg.hasOwnProperty("event") ||
      arg.hasOwnProperty("level") ||
      arg.hasOwnProperty("message"))

  var event =
      custom && arg.event ? arg.event : signal.event,
    level = "debug",
    message = custom ? arg.message : arg

  if (custom && arg.level) {
    level = arg.level
  } else if (levels.indexOf(prop[0]) > -1) {
    level = prop[0]
    prop = prop.slice(1)
  }

  var fakeLevel = level,
    levelIndex = levels.indexOf(state.level)

  if (state.events[event]) {
    fakeLevel = state.events[event][level] || level

    if (
      state.events[event].forceArg &&
      typeof message === "undefined"
    ) {
      message = prop.pop()
    }
  }

  if (levels.indexOf(fakeLevel) < levelIndex) {
    return
  }

  var space =
    typeof window === "undefined"
      ? levelSpaces[fakeLevel]
      : ""

  var out = []

  if (state.time) {
    out.push(new Date().toISOString())
  }

  out.push(levelEmojis[fakeLevel] + space)

  if (event) {
    out.push("[" + event + "]")
  }

  if (prop.length) {
    out.push(prop.join("."))
  }

  if (message) {
    if (
      typeof message === "function" &&
      typeof window === "undefined"
    ) {
      out.push("[Function]")
    } else {
      out.push(message)
    }
  }

  // eslint-disable-next-line no-console
  console.log.apply(null, out)
}

function defaultLevel() {
  return typeof process !== "undefined" &&
    process.env &&
    process.env.LOG
    ? process.env.LOG
    : "info"
}
