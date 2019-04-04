# @emit-js/log

[emit](https://github.com/emit-js/emit#readme) logger

![log](log.gif)

## Install

```bash
npm install @emit-js/emit @emit-js/log
```

## Setup

```js
const emit = require("@emit-js/emit")()
require("@emit-js/log")(emit)
```

This creates the `emit.log` emitter.

## Log levels

There are five log levels: `debug`, `trace`, `info`, `warn`, and `error`.

By default, the logger only logs `info` or above, but you can change that with `logLevel`:

```js
emit("logLevel", { arg: "debug" })
```

## Automatic logging

By default, the logger logs any and all events at log level `info`.

If your event is very noisy, you might want to opt to alias `info` logs to `debug` for that particular event:

```js
emit("logLevel", "myEvent", { info: "debug" })
```

## Manual logging

```js
emit.log("warn", { arg: "some scary message here" })
```
