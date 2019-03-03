/* eslint-env jest */

var dot,
  log = require("./log")

beforeEach(function() {
  dot = require("dot-event")()
  log(dot, { level: "debug" })
})

test("log", function() {
  dot("log", "debug")
  dot("log", "error", "test")
  dot("log", "info", "test", "hi")
  dot("log", "trace", "test", {
    event: "event",
    message: "hi",
  })
  dot("log", "warn", "test", "hi")
  dot("anything")
})
