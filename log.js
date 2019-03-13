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

module.exports = function(dot) {
  if (dot.log) {
    return
  }

  dot.state.log = {
    events: {
      logLevel: { info: "debug" },
    },
    level: "warn",
    levels: levels,
  }

  require("./logAny")(dot)
  require("./logLevel")(dot)

  dot.any("log", log)
}

function log(prop, arg, dot, e) {
  var custom = arg && (arg.event || arg.message),
    level = "info",
    state = dot.state.log

  var event = custom ? arg.event : e,
    message = custom ? arg.message : arg

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
