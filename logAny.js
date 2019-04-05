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

  var level = arg && arg.level ? arg.level : "debug"
  var message = arg && arg.message ? arg.message : arg

  emit("log", prop, {
    event: event,
    level: level,
    message: message,
  })
}
