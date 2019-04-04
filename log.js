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
  }

  require("./logAny")(emit)
  require("./logLevel")(emit)

  emit.any("log", log)
}

function log(arg, prop, emit, signal) {
  var e = signal.event,
    state = emit.state.log

  var event = arg && arg.event ? arg.event : e,
    level = arg && arg.level ? arg.level : "debug",
    message =
      arg && (arg.event || arg.message) ? arg.message : arg

  if (levels.indexOf(prop[0]) > -1) {
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

  var out = [
    new Date().toISOString(),
    levelEmojis[fakeLevel] + space,
  ]

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
