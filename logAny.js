/*prettier-ignore*/
"use strict";

module.exports = function(dot) {
  dot.any(logAny)
}

function logAny(prop, arg, dot, event) {
  if (event === "log") {
    return
  }

  var level = arg ? arg.level : undefined
  var message = arg ? arg.message || arg : arg

  dot("log", level, prop, {
    event: event,
    message: message,
  })
}
