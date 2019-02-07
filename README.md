# @dot-event/log

[dot-event](https://github.com/dot-event/dot-event2#readme) logger

![dots](dots.gif)

## Install

```bash
npm install dot-event @dot-event/log
```

## Setup

Add the logger right after you initialize your [dot-event](https://github.com/dot-event/dot-event2) instance:

```js
const dot = require("dot-event")()
require("@dot-event/log")(dot)
```

This creates the `dot.log` emitter.

## Log levels

There are five log levels: `debug`, `trace`, `info`, `warn`, and `error`.

By default, the logger only logs `info` or above, but you can change that with a composer option:

```js
require("@dot-event/log")(dot, { level: "debug" })
```

## Automatic logging

By default, the logger logs any and all events at log level `info`.

If your event is very noisy, you might want to opt to alias `info` logs to `debug` for that particular event:

```js
dot.state.log.levels.myEvent = { info: "debug" }
```

## Manual logging

```js
dot.log("warn", "some scary message here")
```
