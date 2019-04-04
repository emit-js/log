/*prettier-ignore*/
"use strict";

module.exports = function(emit) {
  emit.any(logAny)
}

function logAny(arg, prop, emit, signal) {
  var event = signal.event

  if (event === "log") {
    return
  }

  var level = arg ? arg.level : undefined
  var message = arg ? arg.message || arg : arg

  emit("log", level, prop, {
    event: event,
    message: message,
  })
}
