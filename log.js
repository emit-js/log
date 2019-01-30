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

module.exports = function log(dot, opts) {
  if (dot.state.log) {
    return
  }

  dot.state.log = Object.assign(
    {
      level: "info",
      levels: {},
    },
    opts
  )

  dot.beforeAny(logAll)
  dot.beforeAny("log", logger)
}

function logAll(prop, arg, dot, event) {
  if (event === "log") {
    return
  }

  var level = arg ? arg.level : undefined

  dot("log", level, prop, {
    event: event,
    message: arg,
  })
}

function logger(prop, arg, dot, e) {
  if (!arg) {
    arg = prop.pop()
  }

  var custom = arg.event || arg.message,
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

  if (state.levels[event]) {
    fakeLevel = state.levels[event][level] || level
  }

  if (levels.indexOf(fakeLevel) < levelIndex) {
    return
  }

  var space =
    typeof window === "undefined" ? levelSpaces[level] : ""

  var out = [
    new Date().toISOString(),
    levelEmojis[level] + space,
  ]

  if (event) {
    out.push("[" + event + "]")
  }

  if (prop.length) {
    out.push(prop.join("."))
  }

  if (message) {
    out.push(message)
  }

  // eslint-disable-next-line no-console
  console.log.apply(null, out)
}
